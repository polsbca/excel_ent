<?php
/**
 * The header for our theme.
 *
 * @package Excel_Ent
 */

$excel_ent_phone = excel_ent_get_phone_number();
$excel_ent_quote = excel_ent_get_quote_url();
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'excel-ent' ); ?></a>

<?php get_template_part( 'template-parts/site', 'effects' ); ?>

<div id="page" class="site">
	<header id="masthead" class="site-header">
		<div class="site-header__inner">
			<div class="site-header__bar">
			<div class="site-branding">
				<?php excel_ent_header_logo(); ?>
			</div>

			<button
				class="nav-toggle magnetic"
				type="button"
				aria-controls="primary-menu"
				aria-expanded="false"
				aria-label="<?php esc_attr_e( 'Toggle menu', 'excel-ent' ); ?>"
			>
				<span class="nav-toggle__bar" aria-hidden="true"></span>
				<span class="nav-toggle__bar" aria-hidden="true"></span>
			</button>

			<nav id="site-navigation" class="main-navigation" aria-label="<?php esc_attr_e( 'Primary', 'excel-ent' ); ?>">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'primary',
						'menu_id'        => 'primary-menu',
						'container'      => false,
						'fallback_cb'    => 'excel_ent_fallback_menu',
					)
				);
				?>
			</nav>

			<div class="site-header__actions">
				<?php if ( $excel_ent_phone ) : ?>
					<a
						class="header-phone magnetic"
						href="<?php echo esc_url( 'tel:' . preg_replace( '/[^0-9+]/', '', $excel_ent_phone ) ); ?>"
						aria-label="<?php esc_attr_e( 'Call us', 'excel-ent' ); ?>"
					>
						<img
							src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/phone-fill.svg' ); ?>"
							alt=""
							width="30"
							height="30"
							decoding="async"
						>
					</a>
				<?php endif; ?>

				<a class="btn-quote magnetic" href="<?php echo esc_url( $excel_ent_quote ); ?>">
					<?php esc_html_e( 'Get a Quote', 'excel-ent' ); ?>
				</a>
			</div>
			</div>

			<?php
			if ( excel_ent_is_explore_artists_page() ) {
				get_template_part( 'template-parts/header', 'search-explore' );
			} elseif ( ! excel_ent_is_artist_page() && ! excel_ent_is_about_page() && ! excel_ent_is_package_page() ) {
				get_template_part( 'template-parts/header', 'search' );
			}
			?>
		</div>
	</header>

	<main id="primary" class="site-main">
