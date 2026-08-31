<?php
/**
 * Explore Artists header search + category filters — Figma 2202:33027 / dropdowns 1515:14175
 *
 * @package Excel_Ent
 */

$excel_ent_ea_uri = EXCEL_ENT_URI . '/assets/images/explore-artists';
$excel_ent_search_action = is_search() ? home_url( '/' ) : home_url( '/explore-artists/' );
$excel_ent_search_selected_tags = is_search() && isset( $_GET['occasion'] )
	? array_values( array_filter( array_map( 'sanitize_key', explode( ',', sanitize_text_field( wp_unslash( $_GET['occasion'] ) ) ) ) ) ) // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	: array();

$excel_ent_ea_filters = array(
	'artist-type' => array(
		'label' => __( 'Artist Type', 'excel-ent' ),
		'tags'  => array(
			'male-solo'            => __( 'Male Solo', 'excel-ent' ),
			'female-solo'          => __( 'Female Solo', 'excel-ent' ),
			'duos'                 => __( 'Duos', 'excel-ent' ),
			'bands'                => __( 'Bands', 'excel-ent' ),
			'djs'                  => __( "DJ's", 'excel-ent' ),
			'celebrity-acts'       => __( 'Celebrity Acts', 'excel-ent' ),
			'professional-dancers' => __( 'Professional Dancers', 'excel-ent' ),
			'magicians-hypnotists' => __( 'Magicians & Hypnotists', 'excel-ent' ),
			'shows'                => __( 'Shows', 'excel-ent' ),
		),
	),
	'tribute'     => array(
		'label' => __( 'Tribute Acts', 'excel-ent' ),
		'tags'  => array(
			'male-tributes'   => __( 'Male Tributes', 'excel-ent' ),
			'female-tributes' => __( 'Female Tributes', 'excel-ent' ),
			'duo-tributes'    => __( 'Duo Tributes', 'excel-ent' ),
			'band-tributes'   => __( 'Band Tributes', 'excel-ent' ),
		),
	),
	'genre'       => array(
		'label' => __( 'Music Genre', 'excel-ent' ),
		'mod'   => 'wide',
		'tags'  => array(
			'blues'             => __( 'Blues', 'excel-ent' ),
			'classical'         => __( 'Classical', 'excel-ent' ),
			'covers'            => __( 'Covers', 'excel-ent' ),
			'country'           => __( 'Country', 'excel-ent' ),
			'dance'             => __( 'Dance', 'excel-ent' ),
			'disco'             => __( 'Disco', 'excel-ent' ),
			'glam-rock'         => __( 'Glam Rock', 'excel-ent' ),
			'indie-mod'         => __( 'Indie & Mod', 'excel-ent' ),
			'irish-music'       => __( 'Irish music', 'excel-ent' ),
			'irish'             => __( 'Irish', 'excel-ent' ),
			'jazz'              => __( 'Jazz', 'excel-ent' ),
			'latin-party-bands' => __( 'Latin and party bands', 'excel-ent' ),
			'opera'             => __( 'Opera', 'excel-ent' ),
			'pop'               => __( 'Pop', 'excel-ent' ),
			'rnb'               => __( 'R&B', 'excel-ent' ),
			'rat-pack'          => __( 'Rat Pack', 'excel-ent' ),
			'reggae'            => __( 'Reggae', 'excel-ent' ),
			'rock'              => __( 'Rock', 'excel-ent' ),
			'rock-n-roll'       => __( 'Rock n Roll', 'excel-ent' ),
			'ska'               => __( 'Ska', 'excel-ent' ),
			'soul-motown'       => __( 'Soul & Motown', 'excel-ent' ),
			'swing'             => __( 'Swing', 'excel-ent' ),
			'vintage-music'     => __( 'Vintage music', 'excel-ent' ),
		),
	),
	'era'         => array(
		'label' => __( 'Era / Decade', 'excel-ent' ),
		'mod'   => 'wide',
		'tags'  => array(
			'00s' => __( "00's", 'excel-ent' ),
			'10s' => __( "10's", 'excel-ent' ),
			'20s' => __( "20's", 'excel-ent' ),
			'30s' => __( "30's", 'excel-ent' ),
			'40s' => __( "40's", 'excel-ent' ),
			'50s' => __( "50's", 'excel-ent' ),
			'60s' => __( "60's", 'excel-ent' ),
			'70s' => __( "70's", 'excel-ent' ),
			'80s' => __( "80's", 'excel-ent' ),
			'90s' => __( "90's", 'excel-ent' ),
		),
	),
	'event'       => array(
		'label' => __( 'Event Type', 'excel-ent' ),
		'mod'   => 'event',
		'tags'  => array(
			'celebrity-act'          => __( 'Celebrity Act', 'excel-ent' ),
			'comedy'                 => __( 'Comedy', 'excel-ent' ),
			'corporate'              => __( 'Corporate', 'excel-ent' ),
			'drag-artists'           => __( 'Drag Artists', 'excel-ent' ),
			'karaoke'                => __( 'Karaoke', 'excel-ent' ),
			'magicians-hypnotists'   => __( 'Magicians – hypnotists', 'excel-ent' ),
			'shows'                  => __( 'Shows', 'excel-ent' ),
			'variety'                => __( 'Variety', 'excel-ent' ),
			'wedding'                => __( 'Weddings', 'excel-ent' ),
		),
	),
	'artists-tributes' => array(
		'label' => __( 'Artists & Tributes', 'excel-ent' ),
		'mod'   => 'wide',
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
		),
	),
	'sort'        => array(
		'label'   => __( 'Sort by filter', 'excel-ent' ),
		'mod'     => 'sort',
		'confirm' => false,
		'tags'    => array(
			'recommended'    => __( 'Recommended', 'excel-ent' ),
			'most-popular'   => __( 'Most Popular', 'excel-ent' ),
			'highest-rated'  => __( 'Highest Rated', 'excel-ent' ),
			'newest'         => __( 'Newest', 'excel-ent' ),
			'price-low-high' => __( 'Price Low → High', 'excel-ent' ),
			'price-high-low' => __( 'Price High → Low', 'excel-ent' ),
			'available-now'  => __( 'Available now', 'excel-ent' ),
		),
	),
);

