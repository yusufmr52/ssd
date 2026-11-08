<?php
/**
 * Blog / category / tag archives — uniform common layout.
 * Justified image-led grid (JS-free row spans computed from real thumbnails).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_stylesheet_directory() . '/inc/class-page.php';

get_header();

echo ssdk_page_title( ssdk_archive_title() );

ssdk_blog_grid();

get_footer();
