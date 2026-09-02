<?php
/**
 * Packages page content — Figma desktop 1464:3103 / 1126:2252 / tablet 1104:6130 / mobile 1023:10624
 *
 * @package Excel_Ent
 */

$excel_ent_quote = excel_ent_get_quote_url();
$excel_ent_note  = __( '(Depending on distance and hours booked) Discounts available for referrals to other venues and future events', 'excel-ent' );

$excel_ent_wedding = array(
	array(
		'name'     => __( 'Bronze', 'excel-ent' ),
		'mod'      => 'bronze',
		'price'    => array(
			'main'          => '£75',
			'suffix'        => __( 'ph', 'excel-ent' ),
			'suffix_detail' => __( '(min 4 hr - £50/hr thereafter)', 'excel-ent' ),
		),
		'features' => array(
			__( 'A professional wedding DJ with high-quality PA equipment and lighting, all fully PAT tested and compliant with current industry regulations.', 'excel-ent' ),
			__( 'Your DJ will provide a carefully selected mix of music to entertain guests of all ages, creating the perfect atmosphere throughout your celebration.', 'excel-ent' ),
			__( "You're welcome to provide a full playlist, a selection of favourite songs, or a list of music you'd prefer not to hear. Alternatively, you can leave the music selection to your experienced DJ, who will read the room and tailor the entertainment to keep your dance floor full all evening.", 'excel-ent' ),
			__( 'Professional sound, lighting and seamless entertainment are included as standard, ensuring your wedding reception runs smoothly from start to finish.', 'excel-ent' ),
		),
	),
	array(
		'name'     => __( 'Silver', 'excel-ent' ),
		'mod'      => 'silver',
		'price'    => array(
			'main'   => '£350',
			'suffix' => '',
		),
		'features' => array(
			__( 'A professional live entertainer performing at your wedding to create the perfect atmosphere and provide unforgettable entertainment for you and your guests.', 'excel-ent' ),
			__( "We offer an extensive choice of solo singers, duos, live bands, themed shows and speciality acts to suit every style of wedding and musical taste. Whether you're looking for elegant background music, upbeat party classics or a high-energy evening performance, we can help you find the perfect act.", 'excel-ent' ),
			__( 'Our performers typically provide either 2 x 45-minute or 2 x 60-minute live sets, with all professional PA equipment and lighting included where required.', 'excel-ent' ),
		),
	),
	array(
		'name'     => __( 'Gold', 'excel-ent' ),
		'mod'      => 'gold',
		'price'    => array(
			'main'   => '£750',
			'suffix' => '',
		),
		'features' => array(
			__( 'This package is tailor-made for your wedding, creating a truly memorable entertainment experience for you and your guests.', 'excel-ent' ),
			__( 'It combines the services of a professional DJ with a live vocalist, providing up to five hours of seamless entertainment throughout your evening.', 'excel-ent' ),
			__( 'Choose from our extensive selection of talented singers, with your DJ working alongside the live performer to ensure smooth transitions and a packed dance floor from start to finish.', 'excel-ent' ),
			__( 'This is one of our most popular wedding packages. Your DJ will begin the evening before introducing the live vocalist for the first performance set. The DJ will then continue the entertainment before the second live set, finishing the night with an outstanding mix of floor-filling classics and party favourites to keep your guests dancing until the very end.', 'excel-ent' ),
		),
	),
	array(
		'name'     => __( 'Platinum', 'excel-ent' ),
		'mod'      => 'platinum',
		'featured' => true,
		'price'    => array(
			'main'   => '£999',
			'suffix' => '',
		),
		'features' => array(
			__( 'If you want to provide an unforgettable entertainment experience that will keep your guests on the dance floor and talking about your wedding for weeks afterwards, a professional covers and function band is the perfect choice.', 'excel-ent' ),
			__( 'Performing an exciting mix of timeless classics and modern chart favourites, our experienced live bands create an incredible atmosphere from the first dance through to the final encore. Their versatile repertoire appeals to all ages, ensuring everyone has something to enjoy.', 'excel-ent' ),
			__( "Whether you're looking for pop, rock, soul, Motown, indie, funk, disco or party anthems, our professional musicians deliver outstanding live performances with exceptional sound and energy.", 'excel-ent' ),
			__( 'Available in a variety of line-ups to suit your venue and budget, our function bands can also be combined with a professional DJ to provide seamless entertainment throughout your entire evening, keeping the party going until the very end.', 'excel-ent' ),
		),
	),
);

