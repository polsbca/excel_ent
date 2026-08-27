<?php
/**
 * The footer for our theme.
 *
 * @package Excel_Ent
 */
?>
	</main><!-- #primary -->

	<footer id="colophon" class="site-footer">
		<div class="site-footer__glow" aria-hidden="true"></div>

		<div class="site-footer__inner">
			<div class="site-footer__top">
				<div class="site-footer__brand">
					<?php excel_ent_footer_logo(); ?>
					<p class="site-footer__tagline">
						<?php
						echo esc_html(
							get_theme_mod(
								'excel_ent_footer_tagline',
								__( "The UK's leading entertainment agency — connecting exceptional artists with unforgettable events since 1988", 'excel-ent' )
							)
						);
						?>
					</p>
				</div>

				<div class="site-footer__aside">
					<div class="site-footer__menus">
						<?php
						excel_ent_footer_column(
							'footer-entertainment',
							__( 'Entertainment', 'excel-ent' ),
							excel_ent_default_entertainment_links(),
							array( 'open' => true )
						);
						excel_ent_footer_column(
							'footer-services',
							__( 'Services', 'excel-ent' ),
							excel_ent_default_services_links()
						);
						excel_ent_footer_column(
							'footer-company',
							__( 'Company', 'excel-ent' ),
							excel_ent_default_company_links()
						);
						?>
					</div>

					<form
						class="site-footer__subscribe"
						method="post"
						action="<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>"
						novalidate
						data-newsletter-form
					>
						<input type="hidden" name="action" value="excel_ent_newsletter_subscribe">
						<?php wp_nonce_field( 'excel_ent_newsletter', 'nonce' ); ?>

						<div class="site-footer__subscribe-hp" aria-hidden="true">
							<label for="footer-newsletter-website"><?php esc_html_e( 'Website', 'excel-ent' ); ?></label>
							<input
								type="text"
								id="footer-newsletter-website"
								name="excel_ent_website"
								value=""
								tabindex="-1"
								autocomplete="off"
							>
						</div>

						<div class="site-footer__subscribe-copy">
							<label class="site-footer__subscribe-label" for="footer-newsletter-email">
								<?php esc_html_e( 'Get to know our updates:', 'excel-ent' ); ?>
							</label>
							<input
								id="footer-newsletter-email"
								class="site-footer__subscribe-input"
								type="email"
								name="email"
								placeholder="<?php esc_attr_e( 'Enter your email', 'excel-ent' ); ?>"
								autocomplete="email"
								inputmode="email"
								required
								aria-describedby="footer-newsletter-status"
								aria-invalid="false"
							>
						</div>

						<button class="site-footer__subscribe-btn magnetic" type="submit" data-newsletter-submit>
							<span data-newsletter-submit-label><?php esc_html_e( 'Subscribe', 'excel-ent' ); ?></span>
						</button>

						<p
							id="footer-newsletter-status"
							class="site-footer__subscribe-status"
							role="status"
							aria-live="polite"
							hidden
							data-newsletter-status
						></p>
					</form>
				</div>
			</div>

			<div class="site-footer__bottom">
				<p class="site-footer__copy">
					&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?>
					<?php esc_html_e( 'Excel Entertainment Limited | Warwickshire, UK', 'excel-ent' ); ?>
				</p>
				<p class="site-footer__credit">
					<?php
					printf(
						/* translators: %s: agency name */
						esc_html__( 'Website by %s', 'excel-ent' ),
						esc_html__( 'Funkyvibes Marketing', 'excel-ent' )
					);
					?>
				</p>
			</div>
		</div>
	</footer>
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
