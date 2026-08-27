<?php
/**
 * Template Name: About
 * About page — Figma desktop 2202:35292 / tablet 1099:5036 / mobile 1023:8454
 *
 * @package Excel_Ent
 */

get_header();
?>

<div class="about-page">
	<?php get_template_part( 'template-parts/section', 'about' ); ?>

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
