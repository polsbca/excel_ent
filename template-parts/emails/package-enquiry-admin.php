<?php
/**
 * Package enquiry — admin notification email (HTML).
 *
 * Available vars from excel_ent_get_email_template(): $name, $email, $phone,
 * $package, $notes, $submitted, $site_name, $site_url, $logo_url, $accent, $accent_alt.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$notes_display = '' !== $notes ? $notes : '—';
$email_display = '' !== $email ? $email : '—';
$phone_display = '' !== $phone ? $phone : '—';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php echo esc_html( sprintf( __( 'Package enquiry — %s', 'excel-ent' ), $package ) ); ?></title>
</head>
<body style="margin:0;padding:0;background:#111;font-family:Arial,Helvetica,sans-serif;">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111;padding:32px 16px;">
		<tr>
			<td align="center">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#1a1a1a;border:1px solid #2a2a2a;">
					<tr>
						<td style="padding:28px 32px;border-bottom:1px solid #2a2a2a;background:linear-gradient(90deg,<?php echo esc_attr( $accent_alt ); ?> 0%,<?php echo esc_attr( $accent ); ?> 100%);">
							<p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.85);">
								<?php echo esc_html( $site_name ); ?>
							</p>
							<h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;color:#fff;">
								<?php esc_html_e( 'New package enquiry', 'excel-ent' ); ?>
							</h1>
						</td>
					</tr>
					<tr>
						<td style="padding:28px 32px;color:#f5f5f5;font-size:15px;line-height:1.55;">
							<p style="margin:0 0 20px;color:#cfcfcf;">
								<?php esc_html_e( 'Someone submitted the Start your enquiry form on the packages page.', 'excel-ent' ); ?>
							</p>
							<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
								<tr>
									<td style="padding:10px 0;border-bottom:1px solid #2e2e2e;color:#999;width:140px;vertical-align:top;"><?php esc_html_e( 'Name', 'excel-ent' ); ?></td>
									<td style="padding:10px 0;border-bottom:1px solid #2e2e2e;color:#fff;vertical-align:top;"><?php echo esc_html( $name ); ?></td>
								</tr>
								<tr>
									<td style="padding:10px 0;border-bottom:1px solid #2e2e2e;color:#999;vertical-align:top;"><?php esc_html_e( 'Email', 'excel-ent' ); ?></td>
									<td style="padding:10px 0;border-bottom:1px solid #2e2e2e;color:#fff;vertical-align:top;">
										<?php if ( '' !== $email ) : ?>
											<a href="mailto:<?php echo esc_attr( $email ); ?>" style="color:<?php echo esc_attr( $accent ); ?>;text-decoration:none;"><?php echo esc_html( $email_display ); ?></a>
										<?php else : ?>
											<?php echo esc_html( $email_display ); ?>
										<?php endif; ?>
									</td>
								</tr>
								<tr>
									<td style="padding:10px 0;border-bottom:1px solid #2e2e2e;color:#999;vertical-align:top;"><?php esc_html_e( 'Phone', 'excel-ent' ); ?></td>
									<td style="padding:10px 0;border-bottom:1px solid #2e2e2e;color:#fff;vertical-align:top;"><?php echo esc_html( $phone_display ); ?></td>
								</tr>
								<tr>
									<td style="padding:10px 0;border-bottom:1px solid #2e2e2e;color:#999;vertical-align:top;"><?php esc_html_e( 'Package', 'excel-ent' ); ?></td>
									<td style="padding:10px 0;border-bottom:1px solid #2e2e2e;color:#fff;font-weight:700;vertical-align:top;"><?php echo esc_html( $package ); ?></td>
								</tr>
								<tr>
									<td style="padding:10px 0;border-bottom:1px solid #2e2e2e;color:#999;vertical-align:top;"><?php esc_html_e( 'Notes', 'excel-ent' ); ?></td>
									<td style="padding:10px 0;border-bottom:1px solid #2e2e2e;color:#fff;vertical-align:top;"><?php echo nl2br( esc_html( $notes_display ) ); ?></td>
								</tr>
								<tr>
									<td style="padding:10px 0;color:#999;vertical-align:top;"><?php esc_html_e( 'Submitted', 'excel-ent' ); ?></td>
									<td style="padding:10px 0;color:#fff;vertical-align:top;"><?php echo esc_html( $submitted ); ?></td>
								</tr>
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
