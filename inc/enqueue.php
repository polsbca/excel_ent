<?php
/**
 * Enqueue scripts and styles.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue front-end assets.
 */
function excel_ent_enqueue_assets() {
	wp_enqueue_style(
		'excel-ent-fonts',
		'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400&family=IBM+Plex+Mono:wght@400;700&family=Nosifer&family=Open+Sans:ital,wdth,wght@0,75,300;0,75,400;0,75,600;0,75,700;0,75,800;0,100,300;0,100,400;0,100,600;0,100,700&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'excel-ent-lenis',
		'https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.css',
		array(),
		'1.3.26'
	);

	wp_enqueue_style(
		'excel-ent-main',
		EXCEL_ENT_URI . '/assets/css/main.css',
		array( 'excel-ent-fonts', 'excel-ent-lenis' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-header-footer',
		EXCEL_ENT_URI . '/assets/css/header-footer.css',
		array( 'excel-ent-main' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-pdf-modal',
		EXCEL_ENT_URI . '/assets/css/pdf-modal.css',
		array( 'excel-ent-header-footer' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-animations',
		EXCEL_ENT_URI . '/assets/css/animations.css',
		array( 'excel-ent-pdf-modal' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-hero',
		EXCEL_ENT_URI . '/assets/css/hero.css',
		array( 'excel-ent-animations' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-awards',
		EXCEL_ENT_URI . '/assets/css/awards.css',
		array( 'excel-ent-hero' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-artists',
		EXCEL_ENT_URI . '/assets/css/artists.css',
		array( 'excel-ent-awards' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-excel-way',
		EXCEL_ENT_URI . '/assets/css/excel-way.css',
		array( 'excel-ent-artists' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-venues',
		EXCEL_ENT_URI . '/assets/css/venues.css',
		array( 'excel-ent-excel-way' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-newsletter',
		EXCEL_ENT_URI . '/assets/css/newsletter.css',
		array( 'excel-ent-venues' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-services',
		EXCEL_ENT_URI . '/assets/css/services.css',
		array( 'excel-ent-newsletter' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-blog',
		EXCEL_ENT_URI . '/assets/css/blog.css',
		array( 'excel-ent-services' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-cta-neon',
		EXCEL_ENT_URI . '/assets/css/cta-neon.css',
		array( 'excel-ent-blog' ),
		EXCEL_ENT_VERSION
	);

	if ( is_front_page() ) {
		wp_enqueue_style(
			'excel-ent-front-page-tablet',
			EXCEL_ENT_URI . '/assets/css/front-page-tablet.css',
			array( 'excel-ent-cta-neon', 'excel-ent-artists' ),
			EXCEL_ENT_VERSION
		);
	}

	wp_enqueue_style(
		'excel-ent-explore-artists',
		EXCEL_ENT_URI . '/assets/css/explore-artists.css',
		array( 'excel-ent-cta-neon' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-artist-page',
		EXCEL_ENT_URI . '/assets/css/artist-page.css',
		array( 'excel-ent-explore-artists' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-about-page',
		EXCEL_ENT_URI . '/assets/css/about-page.css',
		array( 'excel-ent-artist-page' ),
		EXCEL_ENT_VERSION
	);

	if ( excel_ent_is_about_page() ) {
		wp_enqueue_style(
			'excel-ent-about-page-tablet',
			EXCEL_ENT_URI . '/assets/css/about-page-tablet.css',
			array( 'excel-ent-about-page' ),
			EXCEL_ENT_VERSION
		);
	}

	wp_enqueue_style(
		'excel-ent-package-page',
		EXCEL_ENT_URI . '/assets/css/package-page.css',
		array( 'excel-ent-about-page' ),
		EXCEL_ENT_VERSION
	);

	if ( excel_ent_is_package_page() ) {
		wp_enqueue_style(
			'excel-ent-package-page-tablet',
			EXCEL_ENT_URI . '/assets/css/package-page-tablet.css',
			array( 'excel-ent-package-page' ),
			EXCEL_ENT_VERSION
		);
	}

	wp_enqueue_style(
		'excel-ent-contact-page',
		EXCEL_ENT_URI . '/assets/css/contact-page.css',
		array( 'excel-ent-package-page' ),
		EXCEL_ENT_VERSION
	);

	if ( excel_ent_is_contact_page() ) {
		wp_enqueue_style(
			'excel-ent-contact-page-tablet',
			EXCEL_ENT_URI . '/assets/css/contact-page-tablet.css',
			array( 'excel-ent-contact-page' ),
			EXCEL_ENT_VERSION
		);
	}

	wp_enqueue_style(
		'excel-ent-search-page',
		EXCEL_ENT_URI . '/assets/css/search-page.css',
		array( 'excel-ent-contact-page' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-search-page-tablet',
		EXCEL_ENT_URI . '/assets/css/search-page-tablet.css',
		array( 'excel-ent-search-page' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-button-hovers',
		EXCEL_ENT_URI . '/assets/css/button-hovers.css',
		array( 'excel-ent-search-page', 'excel-ent-header-footer' ),
		EXCEL_ENT_VERSION
	);

	wp_enqueue_style(
		'excel-ent-large-desktop',
		EXCEL_ENT_URI . '/assets/css/large-desktop.css',
		array( 'excel-ent-button-hovers' ),
		EXCEL_ENT_VERSION
	);

	if ( excel_ent_is_package_page() ) {
		wp_enqueue_style(
			'excel-ent-package-page-desktop-expand',
			EXCEL_ENT_URI . '/assets/css/package-page-desktop-expand.css',
			array( 'excel-ent-large-desktop' ),
			EXCEL_ENT_VERSION
		);
	}

	wp_enqueue_script(
		'excel-ent-lenis',
		'https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js',
		array(),
		'1.3.26',
		true
	);

	wp_enqueue_script(
		'excel-ent-main',
		EXCEL_ENT_URI . '/assets/js/main.js',
		array( 'excel-ent-lenis' ),
		EXCEL_ENT_VERSION,
		true
	);

	wp_localize_script(
		'excel-ent-main',
		'excelEnt',
		array(
			'ajaxUrl' => admin_url( 'admin-ajax.php' ),
			'exploreArtists' => array(
				'nonce'        => wp_create_nonce( 'excel_ent_explore_artists' ),
				'loadingLabel' => __( 'Loading artists…', 'excel-ent' ),
				'errorLabel'   => __( 'Could not load artists. Please try again.', 'excel-ent' ),
			),
			'artistSuggest' => array(
				'nonce'      => wp_create_nonce( 'excel_ent_artist_suggest' ),
				'errorLabel' => __( 'Could not load artists. Please try again.', 'excel-ent' ),
			),
			'newsletter' => array(
				'nonce'           => wp_create_nonce( 'excel_ent_newsletter' ),
				'empty'           => __( 'Please enter your email address.', 'excel-ent' ),
				'invalid'         => __( 'Please enter a valid email address.', 'excel-ent' ),
				'sending'         => __( 'Subscribing…', 'excel-ent' ),
				'genericError'    => __( 'Something went wrong. Please try again.', 'excel-ent' ),
				'submitLabel'     => __( 'Subscribe', 'excel-ent' ),
			),
			'packageEnquiry' => array(
				'nonce'        => wp_create_nonce( 'excel_ent_package_enquiry' ),
				'nameRequired' => __( 'Please enter your full name.', 'excel-ent' ),
				'contactRequired' => __( 'Please enter your email address or phone number.', 'excel-ent' ),
				'emailInvalid' => __( 'Please enter a valid email address.', 'excel-ent' ),
				'phoneRequired'=> __( 'Please enter your phone number.', 'excel-ent' ),
				'sending'      => __( 'Sending…', 'excel-ent' ),
				'genericError' => __( 'Something went wrong. Please try again.', 'excel-ent' ),
				'submitLabel'  => __( 'Send enquiry', 'excel-ent' ),
				'submitLabelMobile' => __( 'Start Enquiry', 'excel-ent' ),
			),
			'quoteEnquiry' => array(
				'nonce'                   => wp_create_nonce( 'excel_ent_quote_enquiry' ),
				'nameRequired'            => __( 'Please enter your full name.', 'excel-ent' ),
				'phoneRequired'           => __( 'Please enter your phone number.', 'excel-ent' ),
				'emailRequired'           => __( 'Please enter your email address.', 'excel-ent' ),
				'emailInvalid'            => __( 'Please enter a valid email address.', 'excel-ent' ),
				'paymentRequired'         => __( 'Please select a payment method.', 'excel-ent' ),
				'artistsRequired'         => __( 'Please select at least one preferred artist.', 'excel-ent' ),
				'categoriesRequired'      => __( 'Please select at least one performance category.', 'excel-ent' ),
				'budgetRequired'          => __( 'Please enter your event budget.', 'excel-ent' ),
				'packageRequired'         => __( 'Please select a package.', 'excel-ent' ),
				'regularRequired'         => __( 'Please confirm whether you need regular entertainment.', 'excel-ent' ),
				'regularDetailsRequired'  => __( 'Please add details for regular entertainment.', 'excel-ent' ),
				'eventDateRequired'       => __( 'Please select an event date.', 'excel-ent' ),
				'startTimeRequired'       => __( 'Please select a start time.', 'excel-ent' ),
				'guestsRequired'          => __( 'Please enter the guest count.', 'excel-ent' ),
				'setLengthRequired'       => __( 'Please select a performance set length.', 'excel-ent' ),
				'venueRequired'           => __( 'Please enter the venue name.', 'excel-ent' ),
				'venueAddressRequired'    => __( 'Please enter the venue address.', 'excel-ent' ),
				'paLightingRequired'      => __( 'Please confirm whether PA and lighting are required.', 'excel-ent' ),
				'parkingRequired'         => __( 'Please confirm whether there is parking.', 'excel-ent' ),
				'stairsRequired'          => __( 'Please confirm whether there are stairs involved.', 'excel-ent' ),
				'notesRequired'           => __( 'Please tell us about your event.', 'excel-ent' ),
				'contactPrefRequired'     => __( 'Please choose how we should contact you.', 'excel-ent' ),
				'contactDetailsRequired'  => __( 'Please add contact preference details.', 'excel-ent' ),
				'consentRequired'         => __( 'Please agree to the Privacy Policy to continue.', 'excel-ent' ),
				'sending'                 => __( 'Sending…', 'excel-ent' ),
				'genericError'            => __( 'Something went wrong. Please try again.', 'excel-ent' ),
				'successMessage'          => __( 'Thanks — we’ve received your quote request. Our team will confirm availability and pricing shortly.', 'excel-ent' ),
				'submitLabel'             => __( 'Get A Quote', 'excel-ent' ),
			),
			'artistRegistration' => array(
				'nonce'                   => wp_create_nonce( 'excel_ent_artist_registration' ),
				'nameRequired'            => __( 'Please enter your full name.', 'excel-ent' ),
				'stageRequired'           => __( 'Please enter your stage name.', 'excel-ent' ),
				'emailRequired'           => __( 'Please enter your email address.', 'excel-ent' ),
				'emailInvalid'            => __( 'Please enter a valid email address.', 'excel-ent' ),
				'phoneRequired'           => __( 'Please enter your phone number.', 'excel-ent' ),
				'addressRequired'         => __( 'Please enter your registered address.', 'excel-ent' ),
				'yearsRequired'           => __( 'Please select years performing.', 'excel-ent' ),
				'baseLocationRequired'    => __( 'Please enter your base location.', 'excel-ent' ),
				'setLengthRequired'       => __( 'Please select at least one performance set length.', 'excel-ent' ),
				'rateRequired'            => __( 'Please enter your rate / price range.', 'excel-ent' ),
				'categoriesRequired'      => __( 'Please select at least one performance category.', 'excel-ent' ),
				'headshotRequired'        => __( 'Please upload at least one headshot.', 'excel-ent' ),
				'photosRequired'          => __( 'Please upload at least one performance photo.', 'excel-ent' ),
				'playlistRequired'        => __( 'Please add at least one playlist link.', 'excel-ent' ),
				'socialRequired'          => __( 'Please add at least one social media link.', 'excel-ent' ),
				'videoRequired'           => __( 'Please add a performance video link.', 'excel-ent' ),
				'reviewsRequired'         => __( 'Please add a customer reviews link.', 'excel-ent' ),
				'urlInvalid'              => __( 'Please enter a valid URL.', 'excel-ent' ),
				'travelRequired'          => __( 'Please select your travel radius.', 'excel-ent' ),
				'techRequired'            => __( 'Please enter your technical requirements.', 'excel-ent' ),
				'pliRequired'             => __( 'Please confirm whether you have public liability insurance.', 'excel-ent' ),
				'patRequired'             => __( 'Please confirm whether all equipment is P.A.T. tested.', 'excel-ent' ),
				'bioRequired'             => __( 'Please tell us about yourself.', 'excel-ent' ),
				'contactPrefRequired'     => __( 'Please choose how we should contact you.', 'excel-ent' ),
				'contactDetailsRequired'  => __( 'Please add contact preference details.', 'excel-ent' ),
				'consentRequired'         => __( 'Please agree for your content to be shared on the Excel website.', 'excel-ent' ),
				'sending'                 => __( 'Submitting…', 'excel-ent' ),
				'genericError'            => __( 'Something went wrong. Please try again.', 'excel-ent' ),
				'successMessage'          => __( 'Our team will get back to you within 24 hours.', 'excel-ent' ),
				'submitLabel'             => __( 'Register as Artist', 'excel-ent' ),
			),
		)
	);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'excel_ent_enqueue_assets' );

/**
 * Preload loader logo so wave + mark appear together.
 */
function excel_ent_preload_loader_logo() {
	printf(
		'<link rel="preload" as="image" href="%s" fetchpriority="high">' . "\n",
		esc_url( EXCEL_ENT_URI . '/assets/images/logo/logo-loader.png' )
	);
}
add_action( 'wp_head', 'excel_ent_preload_loader_logo', 1 );