<?php
/**
 * Excel Ent theme functions and definitions.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'EXCEL_ENT_VERSION', '1.9.626' );
define( 'EXCEL_ENT_DIR', get_template_directory() );
define( 'EXCEL_ENT_URI', get_template_directory_uri() );

require_once EXCEL_ENT_DIR . '/inc/api-artists.php';
require_once EXCEL_ENT_DIR . '/inc/setup.php';
require_once EXCEL_ENT_DIR . '/inc/post-types.php';
require_once EXCEL_ENT_DIR . '/inc/newsletter.php';
require_once EXCEL_ENT_DIR . '/inc/package-enquiry.php';
require_once EXCEL_ENT_DIR . '/inc/enqueue.php';
require_once EXCEL_ENT_DIR . '/inc/template-tags.php';