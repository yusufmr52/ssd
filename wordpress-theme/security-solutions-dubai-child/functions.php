<?php
/**
 * Security Solutions Dubai Child — TheGem 5.13.1 child theme.
 * Speed + SEO first: fewer requests, lazy-loaded media, deferred JS,
 * inline critical CSS, JSON-LD schema, Open Graph, Manrope typography.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! defined( 'SS_CHILD_VERSION' ) ) {
	define( 'SS_CHILD_VERSION', '1.0.0' );
}

/* ----------------------------------------------------------------
 * 0. Enqueue parent (TheGem) stylesheet so TheGem core still works.
 * ---------------------------------------------------------------- */
function ssdk_enqueue_parent_style() {
	if ( defined( 'THEGEM_VERSION' ) ) {
		wp_enqueue_style( 'thegem-style', get_template_directory_uri() . '/style.css', array(), THEGEM_VERSION );
	} else {
		wp_enqueue_style( 'thegem-style', get_template_directory_uri() . '/style.css', array(), '5.13.1' );
	}
}
add_action( 'wp_enqueue_scripts', 'ssdk_enqueue_parent_style', 5 );

/* ----------------------------------------------------------------
 * 1. Theme supports & child CSS/JS.
 * ---------------------------------------------------------------- */
function ssdk_setup() {
	// Content width for standard posts.
	if ( ! isset( $GLOBALS['content_width'] ) ) {
		$GLOBALS['content_width'] = 1170;
	}
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'custom-logo' );
	add_theme_support( 'customize-selective-refresh-widgets' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );

	// Larger default image sizes for the new layout (keeps img tags honest).
	add_image_size( 'ssdk_hero', 1440, 620, true );
	add_image_size( 'ssdk_card', 640, 480, true );
	add_image_size( 'ssdk_wide', 1200, 500, true );
}
add_action( 'after_setup_theme', 'ssdk_setup' );

function ssdk_enqueue_assets() {
	$asset_uri = get_stylesheet_directory_uri();

	// Child design system (loaded on top of TheGem).
	wp_enqueue_style(
		'ssdk-style',
		$asset_uri . '/assets/css/style.css',
		array( 'thegem-style' ),
		SS_CHILD_VERSION
	);

	// Manrope — load display=swap so text renders immediately with a system
	// fallback while the woff2 streams in.
	wp_enqueue_style(
		'ssdk-fonts',
		$asset_uri . '/assets/fonts/manrope.css',
		array(),
		SS_CHILD_VERSION
	);

	// Interactions only — small vanilla JS, no libraries.
	wp_enqueue_script(
		'ssdk-main',
		$asset_uri . '/assets/js/main.js',
		array(),
		SS_CHILD_VERSION,
		true // footer
	);
	if ( function_exists( 'wp_enqueue_script' ) && function_exists( 'wp_script_add_data' ) ) {
		wp_script_add_data( 'ssdk-main', 'strategy', 'defer' );
	}
}
add_action( 'wp_enqueue_scripts', 'ssdk_enqueue_assets', 30 );

/* ----------------------------------------------------------------
 * 2. Inline critical CSS (avoids render-blocking FOUC on the header/hero).
 * ---------------------------------------------------------------- */
function ssdk_critical_css() {
	$critical = file_exists( __DIR__ . '/assets/css/critical.css' )
		? file_get_contents( __DIR__ . '/assets/css/critical.css' )
		: '';
	if ( '' === $critical ) {
		return;
	}
	echo '<style id="ssdk-critical-css">' . $critical . '</style>' . PHP_EOL;
}
add_action( 'wp_head', 'ssdk_critical_css', 1 );

/* ----------------------------------------------------------------
 * 3. Performance: lazy-load media, async font hints, JS deferral.
 * ---------------------------------------------------------------- */
