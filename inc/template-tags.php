<?php
/**
 * Custom template tags.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Prints HTML with meta information for the current post.
 */
function excel_ent_posted_on() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';

	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated screen-reader-text" datetime="%3$s">%4$s</time>';
	}

	$time_string = sprintf(
		$time_string,
		esc_attr( get_the_date( DATE_W3C ) ),
		esc_html( get_the_date() ),
		esc_attr( get_the_modified_date( DATE_W3C ) ),
		esc_html( get_the_modified_date() )
	);

	printf(
		'<span class="posted-on">%s</span>',
		$time_string // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	);
}

/**
 * Prints HTML with author information.
 */
function excel_ent_posted_by() {
	printf(
		'<span class="byline">%1$s <a class="url fn n" href="%2$s">%3$s</a></span>',
		esc_html__( 'By', 'excel-ent' ),
		esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
		esc_html( get_the_author() )
	);
}

/**
 * Displays an optional post thumbnail.
 *
 * @param string $size Image size.
 */
function excel_ent_post_thumbnail( $size = 'excel-ent-card' ) {
	if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
		return;
	}

	if ( is_singular() ) :
		?>
		<div class="post-thumbnail">
			<?php the_post_thumbnail( $size ); ?>
		</div>
		<?php
	else :
		?>
		<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
			<?php the_post_thumbnail( $size ); ?>
		</a>
		<?php
	endif;
}

/**
 * Header logo (custom logo or Figma asset fallback).
 */
function excel_ent_header_logo() {
	?>
	<a class="custom-logo-link site-logo site-logo--header" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
		<img
			class="custom-logo"
			src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/logo/logo-header.png' ); ?>"
			alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>"
			width="100"
			height="63"
			decoding="async"
		>
	</a>
	<?php
}

/**
 * Footer logo (custom logo or Figma asset fallback).
 */
function excel_ent_footer_logo() {
	?>
	<a class="site-logo site-logo--footer" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
		<img
			src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/logo/logo-footer.png' ); ?>"
			alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>"
			width="347"
			height="218"
			decoding="async"
		>
	</a>
	<?php
}

/**
 * Phone number for header CTA.
 *
 * @return string
 */
function excel_ent_get_phone_number() {
	return (string) get_theme_mod( 'excel_ent_phone', '+44 0000 000000' );
}

/**
 * Quote page URL for header CTA.
 *
 * @return string
 */
function excel_ent_get_quote_url() {
	$url = get_theme_mod( 'excel_ent_quote_url', '' );
	if ( $url ) {
		return $url;
	}

	$page = get_page_by_path( 'get-a-quote' );
	if ( ! $page ) {
		$page = get_page_by_path( 'contact' );
	}

	return $page ? get_permalink( $page ) : home_url( '/contact/' );
}

/**
 * Whether the current request is the Explore Artists listing page.
 */
function excel_ent_is_explore_artists_page() {
	return is_page_template( 'page-explore-artists.php' ) || is_page( 'explore-artists' );
}

/**
 * Whether the current request is an Artist profile page.
 */
function excel_ent_is_artist_page() {
	return is_page_template( 'page-artist.php' );
}

/**
 * Whether the current request is the About page.
 */
function excel_ent_is_about_page() {
	return is_page_template( 'page-about.php' ) || is_page( 'about-us' ) || is_page( 'about' );
}

/**
 * Whether the current request is the Packages page.
 */
function excel_ent_is_package_page() {
	return is_page_template( 'page-package.php' ) || is_page( 'packages' ) || is_page( 'event-packages' );
}

/**
 * Whether the current request is the Contact Us page.
 */
function excel_ent_is_contact_page() {
	return is_page_template( 'page-contactus.php' ) || is_page( 'contact' ) || is_page( 'contact-us' );
}

/**
 * Contact Us page URL, optionally with a fragment (e.g. quick-contacts, talent).
 *
 * @param string $fragment Optional hash target without "#".
 * @return string
 */
