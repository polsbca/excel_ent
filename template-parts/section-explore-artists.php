<?php
/**
 * Explore Artists listing — Figma desktop 2202:32111 / tablet 1099:2920 / mobile 1023:6857
 *
 * @package Excel_Ent
 */

$excel_ent_ea_uri   = EXCEL_ENT_URI . '/assets/images/explore-artists';
$excel_ent_quote    = excel_ent_get_quote_url();
$excel_ent_profile  = excel_ent_get_artist_page_url();

$excel_ent_artists = array(
	array(
		'name'      => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'image'     => $excel_ent_ea_uri . '/artist-1.jpg',
		'price'     => '£1,200',
		'rating'    => '4.5',
		'location'  => __( 'Manchester', 'excel-ent' ),
		'status'    => __( 'Available this weekend', 'excel-ent' ),
		'status_mod'=> 'weekend',
		'featured'  => true,
		'favorited' => true,
		'tags'      => array( 'Nightclubs', 'Nightclubs', 'Nightclubs', 'Nightclubs' ),
	),
	array(
		'name'      => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'image'     => $excel_ent_ea_uri . '/artist-2.jpg',
		'price'     => '£1,200',
		'rating'    => '4.5',
		'location'  => __( 'Manchester', 'excel-ent' ),
		'status'    => __( 'Available After 30 days', 'excel-ent' ),
		'status_mod'=> 'later',
		'featured'  => false,
		'favorited' => false,
		'tags'      => array( 'Nightclubs', 'Nightclubs', 'Nightclubs', 'Nightclubs' ),
	),
	array(
		'name'      => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'image'     => $excel_ent_ea_uri . '/artist-3.jpg',
		'price'     => '£1,200',
		'rating'    => '4.5',
		'location'  => __( 'Manchester', 'excel-ent' ),
		'status'    => __( 'Available this weekend', 'excel-ent' ),
		'status_mod'=> 'weekend',
		'featured'  => false,
		'favorited' => true,
		'tags'      => array( 'Nightclubs', 'Nightclubs', 'Nightclubs', 'Nightclubs' ),
	),
	array(
		'name'      => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'image'     => $excel_ent_ea_uri . '/artist-4.jpg',
		'price'     => '£1,200',
		'rating'    => '4.5',
		'location'  => __( 'Manchester', 'excel-ent' ),
		'status'    => __( 'Available this weekend', 'excel-ent' ),
		'status_mod'=> 'weekend',
		'featured'  => false,
		'favorited' => false,
		'tags'      => array( 'Nightclubs', 'Nightclubs', 'Nightclubs', 'Nightclubs' ),
	),
	array(
		'name'      => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'image'     => $excel_ent_ea_uri . '/artist-5.jpg',
		'price'     => '£1,200',
		'rating'    => '4.5',
		'location'  => __( 'Manchester', 'excel-ent' ),
		'status'    => __( 'Available this weekend', 'excel-ent' ),
		'status_mod'=> 'weekend',
		'featured'  => false,
		'favorited' => true,
		'tags'      => array( 'Nightclubs', 'Nightclubs', 'Nightclubs', 'Nightclubs' ),
	),
	array(
		'name'      => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'image'     => $excel_ent_ea_uri . '/artist-6.jpg',
		'price'     => '£1,200',
		'rating'    => '4.5',
		'location'  => __( 'Manchester', 'excel-ent' ),
		'status'    => __( 'Available this weekend', 'excel-ent' ),
		'status_mod'=> 'weekend',
		'featured'  => false,
		'favorited' => false,
		'tags'      => array( 'Nightclubs', 'Nightclubs', 'Nightclubs', 'Nightclubs' ),
	),
);
?>
<section
	class="explore-artists"
	id="explore-artists"
	aria-label="<?php esc_attr_e( 'Explore artists', 'excel-ent' ); ?>"
	data-explore-artists
