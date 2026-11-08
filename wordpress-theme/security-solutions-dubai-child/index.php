<?php
/**
 * Fallback template — same common header/footer as every other page.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_stylesheet_directory() . '/inc/class-page.php';

get_header();

echo ssdk_page_title( ssdk_archive_title() );

while ( have_posts() ) {
	the_post();
	echo '<article class="ssdk-post">';
	the_content();
	echo '</article>';
}

get_footer();