$excel_ent_search_categories = array(
	array(
		'id'     => 'all',
		'label'  => __( 'ALL', 'excel-ent' ),
		'count'  => '1200',
		'active' => true,
		'icon'   => 'none',
	),
	array(
		'id'           => 'artist-type',
		'label'        => __( 'Artist Type', 'excel-ent' ),
		'count'        => '1200',
		'active'       => false,
		'icon'         => 'shine',
		'mobile_label' => __( 'ALL', 'excel-ent' ),
		'filter'       => 'artist-type',
		'compact_only' => true,
	),
	array(
		'id'           => 'tribute',
		'label'        => __( 'Tribute Acts', 'excel-ent' ),
		'count'        => '1200',
		'active'       => false,
		'icon'         => 'shine',
		'mobile_label' => __( 'ALL', 'excel-ent' ),
		'filter'       => 'tribute',
		'compact_only' => true,
	),
	array(
		'id'        => 'artists-tributes',
		'label'     => __( 'Artists & Tributes', 'excel-ent' ),
		'count'     => '1200',
		'active'    => false,
		'icon'      => 'caret',
		'wide_only' => true,
		'filter'    => 'artists-tributes',
	),
	array(
		'id'           => 'era',
		'label'        => __( 'Era / Decade', 'excel-ent' ),
		'count'        => '1200',
		'active'       => false,
		'icon'         => 'caret',
		'desktop_only' => true,
		'filter'       => 'era',
	),
	array(
		'id'           => 'event',
		'label'        => __( 'Event Type', 'excel-ent' ),
		'count'        => '1200',
		'active'       => false,
		'icon'         => 'caret',
		'desktop_only' => true,
		'fit'          => true,
		'filter'       => 'event',
	),
	array(
		'id'           => 'genre',
		'label'        => __( 'Music Genre', 'excel-ent' ),
		'count'        => '1200',
		'active'       => false,
		'icon'         => 'caret',
		'desktop_only' => true,
		'filter'       => 'genre',
	),
	array(
		'id'          => 'wedding',
		'label'       => __( 'Wedding', 'excel-ent' ),
		'count'       => '',
		'active'      => false,
		'icon'        => 'none',
		'mobile_only' => true,
	),
	array(
		'id'          => 'view-all',
		'label'       => __( 'View All Categories', 'excel-ent' ),
		'count'       => '',
		'active'      => false,
		'icon'        => 'arrow',
		'mobile_only' => true,
	),
);

