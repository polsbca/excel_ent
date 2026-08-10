<?php
/**
 * Latest from the Blog section + detail modal (Figma 1173:70215 / 1023:6274).
 *
 * @package Excel_Ent
 */

$excel_ent_blog_uri = EXCEL_ENT_URI . '/assets/images/blog';
$excel_ent_blog_url = get_permalink( get_option( 'page_for_posts' ) );
$excel_ent_blog_url = $excel_ent_blog_url ? $excel_ent_blog_url : home_url( '/blog/' );

$excel_ent_blog_demo_body = '<p>' . esc_html__( 'Great pub nights don\'t happen by accident. The right DJ knows how to read a room, shift the energy at the right moment, and keep drinkers on their feet without pushing them out the door. Start by defining the vibe. A sports pub crowd wants sing-along anthems and 80s classics; a cocktail-driven venue leans towards deep house and disco cuts. Share your typical crowd age and peak hours before you book.', 'excel-ent' ) . '</p><p>' . esc_html__( 'Ask for references, watch a live clip, and always sign a written agreement covering set times, equipment, and cancellation. A professional DJ will welcome the paperwork — it\'s a sign they treat your venue seriously.', 'excel-ent' ) . '</p>';

$excel_ent_blog_query = new WP_Query(
	array(
		'post_type'           => 'post',
		'posts_per_page'      => 9,
		'ignore_sticky_posts' => true,
		'no_found_rows'       => true,
	)
);

$excel_ent_blog_posts = array();

if ( $excel_ent_blog_query->have_posts() ) {
	while ( $excel_ent_blog_query->have_posts() ) {
		$excel_ent_blog_query->the_post();

		$excel_ent_word_count = str_word_count( wp_strip_all_tags( get_the_content() ) );
		$excel_ent_minutes    = max( 1, (int) ceil( $excel_ent_word_count / 200 ) );
		$excel_ent_category   = get_the_category();
		$excel_ent_cat_name   = ! empty( $excel_ent_category[0] ) ? $excel_ent_category[0]->name : __( 'Blog', 'excel-ent' );
		$excel_ent_thumb      = get_the_post_thumbnail_url( get_the_ID(), 'large' );
		$excel_ent_content    = apply_filters( 'the_content', get_the_content() );

		if ( '' === trim( wp_strip_all_tags( $excel_ent_content ) ) ) {
			$excel_ent_content = $excel_ent_blog_demo_body;
		}

		$excel_ent_blog_posts[] = array(
			'title'    => get_the_title(),
			'excerpt'  => has_excerpt() ? get_the_excerpt() : wp_trim_words( get_the_content(), 24 ),
			'date'     => get_the_date( 'j F Y' ),
			'read'     => sprintf(
				/* translators: %d: estimated reading time in minutes */
				_n( '%d min read', '%d min read', $excel_ent_minutes, 'excel-ent' ),
				$excel_ent_minutes
			),
			'category' => $excel_ent_cat_name,
			'image'    => $excel_ent_thumb ? $excel_ent_thumb : $excel_ent_blog_uri . '/post-1.jpg',
			'url'      => get_permalink(),
			'content'  => $excel_ent_content,
		);
	}
	wp_reset_postdata();
}

if ( empty( $excel_ent_blog_posts ) ) {
	$excel_ent_demo = array(
		'title'    => __( 'How to Book the Perfect DJ for Your Pub Night', 'excel-ent' ),
		'excerpt'  => __( 'From reading the crowd to crafting the setlist — a guide to picking a DJ that keeps your regulars coming back.', 'excel-ent' ),
		'date'     => __( '12 July 2026', 'excel-ent' ),
		'read'     => __( '5 min read', 'excel-ent' ),
		'category' => __( 'Pub Night', 'excel-ent' ),
		'url'      => $excel_ent_blog_url,
		'content'  => $excel_ent_blog_demo_body . $excel_ent_blog_demo_body . $excel_ent_blog_demo_body,
	);

	for ( $excel_ent_i = 0; $excel_ent_i < 9; $excel_ent_i++ ) {
		$excel_ent_blog_posts[] = array_merge(
			$excel_ent_demo,
			array(
				'image' => $excel_ent_blog_uri . ( 0 === $excel_ent_i % 2 ? '/post-1.jpg' : '/post-2.jpg' ),
			)
		);
	}
}

