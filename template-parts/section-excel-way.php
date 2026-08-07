<?php
/**
 * The Excel Way section (Figma 898:8606 — How it works).
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
		'id'     => 'packages',
		'label'  => __( 'Packages', 'excel-ent' ),
		'active' => false,
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
		'text'  => __( 'Your artist arrives fully equipped — PA, lighting, PLI covered and PAT tested. Ready to deliver magic', 'excel-ent' ),
	),
);

$excel_ent_way_badges = array(
	array(
		'icon'  => 'star-line.svg',
		'label' => __( 'Every Act Personally Auditioned', 'excel-ent' ),
	),
	array(
		'icon'  => 'map-pin-line.svg',
		'label' => __( 'Last-Minute Booking Available', 'excel-ent' ),
	),
);
?>
<section class="excel-way" id="excel-way" data-excel-way aria-label="<?php esc_attr_e( 'The Excel Way', 'excel-ent' ); ?>">
	<div class="excel-way__media" aria-hidden="true">
		<img
			class="excel-way__bg"
			src="<?php echo esc_url( $excel_ent_way_uri . '/bg.jpg' ); ?>"
			alt=""
			width="1920"
			height="1080"
			loading="lazy"
			decoding="async"
		>
		<span class="excel-way__overlay"></span>
	</div>

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
			<div class="excel-way__intro reveal" data-reveal>
				<p class="excel-way__subtitle"><?php esc_html_e( 'Simple 4-Step Process', 'excel-ent' ); ?></p>
				<p class="excel-way__lede">
					<?php esc_html_e( 'We handle every detail so you can focus on enjoying the event. Booking a top act has never been this straightforward.', 'excel-ent' ); ?>
				</p>
			</div>

			<div class="excel-way__steps reveal" data-reveal>
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

			<div class="excel-way__footer reveal" data-reveal>
				<div class="excel-way__badges">
					<?php foreach ( $excel_ent_way_badges as $excel_ent_badge ) : ?>
						<span class="excel-way-badge">
							<span class="excel-way-badge__icon" aria-hidden="true">
								<img
									src="<?php echo esc_url( $excel_ent_way_uri . '/' . $excel_ent_badge['icon'] ); ?>"
									alt=""
									width="24"
									height="24"
									decoding="async"
								>
							</span>
							<span class="excel-way-badge__label"><?php echo esc_html( $excel_ent_badge['label'] ); ?></span>
						</span>
					<?php endforeach; ?>
				</div>

				<a class="excel-way__cta magnetic" href="<?php echo esc_url( $excel_ent_quote ); ?>">
					<?php esc_html_e( 'Get a quote now', 'excel-ent' ); ?>
				</a>
			</div>
		</div>

		<div
			class="excel-way__panel is-hidden"
			id="excel-way-panel-packages"
			data-excel-way-panel="packages"
			role="tabpanel"
			aria-labelledby="excel-way-tab-packages"
			hidden
		>
			<div class="excel-way__intro">
				<p class="excel-way__subtitle"><?php esc_html_e( 'Packages', 'excel-ent' ); ?></p>
				<p class="excel-way__lede">
					<?php esc_html_e( 'Flexible entertainment packages tailored to weddings, pubs, clubs, and corporate events.', 'excel-ent' ); ?>
				</p>
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
			<div class="excel-way__intro">
				<p class="excel-way__subtitle"><?php esc_html_e( 'Cancellation Protection', 'excel-ent' ); ?></p>
				<p class="excel-way__lede">
					<?php esc_html_e( 'Book with confidence — our cancellation protection keeps your event covered if plans change.', 'excel-ent' ); ?>
				</p>
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
			<div class="excel-way__intro">
				<p class="excel-way__subtitle"><?php esc_html_e( 'Who we are', 'excel-ent' ); ?></p>
				<p class="excel-way__lede">
					<?php esc_html_e( 'Excel Entertainment — personally auditioned artists, guaranteed bookings, and over 25 years on the road.', 'excel-ent' ); ?>
				</p>
			</div>
		</div>
	</div>
</section>
