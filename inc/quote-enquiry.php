<?php
/**
 * Get a Quote (booking) — AJAX submit + HTML emails to admin and customer.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * HTML mail headers for quote enquiry emails.
 *
 * @param string $reply_to Optional Reply-To email.
 * @return string[]
 */
function excel_ent_quote_enquiry_mail_headers( $reply_to = '' ) {
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
 * Admin inbox for quote enquiries.
 *
 * @return string
 */
function excel_ent_quote_enquiry_admin_email() {
	/**
	 * Filter the admin recipient for Get a Quote emails.
	 *
	 * @param string $email Admin email.
	 */
	$email = apply_filters( 'excel_ent_quote_enquiry_admin_email', get_option( 'admin_email' ) );
	return is_email( $email ) ? $email : '';
}

/**
 * Human labels for common quote form enums.
 *
 * @return array{payment:array<string,string>,yes_no:array<string,string>,contact_pref:array<string,string>,regular:array<string,string>}
 */
function excel_ent_quote_enquiry_label_maps() {
	return array(
		'payment'      => array(
			'google-pay'    => __( 'Cash', 'excel-ent' ),
			'card'          => __( 'Debit / Credit Card', 'excel-ent' ),
			'bank-transfer' => __( 'Bank Transfer', 'excel-ent' ),
		),
		'yes_no'       => array(
			'yes' => __( 'Yes', 'excel-ent' ),
			'no'  => __( 'No', 'excel-ent' ),
		),
		'contact_pref' => array(
			'email' => __( 'Email', 'excel-ent' ),
			'phone' => __( 'Phone call', 'excel-ent' ),
			'text'  => __( 'Text message/Whatsapp', 'excel-ent' ),
		),
		'regular'      => array(
			'yes' => __( 'Yes', 'excel-ent' ),
			'no'  => __( 'No', 'excel-ent' ),
		),
	);
}

/**
 * Map a stored code to a display label.
 *
 * @param string               $code Code.
 * @param array<string,string> $map  Lookup.
 * @return string
 */
function excel_ent_quote_enquiry_label( $code, $map ) {
	$code = (string) $code;
	if ( '' === $code ) {
		return '—';
	}
	return isset( $map[ $code ] ) ? (string) $map[ $code ] : $code;
}

/**
 * Collect ranked preferred artists from the request.
 *
 * @return array<int, array{id:string,name:string}>
 */
function excel_ent_quote_enquiry_collect_artists() {
	$ids   = isset( $_POST['excel_ent_artist_pref'] ) ? (array) wp_unslash( $_POST['excel_ent_artist_pref'] ) : array(); // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
	$names = isset( $_POST['excel_ent_artist_pref_name'] ) ? (array) wp_unslash( $_POST['excel_ent_artist_pref_name'] ) : array(); // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized

	$out = array();
	$max = min( 5, max( count( $ids ), count( $names ) ) );
	for ( $i = 0; $i < $max; $i++ ) {
		$id   = isset( $ids[ $i ] ) ? sanitize_text_field( (string) $ids[ $i ] ) : '';
		$name = isset( $names[ $i ] ) ? sanitize_text_field( (string) $names[ $i ] ) : '';
		if ( '' === $id && '' === $name ) {
			continue;
		}
		if ( '' === $name ) {
			$name = $id;
		}
		$out[] = array(
			'id'   => $id,
			'name' => $name,
		);
	}

	return $out;
}

/**
 * Build quote enquiry payload from POST.
 *
 * @return array<string, mixed>|WP_Error
 */
function excel_ent_quote_enquiry_build_data() {
	$maps = excel_ent_quote_enquiry_label_maps();

	$name  = isset( $_POST['excel_ent_full_name'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_full_name'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$phone = isset( $_POST['excel_ent_phone'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_phone'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$email = isset( $_POST['excel_ent_email'] ) ? sanitize_email( wp_unslash( $_POST['excel_ent_email'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing

	if ( '' === $name ) {
		return new WP_Error( 'full_name', __( 'Please enter your full name.', 'excel-ent' ) );
	}
	if ( '' === $phone ) {
		return new WP_Error( 'phone', __( 'Please enter your phone number.', 'excel-ent' ) );
	}
	if ( '' === $email || ! is_email( $email ) ) {
		return new WP_Error( 'email', __( 'Please enter a valid email address.', 'excel-ent' ) );
	}

	$payment_code = isset( $_POST['excel_ent_payment'] ) ? sanitize_key( wp_unslash( $_POST['excel_ent_payment'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$ent_type     = isset( $_POST['excel_ent_ent_type'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_ent_type'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$budget       = isset( $_POST['excel_ent_budget'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_budget'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$package      = isset( $_POST['excel_ent_package'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_package'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$regular      = isset( $_POST['excel_ent_regular'] ) ? sanitize_key( wp_unslash( $_POST['excel_ent_regular'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$regular_det  = isset( $_POST['excel_ent_regular_details'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_regular_details'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$event_date   = isset( $_POST['excel_ent_event_date'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_event_date'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$start_time   = isset( $_POST['excel_ent_start_time'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_start_time'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$guests       = isset( $_POST['excel_ent_guests'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_guests'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$set_length   = isset( $_POST['excel_ent_set_length'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_set_length'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$venue        = isset( $_POST['excel_ent_venue'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_venue'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$venue_addr   = isset( $_POST['excel_ent_venue_address'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_venue_address'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$pa           = isset( $_POST['excel_ent_pa_lighting'] ) ? sanitize_key( wp_unslash( $_POST['excel_ent_pa_lighting'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$parking      = isset( $_POST['excel_ent_parking'] ) ? sanitize_key( wp_unslash( $_POST['excel_ent_parking'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$stairs       = isset( $_POST['excel_ent_stairs'] ) ? sanitize_key( wp_unslash( $_POST['excel_ent_stairs'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$notes        = isset( $_POST['excel_ent_notes'] ) ? sanitize_textarea_field( wp_unslash( $_POST['excel_ent_notes'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$contact_pref = isset( $_POST['excel_ent_contact_pref'] ) ? sanitize_key( wp_unslash( $_POST['excel_ent_contact_pref'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
	$contact_det  = isset( $_POST['excel_ent_contact_details'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_contact_details'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing

	$artists = excel_ent_quote_enquiry_collect_artists();

	if ( empty( $payment_code ) || ! isset( $maps['payment'][ $payment_code ] ) ) {
		return new WP_Error( 'payment', __( 'Please select a payment method.', 'excel-ent' ) );
	}
	if ( empty( $artists ) ) {
		return new WP_Error( 'artists', __( 'Please select at least one preferred artist.', 'excel-ent' ) );
	}

	$categories = array_values(
		array_filter(
			array_map(
				'trim',
				preg_split( '/\s*,\s*/', $ent_type ) ?: array()
			)
		)
	);
	if ( empty( $categories ) ) {
		return new WP_Error( 'categories', __( 'Please select at least one performance category.', 'excel-ent' ) );
	}
	if ( '' === $budget ) {
		return new WP_Error( 'budget', __( 'Please enter your event budget.', 'excel-ent' ) );
	}
	if ( '' === $package ) {
		return new WP_Error( 'package', __( 'Please select a package.', 'excel-ent' ) );
	}
	if ( ! in_array( $regular, array( 'yes', 'no' ), true ) ) {
		return new WP_Error( 'regular', __( 'Please confirm whether you need regular entertainment.', 'excel-ent' ) );
	}
	if ( '' === $regular_det ) {
		return new WP_Error( 'regular_details', __( 'Please add details for regular entertainment.', 'excel-ent' ) );
	}
	if ( '' === $event_date ) {
		return new WP_Error( 'event_date', __( 'Please select an event date.', 'excel-ent' ) );
	}
	if ( '' === $start_time ) {
		return new WP_Error( 'start_time', __( 'Please select a start time.', 'excel-ent' ) );
	}
	if ( '' === $guests ) {
		return new WP_Error( 'guests', __( 'Please enter the guest count.', 'excel-ent' ) );
	}
	if ( '' === $set_length ) {
		return new WP_Error( 'set_length', __( 'Please select a performance set length.', 'excel-ent' ) );
	}
	if ( '' === $venue ) {
		return new WP_Error( 'venue', __( 'Please enter the venue name.', 'excel-ent' ) );
	}
	if ( '' === $venue_addr ) {
		return new WP_Error( 'venue_address', __( 'Please enter the venue address.', 'excel-ent' ) );
	}
	if ( ! in_array( $pa, array( 'yes', 'no' ), true ) ) {
		return new WP_Error( 'pa_lighting', __( 'Please confirm whether PA and lighting are required.', 'excel-ent' ) );
	}
	if ( ! in_array( $parking, array( 'yes', 'no' ), true ) ) {
		return new WP_Error( 'parking', __( 'Please confirm whether there is parking.', 'excel-ent' ) );
	}
	if ( ! in_array( $stairs, array( 'yes', 'no' ), true ) ) {
		return new WP_Error( 'stairs', __( 'Please confirm whether there are stairs involved.', 'excel-ent' ) );
	}
	if ( '' === $notes ) {
		return new WP_Error( 'notes', __( 'Please tell us about your event.', 'excel-ent' ) );
	}
	if ( ! in_array( $contact_pref, array( 'email', 'phone', 'text' ), true ) ) {
		return new WP_Error( 'contact_pref', __( 'Please choose how we should contact you.', 'excel-ent' ) );
	}
	if ( '' === $contact_det ) {
		return new WP_Error( 'contact_details', __( 'Please add contact preference details.', 'excel-ent' ) );
	}
	if ( empty( $_POST['excel_ent_agree'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
		return new WP_Error( 'consent', __( 'Please agree to the Privacy Policy to continue.', 'excel-ent' ) );
	}

	$artist_lines = array();
	foreach ( $artists as $i => $artist ) {
		$rank           = $i + 1;
		$artist_lines[] = sprintf( '%d. %s', $rank, $artist['name'] );
	}

	return array(
		'name'                 => $name,
		'phone'                => $phone,
		'email'                => strtolower( $email ),
		'payment'              => excel_ent_quote_enquiry_label( $payment_code, $maps['payment'] ),
		'payment_code'         => $payment_code,
		'artists'              => $artists,
		'artists_display'      => implode( "\n", $artist_lines ),
		'categories'           => $categories,
		'categories_display'   => implode( ', ', $categories ),
		'budget'               => $budget,
		'package'              => $package,
		'regular'              => excel_ent_quote_enquiry_label( $regular, $maps['regular'] ),
		'regular_details'      => $regular_det,
		'event_date'           => $event_date,
		'start_time'           => $start_time,
		'guests'               => $guests,
		'set_length'           => $set_length,
		'venue'                => $venue,
		'venue_address'        => $venue_addr,
		'pa_lighting'          => excel_ent_quote_enquiry_label( $pa, $maps['yes_no'] ),
		'parking'              => excel_ent_quote_enquiry_label( $parking, $maps['yes_no'] ),
		'stairs'               => excel_ent_quote_enquiry_label( $stairs, $maps['yes_no'] ),
		'notes'                => $notes,
		'contact_pref'         => excel_ent_quote_enquiry_label( $contact_pref, $maps['contact_pref'] ),
		'contact_details'      => $contact_det,
		'submitted'            => current_time( 'mysql' ),
		'site_name'            => wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ),
		'site_url'             => home_url( '/' ),
		'logo_url'             => EXCEL_ENT_URI . '/assets/images/logo/logo-header.svg',
		'accent'               => '#f89a42',
		'accent_alt'           => '#eb2055',
	);
}

/**
 * AJAX: submit Get a Quote form.
 */
function excel_ent_ajax_quote_enquiry() {
	check_ajax_referer( 'excel_ent_quote_enquiry', 'nonce' );

	$honeypot = isset( $_POST['excel_ent_website'] ) ? sanitize_text_field( wp_unslash( $_POST['excel_ent_website'] ) ) : '';
	if ( '' !== $honeypot ) {
		wp_send_json_success(
			array(
				'message' => __( 'Thanks — we’ve received your quote request and will be in touch shortly.', 'excel-ent' ),
			)
		);
	}

	$data = excel_ent_quote_enquiry_build_data();
	if ( is_wp_error( $data ) ) {
		wp_send_json_error(
			array(
				'message' => $data->get_error_message(),
				'field'   => $data->get_error_code(),
			),
			400
		);
	}

	/**
	 * Fires after a quote enquiry passes validation.
	 *
	 * @param array<string, mixed> $data Enquiry data.
	 */
	do_action( 'excel_ent_quote_enquiry_submitted', $data );

	$admin_ok    = excel_ent_quote_enquiry_email_admin( $data );
	$customer_ok = excel_ent_quote_enquiry_email_customer( $data );

	if ( ! $admin_ok && ! $customer_ok ) {
		wp_send_json_error(
			array(
				'message' => __( 'Something went wrong sending your quote request. Please try again.', 'excel-ent' ),
			),
			500
		);
	}

	wp_send_json_success(
		array(
			'message' => __( 'Thanks — we’ve received your quote request. Our team will confirm availability and pricing shortly.', 'excel-ent' ),
		)
	);
}
add_action( 'wp_ajax_excel_ent_quote_enquiry', 'excel_ent_ajax_quote_enquiry' );
add_action( 'wp_ajax_nopriv_excel_ent_quote_enquiry', 'excel_ent_ajax_quote_enquiry' );

/**
 * Email site admin with quote details.
 *
 * @param array<string, mixed> $data Enquiry data.
 * @return bool
 */
function excel_ent_quote_enquiry_email_admin( $data ) {
	$admin_email = excel_ent_quote_enquiry_admin_email();
	if ( ! $admin_email ) {
		return false;
	}

	$subject = sprintf(
		/* translators: 1: site name, 2: customer name */
		__( '[%1$s] New quote request — %2$s', 'excel-ent' ),
		$data['site_name'],
		$data['name']
	);

	$body = function_exists( 'excel_ent_get_email_template' )
		? excel_ent_get_email_template( 'quote-enquiry-admin', $data )
		: '';
	if ( '' === $body ) {
		$body = excel_ent_quote_enquiry_fallback_body( $data, true );
	}

	return (bool) wp_mail(
		$admin_email,
		$subject,
		$body,
		excel_ent_quote_enquiry_mail_headers( $data['email'] )
	);
}

/**
 * Confirmation email to the customer.
 *
 * @param array<string, mixed> $data Enquiry data.
 * @return bool
 */
function excel_ent_quote_enquiry_email_customer( $data ) {
	if ( empty( $data['email'] ) || ! is_email( $data['email'] ) ) {
		return false;
	}

	$subject = sprintf(
		/* translators: %s: site name */
		__( 'We’ve received your quote request — %s', 'excel-ent' ),
		$data['site_name']
	);

	$body = function_exists( 'excel_ent_get_email_template' )
		? excel_ent_get_email_template( 'quote-enquiry-customer', $data )
		: '';
	if ( '' === $body ) {
		$body = excel_ent_quote_enquiry_fallback_body( $data, false );
	}

	return (bool) wp_mail(
		$data['email'],
		$subject,
		$body,
		excel_ent_quote_enquiry_mail_headers()
	);
}

/**
 * Plain HTML fallback if template files are missing.
 *
 * @param array<string, mixed> $data  Enquiry data.
 * @param bool                 $admin Admin variant.
 * @return string
 */
function excel_ent_quote_enquiry_fallback_body( $data, $admin ) {
	$rows = array(
		__( 'Name', 'excel-ent' )                 => $data['name'],
		__( 'Email', 'excel-ent' )                => $data['email'],
		__( 'Phone', 'excel-ent' )                => $data['phone'],
		__( 'Payment method', 'excel-ent' )       => $data['payment'],
		__( 'Preferred artists', 'excel-ent' )    => $data['artists_display'],
		__( 'Categories', 'excel-ent' )           => $data['categories_display'],
		__( 'Budget', 'excel-ent' )               => $data['budget'],
		__( 'Package', 'excel-ent' )              => $data['package'],
		__( 'Regular entertainment', 'excel-ent' ) => $data['regular'],
		__( 'Regular details', 'excel-ent' )      => $data['regular_details'],
		__( 'Event date', 'excel-ent' )           => $data['event_date'],
		__( 'Start time', 'excel-ent' )           => $data['start_time'],
		__( 'Guest count', 'excel-ent' )          => $data['guests'],
		__( 'Set length', 'excel-ent' )           => $data['set_length'],
		__( 'Venue', 'excel-ent' )                => $data['venue'],
		__( 'Venue address', 'excel-ent' )        => $data['venue_address'],
		__( 'PA & lighting', 'excel-ent' )        => $data['pa_lighting'],
		__( 'Parking', 'excel-ent' )              => $data['parking'],
		__( 'Stairs', 'excel-ent' )               => $data['stairs'],
		__( 'Notes', 'excel-ent' )                => $data['notes'] ? $data['notes'] : '—',
		__( 'Contact preference', 'excel-ent' )   => $data['contact_pref'],
		__( 'Contact details', 'excel-ent' )      => $data['contact_details'],
		__( 'Submitted', 'excel-ent' )            => $data['submitted'],
	);

	$html  = '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#222;">';
	$html .= $admin
		? '<p>' . esc_html__( 'A new Get a Quote request was submitted.', 'excel-ent' ) . '</p>'
		: '<p>' . esc_html__( 'Thanks for your quote request. Our team will confirm availability and pricing shortly.', 'excel-ent' ) . '</p>';
	$html .= '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px;">';
	foreach ( $rows as $label => $value ) {
		$html .= '<tr><td style="border-bottom:1px solid #eee;color:#666;width:180px;vertical-align:top;">' . esc_html( $label ) . '</td>';
		$html .= '<td style="border-bottom:1px solid #eee;vertical-align:top;">' . nl2br( esc_html( (string) $value ) ) . '</td></tr>';
	}
	$html .= '</table></div>';

	return $html;
}