$excel_ent_render_filter_panel = static function ( $id, $group ) use ( $excel_ent_ea_uri, $excel_ent_search_selected_tags ) {
	$mod          = ! empty( $group['mod'] ) ? ' explore-filter--' . $group['mod'] : '';
	$is_sort      = ! empty( $group['mod'] ) && 'sort' === $group['mod'];
	$show_confirm = ! isset( $group['confirm'] ) || $group['confirm'];
	?>
	<div
		id="explore-filter-<?php echo esc_attr( $id ); ?>"
		class="explore-filter<?php echo esc_attr( $mod ); ?>"
		data-explore-filter-panel
		data-explore-filter-group="<?php echo esc_attr( $id ); ?>"
		role="dialog"
		aria-modal="true"
		aria-label="<?php echo esc_attr( $group['label'] ); ?>"
		hidden
	>
		<button
			type="button"
			class="explore-filter__close"
			data-explore-filter-close
			aria-label="<?php esc_attr_e( 'Close filters', 'excel-ent' ); ?>"
		>
			<img
				src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/close-large-line.svg' ); ?>"
				alt=""
				width="9"
				height="9"
				decoding="async"
			>
		</button>
		<div class="explore-filter__body">
			<div class="explore-filter__head">
				<p class="explore-filter__title"><?php echo esc_html( $group['label'] ); ?></p>
				<span class="explore-filter__line" aria-hidden="true"></span>
			</div>
			<div
				class="explore-filter__tags"
				role="listbox"
				aria-multiselectable="<?php echo $is_sort ? 'false' : 'true'; ?>"
				aria-label="<?php echo esc_attr( $group['label'] ); ?>"
			>
				<?php foreach ( $group['tags'] as $excel_ent_value => $excel_ent_tag_label ) : ?>
					<?php $excel_ent_tag_on = ( $is_sort && 'recommended' === $excel_ent_value ) || in_array( $excel_ent_value, $excel_ent_search_selected_tags, true ); ?>
					<button
						type="button"
						class="explore-filter__tag<?php echo $excel_ent_tag_on ? ' is-selected' : ''; ?>"
						role="option"
						aria-selected="<?php echo $excel_ent_tag_on ? 'true' : 'false'; ?>"
						data-explore-filter-tag
						data-value="<?php echo esc_attr( $excel_ent_value ); ?>"
					>
						<img
							class="explore-filter__check explore-filter__check--off"
							src="<?php echo esc_url( $excel_ent_ea_uri . '/check-line.svg' ); ?>"
							alt=""
							width="16"
							height="16"
							decoding="async"
						>
						<img
							class="explore-filter__check explore-filter__check--on"
							src="<?php echo esc_url( $excel_ent_ea_uri . '/check-line-on.svg' ); ?>"
							alt=""
							width="16"
							height="16"
							decoding="async"
						>
						<img
							class="explore-filter__radio explore-filter__radio--off"
							src="<?php echo esc_url( $excel_ent_ea_uri . '/radio-off.svg' ); ?>"
							alt=""
							width="14"
							height="14"
							decoding="async"
						>
						<img
							class="explore-filter__radio explore-filter__radio--on"
							src="<?php echo esc_url( $excel_ent_ea_uri . '/radio-on.svg' ); ?>"
							alt=""
							width="14"
							height="14"
							decoding="async"
						>
						<span class="explore-filter__tag-label"><?php echo esc_html( $excel_ent_tag_label ); ?></span>
					</button>
				<?php endforeach; ?>
			</div>
			<?php if ( $show_confirm ) : ?>
				<button
					type="button"
					class="explore-filter__confirm magnetic"
					data-explore-filter-confirm
				>
					<?php esc_html_e( 'Confirm Selection', 'excel-ent' ); ?>
				</button>
			<?php endif; ?>
		</div>
	</div>
	<?php
};
?>
<div
	class="explore-artists-search"
	data-explore-search
	data-chip-close="<?php echo esc_url( $excel_ent_ea_uri . '/close-line.svg' ); ?>"
