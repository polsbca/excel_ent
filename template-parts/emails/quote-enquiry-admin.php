<?php
/**
 * Get a Quote — admin notification email (HTML).
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$notes_display = '' !== (string) $notes ? (string) $notes : '—';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php echo esc_html( sprintf( __( 'New quote request — %s', 'excel-ent' ), $name ) ); ?></title>
</head>
<body style="margin:0;padding:0;background:#111;font-family:Arial,Helvetica,sans-serif;">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111;padding:32px 16px;">
		<tr>
			<td align="center">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#1a1a1a;border:1px solid #2a2a2a;">
					<tr>
						<td style="padding:28px 32px;border-bottom:1px solid #2a2a2a;background:linear-gradient(90deg,<?php echo esc_attr( $accent_alt ); ?> 0%,<?php echo esc_attr( $accent ); ?> 100%);">
							<p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.85);">
								<?php echo esc_html( $site_name ); ?>
							</p>
							<h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;color:#fff;">
								<?php esc_html_e( 'New quote request', 'excel-ent' ); ?>
							</h1>
						</td>
					</tr>
					<tr>
						<td style="padding:28px 32px;color:#f5f5f5;font-size:15px;line-height:1.55;">
							<p style="margin:0 0 20px;color:#cfcfcf;">
								<?php esc_html_e( 'Someone submitted the Get a Quote form on the Contact Us page.', 'excel-ent' ); ?>
							</p>
							<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
								<?php
								$rows = array(
									__( 'Name', 'excel-ent' )                  => $name,
									__( 'Email', 'excel-ent' )                 => $email,
									__( 'Phone', 'excel-ent' )                 => $phone,
									__( 'Payment method', 'excel-ent' )        => $payment,
									__( 'Preferred artists', 'excel-ent' )     => $artists_display,
									__( 'Categories', 'excel-ent' )            => $categories_display,
									__( 'Budget', 'excel-ent' )                => $budget,
									__( 'Package', 'excel-ent' )               => $package,
									__( 'Regular entertainment', 'excel-ent' ) => $regular,
									__( 'Regular details', 'excel-ent' )       => $regular_details,
									__( 'Event date', 'excel-ent' )            => $event_date,
									__( 'Start time', 'excel-ent' )            => $start_time,
									__( 'Guest count', 'excel-ent' )           => $guests,
									__( 'Set length', 'excel-ent' )            => $set_length,
									__( 'Venue', 'excel-ent' )                 => $venue,
									__( 'Venue address', 'excel-ent' )         => $venue_address,
									__( 'PA & lighting', 'excel-ent' )         => $pa_lighting,
									__( 'Parking', 'excel-ent' )               => $parking,
									__( 'Stairs', 'excel-ent' )                => $stairs,
									__( 'Notes', 'excel-ent' )                 => $notes_display,
									__( 'Contact preference', 'excel-ent' )    => $contact_pref,
									__( 'Contact details', 'excel-ent' )       => $contact_details,
									__( 'Submitted', 'excel-ent' )             => $submitted,
								);
								foreach ( $rows as $label => $value ) :
									?>
								<tr>
									<td style="padding:10px 0;border-bottom:1px solid #2e2e2e;color:#999;width:170px;vertical-align:top;"><?php echo esc_html( $label ); ?></td>
									<td style="padding:10px 0;border-bottom:1px solid #2e2e2e;color:#fff;vertical-align:top;">
										<?php
										if ( __( 'Email', 'excel-ent' ) === $label ) {
											echo '<a href="mailto:' . esc_attr( $email ) . '" style="color:' . esc_attr( $accent ) . ';text-decoration:none;">' . esc_html( $email ) . '</a>';
										} else {
											echo nl2br( esc_html( (string) $value ) );
										}
										?>
									</td>
								</tr>
								<?php endforeach; ?>
							</table>
						</td>
					</tr>
					<tr>
						<td style="padding:18px 32px;border-top:1px solid #2a2a2a;color:#777;font-size:12px;">
							<a href="<?php echo esc_url( $site_url ); ?>" style="color:<?php echo esc_attr( $accent ); ?>;text-decoration:none;"><?php echo esc_html( $site_url ); ?></a>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>
