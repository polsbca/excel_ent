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
	if ( has_custom_logo() ) {
		the_custom_logo();
		return;
	}
	?>
	<a class="custom-logo-link site-logo site-logo--header" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
		<img
			class="custom-logo"
			src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/logo/logo-header.svg' ); ?>"
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
 * Fallback menu when no primary menu is assigned.
 */
function excel_ent_fallback_menu() {
	$items = array(
		array(
			'url'   => home_url( '/' ),
			'label' => __( 'Home', 'excel-ent' ),
			'home'  => true,
		),
		array(
			'url'   => home_url( '/about-us/' ),
			'label' => __( 'About Us', 'excel-ent' ),
			'home'  => false,
		),
		array(
			'url'   => home_url( '/explore-artists/' ),
			'label' => __( 'Explore Artists', 'excel-ent' ),
			'home'  => false,
			'explore_artists' => true,
		),
		array(
			'url'   => home_url( '/packages/' ),
			'label' => __( 'Event Packages', 'excel-ent' ),
			'home'  => false,
		),
		array(
			'url'   => home_url( '/contact/' ),
			'label' => __( 'Contact Us', 'excel-ent' ),
			'home'  => false,
		),
	);

	echo '<ul id="primary-menu" class="menu">';
	foreach ( $items as $item ) {
		$current = false;
		if ( ! empty( $item['home'] ) ) {
			$current = is_front_page();
		} elseif ( ! empty( $item['explore_artists'] ) ) {
			$current = excel_ent_is_explore_artists_page();
		}

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
		__( 'Solo Artists', 'excel-ent' )   => home_url( '/solo-artists/' ),
		__( 'Duos', 'excel-ent' )           => home_url( '/duos/' ),
		__( 'Bands', 'excel-ent' )          => home_url( '/bands/' ),
		__( 'Tribute Acts', 'excel-ent' )   => home_url( '/tribute-acts/' ),
		__( 'DJ Nights', 'excel-ent' )      => home_url( '/dj-nights/' ),
		__( 'Celebrity Acts', 'excel-ent' ) => home_url( '/celebrity-acts/' ),
	);
}

/**
 * Default Services footer links.
 *
 * @return array<string, string>
 */
function excel_ent_default_services_links() {
	return array(
		__( 'Wedding Packages', 'excel-ent' )    => home_url( '/wedding-packages/' ),
		__( 'Corporate Events', 'excel-ent' )    => home_url( '/corporate-events/' ),
		__( 'Pub Nights', 'excel-ent' )          => home_url( '/pub-nights/' ),
		__( 'Themed Nights', 'excel-ent' )       => home_url( '/themed-nights/' ),
		__( 'Artist Registration', 'excel-ent' ) => home_url( '/artist-registration/' ),
		__( 'Venue Registration', 'excel-ent' )  => home_url( '/venue-registration/' ),
	);
}

/**
 * Default Company footer links.
 *
 * @return array<string, string>
 */
function excel_ent_default_company_links() {
	return array(
		__( 'About Us', 'excel-ent' )            => home_url( '/about-us/' ),
		__( 'Contact Us', 'excel-ent' )          => home_url( '/contact/' ),
		__( 'Ideas & Advice', 'excel-ent' )      => home_url( '/ideas-advice/' ),
		__( 'Terms & Conditions', 'excel-ent' )  => home_url( '/terms-conditions/' ),
		__( 'Privacy Policy', 'excel-ent' )      => home_url( '/privacy-policy/' ),
		__( 'Celebrity Acts', 'excel-ent' )      => home_url( '/celebrity-acts/' ),
	);
}

/**
 * Render a footer menu column.
 *
 * @param string               $location Menu location.
 * @param string               $title    Column title.
 * @param array<string,string> $fallback Fallback label => URL pairs.
 */
function excel_ent_footer_column( $location, $title, $fallback = array() ) {
	?>
	<div class="footer-column">
		<p class="footer-column__title"><?php echo esc_html( $title ); ?></p>
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
			$index = 0;
			foreach ( $fallback as $label => $url ) {
				printf(
					'<li class="%1$s"><a href="%2$s">%3$s</a></li>',
					0 === $index ? 'is-active' : '',
					esc_url( $url ),
					esc_html( $label )
				);
				++$index;
			}
			echo '</ul>';
		}
		?>
	</div>
	<?php
}
