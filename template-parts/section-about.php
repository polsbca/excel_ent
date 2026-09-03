<?php
/**
 * About page content — Figma desktop 2202:35943 / 2202:35975 / tablet 1099:5036 / mobile 1023:8454
 *
 * @package Excel_Ent
 */

$excel_ent_uri = EXCEL_ENT_URI . '/assets/images/about-page';

$excel_ent_why = array(
	__( 'Fully vetted, professional performers', 'excel-ent' ),
	__( 'Backup cover guarantee (no last-minute stress)', 'excel-ent' ),
	__( 'No fixed-term contracts', 'excel-ent' ),
	__( 'Fast, reliable communication', 'excel-ent' ),
	__( 'Marketing support to promote your events', 'excel-ent' ),
);

$excel_ent_stats = array(
	array(
		'value' => '30+',
		'label' => __( 'year industry experience', 'excel-ent' ),
	),
	array(
		'value' => '100%',
		'label' => __( "Verified\nArtists", 'excel-ent' ),
	),
	array(
		'value' => 'PLI',
		'label' => __( 'Covered & PAT Tested Equipment', 'excel-ent' ),
	),
	array(
		'value' => '4.8',
		'label' => __( 'Rated by Venues', 'excel-ent' ),
	),
);

$excel_ent_venues = array(
	__( 'HOTELS', 'excel-ent' ),
	__( 'GOLF CLUBS', 'excel-ent' ),
	__( 'GOLF CLUBS', 'excel-ent' ),
	__( 'GOLF CLUBS', 'excel-ent' ),
	__( 'WEDDING VENUES', 'excel-ent' ),
	__( 'HOTELS', 'excel-ent' ),
	__( 'DJs', 'excel-ent' ),
	__( 'CORPORATE EVENTS', 'excel-ent' ),
);

$excel_ent_value_points = array(
	__( 'We focus on solving the key challenges venues face:', 'excel-ent' ),
	__( 'Increasing midweek and weekend footfall', 'excel-ent' ),
	__( 'Encouraging customers to stay longer', 'excel-ent' ),
	__( 'Creating repeatable, profitable event nights', 'excel-ent' ),
	__( 'Enhancing overall customer experience and loyalty', 'excel-ent' ),
);

$excel_ent_approach = array(
	__( 'Tailored entertainment based on your audience', 'excel-ent' ),
	__( 'Trial nights to test what works (low risk)', 'excel-ent' ),
	__( 'Flexible booking options including residencies', 'excel-ent' ),
	__( 'Support with branding, promotion, and consistency', 'excel-ent' ),
);

$excel_ent_slides = array(
	$excel_ent_uri . '/approach-slide-1.jpg',
	$excel_ent_uri . '/value-venue.jpg',
	$excel_ent_uri . '/collage-bottom.jpg',
	$excel_ent_uri . '/collage-main.jpg',
);

$excel_ent_reviews = array();
$excel_ent_review_seed = array(
	array(
		'quote'  => __( 'Would like to say what a fantastic agent Dario Day is to work for, very professional and a top agency, always very helpful and does a great job of managing his acts and venues.', 'excel-ent' ),
		'author' => __( 'Suzanne Martin', 'excel-ent' ),
	),
	array(
		'quote'  => __( 'Would like to say what a fantastic agent Dario Day is to work for, very professional and a top agency, always very helpful and does a great job of managing his acts and venues.', 'excel-ent' ),
		'author' => __( 'James Thornton', 'excel-ent' ),
	),
	array(
		'quote'  => __( 'Would like to say what a fantastic agent Dario Day is to work for, very professional and a top agency, always very helpful and does a great job of managing his acts and venues.', 'excel-ent' ),
		'author' => __( 'Emily Clarke', 'excel-ent' ),
	),
);
for ( $excel_ent_ri = 0; $excel_ent_ri < 12; $excel_ent_ri++ ) {
	$excel_ent_reviews[] = $excel_ent_review_seed[ $excel_ent_ri % count( $excel_ent_review_seed ) ];
}

