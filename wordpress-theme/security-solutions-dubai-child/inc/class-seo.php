<?php
/**
 * SEO: JSON-LD schema, Open Graph, Twitter cards.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class SSDK_SEO {

	/**
	 * Hook in.
	 */
	public static function init() {
		add_action( 'wp_head', array( __CLASS__, 'head' ), 5 );
		add_filter( 'document_title_parts', array( __CLASS__, 'title_parts' ) );
	}

	/**
	 * Output all SEO meta.
	 */
	public static function head() {
		self::open_graph();
		self::twitter();
		self::json_ld();
	}

	/* ------------------------------------------------------------------
	 * Open Graph
	 * ------------------------------------------------------------------ */
	public static function open_graph() {
		if ( is_admin() || is_feed() ) {
			return;
		}

		$url       = wp_get_canonical_url();
		$title     = self::seo_title();
		$desc      = self::seo_description();
		$image     = self::og_image();
		$type      = is_singular( 'post' ) ? 'article' : 'website';
		$site_name = get_bloginfo( 'name' );

		echo '<meta property="og:locale" content="en_US">' . PHP_EOL;
		echo '<meta property="og:type" content="' . esc_attr( $type ) . '">' . PHP_EOL;
		echo '<meta property="og:title" content="' . esc_attr( $title ) . '">' . PHP_EOL;
		echo '<meta property="og:description" content="' . esc_attr( $desc ) . '">' . PHP_EOL;
		echo '<meta property="og:url" content="' . esc_url( $url ) . '">' . PHP_EOL;
		echo '<meta property="og:site_name" content="' . esc_attr( $site_name ) . '">' . PHP_EOL;
		echo '<meta property="og:image" content="' . esc_url( $image ) . '">' . PHP_EOL;
		echo '<meta property="og:image:width" content="1200">' . PHP_EOL;
		echo '<meta property="og:image:height" content="630">' . PHP_EOL;
		if ( is_singular( 'post' ) ) {
			$author = get_the_author();
			if ( $author ) {
				echo '<meta property="article:author" content="' . esc_attr( $author ) . '">' . PHP_EOL;
			}
			$date = get_the_date( 'c' );
			if ( $date ) {
				echo '<meta property="article:published_time" content="' . esc_attr( $date ) . '">' . PHP_EOL;
			}
		}
	}

	/* ------------------------------------------------------------------
	 * Twitter cards
	 * ------------------------------------------------------------------ */
	public static function twitter() {
		if ( is_admin() || is_feed() ) {
			return;
		}
		echo '<meta name="twitter:card" content="summary_large_image">' . PHP_EOL;
		echo '<meta name="twitter:title" content="' . esc_attr( self::seo_title() ) . '">' . PHP_EOL;
		echo '<meta name="twitter:description" content="' . esc_attr( self::seo_description() ) . '">' . PHP_EOL;
		echo '<meta name="twitter:image" content="' . esc_url( self::og_image() ) . '">' . PHP_EOL;
	}

	/* ------------------------------------------------------------------
	 * JSON-LD
	 * ------------------------------------------------------------------ */
	public static function json_ld() {
		if ( is_admin() || is_feed() ) {
			return;
		}

		$site_url = site_url();
		$brand    = ssdk_brand();
		$schemas  = array();

		// Organization (site-wide).
		$schemas[] = array(
			'@context'   => 'https://schema.org',
			'@type'      => 'Organization',
			'name'       => $brand['name'],
			'url'        => $brand['url'],
			'telephone'  => $brand['phone'],
			'email'      => $brand['email'],
			'address'    => array(
				'@type'           => 'PostalAddress',
				'streetAddress'   => 'Level 33, Al Saqr Business Tower, Sheikh Zayed Road',
				'addressLocality' => 'Dubai',
				'addressRegion'   => 'Dubai',
				'addressCountry'  => 'AE',
				'postalCode'      => '',
			),
			'sameAs'      => array_values( array_filter( $brand['social'] ) ),
			'logo'        => $site_url . '/wp-content/themes/security-solutions-dubai-child/assets/img/logo.png',
		);

		// WebSite with SearchAction.
		$schemas[] = array(
			'@context'        => 'https://schema.org',
			'@type'           => 'WebSite',
			'name'            => $brand['name'],
			'url'             => $brand['url'],
			'publisher'       => array( '@type' => 'Organization', 'name' => $brand['name'] ),
			'potentialAction' => array(
				'@type'       => 'SearchAction',
				'target'       => $brand['url'] . '/?s={search_term_string}',
				'query-input'  => 'required name=search_term_string',
			),
		);

		// Current page.
		$page_type = 'WebPage';
		$page_name = get_queried_object() ? get_queried_object()->post_title : '';
		if ( is_singular( 'post' ) ) {
			$page_type = 'Article';
		}
		$schemas[] = array(
			'@context'  => 'https://schema.org',
			'@type'     => $page_type,
			'name'      => $page_name,
			'url'       => wp_get_canonical_url(),
			'mainEntityOfPage' => array( '@type' => 'WebPage', '@id' => wp_get_canonical_url() ),
			'isPartOf'  => array( '@type' => 'WebSite', '@id' => $brand['url'] ),
		);

		if ( is_singular( 'post' ) && $page_name ) {
			$schemas[] = array(
				'@context'      => 'https://schema.org',
				'@type'         => 'Article',
				'headline'      => $page_name,
				'url'           => wp_get_canonical_url(),
				'datePublished' => get_the_date( 'c' ),
				'dateModified'  => get_the_modified_date( 'c' ),
				'author'        => array( '@type' => 'Person', 'name' => get_the_author() ),
				'publisher'     => array( '@type' => 'Organization', 'name' => $brand['name'] ),
				'mainEntityOfPage' => array( '@type' => 'Article', '@id' => wp_get_canonical_url() ),
			);
		}

		// BreadcrumbList.
		$crumbs = self::breadcrumb_crumbs();
		if ( ! empty( $crumbs ) ) {
			$schemas[] = array(
				'@context'  => 'https://schema.org',
				'@type'     => 'BreadcrumbList',
				'itemListElement' => $crumbs,
			);
		}

		// FAQPage (dynamic — scans page content for .ssdk-faq-item).
		if ( is_singular() && function_exists( 'apply_filters' ) ) {
			$content = get_post_field( 'post_content', get_the_ID() );
			if ( $content && preg_match_all( '/<div class="ssdk-faq-item"[^>]*>.*?<button[^>]*>(.*?)<\/button>.*?<div class="ssdk-faq-a"[^>]*>(.*?)<\/div>/s', $content, $m, PREG_SET_ORDER ) ) {
				$faq = array();
				foreach ( $m as $i => $match ) {
					$q = trim( wp_strip_all_tags( $match[1] ) );
					$a = trim( wp_strip_all_tags( $match[2] ) );
					if ( $q && $a ) {
						$faq[] = array(
							'@type'     => 'Question',
							'name'      => $q,
							'acceptedAnswer' => array(
								'@type'   => 'Answer',
								'text'    => $a,
							),
						);
					}
				}
				if ( ! empty( $faq ) ) {
					$schemas[] = array(
						'@context' => 'https://schema.org',
						'@type'    => 'FAQPage',
						'mainEntity' => $faq,
					);
				}
			}
		}

		$json = wp_json_encode( $schemas, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
		if ( $json ) {
			echo '<script type="application/ld+json">' . $json . '</script>' . PHP_EOL;
		}
	}

	/* ------------------------------------------------------------------
	 * Helpers
	 * ------------------------------------------------------------------ */
	public static function seo_title() {
		if ( is_singular() ) {
			$title = get_the_title();
			if ( $title ) {
				return $title . ' | ' . get_bloginfo( 'name' );
			}
		}
		if ( is_home() ) {
			return get_bloginfo( 'name' ) . ' — Security Solutions Dubai';
		}
		if ( is_archive() && is_category() ) {
			return single_cat_title( '', false ) . ' Category | ' . get_bloginfo( 'name' );
		}
		if ( is_search() ) {
			return 'Search: ' . get_search_query() . ' | ' . get_bloginfo( 'name' );
		}
		return get_bloginfo( 'name' ) . ' — Security Solutions Dubai';
	}

	public static function seo_description() {
		if ( is_singular() ) {
			$excerpt = get_the_excerpt();
			if ( $excerpt ) {
				return wp_trim_words( $excerpt, 30, '…' );
			}
		}
		if ( is_home() ) {
			return 'Security Solutions Dubai — CCTV, access control, wireless networking and IT infrastructure. Design, installation and 24/7 support across the UAE. ISO 9001:2015 certified.';
		}
		if ( is_archive() && is_category() ) {
			return 'Articles in the ' . single_cat_title( '', false ) . ' category.';
		}
		return 'Security systems Dubai businesses rely on — design, installation and support across the UAE.';
	}

	public static function og_image() {
		if ( is_singular() && has_post_thumbnail() ) {
			$img = wp_get_attachment_image_url( get_post_thumbnail_id(), get_the_ID(), 'ssdk_wide' );
			if ( $img ) {
				return $img;
			}
		}
		// Site default OG image — the child theme hero photo.
		return site_url() . '/wp-content/themes/security-solutions-dubai-child/assets/img/photo-hero.webp';
	}

	public static function breadcrumb_crumbs() {
		$crumbs = array();
		$crumbs[] = array(
			'@type'    => 'ListItem',
			'position' => 1,
			'name'     => 'Home',
			'item'     => home_url( '/' ),
		);

		if ( is_singular() ) {
			$pos = 2;
			if ( is_single() ) {
				$cats = get_the_category();
				if ( ! empty( $cats ) ) {
					$crumbs[] = array(
						'@type'    => 'ListItem',
						'position' => $pos++,
						'name'     => $cats[0]->name,
						'item'     => get_category_link( $cats[0]->term_id ),
					);
				}
			}
			$crumbs[] = array(
				'@type'    => 'ListItem',
				'position' => $pos,
				'name'     => get_the_title(),
				'item'     => get_permalink(),
			);
		} elseif ( is_archive() ) {
			$crumbs[] = array(
				'@type'    => 'ListItem',
				'position' => 2,
				'name'     => get_queried_object()->name,
				'item'     => get_permalink(),
			);
		}
		return $crumbs;
	}

	/**
	 * Add site name to the title parts for better SERPs.
	 */
	public static function title_parts( $parts ) {
		if ( empty( $parts['sitename'] ) ) {
			$parts['sitename'] = get_bloginfo( 'name' );
		}
		return $parts;
	}
}