$excel_ent_bulk = array(
	array(
		'name'     => __( 'Venue Residencies', 'excel-ent' ),
		'mod'      => 'bronze',
		'price'    => array(
			'main'   => __( 'Custom', 'excel-ent' ),
			'suffix' => '',
			'alt'    => __( 'Weekly / monthly entertainment schedules', 'excel-ent' ),
		),
		'features' => array(
			__( 'Structured midweek and weekend entertainment programmes designed to lift footfall and bar spend.', 'excel-ent' ),
			__( 'Fully vetted artists with backup cover guarantee across your residency calendar.', 'excel-ent' ),
			__( 'Flexible booking with no fixed-term contracts — scale nights up or down as trade demands.', 'excel-ent' ),
			__( 'Marketing support to promote recurring event nights at your venue.', 'excel-ent' ),
		),
	),
	array(
		'name'     => __( 'Multi-Venue', 'excel-ent' ),
		'mod'      => 'silver',
		'price'    => array(
			'main'   => __( 'Quote', 'excel-ent' ),
			'suffix' => '',
			'alt'    => __( 'Group rates across your estate', 'excel-ent' ),
		),
		'features' => array(
			__( 'Centralised booking for pub groups, hotel groups, and multi-site operators.', 'excel-ent' ),
			__( 'Consistent entertainment standards across every site with personally auditioned acts.', 'excel-ent' ),
			__( 'Volume pricing and simplified invoicing for estates with regular entertainment needs.', 'excel-ent' ),
			__( 'Dedicated account contact for fast communication and last-minute cover.', 'excel-ent' ),
		),
	),
	array(
		'name'     => __( 'Seasonal Series', 'excel-ent' ),
		'mod'      => 'gold',
		'price'    => array(
			'main'   => __( 'Series', 'excel-ent' ),
			'suffix' => '',
			'alt'    => __( 'Themed nights & campaign packages', 'excel-ent' ),
		),
		'features' => array(
			__( 'Build repeatable event nights — Weekend Party Nights, Sunday Sessions, and seasonal themes.', 'excel-ent' ),
			__( 'Trial nights to test what works with low risk before committing to a full series.', 'excel-ent' ),
			__( 'Artist roster matched to your audience, location, and brand.', 'excel-ent' ),
			__( 'Promotion assets and messaging support so every night feels consistent.', 'excel-ent' ),
		),
	),
	array(
		'name'     => __( 'Enterprise', 'excel-ent' ),
		'mod'      => 'platinum',
		'featured' => true,
		'price'    => array(
			'main'   => __( 'Partner', 'excel-ent' ),
			'suffix' => '',
			'alt'    => __( 'Long-term entertainment partnership', 'excel-ent' ),
		),
		'features' => array(
			__( 'A dedicated entertainment partnership for large operators who need reliability at scale.', 'excel-ent' ),
			__( 'Priority artist allocation, PLI & PAT-certified equipment, and guaranteed cover.', 'excel-ent' ),
			__( 'Strategic planning for footfall, dwell time, and repeat visits across your venues.', 'excel-ent' ),
			__( 'Bespoke reporting and a single point of contact for your whole estate.', 'excel-ent' ),
		),
	),
);

/**
 * Render a package card.
 *
 * @param array  $package Package data.
 * @param string $note    Shared pricing note.
 * @param string $quote   Enquiry URL (unused — enquiry opens modal).
 * @param int    $index   Card index for stagger.
 * @param string $group   Tab group id (wedding|bulk).
 */
