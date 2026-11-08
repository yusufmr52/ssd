<?php
/**
 * 404 page — common header/footer.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_stylesheet_directory() . '/inc/class-page.php';

get_header();
?>

<section class="ssdk-error">
	<div class="ssdk-container ssdk-error-inner">
		<h1>404</h1>
		<p class="ssdk-error-lead">The page you were looking for has moved, or never existed.</p>
		<p class="ssdk-error-help">Try the search, or jump straight to what you need:</p>
		<ul class="ssdk-error-links">
			<?php foreach ( ssdk_default_menu_items() as $mi ) : ?>
				<li><a href="<?php echo esc_url( $mi['url'] ); ?>"><?php echo esc_html( $mi['title'] ); ?></a></li>
			<?php endforeach; ?>
		</ul>
		<form class="ssdk-error-search" role="search" action="<?php echo esc_url( home_url( '/' ) ); ?>">
			<input type="search" name="s" placeholder="Search the site…" aria-label="Search">
			<button type="submit">Search</button>
		</form>
	</div>
</section>

<?php
get_footer();
