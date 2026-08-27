<?php
/**
 * Front page template.
 *
 * @package Excel_Ent
 */

get_header();

$excel_ent_contact     = home_url( '/contact-us/' );
$excel_ent_join        = home_url( '/contact-us/#talent' );
$excel_ent_hero_slides = excel_ent_get_hero_slides();
?>

<section class="hero" id="hero" aria-label="<?php esc_attr_e( 'Hero', 'excel-ent' ); ?>" data-hero>
	<div class="hero__media" aria-hidden="true" data-hero-media>
		<?php foreach ( $excel_ent_hero_slides as $excel_ent_i => $excel_ent_slide ) : ?>
			<img
				class="hero__bg<?php echo 0 === (int) $excel_ent_i ? ' is-active' : ''; ?>"
				src="<?php echo esc_url( $excel_ent_slide['bg'] ); ?>"
				alt=""
				width="1920"
				height="1080"
				decoding="async"
				<?php echo 0 === (int) $excel_ent_i ? 'fetchpriority="high"' : 'loading="lazy"'; ?>
				data-hero-bg
				data-hero-index="<?php echo esc_attr( (string) $excel_ent_i ); ?>"
			>
		<?php endforeach; ?>
		<span class="hero__overlay"></span>
	</div>

	<div class="hero__layout">
		<div class="hero__main">
			<div class="hero__copy">
				<div class="hero__intro">
					<h1 class="hero__title">
						<span class="hero__title-line"><?php esc_html_e( 'THE STAGE', 'excel-ent' ); ?></span>
						<span class="hero__title-line"><?php esc_html_e( 'IS SET', 'excel-ent' ); ?></span>
					</h1>

					<p class="hero__lede">
						<?php esc_html_e( 'Personally auditioned artists for weddings, pubs, clubs, and corporate events. Every act seen live — every booking guaranteed.', 'excel-ent' ); ?>
					</p>
				</div>

				<div class="hero__actions">
					<a class="btn-hero btn-hero--primary magnetic" href="<?php echo esc_url( $excel_ent_contact ); ?>">
						<?php esc_html_e( 'Book an Artist', 'excel-ent' ); ?>
					</a>
					<a class="btn-hero btn-hero--outline magnetic" href="<?php echo esc_url( $excel_ent_join ); ?>">
						<?php esc_html_e( 'Register as an Artist', 'excel-ent' ); ?>
					</a>
				</div>
			</div>

			<aside class="hero__stats" aria-label="<?php esc_attr_e( 'Company statistics', 'excel-ent' ); ?>">
				<div class="hero-stat">
					<p class="hero-stat__num" data-count="14" data-suffix="+">0</p>
					<p class="hero-stat__label"><?php esc_html_e( 'Years Established', 'excel-ent' ); ?></p>
				</div>
				<div class="hero-stat">
					<p class="hero-stat__num" data-count="1800" data-suffix="+">0</p>
					<p class="hero-stat__label"><?php esc_html_e( 'Acts on Roster', 'excel-ent' ); ?></p>
				</div>
				<div class="hero-stat">
					<p class="hero-stat__num" data-count="15000" data-suffix="+" data-format="comma">0</p>
					<p class="hero-stat__label"><?php esc_html_e( 'Events Booked', 'excel-ent' ); ?></p>
				</div>
				<div class="hero-stat">
					<p class="hero-stat__num" data-count="100" data-suffix="%">0</p>
					<p class="hero-stat__label"><?php esc_html_e( 'Auditioned Acts', 'excel-ent' ); ?></p>
				</div>
			</aside>
		</div>

		<div class="hero__carousel" data-hero-carousel>
			<div class="hero-carousel__dots" role="tablist" aria-label="<?php esc_attr_e( 'Hero slides', 'excel-ent' ); ?>">
				<?php foreach ( $excel_ent_hero_slides as $excel_ent_i => $excel_ent_slide ) : ?>
					<button
						type="button"
						class="hero-carousel__dot<?php echo 0 === (int) $excel_ent_i ? ' is-active' : ''; ?>"
						data-carousel-dot="<?php echo esc_attr( (string) $excel_ent_i ); ?>"
						role="tab"
						aria-selected="<?php echo 0 === (int) $excel_ent_i ? 'true' : 'false'; ?>"
						aria-label="<?php echo esc_attr( sprintf( __( 'Show %s slide', 'excel-ent' ), $excel_ent_slide['label'] ?? ( $excel_ent_i + 1 ) ) ); ?>"
					></button>
				<?php endforeach; ?>
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

<?php get_template_part( 'template-parts/section', 'newsletter' ); ?>

<?php get_template_part( 'template-parts/section', 'services' ); ?>

<?php get_template_part( 'template-parts/section', 'blog' ); ?>

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
