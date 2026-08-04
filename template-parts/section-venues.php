<?php
/**
 * Venues accordion section (Figma 898:8673 — desktop).
 *
 * @package Excel_Ent
 */

$excel_ent_venues_uri = EXCEL_ENT_URI . '/assets/images/venues';
$excel_ent_contact    = home_url( '/contact/' );

$excel_ent_venues = array(
	array(
		'id'          => 'pubs',
		'title'       => __( 'Pubs', 'excel-ent' ),
		'image'       => $excel_ent_venues_uri . '/pubs.jpg',
		'description' => __( 'Regular weekly acts to keep your venue packed and your regulars coming back every time.', 'excel-ent' ),
		'tags'        => array(
			__( 'Nightclubs', 'excel-ent' ),
			__( 'Bars & Pubs', 'excel-ent' ),
			__( 'DJ Nights', 'excel-ent' ),
			__( 'Live Music Nights', 'excel-ent' ),
		),
		'active'      => true,
	),
	array(
		'id'          => 'clubs',
		'title'       => __( 'Clubs', 'excel-ent' ),
		'image'       => $excel_ent_venues_uri . '/clubs.jpg',
		'description' => __( 'High-energy nights with DJs and live performers that fill the floor and keep the energy peaking.', 'excel-ent' ),
		'tags'        => array(
			__( 'Nightclubs', 'excel-ent' ),
			__( 'Late Nights', 'excel-ent' ),
			__( 'Resident DJs', 'excel-ent' ),
			__( 'Guest Acts', 'excel-ent' ),
		),
		'active'      => false,
	),
	array(
		'id'          => 'corporate',
		'title'       => __( 'Corporate Events', 'excel-ent' ),
		'image'       => $excel_ent_venues_uri . '/corporate.jpg',
		'description' => __( 'Brand-safe entertainment for conferences, launches, and private corporate occasions — polished and reliable.', 'excel-ent' ),
		'tags'        => array(
			__( 'Conferences', 'excel-ent' ),
			__( 'Awards Nights', 'excel-ent' ),
			__( 'Product Launches', 'excel-ent' ),
			__( 'Staff Parties', 'excel-ent' ),
		),
		'active'      => false,
	),
	array(
		'id'          => 'community',
		'title'       => __( 'Community Centres', 'excel-ent' ),
		'image'       => $excel_ent_venues_uri . '/community.jpg',
		'description' => __( 'Family-friendly and community-focused acts that bring people together for celebrations of every kind.', 'excel-ent' ),
		'tags'        => array(
			__( 'Weddings', 'excel-ent' ),
			__( 'Local Events', 'excel-ent' ),
			__( 'Charity Nights', 'excel-ent' ),
			__( 'Family Parties', 'excel-ent' ),
		),
		'active'      => false,
	),
);
?>
<section class="venues-section" id="venues" data-venues-section aria-label="<?php esc_attr_e( 'Venues', 'excel-ent' ); ?>">
	<div class="venues-section__inner">
		<header class="venues-section__header reveal" data-reveal>
			<h2 class="venues-section__title"><?php esc_html_e( 'WE WORK WITH EVERY VENUE', 'excel-ent' ); ?></h2>

			<div class="venues-section__aside">
				<p class="venues-section__lede">
					<?php esc_html_e( 'From intimate local pubs to large golf clubs and luxury hotels — Excel supplies entertainment that fits the setting perfectly.', 'excel-ent' ); ?>
				</p>
				<div class="venues-section__eyebrow">
					<img src="<?php echo esc_url( $excel_ent_venues_uri . '/line-accent.svg' ); ?>" alt="" width="226" height="2" decoding="async">
					<span><?php esc_html_e( 'Venue Types', 'excel-ent' ); ?></span>
				</div>
			</div>
		</header>

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
								width="1840"
								height="775"
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

								<div class="venue-panel__tags">
									<?php foreach ( $excel_ent_venue['tags'] as $excel_ent_tag ) : ?>
										<span class="venue-tag"><?php echo esc_html( $excel_ent_tag ); ?></span>
									<?php endforeach; ?>
									<span class="venue-tag venue-tag--more" aria-hidden="true">
										<img src="<?php echo esc_url( $excel_ent_venues_uri . '/add-large-line.svg' ); ?>" alt="" width="24" height="24" decoding="async">
									</span>
								</div>

								<p class="venue-panel__text"><?php echo esc_html( $excel_ent_venue['description'] ); ?></p>
							</div>

							<a class="venue-panel__cta magnetic" href="<?php echo esc_url( $excel_ent_contact ); ?>">
								<?php esc_html_e( 'Contact Us', 'excel-ent' ); ?>
							</a>
						</div>
					</div>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>
