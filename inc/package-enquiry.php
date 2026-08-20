<?php
/**
 * Package enquiry — AJAX + HTML email templates.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load an email HTML template with variables extracted into scope.
 *
 * @param string               $slug Template slug under template-parts/emails/.
 * @param array<string, mixed> $vars Variables for the template.
 * @return string
 */
function excel_ent_get_email_template( $slug, $vars = array() ) {
	$path = EXCEL_ENT_DIR . '/template-parts/emails/' . $slug . '.php';
	if ( ! is_readable( $path ) ) {
		return '';
	}

	// phpcs:ignore WordPress.PHP.DontExtract.extract_extract -- scoped template vars.
	extract( $vars, EXTR_SKIP );

	ob_start();
	include $path;
	return (string) ob_get_clean();
}

/**
 * HTML mail headers for package enquiry emails.
 *
 * @param string $reply_to Optional Reply-To email.
 * @return string[]
 */
function excel_ent_package_enquiry_mail_headers( $reply_to = '' ) {
	$site_name = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
	$from      = get_option( 'admin_email' );

	$headers = array(
		'Content-Type: text/html; charset=UTF-8',
		'From: ' . $site_name . ' <' . $from . '>',
	);

	if ( is_email( $reply_to ) ) {
		$headers[] = 'Reply-To: ' . $reply_to;
	}

	return $headers;
}

/**
 * AJAX: submit package enquiry.
 */
