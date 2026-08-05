<?php
/**
 * Explore Artists listing — filters + grid (Figma 1224:89401 / 1224:89450).
 *
 * @package Excel_Ent
 */

$excel_ent_ea_uri   = EXCEL_ENT_URI . '/assets/images/explore-artists';
$excel_ent_quote    = excel_ent_get_quote_url();
$excel_ent_profile  = home_url( '/artists/' );

$excel_ent_categories = array(
	array(
		'id'     => 'all',
		'label'  => __( 'All', 'excel-ent' ),
		'count'  => '1800',
		'active' => true,
	),
	array(
		'id'     => 'artist-type',
		'label'  => __( 'Artist Type', 'excel-ent' ),
		'count'  => '1200',
		'active' => false,
	),
	array(
		'id'     => 'tribute',
		'label'  => __( 'Tribute Acts', 'excel-ent' ),
		'count'  => '1200',
		'active' => false,
	),
	array(
		'id'     => 'genre',
		'label'  => __( 'Music Genre', 'excel-ent' ),
		'count'  => '1200',
		'active' => false,
	),
	array(
		'id'     => 'era',
		'label'  => __( 'Era / Decade', 'excel-ent' ),
		'count'  => '1200',
		'active' => false,
	),
	array(
		'id'     => 'event',
		'label'  => __( 'Event Type', 'excel-ent' ),
		'count'  => '1200',
		'active' => false,
	),
);

$excel_ent_chips = array(
	__( 'Solo male', 'excel-ent' ),
	__( 'budget :High to low', 'excel-ent' ),
	__( 'Most booked', 'excel-ent' ),
);

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
		'tags'      => array( 'Nightclubs', 'DJs', 'clubs', 'Nightclubs', '+' ),
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
		'tags'      => array( 'Nightclubs', 'DJs', 'clubs', 'Nightclubs', '+' ),
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
		'tags'      => array( 'Nightclubs', 'DJs', 'clubs', 'Nightclubs', '+' ),
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
		'tags'      => array( 'Nightclubs', 'DJs', 'clubs', 'Nightclubs', '+' ),
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
		'tags'      => array( 'Nightclubs', 'DJs', 'clubs', 'Nightclubs', '+' ),
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
		'tags'      => array( 'Nightclubs', 'DJs', 'clubs', 'Nightclubs', '+' ),
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
		<div class="explore-artists__toolbar">
			<div class="explore-artists__categories" role="tablist" aria-label="<?php esc_attr_e( 'Artist categories', 'excel-ent' ); ?>">
				<?php foreach ( $excel_ent_categories as $excel_ent_cat ) : ?>
					<button
						class="explore-artists__cat<?php echo $excel_ent_cat['active'] ? ' is-active' : ''; ?>"
						type="button"
						role="tab"
						aria-selected="<?php echo $excel_ent_cat['active'] ? 'true' : 'false'; ?>"
						data-explore-cat="<?php echo esc_attr( $excel_ent_cat['id'] ); ?>"
					>
						<span class="explore-artists__cat-label"><?php echo esc_html( $excel_ent_cat['label'] ); ?></span>
						<span class="explore-artists__cat-count"><?php echo esc_html( $excel_ent_cat['count'] ); ?></span>
					</button>
				<?php endforeach; ?>
			</div>

			<button class="explore-artists__sort" type="button" data-explore-sort>
				<img
					src="<?php echo esc_url( $excel_ent_ea_uri . '/equalizer-fill.svg' ); ?>"
					alt=""
					width="24"
					height="24"
					decoding="async"
				>
				<span><?php esc_html_e( 'Filters & Sort', 'excel-ent' ); ?></span>
				<span class="explore-artists__sort-badge" data-explore-filter-count>5</span>
			</button>
		</div>

		<div class="explore-artists__chips-bar" data-explore-chips-bar>
			<div class="explore-artists__chips" data-explore-chips>
				<?php foreach ( $excel_ent_chips as $excel_ent_chip ) : ?>
					<button class="explore-artists__chip" type="button" data-explore-chip>
						<span><?php echo esc_html( $excel_ent_chip ); ?></span>
						<img
							src="<?php echo esc_url( $excel_ent_ea_uri . '/close-line.svg' ); ?>"
							alt=""
							width="24"
							height="24"
							decoding="async"
						>
					</button>
				<?php endforeach; ?>
			</div>
			<button class="explore-artists__clear" type="button" data-explore-clear>
				<?php esc_html_e( 'Clear All filters', 'excel-ent' ); ?>
			</button>
		</div>

		<div class="explore-artists__results">
			<div class="explore-artists__results-label">
				<span><?php esc_html_e( 'All', 'excel-ent' ); ?></span>
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

	<div class="explore-artists__grid">
		<?php foreach ( $excel_ent_artists as $excel_ent_artist ) : ?>
			<?php
			$excel_ent_card_class = 'explore-artist-card';
			if ( ! empty( $excel_ent_artist['featured'] ) ) {
				$excel_ent_card_class .= ' explore-artist-card--featured';
			}
			if ( ! empty( $excel_ent_artist['favorited'] ) ) {
				$excel_ent_card_class .= ' is-favorited';
			}
			?>
			<article class="<?php echo esc_attr( $excel_ent_card_class ); ?>">
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
					<button
						class="explore-artist-card__fav"
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
						class="explore-artist-card__volume"
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
					</ul>

					<div class="explore-artist-card__actions">
						<a class="explore-artist-card__btn explore-artist-card__btn--profile" href="<?php echo esc_url( $excel_ent_profile ); ?>">
							<?php esc_html_e( 'View Profile', 'excel-ent' ); ?>
						</a>
						<a class="explore-artist-card__btn explore-artist-card__btn--quote" href="<?php echo esc_url( $excel_ent_quote ); ?>">
							<?php esc_html_e( 'Get a Quote', 'excel-ent' ); ?>
						</a>
					</div>
				</div>
			</article>
		<?php endforeach; ?>
	</div>
</section>