// WP < 5.5 fallback lazy-load attribute filter (native loading="lazy" on <img>).
function ssdk_lazyload_attributes( $attr, $attachment, $size ) {
	if ( is_feed() || is_admin() ) {
		return $attr;
	}
	if ( ! isset( $attr['loading'] ) ) {
		$attr['loading'] = 'lazy';
	}
	if ( ! isset( $attr['decoding'] ) ) {
		$attr['decoding'] = 'async';
	}
	return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', 'ssdk_lazyload_attributes', 10, 3 );

// Classic img/script tags in post content (the site has legacy HTML).
function ssdk_lazyload_content( $content ) {
	if ( is_feed() || is_admin() ) {
		return $content;
	}
	$content = preg_replace( '/<img([^>]+?)>/i', '<img$1 loading="lazy" decoding="async">', $content );
	// Defer legacy scripts inside content (keeps page interactive, not blocking).
	$content = preg_replace( '/<script([^>]*src=[^"\']*["\'])([^>]*)><\/script>/i', '<script$1$2 defer></script>', $content );
	return $content;
}
add_filter( 'the_content', 'ssdk_lazyload_content', 20 );

// Performance hints for the browser.
function ssdk_resource_hints() {
	echo '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>' . PHP_EOL;
	echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . PHP_EOL;
	// Preload the Manrope woff2 directly (faster than waiting on the CSS).
	echo '<link rel="preload" as="font" href="' . esc_url( get_stylesheet_directory_uri() . '/assets/fonts/manrope.woff2' ) . '" crossorigin>' . PHP_EOL;
}
add_action( 'wp_head', 'ssdk_resource_hints', 2 );

// Note: third-party script deferral is intentionally NOT enabled here.
// Adding defer/async to jQuery, WPBakery, or TheGem scripts breaks their
// loading order and causes backend editor errors. Defer only applies to
// the child theme's own footer script (ssdk-main). If you need broader
// deferral, use a caching plugin (LiteSpeed Cache / WP Rocket) which
// safely defers only render-blocking assets.

/* ----------------------------------------------------------------
 * 4. SEO: JSON-LD schema, Open Graph, Twitter cards, WebSite sitelinks.
 * ---------------------------------------------------------------- */
require_once __DIR__ . '/inc/class-seo.php';
add_action( 'init', array( 'SSDK_SEO', 'init' ) );

/* ----------------------------------------------------------------
 * 5. Site identity / brand data used across header & footer.
 * ---------------------------------------------------------------- */
function ssdk_brand() {
	$opts = function_exists( 'TheGem_Options' ) ? TheGem_Options::get_option( 'thegem_options' ) : array();
	if ( ! is_array( $opts ) ) {
		$opts = array();
	}
	$site_name   = ! empty( $opts['name'] ) ? $opts['name'] : get_bloginfo( 'name' );
	$site_url    = get_bloginfo( 'url' );
	$tagline     = ! empty( $opts['tagline'] ) ? $opts['tagline'] : get_bloginfo( 'description' );
	$contact     = ! empty( $opts['contact_phone'] ) ? $opts['contact_phone'] : '+971 50 360 5274';
	$contact_mail = ! empty( $opts['contact_email'] ) ? $opts['contact_email'] : 'info@hutaibinfotech.com';
	$address      = ! empty( $opts['contact_address'] ) ? $opts['contact_address'] : 'Level 33, Al Saqr Business Tower, Sheikh Zayed Road, Dubai, United Arab Emirates';
	$social       = ! empty( $opts['socials'] ) ? (array) $opts['socials'] : array();

	$socials = array(
		'facebook' => ! empty( $social['facebook'] ) ? $social['facebook'] : 'https://www.facebook.com/hutaibinfotech',
		'linkedin' => ! empty( $social['linkedin'] ) ? $social['linkedin'] : 'https://www.linkedin.com/company/hutaib-infotech-solutions',
		'twitter'  => ! empty( $social['twitter'] ) ? $social['twitter'] : 'https://twitter.com/HUTAIBIS',
		'instagram'=> ! empty( $social['instagram'] ) ? $social['instagram'] : 'https://www.instagram.com/hutaibinfotech5/',
		'pinterest'=> ! empty( $social['pinterest'] ) ? $social['pinterest'] : 'https://pinterest.com/hutaibinfotech/',
		'youtube'  => ! empty( $social['youtube'] ) ? $social['youtube'] : 'https://www.youtube.com/channel/UCPF23bhlsCRMunGt4sX7qyg',
	);
	return array(
		'name'   => $site_name,
		'url'    => $site_url,
		'tagline' => $tagline,
		'phone'  => $contact,
		'email'  => $contact_mail,
		'address' => $address,
		'social' => $socials,
	);
}

/* ----------------------------------------------------------------
 * 6. Default menu fallback (repo site structure if no WP menu set).
 * ---------------------------------------------------------------- */
function ssdk_default_menu_items() {
	return array(
		array( 'title' => 'Home',          'url' => home_url( '/' ),                              'page' => 'home' ),
		array( 'title' => 'About Us',      'url' => home_url( '/about-us/' ),                      'page' => 'about' ),
		array( 'title' => 'How it works',  'url' => home_url( '/how-it-works/' ),                  'page' => 'process' ),
		array( 'title' => 'Services',      'url' => home_url( '/services/' ),                      'page' => 'services' ),
		array( 'title' => 'Blog',          'url' => home_url( '/blog/' ),                          'page' => 'blog' ),
		array( 'title' => 'Resources',     'url' => home_url( '/resources/' ),                     'page' => 'resources' ),
		array( 'title' => 'Locations',     'url' => home_url( '/locations/' ),                     'page' => 'locations' ),
		array( 'title' => 'Careers',       'url' => home_url( '/careers/' ),                       'page' => 'careers' ),
		array( 'title' => 'Contact Us',    'url' => home_url( '/contact-us/' ),                    'page' => 'contact' ),
	);
}

/* ----------------------------------------------------------------
 * 7. Footer widgets (3 areas + bottom bar).
 * ---------------------------------------------------------------- */
function ssdk_widgets_init() {
	register_sidebar( array(
		'name'          => 'Footer Brand',
		'id'            => 'ssdk-footer-brand',
		'description'   => 'Brand, tagline and contact details.',
		'before_widget' => '<div class="footer-block">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="footer-title">',
		'after_title'   => '</h4>',
	) );
	register_sidebar( array(
		'name'          => 'Footer Navigation',
		'id'            => 'ssdk-footer-nav',
		'description'   => 'Links: services, about, blog.',
		'before_widget' => '<div class="footer-block">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="footer-title">',
		'after_title'   => '</h4>',
	) );
	register_sidebar( array(
		'name'          => 'Footer Contact',
		'id'            => 'ssdk-footer-contact',
		'description'   => 'Phone, email, address, socials.',
		'before_widget' => '<div class="footer-block">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="footer-title">',
		'after_title'   => '</h4>',
	) );
}
add_action( 'widgets_init', 'ssdk_widgets_init' );

/* ----------------------------------------------------------------
 * 8. Admin notice: quick orientation after install.
 * ---------------------------------------------------------------- */
function ssdk_admin_notice() {
	if ( ! is_admin() || ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
	if ( $screen && 'dashboard' !== $screen->base ) {
		return;
	}
	echo '<div class="notice notice-info"><p><strong>Security Solutions Dubai Child</strong> installed. Import the WPBakery templates (Templates &rarr; Import) and see the child-theme README for the 5-step setup.</p></div>';
}
add_action( 'admin_notices', 'ssdk_admin_notice' );

/* ----------------------------------------------------------------
 * 9. TheGem page options compatibility (sidebar etc. read by page.php).
 * ---------------------------------------------------------------- */
function ssdk_get_page_option( $key, $default = '' ) {
	if ( function_exists( 'thegem_get_page_option' ) ) {
		$v = thegem_get_page_option( $key );
		if ( '' !== $v && ! is_wp_error( $v ) ) {
			return $v;
		}
	}
	return $default;
}

/* ----------------------------------------------------------------
 * 10. Excerpt handling (blog teasers).
 * ---------------------------------------------------------------- */
function ssdk_excerpt_length( $length ) {
	return 26;
}
add_filter( 'excerpt_length', 'ssdk_excerpt_length' );

function ssdk_excerpt_more( $more ) {
	return '&hellip;';
}
add_filter( 'excerpt_more', 'ssdk_excerpt_more' );
