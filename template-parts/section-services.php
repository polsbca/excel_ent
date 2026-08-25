<?php
/**
 * Most Popular Services section (Figma 1084:2263 desktop / 1023:3144 mobile).
 *
 * @package Excel_Ent
 */

$excel_ent_services_uri = EXCEL_ENT_URI . '/assets/images/services';
$excel_ent_services_url = home_url( '/services/' );

$excel_ent_service_meta = array(
	'location' => __( 'Available Across the UK', 'excel-ent' ),
	'duration' => __( 'Duration: 3–4 Hours', 'excel-ent' ),
);

$excel_ent_service_cards = array(
	array(
		'id'    => 'wedding-djs',
		'title' => __( 'Wedding DJs', 'excel-ent' ),
		'price' => '£1,200',
		'image' => $excel_ent_services_uri . '/card-1.jpg',
		'link'  => home_url( '/services/wedding-djs/' ),
	),
	array(
		'id'    => 'live-party-bands',
		'title' => __( 'Live party bands', 'excel-ent' ),
		'price' => '£1,200',
		'image' => $excel_ent_services_uri . '/card-2.jpg',
		'link'  => home_url( '/services/live-party-bands/' ),
	),
	array(
		'id'    => 'solo-acoustic-acts',
		'title' => __( 'Solo acoustic acts', 'excel-ent' ),
		'price' => '£1,200',
		'image' => $excel_ent_services_uri . '/card-3.jpg',
		'link'  => home_url( '/services/solo-acoustic-acts/' ),
	),
	array(
		'id'    => 'tribute-acts',
		'title' => __( 'Tribute acts', 'excel-ent' ),
		'price' => '£1,200',
		'image' => $excel_ent_services_uri . '/card-4.jpg',
		'link'  => home_url( '/services/tribute-acts/' ),
	),
);

foreach ( $excel_ent_service_cards as &$excel_ent_card ) {
	$excel_ent_card['explore_link'] = excel_ent_get_explore_artists_url(
		excel_ent_services_section_explore_args( $excel_ent_card['id'] )
	);
}
unset( $excel_ent_card );

$excel_ent_featured = array(
	'id'            => 'wedding-djs',
	'title'         => __( 'Wedding DJs', 'excel-ent' ),
	'title_mobile'  => __( 'Roxy Rockz', 'excel-ent' ),
	'subtitle'      => __( 'Live Party Band', 'excel-ent' ),
	'price'         => '£1,200',
	'rating'        => '4.9',
	'rating_label'  => __( 'Rating', 'excel-ent' ),
	'bookings'      => __( '500+ Bookings', 'excel-ent' ),
	'location'      => $excel_ent_service_meta['location'],
	'duration'      => $excel_ent_service_meta['duration'],
	'image'         => $excel_ent_services_uri . '/featured.jpg',
	'link'          => home_url( '/services/wedding-djs/' ),
	'profile_link'  => home_url( '/services/live-party-bands/' ),
	'explore_link'  => excel_ent_get_explore_artists_url(
		excel_ent_services_section_explore_args( 'wedding-djs' )
	),
);
?>
<div class="services-section-pin" data-services-pin>
	<div class="services-section__scroll-pad" aria-hidden="true"></div>
