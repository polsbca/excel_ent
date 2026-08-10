<?php
/**
 * Artist profile page content — Figma 1113:872 / mobile 1023:10057
 *
 * @package Excel_Ent
 */

$excel_ent_uri   = EXCEL_ENT_URI . '/assets/images/artist-page';
$excel_ent_ea    = EXCEL_ENT_URI . '/assets/images/explore-artists';
$excel_ent_quote = excel_ent_get_quote_url();
$excel_ent_profile = excel_ent_get_artist_page_url();

$excel_ent_tags = array(
	__( 'Saxophonist', 'excel-ent' ),
	__( 'DJ Service', 'excel-ent' ),
	__( 'Corporate', 'excel-ent' ),
	__( 'Wedding', 'excel-ent' ),
	__( 'Jazz', 'excel-ent' ),
	__( 'Club Classics', 'excel-ent' ),
	__( 'Smooth Jazz', 'excel-ent' ),
	__( 'Plug & Play', 'excel-ent' ),
);

$excel_ent_perks = array(
	__( 'Personally auditioned by Excel', 'excel-ent' ),
	__( 'PLI & PAT certified as standard', 'excel-ent' ),
	__( 'No hidden fees — transparent pricing', 'excel-ent' ),
);

$excel_ent_songs = array(
	array( 'title' => 'Fly Me To The Moon', 'artist' => 'Frank Sinatra', 'genre' => 'jazz' ),
	array( 'title' => 'Fly Me To The Moon', 'artist' => 'Frank Sinatra', 'genre' => 'jazz' ),
	array( 'title' => 'Fly Me To The Moon', 'artist' => 'Frank Sinatra', 'genre' => 'solo' ),
	array( 'title' => 'Fly Me To The Moon', 'artist' => 'Frank Sinatra', 'genre' => 'pop' ),
	array( 'title' => 'Fly Me To The Moon', 'artist' => 'Frank Sinatra', 'genre' => 'jazz' ),
	array( 'title' => 'Fly Me To The Moon', 'artist' => 'Frank Sinatra', 'genre' => 'solo' ),
	array( 'title' => 'Fly Me To The Moon', 'artist' => 'Frank Sinatra', 'genre' => 'pop' ),
	array( 'title' => 'Fly Me To The Moon', 'artist' => 'Frank Sinatra', 'genre' => 'jazz' ),
	array( 'title' => 'Fly Me To The Moon', 'artist' => 'Frank Sinatra', 'genre' => 'solo' ),
);

$excel_ent_gallery = array(
	array(
		'image'    => $excel_ent_uri . '/gallery-1.jpg',
		'venue'    => __( 'The Grand Ballroom, Manchester', 'excel-ent' ),
		'location' => __( 'Manchester, UK', 'excel-ent' ),
		'duration' => __( '7:00 PM - 11:00 PM (4 Hours)', 'excel-ent' ),
		'guests'   => __( '250 Attendee', 'excel-ent' ),
	),
	array(
		'image'    => $excel_ent_uri . '/gallery-2.jpg',
		'venue'    => __( 'The O2, London', 'excel-ent' ),
		'location' => __( 'London, UK', 'excel-ent' ),
		'duration' => __( '8:00 PM - 12:00 AM (4 Hours)', 'excel-ent' ),
		'guests'   => __( '400 Attendee', 'excel-ent' ),
	),
	array(
		'image'    => $excel_ent_uri . '/gallery-3.jpg',
		'venue'    => __( 'Cork Opera House', 'excel-ent' ),
		'location' => __( 'Cork, Ireland', 'excel-ent' ),
		'duration' => __( '7:30 PM - 10:30 PM (3 Hours)', 'excel-ent' ),
		'guests'   => __( '180 Attendee', 'excel-ent' ),
	),
	array(
		'image'    => $excel_ent_uri . '/gallery-4.jpg',
		'venue'    => __( 'The Roundhouse Theatre', 'excel-ent' ),
		'location' => __( 'London, UK', 'excel-ent' ),
		'duration' => __( '6:00 PM - 10:00 PM (4 Hours)', 'excel-ent' ),
		'guests'   => __( '300 Attendee', 'excel-ent' ),
	),
	array(
		'image'    => $excel_ent_uri . '/gallery-5.jpg',
		'venue'    => __( 'Udaipur City Palace', 'excel-ent' ),
		'location' => __( 'Udaipur, India', 'excel-ent' ),
		'duration' => __( '7:00 PM - 11:00 PM (4 Hours)', 'excel-ent' ),
		'guests'   => __( '220 Attendee', 'excel-ent' ),
	),
	array(
		'image'    => $excel_ent_uri . '/gallery-6.jpg',
		'venue'    => __( 'Private Estate, Surrey', 'excel-ent' ),
		'location' => __( 'Surrey, UK', 'excel-ent' ),
		'duration' => __( '5:00 PM - 9:00 PM (4 Hours)', 'excel-ent' ),
		'guests'   => __( '150 Attendee', 'excel-ent' ),
	),
);

