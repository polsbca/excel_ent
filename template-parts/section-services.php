<?php
/**
 * Most Popular Services section (Figma 1084:2263 desktop / 1023:3144 mobile).
 *
 * @package Excel_Ent
 */

$excel_ent_services_uri = EXCEL_ENT_URI . '/assets/images/services';
$excel_ent_services_url = home_url( '/services/' );

$excel_ent_service_cards = array(
	array(
		'title' => __( 'Wedding DJs', 'excel-ent' ),
		'price' => '£1,200',
		'image' => $excel_ent_services_uri . '/card-1.jpg',
		'link'  => home_url( '/services/wedding-djs/' ),
	),
	array(
		'title' => __( 'Live party bands', 'excel-ent' ),
		'price' => '£1,200',
		'image' => $excel_ent_services_uri . '/card-2.jpg',
		'link'  => home_url( '/services/live-party-bands/' ),
	),
	array(
		'title' => __( 'Solo acoustic acts', 'excel-ent' ),
		'price' => '£1,200',
		'image' => $excel_ent_services_uri . '/card-3.jpg',
		'link'  => home_url( '/services/solo-acoustic-acts/' ),
	),
	array(
		'title' => __( 'Tribute acts', 'excel-ent' ),
		'price' => '£1,200',
		'image' => $excel_ent_services_uri . '/card-4.jpg',
		'link'  => home_url( '/services/tribute-acts/' ),
	),
);

$excel_ent_featured = array(
	'title'        => __( 'Roxy Rockz', 'excel-ent' ),
	'subtitle'     => __( 'Live Party Band', 'excel-ent' ),
	'price'        => '£1,200',
	'rating'       => '4.9',
	'rating_label' => __( 'Rating', 'excel-ent' ),
	'bookings'     => __( '500+ Bookings', 'excel-ent' ),
	'location'     => __( 'Available Across the UK', 'excel-ent' ),
	'duration'     => __( 'Duration: 3–4 Hours', 'excel-ent' ),
	'image'        => $excel_ent_services_uri . '/featured.jpg',
	'link'         => home_url( '/services/live-party-bands/' ),
);
?>
<section class="services-section" id="services" aria-label="<?php esc_attr_e( 'Most Popular Services', 'excel-ent' ); ?>">
	<header class="services-section__header reveal" data-reveal>
		<div class="services-section__heading">
			<h2 class="services-section__title">
				<span class="services-section__title-line"><?php esc_html_e( 'Most Popular', 'excel-ent' ); ?></span>
				<span class="services-section__title-line"><?php esc_html_e( 'Services', 'excel-ent' ); ?></span>
			</h2>
			<p class="services-section__lede">
				<?php esc_html_e( 'From intimate local pubs to large golf clubs and luxury hotels — Excel supplies entertainment that fits the setting perfectly.', 'excel-ent' ); ?>
			</p>
		</div>

		<a class="services-section__eyebrow magnetic" href="<?php echo esc_url( $excel_ent_services_url ); ?>">
			<img src="<?php echo esc_url( $excel_ent_services_uri . '/line-accent.svg' ); ?>" alt="" width="226" height="2" decoding="async">
			<span class="services-section__eyebrow-label services-section__eyebrow-label--desktop"><?php esc_html_e( 'View All Services', 'excel-ent' ); ?></span>
			<span class="services-section__eyebrow-label services-section__eyebrow-label--mobile"><?php esc_html_e( 'Venue Types', 'excel-ent' ); ?></span>
		</a>
	</header>

	<div class="services-section__grid reveal" data-reveal>
		<div class="services-grid">
			<?php foreach ( $excel_ent_service_cards as $excel_ent_index => $excel_ent_card ) : ?>
				<a class="service-card magnetic" href="<?php echo esc_url( $excel_ent_card['link'] ); ?>">
					<img
						class="service-card__image"
						src="<?php echo esc_url( $excel_ent_card['image'] ); ?>"
						alt="<?php echo esc_attr( $excel_ent_card['title'] ); ?>"
						width="266"
						height="337"
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
				width="1231"
				height="674"
				loading="lazy"
				decoding="async"
			>
			<span class="service-featured__overlay" aria-hidden="true"></span>

			<div class="service-featured__inner">
				<div class="service-featured__top">
					<div class="service-featured__stats">
						<div class="service-featured__rating">
							<p class="service-featured__rating-row">
								<span class="service-featured__rating-score"><?php echo esc_html( $excel_ent_featured['rating'] ); ?></span>
								<span class="service-featured__rating-label"><?php echo esc_html( $excel_ent_featured['rating_label'] ); ?></span>
							</p>
							<p class="service-featured__bookings"><?php echo esc_html( $excel_ent_featured['bookings'] ); ?></p>
						</div>

						<div class="service-featured__price-block">
							<p class="service-featured__price"><?php echo esc_html( $excel_ent_featured['price'] ); ?></p>
							<p class="service-featured__price-label"><?php esc_html_e( 'Starting From:', 'excel-ent' ); ?></p>
						</div>
					</div>

					<a class="service-featured__cta magnetic" href="<?php echo esc_url( $excel_ent_featured['link'] ); ?>">
						<span class="service-featured__cta-label service-featured__cta-label--desktop"><?php esc_html_e( 'View All', 'excel-ent' ); ?></span>
						<span class="service-featured__cta-label service-featured__cta-label--mobile"><?php esc_html_e( 'View Profile', 'excel-ent' ); ?></span>
					</a>
				</div>

				<div class="service-featured__bottom">
					<p class="service-featured__duration"><?php echo esc_html( $excel_ent_featured['duration'] ); ?></p>

					<div class="service-featured__info">
						<p class="service-featured__location">
							<img src="<?php echo esc_url( $excel_ent_services_uri . '/map-pin-2-line.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							<span><?php echo esc_html( $excel_ent_featured['location'] ); ?></span>
						</p>
						<h3 class="service-featured__title">
							<?php echo esc_html( $excel_ent_featured['title'] ); ?>
							<span class="service-featured__subtitle"><?php echo esc_html( $excel_ent_featured['subtitle'] ); ?></span>
						</h3>
					</div>
				</div>
			</div>
		</article>
	</div>
</section>
