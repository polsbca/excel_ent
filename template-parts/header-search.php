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
?>
<form class="header-search" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<div class="header-search__field">
		<img
			class="header-search__icon"
			src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/search-eye-line.svg' ); ?>"
			alt=""
			width="24"
			height="24"
			decoding="async"
		>
		<label class="header-search__label" for="header-search-query">
			<span class="header-search__title"><?php esc_html_e( 'Search Artist', 'excel-ent' ); ?></span>
			<input
				id="header-search-query"
				class="header-search__input screen-reader-text"
				type="search"
				name="s"
				placeholder="<?php esc_attr_e( 'Search Artist', 'excel-ent' ); ?>"
				value="<?php echo esc_attr( get_search_query() ); ?>"
			>
		</label>
	</div>

	<div class="header-search__field">
		<img
			class="header-search__icon"
			src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/browse-categories.svg' ); ?>"
			alt=""
			width="24"
			height="24"
			decoding="async"
		>
		<label class="header-search__label" for="header-search-occasion">
			<span class="header-search__title"><?php esc_html_e( 'Browse Categories', 'excel-ent' ); ?></span>
			<input
				id="header-search-occasion"
				class="header-search__input screen-reader-text"
				type="text"
				name="occasion"
				placeholder="<?php esc_attr_e( 'Browse Categories', 'excel-ent' ); ?>"
				value="<?php echo esc_attr( $excel_ent_occasion ); ?>"
			>
		</label>
	</div>

	<div class="header-search__field">
		<img
			class="header-search__icon"
			src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/map-pin-fill.svg' ); ?>"
			alt=""
			width="24"
			height="24"
			decoding="async"
		>
		<label class="header-search__label" for="header-search-location">
			<span class="header-search__title"><?php esc_html_e( 'Location', 'excel-ent' ); ?></span>
			<input
				id="header-search-location"
				class="header-search__input screen-reader-text"
				type="text"
				name="location"
				placeholder="<?php esc_attr_e( 'Location', 'excel-ent' ); ?>"
				value="<?php echo esc_attr( $excel_ent_location ); ?>"
			>
		</label>
	</div>

	<div class="header-search__field">
		<img
			class="header-search__icon"
			src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/calendar-fill.svg' ); ?>"
			alt=""
			width="24"
			height="24"
			decoding="async"
		>
		<label class="header-search__label" for="header-search-date">
			<span class="header-search__title"><?php esc_html_e( 'Event Date', 'excel-ent' ); ?></span>
			<input
				id="header-search-date"
				class="header-search__input screen-reader-text"
				type="text"
				name="event_date"
				placeholder="<?php esc_attr_e( 'Event Date', 'excel-ent' ); ?>"
				value="<?php echo esc_attr( $excel_ent_event_date ); ?>"
			>
		</label>
	</div>

	<div class="header-search__field header-search__field--last">
		<img
			class="header-search__icon"
			src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/money-pound-circle-fill.svg' ); ?>"
			alt=""
			width="24"
			height="24"
			decoding="async"
		>
		<label class="header-search__label" for="header-search-budget">
			<span class="header-search__title"><?php esc_html_e( 'Budget', 'excel-ent' ); ?></span>
			<input
				id="header-search-budget"
				class="header-search__input screen-reader-text"
				type="text"
				name="budget"
				placeholder="<?php esc_attr_e( 'Budget', 'excel-ent' ); ?>"
				value="<?php echo esc_attr( $excel_ent_budget ); ?>"
			>
		</label>
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