$excel_ent_render_card = static function ( $package, $note, $quote, $index, $group = 'wedding' ) {
	$featured = ! empty( $package['featured'] );
	$mod      = isset( $package['mod'] ) ? $package['mod'] : '';
	$pkg_id   = $group . '-' . $mod;
	$price_label = $package['price']['main'];
	if ( ! empty( $package['price']['suffix'] ) ) {
		$price_label .= ' ' . $package['price']['suffix'];
	}
	$selected_label = sprintf(
		/* translators: 1: package name, 2: price */
		__( '%1$s from %2$s', 'excel-ent' ),
		$package['name'],
		$price_label
	);
	$excel_ent_pkg_uri = EXCEL_ENT_URI . '/assets/images/package-page';
	?>
	<article
		class="package-card<?php echo $featured ? ' package-card--featured' : ''; ?> package-card--<?php echo esc_attr( $mod ); ?> reveal"
		data-reveal
		data-package-card
		data-package-id="<?php echo esc_attr( $pkg_id ); ?>"
		data-package-group="<?php echo esc_attr( $group ); ?>"
		data-package-name="<?php echo esc_attr( $package['name'] ); ?>"
		data-package-price="<?php echo esc_attr( $price_label ); ?>"
		style="--i: <?php echo esc_attr( (string) $index ); ?>; transition-delay: <?php echo esc_attr( (string) ( $index * 80 ) ); ?>ms"
	>
		<div class="package-card__top">
			<div class="package-card__identity">
				<h3 class="package-card__name"><?php echo esc_html( $package['name'] ); ?></h3>
				<p class="package-card__from"><?php esc_html_e( 'Prices start from:', 'excel-ent' ); ?></p>
			</div>
			<div class="package-card__pricing">
				<p class="package-card__price">
					<span class="package-card__price-main"><?php echo esc_html( $package['price']['main'] ); ?></span>
					<?php if ( ! empty( $package['price']['suffix'] ) ) : ?>
						<span class="package-card__price-suffix"><?php echo esc_html( $package['price']['suffix'] ); ?></span>
					<?php endif; ?>
					<?php if ( ! empty( $package['price']['suffix_detail'] ) ) : ?>
						<span class="package-card__price-suffix-detail"><?php echo esc_html( $package['price']['suffix_detail'] ); ?></span>
					<?php endif; ?>
				</p>
				<?php if ( ! empty( $package['price']['alt'] ) ) : ?>
					<p class="package-card__alt"><?php echo esc_html( $package['price']['alt'] ); ?></p>
				<?php endif; ?>
				<p class="package-card__note"><?php echo esc_html( $note ); ?></p>
			</div>
		</div>

		<div class="package-card__body">
			<p class="package-card__includes"><?php esc_html_e( 'This includes:', 'excel-ent' ); ?></p>
			<ul class="package-card__features">
				<?php foreach ( $package['features'] as $feature ) : ?>
					<li><?php echo esc_html( $feature ); ?></li>
				<?php endforeach; ?>
			</ul>
		</div>

		<button
			type="button"
			class="package-card__more"
			data-package-more
			data-package-id="<?php echo esc_attr( $pkg_id ); ?>"
			aria-expanded="false"
		>
			<span class="package-card__more-label" data-package-more-label><?php esc_html_e( 'Read more', 'excel-ent' ); ?></span>
			<span class="package-card__more-icons" aria-hidden="true">
				<img
					class="package-card__more-icon package-card__more-icon--add"
					src="<?php echo esc_url( $excel_ent_pkg_uri . '/add-fill.svg' ); ?>"
					alt=""
					width="24"
					height="24"
					decoding="async"
				>
				<img
					class="package-card__more-icon package-card__more-icon--remove"
					src="<?php echo esc_url( $excel_ent_pkg_uri . '/remove-fill.svg' ); ?>"
					alt=""
					width="22"
					height="22"
					decoding="async"
					hidden
				>
			</span>
		</button>

		<button
			type="button"
			class="package-card__btn<?php echo $featured ? ' package-card__btn--gradient' : ''; ?> magnetic"
			data-package-enquiry
			data-package-name="<?php echo esc_attr( $package['name'] ); ?>"
			data-package-label="<?php echo esc_attr( $selected_label ); ?>"
		>
			<span class="package-card__btn-label-desktop"><?php esc_html_e( 'Start Your Enquiry', 'excel-ent' ); ?></span>
			<span class="package-card__btn-label-mobile"><?php esc_html_e( 'Start Enquiry', 'excel-ent' ); ?></span>
		</button>
	</article>
	<?php
};

