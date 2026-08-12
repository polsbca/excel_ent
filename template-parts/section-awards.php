<?php
/**
 * Partner logo marquee strip (Figma 1023:21081).
 *
 * @package Excel_Ent
 */

$excel_ent_awards_uri = EXCEL_ENT_URI . '/assets/images/awards';

$excel_ent_partner_logos = array(
	array(
		'slug'   => 'craft-union',
		'src'    => $excel_ent_awards_uri . '/craft-union.svg',
		'alt'    => __( 'Craft Union', 'excel-ent' ),
		'width'  => 100,
		'height' => 103,
		'object' => true,
	),
	array(
		'slug'   => 'urban-village',
		'src'    => $excel_ent_awards_uri . '/urban-village.svg',
		'alt'    => __( 'Urban Village Pub Company', 'excel-ent' ),
		'width'  => 109,
		'height' => 76,
	),
	array(
		'slug'   => 'gig-realm',
		'src'    => $excel_ent_awards_uri . '/gig-realm.svg',
		'alt'    => __( 'GigRealm', 'excel-ent' ),
		'width'  => 156,
		'height' => 33,
	),
	array(
		'slug'   => 'stonegate',
		'src'    => $excel_ent_awards_uri . '/stonegate.svg',
		'alt'    => __( 'Stonegate Pub Company', 'excel-ent' ),
		'width'  => 155,
		'height' => 35,
		'object' => true,
	),
	array(
		'slug'   => 'greene-king',
		'src'    => $excel_ent_awards_uri . '/greene-king.svg',
		'alt'    => __( 'Greene King Brewery', 'excel-ent' ),
		'width'  => 68,
		'height' => 103,
		'object' => true,
		'panel'  => true,
	),
);

/* About page tablet — Figma 1099:5349 logo order (GigRealm → Stonegate → Urban Village → Craft Union) */
if ( function_exists( 'excel_ent_is_about_page' ) && excel_ent_is_about_page() ) {
	$excel_ent_partner_logos = array(
		array(
			'slug'   => 'gig-realm',
			'src'    => $excel_ent_awards_uri . '/gig-realm.svg',
			'alt'    => __( 'GigRealm', 'excel-ent' ),
			'width'  => 156,
			'height' => 33,
		),
		array(
			'slug'   => 'stonegate',
			'src'    => $excel_ent_awards_uri . '/stonegate.svg',
			'alt'    => __( 'Stonegate Pub Company', 'excel-ent' ),
			'width'  => 155,
			'height' => 35,
			'object' => true,
		),
		array(
			'slug'   => 'urban-village',
			'src'    => $excel_ent_awards_uri . '/urban-village.svg',
			'alt'    => __( 'Urban Village Pub Company', 'excel-ent' ),
			'width'  => 109,
			'height' => 76,
		),
		array(
			'slug'   => 'craft-union',
			'src'    => $excel_ent_awards_uri . '/craft-union.svg',
			'alt'    => __( 'Craft Union', 'excel-ent' ),
			'width'  => 100,
			'height' => 103,
			'object' => true,
		),
		array(
			'slug'   => 'greene-king',
			'src'    => $excel_ent_awards_uri . '/greene-king.svg',
			'alt'    => __( 'Greene King Brewery', 'excel-ent' ),
			'width'  => 68,
			'height' => 103,
			'object' => true,
			'panel'  => true,
		),
	);
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
