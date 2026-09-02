<?php
/**
 * Newsletter / last-minute performer CTA (Figma 2202:36025 desktop, 2473:4746 mobile).
 *
 * @package Excel_Ent
 */
?>
<section class="newsletter-cta" id="newsletter" aria-label="<?php esc_attr_e( 'Newsletter signup', 'excel-ent' ); ?>">
	<div class="newsletter-cta__inner reveal" data-reveal>
		<div class="newsletter-cta__copy">
			<h2 class="newsletter-cta__title">
				<span class="newsletter-cta__title-plain"><?php esc_html_e( 'Need a Last-', 'excel-ent' ); ?></span>
				<span class="newsletter-cta__title-gradient"><?php esc_html_e( 'Minute Performer?', 'excel-ent' ); ?></span>
			</h2>
			<p class="newsletter-cta__lede">
				<?php esc_html_e( 'Get a weekly email featuring available performers, last-minute replacements, and exclusive booking opportunities for your venue.', 'excel-ent' ); ?>
			</p>
		</div>

		<form
			class="newsletter-cta__form"
			method="post"
			action="<?php echo esc_url( home_url( '/#newsletter' ) ); ?>"
			novalidate
			data-newsletter-form
		>
			<input type="hidden" name="action" value="excel_ent_newsletter_subscribe">
			<?php wp_nonce_field( 'excel_ent_newsletter', 'nonce' ); ?>

			<label class="screen-reader-text" for="newsletter-email">
				<?php esc_html_e( 'Email address', 'excel-ent' ); ?>
			</label>

			<!-- Honeypot: leave empty -->
			<div class="newsletter-cta__hp" aria-hidden="true">
				<label for="newsletter-website"><?php esc_html_e( 'Website', 'excel-ent' ); ?></label>
				<input
					type="text"
					id="newsletter-website"
					name="excel_ent_website"
					value=""
					tabindex="-1"
					autocomplete="off"
				>
			</div>

			<div class="newsletter-cta__field">
				<img
					class="newsletter-cta__mail"
					src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/icons/envelope-simple.svg' ); ?>"
					alt=""
					width="18"
					height="18"
					decoding="async"
				>
				<input
					id="newsletter-email"
					class="newsletter-cta__input"
					type="email"
					name="email"
					placeholder="<?php esc_attr_e( 'ADD YOUR EMAIL', 'excel-ent' ); ?>"
					data-placeholder-mobile="<?php esc_attr_e( 'name@example.com', 'excel-ent' ); ?>"
					autocomplete="email"
					inputmode="email"
					required
					aria-describedby="newsletter-status"
					aria-invalid="false"
				>
			</div>
			<button class="newsletter-cta__submit magnetic" type="submit" data-newsletter-submit>
				<span class="newsletter-cta__submit-label" data-newsletter-submit-label><?php esc_html_e( 'Subscribe', 'excel-ent' ); ?></span>
			</button>

			<p
				id="newsletter-status"
				class="newsletter-cta__status"
				role="status"
				aria-live="polite"
				hidden
				data-newsletter-status
			></p>
		</form>
	</div>
</section>