$excel_ent_similar = array(
	array(
		'name'       => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'image'      => $excel_ent_ea . '/artist-2.jpg',
		'price'      => '£1,200',
		'rating'     => '4.5',
		'location'   => __( 'Manchester', 'excel-ent' ),
		'status'     => __( 'Available After 30 days', 'excel-ent' ),
		'status_mod' => 'later',
		'tags'       => array( 'Nightclubs', 'DJs', 'clubs', 'Nightclubs' ),
	),
	array(
		'name'       => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'image'      => $excel_ent_ea . '/artist-4.jpg',
		'price'      => '£1,200',
		'rating'     => '4.5',
		'location'   => __( 'Manchester', 'excel-ent' ),
		'status'     => __( 'Available this weekend', 'excel-ent' ),
		'status_mod' => 'weekend',
		'tags'       => array( 'Nightclubs', 'DJs', 'clubs', 'Nightclubs' ),
	),
	array(
		'name'       => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'image'      => $excel_ent_ea . '/artist-5.jpg',
		'price'      => '£1,200',
		'rating'     => '4.5',
		'location'   => __( 'Manchester', 'excel-ent' ),
		'status'     => __( 'Available this weekend', 'excel-ent' ),
		'status_mod' => 'weekend',
		'tags'       => array( 'Nightclubs', 'DJs', 'clubs', 'Nightclubs' ),
	),
	array(
		'name'       => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'image'      => $excel_ent_ea . '/artist-6.jpg',
		'price'      => '£1,200',
		'rating'     => '4.5',
		'location'   => __( 'Manchester', 'excel-ent' ),
		'status'     => __( 'Available this weekend', 'excel-ent' ),
		'status_mod' => 'weekend',
		'tags'       => array( 'Nightclubs', 'DJs', 'clubs', 'Nightclubs' ),
	),
);
?>

