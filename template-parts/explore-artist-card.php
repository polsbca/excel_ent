<?php
/**
 * Explore / search artist card.
 *
 * @package Excel_Ent
 *
 * @var array $args {
 *     @type array  $artist Card data from excel_ent_normalize_api_artist().
 *     @type int    $index  Loop index.
 * }
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$excel_ent_ea_uri   = EXCEL_ENT_URI . '/assets/images/explore-artists';
$excel_ent_quote    = excel_ent_get_quote_url();
$excel_ent_artist   = isset( $args['artist'] ) && is_array( $args['artist'] ) ? $args['artist'] : array();
$excel_ent_index    = isset( $args['index'] ) ? (int) $args['index'] : 0;
$excel_ent_profile  = ! empty( $excel_ent_artist['profile_url'] ) ? $excel_ent_artist['profile_url'] : excel_ent_get_artist_page_url();
$excel_ent_card_class = 'explore-artist-card reveal';

if ( ! empty( $excel_ent_artist['featured'] ) ) {
	$excel_ent_card_class .= ' explore-artist-card--featured';
}
if ( ! empty( $excel_ent_artist['favorited'] ) ) {
	$excel_ent_card_class .= ' is-favorited';
}

$excel_ent_status_mod = ! empty( $excel_ent_artist['status_mod'] ) ? $excel_ent_artist['status_mod'] : 'later';
$excel_ent_has_status = ! empty( $excel_ent_artist['status'] );
$excel_ent_has_rating = ! empty( $excel_ent_artist['rating'] );
$excel_ent_has_location = ! empty( $excel_ent_artist['location'] );
$excel_ent_tags = ! empty( $excel_ent_artist['tags'] ) && is_array( $excel_ent_artist['tags'] ) ? $excel_ent_artist['tags'] : array();
$excel_ent_image_alt = ! empty( $excel_ent_artist['image_is_placeholder'] )
	? sprintf(
		/* translators: %s: artist name */
		__( 'Placeholder image for %s', 'excel-ent' ),
		$excel_ent_artist['name'] ?? ''
	)
	: '';
?>
<article
	class="<?php echo esc_attr( $excel_ent_card_class ); ?>"
	data-reveal
	data-explore-artist-card
	data-profile-url="<?php echo esc_url( $excel_ent_profile ); ?>"
	role="link"
	tabindex="0"
	aria-label="<?php echo esc_attr( sprintf( /* translators: %s: artist name */ __( 'View profile: %s', 'excel-ent' ), $excel_ent_artist['name'] ?? '' ) ); ?>"
	style="--i: <?php echo esc_attr( (string) $excel_ent_index ); ?>; transition-delay: <?php echo esc_attr( (string) ( $excel_ent_index * 80 ) ); ?>ms"
>
	<div class="explore-artist-card__media" aria-hidden="true">
		<img
			src="<?php echo esc_url( $excel_ent_artist['image'] ?? excel_ent_get_artist_placeholder_image_url() ); ?>"
			alt="<?php echo esc_attr( $excel_ent_image_alt ); ?>"
			width="560"
			height="779"
			loading="lazy"
			decoding="async"
		>
		<span class="explore-artist-card__shade"></span>
	</div>

	<div class="explore-artist-card__top">
		<?php if ( $excel_ent_has_status ) : ?>
			<span class="explore-artist-card__status explore-artist-card__status--desktop explore-artist-card__status--<?php echo esc_attr( $excel_ent_status_mod ); ?>" aria-hidden="true">
				<?php echo esc_html( $excel_ent_artist['status'] ); ?>
			</span>
		<?php endif; ?>
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
	</div>

	<div class="explore-artist-card__body">
		<div class="explore-artist-card__content">
			<?php if ( $excel_ent_has_status || $excel_ent_has_rating || $excel_ent_has_location ) : ?>
				<div class="explore-artist-card__meta">
					<?php if ( $excel_ent_has_status ) : ?>
						<span class="explore-artist-card__status explore-artist-card__status--<?php echo esc_attr( $excel_ent_status_mod ); ?>">
							<?php echo esc_html( $excel_ent_artist['status'] ); ?>
						</span>
					<?php endif; ?>
					<?php if ( $excel_ent_has_rating ) : ?>
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
					<?php endif; ?>
					<?php if ( $excel_ent_has_location ) : ?>
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
					<?php endif; ?>
				</div>
			<?php endif; ?>

			<div class="explore-artist-card__identity">
				<h2 class="explore-artist-card__name"><?php echo esc_html( $excel_ent_artist['name'] ?? '' ); ?></h2>
				<p class="explore-artist-card__price">
					<strong><?php echo esc_html( $excel_ent_artist['price'] ?? '' ); ?></strong>
					<span><?php esc_html_e( 'Starting From', 'excel-ent' ); ?></span>
				</p>
			</div>

			<?php if ( $excel_ent_tags ) : ?>
				<ul class="explore-artist-card__tags">
					<?php foreach ( array_slice( $excel_ent_tags, 0, 4 ) as $excel_ent_tag ) : ?>
						<li><?php echo esc_html( $excel_ent_tag ); ?></li>
					<?php endforeach; ?>
					<?php if ( count( $excel_ent_tags ) > 4 ) : ?>
						<li class="explore-artist-card__tag-more" aria-hidden="true">
							<img
								src="<?php echo esc_url( $excel_ent_ea_uri . '/add-fill.svg' ); ?>"
								alt=""
								width="13"
								height="13"
								decoding="async"
							>
						</li>
					<?php endif; ?>
				</ul>
			<?php endif; ?>
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
