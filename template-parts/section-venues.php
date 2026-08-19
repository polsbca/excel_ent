<?php
/**
 * Venues accordion section (Figma 1668:1849 desktop / content 1673:9082).
 *
 * @package Excel_Ent
 */

$excel_ent_venues_uri = EXCEL_ENT_URI . '/assets/images/venues';

$excel_ent_venues = array(
	array(
		'id'          => 'pubs-clubs',
		'title'       => __( 'Pubs & Clubs', 'excel-ent' ),
		'image'       => $excel_ent_venues_uri . '/pubs-clubs.jpg',
		'description' => __( 'Keep your venue lively with regular entertainment for busy nights, weekend events, and returning guests.', 'excel-ent' ),
		'active'      => true,
	),
	array(
		'id'          => 'golf-social',
		'title'       => __( 'Golf & Social Clubs', 'excel-ent' ),
		'image'       => $excel_ent_venues_uri . '/golf-social.jpg',
		'description' => __( 'Create memorable experiences with entertainment suited to members, social gatherings, and special celebrations.', 'excel-ent' ),
		'active'      => false,
	),
	array(
		'id'          => 'hotels',
		'title'       => __( 'Hotels', 'excel-ent' ),
		'image'       => $excel_ent_venues_uri . '/hotels.jpg',
		'description' => __( 'Enhance your guests\' experience with professional entertainment for events, evenings, and special occasions.', 'excel-ent' ),
		'active'      => false,
	),
	array(
		'id'          => 'weddings',
		'title'       => __( 'Weddings', 'excel-ent' ),
		'image'       => $excel_ent_venues_uri . '/weddings.jpg',
		'description' => __( 'Make every celebration memorable with entertainment tailored to your wedding, guests, and special moments.', 'excel-ent' ),
		'active'      => false,
	),
	array(
		'id'          => 'corporate',
		'title'       => __( 'Corporate Functions', 'excel-ent' ),
		'image'       => $excel_ent_venues_uri . '/corporate-functions.jpg',
		'description' => __( 'Bring your corporate events to life with professional entertainment for parties, celebrations, and company gatherings.', 'excel-ent' ),
		'active'      => false,
	),
);
?>
<section class="venues-section" id="venues" data-venues-section aria-label="<?php esc_attr_e( 'Venues', 'excel-ent' ); ?>">
	<div class="venues-section__inner">
		<header class="venues-section__header reveal" data-reveal>
			<div class="venues-section__heading">
				<h2 class="venues-section__title"><?php esc_html_e( 'WE WORK WITH EVERY VENUE', 'excel-ent' ); ?></h2>
				<p class="venues-section__lede">
					<?php esc_html_e( 'From intimate local pubs to large golf clubs and luxury hotels — Excel supplies entertainment that fits the setting perfectly.', 'excel-ent' ); ?>
				</p>
			</div>
		</header>

		<div class="venues-section__types">
			<div class="venues-section__aside reveal" data-reveal>
				<div class="venues-section__eyebrow">
					<img src="<?php echo esc_url( $excel_ent_venues_uri . '/line-accent.svg' ); ?>" alt="" width="226" height="2" decoding="async">
					<span><?php esc_html_e( 'Venue Types', 'excel-ent' ); ?></span>
				</div>
			</div>

			<div class="venues-accordion" data-venues-accordion>
			<?php foreach ( $excel_ent_venues as $excel_ent_index => $excel_ent_venue ) : ?>
				<?php
				$excel_ent_is_active = ! empty( $excel_ent_venue['active'] );
				$excel_ent_panel_id  = 'venue-panel-' . $excel_ent_venue['id'];
				$excel_ent_btn_id    = 'venue-btn-' . $excel_ent_venue['id'];
				?>
				<article
					class="venue-panel<?php echo $excel_ent_is_active ? ' is-active' : ''; ?>"
					data-venue-panel
					data-venue-id="<?php echo esc_attr( $excel_ent_venue['id'] ); ?>"
				>
					<button
						type="button"
						class="venue-panel__trigger"
						id="<?php echo esc_attr( $excel_ent_btn_id ); ?>"
						aria-expanded="<?php echo $excel_ent_is_active ? 'true' : 'false'; ?>"
						aria-controls="<?php echo esc_attr( $excel_ent_panel_id ); ?>"
						data-venue-trigger
					>
						<span class="venue-panel__media" aria-hidden="true">
							<img
								class="venue-panel__image"
								src="<?php echo esc_url( $excel_ent_venue['image'] ); ?>"
								alt=""
								width="1762"
								height="736"
								loading="<?php echo 0 === $excel_ent_index ? 'eager' : 'lazy'; ?>"
								decoding="async"
							>
							<span class="venue-panel__overlay"></span>
						</span>

						<span class="venue-panel__collapsed-title"><?php echo esc_html( $excel_ent_venue['title'] ); ?></span>
					</button>

					<div
						class="venue-panel__body"
						id="<?php echo esc_attr( $excel_ent_panel_id ); ?>"
						role="region"
						aria-labelledby="<?php echo esc_attr( $excel_ent_btn_id ); ?>"
						<?php echo $excel_ent_is_active ? '' : ' hidden'; ?>
					>
						<img
							class="venue-panel__orb"
							src="<?php echo esc_url( $excel_ent_venues_uri . '/card-orb.svg' ); ?>"
							alt=""
							width="63"
							height="63"
							decoding="async"
						>

						<div class="venue-panel__content">
							<div class="venue-panel__copy">
								<h3 class="venue-panel__title"><?php echo esc_html( $excel_ent_venue['title'] ); ?></h3>
								<p class="venue-panel__text"><?php echo esc_html( $excel_ent_venue['description'] ); ?></p>
							</div>
						</div>
					</div>
				</article>
			<?php endforeach; ?>
		</div>
		</div>
	</div>
</section>
