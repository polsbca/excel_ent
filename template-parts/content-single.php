<?php
/**
 * Template part for displaying single posts.
 *
 * @package Excel_Ent
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post' ); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		<div class="entry-meta">
			<?php
			excel_ent_posted_on();
			excel_ent_posted_by();
			?>
		</div>
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

	<footer class="entry-footer">
		<?php
		$categories_list = get_the_category_list( esc_html__( ', ', 'excel-ent' ) );
		if ( $categories_list ) {
			printf( '<span class="cat-links">%1$s %2$s</span>', esc_html__( 'Posted in', 'excel-ent' ), $categories_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}

		$tags_list = get_the_tag_list( '', esc_html__( ', ', 'excel-ent' ) );
		if ( $tags_list ) {
			printf( '<span class="tags-links">%1$s %2$s</span>', esc_html__( 'Tagged', 'excel-ent' ), $tags_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		?>
	</footer>
</article>
