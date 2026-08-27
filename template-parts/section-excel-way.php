<?php
/**
 * The Excel Way section (Figma desktop 2202:30887 / 2202:30945).
 *
 * @package Excel_Ent
 */

$excel_ent_way_uri = EXCEL_ENT_URI . '/assets/images/excel-way';
$excel_ent_quote   = excel_ent_get_quote_url();

$excel_ent_way_tabs = array(
	array(
		'id'     => 'how-it-works',
		'label'  => __( 'How it works', 'excel-ent' ),
		'active' => true,
	),
	array(
		'id'     => 'cancellation',
		'label'  => __( 'Cancellation Protection', 'excel-ent' ),
		'active' => false,
	),
	array(
		'id'     => 'who-we-are',
		'label'  => __( 'Who we are', 'excel-ent' ),
		'active' => false,
	),
);

$excel_ent_way_steps = array(
	array(
		'num'   => '1',
		'title' => __( 'Tell us about your event', 'excel-ent' ),
		'text'  => __( 'Share your event details and choose a minimum of three acts you like, in order of preference.', 'excel-ent' ),
	),
	array(
		'num'   => '2',
		'title' => __( 'We acknowledge your enquiry', 'excel-ent' ),
		'text'  => __( "You'll get an email confirming we've received it, and requesting any extra details we need.", 'excel-ent' ),
	),
	array(
		'num'   => '3',
		'title' => __( 'We check availability', 'excel-ent' ),
		'text'  => __( "We check your top choice first. If they're unavailable, we suggest the next act from your list.", 'excel-ent' ),
	),
	array(
		'num'   => '4',
		'title' => __( 'Invoice sent', 'excel-ent' ),
		'text'  => __( 'Once your act is confirmed, we send an invoice for payment.', 'excel-ent' ),
	),
	array(
		'num'   => '5',
		'title' => __( 'Booking confirmed', 'excel-ent' ),
		'text'  => __( 'Your booking is locked in and we handle every detail from here.', 'excel-ent' ),
	),
);

/* Mobile How it works — Figma 1048:2446 (4 steps). */
$excel_ent_way_steps_mobile = array(
	array(
		'num'   => '1',
		'title' => __( 'Tell Us Your Vision', 'excel-ent' ),
		'text'  => __( 'Share your event type, date, venue, and budget — a quick call or online form is all it takes.', 'excel-ent' ),
	),
	array(
		'num'   => '2',
		'title' => __( 'We Match You', 'excel-ent' ),
		'text'  => __( 'Our team hand-picks auditioned artists from our roster — shortlisted options sent directly to you within 24hrs.', 'excel-ent' ),
	),
	array(
		'num'   => '3',
		'title' => __( 'Confirm & Relax', 'excel-ent' ),
		'text'  => __( 'Approve your chosen act, sign off the details, and leave all coordination entirely to us. Zero stress.', 'excel-ent' ),
	),
	array(
		'num'   => '4',
		'title' => __( 'Enjoy the Show', 'excel-ent' ),
		'text'  => __( 'Your artist arrives fully equipped — PA, lighting, PLI covered and PAT tested. Ready to deliver magic.', 'excel-ent' ),
	),
);

$excel_ent_cancel_steps = array(
	array(
		'num'   => '1',
		'title' => __( 'Rank your top three', 'excel-ent' ),
		'text'  => __( 'Choose your 1st, 2nd and 3rd choice acts when you enquire.', 'excel-ent' ),
	),
	array(
		'num'   => '2',
		'title' => __( 'We book your 1st choice', 'excel-ent' ),
		'text'  => __( 'Your top-ranked act is confirmed for your event.', 'excel-ent' ),
	),
	array(
		'num'   => '3',
		'title' => __( 'We move down your list if needed', 'excel-ent' ),
		'text'  => __( 'If your 1st choice ever cancels, we go straight to your 2nd, then 3rd — no re-searching, no starting over.', 'excel-ent' ),
	),
);

$excel_ent_way_badges = array(
	array(
		'icon'          => 'star-line.svg',
		'label'         => __( 'Every Act Personally Verified', 'excel-ent' ),
		'label_mobile'  => __( 'Every Act Personally Auditioned', 'excel-ent' ),
	),
	array(
		'icon'          => 'map-pin-line.svg',
		'label'         => __( 'Last-Minute Booking Available', 'excel-ent' ),
		'label_mobile'  => __( 'Last-Minute Booking Available', 'excel-ent' ),
	),
);

