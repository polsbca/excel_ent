<?php
/**
 * Custom template tags.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Prints HTML with meta information for the current post.
 */
function excel_ent_posted_on() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';

	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated screen-reader-text" datetime="%3$s">%4$s</time>';
	}

	$time_string = sprintf(
		$time_string,
		esc_attr( get_the_date( DATE_W3C ) ),
		esc_html( get_the_date() ),
		esc_attr( get_the_modified_date( DATE_W3C ) ),
		esc_html( get_the_modified_date() )
	);

	printf(
		'<span class="posted-on">%s</span>',
		$time_string // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	);
}

/**
 * Prints HTML with author information.
 */
function excel_ent_posted_by() {
	printf(
		'<span class="byline">%1$s <a class="url fn n" href="%2$s">%3$s</a></span>',
		esc_html__( 'By', 'excel-ent' ),
		esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
		esc_html( get_the_author() )
	);
}

/**
 * Displays an optional post thumbnail.
 *
 * @param string $size Image size.
 */
function excel_ent_post_thumbnail( $size = 'excel-ent-card' ) {
	if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
		return;
	}

	if ( is_singular() ) :
		?>
		<div class="post-thumbnail">
			<?php the_post_thumbnail( $size ); ?>
		</div>
		<?php
	else :
		?>
		<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
			<?php the_post_thumbnail( $size ); ?>
		</a>
		<?php
	endif;
}

/**
 * Render site brand (custom logo or site title).
 */
function excel_ent_site_brand() {
	if ( has_custom_logo() ) {
		the_custom_logo();
		return;
	}

	printf(
		'<p class="site-title"><a href="%1$s" rel="home">%2$s</a></p>',
		esc_url( home_url( '/' ) ),
		esc_html( get_bloginfo( 'name' ) )
	);
}

/**
 * Fallback menu when no primary menu is assigned.
 */
function excel_ent_fallback_menu() {
	echo '<ul id="primary-menu" class="menu">';
	echo '<li><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'excel-ent' ) . '</a></li>';
	wp_list_pages(
		array(
			'title_li' => '',
			'depth'    => 1,
			'number'   => 5,
		)
	);
	echo '</ul>';
}