<!-- Hero / Profile -->
<section class="artist-hero" aria-label="<?php esc_attr_e( 'Artist profile', 'excel-ent' ); ?>">
	<div class="artist-hero__media">
		<img
			src="<?php echo esc_url( $excel_ent_uri . '/hero.jpg' ); ?>"
			alt="<?php esc_attr_e( 'Rose Sax', 'excel-ent' ); ?>"
			width="851"
			height="958"
			decoding="async"
			fetchpriority="high"
		>
		<div class="artist-hero__badges">
			<button class="artist-hero__fav magnetic is-favorited" type="button" aria-pressed="true" aria-label="<?php esc_attr_e( 'Favorite artist', 'excel-ent' ); ?>" data-artist-fav>
				<img class="artist-hero__fav-on" src="<?php echo esc_url( $excel_ent_uri . '/heart-active.svg' ); ?>" alt="" width="24" height="24" decoding="async">
				<img class="artist-hero__fav-off" src="<?php echo esc_url( $excel_ent_uri . '/heart.svg' ); ?>" alt="" width="24" height="24" decoding="async">
			</button>
			<span class="artist-hero__approved artist-hero__approved--media">
				<img src="<?php echo esc_url( $excel_ent_uri . '/checkbox-circle.svg' ); ?>" alt="" width="24" height="24" decoding="async">
				<?php esc_html_e( 'Excel Approved Artist', 'excel-ent' ); ?>
			</span>
		</div>
	</div>

	<div class="artist-hero__info">
		<div class="artist-hero__identity">
			<h1 class="artist-hero__name"><?php esc_html_e( 'ROSE SAX', 'excel-ent' ); ?></h1>
			<p class="artist-hero__subtitle"><?php esc_html_e( 'Saxophonist · London & Nationwide', 'excel-ent' ); ?></p>
		</div>

		<div class="artist-hero__details">
			<div class="artist-hero__price-info">
				<div class="artist-hero__pricing">
					<p class="artist-hero__price"><?php esc_html_e( '£600', 'excel-ent' ); ?></p>
					<p class="artist-hero__price-note">
						<?php esc_html_e( 'Price varies by event type, duration & location. Request a tailored quote for your event.', 'excel-ent' ); ?>
					</p>
				</div>

				<ul class="artist-hero__perks">
					<?php foreach ( $excel_ent_perks as $excel_ent_perk ) : ?>
						<li><?php echo esc_html( $excel_ent_perk ); ?></li>
					<?php endforeach; ?>
				</ul>
			</div>

			<div class="artist-hero__rating">
				<span class="artist-hero__approved artist-hero__approved--inline">
					<img src="<?php echo esc_url( $excel_ent_uri . '/checkbox-circle.svg' ); ?>" alt="" width="10" height="10" decoding="async">
					<?php esc_html_e( 'Excel Approved Artist', 'excel-ent' ); ?>
				</span>
				<div class="artist-hero__stars" aria-hidden="true">
					<?php for ( $i = 0; $i < 5; $i++ ) : ?>
						<img src="<?php echo esc_url( $excel_ent_uri . '/star-fill.svg' ); ?>" alt="" width="24" height="24" decoding="async">
					<?php endfor; ?>
				</div>
				<p class="artist-hero__reviews"><?php esc_html_e( '400 reviews on google · Highly Recommended', 'excel-ent' ); ?></p>
				<div class="artist-hero__socials">
					<a href="https://www.facebook.com/" class="magnetic" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'Facebook', 'excel-ent' ); ?>">
						<img src="<?php echo esc_url( $excel_ent_uri . '/facebook.svg' ); ?>" alt="" width="24" height="24" decoding="async">
					</a>
					<a href="https://www.google.com/" class="magnetic" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'Google', 'excel-ent' ); ?>">
						<img src="<?php echo esc_url( $excel_ent_uri . '/google.svg' ); ?>" alt="" width="24" height="24" decoding="async">
					</a>
				</div>
			</div>
		</div>

		<div class="artist-hero__tags">
			<?php foreach ( $excel_ent_tags as $excel_ent_tag ) : ?>
				<span><?php echo esc_html( $excel_ent_tag ); ?></span>
			<?php endforeach; ?>
		</div>

		<div class="artist-hero__actions">
			<a class="artist-hero__btn artist-hero__btn--primary magnetic" href="<?php echo esc_url( $excel_ent_quote ); ?>">
				<?php esc_html_e( 'Get a quote now', 'excel-ent' ); ?>
			</a>
			<button class="artist-hero__btn artist-hero__btn--outline magnetic" type="button" data-artist-wishlist data-label-add="<?php esc_attr_e( 'ADD TO WISHLIST', 'excel-ent' ); ?>" data-label-added="<?php esc_attr_e( 'IN WISHLIST', 'excel-ent' ); ?>">
				<?php esc_html_e( 'ADD TO WISHLIST', 'excel-ent' ); ?>
			</button>
		</div>
	</div>
</section>

