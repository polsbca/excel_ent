<?php
/**
 * Partner logo marquee strip (Figma 1023:21081).
 * Logos come from Brand Logos CPT in WP admin; static defaults if none published.
 *
 * @package Excel_Ent
 */

$excel_ent_partner_logos = function_exists( 'excel_ent_get_brand_logos' )
	? excel_ent_get_brand_logos()
	: array();

if ( empty( $excel_ent_partner_logos ) ) {
	return;
}
?>
<section class="awards-marquee" aria-label="<?php esc_attr_e( 'Trusted partners', 'excel-ent' ); ?>">
	<div class="awards-marquee__viewport">
		<div class="awards-marquee__track">
			<?php for ( $excel_ent_group = 0; $excel_ent_group < 2; $excel_ent_group++ ) : ?>
				<div class="awards-marquee__group"<?php echo 1 === $excel_ent_group ? ' aria-hidden="true"' : ''; ?>>
					<span class="awards-marquee__dot" aria-hidden="true"></span>
					<?php foreach ( $excel_ent_partner_logos as $excel_ent_logo ) : ?>
						<div
							class="awards-marquee__logo<?php echo ! empty( $excel_ent_logo['panel'] ) ? ' awards-marquee__logo--panel' : ''; ?>"
							data-partner="<?php echo esc_attr( $excel_ent_logo['slug'] ); ?>"
						>
							<?php if ( ! empty( $excel_ent_logo['object'] ) ) : ?>
								<object
									type="image/svg+xml"
									data="<?php echo esc_url( $excel_ent_logo['src'] ); ?>"
									width="<?php echo esc_attr( (string) $excel_ent_logo['width'] ); ?>"
									height="<?php echo esc_attr( (string) $excel_ent_logo['height'] ); ?>"
									aria-label="<?php echo esc_attr( $excel_ent_logo['alt'] ); ?>"
								></object>
							<?php else : ?>
								<img
									src="<?php echo esc_url( $excel_ent_logo['src'] ); ?>"
									alt="<?php echo esc_attr( $excel_ent_logo['alt'] ); ?>"
									width="<?php echo esc_attr( (string) $excel_ent_logo['width'] ); ?>"
									height="<?php echo esc_attr( (string) $excel_ent_logo['height'] ); ?>"
									decoding="async"
									loading="lazy"
								>
							<?php endif; ?>
						</div>
						<span class="awards-marquee__dot" aria-hidden="true"></span>
					<?php endforeach; ?>
				</div>
			<?php endfor; ?>
		</div>
	</div>
</section>
