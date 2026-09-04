(() => {
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const desktop = window.matchMedia("(min-width: 901px)").matches;

	/* ---------- Smooth scroll (Lenis) ---------- */
	let lenis = null;
	if (!reduced && typeof window.Lenis === "function") {
		lenis = new window.Lenis({
			autoRaf: true,
			anchors: true,
			allowNestedScroll: true,
			smoothWheel: true,
		});
		window.excelEntLenis = lenis;

		const syncLenisLock = () => {
			const locked =
				document.body.classList.contains("nav-open") ||
				document.body.classList.contains("mobile-search-open") ||
				document.body.classList.contains("blog-modal-open") ||
				document.body.classList.contains("package-compare-open") ||
				document.body.classList.contains("package-enquiry-open") ||
				document.body.classList.contains("package-card-expanded-open") ||
				document.body.classList.contains("subscribe-popup-open");
			if (locked) {
				lenis.stop();
			} else {
				lenis.start();
			}
		};

		const bodyObserver = new MutationObserver(syncLenisLock);
		bodyObserver.observe(document.body, {
			attributes: true,
			attributeFilter: ["class"],
		});
		syncLenisLock();
	}

	const loader = document.getElementById("ee-loader");
	const spotlight = document.getElementById("ee-spotlight");
	const hero = document.querySelector(".hero");
	const header = document.getElementById("masthead");
	const hasOpenHeaderPanel = () =>
		Boolean(
			document.querySelector(
				"[data-header-budget].is-open, [data-header-date].is-open, [data-header-location].is-open, [data-header-categories].is-open, [data-header-artist].is-open"
			)
		);

	const fitHeaderDropdown = (el) => {
		if (!el || el.hidden) {
			return;
		}
		const top = el.getBoundingClientRect().top;
		const available = Math.floor(window.innerHeight - top - 16);
		el.style.setProperty("--ee-panel-max-height", `${Math.max(240, available)}px`);
	};

	const finishLoad = () => {
		if (loader && !loader.classList.contains("is-done")) {
			loader.classList.add("is-done");
		}
		if (spotlight) {
			spotlight.classList.add("is-on");
			window.setTimeout(() => {
				spotlight.remove();
			}, 1700);
		}
		if (hero) {
			hero.classList.add("is-loaded");
		}
		document.querySelector(".artist-hero")?.classList.add("is-loaded");
		document.querySelector(".about-intro")?.classList.add("is-loaded");
		document.querySelector(".package-intro")?.classList.add("is-loaded");
		document.querySelector(".contact-intro")?.classList.add("is-loaded");
		document.body.classList.add("ee-ready");
		document.dispatchEvent(new CustomEvent("excel-ent:ready"));
	};

	window.addEventListener("load", () => {
		window.setTimeout(finishLoad, reduced ? 0 : 900);
	});

	window.setTimeout(() => {
		if (loader && !loader.classList.contains("is-done")) {
			finishLoad();
		}
	}, reduced ? 100 : 2600);

	/* ---------- Custom cursor ---------- */
	const dot = document.getElementById("ee-cursor-dot");
	const ring = document.getElementById("ee-cursor-ring");

	if (!reduced && desktop && dot && ring) {
		document.body.classList.add("ee-has-cursor");

		let mx = window.innerWidth / 2;
		let my = window.innerHeight / 2;
		let rx = mx;
		let ry = my;

		window.addEventListener(
			"mousemove",
			(e) => {
				mx = e.clientX;
				my = e.clientY;
				dot.style.left = `${mx}px`;
				dot.style.top = `${my}px`;
			},
			{ passive: true }
		);

		const loop = () => {
			rx += (mx - rx) * 0.22;
			ry += (my - ry) * 0.22;
			ring.style.left = `${rx}px`;
			ring.style.top = `${ry}px`;
			requestAnimationFrame(loop);
		};
		requestAnimationFrame(loop);

		const bindMagnetic = (el) => {
			if (el.dataset.eeMagneticBound) {
				return;
			}
			el.dataset.eeMagneticBound = "1";
			el.classList.add("magnetic");

			el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
			el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
			el.addEventListener("mousedown", () => {
				ring.classList.add("is-pulse");
				window.setTimeout(() => ring.classList.remove("is-pulse"), 600);
			});
		};

		const magneticSelector = [
			"a",
			"button",
			".btn",
			".btn-hero",
			".btn-quote",
			".header-phone",
			".header-search__submit",
			".header-search__field:not(.header-search__field--budget):not(.header-search__field--date):not(.header-search__field--location):not(.header-search__field--categories):not(.header-search__field--artist)",
			".post-card",
			".nav-toggle",
			".hero-carousel__btn",
			".wp-block-button__link",
			".wp-element-button",
			"input[type='submit']",
			".artists-mode",
			".artists-filter",
			".artists-pager__btn",
			".artist-card",
			".magnetic",
		].join(",");

		document.querySelectorAll(magneticSelector).forEach(bindMagnetic);

		const mo = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (!(node instanceof Element)) {
						return;
					}
					if (node.matches?.(magneticSelector)) {
						bindMagnetic(node);
					}
					node.querySelectorAll?.(magneticSelector).forEach(bindMagnetic);
				});
			});
		});
		mo.observe(document.body, { childList: true, subtree: true });
	}

	/* ---------- Mobile nav ---------- */
	const navToggle = document.querySelector(".nav-toggle");
	const navigation = document.querySelector(".main-navigation");
	const siteHeader = document.querySelector(".site-header");

	if (navToggle && navigation) {
		const closeMobileNav = () => {
			navToggle.setAttribute("aria-expanded", "false");
			navToggle.setAttribute("aria-label", "Toggle menu");
			navigation.classList.remove("is-open");
			siteHeader?.classList.remove("is-nav-open");
			document.body.classList.remove("nav-open");
		};

		navToggle.addEventListener("click", () => {
			const expanded = navToggle.getAttribute("aria-expanded") === "true";
			const next = !expanded;
			navToggle.setAttribute("aria-expanded", String(next));
			navToggle.setAttribute("aria-label", next ? "Close menu" : "Toggle menu");
			navigation.classList.toggle("is-open", next);
			siteHeader?.classList.toggle("is-nav-open", next);
			document.body.classList.toggle("nav-open", next);
			if (next) {
				siteHeader?.classList.remove("is-search-open");
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.key !== "Escape" || !navigation.classList.contains("is-open")) return;
			closeMobileNav();
		});

		document.querySelectorAll(".header-search-icon").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				if (!siteHeader?.classList.contains("is-nav-open")) {
					return;
				}
				if (!window.matchMedia("(max-width: 1199px)").matches) {
					return;
				}
				e.preventDefault();
				e.stopImmediatePropagation();
				closeMobileNav();
				if (window.matchMedia("(max-width: 767px)").matches) {
					const mobileOpen = document.querySelector("[data-mobile-search-open]");
					if (mobileOpen) {
						window.setTimeout(() => mobileOpen.click(), 0);
					}
					return;
				}
				siteHeader.classList.add("is-search-open");
				btn.setAttribute("aria-expanded", "true");
			});
		});
	}

	/* ---------- Header on scroll (desktop sticky — Figma 1570:18908) ---------- */
	if (header) {
		const stickyMq = window.matchMedia("(min-width: 1200px)");
		let scrolled = false;
		const isSearchPage = document.body.classList.contains("search");
		const isExplorePage = document.body.classList.contains("page-template-page-explore-artists");
		const isArtistPage = document.body.classList.contains("page-template-page-artist");
		const isAboutPage = document.body.classList.contains("page-template-page-about");
		const isContactPage = document.body.classList.contains("page-template-page-contactus");
		const isHomePage =
			document.body.classList.contains("home") || document.body.classList.contains("front-page");
		const primary = document.getElementById("primary");

		const stickySearch = document.querySelector("[data-header-sticky-search]");
		let searchOpenAtY = 0;
		let searchToggleLock = false;

		const syncStickyOffset = () => {
			if ((!isSearchPage && !isExplorePage) || !primary) {
				return;
			}
			if (!header.classList.contains("is-scrolled")) {
				primary.style.setProperty("--ee-search-sticky-offset", "0px");
				return;
			}

			/* Use compact bar height so padding doesn't wait on the search collapse animation. */
			const searchOpen =
				header.classList.contains("is-search-open") ||
				header.classList.contains("is-panel-open") ||
				header.classList.contains("is-explore-filter-open");
			if (searchOpen) {
				primary.style.setProperty("--ee-search-sticky-offset", `${header.offsetHeight}px`);
				return;
			}

			const bar = header.querySelector(".site-header__bar");
			const inner = header.querySelector(".site-header__inner");
			const padY = inner
				? (parseFloat(getComputedStyle(inner).paddingTop) || 0) +
				  (parseFloat(getComputedStyle(inner).paddingBottom) || 0)
				: 0;
			const compact = Math.max(
				Math.ceil((bar?.getBoundingClientRect().height || 0) + padY),
				1
			);
			primary.style.setProperty("--ee-search-sticky-offset", `${compact}px`);
		};

		const getHeaderCompactHeight = () => {
			if (header.classList.contains("is-scrolled")) {
				return Math.ceil(header.getBoundingClientRect().height);
			}
			const bar = header.querySelector(".site-header__bar");
			const inner = header.querySelector(".site-header__inner");
			const padY = inner
				? (parseFloat(getComputedStyle(inner).paddingTop) || 0) +
				  (parseFloat(getComputedStyle(inner).paddingBottom) || 0)
				: 0;
			return Math.max(Math.ceil((bar?.getBoundingClientRect().height || 0) + padY), 1);
		};

		let aboutMobileStickyTop = 0;
		let aboutMobileStickyWidth = window.innerWidth;

		const getAboutMobileStickyTop = () => {
			const width = window.innerWidth;
			if (aboutMobileStickyTop > 0 && width === aboutMobileStickyWidth) {
				return aboutMobileStickyTop;
			}
			aboutMobileStickyWidth = width;
			aboutMobileStickyTop = getHeaderCompactHeight();
			return aboutMobileStickyTop;
		};

		const syncArtistsStickyTop = () => {
			const isArtistMobile = isArtistPage && window.matchMedia("(max-width: 767px)").matches;
			const isAboutMobile = isAboutPage && window.matchMedia("(max-width: 767px)").matches;
			const isContactMobile =
				isContactPage && window.matchMedia("(max-width: 767px)").matches;
			const headerHeight = Math.ceil(header.getBoundingClientRect().height);
			const top =
				isAboutMobile
					? getAboutMobileStickyTop()
					: header.classList.contains("is-scrolled") || isArtistMobile || isContactMobile
						? headerHeight
						: 0;
			const topPx = `${top}px`;
			if (isArtistPage && primary) {
				primary.style.paddingTop = header.classList.contains("is-scrolled") ? topPx : "";
			}

			const artistsPin = document.querySelector("[data-artists-pin]");
			const artists = document.querySelector("[data-artists-section]");
			if (artists) {
				artists.style.setProperty("--ee-artists-sticky-top", topPx);
			}
			if (artistsPin) {
				artistsPin.style.setProperty("--ee-artists-sticky-top", topPx);
			}

			const excelWayPin = document.querySelector("[data-excel-way-pin]");
			const excelWay = document.querySelector("[data-excel-way]");
			if (excelWay) {
				excelWay.style.setProperty("--ee-excel-way-sticky-top", topPx);
			}
			if (excelWayPin) {
				excelWayPin.style.setProperty("--ee-excel-way-sticky-top", topPx);
			}

			const venuesPin = document.querySelector("[data-venues-pin]");
			const venues = document.querySelector("[data-venues-section]");
			if (venues) {
				venues.style.setProperty("--ee-venues-sticky-top", topPx);
			}
			if (venuesPin) {
				venuesPin.style.setProperty("--ee-venues-sticky-top", topPx);
			}

			const servicesPin = document.querySelector("[data-services-pin]");
			const services = document.querySelector("[data-services-swap]");
			if (services) {
				services.style.setProperty("--ee-services-sticky-top", topPx);
			}
			if (servicesPin) {
				servicesPin.style.setProperty("--ee-services-sticky-top", topPx);
			}

			const blogPin = document.querySelector("[data-blog-pin]");
			const blog = document.querySelector("[data-blog-section]");
			if (blog) {
				blog.style.setProperty("--ee-blog-sticky-top", topPx);
			}
			if (blogPin) {
				blogPin.style.setProperty("--ee-blog-sticky-top", topPx);
			}

			const aboutValuePin = document.querySelector("[data-about-value-pin]");
			const aboutValue = document.querySelector("[data-about-value]");
			const aboutValueUnit = document.querySelector("[data-about-value-unit]");
			if (aboutValue) {
				aboutValue.style.setProperty("--ee-about-value-sticky-top", topPx);
			}
			if (aboutValueUnit) {
				aboutValueUnit.style.setProperty("--ee-about-value-sticky-top", topPx);
			}
			if (aboutValuePin) {
				aboutValuePin.style.setProperty("--ee-about-value-sticky-top", topPx);
			}

			const aboutReviewsPin = document.querySelector("[data-about-reviews-pin]");
			const aboutReviews = document.querySelector("[data-about-reviews]");
			const aboutReviewsUnit = document.querySelector("[data-about-reviews-unit]");
			if (aboutReviews) {
				aboutReviews.style.setProperty("--ee-about-reviews-sticky-top", topPx);
			}
			if (aboutReviewsUnit) {
				aboutReviewsUnit.style.setProperty("--ee-about-reviews-sticky-top", topPx);
			}
			if (aboutReviewsPin) {
				aboutReviewsPin.style.setProperty("--ee-about-reviews-sticky-top", topPx);
			}

			const aboutWhyPin = document.querySelector("[data-about-why-pin]");
			const aboutWhy = document.querySelector("[data-about-why]");
			const aboutWhyUnit = document.querySelector("[data-about-why-unit]");
			if (aboutWhy) {
				aboutWhy.style.setProperty("--ee-about-why-sticky-top", topPx);
			}
			if (aboutWhyUnit) {
				aboutWhyUnit.style.setProperty("--ee-about-why-sticky-top", topPx);
			}
			if (aboutWhyPin) {
				aboutWhyPin.style.setProperty("--ee-about-why-sticky-top", topPx);
			}

			const aboutApproachPin = document.querySelector("[data-about-approach-pin]");
			const aboutApproach = document.querySelector("[data-about-approach]");
			const aboutApproachUnit = document.querySelector("[data-about-approach-unit]");
			if (aboutApproach) {
				aboutApproach.style.setProperty("--ee-about-approach-sticky-top", topPx);
			}
			if (aboutApproachUnit) {
				aboutApproachUnit.style.setProperty("--ee-about-approach-sticky-top", topPx);
			}
			if (aboutApproachPin) {
				aboutApproachPin.style.setProperty("--ee-about-approach-sticky-top", topPx);
			}

			const artistPerformancePin = document.querySelector("[data-artist-performance-pin]");
			const artistPerformance = document.querySelector("[data-artist-performance]");
			if (artistPerformance) {
				artistPerformance.style.setProperty("--ee-artist-performance-sticky-top", topPx);
			}
			if (artistPerformancePin) {
				artistPerformancePin.style.setProperty("--ee-artist-performance-sticky-top", topPx);
			}

			const artistSetlistPin = document.querySelector("[data-artist-setlist-pin]");
			const artistSetlist = document.querySelector("[data-artist-setlist]");
			if (artistSetlist) {
				artistSetlist.style.setProperty("--ee-artist-setlist-sticky-top", topPx);
			}
			if (artistSetlistPin) {
				artistSetlistPin.style.setProperty("--ee-artist-setlist-sticky-top", topPx);
			}

			const artistMediaPin = document.querySelector("[data-artist-media-pin]");
			const artistMediaEl = document.querySelector("[data-artist-media]");
			if (artistMediaEl) {
				artistMediaEl.style.setProperty("--ee-artist-media-sticky-top", topPx);
			}
			if (artistMediaPin) {
				artistMediaPin.style.setProperty("--ee-artist-media-sticky-top", topPx);
			}

			const artistSimilarPin = document.querySelector("[data-artist-similar-pin]");
			const artistSimilar = document.querySelector("[data-artist-similar]");
			if (artistSimilar) {
				artistSimilar.style.setProperty("--ee-artist-similar-sticky-top", topPx);
			}
			if (artistSimilarPin) {
				artistSimilarPin.style.setProperty("--ee-artist-similar-sticky-top", topPx);
			}

			const aboutIntroPin = document.querySelector("[data-about-intro-pin]");
			const aboutIntroEl = document.querySelector("[data-about-intro]");
			const aboutIntroUnit = document.querySelector("[data-about-intro-unit]");
			if (aboutIntroEl) {
				aboutIntroEl.style.setProperty("--ee-about-intro-sticky-top", topPx);
			}
			if (aboutIntroUnit) {
				aboutIntroUnit.style.setProperty("--ee-about-intro-sticky-top", topPx);
			}
			if (aboutIntroPin) {
				aboutIntroPin.style.setProperty("--ee-about-intro-sticky-top", topPx);
			}

			const contactQuickPin = document.querySelector("[data-contact-quick-pin]");
			const contactQuickUnit = document.querySelector("[data-contact-quick-unit]");
			if (contactQuickUnit) {
				contactQuickUnit.style.setProperty("--ee-contact-quick-sticky-top", topPx);
			}
			if (contactQuickPin) {
				contactQuickPin.style.setProperty("--ee-contact-quick-sticky-top", topPx);
			}
		};

		const setStickySearchOpen = (open) => {
			header.classList.toggle("is-search-open", open);
			stickySearch?.setAttribute("aria-expanded", String(open));
			syncStickyOffset();
			if (open) {
				searchToggleLock = true;
				const stampY = () => {
					searchOpenAtY = window.excelEntLenis?.scroll ?? window.scrollY ?? 0;
				};
				stampY();
				window.requestAnimationFrame(() => {
					syncStickyOffset();
					stampY();
					window.setTimeout(() => {
						stampY();
						searchToggleLock = false;
					}, 280);
				});
				window.setTimeout(() => {
					document.querySelector(".header-search__artist-trigger")?.focus({ preventScroll: true });
				}, 40);
			} else {
				searchToggleLock = false;
				syncStickyOffset();
			}
		};

		const onScroll = (scrollY) => {
			const y = typeof scrollY === "number" ? scrollY : window.scrollY;
			const panelOpen = hasOpenHeaderPanel();
			const stickyOn =
				stickyMq.matches ||
				isExplorePage ||
				isHomePage ||
				isSearchPage ||
				(isArtistPage && window.matchMedia("(min-width: 768px)").matches) ||
				isAboutPage ||
				isContactPage;
			const next = stickyOn ? (scrolled ? y > 40 : y > 80) : false;

			header.classList.toggle("is-panel-open", panelOpen);

			if (panelOpen) {
				document.querySelectorAll("[data-header-categories-panel]").forEach(fitHeaderDropdown);
			}

			if (
				!searchToggleLock
				&& !panelOpen
				&& !header.classList.contains("is-explore-filter-open")
				&& header.classList.contains("is-search-open")
				&& Math.abs(y - searchOpenAtY) > 12
			) {
				if (!isExplorePage || next || scrolled) {
					setStickySearchOpen(false);
				}
			}

			if (next === scrolled) {
				if (isExplorePage && header.classList.contains("is-explore-filter-open")) {
					syncStickyOffset();
				}
				syncArtistsStickyTop();
				return;
			}
			scrolled = next;
			header.classList.toggle("is-scrolled", scrolled);
			if (!scrolled && !isExplorePage) {
				setStickySearchOpen(false);
			}
			syncStickyOffset();
			syncArtistsStickyTop();
			window.dispatchEvent(new CustomEvent("excel-ent:header-state-change"));
			if (isExplorePage && header.classList.contains("is-explore-filter-open")) {
				window.dispatchEvent(new CustomEvent("ee-explore-filter-refit"));
			}
		};

		onScroll(window.scrollY);
		if (lenis) {
			lenis.on("scroll", ({ scroll }) => onScroll(scroll));
		} else {
			window.addEventListener("scroll", () => onScroll(window.scrollY), { passive: true });
		}
		if (typeof stickyMq.addEventListener === "function") {
			stickyMq.addEventListener("change", () => onScroll(window.scrollY));
		} else if (typeof stickyMq.addListener === "function") {
			stickyMq.addListener(() => onScroll(window.scrollY));
		}
		window.addEventListener("resize", () => {
			syncStickyOffset();
			syncArtistsStickyTop();
		});
		syncArtistsStickyTop();

		stickySearch?.setAttribute("aria-expanded", "false");
		stickySearch?.addEventListener("click", (e) => {
			const isPhone = window.matchMedia("(max-width: 767px)").matches;

			if (isExplorePage && !stickyMq.matches) {
				if (!isPhone) {
					e.preventDefault();
					e.stopImmediatePropagation();
				}
				setStickySearchOpen(!header.classList.contains("is-search-open"));
				return;
			}
			if ((isHomePage || isSearchPage) && !stickyMq.matches) {
				if (isPhone) {
					setStickySearchOpen(!header.classList.contains("is-search-open"));
					return;
				}
				if (!header.classList.contains("is-scrolled")) {
					return;
				}
				setStickySearchOpen(!header.classList.contains("is-search-open"));
				return;
			}
			if (!stickyMq.matches) {
				return;
			}
			if (!isExplorePage && !header.classList.contains("is-scrolled")) {
				return;
			}
			setStickySearchOpen(!header.classList.contains("is-search-open"));
		});

		window.addEventListener("keydown", (e) => {
			if (e.key !== "Escape" || !header.classList.contains("is-search-open")) {
				return;
			}
			setStickySearchOpen(false);
			stickySearch?.focus();
		});
	}

	/* ---------- Scroll reveal ---------- */
	const revealItems = document.querySelectorAll(".reveal, [data-reveal]");

	if (reduced) {
		revealItems.forEach((item) => {
			item.classList.add("is-visible", "in");
		});
	} else if (revealItems.length) {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}
					entry.target.classList.add("is-visible", "in");
					obs.unobserve(entry.target);
				});
			},
			{
				threshold: 0.18,
				rootMargin: "0px 0px -60px 0px",
			}
		);

		revealItems.forEach((item, index) => {
			if (!item.style.transitionDelay) {
				item.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
			}
			observer.observe(item);
		});
	}

	/* ---------- Artist hero parallax ---------- */
	const artistHero = document.querySelector(".artist-hero");
	const artistHeroPhoto = artistHero?.querySelector(".artist-hero__media > img");
	if (!reduced && desktop && artistHero && artistHeroPhoto) {
		window.addEventListener(
			"mousemove",
			(e) => {
				if (!artistHero.classList.contains("is-loaded")) {
					return;
				}
				const px = (e.clientX / window.innerWidth - 0.5) * 8;
				const py = (e.clientY / window.innerHeight - 0.5) * 5;
				artistHeroPhoto.style.transform = `scale(1.04) translate(${px}px, ${py}px)`;
			},
			{ passive: true }
		);
	}

	/* ---------- About intro parallax ---------- */
	const aboutIntro = document.querySelector(".about-intro");
	const aboutIntroPhoto = aboutIntro?.querySelector(".about-intro__collage-main img");
	if (!reduced && desktop && aboutIntro && aboutIntroPhoto) {
		window.addEventListener(
			"mousemove",
			(e) => {
				if (!aboutIntro.classList.contains("is-loaded")) {
					return;
				}
				const px = (e.clientX / window.innerWidth - 0.5) * 8;
				const py = (e.clientY / window.innerHeight - 0.5) * 5;
				aboutIntroPhoto.style.transform = `scale(1.04) translate(${px}px, ${py}px)`;
			},
			{ passive: true }
		);
	}

	/* ---------- About page mobile pin helpers (stable layout, no scroll jerk) ---------- */
	const getAboutMobileViewportHeight = () => {
		const inner = window.innerHeight;
		if (window.innerWidth > 767) {
			return window.visualViewport?.height || inner;
		}
		const visual = window.visualViewport?.height;
		return visual ? Math.round(Math.min(visual, inner)) : inner;
	};

	const aboutMobilePinViewport = {
		width: window.innerWidth,
		height: getAboutMobileViewportHeight(),
	};
	let aboutMobilePinLayoutReady = false;

	const markAboutMobilePinLayoutReady = () => {
		aboutMobilePinLayoutReady = true;
	};

	window.addEventListener("load", markAboutMobilePinLayoutReady);
	document.fonts?.ready?.then(markAboutMobilePinLayoutReady);

	const shouldRelayoutAboutMobilePinViewport = () => {
		const width = window.innerWidth;
		const widthDelta = Math.abs(width - aboutMobilePinViewport.width);
		if (widthDelta >= 80) {
			aboutMobilePinViewport.width = width;
			aboutMobilePinViewport.height = getAboutMobileViewportHeight();
			return true;
		}
		return false;
	};

	const bindAboutMobilePinViewportGuard = (mobileMq, resetFn, refreshFn) => {
		let timer = 0;
		const onViewportChange = () => {
			if (!mobileMq.matches || !shouldRelayoutAboutMobilePinViewport()) {
				return;
			}
			window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				resetFn();
				refreshFn();
			}, 280);
		};
		window.addEventListener("resize", onViewportChange, { passive: true });
	};

	const aboutMobilePinStateFrame = { id: 0, pending: new Set() };
	const scheduleAboutMobilePinnedState = (fn) => {
		aboutMobilePinStateFrame.pending.add(fn);
		if (aboutMobilePinStateFrame.id) {
			return;
		}
		aboutMobilePinStateFrame.id = window.requestAnimationFrame(() => {
			aboutMobilePinStateFrame.id = 0;
			aboutMobilePinStateFrame.pending.forEach((syncFn) => syncFn());
			aboutMobilePinStateFrame.pending.clear();
		});
	};

	const getAboutMobileAvailableHeight = (stickyTop) =>
		Math.max(getAboutMobileViewportHeight() - stickyTop, 0);

	/** Scale mobile sticky units to exactly fill the available viewport (up or down). */
	const measureAboutMobileStickyUnit = (unitEl, getAvailableHeight) => {
		const innerEl =
			unitEl.querySelector('[class*="__unit-inner"]') ||
			unitEl.querySelector('[class$="__inner"]') ||
			unitEl;
		void unitEl.offsetHeight;
		const styles = getComputedStyle(unitEl);
		const padTop = parseFloat(styles.paddingTop) || 0;
		const padBottom = parseFloat(styles.paddingBottom) || 0;
		/*
		 * Include unit padding in the natural height. Scaling against the inner
		 * alone left padTop+padBottom unaccounted for, which clipped the last
		 * lines on shorter phones (overflow:hidden on the fitted unit).
		 */
		const innerHeight = Math.max(Math.ceil(innerEl.scrollHeight), 1);
		const sectionH = innerHeight + Math.ceil(padTop) + Math.ceil(padBottom);
		const availableHeight = getAvailableHeight();
		const fitScale = Math.min(1, (availableHeight - 2) / Math.max(sectionH, 1));
		const useFit = availableHeight > 0 && fitScale < 0.999;
		const useFill = availableHeight > 0 && !useFit && availableHeight > sectionH + 1;
		return {
			sectionH,
			innerHeight,
			availableHeight,
			fitScale: useFit ? fitScale : 1,
			padTop,
			padBottom,
			useFit,
			useFill,
		};
	};

	const buildAboutMobilePinSnapshot = (measure, padHeight, holdHeight) => {
		const displaySectionHeight = Math.ceil(measure.availableHeight);
		return {
			availableHeight: measure.availableHeight,
			fitScale: measure.fitScale,
			padTop: measure.padTop,
			padBottom: measure.padBottom,
			contentHeight: measure.innerHeight,
			naturalSectionHeight: measure.sectionH,
			useFit: measure.useFit,
			useFill: measure.useFill,
			displaySectionHeight,
			pinHeight: padHeight + displaySectionHeight + holdHeight,
		};
	};

	/* ---------- About intro viewport fitting + mobile sticky pin ---------- */
	if (aboutIntro) {
		const aboutIntroPin = document.querySelector("[data-about-intro-pin]");
		const aboutIntroUnit = document.querySelector("[data-about-intro-unit]");
		const aboutIntroFitDesktopMq = window.matchMedia("(min-width: 1200px)");
		const aboutIntroPinMobileMq = window.matchMedia("(max-width: 767px)");
		let aboutIntroMobileFitLocked = false;
		let aboutIntroMobileFitSnapshot = null;
		let aboutIntroMobileFitWidth = window.innerWidth;
		let aboutIntroMobilePinReady = false;
		let aboutIntroResizeTimer = 0;

		const resetAboutIntroMobilePin = () => {
			aboutIntroMobileFitLocked = false;
			aboutIntroMobileFitSnapshot = null;
			aboutIntroMobileFitWidth = window.innerWidth;
		};

		const getAboutIntroFitEl = () =>
			aboutIntroPinMobileMq.matches && aboutIntroUnit ? aboutIntroUnit : aboutIntro;

		const clearAboutIntroViewportFit = () => {
			[aboutIntro, aboutIntroUnit].filter(Boolean).forEach((el) => {
				el.classList.remove("is-viewport-fitted", "is-mobile-fill", "is-pinned");
				el.style.removeProperty("height");
				el.style.removeProperty("--ee-about-intro-available-height");
				el.style.removeProperty("--ee-about-intro-viewport-height");
				el.style.removeProperty("--ee-about-intro-fit-scale");
				el.style.removeProperty("--ee-about-intro-fit-pad-top");
				el.style.removeProperty("--ee-about-intro-fit-pad-bottom");
				el.style.removeProperty("--ee-about-intro-content-height");
			});
		};

		const getAboutIntroStickyTop = () => {
			const stickyEl = aboutIntroUnit || aboutIntro;
			const fromVar =
				parseFloat(
					getComputedStyle(stickyEl).getPropertyValue(
						"--ee-about-intro-sticky-top"
					)
				) || 0;
			if (fromVar > 0) {
				return fromVar;
			}
			const headerEl = document.querySelector(".site-header");
			return headerEl ? Math.ceil(headerEl.getBoundingClientRect().height) : 0;
		};

		const getAboutIntroAvailableHeight = () =>
			getAboutMobileAvailableHeight(getAboutIntroStickyTop());

		const applyAboutIntroViewportFit = (snapshot) => {
			if (!snapshot) {
				return;
			}

			const fitEl = getAboutIntroFitEl();
			if (
				aboutIntroMobileFitLocked &&
				aboutIntroMobileFitSnapshot === snapshot &&
				((snapshot.useFit && fitEl.classList.contains("is-viewport-fitted")) ||
					(snapshot.useFill && fitEl.classList.contains("is-mobile-fill")) ||
					(!snapshot.useFit &&
						!snapshot.useFill &&
						!fitEl.classList.contains("is-viewport-fitted") &&
						!fitEl.classList.contains("is-mobile-fill")))
			) {
				syncAboutIntroPinnedState();
				return;
			}

			clearAboutIntroViewportFit();

			fitEl.style.setProperty(
				"--ee-about-intro-fit-scale",
				String(snapshot.fitScale || 1)
			);

			if (snapshot.useFill || snapshot.useFit) {
				fitEl.style.setProperty(
					"--ee-about-intro-available-height",
					`${snapshot.availableHeight}px`
				);
			}

			if (snapshot.useFit) {
				fitEl.style.setProperty(
					"--ee-about-intro-viewport-height",
					`${snapshot.availableHeight}px`
				);
				fitEl.style.setProperty(
					"--ee-about-intro-fit-pad-top",
					`${snapshot.padTop * snapshot.fitScale}px`
				);
				fitEl.style.setProperty(
					"--ee-about-intro-fit-pad-bottom",
					`${snapshot.padBottom * snapshot.fitScale}px`
				);
				fitEl.classList.add("is-viewport-fitted");
			} else if (snapshot.useFill) {
				fitEl.classList.add("is-mobile-fill");
			}

			if (aboutIntroPin && snapshot.pinHeight) {
				aboutIntroPin.style.height = `${snapshot.pinHeight}px`;
			}

			syncAboutIntroPinnedState();
		};

		const syncAboutIntroDesktopViewport = () => {
			if (!aboutIntroFitDesktopMq.matches || aboutIntroPinMobileMq.matches) {
				return;
			}

			clearAboutIntroViewportFit();
			if (aboutIntroPin) {
				aboutIntroPin.style.height = "";
			}

			const naturalHeight = Math.ceil(aboutIntro.scrollHeight);
			const headerEl = document.querySelector(".site-header");
			const headerHeight = headerEl
				? Math.ceil(headerEl.getBoundingClientRect().height)
				: 0;
			const availableHeight = Math.max(window.innerHeight - headerHeight, 0);
			const fitScale = Math.min(1, availableHeight / Math.max(naturalHeight, 1));

			if (fitScale >= 0.999 || !availableHeight) {
				return;
			}

			const styles = getComputedStyle(aboutIntro);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;
			const contentHeight = Math.max(naturalHeight - padTop - padBottom, 0);

			applyAboutIntroViewportFit({
				availableHeight,
				fitScale,
				padTop,
				padBottom,
				contentHeight,
				useFit: true,
			});
		};

		const getAboutIntroMobileHoldHeight = () => 0;

		const syncAboutIntroMobilePin = () => {
			if (!aboutIntroPin || !aboutIntroPinMobileMq.matches) {
				return;
			}

			const viewportWidth = window.innerWidth;
			if (
				aboutIntroMobileFitLocked &&
				Math.abs(viewportWidth - aboutIntroMobileFitWidth) > 80
			) {
				resetAboutIntroMobilePin();
			}

			if (aboutIntroMobileFitLocked && aboutIntroMobileFitSnapshot) {
				applyAboutIntroViewportFit(aboutIntroMobileFitSnapshot);
				return;
			}

			aboutIntroPin.style.height = "auto";
			clearAboutIntroViewportFit();

			const pad = aboutIntroPin.querySelector(".about-intro__scroll-pad");
			const padHeight = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const fitTarget = aboutIntroUnit || aboutIntro;
			fitTarget.style.setProperty("--ee-about-intro-fit-scale", "1");
			void fitTarget.offsetHeight;

			const measure = measureAboutMobileStickyUnit(
				fitTarget,
				getAboutIntroAvailableHeight
			);
			const holdHeight = getAboutIntroMobileHoldHeight();
			let snapshot = buildAboutMobilePinSnapshot(measure, padHeight, holdHeight);

			applyAboutIntroViewportFit(snapshot);

			/*
			 * Font/media/awards calc() reflows. If logos/content still overflow the
			 * locked viewport after the first scale, refine against post-reflow height.
			 */
			if (snapshot.useFit) {
				void fitTarget.offsetHeight;
				const innerEl =
					fitTarget.querySelector(".about-intro__unit-inner") ||
					fitTarget.querySelector(".about-intro__inner") ||
					fitTarget;
				const styles = getComputedStyle(fitTarget);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				const h2 =
					Math.ceil(innerEl.scrollHeight) +
					Math.ceil(padTop) +
					Math.ceil(padBottom);
				if (h2 > snapshot.availableHeight + 2) {
					const refined = Math.max(
						0.55,
						snapshot.fitScale * ((snapshot.availableHeight - 2) / h2)
					);
					snapshot = {
						...snapshot,
						fitScale: refined,
						useFit: true,
						useFill: false,
					};
					applyAboutIntroViewportFit(snapshot);
				}
			}

			if (!aboutIntroMobileFitLocked && aboutMobilePinLayoutReady) {
				aboutIntroMobileFitLocked = true;
				aboutIntroMobileFitSnapshot = snapshot;
				aboutIntroMobileFitWidth = viewportWidth;
			}
		};

		const syncAboutIntroViewport = () => {
			if (aboutIntroPinMobileMq.matches) {
				syncAboutIntroMobilePin();
				return;
			}

			resetAboutIntroMobilePin();
			if (aboutIntroPin) {
				aboutIntroPin.style.height = "";
			}
			syncAboutIntroDesktopViewport();
		};

		const syncAboutIntroPinnedState = () => {
			const stickyEl = aboutIntroUnit || aboutIntro;
			if (!aboutIntroPin || !aboutIntroPinMobileMq.matches) {
				stickyEl.classList.remove("is-pinned");
				return;
			}

			const stickyTop = getAboutIntroStickyTop();
			const viewportHeight = getAboutMobileViewportHeight();
			const sectionRect = stickyEl.getBoundingClientRect();
			const pinRect = aboutIntroPin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, viewportHeight - stickyTop) + 4;
			stickyEl.classList.toggle("is-pinned", pinned);
		};

		const refreshAboutIntroPin = () => {
			window.requestAnimationFrame(() => {
				syncAboutIntroViewport();
				syncAboutIntroPinnedState();
				window.dispatchEvent(new Event("excel-ent:about-intro-pin-layout"));
			});
		};

		const refreshAboutIntroPinLayout = () => {
			if (aboutIntroPinMobileMq.matches) {
				resetAboutIntroMobilePin();
			}
			refreshAboutIntroPin();
		};

		if (lenis) {
			lenis.on("scroll", () => scheduleAboutMobilePinnedState(syncAboutIntroPinnedState));
		} else {
			window.addEventListener(
				"scroll",
				() => scheduleAboutMobilePinnedState(syncAboutIntroPinnedState),
				{ passive: true }
			);
		}

		let aboutIntroLastResizeWidth = window.innerWidth;
		window.addEventListener("resize", () => {
			const w = window.innerWidth;
			if (aboutIntroPinMobileMq.matches && aboutIntroMobileFitLocked && w === aboutIntroLastResizeWidth) {
				syncAboutIntroPinnedState();
				return;
			}
			aboutIntroLastResizeWidth = w;
			window.clearTimeout(aboutIntroResizeTimer);
			aboutIntroResizeTimer = window.setTimeout(() => {
				if (aboutIntroPinMobileMq.matches) {
					if (
						aboutIntroMobileFitLocked &&
						Math.abs(window.innerWidth - aboutIntroMobileFitWidth) > 80
					) {
						refreshAboutIntroPinLayout();
						return;
					}
					if (!aboutIntroMobileFitLocked) {
						refreshAboutIntroPin();
					} else {
						syncAboutIntroPinnedState();
					}
					return;
				}
				refreshAboutIntroPinLayout();
			}, 150);
		}, { passive: true });

		window.addEventListener("load", () => {
			aboutIntroMobilePinReady = true;
			if (aboutIntroPinMobileMq.matches && aboutIntroMobileFitLocked) return;
			const fitTarget = aboutIntroUnit || aboutIntro;
			const naturalHeight = Math.ceil(fitTarget.scrollHeight);
			const snapNatural = aboutIntroMobileFitSnapshot?.naturalSectionHeight;
			if (
				!aboutIntroMobileFitLocked ||
				(snapNatural && Math.abs(naturalHeight - snapNatural) > 32)
			) {
				resetAboutIntroMobilePin();
				refreshAboutIntroPinLayout();
			}
		});

		window.addEventListener("orientationchange", () => {
			resetAboutIntroMobilePin();
			aboutIntroMobileFitWidth = window.innerWidth;
			window.setTimeout(refreshAboutIntroPinLayout, 150);
		});

		window.addEventListener("excel-ent:header-state-change", () => {
			if (aboutIntroPinMobileMq.matches && aboutIntroMobileFitLocked) {
				return;
			}
			if (aboutIntroPinMobileMq.matches) {
				refreshAboutIntroPin();
				return;
			}
			refreshAboutIntroPinLayout();
		});

		bindAboutMobilePinViewportGuard(
			aboutIntroPinMobileMq,
			resetAboutIntroMobilePin,
			refreshAboutIntroPinLayout
		);

		if (typeof aboutIntroFitDesktopMq.addEventListener === "function") {
			aboutIntroFitDesktopMq.addEventListener("change", refreshAboutIntroPinLayout);
			aboutIntroPinMobileMq.addEventListener("change", refreshAboutIntroPinLayout);
		} else if (typeof aboutIntroFitDesktopMq.addListener === "function") {
			aboutIntroFitDesktopMq.addListener(refreshAboutIntroPinLayout);
			aboutIntroPinMobileMq.addListener(refreshAboutIntroPinLayout);
		}

		window.requestAnimationFrame(refreshAboutIntroPin);
		aboutIntroPin?.querySelectorAll("img, object").forEach((asset) => {
			asset.addEventListener("load", () => {
				if (aboutIntroPinMobileMq.matches && aboutIntroMobileFitLocked) {
					syncAboutIntroPinnedState();
					return;
				}
				refreshAboutIntroPin();
			});
		});

		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				if (aboutIntroPinMobileMq.matches && aboutIntroMobileFitLocked) return;
				const fitTarget = aboutIntroUnit || aboutIntro;
				const naturalHeight = Math.ceil(fitTarget.scrollHeight);
				const snapNatural = aboutIntroMobileFitSnapshot?.naturalSectionHeight;
				if (
					!aboutIntroMobileFitLocked ||
					(snapNatural && Math.abs(naturalHeight - snapNatural) > 32)
				) {
					refreshAboutIntroPinLayout();
				}
			});
		}
	}

	/* ---------- About intro mobile media swipe ---------- */
	const aboutIntroMedia = document.querySelector("[data-about-intro-media]");
	if (aboutIntroMedia) {
		const aboutIntroMediaMq = window.matchMedia("(max-width: 767px)");
		let mediaTrack = aboutIntroMedia.querySelector(".about-intro__media-track");
		if (!mediaTrack) {
			mediaTrack = document.createElement("div");
			mediaTrack.className = "about-intro__media-track";
			while (aboutIntroMedia.firstChild) {
				mediaTrack.appendChild(aboutIntroMedia.firstChild);
			}
			aboutIntroMedia.appendChild(mediaTrack);
		}

		const mediaItems = () =>
			Array.from(
				mediaTrack.querySelectorAll(
					".about-intro__media-item:not(.about-intro__media-item--tablet-only)"
				)
			);

		let mediaIndex = 0;
		let mediaActive = false;
		let mediaAxis = null;
		let mediaStartX = 0;
		let mediaStartY = 0;
		let mediaDeltaX = 0;
		let mediaPointerId = null;
		let mediaLenisPaused = false;

		const pauseAboutIntroMediaLenis = () => {
			if (!mediaLenisPaused && window.excelEntLenis) {
				window.excelEntLenis.stop();
				mediaLenisPaused = true;
			}
		};

		const resumeAboutIntroMediaLenis = () => {
			if (mediaLenisPaused && window.excelEntLenis) {
				window.excelEntLenis.start();
				mediaLenisPaused = false;
			}
		};

		const getAboutIntroMediaStep = () => {
			const items = mediaItems();
			if (!items.length) {
				return 0;
			}
			const gap = parseFloat(getComputedStyle(mediaTrack).gap) || 10;
			return items[0].offsetWidth + gap;
		};

		const setAboutIntroMediaOffset = (offsetPx, instant) => {
			mediaTrack.style.transition = instant || reduced ? "none" : "";
			mediaTrack.style.transform = `translateX(${offsetPx}px)`;
		};

		const goToAboutIntroMedia = (next, instant) => {
			const items = mediaItems();
			if (!items.length) {
				return;
			}
			const count = items.length;
			mediaIndex = ((next % count) + count) % count;
			const step = getAboutIntroMediaStep();
			setAboutIntroMediaOffset(-mediaIndex * step, instant);
		};

		const applyAboutIntroMediaDrag = (deltaX) => {
			const step = getAboutIntroMediaStep();
			setAboutIntroMediaOffset(-mediaIndex * step + deltaX, true);
		};

		const releaseAboutIntroMediaPointer = (pointerId) => {
			if (pointerId == null) {
				return;
			}
			try {
				aboutIntroMedia.releasePointerCapture(pointerId);
			} catch (err) {
				/* ignore */
			}
		};

		const finishAboutIntroMediaGesture = (event) => {
			const wasHorizontal = mediaAxis === "x";
			if (event?.pointerId != null) {
				releaseAboutIntroMediaPointer(event.pointerId);
			}
			mediaActive = false;
			mediaAxis = null;
			mediaPointerId = null;
			aboutIntroMedia.classList.remove("is-dragging");
			resumeAboutIntroMediaLenis();

			if (wasHorizontal && aboutIntroMediaMq.matches) {
				const step = getAboutIntroMediaStep();
				const threshold = Math.min(48, Math.max(step * 0.15, 24));
				if (Math.abs(mediaDeltaX) > threshold) {
					goToAboutIntroMedia(mediaIndex + (mediaDeltaX < 0 ? 1 : -1));
				} else {
					goToAboutIntroMedia(mediaIndex, false);
				}
			}

			mediaDeltaX = 0;
		};

		aboutIntroMedia.addEventListener(
			"pointerdown",
			(e) => {
				if (!aboutIntroMediaMq.matches || e.button > 0) {
					return;
				}
				mediaActive = true;
				mediaAxis = null;
				mediaPointerId = e.pointerId;
				mediaStartX = e.clientX;
				mediaStartY = e.clientY;
				mediaDeltaX = 0;
			},
			{ passive: true }
		);

		aboutIntroMedia.addEventListener(
			"pointermove",
			(e) => {
				if (!mediaActive || e.pointerId !== mediaPointerId) {
					return;
				}

				const dx = e.clientX - mediaStartX;
				const dy = e.clientY - mediaStartY;

				if (!mediaAxis) {
					if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
						return;
					}
					if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 12) {
						mediaActive = false;
						mediaPointerId = null;
						return;
					}
					if (Math.abs(dx) >= Math.abs(dy)) {
						mediaAxis = "x";
						aboutIntroMedia.classList.add("is-dragging");
						pauseAboutIntroMediaLenis();
						try {
							aboutIntroMedia.setPointerCapture(e.pointerId);
						} catch (err) {
							/* ignore */
						}
					} else {
						return;
					}
				}

				if (mediaAxis !== "x") {
					return;
				}

				mediaDeltaX = dx;
				applyAboutIntroMediaDrag(dx);
				if (e.cancelable) {
					e.preventDefault();
				}
			},
			{ passive: false }
		);

		aboutIntroMedia.addEventListener("pointerup", finishAboutIntroMediaGesture);
		aboutIntroMedia.addEventListener("pointercancel", finishAboutIntroMediaGesture);

		const resetAboutIntroMediaCarousel = () => {
			finishAboutIntroMediaGesture();
			mediaIndex = 0;
			if (aboutIntroMediaMq.matches) {
				goToAboutIntroMedia(0, true);
				return;
			}
			mediaTrack.style.transition = "";
			mediaTrack.style.transform = "";
		};

		if (typeof aboutIntroMediaMq.addEventListener === "function") {
			aboutIntroMediaMq.addEventListener("change", resetAboutIntroMediaCarousel);
		} else if (typeof aboutIntroMediaMq.addListener === "function") {
			aboutIntroMediaMq.addListener(resetAboutIntroMediaCarousel);
		}

		window.addEventListener(
			"resize",
			() => {
				if (aboutIntroMediaMq.matches) {
					goToAboutIntroMedia(mediaIndex, true);
				}
			},
			{ passive: true }
		);

		aboutIntroMedia.querySelectorAll("img").forEach((img) => {
			img.setAttribute("draggable", "false");
		});

		goToAboutIntroMedia(0, true);
		window.addEventListener("load", () => {
			goToAboutIntroMedia(mediaIndex, true);
		});
		window.addEventListener("excel-ent:about-intro-pin-layout", () => {
			if (aboutIntroMediaMq.matches) {
				goToAboutIntroMedia(mediaIndex, true);
			}
		});
	}

	/* ---------- Artist hero viewport fitting ---------- */
	if (artistHero) {
		const artistHeroFitDesktopMq = window.matchMedia("(min-width: 1200px)");
		const artistHeroFitMobileMq = window.matchMedia("(max-width: 767px)");
		let artistHeroMobileFitLocked = false;
		let artistHeroMobileFitSnapshot = null;
		let artistHeroMobileFitWidth = window.innerWidth;

		const applyArtistHeroViewportFit = ({
			availableHeight,
			fitScale,
			padTop,
			padBottom,
			contentHeight,
		}) => {
			artistHero.style.setProperty(
				"--ee-artist-hero-viewport-height",
				`${availableHeight}px`
			);
			artistHero.style.setProperty("--ee-artist-hero-fit-scale", String(fitScale));
			artistHero.style.setProperty(
				"--ee-artist-hero-fit-pad-top",
				`${padTop * fitScale}px`
			);
			artistHero.style.setProperty(
				"--ee-artist-hero-fit-pad-bottom",
				`${padBottom * fitScale}px`
			);
			artistHero.style.setProperty(
				"--ee-artist-hero-content-height",
				`${contentHeight}px`
			);
			artistHero.classList.add("is-viewport-fitted");
		};

		const syncArtistHeroViewport = () => {
			artistHero.classList.remove("is-viewport-fitted");
			artistHero.style.removeProperty("height");
			artistHero.style.removeProperty("--ee-artist-hero-viewport-height");
			artistHero.style.removeProperty("--ee-artist-hero-fit-scale");
			artistHero.style.removeProperty("--ee-artist-hero-fit-pad-top");
			artistHero.style.removeProperty("--ee-artist-hero-fit-pad-bottom");
			artistHero.style.removeProperty("--ee-artist-hero-content-height");

			const isDesktop = artistHeroFitDesktopMq.matches;
			const isMobile = artistHeroFitMobileMq.matches;

			if (!isDesktop && !isMobile) {
				return;
			}

			if (
				isMobile &&
				artistHeroMobileFitLocked &&
				artistHeroMobileFitSnapshot
			) {
				applyArtistHeroViewportFit(artistHeroMobileFitSnapshot);
				return;
			}

			const naturalHeight = Math.ceil(artistHero.scrollHeight);
			const header = document.querySelector(".site-header");
			const headerHeight = header
				? Math.ceil(header.getBoundingClientRect().height)
				: 0;
			let availableHeight;

			if (isMobile) {
				const viewportHeight =
					window.visualViewport?.height || window.innerHeight;
				availableHeight = Math.max(viewportHeight - headerHeight, 0);
			} else {
				const sectionTop = Math.max(artistHero.getBoundingClientRect().top, 0);
				availableHeight = Math.max(window.innerHeight - sectionTop, 0);
			}

			const fitScale = Math.min(
				1,
				availableHeight / Math.max(naturalHeight, 1)
			);

			if (fitScale >= 0.999 || !availableHeight) {
				if (isMobile) {
					artistHeroMobileFitLocked = false;
					artistHeroMobileFitSnapshot = null;
				}
				return;
			}

			const styles = getComputedStyle(artistHero);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;
			const contentHeight = Math.max(naturalHeight - padTop - padBottom, 0);
			const snapshot = {
				availableHeight,
				fitScale,
				padTop,
				padBottom,
				contentHeight,
			};

			if (isMobile) {
				artistHeroMobileFitLocked = true;
				artistHeroMobileFitSnapshot = snapshot;
			}

			applyArtistHeroViewportFit(snapshot);
		};

		const unlockArtistHeroMobileFit = () => {
			artistHeroMobileFitLocked = false;
			artistHeroMobileFitSnapshot = null;
		};

		window.addEventListener("resize", () => {
			if (
				artistHeroFitMobileMq.matches &&
				Math.abs(window.innerWidth - artistHeroMobileFitWidth) > 40
			) {
				artistHeroMobileFitWidth = window.innerWidth;
				unlockArtistHeroMobileFit();
			}
			syncArtistHeroViewport();
		});
		window.addEventListener("load", syncArtistHeroViewport);
		window.addEventListener("excel-ent:header-state-change", syncArtistHeroViewport);
		window.addEventListener("orientationchange", () => {
			unlockArtistHeroMobileFit();
			artistHeroMobileFitWidth = window.innerWidth;
			window.setTimeout(syncArtistHeroViewport, 150);
		});
		window.requestAnimationFrame(syncArtistHeroViewport);

		artistHero.querySelector("img")?.addEventListener("load", syncArtistHeroViewport);

		if (typeof artistHeroFitDesktopMq.addEventListener === "function") {
			artistHeroFitDesktopMq.addEventListener("change", syncArtistHeroViewport);
		} else if (typeof artistHeroFitDesktopMq.addListener === "function") {
			artistHeroFitDesktopMq.addListener(syncArtistHeroViewport);
		}

		if (typeof artistHeroFitMobileMq.addEventListener === "function") {
			artistHeroFitMobileMq.addEventListener("change", () => {
				unlockArtistHeroMobileFit();
				syncArtistHeroViewport();
			});
		} else if (typeof artistHeroFitMobileMq.addListener === "function") {
			artistHeroFitMobileMq.addListener(() => {
				unlockArtistHeroMobileFit();
				syncArtistHeroViewport();
			});
		}

		if (document.fonts?.ready) {
			document.fonts.ready.then(syncArtistHeroViewport);
		}
	}

	/* ---------- Search empty-state: fill desktop viewport (Figma 2202:31547) ---------- */
	const searchEmpty = document.querySelector(".search-empty");
	if (searchEmpty) {
		const searchEmptyFitMq = window.matchMedia("(min-width: 1200px)");
		const searchEmptyInner = searchEmpty.querySelector(".search-empty__inner");
		/* Lock after first measure so scroll/resize thrash cannot change height mid-scroll. */
		let searchEmptyLock = null;

		const clearSearchEmptyFit = () => {
			searchEmpty.classList.remove("is-viewport-fitted");
			searchEmpty.style.removeProperty("height");
			searchEmpty.style.removeProperty("--ee-search-empty-min-height");
			searchEmpty.style.removeProperty("--ee-search-empty-fit-scale");
			searchEmptyLock = null;
		};

		const applySearchEmptyLock = (lock) => {
			searchEmpty.style.setProperty("--ee-search-empty-min-height", `${lock.height}px`);
			if (lock.scale < 0.999) {
				searchEmpty.style.setProperty("--ee-search-empty-fit-scale", String(lock.scale));
				searchEmpty.classList.add("is-viewport-fitted");
			} else {
				searchEmpty.classList.remove("is-viewport-fitted");
				searchEmpty.style.removeProperty("--ee-search-empty-fit-scale");
				searchEmpty.style.removeProperty("height");
			}
		};

		const syncSearchEmptyViewport = (force = false) => {
			if (!searchEmptyFitMq.matches || !searchEmptyInner) {
				clearSearchEmptyFit();
				return;
			}

			const width = window.innerWidth;
			if (!force && searchEmptyLock && searchEmptyLock.width === width) {
				applySearchEmptyLock(searchEmptyLock);
				return;
			}

			const scroll = window.excelEntLenis?.scroll ?? window.scrollY ?? 0;
			/* Document-relative top — stable while scrolling (unlike viewport top alone). */
			const topOffset = Math.round(searchEmpty.getBoundingClientRect().top + scroll);
			const availableHeight = Math.max(Math.floor(window.innerHeight - topOffset), 0);
			if (!availableHeight) {
				return;
			}

			searchEmpty.style.setProperty("--ee-search-empty-min-height", `${availableHeight}px`);
			searchEmpty.classList.remove("is-viewport-fitted");
			searchEmpty.style.removeProperty("--ee-search-empty-fit-scale");
			searchEmpty.style.removeProperty("height");

			const styles = getComputedStyle(searchEmpty);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;
			const contentHeight = Math.ceil(searchEmptyInner.getBoundingClientRect().height);
			const naturalHeight = contentHeight + padTop + padBottom;
			const fitScale = Math.min(1, availableHeight / Math.max(naturalHeight, 1));

			searchEmptyLock = {
				width,
				height: availableHeight,
				scale: fitScale,
			};
			applySearchEmptyLock(searchEmptyLock);
		};

		window.addEventListener("resize", () => {
			const width = window.innerWidth;
			if (searchEmptyLock && searchEmptyLock.width === width) {
				return;
			}
			syncSearchEmptyViewport(true);
		});
		window.addEventListener("load", () => syncSearchEmptyViewport(true));
		window.requestAnimationFrame(() => syncSearchEmptyViewport(true));

		searchEmpty.querySelector("img")?.addEventListener("load", () => syncSearchEmptyViewport(true));

		if (typeof searchEmptyFitMq.addEventListener === "function") {
			searchEmptyFitMq.addEventListener("change", () => syncSearchEmptyViewport(true));
		} else if (typeof searchEmptyFitMq.addListener === "function") {
			searchEmptyFitMq.addListener(() => syncSearchEmptyViewport(true));
		}

		if (document.fonts?.ready) {
			document.fonts.ready.then(() => syncSearchEmptyViewport(true));
		}
	}

	/* ---------- Hero parallax on mouse ---------- */
	const heroBg = document.querySelector(".hero__bg");
	if (!reduced && desktop && heroBg && hero) {
		window.addEventListener(
			"mousemove",
			(e) => {
				if (!hero.classList.contains("is-loaded")) {
					return;
				}
				const px = (e.clientX / window.innerWidth - 0.5) * 5;
				const py = (e.clientY / window.innerHeight - 0.5) * 3;
				heroBg.style.transform = `scale(1.015) translate(${px}px, ${py}px)`;
			},
			{ passive: true }
		);
	}

	/* ---------- Hero counters ---------- */
	const counters = document.querySelectorAll(".hero-stat__num[data-count]");
	if (counters.length && hero) {
		let counted = false;

		const runCounters = () => {
			if (counted) {
				return;
			}
			counted = true;

			counters.forEach((el) => {
				const target = parseInt(el.dataset.count, 10) || 0;
				const suffix = el.dataset.suffix || "";
				const useComma = el.dataset.format === "comma";

				const formatValue = (value) => {
					const rounded = Math.round(value);
					const formatted = useComma ? rounded.toLocaleString("en-GB") : String(rounded);
					return `${formatted}${suffix}`;
				};

				if (reduced) {
					el.textContent = formatValue(target);
					return;
				}

				el.textContent = formatValue(0);

				const duration = 1600;
				const start = performance.now();

				const tick = (now) => {
					const progress = Math.min((now - start) / duration, 1);
					const eased = 1 - Math.pow(1 - progress, 3);
					el.textContent = formatValue(eased * target);
					if (progress < 1) {
						requestAnimationFrame(tick);
					} else {
						el.textContent = formatValue(target);
					}
				};

				requestAnimationFrame(tick);
			});
		};

		/**
		 * Wait until the hero entrance finishes (is-loaded).
		 * Otherwise counters finish behind the loader and look static.
		 */
		const scheduleCounters = () => {
			const kickoff = () => {
				window.setTimeout(runCounters, reduced ? 0 : 280);
			};

			if (hero.classList.contains("is-loaded")) {
				kickoff();
				return;
			}

			const mo = new MutationObserver(() => {
				if (hero.classList.contains("is-loaded")) {
					mo.disconnect();
					kickoff();
				}
			});
			mo.observe(hero, { attributes: true, attributeFilter: ["class"] });

			/* Safety: never leave counters stuck at 0 */
			window.setTimeout(() => {
				if (!counted) {
					mo.disconnect();
					kickoff();
				}
			}, 4000);
		};

		const stats = document.querySelector(".hero__stats");
		if (stats) {
			const statsObserver = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							statsObserver.disconnect();
							scheduleCounters();
						}
					});
				},
				{ threshold: 0.2 }
			);
			statsObserver.observe(stats);
		} else {
			scheduleCounters();
		}
	}

	/* ---------- Hero occasion carousel ---------- */
	const carousel = document.querySelector("[data-hero-carousel]");
	if (carousel) {
		const slidesNode = carousel.querySelector("[data-carousel-slides]");
		const heroBgs = Array.from(document.querySelectorAll("[data-hero-bg]"));
		let slides = [];

		try {
			slides = JSON.parse(slidesNode?.textContent || "[]");
		} catch (err) {
			slides = [];
		}

		if (slides.length) {
			let index = 0;
			let timer = null;
			const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
			const AUTO_MS = 6000;

			const render = () => {
				const slide = slides[index];
				if (!slide) {
					return;
				}
				dots.forEach((dot, dotIndex) => {
					const active = dotIndex === index;
					dot.classList.toggle("is-active", active);
					dot.setAttribute("aria-selected", active ? "true" : "false");
				});
				if (heroBgs.length) {
					heroBgs.forEach((bg, i) => {
						bg.classList.toggle("is-active", i === index);
					});
				}
			};

			const go = (delta) => {
				index = (index + delta + slides.length) % slides.length;
				render();
			};

			const stopAuto = () => {
				if (timer) {
					window.clearInterval(timer);
					timer = null;
				}
			};

			const startAuto = () => {
				stopAuto();
				if (reducedMotion || slides.length < 2) {
					return;
				}
				timer = window.setInterval(() => go(1), AUTO_MS);
			};

			dots.forEach((dot, dotIndex) => {
				dot.addEventListener("click", () => {
					index = dotIndex;
					render();
					startAuto();
				});
			});

			carousel.addEventListener("pointerenter", stopAuto);
			carousel.addEventListener("pointerleave", startAuto);

			render();
			startAuto();
		}
	}

	/* ---------- Artists section carousel / filters ---------- */
	const artistsSection = document.querySelector("[data-artists-section]");
	if (artistsSection) {
		const artistsPin = document.querySelector("[data-artists-pin]");
		const progress = artistsSection.querySelector("[data-artists-progress]");
		const currentEl = artistsSection.querySelector("[data-artists-current]");
		const totalEl = artistsSection.querySelector("[data-artists-total]");
		const prevBtn = artistsSection.querySelector("[data-artists-prev]");
		const nextBtn = artistsSection.querySelector("[data-artists-next]");
		const modeBtns = artistsSection.querySelectorAll("[data-artists-mode]");
		const pinMq = window.matchMedia("(min-width: 320px)");

		const syncArtistsPin = () => {
			if (!artistsPin) {
				return;
			}
			if (!pinMq.matches) {
				artistsPin.style.height = "";
				artistsSection.classList.remove("is-pinned");
				return;
			}
			/* Height = scroll-pad + sticky section + hold runway */
			artistsPin.style.height = "auto";
			const pad = artistsPin.querySelector(".artists-section__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(artistsSection.getBoundingClientRect().height);
			const holdPx = Math.round(window.innerHeight * 1);
			artistsPin.style.height = `${padH + sectionH + holdPx}px`;
		};

		const syncArtistsPinnedState = () => {
			if (!artistsPin || !pinMq.matches) {
				artistsSection.classList.remove("is-pinned");
				return;
			}
			const stickyTop =
				parseFloat(getComputedStyle(artistsSection).getPropertyValue("--ee-artists-sticky-top")) || 0;
			const rect = artistsSection.getBoundingClientRect();
			const pinRect = artistsPin.getBoundingClientRect();
			/* Pinned while section top is locked under the header and pin still has runway left */
			const pinned =
				rect.top <= stickyTop + 1.5 &&
				pinRect.bottom > stickyTop + Math.min(rect.height, window.innerHeight - stickyTop) + 4;
			artistsSection.classList.toggle("is-pinned", pinned);
		};

		const onArtistsPinScroll = () => {
			syncArtistsPinnedState();
		};

		if (lenis) {
			lenis.on("scroll", onArtistsPinScroll);
		} else {
			window.addEventListener("scroll", onArtistsPinScroll, { passive: true });
		}
		window.addEventListener("resize", () => {
			syncArtistsPin();
			syncArtistsPinnedState();
		});
		if (typeof pinMq.addEventListener === "function") {
			pinMq.addEventListener("change", () => {
				syncArtistsPin();
				syncArtistsPinnedState();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
				syncArtistsPin();
				syncArtistsPinnedState();
			});
		}
		window.requestAnimationFrame(() => {
			syncArtistsPin();
			syncArtistsPinnedState();
		});
		window.addEventListener("load", () => {
			syncArtistsPin();
			syncArtistsPinnedState();
		});

		let activeMode = artistsSection.getAttribute("data-active-mode") || "occasion";
		let index = 0;
		const filtersByMode = {
			occasion: "all",
			artist: "all",
		};

		const getPanel = (mode = activeMode) =>
			artistsSection.querySelector(`[data-mode-panel="${mode}"]`);

		const getTrack = () => getPanel()?.querySelector("[data-artists-track]");

		const getCards = () =>
			Array.from(getPanel()?.querySelectorAll("[data-artists-card]") || []);

		const visibleCards = () =>
			getCards().filter((card) => !card.classList.contains("is-hidden"));

		const applyFilter = (animate = false) => {
			const activeFilter = filtersByMode[activeMode] || "all";
			const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			const cards = getCards();
			let visibleIndex = 0;

			cards.forEach((card) => {
				const category = card.getAttribute("data-category") || "";
				const show = activeFilter === "all" || category === activeFilter;
				card.classList.remove("is-appearing");
				card.classList.toggle("is-hidden", !show);
				if (show) {
					card.style.setProperty("--appear-i", String(visibleIndex));
					visibleIndex += 1;
				}
			});

			if (!animate || reduced || !visibleIndex) {
				return;
			}

			const panel = getPanel();
			if (panel) {
				void panel.offsetWidth;
			}

			visibleCards().forEach((card) => {
				card.classList.add("is-appearing");
				const clear = () => card.classList.remove("is-appearing");
				card.addEventListener("animationend", clear, { once: true });
			});
		};

		const update = () => {
			const track = getTrack();
			const visible = visibleCards();
			const max = Math.max(visible.length - 1, 0);
			index = Math.min(index, max);

			if (track) {
				const gap = parseFloat(getComputedStyle(track).gap) || 50;
				const cardWidth = visible[0]?.getBoundingClientRect().width || 518;
				track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
			}

			if (currentEl) {
				currentEl.textContent = String(visible.length ? index + 1 : 0);
			}
			if (totalEl) {
				totalEl.textContent = String(visible.length);
			}
			if (progress) {
				const total = Math.max(visible.length, 1);
				const width = 100 / total;
				progress.style.width = `${width}%`;
				progress.style.left = `${index * width}%`;
			}

			visible.forEach((card, i) => {
				card.classList.toggle("is-active", i === index);
			});

			syncArtistsPin();
		};

		/* Music tab hover panel — class fallback when CSS :hover is flaky with drag */
		artistsSection.querySelectorAll(".artist-card--occasion").forEach((card) => {
			card.addEventListener("pointerenter", () => {
				card.classList.add("is-hover");
			});
			card.addEventListener("pointerleave", () => {
				card.classList.remove("is-hover");
			});
		});

		const stopArtistPreview = (card) => {
			const video = card.querySelector("[data-artist-video]");
			if (!video) {
				return;
			}
			video.pause();
			try {
				video.currentTime = 0;
			} catch (err) {
				/* ignore */
			}
			card.classList.remove("is-playing");
		};

		const stopAllArtistPreviews = () => {
			artistsSection
				.querySelectorAll("[data-mode-panel='artist'] [data-artists-card]")
				.forEach(stopArtistPreview);
		};

		const bindArtistCardPreview = (card) => {
			const video = card.querySelector("[data-artist-video]");
			const muteBtn = card.querySelector("[data-artist-mute]");
			if (!video) {
				return;
			}

			const muteOff = muteBtn?.querySelector("[data-artist-mute-off]");
			const muteOn = muteBtn?.querySelector("[data-artist-mute-on]");

			const isUnmuted = () => card.classList.contains("is-unmuted");

			const syncMuteUi = () => {
				const on = isUnmuted();
				video.muted = !on;
				if (muteBtn) {
					muteBtn.setAttribute("aria-pressed", on ? "true" : "false");
					muteBtn.setAttribute(
						"aria-label",
						on ? "Mute preview" : "Unmute preview"
					);
				}
				if (muteOff) {
					muteOff.hidden = on;
				}
				if (muteOn) {
					muteOn.hidden = !on;
				}
			};

			const playPreview = () => {
				if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
					return;
				}
				video.muted = !isUnmuted();
				const attempt = video.play();
				if (attempt && typeof attempt.catch === "function") {
					attempt.catch(() => {
						video.muted = true;
						video.play().catch(() => {});
					});
				}
				card.classList.add("is-playing");
			};

			card.addEventListener("mouseenter", playPreview);
			card.addEventListener("mouseleave", () => stopArtistPreview(card));
			card.addEventListener("focusin", playPreview);
			card.addEventListener("focusout", (e) => {
				if (!card.contains(e.relatedTarget)) {
					stopArtistPreview(card);
				}
			});

			muteBtn?.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				card.classList.toggle("is-unmuted");
				syncMuteUi();
				if (
					card.matches(":hover") ||
					card.contains(document.activeElement) ||
					isUnmuted()
				) {
					playPreview();
				} else {
					stopArtistPreview(card);
				}
			});

			syncMuteUi();
		};

		const setMode = (mode) => {
			if (mode !== "artist") {
				stopAllArtistPreviews();
			}
			activeMode = mode;
			artistsSection.setAttribute("data-active-mode", mode);

			modeBtns.forEach((item) => {
				const on = item.getAttribute("data-artists-mode") === mode;
				item.classList.toggle("artists-mode--active", on);
				item.setAttribute("aria-selected", on ? "true" : "false");
			});

			artistsSection.querySelectorAll("[data-mode-filters]").forEach((row) => {
				const on = row.getAttribute("data-mode-filters") === mode;
				row.classList.toggle("is-hidden", !on);
				row.hidden = !on;
			});

			artistsSection.querySelectorAll("[data-mode-panel]").forEach((panel) => {
				const on = panel.getAttribute("data-mode-panel") === mode;
				panel.classList.toggle("is-hidden", !on);
				panel.hidden = !on;
			});

			index = 0;
			applyFilter(true);
			update();
			window.requestAnimationFrame(() => {
				syncArtistsPin();
				syncArtistsPinnedState();
			});
		};

		const go = (delta) => {
			const visible = visibleCards();
			if (!visible.length) {
				return;
			}
			index = (index + delta + visible.length) % visible.length;
			update();
		};

		prevBtn?.addEventListener("click", () => go(-1));
		nextBtn?.addEventListener("click", () => go(1));

		artistsSection.querySelectorAll("[data-mode-filters]").forEach((row) => {
			const mode = row.getAttribute("data-mode-filters");
			row.querySelectorAll("[data-artists-filter]").forEach((btn) => {
				btn.addEventListener("click", () => {
					filtersByMode[mode] = btn.getAttribute("data-artists-filter") || "all";
					row.querySelectorAll("[data-artists-filter]").forEach((item) => {
						const on = item === btn;
						item.classList.toggle("artists-filter--active", on);
						item.setAttribute("aria-selected", on ? "true" : "false");
					});
					if (mode === activeMode) {
						index = 0;
						applyFilter(true);
						update();
					}
				});
			});
		});

		modeBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				const mode = btn.getAttribute("data-artists-mode") || "occasion";
				setMode(mode);
			});
		});

		const isPanelActive = (panel) =>
			panel &&
			!panel.hidden &&
			!panel.classList.contains("is-hidden") &&
			(panel.getAttribute("data-mode-panel") || "") === activeMode;

		const bindArtistsSwipe = (panel) => {
			if (!panel || panel.dataset.eeSwipeBound === "1") {
				return;
			}
			panel.dataset.eeSwipeBound = "1";

			const getPanelTrack = () => panel.querySelector("[data-artists-track]");
			const getPanelVisible = () =>
				Array.from(panel.querySelectorAll("[data-artists-card]")).filter(
					(card) => !card.classList.contains("is-hidden")
				);

			let active = false;
			let startX = 0;
			let startY = 0;
			let deltaX = 0;
			let axis = null;
			let swiping = false;
			let baseOffset = 0;
			let step = 568;
			let maxOffset = 0;
			let wheelAccum = 0;
			let wheelLock = false;
			let lastX = 0;
			let lastT = 0;
			let velocity = 0;
			let lenisPaused = false;
			let pointerId = null;

			const measure = () => {
				const visible = getPanelVisible();
				const track = getPanelTrack();
				const gap = track ? parseFloat(getComputedStyle(track).gap) || 50 : 50;
				const cardWidth = visible[0]?.getBoundingClientRect().width || 280;
				step = cardWidth + gap;
				maxOffset = Math.max(visible.length - 1, 0) * step;
				return index * step;
			};

			const rubber = (offset) => {
				if (offset < 0) {
					return offset * 0.22;
				}
				if (offset > maxOffset) {
					return maxOffset + (offset - maxOffset) * 0.22;
				}
				return offset;
			};

			const pauseLenis = () => {
				if (!lenisPaused && window.excelEntLenis) {
					window.excelEntLenis.stop();
					lenisPaused = true;
				}
			};

			const resumeLenis = () => {
				if (lenisPaused && window.excelEntLenis) {
					window.excelEntLenis.start();
					lenisPaused = false;
				}
			};

			const clearCardHover = () => {
				panel.querySelectorAll(".artist-card.is-hover").forEach((card) => {
					card.classList.remove("is-hover");
				});
			};

			const applyDrag = (dx) => {
				deltaX = dx;
				const track = getPanelTrack();
				if (track) {
					track.style.transition = "none";
					track.style.transform = `translateX(${-rubber(baseOffset - deltaX)}px)`;
				}
			};

			const beginGesture = (clientX, clientY, id) => {
				if (!isPanelActive(panel)) {
					return false;
				}
				active = true;
				pointerId = id;
				startX = clientX;
				startY = clientY;
				lastX = clientX;
				lastT = performance.now();
				velocity = 0;
				deltaX = 0;
				axis = null;
				swiping = false;
				baseOffset = measure();
				/* Pause early so Lenis does not steal the touch gesture */
				pauseLenis();
				return true;
			};

			const moveGesture = (clientX, clientY, event) => {
				if (!active) {
					return;
				}
				const dx = clientX - startX;
				const dy = clientY - startY;
				const now = performance.now();
				const dt = Math.max(now - lastT, 1);
				velocity = (clientX - lastX) / dt;
				lastX = clientX;
				lastT = now;

				if (!axis) {
					const absX = Math.abs(dx);
					const absY = Math.abs(dy);
					if (absX < 8 && absY < 8) {
						return;
					}
					/* Prefer horizontal when clearly sideways; otherwise yield to page scroll */
					if (absY > absX && absY > 12) {
						axis = "y";
						active = false;
						pointerId = null;
						resumeLenis();
						return;
					}
					if (absX >= absY) {
						axis = "x";
						swiping = true;
						clearCardHover();
						panel.classList.add("is-dragging");
						if (pointerId != null && event && typeof event.pointerId === "number") {
							try {
								panel.setPointerCapture(event.pointerId);
							} catch (err) {
								/* ignore */
							}
						}
					} else {
						return;
					}
				}

				if (axis !== "x") {
					return;
				}

				applyDrag(dx);
				if (event && event.cancelable) {
					event.preventDefault();
				}
			};

			const finishGesture = () => {
				if (!active && !swiping) {
					resumeLenis();
					panel.classList.remove("is-dragging");
					return;
				}
				active = false;
				pointerId = null;

				const track = getPanelTrack();
				if (track) {
					track.style.transition = "";
				}
				panel.classList.remove("is-dragging");
				resumeLenis();

				if (swiping) {
					const visible = getPanelVisible();
					const max = Math.max(visible.length - 1, 0);
					const projected = baseOffset - deltaX - velocity * 160;
					const threshold = Math.min(40, Math.max(24, step * 0.12));
					if (Math.abs(deltaX) > threshold || Math.abs(velocity) > 0.35) {
						index = Math.round(projected / step);
					} else {
						index = Math.round(baseOffset / step);
					}
					index = Math.max(0, Math.min(max, index));
					update();

					const suppressClick = (ev) => {
						ev.preventDefault();
						ev.stopPropagation();
						panel.removeEventListener("click", suppressClick, true);
					};
					panel.addEventListener("click", suppressClick, true);
					window.setTimeout(() => {
						panel.removeEventListener("click", suppressClick, true);
					}, 500);
				}

				swiping = false;
				deltaX = 0;
				axis = null;
				velocity = 0;
			};

			const shouldIgnoreTarget = (target) =>
				Boolean(target?.closest?.("button, input, textarea, select, a.artists-filter"));

			/* ---- Touch (tablet / phone) — non-passive move so preventDefault works ---- */
			panel.addEventListener(
				"touchstart",
				(e) => {
					if (shouldIgnoreTarget(e.target) || e.touches.length !== 1) {
						return;
					}
					const t = e.touches[0];
					beginGesture(t.clientX, t.clientY, t.identifier);
				},
				{ passive: true }
			);

			panel.addEventListener(
				"touchmove",
				(e) => {
					if (!active || e.touches.length !== 1) {
						return;
					}
					const t = e.touches[0];
					if (pointerId !== null && t.identifier !== pointerId) {
						return;
					}
					moveGesture(t.clientX, t.clientY, e);
				},
				{ passive: false }
			);

			const onTouchEnd = (e) => {
				if (!active && !swiping) {
					return;
				}
				if (e.changedTouches?.[0] && pointerId !== null) {
					const ended = Array.from(e.changedTouches).some(
						(t) => t.identifier === pointerId
					);
					if (!ended) {
						return;
					}
				}
				finishGesture();
			};

			panel.addEventListener("touchend", onTouchEnd);
			panel.addEventListener("touchcancel", onTouchEnd);

			/* ---- Pointer (mouse / pen) ---- */
			panel.addEventListener(
				"pointerdown",
				(e) => {
					if (e.pointerType === "touch") {
						/* Handled by touch listeners */
						return;
					}
					if (shouldIgnoreTarget(e.target)) {
						return;
					}
					if (e.pointerType === "mouse" && e.button !== 0) {
						return;
					}
					beginGesture(e.clientX, e.clientY, e.pointerId);
				},
				{ passive: true }
			);

			panel.addEventListener(
				"pointermove",
				(e) => {
					if (e.pointerType === "touch") {
						return;
					}
					if (!active || pointerId !== e.pointerId) {
						return;
					}
					moveGesture(e.clientX, e.clientY, e);
				},
				{ passive: false }
			);

			const onPointerUp = (e) => {
				if (e.pointerType === "touch") {
					return;
				}
				if (!active && !swiping) {
					return;
				}
				if (pointerId !== null && e.pointerId !== pointerId) {
					return;
				}
				finishGesture();
			};

			panel.addEventListener("pointerup", onPointerUp);
			panel.addEventListener("pointercancel", onPointerUp);
			panel.addEventListener("lostpointercapture", (e) => {
				if (e.pointerType === "touch") {
					return;
				}
				if (active || swiping) {
					finishGesture();
				}
			});

			panel.addEventListener("dragstart", (e) => e.preventDefault());

			panel.addEventListener(
				"wheel",
				(e) => {
					if (!isPanelActive(panel)) {
						return;
					}
					const absX = Math.abs(e.deltaX);
					const absY = Math.abs(e.deltaY);
					if (!e.shiftKey && absX < 8 && absY >= absX) {
						return;
					}
					e.preventDefault();
					if (wheelLock) {
						return;
					}
					wheelAccum +=
						e.shiftKey && absX < absY ? e.deltaY : e.deltaX || e.deltaY;
					if (Math.abs(wheelAccum) < 60) {
						return;
					}
					go(wheelAccum > 0 ? 1 : -1);
					wheelAccum = 0;
					wheelLock = true;
					window.setTimeout(() => {
						wheelLock = false;
					}, 420);
				},
				{ passive: false }
			);
		};

		artistsSection.querySelectorAll("[data-artists-carousel]").forEach(bindArtistsSwipe);

		artistsSection
			.querySelectorAll("[data-mode-panel='artist'] [data-artists-card]")
			.forEach(bindArtistCardPreview);

		window.addEventListener("resize", () => update(), { passive: true });
		setMode(activeMode);
	}

	/* ---------- Excel Way tabs + sticky pin ---------- */
	const excelWay = document.querySelector("[data-excel-way]");
	if (excelWay) {
		const excelWayPin = document.querySelector("[data-excel-way-pin]");
		const tabs = Array.from(excelWay.querySelectorAll("[data-excel-way-tab]"));
		const panels = Array.from(excelWay.querySelectorAll("[data-excel-way-panel]"));
		const pinMq = window.matchMedia("(min-width: 320px)");
		/* Desktop sticky sections should always occupy the remaining viewport. */
		const excelWayFillMq = window.matchMedia("(min-width: 768px)");
		const excelWayMobileMq = window.matchMedia("(max-width: 767px)");
		let excelWayWasPinned = false;
		let lastExcelWayFillStickyTop = -1;
		let excelWayPinSyncQueued = false;
		let excelWayMobileFitLocked = false;
		let excelWayMobileFitWidth = window.innerWidth;
		let excelWayMobileStickyTop = 0;
		let excelWayMobileStickyWidth = -1;

		const isExcelWayFrontDesktop = () =>
			excelWayFillMq.matches &&
			(document.body.classList.contains("home") ||
				document.body.classList.contains("front-page"));

		const isExcelWayFrontMobile = () =>
			excelWayMobileMq.matches &&
			(document.body.classList.contains("home") ||
				document.body.classList.contains("front-page"));

		const getExcelWayStickyTop = () => {
			const fromVar =
				parseFloat(
					getComputedStyle(excelWay).getPropertyValue("--ee-excel-way-sticky-top")
				) || 0;
			if (fromVar > 0) {
				return fromVar;
			}
			const headerEl = document.querySelector(".site-header");
			if (headerEl?.classList.contains("is-scrolled")) {
				return Math.ceil(headerEl.getBoundingClientRect().height);
			}
			return 0;
		};

		const getExcelWayCompactStickyTop = () => {
			const headerEl = document.querySelector(".site-header");
			if (!headerEl) {
				return 0;
			}
			if (headerEl.classList.contains("is-scrolled")) {
				return Math.ceil(headerEl.getBoundingClientRect().height);
			}
			const bar = headerEl.querySelector(".site-header__bar");
			const inner = headerEl.querySelector(".site-header__inner");
			const padY = inner
				? (parseFloat(getComputedStyle(inner).paddingTop) || 0) +
				  (parseFloat(getComputedStyle(inner).paddingBottom) || 0)
				: 0;
			return Math.max(Math.ceil((bar?.getBoundingClientRect().height || 0) + padY), 1);
		};

		const getExcelWayMobileFrozenStickyTop = () => {
			const width = window.innerWidth;
			if (excelWayMobileStickyTop > 0 && width === excelWayMobileStickyWidth) {
				return excelWayMobileStickyTop;
			}
			excelWayMobileStickyWidth = width;
			excelWayMobileStickyTop = getExcelWayCompactStickyTop();
			excelWay.style.setProperty(
				"--ee-excel-way-sticky-top",
				`${excelWayMobileStickyTop}px`
			);
			if (excelWayPin) {
				excelWayPin.style.setProperty(
					"--ee-excel-way-sticky-top",
					`${excelWayMobileStickyTop}px`
				);
			}
			return excelWayMobileStickyTop;
		};

		const getExcelWayFillStickyTop = () => {
			if (isExcelWayFrontMobile()) {
				return getExcelWayMobileFrozenStickyTop();
			}
			return isExcelWayFrontDesktop()
				? getExcelWayCompactStickyTop()
				: getExcelWayStickyTop();
		};

		const getExcelWayViewportHeight = () => {
			const inner = window.innerHeight;
			if (!excelWayMobileMq.matches) {
				return window.visualViewport?.height || inner;
			}
			const visual = window.visualViewport?.height;
			return visual ? Math.round(Math.min(visual, inner)) : inner;
		};

		const measureExcelWayNaturalHeight = () => {
			const inner = excelWay.querySelector(".excel-way__inner");
			const styles = getComputedStyle(excelWay);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;
			const innerH = inner
				? Math.ceil(inner.scrollHeight || inner.getBoundingClientRect().height)
				: Math.ceil(excelWay.scrollHeight);
			return {
				sectionH: innerH + Math.ceil(padTop) + Math.ceil(padBottom),
				padTop,
				padBottom,
			};
		};

		const clearExcelWayViewportFit = () => {
			excelWay.classList.remove("is-viewport-fitted", "is-viewport-filled");
			excelWay.style.removeProperty("height");
			excelWay.style.removeProperty("visibility");
			excelWay.style.removeProperty("--ee-excel-way-viewport-height");
			excelWay.style.removeProperty("--ee-excel-way-fit-scale");
			excelWay.style.removeProperty("--ee-excel-way-fit-pad-top");
			excelWay.style.removeProperty("--ee-excel-way-fit-pad-bottom");
		};

		const resetExcelWayMobilePin = () => {
			excelWayMobileFitLocked = false;
			excelWayMobileFitWidth = window.innerWidth;
			excelWayMobileStickyTop = 0;
			excelWayMobileStickyWidth = -1;
		};

		const applyExcelWayViewportFit = ({
			availableH,
			fitScale,
			padTop,
			padBottom,
			useFit,
			useFill,
			padH,
			holdPx,
			naturalH,
		}) => {
			clearExcelWayViewportFit();
			excelWay.style.setProperty("--ee-excel-way-fit-scale", String(fitScale || 1));

			if (useFit || useFill) {
				excelWay.style.setProperty("--ee-excel-way-viewport-height", `${availableH}px`);
				excelWay.style.setProperty(
					"--ee-excel-way-fit-pad-top",
					`${padTop * fitScale}px`
				);
				excelWay.style.setProperty(
					"--ee-excel-way-fit-pad-bottom",
					`${padBottom * fitScale}px`
				);
				excelWay.classList.add("is-viewport-fitted");
				if (useFill) {
					excelWay.classList.add("is-viewport-filled");
				}
				excelWay
					.querySelectorAll(".reveal:not(.is-visible), [data-reveal]:not(.is-visible)")
					.forEach((el) => {
						el.classList.add("is-visible", "in");
					});
			}

			const displayH = useFit || useFill ? availableH : Math.ceil(naturalH || availableH);
			excelWayPin.style.height = `${padH + displayH + holdPx}px`;
			lastExcelWayFillStickyTop = getExcelWayFillStickyTop();
		};

		const syncExcelWayPin = () => {
			if (!excelWayPin) {
				return;
			}
			if (!pinMq.matches) {
				excelWayPin.style.height = "";
				excelWay.classList.remove("is-pinned");
				clearExcelWayViewportFit();
				resetExcelWayMobilePin();
				return;
			}

			const isMobile = excelWayMobileMq.matches;
			const viewportWidth = window.innerWidth;
			if (
				isMobile &&
				excelWayMobileFitLocked &&
				Math.abs(viewportWidth - excelWayMobileFitWidth) > 80
			) {
				resetExcelWayMobilePin();
			}

			/*
			 * Mobile: keep pin height locked after first measure so URL-bar /
			 * visualViewport height flicker cannot reflow and jerk the sticky unit.
			 * Tab changes still remeasure fonts against the frozen available height.
			 */
			const stickyTop = getExcelWayFillStickyTop();
			const viewportH = getExcelWayViewportHeight();
			const availableH = Math.max(viewportH - stickyTop, 0);
			const holdPx = Math.round(viewportH);
			const pad = excelWayPin.querySelector(".excel-way__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;

			const preservePinLayout =
				isMobile &&
				excelWayMobileFitLocked &&
				excelWay.classList.contains("is-viewport-fitted") &&
				excelWayPin.style.height &&
				excelWayPin.style.height !== "auto";

			if (!preservePinLayout) {
				excelWayPin.style.height = "auto";
			}
			if (preservePinLayout) {
				excelWay.style.visibility = "hidden";
			}

			clearExcelWayViewportFit();
			excelWay.style.setProperty("--ee-excel-way-fit-scale", "1");
			void excelWay.offsetHeight;

			const { sectionH, padTop, padBottom } = measureExcelWayNaturalHeight();
			/*
			 * Scale fonts/spacing to the available viewport (down or up, capped).
			 * Scale > 1 fills short content on tall phones; scale < 1 prevents clip.
			 */
			const rawScale = (availableH - 2) / Math.max(sectionH, 1);
			let fitScale = Math.min(1.18, Math.max(0.55, rawScale));
			if (Math.abs(fitScale - 1) < 0.01) {
				fitScale = 1;
			}
			const useFit = availableH > 0 && fitScale < 0.999;
			const useFill =
				availableH > 0 &&
				fitScale >= 0.999 &&
				(isMobile || excelWayFillMq.matches) &&
				availableH > sectionH + 1;
			const useScaleUp =
				isMobile && availableH > 0 && fitScale > 1.01 && availableH > sectionH + 1;

			let next = {
				availableH,
				fitScale: useFit || useScaleUp ? fitScale : 1,
				padTop,
				padBottom,
				useFit: useFit || useScaleUp || useFill,
				useFill: useFill || useScaleUp,
				padH,
				holdPx,
				naturalH: sectionH,
			};
			applyExcelWayViewportFit(next);

			/* Refine after font calc() reflow if still overflowing. */
			if ((useFit || useScaleUp) && isMobile) {
				void excelWay.offsetHeight;
				const h2 = measureExcelWayNaturalHeight().sectionH;
				if (h2 > availableH + 2) {
					const refined = Math.max(
						0.55,
						next.fitScale * ((availableH - 2) / h2)
					);
					next = {
						...next,
						fitScale: refined,
						useFit: true,
						useFill: false,
					};
					applyExcelWayViewportFit(next);
				}
			}

			if (preservePinLayout) {
				excelWay.style.visibility = "";
				/* Keep pin at the already-locked height to avoid scroll jerk. */
				excelWayPin.style.height = `${padH + availableH + holdPx}px`;
			}

			if (isMobile && !excelWayMobileFitLocked) {
				excelWayMobileFitLocked = true;
				excelWayMobileFitWidth = viewportWidth;
			}
			lastExcelWayFillStickyTop = stickyTop;
		};

		const scheduleExcelWayPinSync = () => {
			if (excelWayPinSyncQueued) {
				return;
			}
			excelWayPinSyncQueued = true;
			window.requestAnimationFrame(() => {
				window.requestAnimationFrame(() => {
					excelWayPinSyncQueued = false;
					syncExcelWayPin();
					syncExcelWayPinnedState();
					excelWayWasPinned = excelWay.classList.contains("is-pinned");
				});
			});
		};

		const syncExcelWayPinnedState = () => {
			if (!excelWayPin || !pinMq.matches) {
				excelWay.classList.remove("is-pinned");
				return false;
			}
			const stickyTop = getExcelWayFillStickyTop();
			const rect = excelWay.getBoundingClientRect();
			const pinRect = excelWayPin.getBoundingClientRect();
			const viewportH = getExcelWayViewportHeight();
			const pinned =
				rect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(rect.height, viewportH - stickyTop) + 4;
			excelWay.classList.toggle("is-pinned", pinned);
			return pinned;
		};

		const onExcelWayScroll = () => {
			const pinned = syncExcelWayPinnedState();
			if (excelWayMobileMq.matches) {
				return;
			}
			const fillStickyTop = getExcelWayFillStickyTop();
			const stickyChanged = Math.abs(fillStickyTop - lastExcelWayFillStickyTop) > 1;
			const pinnedChanged = pinned !== excelWayWasPinned;
			if (stickyChanged || pinnedChanged) {
				excelWayWasPinned = pinned;
				scheduleExcelWayPinSync();
			}
		};

		const setTab = (id) => {
			excelWay.querySelectorAll("[data-excel-way-tab]").forEach((tab) => {
				const on = tab.getAttribute("data-excel-way-tab") === id;
				tab.classList.toggle("excel-way-tab--active", on);
				tab.setAttribute("aria-selected", on ? "true" : "false");
			});

			panels.forEach((panel) => {
				const on = panel.getAttribute("data-excel-way-panel") === id;
				panel.classList.toggle("is-hidden", !on);
				panel.hidden = !on;
			});

			excelWay.querySelectorAll("[data-excel-way-accordion-item]").forEach((item) => {
				const on = item.getAttribute("data-excel-way-accordion-item") === id;
				item.classList.toggle("is-open", on);
			});

			scheduleExcelWayPinSync();
		};

		const mobileExcelWayCarousels = Array.from(
			excelWay.querySelectorAll("[data-excel-way-panel]")
		)
			.map((panel) => {
				const scroller =
					panel.querySelector(".excel-way__steps--how.excel-way__steps--mobile") ||
					panel.querySelector(".excel-way__steps--cancel") ||
					panel.querySelector(".excel-way-about__list--mobile");
				const pagination = panel.querySelector("[data-excel-way-pagination]");
				if (!scroller || !pagination) {
					return null;
				}

				const current = pagination.querySelector("[data-excel-way-current]");
				const fill = pagination.querySelector(".excel-way__mobile-pagination-fill");
				const total = Number(pagination.getAttribute("data-total")) || 1;
				const update = () => {
					const firstCard = scroller.firstElementChild;
					const cardWidth = firstCard?.getBoundingClientRect().width || 240;
					const index = Math.min(
						total,
						Math.max(1, Math.round(scroller.scrollLeft / Math.max(cardWidth, 1)) + 1)
					);
					if (current) {
						current.textContent = String(index);
					}
					if (fill) {
						fill.style.width = `${(index / total) * 100}%`;
					}
				};

				scroller.addEventListener("scroll", update, { passive: true });
				window.addEventListener("resize", update, { passive: true });
				update();
				return { scroller, update };
			})
			.filter(Boolean);

		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				setTab(tab.getAttribute("data-excel-way-tab") || "how-it-works");
				window.requestAnimationFrame(() => {
					mobileExcelWayCarousels.forEach(({ update }) => update());
				});
			});
		});

		const excelWayFromHash = () => {
			const raw = (window.location.hash || "").replace(/^#/, "").toLowerCase();
			if (
				raw === "cancellation" ||
				raw === "cancellation-protection" ||
				raw === "excel-way-cancellation"
			) {
				return "cancellation";
			}
			if (raw === "who-we-are" || raw === "excel-way-who-we-are") {
				return "who-we-are";
			}
			if (raw === "how-it-works" || raw === "excel-way") {
				return "how-it-works";
			}
			return "";
		};

		const applyExcelWayHash = () => {
			const id = excelWayFromHash();
			if (!id) {
				return;
			}
			setTab(id);
			const offset = -100;
			if (window.excelEntLenis) {
				window.excelEntLenis.scrollTo(excelWay, { offset, duration: 1.1 });
			} else {
				const top = excelWay.getBoundingClientRect().top + window.scrollY + offset;
				window.scrollTo({ top, behavior: "smooth" });
			}
		};

		if (lenis) {
			lenis.on("scroll", onExcelWayScroll);
		} else {
			window.addEventListener("scroll", onExcelWayScroll, { passive: true });
		}
		if (typeof IntersectionObserver === "function" && excelWayPin) {
			let excelWayPinInView = false;
			const excelWayPinObserver = new IntersectionObserver(
				(entries) => {
					const inView = entries.some((entry) => entry.isIntersecting);
					if (inView && !excelWayPinInView) {
						scheduleExcelWayPinSync();
					}
					excelWayPinInView = inView;
				},
				{ threshold: [0, 0.12] }
			);
			excelWayPinObserver.observe(excelWayPin);
		}
		excelWay.querySelectorAll("[data-reveal], .reveal").forEach((item) => {
			const revealObserver = new IntersectionObserver(
				(entries, obs) => {
					entries.forEach((entry) => {
						if (!entry.isIntersecting) {
							return;
						}
						scheduleExcelWayPinSync();
						obs.unobserve(entry.target);
					});
				},
				{ threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
			);
			revealObserver.observe(item);
		});
		window.addEventListener("resize", () => {
			if (
				excelWayMobileMq.matches &&
				excelWayMobileFitLocked &&
				window.innerWidth === excelWayMobileFitWidth
			) {
				syncExcelWayPinnedState();
				return;
			}
			if (
				excelWayMobileMq.matches &&
				excelWayMobileFitLocked &&
				Math.abs(window.innerWidth - excelWayMobileFitWidth) > 80
			) {
				resetExcelWayMobilePin();
			}
			scheduleExcelWayPinSync();
		});
		if (typeof pinMq.addEventListener === "function") {
			pinMq.addEventListener("change", () => {
				resetExcelWayMobilePin();
				scheduleExcelWayPinSync();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
				resetExcelWayMobilePin();
				scheduleExcelWayPinSync();
			});
		}
		if (typeof excelWayFillMq.addEventListener === "function") {
			excelWayFillMq.addEventListener("change", () => {
				resetExcelWayMobilePin();
				scheduleExcelWayPinSync();
			});
		} else if (typeof excelWayFillMq.addListener === "function") {
			excelWayFillMq.addListener(() => {
				resetExcelWayMobilePin();
				scheduleExcelWayPinSync();
			});
		}
		scheduleExcelWayPinSync();
		window.addEventListener("load", scheduleExcelWayPinSync);
		window.addEventListener("excel-ent:header-state-change", () => {
			if (excelWayMobileMq.matches && excelWayMobileFitLocked) {
				syncExcelWayPinnedState();
				return;
			}
			scheduleExcelWayPinSync();
		});
		document.addEventListener("excel-ent:ready", scheduleExcelWayPinSync);
		if (window.visualViewport) {
			window.visualViewport.addEventListener("resize", () => {
				/* Ignore mobile URL-bar height flicker — only relayout on real width changes. */
				if (excelWayMobileMq.matches) {
					if (Math.abs(window.innerWidth - excelWayMobileFitWidth) > 80) {
						resetExcelWayMobilePin();
						scheduleExcelWayPinSync();
					}
					return;
				}
				scheduleExcelWayPinSync();
			});
		}
		if (document.fonts?.ready) {
			document.fonts.ready.then(scheduleExcelWayPinSync);
		}
		window.setTimeout(scheduleExcelWayPinSync, 250);

		window.setTimeout(applyExcelWayHash, 80);
		window.addEventListener("hashchange", applyExcelWayHash);
	}

	/* ---------- Blog carousel + sticky pin ---------- */
	const blogSection = document.querySelector("[data-blog-section]");
	if (blogSection) {
		const blogPin = document.querySelector("[data-blog-pin]");
		const viewport = blogSection.querySelector(".blog-section__viewport");
		const track = blogSection.querySelector("[data-blog-track]");
		const cards = Array.from(blogSection.querySelectorAll("[data-blog-card]"));
		const progress = blogSection.querySelector("[data-blog-progress]");
		const currentEl = blogSection.querySelector("[data-blog-current]");
		const totalEl = blogSection.querySelector("[data-blog-total]");
		const prevBtn = blogSection.querySelector("[data-blog-prev]");
		const nextBtn = blogSection.querySelector("[data-blog-next]");
		const pinMq = window.matchMedia("(min-width: 320px)");
		let index = window.innerWidth <= 1199 ? 0 : cards.length > 2 ? 2 : 0;
		let blogMobilePinInitialized = false;

		const isBlogMobile = () => window.innerWidth <= 767;
		const isBlogSwipe = () => window.innerWidth <= 1199;

		const syncBlogPin = () => {
			if (!blogPin) {
				return;
			}
			if (!pinMq.matches) {
				blogMobilePinInitialized = false;
				blogPin.style.height = "";
				blogSection.classList.remove("is-pinned", "is-viewport-fitted");
				blogSection.style.removeProperty("height");
				blogSection.style.removeProperty("--ee-blog-viewport-height");
				blogSection.style.removeProperty("--ee-blog-fit-scale");
				blogSection.style.removeProperty("--ee-blog-fit-pad-top");
				blogSection.style.removeProperty("--ee-blog-fit-pad-bottom");
				blogSection.style.removeProperty("--ee-blog-fit-gap");
				return;
			}
			if (!isBlogMobile()) {
				blogMobilePinInitialized = false;
			}
			if (isBlogMobile() && blogMobilePinInitialized) {
				return;
			}
			const preservePinLayout =
				blogSection.classList.contains("is-viewport-fitted") &&
				blogPin.style.height &&
				blogPin.style.height !== "auto";
			if (!preservePinLayout) {
				blogPin.style.height = "auto";
			}
			if (preservePinLayout) {
				/*
				 * Measure after a resize or header change without temporarily
				 * collapsing the sticky pin. That collapse can move the scroll
				 * position on mobile and clip the card CTA at the bottom.
				 */
				blogSection.style.visibility = "hidden";
			}
			blogSection.classList.remove("is-viewport-fitted");
			blogSection.style.removeProperty("height");
			blogSection.style.removeProperty("--ee-blog-viewport-height");
			blogSection.style.removeProperty("--ee-blog-fit-scale");
			blogSection.style.removeProperty("--ee-blog-fit-pad-top");
			blogSection.style.removeProperty("--ee-blog-fit-pad-bottom");
			blogSection.style.removeProperty("--ee-blog-fit-gap");
			const pad = blogPin.querySelector(".blog-section__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(blogSection.getBoundingClientRect().height);
			const stickyTop =
				parseFloat(getComputedStyle(blogSection).getPropertyValue("--ee-blog-sticky-top")) || 0;
			if (isBlogMobile()) {
				/*
				 * Mobile browser chrome can change innerHeight while the user
				 * scrolls. Do not repeatedly resize/scale this sticky section;
				 * that is what makes the card and CTA jerk or clip. Establish
				 * its natural height once and keep the scroll hold stable.
				 */
				if (!blogMobilePinInitialized) {
					const holdPx = Math.round(window.innerHeight);
					blogPin.style.height = `${padH + sectionH + holdPx}px`;
					blogMobilePinInitialized = true;
				}
				return;
			}
			const availableH = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = Math.min(1, availableH / Math.max(sectionH, 1));
			if (fitScale < 1) {
				const styles = getComputedStyle(blogSection);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				blogSection.style.setProperty("--ee-blog-viewport-height", `${availableH}px`);
				blogSection.style.setProperty("--ee-blog-fit-scale", String(fitScale));
				blogSection.style.setProperty("--ee-blog-fit-pad-top", `${padTop * fitScale}px`);
				blogSection.style.setProperty("--ee-blog-fit-pad-bottom", `${padBottom * fitScale}px`);
				blogSection.style.setProperty("--ee-blog-fit-gap", `${30 * fitScale}px`);
				blogSection.classList.add("is-viewport-fitted");
			}
			const holdPx = Math.round(window.innerHeight * 1);
			blogPin.style.height = `${padH + sectionH * fitScale + holdPx}px`;
			if (preservePinLayout) {
				blogSection.style.visibility = "";
			}
		};

		const syncBlogPinnedState = () => {
			if (!blogPin || !pinMq.matches) {
				blogSection.classList.remove("is-pinned");
				return;
			}
			const stickyTop =
				parseFloat(getComputedStyle(blogSection).getPropertyValue("--ee-blog-sticky-top")) || 0;
			const rect = blogSection.getBoundingClientRect();
			const pinRect = blogPin.getBoundingClientRect();
			const pinned =
				rect.top <= stickyTop + 1.5 &&
				pinRect.bottom > stickyTop + Math.min(rect.height, window.innerHeight - stickyTop) + 4;
			blogSection.classList.toggle("is-pinned", pinned);
		};
		const update = () => {
			const total = cards.length;
			const max = Math.max(total - 1, 0);
			index = Math.min(Math.max(index, 0), max);

			if (track && cards[0]) {
				const gap = parseFloat(getComputedStyle(track).gap) || 40;
				const cardWidth = cards[0].offsetWidth || 584;

				if (isBlogMobile() && viewport) {
					const viewportWidth = viewport.offsetWidth || 0;
					const offset = index * (cardWidth + gap) - (viewportWidth - cardWidth) / 2;
					track.style.transform = `translateX(${-offset}px)`;
				} else if (isBlogSwipe() && viewport) {
					track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
				} else {
					const visibleCount =
						window.innerWidth <= 767 ? 1 : window.innerWidth < 1200 ? 2 : 3;
					const start = Math.max(
						0,
						Math.min(index - Math.floor(visibleCount / 2), cards.length - visibleCount)
					);
					track.style.transform = `translateX(-${Math.max(start, 0) * (cardWidth + gap)}px)`;
				}
			}

			cards.forEach((card, i) => {
				card.classList.toggle("is-active", i === index);
			});

			if (currentEl) {
				currentEl.textContent = String(total ? index + 1 : 0);
			}
			if (totalEl) {
				totalEl.textContent = String(total);
			}
			if (progress) {
				const steps = Math.max(total, 1);
				const width = 100 / steps;
				progress.style.width = `${width}%`;
				progress.style.left = `${index * width}%`;
			}
		};

		const go = (delta) => {
			if (!cards.length) {
				return;
			}
			index = (index + delta + cards.length) % cards.length;
			update();
		};

		prevBtn?.addEventListener("click", () => go(-1));
		nextBtn?.addEventListener("click", () => go(1));

		/* Touch / pointer swipe — Figma mobile 1023:3201 */
		if (viewport && track) {
			let pointerId = null;
			let startX = 0;
			let startY = 0;
			let deltaX = 0;
			let axis = null;
			let swiping = false;
			let baseOffset = 0;

			const getBaseOffset = () => {
				if (!cards[0]) {
					return 0;
				}
				const gap = parseFloat(getComputedStyle(track).gap) || 40;
				const cardWidth = cards[0].offsetWidth || 584;
				if (isBlogMobile()) {
					const viewportWidth = viewport.offsetWidth || 0;
					return index * (cardWidth + gap) - (viewportWidth - cardWidth) / 2;
				}
				return index * (cardWidth + gap);
			};

			const onDown = (e) => {
				if (!isBlogSwipe()) {
					return;
				}
				if (e.pointerType === "mouse" && e.button !== 0) {
					return;
				}
				pointerId = e.pointerId;
				startX = e.clientX;
				startY = e.clientY;
				deltaX = 0;
				axis = null;
				swiping = false;
				baseOffset = getBaseOffset();
				try {
					viewport.setPointerCapture(e.pointerId);
				} catch (err) {
					/* ignore */
				}
			};

			const onMove = (e) => {
				if (pointerId !== e.pointerId || !isBlogSwipe()) {
					return;
				}
				const dx = e.clientX - startX;
				const dy = e.clientY - startY;

				if (!axis) {
					if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
						return;
					}
					axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
				}

				if (axis !== "x") {
					return;
				}

				swiping = true;
				deltaX = dx;
				track.style.transition = "none";
				track.style.transform = `translateX(${-(baseOffset - deltaX)}px)`;
				e.preventDefault();
			};

			const onUp = (e) => {
				if (pointerId !== e.pointerId) {
					return;
				}
				pointerId = null;
				track.style.transition = "";

				if (swiping && Math.abs(deltaX) > 48) {
					go(deltaX < 0 ? 1 : -1);
				} else {
					update();
				}

				if (swiping) {
					const suppressClick = (ev) => {
						ev.preventDefault();
						ev.stopPropagation();
						viewport.removeEventListener("click", suppressClick, true);
					};
					viewport.addEventListener("click", suppressClick, true);
					window.setTimeout(() => {
						viewport.removeEventListener("click", suppressClick, true);
					}, 400);
				}

				swiping = false;
				deltaX = 0;
				axis = null;
			};

			viewport.addEventListener("pointerdown", onDown);
			viewport.addEventListener("pointermove", onMove, { passive: false });
			viewport.addEventListener("pointerup", onUp);
			viewport.addEventListener("pointercancel", onUp);
		}

		window.addEventListener("resize", () => {
			update();
			syncBlogPin();
			syncBlogPinnedState();
		}, { passive: true });
		update();

		if (lenis) {
			lenis.on("scroll", syncBlogPinnedState);
		} else {
			window.addEventListener("scroll", syncBlogPinnedState, { passive: true });
		}
		if (typeof pinMq.addEventListener === "function") {
			pinMq.addEventListener("change", () => {
				blogMobilePinInitialized = false;
				syncBlogPin();
				syncBlogPinnedState();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
				blogMobilePinInitialized = false;
				syncBlogPin();
				syncBlogPinnedState();
			});
		}
		window.requestAnimationFrame(() => {
			syncBlogPin();
			syncBlogPinnedState();
		});
		window.addEventListener("load", () => {
			syncBlogPin();
			syncBlogPinnedState();
		});
		window.addEventListener("excel-ent:header-state-change", () => {
			syncBlogPin();
			syncBlogPinnedState();
		});
		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				update();
				syncBlogPin();
				syncBlogPinnedState();
			});
		}
	}

	/* ---------- Venues accordion + sticky pin ---------- */
	const venuesSection = document.querySelector("[data-venues-section]");
	if (venuesSection) {
		const venuesPin = document.querySelector("[data-venues-pin]");
		const panels = Array.from(venuesSection.querySelectorAll("[data-venue-panel]"));
		const pinMq = window.matchMedia("(min-width: 320px)");
		const venuesFillMq = window.matchMedia("(min-width: 768px)");
		let venuesMobilePinInitialized = false;
		let venuesWasPinned = false;
		let lastVenuesFillStickyTop = -1;
		let venuesPinSyncQueued = false;

		const isVenuesMobile = () => window.innerWidth <= 767;

		const isVenuesFrontDesktop = () =>
			venuesFillMq.matches &&
			(document.body.classList.contains("home") ||
				document.body.classList.contains("front-page"));

		const getVenuesCompactStickyTop = () => {
			const headerEl = document.querySelector(".site-header");
			if (!headerEl) {
				return 0;
			}
			if (headerEl.classList.contains("is-scrolled")) {
				return Math.ceil(headerEl.getBoundingClientRect().height);
			}
			const bar = headerEl.querySelector(".site-header__bar");
			const inner = headerEl.querySelector(".site-header__inner");
			const padY = inner
				? (parseFloat(getComputedStyle(inner).paddingTop) || 0) +
				  (parseFloat(getComputedStyle(inner).paddingBottom) || 0)
				: 0;
			return Math.max(Math.ceil((bar?.getBoundingClientRect().height || 0) + padY), 1);
		};

		const getVenuesFillStickyTop = () => {
			if (isVenuesFrontDesktop()) {
				return getVenuesCompactStickyTop();
			}
			return parseFloat(getComputedStyle(venuesSection).getPropertyValue("--ee-venues-sticky-top")) || 0;
		};

		const clearVenuesViewportFit = () => {
			venuesSection.classList.remove("is-viewport-fitted", "is-viewport-filled");
			venuesSection.style.removeProperty("height");
			venuesSection.style.removeProperty("visibility");
			venuesSection.style.removeProperty("--ee-venues-viewport-height");
			venuesSection.style.removeProperty("--ee-venues-fit-scale");
			venuesSection.style.removeProperty("--ee-venues-fit-pad-top");
			venuesSection.style.removeProperty("--ee-venues-fit-pad-bottom");
		};

		const syncVenuesPin = () => {
			if (!venuesPin) {
				return;
			}
			if (!pinMq.matches) {
				venuesMobilePinInitialized = false;
				venuesPin.style.height = "";
				venuesSection.classList.remove("is-pinned");
				clearVenuesViewportFit();
				return;
			}
			if (!isVenuesMobile()) {
				venuesMobilePinInitialized = false;
			}
			if (isVenuesMobile() && venuesMobilePinInitialized) {
				return;
			}
			venuesPin.style.height = "auto";
			clearVenuesViewportFit();
			void venuesSection.offsetHeight;
			const pad = venuesPin.querySelector(".venues-section__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const inner = venuesSection.querySelector(".venues-section__inner");
			const styles = getComputedStyle(venuesSection);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;
			const innerH = inner
				? Math.ceil(inner.getBoundingClientRect().height)
				: Math.ceil(venuesSection.scrollHeight);
			const sectionH = innerH + padTop + padBottom;
			const stickyTop = getVenuesFillStickyTop();
			const viewportH = window.visualViewport?.height ?? window.innerHeight;
			const availableH = Math.max(viewportH - stickyTop, 0);
			const fitScale = Math.min(1, availableH / Math.max(sectionH, 1));
			let displayH = sectionH * fitScale;

			if (availableH > 0 && fitScale < 0.999) {
				venuesSection.style.setProperty("--ee-venues-viewport-height", `${availableH}px`);
				venuesSection.style.setProperty("--ee-venues-fit-scale", String(fitScale));
				venuesSection.style.setProperty("--ee-venues-fit-pad-top", `${padTop * fitScale}px`);
				venuesSection.style.setProperty("--ee-venues-fit-pad-bottom", `${padBottom * fitScale}px`);
				venuesSection.classList.add("is-viewport-fitted");
				displayH = availableH;
			} else if (venuesFillMq.matches && availableH > sectionH + 1) {
				venuesSection.style.setProperty("--ee-venues-viewport-height", `${availableH}px`);
				venuesSection.style.setProperty("--ee-venues-fit-scale", "1");
				venuesSection.style.setProperty("--ee-venues-fit-pad-top", `${padTop}px`);
				venuesSection.style.setProperty("--ee-venues-fit-pad-bottom", `${padBottom}px`);
				venuesSection.classList.add("is-viewport-fitted", "is-viewport-filled");
				displayH = availableH;
			}

			const holdPx = Math.round(viewportH * 1);
			venuesPin.style.height = `${padH + displayH + holdPx}px`;
			if (isVenuesMobile()) {
				venuesMobilePinInitialized = true;
			}
			lastVenuesFillStickyTop = stickyTop;
		};

		const scheduleVenuesPinSync = () => {
			if (venuesPinSyncQueued) {
				return;
			}
			venuesPinSyncQueued = true;
			window.requestAnimationFrame(() => {
				window.requestAnimationFrame(() => {
					venuesPinSyncQueued = false;
					syncVenuesPin();
					syncVenuesPinnedState();
					venuesWasPinned = venuesSection.classList.contains("is-pinned");
				});
			});
		};

		const syncVenuesPinnedState = () => {
			if (!venuesPin || !pinMq.matches) {
				venuesSection.classList.remove("is-pinned");
				return false;
			}
			const stickyTop =
				parseFloat(getComputedStyle(venuesSection).getPropertyValue("--ee-venues-sticky-top")) || 0;
			const rect = venuesSection.getBoundingClientRect();
			const pinRect = venuesPin.getBoundingClientRect();
			const pinned =
				rect.top <= stickyTop + 1.5 &&
				pinRect.bottom > stickyTop + Math.min(rect.height, window.innerHeight - stickyTop) + 4;
			venuesSection.classList.toggle("is-pinned", pinned);
			return pinned;
		};

		const onVenuesScroll = () => {
			const pinned = syncVenuesPinnedState();
			if (!venuesFillMq.matches) {
				return;
			}
			const fillStickyTop = getVenuesFillStickyTop();
			const stickyChanged = Math.abs(fillStickyTop - lastVenuesFillStickyTop) > 1;
			const pinnedChanged = pinned !== venuesWasPinned;
			if (stickyChanged || pinnedChanged) {
				venuesWasPinned = pinned;
				scheduleVenuesPinSync();
			}
		};

		const setActive = (panel) => {
			panels.forEach((item) => {
				const on = item === panel;
				const trigger = item.querySelector("[data-venue-trigger]");
				const body = item.querySelector(".venue-panel__body");

				item.classList.toggle("is-active", on);
				trigger?.setAttribute("aria-expanded", on ? "true" : "false");

				if (body) {
					body.hidden = !on;
				}
			});

			/*
			 * Mobile panels have fixed expanded/collapsed heights, so changing
			 * the active item does not change the pin geometry. Re-fitting here
			 * temporarily removes the scaled state and makes the section jump.
			 * Keep the existing fit until a real geometry change (resize or
			 * header update) occurs.
			 */
			syncVenuesPinnedState();
		};

		panels.forEach((panel) => {
			const trigger = panel.querySelector("[data-venue-trigger]");
			trigger?.addEventListener("click", () => {
				if (!panel.classList.contains("is-active")) {
					setActive(panel);
				}
			});
		});

		if (lenis) {
			lenis.on("scroll", onVenuesScroll);
		} else {
			window.addEventListener("scroll", onVenuesScroll, { passive: true });
		}
		if (typeof IntersectionObserver === "function" && venuesPin) {
			let venuesPinInView = false;
			const venuesPinObserver = new IntersectionObserver(
				(entries) => {
					const inView = entries.some((entry) => entry.isIntersecting);
					if (inView && !venuesPinInView) {
						if (isVenuesMobile() && venuesMobilePinInitialized) {
							syncVenuesPinnedState();
						} else {
							scheduleVenuesPinSync();
						}
					}
					venuesPinInView = inView;
				},
				{ threshold: [0, 0.12] }
			);
			venuesPinObserver.observe(venuesPin);
		}
		let venuesMobileLastWidth = window.innerWidth;
		window.addEventListener("resize", () => {
			const w = window.innerWidth;
			if (isVenuesMobile() && venuesMobilePinInitialized && w === venuesMobileLastWidth) {
				syncVenuesPinnedState();
				return;
			}
			venuesMobileLastWidth = w;
			venuesMobilePinInitialized = false;
			scheduleVenuesPinSync();
		});
		if (typeof pinMq.addEventListener === "function") {
			pinMq.addEventListener("change", () => {
				venuesMobilePinInitialized = false;
				scheduleVenuesPinSync();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
				venuesMobilePinInitialized = false;
				scheduleVenuesPinSync();
			});
		}
		if (typeof venuesFillMq.addEventListener === "function") {
			venuesFillMq.addEventListener("change", scheduleVenuesPinSync);
		} else if (typeof venuesFillMq.addListener === "function") {
			venuesFillMq.addListener(scheduleVenuesPinSync);
		}
		scheduleVenuesPinSync();
		window.addEventListener("load", () => {
			if (isVenuesMobile() && venuesMobilePinInitialized) return;
			scheduleVenuesPinSync();
		});
		window.addEventListener("excel-ent:header-state-change", () => {
			if (isVenuesMobile() && venuesMobilePinInitialized) {
				syncVenuesPinnedState();
				return;
			}
			scheduleVenuesPinSync();
		});
		document.addEventListener("excel-ent:ready", () => {
			if (isVenuesMobile() && venuesMobilePinInitialized) return;
			scheduleVenuesPinSync();
		});
		if (window.visualViewport) {
			window.visualViewport.addEventListener("resize", () => {
				if (isVenuesMobile() && venuesMobilePinInitialized) {
					syncVenuesPinnedState();
					return;
				}
				scheduleVenuesPinSync();
			});
		}
		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				if (isVenuesMobile() && venuesMobilePinInitialized) return;
				scheduleVenuesPinSync();
			});
		}
		window.setTimeout(() => {
			if (isVenuesMobile() && venuesMobilePinInitialized) return;
			scheduleVenuesPinSync();
		}, 250);
	}

	/* ---------- About value sticky pin ---------- */
	const aboutValue = document.querySelector("[data-about-value]");
	if (aboutValue) {
		const aboutValuePin = document.querySelector("[data-about-value-pin]");
		const aboutValueUnit = document.querySelector("[data-about-value-unit]");
		const aboutValuePinMobileMq = window.matchMedia("(max-width: 767px)");
		const aboutValuePinDesktopMq = window.matchMedia("(min-width: 768px)");
		const aboutValueFitDesktopMq = window.matchMedia("(min-width: 1200px)");
		let aboutValueMobileFitLocked = false;
		let aboutValueMobileFitSnapshot = null;
		let aboutValueMobileFitWidth = window.innerWidth;
		let aboutValueMobilePinReady = false;
		let aboutValueResizeTimer = 0;

		const resetAboutValueMobilePin = () => {
			aboutValueMobileFitLocked = false;
			aboutValueMobileFitSnapshot = null;
			aboutValueMobileFitWidth = window.innerWidth;
		};

		const getAboutValueFitEl = () =>
			aboutValuePinMobileMq.matches && aboutValueUnit ? aboutValueUnit : aboutValue;

		const clearAboutValueViewportFit = () => {
			[aboutValue, aboutValueUnit].filter(Boolean).forEach((el) => {
				el.classList.remove("is-viewport-fitted", "is-mobile-fill", "is-pinned");
				el.style.removeProperty("height");
				el.style.removeProperty("--ee-about-value-available-height");
				el.style.removeProperty("--ee-about-value-viewport-height");
				el.style.removeProperty("--ee-about-value-fit-scale");
				el.style.removeProperty("--ee-about-value-fit-pad-top");
				el.style.removeProperty("--ee-about-value-fit-pad-bottom");
				el.style.removeProperty("--ee-about-value-content-height");
			});
		};

		const getAboutValueStickyTop = () => {
			const stickyEl = aboutValueUnit || aboutValue;
			const fromVar =
				parseFloat(
					getComputedStyle(stickyEl).getPropertyValue(
						"--ee-about-value-sticky-top"
					)
				) || 0;
			if (fromVar > 0) {
				return fromVar;
			}
			const headerEl = document.querySelector(".site-header");
			return headerEl ? Math.ceil(headerEl.getBoundingClientRect().height) : 0;
		};

		const getAboutValueAvailableHeight = () =>
			getAboutMobileAvailableHeight(getAboutValueStickyTop());

		const applyAboutValueViewportFit = (snapshot) => {
			if (!snapshot) {
				return;
			}

			const fitEl = getAboutValueFitEl();
			if (
				aboutValueMobileFitLocked &&
				aboutValueMobileFitSnapshot === snapshot &&
				((snapshot.useFit && fitEl.classList.contains("is-viewport-fitted")) ||
					(snapshot.useFill && fitEl.classList.contains("is-mobile-fill")) ||
					(!snapshot.useFit &&
						!snapshot.useFill &&
						!fitEl.classList.contains("is-viewport-fitted") &&
						!fitEl.classList.contains("is-mobile-fill")))
			) {
				syncAboutValuePinnedState();
				return;
			}

			clearAboutValueViewportFit();

			fitEl.style.setProperty(
				"--ee-about-value-fit-scale",
				String(snapshot.fitScale || 1)
			);

			if (snapshot.useFill || snapshot.useFit) {
				fitEl.style.setProperty(
					"--ee-about-value-available-height",
					`${snapshot.availableHeight}px`
				);
			}

			if (snapshot.useFit) {
				fitEl.style.setProperty(
					"--ee-about-value-viewport-height",
					`${snapshot.availableHeight}px`
				);
				fitEl.style.setProperty(
					"--ee-about-value-fit-pad-top",
					`${snapshot.padTop * snapshot.fitScale}px`
				);
				fitEl.style.setProperty(
					"--ee-about-value-fit-pad-bottom",
					`${snapshot.padBottom * snapshot.fitScale}px`
				);
				fitEl.classList.add("is-viewport-fitted");
			} else if (snapshot.useFill) {
				fitEl.classList.add("is-mobile-fill");
			}

			if (aboutValuePin && snapshot.pinHeight) {
				aboutValuePin.style.height = `${snapshot.pinHeight}px`;
			}

			syncAboutValuePinnedState();
		};

		const syncAboutValueDesktopPin = () => {
			if (!aboutValuePin || !aboutValuePinDesktopMq.matches) {
				return;
			}

			aboutValuePin.style.height = "auto";
			clearAboutValueViewportFit();

			const pad = aboutValuePin.querySelector(".about-value__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(aboutValue.getBoundingClientRect().height);
			const stickyTop = getAboutValueStickyTop();
			const availableH = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = aboutValueFitDesktopMq.matches
				? Math.min(1, availableH / Math.max(sectionH, 1))
				: 1;

			if (fitScale < 1) {
				const styles = getComputedStyle(aboutValue);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				const contentHeight = Math.max(sectionH - padTop - padBottom, 0);

				applyAboutValueViewportFit({
					availableHeight: availableH,
					fitScale,
					padTop,
					padBottom,
					contentHeight,
					useFit: true,
					displaySectionHeight: Math.ceil(sectionH * fitScale),
					pinHeight: padH + Math.ceil(sectionH * fitScale) + Math.round(window.innerHeight),
				});
				return;
			}

			const holdPx = Math.round(window.innerHeight * 1);
			aboutValuePin.style.height = `${padH + sectionH + holdPx}px`;
		};

		const getAboutValueMobileHoldHeight = (viewportHeight) =>
			Math.round(viewportHeight);

		const syncAboutValueMobilePin = () => {
			if (!aboutValuePin || !aboutValuePinMobileMq.matches) {
				return;
			}

			const viewportWidth = window.innerWidth;
			if (
				aboutValueMobileFitLocked &&
				Math.abs(viewportWidth - aboutValueMobileFitWidth) > 80
			) {
				resetAboutValueMobilePin();
			}

			if (aboutValueMobileFitLocked && aboutValueMobileFitSnapshot) {
				applyAboutValueViewportFit(aboutValueMobileFitSnapshot);
				return;
			}

			aboutValuePin.style.height = "auto";
			clearAboutValueViewportFit();

			const pad = aboutValuePin.querySelector(".about-value__scroll-pad");
			const padHeight = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const fitTarget = aboutValueUnit || aboutValue;
			const measure = measureAboutMobileStickyUnit(
				fitTarget,
				getAboutValueAvailableHeight
			);
			const holdHeight = getAboutValueMobileHoldHeight(getAboutMobileViewportHeight());
			const snapshot = buildAboutMobilePinSnapshot(measure, padHeight, holdHeight);

			applyAboutValueViewportFit(snapshot);

			if (!aboutValueMobileFitLocked && aboutMobilePinLayoutReady) {
				aboutValueMobileFitLocked = true;
				aboutValueMobileFitSnapshot = snapshot;
				aboutValueMobileFitWidth = viewportWidth;
			}
		};

		const syncAboutValuePin = () => {
			if (aboutValuePinMobileMq.matches) {
				syncAboutValueMobilePin();
				return;
			}

			resetAboutValueMobilePin();
			syncAboutValueDesktopPin();
		};

		const syncAboutValuePinnedState = () => {
			const stickyEl =
				aboutValuePinMobileMq.matches && aboutValueUnit
					? aboutValueUnit
					: aboutValue;
			const pinActive =
				aboutValuePinMobileMq.matches || aboutValuePinDesktopMq.matches;

			if (!aboutValuePin || !pinActive) {
				stickyEl.classList.remove("is-pinned");
				return;
			}

			const stickyTop = getAboutValueStickyTop();
			const viewportHeight = getAboutMobileViewportHeight();
			const sectionRect = stickyEl.getBoundingClientRect();
			const pinRect = aboutValuePin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, viewportHeight - stickyTop) + 4;
			stickyEl.classList.toggle("is-pinned", pinned);
		};

		const refreshAboutValuePin = () => {
			window.requestAnimationFrame(() => {
				syncAboutValuePin();
				syncAboutValuePinnedState();
			});
		};

		const refreshAboutValuePinLayout = () => {
			if (aboutValuePinMobileMq.matches) {
				resetAboutValueMobilePin();
			}
			refreshAboutValuePin();
		};

		if (lenis) {
			lenis.on("scroll", () => scheduleAboutMobilePinnedState(syncAboutValuePinnedState));
		} else {
			window.addEventListener(
				"scroll",
				() => scheduleAboutMobilePinnedState(syncAboutValuePinnedState),
				{ passive: true }
			);
		}

		let aboutValueLastResizeWidth = window.innerWidth;
		window.addEventListener("resize", () => {
			const w = window.innerWidth;
			if (aboutValuePinMobileMq.matches && aboutValueMobileFitLocked && w === aboutValueLastResizeWidth) {
				syncAboutValuePinnedState();
				return;
			}
			aboutValueLastResizeWidth = w;
			window.clearTimeout(aboutValueResizeTimer);
			aboutValueResizeTimer = window.setTimeout(() => {
				if (aboutValuePinMobileMq.matches) {
					if (
						aboutValueMobileFitLocked &&
						Math.abs(window.innerWidth - aboutValueMobileFitWidth) > 80
					) {
						refreshAboutValuePinLayout();
						return;
					}
					if (!aboutValueMobileFitLocked) {
						refreshAboutValuePin();
					} else {
						syncAboutValuePinnedState();
					}
					return;
				}
				refreshAboutValuePinLayout();
			}, 150);
		}, { passive: true });

		window.addEventListener("load", () => {
			aboutValueMobilePinReady = true;
			if (aboutValuePinMobileMq.matches && aboutValueMobileFitLocked) return;
			const fitTarget = aboutValueUnit || aboutValue;
			const naturalHeight = Math.ceil(fitTarget.scrollHeight);
			const snapNatural = aboutValueMobileFitSnapshot?.naturalSectionHeight;
			if (
				!aboutValueMobileFitLocked ||
				(snapNatural && Math.abs(naturalHeight - snapNatural) > 32)
			) {
				resetAboutValueMobilePin();
				refreshAboutValuePinLayout();
			}
		});

		window.addEventListener("orientationchange", () => {
			resetAboutValueMobilePin();
			aboutValueMobileFitWidth = window.innerWidth;
			window.setTimeout(refreshAboutValuePinLayout, 150);
		});

		window.addEventListener("excel-ent:header-state-change", () => {
			if (aboutValuePinMobileMq.matches && aboutValueMobileFitLocked) {
				return;
			}
			if (aboutValuePinMobileMq.matches) {
				refreshAboutValuePin();
				return;
			}
			refreshAboutValuePinLayout();
		});

		bindAboutMobilePinViewportGuard(
			aboutValuePinMobileMq,
			resetAboutValueMobilePin,
			refreshAboutValuePinLayout
		);

		if (typeof aboutValuePinDesktopMq.addEventListener === "function") {
			aboutValuePinDesktopMq.addEventListener("change", refreshAboutValuePinLayout);
			aboutValuePinMobileMq.addEventListener("change", refreshAboutValuePinLayout);
			aboutValueFitDesktopMq.addEventListener("change", refreshAboutValuePinLayout);
		} else if (typeof aboutValuePinDesktopMq.addListener === "function") {
			aboutValuePinDesktopMq.addListener(refreshAboutValuePinLayout);
			aboutValuePinMobileMq.addListener(refreshAboutValuePinLayout);
			aboutValueFitDesktopMq.addListener(refreshAboutValuePinLayout);
		}

		window.requestAnimationFrame(refreshAboutValuePin);
		aboutValuePin?.querySelectorAll("img").forEach((img) => {
			img.addEventListener("load", () => {
				if (aboutValuePinMobileMq.matches && aboutValueMobileFitLocked) {
					syncAboutValuePinnedState();
					return;
				}
				refreshAboutValuePin();
			});
		});

		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				if (aboutValuePinMobileMq.matches && aboutValueMobileFitLocked) return;
				const fitTarget = aboutValueUnit || aboutValue;
				const naturalHeight = Math.ceil(fitTarget.scrollHeight);
				const snapNatural = aboutValueMobileFitSnapshot?.naturalSectionHeight;
				if (
					!aboutValueMobileFitLocked ||
					(snapNatural && Math.abs(naturalHeight - snapNatural) > 32)
				) {
					refreshAboutValuePinLayout();
				}
			});
		}
	}

	/* ---------- About why sticky pin ---------- */
	const aboutWhy = document.querySelector("[data-about-why]");
	if (aboutWhy) {
		const aboutWhyPin = document.querySelector("[data-about-why-pin]");
		const aboutWhyUnit = document.querySelector("[data-about-why-unit]");
		const aboutWhyPinMobileMq = window.matchMedia("(max-width: 767px)");
		const aboutWhyPinDesktopMq = window.matchMedia("(min-width: 768px)");
		const aboutWhyFitDesktopMq = window.matchMedia("(min-width: 1200px)");
		let aboutWhyMobileFitLocked = false;
		let aboutWhyMobileFitSnapshot = null;
		let aboutWhyMobileFitWidth = window.innerWidth;
		let aboutWhyMobilePinReady = false;
		let aboutWhyResizeTimer = 0;

		const resetAboutWhyMobilePin = () => {
			aboutWhyMobileFitLocked = false;
			aboutWhyMobileFitSnapshot = null;
			aboutWhyMobileFitWidth = window.innerWidth;
		};

		const getAboutWhyFitEl = () =>
			aboutWhyPinMobileMq.matches && aboutWhyUnit ? aboutWhyUnit : aboutWhy;

		const clearAboutWhyViewportFit = () => {
			[aboutWhy, aboutWhyUnit].filter(Boolean).forEach((el) => {
				el.classList.remove("is-viewport-fitted", "is-mobile-fill", "is-pinned");
				el.style.removeProperty("height");
				el.style.removeProperty("--ee-about-why-available-height");
				el.style.removeProperty("--ee-about-why-viewport-height");
				el.style.removeProperty("--ee-about-why-fit-scale");
				el.style.removeProperty("--ee-about-why-fit-pad-top");
				el.style.removeProperty("--ee-about-why-fit-pad-bottom");
				el.style.removeProperty("--ee-about-why-content-height");
			});
		};

		const getAboutWhyStickyTop = () => {
			const stickyEl = aboutWhyUnit || aboutWhy;
			const fromVar =
				parseFloat(
					getComputedStyle(stickyEl).getPropertyValue(
						"--ee-about-why-sticky-top"
					)
				) || 0;
			if (fromVar > 0) {
				return fromVar;
			}
			const headerEl = document.querySelector(".site-header");
			return headerEl ? Math.ceil(headerEl.getBoundingClientRect().height) : 0;
		};

		const getAboutWhyAvailableHeight = () =>
			getAboutMobileAvailableHeight(getAboutWhyStickyTop());

		const applyAboutWhyViewportFit = (snapshot) => {
			if (!snapshot) {
				return;
			}

			const fitEl = getAboutWhyFitEl();
			if (
				aboutWhyMobileFitLocked &&
				aboutWhyMobileFitSnapshot === snapshot &&
				((snapshot.useFit && fitEl.classList.contains("is-viewport-fitted")) ||
					(snapshot.useFill && fitEl.classList.contains("is-mobile-fill")) ||
					(!snapshot.useFit &&
						!snapshot.useFill &&
						!fitEl.classList.contains("is-viewport-fitted") &&
						!fitEl.classList.contains("is-mobile-fill")))
			) {
				syncAboutWhyPinnedState();
				return;
			}

			clearAboutWhyViewportFit();

			fitEl.style.setProperty(
				"--ee-about-why-fit-scale",
				String(snapshot.fitScale || 1)
			);

			if (snapshot.useFill || snapshot.useFit) {
				fitEl.style.setProperty(
					"--ee-about-why-available-height",
					`${snapshot.availableHeight}px`
				);
			}

			if (snapshot.useFit) {
				fitEl.style.setProperty(
					"--ee-about-why-viewport-height",
					`${snapshot.availableHeight}px`
				);
				fitEl.classList.add("is-viewport-fitted");
			} else if (snapshot.useFill) {
				fitEl.classList.add("is-mobile-fill");
			}

			if (aboutWhyPin && snapshot.pinHeight) {
				aboutWhyPin.style.height = `${snapshot.pinHeight}px`;
			}

			syncAboutWhyPinnedState();
		};

		const getAboutWhyMobileHoldHeight = (viewportHeight) =>
			Math.round(viewportHeight);

		const syncAboutWhyDesktopPin = () => {
			if (!aboutWhyPin || !aboutWhyPinDesktopMq.matches) {
				return;
			}

			aboutWhyPin.style.height = "auto";
			clearAboutWhyViewportFit();

			const pad = aboutWhyPin.querySelector(".about-why__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(aboutWhy.getBoundingClientRect().height);
			const stickyTop = getAboutWhyStickyTop();
			const availableH = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = aboutWhyFitDesktopMq.matches
				? Math.min(1, availableH / Math.max(sectionH, 1))
				: 1;

			if (fitScale < 1) {
				const styles = getComputedStyle(aboutWhy);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				const contentHeight = Math.max(sectionH - padTop - padBottom, 0);

				applyAboutWhyViewportFit({
					availableHeight: availableH,
					fitScale,
					padTop,
					padBottom,
					contentHeight,
					useFit: true,
					displaySectionHeight: Math.ceil(sectionH * fitScale),
					pinHeight: padH + Math.ceil(sectionH * fitScale) + Math.round(window.innerHeight),
				});
				return;
			}

			const holdPx = Math.round(window.innerHeight);
			aboutWhyPin.style.height = `${padH + sectionH + holdPx}px`;
		};

		const syncAboutWhyMobilePin = () => {
			if (!aboutWhyPin || !aboutWhyPinMobileMq.matches) {
				return;
			}

			const viewportWidth = window.innerWidth;
			if (
				aboutWhyMobileFitLocked &&
				Math.abs(viewportWidth - aboutWhyMobileFitWidth) > 80
			) {
				resetAboutWhyMobilePin();
			}

			if (aboutWhyMobileFitLocked && aboutWhyMobileFitSnapshot) {
				applyAboutWhyViewportFit(aboutWhyMobileFitSnapshot);
				return;
			}

			aboutWhyPin.style.height = "auto";
			clearAboutWhyViewportFit();

			const pad = aboutWhyPin.querySelector(".about-why__scroll-pad");
			const padHeight = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const fitTarget = aboutWhyUnit || aboutWhy;
			fitTarget.style.setProperty("--ee-about-why-fit-scale", "1");
			void fitTarget.offsetHeight;

			const measure = measureAboutMobileStickyUnit(
				fitTarget,
				getAboutWhyAvailableHeight
			);
			let snapshot = buildAboutMobilePinSnapshot(measure, padHeight, getAboutWhyMobileHoldHeight(getAboutMobileViewportHeight()));

			applyAboutWhyViewportFit(snapshot);

			/*
			 * Font-size calc() reflows text. If wrapping still overflows after the
			 * first scale pass, refine the scale against the post-reflow height.
			 */
			if (snapshot.useFit) {
				void fitTarget.offsetHeight;
				const innerEl =
					fitTarget.querySelector(".about-why__unit-inner") ||
					fitTarget.querySelector(".about-why__inner") ||
					fitTarget;
				const styles = getComputedStyle(fitTarget);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				const h2 =
					Math.ceil(innerEl.scrollHeight) +
					Math.ceil(padTop) +
					Math.ceil(padBottom);
				if (h2 > snapshot.availableHeight + 2) {
					const refined = Math.max(
						0.55,
						snapshot.fitScale * ((snapshot.availableHeight - 2) / h2)
					);
					snapshot = {
						...snapshot,
						fitScale: refined,
						useFit: true,
						useFill: false,
					};
					aboutWhyMobileFitLocked = false;
					applyAboutWhyViewportFit(snapshot);
				}
			}

			if (!aboutWhyMobileFitLocked && aboutMobilePinLayoutReady) {
				aboutWhyMobileFitLocked = true;
				aboutWhyMobileFitSnapshot = snapshot;
				aboutWhyMobileFitWidth = viewportWidth;
			}
		};

		const syncAboutWhyPin = () => {
			if (aboutWhyPinMobileMq.matches) {
				syncAboutWhyMobilePin();
				return;
			}

			resetAboutWhyMobilePin();
			syncAboutWhyDesktopPin();
		};

		const syncAboutWhyPinnedState = () => {
			const stickyEl =
				aboutWhyPinMobileMq.matches && aboutWhyUnit ? aboutWhyUnit : aboutWhy;
			const pinActive =
				aboutWhyPinMobileMq.matches || aboutWhyPinDesktopMq.matches;

			if (!aboutWhyPin || !pinActive) {
				stickyEl.classList.remove("is-pinned");
				return;
			}

			const stickyTop = getAboutWhyStickyTop();
			const viewportHeight = getAboutMobileViewportHeight();
			const sectionRect = stickyEl.getBoundingClientRect();
			const pinRect = aboutWhyPin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, viewportHeight - stickyTop) + 4;
			stickyEl.classList.toggle("is-pinned", pinned);
		};

		const refreshAboutWhyPin = () => {
			window.requestAnimationFrame(() => {
				syncAboutWhyPin();
				syncAboutWhyPinnedState();
			});
		};

		const refreshAboutWhyPinLayout = () => {
			if (aboutWhyPinMobileMq.matches) {
				resetAboutWhyMobilePin();
			}
			refreshAboutWhyPin();
		};

		if (lenis) {
			lenis.on("scroll", () => scheduleAboutMobilePinnedState(syncAboutWhyPinnedState));
		} else {
			window.addEventListener(
				"scroll",
				() => scheduleAboutMobilePinnedState(syncAboutWhyPinnedState),
				{ passive: true }
			);
		}

		let aboutWhyLastResizeWidth = window.innerWidth;
		window.addEventListener("resize", () => {
			const w = window.innerWidth;
			if (aboutWhyPinMobileMq.matches && aboutWhyMobileFitLocked && w === aboutWhyLastResizeWidth) {
				syncAboutWhyPinnedState();
				return;
			}
			aboutWhyLastResizeWidth = w;
			window.clearTimeout(aboutWhyResizeTimer);
			aboutWhyResizeTimer = window.setTimeout(() => {
				if (aboutWhyPinMobileMq.matches) {
					if (
						aboutWhyMobileFitLocked &&
						Math.abs(window.innerWidth - aboutWhyMobileFitWidth) > 80
					) {
						resetAboutWhyMobilePin();
					}
					if (!aboutWhyMobileFitLocked) {
						syncAboutWhyPin();
					} else {
						syncAboutWhyPinnedState();
					}
					return;
				}
				refreshAboutWhyPinLayout();
			}, 120);
		});

		if (typeof aboutWhyPinMobileMq.addEventListener === "function") {
			aboutWhyPinMobileMq.addEventListener("change", refreshAboutWhyPinLayout);
		} else if (typeof aboutWhyPinMobileMq.addListener === "function") {
			aboutWhyPinMobileMq.addListener(refreshAboutWhyPinLayout);
		}

		if (typeof aboutWhyPinDesktopMq.addEventListener === "function") {
			aboutWhyPinDesktopMq.addEventListener("change", refreshAboutWhyPinLayout);
		} else if (typeof aboutWhyPinDesktopMq.addListener === "function") {
			aboutWhyPinDesktopMq.addListener(refreshAboutWhyPinLayout);
		}

		if (typeof aboutWhyFitDesktopMq.addEventListener === "function") {
			aboutWhyFitDesktopMq.addEventListener("change", refreshAboutWhyPin);
		} else if (typeof aboutWhyFitDesktopMq.addListener === "function") {
			aboutWhyFitDesktopMq.addListener(refreshAboutWhyPin);
		}

		window.addEventListener("load", () => {
			aboutWhyMobilePinReady = true;
			if (aboutWhyPinMobileMq.matches && aboutWhyMobileFitLocked) return;
			const fitTarget = aboutWhyUnit || aboutWhy;
			const naturalHeight = Math.ceil(fitTarget.scrollHeight);
			const snapNatural = aboutWhyMobileFitSnapshot?.naturalSectionHeight;
			if (
				!aboutWhyMobileFitLocked ||
				(snapNatural && Math.abs(naturalHeight - snapNatural) > 32)
			) {
				resetAboutWhyMobilePin();
				refreshAboutWhyPinLayout();
			}
		});

		window.addEventListener("excel-ent:header-state-change", () => {
			if (aboutWhyPinMobileMq.matches && aboutWhyMobileFitLocked) {
				return;
			}
			if (aboutWhyPinMobileMq.matches) {
				resetAboutWhyMobilePin();
			}
			refreshAboutWhyPinLayout();
		});

		bindAboutMobilePinViewportGuard(
			aboutWhyPinMobileMq,
			resetAboutWhyMobilePin,
			refreshAboutWhyPinLayout
		);

		aboutWhy.querySelectorAll("img").forEach((img) => {
			if (img.complete) {
				return;
			}
			img.addEventListener("load", () => {
				if (aboutWhyPinMobileMq.matches && aboutWhyMobileFitLocked) {
					syncAboutWhyPinnedState();
					return;
				}
				refreshAboutWhyPinLayout();
			}, { once: true });
		});

		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				if (aboutWhyPinMobileMq.matches && aboutWhyMobileFitLocked) return;
				const fitTarget = aboutWhyUnit || aboutWhy;
				const naturalHeight = Math.ceil(fitTarget.scrollHeight);
				const snapNatural = aboutWhyMobileFitSnapshot?.naturalSectionHeight;
				if (
					!aboutWhyMobileFitLocked ||
					(snapNatural && Math.abs(naturalHeight - snapNatural) > 32)
				) {
					refreshAboutWhyPinLayout();
				}
			});
		}

		window.setTimeout(() => {
			if (aboutWhyPinMobileMq.matches && aboutWhyMobileFitLocked) return;
			refreshAboutWhyPinLayout();
		}, 250);
	}

	/* ---------- About approach sticky pin ---------- */
	const aboutApproachSticky = document.querySelector("[data-about-approach]");
	if (aboutApproachSticky) {
		const aboutApproachPin = document.querySelector("[data-about-approach-pin]");
		const aboutApproachUnit = document.querySelector("[data-about-approach-unit]");
		const aboutApproachPinMobileMq = window.matchMedia("(max-width: 767px)");
		const aboutApproachPinDesktopMq = window.matchMedia("(min-width: 768px)");
		const aboutApproachFitDesktopMq = window.matchMedia("(min-width: 1200px)");
		let aboutApproachMobileFitLocked = false;
		let aboutApproachMobileFitSnapshot = null;
		let aboutApproachMobileFitWidth = window.innerWidth;
		let aboutApproachMobilePinReady = false;
		let aboutApproachResizeTimer = 0;

		const resetAboutApproachMobilePin = () => {
			aboutApproachMobileFitLocked = false;
			aboutApproachMobileFitSnapshot = null;
			aboutApproachMobileFitWidth = window.innerWidth;
		};

		const getAboutApproachFitEl = () =>
			aboutApproachPinMobileMq.matches && aboutApproachUnit
				? aboutApproachUnit
				: aboutApproachSticky;

		const clearAboutApproachViewportFit = () => {
			[aboutApproachSticky, aboutApproachUnit].filter(Boolean).forEach((el) => {
				el.classList.remove("is-viewport-fitted", "is-viewport-filled", "is-mobile-fill", "is-pinned");
				el.style.removeProperty("height");
				el.style.removeProperty("--ee-about-approach-available-height");
				el.style.removeProperty("--ee-about-approach-viewport-height");
				el.style.removeProperty("--ee-about-approach-fit-scale");
				el.style.removeProperty("--ee-about-approach-fit-pad-top");
				el.style.removeProperty("--ee-about-approach-fit-pad-bottom");
				el.style.removeProperty("--ee-about-approach-content-height");
			});
		};

		const getAboutApproachStickyTop = () => {
			const stickyEl = aboutApproachUnit || aboutApproachSticky;
			const fromVar =
				parseFloat(
					getComputedStyle(stickyEl).getPropertyValue(
						"--ee-about-approach-sticky-top"
					)
				) || 0;
			if (fromVar > 0) {
				return fromVar;
			}
			const headerEl = document.querySelector(".site-header");
			return headerEl ? Math.ceil(headerEl.getBoundingClientRect().height) : 0;
		};

		const getAboutApproachCompactStickyTop = () => {
			const headerEl = document.querySelector(".site-header");
			if (!headerEl) return 0;
			if (headerEl.classList.contains("is-scrolled")) {
				return Math.ceil(headerEl.getBoundingClientRect().height);
			}
			const bar = headerEl.querySelector(".site-header__bar");
			const inner = headerEl.querySelector(".site-header__inner");
			const padY = inner
				? (parseFloat(getComputedStyle(inner).paddingTop) || 0) +
				  (parseFloat(getComputedStyle(inner).paddingBottom) || 0)
				: 0;
			return Math.max(Math.ceil((bar?.getBoundingClientRect().height || 0) + padY), 1);
		};

		const getAboutApproachFillStickyTop = () =>
			aboutApproachPinDesktopMq.matches ? getAboutApproachCompactStickyTop() : getAboutApproachStickyTop();

		const getAboutApproachAvailableHeight = () =>
			getAboutMobileAvailableHeight(getAboutApproachStickyTop());

		const applyAboutApproachViewportFit = (snapshot) => {
			if (!snapshot) {
				return;
			}

			const fitEl = getAboutApproachFitEl();
			if (
				aboutApproachMobileFitLocked &&
				aboutApproachMobileFitSnapshot === snapshot &&
				((snapshot.useFit && fitEl.classList.contains("is-viewport-fitted")) ||
					(snapshot.useFill && fitEl.classList.contains("is-mobile-fill")) ||
					(!snapshot.useFit &&
						!snapshot.useFill &&
						!fitEl.classList.contains("is-viewport-fitted") &&
						!fitEl.classList.contains("is-mobile-fill")))
			) {
				syncAboutApproachPinnedState();
				return;
			}

			clearAboutApproachViewportFit();

			fitEl.style.setProperty(
				"--ee-about-approach-fit-scale",
				String(snapshot.fitScale || 1)
			);

			if (snapshot.useFill || snapshot.useFit) {
				fitEl.style.setProperty(
					"--ee-about-approach-available-height",
					`${snapshot.availableHeight}px`
				);
			}

			if (snapshot.useFit) {
				fitEl.style.setProperty(
					"--ee-about-approach-viewport-height",
					`${snapshot.availableHeight}px`
				);
				fitEl.style.setProperty(
					"--ee-about-approach-fit-pad-top",
					`${snapshot.padTop * snapshot.fitScale}px`
				);
				fitEl.style.setProperty(
					"--ee-about-approach-fit-pad-bottom",
					`${snapshot.padBottom * snapshot.fitScale}px`
				);
				fitEl.classList.add("is-viewport-fitted");
			} else if (snapshot.useFill) {
				fitEl.classList.add("is-mobile-fill");
			}

			if (aboutApproachPin && snapshot.pinHeight) {
				aboutApproachPin.style.height = `${snapshot.pinHeight}px`;
			}

			syncAboutApproachPinnedState();
		};

		const getAboutApproachMobileHoldHeight = (viewportHeight) =>
			Math.round(viewportHeight);

		const forceAboutApproachReveals = () => {
			aboutApproachSticky.querySelectorAll(".reveal:not(.is-visible), [data-reveal]:not(.is-visible)").forEach((el) => {
				el.classList.add("is-visible", "in");
			});
		};

		const syncAboutApproachDesktopPin = () => {
			if (!aboutApproachPin || !aboutApproachPinDesktopMq.matches) {
				return;
			}

			aboutApproachPin.style.height = "auto";
			clearAboutApproachViewportFit();

			const pad = aboutApproachPin.querySelector(".about-approach__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(aboutApproachSticky.getBoundingClientRect().height);
			const stickyTop = getAboutApproachFillStickyTop();
			const availableH = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = aboutApproachFitDesktopMq.matches
				? Math.min(1, availableH / Math.max(sectionH, 1))
				: 1;

			if (fitScale < 1) {
				const styles = getComputedStyle(aboutApproachSticky);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				const contentHeight = Math.max(sectionH - padTop - padBottom, 0);

				applyAboutApproachViewportFit({
					availableHeight: availableH,
					fitScale,
					padTop,
					padBottom,
					contentHeight,
					useFit: true,
					displaySectionHeight: Math.ceil(sectionH * fitScale),
					pinHeight: padH + Math.ceil(sectionH * fitScale) + Math.round(window.innerHeight),
				});
				forceAboutApproachReveals();
				return;
			}

			if (availableH > sectionH) {
				aboutApproachSticky.classList.add("is-viewport-fitted", "is-viewport-filled");
				aboutApproachSticky.style.setProperty(
					"--ee-about-approach-viewport-height",
					`${availableH}px`
				);
				forceAboutApproachReveals();
			}

			const holdPx = Math.round(window.innerHeight);
			aboutApproachPin.style.height = `${padH + sectionH + holdPx}px`;
		};

		const syncAboutApproachMobilePin = () => {
			if (!aboutApproachPin || !aboutApproachPinMobileMq.matches) {
				return;
			}

			const viewportWidth = window.innerWidth;
			if (
				aboutApproachMobileFitLocked &&
				Math.abs(viewportWidth - aboutApproachMobileFitWidth) > 80
			) {
				resetAboutApproachMobilePin();
			}

			if (aboutApproachMobileFitLocked && aboutApproachMobileFitSnapshot) {
				applyAboutApproachViewportFit(aboutApproachMobileFitSnapshot);
				return;
			}

			aboutApproachPin.style.height = "auto";
			clearAboutApproachViewportFit();

			const pad = aboutApproachPin.querySelector(".about-approach__scroll-pad");
			const padHeight = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const fitTarget = aboutApproachUnit || aboutApproachSticky;
			const measure = measureAboutMobileStickyUnit(
				fitTarget,
				getAboutApproachAvailableHeight
			);
			const holdHeight = getAboutApproachMobileHoldHeight(getAboutMobileViewportHeight());
			const snapshot = buildAboutMobilePinSnapshot(measure, padHeight, holdHeight);

			applyAboutApproachViewportFit(snapshot);

			if (!aboutApproachMobileFitLocked && aboutMobilePinLayoutReady) {
				aboutApproachMobileFitLocked = true;
				aboutApproachMobileFitSnapshot = snapshot;
				aboutApproachMobileFitWidth = viewportWidth;
			}
		};

		const syncAboutApproachPin = () => {
			if (aboutApproachPinMobileMq.matches) {
				syncAboutApproachMobilePin();
				return;
			}

			resetAboutApproachMobilePin();
			syncAboutApproachDesktopPin();
		};

		const syncAboutApproachPinnedState = () => {
			const stickyEl =
				aboutApproachPinMobileMq.matches && aboutApproachUnit
					? aboutApproachUnit
					: aboutApproachSticky;
			const pinActive =
				aboutApproachPinMobileMq.matches || aboutApproachPinDesktopMq.matches;

			if (!aboutApproachPin || !pinActive) {
				stickyEl.classList.remove("is-pinned");
				return;
			}

			const stickyTop = getAboutApproachStickyTop();
			const viewportHeight = getAboutMobileViewportHeight();
			const sectionRect = stickyEl.getBoundingClientRect();
			const pinRect = aboutApproachPin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, viewportHeight - stickyTop) + 4;
			stickyEl.classList.toggle("is-pinned", pinned);
			if (pinned) {
				forceAboutApproachReveals();
			}
		};

		const refreshAboutApproachPin = () => {
			window.requestAnimationFrame(() => {
				syncAboutApproachPin();
				syncAboutApproachPinnedState();
			});
		};

		const refreshAboutApproachPinLayout = () => {
			if (aboutApproachPinMobileMq.matches) {
				resetAboutApproachMobilePin();
			}
			refreshAboutApproachPin();
		};

		if (lenis) {
			lenis.on("scroll", () =>
				scheduleAboutMobilePinnedState(syncAboutApproachPinnedState)
			);
		} else {
			window.addEventListener(
				"scroll",
				() => scheduleAboutMobilePinnedState(syncAboutApproachPinnedState),
				{ passive: true }
			);
		}

		let aboutApproachLastResizeWidth = window.innerWidth;
		window.addEventListener("resize", () => {
			const w = window.innerWidth;
			if (aboutApproachPinMobileMq.matches && aboutApproachMobileFitLocked && w === aboutApproachLastResizeWidth) {
				syncAboutApproachPinnedState();
				return;
			}
			aboutApproachLastResizeWidth = w;
			window.clearTimeout(aboutApproachResizeTimer);
			aboutApproachResizeTimer = window.setTimeout(() => {
				if (aboutApproachPinMobileMq.matches) {
					if (
						aboutApproachMobileFitLocked &&
						Math.abs(window.innerWidth - aboutApproachMobileFitWidth) > 80
					) {
						resetAboutApproachMobilePin();
					}
					if (!aboutApproachMobileFitLocked) {
						syncAboutApproachPin();
					} else {
						syncAboutApproachPinnedState();
					}
					return;
				}
				refreshAboutApproachPinLayout();
			}, 120);
		});

		if (typeof aboutApproachPinMobileMq.addEventListener === "function") {
			aboutApproachPinMobileMq.addEventListener("change", refreshAboutApproachPinLayout);
		} else if (typeof aboutApproachPinMobileMq.addListener === "function") {
			aboutApproachPinMobileMq.addListener(refreshAboutApproachPinLayout);
		}

		if (typeof aboutApproachPinDesktopMq.addEventListener === "function") {
			aboutApproachPinDesktopMq.addEventListener("change", refreshAboutApproachPinLayout);
		} else if (typeof aboutApproachPinDesktopMq.addListener === "function") {
			aboutApproachPinDesktopMq.addListener(refreshAboutApproachPinLayout);
		}

		if (typeof aboutApproachFitDesktopMq.addEventListener === "function") {
			aboutApproachFitDesktopMq.addEventListener("change", refreshAboutApproachPin);
		} else if (typeof aboutApproachFitDesktopMq.addListener === "function") {
			aboutApproachFitDesktopMq.addListener(refreshAboutApproachPin);
		}

		window.addEventListener("load", () => {
			aboutApproachMobilePinReady = true;
			if (aboutApproachPinMobileMq.matches && aboutApproachMobileFitLocked) return;
			const fitTarget = aboutApproachUnit || aboutApproachSticky;
			const naturalHeight = Math.ceil(fitTarget.scrollHeight);
			const snapNatural = aboutApproachMobileFitSnapshot?.naturalSectionHeight;
			if (
				!aboutApproachMobileFitLocked ||
				(snapNatural && Math.abs(naturalHeight - snapNatural) > 32)
			) {
				resetAboutApproachMobilePin();
				refreshAboutApproachPinLayout();
			}
		});

		window.addEventListener("excel-ent:header-state-change", () => {
			if (aboutApproachPinMobileMq.matches && aboutApproachMobileFitLocked) {
				return;
			}
			if (aboutApproachPinMobileMq.matches) {
				resetAboutApproachMobilePin();
			}
			refreshAboutApproachPinLayout();
		});

		bindAboutMobilePinViewportGuard(
			aboutApproachPinMobileMq,
			resetAboutApproachMobilePin,
			refreshAboutApproachPinLayout
		);

		if (typeof IntersectionObserver === "function" && aboutApproachPin) {
			const approachPinObserver = new IntersectionObserver(
				(entries) => {
					if (entries.some((e) => e.isIntersecting)) {
						if (aboutApproachPinMobileMq.matches && aboutApproachMobileFitLocked) {
							return;
						}
						refreshAboutApproachPinLayout();
					}
				},
				{ threshold: 0 }
			);
			approachPinObserver.observe(aboutApproachPin);
		}

		aboutApproachSticky.querySelectorAll("img").forEach((img) => {
			if (img.complete) {
				return;
			}
			img.addEventListener("load", () => {
				if (aboutApproachPinMobileMq.matches && aboutApproachMobileFitLocked) {
					syncAboutApproachPinnedState();
					return;
				}
				refreshAboutApproachPinLayout();
			}, { once: true });
		});

		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				if (aboutApproachPinMobileMq.matches && aboutApproachMobileFitLocked) return;
				const fitTarget = aboutApproachUnit || aboutApproachSticky;
				const naturalHeight = Math.ceil(fitTarget.scrollHeight);
				const snapNatural = aboutApproachMobileFitSnapshot?.naturalSectionHeight;
				if (
					!aboutApproachMobileFitLocked ||
					(snapNatural && Math.abs(naturalHeight - snapNatural) > 32)
				) {
					refreshAboutApproachPinLayout();
				}
			});
		}

		window.setTimeout(() => {
			if (aboutApproachPinMobileMq.matches && aboutApproachMobileFitLocked) return;
			refreshAboutApproachPinLayout();
		}, 250);
	}

	/* ---------- Explore Artists filters ---------- */
	const exploreSection = document.querySelector("[data-explore-artists]");
	const exploreSearch = document.querySelector("[data-explore-search]");
	if (exploreSection || exploreSearch) {
		const cats = Array.from(document.querySelectorAll("[data-explore-cat]"));
		const chipsBar = exploreSection?.querySelector("[data-explore-chips-bar]");
		const chipsWrap = exploreSection?.querySelector("[data-explore-chips]");
		const clearBtn = exploreSection?.querySelector("[data-explore-clear]");
		const countBadge = document.querySelector("[data-explore-filter-count]");
		const chipCloseSrc = exploreSearch?.getAttribute("data-chip-close") || "";
		const filterWraps = Array.from(document.querySelectorAll("[data-explore-filter]"));
		const allBtn = exploreSearch?.querySelector('[data-explore-cat="all"]');
		const weddingBtn = exploreSearch?.querySelector('[data-explore-cat="wedding"]');
		const viewAllBtn = exploreSearch?.querySelector('[data-explore-cat="view-all"]');
		const filterBackdrop = exploreSearch?.querySelector("[data-explore-filter-backdrop]")
			|| document.querySelector("[data-explore-filter-backdrop]");
		const resultsLabelEl = exploreSection?.querySelector("[data-explore-results-label]");
		const scopedGroups = new Set();
		const SCOPE_CHIP_VALUE = "__category__";
		const exploreCategoryLabels = {
			"artist-type": "Artist Type",
			tribute: "Tribute Acts",
			"artists-tributes": "Artists & Tributes",
			era: "Era / Decade",
			event: "Event Type",
			genre: "Music Genre",
		};

		const syncExploreResultsLabel = () => {
			if (!resultsLabelEl) return;
			const defaultLabel = resultsLabelEl.getAttribute("data-default-label") || "All";
			const scoped = Array.from(scopedGroups);
			if (scoped.length === 1) {
				resultsLabelEl.textContent = exploreCategoryLabels[scoped[0]] || scoped[0];
				return;
			}
			if (scoped.length > 1) {
				if (scoped.includes("artist-type") && scoped.includes("tribute")) {
					resultsLabelEl.textContent = exploreCategoryLabels["artists-tributes"];
					return;
				}
				resultsLabelEl.textContent = scoped
					.map((group) => exploreCategoryLabels[group] || group)
					.join(" & ");
				return;
			}
			resultsLabelEl.textContent = defaultLabel;
		};

		const clearExploreCategoryScope = () => {
			scopedGroups.forEach((group) => {
				chipsWrap?.querySelectorAll(
					`[data-explore-chip][data-chip-group="${group}"][data-chip-value="${SCOPE_CHIP_VALUE}"]`
				).forEach((chip) => chip.remove());
			});
			scopedGroups.clear();
			filterWraps.forEach((wrap) => {
				wrap.classList.remove("is-category-scoped");
			});
			syncExploreResultsLabel();
			syncChipBar();
		};

		const upsertScopeChip = (group) => {
			const label = exploreCategoryLabels[group] || group;
			upsertChip(group, SCOPE_CHIP_VALUE, label, true);
		};

		const activateExploreCategoryScope = (group) => {
			if (!group || group === "sort") return;
			const wrap = exploreSearch?.querySelector(`[data-explore-filter="${group}"]`);
			const trigger = wrap?.querySelector("[data-explore-filter-trigger]");
			if (!wrap || !trigger) return;
			scopedGroups.add(group);
			wrap.classList.add("is-category-scoped");
			upsertScopeChip(group);
			syncExploreResultsLabel();
			syncAllActive();
		};

		const isExploreMobile = () => window.matchMedia("(max-width: 767px)").matches;
		const isExploreTablet = () => window.matchMedia("(min-width: 768px) and (max-width: 1199px)").matches;
		const isExploreCompact = () => isExploreMobile() || isExploreTablet();

		const getFilterPanel = (wrap) => {
			const group = wrap?.getAttribute?.("data-explore-filter");
			if (!group) return wrap?.querySelector?.("[data-explore-filter-panel]") || null;
			return document.getElementById(`explore-filter-${group}`)
				|| wrap.querySelector("[data-explore-filter-panel]");
		};

		const clearFilterPanelPosition = (panel) => {
			if (!panel) return;
			panel.style.removeProperty("position");
			panel.style.removeProperty("top");
			panel.style.removeProperty("left");
			panel.style.removeProperty("right");
			panel.style.removeProperty("bottom");
			panel.style.removeProperty("inset");
			panel.style.removeProperty("margin");
			panel.style.removeProperty("transform");
			panel.style.removeProperty("max-height");
			panel.style.removeProperty("z-index");
			panel.classList.remove("is-tablet-float", "is-filter-float");
		};

		const fitExploreFilterPanel = (panel, trigger, wrap) => {
			if (!panel || !trigger || isExploreMobile()) {
				return;
			}
			const rect = trigger.getBoundingClientRect();
			if (rect.width < 1 && rect.height < 1) {
				return;
			}
			const margin = 16;
			const available = Math.max(240, Math.floor(window.innerHeight - rect.bottom - margin));
			const group = wrap?.getAttribute("data-explore-filter");
			panel.classList.add("is-filter-float");
			panel.classList.toggle("is-tablet-float", isExploreTablet());
			panel.style.position = "fixed";
			panel.style.margin = "0";
			panel.style.transform = "none";
			panel.style.zIndex = "8000";
			panel.style.top = `${rect.bottom + 12}px`;
			panel.style.maxHeight = `${available}px`;
			panel.style.bottom = "auto";
			const width = panel.offsetWidth || (group === "sort" ? 317 : 608);
			const alignEnd = group === "sort" || group === "event" || group === "genre";
			let left = alignEnd ? rect.right - width : rect.left;
			left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
			panel.style.left = `${left}px`;
			panel.style.right = "auto";
		};

		const positionTabletFilter = (panel, trigger, wrap) => {
			if (isExploreMobile()) {
				clearFilterPanelPosition(panel);
				return;
			}
			fitExploreFilterPanel(panel, trigger, wrap);
		};

		const dockFilterPanel = (panel, wrap, open) => {
			if (!panel || !wrap) return;
			if (open) {
				document.body.appendChild(panel);
				if (isExploreMobile()) {
					clearFilterPanelPosition(panel);
				}
				return;
			}
			clearFilterPanelPosition(panel);
			if (panel.parentElement !== wrap) {
				wrap.appendChild(panel);
			}
		};

		const positionExploreFilter = (panel, trigger, wrap) => {
			if (!panel || !trigger) return;
			positionTabletFilter(panel, trigger, wrap);
			window.requestAnimationFrame(() => {
				positionTabletFilter(panel, trigger, wrap);
			});
		};

		const primaryEl = document.getElementById("primary");
		const syncExploreStickyOffset = () => {
			if (!primaryEl || !header) return;
			primaryEl.style.setProperty(
				"--ee-search-sticky-offset",
				header.classList.contains("is-scrolled") ? `${header.offsetHeight}px` : "0px"
			);
		};

		const setExploreFilterPinned = (open) => {
			const on = Boolean(open) && !isExploreMobile();
			header?.classList.toggle("is-explore-filter-open", on);
			document.body.classList.toggle("is-explore-filter-open", on);
			window.requestAnimationFrame(() => {
				syncExploreStickyOffset();
				refitOpenExploreFilter();
			});
		};

		const refitOpenExploreFilter = () => {
			const openWrap = filterWraps.find((item) => item.classList.contains("is-open"));
			if (!openWrap) return;
			const openPanel = getFilterPanel(openWrap);
			const openTrigger = openWrap.querySelector("[data-explore-filter-trigger]");
			positionTabletFilter(openPanel, openTrigger, openWrap);
		};

		const setExploreFilterOverlay = (open) => {
			const mobile = isExploreMobile();
			if (filterBackdrop) {
				if (open && mobile) {
					document.body.appendChild(filterBackdrop);
					filterBackdrop.hidden = false;
				} else {
					filterBackdrop.hidden = true;
					if (exploreSearch && filterBackdrop.parentElement !== exploreSearch) {
						exploreSearch.insertBefore(filterBackdrop, exploreSearch.firstChild);
					}
				}
			}
			document.body.classList.toggle("is-explore-filter-overlay", Boolean(open && mobile));
			if (window.excelEntLenis) {
				if (open && mobile) {
					window.excelEntLenis.stop();
				} else {
					window.excelEntLenis.start();
				}
			}
		};

		const syncChipBar = () => {
			const remaining = chipsWrap
				? chipsWrap.querySelectorAll("[data-explore-chip]").length
				: 0;
			chipsBar?.classList.toggle("is-empty", remaining === 0);
			if (countBadge) {
				countBadge.textContent = String(remaining);
			}
		};

		const closeExploreFilters = (except, options = {}) => {
			const commit = Boolean(options.commit);
			let anyOpen = false;
			filterWraps.forEach((wrap) => {
				if (except && wrap === except) {
					anyOpen = true;
					return;
				}
				const panel = getFilterPanel(wrap);
				const trigger = wrap.querySelector("[data-explore-filter-trigger]");
				if (panel) {
					if (!panel.hidden && !commit) {
						restorePanel(panel, wrap);
					}
					panel.hidden = true;
					dockFilterPanel(panel, wrap, false);
				}
				wrap.classList.remove("is-open");
				trigger?.setAttribute("aria-expanded", "false");
			});
			setExploreFilterOverlay(anyOpen && isExploreMobile());
			setExploreFilterPinned(anyOpen);
			if (commit) {
				navigateExploreFilters();
			}
		};

		let exploreFiltersReady = false;

		const buildExploreSearchParams = () => {
			const params = new URLSearchParams();
			const searchInput = exploreSearch?.querySelector('input[name="s"]');
			const q = (searchInput?.value || "").trim();
			if (q) {
				params.set("s", q);
			}

			const categories = [];
			const tags = [];
			let sort = "";

			scopedGroups.forEach((group) => {
				if (group && !categories.includes(group)) {
					categories.push(group);
				}
			});

			filterWraps.forEach((wrap) => {
				const group = wrap.getAttribute("data-explore-filter") || "";
				if (!group) return;
				const selected = Array.from(
					getFilterPanel(wrap)?.querySelectorAll("[data-explore-filter-tag].is-selected") || []
				);
				if (group === "sort") {
					const value = selected[0]?.getAttribute("data-value") || "";
					if (value && value !== "recommended") {
						sort = value;
					}
					return;
				}
				selected.forEach((tag) => {
					const value = tag.getAttribute("data-value") || "";
					if (value && !tags.includes(value)) {
						tags.push(value);
					}
				});
				if (selected.length && !categories.includes(group)) {
					categories.push(group);
				}
			});

			if (categories.length) {
				params.set("category", categories.join(","));
			}
			if (tags.length) {
				params.set("sub_category", tags.join(","));
			}
			if (sort) {
				params.set("sort", sort);
			}

			return params;
		};

		const navigateExploreFilters = () => {
			if (!exploreFiltersReady) {
				return;
			}
			const params = buildExploreSearchParams();
			const query = params.toString();
			const next = query ? `${window.location.pathname}?${query}` : window.location.pathname;
			const current = `${window.location.pathname}${window.location.search}`;
			if (next === current) {
				return;
			}
			window.location.assign(next);
		};

		const syncAllActive = () => {
			const hasCat = filterWraps.some((wrap) => {
				if (wrap.getAttribute("data-explore-filter") === "sort") return false;
				return Boolean(getFilterPanel(wrap)?.querySelector("[data-explore-filter-tag].is-selected"));
			});
			const hasScope = scopedGroups.size > 0;
			allBtn?.classList.toggle("is-active", !hasCat && !hasScope);
			filterWraps.forEach((wrap) => {
				if (wrap.getAttribute("data-explore-filter") === "sort") return;
				const group = wrap.getAttribute("data-explore-filter") || "";
				const trigger = wrap.querySelector("[data-explore-filter-trigger]");
				const selected = getFilterPanel(wrap)?.querySelector("[data-explore-filter-tag].is-selected");
				trigger?.classList.toggle("is-active", Boolean(selected) || scopedGroups.has(group));
			});
			const weddingOn = Boolean(
				getFilterPanel(exploreSearch?.querySelector('[data-explore-filter="event"]'))
					?.querySelector('[data-explore-filter-tag][data-value="wedding"].is-selected')
			);
			weddingBtn?.classList.toggle("is-active", weddingOn);
			viewAllBtn?.classList.toggle(
				"is-active",
				Boolean(exploreSearch?.classList.contains("is-showing-all-cats"))
			);
		};

		const tagLabel = (tag) => (
			tag.querySelector(".explore-filter__tag-label")?.textContent || tag.textContent || ""
		).trim();

		const setTagSelected = (tag, on) => {
			tag.classList.toggle("is-selected", on);
			tag.setAttribute("aria-selected", on ? "true" : "false");
		};

		const snapshotPanel = (panel) => {
			panel?.querySelectorAll("[data-explore-filter-tag]").forEach((tag) => {
				tag.dataset.exploreFilterSnapshot = tag.classList.contains("is-selected") ? "1" : "0";
			});
		};

		const restorePanel = (panel, wrap) => {
			if (!panel || isExploreCompact()) return;
			if (wrap?.getAttribute("data-explore-filter") === "sort") return;
			panel.querySelectorAll("[data-explore-filter-tag]").forEach((tag) => {
				setTagSelected(tag, tag.dataset.exploreFilterSnapshot === "1");
			});
		};

		const upsertChip = (group, value, label, replaceGroup = false) => {
			if (!chipsWrap) return;
			if (replaceGroup) {
				chipsWrap.querySelectorAll(`[data-explore-chip][data-chip-group="${group}"]`).forEach((chip) => chip.remove());
			}
			const existing = chipsWrap.querySelector(
				`[data-explore-chip][data-chip-group="${group}"][data-chip-value="${CSS.escape(value)}"]`
			);
			if (existing) {
				const text = existing.querySelector("span");
				if (text) text.textContent = label;
				syncChipBar();
				return;
			}
			const chip = document.createElement("button");
			chip.type = "button";
			chip.className = "explore-artists__chip magnetic";
			chip.setAttribute("data-explore-chip", "");
			chip.setAttribute("data-chip-group", group);
			chip.setAttribute("data-chip-value", value);
			chip.innerHTML = `<span></span><img src="${chipCloseSrc}" alt="" width="24" height="24" decoding="async">`;
			const text = chip.querySelector("span");
			if (text) text.textContent = label;
			chipsWrap.appendChild(chip);
			syncChipBar();
		};

		const applyPanelToChips = (panel, group) => {
			if (!panel || !group) {
				syncChipBar();
				syncAllActive();
				return;
			}
			scopedGroups.delete(group);
			const wrap = exploreSearch?.querySelector(`[data-explore-filter="${group}"]`);
			wrap?.classList.remove("is-category-scoped");
			chipsWrap?.querySelectorAll(
				`[data-explore-chip][data-chip-group="${group}"][data-chip-value="${SCOPE_CHIP_VALUE}"]`
			).forEach((chip) => chip.remove());
			const selected = Array.from(panel.querySelectorAll("[data-explore-filter-tag].is-selected"));
			const selectedValues = new Set(selected.map((tag) => tag.getAttribute("data-value") || ""));
			chipsWrap?.querySelectorAll(`[data-explore-chip][data-chip-group="${group}"]`).forEach((chip) => {
				if (!selectedValues.has(chip.getAttribute("data-chip-value") || "")) {
					chip.remove();
				}
			});
			selected.forEach((tag) => {
				upsertChip(group, tag.getAttribute("data-value") || "", tagLabel(tag));
			});
			syncChipBar();
			syncExploreResultsLabel();
			syncAllActive();
		};

		const clearGroup = (group) => {
			scopedGroups.delete(group);
			const wrap = exploreSearch?.querySelector(`[data-explore-filter="${group}"]`);
			wrap?.classList.remove("is-category-scoped");
			getFilterPanel(wrap)?.querySelectorAll("[data-explore-filter-tag]").forEach((tag) => {
				tag.classList.remove("is-selected");
				tag.setAttribute("aria-selected", "false");
			});
			chipsWrap?.querySelectorAll(`[data-explore-chip][data-chip-group="${group}"]`).forEach((chip) => chip.remove());
			syncChipBar();
			syncExploreResultsLabel();
			syncAllActive();
		};

		filterWraps.forEach((wrap) => {
			const trigger = wrap.querySelector("[data-explore-filter-trigger]");
			const panel = getFilterPanel(wrap);
			if (!trigger || !panel) return;

			trigger.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				if (panel.hidden) {
					closeExploreFilters(wrap);
					snapshotPanel(panel);
					dockFilterPanel(panel, wrap, true);
					panel.hidden = false;
					wrap.classList.add("is-open");
					trigger.setAttribute("aria-expanded", "true");
					setExploreFilterPinned(true);
					positionExploreFilter(panel, trigger, wrap);
					setExploreFilterOverlay(isExploreMobile());
					return;
				}
				closeExploreFilters();
			});

			panel.addEventListener("click", (e) => e.stopPropagation());
		});

		document.querySelectorAll("[data-explore-filter-tag]").forEach((tag) => {
			tag.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				const group = tag.closest("[data-explore-filter-panel]")?.getAttribute("data-explore-filter-group")
					|| tag.closest("[data-explore-filter]")?.getAttribute("data-explore-filter");
				const wrap = group ? exploreSearch?.querySelector(`[data-explore-filter="${group}"]`) : null;
				const panel = getFilterPanel(wrap) || tag.closest("[data-explore-filter-panel]");
				const value = tag.getAttribute("data-value") || "";
				const label = tagLabel(tag);
				if (!wrap || !group || !panel) return;

				if (!isExploreCompact() && group !== "sort") {
					setTagSelected(tag, !tag.classList.contains("is-selected"));
					return;
				}

				panel.querySelectorAll("[data-explore-filter-tag]").forEach((item) => {
					setTagSelected(item, item === tag);
				});

				if (group === "sort") {
					if (value === "recommended") {
						chipsWrap?.querySelectorAll('[data-explore-chip][data-chip-group="sort"]').forEach((chip) => chip.remove());
						syncChipBar();
					} else {
						upsertChip(group, value, label, true);
					}
				} else {
					upsertChip(group, value, label, true);
				}

				syncAllActive();
				closeExploreFilters(null, { commit: true });
			});
		});

		document.querySelectorAll("[data-explore-filter-confirm]").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				const panel = btn.closest("[data-explore-filter-panel]");
				const group = panel?.getAttribute("data-explore-filter-group");
				if (!panel || !group) return;
				applyPanelToChips(panel, group);
				closeExploreFilters(null, { commit: true });
			});
		});

		document.querySelectorAll("[data-explore-filter-close]").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				closeExploreFilters();
			});
		});

		filterBackdrop?.addEventListener("click", () => closeExploreFilters());

		cats.forEach((btn) => {
			btn.addEventListener("click", () => {
				const id = btn.getAttribute("data-explore-cat");
				if (id === "view-all") {
					exploreSearch?.classList.toggle("is-showing-all-cats");
					syncAllActive();
					return;
				}
				if (id === "all") {
					clearExploreCategoryScope();
					filterWraps.forEach((wrap) => {
						if (wrap.getAttribute("data-explore-filter") === "sort") return;
						const group = wrap.getAttribute("data-explore-filter");
						if (group) clearGroup(group);
					});
					exploreSearch?.classList.remove("is-showing-all-cats");
					closeExploreFilters(null, { commit: true });
					syncAllActive();
					return;
				}
				if (id === "wedding") {
					const eventWrap = exploreSearch?.querySelector('[data-explore-filter="event"]');
					const wedding = getFilterPanel(eventWrap)?.querySelector('[data-explore-filter-tag][data-value="wedding"]');
					wedding?.click();
				}
			});
		});

		chipsWrap?.addEventListener("click", (e) => {
			const chip = e.target.closest("[data-explore-chip]");
			if (!chip || !chipsWrap.contains(chip)) {
				return;
			}
			const group = chip.getAttribute("data-chip-group");
			const value = chip.getAttribute("data-chip-value");
			chip.remove();
			if (group && value === SCOPE_CHIP_VALUE) {
				scopedGroups.delete(group);
				exploreSearch?.querySelector(`[data-explore-filter="${group}"]`)?.classList.remove("is-category-scoped");
				syncExploreResultsLabel();
			} else if (group) {
				const wrap = exploreSearch?.querySelector(`[data-explore-filter="${group}"]`);
				getFilterPanel(wrap)?.querySelectorAll("[data-explore-filter-tag]").forEach((tag) => {
					if (tag.getAttribute("data-value") === value) {
						setTagSelected(tag, false);
					}
				});
				if (group === "sort") {
					const recommended = getFilterPanel(wrap)?.querySelector('[data-explore-filter-tag][data-value="recommended"]');
					if (recommended) setTagSelected(recommended, true);
				}
			}
			syncChipBar();
			syncAllActive();
			navigateExploreFilters();
		});

		clearBtn?.addEventListener("click", () => {
			clearExploreCategoryScope();
			chipsWrap?.querySelectorAll("[data-explore-chip]").forEach((chip) => chip.remove());
			filterWraps.forEach((wrap) => {
				const group = wrap.getAttribute("data-explore-filter");
				getFilterPanel(wrap)?.querySelectorAll("[data-explore-filter-tag]").forEach((tag) => {
					setTagSelected(tag, group === "sort" && tag.getAttribute("data-value") === "recommended");
				});
			});
			syncChipBar();
			syncAllActive();
			closeExploreFilters(null, { commit: true });
		});

		exploreSearch?.querySelector(".explore-artists-search__form")?.addEventListener("submit", (e) => {
			e.preventDefault();
			navigateExploreFilters();
		});

		document.addEventListener("click", (e) => {
			if (e.target.closest("[data-explore-filter-panel]")) return;
			if (e.target.closest("[data-explore-filter-backdrop]")) return;
			if (!exploreSearch?.contains(e.target)) {
				closeExploreFilters();
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") closeExploreFilters();
		});

		const onExploreFilterScroll = () => {
			if (isExploreMobile()) {
				return;
			}
			refitOpenExploreFilter();
		};
		if (window.excelEntLenis) {
			window.excelEntLenis.on("scroll", onExploreFilterScroll);
		} else {
			window.addEventListener("scroll", onExploreFilterScroll, { passive: true });
		}
		window.addEventListener("ee-explore-filter-refit", refitOpenExploreFilter);

		let exploreFilterBp = isExploreMobile() ? "mobile" : isExploreTablet() ? "tablet" : "desktop";
		window.addEventListener("resize", () => {
			const next = isExploreMobile() ? "mobile" : isExploreTablet() ? "tablet" : "desktop";
			if (next !== exploreFilterBp) {
				exploreFilterBp = next;
				closeExploreFilters();
				return;
			}
			refitOpenExploreFilter();
		});

		const applyExploreCategoriesFromUrl = () => {
			const params = new URLSearchParams(window.location.search);
			const raw = params.get("category") || params.get("categories") || "";
			const rawTags =
				params.get("sub_category") || params.get("tags") || params.get("tag") || "";
			const sortValue = params.get("sort") || "";

			const requested = raw
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean);
			const requestedTags = rawTags
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean);

			if (!requested.length && !requestedTags.length && !sortValue) return;

			const wantsArtistType = requested.includes("artist-type");
			const wantsTribute = requested.includes("tribute");
			const isDesktopWide = window.matchMedia("(min-width: 1200px)").matches;

			clearExploreCategoryScope();
			filterWraps.forEach((wrap) => {
				const group = wrap.getAttribute("data-explore-filter");
				if (group && group !== "sort") {
					clearGroup(group);
				}
			});

			if (isDesktopWide && wantsArtistType && wantsTribute) {
				activateExploreCategoryScope("artists-tributes");
			} else {
				if (wantsArtistType) {
					activateExploreCategoryScope("artist-type");
				}
				if (wantsTribute) {
					activateExploreCategoryScope("tribute");
				}
			}

			requested.forEach((category) => {
				if (category === "artist-type" || category === "tribute") {
					return;
				}
				activateExploreCategoryScope(category);
			});

			requestedTags.forEach((tagValue) => {
				const matches = Array.from(
					document.querySelectorAll(`[data-explore-filter-tag][data-value="${CSS.escape(tagValue)}"]`)
				);
				if (!matches.length) return;

				const preferred = matches.find((tag) => {
					const group = tag.closest("[data-explore-filter-panel]")?.getAttribute("data-explore-filter-group")
						|| tag.closest("[data-explore-filter]")?.getAttribute("data-explore-filter");
					return group && (scopedGroups.has(group) || requested.includes(group));
				});
				const tag = preferred || matches[0];
				const group = tag.closest("[data-explore-filter-panel]")?.getAttribute("data-explore-filter-group")
					|| tag.closest("[data-explore-filter]")?.getAttribute("data-explore-filter");
				if (!group || group === "sort") return;

				setTagSelected(tag, true);
				upsertChip(group, tagValue, tagLabel(tag));
			});

			if (sortValue) {
				const sortWrap = exploreSearch?.querySelector('[data-explore-filter="sort"]');
				const sortPanel = getFilterPanel(sortWrap);
				sortPanel?.querySelectorAll("[data-explore-filter-tag]").forEach((tag) => {
					const on = tag.getAttribute("data-value") === sortValue;
					setTagSelected(tag, on);
					if (on) {
						upsertChip("sort", sortValue, tagLabel(tag), true);
					}
				});
			}

			exploreSearch?.classList.remove("is-showing-all-cats");
			syncAllActive();
			closeExploreFilters(null, { commit: false });
		};

		applyExploreCategoriesFromUrl();
		exploreFiltersReady = true;

		document.querySelectorAll("[data-explore-fav]").forEach((btn) => {
			btn.addEventListener("click", () => {
				const card = btn.closest(".explore-artist-card");
				const on = !(card?.classList.contains("is-favorited"));
				card?.classList.toggle("is-favorited", on);
				btn.setAttribute("aria-pressed", on ? "true" : "false");
			});
		});

		document.querySelectorAll("[data-explore-artist-card]").forEach((card) => {
			const openProfile = () => {
				const profileUrl = card.getAttribute("data-profile-url");
				if (profileUrl) {
					window.location.href = profileUrl;
				}
			};

			card.addEventListener("click", (event) => {
				if (event.target.closest("a, button")) {
					return;
				}
				openProfile();
			});

			card.addEventListener("keydown", (event) => {
				if (event.key !== "Enter" && event.key !== " ") {
					return;
				}
				event.preventDefault();
				openProfile();
			});
		});

		document.querySelectorAll("[data-explore-header-search]").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				if (window.matchMedia("(min-width: 768px)").matches) {
					return;
				}
				e.preventDefault();
				const input = document.getElementById("explore-artists-search-query");
				if (!input) {
					return;
				}
				if (window.excelEntLenis) {
					window.excelEntLenis.scrollTo(input, {
						offset: -100,
						duration: 1.1,
					});
				} else {
					input.scrollIntoView({ behavior: "smooth", block: "center" });
				}
				window.setTimeout(() => input.focus(), 200);
			});
		});

		syncChipBar();
	}

	/* ---------- Artist profile page ---------- */
	const artistVenue = document.querySelector("[data-artist-venue]");
	if (artistVenue) {
		const slidesNode = artistVenue.querySelector("[data-venue-slides]");
		let slides = [];
		try {
			slides = JSON.parse(slidesNode?.textContent || "[]");
		} catch (err) {
			slides = [];
		}

		let index = 0;
		const image = artistVenue.querySelector("[data-venue-image]");
		const label = artistVenue.querySelector("[data-venue-label]");
		const progress = artistVenue.querySelector("[data-venue-progress]");
		const dotsRoot = artistVenue.querySelector("[data-venue-dots]");
		const dots = [];
		const venueSwipeMq = window.matchMedia("(max-width: 1199px)");
		let venueTrack = null;
		let venueTrackStep = 0;
		let venueTrackMaxOffset = 0;

		const isVenueSwipe = () => venueSwipeMq.matches;

		const venueFrame = artistVenue.querySelector(".artist-performance__gallery-frame");

		const getVenueTrackStep = () =>
			Math.max((venueFrame || artistVenue).offsetWidth || 0, 1);

		const rubberVenueTrack = (offset) => {
			if (offset < 0) {
				return offset * 0.22;
			}
			if (offset > venueTrackMaxOffset) {
				return venueTrackMaxOffset + (offset - venueTrackMaxOffset) * 0.22;
			}
			return offset;
		};

		const applyVenueTrackTransform = (offset, animate = true) => {
			if (!venueTrack) {
				return;
			}
			venueTrack.style.transition =
				animate && !reduced
					? "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
					: "none";
			venueTrack.style.transform = `translate3d(${-rubberVenueTrack(offset)}px, 0, 0)`;
		};

		const measureVenueTrack = () => {
			venueTrackStep = getVenueTrackStep();
			venueTrackMaxOffset = Math.max(slides.length - 1, 0) * venueTrackStep;
			return index * venueTrackStep;
		};

		const syncVenueTrackPosition = (animate = true) => {
			if (!venueTrack) {
				return;
			}
			measureVenueTrack();
			applyVenueTrackTransform(index * venueTrackStep, animate);
		};

		const buildVenueTrack = () => {
			if (!isVenueSwipe() || !slides.length) {
				return;
			}

			artistVenue.classList.add("is-swipe-mode");
			if (image) {
				image.hidden = true;
				image.setAttribute("aria-hidden", "true");
			}

			if (!venueTrack) {
				venueTrack = document.createElement("div");
				venueTrack.className = "artist-performance__venue-track";
				venueTrack.setAttribute("data-venue-track", "");
				const trackHost = venueFrame || artistVenue;
				trackHost.insertBefore(venueTrack, trackHost.firstChild);
			}

			venueTrack.replaceChildren();
			slides.forEach((slide, i) => {
				const slideEl = document.createElement("div");
				slideEl.className = "artist-performance__venue-slide";
				const img = document.createElement("img");
				img.src = slide.image;
				img.alt = slide.label || "";
				img.loading = i === index ? "eager" : "lazy";
				img.decoding = "async";
				img.draggable = false;
				slideEl.appendChild(img);
				venueTrack.appendChild(slideEl);
			});

			syncVenueTrackPosition(false);
		};

		const destroyVenueTrack = () => {
			artistVenue.classList.remove("is-swipe-mode", "is-dragging");
			if (venueTrack) {
				venueTrack.remove();
				venueTrack = null;
			}
			if (image) {
				image.hidden = false;
				image.removeAttribute("aria-hidden");
			}
		};

		const syncVenueSwipeMode = () => {
			if (isVenueSwipe()) {
				buildVenueTrack();
				return;
			}
			destroyVenueTrack();
			render(false);
		};

		const render = (animate = true) => {
			const slide = slides[index];
			if (!slide) {
				return;
			}

			if (venueTrack && isVenueSwipe()) {
				syncVenueTrackPosition(animate);
			} else if (image) {
				image.src = slide.image;
				image.alt = slide.label || "";
			}

			if (label) {
				label.textContent = slide.label || "";
			}
			if (progress && slides.length) {
				progress.style.width = `${((index + 1) / slides.length) * 100}%`;
			}
			dots.forEach((dot, i) => {
				const active = i === index;
				dot.classList.toggle("is-active", active);
				dot.setAttribute("aria-current", active ? "true" : "false");
			});
		};

		const goVenue = (delta) => {
			if (!slides.length) {
				return;
			}
			index = (index + delta + slides.length) % slides.length;
			render();
		};

		if (dotsRoot && slides.length) {
			dotsRoot.hidden = false;
			dotsRoot.setAttribute("role", "tablist");
			dotsRoot.setAttribute("aria-label", "Performance gallery");
			slides.forEach((slide, i) => {
				const dot = document.createElement("button");
				dot.type = "button";
				dot.className = "artist-performance__dot";
				dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
				dot.addEventListener("click", () => {
					index = i;
					render();
				});
				dotsRoot.appendChild(dot);
				dots.push(dot);
			});
		}

		artistVenue.querySelector("[data-venue-prev]")?.addEventListener("click", () => {
			goVenue(-1);
		});

		artistVenue.querySelector("[data-venue-next]")?.addEventListener("click", () => {
			goVenue(1);
		});

		if (slides.length) {
			let swipeActive = false;
			let swipeAxis = null;
			let swipeStartX = 0;
			let swipeStartY = 0;
			let swipeDeltaX = 0;
			let swipeBaseOffset = 0;
			let swipePointerId = null;
			let swipeSwiping = false;
			let swipeLastX = 0;
			let swipeLastT = 0;
			let swipeVelocity = 0;
			let venueLenisPaused = false;

			const pauseVenueLenis = () => {
				if (!venueLenisPaused && window.excelEntLenis) {
					window.excelEntLenis.stop();
					venueLenisPaused = true;
				}
			};

			const resumeVenueLenis = () => {
				if (venueLenisPaused && window.excelEntLenis) {
					window.excelEntLenis.start();
					venueLenisPaused = false;
				}
			};

			const beginVenueSwipe = (clientX, clientY, id) => {
				if (!isVenueSwipe() || !venueTrack) {
					return false;
				}
				swipeActive = true;
				swipePointerId = id;
				swipeStartX = clientX;
				swipeStartY = clientY;
				swipeLastX = clientX;
				swipeLastT = performance.now();
				swipeVelocity = 0;
				swipeDeltaX = 0;
				swipeAxis = null;
				swipeSwiping = false;
				swipeBaseOffset = measureVenueTrack();
				pauseVenueLenis();
				return true;
			};

			const moveVenueSwipe = (clientX, clientY, event) => {
				if (!swipeActive || !venueTrack) {
					return;
				}

				const dx = clientX - swipeStartX;
				const dy = clientY - swipeStartY;
				const now = performance.now();
				const dt = Math.max(now - swipeLastT, 1);
				swipeVelocity = (clientX - swipeLastX) / dt;
				swipeLastX = clientX;
				swipeLastT = now;

				if (!swipeAxis) {
					const absX = Math.abs(dx);
					const absY = Math.abs(dy);
					if (absX < 8 && absY < 8) {
						return;
					}
					if (absY > absX && absY > 12) {
						swipeActive = false;
						swipePointerId = null;
						resumeVenueLenis();
						return;
					}
					if (absX >= absY) {
						swipeAxis = "x";
						swipeSwiping = true;
						artistVenue.classList.add("is-dragging");
					} else {
						return;
					}
				}

				if (swipeAxis !== "x") {
					return;
				}

				swipeDeltaX = dx;
				applyVenueTrackTransform(swipeBaseOffset - swipeDeltaX, false);
				if (event?.cancelable) {
					event.preventDefault();
				}
			};

			const finishVenueSwipe = () => {
				if (!swipeActive && !swipeSwiping) {
					resumeVenueLenis();
					artistVenue.classList.remove("is-dragging");
					return;
				}

				swipeActive = false;
				swipePointerId = null;
				artistVenue.classList.remove("is-dragging");
				resumeVenueLenis();

				if (swipeSwiping) {
					const threshold = Math.min(40, Math.max(24, venueTrackStep * 0.12));
					if (
						Math.abs(swipeDeltaX) > threshold ||
						Math.abs(swipeVelocity) > 0.35
					) {
						if (swipeDeltaX < 0 || swipeVelocity < -0.35) {
							goVenue(1);
						} else if (swipeDeltaX > 0 || swipeVelocity > 0.35) {
							goVenue(-1);
						}
					} else {
						render(true);
					}
				} else {
					render(true);
				}

				swipeSwiping = false;
				swipeDeltaX = 0;
				swipeAxis = null;
				swipeVelocity = 0;
			};

			artistVenue.addEventListener(
				"touchstart",
				(e) => {
					if (!isVenueSwipe() || e.touches.length !== 1) {
						return;
					}
					const touch = e.touches[0];
					beginVenueSwipe(touch.clientX, touch.clientY, touch.identifier);
				},
				{ passive: true }
			);

			artistVenue.addEventListener(
				"touchmove",
				(e) => {
					if (!swipeActive || !isVenueSwipe() || e.touches.length !== 1) {
						return;
					}
					const touch = e.touches[0];
					if (
						swipePointerId !== null &&
						touch.identifier !== swipePointerId
					) {
						return;
					}
					moveVenueSwipe(touch.clientX, touch.clientY, e);
				},
				{ passive: false }
			);

			const onVenueTouchEnd = (e) => {
				if (!swipeActive) {
					return;
				}
				const touch = e.changedTouches?.[0];
				if (
					touch &&
					swipePointerId !== null &&
					touch.identifier !== swipePointerId
				) {
					return;
				}
				finishVenueSwipe();
			};

			artistVenue.addEventListener("touchend", onVenueTouchEnd, { passive: true });
			artistVenue.addEventListener("touchcancel", onVenueTouchEnd, { passive: true });

			artistVenue.addEventListener("pointerdown", (e) => {
				if (!isVenueSwipe() || e.pointerType === "touch") {
					return;
				}
				if (e.button !== 0) {
					return;
				}
				beginVenueSwipe(e.clientX, e.clientY, e.pointerId);
			});

			artistVenue.addEventListener("pointermove", (e) => {
				if (
					!swipeActive ||
					!isVenueSwipe() ||
					e.pointerType === "touch" ||
					e.pointerId !== swipePointerId
				) {
					return;
				}
				moveVenueSwipe(e.clientX, e.clientY, e);
			});

			artistVenue.addEventListener("pointerup", (e) => {
				if (e.pointerId !== swipePointerId) {
					return;
				}
				finishVenueSwipe();
			});

			artistVenue.addEventListener("pointercancel", (e) => {
				if (e.pointerId !== swipePointerId) {
					return;
				}
				finishVenueSwipe();
			});

			artistVenue.addEventListener("dragstart", (e) => e.preventDefault());

			syncVenueSwipeMode();
			if (typeof venueSwipeMq.addEventListener === "function") {
				venueSwipeMq.addEventListener("change", syncVenueSwipeMode);
			} else if (typeof venueSwipeMq.addListener === "function") {
				venueSwipeMq.addListener(syncVenueSwipeMode);
			}
			window.addEventListener(
				"resize",
				() => {
					if (venueTrack) {
						syncVenueTrackPosition(false);
					}
				},
				{ passive: true }
			);
		}

		render(false);
	}

	/* ---------- Artist performance sticky pin ---------- */
	const artistPerformance = document.querySelector("[data-artist-performance]");
	if (artistPerformance) {
		const artistPerformancePin = document.querySelector("[data-artist-performance-pin]");
		const pinDesktopMq = window.matchMedia("(min-width: 1200px)");
		const pinMobileMq = window.matchMedia("(max-width: 767px)");
		const isArtistPerformancePinActive = () =>
			pinDesktopMq.matches || pinMobileMq.matches;
		let performanceMobileFitLocked = false;
		let performanceMobileFitSnapshot = null;
		let performanceMobileFitWidth = window.innerWidth;
		let performanceMobilePinReady = false;
		let performanceResizeTimer = 0;

		const resetPerformanceMobilePin = () => {
			performanceMobileFitLocked = false;
			performanceMobileFitSnapshot = null;
			performanceMobileFitWidth = window.innerWidth;
		};

		const applyPerformanceViewportFit = (snapshot) => {
			if (!artistPerformancePin || !snapshot) {
				return;
			}

			artistPerformance.classList.remove("is-viewport-fitted");
			artistPerformance.style.removeProperty("height");
			artistPerformance.style.removeProperty("--ee-artist-performance-viewport-height");
			artistPerformance.style.removeProperty("--ee-artist-performance-fit-scale");
			artistPerformance.style.removeProperty("--ee-artist-performance-fit-pad-top");
			artistPerformance.style.removeProperty("--ee-artist-performance-fit-pad-bottom");
			artistPerformance.style.removeProperty("--ee-artist-performance-content-height");

			if (snapshot.useFit) {
				artistPerformance.style.setProperty(
					"--ee-artist-performance-viewport-height",
					`${snapshot.availableHeight}px`
				);
				artistPerformance.style.setProperty(
					"--ee-artist-performance-fit-scale",
					String(snapshot.fitScale)
				);
				artistPerformance.style.setProperty(
					"--ee-artist-performance-fit-pad-top",
					`${snapshot.padTop * snapshot.fitScale}px`
				);
				artistPerformance.style.setProperty(
					"--ee-artist-performance-fit-pad-bottom",
					`${snapshot.padBottom * snapshot.fitScale}px`
				);
				artistPerformance.style.setProperty(
					"--ee-artist-performance-content-height",
					`${snapshot.contentHeight}px`
				);
				artistPerformance.classList.add("is-viewport-fitted");
			}

			artistPerformancePin.style.height = `${snapshot.pinHeight}px`;
		};

		const syncArtistPerformancePin = () => {
			if (!artistPerformancePin) {
				return;
			}

			if (!isArtistPerformancePinActive()) {
				resetPerformanceMobilePin();
				artistPerformancePin.style.height = "";
				artistPerformance.classList.remove("is-pinned", "is-viewport-fitted");
				artistPerformance.style.removeProperty("height");
				artistPerformance.style.removeProperty("--ee-artist-performance-viewport-height");
				artistPerformance.style.removeProperty("--ee-artist-performance-fit-scale");
				artistPerformance.style.removeProperty("--ee-artist-performance-fit-pad-top");
				artistPerformance.style.removeProperty("--ee-artist-performance-fit-pad-bottom");
				artistPerformance.style.removeProperty("--ee-artist-performance-content-height");
				return;
			}

			if (!pinMobileMq.matches) {
				resetPerformanceMobilePin();
			}

			const viewportWidth = window.innerWidth;
			if (
				pinMobileMq.matches &&
				performanceMobileFitLocked &&
				Math.abs(viewportWidth - performanceMobileFitWidth) > 80
			) {
				resetPerformanceMobilePin();
			}

			if (
				pinMobileMq.matches &&
				performanceMobileFitLocked &&
				performanceMobileFitSnapshot
			) {
				applyPerformanceViewportFit(performanceMobileFitSnapshot);
				return;
			}

			artistPerformancePin.style.height = "auto";
			artistPerformance.classList.remove("is-viewport-fitted");
			artistPerformance.style.removeProperty("height");
			artistPerformance.style.removeProperty("--ee-artist-performance-viewport-height");
			artistPerformance.style.removeProperty("--ee-artist-performance-fit-scale");
			artistPerformance.style.removeProperty("--ee-artist-performance-fit-pad-top");
			artistPerformance.style.removeProperty("--ee-artist-performance-fit-pad-bottom");
			artistPerformance.style.removeProperty("--ee-artist-performance-content-height");

			const pad = artistPerformancePin.querySelector(".artist-performance__scroll-pad");
			const padHeight = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionHeight = Math.ceil(artistPerformance.scrollHeight);
			const stickyTop =
				parseFloat(
					getComputedStyle(artistPerformance).getPropertyValue(
						"--ee-artist-performance-sticky-top"
					)
				) || 0;
			const viewportHeight = window.visualViewport?.height || window.innerHeight;
			const availableHeight = Math.max(viewportHeight - stickyTop, 0);
			const fitScale = isArtistPerformancePinActive()
				? Math.min(1, availableHeight / Math.max(sectionHeight, 1))
				: 1;
			const styles = getComputedStyle(artistPerformance);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;
			const contentHeight = Math.max(sectionHeight - padTop - padBottom, 0);
			const useFit = fitScale < 0.999;
			const holdHeight = Math.round(viewportHeight);
			const snapshot = {
				availableHeight,
				fitScale,
				padTop,
				padBottom,
				contentHeight,
				pinHeight: padHeight + sectionHeight * fitScale + holdHeight,
				useFit,
			};

			applyPerformanceViewportFit(snapshot);

			if (pinMobileMq.matches && performanceMobilePinReady && useFit) {
				performanceMobileFitLocked = true;
				performanceMobileFitSnapshot = snapshot;
				performanceMobileFitWidth = viewportWidth;
			}
		};

		const syncArtistPerformancePinnedState = () => {
			if (!artistPerformancePin || !isArtistPerformancePinActive()) {
				artistPerformance.classList.remove("is-pinned");
				return;
			}

			const stickyTop =
				parseFloat(
					getComputedStyle(artistPerformance).getPropertyValue(
						"--ee-artist-performance-sticky-top"
					)
				) || 0;
			const viewportHeight = window.visualViewport?.height || window.innerHeight;
			const sectionRect = artistPerformance.getBoundingClientRect();
			const pinRect = artistPerformancePin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, viewportHeight - stickyTop) + 4;
			artistPerformance.classList.toggle("is-pinned", pinned);
		};

		const refreshArtistPerformancePin = () => {
			window.requestAnimationFrame(() => {
				syncArtistPerformancePin();
				syncArtistPerformancePinnedState();
			});
		};

		const refreshArtistPerformancePinLayout = () => {
			if (pinMobileMq.matches) {
				resetPerformanceMobilePin();
			}
			refreshArtistPerformancePin();
		};

		if (lenis) {
			lenis.on("scroll", syncArtistPerformancePinnedState);
		} else {
			window.addEventListener("scroll", syncArtistPerformancePinnedState, { passive: true });
		}
		window.addEventListener("resize", () => {
			window.clearTimeout(performanceResizeTimer);
			performanceResizeTimer = window.setTimeout(() => {
				if (pinMobileMq.matches) {
					if (
						performanceMobileFitLocked &&
						Math.abs(window.innerWidth - performanceMobileFitWidth) > 80
					) {
						refreshArtistPerformancePinLayout();
						return;
					}
					if (!performanceMobileFitLocked) {
						refreshArtistPerformancePin();
					} else {
						syncArtistPerformancePinnedState();
					}
					return;
				}
				refreshArtistPerformancePinLayout();
			}, 150);
		}, { passive: true });
		window.addEventListener("load", () => {
			performanceMobilePinReady = true;
			resetPerformanceMobilePin();
			refreshArtistPerformancePinLayout();
		});
		window.addEventListener("orientationchange", () => {
			resetPerformanceMobilePin();
			performanceMobileFitWidth = window.innerWidth;
			window.setTimeout(refreshArtistPerformancePinLayout, 150);
		});
		window.addEventListener("excel-ent:header-state-change", () => {
			if (pinMobileMq.matches) {
				syncArtistPerformancePinnedState();
				return;
			}
			refreshArtistPerformancePinLayout();
		});

		if (typeof pinDesktopMq.addEventListener === "function") {
			pinDesktopMq.addEventListener("change", refreshArtistPerformancePinLayout);
			pinMobileMq.addEventListener("change", refreshArtistPerformancePinLayout);
		} else if (typeof pinDesktopMq.addListener === "function") {
			pinDesktopMq.addListener(refreshArtistPerformancePinLayout);
			pinMobileMq.addListener(refreshArtistPerformancePinLayout);
		}

		window.requestAnimationFrame(refreshArtistPerformancePin);
		if (document.fonts?.ready) {
			document.fonts.ready.then(refreshArtistPerformancePin);
		}
	}

	const artistSetlist = document.querySelector("[data-artist-setlist]");
	if (artistSetlist) {
		const artistSetlistPin = document.querySelector("[data-artist-setlist-pin]");
		const pinDesktopMq = window.matchMedia("(min-width: 1200px)");
		const pinMobileMq = window.matchMedia("(max-width: 767px)");
		const isArtistSetlistPinActive = () =>
			pinDesktopMq.matches || pinMobileMq.matches;
		let setlistMobileFitLocked = false;
		let setlistMobileFitSnapshot = null;
		let setlistMobileFitWidth = window.innerWidth;
		let setlistMobilePinReady = false;
		let setlistResizeTimer = 0;

		const resetSetlistMobilePin = () => {
			setlistMobileFitLocked = false;
			setlistMobileFitSnapshot = null;
			setlistMobileFitWidth = window.innerWidth;
		};

		const applySetlistViewportFit = (snapshot) => {
			if (!artistSetlistPin || !snapshot) {
				return;
			}

			artistSetlist.classList.remove("is-viewport-fitted", "is-mobile-fill");
			artistSetlist.style.removeProperty("height");
			artistSetlist.style.removeProperty("--ee-artist-setlist-available-height");
			artistSetlist.style.removeProperty("--ee-artist-setlist-viewport-height");
			artistSetlist.style.removeProperty("--ee-artist-setlist-fit-scale");
			artistSetlist.style.removeProperty("--ee-artist-setlist-fit-pad-top");
			artistSetlist.style.removeProperty("--ee-artist-setlist-fit-pad-bottom");
			artistSetlist.style.removeProperty("--ee-artist-setlist-content-height");

			if (snapshot.useFill || snapshot.useFit) {
				artistSetlist.style.setProperty(
					"--ee-artist-setlist-available-height",
					`${snapshot.availableHeight}px`
				);
			}

			if (snapshot.useFit) {
				artistSetlist.style.setProperty(
					"--ee-artist-setlist-viewport-height",
					`${snapshot.displaySectionHeight}px`
				);
				artistSetlist.style.setProperty(
					"--ee-artist-setlist-fit-scale",
					String(snapshot.fitScale)
				);
				artistSetlist.style.setProperty(
					"--ee-artist-setlist-fit-pad-top",
					`${snapshot.padTop * snapshot.fitScale}px`
				);
				artistSetlist.style.setProperty(
					"--ee-artist-setlist-fit-pad-bottom",
					"0px"
				);
				artistSetlist.style.setProperty(
					"--ee-artist-setlist-content-height",
					`${snapshot.contentHeight}px`
				);
				artistSetlist.classList.add("is-viewport-fitted");
			} else if (snapshot.useFill) {
				artistSetlist.classList.add("is-mobile-fill");
			}

			artistSetlistPin.style.height = `${snapshot.pinHeight}px`;
		};

		const syncArtistSetlistPin = () => {
			if (!artistSetlistPin) {
				return;
			}

			if (!isArtistSetlistPinActive()) {
				resetSetlistMobilePin();
				artistSetlistPin.style.height = "";
				artistSetlist.classList.remove("is-pinned", "is-viewport-fitted", "is-mobile-fill");
				artistSetlist.style.removeProperty("height");
				artistSetlist.style.removeProperty("--ee-artist-setlist-available-height");
				artistSetlist.style.removeProperty("--ee-artist-setlist-viewport-height");
				artistSetlist.style.removeProperty("--ee-artist-setlist-fit-scale");
				artistSetlist.style.removeProperty("--ee-artist-setlist-fit-pad-top");
				artistSetlist.style.removeProperty("--ee-artist-setlist-fit-pad-bottom");
				artistSetlist.style.removeProperty("--ee-artist-setlist-content-height");
				return;
			}

			if (!pinMobileMq.matches) {
				resetSetlistMobilePin();
			}

			const viewportWidth = window.innerWidth;
			if (
				pinMobileMq.matches &&
				setlistMobileFitLocked &&
				Math.abs(viewportWidth - setlistMobileFitWidth) > 80
			) {
				resetSetlistMobilePin();
			}

			if (
				pinMobileMq.matches &&
				setlistMobileFitLocked &&
				setlistMobileFitSnapshot
			) {
				applySetlistViewportFit(setlistMobileFitSnapshot);
				return;
			}

			artistSetlistPin.style.height = "auto";
			artistSetlist.classList.remove("is-viewport-fitted", "is-mobile-fill");
			artistSetlist.style.removeProperty("height");
			artistSetlist.style.removeProperty("--ee-artist-setlist-available-height");
			artistSetlist.style.removeProperty("--ee-artist-setlist-viewport-height");
			artistSetlist.style.removeProperty("--ee-artist-setlist-fit-scale");
			artistSetlist.style.removeProperty("--ee-artist-setlist-fit-pad-top");
			artistSetlist.style.removeProperty("--ee-artist-setlist-fit-pad-bottom");
			artistSetlist.style.removeProperty("--ee-artist-setlist-content-height");

			const pad = artistSetlistPin.querySelector(".artist-setlist__scroll-pad");
			const padHeight = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const pinStyles = getComputedStyle(artistSetlistPin);
			const pinPadTop = parseFloat(pinStyles.paddingTop) || 0;
			const pinPadBottom = parseFloat(pinStyles.paddingBottom) || 0;
			const naturalSectionHeight = Math.ceil(artistSetlist.scrollHeight);
			const stickyTop =
				parseFloat(
					getComputedStyle(artistSetlist).getPropertyValue(
						"--ee-artist-setlist-sticky-top"
					)
				) || 0;
			const viewportHeight = window.visualViewport?.height || window.innerHeight;
			const availableHeight = Math.max(viewportHeight - stickyTop, 0);
			const fitScale = isArtistSetlistPinActive()
				? Math.min(1, availableHeight / Math.max(naturalSectionHeight, 1))
				: 1;
			const styles = getComputedStyle(artistSetlist);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;
			const contentHeight = Math.max(naturalSectionHeight - padTop - padBottom, 0);
			const useFit = fitScale < 0.999;
			const useFill =
				pinMobileMq.matches && setlistMobilePinReady && !useFit;
			const displaySectionHeight = useFit
				? Math.ceil(naturalSectionHeight * fitScale)
				: useFill
					? availableHeight
					: naturalSectionHeight;
			const holdHeight = Math.round(viewportHeight);
			const snapshot = {
				availableHeight,
				fitScale,
				padTop,
				padBottom,
				contentHeight,
				naturalSectionHeight,
				displaySectionHeight,
				pinHeight:
					padHeight +
					pinPadTop +
					pinPadBottom +
					displaySectionHeight +
					holdHeight,
				useFit,
				useFill,
			};

			applySetlistViewportFit(snapshot);

			if (pinMobileMq.matches && setlistMobilePinReady) {
				setlistMobileFitLocked = true;
				setlistMobileFitSnapshot = snapshot;
				setlistMobileFitWidth = viewportWidth;
			}
		};

		const syncArtistSetlistPinnedState = () => {
			if (!artistSetlistPin || !isArtistSetlistPinActive()) {
				artistSetlist.classList.remove("is-pinned");
				return;
			}

			const stickyTop =
				parseFloat(
					getComputedStyle(artistSetlist).getPropertyValue(
						"--ee-artist-setlist-sticky-top"
					)
				) || 0;
			const viewportHeight = window.visualViewport?.height || window.innerHeight;
			const sectionRect = artistSetlist.getBoundingClientRect();
			const pinRect = artistSetlistPin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, viewportHeight - stickyTop) + 4;
			artistSetlist.classList.toggle("is-pinned", pinned);
		};

		const refreshArtistSetlistPin = () => {
			window.requestAnimationFrame(() => {
				syncArtistSetlistPin();
				syncArtistSetlistPinnedState();
			});
		};

		const refreshArtistSetlistPinLayout = () => {
			if (pinMobileMq.matches) {
				resetSetlistMobilePin();
			}
			refreshArtistSetlistPin();
		};

		const tabs = Array.from(artistSetlist.querySelectorAll("[data-setlist-tab]"));
		const rows = Array.from(artistSetlist.querySelectorAll("[data-setlist-row]"));
		const search = artistSetlist.querySelector("[data-setlist-search]");
		const nowTitle = artistSetlist.querySelector("[data-now-title]");
		const nowArtist = artistSetlist.querySelector("[data-now-artist]");
		const nowIndex = artistSetlist.querySelector("[data-now-index]");
		let activeGenre = "all";

		const syncRows = () => {
			const query = (search?.value || "").trim().toLowerCase();
			rows.forEach((row) => {
				const genre = row.getAttribute("data-genre") || "";
				const title = (row.getAttribute("data-title") || "").toLowerCase();
				const artist = (row.getAttribute("data-artist") || "").toLowerCase();
				const genreOk = activeGenre === "all" || genre === activeGenre;
				const searchOk = !query || title.includes(query) || artist.includes(query);
				row.hidden = !(genreOk && searchOk);
			});
		};

		const activateRow = (row) => {
			rows.forEach((item) => item.classList.toggle("is-active", item === row));
			const title = row.getAttribute("data-title") || "";
			const artist = row.getAttribute("data-artist") || "";
			const visible = rows.filter((item) => !item.hidden);
			const idx = visible.indexOf(row);
			if (nowTitle) {
				nowTitle.textContent = title;
			}
			if (nowArtist) {
				nowArtist.textContent = artist;
			}
			if (nowIndex && idx >= 0) {
				nowIndex.textContent = String(idx + 1).padStart(2, "0");
			}
		};

		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				activeGenre = tab.getAttribute("data-setlist-tab") || "all";
				tabs.forEach((item) => {
					const on = item === tab;
					item.classList.toggle("is-active", on);
					item.setAttribute("aria-selected", on ? "true" : "false");
				});
				syncRows();
			});
		});

		search?.addEventListener("input", syncRows);

		const categoryBtn = artistSetlist.querySelector("[data-setlist-category]");
		if (categoryBtn && tabs.length) {
			categoryBtn.addEventListener("click", () => {
				const current = tabs.findIndex((tab) => tab.classList.contains("is-active"));
				const next = tabs[(current + 1) % tabs.length];
				next?.click();
				const label = categoryBtn.querySelector("span");
				if (label && next) {
					label.textContent = next.textContent?.trim() || "Select category";
				}
			});
		}

		rows.forEach((row) => {
			row.addEventListener("click", () => activateRow(row));
		});

		syncRows();

		if (lenis) {
			lenis.on("scroll", syncArtistSetlistPinnedState);
		} else {
			window.addEventListener("scroll", syncArtistSetlistPinnedState, { passive: true });
		}
		window.addEventListener("resize", () => {
			window.clearTimeout(setlistResizeTimer);
			setlistResizeTimer = window.setTimeout(() => {
				if (pinMobileMq.matches) {
					if (
						setlistMobileFitLocked &&
						Math.abs(window.innerWidth - setlistMobileFitWidth) > 80
					) {
						refreshArtistSetlistPinLayout();
						return;
					}
					if (!setlistMobileFitLocked) {
						refreshArtistSetlistPin();
					} else {
						syncArtistSetlistPinnedState();
					}
					return;
				}
				refreshArtistSetlistPinLayout();
			}, 150);
		}, { passive: true });
		window.addEventListener("load", () => {
			setlistMobilePinReady = true;
			resetSetlistMobilePin();
			refreshArtistSetlistPinLayout();
		});
		window.addEventListener("orientationchange", () => {
			resetSetlistMobilePin();
			setlistMobileFitWidth = window.innerWidth;
			window.setTimeout(refreshArtistSetlistPinLayout, 150);
		});
		window.addEventListener("excel-ent:header-state-change", () => {
			if (pinMobileMq.matches) {
				syncArtistSetlistPinnedState();
				return;
			}
			refreshArtistSetlistPinLayout();
		});

		if (typeof pinDesktopMq.addEventListener === "function") {
			pinDesktopMq.addEventListener("change", refreshArtistSetlistPinLayout);
			pinMobileMq.addEventListener("change", refreshArtistSetlistPinLayout);
		} else if (typeof pinDesktopMq.addListener === "function") {
			pinDesktopMq.addListener(refreshArtistSetlistPinLayout);
			pinMobileMq.addListener(refreshArtistSetlistPinLayout);
		}

		window.requestAnimationFrame(refreshArtistSetlistPin);
		if (document.fonts?.ready) {
			document.fonts.ready.then(refreshArtistSetlistPin);
		}
	}

	const artistMedia = document.querySelector("[data-artist-media]");
	if (artistMedia) {
		const artistMediaPin = document.querySelector("[data-artist-media-pin]");
		const mediaPinDesktopMq = window.matchMedia("(min-width: 1200px)");
		const mediaPinMobileMq = window.matchMedia("(max-width: 767px)");
		const isArtistMediaPinActive = () =>
			mediaPinDesktopMq.matches || mediaPinMobileMq.matches;

		const syncArtistMediaPin = () => {
			if (!artistMediaPin) {
				return;
			}

			if (!isArtistMediaPinActive()) {
				artistMediaPin.style.height = "";
				artistMedia.classList.remove("is-pinned", "is-viewport-fitted");
				artistMedia.style.removeProperty("height");
				artistMedia.style.removeProperty("--ee-artist-media-viewport-height");
				artistMedia.style.removeProperty("--ee-artist-media-fit-scale");
				artistMedia.style.removeProperty("--ee-artist-media-fit-pad-top");
				artistMedia.style.removeProperty("--ee-artist-media-fit-pad-bottom");
				artistMedia.style.removeProperty("--ee-artist-media-content-height");
				return;
			}

			artistMediaPin.style.height = "auto";
			artistMedia.classList.remove("is-viewport-fitted");
			artistMedia.style.removeProperty("height");
			artistMedia.style.removeProperty("--ee-artist-media-viewport-height");
			artistMedia.style.removeProperty("--ee-artist-media-fit-scale");
			artistMedia.style.removeProperty("--ee-artist-media-fit-pad-top");
			artistMedia.style.removeProperty("--ee-artist-media-fit-pad-bottom");
			artistMedia.style.removeProperty("--ee-artist-media-content-height");

			const pad = artistMediaPin.querySelector(".artist-media__scroll-pad");
			const padHeight = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionHeight = Math.ceil(artistMedia.getBoundingClientRect().height);
			const stickyTop =
				parseFloat(
					getComputedStyle(artistMedia).getPropertyValue(
						"--ee-artist-media-sticky-top"
					)
				) || 0;
			const availableHeight = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale =
				isArtistMediaPinActive() && mediaPinMobileMq.matches
					? Math.min(1, availableHeight / Math.max(sectionHeight, 1))
					: 1;

			if (fitScale < 1) {
				const styles = getComputedStyle(artistMedia);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				const contentHeight = Math.max(sectionHeight - padTop - padBottom, 0);

				artistMedia.style.setProperty(
					"--ee-artist-media-viewport-height",
					`${availableHeight}px`
				);
				artistMedia.style.setProperty(
					"--ee-artist-media-fit-scale",
					String(fitScale)
				);
				artistMedia.style.setProperty(
					"--ee-artist-media-fit-pad-top",
					`${padTop * fitScale}px`
				);
				artistMedia.style.setProperty(
					"--ee-artist-media-fit-pad-bottom",
					`${padBottom * fitScale}px`
				);
				artistMedia.style.setProperty(
					"--ee-artist-media-content-height",
					`${contentHeight}px`
				);
				artistMedia.classList.add("is-viewport-fitted");
			}

			const holdHeight = Math.round(window.innerHeight);
			artistMediaPin.style.height = `${
				padHeight + sectionHeight * fitScale + holdHeight
			}px`;
		};

		const syncArtistMediaPinnedState = () => {
			if (!artistMediaPin || !isArtistMediaPinActive()) {
				artistMedia.classList.remove("is-pinned");
				return;
			}

			const stickyTop =
				parseFloat(
					getComputedStyle(artistMedia).getPropertyValue(
						"--ee-artist-media-sticky-top"
					)
				) || 0;
			const sectionRect = artistMedia.getBoundingClientRect();
			const pinRect = artistMediaPin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, window.innerHeight - stickyTop) + 4;
			artistMedia.classList.toggle("is-pinned", pinned);
		};

		const refreshArtistMediaPin = () => {
			window.requestAnimationFrame(() => {
				syncArtistMediaPin();
				syncArtistMediaPinnedState();
			});
		};

		const tabs = Array.from(artistMedia.querySelectorAll("[data-media-tab]"));
		const panels = Array.from(artistMedia.querySelectorAll("[data-media-panel]"));
		const thumbs = Array.from(artistMedia.querySelectorAll("[data-media-thumb]"));
		const main = artistMedia.querySelector("[data-media-main]");
		const stage = artistMedia.querySelector(".artist-media__stage");
		const venue = artistMedia.querySelector("[data-media-venue]");
		const location = artistMedia.querySelector("[data-media-location]");
		const duration = artistMedia.querySelector("[data-media-duration]");
		const guests = artistMedia.querySelector("[data-media-guests]");
		let mediaBusy = false;

		const setTab = (name) => {
			tabs.forEach((item) => {
				const on = item.getAttribute("data-media-tab") === name;
				item.classList.toggle("is-active", on);
				item.setAttribute("aria-selected", on ? "true" : "false");
			});
			panels.forEach((panel) => {
				const on = panel.getAttribute("data-media-panel") === name;
				panel.classList.toggle("is-active", on);
				panel.hidden = !on;
			});
			refreshArtistMediaPin();
		};

		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				setTab(tab.getAttribute("data-media-tab") || "photos");
			});
		});

		const photosPanel = artistMedia.querySelector('[data-media-panel="photos"]');
		const photoProgress = artistMedia.querySelector("[data-media-progress-fill]");
		const photoSwipeMq = window.matchMedia("(max-width: 1199px)");
		let photoIndex = 0;
		let photoTrack = null;
		let photoTrackStep = 0;
		let photoTrackMaxOffset = 0;

		const buildPhotoSlides = () => {
			const slides = [];

			if (main?.getAttribute("src")) {
				slides.push({
					image: main.getAttribute("src"),
					venue: venue?.textContent?.trim() || "",
					location: location?.textContent?.trim() || "",
					duration: duration?.textContent?.trim() || "",
					guests: guests?.textContent?.trim() || "",
					thumb: null,
				});
			}

			thumbs.forEach((thumb) => {
				const image = thumb.getAttribute("data-image");
				if (!image) {
					return;
				}
				slides.push({
					image,
					venue: thumb.getAttribute("data-venue") || "",
					location: thumb.getAttribute("data-location") || "",
					duration: thumb.getAttribute("data-duration") || "",
					guests: thumb.getAttribute("data-guests") || "",
					thumb,
				});
			});

			return slides;
		};

		let photoSlides = buildPhotoSlides();

		const isPhotoSwipe = () => photoSwipeMq.matches;

		const getPhotoTrackStep = () => Math.max(stage?.offsetWidth || 0, 1);

		const rubberPhotoTrack = (offset) => {
			if (offset < 0) {
				return offset * 0.22;
			}
			if (offset > photoTrackMaxOffset) {
				return photoTrackMaxOffset + (offset - photoTrackMaxOffset) * 0.22;
			}
			return offset;
		};

		const applyPhotoTrackTransform = (offset, animate = true) => {
			if (!photoTrack) {
				return;
			}
			photoTrack.style.transition =
				animate && !reduced
					? "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
					: "none";
			photoTrack.style.transform = `translate3d(${-rubberPhotoTrack(offset)}px, 0, 0)`;
		};

		const measurePhotoTrack = () => {
			photoTrackStep = getPhotoTrackStep();
			photoTrackMaxOffset = Math.max(photoSlides.length - 1, 0) * photoTrackStep;
			return photoIndex * photoTrackStep;
		};

		const syncPhotoTrackPosition = (animate = true) => {
			if (!photoTrack) {
				return;
			}
			measurePhotoTrack();
			applyPhotoTrackTransform(photoIndex * photoTrackStep, animate);
		};

		const buildPhotoTrack = () => {
			if (!stage || !isPhotoSwipe() || !photoSlides.length) {
				return;
			}

			stage.classList.add("is-swipe-mode");
			if (main) {
				main.hidden = true;
				main.setAttribute("aria-hidden", "true");
			}

			if (!photoTrack) {
				photoTrack = document.createElement("div");
				photoTrack.className = "artist-media__track";
				photoTrack.setAttribute("data-media-track", "");
				stage.insertBefore(photoTrack, stage.firstChild);
			}

			photoTrack.replaceChildren();
			photoSlides.forEach((slide, i) => {
				const slideEl = document.createElement("div");
				slideEl.className = "artist-media__slide";
				const img = document.createElement("img");
				img.src = slide.image;
				img.alt = slide.venue || "";
				img.loading = i === photoIndex ? "eager" : "lazy";
				img.decoding = "async";
				img.draggable = false;
				slideEl.appendChild(img);
				photoTrack.appendChild(slideEl);
			});

			syncPhotoTrackPosition(false);
		};

		const destroyPhotoTrack = () => {
			if (!stage) {
				return;
			}
			stage.classList.remove("is-swipe-mode", "is-dragging");
			if (photoTrack) {
				photoTrack.remove();
				photoTrack = null;
			}
			if (main) {
				main.hidden = false;
				main.removeAttribute("aria-hidden");
			}
		};

		const syncPhotoSwipeMode = () => {
			if (isPhotoSwipe()) {
				buildPhotoTrack();
				return;
			}
			destroyPhotoTrack();
			const slide = photoSlides[photoIndex];
			if (main && slide?.image) {
				main.src = slide.image;
				main.setAttribute("src", slide.image);
			}
		};

		const slideToThumb = (slide) => ({
			getAttribute: (name) => {
				switch (name) {
					case "data-image":
						return slide.image;
					case "data-venue":
						return slide.venue;
					case "data-location":
						return slide.location;
					case "data-duration":
						return slide.duration;
					case "data-guests":
						return slide.guests;
					default:
						return "";
				}
			},
		});

		const updateMetaFromSlide = (slide) => {
			if (!slide) {
				return;
			}
			if (venue) {
				venue.textContent = slide.venue || "";
			}
			if (location) {
				location.textContent = slide.location || "";
			}
			if (duration) {
				duration.textContent = slide.duration || "";
			}
			if (guests) {
				guests.textContent = slide.guests || "";
			}
		};

		const updatePhotoProgress = () => {
			if (!photoProgress || !photoSlides.length) {
				return;
			}
			photoProgress.style.width = `${((photoIndex + 1) / photoSlides.length) * 100}%`;
		};

		const syncPhotoSelection = (slide) => {
			thumbs.forEach((item) => item.classList.toggle("is-selected", item === slide?.thumb));
		};

		const showPhoto = (nextIndex, options = {}) => {
			if (!photoSlides.length) {
				return;
			}
			const animate = options.animate !== false;
			photoIndex =
				((nextIndex % photoSlides.length) + photoSlides.length) % photoSlides.length;
			const slide = photoSlides[photoIndex];
			if (!slide) {
				return;
			}

			if (photoTrack && isPhotoSwipe()) {
				syncPhotoTrackPosition(animate);
				syncPhotoSelection(slide);
				updatePhotoProgress();
				return;
			}

			if (main && main.getAttribute("src") !== slide.image) {
				swapMainImage(slide.image, slideToThumb(slide));
			} else {
				updateMetaFromSlide(slide);
			}
			syncPhotoSelection(slide);
			updatePhotoProgress();
		};

		const goPhoto = (delta) => {
			showPhoto(photoIndex + delta);
		};

		const updateMeta = (thumb) => {
			if (!thumb) {
				return;
			}
			updateMetaFromSlide({
				venue: thumb.getAttribute("data-venue") || "",
				location: thumb.getAttribute("data-location") || "",
				duration: thumb.getAttribute("data-duration") || "",
				guests: thumb.getAttribute("data-guests") || "",
			});
		};

		const centerMediaStage = () => {
			if (!stage) {
				return;
			}

			const rect = stage.getBoundingClientRect();
			const headerHeight =
				header?.classList.contains("is-scrolled")
					? Math.ceil(header.getBoundingClientRect().height)
					: 0;
			const viewportTop = headerHeight + 20;
			const availableHeight = Math.max(window.innerHeight - viewportTop, 0);
			const targetTop =
				viewportTop + Math.max((availableHeight - rect.height) / 2, 0);
			const currentScroll = window.excelEntLenis?.scroll ?? window.scrollY ?? 0;
			const targetScroll = Math.max(0, currentScroll + rect.top - targetTop);

			if (window.excelEntLenis) {
				window.excelEntLenis.scrollTo(targetScroll, {
					duration: reduced ? 0 : 0.85,
				});
			} else {
				window.scrollTo({
					top: targetScroll,
					behavior: reduced ? "auto" : "smooth",
				});
			}
		};

		const swapMainImage = (src, thumb) => {
			if (!main || !src) {
				updateMeta(thumb);
				return;
			}

			const currentSrc = main.getAttribute("src") || "";
			if (currentSrc === src) {
				updateMeta(thumb);
				return;
			}

			if (reduced || !stage) {
				main.src = src;
				main.setAttribute("src", src);
				updateMeta(thumb);
				return;
			}

			if (mediaBusy) {
				main.src = src;
				main.setAttribute("src", src);
				updateMeta(thumb);
				return;
			}

			mediaBusy = true;
			stage.classList.add("is-meta-fading");

			const outgoing = main.cloneNode(true);
			outgoing.removeAttribute("data-media-main");
			outgoing.classList.add("is-outgoing");
			stage.insertBefore(outgoing, main);

			main.classList.add("is-enter");
			main.src = src;
			main.setAttribute("src", src);

			const finish = () => {
				outgoing.remove();
				main.classList.remove("is-enter", "is-visible");
				stage.classList.remove("is-meta-fading");
				mediaBusy = false;
			};

			window.requestAnimationFrame(() => {
				window.requestAnimationFrame(() => {
					outgoing.classList.add("is-exit");
					main.classList.add("is-visible");
					updateMeta(thumb);
					stage.classList.remove("is-meta-fading");
				});
			});

			window.setTimeout(finish, 480);
		};

		thumbs.forEach((thumb) => {
			thumb.addEventListener("click", () => {
				if (thumb.classList.contains("is-selected")) {
					return;
				}
				const idx = photoSlides.findIndex((slide) => slide.thumb === thumb);
				if (idx < 0) {
					return;
				}
				if (!isPhotoSwipe()) {
					centerMediaStage();
				}
				showPhoto(idx);
			});
		});

		if (stage && photosPanel) {
			let swipeActive = false;
			let swipeAxis = null;
			let swipeStartX = 0;
			let swipeStartY = 0;
			let swipeDeltaX = 0;
			let swipeBaseOffset = 0;
			let swipePointerId = null;
			let swipeSwiping = false;
			let swipeLastX = 0;
			let swipeLastT = 0;
			let swipeVelocity = 0;
			let photoLenisPaused = false;

			const pausePhotoLenis = () => {
				if (!photoLenisPaused && window.excelEntLenis) {
					window.excelEntLenis.stop();
					photoLenisPaused = true;
				}
			};

			const resumePhotoLenis = () => {
				if (photoLenisPaused && window.excelEntLenis) {
					window.excelEntLenis.start();
					photoLenisPaused = false;
				}
			};

			const beginPhotoSwipe = (clientX, clientY, id) => {
				if (!isPhotoSwipe() || !photoTrack) {
					return false;
				}
				swipeActive = true;
				swipePointerId = id;
				swipeStartX = clientX;
				swipeStartY = clientY;
				swipeLastX = clientX;
				swipeLastT = performance.now();
				swipeVelocity = 0;
				swipeDeltaX = 0;
				swipeAxis = null;
				swipeSwiping = false;
				swipeBaseOffset = measurePhotoTrack();
				pausePhotoLenis();
				return true;
			};

			const movePhotoSwipe = (clientX, clientY, event) => {
				if (!swipeActive || !photoTrack) {
					return;
				}

				const dx = clientX - swipeStartX;
				const dy = clientY - swipeStartY;
				const now = performance.now();
				const dt = Math.max(now - swipeLastT, 1);
				swipeVelocity = (clientX - swipeLastX) / dt;
				swipeLastX = clientX;
				swipeLastT = now;

				if (!swipeAxis) {
					const absX = Math.abs(dx);
					const absY = Math.abs(dy);
					if (absX < 8 && absY < 8) {
						return;
					}
					if (absY > absX && absY > 12) {
						swipeActive = false;
						swipePointerId = null;
						resumePhotoLenis();
						return;
					}
					if (absX >= absY) {
						swipeAxis = "x";
						swipeSwiping = true;
						stage.classList.add("is-dragging");
						if (
							event &&
							typeof event.pointerId === "number" &&
							event.pointerType !== "touch"
						) {
							try {
								stage.setPointerCapture(event.pointerId);
							} catch (err) {
								/* ignore */
							}
						}
					} else {
						return;
					}
				}

				if (swipeAxis !== "x") {
					return;
				}

				swipeDeltaX = dx;
				applyPhotoTrackTransform(swipeBaseOffset - swipeDeltaX, false);
				if (event?.cancelable) {
					event.preventDefault();
				}
			};

			const finishPhotoSwipe = () => {
				if (!swipeActive && !swipeSwiping) {
					resumePhotoLenis();
					stage.classList.remove("is-dragging");
					return;
				}

				swipeActive = false;
				swipePointerId = null;
				stage.classList.remove("is-dragging");
				resumePhotoLenis();

				if (swipeSwiping) {
					const threshold = Math.min(40, Math.max(24, photoTrackStep * 0.12));
					let nextIndex = photoIndex;
					if (
						Math.abs(swipeDeltaX) > threshold ||
						Math.abs(swipeVelocity) > 0.35
					) {
						if (swipeDeltaX < 0 || swipeVelocity < -0.35) {
							nextIndex = photoIndex + 1;
						} else if (swipeDeltaX > 0 || swipeVelocity > 0.35) {
							nextIndex = photoIndex - 1;
						}
					}
					showPhoto(nextIndex);

					const suppressClick = (ev) => {
						ev.preventDefault();
						ev.stopPropagation();
						stage.removeEventListener("click", suppressClick, true);
					};
					stage.addEventListener("click", suppressClick, true);
					window.setTimeout(() => {
						stage.removeEventListener("click", suppressClick, true);
					}, 500);
				} else {
					syncPhotoTrackPosition(true);
				}

				swipeSwiping = false;
				swipeDeltaX = 0;
				swipeAxis = null;
				swipeVelocity = 0;
			};

			stage.addEventListener(
				"touchstart",
				(e) => {
					if (!isPhotoSwipe() || e.touches.length !== 1) {
						return;
					}
					const touch = e.touches[0];
					beginPhotoSwipe(touch.clientX, touch.clientY, touch.identifier);
				},
				{ passive: true }
			);

			stage.addEventListener(
				"touchmove",
				(e) => {
					if (!swipeActive || !isPhotoSwipe() || e.touches.length !== 1) {
						return;
					}
					const touch = e.touches[0];
					if (
						swipePointerId !== null &&
						touch.identifier !== swipePointerId
					) {
						return;
					}
					movePhotoSwipe(touch.clientX, touch.clientY, e);
				},
				{ passive: false }
			);

			const onPhotoTouchEnd = (e) => {
				if (!swipeActive) {
					return;
				}
				const touch = e.changedTouches?.[0];
				if (
					touch &&
					swipePointerId !== null &&
					touch.identifier !== swipePointerId
				) {
					return;
				}
				finishPhotoSwipe();
			};

			stage.addEventListener("touchend", onPhotoTouchEnd, { passive: true });
			stage.addEventListener("touchcancel", onPhotoTouchEnd, { passive: true });

			stage.addEventListener("pointerdown", (e) => {
				if (!isPhotoSwipe() || e.pointerType === "touch") {
					return;
				}
				if (e.button !== 0) {
					return;
				}
				beginPhotoSwipe(e.clientX, e.clientY, e.pointerId);
			});

			stage.addEventListener("pointermove", (e) => {
				if (
					!swipeActive ||
					!isPhotoSwipe() ||
					e.pointerType === "touch" ||
					e.pointerId !== swipePointerId
				) {
					return;
				}
				movePhotoSwipe(e.clientX, e.clientY, e);
			});

			stage.addEventListener("pointerup", (e) => {
				if (e.pointerId !== swipePointerId) {
					return;
				}
				finishPhotoSwipe();
			});

			stage.addEventListener("pointercancel", (e) => {
				if (e.pointerId !== swipePointerId) {
					return;
				}
				finishPhotoSwipe();
			});

			stage.addEventListener("dragstart", (e) => e.preventDefault());

			syncPhotoSwipeMode();
			if (typeof photoSwipeMq.addEventListener === "function") {
				photoSwipeMq.addEventListener("change", syncPhotoSwipeMode);
			} else if (typeof photoSwipeMq.addListener === "function") {
				photoSwipeMq.addListener(syncPhotoSwipeMode);
			}
			window.addEventListener(
				"resize",
				() => {
					if (photoTrack) {
						syncPhotoTrackPosition(false);
					}
				},
				{ passive: true }
			);
		}

		updatePhotoProgress();

		if (lenis) {
			lenis.on("scroll", syncArtistMediaPinnedState);
		} else {
			window.addEventListener("scroll", syncArtistMediaPinnedState, { passive: true });
		}
		window.addEventListener("resize", refreshArtistMediaPin, { passive: true });
		window.addEventListener("load", refreshArtistMediaPin);
		window.addEventListener("excel-ent:header-state-change", refreshArtistMediaPin);

		if (typeof mediaPinDesktopMq.addEventListener === "function") {
			mediaPinDesktopMq.addEventListener("change", refreshArtistMediaPin);
			mediaPinMobileMq.addEventListener("change", refreshArtistMediaPin);
		} else if (typeof mediaPinDesktopMq.addListener === "function") {
			mediaPinDesktopMq.addListener(refreshArtistMediaPin);
			mediaPinMobileMq.addListener(refreshArtistMediaPin);
		}

		window.requestAnimationFrame(refreshArtistMediaPin);
		if (document.fonts?.ready) {
			document.fonts.ready.then(refreshArtistMediaPin);
		}
	}

	const artistSimilar = document.querySelector("[data-artist-similar]");
	if (artistSimilar) {
		const artistSimilarPin = document.querySelector("[data-artist-similar-pin]");
		const viewport = artistSimilar.querySelector(".artist-similar__viewport");
		const track = artistSimilar.querySelector("[data-similar-track]");
		const cards = Array.from(artistSimilar.querySelectorAll(".explore-artist-card"));
		const progress = artistSimilar.querySelector("[data-similar-progress]");
		const count = artistSimilar.querySelector("[data-similar-count]");
		const artistSimilarInner = artistSimilar.querySelector(".artist-similar__inner");
		const artistSimilarFooter = artistSimilar.querySelector(".artist-similar__footer");
		let index = 0;

		const similarPinDesktopMq = window.matchMedia("(min-width: 1200px)");
		const similarPinMobileMq = window.matchMedia("(max-width: 767px)");
		const similarTabletMq = window.matchMedia("(min-width: 768px) and (max-width: 1199px)");
		const isSimilarPinActive = () =>
			similarPinDesktopMq.matches || similarPinMobileMq.matches;
		const isSimilarMobileGrid = () => similarPinMobileMq.matches;
		const isSimilarTabletCarousel = () => similarTabletMq.matches;
		let similarMobileFitLocked = false;
		let similarMobileFitSnapshot = null;
		let similarMobileFitWidth = window.innerWidth;
		let similarMobilePinReady = false;
		let similarResizeTimer = 0;

		const resetSimilarMobilePin = () => {
			similarMobileFitLocked = false;
			similarMobileFitSnapshot = null;
			similarMobileFitWidth = window.innerWidth;
		};

		const applySimilarViewportFit = (snapshot) => {
			if (!artistSimilarPin || !snapshot) {
				return;
			}

			artistSimilar.classList.remove("is-viewport-fitted");
			artistSimilar.style.removeProperty("height");
			artistSimilar.style.removeProperty("--ee-artist-similar-viewport-height");
			artistSimilar.style.removeProperty("--ee-artist-similar-fit-scale");
			artistSimilar.style.removeProperty("--ee-artist-similar-fit-pad-top");
			artistSimilar.style.removeProperty("--ee-artist-similar-fit-pad-bottom");
			artistSimilar.style.removeProperty("--ee-artist-similar-content-height");

			if (snapshot.useFit) {
				artistSimilar.style.setProperty(
					"--ee-artist-similar-viewport-height",
					`${snapshot.fittedSectionHeight}px`
				);
				artistSimilar.style.setProperty(
					"--ee-artist-similar-fit-scale",
					String(snapshot.fitScale)
				);
				artistSimilar.style.setProperty(
					"--ee-artist-similar-fit-pad-top",
					`${snapshot.padTop * snapshot.fitScale}px`
				);
				artistSimilar.style.setProperty(
					"--ee-artist-similar-fit-pad-bottom",
					"0px"
				);
				artistSimilar.style.setProperty(
					"--ee-artist-similar-content-height",
					`${snapshot.contentHeight}px`
				);
				artistSimilar.classList.add("is-viewport-fitted");
			}

			artistSimilarPin.style.height = `${snapshot.pinHeight}px`;
		};

		const syncArtistSimilarPin = () => {
			if (!artistSimilarPin) {
				return;
			}

			if (!isSimilarPinActive()) {
				resetSimilarMobilePin();
				artistSimilarPin.style.height = "";
				artistSimilar.classList.remove("is-pinned", "is-viewport-fitted");
				artistSimilar.style.removeProperty("visibility");
				artistSimilar.style.removeProperty("height");
				artistSimilar.style.removeProperty("--ee-artist-similar-viewport-height");
				artistSimilar.style.removeProperty("--ee-artist-similar-fit-scale");
				artistSimilar.style.removeProperty("--ee-artist-similar-fit-pad-top");
				artistSimilar.style.removeProperty("--ee-artist-similar-fit-pad-bottom");
				artistSimilar.style.removeProperty("--ee-artist-similar-content-height");
				return;
			}

			if (!similarPinMobileMq.matches) {
				resetSimilarMobilePin();
			}

			const viewportWidth = window.innerWidth;
			if (
				similarPinMobileMq.matches &&
				similarMobileFitLocked &&
				Math.abs(viewportWidth - similarMobileFitWidth) > 80
			) {
				resetSimilarMobilePin();
			}

			if (
				similarPinMobileMq.matches &&
				similarMobileFitLocked &&
				similarMobileFitSnapshot
			) {
				applySimilarViewportFit(similarMobileFitSnapshot);
				return;
			}

			const preservePinLayout =
				artistSimilar.classList.contains("is-viewport-fitted") &&
				artistSimilarPin.style.height &&
				artistSimilarPin.style.height !== "auto";

			if (!preservePinLayout) {
				artistSimilarPin.style.height = "auto";
			}
			if (preservePinLayout) {
				artistSimilar.style.visibility = "hidden";
			}

			artistSimilar.classList.remove("is-viewport-fitted");
			artistSimilar.style.removeProperty("height");
			artistSimilar.style.removeProperty("--ee-artist-similar-viewport-height");
			artistSimilar.style.removeProperty("--ee-artist-similar-fit-scale");
			artistSimilar.style.removeProperty("--ee-artist-similar-fit-pad-top");
			artistSimilar.style.removeProperty("--ee-artist-similar-fit-pad-bottom");
			artistSimilar.style.removeProperty("--ee-artist-similar-content-height");

			const pad = artistSimilarPin.querySelector(".artist-similar__scroll-pad");
			const padHeight = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionStyles = getComputedStyle(artistSimilar);
			const padTop = parseFloat(sectionStyles.paddingTop) || 0;
			const padBottom = parseFloat(sectionStyles.paddingBottom) || 0;
			const sectionGap = parseFloat(sectionStyles.gap) || 0;
			const footerHeight = artistSimilarFooter
				? Math.ceil(artistSimilarFooter.getBoundingClientRect().height)
				: 0;
			const innerHeight = artistSimilarInner
				? Math.ceil(artistSimilarInner.scrollHeight)
				: Math.ceil(artistSimilar.scrollHeight);
			const sectionHeight = Math.ceil(
				padTop + innerHeight + sectionGap + footerHeight + padBottom
			);
			const stickyTop =
				parseFloat(
					getComputedStyle(artistSimilar).getPropertyValue(
						"--ee-artist-similar-sticky-top"
					)
				) || 0;
			const viewportHeight = window.visualViewport?.height || window.innerHeight;
			const availableHeight = Math.max(viewportHeight - stickyTop, 0);
			const reservedHeight = padTop + padBottom + sectionGap + footerHeight;
			const availableInnerHeight = Math.max(availableHeight - reservedHeight, 0);
			const fitScale = similarPinMobileMq.matches
				? Math.min(1, availableInnerHeight / Math.max(innerHeight, 1))
				: isSimilarPinActive()
					? Math.min(1, availableHeight / Math.max(sectionHeight, 1))
					: 1;
			const contentHeight = innerHeight;
			const useFit = fitScale < 0.999;
			const fittedInnerHeight = Math.ceil(innerHeight * fitScale);
			const fittedSectionHeight = Math.ceil(
				padTop * fitScale + fittedInnerHeight + sectionGap + footerHeight + padBottom
			);
			const holdHeight = Math.round(viewportHeight);
			const snapshot = {
				availableHeight,
				fitScale,
				padTop,
				padBottom,
				contentHeight,
				fittedSectionHeight,
				pinHeight: padHeight + fittedSectionHeight + holdHeight,
				useFit,
			};

			applySimilarViewportFit(snapshot);

			if (preservePinLayout) {
				artistSimilar.style.visibility = "";
			}

			if (
				similarPinMobileMq.matches &&
				similarMobilePinReady &&
				useFit
			) {
				similarMobileFitLocked = true;
				similarMobileFitSnapshot = snapshot;
				similarMobileFitWidth = viewportWidth;
			}
		};

		const syncArtistSimilarPinnedState = () => {
			if (!artistSimilarPin || !isSimilarPinActive()) {
				artistSimilar.classList.remove("is-pinned");
				return;
			}

			const stickyTop =
				parseFloat(
					getComputedStyle(artistSimilar).getPropertyValue(
						"--ee-artist-similar-sticky-top"
					)
				) || 0;
			const viewportHeight = window.visualViewport?.height || window.innerHeight;
			const sectionRect = artistSimilar.getBoundingClientRect();
			const pinRect = artistSimilarPin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, viewportHeight - stickyTop) + 4;
			artistSimilar.classList.toggle("is-pinned", pinned);
		};

		const refreshArtistSimilarPin = () => {
			window.requestAnimationFrame(() => {
				syncArtistSimilarPin();
				syncArtistSimilarPinnedState();
			});
		};

		const refreshArtistSimilarPinLayout = () => {
			if (similarPinMobileMq.matches) {
				resetSimilarMobilePin();
			}
			refreshArtistSimilarPin();
		};

		const syncSimilarProgressFromScroll = () => {
			if (!viewport || !cards.length) {
				return;
			}

			if (isSimilarMobileGrid()) {
				const maxScroll = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
				const ratio = maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0;

				if (progress) {
					progress.style.left = "0";
					const minWidth = maxScroll ? 8 : 100;
					progress.style.width = `${Math.max(ratio * 100, minWidth)}%`;
				}

				let leftmost = 0;
				let leftmostOffset = Infinity;
				const scrollLeft = viewport.scrollLeft;
				cards.forEach((card, i) => {
					const cardLeft = card.offsetLeft;
					if (cardLeft >= scrollLeft - 4 && cardLeft < leftmostOffset) {
						leftmostOffset = cardLeft;
						leftmost = i;
					}
				});
				if (leftmostOffset === Infinity) {
					let closest = 0;
					let closestDist = Infinity;
					cards.forEach((card, i) => {
						const dist = Math.abs(card.offsetLeft - scrollLeft);
						if (dist < closestDist) {
							closestDist = dist;
							closest = i;
						}
					});
					leftmost = closest;
				}
				index = leftmost;
				if (count) {
					count.textContent = `${leftmost + 1}/${cards.length}`;
				}
				return;
			}

			if (!isSimilarTabletCarousel()) {
				return;
			}

			const pad = parseFloat(getComputedStyle(viewport).paddingLeft) || 0;
			let closest = 0;
			let closestDist = Infinity;
			cards.forEach((card, i) => {
				const dist = Math.abs(card.offsetLeft - pad - viewport.scrollLeft);
				if (dist < closestDist) {
					closestDist = dist;
					closest = i;
				}
			});
			if (closest !== index) {
				index = closest;
				if (count) {
					count.textContent = `${index + 1}/${cards.length}`;
				}
				if (progress && cards.length) {
					const width = 100 / cards.length;
					progress.style.width = `${width}%`;
					progress.style.left = `${index * width}%`;
				}
			}
		};

		const update = () => {
			const max = Math.max(cards.length - 1, 0);
			index = Math.min(Math.max(index, 0), max);

			if (isSimilarMobileGrid()) {
				if (track) {
					track.style.transform = "";
				}
				syncSimilarProgressFromScroll();
			} else if (isSimilarTabletCarousel()) {
				if (track) {
					track.style.transform = "";
				}
				if (viewport && cards[index]) {
					const left =
						cards[index].offsetLeft -
						(parseFloat(getComputedStyle(viewport).paddingLeft) || 0);
					if (Math.abs(viewport.scrollLeft - left) > 2) {
						viewport.scrollTo({ left, behavior: "smooth" });
					}
				}
				if (count) {
					count.textContent = `${cards.length ? index + 1 : 0}/${cards.length}`;
				}
				if (progress && cards.length) {
					const width = 100 / cards.length;
					progress.style.width = `${width}%`;
					progress.style.left = `${index * width}%`;
				}
			} else if (track && cards[0]) {
				const gap = parseFloat(getComputedStyle(track).gap) || 50;
				const cardWidth = cards[0].getBoundingClientRect().width || 560;
				track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
				if (count) {
					count.textContent = `${cards.length ? index + 1 : 0}/${cards.length}`;
				}
				if (progress && cards.length) {
					const width = 100 / cards.length;
					progress.style.width = `${width}%`;
					progress.style.left = `${index * width}%`;
				}
			}
		};

		artistSimilar.querySelector("[data-similar-prev]")?.addEventListener("click", () => {
			if (!cards.length) {
				return;
			}
			index = (index - 1 + cards.length) % cards.length;
			update();
		});

		artistSimilar.querySelector("[data-similar-next]")?.addEventListener("click", () => {
			if (!cards.length) {
				return;
			}
			index = (index + 1) % cards.length;
			update();
		});

		artistSimilar.querySelectorAll("[data-explore-fav]").forEach((btn) => {
			btn.addEventListener("click", () => {
				const card = btn.closest(".explore-artist-card");
				const on = !(card?.classList.contains("is-favorited"));
				card?.classList.toggle("is-favorited", on);
				btn.setAttribute("aria-pressed", on ? "true" : "false");
			});
		});

		viewport?.addEventListener("scroll", () => {
			window.requestAnimationFrame(syncSimilarProgressFromScroll);
		}, { passive: true });

		if (lenis) {
			lenis.on("scroll", syncArtistSimilarPinnedState);
		} else {
			window.addEventListener("scroll", syncArtistSimilarPinnedState, { passive: true });
		}
		window.addEventListener("resize", () => {
			window.clearTimeout(similarResizeTimer);
			similarResizeTimer = window.setTimeout(() => {
				update();
				if (similarPinMobileMq.matches) {
					if (
						similarMobileFitLocked &&
						Math.abs(window.innerWidth - similarMobileFitWidth) > 80
					) {
						refreshArtistSimilarPinLayout();
						return;
					}
					if (!similarMobileFitLocked) {
						refreshArtistSimilarPin();
					} else {
						syncArtistSimilarPinnedState();
					}
					return;
				}
				refreshArtistSimilarPinLayout();
			}, 150);
		}, { passive: true });
		window.addEventListener("load", () => {
			similarMobilePinReady = true;
			resetSimilarMobilePin();
			refreshArtistSimilarPinLayout();
		});
		window.addEventListener("orientationchange", () => {
			resetSimilarMobilePin();
			similarMobileFitWidth = window.innerWidth;
			window.setTimeout(refreshArtistSimilarPinLayout, 150);
		});
		window.addEventListener("excel-ent:header-state-change", () => {
			if (similarPinMobileMq.matches) {
				syncArtistSimilarPinnedState();
				return;
			}
			refreshArtistSimilarPinLayout();
		});

		if (typeof similarPinDesktopMq.addEventListener === "function") {
			similarPinDesktopMq.addEventListener("change", () => {
				update();
				refreshArtistSimilarPinLayout();
			});
			similarPinMobileMq.addEventListener("change", () => {
				update();
				refreshArtistSimilarPinLayout();
			});
			similarTabletMq.addEventListener("change", () => {
				update();
				refreshArtistSimilarPinLayout();
			});
		} else if (typeof similarPinDesktopMq.addListener === "function") {
			similarPinDesktopMq.addListener(() => {
				update();
				refreshArtistSimilarPinLayout();
			});
			similarPinMobileMq.addListener(() => {
				update();
				refreshArtistSimilarPinLayout();
			});
			similarTabletMq.addListener(() => {
				update();
				refreshArtistSimilarPinLayout();
			});
		}

		window.requestAnimationFrame(refreshArtistSimilarPinLayout);
		if (document.fonts?.ready) {
			document.fonts.ready.then(refreshArtistSimilarPinLayout);
		}
		update();
	}

	document.querySelectorAll("[data-artist-fav]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const on = !btn.classList.contains("is-favorited");
			btn.classList.toggle("is-favorited", on);
			btn.setAttribute("aria-pressed", on ? "true" : "false");
		});
	});

	document.querySelectorAll("[data-artist-wishlist]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const on = !btn.classList.contains("is-active");
			btn.classList.toggle("is-active", on);
			btn.textContent = on
				? btn.getAttribute("data-label-added") || "IN WISHLIST"
				: btn.getAttribute("data-label-add") || "ADD TO WISHLIST";
		});
	});

	/* ---------- About approach slider ---------- */
	const aboutApproach = document.querySelector("[data-about-approach]");
	if (aboutApproach) {
		const viewport = aboutApproach.querySelector(".about-approach__viewport");
		const track = aboutApproach.querySelector("[data-about-approach-track]");
		const slides = Array.from(aboutApproach.querySelectorAll("[data-about-approach-slide]"));
		const dots = Array.from(aboutApproach.querySelectorAll("[data-about-approach-dot]"));
		const approachSwipeMq = window.matchMedia("(max-width: 767px)");
		let index = 0;
		let timer = 0;

		const goTo = (next) => {
			if (!slides.length || !track) {
				return;
			}
			index = ((next % slides.length) + slides.length) % slides.length;
			track.style.transform = `translateX(-${index * 100}%)`;
			slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
			dots.forEach((dot, i) => {
				const on = i === index;
				dot.classList.toggle("is-active", on);
				dot.setAttribute("aria-selected", on ? "true" : "false");
			});
		};

		const start = () => {
			if (reduced || slides.length < 2) {
				return;
			}
			window.clearInterval(timer);
			timer = window.setInterval(() => goTo(index + 1), 5000);
		};

		const stop = () => {
			window.clearInterval(timer);
			timer = 0;
		};

		dots.forEach((dot, i) => {
			dot.addEventListener("click", () => {
				goTo(i);
				start();
			});
		});

		goTo(0);
		start();

		if (viewport && track && slides.length > 1) {
			let swipeActive = false;
			let swipeAxis = null;
			let swipeStartX = 0;
			let swipeStartY = 0;
			let swipeDeltaX = 0;
			let swipePointerId = null;
			let swipeLenisPaused = false;

			const pauseApproachSwipeLenis = () => {
				if (!swipeLenisPaused && window.excelEntLenis) {
					window.excelEntLenis.stop();
					swipeLenisPaused = true;
				}
			};

			const resumeApproachSwipeLenis = () => {
				if (swipeLenisPaused && window.excelEntLenis) {
					window.excelEntLenis.start();
					swipeLenisPaused = false;
				}
			};

			const getApproachViewportWidth = () => viewport.offsetWidth || 0;

			const applyApproachDragTransform = (deltaX) => {
				const width = getApproachViewportWidth();
				track.style.transition = "none";
				track.style.transform = `translateX(${-(index * width) + deltaX}px)`;
			};

			const releaseApproachSwipePointer = (pointerId) => {
				if (pointerId == null) {
					return;
				}
				try {
					viewport.releasePointerCapture(pointerId);
				} catch (err) {
					/* ignore */
				}
			};

			const finishApproachSwipeGesture = (event) => {
				const wasHorizontal = swipeAxis === "x";
				if (event?.pointerId != null) {
					releaseApproachSwipePointer(event.pointerId);
				}

				track.style.transition = "";
				viewport.classList.remove("is-dragging");
				swipeActive = false;
				swipeAxis = null;
				swipePointerId = null;
				resumeApproachSwipeLenis();

				if (wasHorizontal) {
					const width = getApproachViewportWidth();
					const threshold = Math.min(48, Math.max(width * 0.15, 24));
					if (Math.abs(swipeDeltaX) > threshold) {
						goTo(index + (swipeDeltaX < 0 ? 1 : -1));
					} else {
						goTo(index);
					}
					start();
				}
				swipeDeltaX = 0;
			};

			viewport.addEventListener(
				"pointerdown",
				(e) => {
					if (!approachSwipeMq.matches || e.button > 0) {
						return;
					}
					stop();
					swipeActive = true;
					swipeAxis = null;
					swipePointerId = e.pointerId;
					swipeStartX = e.clientX;
					swipeStartY = e.clientY;
					swipeDeltaX = 0;
				},
				{ passive: true }
			);

			viewport.addEventListener(
				"pointermove",
				(e) => {
					if (!swipeActive || e.pointerId !== swipePointerId) {
						return;
					}

					const dx = e.clientX - swipeStartX;
					const dy = e.clientY - swipeStartY;

					if (!swipeAxis) {
						if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
							return;
						}
						if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 12) {
							swipeActive = false;
							swipePointerId = null;
							start();
							return;
						}
						if (Math.abs(dx) >= Math.abs(dy)) {
							swipeAxis = "x";
							viewport.classList.add("is-dragging");
							pauseApproachSwipeLenis();
							try {
								viewport.setPointerCapture(e.pointerId);
							} catch (err) {
								/* ignore */
							}
						} else {
							return;
						}
					}

					if (swipeAxis !== "x") {
						return;
					}

					swipeDeltaX = dx;
					applyApproachDragTransform(dx);
					if (e.cancelable) {
						e.preventDefault();
					}
				},
				{ passive: false }
			);

			viewport.addEventListener("pointerup", finishApproachSwipeGesture);
			viewport.addEventListener("pointercancel", finishApproachSwipeGesture);

			if (typeof approachSwipeMq.addEventListener === "function") {
				approachSwipeMq.addEventListener("change", () => {
					finishApproachSwipeGesture();
					goTo(index);
				});
			} else if (typeof approachSwipeMq.addListener === "function") {
				approachSwipeMq.addListener(() => {
					finishApproachSwipeGesture();
					goTo(index);
				});
			}

			slides.forEach((slide) => {
				const img = slide.querySelector("img");
				if (img) {
					img.setAttribute("draggable", "false");
				}
			});
		}
	}

	/* ---------- About reviews carousel + sticky pin ---------- */
	const aboutReviews = document.querySelector("[data-about-reviews]");
	if (aboutReviews) {
		const aboutReviewsPin = document.querySelector("[data-about-reviews-pin]");
		const track = aboutReviews.querySelector("[data-about-reviews-track]");
		const viewport = aboutReviews.querySelector(".about-reviews__viewport");
		const cards = Array.from(aboutReviews.querySelectorAll(".about-reviews__card"));
		const pages = Array.from(aboutReviews.querySelectorAll("[data-about-reviews-page]"));
		const scrollCarouselMq = window.matchMedia("(max-width: 1199px)");
		const aboutReviewsPinMobileMq = window.matchMedia("(max-width: 767px)");
		const aboutReviewsPinDesktopMq = window.matchMedia("(min-width: 768px)");
		const aboutReviewsFitDesktopMq = window.matchMedia("(min-width: 1200px)");
		let aboutReviewsMobileFitLocked = false;
		let aboutReviewsMobileFitSnapshot = null;
		let aboutReviewsMobileFitWidth = window.innerWidth;
		let aboutReviewsMobilePinReady = false;
		let aboutReviewsResizeTimer = 0;
		let page = 0;

		const resetAboutReviewsMobilePin = () => {
			aboutReviewsMobileFitLocked = false;
			aboutReviewsMobileFitSnapshot = null;
			aboutReviewsMobileFitWidth = window.innerWidth;
		};

		const aboutReviewsUnit = document.querySelector("[data-about-reviews-unit]");

		const getAboutReviewsFitEl = () =>
			aboutReviewsPinMobileMq.matches && aboutReviewsUnit
				? aboutReviewsUnit
				: aboutReviews;

		const clearAboutReviewsViewportFit = () => {
			[aboutReviews, aboutReviewsUnit].filter(Boolean).forEach((el) => {
				el.classList.remove("is-viewport-fitted", "is-mobile-fill", "is-pinned");
				el.style.removeProperty("height");
				el.style.removeProperty("--ee-about-reviews-available-height");
				el.style.removeProperty("--ee-about-reviews-viewport-height");
				el.style.removeProperty("--ee-about-reviews-fit-scale");
				el.style.removeProperty("--ee-about-reviews-fit-pad-top");
				el.style.removeProperty("--ee-about-reviews-fit-pad-bottom");
				el.style.removeProperty("--ee-about-reviews-content-height");
			});
		};

		const getAboutReviewsStickyTop = () => {
			const stickyEl = aboutReviewsUnit || aboutReviews;
			const fromVar =
				parseFloat(
					getComputedStyle(stickyEl).getPropertyValue(
						"--ee-about-reviews-sticky-top"
					)
				) || 0;
			if (fromVar > 0) {
				return fromVar;
			}
			const headerEl = document.querySelector(".site-header");
			return headerEl ? Math.ceil(headerEl.getBoundingClientRect().height) : 0;
		};

		const getAboutReviewsAvailableHeight = () =>
			getAboutMobileAvailableHeight(getAboutReviewsStickyTop());

		const applyAboutReviewsViewportFit = (snapshot) => {
			if (!snapshot) {
				return;
			}

			const fitEl = getAboutReviewsFitEl();
			if (
				aboutReviewsMobileFitLocked &&
				aboutReviewsMobileFitSnapshot === snapshot &&
				((snapshot.useFit && fitEl.classList.contains("is-viewport-fitted")) ||
					(snapshot.useFill && fitEl.classList.contains("is-mobile-fill")) ||
					(!snapshot.useFit &&
						!snapshot.useFill &&
						!fitEl.classList.contains("is-viewport-fitted") &&
						!fitEl.classList.contains("is-mobile-fill")))
			) {
				syncAboutReviewsPinnedState();
				return;
			}

			clearAboutReviewsViewportFit();

			fitEl.style.setProperty(
				"--ee-about-reviews-fit-scale",
				String(snapshot.fitScale || 1)
			);

			if (snapshot.useFit || snapshot.useFill) {
				fitEl.style.setProperty(
					"--ee-about-reviews-available-height",
					`${snapshot.availableHeight}px`
				);
			}

			if (snapshot.useFit) {
				fitEl.style.setProperty(
					"--ee-about-reviews-viewport-height",
					`${snapshot.availableHeight}px`
				);
				fitEl.classList.add("is-viewport-fitted");
			} else if (snapshot.useFill) {
				fitEl.classList.add("is-mobile-fill");
			}

			if (aboutReviewsPin && snapshot.pinHeight) {
				aboutReviewsPin.style.height = `${snapshot.pinHeight}px`;
			}

			syncAboutReviewsPinnedState();
		};

		const getAboutReviewsMobileHoldHeight = (viewportHeight) =>
			Math.round(viewportHeight);

		const syncAboutReviewsDesktopPin = () => {
			if (!aboutReviewsPin || !aboutReviewsPinDesktopMq.matches) {
				return;
			}

			aboutReviewsPin.style.height = "auto";
			clearAboutReviewsViewportFit();

			const pad = aboutReviewsPin.querySelector(".about-reviews__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(aboutReviews.getBoundingClientRect().height);
			const stickyTop = getAboutReviewsStickyTop();
			const availableH = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = aboutReviewsFitDesktopMq.matches
				? Math.min(1, availableH / Math.max(sectionH, 1))
				: 1;

			if (fitScale < 1) {
				const styles = getComputedStyle(aboutReviews);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				const contentHeight = Math.max(sectionH - padTop - padBottom, 0);

				applyAboutReviewsViewportFit({
					availableHeight: availableH,
					fitScale,
					padTop,
					padBottom,
					contentHeight,
					useFit: true,
					displaySectionHeight: Math.ceil(sectionH * fitScale),
					pinHeight: padH + Math.ceil(sectionH * fitScale) + Math.round(window.innerHeight),
				});
				return;
			}

			const holdPx = Math.round(window.innerHeight);
			aboutReviewsPin.style.height = `${padH + sectionH + holdPx}px`;
		};

		const syncAboutReviewsMobilePin = () => {
			if (!aboutReviewsPin || !aboutReviewsPinMobileMq.matches) {
				return;
			}

			const viewportWidth = window.innerWidth;
			if (
				aboutReviewsMobileFitLocked &&
				Math.abs(viewportWidth - aboutReviewsMobileFitWidth) > 80
			) {
				resetAboutReviewsMobilePin();
			}

			if (aboutReviewsMobileFitLocked && aboutReviewsMobileFitSnapshot) {
				applyAboutReviewsViewportFit(aboutReviewsMobileFitSnapshot);
				return;
			}

			aboutReviewsPin.style.height = "auto";
			clearAboutReviewsViewportFit();

			const pad = aboutReviewsPin.querySelector(".about-reviews__scroll-pad");
			const padHeight = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const fitTarget = aboutReviewsUnit || aboutReviews;
			const measure = measureAboutMobileStickyUnit(
				fitTarget,
				getAboutReviewsAvailableHeight
			);
			const holdHeight = getAboutReviewsMobileHoldHeight(getAboutMobileViewportHeight());
			const snapshot = buildAboutMobilePinSnapshot(measure, padHeight, holdHeight);

			applyAboutReviewsViewportFit(snapshot);

			if (!aboutReviewsMobileFitLocked && aboutMobilePinLayoutReady) {
				aboutReviewsMobileFitLocked = true;
				aboutReviewsMobileFitSnapshot = snapshot;
				aboutReviewsMobileFitWidth = viewportWidth;
			}
		};

		const syncAboutReviewsPin = () => {
			if (aboutReviewsPinMobileMq.matches) {
				syncAboutReviewsMobilePin();
				return;
			}

			resetAboutReviewsMobilePin();
			syncAboutReviewsDesktopPin();
		};

		const syncAboutReviewsPinnedState = () => {
			const stickyEl =
				aboutReviewsPinMobileMq.matches && aboutReviewsUnit
					? aboutReviewsUnit
					: aboutReviews;
			const pinActive =
				aboutReviewsPinMobileMq.matches || aboutReviewsPinDesktopMq.matches;

			if (!aboutReviewsPin || !pinActive) {
				stickyEl.classList.remove("is-pinned");
				return;
			}

			const stickyTop = getAboutReviewsStickyTop();
			const viewportHeight = getAboutMobileViewportHeight();
			const sectionRect = stickyEl.getBoundingClientRect();
			const pinRect = aboutReviewsPin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, viewportHeight - stickyTop) + 4;
			stickyEl.classList.toggle("is-pinned", pinned);
		};

		const refreshAboutReviewsPin = () => {
			window.requestAnimationFrame(() => {
				syncAboutReviewsPin();
				syncAboutReviewsPinnedState();
			});
		};

		const refreshAboutReviewsPinLayout = () => {
			if (aboutReviewsPinMobileMq.matches) {
				resetAboutReviewsMobilePin();
			}
			refreshAboutReviewsPin();
		};

		const reviewsMobileCarouselMq = window.matchMedia("(max-width: 767px)");
		const reviewsTabletCarouselMq = window.matchMedia(
			"(min-width: 768px) and (max-width: 1199px)"
		);

		const getPerPage = () => (scrollCarouselMq.matches ? 1 : 3);

		const getCarouselCards = () =>
			reviewsMobileCarouselMq.matches
				? cards.slice(0, Math.max(pages.length, 1))
				: cards;

		const getPageCount = () => {
			if (reviewsMobileCarouselMq.matches) {
				return Math.max(1, getCarouselCards().length);
			}
			return Math.max(1, Math.ceil(cards.length / getPerPage()));
		};

		const syncPager = (next) => {
			const pageCount = getPageCount();
			page = ((next % pageCount) + pageCount) % pageCount;
			pages.forEach((btn, i) => {
				const on = i === page;
				btn.classList.toggle("is-active", on);
				btn.setAttribute("aria-selected", on ? "true" : "false");
				btn.hidden = i >= pageCount;
			});
		};

		const getTrackGap = () =>
			track ? parseFloat(window.getComputedStyle(track).gap) || 0 : 0;

		const getTrackPad = () =>
			track ? parseFloat(window.getComputedStyle(track).paddingLeft) || 0 : 0;

		const getReviewsMobileStep = () => {
			const carouselCards = getCarouselCards();
			if (!carouselCards.length) {
				return 0;
			}
			return carouselCards[0].offsetWidth + getTrackGap();
		};

		const setReviewsTrackOffset = (offsetPx, instant) => {
			if (!track) {
				return;
			}
			track.style.transition = instant || reduced ? "none" : "";
			track.style.transform = `translateX(${offsetPx}px)`;
		};

		const goTo = (next, instant) => {
			if (!track || !cards.length) {
				return;
			}

			const pageCount = getPageCount();
			const target = ((next % pageCount) + pageCount) % pageCount;

			if (reviewsMobileCarouselMq.matches) {
				const step = getReviewsMobileStep();
				setReviewsTrackOffset(-target * step, instant);
				syncPager(target);
				return;
			}

			if (scrollCarouselMq.matches && viewport) {
				const card = cards[target * getPerPage()];
				if (card) {
					viewport.scrollTo({
						left: Math.max(0, card.offsetLeft - getTrackPad()),
						behavior: instant ? "auto" : "smooth",
					});
				}
				syncPager(target);
				return;
			}

			syncPager(target);
			track.style.transform = `translateX(-${target * 100}%)`;
		};

		pages.forEach((btn) => {
			btn.addEventListener("click", () => {
				const target = Number(btn.getAttribute("data-about-reviews-page") || "0");
				goTo(target);
			});
		});

		let dragging = false;
		let startX = 0;
		let currentX = 0;

		const onPointerDown = (e) => {
			if (scrollCarouselMq.matches) {
				return;
			}
			dragging = true;
			startX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
			currentX = startX;
		};

		const onPointerMove = (e) => {
			if (!dragging || scrollCarouselMq.matches) {
				return;
			}
			currentX = e.clientX || (e.touches && e.touches[0]?.clientX) || currentX;
		};

		const onPointerUp = () => {
			if (!dragging || scrollCarouselMq.matches) {
				dragging = false;
				return;
			}
			dragging = false;
			const delta = currentX - startX;
			if (Math.abs(delta) > 40) {
				goTo(page + (delta < 0 ? 1 : -1));
			}
		};

		const onScrollCarousel = () => {
			if (!reviewsTabletCarouselMq.matches || !viewport || !cards.length) {
				return;
			}
			const left = viewport.scrollLeft;
			const pad = getTrackPad();
			let closest = 0;
			let closestDist = Infinity;
			cards.forEach((card, i) => {
				const dist = Math.abs(card.offsetLeft - pad - left);
				if (dist < closestDist) {
					closestDist = dist;
					closest = i;
				}
			});
			syncPager(
				getPerPage() === 1 ? closest : Math.floor(closest / getPerPage())
			);
		};

		track?.addEventListener("mousedown", onPointerDown);
		track?.addEventListener("touchstart", onPointerDown, { passive: true });
		window.addEventListener("mousemove", onPointerMove, { passive: true });
		window.addEventListener("touchmove", onPointerMove, { passive: true });
		window.addEventListener("mouseup", onPointerUp);
		window.addEventListener("touchend", onPointerUp);
		viewport?.addEventListener("scroll", onScrollCarousel, { passive: true });

		if (viewport && getCarouselCards().length > 1) {
			let reviewsSwipeActive = false;
			let reviewsSwipeAxis = null;
			let reviewsSwipeStartX = 0;
			let reviewsSwipeStartY = 0;
			let reviewsSwipeStartScrollLeft = 0;
			let reviewsSwipeDeltaX = 0;
			let reviewsSwipePointerId = null;
			let reviewsSwipeLenisPaused = false;

			const pauseReviewsSwipeLenis = () => {
				if (!reviewsSwipeLenisPaused && window.excelEntLenis) {
					window.excelEntLenis.stop();
					reviewsSwipeLenisPaused = true;
				}
			};

			const resumeReviewsSwipeLenis = () => {
				if (reviewsSwipeLenisPaused && window.excelEntLenis) {
					window.excelEntLenis.start();
					reviewsSwipeLenisPaused = false;
				}
			};

			const releaseReviewsSwipePointer = (pointerId) => {
				if (pointerId == null) {
					return;
				}
				try {
					viewport.releasePointerCapture(pointerId);
				} catch (err) {
					/* ignore */
				}
			};

			const applyReviewsMobileDragTransform = (deltaX) => {
				const step = getReviewsMobileStep();
				setReviewsTrackOffset(-page * step + deltaX, true);
			};

			const snapReviewsViewport = (smooth = true) => {
				if (!reviewsTabletCarouselMq.matches || !cards.length) {
					return;
				}
				const left = viewport.scrollLeft;
				const pad = getTrackPad();
				let closest = 0;
				let closestDist = Infinity;
				cards.forEach((card, i) => {
					const targetLeft = Math.max(0, card.offsetLeft - pad);
					const dist = Math.abs(targetLeft - left);
					if (dist < closestDist) {
						closestDist = dist;
						closest = i;
					}
				});
				goTo(closest, !smooth);
			};

			const finishReviewsSwipeGesture = (event) => {
				const wasHorizontal = reviewsSwipeAxis === "x";
				if (event?.pointerId != null) {
					releaseReviewsSwipePointer(event.pointerId);
				}
				reviewsSwipeActive = false;
				reviewsSwipeAxis = null;
				reviewsSwipePointerId = null;
				viewport.classList.remove("is-dragging");
				resumeReviewsSwipeLenis();

				if (wasHorizontal && reviewsMobileCarouselMq.matches) {
					const step = getReviewsMobileStep();
					const threshold = Math.min(48, Math.max(step * 0.15, 24));
					if (Math.abs(reviewsSwipeDeltaX) > threshold) {
						goTo(page + (reviewsSwipeDeltaX < 0 ? 1 : -1));
					} else {
						goTo(page, false);
					}
				} else if (wasHorizontal) {
					snapReviewsViewport(true);
				}

				reviewsSwipeDeltaX = 0;
			};

			viewport.addEventListener(
				"pointerdown",
				(e) => {
					if (!scrollCarouselMq.matches || e.button > 0) {
						return;
					}
					reviewsSwipeActive = true;
					reviewsSwipeAxis = null;
					reviewsSwipePointerId = e.pointerId;
					reviewsSwipeStartX = e.clientX;
					reviewsSwipeStartY = e.clientY;
					reviewsSwipeStartScrollLeft = viewport.scrollLeft;
					reviewsSwipeDeltaX = 0;
				},
				{ passive: true }
			);

			viewport.addEventListener(
				"pointermove",
				(e) => {
					if (!reviewsSwipeActive || e.pointerId !== reviewsSwipePointerId) {
						return;
					}

					const dx = e.clientX - reviewsSwipeStartX;
					const dy = e.clientY - reviewsSwipeStartY;

					if (!reviewsSwipeAxis) {
						if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
							return;
						}
						if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 12) {
							reviewsSwipeActive = false;
							reviewsSwipePointerId = null;
							return;
						}
						if (Math.abs(dx) >= Math.abs(dy)) {
							reviewsSwipeAxis = "x";
							viewport.classList.add("is-dragging");
							pauseReviewsSwipeLenis();
							try {
								viewport.setPointerCapture(e.pointerId);
							} catch (err) {
								/* ignore */
							}
						} else {
							return;
						}
					}

					if (reviewsSwipeAxis !== "x") {
						return;
					}

					if (reviewsMobileCarouselMq.matches) {
						reviewsSwipeDeltaX = dx;
						applyReviewsMobileDragTransform(dx);
					} else {
						const maxScroll = Math.max(
							0,
							viewport.scrollWidth - viewport.clientWidth
						);
						viewport.scrollLeft = Math.min(
							maxScroll,
							Math.max(0, reviewsSwipeStartScrollLeft - dx)
						);
					}

					if (e.cancelable) {
						e.preventDefault();
					}
				},
				{ passive: false }
			);

			viewport.addEventListener("pointerup", finishReviewsSwipeGesture);
			viewport.addEventListener("pointercancel", finishReviewsSwipeGesture);

			if (typeof reviewsMobileCarouselMq.addEventListener === "function") {
				reviewsMobileCarouselMq.addEventListener("change", () => {
					finishReviewsSwipeGesture();
					goTo(page, true);
				});
			} else if (typeof reviewsMobileCarouselMq.addListener === "function") {
				reviewsMobileCarouselMq.addListener(() => {
					finishReviewsSwipeGesture();
					goTo(page, true);
				});
			}
		}

		const onResize = () => {
			if (reviewsMobileCarouselMq.matches) {
				goTo(page, true);
			} else if (scrollCarouselMq.matches) {
				if (track) {
					track.style.transform = "";
				}
				onScrollCarousel();
			} else {
				goTo(page);
			}
			if (aboutReviewsPinMobileMq.matches && aboutReviewsMobileFitLocked) {
				if (Math.abs(window.innerWidth - aboutReviewsMobileFitWidth) > 80) {
					refreshAboutReviewsPinLayout();
				} else {
					syncAboutReviewsPinnedState();
				}
				return;
			}
			refreshAboutReviewsPinLayout();
		};
		scrollCarouselMq.addEventListener("change", onResize);
		let aboutReviewsLastResizeWidth = window.innerWidth;
		window.addEventListener("resize", () => {
			const w = window.innerWidth;
			if (aboutReviewsPinMobileMq.matches && aboutReviewsMobileFitLocked && w === aboutReviewsLastResizeWidth) {
				syncAboutReviewsPinnedState();
				return;
			}
			aboutReviewsLastResizeWidth = w;
			window.clearTimeout(aboutReviewsResizeTimer);
			aboutReviewsResizeTimer = window.setTimeout(onResize, 120);
		}, { passive: true });

		if (typeof aboutReviewsPinMobileMq.addEventListener === "function") {
			aboutReviewsPinMobileMq.addEventListener("change", refreshAboutReviewsPinLayout);
		} else if (typeof aboutReviewsPinMobileMq.addListener === "function") {
			aboutReviewsPinMobileMq.addListener(refreshAboutReviewsPinLayout);
		}

		if (typeof aboutReviewsPinDesktopMq.addEventListener === "function") {
			aboutReviewsPinDesktopMq.addEventListener("change", refreshAboutReviewsPinLayout);
		} else if (typeof aboutReviewsPinDesktopMq.addListener === "function") {
			aboutReviewsPinDesktopMq.addListener(refreshAboutReviewsPinLayout);
		}

		if (typeof aboutReviewsFitDesktopMq.addEventListener === "function") {
			aboutReviewsFitDesktopMq.addEventListener("change", refreshAboutReviewsPin);
		} else if (typeof aboutReviewsFitDesktopMq.addListener === "function") {
			aboutReviewsFitDesktopMq.addListener(refreshAboutReviewsPin);
		}

		if (lenis) {
			lenis.on("scroll", () =>
				scheduleAboutMobilePinnedState(syncAboutReviewsPinnedState)
			);
		} else {
			window.addEventListener(
				"scroll",
				() => scheduleAboutMobilePinnedState(syncAboutReviewsPinnedState),
				{ passive: true }
			);
		}

		window.addEventListener("excel-ent:header-state-change", () => {
			if (aboutReviewsPinMobileMq.matches && aboutReviewsMobileFitLocked) {
				return;
			}
			if (aboutReviewsPinMobileMq.matches) {
				resetAboutReviewsMobilePin();
			}
			refreshAboutReviewsPinLayout();
		});

		bindAboutMobilePinViewportGuard(
			aboutReviewsPinMobileMq,
			resetAboutReviewsMobilePin,
			refreshAboutReviewsPinLayout
		);

		goTo(0, true);
		window.addEventListener("load", () => {
			aboutReviewsMobilePinReady = true;
			if (aboutReviewsPinMobileMq.matches && aboutReviewsMobileFitLocked) return;
			const fitTarget = aboutReviewsUnit || aboutReviews;
			const naturalHeight = Math.ceil(fitTarget.scrollHeight);
			const snapNatural = aboutReviewsMobileFitSnapshot?.naturalSectionHeight;
			if (
				!aboutReviewsMobileFitLocked ||
				(snapNatural && Math.abs(naturalHeight - snapNatural) > 32)
			) {
				resetAboutReviewsMobilePin();
				refreshAboutReviewsPinLayout();
			}
			goTo(page, true);
		});

		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				if (aboutReviewsPinMobileMq.matches && aboutReviewsMobileFitLocked) {
					goTo(page, true);
					return;
				}
				const fitTarget = aboutReviewsUnit || aboutReviews;
				const naturalHeight = Math.ceil(fitTarget.scrollHeight);
				const snapNatural = aboutReviewsMobileFitSnapshot?.naturalSectionHeight;
				if (
					!aboutReviewsMobileFitLocked ||
					(snapNatural && Math.abs(naturalHeight - snapNatural) > 32)
				) {
					refreshAboutReviewsPinLayout();
				}
				goTo(page, true);
			});
		}

		window.setTimeout(() => {
			if (aboutReviewsPinMobileMq.matches && aboutReviewsMobileFitLocked) {
				goTo(page, true);
				return;
			}
			refreshAboutReviewsPinLayout();
			goTo(page, true);
		}, 250);
	}

	/* ---------- Contact quick mobile sticky pin + viewport fit ---------- */
	const contactQuick = document.getElementById("quick-contacts");
	if (contactQuick) {
		const contactQuickPin = document.querySelector("[data-contact-quick-pin]");
		const contactQuickUnit = document.querySelector("[data-contact-quick-unit]");
		const contactQuickMobileMq = window.matchMedia("(max-width: 767px)");
		let contactQuickMobileFitLocked = false;
		let contactQuickMobileFitSnapshot = null;
		let contactQuickMobileFitWidth = window.innerWidth;
		let contactQuickResizeTimer = 0;

		const resetContactQuickMobilePin = () => {
			contactQuickMobileFitLocked = false;
			contactQuickMobileFitSnapshot = null;
			contactQuickMobileFitWidth = window.innerWidth;
		};

		const clearContactQuickViewportFit = () => {
			[contactQuick, contactQuickUnit].filter(Boolean).forEach((el) => {
				el.classList.remove("is-viewport-fitted", "is-pinned");
				el.style.removeProperty("height");
				el.style.removeProperty("--ee-contact-quick-available-height");
				el.style.removeProperty("--ee-contact-quick-viewport-height");
				el.style.removeProperty("--ee-contact-quick-fit-scale");
				el.style.removeProperty("--ee-contact-quick-fit-pad-top");
				el.style.removeProperty("--ee-contact-quick-fit-pad-bottom");
				el.style.removeProperty("--ee-contact-quick-content-height");
			});
			if (contactQuickPin) {
				contactQuickPin.style.height = "";
			}
		};

		const getContactQuickStickyTop = () => {
			const stickyEl = contactQuickUnit || contactQuick;
			const fromVar =
				parseFloat(
					getComputedStyle(stickyEl).getPropertyValue(
						"--ee-contact-quick-sticky-top"
					)
				) || 0;
			if (fromVar > 0) {
				return fromVar;
			}
			const headerEl = document.querySelector(".site-header");
			return headerEl ? Math.ceil(headerEl.getBoundingClientRect().height) : 0;
		};

		const getContactQuickAvailableHeight = () =>
			getAboutMobileAvailableHeight(getContactQuickStickyTop());

		const applyContactQuickViewportFit = (snapshot) => {
			if (!snapshot) {
				return;
			}

			const fitEl = contactQuickUnit || contactQuick;
			if (
				contactQuickMobileFitLocked &&
				contactQuickMobileFitSnapshot === snapshot &&
				fitEl.classList.contains("is-viewport-fitted")
			) {
				syncContactQuickPinnedState();
				return;
			}

			clearContactQuickViewportFit();

			fitEl.style.setProperty(
				"--ee-contact-quick-available-height",
				`${snapshot.availableHeight}px`
			);
			fitEl.style.setProperty(
				"--ee-contact-quick-viewport-height",
				`${snapshot.availableHeight}px`
			);
			fitEl.style.setProperty(
				"--ee-contact-quick-fit-scale",
				String(snapshot.fitScale)
			);
			fitEl.style.setProperty(
				"--ee-contact-quick-fit-pad-top",
				`${snapshot.padTop * snapshot.fitScale}px`
			);
			fitEl.style.setProperty(
				"--ee-contact-quick-fit-pad-bottom",
				`${snapshot.padBottom * snapshot.fitScale}px`
			);
			if (snapshot.contentHeight) {
				fitEl.style.setProperty(
					"--ee-contact-quick-content-height",
					`${snapshot.contentHeight}px`
				);
			}
			fitEl.classList.add("is-viewport-fitted");

			if (contactQuickPin && snapshot.pinHeight) {
				contactQuickPin.style.height = `${snapshot.pinHeight}px`;
			}

			syncContactQuickPinnedState();
		};

		const syncContactQuickMobilePin = () => {
			if (!contactQuickPin || !contactQuickMobileMq.matches) {
				return;
			}

			const viewportWidth = window.innerWidth;
			if (
				contactQuickMobileFitLocked &&
				Math.abs(viewportWidth - contactQuickMobileFitWidth) > 80
			) {
				resetContactQuickMobilePin();
			}

			if (contactQuickMobileFitLocked && contactQuickMobileFitSnapshot) {
				applyContactQuickViewportFit(contactQuickMobileFitSnapshot);
				return;
			}

			if (contactQuickPin) {
				contactQuickPin.style.height = "auto";
			}
			clearContactQuickViewportFit();

			const pad = contactQuickPin.querySelector(".contact-quick__scroll-pad");
			const padHeight = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const fitTarget = contactQuickUnit || contactQuick;
			const measure = measureAboutMobileStickyUnit(
				fitTarget,
				getContactQuickAvailableHeight
			);
			const fittedHeight = Math.ceil(measure.availableHeight);
			const holdHeight = Math.max(
				180,
				Math.round(getAboutMobileViewportHeight() - fittedHeight)
			);
			const snapshot = buildAboutMobilePinSnapshot(measure, padHeight, holdHeight);

			applyContactQuickViewportFit(snapshot);

			if (!contactQuickMobileFitLocked && aboutMobilePinLayoutReady) {
				contactQuickMobileFitLocked = true;
				contactQuickMobileFitSnapshot = snapshot;
				contactQuickMobileFitWidth = viewportWidth;
			}
		};

		const syncContactQuickPin = () => {
			if (!contactQuickMobileMq.matches) {
				resetContactQuickMobilePin();
				if (contactQuickPin) {
					contactQuickPin.style.height = "";
				}
				clearContactQuickViewportFit();
				return;
			}
			syncContactQuickMobilePin();
		};

		const syncContactQuickPinnedState = () => {
			const stickyEl = contactQuickUnit || contactQuick;
			if (!contactQuickPin || !contactQuickMobileMq.matches) {
				stickyEl.classList.remove("is-pinned");
				return;
			}

			const stickyTop = getContactQuickStickyTop();
			const viewportHeight = getAboutMobileViewportHeight();
			const sectionRect = stickyEl.getBoundingClientRect();
			const pinRect = contactQuickPin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, viewportHeight - stickyTop) + 4;
			stickyEl.classList.toggle("is-pinned", pinned);
		};

		const refreshContactQuickPin = () => {
			window.requestAnimationFrame(() => {
				syncContactQuickPin();
				syncContactQuickPinnedState();
			});
		};

		const refreshContactQuickPinLayout = () => {
			if (contactQuickMobileMq.matches) {
				resetContactQuickMobilePin();
			}
			refreshContactQuickPin();
		};

		if (lenis) {
			lenis.on("scroll", () =>
				scheduleAboutMobilePinnedState(syncContactQuickPinnedState)
			);
		} else {
			window.addEventListener(
				"scroll",
				() => scheduleAboutMobilePinnedState(syncContactQuickPinnedState),
				{ passive: true }
			);
		}

		window.addEventListener("resize", () => {
			window.clearTimeout(contactQuickResizeTimer);
			contactQuickResizeTimer = window.setTimeout(() => {
				if (contactQuickMobileMq.matches) {
					if (
						contactQuickMobileFitLocked &&
						Math.abs(window.innerWidth - contactQuickMobileFitWidth) > 80
					) {
						refreshContactQuickPinLayout();
						return;
					}
					if (!contactQuickMobileFitLocked) {
						refreshContactQuickPin();
					} else {
						syncContactQuickPinnedState();
					}
					return;
				}
				refreshContactQuickPinLayout();
			}, 150);
		}, { passive: true });

		window.addEventListener("load", () => {
			const fitTarget = contactQuickUnit || contactQuick;
			const naturalHeight = Math.ceil(fitTarget.scrollHeight);
			const snapNatural = contactQuickMobileFitSnapshot?.naturalSectionHeight;
			if (
				!contactQuickMobileFitLocked ||
				(snapNatural && Math.abs(naturalHeight - snapNatural) > 32)
			) {
				resetContactQuickMobilePin();
				refreshContactQuickPinLayout();
			}
		});

		window.addEventListener("orientationchange", () => {
			resetContactQuickMobilePin();
			contactQuickMobileFitWidth = window.innerWidth;
			window.setTimeout(refreshContactQuickPinLayout, 150);
		});

		window.addEventListener("excel-ent:header-state-change", () => {
			if (contactQuickMobileMq.matches) {
				resetContactQuickMobilePin();
			}
			refreshContactQuickPinLayout();
		});

		bindAboutMobilePinViewportGuard(
			contactQuickMobileMq,
			resetContactQuickMobilePin,
			refreshContactQuickPinLayout
		);

		if (typeof contactQuickMobileMq.addEventListener === "function") {
			contactQuickMobileMq.addEventListener("change", refreshContactQuickPinLayout);
		} else if (typeof contactQuickMobileMq.addListener === "function") {
			contactQuickMobileMq.addListener(refreshContactQuickPinLayout);
		}

		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				const fitTarget = contactQuickUnit || contactQuick;
				const naturalHeight = Math.ceil(fitTarget.scrollHeight);
				const snapNatural = contactQuickMobileFitSnapshot?.naturalSectionHeight;
				if (
					!contactQuickMobileFitLocked ||
					(snapNatural && Math.abs(naturalHeight - snapNatural) > 32)
				) {
					refreshContactQuickPinLayout();
				}
			});
		}

		window.requestAnimationFrame(refreshContactQuickPin);
		window.setTimeout(refreshContactQuickPinLayout, 250);
	}

	/* ---------- Package tabs ---------- */
	const packageTabs = document.querySelector("[data-package-tabs]");
	if (packageTabs) {
		const tabs = Array.from(packageTabs.querySelectorAll("[data-package-tab]"));
		const panels = Array.from(packageTabs.querySelectorAll("[data-package-panel]"));
		const packageCards = Array.from(packageTabs.querySelectorAll("[data-package-card]"));
		const packageScrollers = Array.from(packageTabs.querySelectorAll(".package-grid-wrap"));
		const packageDesktopMq = window.matchMedia("(min-width: 1200px)");
		const packageIntroFitMq = window.matchMedia("(min-width: 1200px)");
		const packageIntroMobileMq = window.matchMedia("(max-width: 767px)");
		let packageIntroFitLocked = false;
		let packageIntroMobileFitLocked = false;
		let packageIntroMobileFitSnapshot = null;
		let packageIntroMobileFitWidth = window.innerWidth;

		const resetPackageIntroMobileFit = () => {
			packageIntroMobileFitLocked = false;
			packageIntroMobileFitSnapshot = null;
			packageIntroMobileFitWidth = window.innerWidth;
		};

		const clearPackageIntroViewportFit = () => {
			packageIntroFitLocked = false;
			resetPackageIntroMobileFit();
			packageTabs.classList.remove("is-viewport-fitted");
			packageTabs.style.removeProperty("height");
			packageTabs.style.removeProperty("--ee-package-intro-viewport-height");
			packageTabs.style.removeProperty("--ee-package-intro-fit-scale");
			packageTabs.style.removeProperty("--ee-package-intro-fit-pad-top");
			packageTabs.style.removeProperty("--ee-package-intro-fit-pad-bottom");
			packageTabs.style.removeProperty("--ee-package-intro-content-height");
		};

		const getPackageIntroAvailableHeight = () => {
			const header = document.querySelector(".site-header");
			const headerHeight = header
				? Math.ceil(header.getBoundingClientRect().height)
				: 0;
			return getAboutMobileAvailableHeight(headerHeight);
		};

		const applyPackageIntroMobileViewportFit = (snapshot) => {
			if (!snapshot) {
				return;
			}

			packageTabs.style.setProperty(
				"--ee-package-intro-viewport-height",
				`${snapshot.availableHeight}px`
			);
			packageTabs.style.setProperty(
				"--ee-package-intro-fit-scale",
				String(snapshot.fitScale)
			);
			packageTabs.style.setProperty(
				"--ee-package-intro-fit-pad-top",
				`${snapshot.padTop * snapshot.fitScale}px`
			);
			packageTabs.style.setProperty(
				"--ee-package-intro-fit-pad-bottom",
				`${snapshot.padBottom * snapshot.fitScale}px`
			);
			if (snapshot.contentHeight) {
				packageTabs.style.setProperty(
					"--ee-package-intro-content-height",
					`${snapshot.contentHeight}px`
				);
			}
			packageTabs.classList.add("is-viewport-fitted");
		};

		const syncPackageRail = (scroller) => {
			if (!scroller) {
				return;
			}
			const panel = scroller.closest("[data-package-panel]");
			const rail = panel?.querySelector(".package-grid__rail");
			const thumb = rail?.querySelector("span");
			if (!rail || !thumb) {
				return;
			}

			const maxScroll = Math.max(scroller.scrollHeight - scroller.clientHeight, 0);
			const maxOffset = Math.max(rail.clientHeight - thumb.offsetHeight, 0);
			const progress = maxScroll ? scroller.scrollTop / maxScroll : 0;
			thumb.style.top = `${progress * maxOffset}px`;
		};

		packageScrollers.forEach((scroller) => {
			scroller.addEventListener("scroll", () => syncPackageRail(scroller), {
				passive: true,
			});
			window.requestAnimationFrame(() => syncPackageRail(scroller));
		});

		const selectPackageCard = (card) => {
			const panel = card?.closest("[data-package-panel]");
			if (!panel || !card) {
				return;
			}
			panel.querySelectorAll("[data-package-card]").forEach((item) => {
				item.classList.toggle("is-selected", item === card);
			});

			const selectedTitle = panel.querySelector(".package-selected__copy h2");
			const selectedPrice = panel.querySelector(".package-selected__copy p");
			const selectedButton = panel.querySelector(".package-selected__btn");
			const cardEnquiry = card.querySelector("[data-package-enquiry]");
			const packageName = card.dataset.packageName || "";
			const packagePrice = card.dataset.packagePrice || "";

			if (selectedTitle) {
				selectedTitle.textContent = packageName;
			}
			if (selectedPrice) {
				selectedPrice.textContent = `Prices start from: ${packagePrice}`;
			}
			if (selectedButton) {
				selectedButton.dataset.packageName =
					cardEnquiry?.dataset.packageName || packageName;
				selectedButton.dataset.packageLabel =
					cardEnquiry?.dataset.packageLabel || `${packageName} from ${packagePrice}`;
			}
		};

		const readMoreLabel = packageTabs.dataset.readMore || "Read more";
		const readLessLabel = packageTabs.dataset.readLess || "Read less";

		const isPackageDesktopExpandMode = () => {
			if (!packageDesktopMq.matches) {
				return false;
			}
			const grid = packageTabs.querySelector(".package-panel.is-active .package-grid");
			if (!grid) {
				return false;
			}
			const columns = getComputedStyle(grid).gridTemplateColumns
				.split(/\s+/)
				.filter(Boolean);
			return columns.length >= 4;
		};

		let packageIntroPlaceholder = null;

		const syncPackageExpandedLayout = () => {
			const header = document.querySelector(".site-header");
			const headerHeight = header ? Math.ceil(header.offsetHeight) : 0;

			packageTabs.style.setProperty("--ee-package-sticky-top", `${headerHeight}px`);

			if (!packageTabs.classList.contains("has-expanded-card")) {
				packageTabs.style.removeProperty("--ee-package-expanded-height");
				document.body.classList.remove("package-card-expanded-open");
				document.documentElement.classList.remove("package-card-expanded-open");
				if (packageIntroPlaceholder) {
					packageIntroPlaceholder.remove();
					packageIntroPlaceholder = null;
				}
				delete packageTabs.dataset.naturalHeight;
				return;
			}

			if (!packageIntroPlaceholder) {
				packageIntroPlaceholder = document.createElement("div");
				packageIntroPlaceholder.className = "package-intro__placeholder";
				packageIntroPlaceholder.setAttribute("aria-hidden", "true");
				packageTabs.insertAdjacentElement("beforebegin", packageIntroPlaceholder);
			}
			const placeholderHeight = Number.parseInt(
				packageTabs.dataset.naturalHeight || "",
				10
			);
			packageIntroPlaceholder.style.height = `${placeholderHeight || packageTabs.offsetHeight}px`;

			const availableHeight = Math.max(window.innerHeight - headerHeight, 0);
			packageTabs.style.setProperty("--ee-package-expanded-height", `${availableHeight}px`);

			const currentScroll = window.excelEntLenis?.scroll ?? window.scrollY ?? 0;
			const targetScroll = Math.max(
				0,
				packageTabs.getBoundingClientRect().top + currentScroll - headerHeight
			);

			if (Math.abs(currentScroll - targetScroll) > 2) {
				if (window.excelEntLenis) {
					window.excelEntLenis.scrollTo(targetScroll, { immediate: true });
				} else {
					window.scrollTo(0, targetScroll);
				}
			}

			document.body.classList.add("package-card-expanded-open");
			document.documentElement.classList.add("package-card-expanded-open");
		};

		const setPackageCardExpanded = (card, expanded) => {
			const btn = card.querySelector("[data-package-more]");
			const label = btn?.querySelector("[data-package-more-label]");
			const addIcon = btn?.querySelector(".package-card__more-icon--add");
			const removeIcon = btn?.querySelector(".package-card__more-icon--remove");
			const body = card.querySelector(".package-card__body");

			card.classList.toggle("is-expanded", expanded);
			if (btn) {
				btn.setAttribute("aria-expanded", expanded ? "true" : "false");
			}
			if (label) {
				label.textContent = expanded ? readLessLabel : readMoreLabel;
			}
			if (addIcon) {
				addIcon.hidden = expanded;
			}
			if (removeIcon) {
				removeIcon.hidden = !expanded;
			}
			if (!expanded && body) {
				body.scrollTop = 0;
			}
		};

		const collapsePackageCard = (card) => {
			if (!card) {
				return;
			}
			setPackageCardExpanded(card, false);
		};

		const collapseAllPackageCards = () => {
			packageCards.forEach((card) => collapsePackageCard(card));
			packageTabs.classList.remove("has-expanded-card");
			syncPackageExpandedLayout();
		};

		const expandPackageCard = (card) => {
			const panel = card.closest("[data-package-panel]");
			if (!isPackageDesktopExpandMode()) {
				panel?.querySelectorAll("[data-package-card].is-expanded").forEach((item) => {
					if (item !== card) {
						collapsePackageCard(item);
					}
				});
			}
			clearPackageIntroViewportFit();
			const introHeight = Math.ceil(packageTabs.offsetHeight);
			setPackageCardExpanded(card, true);
			card.classList.add("is-visible", "in");
			selectPackageCard(card);
			packageTabs.dataset.naturalHeight = String(introHeight);
			packageTabs.classList.add("has-expanded-card");
			window.requestAnimationFrame(() => {
				syncPackageExpandedLayout();
				window.requestAnimationFrame(() => {
					card.querySelector(".package-card__body")?.scrollTo(0, 0);
				});
			});
		};

		const togglePackageCardExpand = (card) => {
			if (card.classList.contains("is-expanded")) {
				collapsePackageCard(card);
				if (!packageTabs.querySelector("[data-package-card].is-expanded")) {
					packageTabs.classList.remove("has-expanded-card");
					window.requestAnimationFrame(() => {
						syncPackageExpandedLayout();
						syncPackageIntroViewport(true);
					});
				}
				return;
			}
			expandPackageCard(card);
		};

		packageCards.forEach((card) => {
			card.addEventListener("click", (e) => {
				if (e.target.closest("[data-package-more], [data-package-enquiry]")) {
					return;
				}
				selectPackageCard(card);
				const packageId = card.dataset.packageId;
				if (packageId && typeof window.excelEntOpenPackageCompare === "function") {
					window.excelEntOpenPackageCompare(packageId);
				}
			});
		});

		packageCards.forEach((card) => {
			if (card.classList.contains("package-card--featured")) {
				selectPackageCard(card);
			}
		});

		packageTabs.querySelectorAll(".package-panel.is-active .reveal, .package-panel.is-active [data-reveal]").forEach((item) => {
			item.classList.add("is-visible", "in");
		});

		const activate = (id) => {
			tabs.forEach((tab) => {
				const on = tab.getAttribute("data-package-tab") === id;
				tab.classList.toggle("is-active", on);
				tab.setAttribute("aria-selected", on ? "true" : "false");
			});
			panels.forEach((panel) => {
				const on = panel.getAttribute("data-package-panel") === id;
				panel.classList.toggle("is-active", on);
				panel.hidden = !on;
				if (on) {
					const scroller = panel.querySelector(".package-grid-wrap");
					const defaultCard = panel.querySelector(".package-card--featured") ||
						panel.querySelector("[data-package-card]");
					collapseAllPackageCards();
					if (scroller) {
						scroller.scrollTop = 0;
					}
					selectPackageCard(defaultCard);
					panel.querySelectorAll(".reveal, [data-reveal]").forEach((item) => {
						item.classList.add("is-visible");
					});
					window.requestAnimationFrame(() => {
						syncPackageRail(scroller);
						syncPackageIntroViewport(true);
					});
				}
			});
		};

		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				activate(tab.getAttribute("data-package-tab") || "wedding");
			});
		});

		packageTabs.addEventListener("click", (e) => {
			const btn = e.target.closest("[data-package-more]");
			if (!btn || !packageTabs.contains(btn)) {
				return;
			}
			e.preventDefault();
			e.stopPropagation();
			const card = btn.closest("[data-package-card]");
			if (isPackageDesktopExpandMode() && card) {
				togglePackageCardExpand(card);
				return;
			}
			const id = btn.getAttribute("data-package-id");
			if (!id || typeof window.excelEntOpenPackageCompare !== "function") {
				return;
			}
			window.excelEntOpenPackageCompare(id);
		});

		const syncPackageIntroMobileViewport = (force = false) => {
			if (!packageIntroMobileMq.matches) {
				return;
			}

			if (packageTabs.classList.contains("has-expanded-card")) {
				return;
			}

			if (force) {
				resetPackageIntroMobileFit();
			}

			const viewportWidth = window.innerWidth;
			if (
				packageIntroMobileFitLocked &&
				Math.abs(viewportWidth - packageIntroMobileFitWidth) > 80
			) {
				resetPackageIntroMobileFit();
			}

			if (
				!force &&
				packageIntroMobileFitLocked &&
				packageIntroMobileFitSnapshot &&
				packageTabs.classList.contains("is-viewport-fitted")
			) {
				applyPackageIntroMobileViewportFit(packageIntroMobileFitSnapshot);
				return;
			}

			packageTabs.classList.remove("is-viewport-fitted");
			packageTabs.style.removeProperty("height");
			packageTabs.style.removeProperty("--ee-package-intro-viewport-height");
			packageTabs.style.removeProperty("--ee-package-intro-fit-scale");
			packageTabs.style.removeProperty("--ee-package-intro-fit-pad-top");
			packageTabs.style.removeProperty("--ee-package-intro-fit-pad-bottom");
			packageTabs.style.removeProperty("--ee-package-intro-content-height");

			const measure = measureAboutMobileStickyUnit(
				packageTabs,
				getPackageIntroAvailableHeight
			);
			const snapshot = buildAboutMobilePinSnapshot(measure, 0, 0);

			if (snapshot.fitScale >= 0.999) {
				return;
			}

			applyPackageIntroMobileViewportFit(snapshot);

			if (!packageIntroMobileFitLocked && aboutMobilePinLayoutReady) {
				packageIntroMobileFitLocked = true;
				packageIntroMobileFitSnapshot = snapshot;
				packageIntroMobileFitWidth = viewportWidth;
				packageIntroFitLocked = true;
			}
		};

		const syncPackageIntroViewport = (force = false) => {
			if (packageIntroMobileMq.matches) {
				syncPackageIntroMobileViewport(force);
				return;
			}

			if (
				!force &&
				packageIntroFitLocked &&
				packageTabs.classList.contains("is-viewport-fitted")
			) {
				return;
			}

			clearPackageIntroViewportFit();

			if (!packageIntroFitMq.matches) {
				return;
			}

			if (packageTabs.classList.contains("has-expanded-card")) {
				return;
			}

			const naturalHeight = Math.ceil(packageTabs.offsetHeight);
			const header = document.querySelector(".site-header");
			const headerHeight = header ? Math.ceil(header.offsetHeight) : 0;
			const availableHeight = Math.max(window.innerHeight - headerHeight, 0);
			const fitScale = Math.min(1, availableHeight / Math.max(naturalHeight, 1));

			if (fitScale >= 1 || !availableHeight) {
				return;
			}

			const styles = getComputedStyle(packageTabs);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;

			packageTabs.style.setProperty("--ee-package-intro-viewport-height", `${availableHeight}px`);
			packageTabs.style.setProperty("--ee-package-intro-fit-scale", String(fitScale));
			packageTabs.style.setProperty("--ee-package-intro-fit-pad-top", `${padTop * fitScale}px`);
			packageTabs.style.setProperty("--ee-package-intro-fit-pad-bottom", `${padBottom * fitScale}px`);
			packageTabs.classList.add("is-viewport-fitted");
			packageIntroFitLocked = true;
		};

		window.addEventListener("resize", () => {
			packageScrollers.forEach((scroller) => syncPackageRail(scroller));
			if (packageTabs.classList.contains("has-expanded-card")) {
				syncPackageExpandedLayout();
			}
			if (packageIntroMobileMq.matches) {
				if (
					packageIntroMobileFitLocked &&
					Math.abs(window.innerWidth - packageIntroMobileFitWidth) > 80
				) {
					resetPackageIntroMobileFit();
				}
			}
			syncPackageIntroViewport(true);
		}, { passive: true });

		window.addEventListener("load", () => {
			if (packageIntroMobileMq.matches) {
				resetPackageIntroMobileFit();
			}
			syncPackageIntroViewport(true);
		});

		window.addEventListener("orientationchange", () => {
			if (packageIntroMobileMq.matches) {
				resetPackageIntroMobileFit();
				packageIntroMobileFitWidth = window.innerWidth;
			}
			window.setTimeout(() => syncPackageIntroViewport(true), 150);
		});

		window.addEventListener("excel-ent:header-state-change", () => {
			if (packageIntroMobileMq.matches) {
				resetPackageIntroMobileFit();
			}
			syncPackageIntroViewport(true);
		});

		bindAboutMobilePinViewportGuard(
			packageIntroMobileMq,
			resetPackageIntroMobileFit,
			() => syncPackageIntroViewport(true)
		);

		window.requestAnimationFrame(() => syncPackageIntroViewport(true));
		window.setTimeout(() => syncPackageIntroViewport(true), 250);

		if (typeof packageIntroMobileMq.addEventListener === "function") {
			packageIntroMobileMq.addEventListener("change", () => {
				resetPackageIntroMobileFit();
				syncPackageIntroViewport(true);
			});
		} else if (typeof packageIntroMobileMq.addListener === "function") {
			packageIntroMobileMq.addListener(() => {
				resetPackageIntroMobileFit();
				syncPackageIntroViewport(true);
			});
		}

		if (typeof packageIntroFitMq.addEventListener === "function") {
			packageIntroFitMq.addEventListener("change", () => {
				if (!packageDesktopMq.matches) {
					collapseAllPackageCards();
				}
				syncPackageIntroViewport(true);
			});
		} else if (typeof packageIntroFitMq.addListener === "function") {
			packageIntroFitMq.addListener(() => {
				if (!packageDesktopMq.matches) {
					collapseAllPackageCards();
				}
				syncPackageIntroViewport(true);
			});
		}

		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				const naturalHeight = Math.ceil(packageTabs.scrollHeight);
				const snapNatural =
					packageIntroMobileFitSnapshot?.naturalSectionHeight;
				if (
					packageIntroMobileMq.matches &&
					(!packageIntroMobileFitLocked ||
						(snapNatural && Math.abs(naturalHeight - snapNatural) > 32))
				) {
					resetPackageIntroMobileFit();
					syncPackageIntroViewport(true);
				} else if (!packageIntroMobileMq.matches) {
					syncPackageIntroViewport(true);
				}
			});
		}
	}

	/* ---------- Package compare modal (mobile) ---------- */
	const compareModal = document.querySelector("[data-package-compare]");
	const catalogEl = document.querySelector("[data-package-catalog]");
	if (compareModal && catalogEl) {
		let catalog = {};
		try {
			catalog = JSON.parse(catalogEl.textContent || "{}");
		} catch (err) {
			catalog = {};
		}

		const dialog = compareModal.querySelector("[data-package-compare-dialog]");
		const panelsRoot = compareModal.querySelector("[data-compare-panels]");
		const nameA = compareModal.querySelector("[data-compare-a-name]");
		const nameB = compareModal.querySelector("[data-compare-b-name]");
		const pickerA = compareModal.querySelector('[data-compare-picker="a"]');
		const pickerB = compareModal.querySelector('[data-compare-picker="b"]');
		const menuA = compareModal.querySelector('[data-compare-menu="a"]');
		const menuB = compareModal.querySelector('[data-compare-menu="b"]');
		const selectLabel = "Select";
		let lastFocus = null;
		let optionA = null;
		let optionB = null;
		let activeGroup = "wedding";

		const getPkg = (id) => (id && catalog[id] ? catalog[id] : null);

		const groupPackages = (group) =>
			Object.keys(catalog)
				.map((key) => catalog[key])
				.filter((pkg) => pkg && pkg.group === group);

		const fillPanel = (side, pkg) => {
			const panel = compareModal.querySelector(`[data-compare-panel="${side}"]`);
			if (!panel) {
				return;
			}
			if (!pkg) {
				panel.hidden = true;
				return;
			}
			panel.hidden = false;
			const nameEl = panel.querySelector("[data-compare-name]");
			const mainEl = panel.querySelector("[data-compare-main]");
			const suffixEl = panel.querySelector("[data-compare-suffix]");
			const noteEl = panel.querySelector("[data-compare-note]");
			const listEl = panel.querySelector("[data-compare-features]");
			const enquiryBtn = panel.querySelector("[data-compare-enquiry]");
			if (nameEl) {
				nameEl.textContent = pkg.name || "";
			}
			if (mainEl) {
				mainEl.textContent = pkg.main || "";
			}
			if (suffixEl) {
				const parts = [];
				if (pkg.suffix) {
					parts.push(pkg.suffix);
				}
				if (pkg.suffix_detail) {
					parts.push(pkg.suffix_detail);
				}
				suffixEl.textContent = parts.length ? ` ${parts.join(" ")}` : "";
				suffixEl.hidden = parts.length === 0;
			}
			if (noteEl) {
				noteEl.textContent = pkg.note || "";
			}
			if (listEl) {
				listEl.innerHTML = "";
				(pkg.features || []).forEach((feature) => {
					const li = document.createElement("li");
					li.textContent = feature;
					listEl.appendChild(li);
				});
			}
			if (enquiryBtn) {
				enquiryBtn.setAttribute("data-package-label", pkg.label || pkg.name || "");
				enquiryBtn.setAttribute("data-package-name", pkg.name || "");
			}
		};

		const setPickerState = (picker, filled, whiteChevron) => {
			if (!picker) {
				return;
			}
			picker.classList.toggle("is-filled", !!filled);
			const white = picker.querySelector(".package-compare__picker-chevron--white");
			const dark = picker.querySelector(".package-compare__picker-chevron--dark");
			if (white) {
				white.hidden = !whiteChevron;
			}
			if (dark) {
				dark.hidden = !!whiteChevron;
			}
		};

		const syncPickers = () => {
			if (nameA) {
				nameA.textContent = optionA ? optionA.name : selectLabel;
			}
			if (nameB) {
				nameB.textContent = optionB ? optionB.name : selectLabel;
			}
			setPickerState(pickerA, !!optionA, !!optionA);
			setPickerState(pickerB, !!optionB, !!optionB);
			const dual = !!optionB;
			compareModal.classList.toggle("is-dual", dual);
			if (panelsRoot) {
				panelsRoot.classList.toggle("is-dual", dual);
			}
			fillPanel("a", optionA);
			fillPanel("b", optionB);
		};

		const closeMenus = () => {
			[menuA, menuB].forEach((menu) => {
				if (menu) {
					menu.hidden = true;
				}
			});
			[pickerA, pickerB].forEach((picker) => {
				if (picker) {
					picker.setAttribute("aria-expanded", "false");
				}
			});
		};

		const buildMenu = (menu, side) => {
			if (!menu) {
				return;
			}
			menu.innerHTML = "";
			const pkgs = groupPackages(activeGroup);
			if (side === "b") {
				const clear = document.createElement("li");
				clear.setAttribute("role", "option");
				const clearBtn = document.createElement("button");
				clearBtn.type = "button";
				clearBtn.className = "package-compare__menu-item";
				clearBtn.textContent = selectLabel;
				clearBtn.addEventListener("click", () => {
					optionB = null;
					syncPickers();
					closeMenus();
				});
				clear.appendChild(clearBtn);
				menu.appendChild(clear);
			}
			pkgs.forEach((pkg) => {
				const li = document.createElement("li");
				li.setAttribute("role", "option");
				const btn = document.createElement("button");
				btn.type = "button";
				btn.className = "package-compare__menu-item";
				const selectedId = side === "a" ? optionA?.id : optionB?.id;
				if (pkg.id === selectedId) {
					btn.classList.add("is-active");
				}
				btn.textContent = pkg.name;
				btn.addEventListener("click", () => {
					if (side === "a") {
						if (optionB && optionB.id === pkg.id) {
							optionB = optionA;
						}
						optionA = pkg;
					} else if (optionA && optionA.id === pkg.id) {
						optionB = null;
					} else {
						optionB = pkg;
					}
					syncPickers();
					closeMenus();
				});
				li.appendChild(btn);
				menu.appendChild(li);
			});
		};

		const openMenu = (side) => {
			const menu = side === "a" ? menuA : menuB;
			const picker = side === "a" ? pickerA : pickerB;
			const other = side === "a" ? menuB : menuA;
			const otherPicker = side === "a" ? pickerB : pickerA;
			if (other) {
				other.hidden = true;
			}
			if (otherPicker) {
				otherPicker.setAttribute("aria-expanded", "false");
			}
			buildMenu(menu, side);
			if (menu) {
				menu.hidden = false;
			}
			if (picker) {
				picker.setAttribute("aria-expanded", "true");
			}
		};

		const openCompare = (packageId) => {
			const pkg = getPkg(packageId);
			if (!pkg) {
				return;
			}
			lastFocus = document.activeElement;
			activeGroup = pkg.group || "wedding";
			optionA = pkg;
			optionB = null;
			syncPickers();
			closeMenus();
			compareModal.hidden = false;
			document.body.classList.add("package-compare-open");
			window.setTimeout(() => {
				compareModal.querySelector("[data-package-compare-close]")?.focus();
			}, 40);
		};

		const closeCompare = () => {
			closeMenus();
			compareModal.hidden = true;
			document.body.classList.remove("package-compare-open");
			compareModal.classList.remove("is-dual");
			if (lastFocus && typeof lastFocus.focus === "function") {
				lastFocus.focus();
			}
		};

		window.excelEntOpenPackageCompare = openCompare;

		pickerA?.addEventListener("click", () => {
			const open = pickerA.getAttribute("aria-expanded") === "true";
			if (open) {
				closeMenus();
			} else {
				openMenu("a");
			}
		});

		pickerB?.addEventListener("click", () => {
			const open = pickerB.getAttribute("aria-expanded") === "true";
			if (open) {
				closeMenus();
			} else {
				openMenu("b");
			}
		});

		compareModal.querySelector("[data-compare-swap]")?.addEventListener("click", () => {
			if (!optionB) {
				return;
			}
			const tmp = optionA;
			optionA = optionB;
			optionB = tmp;
			syncPickers();
			closeMenus();
		});

		compareModal.querySelectorAll("[data-package-compare-close]").forEach((el) => {
			el.addEventListener("click", closeCompare);
		});

		compareModal.querySelectorAll("[data-compare-enquiry]").forEach((btn) => {
			btn.addEventListener("click", () => {
				const label = btn.getAttribute("data-package-label") || "";
				const name = btn.getAttribute("data-package-name") || "";
				if (typeof window.excelEntOpenPackageEnquiry === "function") {
					window.excelEntOpenPackageEnquiry(label, name);
				}
			});
		});

		window.addEventListener("keydown", (e) => {
			if (e.key !== "Escape" || compareModal.hidden) {
				return;
			}
			const enquiryOpen = document.body.classList.contains("package-enquiry-open");
			if (enquiryOpen) {
				return;
			}
			if ((menuA && !menuA.hidden) || (menuB && !menuB.hidden)) {
				closeMenus();
				return;
			}
			closeCompare();
		});

		document.addEventListener("click", (e) => {
			if (compareModal.hidden) {
				return;
			}
			if (!dialog?.contains(e.target)) {
				return;
			}
			if (!e.target.closest(".package-compare__picker-wrap")) {
				closeMenus();
			}
		});
	}

	/* ---------- Package enquiry modal ---------- */
	const enquiryModal = document.querySelector("[data-package-enquiry-modal]");
	if (enquiryModal) {
		const dialog = enquiryModal.querySelector("[data-package-enquiry-dialog]");
		const form = enquiryModal.querySelector("[data-package-enquiry-form]");
		const selected = enquiryModal.querySelector("[data-package-enquiry-selected]");
		const packageInput = enquiryModal.querySelector("[data-package-enquiry-package]");
		const nameInput = enquiryModal.querySelector("[data-package-enquiry-name]");
		const emailInput = enquiryModal.querySelector("[data-package-enquiry-email]");
		const phoneInput = enquiryModal.querySelector("[data-package-enquiry-phone]");
		const notesInput = enquiryModal.querySelector("[data-package-enquiry-notes]");
		const statusEl = enquiryModal.querySelector("[data-package-enquiry-status]");
		const submitBtn = enquiryModal.querySelector("[data-package-enquiry-submit]");
		const submitLabel = enquiryModal.querySelector("[data-package-enquiry-submit-label]");
		const triggers = Array.from(document.querySelectorAll("[data-package-enquiry]"));
		const cfg = window.excelEnt?.packageEnquiry || {};
		const ajaxUrl = window.excelEnt?.ajaxUrl || "";
		const defaultSubmitLabel = submitLabel?.textContent || cfg.submitLabel || "Send enquiry";

		const isEnquiryMobile = () =>
			window.matchMedia && window.matchMedia("(max-width: 767px)").matches;

		const getEnquirySubmitLabel = () => {
			if (!submitLabel) {
				return isEnquiryMobile()
					? cfg.submitLabelMobile || "Start Enquiry"
					: defaultSubmitLabel;
			}
			const mobile = submitLabel.getAttribute("data-label-mobile");
			const desktop =
				submitLabel.getAttribute("data-label-desktop") || defaultSubmitLabel;
			return isEnquiryMobile()
				? mobile || cfg.submitLabelMobile || "Start Enquiry"
				: desktop;
		};

		const syncEnquiryFieldPlaceholders = (input) => {
			if (!input) {
				return;
			}
			const key = isEnquiryMobile()
				? "data-placeholder-mobile"
				: "data-placeholder-desktop";
			if (input.hasAttribute(key)) {
				input.setAttribute("placeholder", input.getAttribute(key) || "");
			}
		};

		const syncEnquiryPlaceholders = () => {
			syncEnquiryFieldPlaceholders(notesInput);
			syncEnquiryFieldPlaceholders(nameInput);
			if (submitLabel && !busy) {
				submitLabel.textContent = getEnquirySubmitLabel();
			}
		};

		let lastFocus = null;
		let busy = false;
		const enquiryFitMq = window.matchMedia("(min-width: 1200px)");
		const enquiryMobileMq = window.matchMedia("(max-width: 767px)");
		const enquiryBar = enquiryModal.querySelector(".package-enquiry__bar");
		const enquiryFormInner = enquiryModal.querySelector(".package-enquiry__form-inner");

		const getEnquiryViewportHeight = () =>
			Math.round(window.visualViewport?.height || window.innerHeight);

		const clearEnquiryViewportFit = () => {
			dialog?.classList.remove("is-viewport-fitted");
			form?.classList.remove("is-viewport-fitted");
			dialog?.style.removeProperty("height");
			form?.style.removeProperty("height");
			form?.style.removeProperty("max-height");
			form?.style.removeProperty("overflow");
			form?.style.removeProperty("flex");
			form?.style.removeProperty("transform");
			form?.style.removeProperty("transform-origin");
			form?.style.removeProperty("--ee-enquiry-available-height");
			form?.style.removeProperty("--ee-enquiry-fit-scale");
			form?.style.removeProperty("--ee-enquiry-fit-pad-top");
			form?.style.removeProperty("--ee-enquiry-fit-pad-bottom");
			form?.style.removeProperty("--ee-enquiry-content-height");
			enquiryModal.style.removeProperty("--ee-enquiry-viewport-height");
		};

		const syncEnquiryMobileViewport = () => {
			if (!dialog || !form || !enquiryMobileMq.matches || enquiryModal.hidden) {
				return;
			}

			clearEnquiryViewportFit();

			const viewportHeight = getEnquiryViewportHeight();
			enquiryModal.style.setProperty(
				"--ee-enquiry-viewport-height",
				`${viewportHeight}px`
			);
			dialog.style.height = `${viewportHeight}px`;

			const barHeight = enquiryBar
				? Math.ceil(enquiryBar.getBoundingClientRect().height)
				: 0;
			const availableHeight = Math.max(viewportHeight - barHeight, 0);
			const styles = getComputedStyle(form);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;
			const measureEl = enquiryFormInner || form;
			const contentHeight = Math.max(
				Math.ceil(measureEl.scrollHeight),
				Math.ceil(measureEl.getBoundingClientRect().height)
			);
			const naturalHeight = contentHeight + padTop + padBottom;
			const fitScale = Math.min(1, availableHeight / Math.max(naturalHeight, 1));

			if (!availableHeight || fitScale >= 0.999) {
				return;
			}

			form.style.setProperty(
				"--ee-enquiry-available-height",
				`${availableHeight}px`
			);
			form.style.setProperty("--ee-enquiry-fit-scale", String(fitScale));
			form.style.setProperty(
				"--ee-enquiry-fit-pad-top",
				`${padTop * fitScale}px`
			);
			form.style.setProperty(
				"--ee-enquiry-fit-pad-bottom",
				`${padBottom * fitScale}px`
			);
			form.style.setProperty(
				"--ee-enquiry-content-height",
				`${contentHeight}px`
			);
			form.classList.add("is-viewport-fitted");
		};

		const syncEnquiryDesktopViewport = () => {
			if (!dialog || !form || !enquiryFitMq.matches || enquiryModal.hidden) {
				return;
			}

			clearEnquiryViewportFit();
			form.style.height = "auto";
			form.style.maxHeight = "none";
			form.style.overflow = "visible";
			form.style.flex = "0 0 auto";
			const availableHeight = Math.max(dialog.getBoundingClientRect().height, 1);
			const naturalHeight = Math.max(form.scrollHeight, 1);
			const fitScale = Math.min(1, availableHeight / naturalHeight);

			if (fitScale < 1) {
				form.style.height = `${naturalHeight}px`;
				form.style.transform = `scaleY(${fitScale})`;
				form.style.transformOrigin = "top left";
			}
		};

		const syncEnquiryViewport = () => {
			if (enquiryModal.hidden) {
				clearEnquiryViewportFit();
				return;
			}
			if (enquiryMobileMq.matches) {
				syncEnquiryMobileViewport();
				return;
			}
			if (enquiryFitMq.matches) {
				syncEnquiryDesktopViewport();
				return;
			}
			clearEnquiryViewportFit();
		};

		const isValidEmail = (value) =>
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

		const setStatus = (message, type) => {
			if (!statusEl) {
				return;
			}
			statusEl.hidden = !message;
			statusEl.textContent = message || "";
			statusEl.classList.remove("is-error", "is-success");
			if (type) {
				statusEl.classList.add(`is-${type}`);
			}
		};

		const clearInvalid = () => {
			[nameInput, emailInput, phoneInput].forEach((el) => {
				if (!el) {
					return;
				}
				el.classList.remove("is-invalid");
				el.setAttribute("aria-invalid", "false");
			});
		};

		const markInvalid = (el) => {
			if (!el) {
				return;
			}
			el.classList.add("is-invalid");
			el.setAttribute("aria-invalid", "true");
			el.focus();
		};

		const setBusy = (nextBusy) => {
			busy = nextBusy;
			form?.classList.toggle("is-loading", nextBusy);
			if (submitBtn) {
				submitBtn.disabled = nextBusy;
			}
			if (submitLabel) {
				submitLabel.textContent = nextBusy
					? cfg.sending || "Sending…"
					: getEnquirySubmitLabel();
			}
		};

		const open = (label, name) => {
			lastFocus = document.activeElement;
			if (selected) {
				selected.textContent = label || name || "";
			}
			if (packageInput) {
				packageInput.value = label || name || "";
			}
			clearInvalid();
			setStatus("", "");
			form?.classList.remove("is-success");
			syncEnquiryPlaceholders();
			enquiryModal.hidden = false;
			document.body.classList.add("package-enquiry-open");
			window.requestAnimationFrame(() => {
				syncEnquiryViewport();
				window.requestAnimationFrame(syncEnquiryViewport);
			});
			window.setTimeout(() => {
				syncEnquiryViewport();
				nameInput?.focus({ preventScroll: true });
			}, 40);
		};

		const close = () => {
			enquiryModal.hidden = true;
			document.body.classList.remove("package-enquiry-open");
			clearEnquiryViewportFit();
			if (lastFocus && typeof lastFocus.focus === "function") {
				lastFocus.focus();
			}
		};

		window.excelEntOpenPackageEnquiry = open;

		triggers.forEach((btn) => {
			btn.addEventListener("click", () => {
				open(
					btn.getAttribute("data-package-label") || "",
					btn.getAttribute("data-package-name") || ""
				);
			});
		});

		enquiryModal.querySelectorAll("[data-package-enquiry-close]").forEach((el) => {
			el.addEventListener("click", () => {
				if (!busy) {
					close();
				}
			});
		});

		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && !enquiryModal.hidden && !busy) {
				close();
			}
		});

		window.addEventListener("resize", () => {
			syncEnquiryViewport();
			syncEnquiryPlaceholders();
		}, { passive: true });
		window.visualViewport?.addEventListener("resize", () => {
			if (!enquiryModal.hidden && enquiryMobileMq.matches) {
				syncEnquiryViewport();
			}
		});
		window.addEventListener("orientationchange", () => {
			window.setTimeout(syncEnquiryViewport, 150);
		});
		window.addEventListener("load", syncEnquiryViewport);
		if (typeof enquiryFitMq.addEventListener === "function") {
			enquiryFitMq.addEventListener("change", syncEnquiryViewport);
		} else if (typeof enquiryFitMq.addListener === "function") {
			enquiryFitMq.addListener(syncEnquiryViewport);
		}
		if (typeof enquiryMobileMq.addEventListener === "function") {
			enquiryMobileMq.addEventListener("change", syncEnquiryViewport);
		} else if (typeof enquiryMobileMq.addListener === "function") {
			enquiryMobileMq.addListener(syncEnquiryViewport);
		}
		if (document.fonts?.ready) {
			document.fonts.ready.then(syncEnquiryViewport);
		}

		[nameInput, emailInput, phoneInput].forEach((el) => {
			el?.addEventListener("input", () => {
				if (el.classList.contains("is-invalid")) {
					el.classList.remove("is-invalid");
					el.setAttribute("aria-invalid", "false");
					setStatus("", "");
				}
			});
		});

		form?.addEventListener("submit", async (e) => {
			e.preventDefault();
			if (busy) {
				return;
			}

			clearInvalid();
			setStatus("", "");

			const name = nameInput?.value?.trim() || "";
			const email = emailInput?.value?.trim() || "";
			const phone = phoneInput?.value?.trim() || "";

			if (!name) {
				setStatus(cfg.nameRequired || "Please enter your full name.", "error");
				markInvalid(nameInput);
				return;
			}

			if (isEnquiryMobile()) {
				if (!phone) {
					setStatus(cfg.phoneRequired || "Please enter your phone number.", "error");
					markInvalid(phoneInput);
					return;
				}
			} else if (!email) {
				setStatus(cfg.contactRequired || "Please enter your email address or phone number.", "error");
				markInvalid(emailInput);
				return;
			}

			if (email && !isValidEmail(email)) {
				setStatus(cfg.emailInvalid || "Please enter a valid email address.", "error");
				markInvalid(emailInput);
				return;
			}

			if (!ajaxUrl) {
				setStatus(cfg.genericError || "Something went wrong. Please try again.", "error");
				return;
			}

			setBusy(true);

			try {
				const body = new FormData(form);
				if (!body.get("nonce") && cfg.nonce) {
					body.set("nonce", cfg.nonce);
				}
				if (!body.get("action")) {
					body.set("action", "excel_ent_package_enquiry");
				}

				const response = await fetch(ajaxUrl, {
					method: "POST",
					credentials: "same-origin",
					body,
				});

				const payload = await response.json().catch(() => null);
				const ok = Boolean(payload?.success);
				const message =
					payload?.data?.message ||
					(ok
						? "Thanks — we’ve received your enquiry and will be in touch shortly."
						: cfg.genericError || "Something went wrong. Please try again.");

				if (ok) {
					form.classList.add("is-success");
					setStatus(message, "success");
					form.reset();
					syncEnquiryPlaceholders();
					if (packageInput && selected) {
						packageInput.value = selected.textContent || "";
					}
					window.setTimeout(() => {
						if (!enquiryModal.hidden) {
							close();
						}
					}, 1600);
				} else {
					const field = payload?.data?.field;
					if (field === "name") {
						markInvalid(nameInput);
					} else if (field === "email") {
						markInvalid(emailInput);
					} else if (field === "phone") {
						markInvalid(phoneInput);
					}
					setStatus(message, "error");
				}
			} catch (err) {
				setStatus(cfg.genericError || "Something went wrong. Please try again.", "error");
			} finally {
				setBusy(false);
			}
		});

		dialog?.addEventListener("click", (e) => e.stopPropagation());
	}

	/* ---------- Blog article modal ---------- */
	const blogModal = document.querySelector("[data-blog-modal]");
	if (blogModal) {
		const dialog = blogModal.querySelector("[data-blog-modal-dialog]");
		const scrollEl = blogModal.querySelector("[data-blog-modal-scroll]");
		const imageEl = blogModal.querySelector("[data-blog-modal-image]");
		const categoryEl = blogModal.querySelector("[data-blog-modal-category]");
		const dateEl = blogModal.querySelector("[data-blog-modal-date]");
		const readEl = blogModal.querySelector("[data-blog-modal-read]");
		const titleEl = blogModal.querySelector("[data-blog-modal-title]");
		const excerptEl = blogModal.querySelector("[data-blog-modal-excerpt]");
		const contentEl = blogModal.querySelector("[data-blog-modal-content]");
		const openers = Array.from(document.querySelectorAll("[data-blog-modal-open]"));
		let lastFocus = null;

		const open = (btn) => {
			const card = btn.closest("[data-blog-card]");
			const template = card?.querySelector("template[data-blog-content]");
			lastFocus = document.activeElement;

			if (imageEl) {
				const src = btn.getAttribute("data-blog-image") || "";
				imageEl.src = src;
				imageEl.alt = btn.getAttribute("data-blog-title") || "";
			}
			if (categoryEl) categoryEl.textContent = btn.getAttribute("data-blog-category") || "";
			if (dateEl) dateEl.textContent = btn.getAttribute("data-blog-date") || "";
			if (readEl) readEl.textContent = btn.getAttribute("data-blog-read") || "";
			if (titleEl) titleEl.textContent = btn.getAttribute("data-blog-title") || "";
			if (excerptEl) excerptEl.textContent = btn.getAttribute("data-blog-excerpt") || "";
			if (contentEl) {
				contentEl.innerHTML = template ? template.innerHTML : "";
			}
			if (scrollEl) scrollEl.scrollTop = 0;

			blogModal.hidden = false;
			document.body.classList.add("blog-modal-open");
			window.setTimeout(() => dialog?.focus(), 40);
		};

		const close = () => {
			blogModal.hidden = true;
			document.body.classList.remove("blog-modal-open");
			if (contentEl) contentEl.innerHTML = "";
			if (lastFocus && typeof lastFocus.focus === "function") {
				lastFocus.focus();
			}
		};

		openers.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				open(btn);
			});
		});

		blogModal.querySelectorAll("[data-blog-modal-close]").forEach((el) => {
			el.addEventListener("click", close);
		});

		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && !blogModal.hidden) {
				close();
			}
		});

		dialog?.addEventListener("click", (e) => e.stopPropagation());
	}

	/* ---------- Contact tabs + accordion ---------- */
	const contactTabsRoot = document.querySelector("[data-contact-tabs]");
	if (contactTabsRoot) {
		const tabs = Array.from(contactTabsRoot.querySelectorAll("[data-contact-tab]"));
		const panels = Array.from(contactTabsRoot.querySelectorAll("[data-contact-panel]"));

		const activateTab = (id) => {
			tabs.forEach((tab) => {
				const on = tab.getAttribute("data-contact-tab") === id;
				tab.classList.toggle("is-active", on);
				tab.setAttribute("aria-selected", on ? "true" : "false");
			});
			panels.forEach((panel) => {
				const on = panel.getAttribute("data-contact-panel") === id;
				panel.classList.toggle("is-active", on);
				panel.hidden = !on;
			});
		};

		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				activateTab(tab.getAttribute("data-contact-tab") || "booking");
			});
		});

		const tabFromHash = () => {
			const raw = (window.location.hash || "").replace(/^#/, "").toLowerCase();
			if (!raw) {
				return "";
			}
			if (raw === "talent" || raw === "contact-tab-talent" || raw === "register" || raw === "artist") {
				return "talent";
			}
			if (raw === "booking" || raw === "contact-tab-booking" || raw === "quote") {
				return "booking";
			}
			return "";
		};

		const hashTab = tabFromHash();
		if (hashTab) {
			activateTab(hashTab);
		}

		const scrollToContactHash = () => {
			const raw = (window.location.hash || "").replace(/^#/, "").toLowerCase();
			let target = null;
			if (raw === "quick-contacts" || raw === "contact-quick") {
				target = document.getElementById("quick-contacts");
			} else if (
				raw === "talent" ||
				raw === "contact-tab-talent" ||
				raw === "register" ||
				raw === "artist"
			) {
				target = document.getElementById("contact-tab-talent") || contactTabsRoot;
			} else if (
				raw === "booking" ||
				raw === "contact-tab-booking" ||
				raw === "quote"
			) {
				target = document.getElementById("contact-tab-booking") || contactTabsRoot;
			}
			if (!target) {
				return;
			}
			const offset = -100;
			if (window.excelEntLenis) {
				window.excelEntLenis.scrollTo(target, { offset, duration: 1.1 });
			} else {
				const top = target.getBoundingClientRect().top + window.scrollY + offset;
				window.scrollTo({ top, behavior: "smooth" });
			}
		};
		window.setTimeout(scrollToContactHash, 80);
		window.addEventListener("hashchange", () => {
			const next = tabFromHash();
			if (next) {
				activateTab(next);
			}
			scrollToContactHash();
		});

		contactTabsRoot.querySelectorAll("[data-contact-accordion]").forEach((accordion) => {
			const multi = accordion.hasAttribute("data-contact-accordion-multi");
			const sections = Array.from(accordion.querySelectorAll("[data-contact-acc]"));

			const setOpen = (section, open) => {
				const toggle = section.querySelector("[data-contact-acc-toggle]");
				const body = section.querySelector("[data-contact-acc-body]");
				section.classList.toggle("is-open", open);
				if (body) {
					body.hidden = !open;
				}
				toggle?.setAttribute("aria-expanded", open ? "true" : "false");
			};

			sections.forEach((section) => {
				const toggle = section.querySelector("[data-contact-acc-toggle]");
				toggle?.addEventListener("click", () => {
					const open = !section.classList.contains("is-open");
					if (multi) {
						setOpen(section, open);
						return;
					}
					sections.forEach((other) => {
						setOpen(other, other === section && open);
					});
				});
			});

			/* Both tabs: only the first section is open by default */
			if (sections[0]) {
				sections.forEach((section, index) => setOpen(section, index === 0));
			}
		});

		/* Ranked artist preferences (max 5) */
		contactTabsRoot.querySelectorAll("[data-artist-prefs]").forEach((root) => {
			const list = root.querySelector("[data-artist-prefs-list]");
			const addBtn = root.querySelector("[data-artist-prefs-add]");
			const countEl = root.querySelector("[data-artist-prefs-count]");
			const template = root.querySelector("[data-artist-prefs-template]");
			const ranksNode = root.querySelector("[data-artist-prefs-ranks]");
			const max = 5;
			let ranks = ["1st choice", "2nd choice", "3rd choice", "4th choice", "5th choice"];
			try {
				const parsed = JSON.parse(ranksNode?.textContent || "[]");
				if (Array.isArray(parsed) && parsed.length) {
					ranks = parsed;
				}
			} catch (e) {
				/* keep defaults */
			}

			const updateCount = () => {
				const rows = Array.from(list.querySelectorAll("[data-artist-prefs-row]"));
				const selected = rows.filter((row) => {
					const select = row.querySelector("[data-artist-prefs-select]");
					return Boolean(select?.value);
				}).length;
				if (countEl) {
					countEl.textContent = `${selected} of ${max} selected`;
				}
				if (addBtn) {
					addBtn.hidden = rows.length >= max;
				}
				rows.forEach((row, i) => {
					row.dataset.rank = String(i + 1);
					const rankEl = row.querySelector("[data-artist-prefs-rank]");
					if (rankEl) {
						rankEl.textContent = ranks[i] || `${i + 1}`;
					}
					const remove = row.querySelector("[data-artist-prefs-remove]");
					if (remove) {
						remove.hidden = rows.length <= 1;
					}
				});
			};

			list?.addEventListener("change", (e) => {
				if (e.target.closest("[data-artist-prefs-select]")) {
					updateCount();
				}
			});

			list?.addEventListener("click", (e) => {
				const remove = e.target.closest("[data-artist-prefs-remove]");
				if (!remove) return;
				const row = remove.closest("[data-artist-prefs-row]");
				const rows = list.querySelectorAll("[data-artist-prefs-row]");
				if (rows.length <= 1) return;
				row?.remove();
				updateCount();
			});

			addBtn?.addEventListener("click", () => {
				const rows = list.querySelectorAll("[data-artist-prefs-row]");
				if (rows.length >= max || !template?.content) return;
				const clone = template.content.cloneNode(true);
				list.appendChild(clone);
				const newRow = list.querySelector("[data-artist-prefs-row]:last-child");
				newRow?.querySelectorAll("[data-contact-dd]").forEach((dd) => initContactDd(dd));
				updateCount();
			});

			updateCount();
		});

		contactTabsRoot.querySelectorAll(".contact-field__select--muted, .contact-field__input--muted").forEach((el) => {
			const sync = () => el.classList.toggle("has-value", Boolean(el.value));
			el.addEventListener("change", sync);
			el.addEventListener("input", sync);
			sync();
		});

		/* Custom dropdown panels (Figma 1159:3575 / 1159:3615) */
		const closeAllDds = (except) => {
			contactTabsRoot.querySelectorAll("[data-contact-dd]").forEach((dd) => {
				if (except && dd === except) return;
				const field = dd.closest(".contact-field--dd");
				const trigger = dd.querySelector("[data-contact-dd-trigger]");
				const panel = dd.querySelector("[data-contact-dd-panel]");
				field?.classList.remove("is-open");
				trigger?.setAttribute("aria-expanded", "false");
				if (panel) panel.hidden = true;
			});
		};

		const initContactDd = (dd) => {
			if (!dd || dd.dataset.contactDdReady === "1") return;
			if (dd.hasAttribute("data-contact-dd-multi") && dd.querySelector("[data-contact-dd-cat]")) return;
			dd.dataset.contactDdReady = "1";

			const field = dd.closest(".contact-field--dd");
			const trigger = dd.querySelector("[data-contact-dd-trigger]");
			const panel = dd.querySelector("[data-contact-dd-panel]");
			const input = dd.querySelector("[data-contact-dd-input]");
			const labelEl = dd.querySelector("[data-contact-dd-label]");
			const customInput = dd.querySelector("[data-contact-dd-custom]");
			const placeholder = labelEl?.textContent || "";
			const isMulti = dd.hasAttribute("data-contact-dd-multi");

			const clearOptions = () => {
				dd.querySelectorAll("[data-contact-dd-option]").forEach((other) => {
					other.classList.remove("is-selected");
					other.setAttribute("aria-selected", "false");
				});
			};

			const applyValue = (value, label, { close = true, clearCustom = false } = {}) => {
				if (input) {
					input.value = value;
					input.dispatchEvent(new Event("change", { bubbles: true }));
				}
				if (labelEl) labelEl.textContent = label || placeholder;
				trigger?.classList.toggle("contact-dd__trigger--muted", !value);
				if (clearCustom && customInput) {
					customInput.value = "";
				}
				if (close) setOpen(false);
			};

			const setOpen = (open) => {
				field?.classList.toggle("is-open", open);
				trigger?.setAttribute("aria-expanded", open ? "true" : "false");
				if (panel) panel.hidden = !open;
				if (open) {
					const focusEl = customInput || dd.querySelector("[data-contact-dd-search]");
					if (focusEl) {
						window.setTimeout(() => focusEl.focus(), 0);
					}
				}
			};

			trigger?.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				const open = !field?.classList.contains("is-open");
				closeAllDds(dd);
				setOpen(open);
			});

			dd.querySelectorAll("[data-contact-dd-option]").forEach((opt) => {
				opt.addEventListener("click", (e) => {
					e.preventDefault();
					e.stopPropagation();
					if (isMulti) {
						const on = !opt.classList.contains("is-selected");
						opt.classList.toggle("is-selected", on);
						opt.setAttribute("aria-selected", on ? "true" : "false");
						const selected = Array.from(dd.querySelectorAll("[data-contact-dd-option].is-selected"));
						const values = selected.map((el) => el.getAttribute("data-value") || "");
						const labels = selected.map((el) => el.getAttribute("data-label") || "");
						applyValue(values.join(","), labels.join(", ") || placeholder, { close: false });
						return;
					}
					const value = opt.getAttribute("data-value") || "";
					const label = opt.getAttribute("data-label") || value;
					clearOptions();
					opt.classList.add("is-selected");
					opt.setAttribute("aria-selected", "true");
					applyValue(value, label, { clearCustom: true });
				});
			});

			dd.querySelectorAll("[data-contact-dd-tab]").forEach((tab) => {
				tab.addEventListener("click", (e) => {
					e.preventDefault();
					e.stopPropagation();
					const id = tab.getAttribute("data-contact-dd-tab");
					dd.querySelectorAll("[data-contact-dd-tab]").forEach((t) => {
						const on = t === tab;
						t.classList.toggle("is-active", on);
						t.setAttribute("aria-selected", on ? "true" : "false");
					});
					dd.querySelectorAll("[data-contact-dd-group]").forEach((groupList) => {
						groupList.hidden = groupList.getAttribute("data-contact-dd-group") !== id;
					});
				});
			});

			const searchInput = dd.querySelector("[data-contact-dd-search]");
			if (searchInput) {
				searchInput.addEventListener("click", (e) => e.stopPropagation());
				searchInput.addEventListener("keydown", (e) => e.stopPropagation());
				searchInput.addEventListener("input", () => {
					const q = searchInput.value.trim().toLowerCase();
					dd.querySelectorAll("[data-contact-dd-item]").forEach((item) => {
						const itemLabel = item.getAttribute("data-label") || "";
						item.hidden = Boolean(q) && !itemLabel.includes(q);
					});
				});
			}

			if (customInput) {
				const commitCustom = () => {
					const value = customInput.value.trim();
					if (!value) return;
					clearOptions();
					applyValue(value, value, { close: true });
				};

				customInput.addEventListener("click", (e) => e.stopPropagation());
				customInput.addEventListener("keydown", (e) => {
					e.stopPropagation();
					if (e.key === "Enter") {
						e.preventDefault();
						commitCustom();
					}
				});
				customInput.addEventListener("input", () => {
					const value = customInput.value.trim();
					clearOptions();
					if (!value) {
						applyValue("", placeholder, { close: false });
						return;
					}
					applyValue(value, value, { close: false });
				});
			}
		};

		const initContactEntTypeDd = (dd) => {
			if (!dd || dd.dataset.contactDdReady === "1") return;
			dd.dataset.contactDdReady = "1";

			const field = dd.closest(".contact-field--dd");
			const trigger = dd.querySelector("[data-contact-dd-trigger]");
			const panel = dd.querySelector("[data-contact-dd-panel]");
			const input = dd.querySelector("[data-contact-dd-input]");
			const labelEl = dd.querySelector("[data-contact-dd-label]");
			const countEl = dd.querySelector("[data-contact-dd-count]");
			const clearBtn = dd.querySelector("[data-contact-dd-clear]");
			const chipsEl = dd.querySelector("[data-contact-dd-chips]");
			const chipIcon = dd.getAttribute("data-chip-icon") || "";
			const placeholder = labelEl?.textContent || "";

			const getSelected = () =>
				Array.from(dd.querySelectorAll("[data-contact-dd-option].is-selected"));

			const renderChips = (selected) => {
				if (!chipsEl) return;
				chipsEl.replaceChildren();
				selected.forEach((opt) => {
					const value = opt.getAttribute("data-value") || "";
					const label = opt.getAttribute("data-label") || value;
					const chip = document.createElement("span");
					chip.className = "contact-dd__chip";
					const remove = document.createElement("button");
					remove.type = "button";
					remove.className = "contact-dd__chip-remove";
					remove.setAttribute("data-contact-dd-chip-remove", "");
					remove.setAttribute("data-value", value);
					remove.setAttribute("aria-label", `Remove ${label}`);
					const icon = document.createElement("img");
					icon.src = chipIcon;
					icon.alt = "";
					icon.width = 24;
					icon.height = 24;
					icon.decoding = "async";
					remove.appendChild(icon);
					const text = document.createElement("span");
					text.className = "contact-dd__chip-label";
					text.textContent = label;
					chip.appendChild(remove);
					chip.appendChild(text);
					chipsEl.appendChild(chip);
				});
			};

			const syncUi = () => {
				const selected = getSelected();
				const values = selected.map((opt) => opt.getAttribute("data-value") || "");
				const labels = selected.map((opt) => opt.getAttribute("data-label") || "");

				if (input) {
					input.value = values.join(",");
					input.dispatchEvent(new Event("change", { bubbles: true }));
				}

				if (countEl) {
					const n = selected.length;
					countEl.textContent =
						n === 1 ? "1 category selected" : `${n} categories selected`;
				}

				renderChips(selected);

				if (labelEl) {
					if (chipsEl && labels.length) {
						labelEl.hidden = true;
					} else {
						labelEl.hidden = false;
						if (!labels.length) {
							labelEl.textContent = placeholder;
						} else if (labels.length <= 3) {
							labelEl.textContent = labels.join(", ");
						} else {
							labelEl.textContent = `${labels.length} categories selected`;
						}
					}
				}

				trigger?.classList.toggle("contact-dd__trigger--muted", !values.length);
				trigger?.classList.toggle("has-chips", values.length > 0);
			};

			const setOpen = (open) => {
				field?.classList.toggle("is-open", open);
				trigger?.setAttribute("aria-expanded", open ? "true" : "false");
				if (panel) panel.hidden = !open;
			};

			trigger?.addEventListener("click", (e) => {
				if (e.target.closest("[data-contact-dd-chip-remove]")) return;
				e.preventDefault();
				e.stopPropagation();
				const open = !field?.classList.contains("is-open");
				closeAllDds(dd);
				closeAllContactTimes();
				setOpen(open);
			});

			dd.querySelectorAll("[data-contact-dd-cat]").forEach((cat) => {
				cat.addEventListener("click", (e) => {
					e.preventDefault();
					e.stopPropagation();
					const id = cat.getAttribute("data-contact-dd-cat");
					dd.querySelectorAll("[data-contact-dd-cat]").forEach((c) => {
						const on = c === cat;
						c.classList.toggle("is-active", on);
						c.setAttribute("aria-selected", on ? "true" : "false");
					});
					dd.querySelectorAll("[data-contact-dd-tags]").forEach((tagsPanel) => {
						tagsPanel.hidden = tagsPanel.getAttribute("data-contact-dd-tags") !== id;
					});
				});
			});

			dd.querySelectorAll("[data-contact-dd-option]").forEach((opt) => {
				opt.addEventListener("click", (e) => {
					e.preventDefault();
					e.stopPropagation();
					const on = !opt.classList.contains("is-selected");
					opt.classList.toggle("is-selected", on);
					opt.setAttribute("aria-selected", on ? "true" : "false");
					syncUi();
				});
			});

			chipsEl?.addEventListener("click", (e) => {
				const remove = e.target.closest("[data-contact-dd-chip-remove]");
				if (!remove) return;
				e.preventDefault();
				e.stopPropagation();
				const value = remove.getAttribute("data-value") || "";
				const opt = Array.from(dd.querySelectorAll("[data-contact-dd-option]")).find(
					(el) => el.getAttribute("data-value") === value
				);
				if (!opt) return;
				opt.classList.remove("is-selected");
				opt.setAttribute("aria-selected", "false");
				syncUi();
			});

			clearBtn?.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				dd.querySelectorAll("[data-contact-dd-option]").forEach((opt) => {
					opt.classList.remove("is-selected");
					opt.setAttribute("aria-selected", "false");
				});
				syncUi();
			});

			syncUi();
		};

		const closeAllContactTimes = (except) => {
			contactTabsRoot.querySelectorAll("[data-contact-time]").forEach((wrap) => {
				if (except && wrap === except) return;
				const trigger = wrap.querySelector("[data-contact-time-trigger]");
				const panel = wrap.querySelector("[data-contact-time-panel]");
				wrap.classList.remove("is-open");
				trigger?.setAttribute("aria-expanded", "false");
				if (panel) panel.hidden = true;
			});
		};

		const initContactTimePicker = (wrap) => {
			if (!wrap || wrap.dataset.contactTimeReady === "1") return;
			wrap.dataset.contactTimeReady = "1";

			const trigger = wrap.querySelector("[data-contact-time-trigger]");
			const panel = wrap.querySelector("[data-contact-time-panel]");
			const input = wrap.querySelector("[data-contact-time-input]");
			const labelEl = wrap.querySelector("[data-contact-time-label]");
			const previewEl = wrap.querySelector("[data-contact-time-preview]");
			const hoursCol = wrap.querySelector("[data-contact-time-hours]");
			const minutesCol = wrap.querySelector("[data-contact-time-minutes]");
			const ampmCol = wrap.querySelector("[data-contact-time-ampm]");
			const confirmBtn = wrap.querySelector("[data-contact-time-confirm]");
			if (!trigger || !panel || !hoursCol || !minutesCol || !ampmCol) return;

			const placeholder = labelEl?.getAttribute("data-placeholder") || labelEl?.textContent || "";
			const hours = Array.from({ length: 12 }, (_, i) => i + 1);
			const minutes = Array.from({ length: 60 }, (_, i) => i);
			const ampm = ["AM", "PM"];

			let selectedHour = 10;
			let selectedMinute = 30;
			let selectedAmPm = "AM";
			let confirmedValue = input?.value || "";

			const pad = (n) => String(n).padStart(2, "0");

			const formatTime = (hour, minute, meridiem) => `${hour}:${pad(minute)} ${meridiem}`;

			const parseTime = (value) => {
				if (!value) return null;
				const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
				if (!match) return null;
				const hour = Number(match[1]);
				const minute = Number(match[2]);
				const meridiem = match[3].toUpperCase();
				if (hour < 1 || hour > 12 || minute < 0 || minute > 59) return null;
				return { hour, minute, meridiem };
			};

			const syncTrigger = () => {
				const parsed = parseTime(confirmedValue);
				if (parsed && labelEl) {
					labelEl.textContent = formatTime(parsed.hour, parsed.minute, parsed.meridiem);
					trigger.classList.add("has-value");
					return;
				}
				if (labelEl) labelEl.textContent = placeholder;
				trigger.classList.remove("has-value");
			};

			const syncPreview = () => {
				if (previewEl) {
					previewEl.textContent = formatTime(selectedHour, selectedMinute, selectedAmPm);
				}
			};

			const wrapIndex = (index, length) => ((index % length) + length) % length;

			const renderColumn = (col, items, selectedIndex, formatter, onSelect) => {
				col.innerHTML = "";
				const offsets = [-2, -1, 0, 1, 2];
				offsets.forEach((offset) => {
					const index = wrapIndex(selectedIndex + offset, items.length);
					const value = items[index];
					const btn = document.createElement("button");
					btn.type = "button";
					btn.className = "contact-time__cell";
					if (offset === 0) btn.classList.add("is-selected");
					else if (Math.abs(offset) === 1) btn.classList.add("is-near");
					btn.textContent = formatter(value);
					btn.addEventListener("click", (e) => {
						e.preventDefault();
						e.stopPropagation();
						onSelect(index);
					});
					col.appendChild(btn);
				});
			};

			const renderWheels = () => {
				renderColumn(
					hoursCol,
					hours,
					hours.indexOf(selectedHour),
					(v) => String(v),
					(index) => {
						selectedHour = hours[index];
						renderWheels();
						syncPreview();
					}
				);
				renderColumn(
					minutesCol,
					minutes,
					minutes.indexOf(selectedMinute),
					(v) => pad(v),
					(index) => {
						selectedMinute = minutes[index];
						renderWheels();
						syncPreview();
					}
				);
				renderColumn(
					ampmCol,
					ampm,
					ampm.indexOf(selectedAmPm),
					(v) => v,
					(index) => {
						selectedAmPm = ampm[index];
						renderWheels();
						syncPreview();
					}
				);
			};

			const setOpen = (open) => {
				wrap.classList.toggle("is-open", open);
				trigger.setAttribute("aria-expanded", open ? "true" : "false");
				panel.hidden = !open;
			};

			const openPicker = () => {
				closeAllDds();
				closeAllContactTimes(wrap);
				const parsed = parseTime(confirmedValue);
				if (parsed) {
					selectedHour = parsed.hour;
					selectedMinute = parsed.minute;
					selectedAmPm = parsed.meridiem;
				}
				renderWheels();
				syncPreview();
				setOpen(true);
			};

			trigger.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				if (wrap.classList.contains("is-open")) {
					setOpen(false);
					return;
				}
				openPicker();
			});

			confirmBtn?.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				confirmedValue = formatTime(selectedHour, selectedMinute, selectedAmPm);
				if (input) {
					input.value = confirmedValue;
					input.dispatchEvent(new Event("change", { bubbles: true }));
				}
				syncTrigger();
				setOpen(false);
			});

			if (confirmedValue) {
				const parsed = parseTime(confirmedValue);
				if (parsed) {
					selectedHour = parsed.hour;
					selectedMinute = parsed.minute;
					selectedAmPm = parsed.meridiem;
				}
			}
			syncTrigger();
		};

		contactTabsRoot.querySelectorAll("[data-contact-dd]").forEach((dd) => {
			if (dd.hasAttribute("data-contact-dd-multi") && dd.querySelector("[data-contact-dd-cat]")) {
				initContactEntTypeDd(dd);
				return;
			}
			initContactDd(dd);
		});

		contactTabsRoot.querySelectorAll("[data-contact-time]").forEach((wrap) => initContactTimePicker(wrap));

		document.addEventListener("click", (e) => {
			if (!e.target.closest("[data-contact-dd]")) {
				closeAllDds();
			}
			if (!e.target.closest("[data-contact-time]")) {
				closeAllContactTimes();
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				closeAllDds();
				closeAllContactTimes();
			}
		});

		/* File upload labels */
		const initContactFile = (wrap) => {
			if (!wrap || wrap.dataset.contactFileReady === "1") return;
			wrap.dataset.contactFileReady = "1";
			const input = wrap.querySelector("[data-contact-file-input]");
			const label = wrap.querySelector("[data-contact-file-label]");
			const fallback = label?.textContent || "";
			input?.addEventListener("change", () => {
				const files = Array.from(input.files || []);
				wrap.classList.toggle("has-files", files.length > 0);
				if (!label) return;
				if (!files.length) {
					label.textContent = fallback;
					return;
				}
				if (files.length === 1) {
					label.textContent = files[0].name;
					return;
				}
				label.textContent = `${files.length} files selected`;
			});
		};

		contactTabsRoot.querySelectorAll("[data-contact-file]").forEach((wrap) => initContactFile(wrap));

		contactTabsRoot.querySelectorAll("[data-contact-repeat]").forEach((root) => {
			const list = root.querySelector("[data-contact-repeat-list]");
			const addBtn = root.querySelector("[data-contact-repeat-add]");
			const template = root.querySelector("[data-contact-repeat-template]");
			const ranksNode = root.querySelector("[data-contact-repeat-ranks]");
			const max = Number(root.getAttribute("data-max") || 5);
			let ranks = [];
			try {
				const parsed = JSON.parse(ranksNode?.textContent || "[]");
				if (Array.isArray(parsed)) ranks = parsed;
			} catch (e) {
				/* keep defaults */
			}

			const updateRows = () => {
				const rows = Array.from(list?.querySelectorAll("[data-contact-repeat-row]") || []);
				if (addBtn) addBtn.hidden = rows.length >= max;
				rows.forEach((row, i) => {
					row.dataset.rank = String(i + 1);
					const rankEl = row.querySelector("[data-contact-repeat-rank]");
					if (rankEl) {
						rankEl.textContent = ranks[i] || `${i + 1}`;
					}
					const remove = row.querySelector("[data-contact-repeat-remove]");
					if (remove) {
						remove.hidden = rows.length <= 1;
					}
				});
			};

			list?.addEventListener("click", (e) => {
				const remove = e.target.closest("[data-contact-repeat-remove]");
				if (!remove) return;
				const row = remove.closest("[data-contact-repeat-row]");
				const rows = list.querySelectorAll("[data-contact-repeat-row]");
				if (rows.length <= 1) return;
				row?.remove();
				updateRows();
			});

			addBtn?.addEventListener("click", () => {
				const rows = list?.querySelectorAll("[data-contact-repeat-row]") || [];
				if (rows.length >= max || !template?.content) return;
				list.appendChild(template.content.cloneNode(true));
				const newRow = list.querySelector("[data-contact-repeat-row]:last-child");
				newRow?.querySelectorAll("[data-contact-file]").forEach((wrap) => initContactFile(wrap));
				newRow?.querySelectorAll(".contact-field__input--muted").forEach((el) => {
					const sync = () => el.classList.toggle("has-value", Boolean(el.value));
					el.addEventListener("change", sync);
					el.addEventListener("input", sync);
					sync();
				});
				updateRows();
			});

			updateRows();
		});
	}

	/* Header search dropdowns — close helpers */
	const closeHeaderPanels = (except) => {
		document
			.querySelectorAll(
				"[data-header-budget], [data-header-date], [data-header-location], [data-header-categories], [data-header-artist]"
			)
			.forEach((wrap) => {
				if (except && wrap === except) return;
				const panel =
					wrap.querySelector("[data-header-budget-panel]") ||
					wrap.querySelector("[data-header-date-panel]") ||
					wrap.querySelector("[data-header-location-panel]") ||
					wrap.querySelector("[data-header-categories-panel]") ||
					wrap.querySelector("[data-header-artist-panel]");
				const trigger =
					wrap.querySelector("[data-header-budget-trigger]") ||
					wrap.querySelector("[data-header-date-trigger]") ||
					wrap.querySelector("[data-header-location-trigger]") ||
					wrap.querySelector("[data-header-categories-trigger]") ||
					wrap.querySelector("[data-header-artist-trigger]");
				if (panel) panel.hidden = true;
				wrap.classList.remove("is-open");
				trigger?.setAttribute("aria-expanded", "false");
			});
		header?.classList.toggle("is-panel-open", hasOpenHeaderPanel());
	};

	/* Header search — Budget dropdown (Figma 1084:5398) */
	document.querySelectorAll("[data-header-budget]").forEach((wrap) => {
		const trigger = wrap.querySelector("[data-header-budget-trigger]");
		const panel = wrap.querySelector("[data-header-budget-panel]");
		const input = wrap.querySelector("[data-header-budget-input]");
		const meta = wrap.querySelector("[data-header-budget-meta]");
		const defaultMeta = meta?.getAttribute("data-default-meta") || "";
		const options = wrap.querySelectorAll("[data-header-budget-option]");
		if (!trigger || !panel || !input) return;

		const close = () => {
			panel.hidden = true;
			wrap.classList.remove("is-open");
			trigger.setAttribute("aria-expanded", "false");
		};

		const open = () => {
			closeHeaderPanels(wrap);
			panel.hidden = false;
			wrap.classList.add("is-open");
			trigger.setAttribute("aria-expanded", "true");
			header?.classList.add("is-panel-open");
		};

		const toggle = () => {
			if (panel.hidden) open();
			else close();
		};

		trigger.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			toggle();
		});

		options.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				const value = btn.getAttribute("data-value") || "";
				const text = btn.getAttribute("data-label") || value;
				input.value = value;
				if (meta) meta.textContent = text || defaultMeta;
				wrap.classList.toggle("is-filled", Boolean(value));
				options.forEach((opt) => {
					const on = opt === btn;
					opt.classList.toggle("is-selected", on);
					opt.setAttribute("aria-selected", on ? "true" : "false");
				});
				close();
			});
		});

		document.addEventListener("click", (e) => {
			if (!wrap.contains(e.target)) close();
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});
	});

	/* Header search — Event Date calendar (Figma 1084:5259) */
	document.querySelectorAll("[data-header-date]").forEach((wrap) => {
		const trigger = wrap.querySelector("[data-header-date-trigger]");
		const panel = wrap.querySelector("[data-header-date-panel]");
		const input = wrap.querySelector("[data-header-date-input]");
		const meta = wrap.querySelector("[data-header-date-meta]");
		const monthEl = wrap.querySelector("[data-header-date-month]");
		const grid = wrap.querySelector("[data-header-date-grid]");
		const prevBtn = wrap.querySelector("[data-header-date-prev]");
		const nextBtn = wrap.querySelector("[data-header-date-next]");
		const confirmBtn = wrap.querySelector("[data-header-date-confirm]");
		if (!trigger || !panel || !input || !grid || !monthEl) return;

		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		const pad = (n) => String(n).padStart(2, "0");
		const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
		const parseISO = (value) => {
			if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
			const [y, m, day] = value.split("-").map(Number);
			const d = new Date(y, m - 1, day);
			if (d.getFullYear() !== y || d.getMonth() !== m - 1 || d.getDate() !== day) return null;
			return d;
		};
		const dmyFormat = wrap.getAttribute("data-header-date-format") === "dd-mm-yyyy";
		const placeholder = meta?.getAttribute("data-default-meta") || "";
		const formatLabel = (d) => {
			if (!d) return placeholder;
			if (dmyFormat) {
				return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
			}
			return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
		};

		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const todayISO = toISO(today);

		let selectedISO = input.value && parseISO(input.value) ? input.value : "";
		let pendingISO = selectedISO;
		let view = (() => {
			const base = parseISO(selectedISO) || today;
			return { year: base.getFullYear(), month: base.getMonth() };
		})();

		const syncTrigger = () => {
			if (selectedISO) {
				const d = parseISO(selectedISO);
				if (d && meta) meta.textContent = formatLabel(d);
				trigger.classList.add("has-value");
				wrap.classList.add("is-filled");
				return;
			}
			if (meta && placeholder) meta.textContent = placeholder;
			trigger.classList.remove("has-value");
			wrap.classList.remove("is-filled");
		};

		const close = () => {
			panel.hidden = true;
			wrap.classList.remove("is-open");
			trigger.setAttribute("aria-expanded", "false");
			header?.classList.toggle("is-panel-open", hasOpenHeaderPanel());
		};

		const open = () => {
			closeHeaderPanels(wrap);
			const base = parseISO(selectedISO) || today;
			view = { year: base.getFullYear(), month: base.getMonth() };
			pendingISO = selectedISO;
			render();
			panel.hidden = false;
			wrap.classList.add("is-open");
			trigger.setAttribute("aria-expanded", "true");
			header?.classList.add("is-panel-open");
		};

		const render = () => {
			monthEl.textContent = `${monthNames[view.month]} ${view.year}`;
			grid.innerHTML = "";

			const first = new Date(view.year, view.month, 1);
			const start = new Date(first);
			start.setDate(first.getDate() - first.getDay());

			for (let week = 0; week < 6; week += 1) {
				const row = document.createElement("div");
				row.className = "header-date__row";
				row.setAttribute("role", "row");

				for (let i = 0; i < 7; i += 1) {
					const cellDate = new Date(start);
					cellDate.setDate(start.getDate() + week * 7 + i);
					const iso = toISO(cellDate);
					const outside = cellDate.getMonth() !== view.month;
					const isToday = iso === todayISO;
					const isSelected = iso === pendingISO;

					const cell = document.createElement("div");
					cell.className = "header-date__cell";
					cell.setAttribute("role", "gridcell");

					const btn = document.createElement("button");
					btn.type = "button";
					btn.className = "header-date__day";
					if (outside) btn.classList.add("is-outside");
					if (isToday) btn.classList.add("is-today");
					if (isSelected) btn.classList.add("is-selected");
					btn.textContent = String(cellDate.getDate());
					btn.setAttribute("data-date", iso);
					btn.setAttribute(
						"aria-label",
						cellDate.toLocaleDateString(undefined, {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})
					);
					btn.setAttribute("aria-pressed", isSelected ? "true" : "false");

					btn.addEventListener("click", (e) => {
						e.preventDefault();
						e.stopPropagation();
						pendingISO = iso;
						if (outside) {
							view = { year: cellDate.getFullYear(), month: cellDate.getMonth() };
						}
						render();
					});

					cell.appendChild(btn);
					row.appendChild(cell);
				}

				grid.appendChild(row);
			}

			if (confirmBtn) confirmBtn.disabled = !pendingISO;
		};

		trigger.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (panel.hidden) open();
			else close();
		});

		prevBtn?.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			view.month -= 1;
			if (view.month < 0) {
				view.month = 11;
				view.year -= 1;
			}
			render();
		});

		nextBtn?.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			view.month += 1;
			if (view.month > 11) {
				view.month = 0;
				view.year += 1;
			}
			render();
		});

		confirmBtn?.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (!pendingISO) return;
			const d = parseISO(pendingISO);
			if (!d) return;
			selectedISO = pendingISO;
			input.value = selectedISO;
			syncTrigger();
			close();
		});

		syncTrigger();

		panel.addEventListener("click", (e) => e.stopPropagation());

		document.addEventListener("click", (e) => {
			if (!wrap.contains(e.target)) close();
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});
	});

	/* Header search — Location dropdown (Figma 1669:6910) */
	document.querySelectorAll("[data-header-location]").forEach((wrap) => {
		const trigger = wrap.querySelector("[data-header-location-trigger]");
		const panel = wrap.querySelector("[data-header-location-panel]");
		const input = wrap.querySelector("[data-header-location-input]");
		const meta = wrap.querySelector("[data-header-location-meta]");
		const defaultMeta = meta?.getAttribute("data-default-meta") || "";
		const search = wrap.querySelector("[data-header-location-search]");
		const confirmBtn = wrap.querySelector("[data-header-location-confirm]");
		if (!trigger || !panel || !input || !search) return;

		let selectedValue = (input.value || "").trim();

		const syncConfirm = (value) => {
			if (confirmBtn) confirmBtn.disabled = !value;
		};

		const applyValue = (value) => {
			selectedValue = value;
			input.value = selectedValue;
			if (meta) meta.textContent = selectedValue || defaultMeta;
			wrap.classList.toggle("is-filled", Boolean(selectedValue));
			syncConfirm(selectedValue);
		};

		const close = () => {
			panel.hidden = true;
			wrap.classList.remove("is-open");
			trigger.setAttribute("aria-expanded", "false");
			header?.classList.toggle("is-panel-open", hasOpenHeaderPanel());
		};

		const open = () => {
			closeHeaderPanels(wrap);
			search.value = selectedValue;
			syncConfirm(selectedValue);
			panel.hidden = false;
			wrap.classList.add("is-open");
			trigger.setAttribute("aria-expanded", "true");
			header?.classList.add("is-panel-open");
			window.setTimeout(() => {
				search.focus();
				search.select?.();
			}, 0);
		};

		trigger.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (panel.hidden) open();
			else close();
		});

		search.addEventListener("input", () => {
			syncConfirm(search.value.trim());
		});
		search.addEventListener("click", (e) => e.stopPropagation());
		search.addEventListener("keydown", (e) => {
			e.stopPropagation();
			if (e.key === "Enter") {
				e.preventDefault();
				const value = search.value.trim();
				if (!value) return;
				applyValue(value);
				close();
			}
		});

		confirmBtn?.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			const value = search.value.trim();
			if (!value) return;
			applyValue(value);
			close();
		});

		panel.addEventListener("click", (e) => e.stopPropagation());

		document.addEventListener("click", (e) => {
			if (!wrap.contains(e.target)) close();
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});
	});

	/* Header search — Browse Categories (Figma 1179:77179) */
	document.querySelectorAll("[data-header-categories]").forEach((wrap) => {
		const trigger = wrap.querySelector("[data-header-categories-trigger]");
		const panel = wrap.querySelector("[data-header-categories-panel]");
		const categoryInput = wrap.querySelector("[data-header-category-input]");
		const subCategoryInput = wrap.querySelector("[data-header-sub-category-input]");
		const meta = wrap.querySelector("[data-header-categories-meta]");
		const defaultMeta = meta?.getAttribute("data-default-meta") || "";
		const groupBtns = Array.from(wrap.querySelectorAll("[data-header-categories-group]"));
		const groupPanels = Array.from(wrap.querySelectorAll("[data-header-categories-panel-group]"));
		const tags = Array.from(wrap.querySelectorAll("[data-header-categories-tag]"));
		const confirmBtn = wrap.querySelector("[data-header-categories-confirm]");
		if (!trigger || !panel || !categoryInput || !subCategoryInput) return;

		const parseValues = (raw) =>
			(raw || "")
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean);

		let selectedCategory = categoryInput.value || groupBtns[0]?.getAttribute("data-group") || "";
		let selectedSubValues = parseValues(subCategoryInput.value);
		let activeGroup = selectedCategory;
		let pendingSubValues = [...selectedSubValues];

		const filterValuesForGroup = (values, groupId) => {
			const groupTagValues = new Set(
				tags
					.filter((tag) => {
						const pane = tag.closest("[data-header-categories-panel-group]");
						return pane?.getAttribute("data-header-categories-panel-group") === groupId;
					})
					.map((tag) => tag.getAttribute("data-value") || "")
					.filter(Boolean)
			);
			return values.filter((value) => groupTagValues.has(value));
		};

		const setGroup = (groupId) => {
			activeGroup = groupId;
			groupBtns.forEach((btn) => {
				const on = btn.getAttribute("data-group") === groupId;
				btn.classList.toggle("is-active", on);
				btn.setAttribute("aria-selected", on ? "true" : "false");
			});
			groupPanels.forEach((pane) => {
				const on = pane.getAttribute("data-header-categories-panel-group") === groupId;
				pane.classList.toggle("is-active", on);
				pane.hidden = !on;
			});
			pendingSubValues = filterValuesForGroup(selectedSubValues, groupId);
			syncTags();
		};

		const syncTags = () => {
			tags.forEach((tag) => {
				const pane = tag.closest("[data-header-categories-panel-group]");
				const groupId = pane?.getAttribute("data-header-categories-panel-group") || "";
				const value = tag.getAttribute("data-value") || "";
				const on = groupId === activeGroup && pendingSubValues.includes(value);
				tag.classList.toggle("is-selected", on);
				tag.setAttribute("aria-selected", on ? "true" : "false");
			});
		};

		const syncTrigger = () => {
			const labels = selectedSubValues
				.map((value) => tags.find((tag) => tag.getAttribute("data-value") === value)?.getAttribute("data-label") || "")
				.filter(Boolean);
			if (meta) {
				if (!labels.length) {
					meta.textContent = defaultMeta;
				} else if (labels.length > 3) {
					meta.textContent = `${labels.slice(0, 3).join(", ")}...`;
				} else {
					meta.textContent = labels.join(", ");
				}
			}
			wrap.classList.toggle("is-filled", labels.length > 0);
		};

		const close = () => {
			panel.hidden = true;
			wrap.classList.remove("is-open");
			trigger.setAttribute("aria-expanded", "false");
			header?.classList.toggle("is-panel-open", hasOpenHeaderPanel());
		};

		const open = () => {
			closeHeaderPanels(wrap);
			activeGroup = selectedCategory || groupBtns[0]?.getAttribute("data-group") || "";
			pendingSubValues = filterValuesForGroup(selectedSubValues, activeGroup);
			setGroup(activeGroup);
			panel.hidden = false;
			wrap.classList.add("is-open");
			trigger.setAttribute("aria-expanded", "true");
			header?.classList.add("is-panel-open");
			window.requestAnimationFrame(() => {
				fitHeaderDropdown(panel);
				window.requestAnimationFrame(() => fitHeaderDropdown(panel));
			});
		};

		trigger.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (panel.hidden) open();
			else close();
		});

		groupBtns.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				setGroup(btn.getAttribute("data-group") || "");
			});
		});

		tags.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				const pane = btn.closest("[data-header-categories-panel-group]");
				const groupId = pane?.getAttribute("data-header-categories-panel-group") || "";
				if (groupId !== activeGroup) return;
				const value = btn.getAttribute("data-value") || "";
				if (!value) return;
				if (pendingSubValues.includes(value)) {
					pendingSubValues = pendingSubValues.filter((item) => item !== value);
				} else {
					pendingSubValues.push(value);
				}
				syncTags();
			});
		});

		confirmBtn?.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			selectedSubValues = [...pendingSubValues];
			selectedCategory = selectedSubValues.length ? activeGroup : "";
			categoryInput.value = selectedCategory;
			subCategoryInput.value = selectedSubValues.join(",");
			syncTrigger();
			close();
		});

		panel.addEventListener("click", (e) => e.stopPropagation());
		panel.addEventListener(
			"wheel",
			(e) => {
				e.stopPropagation();
			},
			{ passive: true }
		);

		document.addEventListener("click", (e) => {
			if (!wrap.contains(e.target)) close();
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});

		window.addEventListener("resize", () => {
			if (!panel.hidden) fitHeaderDropdown(panel);
		});

		syncTrigger();
	});

	/* Header search — Search Artist (Figma 1084:5103) */
	document.querySelectorAll("[data-header-artist]").forEach((wrap) => {
		const trigger = wrap.querySelector("[data-header-artist-trigger]");
		const panel = wrap.querySelector("[data-header-artist-panel]");
		const input = wrap.querySelector("[data-header-artist-input]");
		const meta = wrap.querySelector("[data-header-artist-meta]");
		const search = wrap.querySelector("[data-header-artist-search]");
		const empty = wrap.querySelector("[data-header-artist-empty]");
		const items = Array.from(wrap.querySelectorAll("[data-header-artist-item]"));
		const options = Array.from(wrap.querySelectorAll("[data-header-artist-option]"));
		if (!trigger || !panel || !input) return;

		const defaultMeta = meta?.getAttribute("data-default-meta") || "";

		const filterResults = () => {
			const q = (search?.value || "").trim().toLowerCase();
			let visible = 0;
			items.forEach((item) => {
				const opt = item.querySelector("[data-header-artist-option]");
				const hay = opt?.getAttribute("data-search") || "";
				const show = !q || hay.includes(q);
				item.hidden = !show;
				if (show) visible += 1;
			});
			if (empty) empty.hidden = visible > 0;
		};

		const close = () => {
			panel.hidden = true;
			wrap.classList.remove("is-open");
			trigger.setAttribute("aria-expanded", "false");
			header?.classList.toggle("is-panel-open", hasOpenHeaderPanel());
		};

		const open = () => {
			closeHeaderPanels(wrap);
			if (search) search.value = input.value || "";
			filterResults();
			panel.hidden = false;
			wrap.classList.add("is-open");
			trigger.setAttribute("aria-expanded", "true");
			header?.classList.add("is-panel-open");
			window.setTimeout(() => {
				search?.focus();
				search?.select?.();
			}, 0);
		};

		trigger.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (panel.hidden) open();
			else close();
		});

		search?.addEventListener("input", () => {
			filterResults();
			const q = (search.value || "").trim();
			input.value = q;
			if (meta) meta.textContent = q || defaultMeta;
			wrap.classList.toggle("is-filled", Boolean(q));
		});

		search?.addEventListener("click", (e) => e.stopPropagation());
		search?.addEventListener("keydown", (e) => {
			e.stopPropagation();
			if (e.key === "Enter") {
				e.preventDefault();
				const first = options.find((opt) => !opt.closest("[data-header-artist-item]")?.hidden);
				if (first) first.click();
			}
		});

		options.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				const value = btn.getAttribute("data-value") || "";
				input.value = value;
				if (search) search.value = value;
				if (meta) meta.textContent = value || defaultMeta;
				wrap.classList.toggle("is-filled", Boolean(value));
				close();
			});
		});

		panel.addEventListener("click", (e) => e.stopPropagation());

		document.addEventListener("click", (e) => {
			if (!wrap.contains(e.target)) close();
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});
	});

	/* ---------- Footer accordion (phone + tablet) ---------- */
	const footerAccordions = document.querySelectorAll("[data-footer-acc]");
	if (footerAccordions.length) {
		const isFooterAccordion = () => window.matchMedia("(max-width: 1199px)").matches;

		footerAccordions.forEach((column) => {
			const trigger = column.querySelector("[data-footer-trigger]");
			const panel = column.querySelector("[data-footer-panel]");
			if (!trigger || !panel) {
				return;
			}

			trigger.addEventListener("click", () => {
				if (!isFooterAccordion()) {
					return;
				}

				const open = !column.classList.contains("is-open");
				column.classList.toggle("is-open", open);
				trigger.setAttribute("aria-expanded", open ? "true" : "false");
				panel.hidden = !open;
			});
		});
	}

	/* ---------- Mobile search overlay (Figma 1706:29064) ---------- */
	document.querySelectorAll("[data-mobile-search]").forEach((root) => {
		const openBtn = root.querySelector("[data-mobile-search-open]");
		const panel = root.querySelector("[data-mobile-search-panel]");
		const sheet = root.querySelector("[data-msm-sheet]");
		const closeBtns = root.querySelectorAll("[data-mobile-search-close]");
		const clearBtn = root.querySelector("[data-mobile-search-clear]");
		const cards = Array.from(root.querySelectorAll("[data-msm-card]"));
		const artistSearch = root.querySelector("[data-msm-artist-search]");
		const artistEmpty = root.querySelector("[data-msm-artist-empty]");
		const artistItems = Array.from(root.querySelectorAll("[data-msm-artist-item]"));
		const artistCard = root.querySelector('[data-msm-card="artist"]');
		const categoriesCard = root.querySelector('[data-msm-card="categories"]');
		const locationCard = root.querySelector('[data-msm-card="location"]');
		const dateCard = root.querySelector('[data-msm-card="date"]');
		const budgetCard = root.querySelector('[data-msm-card="budget"]');
		const categoryInput = root.querySelector("[data-msm-category-input]");
		const subCategoryInput = root.querySelector("[data-msm-sub-category-input]");
		const subCategoryChecks = Array.from(root.querySelectorAll("[data-msm-sub-category-check]"));
		const locationInput = root.querySelector("[data-msm-location-input]");
		const dateInput = root.querySelector("[data-msm-date-input]");
		const budgetInput = root.querySelector("[data-msm-budget-input]");
		const catTabs = Array.from(root.querySelectorAll("[data-msm-cat-tab]"));
		const catPanels = Array.from(root.querySelectorAll("[data-msm-cat-panel]"));
		const triggerHintDefault = root.querySelector("[data-msm-trigger-hint-default]");
		const triggerHints = root.querySelector("[data-msm-trigger-hints]");
		const triggerFilterKeys = ["artist", "categories", "location", "date", "budget"];
		const homeRoot = root.querySelector(".header-search-mobile__home");
		const homeDropdown = root.querySelector("[data-msm-home-dropdown]");
		const homeChips = Array.from(root.querySelectorAll("[data-msm-home-chip]"));
		const homeSearchBtn = root.querySelector("[data-msm-home-search]");
		const homeInlineMq = window.matchMedia("(max-width: 767px)");
		if (!openBtn || !panel) return;

		const isHomeInline = () =>
			(document.body.classList.contains("home") ||
				document.body.classList.contains("front-page") ||
				document.body.classList.contains("search")) &&
			homeInlineMq.matches;

		let activeHomePanel = null;
		let activeHomeCard = null;
		let activeHomeChip = null;

		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const pad = (n) => String(n).padStart(2, "0");
		const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
		const parseISO = (value) => {
			if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
			const [y, m, day] = value.split("-").map(Number);
			const d = new Date(y, m - 1, day);
			if (d.getFullYear() !== y || d.getMonth() !== m - 1 || d.getDate() !== day) return null;
			return d;
		};
		const formatDMY = (d) => (d ? `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}` : "");

		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const todayISO = toISO(today);

		let selectedISO = dateInput?.value && parseISO(dateInput.value) ? dateInput.value : "";
		let pendingISO = selectedISO;
		let view = (() => {
			const base = parseISO(selectedISO) || today;
			return { year: base.getFullYear(), month: base.getMonth() };
		})();

		const setCardMeta = (card, filled, text) => {
			if (!card) return;
			const meta = card.querySelector("[data-msm-summary-meta]");
			const placeholder = meta?.getAttribute("data-placeholder") || "";
			if (meta) meta.textContent = filled ? text : placeholder;
			card.classList.toggle("is-filled", Boolean(filled));
		};

		const getActiveCategoryKey = () =>
			catTabs.find((tab) => tab.classList.contains("is-active"))?.getAttribute("data-msm-cat-tab") || "";

		const getActiveCategoryChecks = () => {
			const activeKey = getActiveCategoryKey();
			const activePanel = catPanels.find((pane) => pane.getAttribute("data-msm-cat-panel") === activeKey);
			return activePanel
				? Array.from(activePanel.querySelectorAll("[data-msm-sub-category-check].is-checked"))
				: [];
		};

		const getTriggerFilterStates = () => ({
			artist: Boolean((artistSearch?.value || "").trim()),
			categories: Boolean((subCategoryInput?.value || "").trim()) || subCategoryChecks.some((btn) => btn.classList.contains("is-checked")),
			location: Boolean((locationInput?.value || "").trim()),
			date: Boolean(selectedISO),
			budget: Boolean(budgetInput?.value),
		});

		const formatShortDate = (d) =>
			d
				? d.toLocaleDateString(undefined, {
						month: "short",
						day: "numeric",
					})
				: "";

		const getFilterDisplayValues = () => {
			const subValues = (subCategoryInput?.value || "")
				.split(",")
				.map((value) => value.trim())
				.filter(Boolean);
			const categoryLabels = subValues
				.map(
					(value) =>
						subCategoryChecks.find((btn) => btn.getAttribute("data-value") === value)?.getAttribute("data-label") ||
						""
				)
				.filter(Boolean);

			return {
				artist: (artistSearch?.value || "").trim(),
				categories: categoryLabels.length === 1 ? categoryLabels[0] : categoryLabels.join(", "),
				location: (locationInput?.value || "").trim(),
				date: selectedISO ? formatShortDate(parseISO(selectedISO)) : "",
				budget: root.querySelector("[data-msm-budget-option].is-selected")?.getAttribute("data-label") || "",
			};
		};

		const syncHomeChips = () => {
			if (!homeRoot) return;

			const states = getTriggerFilterStates();
			const values = getFilterDisplayValues();
			const hasFilters = triggerFilterKeys.some((key) => states[key]);

			homeRoot.classList.toggle("has-selections", hasFilters);
			if (homeSearchBtn) homeSearchBtn.hidden = !hasFilters;

			homeChips.forEach((chip) => {
				const key = chip.getAttribute("data-msm-home-chip") || "";
				const filled = Boolean(states[key]);
				const emptyEl = chip.querySelector(".header-search-mobile__chip-empty");
				const filledEl = chip.querySelector(".header-search-mobile__chip-filled");
				const valueEl = chip.querySelector("[data-msm-chip-value]");

				chip.classList.toggle("is-filled", filled);
				if (emptyEl) emptyEl.hidden = filled;
				if (filledEl) filledEl.hidden = !filled;
				if (valueEl && filled) valueEl.textContent = values[key] || "";
			});
		};

		const clearHomeFilter = (key) => {
			if (key === "artist") {
				if (artistSearch) artistSearch.value = "";
				filterArtists();
				syncArtistSummary();
			} else if (key === "categories") {
				subCategoryChecks.forEach((btn) => {
					btn.classList.remove("is-checked");
					btn.setAttribute("aria-pressed", "false");
				});
				if (categoryInput) categoryInput.value = "";
				if (subCategoryInput) subCategoryInput.value = "";
				syncCategoryInputs();
			} else if (key === "location") {
				if (locationInput) locationInput.value = "";
				syncLocationSummary();
			} else if (key === "date") {
				selectedISO = "";
				pendingISO = "";
				if (dateInput) dateInput.value = "";
				syncDateSummary();
			} else if (key === "budget") {
				if (budgetInput) budgetInput.value = "";
				root.querySelectorAll("[data-msm-budget-option]").forEach((opt) => {
					opt.classList.remove("is-selected");
				});
				syncBudgetSummary();
			}
			closeHomeDropdown();
		};

		const syncTriggerHints = () => {
			const states = getTriggerFilterStates();
			const hasFilters = triggerFilterKeys.some((key) => states[key]);

			openBtn.classList.toggle("has-filters", hasFilters);
			if (triggerHintDefault) triggerHintDefault.hidden = hasFilters;
			if (triggerHints) triggerHints.hidden = !hasFilters;

			triggerFilterKeys.forEach((key) => {
				root.querySelectorAll(`[data-msm-trigger-filter="${key}"]`).forEach((el) => {
					if (el.matches("[data-msm-home-chip]")) return;
					el.classList.toggle("is-active", states[key]);
				});
			});

			root.querySelectorAll("[data-msm-trigger-sep]").forEach((sep) => {
				const after = sep.getAttribute("data-after") || "";
				const before = sep.getAttribute("data-before") || "";
				sep.classList.toggle("is-active", Boolean(states[after] || states[before]));
			});

			syncHomeChips();
		};

		const filterArtists = () => {
			const q = (artistSearch?.value || "").trim().toLowerCase();
			let visible = 0;
			artistItems.forEach((item) => {
				const opt = item.querySelector("[data-msm-artist-option]");
				const hay = opt?.getAttribute("data-search") || "";
				const show = !q || hay.includes(q);
				item.hidden = !show;
				if (show) visible += 1;
			});
			if (artistEmpty) artistEmpty.hidden = visible > 0;
		};

		const syncArtistSummary = () => {
			const value = (artistSearch?.value || "").trim();
			setCardMeta(artistCard, Boolean(value), value);
			syncTriggerHints();
		};

		const syncCategoryInputs = () => {
			const activeKey = getActiveCategoryKey();
			const selected = getActiveCategoryChecks();
			const values = selected.map((btn) => btn.getAttribute("data-value") || "").filter(Boolean);
			const labels = selected.map((btn) => btn.getAttribute("data-label") || "").filter(Boolean);
			if (categoryInput) categoryInput.value = labels.length ? activeKey : "";
			if (subCategoryInput) subCategoryInput.value = values.join(",");
			if (labels.length === 1) {
				setCardMeta(categoriesCard, true, labels[0]);
			} else if (labels.length > 1) {
				setCardMeta(categoriesCard, true, labels.join(", "));
			} else {
				setCardMeta(categoriesCard, false, "");
			}
			syncTriggerHints();
		};

		const syncLocationSummary = () => {
			const value = (locationInput?.value || "").trim();
			setCardMeta(locationCard, Boolean(value), value);
			syncTriggerHints();
		};

		const syncDateSummary = () => {
			const d = parseISO(selectedISO);
			if (d) {
				setCardMeta(dateCard, true, formatDMY(d));
				syncTriggerHints();
				return;
			}
			setCardMeta(dateCard, false, "");
			syncTriggerHints();
		};

		const syncBudgetSummary = () => {
			const selected = root.querySelector("[data-msm-budget-option].is-selected");
			const label = selected?.getAttribute("data-label") || "";
			setCardMeta(budgetCard, Boolean(label), label);
			syncTriggerHints();
		};

		const closeHomeDropdown = () => {
			if (activeHomePanel && activeHomeCard) {
				activeHomePanel.hidden = true;
				activeHomeCard.appendChild(activeHomePanel);
			}
			activeHomePanel = null;
			activeHomeCard = null;
			if (activeHomeChip) {
				activeHomeChip.classList.remove("is-open");
				activeHomeChip.setAttribute("aria-expanded", "false");
				activeHomeChip = null;
			}
			if (homeDropdown) {
				homeDropdown.hidden = true;
				homeDropdown.removeAttribute("data-panel");
			}
		};

		const collapsePanels = () => {
			if (isHomeInline()) {
				closeHomeDropdown();
				return;
			}
			collapseCards();
		};

		const openHomeDropdown = (key) => {
			if (!isHomeInline() || !homeDropdown) return;

			const chip = root.querySelector(`[data-msm-home-chip="${key}"]`);
			const card = root.querySelector(`[data-msm-card="${key}"]`);
			const panel = card?.querySelector("[data-msm-panel]");
			if (!chip || !panel) return;

			const alreadyOpen = chip.classList.contains("is-open");
			closeHomeDropdown();
			if (alreadyOpen) return;

			homeDropdown.hidden = false;
			homeDropdown.setAttribute("data-panel", key);
			homeDropdown.appendChild(panel);
			panel.hidden = false;
			activeHomePanel = panel;
			activeHomeCard = card;
			activeHomeChip = chip;
			chip.classList.add("is-open");
			chip.setAttribute("aria-expanded", "true");

			window.setTimeout(() => {
				if (key === "artist") {
					filterArtists();
					artistSearch?.focus();
				} else if (key === "location") {
					locationInput?.focus();
				} else if (key === "date") {
					const base = parseISO(selectedISO) || today;
					view = { year: base.getFullYear(), month: base.getMonth() };
					pendingISO = selectedISO;
					renderCalendar();
				}
			}, 0);
		};

		const collapseCards = () => {
			cards.forEach((card) => {
				const toggle = card.querySelector("[data-msm-card-toggle]");
				const cardPanel = card.querySelector("[data-msm-panel]");
				card.classList.remove("is-open");
				toggle?.setAttribute("aria-expanded", "false");
				if (cardPanel) cardPanel.hidden = true;
			});
			sheet?.classList.remove("is-expanded");
		};

		const calMonth = root.querySelector("[data-msm-cal-month]");
		const calGrid = root.querySelector("[data-msm-cal-grid]");

		const renderCalendar = () => {
			if (!calMonth || !calGrid) return;
			calMonth.textContent = `${monthNames[view.month]} ${view.year}`;
			calGrid.innerHTML = "";

			const first = new Date(view.year, view.month, 1);
			const start = new Date(first);
			start.setDate(first.getDate() - first.getDay());

			for (let week = 0; week < 6; week += 1) {
				const row = document.createElement("div");
				row.className = "header-search-mobile__cal-row";
				row.setAttribute("role", "row");

				for (let i = 0; i < 7; i += 1) {
					const cellDate = new Date(start);
					cellDate.setDate(start.getDate() + week * 7 + i);
					const iso = toISO(cellDate);
					const outside = cellDate.getMonth() !== view.month;
					const isToday = iso === todayISO;
					const isSelected = iso === pendingISO;

					const btn = document.createElement("button");
					btn.type = "button";
					btn.className = "header-search-mobile__cal-day";
					if (outside) btn.classList.add("is-outside");
					if (isToday) btn.classList.add("is-today");
					if (isSelected) btn.classList.add("is-selected");
					btn.textContent = String(cellDate.getDate());
					btn.setAttribute("data-date", iso);
					btn.setAttribute(
						"aria-label",
						cellDate.toLocaleDateString(undefined, {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})
					);
					btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
					btn.addEventListener("click", (e) => {
						e.preventDefault();
						pendingISO = iso;
						if (outside) {
							view = { year: cellDate.getFullYear(), month: cellDate.getMonth() };
						}
						renderCalendar();
						if (isHomeInline()) {
							selectedISO = pendingISO;
							if (dateInput) dateInput.value = selectedISO;
							syncDateSummary();
							collapsePanels();
						}
					});

					row.appendChild(btn);
				}

				calGrid.appendChild(row);
			}
		};

		const openCard = (card) => {
			const alreadyOpen = card.classList.contains("is-open");
			collapseCards();
			if (alreadyOpen) return;

			const toggle = card.querySelector("[data-msm-card-toggle]");
			const cardPanel = card.querySelector("[data-msm-panel]");
			card.classList.add("is-open");
			toggle?.setAttribute("aria-expanded", "true");
			if (cardPanel) cardPanel.hidden = false;
			sheet?.classList.add("is-expanded");

			const key = card.getAttribute("data-msm-card");
			window.setTimeout(() => {
				if (key === "artist") {
					filterArtists();
					artistSearch?.focus();
				} else if (key === "location") {
					locationInput?.focus();
				} else if (key === "date") {
					const base = parseISO(selectedISO) || today;
					view = { year: base.getFullYear(), month: base.getMonth() };
					pendingISO = selectedISO;
					renderCalendar();
				}
			}, 0);
		};

		const overlayHome = panel.parentNode;

		const open = () => {
			if (isHomeInline()) return;
			document.body.appendChild(panel);
			panel.hidden = false;
			openBtn.setAttribute("aria-expanded", "true");
			document.body.classList.add("mobile-search-open");
			collapseCards();
			filterArtists();
		};

		const close = () => {
			if (isHomeInline()) {
				closeHomeDropdown();
				return;
			}
			panel.hidden = true;
			openBtn.setAttribute("aria-expanded", "false");
			document.body.classList.remove("mobile-search-open");
			collapseCards();
			if (overlayHome && panel.parentNode !== overlayHome) {
				overlayHome.appendChild(panel);
			}
		};

		openBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (isHomeInline()) return;
			open();
		});

		homeChips.forEach((chip) => {
			chip.addEventListener("click", (e) => {
				if (e.target.closest("[data-msm-chip-clear]")) return;
				e.preventDefault();
				e.stopPropagation();
				if (!isHomeInline()) return;
				const key = chip.getAttribute("data-msm-home-chip") || "";
				openHomeDropdown(key);
			});
		});

		root.querySelectorAll("[data-msm-chip-clear]").forEach((clearBtn) => {
			const handleClear = (e) => {
				e.preventDefault();
				e.stopPropagation();
				const key = clearBtn.getAttribute("data-msm-chip-clear") || "";
				if (key) clearHomeFilter(key);
			};
			clearBtn.addEventListener("click", handleClear);
			clearBtn.addEventListener("keydown", (e) => {
				if (e.key !== "Enter" && e.key !== " ") return;
				handleClear(e);
			});
		});

		document.addEventListener("click", (e) => {
			if (!isHomeInline() || homeDropdown?.hidden) return;
			if (e.target.closest("[data-msm-home-chip]")) return;
			if (homeDropdown.contains(e.target)) return;
			closeHomeDropdown();
		});

		homeInlineMq.addEventListener("change", () => {
			if (!isHomeInline()) closeHomeDropdown();
		});

		syncHomeChips();

		closeBtns.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				close();
			});
		});

		panel.addEventListener("click", (e) => {
			if (e.target === panel) close();
		});

		document.addEventListener("keydown", (e) => {
			if (e.key !== "Escape") return;
			if (isHomeInline() && !homeDropdown?.hidden) {
				closeHomeDropdown();
				return;
			}
			if (panel.hidden) return;
			if (sheet?.classList.contains("is-expanded")) {
				collapseCards();
				return;
			}
			close();
		});

		cards.forEach((card) => {
			const toggle = card.querySelector("[data-msm-card-toggle]");
			toggle?.addEventListener("click", (e) => {
				e.preventDefault();
				openCard(card);
			});
			card.querySelector("[data-msm-card-collapse]")?.addEventListener("click", (e) => {
				e.preventDefault();
				collapseCards();
			});
		});

		artistSearch?.addEventListener("input", () => {
			filterArtists();
			syncArtistSummary();
		});

		root.querySelectorAll("[data-msm-artist-option]").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				const value = btn.getAttribute("data-value") || "";
				if (artistSearch) artistSearch.value = value;
				filterArtists();
				syncArtistSummary();
				collapsePanels();
			});
		});

		catTabs.forEach((tab) => {
			tab.addEventListener("click", (e) => {
				e.preventDefault();
				const key = tab.getAttribute("data-msm-cat-tab") || "";
				catTabs.forEach((other) => {
					const on = other === tab;
					other.classList.toggle("is-active", on);
					other.setAttribute("aria-selected", on ? "true" : "false");
				});
				catPanels.forEach((catPanel) => {
					catPanel.hidden = catPanel.getAttribute("data-msm-cat-panel") !== key;
				});
				syncCategoryInputs();
			});
		});

		subCategoryChecks.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				const on = !btn.classList.contains("is-checked");
				btn.classList.toggle("is-checked", on);
				btn.setAttribute("aria-pressed", on ? "true" : "false");
				syncCategoryInputs();
			});
		});

		root.querySelector("[data-msm-confirm='categories']")?.addEventListener("click", (e) => {
			e.preventDefault();
			syncCategoryInputs();
			collapsePanels();
		});

		root.querySelector("[data-msm-confirm='location']")?.addEventListener("click", (e) => {
			e.preventDefault();
			syncLocationSummary();
			collapsePanels();
		});

		locationInput?.addEventListener("keydown", (e) => {
			if (e.key !== "Enter") return;
			e.preventDefault();
			syncLocationSummary();
			collapsePanels();
		});

		locationInput?.addEventListener("blur", () => {
			window.setTimeout(() => {
				syncLocationSummary();
				if (isHomeInline() && homeDropdown && !homeDropdown.contains(document.activeElement)) {
					collapsePanels();
				}
			}, 0);
		});

		root.querySelector("[data-msm-cal-prev]")?.addEventListener("click", (e) => {
			e.preventDefault();
			view.month -= 1;
			if (view.month < 0) {
				view.month = 11;
				view.year -= 1;
			}
			renderCalendar();
		});

		root.querySelector("[data-msm-cal-next]")?.addEventListener("click", (e) => {
			e.preventDefault();
			view.month += 1;
			if (view.month > 11) {
				view.month = 0;
				view.year += 1;
			}
			renderCalendar();
		});

		root.querySelector("[data-msm-confirm='date']")?.addEventListener("click", (e) => {
			e.preventDefault();
			if (!pendingISO) return;
			selectedISO = pendingISO;
			if (dateInput) dateInput.value = selectedISO;
			syncDateSummary();
			collapsePanels();
		});

		root.querySelectorAll("[data-msm-budget-option]").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				const value = btn.getAttribute("data-value") || "";
				if (budgetInput) budgetInput.value = value;
				root.querySelectorAll("[data-msm-budget-option]").forEach((other) => {
					other.classList.toggle("is-selected", other === btn);
				});
				syncBudgetSummary();
				if (isHomeInline()) collapsePanels();
			});
		});

		clearBtn?.addEventListener("click", (e) => {
			e.preventDefault();
			if (artistSearch) artistSearch.value = "";
			filterArtists();
			syncArtistSummary();

			subCategoryChecks.forEach((btn) => {
				btn.classList.remove("is-checked");
				btn.setAttribute("aria-pressed", "false");
			});
			if (categoryInput) categoryInput.value = "";
			if (subCategoryInput) subCategoryInput.value = "";
			syncCategoryInputs();

			if (locationInput) locationInput.value = "";
			syncLocationSummary();

			selectedISO = "";
			pendingISO = "";
			if (dateInput) dateInput.value = "";
			view = { year: today.getFullYear(), month: today.getMonth() };
			syncDateSummary();
			if (dateCard?.classList.contains("is-open")) renderCalendar();

			if (budgetInput) budgetInput.value = "";
			root.querySelectorAll("[data-msm-budget-option]").forEach((opt) => {
				opt.classList.remove("is-selected");
			});
			syncBudgetSummary();
			collapseCards();
		});
	});

	/* ---------- Services swap (click morph — services-showcase.html) ---------- */
	const servicesSwap = document.querySelector("[data-services-swap]");
	if (servicesSwap) {
		const servicesPin = document.querySelector("[data-services-pin]");
		const featured = servicesSwap.querySelector("[data-service-featured]");
		const cards = Array.from(servicesSwap.querySelectorAll("[data-service-card]"));
		const swapMs = reduced ? 0 : 680;
		const pinMq = window.matchMedia("(min-width: 320px)");
		const fitMq = window.matchMedia("(min-width: 320px)");
		const servicesFillMq = window.matchMedia("(min-width: 768px)");
		let busy = false;
		let pending = null;
		let activeId = featured?.getAttribute("data-service-id") || "";
		let servicesMobilePinInitialized = false;
		let servicesWasPinned = false;
		let lastServicesFillStickyTop = -1;
		let servicesPinSyncQueued = false;

		const isServicesMobile = () => window.innerWidth <= 767;

		const isServicesFrontDesktop = () =>
			servicesFillMq.matches &&
			(document.body.classList.contains("home") ||
				document.body.classList.contains("front-page"));

		const getServicesCompactStickyTop = () => {
			const headerEl = document.querySelector(".site-header");
			if (!headerEl) {
				return 0;
			}
			if (headerEl.classList.contains("is-scrolled")) {
				return Math.ceil(headerEl.getBoundingClientRect().height);
			}
			const bar = headerEl.querySelector(".site-header__bar");
			const inner = headerEl.querySelector(".site-header__inner");
			const padY = inner
				? (parseFloat(getComputedStyle(inner).paddingTop) || 0) +
				  (parseFloat(getComputedStyle(inner).paddingBottom) || 0)
				: 0;
			return Math.max(Math.ceil((bar?.getBoundingClientRect().height || 0) + padY), 1);
		};

		const getServicesFillStickyTop = () => {
			if (isServicesFrontDesktop()) {
				return getServicesCompactStickyTop();
			}
			return parseFloat(getComputedStyle(servicesSwap).getPropertyValue("--ee-services-sticky-top")) || 0;
		};

		const clearServicesViewportFit = () => {
			servicesSwap.classList.remove("is-viewport-fitted", "is-viewport-filled");
			servicesSwap.style.removeProperty("height");
			servicesSwap.style.removeProperty("visibility");
			servicesSwap.style.removeProperty("--ee-services-viewport-height");
			servicesSwap.style.removeProperty("--ee-services-fit-scale");
			servicesSwap.style.removeProperty("--ee-services-fit-pad-top");
			servicesSwap.style.removeProperty("--ee-services-fit-pad-bottom");
		};

		const syncServicesPin = () => {
			if (!servicesPin) {
				return;
			}
			if (!pinMq.matches) {
				servicesMobilePinInitialized = false;
				servicesPin.style.height = "";
				servicesSwap.classList.remove("is-pinned");
				clearServicesViewportFit();
				return;
			}
			if (!isServicesMobile()) {
				servicesMobilePinInitialized = false;
			}
			if (isServicesMobile() && servicesMobilePinInitialized) {
				return;
			}
			servicesPin.style.height = "auto";
			clearServicesViewportFit();
			void servicesSwap.offsetHeight;
			const pad = servicesPin.querySelector(".services-section__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const inner = servicesSwap.querySelector(".services-section__inner");
			const styles = getComputedStyle(servicesSwap);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;
			const innerH = inner
				? Math.ceil(inner.getBoundingClientRect().height)
				: Math.ceil(servicesSwap.scrollHeight);
			const sectionH = innerH + padTop + padBottom;
			const stickyTop = getServicesFillStickyTop();
			const viewportH = window.visualViewport?.height ?? window.innerHeight;
			const availableH = Math.max(viewportH - stickyTop, 0);
			const fitScale = fitMq.matches ? Math.min(1, availableH / Math.max(sectionH, 1)) : 1;
			let displayH = sectionH * fitScale;

			if (availableH > 0 && fitScale < 0.999) {
				servicesSwap.style.setProperty("--ee-services-viewport-height", `${availableH}px`);
				servicesSwap.style.setProperty("--ee-services-fit-scale", String(fitScale));
				servicesSwap.style.setProperty("--ee-services-fit-pad-top", `${padTop * fitScale}px`);
				servicesSwap.style.setProperty("--ee-services-fit-pad-bottom", `${padBottom * fitScale}px`);
				servicesSwap.classList.add("is-viewport-fitted");
				displayH = availableH;
			} else if (servicesFillMq.matches && availableH > sectionH) {
				servicesSwap.style.setProperty("--ee-services-viewport-height", `${availableH}px`);
				servicesSwap.style.setProperty("--ee-services-fit-scale", "1");
				servicesSwap.style.setProperty("--ee-services-fit-pad-top", `${padTop}px`);
				servicesSwap.style.setProperty("--ee-services-fit-pad-bottom", `${padBottom}px`);
				servicesSwap.classList.add("is-viewport-fitted", "is-viewport-filled");
				displayH = availableH;
			}

			const holdPx = Math.round(viewportH * 1);
			servicesPin.style.height = `${padH + displayH + holdPx}px`;
			if (isServicesMobile()) {
				servicesMobilePinInitialized = true;
			}
			lastServicesFillStickyTop = stickyTop;
		};

		const scheduleServicesPinSync = () => {
			if (servicesPinSyncQueued) {
				return;
			}
			servicesPinSyncQueued = true;
			window.requestAnimationFrame(() => {
				window.requestAnimationFrame(() => {
					servicesPinSyncQueued = false;
					syncServicesPin();
					syncServicesPinnedState();
					servicesWasPinned = servicesSwap.classList.contains("is-pinned");
				});
			});
		};

		const syncServicesPinnedState = () => {
			if (!servicesPin || !pinMq.matches) {
				servicesSwap.classList.remove("is-pinned");
				return false;
			}
			const stickyTop =
				parseFloat(getComputedStyle(servicesSwap).getPropertyValue("--ee-services-sticky-top")) || 0;
			const rect = servicesSwap.getBoundingClientRect();
			const pinRect = servicesPin.getBoundingClientRect();
			const pinned =
				rect.top <= stickyTop + 1.5 &&
				pinRect.bottom > stickyTop + Math.min(rect.height, window.innerHeight - stickyTop) + 4;
			servicesSwap.classList.toggle("is-pinned", pinned);
			return pinned;
		};

		const onServicesScroll = () => {
			const pinned = syncServicesPinnedState();
			if (!servicesFillMq.matches) {
				return;
			}
			const fillStickyTop = getServicesFillStickyTop();
			const stickyChanged = Math.abs(fillStickyTop - lastServicesFillStickyTop) > 1;
			const pinnedChanged = pinned !== servicesWasPinned;
			if (stickyChanged || pinnedChanged) {
				servicesWasPinned = pinned;
				scheduleServicesPinSync();
			}
		};

		const remountServicesPin = () => {
			if (isServicesMobile() && servicesMobilePinInitialized) {
				syncServicesPinnedState();
				return;
			}
			scheduleServicesPinSync();
		};
		const readData = (el) => ({
			id: el.getAttribute("data-service-id") || "",
			title: el.getAttribute("data-service-title") || "",
			price: el.getAttribute("data-service-price") || "",
			image: el.getAttribute("data-service-image") || "",
			link: el.getAttribute("data-service-link") || el.getAttribute("href") || "",
			exploreLink: el.getAttribute("data-service-explore-link") || "",
			location: el.getAttribute("data-service-location") || "",
			duration: el.getAttribute("data-service-duration") || "",
			subtitle: el.getAttribute("data-service-subtitle") || "",
		});

		const writeAttrs = (el, data) => {
			el.setAttribute("data-service-id", data.id);
			el.setAttribute("data-service-title", data.title);
			el.setAttribute("data-service-price", data.price);
			el.setAttribute("data-service-image", data.image);
			el.setAttribute("data-service-link", data.link);
			if (data.exploreLink) {
				el.setAttribute("data-service-explore-link", data.exploreLink);
			}
			el.setAttribute("data-service-location", data.location);
			el.setAttribute("data-service-duration", data.duration);
			if (data.subtitle) {
				el.setAttribute("data-service-subtitle", data.subtitle);
			}
		};

		const applyCard = (card, data) => {
			writeAttrs(card, data);
			card.setAttribute("href", data.link);
			const img = card.querySelector("[data-service-image-el]");
			if (img) {
				img.src = data.image;
				img.alt = data.title;
			}
			const title = card.querySelector("[data-service-title-el]");
			if (title) title.textContent = data.title;
			const price = card.querySelector("[data-service-price-el]");
			if (price) price.textContent = data.price;
		};

		const applyFeatured = (data) => {
			writeAttrs(featured, data);
			const img = featured.querySelector("[data-service-image-el]");
			if (img) {
				img.src = data.image;
				img.alt = data.title;
			}
			const title = featured.querySelector("[data-service-title-el]");
			if (title) title.textContent = data.title;
			const titleMobile = featured.querySelector("[data-service-title-mobile-el]");
			if (titleMobile) titleMobile.textContent = data.title;
			const price = featured.querySelector("[data-service-price-el]");
			if (price) price.textContent = data.price;
			const location = featured.querySelector("[data-service-location-el]");
			if (location) location.textContent = data.location;
			const duration = featured.querySelector("[data-service-duration-el]");
			if (duration) duration.textContent = data.duration;
			const ctaMobile = featured.querySelector("[data-service-cta-mobile]");
			if (ctaMobile && data.link) {
				ctaMobile.setAttribute("href", data.link);
			}
			const ctaDesktop = featured.querySelector("[data-service-cta-desktop]");
			if (ctaDesktop && data.exploreLink) {
				ctaDesktop.setAttribute("href", data.exploreLink);
			}
		};

		const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

		const toViewportRect = (el) => {
			const r = el.getBoundingClientRect();
			return { left: r.left, top: r.top, width: r.width, height: r.height };
		};

		/**
		 * FLIP morph: ghost is sized to the DESTINATION so object-fit crop stays
		 * fixed; only transform translate/scale animates (avoids image jerk).
		 */
		const makeGhost = (sourceEl, fromRect, toRect, zIndex, destKind) => {
			const img = sourceEl.querySelector("[data-service-image-el]");
			const ghost = document.createElement("div");
			ghost.className = `service-swap-ghost service-swap-ghost--${destKind}`;
			ghost.setAttribute("aria-hidden", "true");

			const sx = fromRect.width / toRect.width;
			const sy = fromRect.height / toRect.height;
			const dx = fromRect.left - toRect.left;
			const dy = fromRect.top - toRect.top;

			ghost.style.cssText = [
				"position:fixed",
				`z-index:${zIndex}`,
				"margin:0",
				"padding:0",
				"overflow:hidden",
				"pointer-events:none",
				"box-sizing:border-box",
				"transition:none",
				"will-change:transform",
				"background:#111",
				`left:${toRect.left}px`,
				`top:${toRect.top}px`,
				`width:${toRect.width}px`,
				`height:${toRect.height}px`,
				"transform-origin:top left",
				`transform:translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`,
			].join(";");

			if (img) {
				const clone = img.cloneNode(true);
				clone.removeAttribute("data-service-image-el");
				clone.className = "service-swap-ghost__img";
				clone.style.transform = "none";
				ghost.appendChild(clone);
			}

			const shade = document.createElement("span");
			shade.className = "service-swap-ghost__shade";
			ghost.appendChild(shade);

			document.body.appendChild(ghost);
			void ghost.getBoundingClientRect();
			ghost.style.transition = `transform ${swapMs}ms cubic-bezier(0.16, 0.84, 0.28, 1)`;
			return ghost;
		};

		const markActive = (card) => {
			cards.forEach((c) => c.classList.remove("is-active-small"));
			card?.classList.add("is-active-small");
		};

		const swap = async (card) => {
			if (!featured || !card || busy) {
				if (busy && card) {
					pending = card;
				}
				return;
			}

			const cardData = readData(card);
			const featData = readData(featured);
			if (cardData.id && featData.id && cardData.id === featData.id) {
				markActive(card);
				return;
			}

			busy = true;
			pending = null;
			servicesSwap.classList.add("is-swapping");
			markActive(card);

			const cardRect = toViewportRect(card);
			const featRect = toViewportRect(featured);

			if (!reduced) {
				const ghostIn = makeGhost(card, cardRect, featRect, 92, "featured");
				const ghostOut = makeGhost(featured, featRect, cardRect, 91, "card");

				card.classList.add("is-swap-ghost");
				featured.classList.add("is-swap-ghost");

				await wait(16);
				requestAnimationFrame(() => {
					ghostIn.style.transform = "translate(0px, 0px) scale(1, 1)";
					ghostOut.style.transform = "translate(0px, 0px) scale(1, 1)";
				});

				await wait(swapMs);

				applyCard(card, featData);
				applyFeatured(cardData);
				activeId = cardData.id;

				await wait(32);
				card.classList.remove("is-swap-ghost");
				featured.classList.remove("is-swap-ghost");
				await wait(32);
				ghostIn.remove();
				ghostOut.remove();
			} else {
				applyCard(card, featData);
				applyFeatured(cardData);
				activeId = cardData.id;
			}

			servicesSwap.classList.remove("is-swapping");
			busy = false;
			remountServicesPin();

			if (pending && pending !== card) {
				const next = pending;
				pending = null;
				swap(next);
			} else {
				pending = null;
			}
		};

		cards.forEach((card) => {
			card.addEventListener("click", (event) => {
				event.preventDefault();
				swap(card);
			});

			card.addEventListener("keydown", (event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					swap(card);
				}
			});
		});

		if (lenis) {
			lenis.on("scroll", onServicesScroll);
		} else {
			window.addEventListener("scroll", onServicesScroll, { passive: true });
		}
		if (typeof IntersectionObserver === "function" && servicesPin) {
			let servicesPinInView = false;
			const servicesPinObserver = new IntersectionObserver(
				(entries) => {
					const inView = entries.some((entry) => entry.isIntersecting);
					if (inView && !servicesPinInView) {
						if (isServicesMobile() && servicesMobilePinInitialized) {
							syncServicesPinnedState();
						} else {
							scheduleServicesPinSync();
						}
					}
					servicesPinInView = inView;
				},
				{ threshold: [0, 0.12] }
			);
			servicesPinObserver.observe(servicesPin);
		}
		let servicesMobileLastWidth = window.innerWidth;
		window.addEventListener("resize", () => {
			const w = window.innerWidth;
			if (isServicesMobile() && servicesMobilePinInitialized && w === servicesMobileLastWidth) {
				syncServicesPinnedState();
				return;
			}
			servicesMobileLastWidth = w;
			servicesMobilePinInitialized = false;
			scheduleServicesPinSync();
		});
		if (typeof pinMq.addEventListener === "function") {
			pinMq.addEventListener("change", () => {
				servicesMobilePinInitialized = false;
				scheduleServicesPinSync();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
				servicesMobilePinInitialized = false;
				scheduleServicesPinSync();
			});
		}
		if (typeof fitMq.addEventListener === "function") {
			fitMq.addEventListener("change", () => {
				servicesMobilePinInitialized = false;
				scheduleServicesPinSync();
			});
		} else if (typeof fitMq.addListener === "function") {
			fitMq.addListener(() => {
				servicesMobilePinInitialized = false;
				scheduleServicesPinSync();
			});
		}
		if (typeof servicesFillMq.addEventListener === "function") {
			servicesFillMq.addEventListener("change", scheduleServicesPinSync);
		} else if (typeof servicesFillMq.addListener === "function") {
			servicesFillMq.addListener(scheduleServicesPinSync);
		}
		scheduleServicesPinSync();
		window.addEventListener("load", () => {
			if (isServicesMobile() && servicesMobilePinInitialized) return;
			scheduleServicesPinSync();
		});
		window.addEventListener("excel-ent:header-state-change", () => {
			if (isServicesMobile() && servicesMobilePinInitialized) {
				syncServicesPinnedState();
				return;
			}
			scheduleServicesPinSync();
		});
		document.addEventListener("excel-ent:ready", () => {
			if (isServicesMobile() && servicesMobilePinInitialized) return;
			scheduleServicesPinSync();
		});
		if (window.visualViewport) {
			window.visualViewport.addEventListener("resize", () => {
				if (isServicesMobile() && servicesMobilePinInitialized) {
					syncServicesPinnedState();
					return;
				}
				scheduleServicesPinSync();
			});
		}
		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				if (isServicesMobile() && servicesMobilePinInitialized) return;
				scheduleServicesPinSync();
			});
		}
		window.setTimeout(() => {
			if (isServicesMobile() && servicesMobilePinInitialized) return;
			scheduleServicesPinSync();
		}, 250);
	}
})();

(() => {
	const chipsBar = document.querySelector("[data-search-chips-bar]");
	if (!chipsBar) {
		return;
	}

	const chipsWrap = chipsBar.querySelector(".search-page__chips");
	const filterKeys = new Set(["s", "category", "sub_category", "location", "event_date", "budget"]);

	const syncChipBar = () => {
		const remaining = chipsWrap?.querySelectorAll("[data-search-chip]").length || 0;
		chipsBar.classList.toggle("is-empty", remaining === 0);
	};

	const removeUrlParam = (key) => {
		if (!key || !filterKeys.has(key)) {
			return;
		}
		const url = new URL(window.location.href);
		url.searchParams.delete(key);
		if ("sub_category" === key) {
			url.searchParams.delete("category");
		}
		window.history.replaceState({}, "", url);
	};

	chipsBar.addEventListener("click", (event) => {
		const clearBtn = event.target.closest("[data-search-chips-clear]");
		if (clearBtn && chipsBar.contains(clearBtn)) {
			event.preventDefault();
			chipsWrap?.querySelectorAll("[data-search-chip]").forEach((chip) => {
				removeUrlParam(chip.getAttribute("data-chip-key"));
				chip.remove();
			});
			removeUrlParam("category");
			syncChipBar();
			return;
		}

		const chip = event.target.closest("[data-search-chip]");
		if (!chip || !chipsBar.contains(chip)) {
			return;
		}
		event.preventDefault();
		removeUrlParam(chip.getAttribute("data-chip-key"));
		chip.remove();
		syncChipBar();
	});
})();

(() => {
	/* ---------- Newsletter AJAX signup ---------- */
	const newsletterForms = document.querySelectorAll("[data-newsletter-form]");
	if (!newsletterForms.length) {
		return;
	}

	const cfg = window.excelEnt?.newsletter || {};
	const ajaxUrl = window.excelEnt?.ajaxUrl || "";

	const isValidEmail = (value) =>
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

	newsletterForms.forEach((form) => {
		const input = form.querySelector('input[type="email"]');
		const submit = form.querySelector("[data-newsletter-submit]");
		const label =
			submit?.querySelector("[data-newsletter-submit-label], .newsletter-cta__submit-label") ||
			null;
		const status = form.querySelector("[data-newsletter-status]");
		const defaultLabel = label?.textContent || cfg.submitLabel || "Subscribe";

		if (input?.dataset.placeholderMobile) {
			const desktopPlaceholder = input.getAttribute("placeholder") || "";
			const mobilePlaceholder = input.dataset.placeholderMobile;
			const placeholderMq = window.matchMedia("(max-width: 767px)");
			const syncNewsletterPlaceholder = () => {
				input.placeholder = placeholderMq.matches ? mobilePlaceholder : desktopPlaceholder;
			};
			syncNewsletterPlaceholder();
			placeholderMq.addEventListener("change", syncNewsletterPlaceholder);
		}

		const setStatus = (message, type) => {
			if (!status) {
				return;
			}
			status.hidden = !message;
			status.textContent = message || "";
			status.classList.remove("is-error", "is-success");
			if (type) {
				status.classList.add(`is-${type}`);
			}
		};

		const setInvalid = (invalid) => {
			if (!input) {
				return;
			}
			input.setAttribute("aria-invalid", invalid ? "true" : "false");
			input.classList.toggle("is-invalid", Boolean(invalid));
			form.classList.toggle("is-invalid", Boolean(invalid));
		};

		const setBusy = (busy) => {
			form.classList.toggle("is-loading", busy);
			if (submit) {
				submit.disabled = busy;
			}
			if (label) {
				label.textContent = busy ? cfg.sending || "Subscribing…" : defaultLabel;
			}
		};

		input?.addEventListener("input", () => {
			if (input.classList.contains("is-invalid")) {
				setInvalid(false);
				setStatus("", "");
			}
		});

		form.addEventListener("submit", async (event) => {
			event.preventDefault();

			const email = (input?.value || "").trim();
			setInvalid(false);
			setStatus("", "");

			if (!email) {
				setInvalid(true);
				setStatus(cfg.empty || "Please enter your email address.", "error");
				input?.focus();
				return;
			}

			if (!isValidEmail(email)) {
				setInvalid(true);
				setStatus(cfg.invalid || "Please enter a valid email address.", "error");
				input?.focus();
				return;
			}

			if (!ajaxUrl) {
				setStatus(cfg.genericError || "Something went wrong. Please try again.", "error");
				return;
			}

			setBusy(true);

			try {
				const body = new FormData(form);
				body.set("email", email);
				if (!body.get("nonce") && cfg.nonce) {
					body.set("nonce", cfg.nonce);
				}

				const response = await fetch(ajaxUrl, {
					method: "POST",
					credentials: "same-origin",
					body,
				});

				const payload = await response.json().catch(() => null);
				const ok = Boolean(payload?.success);
				const message =
					payload?.data?.message ||
					(ok
						? "Thanks — you’re subscribed."
						: cfg.genericError || "Something went wrong. Please try again.");

				if (ok) {
					setInvalid(false);
					setStatus(message, "success");
					form.reset();
					form.classList.add("is-success");
					if (form.closest("[data-subscribe-popup]")) {
						document.dispatchEvent(new CustomEvent("excel-ent:subscribe-popup-success"));
					}
				} else {
					setInvalid(true);
					setStatus(message, "error");
					input?.focus();
				}
			} catch (err) {
				setStatus(cfg.genericError || "Something went wrong. Please try again.", "error");
			} finally {
				setBusy(false);
			}
		});
	});
})();

(() => {
	/* ---------- Subscribe popup (after hero load, once per session) ---------- */
	const popup = document.querySelector("[data-subscribe-popup]");
	if (!popup) {
		return;
	}

	const STORAGE_KEY = "excel_ent_subscribe_popup_dismissed";
	const dialog = popup.querySelector("[data-subscribe-popup-dialog]");
	const emailInput = popup.querySelector('input[type="email"]');
	let lastFocus = null;
	let opened = false;

	const wasDismissed = () => {
		try {
			return window.sessionStorage.getItem(STORAGE_KEY) === "1";
		} catch (err) {
			return false;
		}
	};

	const markDismissed = () => {
		try {
			window.sessionStorage.setItem(STORAGE_KEY, "1");
		} catch (err) {
			/* ignore */
		}
	};

	const open = () => {
		if (opened || wasDismissed() || !popup.hidden) {
			return;
		}
		opened = true;
		lastFocus = document.activeElement;
		popup.hidden = false;
		document.body.classList.add("subscribe-popup-open");
		window.setTimeout(() => {
			(emailInput || dialog)?.focus();
		}, 40);
	};

	const close = () => {
		if (popup.hidden) {
			return;
		}
		popup.hidden = true;
		document.body.classList.remove("subscribe-popup-open");
		markDismissed();
		if (lastFocus && typeof lastFocus.focus === "function") {
			lastFocus.focus();
		}
	};

	const tryOpenAfterHero = () => {
		if (wasDismissed()) {
			return;
		}
		const hero = document.querySelector(".hero");
		if (hero && !hero.classList.contains("is-loaded")) {
			return;
		}
		window.setTimeout(open, 450);
	};

	popup.querySelectorAll("[data-subscribe-popup-close]").forEach((el) => {
		el.addEventListener("click", close);
	});

	window.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && !popup.hidden) {
			close();
		}
	});

	dialog?.addEventListener("click", (e) => e.stopPropagation());

	document.addEventListener("excel-ent:subscribe-popup-success", () => {
		window.setTimeout(close, 900);
	});

	if (document.body.classList.contains("ee-ready")) {
		tryOpenAfterHero();
	} else {
		document.addEventListener("excel-ent:ready", tryOpenAfterHero, { once: true });
	}
})();
