<?php
/**
 * Front page template.
 *
 * @package Excel_Ent
 */

get_header();

$excel_ent_quote = excel_ent_get_quote_url();
$excel_ent_join  = home_url( '/artist-registration/' );

$excel_ent_hero_slides = array(
	array(
		'label' => __( 'Corporate event', 'excel-ent' ),
		'image' => EXCEL_ENT_URI . '/assets/images/hero/slide-corporate.png',
	),
	array(
		'label' => __( 'Wedding celebration', 'excel-ent' ),
		'image' => EXCEL_ENT_URI . '/assets/images/hero/slide-corporate.png',
	),
	array(
		'label' => __( 'Pub night', 'excel-ent' ),
		'image' => EXCEL_ENT_URI . '/assets/images/hero/slide-corporate.png',
	),
);
?>

<section class="hero" id="hero" aria-label="<?php esc_attr_e( 'Hero', 'excel-ent' ); ?>">
	<div class="hero__media" aria-hidden="true">
		<img
			class="hero__bg"
			src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/hero/hero-bg-desktop.jpg' ); ?>"
			alt=""
			width="1920"
			height="1080"
			decoding="async"
			fetchpriority="high"
		>
		<span class="hero__overlay"></span>
	</div>

	<div class="hero__layout">
		<div class="hero__copy">
			<h1 class="hero__title">
				<span class="hero__title-line"><?php esc_html_e( 'THE STAGE', 'excel-ent' ); ?></span>
				<span class="hero__title-line"><?php esc_html_e( 'IS SET', 'excel-ent' ); ?></span>
			</h1>

			<p class="hero__lede">
				<?php esc_html_e( 'Personally auditioned artists for weddings, pubs, clubs, and corporate events. Every act seen live — every booking guaranteed.', 'excel-ent' ); ?>
			</p>

			<div class="hero__actions">
				<a class="btn-hero btn-hero--primary magnetic" href="<?php echo esc_url( $excel_ent_quote ); ?>">
					<?php esc_html_e( 'Book an Artist', 'excel-ent' ); ?>
				</a>
				<a class="btn-hero btn-hero--outline magnetic" href="<?php echo esc_url( $excel_ent_join ); ?>">
					<?php esc_html_e( 'Join as an Artist', 'excel-ent' ); ?>
				</a>
			</div>
		</div>

		<aside class="hero__stats" aria-label="<?php esc_attr_e( 'Company statistics', 'excel-ent' ); ?>">
			<div class="hero-stat">
				<p class="hero-stat__num" data-count="25" data-suffix="+">0</p>
				<p class="hero-stat__label"><?php esc_html_e( 'Years Established', 'excel-ent' ); ?></p>
			</div>
			<div class="hero-stat">
				<p class="hero-stat__num" data-count="500" data-suffix="+">0</p>
				<p class="hero-stat__label"><?php esc_html_e( 'Acts on Roster', 'excel-ent' ); ?></p>
			</div>
			<div class="hero-stat">
				<p class="hero-stat__num" data-count="1200" data-suffix="+">0</p>
				<p class="hero-stat__label"><?php esc_html_e( 'Events Booked', 'excel-ent' ); ?></p>
			</div>
			<div class="hero-stat">
				<p class="hero-stat__num" data-count="100" data-suffix="%">0</p>
				<p class="hero-stat__label"><?php esc_html_e( 'Auditioned Acts', 'excel-ent' ); ?></p>
			</div>
		</aside>

		<div class="hero__carousel" data-hero-carousel>
			<div class="hero-carousel__nav">
				<button
					type="button"
					class="hero-carousel__btn hero-carousel__btn--prev magnetic"
					data-carousel-prev
					aria-label="<?php esc_attr_e( 'Previous slide', 'excel-ent' ); ?>"
				>
					<img
						src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/hero/arrow-left.svg' ); ?>"
						alt=""
						width="35"
						height="35"
						decoding="async"
					>
				</button>

				<div class="hero-carousel__media">
					<img
						class="hero-carousel__ring"
						src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/hero/carousel-ring.svg' ); ?>"
						alt=""
						width="129"
						height="129"
						decoding="async"
					>
					<img
						class="hero-carousel__thumb"
						data-carousel-image
						src="<?php echo esc_url( $excel_ent_hero_slides[0]['image'] ); ?>"
						alt=""
						width="91"
						height="91"
						decoding="async"
					>
				</div>

				<button
					type="button"
					class="hero-carousel__btn hero-carousel__btn--next magnetic"
					data-carousel-next
					aria-label="<?php esc_attr_e( 'Next slide', 'excel-ent' ); ?>"
				>
					<img
						src="<?php echo esc_url( EXCEL_ENT_URI . '/assets/images/hero/arrow-right.svg' ); ?>"
						alt=""
						width="34"
						height="34"
						decoding="async"
					>
				</button>
			</div>

			<p class="hero-carousel__label" data-carousel-label><?php echo esc_html( $excel_ent_hero_slides[0]['label'] ); ?></p>

			<div class="hero-carousel__progress" aria-hidden="true">
				<span class="hero-carousel__track"></span>
				<span class="hero-carousel__fill" data-carousel-fill></span>
			</div>

			<script type="application/json" data-carousel-slides>
				<?php echo wp_json_encode( $excel_ent_hero_slides ); ?>
			</script>
		</div>
	</div>
</section>

<?php get_template_part( 'template-parts/section', 'awards' ); ?>

<?php get_template_part( 'template-parts/section', 'artists' ); ?>

<?php get_template_part( 'template-parts/section', 'excel-way' ); ?>

<?php get_template_part( 'template-parts/section', 'venues' ); ?>

<?php get_template_part( 'template-parts/section', 'services' ); ?>

<?php get_template_part( 'template-parts/section', 'cta-neon' ); ?>

<?php
get_footer();
