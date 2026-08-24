<?php
/**
 * Subscribe popup (Figma 1177:76830).
 * Auto-opens after the front-page hero finishes loading; dismissed for the session.
 *
 * @package Excel_Ent
 */

if ( ! is_front_page() ) {
	return;
}

$excel_ent_close = EXCEL_ENT_URI . '/assets/images/icons/close-large-line.svg';
?>
<div class="subscribe-popup" data-subscribe-popup hidden>
	<button
		type="button"
		class="subscribe-popup__backdrop"
		data-subscribe-popup-close
		aria-label="<?php esc_attr_e( 'Close subscribe popup', 'excel-ent' ); ?>"
	></button>

	<div class="subscribe-popup__shell">
		<div
			class="subscribe-popup__dialog"
			role="dialog"
			aria-modal="true"
			aria-labelledby="subscribe-popup-title"
			data-subscribe-popup-dialog
			tabindex="-1"
		>
			<div class="subscribe-popup__copy">
				<h2 class="subscribe-popup__title" id="subscribe-popup-title">
					<span class="subscribe-popup__title-plain"><?php esc_html_e( 'Need a Last-', 'excel-ent' ); ?></span>
					<span class="subscribe-popup__title-gradient"><?php esc_html_e( 'Minute Performer?', 'excel-ent' ); ?></span>
				</h2>
				<p class="subscribe-popup__lede">
					<?php esc_html_e( 'Get a weekly email featuring available performers, last-minute replacements, and exclusive booking opportunities for your venue.', 'excel-ent' ); ?>
				</p>
			</div>

			<form
				class="subscribe-popup__form"
				method="post"
				action="<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>"
				novalidate
				data-newsletter-form
			>
				<input type="hidden" name="action" value="excel_ent_newsletter_subscribe">
				<?php wp_nonce_field( 'excel_ent_newsletter', 'nonce' ); ?>

				<label class="screen-reader-text" for="subscribe-popup-email">
					<?php esc_html_e( 'Email address', 'excel-ent' ); ?>
				</label>

				<div class="subscribe-popup__hp" aria-hidden="true">
					<label for="subscribe-popup-website"><?php esc_html_e( 'Website', 'excel-ent' ); ?></label>
					<input
						type="text"
						id="subscribe-popup-website"
						name="excel_ent_website"
						value=""
						tabindex="-1"
						autocomplete="off"
					>
				</div>

				<div class="subscribe-popup__field">
					<input
						id="subscribe-popup-email"
						class="subscribe-popup__input"
						type="email"
						name="email"
						placeholder="<?php esc_attr_e( 'ADD YOUR EMAIL', 'excel-ent' ); ?>"
						autocomplete="email"
						inputmode="email"
						required
						aria-describedby="subscribe-popup-status"
						aria-invalid="false"
					>
				</div>

				<button class="subscribe-popup__submit magnetic" type="submit" data-newsletter-submit>
					<span class="subscribe-popup__submit-label" data-newsletter-submit-label><?php esc_html_e( 'Subscribe', 'excel-ent' ); ?></span>
				</button>

				<p
					id="subscribe-popup-status"
					class="subscribe-popup__status"
					role="status"
					aria-live="polite"
					hidden
					data-newsletter-status
				></p>
			</form>
		</div>

		<button
			type="button"
			class="subscribe-popup__close magnetic"
			data-subscribe-popup-close
			aria-label="<?php esc_attr_e( 'Close subscribe popup', 'excel-ent' ); ?>"
		>
			<img
				src="<?php echo esc_url( $excel_ent_close ); ?>"
				alt=""
				width="24"
				height="24"
				decoding="async"
			>
		</button>
	</div>
</div>