$excel_ent_catalog_map = static function ( $packages, $group, $note ) {
	$out = array();
	foreach ( $packages as $package ) {
		$mod = isset( $package['mod'] ) ? $package['mod'] : '';
		$price_label = $package['price']['main'];
		if ( ! empty( $package['price']['suffix'] ) ) {
			$price_label .= ' ' . $package['price']['suffix'];
		}
		$out[ $group . '-' . $mod ] = array(
			'id'       => $group . '-' . $mod,
			'group'    => $group,
			'name'     => $package['name'],
			'main'     => $package['price']['main'],
			'suffix'        => isset( $package['price']['suffix'] ) ? $package['price']['suffix'] : '',
			'suffix_detail' => isset( $package['price']['suffix_detail'] ) ? $package['price']['suffix_detail'] : '',
			'alt'           => isset( $package['price']['alt'] ) ? $package['price']['alt'] : '',
			'note'     => $note,
			'features' => $package['features'],
			'label'    => sprintf(
				/* translators: 1: package name, 2: price */
				__( '%1$s from %2$s', 'excel-ent' ),
				$package['name'],
				$price_label
			),
		);
	}
	return $out;
};

$excel_ent_compare_catalog = array_merge(
	$excel_ent_catalog_map( $excel_ent_wedding, 'wedding', $excel_ent_note ),
	$excel_ent_catalog_map( $excel_ent_bulk, 'bulk', $excel_ent_note )
);
$excel_ent_pkg_uri = EXCEL_ENT_URI . '/assets/images/package-page';
?>

<section
	class="package-intro"
	aria-label="<?php esc_attr_e( 'Event packages', 'excel-ent' ); ?>"
	data-package-tabs
	data-read-more="<?php echo esc_attr( __( 'Read more', 'excel-ent' ) ); ?>"
	data-read-less="<?php echo esc_attr( __( 'Read less', 'excel-ent' ) ); ?>"
