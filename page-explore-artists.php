<?php
/**
 * Template Name: Explore Artists
 * Explore Artists listing — Figma 1224:89355 / mobile 1023:6857
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
			'primary_url'     => home_url( '/contact/' ),
			'secondary_label' => __( 'Book As an Artist', 'excel-ent' ),
			'secondary_url'   => home_url( '/artist-registration/' ),
		)
	);
	?>
</div>

<?php
get_footer();
