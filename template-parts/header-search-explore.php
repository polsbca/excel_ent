<?php
/**
 * Explore Artists header search + category filters — Figma 1299:7406 / mobile 1023:6859
 *
 * @package Excel_Ent
 */

$excel_ent_ea_uri = EXCEL_ENT_URI . '/assets/images/explore-artists';

$excel_ent_search_categories = array(
	array(
		'id'     => 'all',
		'label'  => __( 'ALL', 'excel-ent' ),
		'count'  => '1200',
		'active' => true,
		'icon'   => 'shine',
	),
	array(
		'id'     => 'artist-type',
		'label'  => __( 'Artist Type', 'excel-ent' ),
		'count'  => '1200',
		'active' => false,
		'icon'   => 'shine',
		'mobile_label' => __( 'ALL', 'excel-ent' ),
	),
	array(
		'id'     => 'tribute',
		'label'  => __( 'Tribute Acts', 'excel-ent' ),
		'count'  => '1200',
		'active' => false,
		'icon'   => 'shine',
		'mobile_label' => __( 'ALL', 'excel-ent' ),
	),
	array(
		'id'     => 'genre',
		'label'  => __( 'Music Genre', 'excel-ent' ),
		'count'  => '1200',
		'active' => false,
		'icon'   => 'caret',
		'desktop_only' => true,
	),
	array(
		'id'     => 'era',
		'label'  => __( 'Era / Decade', 'excel-ent' ),
		'count'  => '1200',
		'active' => false,
		'icon'   => 'caret',
		'desktop_only' => true,
	),
	array(
		'id'     => 'event',
		'label'  => __( 'Event Type', 'excel-ent' ),
		'count'  => '1200',
		'active' => false,
		'icon'   => 'caret',
		'desktop_only' => true,
	),
	array(
		'id'     => 'wedding',
		'label'  => __( 'Wedding', 'excel-ent' ),
		'count'  => '',
		'active' => false,
		'icon'   => 'none',
		'mobile_only' => true,
	),
	array(
		'id'     => 'view-all',
		'label'  => __( 'View All Categories', 'excel-ent' ),
		'count'  => '',
		'active' => false,
		'icon'   => 'arrow',
		'mobile_only' => true,
	),
);
?>
<div class="explore-artists-search" data-explore-search>
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

		<button class="explore-artists-search__sort magnetic" type="button" data-explore-sort>
			<img
				src="<?php echo esc_url( $excel_ent_ea_uri . '/equalizer-fill.svg' ); ?>"
				alt=""
				width="24"
				height="24"
				decoding="async"
			>
			<span><?php esc_html_e( 'Filters & Sort', 'excel-ent' ); ?></span>
		</button>
	</div>

	<div class="explore-artists-search__categories" role="tablist" aria-label="<?php esc_attr_e( 'Artist categories', 'excel-ent' ); ?>">
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
			$excel_ent_icon = isset( $excel_ent_cat['icon'] ) ? $excel_ent_cat['icon'] : 'caret';
			?>
			<button
				class="<?php echo esc_attr( $excel_ent_cat_class ); ?>"
				type="button"
				role="tab"
				aria-selected="<?php echo ! empty( $excel_ent_cat['active'] ) ? 'true' : 'false'; ?>"
				data-explore-cat="<?php echo esc_attr( $excel_ent_cat['id'] ); ?>"
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
		<?php endforeach; ?>
	</div>
</div>
