<?php
/**
 * Custom post types.
 *
 * @package Excel_Ent
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Brand Logo CPT for the partner marquee.
 */
function excel_ent_register_brand_logo_cpt() {
	$labels = array(
		'name'                  => __( 'Brand Logos', 'excel-ent' ),
		'singular_name'         => __( 'Brand Logo', 'excel-ent' ),
		'menu_name'             => __( 'Brand Logos', 'excel-ent' ),
		'name_admin_bar'        => __( 'Brand Logo', 'excel-ent' ),
		'add_new'               => __( 'Add New', 'excel-ent' ),
		'add_new_item'          => __( 'Add New Brand Logo', 'excel-ent' ),
		'new_item'              => __( 'New Brand Logo', 'excel-ent' ),
		'edit_item'             => __( 'Edit Brand Logo', 'excel-ent' ),
		'view_item'             => __( 'View Brand Logo', 'excel-ent' ),
		'all_items'             => __( 'All Brand Logos', 'excel-ent' ),
		'search_items'          => __( 'Search Brand Logos', 'excel-ent' ),
		'not_found'             => __( 'No brand logos found.', 'excel-ent' ),
		'not_found_in_trash'    => __( 'No brand logos found in Trash.', 'excel-ent' ),
		'featured_image'        => __( 'Logo image', 'excel-ent' ),
		'set_featured_image'    => __( 'Set logo image', 'excel-ent' ),
		'remove_featured_image' => __( 'Remove logo image', 'excel-ent' ),
		'use_featured_image'    => __( 'Use as logo image', 'excel-ent' ),
	);

	register_post_type(
		'brand_logo',
		array(
			'labels'              => $labels,
			'description'         => __( 'Partner / brand logos shown in the homepage and About marquee.', 'excel-ent' ),
			'public'              => false,
			'publicly_queryable'  => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_nav_menus'   => false,
			'show_in_admin_bar'   => true,
			'show_in_rest'        => true,
			'menu_position'       => 22,
			'menu_icon'           => 'dashicons-awards',
			'capability_type'     => 'post',
			'hierarchical'        => false,
			'supports'            => array( 'title', 'thumbnail', 'page-attributes' ),
			'has_archive'         => false,
			'rewrite'             => false,
			'exclude_from_search' => true,
		)
	);
}
add_action( 'init', 'excel_ent_register_brand_logo_cpt' );

/**
 * Brand logo edit meta boxes.
 */
function excel_ent_brand_logo_meta_boxes() {
	add_meta_box(
		'excel_ent_brand_logo_options',
		__( 'Logo options', 'excel-ent' ),
		'excel_ent_brand_logo_options_render',
		'brand_logo',
		'side',
		'default'
	);
}
add_action( 'add_meta_boxes', 'excel_ent_brand_logo_meta_boxes' );

/**
 * Render logo options meta box.
 *
 * @param WP_Post $post Post.
 */
function excel_ent_brand_logo_options_render( $post ) {
	wp_nonce_field( 'excel_ent_brand_logo_options', 'excel_ent_brand_logo_options_nonce' );

	$panel = (bool) get_post_meta( $post->ID, '_excel_ent_logo_panel', true );
	?>
	<p>
		<label for="excel_ent_logo_panel">
			<input
				type="checkbox"
				name="excel_ent_logo_panel"
				id="excel_ent_logo_panel"
				value="1"
				<?php checked( $panel ); ?>
			>
			<?php esc_html_e( 'White panel background', 'excel-ent' ); ?>
		</label>
	</p>
	<p class="description">
		<?php esc_html_e( 'Use for dark logos that need a light plate (e.g. Greene King).', 'excel-ent' ); ?>
	</p>
	<p class="description">
		<?php esc_html_e( 'Set the Featured Image to the logo (SVG or PNG). Use Order under Page Attributes to control the marquee sequence.', 'excel-ent' ); ?>
	</p>
	<?php
}

/**
 * Save brand logo options.
 *
 * @param int $post_id Post ID.
 */
function excel_ent_brand_logo_options_save( $post_id ) {
	if ( ! isset( $_POST['excel_ent_brand_logo_options_nonce'] ) ) {
		return;
	}

	if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['excel_ent_brand_logo_options_nonce'] ) ), 'excel_ent_brand_logo_options' ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	if ( 'brand_logo' !== get_post_type( $post_id ) ) {
		return;
	}

	$panel = isset( $_POST['excel_ent_logo_panel'] ) ? '1' : '';
	update_post_meta( $post_id, '_excel_ent_logo_panel', $panel );
}
add_action( 'save_post_brand_logo', 'excel_ent_brand_logo_options_save' );

/**
 * Admin columns for brand logos.
 *
 * @param array $columns Columns.
 * @return array
 */
function excel_ent_brand_logo_columns( $columns ) {
	$new = array();
	foreach ( $columns as $key => $label ) {
		$new[ $key ] = $label;
		if ( 'title' === $key ) {
			$new['excel_ent_logo']  = __( 'Logo', 'excel-ent' );
			$new['excel_ent_order'] = __( 'Order', 'excel-ent' );
		}
	}
	return $new;
}
add_filter( 'manage_brand_logo_posts_columns', 'excel_ent_brand_logo_columns' );

/**
 * Render brand logo admin columns.
 *
 * @param string $column  Column key.
 * @param int    $post_id Post ID.
 */
