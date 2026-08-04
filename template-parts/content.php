<?php
/**
 * Template part for displaying posts in lists.
 *
 * @package Excel_Ent
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card reveal' ); ?> data-reveal>
	<?php excel_ent_post_thumbnail(); ?>

	<div class="post-card__body">
		<header class="entry-header">
			<?php
			the_title(
				sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ),
				'</a></h2>'
			);
			?>
			<div class="entry-meta">
				<?php excel_ent_posted_on(); ?>
			</div>
		</header>

		<div class="entry-summary">
			<?php the_excerpt(); ?>
		</div>
	</div>
</article>
