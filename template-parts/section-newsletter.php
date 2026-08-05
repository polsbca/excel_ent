<?php
/**
 * Newsletter / last-minute performer CTA (Figma 1113:2325).
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
			action="<?php echo esc_url( home_url( '/' ) ); ?>"
			novalidate
		>
			<label class="screen-reader-text" for="newsletter-email">
				<?php esc_html_e( 'Email address', 'excel-ent' ); ?>
			</label>
			<input
				id="newsletter-email"
				class="newsletter-cta__input"
				type="email"
				name="excel_ent_newsletter_email"
				placeholder="<?php esc_attr_e( 'ADD YOUR EMAIL', 'excel-ent' ); ?>"
				autocomplete="email"
				required
			>
			<button class="newsletter-cta__submit magnetic" type="submit">
				<?php esc_html_e( 'Subscribe', 'excel-ent' ); ?>
			</button>
		</form>
	</div>
</section>
