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
		'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'excel-ent-main',
		EXCEL_ENT_URI . '/assets/css/main.css',
		array( 'excel-ent-fonts' ),
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