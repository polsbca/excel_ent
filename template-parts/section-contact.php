<?php
/**
 * Contact Us page content — Figma 1159:3881 / Get A Quote 1159:3066
 *
 * @package Excel_Ent
 */

$excel_ent_uri   = EXCEL_ENT_URI . '/assets/images/contact-page';
$excel_ent_phone = excel_ent_get_phone_number();
$excel_ent_email = 'info@excelentertainment.co.uk';

$excel_ent_wishlist = array(
	'andy-elton'   => array(
		'label'  => __( 'Andy Crosbie', 'excel-ent' ),
		'meta'   => __( 'SOLO SINGER', 'excel-ent' ),
		'avatar' => $excel_ent_uri . '/avatar-artist.jpg',
	),
	'darin-day'    => array(
		'label'  => __( 'Darin Day', 'excel-ent' ),
		'meta'   => __( 'LIVE BAND', 'excel-ent' ),
		'avatar' => $excel_ent_uri . '/avatar-artist.jpg',
	),
	'soulful'      => array(
		'label'  => __( 'Soulful Nights', 'excel-ent' ),
		'meta'   => __( 'DUO', 'excel-ent' ),
		'avatar' => $excel_ent_uri . '/avatar-artist.jpg',
	),
	'midnight-dj'  => array(
		'label'  => __( 'Midnight Groove', 'excel-ent' ),
		'meta'   => __( 'DJ', 'excel-ent' ),
		'avatar' => $excel_ent_uri . '/avatar-artist.jpg',
	),
	'wedding-coll' => array(
		'label'  => __( 'The Wedding Collective', 'excel-ent' ),
		'meta'   => __( 'LIVE BAND', 'excel-ent' ),
		'avatar' => $excel_ent_uri . '/avatar-artist.jpg',
	),
	'corporate'    => array(
		'label'  => __( 'Corporate Classics', 'excel-ent' ),
		'meta'   => __( 'LIVE BAND', 'excel-ent' ),
		'avatar' => $excel_ent_uri . '/avatar-artist.jpg',
	),
);

$excel_ent_packages = array(
	'bronze'   => __( 'Bronze', 'excel-ent' ),
	'silver'   => __( 'Silver', 'excel-ent' ),
	'gold'     => __( 'Gold', 'excel-ent' ),
	'platinum' => __( 'Platinum', 'excel-ent' ),
);

$excel_ent_rank_labels = array(
	1 => __( '1st choice', 'excel-ent' ),
	2 => __( '2nd choice', 'excel-ent' ),
	3 => __( '3rd choice', 'excel-ent' ),
	4 => __( '4th choice', 'excel-ent' ),
	5 => __( '5th choice', 'excel-ent' ),
);

$excel_ent_payment_methods = array(
	'google-pay'    => __( 'Google pay', 'excel-ent' ),
	'apple-pay'     => __( 'Apple Pay', 'excel-ent' ),
	'card'          => __( 'Debit / Credit Card', 'excel-ent' ),
	'bank-transfer' => __( 'Bank Transfer', 'excel-ent' ),
	'paypal'        => __( 'PayPal', 'excel-ent' ),
	'invoice'       => __( 'Invoice on Completion', 'excel-ent' ),
);

$excel_ent_payment_default = 'google-pay';

$excel_ent_years_options = array(
	'lt-1'  => __( 'Less than 1 year', 'excel-ent' ),
	'1-2'   => __( '1-2 year', 'excel-ent' ),
	'3-6'   => __( '3-6 year', 'excel-ent' ),
	'7-10'  => __( '7-10 year', 'excel-ent' ),
	'8-12'  => __( '8-12 year', 'excel-ent' ),
	'16+'   => __( '16+ years', 'excel-ent' ),
);

$excel_ent_perf_categories = array(
	'dj'      => __( 'Dj', 'excel-ent' ),
	'live'    => __( 'Live bands', 'excel-ent' ),
	'solo'    => __( 'Solo singer', 'excel-ent' ),
	'tribute' => __( 'Tribute act', 'excel-ent' ),
	'duo'     => __( 'Duo', 'excel-ent' ),
);

$excel_ent_offer_options = array(
	'wedding'   => __( 'Wedding entertainment', 'excel-ent' ),
	'corporate' => __( 'Corporate events', 'excel-ent' ),
	'private'   => __( 'Private parties', 'excel-ent' ),
	'festival'  => __( 'Festival', 'excel-ent' ),
	'duo'       => __( 'Duo', 'excel-ent' ),
);

$excel_ent_travel_options = array(
	'local'         => __( 'Local only ( 0 to 20 miles )', 'excel-ent' ),
	'regional'      => __( 'Regional ( 0 to 50 miles )', 'excel-ent' ),
	'nationwide'    => __( 'Nationwide UK', 'excel-ent' ),
	'international' => __( 'Uk & International', 'excel-ent' ),
);

$excel_ent_set_length_options = array(
	'1-hour'  => __( '1 hour', 'excel-ent' ),
	'90-min'  => __( '90 Minutes', 'excel-ent' ),
	'2-hours' => __( '2 hours', 'excel-ent' ),
	'3-hours' => __( '3 hours', 'excel-ent' ),
	'4-hours' => __( '4 hours', 'excel-ent' ),
);

$excel_ent_ent_type_options = array(
	'dj'       => __( 'Dj', 'excel-ent' ),
	'live'     => __( 'Live bands', 'excel-ent' ),
	'solo'     => __( 'Solo singer', 'excel-ent' ),
	'tribute'  => __( 'Tribute act', 'excel-ent' ),
	'duo'      => __( 'Duo', 'excel-ent' ),
	'comedian' => __( 'Comedian', 'excel-ent' ),
);

$excel_ent_package_groups = array(
	'wedding' => array(
		'label'   => __( 'Wedding', 'excel-ent' ),
		'options' => array(
			'wedding-bronze'   => __( 'Bronze 50ph', 'excel-ent' ),
			'wedding-silver'   => __( 'Silver £350', 'excel-ent' ),
			'wedding-gold'     => __( 'Gold £750', 'excel-ent' ),
			'wedding-platinum' => __( 'Platinum £999', 'excel-ent' ),
		),
	),
	'bulk'    => array(
		'label'   => __( 'Bulk Booking', 'excel-ent' ),
		'options' => array(
			'bulk-residencies' => __( 'Venue Residencies', 'excel-ent' ),
			'bulk-multi'       => __( 'Multi-Venue', 'excel-ent' ),
			'bulk-seasonal'    => __( 'Seasonal Series', 'excel-ent' ),
			'bulk-enterprise'  => __( 'Enterprise', 'excel-ent' ),
		),
	),
);

/**
 * Render a contact form custom dropdown (Figma 1159:3575 / 1159:3722 / 1159:3675 / 1159:3644).
 *
 * @param array $args Dropdown args.
 */
