<?php
/**
 * Artists / occasions browse section.
 * Occasion: Figma 898:8531 | Artist: Figma 898:8824
 *
 * @package Excel_Ent
 */

$excel_ent_artist_uri     = EXCEL_ENT_URI . '/assets/images/artists';
$excel_ent_preview_video  = $excel_ent_artist_uri . '/preview.mp4';

$excel_ent_occasion_filters = array(
	array( 'id' => 'all', 'label' => __( 'All', 'excel-ent' ), 'active' => true ),
	array( 'id' => 'wedding', 'label' => __( 'Wedding', 'excel-ent' ), 'active' => false ),
	array( 'id' => 'corporate', 'label' => __( 'Corporate events', 'excel-ent' ), 'active' => false ),
	array( 'id' => 'pubs', 'label' => __( 'Pubs & Clubs', 'excel-ent' ), 'active' => false ),
);

$excel_ent_profile_filters = array(
	array( 'id' => 'all', 'label' => __( 'All', 'excel-ent' ), 'active' => true ),
	array( 'id' => 'solo', 'label' => __( 'Solo', 'excel-ent' ), 'active' => false ),
	array( 'id' => 'brands', 'label' => __( 'Brands', 'excel-ent' ), 'active' => false ),
	array( 'id' => 'brands', 'label' => __( 'Brands', 'excel-ent' ), 'active' => false ),
);

