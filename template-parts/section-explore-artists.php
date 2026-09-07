<?php
/**
 * Explore Artists listing — Figma desktop 2202:32111 / tablet 1099:2920 / mobile 1023:6857
 *
 * @package Excel_Ent
 */

$excel_ent_ea_uri = EXCEL_ENT_URI . '/assets/images/explore-artists';

$excel_ent_search_result = excel_ent_list_artists( excel_ent_get_artist_list_args_from_request() );
$excel_ent_artists       = $excel_ent_search_result['artists'];
$excel_ent_pagination    = $excel_ent_search_result['pagination'];
$excel_ent_total         = (int) ( $excel_ent_pagination['total'] ?? 0 );
$excel_ent_catalog_total = $excel_ent_total;
$excel_ent_page          = max( 1, (int) ( $excel_ent_pagination['page'] ?? 1 ) );
?>
<section
	class="explore-artists"
	id="explore-artists"
	aria-label="<?php esc_attr_e( 'Explore artists', 'excel-ent' ); ?>"
	data-explore-artists
	data-explore-page="<?php echo esc_attr( (string) $excel_ent_page ); ?>"
>
	<div class="explore-artists__filters">
		<header class="explore-artists__intro reveal" data-reveal>
			<h1 class="explore-artists__title"><?php esc_html_e( 'EVERY ARTIST. EVERY VIBE.', 'excel-ent' ); ?></h1>
			<p class="explore-artists__intro-count">
				<?php
				printf(
					/* translators: %d: number of artists */
					esc_html( _n( '%d Artist', '%d Artists', $excel_ent_catalog_total, 'excel-ent' ) ),
					(int) $excel_ent_catalog_total
				);
				?>
			</p>
		</header>

		<div class="explore-artists__chips-bar is-empty reveal" data-reveal data-explore-chips-bar>
			<div class="explore-artists__chips" data-explore-chips></div>
			<button class="explore-artists__clear magnetic" type="button" data-explore-clear>
				<img
					class="explore-artists__clear-icon"
					src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/search/close-large-line.svg' ); ?>"
					alt=""
					width="24"
					height="24"
					decoding="async"
				>
				<span><?php esc_html_e( 'Clear all Filters', 'excel-ent' ); ?></span>
			</button>
		</div>

		<div class="explore-artists__results reveal" data-reveal>
			<div class="explore-artists__results-label">
				<span data-explore-results-label data-default-label="<?php esc_attr_e( 'All', 'excel-ent' ); ?>"><?php esc_html_e( 'All', 'excel-ent' ); ?></span>
				<img
					src="<?php echo esc_url( $excel_ent_ea_uri . '/line-accent.svg' ); ?>"
					alt=""
					width="226"
					height="2"
					decoding="async"
				>
			</div>
			<p class="explore-artists__results-count" data-explore-count>
				<?php
				printf(
					/* translators: %d: number of artists */
					esc_html( _n( '%d Artist', '%d Artists', $excel_ent_total, 'excel-ent' ) ),
					(int) $excel_ent_total
				);
				?>
			</p>
		</div>
	</div>

	<div class="explore-artists__results-mount" data-explore-results-mount>
		<?php echo excel_ent_render_artist_results_html( $excel_ent_search_result, 'explore' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built from escaped template parts. ?>
	</div>
</section>
