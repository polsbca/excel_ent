<?php
/**
 * Site-wide motion chrome: loader, spotlight, custom cursor.
 *
 * @package Excel_Ent
 */
?>
<div id="ee-loader" class="ee-loader" role="status" aria-live="polite" aria-label="<?php esc_attr_e( 'Loading', 'excel-ent' ); ?>">
	<div class="ee-loader__mark">
		<div class="ee-loader__wave" aria-hidden="true">
			<span></span><span></span><span></span><span></span><span></span><span></span><span></span>
		</div>
		<div class="ee-loader__logo">
			<img
				src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/logo/logo-loader.png' ); ?>"
				alt="<?php esc_attr_e( 'Excel Entertainment', 'excel-ent' ); ?>"
				width="190"
				height="119"
				decoding="sync"
				fetchpriority="high"
			>
		</div>
	</div>
</div>

<div id="ee-spotlight" class="ee-spotlight" aria-hidden="true"></div>

<div id="ee-cursor-ring" class="ee-cursor ee-cursor--ring" aria-hidden="true"></div>
<div id="ee-cursor-dot" class="ee-cursor ee-cursor--dot" aria-hidden="true"></div>
