<?php
/**
 * Newsletter signup — AJAX + subscriber storage.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register newsletter subscriber CPT (admin-only).
 */
function excel_ent_register_newsletter_subscriber_cpt() {
	$labels = array(
		'name'               => __( 'Newsletter Subscribers', 'excel-ent' ),
		'singular_name'      => __( 'Subscriber', 'excel-ent' ),
		'menu_name'          => __( 'Newsletter', 'excel-ent' ),
		'add_new'            => __( 'Add New', 'excel-ent' ),
		'add_new_item'       => __( 'Add Subscriber', 'excel-ent' ),
		'edit_item'          => __( 'Edit Subscriber', 'excel-ent' ),
		'new_item'           => __( 'New Subscriber', 'excel-ent' ),
		'view_item'          => __( 'View Subscriber', 'excel-ent' ),
		'search_items'       => __( 'Search Subscribers', 'excel-ent' ),
		'not_found'          => __( 'No subscribers found.', 'excel-ent' ),
		'not_found_in_trash' => __( 'No subscribers found in Trash.', 'excel-ent' ),
		'all_items'          => __( 'All Subscribers', 'excel-ent' ),
	);

	register_post_type(
		'newsletter_sub',
		array(
			'labels'              => $labels,
			'public'              => false,
			'publicly_queryable'  => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_nav_menus'   => false,
			'show_in_admin_bar'   => false,
			'show_in_rest'        => false,
			'menu_position'       => 23,
			'menu_icon'           => 'dashicons-email-alt',
			'capability_type'     => 'post',
			'hierarchical'        => false,
			'supports'            => array( 'title' ),
			'has_archive'         => false,
			'rewrite'             => false,
			'exclude_from_search' => true,
		)
	);
}
add_action( 'init', 'excel_ent_register_newsletter_subscriber_cpt' );

/**
 * Whether an email is already subscribed.
 *
 * @param string $email Email.
 * @return bool
 */
function excel_ent_newsletter_email_exists( $email ) {
	global $wpdb;

	$found = $wpdb->get_var(
		$wpdb->prepare(
			"SELECT ID FROM {$wpdb->posts} WHERE post_type = %s AND post_status = 'publish' AND post_title = %s LIMIT 1",
			'newsletter_sub',
			$email
		)
	);

	return ! empty( $found );
}

/**
 * AJAX: subscribe to newsletter.
 */
function excel_ent_ajax_newsletter_subscribe() {
	check_ajax_referer( 'excel_ent_newsletter', 'nonce' );

	/* Honeypot — bots fill this; humans leave it empty */
	$honeypot = isset( $_POST['excel_ent_website'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_website'] ) ) : '';
	if ( '' !== $honeypot ) {
		wp_send_json_success(
			array(
				'message' => __( 'Thanks — you’re subscribed.', 'excel-ent' ),
			)
		);
	}

	$email_raw = '';
	if ( isset( $_POST['email'] ) ) {
		$email_raw = wp_unslash( $_POST['email'] );
	} elseif ( isset( $_POST['excel_ent_newsletter_email'] ) ) {
		$email_raw = wp_unslash( $_POST['excel_ent_newsletter_email'] );
	}
	$email = sanitize_email( is_string( $email_raw ) ? $email_raw : '' );

	if ( '' === $email ) {
		wp_send_json_error(
			array(
				'message' => __( 'Please enter your email address.', 'excel-ent' ),
				'field'   => 'email',
			),
			400
		);
	}

	if ( ! is_email( $email ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'Please enter a valid email address.', 'excel-ent' ),
				'field'   => 'email',
			),
			400
		);
	}

	$email = strtolower( $email );

	if ( excel_ent_newsletter_email_exists( $email ) ) {
		wp_send_json_success(
			array(
				'message' => __( 'You’re already on the list — thanks!', 'excel-ent' ),
				'already' => true,
			)
		);
	}

	$post_id = wp_insert_post(
		array(
			'post_type'   => 'newsletter_sub',
			'post_title'  => $email,
			'post_status' => 'publish',
			'post_author' => 1,
		),
		true
	);

	if ( is_wp_error( $post_id ) || ! $post_id ) {
		wp_send_json_error(
			array(
				'message' => __( 'Something went wrong. Please try again.', 'excel-ent' ),
			),
			500
		);
	}

	update_post_meta( $post_id, '_excel_ent_subscribed_at', current_time( 'mysql' ) );
	update_post_meta( $post_id, '_excel_ent_subscriber_ip', isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '' );

	/**
	 * Fires after a successful newsletter signup.
	 *
	 * @param int    $post_id Subscriber post ID.
	 * @param string $email   Email address.
	 */
	do_action( 'excel_ent_newsletter_subscribed', $post_id, $email );

	wp_send_json_success(
		array(
			'message' => __( 'Thanks — you’re subscribed.', 'excel-ent' ),
		)
	);
}
add_action( 'wp_ajax_excel_ent_newsletter_subscribe', 'excel_ent_ajax_newsletter_subscribe' );
add_action( 'wp_ajax_nopriv_excel_ent_newsletter_subscribe', 'excel_ent_ajax_newsletter_subscribe' );

