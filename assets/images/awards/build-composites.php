<?php
/**
 * One-off helper: build composite partner logo SVGs for the awards strip.
 * Run: php assets/images/awards/build-composites.php
 */

$dir = __DIR__;

function ee_awards_inset_to_rect( array $inset, float $w, float $h ): array {
	$top    = $inset[0] / 100 * $h;
	$right  = $inset[1] / 100 * $w;
	$bottom = $inset[2] / 100 * $h;
	$left   = $inset[3] / 100 * $w;

	return array(
		'x'      => $left,
		'y'      => $top,
		'width'  => $w - $left - $right,
		'height' => $h - $top - $bottom,
	);
}

function ee_awards_write_composite( string $path, float $width, float $height, array $layers ): void {
	$svg  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
	$svg .= sprintf(
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %.2F %.2F" width="%.0F" height="%.0F" fill="none">' . "\n",
		$width,
		$height,
		$width,
		$height
	);

	foreach ( $layers as $layer ) {
		$file = basename( $layer['file'] );
		$rect = ee_awards_inset_to_rect( $layer['inset'], $width, $height );
		$svg .= sprintf(
			'  <image href="%s" x="%.4F" y="%.4F" width="%.4F" height="%.4F" />' . "\n",
			$file,
			$rect['x'],
			$rect['y'],
			$rect['width'],
			$rect['height']
		);
	}

	$svg .= "</svg>\n";
	file_put_contents( $path, $svg );
}

ee_awards_write_composite(
	$dir . '/craft-union.svg',
	100,
	103,
	array(
		array( 'file' => 'craft-vector.svg', 'inset' => array( 0, 0.06, 13.08, 0 ) ),
		array( 'file' => 'craft-g0.svg', 'inset' => array( 29.04, 72.22, 54.61, 12.85 ) ),
		array( 'file' => 'craft-g1.svg', 'inset' => array( 29.11, 56.83, 54.87, 30.05 ) ),
		array( 'file' => 'craft-g2.svg', 'inset' => array( 29.23, 39.42, 54.87, 44.24 ) ),
		array( 'file' => 'craft-g3.svg', 'inset' => array( 29.37, 27.44, 54.87, 62.38 ) ),
		array( 'file' => 'craft-g4.svg', 'inset' => array( 29.37, 12.78, 54.87, 74.9 ) ),
		array( 'file' => 'craft-g5.svg', 'inset' => array( 48.27, 73.23, 35.84, 13.39 ) ),
		array( 'file' => 'craft-g6.svg', 'inset' => array( 48.27, 49.13, 36.1, 47.12 ) ),
		array( 'file' => 'craft-g7.svg', 'inset' => array( 48.01, 29.12, 35.77, 53.75 ) ),
		array( 'file' => 'craft-g8.svg', 'inset' => array( 48.27, 12.78, 36.1, 73.49 ) ),
		array( 'file' => 'craft-g9.svg', 'inset' => array( 48.27, 56.49, 36.1, 29.85 ) ),
		array( 'file' => 'craft-vector1.svg', 'inset' => array( 77.63, 2.68, 0, 2.94 ) ),
		array( 'file' => 'craft-g10.svg', 'inset' => array( 81.42, 20.28, 10.46, 20.75 ) ),
		array( 'file' => 'craft-g11.svg', 'inset' => array( 20.63, 11.85, 78.39, 11.85 ) ),
		array( 'file' => 'craft-g11.svg', 'inset' => array( 69.36, 11.85, 29.66, 11.85 ) ),
	)
);

ee_awards_write_composite(
	$dir . '/stonegate.svg',
	155,
	35,
	array(
		array( 'file' => 'stonegate-main.svg', 'inset' => array( 0, 0, 7.13, 0 ) ),
		array( 'file' => 'stonegate-sub.svg', 'inset' => array( 80.27, 45.61, -0.12, 0.81 ) ),
	)
);

echo "Wrote craft-union.svg and stonegate.svg\n";
