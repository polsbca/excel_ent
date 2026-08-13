<?php
/**
 * Template Name: Package
 * Packages page — Figma desktop 1464:3103 / 1126:2252 / tablet 1104:6130 / mobile 1023:10624
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
			'primary_url'     => home_url( '/contact/' ),
			'secondary_label' => __( 'Book As an Artist', 'excel-ent' ),
			'secondary_url'   => home_url( '/artist-registration/' ),
		)
	);
	?>
</div>

<?php
get_footer();
