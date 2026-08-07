<?php
/**
 * Header search / filter bar (desktop).
 *
 * @package Excel_Ent
 */

$excel_ent_occasion   = isset( $_GET['occasion'] ) ? sanitize_text_field( wp_unslash( $_GET['occasion'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$excel_ent_location   = isset( $_GET['location'] ) ? sanitize_text_field( wp_unslash( $_GET['location'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$excel_ent_event_date = isset( $_GET['event_date'] ) ? sanitize_text_field( wp_unslash( $_GET['event_date'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$excel_ent_budget     = isset( $_GET['budget'] ) ? sanitize_text_field( wp_unslash( $_GET['budget'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

$excel_ent_budget_options = array(
	'under-500'  => __( 'Under £500', 'excel-ent' ),
	'500-1000'   => __( '£500 - £1,000', 'excel-ent' ),
	'1000-2500'  => __( '£1,000 - £2,500', 'excel-ent' ),
	'2500-5000'  => __( '£2,500 - £5,000', 'excel-ent' ),
	'over-5000'  => __( 'Over £5,000', 'excel-ent' ),
);

$excel_ent_location_options = array(
	'london'     => array(
		'label'  => __( 'London', 'excel-ent' ),
		'region' => __( 'Greater London, UK', 'excel-ent' ),
	),
	'manchester' => array(
		'label'  => __( 'Manchester', 'excel-ent' ),
		'region' => __( 'North West, UK', 'excel-ent' ),
	),
	'birmingham' => array(
		'label'  => __( 'Birmingham', 'excel-ent' ),
		'region' => __( 'West Midlands, UK', 'excel-ent' ),
	),
	'edinburgh'  => array(
		'label'  => __( 'Edinburgh', 'excel-ent' ),
		'region' => __( 'Lothian, Scotland', 'excel-ent' ),
	),
	'bristol'    => array(
		'label'  => __( 'Bristol', 'excel-ent' ),
		'region' => __( 'South West, UK', 'excel-ent' ),
	),
);

/* Figma 1179:77179 — Browse Categories groups + tags */
$excel_ent_category_groups = array(
	'artist-type' => array(
		'label' => __( 'Artist Type', 'excel-ent' ),
		'tags'  => array(
			'male-solo'             => __( 'Male Solo', 'excel-ent' ),
			'female-solo'           => __( 'Female Solo', 'excel-ent' ),
			'duos'                  => __( 'Duos', 'excel-ent' ),
			'bands'                 => __( 'Bands', 'excel-ent' ),
			'djs'                   => __( "DJ's", 'excel-ent' ),
			'celebrity-acts'        => __( 'Celebrity Acts', 'excel-ent' ),
			'professional-dancers'  => __( 'Professional Dancers', 'excel-ent' ),
			'magicians-hypnotists'  => __( 'Magicians & Hypnotists', 'excel-ent' ),
			'shows'                 => __( 'Shows', 'excel-ent' ),
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

$excel_ent_budget_label = isset( $excel_ent_budget_options[ $excel_ent_budget ] )
	? $excel_ent_budget_options[ $excel_ent_budget ]
	: __( 'Budget', 'excel-ent' );

$excel_ent_location_label = isset( $excel_ent_location_options[ $excel_ent_location ] )
	? $excel_ent_location_options[ $excel_ent_location ]['label']
	: __( 'Location', 'excel-ent' );

$excel_ent_category_label  = __( 'Browse Categories', 'excel-ent' );
$excel_ent_category_group  = 'artist-type';
$excel_ent_category_tag    = '';
foreach ( $excel_ent_category_groups as $excel_ent_group_key => $excel_ent_group ) {
	if ( isset( $excel_ent_group['tags'][ $excel_ent_occasion ] ) ) {
		$excel_ent_category_group = $excel_ent_group_key;
		$excel_ent_category_tag   = $excel_ent_occasion;
		$excel_ent_category_label = $excel_ent_group['tags'][ $excel_ent_occasion ];
		break;
	}
}

$excel_ent_artist_query = get_search_query();
$excel_ent_artist_label = $excel_ent_artist_query
	? $excel_ent_artist_query
	: __( 'Search Artist', 'excel-ent' );

$excel_ent_artist_avatar = EXCEL_ENT_URI . '/assets/images/icons/artist-search-avatar.jpg';
$excel_ent_artist_results = array(
	array(
		'id'     => 'andy-elton',
		'label'  => __( 'Andy Crosbie as Elton John', 'excel-ent' ),
		'avatar' => $excel_ent_artist_avatar,
	),
	array(
		'id'     => 'darin-day',
		'label'  => __( 'Darin Day Live Band', 'excel-ent' ),
		'avatar' => $excel_ent_artist_avatar,
	),
	array(
		'id'     => 'soulful',
		'label'  => __( 'Soulful Nights Duo', 'excel-ent' ),
		'avatar' => $excel_ent_artist_avatar,
	),
	array(
		'id'     => 'midnight-dj',
		'label'  => __( 'Midnight Groove DJ', 'excel-ent' ),
		'avatar' => $excel_ent_artist_avatar,
	),
	array(
		'id'     => 'wedding-coll',
		'label'  => __( 'The Wedding Collective', 'excel-ent' ),
		'avatar' => $excel_ent_artist_avatar,
	),
);

$excel_ent_date_label = __( 'Event Date', 'excel-ent' );
if ( $excel_ent_event_date && preg_match( '/^\d{4}-\d{2}-\d{2}$/', $excel_ent_event_date ) ) {
	$excel_ent_date_ts = strtotime( $excel_ent_event_date );
	if ( $excel_ent_date_ts ) {
		$excel_ent_date_label = wp_date( 'j M Y', $excel_ent_date_ts );
	}
}
?>
<form class="header-search" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<div class="header-search__field header-search__field--artist" data-header-artist>
		<button
			type="button"
			class="header-search__artist-trigger"
			data-header-artist-trigger
			aria-expanded="false"
			aria-haspopup="dialog"
			aria-controls="header-artist-panel"
		>
			<img
				class="header-search__icon"
				src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/search-eye-line.svg' ); ?>"
				alt=""
				width="24"
				height="24"
				decoding="async"
			>
			<span class="header-search__label">
				<span class="header-search__title" data-header-artist-label><?php echo esc_html( $excel_ent_artist_label ); ?></span>
			</span>
		</button>
		<input
			id="header-search-query"
			class="header-search__input screen-reader-text"
			type="hidden"
			name="s"
			value="<?php echo esc_attr( $excel_ent_artist_query ); ?>"
			data-header-artist-input
		>
		<div
			id="header-artist-panel"
			class="header-artist"
			data-header-artist-panel
			role="dialog"
			aria-label="<?php esc_attr_e( 'Search artist', 'excel-ent' ); ?>"
			hidden
		>
			<label class="header-artist__search">
				<img
					class="header-artist__search-icon"
					src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/search-muted.svg' ); ?>"
					alt=""
					width="20"
					height="20"
					decoding="async"
				>
				<span class="screen-reader-text"><?php esc_html_e( 'Search for an artist', 'excel-ent' ); ?></span>
				<input
					class="header-artist__search-input"
					type="search"
					placeholder="<?php esc_attr_e( 'Search artist...', 'excel-ent' ); ?>"
					value="<?php echo esc_attr( $excel_ent_artist_query ); ?>"
					data-header-artist-search
					autocomplete="off"
				>
			</label>
			<ul class="header-artist__list" role="listbox" aria-label="<?php esc_attr_e( 'Artist results', 'excel-ent' ); ?>">
				<?php foreach ( $excel_ent_artist_results as $excel_ent_artist ) : ?>
					<li class="header-artist__item" role="none" data-header-artist-item>
						<button
							type="button"
							class="header-artist__option"
							role="option"
							data-header-artist-option
							data-value="<?php echo esc_attr( $excel_ent_artist['label'] ); ?>"
							data-search="<?php echo esc_attr( strtolower( $excel_ent_artist['label'] ) ); ?>"
						>
							<span class="header-artist__left">
								<img
									class="header-artist__avatar"
									src="<?php echo esc_url( $excel_ent_artist['avatar'] ); ?>"
									alt=""
									width="56"
									height="56"
									decoding="async"
								>
								<span class="header-artist__name"><?php echo esc_html( $excel_ent_artist['label'] ); ?></span>
							</span>
							<img
								class="header-artist__chevron"
								src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/chevron-right-sm.svg' ); ?>"
								alt=""
								width="20"
								height="20"
								decoding="async"
							>
						</button>
					</li>
				<?php endforeach; ?>
			</ul>
			<p class="header-artist__empty" data-header-artist-empty hidden>
				<?php esc_html_e( 'No artists found', 'excel-ent' ); ?>
			</p>
		</div>
	</div>

	<div class="header-search__field header-search__field--categories" data-header-categories>
		<button
			type="button"
			class="header-search__categories-trigger"
			data-header-categories-trigger
			aria-expanded="false"
			aria-haspopup="dialog"
			aria-controls="header-categories-panel"
		>
			<img
				class="header-search__icon"
				src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/browse-categories.svg' ); ?>"
				alt=""
				width="24"
				height="24"
				decoding="async"
			>
			<span class="header-search__label">
				<span class="header-search__title" data-header-categories-label><?php echo esc_html( $excel_ent_category_label ); ?></span>
			</span>
		</button>
		<input
			id="header-search-occasion"
			class="header-search__input screen-reader-text"
			type="hidden"
			name="occasion"
			value="<?php echo esc_attr( $excel_ent_occasion ); ?>"
			data-header-categories-input
		>
		<div
			id="header-categories-panel"
			class="header-categories"
			data-header-categories-panel
			role="dialog"
			aria-label="<?php esc_attr_e( 'Browse Categories', 'excel-ent' ); ?>"
			hidden
		>
			<div class="header-categories__header">
				<p class="header-categories__title"><?php esc_html_e( 'Browse Categories', 'excel-ent' ); ?></p>
			</div>
			<div class="header-categories__body">
				<ul class="header-categories__nav" role="tablist" aria-label="<?php esc_attr_e( 'Category groups', 'excel-ent' ); ?>">
					<?php foreach ( $excel_ent_category_groups as $excel_ent_group_key => $excel_ent_group ) : ?>
						<?php $excel_ent_group_active = ( (string) $excel_ent_group_key === (string) $excel_ent_category_group ); ?>
						<li class="header-categories__nav-item" role="none">
							<button
								type="button"
								class="header-categories__nav-btn<?php echo $excel_ent_group_active ? ' is-active' : ''; ?>"
								role="tab"
								aria-selected="<?php echo $excel_ent_group_active ? 'true' : 'false'; ?>"
								data-header-categories-group
								data-group="<?php echo esc_attr( $excel_ent_group_key ); ?>"
							>
								<span class="header-categories__nav-label"><?php echo esc_html( $excel_ent_group['label'] ); ?></span>
								<img
									class="header-categories__nav-arrow header-categories__nav-arrow--dark"
									src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/arrow-right-fill.svg' ); ?>"
									alt=""
									width="24"
									height="24"
									decoding="async"
								>
								<img
									class="header-categories__nav-arrow header-categories__nav-arrow--light"
									src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/arrow-right-fill-white.svg' ); ?>"
									alt=""
									width="24"
									height="24"
									decoding="async"
								>
							</button>
						</li>
					<?php endforeach; ?>
				</ul>

				<div class="header-categories__panels">
					<?php foreach ( $excel_ent_category_groups as $excel_ent_group_key => $excel_ent_group ) : ?>
						<?php $excel_ent_group_active = ( (string) $excel_ent_group_key === (string) $excel_ent_category_group ); ?>
						<div
							class="header-categories__panel<?php echo $excel_ent_group_active ? ' is-active' : ''; ?>"
							data-header-categories-panel-group="<?php echo esc_attr( $excel_ent_group_key ); ?>"
							role="tabpanel"
							<?php echo $excel_ent_group_active ? '' : 'hidden'; ?>
						>
							<div class="header-categories__divider">
								<p class="header-categories__divider-label"><?php echo esc_html( $excel_ent_group['label'] ); ?></p>
								<span class="header-categories__divider-line" aria-hidden="true"></span>
							</div>
							<div class="header-categories__tags" role="listbox" aria-label="<?php echo esc_attr( $excel_ent_group['label'] ); ?>">
								<?php foreach ( $excel_ent_group['tags'] as $excel_ent_tag_value => $excel_ent_tag_label ) : ?>
									<?php $excel_ent_tag_selected = ( (string) $excel_ent_category_tag === (string) $excel_ent_tag_value ); ?>
									<button
										type="button"
										class="header-categories__tag<?php echo $excel_ent_tag_selected ? ' is-selected' : ''; ?>"
										role="option"
										aria-selected="<?php echo $excel_ent_tag_selected ? 'true' : 'false'; ?>"
										data-header-categories-tag
										data-value="<?php echo esc_attr( $excel_ent_tag_value ); ?>"
										data-label="<?php echo esc_attr( $excel_ent_tag_label ); ?>"
									>
										<?php echo esc_html( $excel_ent_tag_label ); ?>
									</button>
								<?php endforeach; ?>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>

	<div class="header-search__field header-search__field--location" data-header-location>
		<button
			type="button"
			class="header-search__location-trigger"
			data-header-location-trigger
			aria-expanded="false"
			aria-haspopup="dialog"
			aria-controls="header-location-panel"
		>
			<img
				class="header-search__icon"
				src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/map-pin-fill.svg' ); ?>"
				alt=""
				width="24"
				height="24"
				decoding="async"
			>
			<span class="header-search__label">
				<span class="header-search__title" data-header-location-label><?php echo esc_html( $excel_ent_location_label ); ?></span>
			</span>
		</button>
		<input
			id="header-search-location"
			class="header-search__input screen-reader-text"
			type="hidden"
			name="location"
			value="<?php echo esc_attr( $excel_ent_location ); ?>"
			data-header-location-input
		>
		<div
			id="header-location-panel"
			class="header-location"
			data-header-location-panel
			role="dialog"
			aria-label="<?php esc_attr_e( 'Select location', 'excel-ent' ); ?>"
			hidden
		>
			<label class="header-location__search">
				<img
					class="header-location__search-icon"
					src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/map-pin-muted.svg' ); ?>"
					alt=""
					width="16"
					height="16"
					decoding="async"
				>
				<span class="screen-reader-text"><?php esc_html_e( 'Search for a city', 'excel-ent' ); ?></span>
				<input
					class="header-location__search-input"
					type="search"
					placeholder="<?php esc_attr_e( 'Search for a city...', 'excel-ent' ); ?>"
					data-header-location-search
					autocomplete="off"
				>
			</label>

			<div class="header-location__section">
				<p class="header-location__heading"><?php esc_html_e( 'Popular Cities', 'excel-ent' ); ?></p>
				<ul class="header-location__list" role="listbox" aria-label="<?php esc_attr_e( 'Popular cities', 'excel-ent' ); ?>">
					<?php foreach ( $excel_ent_location_options as $excel_ent_loc_value => $excel_ent_loc_data ) : ?>
						<?php
						$excel_ent_loc_selected = ( (string) $excel_ent_location === (string) $excel_ent_loc_value );
						$excel_ent_loc_search   = strtolower( $excel_ent_loc_data['label'] . ' ' . $excel_ent_loc_data['region'] );
						?>
						<li class="header-location__item" role="none">
							<button
								type="button"
								class="header-location__option<?php echo $excel_ent_loc_selected ? ' is-selected' : ''; ?>"
								role="option"
								aria-selected="<?php echo $excel_ent_loc_selected ? 'true' : 'false'; ?>"
								data-header-location-option
								data-value="<?php echo esc_attr( $excel_ent_loc_value ); ?>"
								data-label="<?php echo esc_attr( $excel_ent_loc_data['label'] ); ?>"
								data-search="<?php echo esc_attr( $excel_ent_loc_search ); ?>"
							>
								<span class="header-location__icon-wrap">
									<img
										class="header-location__pin header-location__pin--muted"
										src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/map-pin-muted.svg' ); ?>"
										alt=""
										width="16"
										height="16"
										decoding="async"
									>
									<img
										class="header-location__pin header-location__pin--accent"
										src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/map-pin-accent.svg' ); ?>"
										alt=""
										width="16"
										height="16"
										decoding="async"
									>
								</span>
								<span class="header-location__text">
									<span class="header-location__city"><?php echo esc_html( $excel_ent_loc_data['label'] ); ?></span>
									<span class="header-location__region"><?php echo esc_html( $excel_ent_loc_data['region'] ); ?></span>
								</span>
								<img
									class="header-location__check"
									src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/check-accent.svg' ); ?>"
									alt=""
									width="18"
									height="18"
									decoding="async"
								>
							</button>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>

			<div class="header-location__footer">
				<button type="button" class="header-location__confirm" data-header-location-confirm<?php echo $excel_ent_location ? '' : ' disabled'; ?>>
					<?php esc_html_e( 'Confirm Location', 'excel-ent' ); ?>
				</button>
			</div>
		</div>
	</div>

	<div class="header-search__field header-search__field--date" data-header-date>
		<button
			type="button"
			class="header-search__date-trigger"
			data-header-date-trigger
			aria-expanded="false"
			aria-haspopup="dialog"
			aria-controls="header-date-panel"
		>
			<img
				class="header-search__icon"
				src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/calendar-fill.svg' ); ?>"
				alt=""
				width="24"
				height="24"
				decoding="async"
			>
			<span class="header-search__label">
				<span class="header-search__title" data-header-date-label><?php echo esc_html( $excel_ent_date_label ); ?></span>
			</span>
		</button>
		<input
			id="header-search-date"
			class="header-search__input screen-reader-text"
			type="hidden"
			name="event_date"
			value="<?php echo esc_attr( $excel_ent_event_date ); ?>"
			data-header-date-input
		>
		<div
			id="header-date-panel"
			class="header-date"
			data-header-date-panel
			role="dialog"
			aria-label="<?php esc_attr_e( 'Select event date', 'excel-ent' ); ?>"
			hidden
		>
			<div class="header-date__header">
				<p class="header-date__month" data-header-date-month></p>
				<div class="header-date__nav">
					<button
						type="button"
						class="header-date__nav-btn"
						data-header-date-prev
						aria-label="<?php esc_attr_e( 'Previous month', 'excel-ent' ); ?>"
					>
						<img
							src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/chevron-left.svg' ); ?>"
							alt=""
							width="14"
							height="14"
							decoding="async"
						>
					</button>
					<button
						type="button"
						class="header-date__nav-btn"
						data-header-date-next
						aria-label="<?php esc_attr_e( 'Next month', 'excel-ent' ); ?>"
					>
						<img
							src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/chevron-right.svg' ); ?>"
							alt=""
							width="14"
							height="14"
							decoding="async"
						>
					</button>
				</div>
			</div>
			<div class="header-date__weekdays" aria-hidden="true">
				<span><?php esc_html_e( 'Su', 'excel-ent' ); ?></span>
				<span><?php esc_html_e( 'Mo', 'excel-ent' ); ?></span>
				<span><?php esc_html_e( 'Tu', 'excel-ent' ); ?></span>
				<span><?php esc_html_e( 'We', 'excel-ent' ); ?></span>
				<span><?php esc_html_e( 'Th', 'excel-ent' ); ?></span>
				<span><?php esc_html_e( 'Fr', 'excel-ent' ); ?></span>
				<span><?php esc_html_e( 'Sa', 'excel-ent' ); ?></span>
			</div>
			<div class="header-date__grid" data-header-date-grid role="grid" aria-label="<?php esc_attr_e( 'Calendar', 'excel-ent' ); ?>"></div>
			<div class="header-date__footer">
				<button type="button" class="header-date__confirm" data-header-date-confirm>
					<?php esc_html_e( 'Confirm Date', 'excel-ent' ); ?>
				</button>
			</div>
		</div>
	</div>

	<div class="header-search__field header-search__field--last header-search__field--budget" data-header-budget>
		<button
			type="button"
			class="header-search__budget-trigger"
			data-header-budget-trigger
			aria-expanded="false"
			aria-haspopup="listbox"
			aria-controls="header-budget-panel"
		>
			<img
				class="header-search__icon"
				src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/money-pound-circle-fill.svg' ); ?>"
				alt=""
				width="24"
				height="24"
				decoding="async"
			>
			<span class="header-search__label">
				<span class="header-search__title" data-header-budget-label><?php echo esc_html( $excel_ent_budget_label ); ?></span>
			</span>
		</button>
		<input
			id="header-search-budget"
			class="header-search__input screen-reader-text"
			type="hidden"
			name="budget"
			value="<?php echo esc_attr( $excel_ent_budget ); ?>"
			data-header-budget-input
		>
		<div
			id="header-budget-panel"
			class="header-budget"
			data-header-budget-panel
			hidden
		>
			<p class="header-budget__title"><?php esc_html_e( 'Select your desired budget', 'excel-ent' ); ?></p>
			<ul class="header-budget__list" role="listbox" aria-label="<?php esc_attr_e( 'Budget ranges', 'excel-ent' ); ?>">
				<?php foreach ( $excel_ent_budget_options as $excel_ent_budget_value => $excel_ent_budget_text ) : ?>
					<?php $excel_ent_budget_selected = ( (string) $excel_ent_budget === (string) $excel_ent_budget_value ); ?>
					<li class="header-budget__item" role="none">
						<button
							type="button"
							class="header-budget__option<?php echo $excel_ent_budget_selected ? ' is-selected' : ''; ?>"
							role="option"
							aria-selected="<?php echo $excel_ent_budget_selected ? 'true' : 'false'; ?>"
							data-header-budget-option
							data-value="<?php echo esc_attr( $excel_ent_budget_value ); ?>"
							data-label="<?php echo esc_attr( $excel_ent_budget_text ); ?>"
						>
							<span class="header-budget__option-label"><?php echo esc_html( $excel_ent_budget_text ); ?></span>
							<img
								class="header-budget__arrow header-budget__arrow--dark"
								src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/arrow-right-fill.svg' ); ?>"
								alt=""
								width="24"
								height="24"
								decoding="async"
							>
							<img
								class="header-budget__arrow header-budget__arrow--light"
								src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/arrow-right-fill-white.svg' ); ?>"
								alt=""
								width="24"
								height="24"
								decoding="async"
							>
						</button>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>

	<button class="header-search__submit magnetic" type="submit" aria-label="<?php esc_attr_e( 'Search', 'excel-ent' ); ?>">
		<img
			src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/arrow-right-line.svg' ); ?>"
			alt=""
			width="34"
			height="34"
			decoding="async"
		>
	</button>
</form>