$excel_ent_google_reviews = 'https://www.google.com/search?q=Excel+Entertainment+reviews';
?>

<!-- Intro + partner strip = one mobile hero viewport (Figma 2331:5610) -->
<div class="about-intro-pin" data-about-intro-pin>
	<div class="about-intro__scroll-pad" aria-hidden="true"></div>
	<div class="about-intro__unit" data-about-intro-unit>
		<div class="about-intro__unit-inner">
<section class="about-intro" aria-label="<?php esc_attr_e( 'About Excel Entertainment', 'excel-ent' ); ?>" data-about-intro>
	<div class="about-intro__inner">
	<header class="about-intro__header">
		<h1 class="about-intro__title"><?php esc_html_e( 'ABOUT US', 'excel-ent' ); ?></h1>
		<p class="about-intro__eyebrow"><?php esc_html_e( 'Trusted · Experienced · Personal', 'excel-ent' ); ?></p>
	</header>

	<!-- Mobile media strip — Figma 1023:8503 / 2331:5615 -->
	<div
		class="about-intro__media"
		data-about-intro-media
		aria-label="<?php esc_attr_e( 'About gallery', 'excel-ent' ); ?>"
	>
		<figure class="about-intro__media-item">
			<img
				src="<?php echo esc_url( $excel_ent_uri . '/hero-mobile-1.jpg' ); ?>"
				alt=""
				width="330"
				height="263"
				decoding="async"
				fetchpriority="high"
			>
		</figure>
		<figure class="about-intro__media-item">
			<img
				src="<?php echo esc_url( $excel_ent_uri . '/hero-mobile-2.jpg' ); ?>"
				alt=""
				width="330"
				height="263"
				decoding="async"
				loading="lazy"
			>
		</figure>
		<figure class="about-intro__media-item about-intro__media-item--tablet-only">
			<img
				src="<?php echo esc_url( $excel_ent_uri . '/collage-main.jpg' ); ?>"
				alt=""
				width="330"
				height="363"
				decoding="async"
				loading="lazy"
			>
		</figure>
	</div>

	<div class="about-intro__body">
		<div class="about-intro__collage">
			<div class="about-intro__collage-main">
				<img
					src="<?php echo esc_url( $excel_ent_uri . '/collage-main.jpg' ); ?>"
					alt=""
					width="683"
					height="520"
					decoding="async"
					fetchpriority="high"
				>
			</div>
			<div class="about-intro__collage-stack">
				<img
					src="<?php echo esc_url( $excel_ent_uri . '/collage-top.jpg' ); ?>"
					alt=""
					width="240"
					height="244"
					decoding="async"
				>
				<img
					src="<?php echo esc_url( $excel_ent_uri . '/collage-bottom.jpg' ); ?>"
					alt=""
					width="240"
					height="244"
					decoding="async"
					loading="lazy"
				>
			</div>
		</div>

		<div class="about-intro__copy">
			<h2 class="about-intro__heading"><?php esc_html_e( 'Entertainment Without Compromise', 'excel-ent' ); ?></h2>
			<p class="about-intro__lede">
				<?php esc_html_e( "Excel Entertainment isn't just an entertainment agency, we're the team behind unforgettable experiences. We specialise in delivering high-quality, fully vetted entertainment solutions designed to help venues increase footfall, customer retention, and bar revenue through structured and reliable live entertainment.", 'excel-ent' ); ?>
			</p>
		</div>
	</div>
	</div>
</section>
<?php get_template_part( 'template-parts/section', 'awards' ); ?>
		</div>
	</div>
</div>