$excel_ent_blog_total = count( $excel_ent_blog_posts );
?>
<section class="blog-section" id="blog" data-blog-section aria-label="<?php esc_attr_e( 'Latest from the Blog', 'excel-ent' ); ?>">
	<header class="blog-section__header reveal" data-reveal>
		<h2 class="blog-section__title"><?php esc_html_e( 'Latest from the Blog', 'excel-ent' ); ?></h2>

		<a class="blog-section__eyebrow magnetic" href="<?php echo esc_url( $excel_ent_blog_url ); ?>">
			<img src="<?php echo esc_url( $excel_ent_blog_uri . '/line-accent.svg' ); ?>" alt="" width="226" height="2" decoding="async">
			<span><?php esc_html_e( 'View All Articles', 'excel-ent' ); ?></span>
		</a>
	</header>

	<div class="blog-section__viewport reveal" data-reveal>
		<div class="blog-section__track" data-blog-track>
			<?php foreach ( $excel_ent_blog_posts as $excel_ent_index => $excel_ent_post ) : ?>
				<article
					class="blog-card<?php echo 1 === $excel_ent_index || ( 0 === $excel_ent_index && 1 === $excel_ent_blog_total ) ? ' is-active' : ''; ?>"
					data-blog-card
				>
					<div class="blog-card__media">
						<img
							class="blog-card__image"
							src="<?php echo esc_url( $excel_ent_post['image'] ); ?>"
							alt="<?php echo esc_attr( $excel_ent_post['title'] ); ?>"
							width="504"
							height="473"
							loading="<?php echo $excel_ent_index < 3 ? 'eager' : 'lazy'; ?>"
							decoding="async"
						>
						<span class="blog-card__badge"><?php echo esc_html( $excel_ent_post['category'] ); ?></span>
					</div>

					<div class="blog-card__meta">
						<span class="blog-card__meta-item">
							<img class="blog-card__icon blog-card__icon--light" src="<?php echo esc_url( $excel_ent_blog_uri . '/calendar-fill.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							<img class="blog-card__icon blog-card__icon--dark" src="<?php echo esc_url( $excel_ent_blog_uri . '/calendar-fill-dark.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							<span><?php echo esc_html( $excel_ent_post['date'] ); ?></span>
						</span>
						<span class="blog-card__meta-item">
							<img class="blog-card__icon blog-card__icon--light" src="<?php echo esc_url( $excel_ent_blog_uri . '/time-fill.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							<img class="blog-card__icon blog-card__icon--dark" src="<?php echo esc_url( $excel_ent_blog_uri . '/time-fill-dark.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							<span><?php echo esc_html( $excel_ent_post['read'] ); ?></span>
						</span>
					</div>

					<div class="blog-card__copy">
						<h3 class="blog-card__title"><?php echo esc_html( $excel_ent_post['title'] ); ?></h3>
						<p class="blog-card__excerpt"><?php echo esc_html( $excel_ent_post['excerpt'] ); ?></p>
					</div>

					<button
						type="button"
						class="blog-card__cta magnetic"
						data-blog-modal-open
						data-blog-title="<?php echo esc_attr( $excel_ent_post['title'] ); ?>"
						data-blog-excerpt="<?php echo esc_attr( $excel_ent_post['excerpt'] ); ?>"
						data-blog-date="<?php echo esc_attr( $excel_ent_post['date'] ); ?>"
						data-blog-read="<?php echo esc_attr( $excel_ent_post['read'] ); ?>"
						data-blog-category="<?php echo esc_attr( $excel_ent_post['category'] ); ?>"
						data-blog-image="<?php echo esc_url( $excel_ent_post['image'] ); ?>"
					>
						<?php esc_html_e( 'Read Article', 'excel-ent' ); ?>
					</button>

					<template data-blog-content>
						<?php echo $excel_ent_post['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- post content / curated demo HTML. ?>
					</template>
				</article>
			<?php endforeach; ?>
		</div>
	</div>

	<div class="blog-section__footer reveal" data-reveal>
		<div class="blog-section__progress" aria-hidden="true">
			<span class="blog-section__progress-fill" data-blog-progress></span>
		</div>

		<div class="blog-section__pager">
			<button
				type="button"
				class="blog-pager__btn blog-pager__btn--prev magnetic"
				data-blog-prev
				aria-label="<?php esc_attr_e( 'Previous articles', 'excel-ent' ); ?>"
			>
				<img src="<?php echo esc_url( $excel_ent_blog_uri . '/arrow-left.svg' ); ?>" alt="" width="42" height="42" decoding="async">
			</button>

			<p class="blog-section__count">
				<span data-blog-current><?php echo esc_html( (string) ( $excel_ent_blog_total > 2 ? 2 : 1 ) ); ?></span>/<span data-blog-total><?php echo esc_html( (string) $excel_ent_blog_total ); ?></span>
			</p>

			<button
				type="button"
				class="blog-pager__btn blog-pager__btn--next magnetic"
				data-blog-next
				aria-label="<?php esc_attr_e( 'Next articles', 'excel-ent' ); ?>"
			>
				<img src="<?php echo esc_url( $excel_ent_blog_uri . '/arrow-right.svg' ); ?>" alt="" width="42" height="42" decoding="async">
			</button>
		</div>
	</div>
</section>

<div class="blog-modal" data-blog-modal hidden>
	<button type="button" class="blog-modal__backdrop" data-blog-modal-close aria-label="<?php esc_attr_e( 'Close article', 'excel-ent' ); ?>"></button>

	<div class="blog-modal__shell">
		<div
			class="blog-modal__dialog"
			role="dialog"
			aria-modal="true"
			aria-labelledby="blog-modal-title"
			data-blog-modal-dialog
			tabindex="-1"
		>
			<div class="blog-modal__hero">
				<img
					class="blog-modal__image"
					src=""
					alt=""
					width="1480"
					height="338"
					decoding="async"
					data-blog-modal-image
				>
				<div class="blog-modal__hero-bar">
					<span class="blog-modal__badge" data-blog-modal-category></span>
					<div class="blog-modal__meta">
						<span class="blog-modal__meta-item">
							<img src="<?php echo esc_url( $excel_ent_blog_uri . '/calendar-fill.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							<span data-blog-modal-date></span>
						</span>
						<span class="blog-modal__meta-item">
							<img src="<?php echo esc_url( $excel_ent_blog_uri . '/time-fill.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							<span data-blog-modal-read></span>
						</span>
					</div>
				</div>
			</div>

			<div class="blog-modal__main">
				<div class="blog-modal__scroll" data-blog-modal-scroll>
					<header class="blog-modal__intro">
						<h2 class="blog-modal__title" id="blog-modal-title" data-blog-modal-title></h2>
						<p class="blog-modal__excerpt" data-blog-modal-excerpt></p>
					</header>
					<div class="blog-modal__content" data-blog-modal-content></div>
				</div>
			</div>
		</div>

		<button
			type="button"
			class="blog-modal__close magnetic"
			data-blog-modal-close
			aria-label="<?php esc_attr_e( 'Close article', 'excel-ent' ); ?>"
		>
			<img src="<?php echo esc_url( $excel_ent_blog_uri . '/close-large-line.svg' ); ?>" alt="" width="24" height="24" decoding="async">
		</button>
	</div>
</div>
