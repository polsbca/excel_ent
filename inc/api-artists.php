<?php
/**
 * Smartflows artist APIs — Phase 1 (server-side proxy + normalizer).
 *
 * - Search results (`/?s=…`) → search.php
 * - Explore Artists (`/explore-artists/`) → list.php
 *
 * Configure in wp-config.php (recommended):
 *
 * define( 'EXCEL_ENT_ARTIST_API_KEY', 'your-key-here' );
 *
 * Optional overrides:
 * define( 'EXCEL_ENT_ARTIST_API_URL', 'https://smartflows.co.uk/excel/api/artists/search.php' );
 * define( 'EXCEL_ENT_ARTIST_LIST_API_URL', 'https://smartflows.co.uk/excel/api/artists/list.php' );
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default search endpoint (header / WP search).
 *
 * @return string
 */
function excel_ent_artist_api_search_url() {
	if ( defined( 'EXCEL_ENT_ARTIST_API_URL' ) && EXCEL_ENT_ARTIST_API_URL ) {
		return EXCEL_ENT_ARTIST_API_URL;
	}

	return 'https://smartflows.co.uk/excel/api/artists/search.php';
}

/**
 * Default list endpoint (Explore Artists page).
 *
 * @return string
 */
function excel_ent_artist_api_list_url() {
	if ( defined( 'EXCEL_ENT_ARTIST_LIST_API_URL' ) && EXCEL_ENT_ARTIST_LIST_API_URL ) {
		return EXCEL_ENT_ARTIST_LIST_API_URL;
	}

	return 'https://smartflows.co.uk/excel/api/artists/list.php';
}

/**
 * API key from constant or filtered option.
 *
 * @return string
 */
function excel_ent_artist_api_key() {
	if ( defined( 'EXCEL_ENT_ARTIST_API_KEY' ) && EXCEL_ENT_ARTIST_API_KEY ) {
		return EXCEL_ENT_ARTIST_API_KEY;
	}

	$key = get_option( 'excel_ent_artist_api_key', '' );

	/**
	 * Filter the Smartflows artist API key.
	 *
	 * @param string $key API key.
	 */
	return (string) apply_filters( 'excel_ent_artist_api_key', $key );
}

/**
 * Card placeholder when primary_photo_url is empty.
 *
 * @return string
 */
function excel_ent_get_artist_placeholder_image_url() {
	/**
	 * Filter placeholder image URL for artist cards.
	 *
	 * @param string $url Theme asset URL.
	 */
	return (string) apply_filters(
		'excel_ent_artist_placeholder_image_url',
		EXCEL_ENT_URI . '/assets/images/explore-artists/artist-1.jpg'
	);
}

/**
 * Read search query from WP search or ?s= on Explore.
 *
 * @return string
 */
