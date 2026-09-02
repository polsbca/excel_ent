<?php
/**
 * Template Name: Package
 * Packages page — Figma desktop 1464:3103 / tablet 1104:6130 / mobile hero 2473:10680 / CTA 2473:10613
 *
 * @package Excel_Ent
 */

get_header();
?>

<div class="package-page">
	<?php get_template_part( 'template-parts/section', 'package' ); ?>

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
