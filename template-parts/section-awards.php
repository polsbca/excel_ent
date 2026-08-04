<?php
/**
 * Awards marquee strip (Figma 898:8519).
 *
 * @package Excel_Ent
 */

$excel_ent_awards_label = __( 'AWARDS', 'excel-ent' );
$excel_ent_awards_items = 8;
?>
<section class="awards-marquee" aria-label="<?php esc_attr_e( 'Awards', 'excel-ent' ); ?>">
	<div class="awards-marquee__viewport">
		<div class="awards-marquee__track">
			<?php for ( $excel_ent_group = 0; $excel_ent_group < 2; $excel_ent_group++ ) : ?>
				<div class="awards-marquee__group"<?php echo 1 === $excel_ent_group ? ' aria-hidden="true"' : ''; ?>>
					<?php for ( $excel_ent_i = 0; $excel_ent_i < $excel_ent_awards_items; $excel_ent_i++ ) : ?>
						<span class="awards-marquee__text"><?php echo esc_html( $excel_ent_awards_label ); ?></span>
						<span class="awards-marquee__dot" aria-hidden="true"></span>
					<?php endfor; ?>
				</div>
			<?php endfor; ?>
		</div>
	</div>
</section>
