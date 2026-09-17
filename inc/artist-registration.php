<?php
/**
 * Artist registration — WordPress AJAX proxy to Smartflows applications API.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Artist applications endpoint.
 *
 * @return string
 */
function excel_ent_artist_applications_url() {
	if ( defined( 'EXCEL_ENT_ARTIST_APPLICATIONS_API_URL' ) && EXCEL_ENT_ARTIST_APPLICATIONS_API_URL ) {
		return EXCEL_ENT_ARTIST_APPLICATIONS_API_URL;
	}

	return 'https://syms.io/excel/api/v1/artist-applications.php';
}

/**
 * Split a comma-separated list of taxonomy codes.
 *
 * Performance category UI values may be `group:code` (e.g. `artists-tributes:bands`).
 *
 * @param string $raw Raw value.
 * @return string[]
 */
function excel_ent_artist_registration_split_codes( $raw ) {
	$parts = preg_split( '/\s*,\s*/', (string) $raw );
	if ( ! is_array( $parts ) ) {
		return array();
	}

	$out = array();
	foreach ( $parts as $part ) {
		$part = trim( (string) $part );
		if ( '' === $part ) {
			continue;
		}

		// Dropdown stores "group:code" — API expects the bare category code.
		if ( false !== strpos( $part, ':' ) ) {
			$part = substr( $part, strrpos( $part, ':' ) + 1 );
		}

		$code = strtolower( trim( $part ) );
		$code = preg_replace( '/[^a-z0-9+\-_]/', '', $code );
		if ( '' === $code ) {
			continue;
		}
		$out[] = $code;
	}

	return array_values( array_unique( $out ) );
}

/**
 * Collect a list of URL strings from a POST array/string field.
 *
 * @param string $key Request key.
 * @param int    $max Max items.
 * @return string[]
 */
function excel_ent_artist_registration_collect_urls( $key, $max = 10 ) {
	$raw = isset( $_POST[ $key ] ) ? wp_unslash( $_POST[ $key ] ) : array(); // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
	if ( ! is_array( $raw ) ) {
		$raw = array( $raw );
	}

	$urls = array();
	foreach ( $raw as $item ) {
		$url = esc_url_raw( trim( (string) $item ) );
		if ( '' === $url ) {
			continue;
		}
		$urls[] = $url;
		if ( count( $urls ) >= $max ) {
			break;
		}
	}

	return $urls;
}

/**
 * Normalize $_FILES entry into a list of valid image uploads.
 *
 * @param string $field Field name without trailing brackets.
 * @param int    $max   Max files.
 * @return array<int, array{tmp_name:string,name:string,type:string,size:int}>|WP_Error
 */
