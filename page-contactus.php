<?php
/**
 * Template Name: Contact Us
 * Contact Us page — Figma desktop quote 1477:8256 / tablet 1104:6918 / mobile 1473:7498
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
			'primary_url'     => home_url( '/contact/' ),
			'secondary_label' => __( 'Book As an Artist', 'excel-ent' ),
			'secondary_url'   => home_url( '/artist-registration/' ),
		)
	);
	?>
</div>

<?php
get_footer();