/**
 * From headers for newsletter mail.
 *
 * @return string
 */
function excel_ent_newsletter_mail_headers() {
	$site_name = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
	$from      = get_option( 'admin_email' );

	return 'Content-Type: text/plain; charset=UTF-8' . "\r\n" .
		'From: ' . $site_name . ' <' . $from . '>';
}

/**
 * Send confirmation email to the new subscriber.
 *
 * @param int    $post_id Subscriber post ID.
 * @param string $email   Email address.
 */
function excel_ent_newsletter_email_subscriber( $post_id, $email ) {
	if ( ! is_email( $email ) ) {
		return;
	}

	$site_name = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
	$subject   = sprintf(
		/* translators: %s: site name */
		__( 'You’re subscribed to %s', 'excel-ent' ),
		$site_name
	);

	$body = sprintf(
		/* translators: 1: site name, 2: site URL */
		__(
			"Hi,\n\nThanks for subscribing to %1\$s.\n\nYou’ll get weekly emails with available performers, last-minute replacements, and exclusive booking opportunities.\n\nVisit us anytime: %2\$s\n\n— The %1\$s team",
			'excel-ent'
		),
		$site_name,
		home_url( '/' )
	);

	wp_mail( $email, $subject, $body, excel_ent_newsletter_mail_headers() );
}
add_action( 'excel_ent_newsletter_subscribed', 'excel_ent_newsletter_email_subscriber', 10, 2 );

/**
 * Notify site admin of a new newsletter signup.
 *
 * @param int    $post_id Subscriber post ID.
 * @param string $email   Email address.
 */
function excel_ent_newsletter_email_admin( $post_id, $email ) {
	$admin_email = get_option( 'admin_email' );
	if ( ! is_email( $admin_email ) ) {
		return;
	}

	$site_name = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
	$subject   = sprintf(
		/* translators: %s: site name */
		__( '[%s] New newsletter subscriber', 'excel-ent' ),
		$site_name
	);

	$edit_link = admin_url( 'edit.php?post_type=newsletter_sub' );
	$when      = get_post_meta( $post_id, '_excel_ent_subscribed_at', true );
	if ( ! $when ) {
		$when = current_time( 'mysql' );
	}

	$body = sprintf(
		/* translators: 1: subscriber email, 2: datetime, 3: admin list URL */
		__(
			"A new newsletter signup was received.\n\nEmail: %1\$s\nDate: %2\$s\n\nView all subscribers:\n%3\$s",
			'excel-ent'
		),
		$email,
		$when,
		$edit_link
	);

	wp_mail( $admin_email, $subject, $body, excel_ent_newsletter_mail_headers() );
}
add_action( 'excel_ent_newsletter_subscribed', 'excel_ent_newsletter_email_admin', 20, 2 );
