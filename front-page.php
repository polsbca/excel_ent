<?php
/**
 * Front page template.
 *
 * @package Excel_Ent
 */

get_header();
?>

<section class="hero" aria-label="<?php esc_attr_e( 'Hero', 'excel-ent' ); ?>">
	<div class="hero__media" aria-hidden="true">
		<div class="hero__glow hero__glow--one"></div>
		<div class="hero__glow hero__glow--two"></div>
		<div class="hero__grain"></div>
	</div>

	<div class="hero__content">
		<h1 class="hero__brand reveal" data-reveal><?php bloginfo( 'name' ); ?></h1>
		<p class="hero__title reveal" data-reveal>
			<?php
			$description = get_bloginfo( 'description', 'display' );
			echo $description
				? esc_html( $description )
				: esc_html__( 'Stories that move rooms.', 'excel-ent' );
			?>
		</p>
		<p class="hero__lede reveal" data-reveal>
			<?php esc_html_e( 'Live experiences, screen work, and cultural moments shaped with craft and clarity.', 'excel-ent' ); ?>
		</p>
		<div class="hero__actions reveal" data-reveal>
			<a class="btn btn--primary" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">
				<?php esc_html_e( 'Start a project', 'excel-ent' ); ?>
			</a>
			<a class="btn btn--ghost" href="#work">
				<?php esc_html_e( 'See the work', 'excel-ent' ); ?>
			</a>
		</div>
	</div>
</section>

<section id="work" class="section section--work">
	<div class="content-wrap">
		<header class="section__header reveal" data-reveal>
			<h2 class="section__title"><?php esc_html_e( 'Selected work', 'excel-ent' ); ?></h2>
			<p class="section__lede"><?php esc_html_e( 'A snapshot of recent projects and stories from the Excel Ent studio.', 'excel-ent' ); ?></p>
		</header>

		<?php
		$work_query = new WP_Query(
			array(
				'post_type'           => 'post',
				'posts_per_page'      => 3,
				'ignore_sticky_posts' => true,
				'no_found_rows'       => true,
			)
		);
		?>

		<?php if ( $work_query->have_posts() ) : ?>
			<div class="posts-grid">
				<?php
				while ( $work_query->have_posts() ) :
					$work_query->the_post();
					get_template_part( 'template-parts/content', get_post_type() );
				endwhile;
				wp_reset_postdata();
				?>
			</div>
		<?php else : ?>
			<p class="section__empty reveal" data-reveal>
				<?php esc_html_e( 'Publish posts to feature them here as selected work.', 'excel-ent' ); ?>
			</p>
		<?php endif; ?>
	</div>
</section>

<section class="section section--about">
	<div class="content-wrap section--about__grid">
		<div class="reveal" data-reveal>
			<h2 class="section__title"><?php esc_html_e( 'Built for entertainment brands', 'excel-ent' ); ?></h2>
			<p class="section__lede">
				<?php esc_html_e( 'Excel Ent is a custom WordPress theme ready for launches, festivals, artists, and production houses that need a sharp first impression.', 'excel-ent' ); ?>
			</p>
		</div>
		<ul class="feature-list reveal" data-reveal>
			<li><?php esc_html_e( 'Custom logo & primary navigation', 'excel-ent' ); ?></li>
			<li><?php esc_html_e( 'Blog, pages, search, and 404 templates', 'excel-ent' ); ?></li>
			<li><?php esc_html_e( 'Responsive layout with motion-ready sections', 'excel-ent' ); ?></li>
			<li><?php esc_html_e( 'Clean structure for rapid content growth', 'excel-ent' ); ?></li>
		</ul>
	</div>
</section>

<?php if ( have_posts() ) : ?>
	<section class="section section--page">
		<div class="content-wrap prose">
			<?php
			while ( have_posts() ) :
				the_post();
				the_content();
			endwhile;
			?>
		</div>
	</section>
<?php endif; ?>

<?php
get_footer();
