<?php
namespace Nextab\ShapeDivider;

if (!defined('ABSPATH')) {
	exit;
}

const OPTION_HEIGHTS = 'nxt_shape_divider_heights';

class Shape_Divider {
	public function init() {
		add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
		add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
		add_action('rest_api_init', [$this, 'register_rest_routes']);
	}

	public function register_rest_routes() {
		register_rest_route('nxt-shape-divider/v1', '/heights', [
			'methods' => \WP_REST_Server::READABLE,
			'callback' => [$this, 'rest_get_heights'],
			'permission_callback' => function () {
				return current_user_can('edit_posts');
			}
		]);

		register_rest_route('nxt-shape-divider/v1', '/heights', [
			'methods' => \WP_REST_Server::CREATABLE,
			'callback' => [$this, 'rest_save_heights'],
			'permission_callback' => function () {
				return current_user_can('edit_posts');
			},
			'args' => [
				'heights' => [
					'required' => true,
					'type' => 'object',
					'description' => 'Map of shape keys to height values'
				]
			]
		]);
	}

	public function rest_get_heights() {
		$heights = get_option(OPTION_HEIGHTS, []);
		if (!is_array($heights)) {
			$heights = [];
		}
		return new \WP_REST_Response($heights, 200);
	}

	public function rest_save_heights(\WP_REST_Request $request) {
		$heights = $request->get_param('heights');
		if (!is_array($heights)) {
			return new \WP_REST_Response(['error' => 'Invalid heights'], 400);
		}

		$sanitized = [];
		foreach ($heights as $shape => $height) {
			if (is_string($shape) && is_numeric($height)) {
				$h = (int) $height;
				if ($h >= 20 && $h <= 200) {
					$sanitized[sanitize_key($shape)] = $h;
				}
			}
		}

		update_option(OPTION_HEIGHTS, $sanitized);
		return new \WP_REST_Response($sanitized, 200);
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
				'wp-api-fetch',
				'nxt-shape-divider-shapes'
			],
			$asset_version,
			false
		);

		$heights = get_option(OPTION_HEIGHTS, []);
		wp_localize_script('nxt-shape-divider-editor', 'nxtShapeDividerConfig', [
			'heights' => is_array($heights) ? $heights : [],
			'apiUrl' => rest_url('nxt-shape-divider/v1/heights'),
			'nonce' => wp_create_nonce('wp_rest')
		]);
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