<!-- Value — mobile viewport Figma 2331:5690 / 2331:5691 -->
<div class="about-value-pin" data-about-value-pin>
	<div class="about-value__scroll-pad" aria-hidden="true"></div>
	<div class="about-value__unit" data-about-value-unit>
		<div class="about-value__unit-inner">
			<section class="about-value" aria-label="<?php esc_attr_e( 'How we add value', 'excel-ent' ); ?>" data-about-value>
				<div class="about-value__inner">
				<div class="about-value__row">
					<div class="about-value__media reveal" data-reveal>
						<img
							src="<?php echo esc_url( $excel_ent_uri . '/value-venue.jpg' ); ?>"
							alt=""
							width="851"
							height="692"
							decoding="async"
							loading="lazy"
						>
					</div>
					<div class="about-value__copy reveal" data-reveal>
						<h2 class="about-value__title"><?php esc_html_e( 'How We Add Value to Your Venue', 'excel-ent' ); ?></h2>
						<div class="about-value__details">
							<ul class="about-value__list">
								<?php foreach ( $excel_ent_value_points as $excel_ent_point ) : ?>
									<li><?php echo esc_html( $excel_ent_point ); ?></li>
								<?php endforeach; ?>
							</ul>
							<p class="about-value__note">
								<?php esc_html_e( 'For example, structured entertainment nights such as Weekend Party Nights or Sunday Sessions can significantly improve consistency in trade and customer return rates.', 'excel-ent' ); ?>
							</p>
						</div>
					</div>
				</div>

				<div class="about-stats">
					<div class="about-stats__grid stagger">
						<?php foreach ( $excel_ent_stats as $excel_ent_si => $excel_ent_stat ) : ?>
							<div
								class="about-stats__item reveal"
								data-reveal
								style="--i: <?php echo esc_attr( (string) $excel_ent_si ); ?>; transition-delay: <?php echo esc_attr( (string) ( $excel_ent_si * 80 ) ); ?>ms"
							>
								<p class="about-stats__value"><?php echo esc_html( $excel_ent_stat['value'] ); ?></p>
								<p class="about-stats__label"><?php echo esc_html( $excel_ent_stat['label'] ); ?></p>
							</div>
						<?php endforeach; ?>
					</div>
					<ul class="about-stats__venues reveal" data-reveal>
						<?php foreach ( $excel_ent_venues as $excel_ent_venue ) : ?>
							<li><?php echo esc_html( $excel_ent_venue ); ?></li>
						<?php endforeach; ?>
					</ul>
				</div>
				</div>
			</section>
		</div>
	</div>
</div>

<!-- Why choose — mobile viewport Figma 2331:5728 -->
<div class="about-why-pin" data-about-why-pin>
	<div class="about-why__scroll-pad" aria-hidden="true"></div>
	<div class="about-why__unit" data-about-why-unit>
		<div class="about-why__unit-inner">
