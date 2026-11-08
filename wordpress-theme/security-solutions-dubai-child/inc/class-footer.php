<?php
/**
 * Footer renderer — new common footer across every page.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/class-header.php';

/**
 * Render the footer CTA band (common on all pages).
 */
function ssdk_render_footer_cta() {
	if ( ! apply_filters( 'ssdk_footer_cta_enabled', true ) ) {
		return;
	}
	echo '<section class="ssdk-footer-cta">' . PHP_EOL;
	echo '<div class="ssdk-container">' . PHP_EOL;
	echo '<div class="ssdk-footer-cta-inner">' . PHP_EOL;
	echo '<div class="ssdk-footer-cta-text">' . PHP_EOL;
	echo '<h2>Talk to a security specialist today</h2>' . PHP_EOL;
	echo '<p>Free consultation, same-week on-site surveys across the UAE. No obligation &mdash; just an honest recommendation.</p>' . PHP_EOL;
	echo '</div>' . PHP_EOL;
	echo '<div class="ssdk-footer-cta-actions">' . PHP_EOL;
	echo '<a class="ssdk-cta ssdk-cta-light" href="' . esc_url( home_url( '/contact-us/' ) ) . '">Get a Quote</a>' . PHP_EOL;
	echo '<a class="ssdk-cta-ghost" href="tel:+971503605274">' . ssdk_icon( 'phone', 16 ) . ' +971 50 360 5274</a>' . PHP_EOL;
	echo '</div>' . PHP_EOL;
	echo '</div>' . PHP_EOL;
	echo '</div>' . PHP_EOL;
	echo '</section>' . PHP_EOL;
}

/**
 * Render the complete footer.
 */
