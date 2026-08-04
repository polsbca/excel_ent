<?php
/**
 * Most Popular Services section (Figma 898:8715).
 *
 * @package Excel_Ent
 */

$excel_ent_services_uri = EXCEL_ENT_URI . '/assets/images/services';
$excel_ent_quote        = excel_ent_get_quote_url();
$excel_ent_artists_url  = home_url( '/artists/' );

$excel_ent_service_cards = array(
	array(
		'title' => __( 'Indie Band Night', 'excel-ent' ),
		'price' => '£1,200',
		'image' => $excel_ent_services_uri . '/card-1.jpg',
		'link'  => home_url( '/services/indie-band-night/' ),
	),
	array(
		'title' => __( 'Indie Band Night', 'excel-ent' ),
		'price' => '£1,200',
		'image' => $excel_ent_services_uri . '/card-2.jpg',
		'link'  => home_url( '/services/indie-band-night/' ),
	),
	array(
		'title' => __( 'Indie Band Night', 'excel-ent' ),
		'price' => '£1,200',
		'image' => $excel_ent_services_uri . '/card-3.jpg',
		'link'  => home_url( '/services/indie-band-night/' ),
	),
	array(
		'title' => __( 'Indie Band Night', 'excel-ent' ),
		'price' => '£1,200',
		'image' => $excel_ent_services_uri . '/card-4.jpg',
		'link'  => home_url( '/services/indie-band-night/' ),
	),
);

$excel_ent_featured = array(
	'title'    => __( 'Live Party Band', 'excel-ent' ),
	'price'    => '£1,200',
	'bookings' => __( '500+ Bookings', 'excel-ent' ),
	'rating'   => '4.9',
	'location' => __( 'Available Across the UK', 'excel-ent' ),
	'duration' => __( 'Duration: 3–4 Hours', 'excel-ent' ),
	'image'    => $excel_ent_services_uri . '/featured.jpg',
);
?>
<section class="services-section" id="services" aria-label="<?php esc_attr_e( 'Most Popular Services', 'excel-ent' ); ?>">
	<header class="services-section__header reveal" data-reveal>
		<h2 class="services-section__title">
			<span><?php esc_html_e( 'Most Popular', 'excel-ent' ); ?></span>
			<span><?php esc_html_e( 'Services', 'excel-ent' ); ?></span>
		</h2>

		<div class="services-section__aside">
			<p class="services-section__lede">
				<?php esc_html_e( "See who's making the biggest impact this year with exceptional performances and outstanding client reviews.", 'excel-ent' ); ?>
			</p>
			<a class="services-section__eyebrow magnetic" href="<?php echo esc_url( $excel_ent_artists_url ); ?>">
				<img src="<?php echo esc_url( $excel_ent_services_uri . '/line-accent.svg' ); ?>" alt="" width="226" height="2" decoding="async">
				<span><?php esc_html_e( 'View All Artists', 'excel-ent' ); ?></span>
			</a>
		</div>
	</header>

	<div class="services-section__grid reveal" data-reveal>
		<div class="services-grid">
			<?php foreach ( $excel_ent_service_cards as $excel_ent_index => $excel_ent_card ) : ?>
				<a class="service-card magnetic" href="<?php echo esc_url( $excel_ent_card['link'] ); ?>">
					<img
						class="service-card__image"
						src="<?php echo esc_url( $excel_ent_card['image'] ); ?>"
						alt="<?php echo esc_attr( $excel_ent_card['title'] ); ?>"
						width="296"
						height="345"
						loading="<?php echo $excel_ent_index < 2 ? 'eager' : 'lazy'; ?>"
						decoding="async"
					>
					<span class="service-card__overlay" aria-hidden="true"></span>
					<span class="service-card__content">
						<span class="service-card__name"><?php echo esc_html( $excel_ent_card['title'] ); ?></span>
						<span class="service-card__price-block">
							<strong class="service-card__price"><?php echo esc_html( $excel_ent_card['price'] ); ?></strong>
							<span class="service-card__price-label"><?php esc_html_e( 'Starting From:', 'excel-ent' ); ?></span>
						</span>
					</span>
				</a>
			<?php endforeach; ?>
		</div>

		<article class="service-featured">
			<img
				class="service-featured__image"
				src="<?php echo esc_url( $excel_ent_featured['image'] ); ?>"
				alt="<?php echo esc_attr( $excel_ent_featured['title'] ); ?>"
				width="1248"
				height="690"
				loading="lazy"
				decoding="async"
			>
			<span class="service-featured__overlay" aria-hidden="true"></span>

			<div class="service-featured__inner">
				<div class="service-featured__top">
					<div class="service-featured__stats">
						<div class="service-featured__stat">
							<p class="service-featured__stat-label"><?php echo esc_html( $excel_ent_featured['bookings'] ); ?></p>
							<p class="service-featured__stat-value">
								<strong><?php echo esc_html( $excel_ent_featured['rating'] ); ?></strong>
								<span><?php esc_html_e( 'Rating', 'excel-ent' ); ?></span>
							</p>
						</div>
						<div class="service-featured__stat">
							<p class="service-featured__stat-label"><?php esc_html_e( 'Starting From:', 'excel-ent' ); ?></p>
							<p class="service-featured__stat-price"><?php echo esc_html( $excel_ent_featured['price'] ); ?></p>
						</div>
					</div>

					<a class="service-featured__cta magnetic" href="<?php echo esc_url( $excel_ent_quote ); ?>">
						<?php esc_html_e( 'Get A Quote', 'excel-ent' ); ?>
					</a>
				</div>

				<div class="service-featured__bottom">
					<div class="service-featured__info">
						<p class="service-featured__location">
							<img src="<?php echo esc_url( $excel_ent_services_uri . '/map-pin-2-line.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							<span><?php echo esc_html( $excel_ent_featured['location'] ); ?></span>
						</p>
						<h3 class="service-featured__title"><?php echo esc_html( $excel_ent_featured['title'] ); ?></h3>
					</div>
					<p class="service-featured__duration"><?php echo esc_html( $excel_ent_featured['duration'] ); ?></p>
				</div>
			</div>
		</article>
	</div>
</section>