<!-- Performance & Energy -->
<section class="artist-performance" aria-label="<?php esc_attr_e( 'Performance and energy', 'excel-ent' ); ?>">
	<div class="artist-performance__copy reveal" data-reveal>
		<h2 class="artist-performance__title"><?php esc_html_e( 'Performance & Energy', 'excel-ent' ); ?></h2>
		<div class="artist-performance__cols">
			<p><?php esc_html_e( "Available as a 'plug and play' sax option, Rose can seamlessly connect to your venue's PA system or a DJ provided by the client, creating an effortless live sax experience. For a complete entertainment package, she can also provide a full DJ service alongside her performance.", 'excel-ent' ); ?></p>
			<p><?php esc_html_e( 'Performed at The Roundhouse Theatre, The O2, Cork Opera House in Ireland, and Udaipur City Palace, Rose Sax is a versatile saxophonist who brings sophistication and energy to every event. Her repertoire spans smooth jazz standards to club classics and freestyle improvisation with live musicians.', 'excel-ent' ); ?></p>
		</div>
	</div>

	<div class="artist-performance__gallery reveal" data-reveal data-artist-venue>
		<script type="application/json" data-venue-slides>
			<?php
			echo wp_json_encode(
				array(
					array(
						'image' => $excel_ent_uri . '/venue.jpg',
						'label' => __( 'Cork Opera House in Ireland', 'excel-ent' ),
					),
					array(
						'image' => $excel_ent_uri . '/gallery-4.jpg',
						'label' => __( 'The Roundhouse Theatre', 'excel-ent' ),
					),
					array(
						'image' => $excel_ent_uri . '/gallery-2.jpg',
						'label' => __( 'The O2, London', 'excel-ent' ),
					),
					array(
						'image' => $excel_ent_uri . '/gallery-5.jpg',
						'label' => __( 'Udaipur City Palace', 'excel-ent' ),
					),
				)
			);
			?>
		</script>
		<img
			class="artist-performance__image"
			src="<?php echo esc_url( $excel_ent_uri . '/venue.jpg' ); ?>"
			alt="<?php esc_attr_e( 'Cork Opera House in Ireland', 'excel-ent' ); ?>"
			width="900"
			height="879"
			loading="lazy"
			decoding="async"
			data-venue-image
		>
		<span class="artist-performance__pin">
			<img src="<?php echo esc_url( $excel_ent_uri . '/map-pin.svg' ); ?>" alt="" width="24" height="24" decoding="async">
			<span data-venue-label><?php esc_html_e( 'Cork Opera House in Ireland', 'excel-ent' ); ?></span>
		</span>
		<div class="artist-performance__nav">
			<button class="artist-performance__arrow magnetic" type="button" data-venue-prev aria-label="<?php esc_attr_e( 'Previous venue', 'excel-ent' ); ?>">
				<img src="<?php echo esc_url( $excel_ent_uri . '/arrow-left.svg' ); ?>" alt="" width="55" height="55" decoding="async">
			</button>
			<div class="artist-performance__progress" aria-hidden="true">
				<span class="artist-performance__progress-fill" data-venue-progress></span>
			</div>
			<button class="artist-performance__arrow magnetic" type="button" data-venue-next aria-label="<?php esc_attr_e( 'Next venue', 'excel-ent' ); ?>">
				<img src="<?php echo esc_url( $excel_ent_uri . '/arrow-right.svg' ); ?>" alt="" width="55" height="55" decoding="async">
			</button>
		</div>
	</div>
</section>

