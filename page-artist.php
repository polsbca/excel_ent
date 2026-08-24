<?php
/**
 * Template Name: Artist
 * Artist profile page — Figma 1113:872 / tablet 1099:3663 / mobile 1023:10057
 *
 * @package Excel_Ent
 */

get_header();
?>

<div class="artist-page">
	<?php get_template_part( 'template-parts/section', 'artist' ); ?>

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
