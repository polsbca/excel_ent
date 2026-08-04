<?php
/**
 * Template part for no results.
 *
 * @package Excel_Ent
 */
?>

<section class="no-results not-found">
	<header class="page-header">
		<h1 class="page-title"><?php esc_html_e( 'Nothing found', 'excel-ent' ); ?></h1>
	</header>
	<div class="page-content prose">
		<?php if ( is_search() ) : ?>
			<p><?php esc_html_e( 'Sorry, nothing matched your search. Try different keywords.', 'excel-ent' ); ?></p>
			<?php get_search_form(); ?>
		<?php else : ?>
			<p><?php esc_html_e( 'It looks like nothing was found here. Maybe try a search?', 'excel-ent' ); ?></p>
			<?php get_search_form(); ?>
		<?php endif; ?>
	</div>
</section>
