<?php
/**
 * 404 template.
 *
 * @package Excel_Ent
 */

get_header();
?>

<div class="content-wrap content-wrap--narrow">
	<section class="error-404 not-found">
		<header class="page-header">
			<h1 class="page-title"><?php esc_html_e( 'Page not found', 'excel-ent' ); ?></h1>
		</header>
		<div class="page-content prose">
			<p><?php esc_html_e( 'The page you were looking for does not exist or has moved. Try a search or head back home.', 'excel-ent' ); ?></p>
			<?php get_search_form(); ?>
			<p><a class="btn btn--primary" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Back to home', 'excel-ent' ); ?></a></p>
		</div>
	</section>
</div>

<?php
get_footer();
