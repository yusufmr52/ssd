<?php
/**
 * Inner-page + blog-archive helpers: breadcrumbs, title area, sidebar resolution.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Breadcrumb trail for inner pages, posts and archives.
 */
function ssdk_breadcrumbs() {
	$items = array();
	$items[] = array(
		'title' => 'Home',
		'url'   => home_url( '/' ),
	);

	if ( is_singular() ) {
		// Post/page specific.
		if ( is_category() || is_single() ) {
			$cats = get_the_category();
			if ( ! empty( $cats ) ) {
				$items[] = array(
					'title' => esc_html( $cats[0]->name ),
					'url'   => get_category_link( $cats[0]->term_id ),
				);
			}
		}
		$items[] = array(
			'title' => get_the_title(),
			'url'   => get_permalink(),
		);
	} elseif ( is_archive() && is_category() ) {
		$items[] = array(
			'title' => single_cat_title( '', false ),
			'url'   => get_category_link( get_queried_object_id() ),
		);
	} elseif ( is_archive() && is_tag() ) {
		$items[] = array(
			'title' => single_tag_title( '', false ),
			'url'   => get_tag_link( get_queried_object_id() ),
		);
	} elseif ( is_archive() ) {
		$items[] = array(
			'title' => ssdk_archive_title(),
			'url'   => get_permalink(),
		);
	} elseif ( is_search() ) {
		$items[] = array(
			'title' => sprintf( 'Search: %s', get_search_query() ),
			'url'   => home_url( '/?s=' . urlencode( get_search_query() ) ),
		);
	}

	// Page hierarchy (for hierarchical CPTs).
	if ( is_singular() && 'page' === get_post_type() ) {
		$parents = get_post_ancestors( get_queried_object_id() );
		foreach ( array_reverse( $parents ) as $pid ) {
			$items[] = array(
				'title' => get_the_title( $pid ),
				'url'   => get_permalink( $pid ),
			);
		}
	}

	$out = '<nav class="ssdk-breadcrumbs" aria-label="Breadcrumb">' . PHP_EOL;
	$out .= '<ol class="breadcrumb-list">' . PHP_EOL;
	foreach ( $items as $i => $it ) {
		$last = ( count( $items ) - 1 ) === $i;
		$out .= '<li class="breadcrumb-item' . ( $last ? ' is-current' : '' ) . '">';
		if ( ! $last ) {
			$out .= '<a href="' . esc_url( $it['url'] ) . '">' . esc_html( $it['title'] ) . '</a>';
		} else {
			$out .= esc_html( $it['title'] );
		}
		$out .= '</li>' . PHP_EOL;
	}
	$out .= '</ol>' . PHP_EOL;
	$out .= '</nav>' . PHP_EOL;
	return $out;
}

/**
 * Archive title with description (used by archive.php).
 */
function ssdk_archive_title() {
	if ( is_category() ) {
		$cat = get_queried_object();
		return sprintf( '%s Category', esc_html( $cat->name ) );
	}
	if ( is_tag() ) {
		$tag = get_queried_object();
		return sprintf( '%s Tags', esc_html( $tag->name ) );
	}
	if ( is_date() ) {
		return single_month_title( 'F Y', false );
	}
	if ( is_author() ) {
		return sprintf( '%s Articles', esc_html( get_the_author() ) );
	}
	if ( is_search() ) {
		return sprintf( 'Search results for &ldquo;%s&rdquo;', esc_html( get_search_query() ) );
	}
	return 'Blog';
}

/**
 * Title area for inner pages / posts / archives.
 */
function ssdk_page_title( $title = '', $subtitle = '' ) {
	if ( is_404() ) {
		$title = '404 — Page not found';
	}
	if ( '' === $title ) {
		$title = get_the_title();
	}
	$out  = '<section class="ssdk-page-title">' . PHP_EOL;
	$out .= '<div class="ssdk-container">' . PHP_EOL;
	$out .= ssdk_breadcrumbs();
	$out .= '<h1 class="ssdk-page-title-text">' . esc_html( $title ) . '</h1>' . PHP_EOL;
	if ( '' !== $subtitle ) {
		$out .= '<p class="ssdk-page-title-sub">' . wp_kses_post( $subtitle ) . '</p>' . PHP_EOL;
	} elseif ( is_archive() && function_exists( 'term_description' ) && term_description() ) {
		$out .= '<p class="ssdk-page-title-sub">' . wp_kses_post( wp_strip_all_tags( term_description() ) ) . '</p>' . PHP_EOL;
	}
	$out .= '</div>' . PHP_EOL;
	$out .= '</section>' . PHP_EOL;
	return $out;
}

/**
 * Resolve sidebar layout for the current page (TheGem page options).
 * Returns 'none' | 'left' | 'right'.
 */
function ssdk_get_sidebar() {
	$sidebar = 'none';

	// TheGem page options (when TheGem is active).
	if ( function_exists( 'thegem_get_page_option' ) ) {
		$s = thegem_get_page_option( 'content_sidebar' );
		if ( $s ) {
			$sidebar = strtolower( $s );
		}
	}
	// TheGem also stores it as post meta in newer versions.
	if ( ! in_array( $sidebar, array( 'none', 'left', 'right' ), true ) ) {
		$meta = get_post_meta( get_the_ID(), '_sidebar', true );
		if ( $meta ) {
			$sidebar = strtolower( $meta );
		}
	}
	if ( ! in_array( $sidebar, array( 'none', 'left', 'right' ), true ) ) {
		$sidebar = 'none';
	}
	return $sidebar;
}

