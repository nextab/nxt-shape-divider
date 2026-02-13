<?php
/**
 * Plugin Name: Shape Divider
 * Plugin URI: https://nextab.de
 * Description: Erweitert Group-Blöcke mit konfigurierbaren Shape Dividern (oben/unten) - ähnlich wie shapedivider.app
 * Version: 1.0.0
 * Author: nexTab.de
 * Author URI: https://nextab.de
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: nxt-shape-divider
 * Domain Path: /languages
 */

namespace Nextab\ShapeDivider;

if (!defined('ABSPATH')) {
	exit;
}

define('NXT_SHAPE_DIVIDER_VERSION', '1.0.0');
define('NXT_SHAPE_DIVIDER_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('NXT_SHAPE_DIVIDER_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once NXT_SHAPE_DIVIDER_PLUGIN_DIR . 'inc/class-shape-divider.php';

function shape_divider_init() {
	$shape_divider = new Shape_Divider();
	$shape_divider->init();
}
add_action('init', __NAMESPACE__ . '\shape_divider_init');

register_activation_hook(__FILE__, __NAMESPACE__ . '\shape_divider_activate');
function shape_divider_activate() {
	flush_rewrite_rules();
}

register_deactivation_hook(__FILE__, __NAMESPACE__ . '\shape_divider_deactivate');
function shape_divider_deactivate() {
	flush_rewrite_rules();
}
