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
?>
<section
	class="explore-artists"
	id="explore-artists"
	aria-label="<?php esc_attr_e( 'Explore artists', 'excel-ent' ); ?>"
	data-explore-artists
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

	<?php if ( ! empty( $excel_ent_artists ) ) : ?>
		<?php
		get_template_part(
			'template-parts/artist-results-grid',
			null,
			array(
				'artists'    => $excel_ent_artists,
				'pagination' => $excel_ent_pagination,
				'context'    => 'explore',
			)
		);
		?>
	<?php else : ?>
		<div class="explore-artists__empty">
			<p class="explore-artists__empty-title"><?php esc_html_e( "Sorry, We Couldn't Find Any Matching Artists", 'excel-ent' ); ?></p>
			<p class="explore-artists__empty-lede">
				<?php
				if ( 'missing_api_key' === $excel_ent_search_result['error'] ) {
					esc_html_e( 'Artist search is not configured yet. Please add the API key in wp-config.php.', 'excel-ent' );
				} else {
					esc_html_e( 'Try adjusting your search or filters.', 'excel-ent' );
				}
				?>
			</p>
		</div>
	<?php endif; ?>
</section>