>
	<div class="package-intro__inner">
	<header class="package-intro__header">
		<h1 class="package-intro__title"><?php esc_html_e( 'PACKAGES', 'excel-ent' ); ?></h1>
		<p class="package-intro__lede">
			<?php esc_html_e( "From intimate gallery openings to stadium-scale productions, we've designed our tiers to be the foundation of a memorable experience. Pick your base, then let's get specific.", 'excel-ent' ); ?>
		</p>
		<div class="package-intro__tabs" role="tablist" aria-label="<?php esc_attr_e( 'Package types', 'excel-ent' ); ?>">
			<button
				type="button"
				class="package-intro__tab is-active"
				role="tab"
				id="package-tab-wedding"
				aria-selected="true"
				aria-controls="package-panel-wedding"
				data-package-tab="wedding"
			>
				<?php esc_html_e( 'Wedding', 'excel-ent' ); ?>
			</button>
			<button
				type="button"
				class="package-intro__tab"
				role="tab"
				id="package-tab-bulk"
				aria-selected="false"
				aria-controls="package-panel-bulk"
				data-package-tab="bulk"
			>
				<?php esc_html_e( 'Bulk Booking', 'excel-ent' ); ?>
			</button>
		</div>
	</header>

	<div
		class="package-panel is-active"
		id="package-panel-wedding"
		role="tabpanel"
		aria-labelledby="package-tab-wedding"
		data-package-panel="wedding"
	>
		<p class="package-panel__lede reveal" data-reveal>
			<?php esc_html_e( "Make your special day unforgettable with Excel Entertainment's bespoke wedding packages, tailored to create the perfect atmosphere for your celebration.", 'excel-ent' ); ?>
		</p>
		<div class="package-grid-wrap">
			<div class="package-grid stagger">
				<?php foreach ( $excel_ent_wedding as $excel_ent_i => $excel_ent_pkg ) : ?>
					<?php $excel_ent_render_card( $excel_ent_pkg, $excel_ent_note, $excel_ent_quote, $excel_ent_i, 'wedding' ); ?>
				<?php endforeach; ?>
			</div>
			<div class="package-grid__rail" aria-hidden="true"><span></span></div>
		</div>
		<div class="package-selected">
			<div class="package-selected__copy">
				<h2><?php esc_html_e( 'Platinum', 'excel-ent' ); ?></h2>
				<p><?php esc_html_e( 'Prices start from: £999', 'excel-ent' ); ?></p>
			</div>
			<button
				type="button"
				class="package-selected__btn magnetic"
				data-package-enquiry
				data-package-name="<?php esc_attr_e( 'Platinum', 'excel-ent' ); ?>"
				data-package-label="<?php esc_attr_e( 'Platinum from £999', 'excel-ent' ); ?>"
			>
				<?php esc_html_e( 'Start Enquiry', 'excel-ent' ); ?>
			</button>
		</div>
	</div>

	<div
		class="package-panel"
		id="package-panel-bulk"
		role="tabpanel"
		aria-labelledby="package-tab-bulk"
		data-package-panel="bulk"
		hidden
	>
		<p class="package-panel__lede reveal" data-reveal>
			<?php esc_html_e( 'Reliable entertainment at scale for pubs, hotels, and multi-site venues — with vetted artists, flexible scheduling, and backup cover built in.', 'excel-ent' ); ?>
		</p>
		<div class="package-grid-wrap">
			<div class="package-grid stagger">
				<?php foreach ( $excel_ent_bulk as $excel_ent_i => $excel_ent_pkg ) : ?>
					<?php $excel_ent_render_card( $excel_ent_pkg, $excel_ent_note, $excel_ent_quote, $excel_ent_i, 'bulk' ); ?>
				<?php endforeach; ?>
			</div>
			<div class="package-grid__rail" aria-hidden="true"><span></span></div>
		</div>
		<div class="package-selected">
			<div class="package-selected__copy">
				<h2><?php esc_html_e( 'Enterprise', 'excel-ent' ); ?></h2>
				<p><?php esc_html_e( 'Prices start from: Partner', 'excel-ent' ); ?></p>
			</div>
			<button
				type="button"
				class="package-selected__btn magnetic"
				data-package-enquiry
				data-package-name="<?php esc_attr_e( 'Enterprise', 'excel-ent' ); ?>"
				data-package-label="<?php esc_attr_e( 'Enterprise from Partner', 'excel-ent' ); ?>"
			>
				<?php esc_html_e( 'Start Enquiry', 'excel-ent' ); ?>
			</button>
		</div>
	</div>
	</div>
</section>

<script type="application/json" data-package-catalog><?php echo wp_json_encode( $excel_ent_compare_catalog ); ?></script>

