<?php
/**
 * Shared artist results grid + pagination (search + explore).
 *
 * @package Excel_Ent
 *
 * @var array $args {
 *     @type array  $artists    Normalized artist cards.
 *     @type array  $pagination Pagination meta.
 *     @type string $context    search|explore
 * }
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$excel_ent_artists     = isset( $args['artists'] ) && is_array( $args['artists'] ) ? $args['artists'] : array();
$excel_ent_pagination  = isset( $args['pagination'] ) && is_array( $args['pagination'] ) ? $args['pagination'] : array();
$excel_ent_context     = isset( $args['context'] ) ? (string) $args['context'] : 'search';
$excel_ent_total       = (int) ( $excel_ent_pagination['total'] ?? count( $excel_ent_artists ) );
$excel_ent_page        = max( 1, (int) ( $excel_ent_pagination['page'] ?? 1 ) );
$excel_ent_total_pages = max( 0, (int) ( $excel_ent_pagination['total_pages'] ?? 0 ) );
$excel_ent_grid_class  = 'explore-artists__grid stagger';
$excel_ent_is_explore  = ( 'explore' === $excel_ent_context );

if ( 'search' === $excel_ent_context ) {
	$excel_ent_grid_class .= ' search-page__grid';
}
?>
<section
	class="<?php echo $excel_ent_is_explore ? 'explore-artists__results-section' : 'search-page__results'; ?>"
	aria-label="<?php esc_attr_e( 'Artist search results', 'excel-ent' ); ?>"
>
	<?php if ( 'search' === $excel_ent_context ) : ?>
		<div class="search-page__results-head">
			<p class="search-page__results-count">
				<?php
				printf(
					/* translators: %d: number of artists */
					esc_html( _n( '%d Artist', '%d Artists', $excel_ent_total, 'excel-ent' ) ),
					(int) $excel_ent_total
				);
				?>
			</p>
		</div>
	<?php endif; ?>

	<div class="<?php echo esc_attr( $excel_ent_grid_class ); ?>">
		<?php foreach ( $excel_ent_artists as $excel_ent_index => $excel_ent_artist ) : ?>
			<?php
			get_template_part(
				'template-parts/explore-artist-card',
				null,
				array(
					'artist' => $excel_ent_artist,
					'index'  => $excel_ent_index,
				)
			);
			?>
		<?php endforeach; ?>
	</div>

	<?php if ( $excel_ent_total_pages > 1 ) : ?>
		<nav
			class="search-page__pagination<?php echo $excel_ent_is_explore ? ' explore-artists__pagination' : ''; ?>"
			aria-label="<?php echo $excel_ent_is_explore ? esc_attr__( 'Artist results pages', 'excel-ent' ) : esc_attr__( 'Search results pages', 'excel-ent' ); ?>"
			data-explore-pagination="<?php echo $excel_ent_is_explore ? '1' : '0'; ?>"
		>
			<?php if ( $excel_ent_page > 1 ) : ?>
				<a
					class="search-page__page-link magnetic"
					href="<?php echo esc_url( excel_ent_artist_search_page_url( $excel_ent_page - 1 ) ); ?>"
					<?php echo $excel_ent_is_explore ? 'data-explore-page="' . esc_attr( (string) ( $excel_ent_page - 1 ) ) . '"' : ''; ?>
				>
					<?php esc_html_e( 'Previous', 'excel-ent' ); ?>
				</a>
			<?php else : ?>
				<span class="search-page__page-link search-page__page-link--disabled" aria-hidden="true"><?php esc_html_e( 'Previous', 'excel-ent' ); ?></span>
			<?php endif; ?>
			<span class="search-page__page-status">
				<?php
				printf(
					/* translators: 1: current page, 2: total pages */
					esc_html__( 'Page %1$d of %2$d', 'excel-ent' ),
					(int) $excel_ent_page,
					(int) $excel_ent_total_pages
				);
				?>
			</span>
			<?php if ( $excel_ent_page < $excel_ent_total_pages ) : ?>
				<a
					class="search-page__page-link magnetic"
					href="<?php echo esc_url( excel_ent_artist_search_page_url( $excel_ent_page + 1 ) ); ?>"
					<?php echo $excel_ent_is_explore ? 'data-explore-page="' . esc_attr( (string) ( $excel_ent_page + 1 ) ) . '"' : ''; ?>
				>
					<?php esc_html_e( 'Next', 'excel-ent' ); ?>
				</a>
			<?php else : ?>
				<span class="search-page__page-link search-page__page-link--disabled" aria-hidden="true"><?php esc_html_e( 'Next', 'excel-ent' ); ?></span>
			<?php endif; ?>
		</nav>
	<?php endif; ?>
</section>
