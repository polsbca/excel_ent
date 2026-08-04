<?php
/**
 * Template part for displaying pages.
 *
 * @package Excel_Ent
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'page-article' ); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header>

	<?php excel_ent_post_thumbnail( 'excel-ent-hero' ); ?>

	<div class="entry-content prose">
		<?php
		the_content();

		wp_link_pages(
			array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'excel-ent' ),
				'after'  => '</div>',
			)
		);
		?>
	</div>
</article>