<!-- Compare modal (Figma mobile 1487:13435 / tablet 1104:5783) -->
<div class="package-compare" data-package-compare hidden>
	<div class="package-compare__backdrop" data-package-compare-close tabindex="-1"></div>
	<div
		class="package-compare__dialog"
		role="dialog"
		aria-modal="true"
		aria-labelledby="package-compare-title"
		data-package-compare-dialog
	>
		<header class="package-compare__bar">
			<button type="button" class="package-compare__close-text" data-package-compare-close>
				<?php esc_html_e( 'Close', 'excel-ent' ); ?>
			</button>
			<button
				type="button"
				class="package-compare__close-icon"
				aria-label="<?php esc_attr_e( 'Close compare', 'excel-ent' ); ?>"
				data-package-compare-close
			>
				<img src="<?php echo esc_url( $excel_ent_pkg_uri . '/close-x.svg' ); ?>" alt="" width="24" height="24" decoding="async">
			</button>
		</header>

		<div class="package-compare__scroll">
			<div class="package-compare__pickers">
				<div class="package-compare__picker-wrap">
					<button type="button" class="package-compare__picker package-compare__picker--a is-filled" data-compare-picker="a" aria-haspopup="listbox" aria-expanded="false">
						<span class="package-compare__picker-meta">
							<span class="package-compare__picker-label"><?php esc_html_e( 'Option A', 'excel-ent' ); ?></span>
							<span class="package-compare__picker-value" data-compare-a-name><?php esc_html_e( 'Bronze', 'excel-ent' ); ?></span>
						</span>
						<img class="package-compare__picker-chevron package-compare__picker-chevron--white" src="<?php echo esc_url( $excel_ent_pkg_uri . '/arrow-drop-down-white.svg' ); ?>" alt="" width="24" height="24" decoding="async">
						<img class="package-compare__picker-chevron package-compare__picker-chevron--dark" src="<?php echo esc_url( $excel_ent_pkg_uri . '/arrow-drop-down.svg' ); ?>" alt="" width="24" height="24" decoding="async" hidden>
					</button>
					<ul class="package-compare__menu" data-compare-menu="a" role="listbox" hidden></ul>
				</div>

				<button type="button" class="package-compare__swap" data-compare-swap aria-label="<?php esc_attr_e( 'Swap packages', 'excel-ent' ); ?>">
					<img src="<?php echo esc_url( $excel_ent_pkg_uri . '/arrow-left-right.svg' ); ?>" alt="" width="24" height="24" decoding="async">
				</button>

				<div class="package-compare__picker-wrap">
					<button type="button" class="package-compare__picker package-compare__picker--b" data-compare-picker="b" aria-haspopup="listbox" aria-expanded="false">
						<span class="package-compare__picker-meta">
							<span class="package-compare__picker-label"><?php esc_html_e( 'Option B', 'excel-ent' ); ?></span>
							<span class="package-compare__picker-value" data-compare-b-name><?php esc_html_e( 'Select', 'excel-ent' ); ?></span>
						</span>
						<img class="package-compare__picker-chevron package-compare__picker-chevron--white" src="<?php echo esc_url( $excel_ent_pkg_uri . '/arrow-drop-down-white.svg' ); ?>" alt="" width="24" height="24" decoding="async" hidden>
						<img class="package-compare__picker-chevron package-compare__picker-chevron--dark" src="<?php echo esc_url( $excel_ent_pkg_uri . '/arrow-drop-down.svg' ); ?>" alt="" width="24" height="24" decoding="async">
					</button>
					<ul class="package-compare__menu" data-compare-menu="b" role="listbox" hidden></ul>
				</div>
			</div>

			<div class="package-compare__panels" data-compare-panels>
				<article class="package-compare__panel" data-compare-panel="a" id="package-compare-title">
					<header class="package-compare__panel-head">
						<h3 class="package-compare__panel-name" data-compare-name></h3>
						<p class="package-compare__panel-from"><?php esc_html_e( 'Prices start from:', 'excel-ent' ); ?></p>
					</header>
					<div class="package-compare__panel-price">
						<p class="package-compare__panel-amount">
							<span data-compare-main></span>
							<span class="package-compare__panel-suffix" data-compare-suffix></span>
						</p>
						<p class="package-compare__panel-note" data-compare-note></p>
					</div>
					<div class="package-compare__panel-includes">
						<p><?php esc_html_e( 'This includes:', 'excel-ent' ); ?></p>
						<ul data-compare-features></ul>
					</div>
					<button type="button" class="package-compare__enquiry" data-compare-enquiry data-side="a">
						<?php esc_html_e( 'Start Enquiry', 'excel-ent' ); ?>
					</button>
				</article>

				<article class="package-compare__panel" data-compare-panel="b" hidden>
					<header class="package-compare__panel-head">
						<h3 class="package-compare__panel-name" data-compare-name></h3>
						<p class="package-compare__panel-from"><?php esc_html_e( 'Prices start from:', 'excel-ent' ); ?></p>
					</header>
					<div class="package-compare__panel-price">
						<p class="package-compare__panel-amount">
							<span data-compare-main></span>
							<span class="package-compare__panel-suffix" data-compare-suffix></span>
						</p>
						<p class="package-compare__panel-note" data-compare-note></p>
					</div>
					<div class="package-compare__panel-includes">
						<p><?php esc_html_e( 'This includes:', 'excel-ent' ); ?></p>
						<ul data-compare-features></ul>
					</div>
					<button type="button" class="package-compare__enquiry" data-compare-enquiry data-side="b">
						<?php esc_html_e( 'Start Enquiry', 'excel-ent' ); ?>
					</button>
				</article>
			</div>
		</div>
	</div>
