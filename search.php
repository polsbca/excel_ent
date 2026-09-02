<?php
/**
 * Search results template — Figma desktop 1299:11348 / empty 1299:11417 / tablet 1114:11425 / mobile 1053:4365 / CTA 2473:10613.
 *
 * @package Excel_Ent
 */

get_header();

$excel_ent_search_uri = EXCEL_ENT_URI . '/assets/images/search';
$excel_ent_query      = get_search_query();

$excel_ent_occasion   = isset( $_GET['occasion'] ) ? sanitize_text_field( wp_unslash( $_GET['occasion'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$excel_ent_location   = isset( $_GET['location'] ) ? sanitize_text_field( wp_unslash( $_GET['location'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$excel_ent_event_date = isset( $_GET['event_date'] ) ? sanitize_text_field( wp_unslash( $_GET['event_date'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$excel_ent_budget     = isset( $_GET['budget'] ) ? sanitize_text_field( wp_unslash( $_GET['budget'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

$excel_ent_budget_labels = array(
	'under-500' => __( 'Under £500', 'excel-ent' ),
	'500-1000'  => __( '£500 - £1,000', 'excel-ent' ),
	'1000-2500' => __( '£1,000 - £2,500', 'excel-ent' ),
	'2500-5000' => __( '£2,500 - £5,000', 'excel-ent' ),
	'over-5000' => __( 'Over £5,000', 'excel-ent' ),
);

$excel_ent_location_labels = array(
	'london'     => __( 'London', 'excel-ent' ),
	'manchester' => __( 'Manchester', 'excel-ent' ),
	'birmingham' => __( 'Birmingham', 'excel-ent' ),
	'edinburgh'  => __( 'Edinburgh', 'excel-ent' ),
	'bristol'    => __( 'Bristol', 'excel-ent' ),
);

$excel_ent_category_labels = array(
	'male-solo'            => __( 'Solo male', 'excel-ent' ),
	'female-solo'          => __( 'Female Solo', 'excel-ent' ),
	'duos'                 => __( 'Duos', 'excel-ent' ),
	'bands'                => __( 'Bands', 'excel-ent' ),
	'djs'                  => __( "DJ's", 'excel-ent' ),
	'celebrity-acts'       => __( 'Celebrity Acts', 'excel-ent' ),
	'professional-dancers' => __( 'Professional Dancers', 'excel-ent' ),
	'magicians-hypnotists' => __( 'Magicians & Hypnotists', 'excel-ent' ),
	'shows'                => __( 'Shows', 'excel-ent' ),
	'elvis'                => __( 'Elvis', 'excel-ent' ),
	'queen'                => __( 'Queen', 'excel-ent' ),
	'adele'                => __( 'Adele', 'excel-ent' ),
	'abba'                 => __( 'ABBA', 'excel-ent' ),
	'beatles'              => __( 'The Beatles', 'excel-ent' ),
	'motown'               => __( 'Motown', 'excel-ent' ),
	'pop'                  => __( 'Pop', 'excel-ent' ),
	'rock'                 => __( 'Rock', 'excel-ent' ),
	'soul'                 => __( 'Soul', 'excel-ent' ),
	'jazz'                 => __( 'Jazz', 'excel-ent' ),
	'rnb'                  => __( 'R&B', 'excel-ent' ),
	'classical'            => __( 'Classical', 'excel-ent' ),
	'country'              => __( 'Country', 'excel-ent' ),
	'60s'                  => __( "60's", 'excel-ent' ),
	'70s'                  => __( "70's", 'excel-ent' ),
	'80s'                  => __( "80's", 'excel-ent' ),
	'90s'                  => __( "90's", 'excel-ent' ),
	'2000s'                => __( "2000's", 'excel-ent' ),
	'modern'               => __( 'Modern', 'excel-ent' ),
	'wedding'              => __( 'Wedding', 'excel-ent' ),
	'corporate'            => __( 'Corporate', 'excel-ent' ),
	'pubs'                 => __( 'Pubs & Clubs', 'excel-ent' ),
	'private'              => __( 'Private Party', 'excel-ent' ),
	'festival'             => __( 'Festival', 'excel-ent' ),
);

$excel_ent_chips = array();

if ( $excel_ent_occasion ) {
	$excel_ent_chips[] = array(
		'key'   => 'occasion',
		'label' => isset( $excel_ent_category_labels[ $excel_ent_occasion ] )
			? $excel_ent_category_labels[ $excel_ent_occasion ]
			: $excel_ent_occasion,
	);
}

if ( $excel_ent_budget ) {
	$excel_ent_chips[] = array(
		'key'   => 'budget',
		'label' => isset( $excel_ent_budget_labels[ $excel_ent_budget ] )
			? sprintf(
				/* translators: %s: budget range */
				__( 'budget :%s', 'excel-ent' ),
				$excel_ent_budget_labels[ $excel_ent_budget ]
			)
			: $excel_ent_budget,
	);
}

if ( $excel_ent_location ) {
	$excel_ent_chips[] = array(
		'key'   => 'location',
		'label' => isset( $excel_ent_location_labels[ $excel_ent_location ] )
			? $excel_ent_location_labels[ $excel_ent_location ]
			: $excel_ent_location,
	);
}

if ( $excel_ent_event_date ) {
	$excel_ent_date_chip = $excel_ent_event_date;
	if ( preg_match( '/^\d{4}-\d{2}-\d{2}$/', $excel_ent_event_date ) ) {
		$excel_ent_ts = strtotime( $excel_ent_event_date );
		if ( $excel_ent_ts ) {
			$excel_ent_date_chip = wp_date( 'd/m/Y', $excel_ent_ts );
		}
	}
	$excel_ent_chips[] = array(
		'key'   => 'event_date',
		'label' => $excel_ent_date_chip,
	);
}

if ( $excel_ent_query ) {
	$excel_ent_chips[] = array(
		'key'   => 's',
		'label' => sprintf(
			/* translators: %s: search term */
			__( 'Search by name: %s', 'excel-ent' ),
			$excel_ent_query
		),
	);
}

/* Figma empty state always shows filter chips. */
if ( empty( $excel_ent_chips ) ) {
	$excel_ent_chips = array(
		array( 'key' => 'demo-1', 'label' => __( 'Solo male', 'excel-ent' ) ),
		array( 'key' => 'demo-2', 'label' => __( 'budget :High to low', 'excel-ent' ) ),
		array( 'key' => 'demo-3', 'label' => __( 'Most booked', 'excel-ent' ) ),
	);
}

?>

<div class="search-page">
	<div class="search-page__chips-bar" data-search-chips-bar aria-label="<?php esc_attr_e( 'Active filters', 'excel-ent' ); ?>">
		<div class="search-page__chips">
			<?php foreach ( $excel_ent_chips as $excel_ent_chip ) : ?>
				<button
					type="button"
					class="search-page__chip magnetic"
					data-search-chip
					data-chip-key="<?php echo esc_attr( $excel_ent_chip['key'] ); ?>"
					aria-label="<?php echo esc_attr( sprintf( /* translators: %s: filter label */ __( 'Remove filter: %s', 'excel-ent' ), $excel_ent_chip['label'] ) ); ?>"
				>
					<span><?php echo esc_html( $excel_ent_chip['label'] ); ?></span>
					<img
						src="<?php echo esc_url( $excel_ent_search_uri . '/close-line.svg' ); ?>"
						alt=""
						width="24"
						height="24"
						decoding="async"
					>
				</button>
			<?php endforeach; ?>
		</div>
		<button type="button" class="search-page__clear magnetic" data-search-chips-clear>
			<img
				src="<?php echo esc_url( $excel_ent_search_uri . '/close-large-line.svg' ); ?>"
				alt=""
				width="24"
				height="24"
				decoding="async"
			>
			<span><?php esc_html_e( 'Clear all Filters', 'excel-ent' ); ?></span>
		</button>
	</div>

	<section class="search-empty" aria-label="<?php esc_attr_e( 'No search results', 'excel-ent' ); ?>">
		<p class="search-empty__eyebrow"><?php esc_html_e( 'No Results found', 'excel-ent' ); ?></p>
		<div class="search-empty__inner">
			<div class="search-empty__visual">
				<img
					class="search-empty__illustration"
					src="<?php echo esc_url( $excel_ent_search_uri . '/empty-dog.jpg' ); ?>"
					alt="<?php esc_attr_e( 'Sad dog illustration indicating no results', 'excel-ent' ); ?>"
					width="376"
					height="339"
					decoding="async"
				>
			</div>
			<div class="search-empty__copy">
				<h1 class="search-empty__title"><?php esc_html_e( "Sorry, We Couldn't Find Any Matching Artists", 'excel-ent' ); ?></h1>
				<p class="search-empty__lede">
					<?php esc_html_e( "We couldn't find any artists that match your search or filters. Try adjusting your search, exploring another category, or broadening your location or date.", 'excel-ent' ); ?>
				</p>
			</div>
		</div>
	</section>
</div>

<?php
get_template_part(
	'template-parts/section',
	'cta-neon',
	array(
		'primary_label'   => __( 'Contact Us', 'excel-ent' ),
		'primary_url'     => excel_ent_get_contact_url( 'quick-contacts' ),
		'secondary_label' => __( 'Register as an Artist', 'excel-ent' ),
		'secondary_url'   => excel_ent_get_contact_url( 'talent' ),
	)
);
?>

<?php
get_footer();