$excel_ent_occasion_cards = array(
	array(
		'title'        => __( 'DJs', 'excel-ent' ),
		'options'      => __( '1000+ OPTIONS', 'excel-ent' ),
		'image'        => $excel_ent_artist_uri . '/card-djs.jpg',
		'category'     => 'djs',
		'detail_title' => __( 'DJs', 'excel-ent' ),
		'bullets'      => array(
			__( '100+ Experienced DJs', 'excel-ent' ),
			__( 'All Event Types Covered', 'excel-ent' ),
			__( 'Tailored Music Experience', 'excel-ent' ),
			__( 'Pro Sound & Lighting', 'excel-ent' ),
		),
		'link'         => home_url( '/djs/' ),
	),
	array(
		'title'    => __( 'Corporate Events', 'excel-ent' ),
		'options'  => __( '1000+ OPTIONS', 'excel-ent' ),
		'image'    => $excel_ent_artist_uri . '/card-corporate.jpg',
		'category' => 'corporate',
		'bullets'  => array(
			__( 'Corporate entertainment experts', 'excel-ent' ),
			__( 'Brand-safe performances', 'excel-ent' ),
			__( 'Flexible setups', 'excel-ent' ),
			__( 'Nationwide coverage', 'excel-ent' ),
		),
		'link'     => home_url( '/corporate-events/' ),
	),
	array(
		'title'    => __( 'Wedding', 'excel-ent' ),
		'options'  => __( '1000+ OPTIONS', 'excel-ent' ),
		'image'    => $excel_ent_artist_uri . '/card-wedding.jpg',
		'category' => 'wedding',
		'bullets'  => array(
			__( 'Ceremony to reception', 'excel-ent' ),
			__( 'Live bands & DJs', 'excel-ent' ),
			__( 'Personalised playlists', 'excel-ent' ),
			__( 'Fully vetted acts', 'excel-ent' ),
		),
		'link'     => home_url( '/wedding-packages/' ),
	),
	array(
		'title'    => __( 'Live Bands', 'excel-ent' ),
		'options'  => __( '1000+ OPTIONS', 'excel-ent' ),
		'image'    => $excel_ent_artist_uri . '/card-djs-2.jpg',
		'category' => 'pubs',
		'bullets'  => array(
			__( 'High-energy live sets', 'excel-ent' ),
			__( 'Pubs, clubs & parties', 'excel-ent' ),
			__( 'Tribute & original acts', 'excel-ent' ),
			__( 'Book with confidence', 'excel-ent' ),
		),
		'link'     => home_url( '/bands/' ),
	),
	array(
		'title'    => __( 'Wedding', 'excel-ent' ),
		'options'  => __( '1000+ OPTIONS', 'excel-ent' ),
		'image'    => $excel_ent_artist_uri . '/card-wedding.jpg',
		'category' => 'wedding',
		'bullets'  => array(
			__( 'Ceremony to reception', 'excel-ent' ),
			__( 'Live bands & DJs', 'excel-ent' ),
			__( 'Personalised playlists', 'excel-ent' ),
			__( 'Fully vetted acts', 'excel-ent' ),
		),
		'link'     => home_url( '/wedding-packages/' ),
	),
	array(
		'title'    => __( 'Corporate Events', 'excel-ent' ),
		'options'  => __( '1000+ OPTIONS', 'excel-ent' ),
		'image'    => $excel_ent_artist_uri . '/card-corporate.jpg',
		'category' => 'corporate',
		'bullets'  => array(
			__( 'Corporate entertainment experts', 'excel-ent' ),
			__( 'Brand-safe performances', 'excel-ent' ),
			__( 'Flexible setups', 'excel-ent' ),
			__( 'Nationwide coverage', 'excel-ent' ),
		),
		'link'     => home_url( '/corporate-events/' ),
	),
	array(
		'title'    => __( 'DJs', 'excel-ent' ),
		'options'  => __( '1000+ OPTIONS', 'excel-ent' ),
		'image'    => $excel_ent_artist_uri . '/card-djs.jpg',
		'category' => 'djs',
		'bullets'  => array(
			__( '100+ Experienced DJs', 'excel-ent' ),
			__( 'All Event Types Covered', 'excel-ent' ),
			__( 'Tailored Music Experience', 'excel-ent' ),
			__( 'Pro Sound & Lighting', 'excel-ent' ),
		),
		'link'     => home_url( '/djs/' ),
	),
	array(
		'title'    => __( 'Live Bands', 'excel-ent' ),
		'options'  => __( '1000+ OPTIONS', 'excel-ent' ),
		'image'    => $excel_ent_artist_uri . '/card-djs-2.jpg',
		'category' => 'pubs',
		'bullets'  => array(
			__( 'High-energy live sets', 'excel-ent' ),
			__( 'Pubs, clubs & parties', 'excel-ent' ),
			__( 'Tribute & original acts', 'excel-ent' ),
			__( 'Book with confidence', 'excel-ent' ),
		),
		'link'     => home_url( '/bands/' ),
	),
	array(
		'title'    => __( 'Wedding', 'excel-ent' ),
		'options'  => __( '1000+ OPTIONS', 'excel-ent' ),
		'image'    => $excel_ent_artist_uri . '/card-wedding.jpg',
		'category' => 'wedding',
		'bullets'  => array(
			__( 'Ceremony to reception', 'excel-ent' ),
			__( 'Live bands & DJs', 'excel-ent' ),
			__( 'Personalised playlists', 'excel-ent' ),
			__( 'Fully vetted acts', 'excel-ent' ),
		),
		'link'     => home_url( '/wedding-packages/' ),
	),
);

