<?php
/**
 * Template Name: Contact Us
 * Contact Us page — Figma desktop quote 1477:8256 / tablet 1104:6918 / mobile 1473:7498 / CTA 2473:10613
 *
 * @package Excel_Ent
 */

get_header();
?>

<div class="contact-page">
	<?php get_template_part( 'template-parts/section', 'contact' ); ?>

	<?php
	get_template_part(
		'template-parts/section',
		'cta-neon',
		array(
			'primary_label'   => __( 'Contact Us', 'excel-ent' ),
			'primary_url'     => excel_ent_get_contact_url( 'quick-contacts' ),
			'secondary_label' => __( 'Register as an Artist', 'excel-ent' ),
			'secondary_url'   => excel_ent_get_contact_url( 'talent' ),
		)
	);
	?>
</div>

<?php
get_footer();
