<?php
/**
 * Explore Artists header search + category filters — Figma 1299:7406 / dropdowns 1515:14175
 *
 * @package Excel_Ent
 */

$excel_ent_ea_uri = EXCEL_ENT_URI . '/assets/images/explore-artists';

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
		'mod'   => 'genre',
		'tags'  => array(
			'pop'               => __( 'Pop', 'excel-ent' ),
			'rock'              => __( 'Rock', 'excel-ent' ),
			'rock-n-roll'       => __( "Rock 'n' Roll", 'excel-ent' ),
			'soul-motown'       => __( 'Soul & Motown', 'excel-ent' ),
			'rnb'               => __( 'R&B', 'excel-ent' ),
			'disco'             => __( 'Disco', 'excel-ent' ),
			'country'           => __( 'Country', 'excel-ent' ),
			'jazz'              => __( 'Jazz', 'excel-ent' ),
			'swing'             => __( 'Swing', 'excel-ent' ),
			'blues'             => __( 'Blues', 'excel-ent' ),
			'reggae'            => __( 'Reggae', 'excel-ent' ),
			'opera'             => __( 'Opera', 'excel-ent' ),
			'classical'         => __( 'Classical', 'excel-ent' ),
			'indie'             => __( 'Indie', 'excel-ent' ),
			'latin-party-bands' => __( 'Latin Party Bands', 'excel-ent' ),
			'cabaret'           => __( 'Cabaret', 'excel-ent' ),
			'ska'               => __( 'Ska', 'excel-ent' ),
			'vintage-music'     => __( 'Vintage Music', 'excel-ent' ),
			'irish-music'       => __( 'Irish Music', 'excel-ent' ),
			'glam-rock'         => __( 'Glam Rock', 'excel-ent' ),
			'rat-pack'          => __( 'Rat Pack', 'excel-ent' ),
		),
	),
	'era'         => array(
		'label' => __( 'Era / Decade', 'excel-ent' ),
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
			'wedding'       => __( 'Wedding', 'excel-ent' ),
			'corporate'     => __( 'Corporate', 'excel-ent' ),
			'private-party' => __( 'Private Party', 'excel-ent' ),
			'birthday'      => __( 'Birthday', 'excel-ent' ),
			'festival'      => __( 'Festival', 'excel-ent' ),
			'christmas'     => __( 'Christmas', 'excel-ent' ),
			'charity'       => __( 'Charity', 'excel-ent' ),
		),
	),
	'sort'        => array(
		'label' => __( 'Sort By', 'excel-ent' ),
		'mod'   => 'sort',
		'tags'  => array(
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
		'icon'   => 'shine',
	),
	array(
		'id'           => 'artist-type',
		'label'        => __( 'Artist Type', 'excel-ent' ),
		'count'        => '1200',
		'active'       => false,
		'icon'         => 'shine',
		'mobile_label' => __( 'ALL', 'excel-ent' ),
		'filter'       => 'artist-type',
	),
	array(
		'id'           => 'tribute',
		'label'        => __( 'Tribute Acts', 'excel-ent' ),
		'count'        => '1200',
		'active'       => false,
		'icon'         => 'shine',
		'mobile_label' => __( 'ALL', 'excel-ent' ),
		'filter'       => 'tribute',
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
		'filter'       => 'event',
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

$excel_ent_render_filter_panel = static function ( $id, $group ) {
	$mod = ! empty( $group['mod'] ) ? ' explore-filter--' . $group['mod'] : '';
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
			<div class="explore-filter__tags" role="listbox" aria-label="<?php echo esc_attr( $group['label'] ); ?>">
				<?php foreach ( $group['tags'] as $excel_ent_value => $excel_ent_tag_label ) : ?>
					<button
						type="button"
						class="explore-filter__tag"
						role="option"
						aria-selected="false"
						data-explore-filter-tag
						data-value="<?php echo esc_attr( $excel_ent_value ); ?>"
					>
						<?php echo esc_html( $excel_ent_tag_label ); ?>
					</button>
				<?php endforeach; ?>
			</div>
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
			action="<?php echo esc_url( home_url( '/explore-artists/' ) ); ?>"
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
			if ( empty( $excel_ent_cat['count'] ) ) {
				$excel_ent_cat_class .= ' explore-artists-search__cat--plain';
			}
			$excel_ent_icon      = isset( $excel_ent_cat['icon'] ) ? $excel_ent_cat['icon'] : 'caret';
			$excel_ent_filter_id = isset( $excel_ent_cat['filter'] ) ? $excel_ent_cat['filter'] : '';
			$excel_ent_has_panel = $excel_ent_filter_id && isset( $excel_ent_ea_filters[ $excel_ent_filter_id ] );
			?>
			<?php if ( $excel_ent_has_panel ) : ?>
				<div
					class="explore-artists-search__cat-wrap<?php echo ! empty( $excel_ent_cat['desktop_only'] ) ? ' explore-artists-search__cat-wrap--desktop-only' : ''; ?>"
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
