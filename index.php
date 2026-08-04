<?php
/**
 * Main template file.
 *
 * @package Excel_Ent
 */

get_header();
?>

<div class="content-wrap">
	<?php if ( have_posts() ) : ?>

		<header class="page-header">
			<?php if ( is_home() && ! is_front_page() ) : ?>
				<h1 class="page-title"><?php single_post_title(); ?></h1>
			<?php elseif ( is_archive() ) : ?>
				<?php the_archive_title( '<h1 class="page-title">', '</h1>' ); ?>
				<?php the_archive_description( '<div class="archive-description">', '</div>' ); ?>
			<?php elseif ( is_search() ) : ?>
				<h1 class="page-title">
					<?php
					printf(
						/* translators: %s: search query */
						esc_html__( 'Search results for: %s', 'excel-ent' ),
						'<span>' . esc_html( get_search_query() ) . '</span>'
					);
					?>
				</h1>
			<?php else : ?>
				<h1 class="page-title"><?php esc_html_e( 'Latest', 'excel-ent' ); ?></h1>
			<?php endif; ?>
		</header>

		<div class="posts-grid">
			<?php
			while ( have_posts() ) :
				the_post();
				get_template_part( 'template-parts/content', get_post_type() );
			endwhile;
			?>
		</div>

		<?php
		the_posts_pagination(
			array(
				'mid_size'  => 1,
				'prev_text' => __( 'Previous', 'excel-ent' ),
				'next_text' => __( 'Next', 'excel-ent' ),
			)
		);
		?>

	<?php else : ?>
		<?php get_template_part( 'template-parts/content', 'none' ); ?>
	<?php endif; ?>
</div>

<?php
get_footer();
