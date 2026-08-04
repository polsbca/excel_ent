<?php
/**
 * The header for our theme.
 *
 * @package Excel_Ent
 */
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

<div id="page" class="site">
	<header id="masthead" class="site-header">
		<div class="site-header__inner">
			<div class="site-branding">
				<?php excel_ent_site_brand(); ?>
			</div>

			<button
				class="nav-toggle"
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
		</div>
	</header>

	<main id="primary" class="site-main">