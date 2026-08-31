<?php
/**
 * Compact mobile search pill + overlay (Figma 1706:29064).
 *
 * @package Excel_Ent
 */

$excel_ent_icons        = EXCEL_ENT_URI . '/assets/images/search-mobile';
$excel_ent_legacy_icons = EXCEL_ENT_URI . '/assets/images/icons';

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

$excel_ent_budget_options = array(
	'under-500' => __( 'Under £500', 'excel-ent' ),
	'500-1000'  => __( '£500 - £1,000', 'excel-ent' ),
	'1000-2500' => __( '£1,000 - £2,500', 'excel-ent' ),
	'2500-5000' => __( '£2,500 - £5,000', 'excel-ent' ),
	'over-5000' => __( 'Over £5,000', 'excel-ent' ),
);

$excel_ent_category_groups = array(
	'artists-tributes'     => array(
		'label' => __( 'Artists & Tributes', 'excel-ent' ),
		'tags'  => array(
			'bands'           => __( 'Bands', 'excel-ent' ),
			'big-band'        => __( 'Big Band', 'excel-ent' ),
			'djs'             => __( "DJ's", 'excel-ent' ),
			'duo-tributes'    => __( 'Duo Tributes', 'excel-ent' ),
			'duos'            => __( 'Duos', 'excel-ent' ),
			'female-solo'     => __( 'Female Solo', 'excel-ent' ),
			'female-tributes' => __( 'Female Tributes', 'excel-ent' ),
			'male-solo'       => __( 'Male Solo', 'excel-ent' ),
			'male-tributes'   => __( 'Male Tributes', 'excel-ent' ),
			'tribute'         => __( 'Tribute', 'excel-ent' ),
			'celebrity-acts'  => __( 'Celebrity Act', 'excel-ent' ),
		),
	),
	'decades'              => array(
		'label' => __( 'Decades', 'excel-ent' ),
		'tags'  => array(
			'60s'  => __( "60's", 'excel-ent' ),
			'70s'  => __( "70's", 'excel-ent' ),
			'80s'  => __( "80's", 'excel-ent' ),
			'90s'  => __( "90's", 'excel-ent' ),
			'2000s' => __( "00's", 'excel-ent' ),
			'2010s' => __( "10's", 'excel-ent' ),
		),
	),
	'entertainment-events' => array(
		'label' => __( 'Entertainment & Events', 'excel-ent' ),
		'tags'  => array(
			'celebrity-acts'       => __( 'Celebrity Act', 'excel-ent' ),
			'comedy'               => __( 'Comedy', 'excel-ent' ),
			'corporate'            => __( 'Corporate', 'excel-ent' ),
			'wedding'              => __( 'Weddings', 'excel-ent' ),
			'shows'                => __( 'Shows', 'excel-ent' ),
			'magicians-hypnotists' => __( 'Magicians & Hypnotists', 'excel-ent' ),
		),
	),
	'genres-music'         => array(
		'label' => __( 'Music Genre', 'excel-ent' ),
		'tags'  => array(
			'pop'    => __( 'Pop', 'excel-ent' ),
			'rock'   => __( 'Rock', 'excel-ent' ),
			'soul'   => __( 'Soul', 'excel-ent' ),
			'jazz'   => __( 'Jazz', 'excel-ent' ),
			'dance'  => __( 'Dance', 'excel-ent' ),
			'covers' => __( 'Covers', 'excel-ent' ),
		),
	),
);

$excel_ent_artist_avatar  = $excel_ent_legacy_icons . '/artist-search-avatar.jpg';
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
);

$excel_ent_tag_labels = array();
foreach ( $excel_ent_category_groups as $excel_ent_group ) {
	foreach ( $excel_ent_group['tags'] as $excel_ent_tag_value => $excel_ent_tag_label ) {
		$excel_ent_tag_labels[ $excel_ent_tag_value ] = $excel_ent_tag_label;
	}
}