$excel_ent_who_features = array(
	array(
		array(
			'title' => __( 'Every act personally verified', 'excel-ent' ),
			'text'  => __( 'Seen live or auditioned before joining our roster.', 'excel-ent' ),
		),
		array(
			'title' => __( 'Decades of experience', 'excel-ent' ),
			'text'  => __( 'Long-established, trusted, reliable.', 'excel-ent' ),
		),
	),
	array(
		array(
			'title' => __( 'Last-minute booking available', 'excel-ent' ),
			'text'  => __( 'Fast turnaround when you need it.', 'excel-ent' ),
		),
		array(
			'title' => __( 'Every genre, every occasion', 'excel-ent' ),
			'text'  => __( 'DJs, bands, tribute acts, weddings to corporate.', 'excel-ent' ),
		),
	),
	array(
		array(
			'title' => __( 'Fully insured and safety checked', 'excel-ent' ),
			'text'  => __( 'PLI covered, PAT tested, as standard.', 'excel-ent' ),
		),
		array(
			'title' => __( 'Hands-on support throughout', 'excel-ent' ),
			'text'  => __( 'We manage the details, start to finish.', 'excel-ent' ),
		),
	),
);

/* Mobile Who we are order (Figma 1048:2593). */
$excel_ent_who_features_mobile = array(
	array(
		'title' => __( 'Every act personally verified', 'excel-ent' ),
		'text'  => __( 'Seen live or auditioned before joining our roster.', 'excel-ent' ),
	),
	array(
		'title' => __( 'Last-minute booking available', 'excel-ent' ),
		'text'  => __( 'Fast turnaround when you need it.', 'excel-ent' ),
	),
	array(
		'title' => __( 'Fully insured and safety checked', 'excel-ent' ),
		'text'  => __( 'PLI covered, PAT tested, as standard.', 'excel-ent' ),
	),
	array(
		'title' => __( 'Decades of experience', 'excel-ent' ),
		'text'  => __( 'Long-established, trusted, reliable.', 'excel-ent' ),
	),
	array(
		'title' => __( 'Every genre, every occasion', 'excel-ent' ),
		'text'  => __( 'DJs, bands, tribute acts, weddings to corporate.', 'excel-ent' ),
	),
	array(
		'title' => __( 'Hands-on support throughout', 'excel-ent' ),
		'text'  => __( 'We manage the details, start to finish.', 'excel-ent' ),
	),
);

$excel_ent_cancel_lede = __( "When you enquire, you choose your top three acts and rank them in order of preference. We book your 1st choice for your event.\nIf they're ever unable to perform, we simply move down to your 2nd choice, then your 3rd — acts you already picked and wanted, not a scramble to start over.", 'excel-ent' );

/**
 * Render shared trust badges.
 *
 * @param array $badges Badge items.
 */
$excel_ent_render_badges = static function ( $badges, $way_uri ) {
	?>
	<div class="excel-way__badges">
		<?php foreach ( $badges as $badge ) : ?>
			<span class="excel-way-badge">
				<span class="excel-way-badge__icon" aria-hidden="true">
					<img
						src="<?php echo esc_url( $way_uri . '/' . $badge['icon'] ); ?>"
						alt=""
						width="24"
						height="24"
						decoding="async"
					>
				</span>
				<span class="excel-way-badge__label excel-way-badge__label--desktop"><?php echo esc_html( $badge['label'] ); ?></span>
				<span class="excel-way-badge__label excel-way-badge__label--mobile"><?php echo esc_html( $badge['label_mobile'] ); ?></span>
			</span>
		<?php endforeach; ?>
	</div>
	<?php
};
?>
<div class="excel-way-pin" data-excel-way-pin>
	<div class="excel-way__scroll-pad" aria-hidden="true"></div>