function ssdk_render_footer() {
	$brand = ssdk_brand();
	$util  = isset( $brand['social'] ) ? $brand['social'] : array();
	$year  = date( 'Y' );

	// --- Footer widget areas (use widgets when present, defaults otherwise) ---
	$has_brand_widget  = is_active_sidebar( 'ssdk-footer-brand' );
	$has_nav_widget    = is_active_sidebar( 'ssdk-footer-nav' );
	$has_contact_widget = is_active_sidebar( 'ssdk-footer-contact' );

	$widgets = array(
		'ssdk-footer-brand'   => $has_brand_widget,
		'ssdk-footer-nav'     => $has_nav_widget,
		'ssdk-footer-contact' => $has_contact_widget,
	);
	$any_widget = in_array( true, $widgets, true );

	echo '<footer id="ssdk-site-footer" class="ssdk-site-footer">' . PHP_EOL;

	if ( $any_widget ) {
		echo '<div class="ssdk-container ssdk-footer-widgets">' . PHP_EOL;
		foreach ( $widgets as $id => $active ) {
			if ( $active ) {
				echo '<div class="footer-block-wrap">';
				dynamic_sidebar( $id );
				echo '</div>';
			}
		}
		echo PHP_EOL . '</div>' . PHP_EOL;
	} else {
		// ---- Default footer content ----
		echo '<div class="ssdk-container ssdk-footer-grid">' . PHP_EOL;

		// Brand
		echo '<div class="footer-block footer-brand">' . PHP_EOL;
		echo '<a class="ssdk-logo ssdk-logo-light" href="' . esc_url( home_url( '/' ) ) . '"><img src="' . esc_url( get_stylesheet_directory_uri() . '/assets/img/logo.png' ) . '" alt="' . esc_attr( $brand['name'] ) . '" width="200" height="56"></a>' . PHP_EOL;
		echo '<p class="footer-tagline">' . esc_html( $brand['tagline'] ? $brand['tagline'] : 'Security solutions Dubai &amp; UAE &mdash; design, install and support.' ) . '</p>' . PHP_EOL;
		echo '<img class="footer-iso" src="' . esc_url( get_stylesheet_directory_uri() . '/assets/img/iso-badge.png' ) . '" alt="ISO 9001:2015 certified" width="100" height="100" loading="lazy">' . PHP_EOL;
		if ( ! empty( $util ) ) {
			echo '<div class="footer-social">' . PHP_EOL;
			foreach ( array( 'facebook', 'linkedin', 'twitter', 'instagram', 'pinterest', 'youtube' ) as $net ) {
				if ( ! empty( $util[ $net ] ) ) {
					echo '<a href="' . esc_url( $util[ $net ] ) . '" rel="noopener" target="_blank" aria-label="' . esc_attr( $net ) . '">' . ssdk_icon( $net, 16 ) . '</a>';
				}
			}
			echo PHP_EOL . '</div>' . PHP_EOL;
		}
		echo '</div>' . PHP_EOL;

		// Quick links
		echo '<div class="footer-block footer-quick">' . PHP_EOL;
		echo '<h4 class="footer-title">Explore</h4>' . PHP_EOL;
		echo '<ul class="footer-links">' . PHP_EOL;
		foreach ( ssdk_default_menu_items() as $mi ) {
			echo '<li><a href="' . esc_url( $mi['url'] ) . '">' . esc_html( $mi['title'] ) . '</a></li>' . PHP_EOL;
		}
		echo '</ul>' . PHP_EOL;
		echo '</div>' . PHP_EOL;

		// Services
		echo '<div class="footer-block footer-services">' . PHP_EOL;
		echo '<h4 class="footer-title">Services</h4>' . PHP_EOL;
		echo '<ul class="footer-links">' . PHP_EOL;
		foreach ( ssdk_services_mega() as $s ) {
			echo '<li><a href="' . esc_url( $s['url'] ) . '">' . esc_html( $s['title'] ) . '</a></li>' . PHP_EOL;
		}
		echo '</ul>' . PHP_EOL;
		echo '</div>' . PHP_EOL;

		// Contact
		echo '<div class="footer-block footer-contact">' . PHP_EOL;
		echo '<h4 class="footer-title">Contact</h4>' . PHP_EOL;
		echo '<ul class="footer-contact-list">' . PHP_EOL;
		echo '<li>' . ssdk_icon( 'phone', 16 ) . ' <a href="tel:+971503605274">' . esc_html( $brand['phone'] ) . '</a></li>' . PHP_EOL;
		echo '<li>' . ssdk_icon( 'mail', 16 ) . ' <a href="mailto:' . esc_attr( $brand['email'] ) . '">' . esc_html( $brand['email'] ) . '</a></li>' . PHP_EOL;
		echo '<li>' . ssdk_icon( 'pin', 16 ) . ' <span>' . esc_html( $brand['address'] ) . '</span></li>' . PHP_EOL;
		echo '<li><a class="footer-whatsapp" href="https://wa.me/971503605274" rel="noopener" target="_blank">' . ssdk_icon( 'phone', 16 ) . ' WhatsApp: +971 50 360 5274</a></li>' . PHP_EOL;
		echo '</ul>' . PHP_EOL;
		echo '</div>' . PHP_EOL;

		echo '</div>' . PHP_EOL; // .ssdk-footer-grid
	}

	// ---- Bottom bar ----
	echo '<div class="ssdk-footer-bottom">' . PHP_EOL;
	echo '<div class="ssdk-container ssdk-footer-bottom-inner">' . PHP_EOL;
	echo '<p>' . esc_html( $brand['name'] ) . ' &middot; © ' . esc_html( $year ) . ' All rights reserved.</p>' . PHP_EOL;
	echo '<ul class="footer-legal-links">' . PHP_EOL;
	echo '<li><a href="' . esc_url( home_url( '/privacy-policy/' ) ) . '">Privacy Policy</a></li>' . PHP_EOL;
	echo '<li><a href="' . esc_url( home_url( '/terms-of-use/' ) ) . '">Terms of Use</a></li>' . PHP_EOL;
	echo '</ul>' . PHP_EOL;
	echo '</div>' . PHP_EOL;
	echo '</div>' . PHP_EOL;
	echo '</footer>' . PHP_EOL;
}