function excel_ent_brand_logo_column_content( $column, $post_id ) {
	if ( 'excel_ent_logo' === $column ) {
		if ( has_post_thumbnail( $post_id ) ) {
			echo get_the_post_thumbnail( $post_id, array( 80, 48 ) );
		} else {
			echo '&mdash;';
		}
		return;
	}

	if ( 'excel_ent_order' === $column ) {
		$post = get_post( $post_id );
		echo esc_html( (string) ( $post ? (int) $post->menu_order : 0 ) );
	}
}
add_action( 'manage_brand_logo_posts_custom_column', 'excel_ent_brand_logo_column_content', 10, 2 );

/**
 * Allow SVG uploads for admins (brand logos).
 *
 * @param array $mimes Mime types.
 * @return array
 */
function excel_ent_allow_svg_uploads( $mimes ) {
	if ( current_user_can( 'manage_options' ) ) {
		$mimes['svg']  = 'image/svg+xml';
		$mimes['svgz'] = 'image/svg+xml';
	}
	return $mimes;
}
add_filter( 'upload_mimes', 'excel_ent_allow_svg_uploads' );

/**
 * Fix SVG filetype detection for WordPress uploads.
 *
 * @param array  $data     File data.
 * @param string $file     File path.
 * @param string $filename Filename.
 * @param array  $mimes    Mimes.
 * @return array
 */
function excel_ent_fix_svg_filetype( $data, $file, $filename, $mimes ) {
	if ( ! current_user_can( 'manage_options' ) ) {
		return $data;
	}

	$ext = strtolower( pathinfo( $filename, PATHINFO_EXTENSION ) );
	if ( 'svg' !== $ext && 'svgz' !== $ext ) {
		return $data;
	}

	$data['ext']  = $ext;
	$data['type'] = 'image/svg+xml';
	return $data;
}
add_filter( 'wp_check_filetype_and_ext', 'excel_ent_fix_svg_filetype', 10, 4 );

/**
 * Default hardcoded partner logos (used when no Brand Logo posts exist).
 *
 * @return array<int, array<string, mixed>>
 */
function excel_ent_get_default_brand_logos() {
	$uri = EXCEL_ENT_URI . '/assets/images/awards';

	return array(
		array(
			'slug'   => 'craft-union',
			'src'    => $uri . '/craft-union.svg',
			'alt'    => __( 'Craft Union', 'excel-ent' ),
			'width'  => 100,
			'height' => 103,
			'object' => true,
		),
		array(
			'slug'   => 'urban-village',
			'src'    => $uri . '/urban-village.svg',
			'alt'    => __( 'Urban Village Pub Company', 'excel-ent' ),
			'width'  => 109,
			'height' => 76,
		),
		array(
			'slug'   => 'gig-realm',
			'src'    => $uri . '/gig-realm.svg',
			'alt'    => __( 'GigRealm', 'excel-ent' ),
			'width'  => 156,
			'height' => 33,
		),
		array(
			'slug'   => 'stonegate',
			'src'    => $uri . '/stonegate.svg',
			'alt'    => __( 'Stonegate Pub Company', 'excel-ent' ),
			'width'  => 155,
			'height' => 35,
			'object' => true,
		),
		array(
			'slug'   => 'greene-king',
			'src'    => $uri . '/greene-king.svg',
			'alt'    => __( 'Greene King Brewery', 'excel-ent' ),
			'width'  => 68,
			'height' => 103,
			'object' => true,
			'panel'  => true,
		),
	);
}

/**
 * Brand logos for the marquee — CPT posts, or defaults if none published.
 *
 * @return array<int, array<string, mixed>>
 */
function excel_ent_get_brand_logos() {
	$query = new WP_Query(
		array(
			'post_type'              => 'brand_logo',
			'post_status'            => 'publish',
			'posts_per_page'         => 50,
			'orderby'                => array(
				'menu_order' => 'ASC',
				'title'      => 'ASC',
			),
			'no_found_rows'          => true,
			'update_post_meta_cache' => true,
			'update_post_term_cache' => false,
		)
	);

	if ( ! $query->have_posts() ) {
		return excel_ent_get_default_brand_logos();
	}

	$logos = array();

	foreach ( $query->posts as $post ) {
		$thumb_id = get_post_thumbnail_id( $post );
		if ( ! $thumb_id ) {
			continue;
		}

		$src = wp_get_attachment_image_url( $thumb_id, 'full' );
		if ( ! $src ) {
			continue;
		}

		$meta   = wp_get_attachment_metadata( $thumb_id );
		$width  = ! empty( $meta['width'] ) ? (int) $meta['width'] : 156;
		$height = ! empty( $meta['height'] ) ? (int) $meta['height'] : 103;
		$mime   = get_post_mime_type( $thumb_id );
		$is_svg = $mime && false !== strpos( $mime, 'svg' );

		$logos[] = array(
			'slug'   => $post->post_name ? $post->post_name : 'brand-' . $post->ID,
			'src'    => $src,
			'alt'    => get_the_title( $post ) ? get_the_title( $post ) : __( 'Partner logo', 'excel-ent' ),
			'width'  => max( 1, $width ),
			'height' => max( 1, $height ),
			'object' => $is_svg,
			'panel'  => (bool) get_post_meta( $post->ID, '_excel_ent_logo_panel', true ),
		);
	}

	wp_reset_postdata();

	return $logos ? $logos : excel_ent_get_default_brand_logos();
}