<section class="excel-way" id="excel-way" data-excel-way aria-label="<?php esc_attr_e( 'The Excel Way', 'excel-ent' ); ?>">
	<div class="excel-way__inner">
		<header class="excel-way__header reveal" data-reveal>
			<h2 class="excel-way__title"><?php esc_html_e( 'THE EXCEL WAY', 'excel-ent' ); ?></h2>

			<div class="excel-way__tabs" role="tablist" aria-label="<?php esc_attr_e( 'Excel Way topics', 'excel-ent' ); ?>">
				<?php foreach ( $excel_ent_way_tabs as $excel_ent_tab ) : ?>
					<button
						type="button"
						class="excel-way-tab magnetic<?php echo ! empty( $excel_ent_tab['active'] ) ? ' excel-way-tab--active' : ''; ?>"
						id="excel-way-tab-<?php echo esc_attr( $excel_ent_tab['id'] ); ?>"
						data-excel-way-tab="<?php echo esc_attr( $excel_ent_tab['id'] ); ?>"
						role="tab"
						aria-selected="<?php echo ! empty( $excel_ent_tab['active'] ) ? 'true' : 'false'; ?>"
						aria-controls="excel-way-panel-<?php echo esc_attr( $excel_ent_tab['id'] ); ?>"
					>
						<?php echo esc_html( $excel_ent_tab['label'] ); ?>
					</button>
				<?php endforeach; ?>
			</div>
		</header>

		<div
			class="excel-way__panel"
			id="excel-way-panel-how-it-works"
			data-excel-way-panel="how-it-works"
			role="tabpanel"
			aria-labelledby="excel-way-tab-how-it-works"
		>
			<div class="excel-way__stack excel-way__stack--how">
				<div class="excel-way__intro reveal" data-reveal>
					<p class="excel-way__subtitle excel-way__subtitle--desktop"><?php esc_html_e( 'Five Step Process', 'excel-ent' ); ?></p>
					<p class="excel-way__subtitle excel-way__subtitle--mobile"><?php esc_html_e( 'Simple 4-Step Process', 'excel-ent' ); ?></p>
					<p class="excel-way__lede">
						<?php esc_html_e( 'We handle every detail so you can focus on enjoying the event. Booking a top act has never been this straightforward.', 'excel-ent' ); ?>
					</p>
				</div>

				<div class="excel-way__process reveal" data-reveal>
					<div class="excel-way__steps excel-way__steps--how excel-way__steps--desktop">
						<?php foreach ( $excel_ent_way_steps as $excel_ent_step ) : ?>
							<article class="excel-way-step">
								<div class="excel-way-step__inner">
									<span class="excel-way-step__num" aria-hidden="true"><?php echo esc_html( $excel_ent_step['num'] ); ?></span>
									<div class="excel-way-step__copy">
										<h3 class="excel-way-step__title"><?php echo esc_html( $excel_ent_step['title'] ); ?></h3>
										<p class="excel-way-step__text"><?php echo esc_html( $excel_ent_step['text'] ); ?></p>
									</div>
								</div>
							</article>
						<?php endforeach; ?>
					</div>

					<div class="excel-way__steps excel-way__steps--how excel-way__steps--mobile">
						<?php foreach ( $excel_ent_way_steps_mobile as $excel_ent_step ) : ?>
							<article class="excel-way-step">
								<div class="excel-way-step__inner">
									<span class="excel-way-step__num" aria-hidden="true"><?php echo esc_html( $excel_ent_step['num'] ); ?></span>
									<div class="excel-way-step__copy">
										<h3 class="excel-way-step__title"><?php echo esc_html( $excel_ent_step['title'] ); ?></h3>
										<p class="excel-way-step__text"><?php echo esc_html( $excel_ent_step['text'] ); ?></p>
									</div>
								</div>
							</article>
						<?php endforeach; ?>
					</div>

					<div class="excel-way__badges excel-way__badges--how-mobile">
						<?php
						foreach ( $excel_ent_way_badges as $badge ) :
							?>
							<span class="excel-way-badge">
								<span class="excel-way-badge__icon" aria-hidden="true">
									<img
										src="<?php echo esc_url( $excel_ent_way_uri . '/' . $badge['icon'] ); ?>"
										alt=""
										width="24"
										height="24"
										decoding="async"
									>
								</span>
								<span class="excel-way-badge__label"><?php echo esc_html( $badge['label_mobile'] ); ?></span>
							</span>
							<?php
						endforeach;
						?>
					</div>
				</div>
			</div>

			<div class="excel-way__footer excel-way__footer--how reveal" data-reveal>
				<a class="excel-way__cta magnetic" href="<?php echo esc_url( $excel_ent_quote ); ?>">
					<?php esc_html_e( 'Get a quote now', 'excel-ent' ); ?>
				</a>
				<?php $excel_ent_render_badges( $excel_ent_way_badges, $excel_ent_way_uri ); ?>
			</div>
		</div>

		<div
			class="excel-way__panel is-hidden"
			id="excel-way-panel-cancellation"
			data-excel-way-panel="cancellation"
			role="tabpanel"
			aria-labelledby="excel-way-tab-cancellation"
			hidden
		>
			<div class="excel-way__intro excel-way__intro--cancel reveal" data-reveal>
				<p class="excel-way__subtitle excel-way__subtitle--cancel">
					<?php esc_html_e( "You're covered, even if your first choice can't make it", 'excel-ent' ); ?>
				</p>
				<p class="excel-way__lede excel-way__lede--cancel">
					<?php echo nl2br( esc_html( $excel_ent_cancel_lede ) ); ?>
				</p>
			</div>

			<div class="excel-way__steps excel-way__steps--cancel reveal" data-reveal>
				<?php foreach ( $excel_ent_cancel_steps as $excel_ent_step ) : ?>
					<article class="excel-way-step">
						<div class="excel-way-step__inner">
							<span class="excel-way-step__num" aria-hidden="true"><?php echo esc_html( $excel_ent_step['num'] ); ?></span>
							<div class="excel-way-step__copy">
								<h3 class="excel-way-step__title"><?php echo esc_html( $excel_ent_step['title'] ); ?></h3>
								<p class="excel-way-step__text"><?php echo esc_html( $excel_ent_step['text'] ); ?></p>
							</div>
						</div>
					</article>
				<?php endforeach; ?>
			</div>

			<div class="excel-way__footer excel-way__footer--cancel reveal" data-reveal>
				<p class="excel-way-notice">
					<img
						class="excel-way-notice__icon"
						src="<?php echo esc_url( $excel_ent_way_uri . '/star-line.svg' ); ?>"
						alt=""
						width="16"
						height="16"
						decoding="async"
					>
					<span><?php esc_html_e( 'This protection is included on every booking made through Excel Entertainment — no premium plan required.', 'excel-ent' ); ?></span>
				</p>
				<?php $excel_ent_render_badges( $excel_ent_way_badges, $excel_ent_way_uri ); ?>
				<a class="excel-way__cta magnetic" href="<?php echo esc_url( $excel_ent_quote ); ?>">
					<?php esc_html_e( 'Get a quote now', 'excel-ent' ); ?>
				</a>
			</div>
		</div>

		<div
			class="excel-way__panel is-hidden"
			id="excel-way-panel-who-we-are"
			data-excel-way-panel="who-we-are"
			role="tabpanel"
			aria-labelledby="excel-way-tab-who-we-are"
			hidden
		>
			<div class="excel-way-about reveal" data-reveal>
				<div class="excel-way-about__intro">
					<h3 class="excel-way-about__title"><?php esc_html_e( 'Who we are', 'excel-ent' ); ?></h3>
					<p class="excel-way-about__lede">
						<?php echo nl2br( esc_html( $excel_ent_cancel_lede ) ); ?>
					</p>
				</div>

				<div class="excel-way-about__grid excel-way-about__grid--desktop">
					<?php foreach ( $excel_ent_who_features as $excel_ent_column ) : ?>
						<div class="excel-way-about__col">
							<?php foreach ( $excel_ent_column as $excel_ent_feature_index => $excel_ent_feature ) : ?>
								<?php if ( $excel_ent_feature_index > 0 ) : ?>
									<span class="excel-way-about__rule" aria-hidden="true"></span>
								<?php endif; ?>
								<div class="excel-way-about__item">
									<span class="excel-way-about__icon" aria-hidden="true">
										<img
											src="<?php echo esc_url( $excel_ent_way_uri . '/hand-heart-fill.svg' ); ?>"
											alt=""
											width="45"
											height="45"
											decoding="async"
										>
									</span>
									<div class="excel-way-about__copy">
										<h4 class="excel-way-about__item-title"><?php echo esc_html( $excel_ent_feature['title'] ); ?></h4>
										<p class="excel-way-about__item-text"><?php echo esc_html( $excel_ent_feature['text'] ); ?></p>
									</div>
								</div>
							<?php endforeach; ?>
						</div>
					<?php endforeach; ?>
				</div>

				<div class="excel-way-about__list excel-way-about__list--mobile">
					<?php foreach ( $excel_ent_who_features_mobile as $excel_ent_feature ) : ?>
						<div class="excel-way-about__item">
							<span class="excel-way-about__icon" aria-hidden="true">
								<img
									src="<?php echo esc_url( $excel_ent_way_uri . '/hand-heart-fill.svg' ); ?>"
									alt=""
									width="20"
									height="20"
									decoding="async"
								>
							</span>
							<div class="excel-way-about__copy">
								<h4 class="excel-way-about__item-title"><?php echo esc_html( $excel_ent_feature['title'] ); ?></h4>
								<p class="excel-way-about__item-text"><?php echo esc_html( $excel_ent_feature['text'] ); ?></p>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
			</div>

			<div class="excel-way__footer excel-way__footer--who reveal" data-reveal>
				<?php $excel_ent_render_badges( $excel_ent_way_badges, $excel_ent_way_uri ); ?>
				<a class="excel-way__cta magnetic" href="<?php echo esc_url( $excel_ent_quote ); ?>">
					<?php esc_html_e( 'Get a quote now', 'excel-ent' ); ?>
				</a>
			</div>
		</div>
	</div>
</section>
</div>
