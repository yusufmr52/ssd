<?php
/**
 * Inner pages — uniform common layout for every page.
 * Header (common) → breadcrumb/title → content (+ optional sidebar) → footer (common).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_stylesheet_directory() . '/inc/class-page.php';

get_header();
?>

<?php
/**
 * The "Blog" page (posts page) is a page object in WP — when set in
 * Settings > Reading it still loops posts. Render it with the archive grid.
 */
if ( is_home() && (int) get_option( 'page_for_posts' ) === (int) get_queried_object_id() ) {
	echo ssdk_page_title( ssdk_archive_title() );
	ssdk_blog_grid();
	get_footer();
	return;
}
?>

<?php echo ssdk_page_title(); ?>

<article class="ssdk-page">
	<div class="ssdk-container ssdk-page-inner<?php echo esc_attr( ' none' === ssdk_get_sidebar() ? ' is-fullwidth' : ' has-sidebar' ); ?>">
		<div class="ssdk-content-wrap">
			<?php
			while ( have_posts() ) {
				the_post();
				?>
				<article <?php post_class( 'ssdk-post' ); ?>>
					<?php if ( has_post_thumbnail() && ! is_singular() ) : ?>
						<?php the_post_thumbnail( 'ssdk_card', array( 'class' => 'ssdk-post-thumb' ) ); ?>
					<?php endif; ?>
					<div class="ssdk-post-content entry-content">
						<?php
						the_content();
						wp_link_pages( array(
							'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'security-solutions-dubai-child' ),
							'after'  => '</div>',
						) );
						?>
					</div>
				</article>
				<?php
			}
			?>
		</div>
		<?php if ( 'none' !== ssdk_get_sidebar() ) : ?>
			<aside class="ssdk-sidebar-wrap<?php echo esc_attr( ' left' === ssdk_get_sidebar() ? ' sidebar-left' : '' ); ?>">
				<?php ssdk_render_sidebar(); ?>
			</aside>
		<?php endif; ?>
	</div>
</article>

<?php
get_footer();