function excel_ent_get_contact_url( $fragment = '' ) {
	$pages = get_posts(
		array(
			'post_type'      => 'page',
			'post_status'    => 'publish',
			'posts_per_page' => 1,
			'fields'         => 'ids',
			'meta_key'       => '_wp_page_template',
			'meta_value'     => 'page-contactus.php',
			'no_found_rows'  => true,
		)
	);

	if ( ! empty( $pages[0] ) ) {
		$url = get_permalink( $pages[0] );
	} else {
		$url = '';
		foreach ( array( 'contact-us', 'contact', 'contactus' ) as $path ) {
			$page = get_page_by_path( $path );
			if ( $page ) {
				$url = get_permalink( $page );
				break;
			}
		}
		if ( ! $url ) {
			$url = home_url( '/contact-us/' );
		}
	}

	$fragment = sanitize_title( (string) $fragment );
	if ( $fragment ) {
		$url = trailingslashit( $url ) . '#' . $fragment;
	}

	return $url;
}

/**
 * Artist profile page URL (Template: Artist).
 *
 * @return string
 */
function excel_ent_get_artist_page_url() {
	$pages = get_posts(
		array(
			'post_type'      => 'page',
			'post_status'    => 'publish',
			'posts_per_page' => 1,
			'fields'         => 'ids',
			'meta_key'       => '_wp_page_template',
			'meta_value'     => 'page-artist.php',
			'no_found_rows'  => true,
		)
	);

	if ( ! empty( $pages[0] ) ) {
		return get_permalink( $pages[0] );
	}

	foreach ( array( 'artist', 'artists/rose-sax', 'rose-sax' ) as $path ) {
		$page = get_page_by_path( $path );
		if ( $page ) {
			return get_permalink( $page );
		}
	}

	return home_url( '/artist/' );
}

/**
 * Explore Artists listing page URL (Template: Explore Artists).
 *
 * @param array $args {
 *     Optional query arguments.
 *
 *     @type string[] $categories Category pill ids (e.g. artist-type, tribute).
 *     @type string[] $tags       Filter tag ids (e.g. irish-music, male-solo).
 * }
 * @return string
 */
function excel_ent_get_explore_artists_url( $args = array() ) {
	$pages = get_posts(
		array(
			'post_type'      => 'page',
			'post_status'    => 'publish',
			'posts_per_page' => 1,
			'fields'         => 'ids',
			'meta_key'       => '_wp_page_template',
			'meta_value'     => 'page-explore-artists.php',
			'no_found_rows'  => true,
		)
	);

	if ( ! empty( $pages[0] ) ) {
		$url = get_permalink( $pages[0] );
	} else {
		$page = get_page_by_path( 'explore-artists' );
		$url  = $page ? get_permalink( $page ) : home_url( '/explore-artists/' );
	}

	if ( ! empty( $args['categories'] ) && is_array( $args['categories'] ) ) {
		$categories = array();
		foreach ( $args['categories'] as $category ) {
			$category = sanitize_key( (string) $category );
			if ( '' !== $category ) {
				$categories[] = $category;
			}
		}
		if ( $categories ) {
			$url = add_query_arg( 'categories', implode( ',', array_unique( $categories ) ), $url );
		}
	}

	if ( ! empty( $args['tags'] ) && is_array( $args['tags'] ) ) {
		$tags = array();
		foreach ( $args['tags'] as $tag ) {
			$tag = sanitize_key( (string) $tag );
			if ( '' !== $tag ) {
				$tags[] = $tag;
			}
		}
		if ( $tags ) {
			$url = add_query_arg( 'tags', implode( ',', array_unique( $tags ) ), $url );
		}
	}

	return $url;
}

/**
 * Build Explore Artists URL args from homepage artists-section card data.
 *
 * @param string $mode     Occasion/artist mode (`occasion`|`artist`).
 * @param string $category Card/filter category id.
 * @param string $tag      Optional explore tag id (child).
 * @return array{categories: string[], tags: string[]}
 */
function excel_ent_artists_section_explore_args( $mode, $category, $tag = '' ) {
	$mode     = sanitize_key( (string) $mode );
	$category = sanitize_key( (string) $category );
	$tag      = sanitize_key( (string) $tag );

	$occasion_map = array(
		'decades'              => 'era',
		'entertainment-events' => 'event',
		'genres-music'         => 'genre',
	);

	$categories = array();
	$tags       = array();

	if ( 'artist' === $mode ) {
		if ( 'tribute' === $category ) {
			$categories[] = 'tribute';
		} elseif ( in_array( $category, array( 'male-solo', 'female-solo', 'duos' ), true ) ) {
			$categories[] = 'artist-type';
			$tags[]       = $category;
		} else {
			$categories[] = 'artist-type';
			$categories[] = 'tribute';
		}
	} else {
		if ( isset( $occasion_map[ $category ] ) ) {
			$categories[] = $occasion_map[ $category ];
		}
		if ( $tag ) {
			$tags[] = $tag;
		}
	}

	return array(
		'categories' => array_values( array_unique( $categories ) ),
		'tags'       => array_values( array_unique( $tags ) ),
	);
}

