<?php
/**
 * Compact mobile search pill + overlay (Figma 1023:2897 / 1059:5334 / 1161:5532).
 *
 * @package Excel_Ent
 */

$excel_ent_icons = EXCEL_ENT_URI . '/assets/images/icons';

$excel_ent_occasion   = isset( $_GET['occasion'] ) ? sanitize_text_field( wp_unslash( $_GET['occasion'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$excel_ent_location   = isset( $_GET['location'] ) ? sanitize_text_field( wp_unslash( $_GET['location'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$excel_ent_event_date = isset( $_GET['event_date'] ) ? sanitize_text_field( wp_unslash( $_GET['event_date'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$excel_ent_budget     = isset( $_GET['budget'] ) ? sanitize_text_field( wp_unslash( $_GET['budget'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$excel_ent_artist_q   = get_search_query();

$excel_ent_selected_occasions = array_values(
	array_filter(
		array_map( 'trim', explode( ',', $excel_ent_occasion ) )
	)
);

$excel_ent_location_options = array(
	'london'     => __( 'London', 'excel-ent' ),
	'manchester' => __( 'Manchester', 'excel-ent' ),
	'birmingham' => __( 'Birmingham', 'excel-ent' ),
	'edinburgh'  => __( 'Edinburgh', 'excel-ent' ),
	'bristol'    => __( 'Bristol', 'excel-ent' ),
);

$excel_ent_budget_options = array(
	'under-500' => __( 'Under £500', 'excel-ent' ),
	'500-1000'  => __( '£500 - £1,000', 'excel-ent' ),
	'1000-2500' => __( '£1,000 - £2,500', 'excel-ent' ),
	'2500-5000' => __( '£2,500 - £5,000', 'excel-ent' ),
	'over-5000' => __( 'Over £5,000', 'excel-ent' ),
);

/* Figma 1161:5532 — Browse by Occasion groups (aligned with desktop categories). */
$excel_ent_category_groups = array(
	'artist-type' => array(
		'label' => __( 'Artist Type', 'excel-ent' ),
		'tags'  => array(
			'shows'                => __( 'Shows', 'excel-ent' ),
			'professional-dancers' => __( 'Professional Dancers', 'excel-ent' ),
			'female-solo'          => __( 'Female Solo', 'excel-ent' ),
			'magicians-hypnotists' => __( 'Magicians & Hypnotists', 'excel-ent' ),
			'bands'                => __( 'Bands', 'excel-ent' ),
			'male-solo'            => __( 'Male Solo', 'excel-ent' ),
			'duos'                 => __( 'Duos', 'excel-ent' ),
			'djs'                  => __( "DJ's", 'excel-ent' ),
			'celebrity-acts'       => __( 'Celebrity Acts', 'excel-ent' ),
		),
	),
	'tribute'     => array(
		'label' => __( 'Tribute Acts', 'excel-ent' ),
		'tags'  => array(
			'elvis'   => __( 'Elvis', 'excel-ent' ),
			'queen'   => __( 'Queen', 'excel-ent' ),
			'adele'   => __( 'Adele', 'excel-ent' ),
			'abba'    => __( 'ABBA', 'excel-ent' ),
			'beatles' => __( 'The Beatles', 'excel-ent' ),
			'motown'  => __( 'Motown', 'excel-ent' ),
		),
	),
	'genre'       => array(
		'label' => __( 'Music Genre', 'excel-ent' ),
		'tags'  => array(
			'pop'       => __( 'Pop', 'excel-ent' ),
			'rock'      => __( 'Rock', 'excel-ent' ),
			'soul'      => __( 'Soul', 'excel-ent' ),
			'jazz'      => __( 'Jazz', 'excel-ent' ),
			'rnb'       => __( 'R&B', 'excel-ent' ),
			'classical' => __( 'Classical', 'excel-ent' ),
			'country'   => __( 'Country', 'excel-ent' ),
		),
	),
	'era'         => array(
		'label' => __( 'Era / Decade', 'excel-ent' ),
		'tags'  => array(
			'60s'    => __( "60's", 'excel-ent' ),
			'70s'    => __( "70's", 'excel-ent' ),
			'80s'    => __( "80's", 'excel-ent' ),
			'90s'    => __( "90's", 'excel-ent' ),
			'2000s'  => __( "2000's", 'excel-ent' ),
			'modern' => __( 'Modern', 'excel-ent' ),
		),
	),
	'event'       => array(
		'label' => __( 'Event Type', 'excel-ent' ),
		'tags'  => array(
			'wedding'   => __( 'Wedding', 'excel-ent' ),
			'corporate' => __( 'Corporate', 'excel-ent' ),
			'pubs'      => __( 'Pubs & Clubs', 'excel-ent' ),
			'private'   => __( 'Private Party', 'excel-ent' ),
			'festival'  => __( 'Festival', 'excel-ent' ),
		),
	),
);

$excel_ent_artist_avatar  = $excel_ent_icons . '/artist-search-avatar.jpg';
$excel_ent_artist_results = array(
	array(
		'label'  => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'avatar' => $excel_ent_artist_avatar,
	),
	array(
		'label'  => __( 'Darin Day Live Band', 'excel-ent' ),
		'avatar' => $excel_ent_artist_avatar,
	),
	array(
		'label'  => __( 'Soulful Nights Duo', 'excel-ent' ),
		'avatar' => $excel_ent_artist_avatar,
	),
	array(
		'label'  => __( 'Midnight Groove DJ', 'excel-ent' ),
		'avatar' => $excel_ent_artist_avatar,
	),
	array(
		'label'  => __( 'The Wedding Collective', 'excel-ent' ),
		'avatar' => $excel_ent_artist_avatar,
	),
);

$excel_ent_location_label = isset( $excel_ent_location_options[ $excel_ent_location ] )
	? $excel_ent_location_options[ $excel_ent_location ]
	: __( 'Location', 'excel-ent' );

$excel_ent_budget_label = isset( $excel_ent_budget_options[ $excel_ent_budget ] )
	? $excel_ent_budget_options[ $excel_ent_budget ]
	: __( 'Budget', 'excel-ent' );

$excel_ent_date_label = __( 'Event Date', 'excel-ent' );
if ( $excel_ent_event_date && preg_match( '/^\d{4}-\d{2}-\d{2}$/', $excel_ent_event_date ) ) {
	$excel_ent_date_ts = strtotime( $excel_ent_event_date );
	if ( $excel_ent_date_ts ) {
		$excel_ent_date_label = wp_date( 'j M Y', $excel_ent_date_ts );
	}
}

$excel_ent_occasion_label = __( 'Occasion', 'excel-ent' );
if ( count( $excel_ent_selected_occasions ) === 1 ) {
	foreach ( $excel_ent_category_groups as $excel_ent_group ) {
		if ( isset( $excel_ent_group['tags'][ $excel_ent_selected_occasions[0] ] ) ) {
			$excel_ent_occasion_label = $excel_ent_group['tags'][ $excel_ent_selected_occasions[0] ];
			break;
		}
	}
} elseif ( count( $excel_ent_selected_occasions ) > 1 ) {
	$excel_ent_occasion_label = sprintf(
		/* translators: %d: number of selected occasion filters */
		__( '%d selected', 'excel-ent' ),
		count( $excel_ent_selected_occasions )
	);
}

$excel_ent_explore_url = home_url( '/explore-artists/' );
?>
<div class="header-search-mobile" data-mobile-search>
	<button
		type="button"
		class="header-search-mobile__trigger"
		data-mobile-search-open
		aria-expanded="false"
		aria-controls="header-search-mobile-panel"
	>
		<span class="header-search-mobile__copy">
			<span class="header-search-mobile__title"><?php esc_html_e( 'Start your search', 'excel-ent' ); ?></span>
			<span class="header-search-mobile__hint"><?php esc_html_e( 'By artist, Event Date, budget, date & location', 'excel-ent' ); ?></span>
		</span>
		<span class="header-search-mobile__trigger-btn" aria-hidden="true">
			<img
				src="<?php echo esc_url( $excel_ent_icons . '/search-line-white.svg' ); ?>"
				alt=""
				width="18"
				height="18"
				decoding="async"
			>
		</span>
	</button>

	<div
		id="header-search-mobile-panel"
		class="header-search-mobile__overlay"
		data-mobile-search-panel
		role="dialog"
		aria-modal="true"
		aria-label="<?php esc_attr_e( 'Search artists and filters', 'excel-ent' ); ?>"
		hidden
	>
		<div class="header-search-mobile__sheet" data-msm-sheet>
			<form
				class="header-search-mobile__form"
				role="search"
				method="get"
				action="<?php echo esc_url( home_url( '/' ) ); ?>"
			>
				<div class="header-search-mobile__home" data-msm-view="home">
					<button
						type="button"
						class="header-search-mobile__close"
						data-mobile-search-close
						aria-label="<?php esc_attr_e( 'Close search', 'excel-ent' ); ?>"
					>
						<img
							src="<?php echo esc_url( $excel_ent_icons . '/close-large-line.svg' ); ?>"
							alt=""
							width="18"
							height="18"
							decoding="async"
						>
					</button>

					<div class="header-search-mobile__artist" data-msm-artist>
						<label class="header-search-mobile__artist-bar">
							<img
								class="header-search-mobile__artist-icon"
								src="<?php echo esc_url( $excel_ent_icons . '/search-muted.svg' ); ?>"
								alt=""
								width="20"
								height="20"
								decoding="async"
							>
							<span class="screen-reader-text"><?php esc_html_e( 'Search Artist', 'excel-ent' ); ?></span>
							<input
								class="header-search-mobile__artist-input"
								type="search"
								name="s"
								value="<?php echo esc_attr( $excel_ent_artist_q ); ?>"
								placeholder="<?php esc_attr_e( 'Search Artist', 'excel-ent' ); ?>"
								data-msm-artist-search
								autocomplete="off"
							>
						</label>

						<ul class="header-search-mobile__results" role="listbox" aria-label="<?php esc_attr_e( 'Artist results', 'excel-ent' ); ?>">
							<?php foreach ( $excel_ent_artist_results as $excel_ent_artist ) : ?>
								<li class="header-search-mobile__result" role="none" data-msm-artist-item>
									<button
										type="button"
										class="header-search-mobile__result-btn"
										role="option"
										data-msm-artist-option
										data-value="<?php echo esc_attr( $excel_ent_artist['label'] ); ?>"
										data-search="<?php echo esc_attr( strtolower( $excel_ent_artist['label'] ) ); ?>"
									>
										<span class="header-search-mobile__result-left">
											<img
												class="header-search-mobile__avatar"
												src="<?php echo esc_url( $excel_ent_artist['avatar'] ); ?>"
												alt=""
												width="40"
												height="40"
												decoding="async"
											>
											<span class="header-search-mobile__result-name"><?php echo esc_html( $excel_ent_artist['label'] ); ?></span>
										</span>
										<img
											class="header-search-mobile__chevron"
											src="<?php echo esc_url( $excel_ent_icons . '/chevron-right-sm.svg' ); ?>"
											alt=""
											width="20"
											height="20"
											decoding="async"
										>
									</button>
								</li>
							<?php endforeach; ?>
						</ul>
						<p class="header-search-mobile__empty" data-msm-artist-empty hidden>
							<?php esc_html_e( 'No artists found', 'excel-ent' ); ?>
						</p>
					</div>

					<div class="header-search-mobile__filters">
						<button
							type="button"
							class="header-search-mobile__filter-btn"
							data-msm-open-detail="occasion"
						>
							<img src="<?php echo esc_url( $excel_ent_icons . '/diamond-ring-fill.svg' ); ?>" alt="" width="18" height="18" decoding="async">
							<span data-msm-home-label="occasion"><?php echo esc_html( $excel_ent_occasion_label ); ?></span>
						</button>

						<button
							type="button"
							class="header-search-mobile__filter-btn"
							data-msm-open-detail="location"
						>
							<img src="<?php echo esc_url( $excel_ent_icons . '/map-pin-fill.svg' ); ?>" alt="" width="18" height="18" decoding="async">
							<span data-msm-home-label="location"><?php echo esc_html( $excel_ent_location_label ); ?></span>
						</button>

						<button
							type="button"
							class="header-search-mobile__filter-btn"
							data-msm-open-detail="date"
						>
							<img src="<?php echo esc_url( $excel_ent_icons . '/calendar-fill.svg' ); ?>" alt="" width="18" height="18" decoding="async">
							<span data-msm-home-label="date"><?php echo esc_html( $excel_ent_date_label ); ?></span>
						</button>

						<button
							type="button"
							class="header-search-mobile__filter-btn"
							data-msm-open-detail="budget"
						>
							<img src="<?php echo esc_url( $excel_ent_icons . '/money-pound-circle-fill.svg' ); ?>" alt="" width="18" height="18" decoding="async">
							<span data-msm-home-label="budget"><?php echo esc_html( $excel_ent_budget_label ); ?></span>
						</button>
					</div>
				</div>

				<div class="header-search-mobile__detail" data-msm-view="detail" hidden>
					<div class="header-search-mobile__detail-top">
						<label class="header-search-mobile__detail-search">
							<img
								src="<?php echo esc_url( $excel_ent_icons . '/search-white.svg' ); ?>"
								alt=""
								width="20"
								height="20"
								decoding="async"
							>
							<span class="screen-reader-text"><?php esc_html_e( 'Search Artist', 'excel-ent' ); ?></span>
							<input
								class="header-search-mobile__detail-input"
								type="search"
								value="<?php echo esc_attr( $excel_ent_artist_q ); ?>"
								placeholder="<?php esc_attr_e( 'Search Artist', 'excel-ent' ); ?>"
								data-msm-detail-search
								autocomplete="off"
							>
						</label>
						<button
							type="button"
							class="header-search-mobile__close header-search-mobile__close--inline"
							data-mobile-search-close
							aria-label="<?php esc_attr_e( 'Close search', 'excel-ent' ); ?>"
						>
							<img
								src="<?php echo esc_url( $excel_ent_icons . '/close-large-line.svg' ); ?>"
								alt=""
								width="18"
								height="18"
								decoding="async"
							>
						</button>
					</div>

					<div class="header-search-mobile__tabs" role="tablist" aria-label="<?php esc_attr_e( 'Search filters', 'excel-ent' ); ?>">
						<button type="button" class="header-search-mobile__tab is-active" role="tab" aria-selected="true" data-msm-tab="occasion"><?php esc_html_e( 'Occasion', 'excel-ent' ); ?></button>
						<button type="button" class="header-search-mobile__tab" role="tab" aria-selected="false" data-msm-tab="location"><?php esc_html_e( 'Location', 'excel-ent' ); ?></button>
						<button type="button" class="header-search-mobile__tab" role="tab" aria-selected="false" data-msm-tab="date"><?php esc_html_e( 'Date', 'excel-ent' ); ?></button>
						<button type="button" class="header-search-mobile__tab" role="tab" aria-selected="false" data-msm-tab="budget"><?php esc_html_e( 'Budget', 'excel-ent' ); ?></button>
					</div>

					<div class="header-search-mobile__tab-panels">
						<div class="header-search-mobile__occasion" data-msm-tab-panel="occasion" role="tabpanel">
							<div class="header-search-mobile__occasion-head">
								<p class="header-search-mobile__occasion-title"><?php esc_html_e( 'Browse by Occasion', 'excel-ent' ); ?></p>
								<a class="header-search-mobile__view-all" href="<?php echo esc_url( $excel_ent_explore_url ); ?>">
									<?php esc_html_e( 'View all', 'excel-ent' ); ?>
								</a>
							</div>

							<input
								type="hidden"
								name="occasion"
								value="<?php echo esc_attr( $excel_ent_occasion ); ?>"
								data-msm-occasion-input
								data-default-label="<?php esc_attr_e( 'Occasion', 'excel-ent' ); ?>"
							>

							<div class="header-search-mobile__accordion" data-msm-occasion-accordion>
								<?php
								$excel_ent_group_index = 0;
								foreach ( $excel_ent_category_groups as $excel_ent_group_key => $excel_ent_group ) :
									$excel_ent_group_open = ( 0 === $excel_ent_group_index );
									?>
									<div
										class="header-search-mobile__acc<?php echo $excel_ent_group_open ? ' is-open' : ''; ?>"
										data-msm-acc
									>
										<button
											type="button"
											class="header-search-mobile__acc-trigger"
											data-msm-acc-trigger
											aria-expanded="<?php echo $excel_ent_group_open ? 'true' : 'false'; ?>"
										>
											<span class="header-search-mobile__acc-label"><?php echo esc_html( $excel_ent_group['label'] ); ?></span>
											<span class="header-search-mobile__acc-icon" aria-hidden="true">
												<img
													class="header-search-mobile__acc-icon-add"
													src="<?php echo esc_url( $excel_ent_icons . '/add-large-fill.svg' ); ?>"
													alt=""
													width="18"
													height="18"
													decoding="async"
												>
												<img
													class="header-search-mobile__acc-icon-close"
													src="<?php echo esc_url( $excel_ent_icons . '/close-large-fill.svg' ); ?>"
													alt=""
													width="18"
													height="18"
													decoding="async"
												>
											</span>
										</button>
										<div
											class="header-search-mobile__acc-panel"
											data-msm-acc-panel
											<?php echo $excel_ent_group_open ? '' : ' hidden'; ?>
										>
											<ul class="header-search-mobile__checks">
												<?php foreach ( $excel_ent_group['tags'] as $excel_ent_tag_value => $excel_ent_tag_label ) : ?>
													<?php $excel_ent_tag_on = in_array( (string) $excel_ent_tag_value, $excel_ent_selected_occasions, true ); ?>
													<li>
														<button
															type="button"
															class="header-search-mobile__check<?php echo $excel_ent_tag_on ? ' is-checked' : ''; ?>"
															data-msm-occasion-check
															data-value="<?php echo esc_attr( $excel_ent_tag_value ); ?>"
															data-label="<?php echo esc_attr( $excel_ent_tag_label ); ?>"
															aria-pressed="<?php echo $excel_ent_tag_on ? 'true' : 'false'; ?>"
														>
															<img
																class="header-search-mobile__check-on"
																src="<?php echo esc_url( $excel_ent_icons . '/checkbox-checked.svg' ); ?>"
																alt=""
																width="16"
																height="16"
																decoding="async"
															>
															<img
																class="header-search-mobile__check-off"
																src="<?php echo esc_url( $excel_ent_icons . '/checkbox-empty.svg' ); ?>"
																alt=""
																width="16"
																height="16"
																decoding="async"
															>
															<span><?php echo esc_html( $excel_ent_tag_label ); ?></span>
														</button>
													</li>
												<?php endforeach; ?>
											</ul>
										</div>
									</div>
									<?php
									++$excel_ent_group_index;
								endforeach;
								?>
							</div>
						</div>

						<div class="header-search-mobile__simple-panel" data-msm-tab-panel="location" role="tabpanel" hidden>
							<input type="hidden" name="location" value="<?php echo esc_attr( $excel_ent_location ); ?>" data-msm-filter-input data-msm-key="location" data-default-label="<?php esc_attr_e( 'Location', 'excel-ent' ); ?>">
							<p class="header-search-mobile__simple-title"><?php esc_html_e( 'Select location', 'excel-ent' ); ?></p>
							<div class="header-search-mobile__simple-list">
								<?php foreach ( $excel_ent_location_options as $excel_ent_value => $excel_ent_label ) : ?>
									<button
										type="button"
										class="header-search-mobile__simple-option<?php echo ( (string) $excel_ent_location === (string) $excel_ent_value ) ? ' is-selected' : ''; ?>"
										data-msm-simple-option
										data-value="<?php echo esc_attr( $excel_ent_value ); ?>"
										data-label="<?php echo esc_attr( $excel_ent_label ); ?>"
									>
										<?php echo esc_html( $excel_ent_label ); ?>
									</button>
								<?php endforeach; ?>
							</div>
						</div>

						<div class="header-search-mobile__simple-panel" data-msm-tab-panel="date" role="tabpanel" hidden>
							<input type="hidden" name="event_date" value="<?php echo esc_attr( $excel_ent_event_date ); ?>" data-msm-filter-input data-msm-key="date" data-default-label="<?php esc_attr_e( 'Event Date', 'excel-ent' ); ?>">
							<p class="header-search-mobile__simple-title"><?php esc_html_e( 'Event Date', 'excel-ent' ); ?></p>
							<label class="header-search-mobile__date-field">
								<span class="screen-reader-text"><?php esc_html_e( 'Event Date', 'excel-ent' ); ?></span>
								<input
									class="header-search-mobile__date-input header-search-mobile__date-input--light"
									type="date"
									value="<?php echo esc_attr( $excel_ent_event_date ); ?>"
									data-msm-date-input
								>
							</label>
						</div>

						<div class="header-search-mobile__simple-panel" data-msm-tab-panel="budget" role="tabpanel" hidden>
							<input type="hidden" name="budget" value="<?php echo esc_attr( $excel_ent_budget ); ?>" data-msm-filter-input data-msm-key="budget" data-default-label="<?php esc_attr_e( 'Budget', 'excel-ent' ); ?>">
							<p class="header-search-mobile__simple-title"><?php esc_html_e( 'Select your desired budget', 'excel-ent' ); ?></p>
							<div class="header-search-mobile__simple-list">
								<?php foreach ( $excel_ent_budget_options as $excel_ent_value => $excel_ent_label ) : ?>
									<button
										type="button"
										class="header-search-mobile__simple-option<?php echo ( (string) $excel_ent_budget === (string) $excel_ent_value ) ? ' is-selected' : ''; ?>"
										data-msm-simple-option
										data-value="<?php echo esc_attr( $excel_ent_value ); ?>"
										data-label="<?php echo esc_attr( $excel_ent_label ); ?>"
									>
										<?php echo esc_html( $excel_ent_label ); ?>
									</button>
								<?php endforeach; ?>
							</div>
						</div>
					</div>
				</div>

				<div class="header-search-mobile__actions">
					<button type="button" class="header-search-mobile__clear" data-mobile-search-clear>
						<?php esc_html_e( 'Clear Filters', 'excel-ent' ); ?>
					</button>
					<button type="submit" class="header-search-mobile__search-btn">
						<?php esc_html_e( 'Search', 'excel-ent' ); ?>
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
