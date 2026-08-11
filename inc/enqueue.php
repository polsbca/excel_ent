<?php
/**
 * Enqueue scripts and styles.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue front-end assets.
 */
function excel_ent_enqueue_assets() {
	wp_enqueue_style(
		'excel-ent-fonts',
		'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400&family=Nosifer&family=Open+Sans:ital,wdth,wght@0,75,300;0,75,400;0,75,600;0,75,700;0,75,800;0,100,300;0,100,400;0,100,600;0,100,700&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'excel-ent-lenis',
		'https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.css',
		array(),
		'1.3.26'
	);

	wp_enqueue_style(
		'excel-ent-main',
		EXCEL_ENT_URI . '/assets/css/main.css',
		array( 'excel-ent-fonts', 'excel-ent-lenis' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-header-footer',
		EXCEL_ENT_URI . '/assets/css/header-footer.css',
		array( 'excel-ent-main' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-animations',
		EXCEL_ENT_URI . '/assets/css/animations.css',
		array( 'excel-ent-header-footer' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-hero',
		EXCEL_ENT_URI . '/assets/css/hero.css',
		array( 'excel-ent-animations' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-awards',
		EXCEL_ENT_URI . '/assets/css/awards.css',
		array( 'excel-ent-hero' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-artists',
		EXCEL_ENT_URI . '/assets/css/artists.css',
		array( 'excel-ent-awards' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-excel-way',
		EXCEL_ENT_URI . '/assets/css/excel-way.css',
		array( 'excel-ent-artists' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-venues',
		EXCEL_ENT_URI . '/assets/css/venues.css',
		array( 'excel-ent-excel-way' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-newsletter',
		EXCEL_ENT_URI . '/assets/css/newsletter.css',
		array( 'excel-ent-venues' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-services',
		EXCEL_ENT_URI . '/assets/css/services.css',
		array( 'excel-ent-newsletter' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-blog',
		EXCEL_ENT_URI . '/assets/css/blog.css',
		array( 'excel-ent-services' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-cta-neon',
		EXCEL_ENT_URI . '/assets/css/cta-neon.css',
		array( 'excel-ent-blog' ),
		EXCEL_ENT_VERSION
	);

	if ( is_front_page() ) {
		wp_enqueue_style(
			'excel-ent-front-page-tablet',
			EXCEL_ENT_URI . '/assets/css/front-page-tablet.css',
			array( 'excel-ent-cta-neon' ),
			EXCEL_ENT_VERSION
		);
	}

	wp_enqueue_style(
		'excel-ent-explore-artists',
		EXCEL_ENT_URI . '/assets/css/explore-artists.css',
		array( 'excel-ent-cta-neon' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-artist-page',
		EXCEL_ENT_URI . '/assets/css/artist-page.css',
		array( 'excel-ent-explore-artists' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-about-page',
		EXCEL_ENT_URI . '/assets/css/about-page.css',
		array( 'excel-ent-artist-page' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-package-page',
		EXCEL_ENT_URI . '/assets/css/package-page.css',
		array( 'excel-ent-about-page' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-contact-page',
		EXCEL_ENT_URI . '/assets/css/contact-page.css',
		array( 'excel-ent-package-page' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-search-page',
		EXCEL_ENT_URI . '/assets/css/search-page.css',
		array( 'excel-ent-contact-page' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-button-hovers',
		EXCEL_ENT_URI . '/assets/css/button-hovers.css',
		array( 'excel-ent-search-page', 'excel-ent-header-footer' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_script(
		'excel-ent-lenis',
		'https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js',
		array(),
		'1.3.26',
		true
	);

	wp_enqueue_script(
		'excel-ent-main',
		EXCEL_ENT_URI . '/assets/js/main.js',
		array( 'excel-ent-lenis' ),
		EXCEL_ENT_VERSION,
		true
	);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'excel_ent_enqueue_assets' );