$excel_ent_render_dd = static function ( $args ) use ( $excel_ent_uri ) {
	$name     = isset( $args['name'] ) ? $args['name'] : '';
	$label    = isset( $args['label'] ) ? $args['label'] : '';
	$title    = isset( $args['title'] ) ? $args['title'] : $label;
	$options  = isset( $args['options'] ) && is_array( $args['options'] ) ? $args['options'] : array();
	$groups   = isset( $args['groups'] ) && is_array( $args['groups'] ) ? $args['groups'] : array();
	$selected = isset( $args['selected'] ) ? $args['selected'] : '';
	$required = ! empty( $args['required'] );
	$mod      = isset( $args['mod'] ) ? $args['mod'] : '';
	$placeholder = isset( $args['placeholder'] ) ? $args['placeholder'] : $title;
	$allow_custom = ! empty( $args['allow_custom'] );
	$custom_ph    = isset( $args['custom_placeholder'] ) ? $args['custom_placeholder'] : __( 'Add your own', 'excel-ent' );
	$searchable   = ! empty( $args['searchable'] );
	$search_ph    = isset( $args['search_placeholder'] ) ? $args['search_placeholder'] : __( 'Search', 'excel-ent' );
	$extra_attrs  = isset( $args['extra_attrs'] ) ? $args['extra_attrs'] : '';
	$is_artist_pref = ! empty( $args['artist_pref'] );
	$scrollable   = ! empty( $args['scrollable'] ) || $searchable || $groups;

	$opt_label = static function ( $opt ) {
		if ( is_array( $opt ) ) {
			return isset( $opt['label'] ) ? (string) $opt['label'] : '';
		}
		return (string) $opt;
	};

	$opt_search = static function ( $opt ) use ( $opt_label ) {
		if ( is_array( $opt ) ) {
			$parts = array( $opt_label( $opt ) );
			if ( ! empty( $opt['meta'] ) ) {
				$parts[] = (string) $opt['meta'];
			}
			return strtolower( implode( ' ', $parts ) );
		}
		return strtolower( (string) $opt );
	};

	$render_option = static function ( $value, $opt, $selected ) use ( $excel_ent_uri, $opt_label, $opt_search ) {
		$is_sel   = ( (string) $value === (string) $selected );
		$is_rich  = is_array( $opt );
		$label    = $opt_label( $opt );
		$meta     = ( $is_rich && ! empty( $opt['meta'] ) ) ? (string) $opt['meta'] : '';
		$avatar   = ( $is_rich && ! empty( $opt['avatar'] ) ) ? (string) $opt['avatar'] : '';
		$search   = $opt_search( $opt );
		$opt_class = 'contact-dd__option' . ( $is_sel ? ' is-selected' : '' ) . ( $avatar ? ' contact-dd__option--artist' : '' );
		?>
		<li class="contact-dd__item" role="none" data-contact-dd-item data-label="<?php echo esc_attr( $search ); ?>">
			<button
				type="button"
				class="<?php echo esc_attr( $opt_class ); ?>"
				role="option"
				aria-selected="<?php echo $is_sel ? 'true' : 'false'; ?>"
				data-contact-dd-option
				data-value="<?php echo esc_attr( $value ); ?>"
				data-label="<?php echo esc_attr( $label ); ?>"
			>
				<?php if ( $avatar ) : ?>
					<img class="contact-dd__avatar" src="<?php echo esc_url( $avatar ); ?>" alt="" width="30" height="30" decoding="async">
				<?php else : ?>
					<span class="contact-dd__check" aria-hidden="true">
						<img src="<?php echo esc_url( $excel_ent_uri . '/icon-check.svg' ); ?>" alt="" width="24" height="24" decoding="async">
					</span>
				<?php endif; ?>
				<?php if ( $meta ) : ?>
					<span class="contact-dd__option-text">
						<span class="contact-dd__option-label"><?php echo esc_html( $label ); ?></span>
						<span class="contact-dd__option-meta">( <?php echo esc_html( $meta ); ?> )</span>
					</span>
				<?php else : ?>
					<span class="contact-dd__option-label"><?php echo esc_html( $label ); ?></span>
				<?php endif; ?>
			</button>
		</li>
		<?php
	};

	$flat_options = $options;
	if ( $groups ) {
		$flat_options = array();
		foreach ( $groups as $group ) {
			if ( ! empty( $group['options'] ) && is_array( $group['options'] ) ) {
				$flat_options = array_merge( $flat_options, $group['options'] );
			}
		}
	}

	$selected_label = $placeholder;
	if ( $selected !== '' && isset( $flat_options[ $selected ] ) ) {
		$selected_label = $opt_label( $flat_options[ $selected ] );
	}

	$active_group = '';
	if ( $groups ) {
		$group_keys   = array_keys( $groups );
		$active_group = $group_keys[0];
		foreach ( $groups as $gkey => $group ) {
			if ( $selected !== '' && ! empty( $group['options'][ $selected ] ) ) {
				$active_group = $gkey;
				break;
			}
		}
	}

	$wrap_class = 'contact-field contact-field--dd';
	if ( $mod ) {
		$wrap_class .= ' ' . $mod;
	}

	$dd_attrs = ' data-contact-dd';
	if ( $allow_custom ) {
		$dd_attrs .= ' data-contact-dd-customizable';
	}
	if ( $searchable ) {
		$dd_attrs .= ' data-contact-dd-searchable';
	}
	if ( $groups ) {
		$dd_attrs .= ' data-contact-dd-grouped';
	}
	if ( $extra_attrs ) {
		$dd_attrs .= ' ' . $extra_attrs;
	}
	?>
	<div class="<?php echo esc_attr( $wrap_class ); ?>">
		<?php if ( $label ) : ?>
			<span class="contact-field__label<?php echo ! empty( $args['label_strong'] ) ? ' contact-field__label--strong' : ''; ?>"><?php echo esc_html( $label ); ?></span>
		<?php endif; ?>
		<div class="contact-dd<?php echo $searchable ? ' contact-dd--search' : ''; ?><?php echo $groups ? ' contact-dd--grouped' : ''; ?>"<?php echo $dd_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<button
				type="button"
				class="contact-dd__trigger<?php echo ( $selected === '' ) ? ' contact-dd__trigger--muted' : ''; ?>"
				data-contact-dd-trigger
				aria-expanded="false"
				aria-haspopup="listbox"
			>
				<span class="contact-dd__value" data-contact-dd-label><?php echo esc_html( $selected_label ); ?></span>
				<img class="contact-dd__chevron" src="<?php echo esc_url( $excel_ent_uri . '/icon-arrow-down.svg' ); ?>" alt="" width="24" height="24" decoding="async">
			</button>
			<input
				type="hidden"
				name="<?php echo esc_attr( $name ); ?>"
				value="<?php echo esc_attr( $selected ); ?>"
				data-contact-dd-input
				<?php echo $is_artist_pref ? 'data-artist-prefs-select' : ''; ?>
				<?php echo $required ? 'required' : ''; ?>
			>
			<div class="contact-dd__panel<?php echo $scrollable ? ' contact-dd__panel--scroll' : ''; ?>" data-contact-dd-panel hidden>
				<p class="contact-dd__title"><?php echo esc_html( $title ); ?></p>

				<?php if ( $groups ) : ?>
					<div class="contact-dd__tabs" role="tablist" data-contact-dd-tabs>
						<?php foreach ( $groups as $gkey => $group ) : ?>
							<button
								type="button"
								class="contact-dd__tab<?php echo ( (string) $gkey === (string) $active_group ) ? ' is-active' : ''; ?>"
								role="tab"
								aria-selected="<?php echo ( (string) $gkey === (string) $active_group ) ? 'true' : 'false'; ?>"
								data-contact-dd-tab="<?php echo esc_attr( $gkey ); ?>"
							>
								<?php echo esc_html( $group['label'] ); ?>
							</button>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>

				<?php if ( $searchable ) : ?>
					<label class="contact-dd__search">
						<img class="contact-dd__search-icon" src="<?php echo esc_url( $excel_ent_uri . '/icon-search.svg' ); ?>" alt="" width="20" height="20" decoding="async">
						<span class="screen-reader-text"><?php echo esc_html( $search_ph ); ?></span>
						<input
							class="contact-dd__search-input"
							type="search"
							placeholder="<?php echo esc_attr( $search_ph ); ?>"
							data-contact-dd-search
							autocomplete="off"
						>
					</label>
				<?php endif; ?>

				<div class="contact-dd__options">
					<?php if ( $allow_custom ) : ?>
						<label class="contact-dd__custom">
							<span class="screen-reader-text"><?php echo esc_html( $custom_ph ); ?></span>
							<input
								class="contact-dd__custom-input"
								type="text"
								placeholder="<?php echo esc_attr( $custom_ph ); ?>"
								data-contact-dd-custom
								autocomplete="off"
							>
						</label>
					<?php endif; ?>

					<?php if ( $groups ) : ?>
						<?php foreach ( $groups as $gkey => $group ) : ?>
							<ul
								class="contact-dd__list"
								role="listbox"
								aria-label="<?php echo esc_attr( $group['label'] ); ?>"
								data-contact-dd-group="<?php echo esc_attr( $gkey ); ?>"
								<?php echo ( (string) $gkey !== (string) $active_group ) ? 'hidden' : ''; ?>
							>
								<?php foreach ( $group['options'] as $value => $opt ) : ?>
									<?php $render_option( $value, $opt, $selected ); ?>
								<?php endforeach; ?>
							</ul>
						<?php endforeach; ?>
					<?php else : ?>
						<ul class="contact-dd__list" role="listbox" aria-label="<?php echo esc_attr( $title ); ?>">
							<?php foreach ( $options as $value => $opt ) : ?>
								<?php $render_option( $value, $opt, $selected ); ?>
							<?php endforeach; ?>
						</ul>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
	<?php
};
?>

