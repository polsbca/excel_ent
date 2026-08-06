<?php
/**
 * Packages page content — Figma 1126:2252
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
			'main'   => '£50',
			'suffix' => __( 'ph', 'excel-ent' ),
			'alt'    => __( '£75 ph (Minimum 4 hours)', 'excel-ent' ),
		),
		'features' => array(
			__( 'Professional DJ, P.A. Equipment and Lighting (certified to industry regulations).', 'excel-ent' ),
			__( 'Providing a selection of music to entertain all the guests.', 'excel-ent' ),
			__( 'You can provide your own part/full playlist if you prefer or leave the selection to our Host DJ.', 'excel-ent' ),
			__( 'Our most popular package for lively weddings and events.', 'excel-ent' ),
		),
	),
	array(
		'name'     => __( 'Silver', 'excel-ent' ),
		'mod'      => 'silver',
		'price'    => array(
			'main'   => '£350',
			'suffix' => '',
			'alt'    => __( '2 × 45-minute or 2 × 60-minute live sets', 'excel-ent' ),
		),
		'features' => array(
			__( 'Professional Entertainer to perform Live music at your Wedding.', 'excel-ent' ),
			__( 'International Performer Darin Day is available as "The Sultan of Swing" performing fantastic songs from Sinatra, Dean Martin, Bobby Darin, Bublé, Andy Williams, Tony Bennett, Matt Monro, Nat King Cole and many more. Darin will also learn any songs required (with notice) for that personal feeling.', 'excel-ent' ),
			__( 'We also have a vast choice of other Solo acts, Duos, Bands, Tribute artists, Themed shows to Entertain your guests. The artists usually perform 2 x 45 min sets or 2 x 60 minute sets. All P.A. equipment and lighting is provided.', 'excel-ent' ),
		),
	),
	array(
		'name'     => __( 'Gold', 'excel-ent' ),
		'mod'      => 'gold',
		'price'    => array(
			'main'   => '£750',
			'suffix' => '',
			'alt'    => __( 'up to five hours of seamless entertainment', 'excel-ent' ),
		),
		'features' => array(
			__( 'This package is Taylor made for your Wedding for that unique entertainment.', 'excel-ent' ),
			__( 'This is a combined package of a Professional DJ and a Live Performer / Tribute act / Band covering upto a combined 5 hours of Entertainment.', 'excel-ent' ),
			__( 'You can choose from a vast list of performers to entertain your guests alongside a DJ that will work around the Live performers.', 'excel-ent' ),
			__( 'This is the most popular package that we provide. The DJ will kick things off, then a live set from the Artists, then the DJ will continue to entertain until the 2nd live set from the artists. The DJ will then finish off with a selection of fantastic and lively music to get everyone dancing until the party stops.', 'excel-ent' ),
		),
	),
	array(
		'name'     => __( 'Platinum', 'excel-ent' ),
		'mod'      => 'platinum',
		'featured' => true,
		'price'    => array(
			'main'   => '£999',
			'suffix' => '',
			'alt'    => __( 'Professional Covers / Function Band', 'excel-ent' ),
		),
		'features' => array(
			__( 'If you want to provide a jaw dropping entertainment package that will have your guests dancing and talking about for weeks after then you should hire Darin Day & The Darin Day Bigband.', 'excel-ent' ),
			__( 'This is a Live band playing fantastic music that the guests can perform all kinds of dances too.', 'excel-ent' ),
			__( 'Due to the popular "Strictly Come Dancing" show, this package is getting more popular.', 'excel-ent' ),
			__( 'Waltzes, Foxtrots, Tangos, Quicksteps, Jive, Latin and Ballroom all performed with a sound that you can only get from a BIGBAND. Available as a 9 piece or a 16 piece band. This is also available with a Professional DJ.', 'excel-ent' ),
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
 */
$excel_ent_render_card = static function ( $package, $note, $quote, $index ) {
	$featured = ! empty( $package['featured'] );
	$mod      = isset( $package['mod'] ) ? $package['mod'] : '';
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
	?>
	<article
		class="package-card<?php echo $featured ? ' package-card--featured' : ''; ?> package-card--<?php echo esc_attr( $mod ); ?> reveal"
		data-reveal
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
			<button
				type="button"
				class="package-card__btn<?php echo $featured ? ' package-card__btn--gradient' : ''; ?> magnetic"
				data-package-enquiry
				data-package-name="<?php echo esc_attr( $package['name'] ); ?>"
				data-package-label="<?php echo esc_attr( $selected_label ); ?>"
			>
				<?php esc_html_e( 'Start Your Enquiry', 'excel-ent' ); ?>
			</button>
		</div>
	</article>
	<?php
};
?>