function excel_ent_get_artist_search_query() {
	$query = get_search_query();
	if ( $query ) {
		return $query;
	}

	if ( isset( $_GET['s'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return sanitize_text_field( wp_unslash( $_GET['s'] ) );
	}

	return '';
}

/**
 * Parse comma-separated sub-category codes.
 *
 * @param string $raw Raw param value.
 * @return string[]
 */
function excel_ent_parse_sub_category_param( $raw ) {
	return array_values(
		array_filter(
			array_map(
				'sanitize_key',
				array_map( 'trim', explode( ',', (string) $raw ) )
			)
		)
	);
}

/**
 * Resolve Browse Categories URL params (category group + sub-category tags).
 *
 * Legacy `occasion` is treated as sub_category for backward compatibility.
 *
 * @param array $groups Browse category groups from header templates.
 * @return array{
 *   category: string,
 *   sub_category: string,
 *   sub_values: string[]
 * }
 */
function excel_ent_resolve_search_category_state( $groups ) {
	$category = isset( $_GET['category'] ) ? sanitize_key( wp_unslash( $_GET['category'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$sub_raw  = isset( $_GET['sub_category'] ) ? sanitize_text_field( wp_unslash( $_GET['sub_category'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

	if ( ! $sub_raw && isset( $_GET['occasion'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$sub_raw = sanitize_text_field( wp_unslash( $_GET['occasion'] ) );
	}

	$sub_values = excel_ent_parse_sub_category_param( $sub_raw );

	if ( ! $category && $sub_values && is_array( $groups ) ) {
		foreach ( $groups as $group_key => $group ) {
			if ( empty( $group['tags'] ) || ! is_array( $group['tags'] ) ) {
				continue;
			}
			foreach ( $sub_values as $tag ) {
				if ( isset( $group['tags'][ $tag ] ) ) {
					$category = (string) $group_key;
					break 2;
				}
			}
		}
	}

	return array(
		'category'     => $category,
		'sub_category' => implode( ',', $sub_values ),
		'sub_values'   => $sub_values,
	);
}

/**
 * Budget band → API min/max fee.
 *
 * @param string $budget Budget code.
 * @return array{min:string,max:string}
 */
function excel_ent_artist_budget_to_fee_range( $budget ) {
	$map = array(
		'under-500' => array(
			'min' => '',
			'max' => '500',
		),
		'500-1000'  => array(
			'min' => '500',
			'max' => '1000',
		),
		'1000-2500' => array(
			'min' => '1000',
			'max' => '2500',
		),
		'2500-5000' => array(
			'min' => '2500',
			'max' => '5000',
		),
		'over-5000' => array(
			'min' => '5000',
			'max' => '',
		),
	);

	return isset( $map[ $budget ] ) ? $map[ $budget ] : array(
		'min' => '',
		'max' => '',
	);
}

/**
 * Build API query args from current request.
 *
 * @param array $overrides Optional overrides.
 * @return array
 */
function excel_ent_get_artist_search_args_from_request( $overrides = array() ) {
	$page = 1;
	if ( isset( $_GET['page'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$page = max( 1, (int) $_GET['page'] );
	} elseif ( get_query_var( 'paged' ) ) {
		$page = max( 1, (int) get_query_var( 'paged' ) );
	}

	$args = array(
		'q'            => excel_ent_get_artist_search_query(),
		'category'     => isset( $_GET['category'] ) ? sanitize_key( wp_unslash( $_GET['category'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		'sub_category' => isset( $_GET['sub_category'] ) ? sanitize_text_field( wp_unslash( $_GET['sub_category'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		'location'     => isset( $_GET['location'] ) ? sanitize_text_field( wp_unslash( $_GET['location'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		'budget'       => isset( $_GET['budget'] ) ? sanitize_text_field( wp_unslash( $_GET['budget'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		'page'         => $page,
		'per_page'     => 15,
		'sort'         => 'updated',
	);

	if ( ! $args['sub_category'] && isset( $_GET['occasion'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$args['sub_category'] = sanitize_text_field( wp_unslash( $_GET['occasion'] ) );
	}

	return wp_parse_args( $overrides, $args );
}

/**
 * Convert theme args to Smartflows query parameters.
 *
 * @param array $args Theme search args.
 * @return array
 */
function excel_ent_artist_api_build_query( $args ) {
	$query = array(
		'page'     => max( 1, (int) ( $args['page'] ?? 1 ) ),
		'per_page' => max( 1, min( 50, (int) ( $args['per_page'] ?? 12 ) ) ),
		'sort'     => sanitize_key( (string) ( $args['sort'] ?? 'updated' ) ),
	);

	$q = trim( (string) ( $args['q'] ?? '' ) );
	if ( $q ) {
		$query['q'] = $q;
	}

	$category = sanitize_key( (string) ( $args['category'] ?? '' ) );
	if ( $category ) {
		$query['category'] = array( $category );
	}

	$sub_category = trim( (string) ( $args['sub_category'] ?? '' ) );
	if ( $sub_category ) {
		$sub_values = excel_ent_parse_sub_category_param( $sub_category );
		if ( $sub_values ) {
			$query['sub_category'] = $sub_values;
		}
	}

	$location = trim( (string) ( $args['location'] ?? '' ) );
	if ( $location ) {
		$query['location'] = array( $location );
	}

	$budget = trim( (string) ( $args['budget'] ?? '' ) );
	if ( $budget ) {
		$range = excel_ent_artist_budget_to_fee_range( $budget );
		if ( $range['min'] ) {
			$query['min_fee'] = $range['min'];
		}
		if ( $range['max'] ) {
			$query['max_fee'] = $range['max'];
		}
	}

	/**
	 * Filter Smartflows search query parameters.
	 *
	 * @param array $query Built query.
	 * @param array $args  Theme args.
	 */
	return (array) apply_filters( 'excel_ent_artist_api_query', $query, $args );
}

/**
 * @param mixed $value Raw value.
 * @return bool
 */
function excel_ent_artist_api_is_valid_url( $value ) {
	$value = trim( (string) $value );
	if ( ! $value ) {
		return false;
	}

	return (bool) filter_var( $value, FILTER_VALIDATE_URL );
}

/**
 * Derive profile URL from API row.
 *
 * @param array $raw Raw artist.
 * @return string
 */
function excel_ent_artist_api_profile_url( $raw ) {
	if ( ! empty( $raw['media_link'] ) && excel_ent_artist_api_is_valid_url( $raw['media_link'] ) ) {
		return esc_url_raw( $raw['media_link'] );
	}

	if ( ! empty( $raw['id'] ) ) {
		return add_query_arg(
			array(
				'artist_id' => (int) $raw['id'],
			),
			excel_ent_get_artist_page_url()
		);
	}

	return excel_ent_get_artist_page_url();
}

/**
 * Format price for cards.
 *
 * @param mixed $base_fee Base fee from API.
 * @return string
 */
function excel_ent_artist_api_format_price( $base_fee ) {
	$fee = is_numeric( $base_fee ) ? (float) $base_fee : 0;
	if ( $fee <= 0 ) {
		return __( 'On request', 'excel-ent' );
	}

	return '£' . number_format_i18n( $fee, 0 );
}

/**
 * Best-effort location label.
 *
 * @param array $raw Raw artist.
 * @return string
 */
function excel_ent_artist_api_location_label( $raw ) {
	$location = trim( (string) ( $raw['location'] ?? '' ) );
	if ( $location ) {
		return $location;
	}

	$notes = (string) ( $raw['notes'] ?? '' );
	if ( preg_match( '/\b(?:based|Based)\s+(.+?)(?:\.|$)/', $notes, $matches ) ) {
		return trim( $matches[1] );
	}

	return '';
}

/**
 * Build tag labels for card chips.
 *
 * @param array $raw Raw artist.
 * @return string[]
 */
function excel_ent_artist_api_tag_labels( $raw ) {
	$tags = array();

	foreach ( array( 'category', 'sub_category', 'genre' ) as $field ) {
		$value = trim( (string) ( $raw[ $field ] ?? '' ) );
		if ( $value ) {
			$tags[] = $value;
		}
	}

	return array_values( array_unique( $tags ) );
}

/**
 * Normalize one API artist row for theme cards.
 *
 * @param array $raw Raw artist from API.
 * @return array
 */
function excel_ent_normalize_api_artist( $raw ) {
	$raw       = is_array( $raw ) ? $raw : array();
	$photo_url = trim( (string) ( $raw['primary_photo_url'] ?? '' ) );
	$image     = excel_ent_artist_api_is_valid_url( $photo_url ) ? $photo_url : excel_ent_get_artist_placeholder_image_url();
	$name      = trim( (string) ( $raw['stage_name'] ?? '' ) );
	$location  = excel_ent_artist_api_location_label( $raw );
	$tags      = excel_ent_artist_api_tag_labels( $raw );

	return array(
		'id'          => isset( $raw['id'] ) ? (string) $raw['id'] : '',
		'name'        => $name ? $name : __( 'Artist', 'excel-ent' ),
		'image'       => $image,
		'image_is_placeholder' => ! excel_ent_artist_api_is_valid_url( $photo_url ),
		'price'       => excel_ent_artist_api_format_price( $raw['base_fee'] ?? 0 ),
		'rating'      => '',
		'location'    => $location,
		'status'      => trim( (string) ( $raw['artist_status'] ?? '' ) ),
		'status_mod'  => 'later',
		'featured'    => false,
		'favorited'   => false,
		'tags'        => $tags,
		'profile_url' => excel_ent_artist_api_profile_url( $raw ),
		'notes'       => trim( (string) ( $raw['notes'] ?? '' ) ),
		'external_url'=> excel_ent_artist_api_is_valid_url( $raw['media_link'] ?? '' ) ? $raw['media_link'] : '',
	);
}

/**
 * Empty artist API result shell.
 *
 * @param int $per_page Default per_page.
 * @return array
 */
function excel_ent_artist_api_empty_result( $per_page = 12 ) {
	return array(
		'artists'    => array(),
		'pagination' => array(
			'page'        => 1,
			'per_page'    => max( 1, (int) $per_page ),
			'total'       => 0,
			'total_pages' => 0,
		),
		'ok'         => false,
		'error'      => '',
		'filters'    => array(),
	);
}

/**
 * Perform authenticated GET against a Smartflows artist endpoint.
 *
 * @param string $endpoint Absolute endpoint URL.
 * @param array  $query    Query args.
 * @param int    $per_page Fallback per_page for empty result.
 * @return array
 */
function excel_ent_artist_api_request( $endpoint, $query, $per_page = 12 ) {
	$result = excel_ent_artist_api_empty_result( $per_page );

	$key = excel_ent_artist_api_key();
	if ( ! $key ) {
		$result['error'] = 'missing_api_key';
		return $result;
	}

	$url = add_query_arg( $query, $endpoint );

	$response = wp_remote_get(
		$url,
		array(
			'timeout' => 20,
			'headers' => array(
				'Accept'    => 'application/json',
				'X-API-Key' => $key,
			),
		)
	);

	if ( is_wp_error( $response ) ) {
		$result['error'] = $response->get_error_message();
		return $result;
	}

	$code = (int) wp_remote_retrieve_response_code( $response );
	$body = wp_remote_retrieve_body( $response );
	$data = json_decode( $body, true );

	if ( 401 === $code ) {
		$result['error'] = 'unauthorized';
		return $result;
	}

	if ( ! is_array( $data ) || empty( $data['ok'] ) ) {
		$result['error'] = 'invalid_response';
		return $result;
	}

	$raw_artists = isset( $data['artists'] ) && is_array( $data['artists'] ) ? $data['artists'] : array();
	$artists     = array_map( 'excel_ent_normalize_api_artist', $raw_artists );

	$pagination  = isset( $data['pagination'] ) && is_array( $data['pagination'] ) ? $data['pagination'] : array();
	$page        = max( 1, (int) ( $pagination['page'] ?? 1 ) );
	$per_page_r  = max( 1, (int) ( $pagination['per_page'] ?? count( $artists ) ) );
	$total       = max( 0, (int) ( $pagination['total'] ?? count( $artists ) ) );
	$total_pages = max( 0, (int) ( $pagination['total_pages'] ?? 0 ) );

	if ( ! $total_pages && $total && $per_page_r ) {
		$total_pages = (int) ceil( $total / $per_page_r );
	}

	return array(
		'ok'         => true,
		'artists'    => $artists,
		'pagination' => array(
			'page'        => $page,
			'per_page'    => $per_page_r,
			'total'       => $total,
			'total_pages' => $total_pages,
		),
		'error'      => '',
		'filters'    => isset( $data['filter_options'] ) && is_array( $data['filter_options'] ) ? $data['filter_options'] : array(),
	);
}

/**
 * Call Smartflows artist search API.
 *
 * @param array $args Theme search args.
 * @return array{
 *   ok: bool,
 *   artists: array<int,array>,
 *   pagination: array{page:int,per_page:int,total:int,total_pages:int},
 *   error: string
 * }
 */
function excel_ent_search_artists( $args = array() ) {
	$query = excel_ent_artist_api_build_query( $args );

	return excel_ent_artist_api_request(
		excel_ent_artist_api_search_url(),
		$query,
		(int) ( $args['per_page'] ?? 12 )
	);
}

/**
 * Parse explore page category / sub-category params.
 *
 * Accepts header-style `category`/`sub_category` and Explore filter-style
 * `categories`/`tags`.
 *
 * @return array{
 *   category: string,
 *   sub_category: string,
 *   categories: string[],
 *   sub_values: string[]
 * }
 */
function excel_ent_get_explore_list_tax_from_request() {
	$category_raw = isset( $_GET['category'] ) ? sanitize_text_field( wp_unslash( $_GET['category'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	if ( ! $category_raw && isset( $_GET['categories'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$category_raw = sanitize_text_field( wp_unslash( $_GET['categories'] ) );
	}

	$sub_raw = isset( $_GET['sub_category'] ) ? sanitize_text_field( wp_unslash( $_GET['sub_category'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	if ( ! $sub_raw && isset( $_GET['tags'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$sub_raw = sanitize_text_field( wp_unslash( $_GET['tags'] ) );
	}
	if ( ! $sub_raw && isset( $_GET['occasion'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$sub_raw = sanitize_text_field( wp_unslash( $_GET['occasion'] ) );
	}

	$categories = excel_ent_parse_sub_category_param( $category_raw );
	$sub_values = excel_ent_parse_sub_category_param( $sub_raw );

	return array(
		'category'     => implode( ',', $categories ),
		'sub_category' => implode( ',', $sub_values ),
		'categories'   => $categories,
		'sub_values'   => $sub_values,
	);
}

/**
 * Build Explore Artists list args from current request.
 *
 * @param array $overrides Optional overrides.
 * @return array
 */
function excel_ent_get_artist_list_args_from_request( $overrides = array() ) {
	$page = 1;
	if ( isset( $_GET['page'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$page = max( 1, (int) $_GET['page'] );
	} elseif ( get_query_var( 'paged' ) ) {
		$page = max( 1, (int) get_query_var( 'paged' ) );
	}

	$tax = excel_ent_get_explore_list_tax_from_request();

	$sort = isset( $_GET['sort'] ) ? sanitize_key( wp_unslash( $_GET['sort'] ) ) : 'name'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	if ( ! $sort ) {
		$sort = 'name';
	}

	$args = array(
		'q'            => excel_ent_get_artist_search_query(),
		'category'     => $tax['category'],
		'sub_category' => $tax['sub_category'],
		'location'     => isset( $_GET['location'] ) ? sanitize_text_field( wp_unslash( $_GET['location'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		'status'       => isset( $_GET['status'] ) ? sanitize_text_field( wp_unslash( $_GET['status'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		'page'         => $page,
		'per_page'     => 25,
		'sort'         => $sort,
	);

	return wp_parse_args( $overrides, $args );
}

/**
 * Convert theme list args to Smartflows list.php query parameters.
 *
 * @param array $args Theme list args.
 * @return array
 */
function excel_ent_artist_api_build_list_query( $args ) {
	$query = array(
		'page'     => max( 1, (int) ( $args['page'] ?? 1 ) ),
		'per_page' => max( 1, min( 50, (int) ( $args['per_page'] ?? 25 ) ) ),
		'sort'     => sanitize_key( (string) ( $args['sort'] ?? 'name' ) ),
	);

	$q = trim( (string) ( $args['q'] ?? '' ) );
	if ( $q ) {
		$query['q'] = $q;
	}

	$category = trim( (string) ( $args['category'] ?? '' ) );
	if ( $category ) {
		$category_values = excel_ent_parse_sub_category_param( $category );
		if ( $category_values ) {
			$query['category'] = $category_values;
		}
	}

	$sub_category = trim( (string) ( $args['sub_category'] ?? '' ) );
	if ( $sub_category ) {
		$sub_values = excel_ent_parse_sub_category_param( $sub_category );
		if ( $sub_values ) {
			$query['sub_category'] = $sub_values;
		}
	}

	$location = trim( (string) ( $args['location'] ?? '' ) );
	if ( $location ) {
		$query['location'] = array( $location );
	}

	$status = trim( (string) ( $args['status'] ?? '' ) );
	if ( $status ) {
		$status_values = excel_ent_parse_sub_category_param( $status );
		if ( $status_values ) {
			$query['status'] = $status_values;
		}
	}

	/**
	 * Filter Smartflows list query parameters.
	 *
	 * @param array $query Built query.
	 * @param array $args  Theme args.
	 */
	return (array) apply_filters( 'excel_ent_artist_api_list_query', $query, $args );
}

/**
 * Call Smartflows artist list API (Explore Artists).
 *
 * @param array $args Theme list args.
 * @return array{
 *   ok: bool,
 *   artists: array<int,array>,
 *   pagination: array{page:int,per_page:int,total:int,total_pages:int},
 *   error: string,
 *   filters: array
 * }
 */
function excel_ent_list_artists( $args = array() ) {
	$query = excel_ent_artist_api_build_list_query( $args );

	return excel_ent_artist_api_request(
		excel_ent_artist_api_list_url(),
		$query,
		(int) ( $args['per_page'] ?? 25 )
	);
}

/**
 * Pagination link preserving current filters.
 *
 * @param int $page Target page.
 * @return string
 */
function excel_ent_artist_search_page_url( $page ) {
	$page = max( 1, (int) $page );
	$args = array( 'page' => $page );

	$keys = array( 's', 'category', 'sub_category', 'categories', 'tags', 'location', 'event_date', 'budget', 'status', 'sort' );
	foreach ( $keys as $key ) {
		if ( isset( $_GET[ $key ] ) && '' !== (string) wp_unslash( $_GET[ $key ] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$args[ $key ] = sanitize_text_field( wp_unslash( $_GET[ $key ] ) );
		}
	}

	if ( is_search() ) {
		unset( $args['s'] );
		return add_query_arg( $args, get_search_link( excel_ent_get_artist_search_query() ) );
	}

	if ( excel_ent_is_explore_artists_page() ) {
		return add_query_arg( $args, excel_ent_get_explore_artists_url() );
	}

	return add_query_arg( $args, remove_query_arg( array( 'page', 'paged' ) ) );
}
