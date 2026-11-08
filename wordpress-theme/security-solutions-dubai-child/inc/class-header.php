<?php
/**
 * Header renderer — new common header for every page.
 * Utility bar + sticky main bar + mega-menu + mobile drawer.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Inline SVG icons for social networks + utility glyphs.
 */
function ssdk_icon( $name, $size = 18 ) {
	$svgs = array(
		'phone'    => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
		'mail'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
		'pin'      => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
		'facebook' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>',
		'linkedin' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
		'twitter'  => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
		'instagram'=> '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
		'pinterest'=> '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>',
		'youtube'  => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
	);
	$icon = isset( $svgs[ $name ] ) ? $svgs[ $name ] : '';
	return '<span class="ssdk-ic" style="width:' . esc_attr( $size ) . 'px;height:' . esc_attr( $size ) . 'px">' . $icon . '</span>';
}

/**
 * Mega-menu aware nav walker.
 * Depth 0: link + hamburger trigger + panel (dropdown or mega).
 * Depth 1: anchor only.
 */
class SSDK_Menu_Walker extends Walker_Nav_Menu {

	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		if ( 0 === $depth ) {
			$classes   = empty( $item->classes ) ? array() : (array) $item->classes;
			$classes[] = 'menu-item-depth-0';
			$classes[] = 'menu-item-top';
			$has_children = in_array( 'menu-item-has-children', $classes, true );

			$title = $item->title;
			$link  = $item->url;

			$output .= '<li class="' . esc_attr( implode( ' ', $classes ) ) . '">';
			$output .= '<a class="menu-link" href="' . esc_url( $link ) . '"' . ( $has_children ? ' aria-haspopup="true"' : '' ) . '>';
			$output .= esc_html( $title ) . '</a>';

			if ( $has_children ) {
				$is_mega = strpos( $link, '/services' ) !== false || in_array( 'ssdk-mega', $classes, true );
				$panel_id = 'ssdk-panel-' . $item->ID;
				$output  .= '<button type="button" class="menu-trigger' . ( $is_mega ? ' menu-trigger-mega' : '' ) . '" aria-expanded="false" aria-controls="' . esc_attr( $panel_id ) . '" aria-label="' . esc_attr__( 'Open menu', 'security-solutions-dubai-child' ) . '"><span></span><span></span><span></span></button>';
				$output  .= '<div class="menu-panel' . ( $is_mega ? ' mega' : '' ) . '" id="' . esc_attr( $panel_id ) . '">';
			}
		}
	}

	public function start_child( &$output, $item, $depth, $args ) {
		if ( 1 === $depth ) {
			$classes = empty( $item->classes ) ? array() : (array) $item->classes;
			$output  .= '<a class="menu-link submenu-link' . ( $depth > 1 ? ' submenu-link-deep' : '' ) . '" href="' . esc_url( $item->url ) . '">';
			$output  .= esc_html( $item->title ) . '</a>';
		}
	}

	public function end_child( &$output, $item, $depth, $args ) {
		if ( 1 === $depth ) {
			$output .= '</a>';
		}
	}

	public function end_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		if ( 0 === $depth ) {
			$classes   = empty( $item->classes ) ? array() : (array) $item->classes;
			if ( in_array( 'menu-item-has-children', $classes, true ) ) {
				$output .= '</div>';
			}
			$output .= '</li>';
		}
	}
}

/**
 * Simple walker for the mobile drawer (flat list, sub-items indented).
 */
class SSDK_Mobile_Walker extends Walker_Nav_Menu {

	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		if ( 0 === $depth ) {
			$classes = empty( $item->classes ) ? array() : (array) $item->classes;
			$has_children = in_array( 'menu-item-has-children', $classes, true );
			$output .= '<li class="m-item' . ( $has_children ? ' m-item-parent' : '' ) . '">';
			$output .= '<a href="' . esc_url( $item->url ) . '">' . esc_html( $item->title ) . '</a>';
			if ( $has_children ) {
				$output .= '<button type="button" class="m-trigger" aria-expanded="false"><span></span><span></span></button>';
				$output .= '<div class="m-panel"><ul>';
			}
		} elseif ( 1 === $depth ) {
			$output .= '<li><a href="' . esc_url( $item->url ) . '">' . esc_html( $item->title ) . '</a></li>';
		}
	}

	public function end_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		if ( 0 === $depth ) {
			$classes = empty( $item->classes ) ? array() : (array) $item->classes;
			if ( in_array( 'menu-item-has-children', $classes, true ) ) {
				$output .= '</ul></div>';
			}
			$output .= '</li>';
		}
	}
}