$excel_ent_occasion_meta = __( 'Any categories', 'excel-ent' );
$excel_ent_occasion_filled = false;
if ( $excel_ent_selected_occasions ) {
	$excel_ent_occasion_names = array();
	foreach ( $excel_ent_selected_occasions as $excel_ent_selected_tag ) {
		if ( isset( $excel_ent_tag_labels[ $excel_ent_selected_tag ] ) ) {
			$excel_ent_occasion_names[] = $excel_ent_tag_labels[ $excel_ent_selected_tag ];
		}
	}
	if ( $excel_ent_occasion_names ) {
		$excel_ent_occasion_meta   = implode( ', ', $excel_ent_occasion_names );
		$excel_ent_occasion_filled = true;
	}
}

$excel_ent_date_meta   = __( 'Select event date', 'excel-ent' );
$excel_ent_date_filled = false;
if ( $excel_ent_event_date && preg_match( '/^\d{4}-\d{2}-\d{2}$/', $excel_ent_event_date ) ) {
	$excel_ent_date_ts = strtotime( $excel_ent_event_date );
	if ( $excel_ent_date_ts ) {
		$excel_ent_date_meta   = wp_date( 'd/m/Y', $excel_ent_date_ts );
		$excel_ent_date_filled = true;
	}
}

$excel_ent_budget_meta   = __( 'Select budget', 'excel-ent' );
$excel_ent_budget_filled = false;
if ( isset( $excel_ent_budget_options[ $excel_ent_budget ] ) ) {
	$excel_ent_budget_meta   = $excel_ent_budget_options[ $excel_ent_budget ];
	$excel_ent_budget_filled = true;
}

$excel_ent_location_meta   = __( 'Add Post Code', 'excel-ent' );
$excel_ent_location_filled = false;
if ( $excel_ent_location ) {
	$excel_ent_location_meta   = $excel_ent_location;
	$excel_ent_location_filled = true;
}

$excel_ent_artist_meta   = __( 'Artists, Djs, Bands...', 'excel-ent' );
$excel_ent_artist_filled = false;
if ( $excel_ent_artist_q ) {
	$excel_ent_artist_meta   = $excel_ent_artist_q;
	$excel_ent_artist_filled = true;
}

