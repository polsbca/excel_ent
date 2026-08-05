<?php
/**
 * Neon CTA strip (Figma 1084:2440).
 *
 * @package Excel_Ent
 */

$excel_ent_cta_uri = EXCEL_ENT_URI . '/assets/images/cta';
$excel_ent_contact = home_url( '/contact/' );

$excel_ent_cta_args = wp_parse_args(
	isset( $args ) && is_array( $args ) ? $args : array(),
	array(
		'primary_label'   => __( 'Contact Us', 'excel-ent' ),
		'primary_url'     => $excel_ent_contact,
		'secondary_label' => __( 'Book As an Artist', 'excel-ent' ),
		'secondary_url'   => home_url( '/artist-registration/' ),
	)
);

$excel_ent_cta_socials = array(
	array(
		'label' => __( 'Instagram', 'excel-ent' ),
		'icon'  => 'instagram.svg',
		'url'   => 'https://www.instagram.com/',
	),
	array(
		'label' => __( 'Facebook', 'excel-ent' ),
		'icon'  => 'facebook.svg',
		'url'   => 'https://www.facebook.com/',
	),
	array(
		'label' => __( 'LinkedIn', 'excel-ent' ),
		'icon'  => 'linkedin.svg',
		'url'   => 'https://www.linkedin.com/',
	),
);
?>
<section class="cta-neon" id="cta-neon" aria-label="<?php esc_attr_e( 'Last-minute booking', 'excel-ent' ); ?>">
	<div class="cta-neon__inner">
		<div class="cta-neon__copy reveal" data-reveal>
			<h2 class="cta-neon__title">
				<span class="cta-neon__title-plain"><?php esc_html_e( 'BEEN', 'excel-ent' ); ?></span>
				<span class="cta-neon__title-accent"><?php esc_html_e( 'LET DOWN', 'excel-ent' ); ?></span>
				<span class="cta-neon__title-plain"><?php esc_html_e( '?', 'excel-ent' ); ?></span>
			</h2>
			<p class="cta-neon__lede">
				<?php esc_html_e( "Our last-minute booking service means no event ever goes without great live entertainment. Call us or submit a quote — we'll find you someone fast.", 'excel-ent' ); ?>
			</p>
		</div>

		<div class="cta-neon__actions reveal" data-reveal>
			<a class="cta-neon__btn cta-neon__btn--primary magnetic" href="<?php echo esc_url( $excel_ent_cta_args['primary_url'] ); ?>">
				<?php echo esc_html( $excel_ent_cta_args['primary_label'] ); ?>
			</a>
			<a class="cta-neon__btn cta-neon__btn--outline magnetic" href="<?php echo esc_url( $excel_ent_cta_args['secondary_url'] ); ?>">
				<?php echo esc_html( $excel_ent_cta_args['secondary_label'] ); ?>
			</a>

			<div class="cta-neon__socials">
				<?php foreach ( $excel_ent_cta_socials as $excel_ent_social ) : ?>
					<a
						class="cta-neon__social magnetic"
						href="<?php echo esc_url( $excel_ent_social['url'] ); ?>"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="<?php echo esc_attr( $excel_ent_social['label'] ); ?>"
					>
						<img
							src="<?php echo esc_url( $excel_ent_cta_uri . '/' . $excel_ent_social['icon'] ); ?>"
							alt=""
							width="32"
							height="32"
							decoding="async"
						>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</section>
