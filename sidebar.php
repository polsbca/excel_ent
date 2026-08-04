<?php
/**
 * Sidebar template (optional).
 *
 * @package Excel_Ent
 */

if ( ! is_active_sidebar( 'footer-1' ) ) {
	return;
}
?>

<aside id="secondary" class="widget-area" role="complementary">
	<?php dynamic_sidebar( 'footer-1' ); ?>
</aside>
