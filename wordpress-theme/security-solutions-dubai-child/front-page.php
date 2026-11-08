<?php
/**
 * Front page — homepage is built with WPBakery (TheGem).
 * Renders the WPBakery page content between the common header/footer.
 * If the homepage shows posts instead of a static page, fall back to the
 * blog grid.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_stylesheet_directory() . '/inc/class-page.php';

get_header();

if ( 'page' === get_option( 'show_on_front' ) && (int) get_option( 'page_on_front' ) === (int) get_queried_object_id() ) {
	// Static WPBakery homepage: no title area — the WPBakery content is the hero.
	while ( have_posts() ) {
		the_post();
		echo '<div class="ssdk-pb-container">';
		the_content();
		echo '</div>';
	}
	the_posts_pagination( array( 'mid_size' => 1 ) );
} else {
	// Posts index fallback — show latest articles.
	echo ssdk_page_title( 'Latest Articles', 'Insights on security systems, networking and connectivity in the UAE.' );
	ssdk_blog_grid();
}

get_footer();
