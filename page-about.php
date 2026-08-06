<?php
/**
 * Template Name: About
 * About page — Figma 1126:1218
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
			'primary_url'     => home_url( '/contact/' ),
			'secondary_label' => __( 'Book As an Artist', 'excel-ent' ),
			'secondary_url'   => home_url( '/artist-registration/' ),
		)
	);
	?>
</div>

<?php
get_footer();