function excel_ent_artist_registration_collect_files( $field, $max ) {
	if ( empty( $_FILES[ $field ] ) || ! is_array( $_FILES[ $field ] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
		return array();
	}

	$bag = $_FILES[ $field ]; // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
	$allowed = array(
		'image/jpeg' => true,
		'image/png'  => true,
		'image/webp' => true,
		'image/gif'  => true,
	);
	$max_bytes = 5 * MB_IN_BYTES;
	$files     = array();

	// Normalize single-file and multi-file ($_FILES["field"] vs $_FILES["field"][]).
	if ( isset( $bag['name'] ) && is_array( $bag['name'] ) ) {
		$items = array();
		foreach ( $bag['name'] as $i => $name ) {
			$items[] = array(
				'name'     => (string) $name,
				'type'     => isset( $bag['type'][ $i ] ) ? (string) $bag['type'][ $i ] : '',
				'tmp_name' => isset( $bag['tmp_name'][ $i ] ) ? (string) $bag['tmp_name'][ $i ] : '',
				'error'    => isset( $bag['error'][ $i ] ) ? (int) $bag['error'][ $i ] : UPLOAD_ERR_NO_FILE,
				'size'     => isset( $bag['size'][ $i ] ) ? (int) $bag['size'][ $i ] : 0,
			);
		}
	} else {
		$items = array(
			array(
				'name'     => isset( $bag['name'] ) ? (string) $bag['name'] : '',
				'type'     => isset( $bag['type'] ) ? (string) $bag['type'] : '',
				'tmp_name' => isset( $bag['tmp_name'] ) ? (string) $bag['tmp_name'] : '',
				'error'    => isset( $bag['error'] ) ? (int) $bag['error'] : UPLOAD_ERR_NO_FILE,
				'size'     => isset( $bag['size'] ) ? (int) $bag['size'] : 0,
			),
		);
	}

	foreach ( $items as $item ) {
		$error = (int) $item['error'];
		if ( UPLOAD_ERR_NO_FILE === $error ) {
			continue;
		}
		if ( UPLOAD_ERR_OK !== $error ) {
			return new WP_Error(
				'upload_failed',
				__( 'One of the uploaded images could not be processed. Please try again.', 'excel-ent' )
			);
		}

		$tmp  = (string) $item['tmp_name'];
		$name = sanitize_file_name( (string) $item['name'] );
		$type = (string) $item['type'];
		$size = (int) $item['size'];

		if ( ! $tmp || ! is_readable( $tmp ) || ! is_uploaded_file( $tmp ) ) {
			return new WP_Error(
				'upload_failed',
				__( 'One of the uploaded images could not be processed. Please try again.', 'excel-ent' )
			);
		}

		$check = wp_check_filetype_and_ext( $tmp, $name );
		$mime  = ! empty( $check['type'] ) ? (string) $check['type'] : $type;
		if ( empty( $allowed[ $mime ] ) ) {
			return new WP_Error(
				'invalid_image_type',
				__( 'Please upload JPG, PNG, WEBP, or GIF images only.', 'excel-ent' )
			);
		}

		if ( $size <= 0 || $size > $max_bytes ) {
			return new WP_Error(
				'image_too_large',
				__( 'Each image must be 5 MB or smaller.', 'excel-ent' )
			);
		}

		$files[] = array(
			'tmp_name' => $tmp,
			'name'     => $name ? $name : 'upload.jpg',
			'type'     => $mime,
			'size'     => $size,
		);

		if ( count( $files ) > $max ) {
			return new WP_Error(
				'too_many_files',
				sprintf(
					/* translators: %d: max file count */
					__( 'You can upload a maximum of %d images for this field.', 'excel-ent' ),
					$max
				)
			);
		}
	}

	return $files;
}

/**
 * Store an uploaded image in the WordPress uploads directory and return a public URL object.
 *
 * The Smartflows applications endpoint currently rejects / fails to store binary multipart
 * uploads, but accepts Option C media URL objects inside the JSON payload.
 *
 * @param array{tmp_name:string,name:string,type:string,size:int} $file Upload meta.
 * @return array{url:string,filename:string,mime_type:string,size_bytes:int}|WP_Error
 */
function excel_ent_artist_registration_persist_upload( $file ) {
	if ( ! function_exists( 'wp_handle_sideload' ) ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
	}

	$tmp = (string) ( $file['tmp_name'] ?? '' );
	if ( ! $tmp || ! is_readable( $tmp ) ) {
		return new WP_Error(
			'upload_failed',
			__( 'One of the uploaded images could not be processed. Please try again.', 'excel-ent' )
		);
	}

	// Copy to a sideload-friendly temp name — browser tmp files may vanish after handle.
	$check = wp_check_filetype_and_ext( $tmp, (string) ( $file['name'] ?? '' ) );
	$ext   = ! empty( $check['ext'] ) ? (string) $check['ext'] : 'jpg';
	$mime  = ! empty( $check['type'] ) ? (string) $check['type'] : (string) ( $file['type'] ?? 'image/jpeg' );
	$name  = ! empty( $file['name'] ) ? sanitize_file_name( (string) $file['name'] ) : ( 'upload.' . $ext );
	if ( ! preg_match( '/\.' . preg_quote( $ext, '/' ) . '$/i', $name ) ) {
		$name .= '.' . $ext;
	}

	$staged = trailingslashit( get_temp_dir() ) . 'ee-artist-' . wp_generate_password( 12, false, false ) . '.' . $ext;
	if ( ! copy( $tmp, $staged ) ) {
		return new WP_Error(
			'upload_failed',
			__( 'One of the uploaded images could not be processed. Please try again.', 'excel-ent' )
		);
	}

	// Prefer JPEG under ~1600px to keep payloads small and broadly compatible.
	if ( function_exists( 'wp_get_image_editor' ) ) {
		$editor = wp_get_image_editor( $staged );
		if ( ! is_wp_error( $editor ) ) {
			$size = $editor->get_size();
			if ( ! empty( $size['width'] ) && (int) $size['width'] > 1600 ) {
				$editor->resize( 1600, null, false );
			}
			$dest = preg_replace( '/\.[^.]+$/', '.jpg', $staged );
			$saved = $editor->save( $dest, 'image/jpeg' );
			if ( ! is_wp_error( $saved ) && ! empty( $saved['path'] ) ) {
				if ( $saved['path'] !== $staged && is_file( $staged ) ) {
					wp_delete_file( $staged );
				}
				$staged = (string) $saved['path'];
				$mime   = 'image/jpeg';
				$ext    = 'jpg';
				$name   = preg_replace( '/\.[^.]+$/', '.jpg', $name );
			}
		}
	}

	$sideload = array(
		'name'     => $name,
		'type'     => $mime,
		'tmp_name' => $staged,
		'error'    => 0,
		'size'     => (int) filesize( $staged ),
	);

	$uploaded = wp_handle_sideload(
		$sideload,
		array(
			'test_form'   => false,
			'test_type'   => true,
			'mimes'       => array(
				'jpg|jpeg|jpe' => 'image/jpeg',
				'png'          => 'image/png',
				'gif'          => 'image/gif',
				'webp'         => 'image/webp',
			),
		)
	);

	if ( is_file( $staged ) ) {
		wp_delete_file( $staged );
	}

	if ( ! empty( $uploaded['error'] ) ) {
		return new WP_Error( 'upload_failed', (string) $uploaded['error'] );
	}

	$file_path = (string) ( $uploaded['file'] ?? '' );
	$file_url  = (string) ( $uploaded['url'] ?? '' );
	if ( ! $file_url ) {
		return new WP_Error(
			'upload_failed',
			__( 'One of the uploaded images could not be processed. Please try again.', 'excel-ent' )
		);
	}

	return array(
		'url'        => esc_url_raw( $file_url ),
		'filename'   => $file_path ? wp_basename( $file_path ) : $name,
		'mime_type'  => ! empty( $uploaded['type'] ) ? (string) $uploaded['type'] : $mime,
		'size_bytes' => $file_path && is_file( $file_path ) ? (int) filesize( $file_path ) : (int) ( $file['size'] ?? 0 ),
	);
}

/**
 * Persist a list of uploads and return Option C media URL objects.
 *
 * @param array<int, array{tmp_name:string,name:string,type:string,size:int}> $files Files.
 * @return array<int, array{url:string,filename:string,mime_type:string,size_bytes:int}>|WP_Error
 */
function excel_ent_artist_registration_persist_uploads( $files ) {
	$out = array();
	foreach ( (array) $files as $file ) {
		$saved = excel_ent_artist_registration_persist_upload( $file );
		if ( is_wp_error( $saved ) ) {
			return $saved;
		}
		$out[] = $saved;
	}
	return $out;
}

/**
 * POST application JSON to Smartflows (Option C — media as URLs, no binary parts).
 *
 * @param array<string, mixed> $payload Canonical JSON payload.
 * @param string               $idem    Idempotency key.
 * @return array{ok:bool,code:int,body:array|null,raw:string,error:string}
 */
function excel_ent_artist_registration_remote_post( $payload, $idem = '' ) {
	$result = array(
		'ok'    => false,
		'code'  => 0,
		'body'  => null,
		'raw'   => '',
		'error' => '',
	);

	$key = excel_ent_artist_api_key();
	if ( ! $key ) {
		$result['error'] = 'missing_api_key';
		return $result;
	}

	$url = excel_ent_artist_applications_url();

	if ( ! function_exists( 'curl_init' ) ) {
		$result['error'] = 'curl_unavailable';
		return $result;
	}

	$json = wp_json_encode( $payload );
	if ( false === $json ) {
		$result['error'] = 'payload_encode';
		return $result;
	}

	$headers = array(
		'Accept: application/json',
		'Content-Type: application/json',
		'X-API-Key: ' . $key,
		'Authorization: Bearer ' . $key,
	);
	if ( $idem ) {
		$headers[] = 'Idempotency-Key: ' . $idem;
	}

	$ch = curl_init( $url );
	curl_setopt_array(
		$ch,
		array(
			CURLOPT_POST           => true,
			CURLOPT_POSTFIELDS     => $json,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_TIMEOUT        => 90,
			CURLOPT_HTTPHEADER     => $headers,
		)
	);

	$raw  = curl_exec( $ch );
	$code = (int) curl_getinfo( $ch, CURLINFO_HTTP_CODE );
	$err  = curl_error( $ch );
	curl_close( $ch );

	if ( false === $raw ) {
		$result['error'] = $err ? $err : 'request_failed';
		return $result;
	}

	$result['code'] = $code;
	$result['raw']  = (string) $raw;
	$decoded        = json_decode( (string) $raw, true );
	$result['body'] = is_array( $decoded ) ? $decoded : null;
	$result['ok']   = ( $code >= 200 && $code < 300 );

	return $result;
}

/**
 * Build canonical application payload from the talent form request.
 *
 * @return array<string, mixed>
 */
function excel_ent_artist_registration_build_payload() {
	$set_lengths = excel_ent_artist_registration_split_codes(
		isset( $_POST['excel_ent_set_length'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_set_length'] ) ) : '' // phpcs:ignore WordPress.Security.NonceVerification.Missing
	);
	$categories  = excel_ent_artist_registration_split_codes(
		isset( $_POST['excel_ent_perf_category'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_perf_category'] ) ) : '' // phpcs:ignore WordPress.Security.NonceVerification.Missing
	);

	$years  = isset( $_POST['excel_ent_years'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_years'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$travel = isset( $_POST['excel_ent_travel'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_travel'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$pli    = isset( $_POST['excel_ent_pli'] ) ? sanitize_key( wp_unslash( $_POST['excel_ent_pli'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$pat    = isset( $_POST['excel_ent_pat'] ) ? sanitize_key( wp_unslash( $_POST['excel_ent_pat'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$pref   = isset( $_POST['excel_ent_talent_contact_pref'] ) ? sanitize_key( wp_unslash( $_POST['excel_ent_talent_contact_pref'] ) ) : 'email'; // phpcs:ignore WordPress.Security.NonceVerification.Missing

	$video   = isset( $_POST['excel_ent_video_links'] ) ? esc_url_raw( wp_unslash( $_POST['excel_ent_video_links'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$reviews = isset( $_POST['excel_ent_reviews'] ) ? esc_url_raw( wp_unslash( $_POST['excel_ent_reviews'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing

	return array(
		'type'     => 'talent',
		'personal' => array(
			'full_name'          => isset( $_POST['excel_ent_full_name'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_full_name'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
			'stage_name'         => isset( $_POST['excel_ent_stage_name'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_stage_name'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
			'email'              => isset( $_POST['excel_ent_email'] ) ? sanitize_email( wp_unslash( $_POST['excel_ent_email'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
			'phone'              => isset( $_POST['excel_ent_phone'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_phone'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
			'registered_address' => isset( $_POST['excel_ent_address'] ) ? sanitize_textarea_field( wp_unslash( $_POST['excel_ent_address'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
		),
		'performance' => array(
			'years_performing' => $years,
			'base_location'    => isset( $_POST['excel_ent_base_location'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_base_location'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
			'set_lengths'      => $set_lengths,
			'rate_range'       => isset( $_POST['excel_ent_rate'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_rate'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
			'categories'       => $categories,
		),
		'media' => array(
			'playlist_links' => excel_ent_artist_registration_collect_urls( 'excel_ent_playlist', 10 ),
			'social_links'   => excel_ent_artist_registration_collect_urls( 'excel_ent_social', 3 ),
			'video_link'     => $video,
			'reviews_link'   => $reviews,
		),
		'travel' => array(
			'radius'                     => $travel,
			'technical_requirements'     => isset( $_POST['excel_ent_tech'] ) ? sanitize_textarea_field( wp_unslash( $_POST['excel_ent_tech'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
			'public_liability_insurance' => in_array( $pli, array( 'yes', 'no' ), true ) ? $pli : '',
			'pat_tested'                 => in_array( $pat, array( 'yes', 'no' ), true ) ? $pat : '',
		),
		'bio' => isset( $_POST['excel_ent_bio'] ) ? sanitize_textarea_field( wp_unslash( $_POST['excel_ent_bio'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
		'contact_preference' => array(
			'method'  => in_array( $pref, array( 'email', 'phone', 'text' ), true ) ? $pref : 'email',
			'details' => isset( $_POST['excel_ent_talent_contact_details'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_talent_contact_details'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
		),
		'consent' => array(
			'website_content_sharing' => ! empty( $_POST['excel_ent_agree'] ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
		),
		'meta' => array(
			'source'         => 'wordpress',
			'submitted_from' => 'contact-register-artist',
			'user_agent'     => isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '',
			'locale'         => str_replace( '_', '-', get_locale() ),
		),
	);
}

/**
 * Validate required application fields before calling the API.
 *
 * @param array<string, mixed> $payload Payload.
 * @return true|WP_Error
 */
function excel_ent_artist_registration_validate_payload( $payload ) {
	$personal = isset( $payload['personal'] ) && is_array( $payload['personal'] ) ? $payload['personal'] : array();
	$perf     = isset( $payload['performance'] ) && is_array( $payload['performance'] ) ? $payload['performance'] : array();
	$media    = isset( $payload['media'] ) && is_array( $payload['media'] ) ? $payload['media'] : array();
	$travel   = isset( $payload['travel'] ) && is_array( $payload['travel'] ) ? $payload['travel'] : array();
	$contact  = isset( $payload['contact_preference'] ) && is_array( $payload['contact_preference'] ) ? $payload['contact_preference'] : array();
	$consent  = isset( $payload['consent'] ) && is_array( $payload['consent'] ) ? $payload['consent'] : array();

	$full_name  = trim( (string) ( $personal['full_name'] ?? '' ) );
	$stage_name = trim( (string) ( $personal['stage_name'] ?? '' ) );
	$email      = trim( (string) ( $personal['email'] ?? '' ) );
	$phone      = trim( (string) ( $personal['phone'] ?? '' ) );
	$address    = trim( (string) ( $personal['registered_address'] ?? '' ) );

	if ( '' === $full_name ) {
		return new WP_Error( 'full_name', __( 'Please enter your full name.', 'excel-ent' ) );
	}
	if ( '' === $stage_name ) {
		return new WP_Error( 'stage_name', __( 'Please enter your stage name.', 'excel-ent' ) );
	}
	if ( '' === $email || ! is_email( $email ) ) {
		return new WP_Error( 'email', __( 'Please enter a valid email address.', 'excel-ent' ) );
	}
	if ( '' === $phone ) {
		return new WP_Error( 'phone', __( 'Please enter your phone number.', 'excel-ent' ) );
	}
	if ( '' === $address ) {
		return new WP_Error( 'address', __( 'Please enter your registered address.', 'excel-ent' ) );
	}

	if ( '' === trim( (string) ( $perf['years_performing'] ?? '' ) ) ) {
		return new WP_Error( 'years', __( 'Please select years performing.', 'excel-ent' ) );
	}
	if ( '' === trim( (string) ( $perf['base_location'] ?? '' ) ) ) {
		return new WP_Error( 'base_location', __( 'Please enter your base location.', 'excel-ent' ) );
	}
	if ( empty( $perf['set_lengths'] ) || ! is_array( $perf['set_lengths'] ) ) {
		return new WP_Error( 'set_length', __( 'Please select at least one performance set length.', 'excel-ent' ) );
	}
	if ( '' === trim( (string) ( $perf['rate_range'] ?? '' ) ) ) {
		return new WP_Error( 'rate', __( 'Please enter your rate / price range.', 'excel-ent' ) );
	}
	if ( empty( $perf['categories'] ) || ! is_array( $perf['categories'] ) ) {
		return new WP_Error( 'categories', __( 'Please select at least one performance category.', 'excel-ent' ) );
	}

	if ( empty( $media['playlist_links'] ) || ! is_array( $media['playlist_links'] ) ) {
		return new WP_Error( 'playlist', __( 'Please add at least one playlist link.', 'excel-ent' ) );
	}
	if ( empty( $media['social_links'] ) || ! is_array( $media['social_links'] ) ) {
		return new WP_Error( 'social', __( 'Please add at least one social media link.', 'excel-ent' ) );
	}
	if ( '' === trim( (string) ( $media['video_link'] ?? '' ) ) ) {
		return new WP_Error( 'video', __( 'Please add a performance video link.', 'excel-ent' ) );
	}
	if ( '' === trim( (string) ( $media['reviews_link'] ?? '' ) ) ) {
		return new WP_Error( 'reviews', __( 'Please add a customer reviews link.', 'excel-ent' ) );
	}

	if ( '' === trim( (string) ( $travel['radius'] ?? '' ) ) ) {
		return new WP_Error( 'travel', __( 'Please select your travel radius.', 'excel-ent' ) );
	}
	if ( '' === trim( (string) ( $travel['technical_requirements'] ?? '' ) ) ) {
		return new WP_Error( 'tech', __( 'Please enter your technical requirements.', 'excel-ent' ) );
	}
	if ( ! in_array( (string) ( $travel['public_liability_insurance'] ?? '' ), array( 'yes', 'no' ), true ) ) {
		return new WP_Error( 'pli', __( 'Please confirm whether you have public liability insurance.', 'excel-ent' ) );
	}
	if ( ! in_array( (string) ( $travel['pat_tested'] ?? '' ), array( 'yes', 'no' ), true ) ) {
		return new WP_Error( 'pat', __( 'Please confirm whether all equipment is P.A.T. tested.', 'excel-ent' ) );
	}

	if ( '' === trim( (string) ( $payload['bio'] ?? '' ) ) ) {
		return new WP_Error( 'bio', __( 'Please tell us about yourself.', 'excel-ent' ) );
	}

	if ( ! in_array( (string) ( $contact['method'] ?? '' ), array( 'email', 'phone', 'text' ), true ) ) {
		return new WP_Error( 'contact_pref', __( 'Please choose how we should contact you.', 'excel-ent' ) );
	}
	if ( '' === trim( (string) ( $contact['details'] ?? '' ) ) ) {
		return new WP_Error( 'contact_details', __( 'Please add contact preference details.', 'excel-ent' ) );
	}

	if ( empty( $consent['website_content_sharing'] ) ) {
		return new WP_Error( 'consent', __( 'Please agree for your content to be shared on the Excel website.', 'excel-ent' ) );
	}

	return true;
}

/**
 * AJAX: submit Register as Artist form.
 */
function excel_ent_ajax_artist_registration() {
	check_ajax_referer( 'excel_ent_artist_registration', 'nonce' );

	$payload = excel_ent_artist_registration_build_payload();
	$valid   = excel_ent_artist_registration_validate_payload( $payload );
	if ( is_wp_error( $valid ) ) {
		wp_send_json_error(
			array(
				'message' => $valid->get_error_message(),
				'field'   => $valid->get_error_code(),
			),
			400
		);
	}

	$headshots = excel_ent_artist_registration_collect_files( 'excel_ent_headshot', 3 );
	if ( is_wp_error( $headshots ) ) {
		wp_send_json_error(
			array(
				'message' => $headshots->get_error_message(),
				'field'   => 'headshots',
			),
			400
		);
	}
	if ( empty( $headshots ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'Please upload at least one headshot.', 'excel-ent' ),
				'field'   => 'headshots',
			),
			400
		);
	}

	$photos = excel_ent_artist_registration_collect_files( 'excel_ent_photos', 8 );
	if ( is_wp_error( $photos ) ) {
		wp_send_json_error(
			array(
				'message' => $photos->get_error_message(),
				'field'   => 'photos',
			),
			400
		);
	}
	if ( empty( $photos ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'Please upload at least one performance photo.', 'excel-ent' ),
				'field'   => 'photos',
			),
			400
		);
	}

	$headshot_media = excel_ent_artist_registration_persist_uploads( $headshots );
	if ( is_wp_error( $headshot_media ) ) {
		wp_send_json_error(
			array(
				'message' => $headshot_media->get_error_message(),
				'field'   => 'headshots',
			),
			400
		);
	}
	$photo_media = excel_ent_artist_registration_persist_uploads( $photos );
	if ( is_wp_error( $photo_media ) ) {
		wp_send_json_error(
			array(
				'message' => $photo_media->get_error_message(),
				'field'   => 'photos',
			),
			400
		);
	}

	$payload['media']['headshots']          = $headshot_media;
	$payload['media']['performance_photos'] = $photo_media;

	$idem = isset( $_POST['idempotency_key'] ) ? sanitize_text_field( wp_unslash( $_POST['idempotency_key'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	if ( '' === $idem ) {
		$idem = wp_generate_uuid4();
	}

	$remote = excel_ent_artist_registration_remote_post( $payload, $idem );

	if ( ! empty( $remote['error'] ) ) {
		$message = __( 'Something went wrong. Please try again.', 'excel-ent' );
		if ( 'missing_api_key' === $remote['error'] ) {
			$message = __( 'Artist registration is temporarily unavailable. Please try again later.', 'excel-ent' );
		}
		wp_send_json_error(
			array(
				'message' => $message,
			),
			502
		);
	}

	$body    = is_array( $remote['body'] ) ? $remote['body'] : array();
	$data    = isset( $body['data'] ) && is_array( $body['data'] ) ? $body['data'] : $body;
	$code    = (int) $remote['code'];
	$message = '';

	if ( ! empty( $data['message'] ) ) {
		$message = (string) $data['message'];
	} elseif ( ! empty( $body['error']['message'] ) && is_array( $body['error'] ) ) {
		$message = (string) $body['error']['message'];
	} elseif ( ! empty( $body['error'] ) && is_string( $body['error'] ) ) {
		$message = (string) $body['error'];
	} elseif ( ! empty( $body['message'] ) ) {
		$message = (string) $body['message'];
	}

	if ( $remote['ok'] ) {
		if ( '' === $message ) {
			$message = __( 'Our team will get back to you within 24 hours.', 'excel-ent' );
		}

		/**
		 * Fires after a successful artist registration API response.
		 *
		 * @param array $data   Response data.
		 * @param array $payload Request payload.
		 */
		do_action( 'excel_ent_artist_registration_submitted', $data, $payload );

		wp_send_json_success(
			array(
				'message'   => $message,
				'reference' => isset( $data['reference'] ) ? (string) $data['reference'] : '',
				'id'        => isset( $data['id'] ) ? (string) $data['id'] : '',
				'status'    => isset( $data['status'] ) ? (string) $data['status'] : '',
			)
		);
	}

	$fields = array();
	if ( ! empty( $data['fields'] ) && is_array( $data['fields'] ) ) {
		$fields = $data['fields'];
	} elseif ( ! empty( $body['error']['fields'] ) && is_array( $body['error']['fields'] ) ) {
		$fields = $body['error']['fields'];
	}

	if ( $fields ) {
		$flat = array();
		foreach ( $fields as $field_errors ) {
			if ( is_array( $field_errors ) ) {
				foreach ( $field_errors as $field_error ) {
					$field_error = trim( (string) $field_error );
					if ( '' !== $field_error ) {
						$flat[] = $field_error;
					}
				}
			} else {
				$field_error = trim( (string) $field_errors );
				if ( '' !== $field_error ) {
					$flat[] = $field_error;
				}
			}
		}
		if ( $flat ) {
			$message = implode( ' ', array_unique( $flat ) );
		}
	}

	if ( '' === $message ) {
		if ( 404 === $code ) {
			$message = __( 'Artist registration API was not found. Please confirm the endpoint URL with Smartflows.', 'excel-ent' );
		} elseif ( 429 === $code ) {
			$message = __( 'Too many submissions. Please wait and try again later.', 'excel-ent' );
		} elseif ( 413 === $code ) {
			$message = __( 'Your uploads are too large. Please reduce image sizes and try again.', 'excel-ent' );
		} elseif ( 401 === $code || 403 === $code ) {
			$message = __( 'Artist registration is temporarily unavailable. Please try again later.', 'excel-ent' );
		} elseif ( 500 === $code ) {
			$message = __( 'The registration service could not store your application. Please try again shortly.', 'excel-ent' );
		} else {
			$message = __( 'We could not submit your registration. Please check the form and try again.', 'excel-ent' );
		}
	}

	wp_send_json_error(
		array(
			'message' => $message,
			'fields'  => $fields,
			'code'    => $code,
		),
		( $code >= 400 && $code < 600 ) ? $code : 400
	);
}
add_action( 'wp_ajax_excel_ent_artist_registration', 'excel_ent_ajax_artist_registration' );
add_action( 'wp_ajax_nopriv_excel_ent_artist_registration', 'excel_ent_ajax_artist_registration' );