<section class="services-section" id="services" data-services-swap aria-label="<?php esc_attr_e( 'Most Popular Services', 'excel-ent' ); ?>">
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
	</header>

	<div class="services-section__content">
		<a class="services-section__eyebrow magnetic reveal" data-reveal href="<?php echo esc_url( $excel_ent_services_url ); ?>">
			<img src="<?php echo esc_url( $excel_ent_services_uri . '/line-accent.svg' ); ?>" alt="" width="226" height="2" decoding="async">
			<span class="services-section__eyebrow-label services-section__eyebrow-label--desktop"><?php esc_html_e( 'View All Services', 'excel-ent' ); ?></span>
			<span class="services-section__eyebrow-label services-section__eyebrow-label--mobile"><?php esc_html_e( 'Venue Types', 'excel-ent' ); ?></span>
		</a>

		<div class="services-section__grid reveal" data-reveal>
		<div class="services-grid">
			<?php foreach ( $excel_ent_service_cards as $excel_ent_index => $excel_ent_card ) : ?>
				<a
					class="service-card magnetic"
					href="<?php echo esc_url( $excel_ent_card['link'] ); ?>"
					data-service-card
					data-service-id="<?php echo esc_attr( $excel_ent_card['id'] ); ?>"
					data-service-title="<?php echo esc_attr( $excel_ent_card['title'] ); ?>"
					data-service-price="<?php echo esc_attr( $excel_ent_card['price'] ); ?>"
					data-service-image="<?php echo esc_url( $excel_ent_card['image'] ); ?>"
					data-service-link="<?php echo esc_url( $excel_ent_card['link'] ); ?>"
					data-service-explore-link="<?php echo esc_url( $excel_ent_card['explore_link'] ); ?>"
					data-service-location="<?php echo esc_attr( $excel_ent_service_meta['location'] ); ?>"
					data-service-duration="<?php echo esc_attr( $excel_ent_service_meta['duration'] ); ?>"
				>
					<img
						class="service-card__image"
						src="<?php echo esc_url( $excel_ent_card['image'] ); ?>"
						alt="<?php echo esc_attr( $excel_ent_card['title'] ); ?>"
						width="266"
						height="337"
						loading="<?php echo $excel_ent_index < 2 ? 'eager' : 'lazy'; ?>"
						decoding="async"
						data-service-image-el
					>
					<span class="service-card__overlay" aria-hidden="true"></span>
					<span class="service-card__content">
						<span class="service-card__name" data-service-title-el><?php echo esc_html( $excel_ent_card['title'] ); ?></span>
						<span class="service-card__price-block">
							<strong class="service-card__price" data-service-price-el><?php echo esc_html( $excel_ent_card['price'] ); ?></strong>
							<span class="service-card__price-label"><?php esc_html_e( 'Starting from', 'excel-ent' ); ?></span>
						</span>
					</span>
				</a>
			<?php endforeach; ?>
		</div>

		<article
			class="service-featured"
			data-service-featured
			data-service-id="<?php echo esc_attr( $excel_ent_featured['id'] ); ?>"
			data-service-title="<?php echo esc_attr( $excel_ent_featured['title'] ); ?>"
			data-service-price="<?php echo esc_attr( $excel_ent_featured['price'] ); ?>"
			data-service-image="<?php echo esc_url( $excel_ent_featured['image'] ); ?>"
			data-service-link="<?php echo esc_url( $excel_ent_featured['link'] ); ?>"
			data-service-explore-link="<?php echo esc_url( $excel_ent_featured['explore_link'] ); ?>"
			data-service-location="<?php echo esc_attr( $excel_ent_featured['location'] ); ?>"
			data-service-duration="<?php echo esc_attr( $excel_ent_featured['duration'] ); ?>"
		>
			<img
				class="service-featured__image"
				src="<?php echo esc_url( $excel_ent_featured['image'] ); ?>"
				alt="<?php echo esc_attr( $excel_ent_featured['title'] ); ?>"
				width="1231"
				height="674"
				loading="lazy"
				decoding="async"
				data-service-image-el
			>
			<span class="service-featured__overlay" aria-hidden="true"></span>

			<div class="service-featured__inner" data-service-featured-inner>
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
							<p class="service-featured__price" data-service-price-el><?php echo esc_html( $excel_ent_featured['price'] ); ?></p>
							<p class="service-featured__price-label"><?php esc_html_e( 'Starting From:', 'excel-ent' ); ?></p>
						</div>
					</div>

					<a class="service-featured__cta service-featured__cta--desktop magnetic" href="<?php echo esc_url( $excel_ent_featured['explore_link'] ); ?>" data-service-cta-desktop>
						<?php esc_html_e( 'View All', 'excel-ent' ); ?>
					</a>
					<a class="service-featured__cta service-featured__cta--mobile magnetic" href="<?php echo esc_url( $excel_ent_featured['profile_link'] ); ?>" data-service-cta-mobile>
						<?php esc_html_e( 'View Profile', 'excel-ent' ); ?>
					</a>
				</div>

				<div class="service-featured__bottom">
					<p class="service-featured__duration" data-service-duration-el><?php echo esc_html( $excel_ent_featured['duration'] ); ?></p>

					<div class="service-featured__info">
						<p class="service-featured__location">
							<img src="<?php echo esc_url( $excel_ent_services_uri . '/map-pin-2-line.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							<span data-service-location-el><?php echo esc_html( $excel_ent_featured['location'] ); ?></span>
						</p>
						<h3 class="service-featured__title">
							<span class="service-featured__title-text service-featured__title-text--desktop" data-service-title-el><?php echo esc_html( $excel_ent_featured['title'] ); ?></span>
							<span class="service-featured__title-text service-featured__title-text--mobile" data-service-title-mobile-el><?php echo esc_html( $excel_ent_featured['title_mobile'] ); ?></span>
							<span class="service-featured__subtitle" data-service-subtitle-el><?php echo esc_html( $excel_ent_featured['subtitle'] ); ?></span>
						</h3>
					</div>
				</div>
			</div>
		</article>
		</div>
	</div>
</section>
</div>