<section class="contact-intro" aria-label="<?php esc_attr_e( 'Contact Excel Entertainment', 'excel-ent' ); ?>" data-contact-tabs>
	<header class="contact-intro__header">
		<h1 class="contact-intro__title"><?php esc_html_e( 'THE Stage Is Ready', 'excel-ent' ); ?></h1>
		<div class="contact-intro__tabs" role="tablist" aria-label="<?php esc_attr_e( 'Contact options', 'excel-ent' ); ?>">
			<button
				type="button"
				class="contact-intro__tab is-active"
				role="tab"
				id="contact-tab-booking"
				aria-selected="true"
				aria-controls="contact-panel-booking"
				data-contact-tab="booking"
			>
				<span class="contact-intro__tab-eyebrow"><?php esc_html_e( '01 - Booking', 'excel-ent' ); ?></span>
				<span class="contact-intro__tab-label"><?php esc_html_e( 'GET a QUOTE', 'excel-ent' ); ?></span>
			</button>
			<button
				type="button"
				class="contact-intro__tab"
				role="tab"
				id="contact-tab-talent"
				aria-selected="false"
				aria-controls="contact-panel-talent"
				data-contact-tab="talent"
			>
				<span class="contact-intro__tab-eyebrow"><?php esc_html_e( '02 - Talent', 'excel-ent' ); ?></span>
				<span class="contact-intro__tab-label"><?php esc_html_e( 'REGISTER as ARTIST', 'excel-ent' ); ?></span>
			</button>
		</div>
	</header>

	<div
		class="contact-panel is-active"
		id="contact-panel-booking"
		role="tabpanel"
		aria-labelledby="contact-tab-booking"
		data-contact-panel="booking"
	>
		<form class="contact-form" method="post" action="<?php echo esc_url( home_url( '/' ) ); ?>" data-contact-form="booking" novalidate>
			<input type="hidden" name="excel_ent_contact_type" value="booking">

			<div class="contact-accordion" data-contact-accordion data-contact-accordion-multi>
				<!-- Your Details -->
				<section class="contact-acc" data-contact-acc>
					<button type="button" class="contact-acc__toggle" data-contact-acc-toggle aria-expanded="false">
						<span class="contact-acc__heading">
							<span class="contact-acc__icon contact-acc__icon--gradient" aria-hidden="true">
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-user.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							</span>
							<span class="contact-acc__title"><?php esc_html_e( 'Your Details:', 'excel-ent' ); ?></span>
						</span>
						<span class="contact-acc__plus" aria-hidden="true"></span>
					</button>
					<div class="contact-acc__body" data-contact-acc-body hidden>
						<div class="contact-fields">
							<label class="contact-field">
								<span class="contact-field__label"><?php esc_html_e( 'Full Name', 'excel-ent' ); ?></span>
								<input class="contact-field__input" type="text" name="excel_ent_full_name" placeholder="<?php esc_attr_e( 'Alex Johnson', 'excel-ent' ); ?>" autocomplete="name" required>
							</label>
							<label class="contact-field">
								<span class="contact-field__label"><?php esc_html_e( 'Phone Number', 'excel-ent' ); ?></span>
								<input class="contact-field__input" type="tel" name="excel_ent_phone" placeholder="<?php esc_attr_e( '+44 7700 900000', 'excel-ent' ); ?>" autocomplete="tel" required>
							</label>
							<label class="contact-field">
								<span class="contact-field__label"><?php esc_html_e( 'Email address', 'excel-ent' ); ?></span>
								<input class="contact-field__input" type="email" name="excel_ent_email" placeholder="<?php esc_attr_e( 'e.g. hello@example.com', 'excel-ent' ); ?>" autocomplete="email" required>
							</label>
							<?php
							$excel_ent_render_dd(
								array(
									'name'      => 'excel_ent_payment',
									'label'     => __( 'Payment Method', 'excel-ent' ),
									'title'     => __( 'Select payment method', 'excel-ent' ),
									'options'   => $excel_ent_payment_methods,
									'selected'  => $excel_ent_payment_default,
									'required'  => true,
								)
							);
							?>
						</div>
					</div>
				</section>

				<!-- Entertainment Preferences -->
				<section class="contact-acc" data-contact-acc>
					<button type="button" class="contact-acc__toggle" data-contact-acc-toggle aria-expanded="false">
						<span class="contact-acc__heading">
							<span class="contact-acc__icon" aria-hidden="true">
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-music.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							</span>
							<span class="contact-acc__title"><?php esc_html_e( 'Entertainment Preferences:', 'excel-ent' ); ?></span>
						</span>
						<span class="contact-acc__plus" aria-hidden="true"></span>
					</button>
					<div class="contact-acc__body" data-contact-acc-body hidden>
						<div class="contact-prefs" data-artist-prefs>
							<div class="contact-prefs__head">
								<p class="contact-prefs__title"><?php esc_html_e( 'Preferred Artists (ranked)', 'excel-ent' ); ?></p>
								<p class="contact-prefs__count" data-artist-prefs-count><?php esc_html_e( '0 of 5 selected', 'excel-ent' ); ?></p>
							</div>
							<div class="contact-prefs__list" data-artist-prefs-list>
								<div class="contact-prefs__row" data-artist-prefs-row data-rank="1">
									<span class="contact-prefs__rank" data-artist-prefs-rank><?php echo esc_html( $excel_ent_rank_labels[1] ); ?></span>
									<?php
									$excel_ent_render_dd(
										array(
											'name'         => 'excel_ent_artist_pref[]',
											'title'        => __( 'Browse your wish-list', 'excel-ent' ),
											'placeholder'  => __( 'Browse your wish-list', 'excel-ent' ),
											'options'      => $excel_ent_wishlist,
											'selected'     => '',
											'searchable'   => true,
											'search_placeholder' => __( 'Search', 'excel-ent' ),
											'mod'          => 'contact-prefs__select',
											'artist_pref'  => true,
										)
									);
									?>
									<button type="button" class="contact-prefs__remove" data-artist-prefs-remove aria-label="<?php esc_attr_e( 'Remove preference', 'excel-ent' ); ?>" hidden>
										<img src="<?php echo esc_url( $excel_ent_uri . '/icon-remove.svg' ); ?>" alt="" width="24" height="24" decoding="async">
									</button>
								</div>
							</div>
							<button type="button" class="contact-prefs__add" data-artist-prefs-add>
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-add.svg' ); ?>" alt="" width="24" height="24" decoding="async">
								<span><?php esc_html_e( 'Add another preference', 'excel-ent' ); ?></span>
							</button>
							<p class="contact-prefs__hint"><?php esc_html_e( 'Pick up to 5 artists in order. Your 1st choice drives the options below.', 'excel-ent' ); ?></p>

							<template data-artist-prefs-template>
								<div class="contact-prefs__row" data-artist-prefs-row data-rank="2">
									<span class="contact-prefs__rank" data-artist-prefs-rank><?php echo esc_html( $excel_ent_rank_labels[2] ); ?></span>
									<?php
									$excel_ent_render_dd(
										array(
											'name'         => 'excel_ent_artist_pref[]',
											'title'        => __( 'Browse your wish-list', 'excel-ent' ),
											'placeholder'  => __( 'Browse your wish-list', 'excel-ent' ),
											'options'      => $excel_ent_wishlist,
											'selected'     => '',
											'searchable'   => true,
											'search_placeholder' => __( 'Search', 'excel-ent' ),
											'mod'          => 'contact-prefs__select',
											'artist_pref'  => true,
										)
									);
									?>
									<button type="button" class="contact-prefs__remove" data-artist-prefs-remove aria-label="<?php esc_attr_e( 'Remove preference', 'excel-ent' ); ?>">
										<img src="<?php echo esc_url( $excel_ent_uri . '/icon-remove.svg' ); ?>" alt="" width="24" height="24" decoding="async">
									</button>
								</div>
							</template>
							<script type="application/json" data-artist-prefs-ranks><?php echo wp_json_encode( array_values( $excel_ent_rank_labels ) ); ?></script>
						</div>

						<div class="contact-fields contact-fields--prefs">
							<?php
							$excel_ent_render_dd(
								array(
									'name'         => 'excel_ent_ent_type',
									'label'        => __( 'Entertainment Type', 'excel-ent' ),
									'title'        => __( 'Entertainment Type', 'excel-ent' ),
									'placeholder'  => __( 'DJ, Live Band, Comedian...', 'excel-ent' ),
									'options'      => $excel_ent_ent_type_options,
									'selected'     => '',
									'label_strong' => true,
									'searchable'   => true,
									'search_placeholder' => __( 'Search', 'excel-ent' ),
								)
							);
							$excel_ent_render_dd(
								array(
									'name'         => 'excel_ent_package',
									'label'        => __( 'Select Package', 'excel-ent' ),
									'title'        => __( 'Select Package', 'excel-ent' ),
									'placeholder'  => __( 'Select a package or leave blank.', 'excel-ent' ),
									'groups'       => $excel_ent_package_groups,
									'selected'     => '',
									'label_strong' => true,
								)
							);
							?>
							<label class="contact-field">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Event Budget', 'excel-ent' ); ?></span>
								<input class="contact-field__input contact-field__input--muted" type="text" name="excel_ent_budget" placeholder="<?php esc_attr_e( '£500 – £2,000', 'excel-ent' ); ?>">
							</label>
							<fieldset class="contact-field contact-field--radios">
								<legend class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Are you looking for regular entertainment', 'excel-ent' ); ?></legend>
								<div class="contact-radio-inline">
									<div class="contact-radios">
										<label class="contact-radio">
											<input class="contact-radio__input" type="radio" name="excel_ent_regular" value="yes">
											<span class="contact-radio__mark" aria-hidden="true"></span>
											<span class="contact-radio__text"><?php esc_html_e( 'Yes', 'excel-ent' ); ?></span>
										</label>
										<label class="contact-radio">
											<input class="contact-radio__input" type="radio" name="excel_ent_regular" value="no">
											<span class="contact-radio__mark" aria-hidden="true"></span>
											<span class="contact-radio__text"><?php esc_html_e( 'No', 'excel-ent' ); ?></span>
										</label>
									</div>
									<label class="contact-radio-inline__detail">
										<span class="screen-reader-text"><?php esc_html_e( 'Recurring booking details', 'excel-ent' ); ?></span>
										<input class="contact-field__input contact-field__input--muted contact-field__input--light" type="text" name="excel_ent_regular_details" placeholder="<?php esc_attr_e( 'Add details for recurring bookings.', 'excel-ent' ); ?>">
									</label>
								</div>
							</fieldset>
						</div>
					</div>
				</section>

				<!-- Event Details -->
				<section class="contact-acc" data-contact-acc>
					<button type="button" class="contact-acc__toggle" data-contact-acc-toggle aria-expanded="false">
						<span class="contact-acc__heading">
							<span class="contact-acc__icon" aria-hidden="true">
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-calendar.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							</span>
							<span class="contact-acc__title"><?php esc_html_e( 'Event Details:', 'excel-ent' ); ?></span>
						</span>
						<span class="contact-acc__plus" aria-hidden="true"></span>
					</button>
					<div class="contact-acc__body" data-contact-acc-body hidden>
						<div class="contact-fields">
							<label class="contact-field contact-field--icon">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Event Date', 'excel-ent' ); ?></span>
								<span class="contact-field__select-wrap">
									<input class="contact-field__input contact-field__input--muted" type="date" name="excel_ent_event_date" aria-label="<?php esc_attr_e( 'Choose a date', 'excel-ent' ); ?>">
									<img class="contact-field__chevron" src="<?php echo esc_url( $excel_ent_uri . '/icon-calendar-fill.svg' ); ?>" alt="" width="24" height="24" decoding="async">
								</span>
							</label>
							<label class="contact-field contact-field--icon">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Start Time', 'excel-ent' ); ?></span>
								<span class="contact-field__select-wrap">
									<input class="contact-field__input contact-field__input--muted" type="text" name="excel_ent_start_time" placeholder="<?php esc_attr_e( 'e.g. 7:00 PM', 'excel-ent' ); ?>" autocomplete="off">
									<img class="contact-field__chevron" src="<?php echo esc_url( $excel_ent_uri . '/icon-time.svg' ); ?>" alt="" width="24" height="24" decoding="async">
								</span>
							</label>
							<label class="contact-field">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Guest Count', 'excel-ent' ); ?></span>
								<input class="contact-field__input contact-field__input--muted" type="text" name="excel_ent_guests" placeholder="<?php esc_attr_e( 'e.g. 100-80 People', 'excel-ent' ); ?>">
							</label>
							<?php
							$excel_ent_render_dd(
								array(
									'name'               => 'excel_ent_set_length',
									'label'              => __( 'Set Length', 'excel-ent' ),
									'title'              => __( 'Set Length', 'excel-ent' ),
									'placeholder'        => __( 'e.g. 2 hours', 'excel-ent' ),
									'options'            => $excel_ent_set_length_options,
									'selected'           => '',
									'label_strong'       => true,
									'allow_custom'       => true,
									'custom_placeholder' => __( 'Add your own', 'excel-ent' ),
								)
							);
							?>
						</div>
					</div>
				</section>

				<!-- Venue & Logistics -->
				<section class="contact-acc" data-contact-acc>
					<button type="button" class="contact-acc__toggle" data-contact-acc-toggle aria-expanded="false">
						<span class="contact-acc__heading">
							<span class="contact-acc__icon" aria-hidden="true">
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-map-pin.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							</span>
							<span class="contact-acc__title"><?php esc_html_e( 'Venue & Logistics', 'excel-ent' ); ?></span>
						</span>
						<span class="contact-acc__plus" aria-hidden="true"></span>
					</button>
					<div class="contact-acc__body" data-contact-acc-body hidden>
						<div class="contact-fields">
							<label class="contact-field">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Venue Name', 'excel-ent' ); ?></span>
								<input class="contact-field__input contact-field__input--muted contact-field__input--light" type="text" name="excel_ent_venue" placeholder="<?php esc_attr_e( 'e.g. The Grand Ballroom', 'excel-ent' ); ?>">
							</label>
							<label class="contact-field">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Venue Address', 'excel-ent' ); ?></span>
								<input class="contact-field__input contact-field__input--muted contact-field__input--light" type="text" name="excel_ent_venue_address" placeholder="<?php esc_attr_e( 'Full address with postcode', 'excel-ent' ); ?>" autocomplete="street-address">
							</label>
						</div>
						<div class="contact-yesno">
							<fieldset class="contact-yesno__row">
								<legend class="contact-yesno__label"><?php esc_html_e( 'Is PA and Lighting required?', 'excel-ent' ); ?></legend>
								<div class="contact-radios">
									<label class="contact-radio">
										<input class="contact-radio__input" type="radio" name="excel_ent_pa_lighting" value="yes">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text"><?php esc_html_e( 'Yes', 'excel-ent' ); ?></span>
									</label>
									<label class="contact-radio">
										<input class="contact-radio__input" type="radio" name="excel_ent_pa_lighting" value="no">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text"><?php esc_html_e( 'No', 'excel-ent' ); ?></span>
									</label>
								</div>
							</fieldset>
							<fieldset class="contact-yesno__row">
								<legend class="contact-yesno__label"><?php esc_html_e( 'Is there parking?', 'excel-ent' ); ?></legend>
								<div class="contact-radios">
									<label class="contact-radio">
										<input class="contact-radio__input" type="radio" name="excel_ent_parking" value="yes">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text"><?php esc_html_e( 'Yes', 'excel-ent' ); ?></span>
									</label>
									<label class="contact-radio">
										<input class="contact-radio__input" type="radio" name="excel_ent_parking" value="no">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text"><?php esc_html_e( 'No', 'excel-ent' ); ?></span>
									</label>
								</div>
							</fieldset>
							<fieldset class="contact-yesno__row">
								<legend class="contact-yesno__label"><?php esc_html_e( 'Are there stairs involved?', 'excel-ent' ); ?></legend>
								<div class="contact-radios">
									<label class="contact-radio">
										<input class="contact-radio__input" type="radio" name="excel_ent_stairs" value="yes">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text"><?php esc_html_e( 'Yes', 'excel-ent' ); ?></span>
									</label>
									<label class="contact-radio">
										<input class="contact-radio__input" type="radio" name="excel_ent_stairs" value="no">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text"><?php esc_html_e( 'No', 'excel-ent' ); ?></span>
									</label>
								</div>
							</fieldset>
						</div>
					</div>
				</section>

				<!-- Additional Information -->
				<section class="contact-acc" data-contact-acc>
					<button type="button" class="contact-acc__toggle" data-contact-acc-toggle aria-expanded="false">
						<span class="contact-acc__heading">
							<span class="contact-acc__icon" aria-hidden="true">
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-chat.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							</span>
							<span class="contact-acc__title"><?php esc_html_e( 'Additional Information:', 'excel-ent' ); ?></span>
						</span>
						<span class="contact-acc__plus" aria-hidden="true"></span>
					</button>
					<div class="contact-acc__body contact-acc__body--notes" data-contact-acc-body hidden>
						<label class="contact-notes">
							<span class="contact-notes__label"><?php esc_html_e( 'Tell us about your event', 'excel-ent' ); ?></span>
							<textarea class="contact-notes__input" name="excel_ent_notes" rows="4" placeholder="<?php esc_attr_e( 'Guest count, anything else we should know.', 'excel-ent' ); ?>"></textarea>
						</label>
					</div>
				</section>

				<!-- Contact Preference -->
				<section class="contact-acc contact-acc--last" data-contact-acc>
					<button type="button" class="contact-acc__toggle" data-contact-acc-toggle aria-expanded="false">
						<span class="contact-acc__heading">
							<span class="contact-acc__icon" aria-hidden="true">
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-phone.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							</span>
							<span class="contact-acc__title"><?php esc_html_e( 'Contact Preference:', 'excel-ent' ); ?></span>
						</span>
						<span class="contact-acc__plus" aria-hidden="true"></span>
					</button>
					<div class="contact-acc__body" data-contact-acc-body hidden>
						<fieldset class="contact-pref">
							<legend class="contact-pref__legend"><?php esc_html_e( 'How should we contact you?', 'excel-ent' ); ?></legend>
							<div class="contact-pref__row">
								<div class="contact-radios contact-radios--pref">
									<label class="contact-radio contact-radio--pref">
										<input class="contact-radio__input" type="radio" name="excel_ent_contact_pref" value="email" checked>
										<span class="contact-radio__mark contact-radio__mark--filled" aria-hidden="true"></span>
										<span class="contact-radio__text contact-radio__text--pref"><?php esc_html_e( 'Email', 'excel-ent' ); ?></span>
									</label>
									<label class="contact-radio contact-radio--pref">
										<input class="contact-radio__input" type="radio" name="excel_ent_contact_pref" value="phone">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text contact-radio__text--pref"><?php esc_html_e( 'Phone call', 'excel-ent' ); ?></span>
									</label>
									<label class="contact-radio contact-radio--pref">
										<input class="contact-radio__input" type="radio" name="excel_ent_contact_pref" value="text">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text contact-radio__text--pref"><?php esc_html_e( 'Text message/Whatsapp', 'excel-ent' ); ?></span>
									</label>
								</div>
								<label class="contact-pref__detail">
									<span class="screen-reader-text"><?php esc_html_e( 'Contact details', 'excel-ent' ); ?></span>
									<input class="contact-field__input contact-field__input--muted contact-field__input--light" type="text" name="excel_ent_contact_details" placeholder="<?php esc_attr_e( 'Add details,  e.g. best time to reach you', 'excel-ent' ); ?>">
								</label>
							</div>
						</fieldset>
					</div>
				</section>
			</div>

			<div class="contact-form__footer">
				<label class="contact-agree">
					<input class="contact-agree__input" type="checkbox" name="excel_ent_agree" value="1" required>
					<span class="contact-agree__box" aria-hidden="true"></span>
					<span class="contact-agree__text contact-agree__text--regular">
						<?php
						echo wp_kses(
							sprintf(
								/* translators: %s: privacy policy link */
								__( 'I agree to the %s and consent to my information being used to prepare and send my quote.', 'excel-ent' ),
								'<a href="' . esc_url( home_url( '/privacy-policy/' ) ) . '">' . esc_html__( 'Privacy Policy', 'excel-ent' ) . '</a>'
							),
							array(
								'a' => array(
									'href' => true,
								),
							)
						);
						?>
					</span>
				</label>

				<button class="contact-form__submit magnetic" type="submit">
					<?php esc_html_e( 'Get A Quote', 'excel-ent' ); ?>
				</button>
				<p class="contact-form__note">
					<?php esc_html_e( "Enquiry-based booking — a member of our team will confirm availability and pricing directly, this isn't an instant checkout.", 'excel-ent' ); ?>
				</p>
			</div>
		</form>
	</div>

	<div
		class="contact-panel"
		id="contact-panel-talent"
		role="tabpanel"
		aria-labelledby="contact-tab-talent"
		data-contact-panel="talent"
		hidden
	>
		<form
			class="contact-form"
			method="post"
			action="<?php echo esc_url( home_url( '/artist-registration/' ) ); ?>"
			enctype="multipart/form-data"
			data-contact-form="talent"
			novalidate
		>
			<input type="hidden" name="excel_ent_contact_type" value="talent">

			<div class="contact-accordion" data-contact-accordion data-contact-accordion-multi>
				<!-- Your Personal Details -->
				<section class="contact-acc" data-contact-acc>
					<button type="button" class="contact-acc__toggle" data-contact-acc-toggle aria-expanded="false">
						<span class="contact-acc__heading">
							<span class="contact-acc__icon contact-acc__icon--gradient" aria-hidden="true">
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-user.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							</span>
							<span class="contact-acc__title"><?php esc_html_e( 'Your Personal Details:', 'excel-ent' ); ?></span>
						</span>
						<span class="contact-acc__plus" aria-hidden="true"></span>
					</button>
					<div class="contact-acc__body" data-contact-acc-body hidden>
						<div class="contact-fields">
							<label class="contact-field">
								<span class="contact-field__label"><?php esc_html_e( 'Full Name', 'excel-ent' ); ?></span>
								<input class="contact-field__input" type="text" name="excel_ent_full_name" placeholder="<?php esc_attr_e( 'Alex Johnson', 'excel-ent' ); ?>" autocomplete="name" required>
							</label>
							<label class="contact-field">
								<span class="contact-field__label"><?php esc_html_e( 'Stage name', 'excel-ent' ); ?></span>
								<input class="contact-field__input" type="text" name="excel_ent_stage_name" placeholder="<?php esc_attr_e( 'Alex Rocksz', 'excel-ent' ); ?>" required>
							</label>
							<label class="contact-field">
								<span class="contact-field__label"><?php esc_html_e( 'Email address', 'excel-ent' ); ?></span>
								<input class="contact-field__input" type="email" name="excel_ent_email" placeholder="<?php esc_attr_e( 'hello@example.com', 'excel-ent' ); ?>" autocomplete="email" required>
							</label>
							<label class="contact-field">
								<span class="contact-field__label"><?php esc_html_e( 'Phone Number', 'excel-ent' ); ?></span>
								<input class="contact-field__input" type="tel" name="excel_ent_phone" placeholder="<?php esc_attr_e( '+44 7700 900000', 'excel-ent' ); ?>" autocomplete="tel" required>
							</label>
							<label class="contact-field contact-field--full contact-field--textarea">
								<span class="contact-field__label"><?php esc_html_e( 'Registered address', 'excel-ent' ); ?></span>
								<textarea class="contact-field__input contact-field__textarea" name="excel_ent_address" rows="4" placeholder="<?php esc_attr_e( "123 King Street, Flat 4B\nManchester\nM1 2AB\nUnited Kingdom", 'excel-ent' ); ?>" autocomplete="street-address"></textarea>
							</label>
						</div>
					</div>
				</section>

				<!-- Performance Details -->
				<section class="contact-acc" data-contact-acc>
					<button type="button" class="contact-acc__toggle" data-contact-acc-toggle aria-expanded="false">
						<span class="contact-acc__heading">
							<span class="contact-acc__icon" aria-hidden="true">
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-music.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							</span>
							<span class="contact-acc__title"><?php esc_html_e( 'Performance Details:', 'excel-ent' ); ?></span>
						</span>
						<span class="contact-acc__plus" aria-hidden="true"></span>
					</button>
					<div class="contact-acc__body" data-contact-acc-body hidden>
						<div class="contact-fields">
							<?php
							$excel_ent_render_dd(
								array(
									'name'         => 'excel_ent_years',
									'label'        => __( 'Years Performing', 'excel-ent' ),
									'title'        => __( 'Select number of years', 'excel-ent' ),
									'placeholder'  => __( 'Select number of years', 'excel-ent' ),
									'options'      => $excel_ent_years_options,
									'selected'     => '',
									'label_strong' => true,
								)
							);
							?>
							<label class="contact-field">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Rate / Price Range', 'excel-ent' ); ?></span>
								<input class="contact-field__input contact-field__input--muted" type="text" name="excel_ent_rate" placeholder="<?php esc_attr_e( 'starting from £', 'excel-ent' ); ?>">
							</label>
							<?php
							$excel_ent_render_dd(
								array(
									'name'               => 'excel_ent_perf_category',
									'label'              => __( 'Performance Category', 'excel-ent' ),
									'title'              => __( 'Performance Category', 'excel-ent' ),
									'placeholder'        => __( 'e.g. Band, DJ, Magician', 'excel-ent' ),
									'options'            => $excel_ent_perf_categories,
									'selected'           => '',
									'label_strong'       => true,
									'searchable'         => true,
									'search_placeholder' => __( 'Search', 'excel-ent' ),
								)
							);
							$excel_ent_render_dd(
								array(
									'name'               => 'excel_ent_offer',
									'label'              => __( 'What You Offer', 'excel-ent' ),
									'title'              => __( 'What You Offer', 'excel-ent' ),
									'placeholder'        => __( 'show like to be listed?', 'excel-ent' ),
									'options'            => $excel_ent_offer_options,
									'selected'           => '',
									'label_strong'       => true,
									'allow_custom'       => true,
									'custom_placeholder' => __( 'Add your own', 'excel-ent' ),
									'scrollable'         => true,
								)
							);
							?>
						</div>
					</div>
				</section>

				<!-- Media & Reviews -->
				<section class="contact-acc" data-contact-acc>
					<button type="button" class="contact-acc__toggle" data-contact-acc-toggle aria-expanded="false">
						<span class="contact-acc__heading">
							<span class="contact-acc__icon" aria-hidden="true">
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-camera.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							</span>
							<span class="contact-acc__title"><?php esc_html_e( 'Media & Reviews:', 'excel-ent' ); ?></span>
						</span>
						<span class="contact-acc__plus" aria-hidden="true"></span>
					</button>
					<div class="contact-acc__body" data-contact-acc-body hidden>
						<div class="contact-fields">
							<div class="contact-field contact-field--file">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Headshot', 'excel-ent' ); ?></span>
								<label class="contact-file" data-contact-file>
									<input class="contact-file__input" type="file" name="excel_ent_headshot[]" accept="image/*" multiple data-contact-file-input data-contact-file-max="2">
									<span class="contact-file__text" data-contact-file-label><?php esc_html_e( 'Upload 1-2 images', 'excel-ent' ); ?></span>
									<img class="contact-file__icon" src="<?php echo esc_url( $excel_ent_uri . '/icon-attachment.svg' ); ?>" alt="" width="24" height="24" decoding="async">
								</label>
							</div>
							<label class="contact-field">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'References', 'excel-ent' ); ?></span>
								<input class="contact-field__input contact-field__input--muted" type="text" name="excel_ent_references" placeholder="<?php esc_attr_e( 'Paste links or write a brief summary', 'excel-ent' ); ?>">
							</label>
							<div class="contact-field contact-field--file">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Performance Photos', 'excel-ent' ); ?></span>
								<label class="contact-file" data-contact-file>
									<input class="contact-file__input" type="file" name="excel_ent_photos[]" accept="image/*" multiple data-contact-file-input data-contact-file-max="8">
									<span class="contact-file__text" data-contact-file-label><?php esc_html_e( 'Upload 7-8 images', 'excel-ent' ); ?></span>
									<img class="contact-file__icon" src="<?php echo esc_url( $excel_ent_uri . '/icon-attachment.svg' ); ?>" alt="" width="24" height="24" decoding="async">
								</label>
							</div>
							<label class="contact-field">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Video Links', 'excel-ent' ); ?></span>
								<input class="contact-field__input contact-field__input--muted" type="url" name="excel_ent_video_links" placeholder="<?php esc_attr_e( 'YouTube, Vimeo, etc.', 'excel-ent' ); ?>">
							</label>
							<label class="contact-field">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Portfolio Website Link', 'excel-ent' ); ?></span>
								<input class="contact-field__input contact-field__input--muted" type="url" name="excel_ent_portfolio" placeholder="<?php esc_attr_e( 'Add a link (Optional)', 'excel-ent' ); ?>">
							</label>
							<label class="contact-field">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Social Media links', 'excel-ent' ); ?></span>
								<input class="contact-field__input contact-field__input--muted" type="text" name="excel_ent_social" placeholder="<?php esc_attr_e( 'link', 'excel-ent' ); ?>">
							</label>
							<label class="contact-field contact-field--full">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Performance Offerings', 'excel-ent' ); ?></span>
								<input class="contact-field__input contact-field__input--muted" type="text" name="excel_ent_offerings" placeholder="<?php esc_attr_e( 'List the acts, songs playlist links, routines, or performance styles you offer.', 'excel-ent' ); ?>">
							</label>
						</div>
					</div>
				</section>

				<!-- Travel & Technical Information -->
				<section class="contact-acc" data-contact-acc>
					<button type="button" class="contact-acc__toggle" data-contact-acc-toggle aria-expanded="false">
						<span class="contact-acc__heading">
							<span class="contact-acc__icon" aria-hidden="true">
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-task.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							</span>
							<span class="contact-acc__title"><?php esc_html_e( 'Travel & Technical Information:', 'excel-ent' ); ?></span>
						</span>
						<span class="contact-acc__plus" aria-hidden="true"></span>
					</button>
					<div class="contact-acc__body" data-contact-acc-body hidden>
						<div class="contact-fields contact-fields--single">
							<?php
							$excel_ent_render_dd(
								array(
									'name'         => 'excel_ent_travel',
									'label'        => __( 'Travel radius', 'excel-ent' ),
									'title'        => __( 'Travel radius', 'excel-ent' ),
									'placeholder'  => __( 'Areas covers', 'excel-ent' ),
									'options'      => $excel_ent_travel_options,
									'selected'     => '',
									'label_strong' => true,
									'mod'          => 'contact-field--full',
								)
							);
							?>
							<label class="contact-field contact-field--full">
								<span class="contact-field__label contact-field__label--strong"><?php esc_html_e( 'Technical Requirements', 'excel-ent' ); ?></span>
								<input class="contact-field__input contact-field__input--muted contact-field__input--light" type="text" name="excel_ent_tech" placeholder="<?php esc_attr_e( 'Sound, lighting, and staging needs', 'excel-ent' ); ?>">
							</label>
						</div>
						<div class="contact-yesno">
							<fieldset class="contact-yesno__row">
								<legend class="contact-yesno__label"><?php esc_html_e( 'Do you have Public Liability Insurance?', 'excel-ent' ); ?></legend>
								<div class="contact-radios">
									<label class="contact-radio">
										<input class="contact-radio__input" type="radio" name="excel_ent_pli" value="yes">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text"><?php esc_html_e( 'Yes', 'excel-ent' ); ?></span>
									</label>
									<label class="contact-radio">
										<input class="contact-radio__input" type="radio" name="excel_ent_pli" value="no">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text"><?php esc_html_e( 'No', 'excel-ent' ); ?></span>
									</label>
								</div>
							</fieldset>
							<fieldset class="contact-yesno__row">
								<legend class="contact-yesno__label"><?php esc_html_e( 'Is all equipment P.A.T. tested?', 'excel-ent' ); ?></legend>
								<div class="contact-radios">
									<label class="contact-radio">
										<input class="contact-radio__input" type="radio" name="excel_ent_pat" value="yes">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text"><?php esc_html_e( 'Yes', 'excel-ent' ); ?></span>
									</label>
									<label class="contact-radio">
										<input class="contact-radio__input" type="radio" name="excel_ent_pat" value="no">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text"><?php esc_html_e( 'No', 'excel-ent' ); ?></span>
									</label>
								</div>
							</fieldset>
						</div>
					</div>
				</section>

				<!-- Artist bio -->
				<section class="contact-acc" data-contact-acc>
					<button type="button" class="contact-acc__toggle" data-contact-acc-toggle aria-expanded="false">
						<span class="contact-acc__heading">
							<span class="contact-acc__icon" aria-hidden="true">
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-chat.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							</span>
							<span class="contact-acc__title"><?php esc_html_e( 'Artist bio:', 'excel-ent' ); ?></span>
						</span>
						<span class="contact-acc__plus" aria-hidden="true"></span>
					</button>
					<div class="contact-acc__body contact-acc__body--notes" data-contact-acc-body hidden>
						<label class="contact-notes">
							<span class="contact-notes__label"><?php esc_html_e( 'Tell us about yourself', 'excel-ent' ); ?></span>
							<textarea class="contact-notes__input" name="excel_ent_bio" rows="4" placeholder="<?php esc_attr_e( 'Tell us about yourself, your performances, your booking history, and what makes your act stand out', 'excel-ent' ); ?>"></textarea>
						</label>
					</div>
				</section>

				<!-- Contact Preference -->
				<section class="contact-acc contact-acc--last" data-contact-acc>
					<button type="button" class="contact-acc__toggle" data-contact-acc-toggle aria-expanded="false">
						<span class="contact-acc__heading">
							<span class="contact-acc__icon" aria-hidden="true">
								<img src="<?php echo esc_url( $excel_ent_uri . '/icon-phone.svg' ); ?>" alt="" width="24" height="24" decoding="async">
							</span>
							<span class="contact-acc__title"><?php esc_html_e( 'Contact Preference:', 'excel-ent' ); ?></span>
						</span>
						<span class="contact-acc__plus" aria-hidden="true"></span>
					</button>
					<div class="contact-acc__body" data-contact-acc-body hidden>
						<fieldset class="contact-pref">
							<legend class="contact-pref__legend"><?php esc_html_e( 'How should we contact you?', 'excel-ent' ); ?></legend>
							<div class="contact-pref__row">
								<div class="contact-radios contact-radios--pref">
									<label class="contact-radio contact-radio--pref">
										<input class="contact-radio__input" type="radio" name="excel_ent_talent_contact_pref" value="email" checked>
										<span class="contact-radio__mark contact-radio__mark--filled" aria-hidden="true"></span>
										<span class="contact-radio__text contact-radio__text--pref"><?php esc_html_e( 'Email', 'excel-ent' ); ?></span>
									</label>
									<label class="contact-radio contact-radio--pref">
										<input class="contact-radio__input" type="radio" name="excel_ent_talent_contact_pref" value="phone">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text contact-radio__text--pref"><?php esc_html_e( 'Phone call', 'excel-ent' ); ?></span>
									</label>
									<label class="contact-radio contact-radio--pref">
										<input class="contact-radio__input" type="radio" name="excel_ent_talent_contact_pref" value="text">
										<span class="contact-radio__mark" aria-hidden="true"></span>
										<span class="contact-radio__text contact-radio__text--pref"><?php esc_html_e( 'Text message/Whatsapp', 'excel-ent' ); ?></span>
									</label>
								</div>
								<label class="contact-pref__detail">
									<span class="screen-reader-text"><?php esc_html_e( 'Contact details', 'excel-ent' ); ?></span>
									<input class="contact-field__input contact-field__input--muted contact-field__input--light" type="text" name="excel_ent_talent_contact_details" placeholder="<?php esc_attr_e( 'Add details,  e.g. best time to reach you', 'excel-ent' ); ?>">
								</label>
							</div>
						</fieldset>
					</div>
				</section>
			</div>

			<div class="contact-form__footer">
				<label class="contact-agree">
					<input class="contact-agree__input" type="checkbox" name="excel_ent_agree" value="1" required>
					<span class="contact-agree__box" aria-hidden="true"></span>
					<span class="contact-agree__text contact-agree__text--regular">
						<?php esc_html_e( 'I agree for my content to be shared on the Excel website. Please check this box before you submit', 'excel-ent' ); ?>
					</span>
				</label>

				<button class="contact-form__submit magnetic" type="submit">
					<?php esc_html_e( 'Register as Artist', 'excel-ent' ); ?>
				</button>
				<p class="contact-form__note">
					<?php esc_html_e( 'Our team will get back to you within 24 hours.', 'excel-ent' ); ?>
				</p>
			</div>
		</form>
	</div>
