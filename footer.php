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

				<div class="site-footer__menus">
					<?php excel_ent_footer_column( 'footer-entertainment', __( 'Entertainment', 'excel-ent' ), excel_ent_default_entertainment_links() ); ?>
					<?php excel_ent_footer_column( 'footer-services', __( 'Services', 'excel-ent' ), excel_ent_default_services_links() ); ?>
					<?php excel_ent_footer_column( 'footer-company', __( 'Company', 'excel-ent' ), excel_ent_default_company_links() ); ?>
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
						esc_html__( 'Rocky Stripe Marketing', 'excel-ent' )
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
