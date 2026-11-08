<?php
/**
 * Footer template — new common footer across every page.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_stylesheet_directory() . '/inc/class-footer.php';
?>

</main><!-- #main -->

<?php
ssdk_render_footer_cta();
ssdk_render_footer();
wp_footer();
?>

</body>
</html>