/**
 * Render the sidebar (default widgets when nothing is assigned).
 */
function ssdk_render_sidebar() {
	if ( is_active_sidebar( 'sidebar' ) || is_active_sidebar( 'ssdk-sidebar' ) ) {
		if ( is_active_sidebar( 'sidebar' ) ) {
			dynamic_sidebar( 'sidebar' );
		} else {
			dynamic_sidebar( 'ssdk-sidebar' );
		}
	} else {
		echo '<aside class="ssdk-sidebar widget-area">' . PHP_EOL;
		echo '<div class="widget">' . PHP_EOL;
		echo '<h3 class="widget-title">Talk to us</h3>' . PHP_EOL;
		echo '<p class="widget-text">Free consultation &amp; UAE-wide on-site surveys.</p>' . PHP_EOL;
		echo '<a class="ssdk-cta ssdk-cta-block" href="' . esc_url( home_url( '/contact-us/' ) ) . '">Get a Quote</a>' . PHP_EOL;
		echo '<p class="widget-phone"><a href="tel:+971503605274">+971 50 360 5274</a></p>' . PHP_EOL;
		echo '</div>' . PHP_EOL;
		echo '</aside>' . PHP_EOL;
	}
}


/**
 * Render the justified blog grid.
 */
function ssdk_blog_grid() {
	echo '<section class="ssdk-blog-archive">' . PHP_EOL;
	echo '<div class="ssdk-container">' . PHP_EOL;

	$posts = get_posts( array(
		'posts_per_page' => get_option( 'posts_per_page' ) ? (int) get_option( 'posts_per_page' ) : 12,
		'paged'          => max( 1, (int) get_query_var( 'paged' ) ),
		'no_found_rows'  => true,
	) );

	if ( empty( $posts ) ) {
		echo '<p class="ssdk-no-posts">No posts found.</p>' . PHP_EOL;
	} else {
		// Compute row spans from real thumbnail dimensions.
		$spans = array();
		foreach ( $posts as $p ) {
			$thumb_id = (int) get_post_thumbnail_id( $p );
			$meta     = $thumb_id ? wp_get_attachment_metadata( $thumb_id ) : null;
			$span     = 2;
			if ( $meta && isset( $meta['width'], $meta['height'] ) && $meta['width'] ) {
				$span = (int) round( ( $meta['height'] / $meta['width'] ) * 240 );
				$span = max( 1, min( 4, $span ) );
			}
			$spans[ $p->ID ] = $span;
		}
		echo '<div class="ssdk-justified" role="list">' . PHP_EOL;
		foreach ( $posts as $p ) {
			$span = isset( $spans[ $p->ID ] ) ? $spans[ $p->ID ] : 2;
			$img  = ssdk_post_grid_image( $p );
			$cats = get_the_category( $p->ID );
			echo '<article class="ssdk-blog-card ssdk-blog-card-span-' . esc_attr( $span ) . '" role="listitem">' . PHP_EOL;
			echo '<a class="ssdk-blog-card-img" href="' . esc_url( get_permalink( $p ) ) . '">' . $img . '</a>' . PHP_EOL;
			echo '<div class="ssdk-blog-card-body">' . PHP_EOL;
			if ( ! empty( $cats ) ) {
				echo '<span class="ssdk-blog-card-cats">' . esc_html( $cats[0]->name ) . '</span>' . PHP_EOL;
			}
			echo '<h3 class="ssdk-blog-card-title"><a href="' . esc_url( get_permalink( $p ) ) . '">' . esc_html( get_the_title( $p ) ) . '</a></h3>' . PHP_EOL;
			echo '<span class="ssdk-blog-card-date">' . esc_html( get_the_date( 'M j, Y', $p ) ) . '</span>' . PHP_EOL;
			echo '<p class="ssdk-blog-card-excerpt">' . esc_html( wp_trim_words( get_the_excerpt( $p ), 26, '…' ) ) . '</p>' . PHP_EOL;
			echo '<a class="ssdk-blog-card-more" href="' . esc_url( get_permalink( $p ) ) . '">Read more &rarr;</a>' . PHP_EOL;
			echo '</div>' . PHP_EOL;
			echo '</article>' . PHP_EOL;
		}
		echo '</div>' . PHP_EOL;
	}

	the_posts_pagination( array(
		'mid_size'  => 1,
		'prev_text' => '&larr; Previous',
		'next_text' => 'Next &rarr;',
	) );

	echo '</div>' . PHP_EOL;
	echo '</section>' . PHP_EOL;
}

/**
 * Thumbnail markup for the grid (WebP/lazy handled by content filters).
 */
function ssdk_post_grid_image( $post ) {
	$thumb_id = (int) get_post_thumbnail_id( $post );
	if ( ! $thumb_id ) {
		return '<img src="' . esc_url( get_stylesheet_directory_uri() . '/assets/img/photo-skyline.webp' ) . '" alt="' . esc_attr( get_the_title( $post ) ) . '" loading="lazy" decoding="async">';
	}
	return wp_get_attachment_image( $thumb_id, 'ssdk_card', false, array(
		'class'       => 'ssdk-blog-card-img-el',
		'loading'     => 'lazy',
		'decoding'    => 'async',
	) );
}