function excel_ent_ajax_package_enquiry() {
	check_ajax_referer( 'excel_ent_package_enquiry', 'nonce' );

	$honeypot = isset( $_POST['excel_ent_website'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_website'] ) ) : '';
	if ( '' !== $honeypot ) {
		wp_send_json_success(
			array(
				'message' => __( 'Thanks — we’ve received your enquiry and will be in touch shortly.', 'excel-ent' ),
			)
		);
	}

	$name    = isset( $_POST['excel_ent_enquiry_name'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_enquiry_name'] ) ) : '';
	$email   = isset( $_POST['excel_ent_enquiry_email'] ) ? sanitize_email( wp_unslash( $_POST['excel_ent_enquiry_email'] ) ) : '';
	$phone   = isset( $_POST['excel_ent_enquiry_phone'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_enquiry_phone'] ) ) : '';
	$package = isset( $_POST['excel_ent_enquiry_package'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_enquiry_package'] ) ) : '';
	$notes   = isset( $_POST['excel_ent_enquiry_notes'] ) ? sanitize_textarea_field( wp_unslash( $_POST['excel_ent_enquiry_notes'] ) ) : '';

	if ( '' === $name ) {
		wp_send_json_error(
			array(
				'message' => __( 'Please enter your full name.', 'excel-ent' ),
				'field'   => 'name',
			),
			400
		);
	}

	$has_email = is_email( $email );
	$has_phone = '' !== $phone;

	if ( ! $has_email && ! $has_phone ) {
		wp_send_json_error(
			array(
				'message' => __( 'Please enter your email address or phone number.', 'excel-ent' ),
				'field'   => 'email',
			),
			400
		);
	}

	if ( '' !== $email && ! $has_email ) {
		wp_send_json_error(
			array(
				'message' => __( 'Please enter a valid email address.', 'excel-ent' ),
				'field'   => 'email',
			),
			400
		);
	}

	if ( '' === $package ) {
		$package = __( 'Not specified', 'excel-ent' );
	}

	$data = array(
		'name'       => $name,
		'email'      => $has_email ? strtolower( $email ) : '',
		'phone'      => $phone,
		'package'    => $package,
		'notes'      => $notes,
		'submitted'  => current_time( 'mysql' ),
		'site_name'  => wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ),
		'site_url'   => home_url( '/' ),
		'logo_url'   => EXCEL_ENT_URI . '/assets/images/logo/logo-header.svg',
		'accent'     => '#f89a42',
		'accent_alt' => '#eb2055',
	);

	/**
	 * Fires after a package enquiry passes validation.
	 *
	 * @param array<string, string> $data Enquiry data.
	 */
	do_action( 'excel_ent_package_enquiry_submitted', $data );

	$admin_ok    = excel_ent_package_enquiry_email_admin( $data );
	$customer_ok = true;
	if ( $has_email ) {
		$customer_ok = excel_ent_package_enquiry_email_customer( $data );
	}

	if ( ! $admin_ok && ! $customer_ok ) {
		wp_send_json_error(
			array(
				'message' => __( 'Something went wrong sending your enquiry. Please try again.', 'excel-ent' ),
			),
			500
		);
	}

	wp_send_json_success(
		array(
			'message' => __( 'Thanks — we’ve received your enquiry and will be in touch shortly.', 'excel-ent' ),
		)
	);
}
add_action( 'wp_ajax_excel_ent_package_enquiry', 'excel_ent_ajax_package_enquiry' );
add_action( 'wp_ajax_nopriv_excel_ent_package_enquiry', 'excel_ent_ajax_package_enquiry' );

/**
 * Email site admin with enquiry details (HTML template).
 *
 * @param array<string, string> $data Enquiry data.
 * @return bool
 */
function excel_ent_package_enquiry_email_admin( $data ) {
	$admin_email = get_option( 'admin_email' );
	if ( ! is_email( $admin_email ) ) {
		return false;
	}

	$subject = sprintf(
		/* translators: 1: site name, 2: package name */
		__( '[%1$s] Package enquiry — %2$s', 'excel-ent' ),
		$data['site_name'],
		$data['package']
	);

	$body = excel_ent_get_email_template( 'package-enquiry-admin', $data );
	if ( '' === $body ) {
		$body = excel_ent_package_enquiry_fallback_body( $data, true );
	}

	$reply = ! empty( $data['email'] ) ? $data['email'] : '';

	return (bool) wp_mail( $admin_email, $subject, $body, excel_ent_package_enquiry_mail_headers( $reply ) );
}

/**
 * Confirmation email to the enquirer (HTML template).
 *
 * @param array<string, string> $data Enquiry data.
 * @return bool
 */
function excel_ent_package_enquiry_email_customer( $data ) {
	if ( empty( $data['email'] ) || ! is_email( $data['email'] ) ) {
		return false;
	}

	$subject = sprintf(
		/* translators: %s: site name */
		__( 'We’ve received your enquiry — %s', 'excel-ent' ),
		$data['site_name']
	);

	$body = excel_ent_get_email_template( 'package-enquiry-customer', $data );
	if ( '' === $body ) {
		$body = excel_ent_package_enquiry_fallback_body( $data, false );
	}

	return (bool) wp_mail( $data['email'], $subject, $body, excel_ent_package_enquiry_mail_headers() );
}

/**
 * Plain HTML fallback if template files are missing.
 *
 * @param array<string, string> $data   Enquiry data.
 * @param bool                  $admin  Admin variant.
 * @return string
 */
function excel_ent_package_enquiry_fallback_body( $data, $admin ) {
	$rows = array(
		__( 'Name', 'excel-ent' )    => $data['name'],
		__( 'Email', 'excel-ent' )   => $data['email'] ? $data['email'] : '—',
		__( 'Phone', 'excel-ent' )   => $data['phone'] ? $data['phone'] : '—',
		__( 'Package', 'excel-ent' ) => $data['package'],
		__( 'Notes', 'excel-ent' )   => $data['notes'] ? $data['notes'] : '—',
	);

	$html  = '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#222;">';
	$html .= $admin
		? '<p>' . esc_html__( 'A new package enquiry was submitted.', 'excel-ent' ) . '</p>'
		: '<p>' . esc_html__( 'Thanks for your enquiry. Our team will be in touch shortly.', 'excel-ent' ) . '</p>';
	$html .= '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:560px;">';
	foreach ( $rows as $label => $value ) {
		$html .= '<tr><td style="border-bottom:1px solid #eee;color:#666;width:140px;">' . esc_html( $label ) . '</td>';
		$html .= '<td style="border-bottom:1px solid #eee;">' . nl2br( esc_html( $value ) ) . '</td></tr>';
	}
	$html .= '</table></div>';

	return $html;
}