<section class="about-why" aria-label="<?php esc_attr_e( 'Why venues choose Excel', 'excel-ent' ); ?>" data-about-why>
	<div class="about-why__inner">
	<header class="about-why__header reveal" data-reveal>
		<h2 class="about-why__title">
			<span><?php esc_html_e( 'Why Venues Choose', 'excel-ent' ); ?></span>
			<span><?php esc_html_e( 'Excel Entertainment', 'excel-ent' ); ?></span>
		</h2>
		<p class="about-why__lede">
			<?php esc_html_e( 'We position ourselves as a reliable, long-term partner making your job easier while helping your venue grow.', 'excel-ent' ); ?>
		</p>
	</header>

	<ol class="about-why__list">
		<?php foreach ( $excel_ent_why as $excel_ent_i => $excel_ent_item ) : ?>
			<li class="about-why__item reveal" data-reveal style="--i: <?php echo esc_attr( (string) $excel_ent_i ); ?>; transition-delay: <?php echo esc_attr( (string) ( $excel_ent_i * 80 ) ); ?>ms">
				<span class="about-why__num" aria-hidden="true"><?php echo esc_html( str_pad( (string) ( $excel_ent_i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
				<span class="about-why__text"><?php echo esc_html( $excel_ent_item ); ?></span>
			</li>
		<?php endforeach; ?>
	</ol>
	</div>
</section>
		</div>
	</div>
</div>

<!-- Approach — mobile viewport Figma 2331:5756 -->
<div class="about-approach-pin" data-about-approach-pin>
	<div class="about-approach__scroll-pad" aria-hidden="true"></div>
	<div class="about-approach__unit" data-about-approach-unit>
		<div class="about-approach__unit-inner">
<section class="about-approach" aria-label="<?php esc_attr_e( 'Our approach to growth', 'excel-ent' ); ?>" data-about-approach>
	<div class="about-approach__inner">
	<div class="about-approach__slider reveal" data-reveal>
		<div class="about-approach__viewport">
			<div class="about-approach__track" data-about-approach-track>
				<?php foreach ( $excel_ent_slides as $excel_ent_si => $excel_ent_slide ) : ?>
					<figure class="about-approach__slide<?php echo 0 === $excel_ent_si ? ' is-active' : ''; ?>" data-about-approach-slide>
						<img
							src="<?php echo esc_url( $excel_ent_slide ); ?>"
							alt=""
							width="1920"
							height="782"
							decoding="async"
							loading="<?php echo 0 === $excel_ent_si ? 'eager' : 'lazy'; ?>"
						>
					</figure>
				<?php endforeach; ?>
			</div>
		</div>
		<div class="about-approach__dots" role="tablist" aria-label="<?php esc_attr_e( 'Approach gallery', 'excel-ent' ); ?>">
			<?php foreach ( $excel_ent_slides as $excel_ent_si => $excel_ent_slide ) : ?>
				<button
					type="button"
					class="about-approach__dot<?php echo 0 === $excel_ent_si ? ' is-active' : ''; ?>"
					role="tab"
					aria-selected="<?php echo 0 === $excel_ent_si ? 'true' : 'false'; ?>"
					aria-label="<?php echo esc_attr( sprintf( /* translators: %d: slide number */ __( 'Slide %d', 'excel-ent' ), $excel_ent_si + 1 ) ); ?>"
					data-about-approach-dot
				></button>
			<?php endforeach; ?>
		</div>
	</div>

	<div class="about-approach__body">
		<div class="about-approach__copy reveal" data-reveal>
			<h2 class="about-approach__title"><?php esc_html_e( 'Our Approach to Growth', 'excel-ent' ); ?></h2>
			<p class="about-approach__lede"><?php esc_html_e( 'Our goal is to help you build repeat business, stronger event nights, and predictable revenue streams.', 'excel-ent' ); ?></p>
		</div>
		<div class="about-approach__divider" aria-hidden="true"></div>
		<div class="about-approach__aside">
			<p class="about-approach__lede-strong reveal" data-reveal><?php esc_html_e( 'We take a strategic view when working with venues:', 'excel-ent' ); ?></p>
			<ul class="about-approach__points stagger">
				<?php foreach ( $excel_ent_approach as $excel_ent_ai => $excel_ent_point ) : ?>
					<li
						class="reveal"
						data-reveal
						style="--i: <?php echo esc_attr( (string) $excel_ent_ai ); ?>; transition-delay: <?php echo esc_attr( (string) ( $excel_ent_ai * 80 ) ); ?>ms"
					>
						<span class="about-approach__bullet" aria-hidden="true"></span>
						<span><?php echo esc_html( $excel_ent_point ); ?></span>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
	</div>
</section>
		</div>
	</div>
</div>

<?php get_template_part( 'template-parts/section', 'newsletter' ); ?>

<!-- Reviews — mobile viewport Figma 2331:5795 -->
<div class="about-reviews-pin" data-about-reviews-pin>
	<div class="about-reviews__scroll-pad" aria-hidden="true"></div>
	<div class="about-reviews__unit" data-about-reviews-unit>
		<div class="about-reviews__unit-inner">
<section class="about-reviews" aria-label="<?php esc_attr_e( 'Client reviews', 'excel-ent' ); ?>" data-about-reviews>
	<div class="about-reviews__inner">
	<div class="about-reviews__main">
		<div class="about-reviews__heading reveal" data-reveal>
			<h2 class="about-reviews__title about-reviews__title--desktop">
				<span><?php esc_html_e( 'OUR', 'excel-ent' ); ?></span>
				<span><?php esc_html_e( 'HAPPY', 'excel-ent' ); ?></span>
				<span><?php esc_html_e( 'CLIENTS!', 'excel-ent' ); ?></span>
			</h2>
			<h2 class="about-reviews__title about-reviews__title--mobile"><?php esc_html_e( 'Loved by Clients', 'excel-ent' ); ?></h2>
			<a
				class="about-reviews__google magnetic"
				href="<?php echo esc_url( $excel_ent_google_reviews ); ?>"
				target="_blank"
				rel="noopener noreferrer"
			>
				<?php esc_html_e( 'Read Google Reviews', 'excel-ent' ); ?>
			</a>
			<span class="about-reviews__rule" aria-hidden="true"></span>
		</div>

		<div class="about-reviews__viewport">
			<div class="about-reviews__track stagger" data-about-reviews-track>
				<?php foreach ( $excel_ent_reviews as $excel_ent_ri => $excel_ent_review ) : ?>
					<article
						class="about-reviews__card reveal"
						data-reveal
						style="--i: <?php echo esc_attr( (string) ( $excel_ent_ri % 3 ) ); ?>; transition-delay: <?php echo esc_attr( (string) ( ( $excel_ent_ri % 3 ) * 80 ) ); ?>ms"
					>
						<p class="about-reviews__num" aria-hidden="true"><?php echo esc_html( str_pad( (string) min( $excel_ent_ri + 1, 4 ), 2, '0', STR_PAD_LEFT ) ); ?></p>
						<blockquote class="about-reviews__quote">
							<p><?php echo esc_html( $excel_ent_review['quote'] ); ?></p>
						</blockquote>
						<div class="about-reviews__meta">
							<span class="about-reviews__avatar" aria-hidden="true">
								<?php echo esc_html( strtoupper( substr( $excel_ent_review['author'], 0, 1 ) ) ); ?>
							</span>
							<div class="about-reviews__meta-copy">
								<p class="about-reviews__author"><?php echo esc_html( $excel_ent_review['author'] ); ?></p>
								<p class="about-reviews__stars" aria-label="<?php esc_attr_e( '5 star rating', 'excel-ent' ); ?>">_ _ _ _ _</p>
							</div>
						</div>
					</article>
				<?php endforeach; ?>
			</div>
		</div>
	</div>

	<div class="about-reviews__footer">
		<p class="about-reviews__hint"><?php esc_html_e( 'Scroll to view more reviews', 'excel-ent' ); ?></p>
		<div class="about-reviews__pager" role="tablist" aria-label="<?php esc_attr_e( 'Review pages', 'excel-ent' ); ?>" data-about-reviews-pager>
			<?php for ( $excel_ent_page = 1; $excel_ent_page <= 4; $excel_ent_page++ ) : ?>
				<button
					type="button"
					class="about-reviews__page<?php echo 1 === $excel_ent_page ? ' is-active' : ''; ?>"
					role="tab"
					aria-selected="<?php echo 1 === $excel_ent_page ? 'true' : 'false'; ?>"
					aria-label="<?php echo esc_attr( sprintf( /* translators: %d: page number */ __( 'Reviews page %d', 'excel-ent' ), $excel_ent_page ) ); ?>"
					data-about-reviews-page="<?php echo esc_attr( (string) ( $excel_ent_page - 1 ) ); ?>"
				><?php echo esc_html( (string) $excel_ent_page ); ?></button>
			<?php endfor; ?>
		</div>
	</div>
	</div>
</section>
		</div>
	</div>
</div>