$excel_ent_trigger_has_filters = (
	$excel_ent_artist_filled
	|| $excel_ent_occasion_filled
	|| $excel_ent_location_filled
	|| $excel_ent_date_filled
	|| $excel_ent_budget_filled
);
?>
<div class="header-search-mobile" data-mobile-search>
	<button
		type="button"
		class="header-search-mobile__trigger<?php echo $excel_ent_trigger_has_filters ? ' has-filters' : ''; ?>"
		data-mobile-search-open
		aria-expanded="false"
		aria-controls="header-search-mobile-panel"
	>
		<span class="header-search-mobile__copy">
		<span class="header-search-mobile__title"><?php esc_html_e( 'START YOUR SEARCH', 'excel-ent' ); ?></span>
		<span class="header-search-mobile__hint header-search-mobile__hint--default" data-msm-trigger-hint-default<?php echo $excel_ent_trigger_has_filters ? ' hidden' : ''; ?>><?php esc_html_e( 'Search Artist . Categories . Location . Event Date . Budget', 'excel-ent' ); ?></span>
			<span class="header-search-mobile__hint-filters" data-msm-trigger-hints<?php echo $excel_ent_trigger_has_filters ? '' : ' hidden'; ?>>
				<span class="header-search-mobile__hint-filter<?php echo $excel_ent_artist_filled ? ' is-active' : ''; ?>" data-msm-trigger-filter="artist"><?php esc_html_e( 'Search Artist', 'excel-ent' ); ?></span><span class="header-search-mobile__hint-sep<?php echo ( $excel_ent_artist_filled || $excel_ent_occasion_filled ) ? ' is-active' : ''; ?>" data-msm-trigger-sep data-after="artist" data-before="categories"> . </span><span class="header-search-mobile__hint-filter<?php echo $excel_ent_occasion_filled ? ' is-active' : ''; ?>" data-msm-trigger-filter="categories"><?php esc_html_e( 'Categories', 'excel-ent' ); ?></span><span class="header-search-mobile__hint-sep<?php echo ( $excel_ent_occasion_filled || $excel_ent_location_filled ) ? ' is-active' : ''; ?>" data-msm-trigger-sep data-after="categories" data-before="location"> . </span><span class="header-search-mobile__hint-filter<?php echo $excel_ent_location_filled ? ' is-active' : ''; ?>" data-msm-trigger-filter="location"><?php esc_html_e( 'Location', 'excel-ent' ); ?></span><span class="header-search-mobile__hint-sep<?php echo ( $excel_ent_location_filled || $excel_ent_date_filled ) ? ' is-active' : ''; ?>" data-msm-trigger-sep data-after="location" data-before="date"> . </span><span class="header-search-mobile__hint-filter<?php echo $excel_ent_date_filled ? ' is-active' : ''; ?>" data-msm-trigger-filter="date"><?php esc_html_e( 'Event Date', 'excel-ent' ); ?></span><span class="header-search-mobile__hint-sep<?php echo ( $excel_ent_date_filled || $excel_ent_budget_filled ) ? ' is-active' : ''; ?>" data-msm-trigger-sep data-after="date" data-before="budget"> . </span><span class="header-search-mobile__hint-filter<?php echo $excel_ent_budget_filled ? ' is-active' : ''; ?>" data-msm-trigger-filter="budget"><?php esc_html_e( 'Budget', 'excel-ent' ); ?></span>
			</span>
		</span>
		<span class="header-search-mobile__trigger-btn" aria-hidden="true">
			<img
				src="<?php echo esc_url( $excel_ent_legacy_icons . '/search-line-white.svg' ); ?>"
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
				<div class="header-search-mobile__top">
					<button type="button" class="header-search-mobile__clear" data-mobile-search-clear>
						<img src="<?php echo esc_url( $excel_ent_icons . '/close-line.svg' ); ?>" alt="" width="12" height="12" decoding="async">
						<img class="header-search-mobile__clear-icon-white" src="<?php echo esc_url( $excel_ent_icons . '/close-line-white.svg' ); ?>" alt="" width="12" height="12" decoding="async">
						<span><?php esc_html_e( 'Clear all Filters', 'excel-ent' ); ?></span>
					</button>
					<button
						type="button"
						class="header-search-mobile__close"
						data-mobile-search-close
						aria-label="<?php esc_attr_e( 'Close search', 'excel-ent' ); ?>"
					>
						<img src="<?php echo esc_url( $excel_ent_icons . '/close-large-line.svg' ); ?>" alt="" width="18" height="18" decoding="async">
					</button>
				</div>

				<div class="header-search-mobile__cards">
					<article
						class="header-search-mobile__card<?php echo $excel_ent_artist_filled ? ' is-filled' : ''; ?>"
						data-msm-card="artist"
					>
						<button type="button" class="header-search-mobile__card-summary" data-msm-card-toggle aria-expanded="false">
							<img class="header-search-mobile__card-icon header-search-mobile__card-icon--lg" src="<?php echo esc_url( $excel_ent_icons . '/search-eye-line.svg' ); ?>" alt="" width="28" height="28" decoding="async">
							<img class="header-search-mobile__card-icon header-search-mobile__card-icon--sm" src="<?php echo esc_url( $excel_ent_icons . '/search-eye-line-sm.svg' ); ?>" alt="" width="20" height="20" decoding="async">
							<span class="header-search-mobile__card-copy">
								<span class="header-search-mobile__card-title"><?php esc_html_e( 'Search Artist', 'excel-ent' ); ?></span>
								<span class="header-search-mobile__card-meta" data-msm-summary-meta data-placeholder="<?php esc_attr_e( 'Artists, Djs, Bands...', 'excel-ent' ); ?>"><?php echo esc_html( $excel_ent_artist_meta ); ?></span>
							</span>
						</button>
						<div class="header-search-mobile__card-panel" data-msm-panel hidden>
							<button type="button" class="header-search-mobile__card-head" data-msm-card-collapse aria-label="<?php esc_attr_e( 'Close Search Artist', 'excel-ent' ); ?>">
								<img src="<?php echo esc_url( $excel_ent_icons . '/search-eye-line-sm.svg' ); ?>" alt="" width="20" height="20" decoding="async">
								<span><?php esc_html_e( 'Search Artist', 'excel-ent' ); ?></span>
							</button>
							<div class="header-search-mobile__artist-box" data-msm-artist>
								<label class="header-search-mobile__artist-field">
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
													<img class="header-search-mobile__avatar" src="<?php echo esc_url( $excel_ent_artist['avatar'] ); ?>" alt="" width="40" height="40" decoding="async">
													<span class="header-search-mobile__result-name"><?php echo esc_html( $excel_ent_artist['label'] ); ?></span>
												</span>
												<img class="header-search-mobile__chevron" src="<?php echo esc_url( $excel_ent_icons . '/chevron-right.svg' ); ?>" alt="" width="20" height="20" decoding="async">
											</button>
										</li>
									<?php endforeach; ?>
								</ul>
								<p class="header-search-mobile__empty" data-msm-artist-empty hidden>
									<?php esc_html_e( 'No artists found', 'excel-ent' ); ?>
								</p>
							</div>
						</div>
					</article>

					<article
						class="header-search-mobile__card<?php echo $excel_ent_occasion_filled ? ' is-filled' : ''; ?>"
						data-msm-card="categories"
					>
						<button type="button" class="header-search-mobile__card-summary" data-msm-card-toggle aria-expanded="false">
							<img class="header-search-mobile__card-icon header-search-mobile__card-icon--lg" src="<?php echo esc_url( $excel_ent_icons . '/browse-categories.svg' ); ?>" alt="" width="28" height="28" decoding="async">
							<img class="header-search-mobile__card-icon header-search-mobile__card-icon--sm" src="<?php echo esc_url( $excel_ent_icons . '/browse-categories.svg' ); ?>" alt="" width="18" height="18" decoding="async">
							<span class="header-search-mobile__card-copy">
								<span class="header-search-mobile__card-title"><?php esc_html_e( 'Browse Categories', 'excel-ent' ); ?></span>
								<span class="header-search-mobile__card-meta" data-msm-summary-meta data-placeholder="<?php esc_attr_e( 'Any categories', 'excel-ent' ); ?>"><?php echo esc_html( $excel_ent_occasion_meta ); ?></span>
							</span>
						</button>
						<div class="header-search-mobile__card-panel" data-msm-panel hidden>
							<button type="button" class="header-search-mobile__card-head" data-msm-card-collapse aria-label="<?php esc_attr_e( 'Close Browse Categories', 'excel-ent' ); ?>">
								<img src="<?php echo esc_url( $excel_ent_icons . '/browse-categories.svg' ); ?>" alt="" width="18" height="18" decoding="async">
								<span><?php esc_html_e( 'Browse Categories', 'excel-ent' ); ?></span>
							</button>
							<input type="hidden" name="occasion" value="<?php echo esc_attr( $excel_ent_occasion ); ?>" data-msm-occasion-input>
							<div class="header-search-mobile__cat-tabs" role="tablist" aria-label="<?php esc_attr_e( 'Category groups', 'excel-ent' ); ?>">
								<?php
								$excel_ent_group_index = 0;
								foreach ( $excel_ent_category_groups as $excel_ent_group_key => $excel_ent_group ) :
									?>
									<button
										type="button"
										class="header-search-mobile__cat-tab<?php echo 0 === $excel_ent_group_index ? ' is-active' : ''; ?>"
										role="tab"
										aria-selected="<?php echo 0 === $excel_ent_group_index ? 'true' : 'false'; ?>"
										data-msm-cat-tab="<?php echo esc_attr( $excel_ent_group_key ); ?>"
									>
										<?php echo esc_html( $excel_ent_group['label'] ); ?>
									</button>
									<?php
									++$excel_ent_group_index;
								endforeach;
								?>
							</div>
							<div class="header-search-mobile__cat-box">
								<?php
								$excel_ent_group_index = 0;
								foreach ( $excel_ent_category_groups as $excel_ent_group_key => $excel_ent_group ) :
									?>
									<ul
										class="header-search-mobile__checks"
										data-msm-cat-panel="<?php echo esc_attr( $excel_ent_group_key ); ?>"
										<?php echo 0 === $excel_ent_group_index ? '' : ' hidden'; ?>
									>
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
													<img class="header-search-mobile__check-on" src="<?php echo esc_url( $excel_ent_icons . '/checkbox-fill.svg' ); ?>" alt="" width="16" height="16" decoding="async">
													<span class="header-search-mobile__check-off" aria-hidden="true"></span>
													<span><?php echo esc_html( $excel_ent_tag_label ); ?></span>
												</button>
											</li>
										<?php endforeach; ?>
									</ul>
									<?php
									++$excel_ent_group_index;
								endforeach;
								?>
							</div>
							<button type="button" class="header-search-mobile__confirm-outline" data-msm-confirm="categories">
								<?php esc_html_e( 'Confirm Selection', 'excel-ent' ); ?>
							</button>
						</div>
					</article>

					<article
						class="header-search-mobile__card<?php echo $excel_ent_location_filled ? ' is-filled' : ''; ?>"
						data-msm-card="location"
					>
						<button type="button" class="header-search-mobile__card-summary" data-msm-card-toggle aria-expanded="false">
							<img class="header-search-mobile__card-icon header-search-mobile__card-icon--lg" src="<?php echo esc_url( $excel_ent_icons . '/map-pin-fill.svg' ); ?>" alt="" width="28" height="28" decoding="async">
							<img class="header-search-mobile__card-icon header-search-mobile__card-icon--sm" src="<?php echo esc_url( $excel_ent_icons . '/map-pin-fill.svg' ); ?>" alt="" width="18" height="18" decoding="async">
							<span class="header-search-mobile__card-copy">
								<span class="header-search-mobile__card-title"><?php esc_html_e( 'Location', 'excel-ent' ); ?></span>
								<span class="header-search-mobile__card-meta" data-msm-summary-meta data-placeholder="<?php esc_attr_e( 'Add Post Code', 'excel-ent' ); ?>"><?php echo esc_html( $excel_ent_location_meta ); ?></span>
							</span>
						</button>
						<div class="header-search-mobile__card-panel" data-msm-panel hidden>
							<button type="button" class="header-search-mobile__card-head" data-msm-card-collapse aria-label="<?php esc_attr_e( 'Close Location', 'excel-ent' ); ?>">
								<img src="<?php echo esc_url( $excel_ent_icons . '/map-pin-fill.svg' ); ?>" alt="" width="18" height="18" decoding="async">
								<span><?php esc_html_e( 'Location', 'excel-ent' ); ?></span>
							</button>
							<div class="header-search-mobile__postcode">
								<p class="header-search-mobile__postcode-title"><?php esc_html_e( 'Enter your post code', 'excel-ent' ); ?></p>
								<label class="header-search-mobile__postcode-field">
									<img src="<?php echo esc_url( $excel_ent_icons . '/map-pin.svg' ); ?>" alt="" width="16" height="16" decoding="async">
									<span class="screen-reader-text"><?php esc_html_e( 'Post code', 'excel-ent' ); ?></span>
									<input
										class="header-search-mobile__postcode-input"
										type="text"
										name="location"
										value="<?php echo esc_attr( $excel_ent_location ); ?>"
										placeholder="<?php esc_attr_e( 'E.g. SW1A 1AA', 'excel-ent' ); ?>"
										data-msm-location-input
										autocomplete="postal-code"
									>
								</label>
								<button type="button" class="header-search-mobile__confirm-fill" data-msm-confirm="location">
									<?php esc_html_e( 'Confirm Post Code', 'excel-ent' ); ?>
								</button>
							</div>
						</div>
					</article>

					<article
						class="header-search-mobile__card<?php echo $excel_ent_date_filled ? ' is-filled' : ''; ?>"
						data-msm-card="date"
					>
						<button type="button" class="header-search-mobile__card-summary" data-msm-card-toggle aria-expanded="false">
							<img class="header-search-mobile__card-icon header-search-mobile__card-icon--lg" src="<?php echo esc_url( $excel_ent_icons . '/calendar-fill.svg' ); ?>" alt="" width="28" height="28" decoding="async">
							<img class="header-search-mobile__card-icon header-search-mobile__card-icon--sm" src="<?php echo esc_url( $excel_ent_icons . '/calendar-fill.svg' ); ?>" alt="" width="18" height="18" decoding="async">
							<span class="header-search-mobile__card-copy">
								<span class="header-search-mobile__card-title"><?php esc_html_e( 'Event Date', 'excel-ent' ); ?></span>
								<span class="header-search-mobile__card-meta" data-msm-summary-meta data-placeholder="<?php esc_attr_e( 'Select event date', 'excel-ent' ); ?>"><?php echo esc_html( $excel_ent_date_meta ); ?></span>
							</span>
						</button>
						<div class="header-search-mobile__card-panel" data-msm-panel hidden>
							<button type="button" class="header-search-mobile__card-head" data-msm-card-collapse aria-label="<?php esc_attr_e( 'Close Event Date', 'excel-ent' ); ?>">
								<img src="<?php echo esc_url( $excel_ent_icons . '/calendar-fill.svg' ); ?>" alt="" width="18" height="18" decoding="async">
								<span><?php esc_html_e( 'Event Date', 'excel-ent' ); ?></span>
							</button>
							<input type="hidden" name="event_date" value="<?php echo esc_attr( $excel_ent_event_date ); ?>" data-msm-date-input>
							<div class="header-search-mobile__cal" data-msm-calendar>
								<div class="header-search-mobile__cal-header">
									<p class="header-search-mobile__cal-month" data-msm-cal-month></p>
									<div class="header-search-mobile__cal-navs">
										<button type="button" class="header-search-mobile__cal-btn" data-msm-cal-prev aria-label="<?php esc_attr_e( 'Previous month', 'excel-ent' ); ?>">
											<img src="<?php echo esc_url( $excel_ent_icons . '/chevron-left.svg' ); ?>" alt="" width="14" height="14" decoding="async">
										</button>
										<button type="button" class="header-search-mobile__cal-btn" data-msm-cal-next aria-label="<?php esc_attr_e( 'Next month', 'excel-ent' ); ?>">
											<img src="<?php echo esc_url( $excel_ent_icons . '/chevron-right-cal.svg' ); ?>" alt="" width="14" height="14" decoding="async">
										</button>
									</div>
								</div>
								<div class="header-search-mobile__cal-weekdays" aria-hidden="true">
									<span><?php esc_html_e( 'Su', 'excel-ent' ); ?></span>
									<span><?php esc_html_e( 'Mo', 'excel-ent' ); ?></span>
									<span><?php esc_html_e( 'Tu', 'excel-ent' ); ?></span>
									<span><?php esc_html_e( 'We', 'excel-ent' ); ?></span>
									<span><?php esc_html_e( 'Th', 'excel-ent' ); ?></span>
									<span><?php esc_html_e( 'Fr', 'excel-ent' ); ?></span>
									<span><?php esc_html_e( 'Sa', 'excel-ent' ); ?></span>
								</div>
								<div class="header-search-mobile__cal-grid" data-msm-cal-grid role="grid" aria-label="<?php esc_attr_e( 'Calendar', 'excel-ent' ); ?>"></div>
								<button type="button" class="header-search-mobile__confirm-fill" data-msm-confirm="date">
									<?php esc_html_e( 'Select Date', 'excel-ent' ); ?>
								</button>
							</div>
						</div>
					</article>

					<article
						class="header-search-mobile__card<?php echo $excel_ent_budget_filled ? ' is-filled' : ''; ?>"
						data-msm-card="budget"
					>
						<button type="button" class="header-search-mobile__card-summary" data-msm-card-toggle aria-expanded="false">
							<img class="header-search-mobile__card-icon header-search-mobile__card-icon--lg" src="<?php echo esc_url( $excel_ent_icons . '/money-pound-circle-fill.svg' ); ?>" alt="" width="28" height="28" decoding="async">
							<img class="header-search-mobile__card-icon header-search-mobile__card-icon--sm" src="<?php echo esc_url( $excel_ent_icons . '/money-pound-circle-fill.svg' ); ?>" alt="" width="18" height="18" decoding="async">
							<span class="header-search-mobile__card-copy">
								<span class="header-search-mobile__card-title"><?php esc_html_e( 'Budget', 'excel-ent' ); ?></span>
								<span class="header-search-mobile__card-meta" data-msm-summary-meta data-placeholder="<?php esc_attr_e( 'Select budget', 'excel-ent' ); ?>"><?php echo esc_html( $excel_ent_budget_meta ); ?></span>
							</span>
						</button>
						<div class="header-search-mobile__card-panel" data-msm-panel hidden>
							<button type="button" class="header-search-mobile__card-head" data-msm-card-collapse aria-label="<?php esc_attr_e( 'Close Budget', 'excel-ent' ); ?>">
								<img src="<?php echo esc_url( $excel_ent_icons . '/money-pound-circle-fill.svg' ); ?>" alt="" width="18" height="18" decoding="async">
								<span><?php esc_html_e( 'Budget', 'excel-ent' ); ?></span>
							</button>
							<input type="hidden" name="budget" value="<?php echo esc_attr( $excel_ent_budget ); ?>" data-msm-budget-input>
							<div class="header-search-mobile__budget">
								<p class="header-search-mobile__budget-title"><?php esc_html_e( 'Select your budget', 'excel-ent' ); ?></p>
								<div class="header-search-mobile__budget-list">
									<?php foreach ( $excel_ent_budget_options as $excel_ent_value => $excel_ent_label ) : ?>
										<button
											type="button"
											class="header-search-mobile__budget-option<?php echo ( (string) $excel_ent_budget === (string) $excel_ent_value ) ? ' is-selected' : ''; ?>"
											data-msm-budget-option
											data-value="<?php echo esc_attr( $excel_ent_value ); ?>"
											data-label="<?php echo esc_attr( $excel_ent_label ); ?>"
										>
											<span><?php echo esc_html( $excel_ent_label ); ?></span>
											<img class="header-search-mobile__budget-arrow" src="<?php echo esc_url( $excel_ent_icons . '/arrow-right-fill.svg' ); ?>" alt="" width="18" height="18" decoding="async">
											<img class="header-search-mobile__budget-arrow-on" src="<?php echo esc_url( $excel_ent_icons . '/arrow-right-fill-white.svg' ); ?>" alt="" width="18" height="18" decoding="async">
										</button>
									<?php endforeach; ?>
								</div>
							</div>
						</div>
					</article>
				</div>

				<button type="submit" class="header-search-mobile__search-btn">
					<?php esc_html_e( 'Search', 'excel-ent' ); ?>
				</button>
			</form>
		</div>
	</div>
</div>
