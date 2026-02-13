<?php
namespace Nextab\ShapeDivider;

if (!defined('ABSPATH')) {
	exit;
}

class Shape_Divider {
	public function init() {
		add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
		add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
	}

	public function enqueue_editor_assets() {
		$asset_file = NXT_SHAPE_DIVIDER_PLUGIN_DIR . 'assets/js/shape-divider-editor.js';
		$asset_version = filemtime($asset_file);

		wp_enqueue_script(
			'nxt-shape-divider-shapes',
			NXT_SHAPE_DIVIDER_PLUGIN_URL . 'assets/svg/shapes.js',
			[],
			$asset_version,
			false
		);

		wp_enqueue_script(
			'nxt-shape-divider-editor',
			NXT_SHAPE_DIVIDER_PLUGIN_URL . 'assets/js/shape-divider-editor.js',
			[
				'wp-blocks',
				'wp-element',
				'wp-components',
				'wp-block-editor',
				'wp-hooks',
				'wp-compose',
				'wp-i18n',
				'nxt-shape-divider-shapes'
			],
			$asset_version,
			false
		);
	}

	public function enqueue_frontend_assets() {
		$js_file = NXT_SHAPE_DIVIDER_PLUGIN_DIR . 'assets/js/shape-divider-frontend.js';
		$asset_version = filemtime($js_file);

		wp_enqueue_script(
			'nxt-shape-divider-shapes',
			NXT_SHAPE_DIVIDER_PLUGIN_URL . 'assets/svg/shapes.js',
			[],
			$asset_version,
			false
		);

		wp_enqueue_script(
			'nxt-shape-divider-frontend',
			NXT_SHAPE_DIVIDER_PLUGIN_URL . 'assets/js/shape-divider-frontend.js',
			['nxt-shape-divider-shapes'],
			$asset_version,
			true
		);

		$css_file = NXT_SHAPE_DIVIDER_PLUGIN_DIR . 'assets/css/shape-divider.css';
		if (file_exists($css_file)) {
			wp_enqueue_style(
				'nxt-shape-divider-frontend',
				NXT_SHAPE_DIVIDER_PLUGIN_URL . 'assets/css/shape-divider.css',
				[],
				filemtime($css_file)
			);
		}
	}
}