$excel_ent_profile_cards = array(
	array(
		'name'     => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'era'      => __( '70s', 'excel-ent' ),
		'price'    => '£1,200',
		'type'     => __( 'Tribute Act', 'excel-ent' ),
		'category' => 'brands',
		'image'    => $excel_ent_artist_uri . '/artist-1.jpg',
		'link'     => home_url( '/artists/andy-crosbie/' ),
	),
	array(
		'name'     => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'era'      => __( '70s', 'excel-ent' ),
		'price'    => '£1,200',
		'type'     => __( 'Tribute Act', 'excel-ent' ),
		'category' => 'solo',
		'image'    => $excel_ent_artist_uri . '/artist-2.jpg',
		'link'     => home_url( '/artists/andy-crosbie/' ),
	),
	array(
		'name'     => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'era'      => __( '70s', 'excel-ent' ),
		'price'    => '£1,200',
		'type'     => __( 'Tribute Act', 'excel-ent' ),
		'category' => 'brands',
		'image'    => $excel_ent_artist_uri . '/artist-3.jpg',
		'link'     => home_url( '/artists/andy-crosbie/' ),
	),
	array(
		'name'     => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'era'      => __( '70s', 'excel-ent' ),
		'price'    => '£1,200',
		'type'     => __( 'Tribute Act', 'excel-ent' ),
		'category' => 'brands',
		'image'    => $excel_ent_artist_uri . '/artist-4.jpg',
		'link'     => home_url( '/artists/andy-crosbie/' ),
	),
	array(
		'name'     => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'era'      => __( '70s', 'excel-ent' ),
		'price'    => '£1,200',
		'type'     => __( 'Tribute Act', 'excel-ent' ),
		'category' => 'solo',
		'image'    => $excel_ent_artist_uri . '/artist-1.jpg',
		'link'     => home_url( '/artists/andy-crosbie/' ),
	),
	array(
		'name'     => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'era'      => __( '70s', 'excel-ent' ),
		'price'    => '£1,200',
		'type'     => __( 'Tribute Act', 'excel-ent' ),
		'category' => 'brands',
		'image'    => $excel_ent_artist_uri . '/artist-2.jpg',
		'link'     => home_url( '/artists/andy-crosbie/' ),
	),
	array(
		'name'     => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'era'      => __( '70s', 'excel-ent' ),
		'price'    => '£1,200',
		'type'     => __( 'Tribute Act', 'excel-ent' ),
		'category' => 'brands',
		'image'    => $excel_ent_artist_uri . '/artist-3.jpg',
		'link'     => home_url( '/artists/andy-crosbie/' ),
	),
	array(
		'name'     => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'era'      => __( '70s', 'excel-ent' ),
		'price'    => '£1,200',
		'type'     => __( 'Tribute Act', 'excel-ent' ),
		'category' => 'solo',
		'image'    => $excel_ent_artist_uri . '/artist-4.jpg',
		'link'     => home_url( '/artists/andy-crosbie/' ),
	),
	array(
		'name'     => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'era'      => __( '70s', 'excel-ent' ),
		'price'    => '£1,200',
		'type'     => __( 'Tribute Act', 'excel-ent' ),
		'category' => 'brands',
		'image'    => $excel_ent_artist_uri . '/artist-1.jpg',
		'link'     => home_url( '/artists/andy-crosbie/' ),
	),
);
?>
<section class="artists-section" id="artists" data-artists-section data-active-mode="occasion" aria-label="<?php esc_attr_e( 'Artists', 'excel-ent' ); ?>">
	<div class="artists-section__header">
		<div class="artists-section__intro">
			<h2 class="artists-section__title reveal" data-reveal>
				<?php esc_html_e( 'EVERY ARTIST. EVERY VIBE.', 'excel-ent' ); ?>
			</h2>

			<div class="artists-section__browse reveal" data-reveal>
				<div class="artists-section__eyebrow">
					<img src="<?php echo esc_url( $excel_ent_artist_uri . '/line-accent.svg' ); ?>" alt="" width="226" height="2" decoding="async">
					<span><?php esc_html_e( 'Browse by Artist & occasions', 'excel-ent' ); ?></span>
				</div>

				<div class="artists-section__mode" role="tablist" aria-label="<?php esc_attr_e( 'Browse mode', 'excel-ent' ); ?>">
					<button type="button" class="artists-mode artists-mode--active magnetic" data-artists-mode="occasion" role="tab" aria-selected="true">
						<?php esc_html_e( 'Occasion', 'excel-ent' ); ?>
					</button>
					<button type="button" class="artists-mode magnetic" data-artists-mode="artist" role="tab" aria-selected="false">
						<?php esc_html_e( 'Artist', 'excel-ent' ); ?>
					</button>
				</div>
			</div>
		</div>

		<div class="artists-section__filters reveal" data-reveal data-mode-filters="occasion" role="tablist" aria-label="<?php esc_attr_e( 'Occasion categories', 'excel-ent' ); ?>">
			<?php foreach ( $excel_ent_occasion_filters as $excel_ent_filter ) : ?>
				<button
					type="button"
					class="artists-filter magnetic<?php echo ! empty( $excel_ent_filter['active'] ) ? ' artists-filter--active' : ''; ?>"
					data-artists-filter="<?php echo esc_attr( $excel_ent_filter['id'] ); ?>"
					aria-selected="<?php echo ! empty( $excel_ent_filter['active'] ) ? 'true' : 'false'; ?>"
				>
					<?php echo esc_html( $excel_ent_filter['label'] ); ?>
				</button>
			<?php endforeach; ?>
			<a class="artists-filter artists-filter--link magnetic" href="<?php echo esc_url( home_url( '/artists/' ) ); ?>">
				<span><?php esc_html_e( 'View All Categories', 'excel-ent' ); ?></span>
				<img src="<?php echo esc_url( $excel_ent_artist_uri . '/arrow-pill.svg' ); ?>" alt="" width="16" height="16" decoding="async">
			</a>
		</div>

		<div class="artists-section__filters reveal is-hidden" data-reveal data-mode-filters="artist" role="tablist" aria-label="<?php esc_attr_e( 'Artist categories', 'excel-ent' ); ?>" hidden>
			<?php foreach ( $excel_ent_profile_filters as $excel_ent_filter ) : ?>
				<button
					type="button"
					class="artists-filter magnetic<?php echo ! empty( $excel_ent_filter['active'] ) ? ' artists-filter--active' : ''; ?>"
					data-artists-filter="<?php echo esc_attr( $excel_ent_filter['id'] ); ?>"
					aria-selected="<?php echo ! empty( $excel_ent_filter['active'] ) ? 'true' : 'false'; ?>"
				>
					<?php echo esc_html( $excel_ent_filter['label'] ); ?>
				</button>
			<?php endforeach; ?>
			<a class="artists-filter artists-filter--link magnetic" href="<?php echo esc_url( home_url( '/artists/' ) ); ?>">
				<span><?php esc_html_e( 'View All Categories', 'excel-ent' ); ?></span>
				<img src="<?php echo esc_url( $excel_ent_artist_uri . '/arrow-pill.svg' ); ?>" alt="" width="16" height="16" decoding="async">
			</a>
		</div>
	</div>

	<div class="artists-section__carousel" data-mode-panel="occasion" data-artists-carousel>
		<div class="artists-section__track" data-artists-track>
			<?php foreach ( $excel_ent_occasion_cards as $excel_ent_index => $excel_ent_card ) : ?>
				<article class="artist-card artist-card--occasion magnetic reveal" data-reveal data-artists-card data-category="<?php echo esc_attr( $excel_ent_card['category'] ); ?>" style="--i: <?php echo esc_attr( (string) $excel_ent_index ); ?>">
					<a class="artist-card__link" href="<?php echo esc_url( $excel_ent_card['link'] ); ?>">
						<img class="artist-card__image" src="<?php echo esc_url( $excel_ent_card['image'] ); ?>" alt="<?php echo esc_attr( $excel_ent_card['title'] ); ?>" width="518" height="811" loading="lazy" decoding="async">
						<img class="artist-card__orb" src="<?php echo esc_url( $excel_ent_artist_uri . '/card-orb.svg' ); ?>" alt="" width="63" height="63" decoding="async">
						<div class="artist-card__detail">
							<p class="artist-card__detail-title"><?php echo esc_html( $excel_ent_card['detail_title'] ?? $excel_ent_card['title'] ); ?></p>
							<ul class="artist-card__bullets">
								<?php foreach ( $excel_ent_card['bullets'] as $excel_ent_bullet ) : ?>
									<li>-<?php echo esc_html( $excel_ent_bullet ); ?></li>
								<?php endforeach; ?>
							</ul>
							<span class="artist-card__cta"><?php esc_html_e( 'CLICK TO KNOW MORE', 'excel-ent' ); ?></span>
						</div>
						<div class="artist-card__footer">
							<p class="artist-card__name"><?php echo esc_html( $excel_ent_card['title'] ); ?></p>
							<p class="artist-card__meta"><?php echo esc_html( $excel_ent_card['options'] ); ?></p>
						</div>
					</a>
				</article>
			<?php endforeach; ?>
		</div>
	</div>

	<div class="artists-section__carousel is-hidden" data-mode-panel="artist" data-artists-carousel hidden>
		<div class="artists-section__track" data-artists-track>
			<?php foreach ( $excel_ent_profile_cards as $excel_ent_index => $excel_ent_profile ) : ?>
				<article class="artist-card artist-card--profile magnetic reveal" data-reveal data-artists-card data-category="<?php echo esc_attr( $excel_ent_profile['category'] ); ?>" style="--i: <?php echo esc_attr( (string) $excel_ent_index ); ?>">
					<a class="artist-card__link" href="<?php echo esc_url( $excel_ent_profile['link'] ); ?>">
						<img class="artist-card__image" src="<?php echo esc_url( $excel_ent_profile['image'] ); ?>" alt="<?php echo esc_attr( $excel_ent_profile['name'] ); ?>" width="518" height="811" loading="lazy" decoding="async">
						<video
							class="artist-card__video"
							data-artist-video
							muted
							loop
							playsinline
							preload="none"
							poster="<?php echo esc_url( $excel_ent_profile['image'] ); ?>"
							aria-hidden="true"
						>
							<source src="<?php echo esc_url( $excel_ent_preview_video ); ?>" type="video/mp4">
						</video>
						<span class="artist-card__scrim" aria-hidden="true"></span>
						<img class="artist-card__orb artist-card__orb--visible" src="<?php echo esc_url( $excel_ent_artist_uri . '/card-orb.svg' ); ?>" alt="" width="63" height="63" decoding="async">

						<div class="artist-card__profile">
							<div class="artist-card__top">
								<span class="artist-card__era"><?php echo esc_html( $excel_ent_profile['era'] ); ?></span>
							</div>

							<div class="artist-card__bottom">
								<p class="artist-card__profile-name"><?php echo esc_html( $excel_ent_profile['name'] ); ?></p>
								<div class="artist-card__meta-row">
									<div class="artist-card__price">
										<span class="artist-card__price-label"><?php esc_html_e( 'Starting From:', 'excel-ent' ); ?></span>
										<strong class="artist-card__price-value"><?php echo esc_html( $excel_ent_profile['price'] ); ?></strong>
									</div>
									<span class="artist-card__type"><?php echo esc_html( $excel_ent_profile['type'] ); ?></span>
								</div>
							</div>
						</div>
					</a>
					<button
						type="button"
						class="artist-card__mute magnetic"
						data-artist-mute
						aria-pressed="false"
						aria-label="<?php esc_attr_e( 'Unmute preview', 'excel-ent' ); ?>"
					>
						<img
							class="artist-card__mute-icon artist-card__mute-icon--off"
							data-artist-mute-off
							src="<?php echo esc_url( $excel_ent_artist_uri . '/volume-mute.svg' ); ?>"
							alt=""
							width="43"
							height="43"
							decoding="async"
						>
						<img
							class="artist-card__mute-icon artist-card__mute-icon--on"
							data-artist-mute-on
							src="<?php echo esc_url( $excel_ent_artist_uri . '/volume.svg' ); ?>"
							alt=""
							width="43"
							height="43"
							decoding="async"
							hidden
						>
					</button>
				</article>
			<?php endforeach; ?>
		</div>
	</div>

	<div class="artists-section__nav">
		<div class="artists-section__progress" aria-hidden="true">
			<span class="artists-section__progress-fill" data-artists-progress></span>
		</div>
		<div class="artists-section__pager">
			<button type="button" class="artists-pager__btn artists-pager__btn--prev magnetic" data-artists-prev aria-label="<?php esc_attr_e( 'Previous', 'excel-ent' ); ?>">
				<img src="<?php echo esc_url( $excel_ent_artist_uri . '/arrow-nav-left.svg' ); ?>" alt="" width="42" height="42" decoding="async">
			</button>
			<p class="artists-pager__count">
				<span data-artists-current>1</span>/<span data-artists-total><?php echo esc_html( (string) count( $excel_ent_occasion_cards ) ); ?></span>
			</p>
			<button type="button" class="artists-pager__btn artists-pager__btn--next magnetic" data-artists-next aria-label="<?php esc_attr_e( 'Next', 'excel-ent' ); ?>">
				<img src="<?php echo esc_url( $excel_ent_artist_uri . '/arrow-nav-right.svg' ); ?>" alt="" width="42" height="42" decoding="async">
			</button>
		</div>
	</div>
</section>