/**
 * Build Explore Artists URL args from a Most Popular Services card id.
 *
 * @param string $service_id Service card id (e.g. wedding-djs).
 * @return array{categories: string[], tags: string[]}
 */
function excel_ent_services_section_explore_args( $service_id ) {
	$service_id = sanitize_key( (string) $service_id );
	$service_id = preg_replace( '/^featured-/', '', $service_id );

	$map = array(
		'wedding-djs'       => array(
			'categories' => array( 'artist-type' ),
			'tags'       => array( 'djs' ),
		),
		'live-party-bands'  => array(
			'categories' => array( 'artist-type' ),
			'tags'       => array( 'bands' ),
		),
		'solo-acoustic-acts' => array(
			'categories' => array( 'artist-type' ),
			'tags'       => array( 'male-solo', 'female-solo' ),
		),
		'tribute-acts'      => array(
			'categories' => array( 'tribute' ),
			'tags'       => array(),
		),
	);

	if ( isset( $map[ $service_id ] ) ) {
		return $map[ $service_id ];
	}

	return array(
		'categories' => array(),
		'tags'       => array(),
	);
}

/**
 * Fallback menu when no primary menu is assigned.
 */
function excel_ent_fallback_menu() {
	$items = array(
		array(
			'url'   => home_url( '/' ),
			'label' => __( 'Home', 'excel-ent' ),
			'key'   => 'home',
		),
		array(
			'url'   => home_url( '/about-us/' ),
			'label' => __( 'About Us', 'excel-ent' ),
			'key'   => 'about',
		),
		array(
			'url'   => home_url( '/explore-artists/' ),
			'label' => __( 'Explore Artists', 'excel-ent' ),
			'key'   => 'explore_artists',
		),
		array(
			'url'   => home_url( '/packages/' ),
			'label' => __( 'Event Packages', 'excel-ent' ),
			'key'   => 'packages',
		),
		array(
			'url'   => home_url( '/contact/' ),
			'label' => __( 'Contact Us', 'excel-ent' ),
			'key'   => 'contact',
		),
	);

	echo '<ul id="primary-menu" class="menu">';
	foreach ( $items as $item ) {
		$current = excel_ent_is_primary_nav_current( $item['key'], $item['url'] );

		printf(
			'<li class="%1$s"><a href="%2$s">%3$s</a></li>',
			$current ? 'current-menu-item' : '',
			esc_url( $item['url'] ),
			esc_html( $item['label'] )
		);
	}
	echo '</ul>';
}

/**
 * Whether a primary nav item should be marked current for this request.
 *
 * @param string $key Optional semantic key (home|about|explore_artists|packages|contact).
 * @param string $url Menu item URL.
 * @return bool
 */
function excel_ent_is_primary_nav_current( $key = '', $url = '' ) {
	$key = (string) $key;
	$url = untrailingslashit( (string) $url );

	switch ( $key ) {
		case 'home':
			return is_front_page() || is_search();
		case 'about':
			return excel_ent_is_about_page();
		case 'explore_artists':
			return excel_ent_is_explore_artists_page();
		case 'packages':
			return excel_ent_is_package_page();
		case 'contact':
			return excel_ent_is_contact_page();
	}

	if ( '' === $url ) {
		return false;
	}

	$home = untrailingslashit( home_url( '/' ) );
	if ( $url === $home || $url === untrailingslashit( home_url() ) ) {
		return is_front_page();
	}

	$path = wp_parse_url( $url, PHP_URL_PATH );
	$path = is_string( $path ) ? strtolower( trim( $path, '/' ) ) : '';

	if ( '' === $path ) {
		return is_front_page();
	}

	if ( in_array( $path, array( 'about-us', 'about' ), true ) ) {
		return excel_ent_is_about_page();
	}
	if ( in_array( $path, array( 'explore-artists', 'artists' ), true ) ) {
		return excel_ent_is_explore_artists_page();
	}
	if ( in_array( $path, array( 'packages', 'event-packages', 'package' ), true ) ) {
		return excel_ent_is_package_page();
	}
	if ( in_array( $path, array( 'contact', 'contact-us', 'contactus' ), true ) ) {
		return excel_ent_is_contact_page();
	}
	if ( 'artist' === $path ) {
		return excel_ent_is_artist_page();
	}

	/* Generic match for custom links pointing at the current request URL. */
	if ( is_singular() ) {
		$permalink = untrailingslashit( (string) get_permalink() );
		return $url && $permalink && $url === $permalink;
	}

	return false;
}

