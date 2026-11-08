<?php
/**
 * Single blog post — common header/footer + post layout.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_stylesheet_directory() . '/inc/class-page.php';

get_header();
?>

<?php
while ( have_posts() ) {
	the_post();
	$sub = is_singular( 'post' ) && has_excerpt() ? get_the_excerpt() : '';
	echo ssdk_page_title( get_the_title(), $sub );
	?>

	<article <?php post_class( 'ssdk-single' ); ?>>
		<?php if ( has_post_thumbnail() ) : ?>
			<div class="ssdk-single-thumb">
				<?php the_post_thumbnail( 'ssdk_wide' ); ?>
			</div>
		<?php endif; ?>

		<header class="ssdk-single-meta">
			<?php
			$cats = get_the_category();
			if ( ! empty( $cats ) ) {
				echo '<span class="ssdk-meta-cats">';
				foreach ( $cats as $cat ) {
					echo '<a href="' . esc_url( get_category_link( $cat->term_id ) ) . '">' . esc_html( $cat->name ) . '</a>';
				}
				echo '</span>';
			}
			?>
			<span class="ssdk-meta-date">
				<?php
				$dt = get_the_date( 'F j, Y' );
				echo '<time datetime="' . esc_attr( get_the_date( 'c' ) ) . '">' . esc_html( $dt ) . '</time>';
				?>
			</span>
		</header>

		<div class="ssdk-single-content entry-content">
			<?php
			the_content();
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'security-solutions-dubai-child' ),
				'after'  => '</div>',
			) );
			?>
		</div>

		<div class="ssdk-post-footer">
			<?php
			$tags = get_the_tags();
			if ( ! empty( $tags ) ) {
				echo '<div class="ssdk-tags">';
				foreach ( $tags as $tag ) {
					echo '<a class="ssdk-tag" href="' . esc_url( get_tag_link( $tag->term_id ) ) . '">#' . esc_html( $tag->name ) . '</a>';
				}
				echo '</div>';
			}
			?>
			<?php
			// Related posts from same categories.
			$related = ssdk_related_posts();
			if ( ! empty( $related ) ) {
				echo '<section class="ssdk-related"><h3>Related reading</h3><ul class="ssdk-related-list">';
				foreach ( $related as $r ) {
					echo '<li><a href="' . esc_url( get_permalink( $r ) ) . '"><span class="ssdk-related-date">' . esc_html( get_the_date( 'M j, Y', $r ) ) . '</span><span>' . esc_html( get_the_title( $r ) ) . '</span></a></li>';
				}
				echo '</ul></section>';
			}
			?>
		</div>
	</article>
	<?php
}
?>

<?php
get_footer();

/**
 * Up to 3 related posts sharing categories with the current post.
 */
function ssdk_related_posts() {
	if ( ! is_singular( 'post' ) ) {
		return array();
	}
	$cats = get_the_category( get_the_ID() );
	if ( empty( $cats ) ) {
		return array();
	}
	$args = array(
		'category__in'   => wp_get_post_terms( get_the_ID(), 'category', array( 'fields' => 'ids' ) ),
		'posts_per_page' => 3,
		'post__not_in'   => array( get_the_ID() ),
		'orderby'        => 'date',
		'order'          => 'DESC',
	);
	$q = new WP_Query( $args );
	$posts = $q->posts;
	wp_reset_postdata();
	return $posts;
}