/**
 * Build the primary menu. Falls back to the repo site structure when
 * no WordPress menu is assigned at the primary location.
 */
function ssdk_render_nav( $class ) {
	$args = array(
		'theme_location' => 'primary',
		'container'      => false,
		'menu_class'     => 'ssdk-nav ' . esc_attr( $class ),
		'walker'         => 'SSDK_Menu_Walker',
		'fallback_cb'    => false,
		'depth'          => 2,
	);
	ob_start();
	wp_nav_menu( $args );
	$out = ob_get_clean();

	if ( '' === trim( strip_tags( $out ) ) ) {
		// No menu assigned — render the default structure.
		$out = '<ul class="ssdk-nav ' . esc_attr( $class ) . '">';
		foreach ( ssdk_default_menu_items() as $mi ) {
			$is_services = ( 'services' === $mi['page'] );
			$classes = $is_services ? ' class="menu-item-has-children ssdk-mega"' : '';
			$out .= '<li' . $classes . '><a class="menu-link" href="' . esc_url( $mi['url'] ) . '">' . esc_html( $mi['title'] ) . '</a>';
			if ( $is_services ) {
				$out .= '<button type="button" class="menu-trigger menu-trigger-mega" aria-expanded="false"><span></span><span></span><span></span></button>';
				$out .= '<div class="menu-panel mega">';
				foreach ( ssdk_services_mega() as $s ) {
					$out .= '<a class="menu-link mega-link" href="' . esc_url( $s['url'] ) . '"><span class="mega-link-ic">' . esc_html( $s['icon'] ) . '</span>' . esc_html( $s['title'] ) . '</a>';
				}
				$out .= '<a class="menu-link mega-link mega-link-all" href="' . esc_url( home_url( '/services/' ) ) . '">Explore all services &rarr;</a>';
				$out .= '</div>';
			}
			$out .= '</li>';
		}
		$out .= '</ul>';
	}
	return $out;
}

/**
 * The 8 core services used in the Services mega panel.
 */
function ssdk_services_mega() {
	return array(
		array( 'icon' => '01', 'title' => 'CCTV Security Surveillance', 'url' => home_url( '/services/cctv-security-surveillance/' ) ),
		array( 'icon' => '02', 'title' => 'Access Control System',     'url' => home_url( '/services/access-control-system/' ) ),
		array( 'icon' => '03', 'title' => 'Time Attendance',           'url' => home_url( '/services/time-attendance/' ) ),
		array( 'icon' => '04', 'title' => 'Wireless Solutions',        'url' => home_url( '/services/wireless-solutions/' ) ),
		array( 'icon' => '05', 'title' => 'Meeting Room Solutions',    'url' => home_url( '/services/meeting-room-solutions/' ) ),
		array( 'icon' => '06', 'title' => 'ICT Infrastructure',        'url' => home_url( '/services/ict-infrastructure/' ) ),
		array( 'icon' => '07', 'title' => 'PABX Telephony',            'url' => home_url( '/services/pabx-telephony/' ) ),
		array( 'icon' => '08', 'title' => 'IT Support & Services',     'url' => home_url( '/services/it-support-services/' ) ),
	);
}

/**
 * Render the complete header.
 */