/**
 * Ensure primary menu current classes work for custom links / page templates.
 *
 * @param string[] $classes Menu item classes.
 * @param WP_Post  $item    Menu item.
 * @param stdClass $args    wp_nav_menu() args.
 * @param int      $depth   Depth.
 * @return string[]
 */
function excel_ent_primary_nav_css_class( $classes, $item, $args, $depth ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter
	if ( empty( $args->theme_location ) || 'primary' !== $args->theme_location ) {
		return $classes;
	}

	$title = strtolower( trim( wp_strip_all_tags( $item->title ) ) );
	$key   = '';
	if ( in_array( $title, array( 'home', 'homepage' ), true ) ) {
		$key = 'home';
	} elseif ( in_array( $title, array( 'about us', 'about' ), true ) ) {
		$key = 'about';
	} elseif ( in_array( $title, array( 'explore artists', 'artists' ), true ) ) {
		$key = 'explore_artists';
	} elseif ( in_array( $title, array( 'event packages', 'packages', 'package' ), true ) ) {
		$key = 'packages';
	} elseif ( in_array( $title, array( 'contact us', 'contact' ), true ) ) {
		$key = 'contact';
	}

	if ( excel_ent_is_primary_nav_current( $key, $item->url ) ) {
		$classes[] = 'current-menu-item';
		$classes[] = 'current_page_item';
	}

	return array_values( array_unique( $classes ) );
}
add_filter( 'nav_menu_css_class', 'excel_ent_primary_nav_css_class', 20, 4 );

/**
 * Point legacy Explore Artists menu links at /explore-artists/.
 *
 * @param array    $items Menu items.
 * @param stdClass $args  wp_nav_menu() arguments.
 * @return array
 */
function excel_ent_primary_menu_objects( $items, $args ) {
	if ( empty( $args->theme_location ) || 'primary' !== $args->theme_location ) {
		return $items;
	}

	$explore_url  = home_url( '/explore-artists/' );
	$legacy_url   = home_url( '/artists/' );
	$explore_slug = strtolower( __( 'Explore Artists', 'excel-ent' ) );

	foreach ( $items as $item ) {
		$item_url   = untrailingslashit( $item->url );
		$legacy     = untrailingslashit( $legacy_url );
		$item_title = strtolower( trim( wp_strip_all_tags( $item->title ) ) );

		if ( $item_url === $legacy || $explore_slug === $item_title ) {
			$item->url = $explore_url;
		}
	}

	return $items;
}
add_filter( 'wp_nav_menu_objects', 'excel_ent_primary_menu_objects', 10, 2 );

/**
 * Default Entertainment footer links.
 *
 * @return array<string, string>
 */
function excel_ent_default_entertainment_links() {
	return array(
		__( 'Artists & Tributes', 'excel-ent' )     => excel_ent_get_explore_artists_url(
			array(
				'categories' => array( 'artist-type' ),
				'tags'       => array( 'tribute' ),
			)
		),
		__( 'Decades', 'excel-ent' )                => excel_ent_get_explore_artists_url(
			array(
				'categories' => array( 'era' ),
			)
		),
		__( 'Entertainment & Events', 'excel-ent' ) => excel_ent_get_explore_artists_url(
			array(
				'categories' => array( 'event' ),
			)
		),
		__( 'Genres & Music', 'excel-ent' )         => excel_ent_get_explore_artists_url(
			array(
				'categories' => array( 'genre' ),
			)
		),
	);
}

/**
 * Default Services footer links.
 *
 * @return array<string, string>
 */
