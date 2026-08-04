<?php
/**
 * Page template.
 *
 * @package Excel_Ent
 */

get_header();
?>

<div class="content-wrap">
	<?php
	while ( have_posts() ) :
		the_post();
		get_template_part( 'template-parts/content', 'page' );
	endwhile;
	?>
</div>

<?php
get_footer();
