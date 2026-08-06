<?php
/**
 * Explore Artists header search + category filters — Figma 1299:7406
 *
 * @package Excel_Ent
 */

$excel_ent_ea_uri = EXCEL_ENT_URI . '/assets/images/explore-artists';

$excel_ent_search_categories = array(
	array(
		'id'     => 'all',
		'label'  => __( 'ALL', 'excel-ent' ),
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
			<button
				class="explore-artists-search__cat magnetic<?php echo $excel_ent_cat['active'] ? ' is-active' : ''; ?>"
				type="button"
				role="tab"
				aria-selected="<?php echo $excel_ent_cat['active'] ? 'true' : 'false'; ?>"
				data-explore-cat="<?php echo esc_attr( $excel_ent_cat['id'] ); ?>"
			>
				<img
					class="explore-artists-search__caret"
					src="<?php echo esc_url( $excel_ent_ea_uri . '/caret-down.svg' ); ?>"
					alt=""
					width="30"
					height="30"
					decoding="async"
				>
				<span class="explore-artists-search__cat-label"><?php echo esc_html( $excel_ent_cat['label'] ); ?></span>
				<span class="explore-artists-search__cat-count"><?php echo esc_html( $excel_ent_cat['count'] ); ?></span>
			</button>
		<?php endforeach; ?>
	</div>
</div>