function excel_ent_default_services_links() {
	return array(
		__( 'Wedding Packages', 'excel-ent' )    => excel_ent_get_explore_artists_url(
			array(
				'categories' => array( 'event' ),
				'tags'       => array( 'wedding' ),
			)
		),
		__( 'Corporate Events', 'excel-ent' )    => excel_ent_get_explore_artists_url(
			array(
				'categories' => array( 'event' ),
				'tags'       => array( 'corporate' ),
			)
		),
		__( 'Pub Nights', 'excel-ent' )           => home_url( '/pub-nights/' ),
		__( 'Themed Nights', 'excel-ent' )        => excel_ent_get_explore_artists_url(
			array(
				'categories' => array( 'event' ),
				'tags'       => array( 'themed' ),
			)
		),
		__( 'Artist Registration', 'excel-ent' )  => excel_ent_get_contact_url( 'talent' ),
	);
}

/**
 * Default Company footer links.
 *
 * @return array<string, string>
 */
function excel_ent_default_company_links() {
	return array(
		__( 'About Us', 'excel-ent' )           => home_url( '/about-us/' ),
		__( 'Contact Us', 'excel-ent' )         => excel_ent_get_contact_url(),
		__( 'Ideas & Advice', 'excel-ent' )     => home_url( '/#blog' ),
		__( 'Terms & Conditions', 'excel-ent' ) => home_url( '/terms-conditions/' ),
		__( 'Privacy Policy', 'excel-ent' )     => home_url( '/privacy-policy/' ),
		__( 'Celebrity Acts', 'excel-ent' )     => excel_ent_get_explore_artists_url(
			array(
				'tags' => array( 'celebrity-acts' ),
			)
		),
	);
}

/**
 * Render a footer menu column.
 *
 * @param string               $location Menu location.
 * @param string               $title    Column title.
 * @param array<string,string> $fallback Fallback label => URL pairs.
 * @param array<string,mixed>  $args     Optional. `open` => bool for mobile accordion default.
 */
function excel_ent_footer_column( $location, $title, $fallback = array(), $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'open' => false,
		)
	);

	$panel_id = 'footer-panel-' . sanitize_html_class( $location );
	$is_open  = (bool) $args['open'];
	$icon_uri = EXCEL_ENT_URI . '/assets/images/footer';
	?>
	<div class="footer-column<?php echo $is_open ? ' is-open' : ''; ?>" data-footer-acc>
		<button
			type="button"
			class="footer-column__toggle"
			data-footer-trigger
			aria-expanded="<?php echo $is_open ? 'true' : 'false'; ?>"
			aria-controls="<?php echo esc_attr( $panel_id ); ?>"
		>
			<span class="footer-column__title"><?php echo esc_html( $title ); ?></span>
			<span class="footer-column__icon" aria-hidden="true">
				<img
					class="footer-column__icon-add"
					src="<?php echo esc_url( $icon_uri . '/icon-add.svg' ); ?>"
					alt=""
					width="24"
					height="24"
					decoding="async"
				>
				<img
					class="footer-column__icon-close"
					src="<?php echo esc_url( $icon_uri . '/icon-close.svg' ); ?>"
					alt=""
					width="24"
					height="24"
					decoding="async"
				>
			</span>
		</button>
		<div
			class="footer-column__panel"
			id="<?php echo esc_attr( $panel_id ); ?>"
			data-footer-panel
			<?php echo $is_open ? '' : ' hidden'; ?>
		>
			<?php
			if ( has_nav_menu( $location ) ) {
				wp_nav_menu(
					array(
						'theme_location' => $location,
						'container'      => false,
						'menu_class'     => 'footer-column__menu',
						'depth'          => 1,
					)
				);
			} else {
				echo '<ul class="footer-column__menu">';
				$current_path = '';
				if ( ! empty( $_SERVER['REQUEST_URI'] ) ) {
					$current_path = untrailingslashit( (string) wp_parse_url( wp_unslash( $_SERVER['REQUEST_URI'] ), PHP_URL_PATH ) );
				}
				foreach ( $fallback as $label => $url ) {
					$link_path  = untrailingslashit( (string) wp_parse_url( $url, PHP_URL_PATH ) );
					$is_current = ( $link_path && $current_path && $link_path === $current_path );
					printf(
						'<li%1$s><a href="%2$s">%3$s</a></li>',
						$is_current ? ' class="is-active current-menu-item"' : '',
						esc_url( $url ),
						esc_html( $label )
					);
				}
				echo '</ul>';
			}
			?>
		</div>
	</div>
	<?php
}
