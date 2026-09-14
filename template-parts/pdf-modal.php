<?php
/**
 * Site-wide PDF viewer modal.
 *
 * @package Excel_Ent
 */

$excel_ent_pdf_url   = excel_ent_get_terms_pdf_url();
$excel_ent_pdf_title = __( 'Terms & Conditions', 'excel-ent' );
$excel_ent_close_icon = EXCEL_ENT_URI . '/assets/images/icons/close-large-line.svg';
?>
<div class="pdf-modal" data-pdf-modal hidden>
	<button
		type="button"
		class="pdf-modal__backdrop"
		data-pdf-modal-close
		aria-label="<?php esc_attr_e( 'Close PDF viewer', 'excel-ent' ); ?>"
	></button>

	<div class="pdf-modal__shell">
		<div
			class="pdf-modal__dialog"
			role="dialog"
			aria-modal="true"
			aria-labelledby="pdf-modal-title"
			data-pdf-modal-dialog
			tabindex="-1"
		>
			<header class="pdf-modal__header">
				<h2 class="pdf-modal__title" id="pdf-modal-title" data-pdf-modal-title>
					<?php echo esc_html( $excel_ent_pdf_title ); ?>
				</h2>
				<div class="pdf-modal__header-actions">
					<a
						class="pdf-modal__download"
						href="<?php echo esc_url( $excel_ent_pdf_url ); ?>"
						target="_blank"
						rel="noopener noreferrer"
						data-pdf-modal-download
					>
						<?php esc_html_e( 'Open File', 'excel-ent' ); ?>
					</a>
					<button
						type="button"
						class="pdf-modal__close"
						data-pdf-modal-close
						aria-label="<?php esc_attr_e( 'Close PDF viewer', 'excel-ent' ); ?>"
					>
						<img src="<?php echo esc_url( $excel_ent_close_icon ); ?>" alt="" width="18" height="18" decoding="async">
					</button>
				</div>
			</header>
			<div class="pdf-modal__viewer">
				<iframe
					class="pdf-modal__frame"
					title="<?php echo esc_attr( $excel_ent_pdf_title ); ?>"
					src="about:blank"
					data-pdf-modal-frame
				></iframe>
			</div>
		</div>
	</div>
</div>
