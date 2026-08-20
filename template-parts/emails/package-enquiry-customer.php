<?php
/**
 * Package enquiry — customer confirmation email (HTML).
 *
 * Available vars from excel_ent_get_email_template(): $name, $email, $phone,
 * $package, $notes, $submitted, $site_name, $site_url, $logo_url, $accent, $accent_alt.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$first_name = trim( (string) $name );
if ( false !== strpos( $first_name, ' ' ) ) {
	$first_name = substr( $first_name, 0, strpos( $first_name, ' ' ) );
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php echo esc_html( sprintf( __( 'We’ve received your enquiry — %s', 'excel-ent' ), $site_name ) ); ?></title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
		<tr>
			<td align="center">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e8e8e8;">
					<tr>
						<td style="padding:28px 32px;border-bottom:1px solid #eee;background:linear-gradient(90deg,<?php echo esc_attr( $accent_alt ); ?> 0%,<?php echo esc_attr( $accent ); ?> 100%);">
							<p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.85);">
								<?php echo esc_html( $site_name ); ?>
							</p>
							<h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;color:#fff;">
								<?php esc_html_e( 'Thanks for your enquiry', 'excel-ent' ); ?>
							</h1>
						</td>
					</tr>
					<tr>
						<td style="padding:28px 32px;color:#222;font-size:15px;line-height:1.55;">
							<p style="margin:0 0 16px;">
								<?php
								printf(
									/* translators: %s: first name */
									esc_html__( 'Hi %s,', 'excel-ent' ),
									esc_html( $first_name ? $first_name : __( 'there', 'excel-ent' ) )
								);
								?>
							</p>
							<p style="margin:0 0 16px;color:#444;">
								<?php esc_html_e( 'We’ve received your package enquiry and our team will be in touch with availability and a tailored quote. No commitment needed.', 'excel-ent' ); ?>
							</p>
							<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 20px;background:#fafafa;border:1px solid #eee;">
								<tr>
									<td style="padding:14px 16px;color:#666;font-size:13px;width:120px;"><?php esc_html_e( 'Package', 'excel-ent' ); ?></td>
									<td style="padding:14px 16px;color:#111;font-weight:700;"><?php echo esc_html( $package ); ?></td>
								</tr>
								<?php if ( '' !== $notes ) : ?>
								<tr>
									<td style="padding:14px 16px;border-top:1px solid #eee;color:#666;font-size:13px;vertical-align:top;"><?php esc_html_e( 'Your notes', 'excel-ent' ); ?></td>
									<td style="padding:14px 16px;border-top:1px solid #eee;color:#333;"><?php echo nl2br( esc_html( $notes ) ); ?></td>
								</tr>
								<?php endif; ?>
							</table>
							<p style="margin:0 0 8px;color:#444;">
								<?php esc_html_e( 'If you need to add anything in the meantime, just reply to this email.', 'excel-ent' ); ?>
							</p>
							<p style="margin:24px 0 0;color:#222;">
								<?php
								printf(
									/* translators: %s: site name */
									esc_html__( '— The %s team', 'excel-ent' ),
									esc_html( $site_name )
								);
								?>
							</p>
						</td>
					</tr>
					<tr>
						<td style="padding:18px 32px;border-top:1px solid #eee;color:#888;font-size:12px;">
							<a href="<?php echo esc_url( $site_url ); ?>" style="color:<?php echo esc_attr( $accent_alt ); ?>;text-decoration:none;"><?php echo esc_html( $site_name ); ?></a>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>