</div>

<!-- Enquiry modal (Figma desktop 1101:3152 / mobile 2473:7392) -->
<div class="package-enquiry" data-package-enquiry-modal hidden>
	<div class="package-enquiry__backdrop" data-package-enquiry-close tabindex="-1"></div>
	<div
		class="package-enquiry__dialog"
		role="dialog"
		aria-modal="true"
		aria-labelledby="package-enquiry-title"
		data-package-enquiry-dialog
	>
		<div class="package-enquiry__bar">
			<button
				type="button"
				class="package-enquiry__bar-close-label magnetic"
				data-package-enquiry-close
			>
				<?php esc_html_e( 'Close', 'excel-ent' ); ?>
			</button>
			<button
				type="button"
				class="package-enquiry__bar-close-icon magnetic"
				aria-label="<?php esc_attr_e( 'Close enquiry form', 'excel-ent' ); ?>"
				data-package-enquiry-close
			>
				<img
					src="<?php echo esc_url( $excel_ent_pkg_uri . '/close-x.svg' ); ?>"
					alt=""
					width="24"
					height="24"
					decoding="async"
				>
			</button>
		</div>

		<button
			type="button"
			class="package-enquiry__close package-enquiry__close--floating magnetic"
			aria-label="<?php esc_attr_e( 'Close enquiry form', 'excel-ent' ); ?>"
			data-package-enquiry-close
		>
			<span aria-hidden="true">&times;</span>
		</button>

		<form
			class="package-enquiry__form"
			method="post"
			action="<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>"
			data-package-enquiry-form
			novalidate
		>
			<input type="hidden" name="action" value="excel_ent_package_enquiry">
			<?php wp_nonce_field( 'excel_ent_package_enquiry', 'nonce' ); ?>

			<div class="package-enquiry__hp" aria-hidden="true">
				<label for="package-enquiry-website"><?php esc_html_e( 'Website', 'excel-ent' ); ?></label>
				<input
					type="text"
					id="package-enquiry-website"
					name="excel_ent_website"
					value=""
					tabindex="-1"
					autocomplete="off"
				>
			</div>

			<div class="package-enquiry__form-inner">
			<header class="package-enquiry__header">
				<h2 id="package-enquiry-title" class="package-enquiry__title">
					<?php esc_html_e( 'Start your enquiry.', 'excel-ent' ); ?>
				</h2>
				<p class="package-enquiry__lede">
					<?php esc_html_e( 'Share a few details and our team will be in touch with availability and a tailored quote, no commitment needed.', 'excel-ent' ); ?>
				</p>
			</header>

			<div class="package-enquiry__fields">
				<div class="package-enquiry__row">
					<label class="package-enquiry__field">
						<span class="package-enquiry__label"><?php esc_html_e( 'Full Name', 'excel-ent' ); ?></span>
						<input
							class="package-enquiry__input"
							type="text"
							name="excel_ent_enquiry_name"
							placeholder="<?php esc_attr_e( 'Alex Johnson', 'excel-ent' ); ?>"
							data-placeholder-desktop="<?php esc_attr_e( 'Name', 'excel-ent' ); ?>"
							data-placeholder-mobile="<?php esc_attr_e( 'Alex Johnson', 'excel-ent' ); ?>"
							autocomplete="name"
							required
							aria-invalid="false"
							data-package-enquiry-name
						>
					</label>
					<label class="package-enquiry__field package-enquiry__field--email">
						<span class="package-enquiry__label"><?php esc_html_e( 'Email address', 'excel-ent' ); ?></span>
						<input
							class="package-enquiry__input"
							type="email"
							name="excel_ent_enquiry_email"
							placeholder="<?php esc_attr_e( 'you@email.com', 'excel-ent' ); ?>"
							autocomplete="email"
							required
							aria-invalid="false"
							data-package-enquiry-email
						>
					</label>
					<label class="package-enquiry__field package-enquiry__field--phone">
						<span class="package-enquiry__label"><?php esc_html_e( 'Phone Number', 'excel-ent' ); ?></span>
						<input
							class="package-enquiry__input"
							type="tel"
							name="excel_ent_enquiry_phone"
							placeholder="<?php esc_attr_e( '+44 7700 900000', 'excel-ent' ); ?>"
							autocomplete="tel"
							inputmode="tel"
							aria-invalid="false"
							data-package-enquiry-phone
						>
					</label>
				</div>

				<div class="package-enquiry__package">
					<p class="package-enquiry__package-label"><?php esc_html_e( 'Package selected', 'excel-ent' ); ?></p>
					<div class="package-enquiry__package-value">
						<img
							class="package-enquiry__radio"
							src="<?php echo esc_url( $excel_ent_pkg_uri . '/radio-checked.svg' ); ?>"
							alt=""
							width="18"
							height="18"
							decoding="async"
						>
						<span data-package-enquiry-selected><?php esc_html_e( 'Gold from £750', 'excel-ent' ); ?></span>
					</div>
					<input type="hidden" name="excel_ent_enquiry_package" value="" data-package-enquiry-package>
				</div>

				<label class="package-enquiry__field package-enquiry__field--notes">
					<span class="package-enquiry__label package-enquiry__label--desktop"><?php esc_html_e( 'Any additional information', 'excel-ent' ); ?></span>
					<span class="package-enquiry__notes-head">
						<span class="package-enquiry__label package-enquiry__label--mobile"><?php esc_html_e( 'Are you looking for regular entertainment', 'excel-ent' ); ?></span>
						<span class="package-enquiry__notes-hint"><?php esc_html_e( 'Add details for recurring bookings.', 'excel-ent' ); ?></span>
					</span>
					<textarea
						class="package-enquiry__input package-enquiry__textarea"
						name="excel_ent_enquiry_notes"
						rows="3"
						placeholder="<?php esc_attr_e( 'this is optional', 'excel-ent' ); ?>"
						data-placeholder-desktop="<?php esc_attr_e( 'this is optional', 'excel-ent' ); ?>"
						data-placeholder-mobile=""
						data-package-enquiry-notes
					></textarea>
				</label>
			</div>

			<p
				id="package-enquiry-status"
				class="package-enquiry__status"
				role="status"
				aria-live="polite"
				hidden
				data-package-enquiry-status
			></p>

			<button class="package-enquiry__submit magnetic" type="submit" data-package-enquiry-submit>
				<span
					data-package-enquiry-submit-label
					data-label-desktop="<?php esc_attr_e( 'Send enquiry', 'excel-ent' ); ?>"
					data-label-mobile="<?php esc_attr_e( 'Start Enquiry', 'excel-ent' ); ?>"
				><?php esc_html_e( 'Send enquiry', 'excel-ent' ); ?></span>
			</button>
			</div>
		</form>
	</div>
</div>