>
	<div class="explore-filter-backdrop" data-explore-filter-backdrop hidden></div>
	<div class="explore-artists-search__row">
		<form
			class="explore-artists-search__form"
			role="search"
			method="get"
			action="<?php echo esc_url( $excel_ent_search_action ); ?>"
		>
			<label class="explore-artists-search__label" for="explore-artists-search-query">
				<span class="explore-artists-search__title"><?php esc_html_e( 'Search', 'excel-ent' ); ?></span>
				<input
					id="explore-artists-search-query"
					class="explore-artists-search__input"
					type="search"
					name="s"
					placeholder="<?php esc_attr_e( 'By Artists, Djs, Bands...', 'excel-ent' ); ?>"
					value="<?php echo esc_attr( get_search_query() ); ?>"
				>
			</label>
			<button class="explore-artists-search__submit magnetic" type="submit" aria-label="<?php esc_attr_e( 'Search', 'excel-ent' ); ?>">
				<img
					src="<?php echo esc_url( $excel_ent_ea_uri . '/search-eye.svg' ); ?>"
					alt=""
					width="20"
					height="20"
					decoding="async"
				>
			</button>
		</form>

		<div class="explore-artists-search__sort-wrap" data-explore-filter="sort">
			<button
				class="explore-artists-search__sort magnetic"
				type="button"
				data-explore-filter-trigger
				aria-expanded="false"
				aria-haspopup="dialog"
				aria-controls="explore-filter-sort"
			>
				<img
					src="<?php echo esc_url( $excel_ent_ea_uri . '/equalizer-fill.svg' ); ?>"
					alt=""
					width="24"
					height="24"
					decoding="async"
				>
				<span><?php esc_html_e( 'Filters & Sort', 'excel-ent' ); ?></span>
			</button>
			<?php $excel_ent_render_filter_panel( 'sort', $excel_ent_ea_filters['sort'] ); ?>
		</div>
	</div>

	<div class="explore-artists-search__categories" aria-label="<?php esc_attr_e( 'Artist categories', 'excel-ent' ); ?>">
		<?php foreach ( $excel_ent_search_categories as $excel_ent_cat ) : ?>
			<?php
			$excel_ent_cat_class = 'explore-artists-search__cat magnetic';
			if ( ! empty( $excel_ent_cat['active'] ) ) {
				$excel_ent_cat_class .= ' is-active';
			}
			if ( ! empty( $excel_ent_cat['mobile_only'] ) ) {
				$excel_ent_cat_class .= ' explore-artists-search__cat--mobile-only';
			}
			if ( ! empty( $excel_ent_cat['desktop_only'] ) ) {
				$excel_ent_cat_class .= ' explore-artists-search__cat--desktop-only';
			}
			if ( ! empty( $excel_ent_cat['compact_only'] ) ) {
				$excel_ent_cat_class .= ' explore-artists-search__cat--compact-only';
			}
			if ( ! empty( $excel_ent_cat['wide_only'] ) ) {
				$excel_ent_cat_class .= ' explore-artists-search__cat--wide-only';
			}
			if ( empty( $excel_ent_cat['count'] ) ) {
				$excel_ent_cat_class .= ' explore-artists-search__cat--plain';
			}
			$excel_ent_icon      = isset( $excel_ent_cat['icon'] ) ? $excel_ent_cat['icon'] : 'caret';
			$excel_ent_filter_id = isset( $excel_ent_cat['filter'] ) ? $excel_ent_cat['filter'] : '';
			$excel_ent_has_panel = $excel_ent_filter_id && isset( $excel_ent_ea_filters[ $excel_ent_filter_id ] );
			$excel_ent_wrap_mods = '';
			if ( ! empty( $excel_ent_cat['desktop_only'] ) ) {
				$excel_ent_wrap_mods .= ' explore-artists-search__cat-wrap--desktop-only';
			}
			if ( ! empty( $excel_ent_cat['compact_only'] ) ) {
				$excel_ent_wrap_mods .= ' explore-artists-search__cat-wrap--compact-only';
			}
			if ( ! empty( $excel_ent_cat['wide_only'] ) ) {
				$excel_ent_wrap_mods .= ' explore-artists-search__cat-wrap--wide-only';
			}
			if ( ! empty( $excel_ent_cat['fit'] ) ) {
				$excel_ent_wrap_mods .= ' explore-artists-search__cat-wrap--fit';
			}
			?>
			<?php if ( $excel_ent_has_panel ) : ?>
				<div
					class="explore-artists-search__cat-wrap<?php echo esc_attr( $excel_ent_wrap_mods ); ?>"
					data-explore-filter="<?php echo esc_attr( $excel_ent_filter_id ); ?>"
				>
			<?php endif; ?>
			<button
				class="<?php echo esc_attr( $excel_ent_cat_class ); ?>"
				type="button"
				<?php if ( $excel_ent_has_panel ) : ?>
					data-explore-filter-trigger
					aria-expanded="false"
					aria-haspopup="dialog"
					aria-controls="explore-filter-<?php echo esc_attr( $excel_ent_filter_id ); ?>"
				<?php else : ?>
					data-explore-cat="<?php echo esc_attr( $excel_ent_cat['id'] ); ?>"
				<?php endif; ?>
			>
				<?php if ( 'shine' === $excel_ent_icon ) : ?>
					<img
						class="explore-artists-search__shine"
						src="<?php echo esc_url( $excel_ent_ea_uri . '/shining-fill.svg' ); ?>"
						alt=""
						width="14"
						height="14"
						decoding="async"
					>
					<img
						class="explore-artists-search__caret"
						src="<?php echo esc_url( $excel_ent_ea_uri . '/caret-down.svg' ); ?>"
						alt=""
						width="30"
						height="30"
						decoding="async"
					>
				<?php elseif ( 'caret' === $excel_ent_icon ) : ?>
					<img
						class="explore-artists-search__caret"
						src="<?php echo esc_url( $excel_ent_ea_uri . '/caret-down.svg' ); ?>"
						alt=""
						width="30"
						height="30"
						decoding="async"
					>
				<?php endif; ?>
				<span class="explore-artists-search__cat-label">
					<?php if ( ! empty( $excel_ent_cat['mobile_label'] ) ) : ?>
						<span class="explore-artists-search__cat-label-desktop"><?php echo esc_html( $excel_ent_cat['label'] ); ?></span>
						<span class="explore-artists-search__cat-label-mobile"><?php echo esc_html( $excel_ent_cat['mobile_label'] ); ?></span>
					<?php else : ?>
						<?php echo esc_html( $excel_ent_cat['label'] ); ?>
					<?php endif; ?>
				</span>
				<?php if ( '' !== (string) $excel_ent_cat['count'] ) : ?>
					<span class="explore-artists-search__cat-count"><?php echo esc_html( $excel_ent_cat['count'] ); ?></span>
				<?php endif; ?>
				<?php if ( 'arrow' === $excel_ent_icon ) : ?>
					<img
						class="explore-artists-search__arrow"
						src="<?php echo esc_url( $excel_ent_ea_uri . '/arrow-left-long-line.svg' ); ?>"
						alt=""
						width="12"
						height="12"
						decoding="async"
					>
				<?php endif; ?>
			</button>
			<?php
			if ( $excel_ent_has_panel ) {
				$excel_ent_render_filter_panel( $excel_ent_filter_id, $excel_ent_ea_filters[ $excel_ent_filter_id ] );
				echo '</div>';
			}
			?>
		<?php endforeach; ?>
	</div>
</div>