>
	<div class="explore-artists__filters">
		<header class="explore-artists__intro reveal" data-reveal>
			<h1 class="explore-artists__title"><?php esc_html_e( 'EVERY ARTIST. EVERY VIBE.', 'excel-ent' ); ?></h1>
			<p class="explore-artists__intro-count">
				<?php esc_html_e( '1200 Artist', 'excel-ent' ); ?>
			</p>
		</header>

		<div class="explore-artists__chips-bar is-empty reveal" data-reveal data-explore-chips-bar>
			<div class="explore-artists__chips" data-explore-chips></div>
			<button class="explore-artists__clear magnetic" type="button" data-explore-clear>
				<img
					class="explore-artists__clear-icon"
					src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/search/close-large-line.svg' ); ?>"
					alt=""
					width="24"
					height="24"
					decoding="async"
				>
				<span><?php esc_html_e( 'Clear all Filters', 'excel-ent' ); ?></span>
			</button>
		</div>

		<div class="explore-artists__results reveal" data-reveal>
			<div class="explore-artists__results-label">
				<span data-explore-results-label data-default-label="<?php esc_attr_e( 'All', 'excel-ent' ); ?>"><?php esc_html_e( 'All', 'excel-ent' ); ?></span>
				<img
					src="<?php echo esc_url( $excel_ent_ea_uri . '/line-accent.svg' ); ?>"
					alt=""
					width="226"
					height="2"
					decoding="async"
				>
			</div>
			<p class="explore-artists__results-count" data-explore-count>
				<?php esc_html_e( '1800 Artist', 'excel-ent' ); ?>
			</p>
		</div>
	</div>

	<div class="explore-artists__grid stagger">
		<?php foreach ( $excel_ent_artists as $excel_ent_index => $excel_ent_artist ) : ?>
			<?php
			$excel_ent_card_class = 'explore-artist-card reveal';
			if ( ! empty( $excel_ent_artist['featured'] ) ) {
				$excel_ent_card_class .= ' explore-artist-card--featured';
			}
			if ( ! empty( $excel_ent_artist['favorited'] ) ) {
				$excel_ent_card_class .= ' is-favorited';
			}
			?>
			<article
				class="<?php echo esc_attr( $excel_ent_card_class ); ?>"
				data-reveal
				data-explore-artist-card
				data-profile-url="<?php echo esc_url( $excel_ent_profile ); ?>"
				role="link"
				tabindex="0"
				aria-label="<?php echo esc_attr( sprintf( /* translators: %s: artist name */ __( 'View profile: %s', 'excel-ent' ), $excel_ent_artist['name'] ) ); ?>"
				style="--i: <?php echo esc_attr( (string) $excel_ent_index ); ?>; transition-delay: <?php echo esc_attr( (string) ( $excel_ent_index * 80 ) ); ?>ms"
			>
				<div class="explore-artist-card__media" aria-hidden="true">
					<img
						src="<?php echo esc_url( $excel_ent_artist['image'] ); ?>"
						alt=""
						width="560"
						height="779"
						loading="lazy"
						decoding="async"
					>
					<span class="explore-artist-card__shade"></span>
				</div>

				<div class="explore-artist-card__top">
					<span class="explore-artist-card__status explore-artist-card__status--desktop explore-artist-card__status--<?php echo esc_attr( $excel_ent_artist['status_mod'] ); ?>" aria-hidden="true">
						<?php echo esc_html( $excel_ent_artist['status'] ); ?>
					</span>
					<button
						class="explore-artist-card__fav magnetic"
						type="button"
						aria-pressed="<?php echo ! empty( $excel_ent_artist['favorited'] ) ? 'true' : 'false'; ?>"
						aria-label="<?php esc_attr_e( 'Favorite artist', 'excel-ent' ); ?>"
						data-explore-fav
					>
						<img
							class="explore-artist-card__fav-on"
							src="<?php echo esc_url( $excel_ent_ea_uri . '/heart-active.svg' ); ?>"
							alt=""
							width="24"
							height="24"
							decoding="async"
						>
						<img
							class="explore-artist-card__fav-off"
							src="<?php echo esc_url( $excel_ent_ea_uri . '/heart.svg' ); ?>"
							alt=""
							width="24"
							height="24"
							decoding="async"
						>
					</button>
					<button
						class="explore-artist-card__volume magnetic"
						type="button"
						aria-label="<?php esc_attr_e( 'Preview audio', 'excel-ent' ); ?>"
					>
						<img
							src="<?php echo esc_url( $excel_ent_ea_uri . '/volume.svg' ); ?>"
							alt=""
							width="43"
							height="43"
							decoding="async"
						>
					</button>
				</div>

				<div class="explore-artist-card__body">
					<div class="explore-artist-card__content">
						<div class="explore-artist-card__meta">
							<span class="explore-artist-card__status explore-artist-card__status--<?php echo esc_attr( $excel_ent_artist['status_mod'] ); ?>">
								<?php echo esc_html( $excel_ent_artist['status'] ); ?>
							</span>
							<span class="explore-artist-card__rating">
								<img
									src="<?php echo esc_url( $excel_ent_ea_uri . '/star.svg' ); ?>"
									alt=""
									width="18"
									height="18"
									decoding="async"
								>
								<?php
								printf(
									/* translators: %s: rating value */
									esc_html__( '%s Rating', 'excel-ent' ),
									esc_html( $excel_ent_artist['rating'] )
								);
								?>
							</span>
							<span class="explore-artist-card__location">
								<img
									src="<?php echo esc_url( $excel_ent_ea_uri . '/map-pin.svg' ); ?>"
									alt=""
									width="18"
									height="18"
									decoding="async"
								>
								<?php echo esc_html( $excel_ent_artist['location'] ); ?>
							</span>
						</div>

						<div class="explore-artist-card__identity">
							<h2 class="explore-artist-card__name"><?php echo esc_html( $excel_ent_artist['name'] ); ?></h2>
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
									src="<?php echo esc_url( $excel_ent_ea_uri . '/add-fill.svg' ); ?>"
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
</section>
