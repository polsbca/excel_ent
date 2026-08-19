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

					<div class="site-footer__subscribe">
						<div class="site-footer__subscribe-copy">
							<p class="site-footer__subscribe-label"><?php esc_html_e( 'Get to know our updates:', 'excel-ent' ); ?></p>
							<span class="site-footer__subscribe-line" aria-hidden="true"></span>
						</div>
						<a class="site-footer__subscribe-btn magnetic" href="<?php echo esc_url( home_url( '/#newsletter' ) ); ?>">
							<?php esc_html_e( 'Subscribe', 'excel-ent' ); ?>
						</a>
					</div>
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
