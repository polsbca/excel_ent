<?php
/**
 * Template Name: Artist
 * Artist profile page — Figma 1113:872 / mobile 1023:10057
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
			'primary_url'     => home_url( '/contact/' ),
			'secondary_label' => __( 'Book As an Artist', 'excel-ent' ),
			'secondary_url'   => home_url( '/artist-registration/' ),
		)
	);
	?>
</div>

<?php
get_footer();
