<?php
/**
 * Build Greene King composite SVG from Figma layer export.
 * Run: php assets/images/awards/build-greene-king.php
 */

$figma_file = 'C:/Users/polsb/.cursor/projects/d-PHP-htdocs-excel-ent-wp-content-themes-excel-ent/agent-tools/376ffea3-89ad-4995-a10d-5470de6c90cd.txt';
$dir         = __DIR__;
$parts_dir   = $dir . '/greene-king-parts';

if ( ! is_dir( $parts_dir ) ) {
	mkdir( $parts_dir, 0777, true );
}

$content = file_get_contents( $figma_file );
preg_match_all(
	'/className="absolute inset-\[([^\]]+)\]"[\s\S]*?src=\{(imgGroup\d*|imgGroup)\}/',
	$content,
	$matches,
	PREG_SET_ORDER
);

$asset_map = array();
preg_match_all(
	'/const (imgGroup\d*|imgGroup) = "(http:\/\/localhost:3845\/assets\/[^"]+)"/',
	$content,
	$asset_matches,
	PREG_SET_ORDER
);
foreach ( $asset_matches as $asset_match ) {
	$asset_map[ $asset_match[1] ] = $asset_match[2];
}

function ee_awards_parse_inset( string $raw ): array {
	$parts = explode( '_', $raw );
	$vals  = array();

	foreach ( $parts as $part ) {
		if ( str_contains( $part, '%' ) ) {
			$vals[] = (float) str_replace( '%', '', $part );
		} else {
			$vals[] = (float) $part;
		}
	}

	while ( count( $vals ) < 4 ) {
		$vals[] = 0.0;
	}

	return array_slice( $vals, 0, 4 );
}

function ee_awards_inset_to_rect( array $inset, float $w, float $h ): array {
	$top    = $inset[0] / 100 * $h;
	$right  = $inset[1] / 100 * $w;
	$bottom = $inset[2] / 100 * $h;
	$left   = $inset[3] / 100 * $w;

	return array(
		'x'      => $left,
		'y'      => $top,
		'width'  => max( 0.01, $w - $left - $right ),
		'height' => max( 0.01, $h - $top - $bottom ),
	);
}

$width  = 68;
$height = 103;
$layers = array();
$index  = 0;

foreach ( $matches as $match ) {
	$inset = ee_awards_parse_inset( $match[1] );
	$key   = $match[2];
	if ( empty( $asset_map[ $key ] ) ) {
		continue;
	}
	$url = $asset_map[ $key ];

	$hash = basename( $url );
	$file = $parts_dir . '/part-' . $index . '.svg';

	if ( ! file_exists( $file ) ) {
		$context = stream_context_create(
			array(
				'http' => array(
					'timeout' => 5,
				),
			)
		);
		$data = @file_get_contents( $url, false, $context );
		if ( false === $data ) {
			continue;
		}
		file_put_contents( $file, $data );
	}

	$layers[] = array(
		'file'  => 'greene-king-parts/part-' . $index . '.svg',
		'inset' => $inset,
	);
	++$index;
}

$svg  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$svg .= sprintf(
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %.0F %.0F" width="%.0F" height="%.0F">' . "\n",
	$width,
	$height,
	$width,
	$height
);
$svg .= '  <rect width="100%" height="100%" fill="#ffffff"/>' . "\n";

foreach ( $layers as $layer ) {
	$rect = ee_awards_inset_to_rect( $layer['inset'], $width, $height );
	$svg .= sprintf(
		'  <image href="%s" x="%.4F" y="%.4F" width="%.4F" height="%.4F" />' . "\n",
		$layer['file'],
		$rect['x'],
		$rect['y'],
		$rect['width'],
		$rect['height']
	);
}

$svg .= "</svg>\n";
file_put_contents( $dir . '/greene-king.svg', $svg );

echo 'Greene King layers: ' . count( $layers ) . PHP_EOL;
echo "Wrote greene-king.svg\n";
