<?php
/**
 * Theme setup.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Sets up theme defaults and registers support for WordPress features.
 */
function excel_ent_setup() {
	load_theme_textdomain( 'excel-ent', EXCEL_ENT_DIR . '/languages' );

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 63,
			'width'       => 100,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);
	add_theme_support(
		'custom-background',
		array(
			'default-color' => 'eef1f4',
		)
	);
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/editor.css' );

	register_nav_menus(
		array(
			'primary'              => __( 'Primary Menu', 'excel-ent' ),
			'footer-entertainment' => __( 'Footer — Entertainment', 'excel-ent' ),
			'footer-services'      => __( 'Footer — Services', 'excel-ent' ),
			'footer-company'       => __( 'Footer — Company', 'excel-ent' ),
		)
	);

	add_image_size( 'excel-ent-hero', 1920, 1080, true );
	add_image_size( 'excel-ent-card', 800, 560, true );
}
add_action( 'after_setup_theme', 'excel_ent_setup' );

/**
 * Register widget areas.
 */
function excel_ent_widgets_init() {
	register_sidebar(
		array(
			'name'          => __( 'Footer Widgets', 'excel-ent' ),
			'id'            => 'footer-1',
			'description'   => __( 'Widgets shown in the site footer.', 'excel-ent' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'excel_ent_widgets_init' );

/**
 * Set content width.
 */
function excel_ent_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'excel_ent_content_width', 720 );
}
add_action( 'after_setup_theme', 'excel_ent_content_width', 0 );

/**
 * Header artist search is not a WP post search — force empty results
 * so the Figma no-results state (1299:11417) can render.
 *
 * @param WP_Query $query Main query.
 */
function excel_ent_artist_search_empty_query( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_search() ) {
		return;
	}

	// Until artists are a queryable post type, never treat pages/posts as matches.
	$query->set( 'post__in', array( 0 ) );
	$query->set( 'posts_per_page', 0 );
}
add_action( 'pre_get_posts', 'excel_ent_artist_search_empty_query' );

/**
 * Keep footer "About Us" pointing at /about-us/ when a WP menu is assigned.
 *
 * @param array    $items Menu items.
 * @param stdClass $args  Menu args.
 * @return array
 */
function excel_ent_fix_footer_about_us_link( $items, $args ) {
	if ( empty( $args->theme_location ) || 'footer-company' !== $args->theme_location ) {
		return $items;
	}

	$about_url = home_url( '/about-us/' );
	foreach ( $items as $item ) {
		$title = isset( $item->title ) ? trim( wp_strip_all_tags( $item->title ) ) : '';
		if ( 0 === strcasecmp( $title, 'About Us' ) ) {
			$item->url = $about_url;
		}
	}

	return $items;
}
add_filter( 'wp_nav_menu_objects', 'excel_ent_fix_footer_about_us_link', 10, 2 );