</section>

<section class="contact-quick" aria-label="<?php esc_attr_e( 'Quick contacts', 'excel-ent' ); ?>">
	<h2 class="contact-quick__title"><?php esc_html_e( 'Quick contacts', 'excel-ent' ); ?></h2>
	<div class="contact-quick__grid">
		<div class="contact-quick__item">
			<p class="contact-quick__label"><?php esc_html_e( 'EMAIL ADDRESS', 'excel-ent' ); ?></p>
			<a class="contact-quick__value" href="<?php echo esc_url( 'mailto:' . $excel_ent_email ); ?>">
				<?php echo esc_html( $excel_ent_email ); ?>
			</a>
		</div>
		<div class="contact-quick__item">
			<p class="contact-quick__label"><?php esc_html_e( 'PHONE NUMBER', 'excel-ent' ); ?></p>
			<a
				class="contact-quick__value"
				href="<?php echo esc_url( 'tel:' . preg_replace( '/[^0-9+]/', '', $excel_ent_phone ? $excel_ent_phone : '07853328638' ) ); ?>"
			>
				<?php echo esc_html( $excel_ent_phone ? $excel_ent_phone : '07853 328638' ); ?>
			</a>
		</div>
	</div>
	<figure class="contact-quick__map">
		<img
			src="<?php echo esc_url( $excel_ent_uri . '/quick-map.jpg' ); ?>"
			alt="<?php esc_attr_e( 'Excel Entertainment location map — Rochdale, United Kingdom', 'excel-ent' ); ?>"
			width="1761"
			height="680"
			loading="lazy"
			decoding="async"
		>
	</figure>
</section>