<section class="package-intro" aria-label="<?php esc_attr_e( 'Event packages', 'excel-ent' ); ?>" data-package-tabs>
	<header class="package-intro__header">
		<h1 class="package-intro__title"><?php esc_html_e( 'PACKAGES', 'excel-ent' ); ?></h1>
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
		<div class="package-grid stagger">
			<?php foreach ( $excel_ent_wedding as $excel_ent_i => $excel_ent_pkg ) : ?>
				<?php $excel_ent_render_card( $excel_ent_pkg, $excel_ent_note, $excel_ent_quote, $excel_ent_i ); ?>
			<?php endforeach; ?>
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
		<div class="package-grid stagger">
			<?php foreach ( $excel_ent_bulk as $excel_ent_i => $excel_ent_pkg ) : ?>
				<?php $excel_ent_render_card( $excel_ent_pkg, $excel_ent_note, $excel_ent_quote, $excel_ent_i ); ?>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- Enquiry modal (Figma 1101:3152) -->
<div class="package-enquiry" data-package-enquiry-modal hidden>
	<div class="package-enquiry__backdrop" data-package-enquiry-close tabindex="-1"></div>
	<div
		class="package-enquiry__dialog"
		role="dialog"
		aria-modal="true"
		aria-labelledby="package-enquiry-title"
		data-package-enquiry-dialog
	>
		<button
			type="button"
			class="package-enquiry__close magnetic"
			aria-label="<?php esc_attr_e( 'Close enquiry form', 'excel-ent' ); ?>"
			data-package-enquiry-close
		>
			<span aria-hidden="true">&times;</span>
		</button>

		<form class="package-enquiry__form" method="post" action="<?php echo esc_url( home_url( '/' ) ); ?>" data-package-enquiry-form novalidate>
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
						<span class="package-enquiry__label"><?php esc_html_e( 'Full name', 'excel-ent' ); ?></span>
						<input
							class="package-enquiry__input"
							type="text"
							name="excel_ent_enquiry_name"
							placeholder="<?php esc_attr_e( 'Name', 'excel-ent' ); ?>"
							autocomplete="name"
							required
							data-package-enquiry-name
						>
					</label>
					<label class="package-enquiry__field">
						<span class="package-enquiry__label"><?php esc_html_e( 'Email address', 'excel-ent' ); ?></span>
						<input
							class="package-enquiry__input"
							type="email"
							name="excel_ent_enquiry_email"
							placeholder="<?php esc_attr_e( 'you@email.com', 'excel-ent' ); ?>"
							autocomplete="email"
							required
							data-package-enquiry-email
						>
					</label>
				</div>

				<div class="package-enquiry__package">
					<p class="package-enquiry__package-label"><?php esc_html_e( 'Package selected', 'excel-ent' ); ?></p>
					<div class="package-enquiry__package-value">
						<span class="package-enquiry__radio" aria-hidden="true"></span>
						<span data-package-enquiry-selected><?php esc_html_e( 'Gold from £750', 'excel-ent' ); ?></span>
					</div>
					<input type="hidden" name="excel_ent_enquiry_package" value="" data-package-enquiry-package>
				</div>

				<label class="package-enquiry__field package-enquiry__field--notes">
					<span class="package-enquiry__label"><?php esc_html_e( 'Any additional information', 'excel-ent' ); ?></span>
					<textarea
						class="package-enquiry__input package-enquiry__textarea"
						name="excel_ent_enquiry_notes"
						rows="3"
						placeholder="<?php esc_attr_e( 'this is optional', 'excel-ent' ); ?>"
						data-package-enquiry-notes
					></textarea>
				</label>
			</div>

			<button class="package-enquiry__submit magnetic" type="submit">
				<?php esc_html_e( 'Send enquiry', 'excel-ent' ); ?>
			</button>
		</form>
	</div>
</div>
