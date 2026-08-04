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
		'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400&family=Open+Sans:ital,wdth,wght@0,75,300;0,75,400;0,75,600;0,75,700;0,75,800;0,100,300;0,100,400;0,100,600;0,100,700&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'excel-ent-main',
		EXCEL_ENT_URI . '/assets/css/main.css',
		array( 'excel-ent-fonts' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-header-footer',
		EXCEL_ENT_URI . '/assets/css/header-footer.css',
		array( 'excel-ent-main' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_script(
		'excel-ent-main',
		EXCEL_ENT_URI . '/assets/js/main.js',
		array(),
		EXCEL_ENT_VERSION,
		true
	);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'excel_ent_enqueue_assets' );