<!-- Example Set Lists -->
<section class="artist-setlist" aria-label="<?php esc_attr_e( 'Example set lists', 'excel-ent' ); ?>" data-artist-setlist>
	<article class="artist-setlist__featured reveal" data-reveal>
		<img src="<?php echo esc_url( $excel_ent_uri . '/featured.jpg' ); ?>" alt="" width="546" height="1040" loading="lazy" decoding="async">
		<div class="artist-setlist__featured-top">
			<span><?php esc_html_e( 'Featured', 'excel-ent' ); ?></span>
			<strong data-now-index>01</strong>
		</div>
		<div class="artist-setlist__featured-copy">
			<h3 data-now-title><?php esc_html_e( 'FLY ME TO THE MOON', 'excel-ent' ); ?></h3>
			<p data-now-artist><?php esc_html_e( 'FRANK SINATRA', 'excel-ent' ); ?></p>
		</div>
	</article>

	<div class="artist-setlist__panel reveal" data-reveal>
		<header class="artist-setlist__header">
			<h2 class="artist-setlist__title">
				<span class="artist-setlist__title-desktop"><?php esc_html_e( 'Example set lists', 'excel-ent' ); ?></span>
				<span class="artist-setlist__title-mobile"><?php esc_html_e( 'Music List & Repertoire', 'excel-ent' ); ?></span>
			</h2>
			<div class="artist-setlist__tools">
				<div class="artist-setlist__tabs" role="tablist" aria-label="<?php esc_attr_e( 'Song genres', 'excel-ent' ); ?>">
					<button class="is-active" type="button" role="tab" aria-selected="true" data-setlist-tab="all"><?php esc_html_e( 'All Songs', 'excel-ent' ); ?></button>
					<button type="button" role="tab" aria-selected="false" data-setlist-tab="jazz"><?php esc_html_e( 'Jazz', 'excel-ent' ); ?></button>
					<button type="button" role="tab" aria-selected="false" data-setlist-tab="solo"><?php esc_html_e( 'Solo', 'excel-ent' ); ?></button>
					<button type="button" role="tab" aria-selected="false" data-setlist-tab="pop"><?php esc_html_e( 'Pop', 'excel-ent' ); ?></button>
				</div>
				<label class="artist-setlist__search">
					<span class="screen-reader-text"><?php esc_html_e( 'Search songs', 'excel-ent' ); ?></span>
					<input type="search" placeholder="<?php esc_attr_e( 'Search', 'excel-ent' ); ?>" data-setlist-search>
					<img src="<?php echo esc_url( $excel_ent_uri . '/search.svg' ); ?>" alt="" width="20" height="20" decoding="async">
				</label>
				<button class="artist-setlist__category magnetic" type="button" data-setlist-category aria-haspopup="listbox" aria-expanded="false">
					<span><?php esc_html_e( 'Select category', 'excel-ent' ); ?></span>
					<img src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/explore-artists/caret-down.svg' ); ?>" alt="" width="24" height="24" decoding="async">
				</button>
			</div>
		</header>

		<div class="artist-setlist__rows stagger" data-setlist-rows>
			<?php foreach ( $excel_ent_songs as $excel_ent_i => $excel_ent_song ) : ?>
				<button
					class="artist-setlist__row reveal<?php echo 0 === $excel_ent_i ? ' is-active' : ''; ?>"
					type="button"
					data-reveal
					data-setlist-row
					data-genre="<?php echo esc_attr( $excel_ent_song['genre'] ); ?>"
					data-title="<?php echo esc_attr( $excel_ent_song['title'] ); ?>"
					data-artist="<?php echo esc_attr( $excel_ent_song['artist'] ); ?>"
					style="--i: <?php echo esc_attr( (string) $excel_ent_i ); ?>; transition-delay: <?php echo esc_attr( (string) ( $excel_ent_i * 60 ) ); ?>ms"
				>
					<span class="artist-setlist__num"><?php echo esc_html( str_pad( (string) ( $excel_ent_i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
					<span class="artist-setlist__song"><?php echo esc_html( $excel_ent_song['title'] ); ?></span>
					<span class="artist-setlist__by"><?php echo esc_html( $excel_ent_song['artist'] ); ?></span>
					<span class="artist-setlist__play" aria-hidden="true">
						<img src="<?php echo esc_url( $excel_ent_uri . '/play.svg' ); ?>" alt="" width="32" height="32" decoding="async">
					</span>
				</button>
			<?php endforeach; ?>
		</div>

		<div class="artist-setlist__player">
			<div class="artist-setlist__player-top">
				<span><?php esc_html_e( 'Now playing', 'excel-ent' ); ?></span>
				<span>2:21 / 3:30</span>
			</div>
			<div class="artist-setlist__player-controls">
				<button type="button" class="magnetic" aria-label="<?php esc_attr_e( 'Previous track', 'excel-ent' ); ?>">
					<img src="<?php echo esc_url( $excel_ent_uri . '/skip-back.svg' ); ?>" alt="" width="18" height="18" decoding="async">
				</button>
				<button type="button" class="artist-setlist__play-main magnetic" aria-label="<?php esc_attr_e( 'Play', 'excel-ent' ); ?>">
					<img src="<?php echo esc_url( $excel_ent_uri . '/play-pink.svg' ); ?>" alt="" width="24" height="24" decoding="async">
				</button>
				<button type="button" class="magnetic" aria-label="<?php esc_attr_e( 'Next track', 'excel-ent' ); ?>">
					<img src="<?php echo esc_url( $excel_ent_uri . '/skip-forward.svg' ); ?>" alt="" width="18" height="18" decoding="async">
				</button>
				<div class="artist-setlist__progress" aria-hidden="true">
					<span></span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Photos & Videos -->
<section class="artist-media" aria-label="<?php esc_attr_e( 'Photos and videos', 'excel-ent' ); ?>" data-artist-media>
	<h2 class="artist-media__title reveal" data-reveal><?php esc_html_e( 'PHOTOS & VIDEOS', 'excel-ent' ); ?></h2>

	<div class="artist-media__tabs reveal" data-reveal role="tablist">
		<button class="is-active magnetic" type="button" role="tab" aria-selected="true" aria-controls="artist-media-photos" id="artist-media-tab-photos" data-media-tab="photos"><?php esc_html_e( 'Photos', 'excel-ent' ); ?></button>
		<button class="magnetic" type="button" role="tab" aria-selected="false" aria-controls="artist-media-videos" id="artist-media-tab-videos" data-media-tab="videos"><?php esc_html_e( 'Videos', 'excel-ent' ); ?></button>
	</div>

	<div class="artist-media__panel is-active" id="artist-media-photos" role="tabpanel" aria-labelledby="artist-media-tab-photos" data-media-panel="photos">
		<div class="artist-media__stage reveal" data-reveal>
			<img
				src="<?php echo esc_url( $excel_ent_gallery[0]['image'] ); ?>"
				alt=""
				width="1682"
				height="886"
				loading="lazy"
				decoding="async"
				data-media-main
			>
			<div class="artist-media__meta">
				<span><?php esc_html_e( 'Venue:', 'excel-ent' ); ?> <strong data-media-venue><?php echo esc_html( $excel_ent_gallery[0]['venue'] ); ?></strong></span>
				<span><?php esc_html_e( 'Location:', 'excel-ent' ); ?> <strong data-media-location><?php echo esc_html( $excel_ent_gallery[0]['location'] ); ?></strong></span>
				<span><?php esc_html_e( 'Duration:', 'excel-ent' ); ?> <strong data-media-duration><?php echo esc_html( $excel_ent_gallery[0]['duration'] ); ?></strong></span>
				<span><?php esc_html_e( 'Guest Count:', 'excel-ent' ); ?> <strong data-media-guests><?php echo esc_html( $excel_ent_gallery[0]['guests'] ); ?></strong></span>
			</div>
		</div>

		<div class="artist-media__gallery">
			<div class="artist-media__thumbs stagger" data-media-thumbs-primary>
				<?php foreach ( array_slice( $excel_ent_gallery, 0, 4 ) as $excel_ent_gi => $excel_ent_g ) : ?>
					<button
						class="artist-media__thumb reveal<?php echo 3 === $excel_ent_gi ? ' is-selected' : ''; ?>"
						type="button"
						data-reveal
						data-media-thumb
						data-image="<?php echo esc_url( $excel_ent_g['image'] ); ?>"
						data-venue="<?php echo esc_attr( $excel_ent_g['venue'] ); ?>"
						data-location="<?php echo esc_attr( $excel_ent_g['location'] ); ?>"
						data-duration="<?php echo esc_attr( $excel_ent_g['duration'] ); ?>"
						data-guests="<?php echo esc_attr( $excel_ent_g['guests'] ); ?>"
						style="--i: <?php echo esc_attr( (string) $excel_ent_gi ); ?>; transition-delay: <?php echo esc_attr( (string) ( $excel_ent_gi * 80 ) ); ?>ms"
					>
						<img src="<?php echo esc_url( $excel_ent_g['image'] ); ?>" alt="" loading="lazy" decoding="async">
						<span class="artist-media__selected-label"><?php esc_html_e( 'SELECTED', 'excel-ent' ); ?></span>
					</button>
				<?php endforeach; ?>
			</div>
			<div class="artist-media__thumbs artist-media__thumbs--secondary stagger" data-media-thumbs-secondary>
				<?php foreach ( array_slice( $excel_ent_gallery, 4, 2 ) as $excel_ent_gi => $excel_ent_g ) : ?>
					<button
						class="artist-media__thumb reveal"
						type="button"
						data-reveal
						data-media-thumb
						data-image="<?php echo esc_url( $excel_ent_g['image'] ); ?>"
						data-venue="<?php echo esc_attr( $excel_ent_g['venue'] ); ?>"
						data-location="<?php echo esc_attr( $excel_ent_g['location'] ); ?>"
						data-duration="<?php echo esc_attr( $excel_ent_g['duration'] ); ?>"
						data-guests="<?php echo esc_attr( $excel_ent_g['guests'] ); ?>"
						style="--i: <?php echo esc_attr( (string) ( $excel_ent_gi + 4 ) ); ?>; transition-delay: <?php echo esc_attr( (string) ( ( $excel_ent_gi + 4 ) * 80 ) ); ?>ms"
					>
						<img src="<?php echo esc_url( $excel_ent_g['image'] ); ?>" alt="" loading="lazy" decoding="async">
						<span class="artist-media__selected-label"><?php esc_html_e( 'SELECTED', 'excel-ent' ); ?></span>
					</button>
				<?php endforeach; ?>
			</div>
		</div>
	</div>

	<div class="artist-media__panel" id="artist-media-videos" role="tabpanel" aria-labelledby="artist-media-tab-videos" data-media-panel="videos" hidden>
		<div class="artist-media__video reveal" data-reveal>
			<img
				class="artist-media__video-poster"
				src="<?php echo esc_url( $excel_ent_uri . '/video-poster.jpg' ); ?>"
				alt="<?php esc_attr_e( 'Artist performance video', 'excel-ent' ); ?>"
				width="1682"
				height="886"
				loading="lazy"
				decoding="async"
			>
			<div class="artist-media__playback">
				<div class="artist-media__playback-controls">
					<button type="button" class="artist-media__ctrl magnetic" aria-label="<?php esc_attr_e( 'Previous video', 'excel-ent' ); ?>">
						<img src="<?php echo esc_url( $excel_ent_uri . '/video-skip-back.svg' ); ?>" alt="" width="18" height="18" decoding="async">
					</button>
					<button type="button" class="artist-media__ctrl artist-media__ctrl--play magnetic" aria-label="<?php esc_attr_e( 'Play video', 'excel-ent' ); ?>">
						<img src="<?php echo esc_url( $excel_ent_uri . '/video-play.svg' ); ?>" alt="" width="24" height="24" decoding="async">
					</button>
					<button type="button" class="artist-media__ctrl magnetic" aria-label="<?php esc_attr_e( 'Next video', 'excel-ent' ); ?>">
						<img src="<?php echo esc_url( $excel_ent_uri . '/video-skip-forward.svg' ); ?>" alt="" width="18" height="18" decoding="async">
					</button>
					<div class="artist-media__playback-progress" aria-hidden="true">
						<span style="width: 60%"></span>
					</div>
				</div>
				<p class="artist-media__playback-time">2:21 / 3:30</p>
			</div>
		</div>
	</div>
</section>

<!-- Similar Artists -->
<section class="artist-similar" aria-label="<?php esc_attr_e( 'Similar artists', 'excel-ent' ); ?>" data-artist-similar>
	<header class="artist-similar__header reveal" data-reveal>
		<h2 class="artist-similar__title"><?php esc_html_e( 'View Similar Artists', 'excel-ent' ); ?></h2>
		<div class="artist-similar__eyebrow">
			<span><?php esc_html_e( '(Recommended)', 'excel-ent' ); ?></span>
			<img src="<?php echo esc_url( $excel_ent_uri . '/line-accent.svg' ); ?>" alt="" width="226" height="2" decoding="async">
		</div>
	</header>

	<div class="artist-similar__viewport">
		<div class="artist-similar__track stagger" data-similar-track>
			<?php foreach ( $excel_ent_similar as $excel_ent_index => $excel_ent_artist ) : ?>
				<article
					class="explore-artist-card reveal"
					data-reveal
					style="--i: <?php echo esc_attr( (string) $excel_ent_index ); ?>; transition-delay: <?php echo esc_attr( (string) ( $excel_ent_index * 80 ) ); ?>ms"
				>
					<div class="explore-artist-card__media" aria-hidden="true">
						<img src="<?php echo esc_url( $excel_ent_artist['image'] ); ?>" alt="" width="560" height="779" loading="lazy" decoding="async">
						<span class="explore-artist-card__shade"></span>
					</div>
					<div class="explore-artist-card__top">
						<button class="explore-artist-card__fav magnetic" type="button" aria-pressed="false" aria-label="<?php esc_attr_e( 'Favorite artist', 'excel-ent' ); ?>" data-explore-fav>
							<img class="explore-artist-card__fav-on" src="<?php echo esc_url( $excel_ent_ea . '/heart-active.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							<img class="explore-artist-card__fav-off" src="<?php echo esc_url( $excel_ent_ea . '/heart.svg' ); ?>" alt="" width="24" height="24" decoding="async">
						</button>
						<button class="explore-artist-card__volume magnetic" type="button" aria-label="<?php esc_attr_e( 'Preview audio', 'excel-ent' ); ?>">
							<img src="<?php echo esc_url( $excel_ent_ea . '/volume.svg' ); ?>" alt="" width="43" height="43" decoding="async">
						</button>
					</div>
					<div class="explore-artist-card__body">
						<div class="explore-artist-card__content">
							<div class="explore-artist-card__meta">
								<span class="explore-artist-card__status explore-artist-card__status--<?php echo esc_attr( $excel_ent_artist['status_mod'] ); ?>">
									<?php echo esc_html( $excel_ent_artist['status'] ); ?>
								</span>
								<span class="explore-artist-card__rating">
									<img src="<?php echo esc_url( $excel_ent_ea . '/star.svg' ); ?>" alt="" width="18" height="18" decoding="async">
									<?php
									printf(
										/* translators: %s: rating value */
										esc_html__( '%s Rating', 'excel-ent' ),
										esc_html( $excel_ent_artist['rating'] )
									);
									?>
								</span>
								<span class="explore-artist-card__location">
									<img src="<?php echo esc_url( $excel_ent_ea . '/map-pin.svg' ); ?>" alt="" width="18" height="18" decoding="async">
									<?php echo esc_html( $excel_ent_artist['location'] ); ?>
								</span>
							</div>
							<div class="explore-artist-card__identity">
								<h3 class="explore-artist-card__name"><?php echo esc_html( $excel_ent_artist['name'] ); ?></h3>
								<p class="explore-artist-card__price">
									<strong><?php echo esc_html( $excel_ent_artist['price'] ); ?></strong>
									<span><?php esc_html_e( 'Starting From', 'excel-ent' ); ?></span>
								</p>
							</div>
							<ul class="explore-artist-card__tags">
								<?php foreach ( $excel_ent_artist['tags'] as $excel_ent_tag ) : ?>
									<li><?php echo esc_html( $excel_ent_tag ); ?></li>
								<?php endforeach; ?>
								<li class="explore-artist-card__tag-more" aria-hidden="true">
									<img
										src="<?php echo esc_url( $excel_ent_ea . '/add-fill.svg' ); ?>"
										alt=""
										width="13"
										height="13"
										decoding="async"
									>
								</li>
							</ul>
						</div>
						<div class="explore-artist-card__actions">
							<a class="explore-artist-card__btn explore-artist-card__btn--profile magnetic" href="<?php echo esc_url( $excel_ent_profile ); ?>">
								<?php esc_html_e( 'View Profile', 'excel-ent' ); ?>
							</a>
							<a class="explore-artist-card__btn explore-artist-card__btn--quote magnetic" href="<?php echo esc_url( $excel_ent_quote ); ?>">
								<?php esc_html_e( 'Get a Quote', 'excel-ent' ); ?>
							</a>
						</div>
					</div>
				</article>
			<?php endforeach; ?>
		</div>
	</div>

	<div class="artist-similar__footer reveal" data-reveal>
		<div class="artist-similar__bar" aria-hidden="true">
			<span data-similar-progress></span>
		</div>
		<div class="artist-similar__pager">
			<button class="magnetic" type="button" data-similar-prev aria-label="<?php esc_attr_e( 'Previous artists', 'excel-ent' ); ?>">
				<img src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/artists/arrow-nav-left.svg' ); ?>" alt="" width="42" height="42" decoding="async">
			</button>
			<p data-similar-count>1/4</p>
			<button class="magnetic" type="button" data-similar-next aria-label="<?php esc_attr_e( 'Next artists', 'excel-ent' ); ?>">
				<img src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/artists/arrow-nav-right.svg' ); ?>" alt="" width="42" height="42" decoding="async">
			</button>
		</div>
	</div>
</section>