function ssdk_render_header() {
	$brand = ssdk_brand();
	$util  = isset( $brand['social'] ) ? $brand['social'] : array();

	echo '<div class="ssdk-utilbar">' . PHP_EOL;
	echo '<div class="ssdk-utilbar-inner">' . PHP_EOL;
	echo '<span class="util-addr">' . ssdk_icon( 'pin', 14 ) . '<a href="https://maps.google.com/maps?q=Al+Saqr+Business+Tower+Sheikh+Zayed+Road+Dubai">' . esc_html( $brand['address'] ) . '</a></span>' . PHP_EOL;
	echo '<span class="util-links">' . PHP_EOL;
	echo '<a href="tel:' . esc_attr( str_replace( ' ', '', $brand['phone'] ) ) . '">' . ssdk_icon( 'phone', 14 ) . '<span>' . esc_html( $brand['phone'] ) . '</span></a>' . PHP_EOL;
	echo '<a href="mailto:' . esc_attr( $brand['email'] ) . '">' . ssdk_icon( 'mail', 14 ) . '<span>' . esc_html( $brand['email'] ) . '</span></a>' . PHP_EOL;
	if ( ! empty( $util['facebook'] ) || ! empty( $util['linkedin'] ) || ! empty( $util['twitter'] ) || ! empty( $util['instagram'] ) || ! empty( $util['pinterest'] ) || ! empty( $util['youtube'] ) ) {
		echo '<span class="util-social">' . PHP_EOL;
		foreach ( array( 'facebook', 'linkedin', 'twitter', 'instagram', 'pinterest', 'youtube' ) as $net ) {
			if ( ! empty( $util[ $net ] ) ) {
				echo '<a class="util-social-link" href="' . esc_url( $util[ $net ] ) . '" rel="noopener" aria-label="' . esc_attr( $net ) . '" target="_blank">' . ssdk_icon( $net, 14 ) . '</a>' . PHP_EOL;
			}
		}
		echo '</span>' . PHP_EOL;
	}
	echo '</span>' . PHP_EOL;
	echo '</div>' . PHP_EOL;
	echo '</div>' . PHP_EOL;

	echo '<header id="ssdk-site-header" class="ssdk-site-header" data-sticky>' . PHP_EOL;
	echo '<div class="ssdk-header-inner">' . PHP_EOL;

	// Logo
	$logo_url = get_stylesheet_directory_uri() . '/assets/img/logo.png';
	$logo_id = function_exists( 'get_theme_mod' ) ? get_theme_mod( 'custom_logo' ) : 0;
	$logo_img = ( $logo_id ) ? wp_get_attachment_image( $logo_id, 'full', false, array( 'alt' => get_bloginfo( 'name' ) ) ) : '<img src="' . esc_url( $logo_url ) . '" alt="' . esc_attr( $brand['name'] ) . '" width="200" height="56">';
	echo '<a class="ssdk-logo" href="' . esc_url( home_url( '/' ) ) . '">' . $logo_img . '</a>' . PHP_EOL;

	// Desktop nav
	echo '<nav class="ssdk-nav-wrap" aria-label="Primary">' . PHP_EOL;
	echo ssdk_render_nav( 'desktop' );
	echo PHP_EOL;
	echo '</nav>' . PHP_EOL;

	// Right actions: phone + CTA + mobile toggle
	echo '<div class="ssdk-header-actions">' . PHP_EOL;
	echo '<a class="ssdk-phone-btn" href="tel:' . esc_attr( str_replace( ' ', '', $brand['phone'] ) ) . '">' . ssdk_icon( 'phone', 16 ) . '<span>' . esc_html( $brand['phone'] ) . '</span></a>' . PHP_EOL;
	echo '<a class="ssdk-cta" href="' . esc_url( home_url( '/contact-us/' ) ) . '">Get a Quote</a>' . PHP_EOL;
	echo '<button type="button" class="ssdk-burger" id="ssdk-burger" aria-expanded="false" aria-controls="ssdk-mobile-menu" aria-label="Open menu"><span></span><span></span><span></span></button>' . PHP_EOL;
	echo '</div>' . PHP_EOL;

	echo '</div>' . PHP_EOL;
	echo '</header>' . PHP_EOL;

	// Mobile drawer
	echo '<div class="ssdk-mobile-menu" id="ssdk-mobile-menu" aria-hidden="true">' . PHP_EOL;
	echo '<nav class="ssdk-mobile-nav" aria-label="Mobile">' . PHP_EOL;
	ob_start();
	wp_nav_menu( array(
		'theme_location' => 'primary',
		'container'      => false,
		'menu_class'     => 'ssdk-mobile-list',
		'walker'         => 'SSDK_Mobile_Walker',
		'fallback_cb'    => false,
		'depth'          => 2,
	) );
	$mout = ob_get_clean();
	if ( '' === trim( strip_tags( $mout ) ) ) {
		$mout = '<ul class="ssdk-mobile-list">';
		foreach ( ssdk_default_menu_items() as $mi ) {
			$mout .= '<li><a href="' . esc_url( $mi['url'] ) . '">' . esc_html( $mi['title'] ) . '</a></li>';
		}
		$mout .= '</ul>';
	}
	echo $mout;
	echo PHP_EOL;
	echo '</nav>' . PHP_EOL;
	echo '<div class="ssdk-mobile-contact">' . PHP_EOL;
	echo '<a href="tel:' . esc_attr( str_replace( ' ', '', $brand['phone'] ) ) . '">' . esc_html( $brand['phone'] ) . '</a>' . PHP_EOL;
	echo '<a href="mailto:' . esc_attr( $brand['email'] ) . '">' . esc_html( $brand['email'] ) . '</a>' . PHP_EOL;
	echo '</div>' . PHP_EOL;
	echo '</div>' . PHP_EOL;
}
