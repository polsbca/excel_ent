<?php
/**
 * Template Name: Explore Artists
 * Explore Artists listing — Figma desktop 2202:32051 / tablet 1099:2920 / mobile 1023:6857
 *
 * @package Excel_Ent
 */

get_header();
?>

<div class="explore-artists-page">
	<?php get_template_part( 'template-parts/section', 'explore-artists' ); ?>

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
