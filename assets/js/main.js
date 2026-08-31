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
			primary.style.setProperty(
				"--ee-search-sticky-offset",
				header.classList.contains("is-scrolled") ? `${header.offsetHeight}px` : "0px"
			);
		};

		const syncArtistsStickyTop = () => {
			const top = header.classList.contains("is-scrolled")
				? Math.ceil(header.getBoundingClientRect().height)
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
			if (aboutValue) {
				aboutValue.style.setProperty("--ee-about-value-sticky-top", topPx);
			}
			if (aboutValuePin) {
				aboutValuePin.style.setProperty("--ee-about-value-sticky-top", topPx);
			}

			const aboutReviewsPin = document.querySelector("[data-about-reviews-pin]");
			const aboutReviews = document.querySelector("[data-about-reviews]");
			if (aboutReviews) {
				aboutReviews.style.setProperty("--ee-about-reviews-sticky-top", topPx);
			}
			if (aboutReviewsPin) {
				aboutReviewsPin.style.setProperty("--ee-about-reviews-sticky-top", topPx);
			}

			const aboutWhyPin = document.querySelector("[data-about-why-pin]");
			const aboutWhy = document.querySelector("[data-about-why]");
			if (aboutWhy) {
				aboutWhy.style.setProperty("--ee-about-why-sticky-top", topPx);
			}
			if (aboutWhyPin) {
				aboutWhyPin.style.setProperty("--ee-about-why-sticky-top", topPx);
			}

			const aboutApproachPin = document.querySelector("[data-about-approach-pin]");
			const aboutApproach = document.querySelector("[data-about-approach]");
			if (aboutApproach) {
				aboutApproach.style.setProperty("--ee-about-approach-sticky-top", topPx);
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

			const artistSimilarPin = document.querySelector("[data-artist-similar-pin]");
			const artistSimilar = document.querySelector("[data-artist-similar]");
			if (artistSimilar) {
				artistSimilar.style.setProperty("--ee-artist-similar-sticky-top", topPx);
			}
			if (artistSimilarPin) {
				artistSimilarPin.style.setProperty("--ee-artist-similar-sticky-top", topPx);
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
				(isArtistPage && window.matchMedia("(min-width: 768px)").matches) ||
				isAboutPage ||
				isContactPage ||
				(isSearchPage && window.matchMedia("(min-width: 768px)").matches);
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
					document.querySelector("[data-mobile-search-open]")?.click();
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

	/* ---------- About intro viewport fitting ---------- */
	if (aboutIntro) {
		const aboutIntroFitMq = window.matchMedia("(min-width: 1200px)");

		const syncAboutIntroViewport = () => {
			aboutIntro.classList.remove("is-viewport-fitted");
			aboutIntro.style.removeProperty("height");
			aboutIntro.style.removeProperty("--ee-about-intro-viewport-height");
			aboutIntro.style.removeProperty("--ee-about-intro-fit-scale");
			aboutIntro.style.removeProperty("--ee-about-intro-fit-pad-top");
			aboutIntro.style.removeProperty("--ee-about-intro-fit-pad-bottom");

			if (!aboutIntroFitMq.matches) {
				return;
			}

			const naturalHeight = Math.ceil(aboutIntro.getBoundingClientRect().height);
			const header = document.querySelector(".site-header");
			const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
			const availableHeight = Math.max(window.innerHeight - headerHeight, 0);
			const fitScale = Math.min(1, availableHeight / Math.max(naturalHeight, 1));

			if (fitScale >= 1) {
				return;
			}

			const styles = getComputedStyle(aboutIntro);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;

			aboutIntro.style.setProperty("--ee-about-intro-viewport-height", `${availableHeight}px`);
			aboutIntro.style.setProperty("--ee-about-intro-fit-scale", String(fitScale));
			aboutIntro.style.setProperty("--ee-about-intro-fit-pad-top", `${padTop * fitScale}px`);
			aboutIntro.style.setProperty("--ee-about-intro-fit-pad-bottom", `${padBottom * fitScale}px`);
			aboutIntro.classList.add("is-viewport-fitted");
		};

		window.addEventListener("resize", syncAboutIntroViewport);
		window.addEventListener("load", syncAboutIntroViewport);
		window.addEventListener("excel-ent:header-state-change", syncAboutIntroViewport);
		window.requestAnimationFrame(syncAboutIntroViewport);

		if (typeof aboutIntroFitMq.addEventListener === "function") {
			aboutIntroFitMq.addEventListener("change", syncAboutIntroViewport);
		} else if (typeof aboutIntroFitMq.addListener === "function") {
			aboutIntroFitMq.addListener(syncAboutIntroViewport);
		}

		if (document.fonts?.ready) {
			document.fonts.ready.then(syncAboutIntroViewport);
		}
	}

	/* ---------- Artist hero viewport fitting ---------- */
	if (artistHero) {
		const artistHeroFitMq = window.matchMedia("(min-width: 1200px)");

		const syncArtistHeroViewport = () => {
			artistHero.classList.remove("is-viewport-fitted");
			artistHero.style.removeProperty("height");
			artistHero.style.removeProperty("--ee-artist-hero-viewport-height");
			artistHero.style.removeProperty("--ee-artist-hero-fit-scale");
			artistHero.style.removeProperty("--ee-artist-hero-fit-pad-top");
			artistHero.style.removeProperty("--ee-artist-hero-fit-pad-bottom");
			artistHero.style.removeProperty("--ee-artist-hero-content-height");

			if (!artistHeroFitMq.matches) {
				return;
			}

			const naturalHeight = Math.ceil(artistHero.getBoundingClientRect().height);
			const sectionTop = Math.max(artistHero.getBoundingClientRect().top, 0);
			const availableHeight = Math.max(window.innerHeight - sectionTop, 0);
			const fitScale = Math.min(1, availableHeight / Math.max(naturalHeight, 1));

			if (fitScale >= 1 || !availableHeight) {
				return;
			}

			const styles = getComputedStyle(artistHero);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;
			const contentHeight = Math.max(naturalHeight - padTop - padBottom, 0);

			artistHero.style.setProperty("--ee-artist-hero-viewport-height", `${availableHeight}px`);
			artistHero.style.setProperty("--ee-artist-hero-fit-scale", String(fitScale));
			artistHero.style.setProperty("--ee-artist-hero-fit-pad-top", `${padTop * fitScale}px`);
			artistHero.style.setProperty("--ee-artist-hero-fit-pad-bottom", `${padBottom * fitScale}px`);
			artistHero.style.setProperty("--ee-artist-hero-content-height", `${contentHeight}px`);
			artistHero.classList.add("is-viewport-fitted");
		};

		window.addEventListener("resize", syncArtistHeroViewport);
		window.addEventListener("load", syncArtistHeroViewport);
		window.requestAnimationFrame(syncArtistHeroViewport);

		artistHero.querySelector("img")?.addEventListener("load", syncArtistHeroViewport);

		if (typeof artistHeroFitMq.addEventListener === "function") {
			artistHeroFitMq.addEventListener("change", syncArtistHeroViewport);
		} else if (typeof artistHeroFitMq.addListener === "function") {
			artistHeroFitMq.addListener(syncArtistHeroViewport);
		}

		if (document.fonts?.ready) {
			document.fonts.ready.then(syncArtistHeroViewport);
		}
	}

	/* ---------- Search empty-state viewport fitting ---------- */
	const searchEmpty = document.querySelector(".search-empty");
	if (searchEmpty) {
		const searchEmptyFitMq = window.matchMedia("(min-width: 1200px)");

		const syncSearchEmptyViewport = () => {
			searchEmpty.classList.remove("is-viewport-fitted");
			searchEmpty.style.removeProperty("height");
			searchEmpty.style.removeProperty("--ee-search-empty-viewport-height");
			searchEmpty.style.removeProperty("--ee-search-empty-fit-scale");
			searchEmpty.style.removeProperty("--ee-search-empty-fit-pad-top");
			searchEmpty.style.removeProperty("--ee-search-empty-fit-pad-bottom");

			if (!searchEmptyFitMq.matches) {
				return;
			}

			const naturalHeight = Math.ceil(searchEmpty.getBoundingClientRect().height);
			const sectionTop = Math.max(searchEmpty.getBoundingClientRect().top, 0);
			const availableHeight = Math.max(window.innerHeight - sectionTop, 0);
			const fitScale = Math.min(1, availableHeight / Math.max(naturalHeight, 1));

			if (fitScale >= 1 || !availableHeight) {
				return;
			}

			const styles = getComputedStyle(searchEmpty);
			const padTop = parseFloat(styles.paddingTop) || 0;
			const padBottom = parseFloat(styles.paddingBottom) || 0;

			searchEmpty.style.setProperty("--ee-search-empty-viewport-height", `${availableHeight}px`);
			searchEmpty.style.setProperty("--ee-search-empty-fit-scale", String(fitScale));
			searchEmpty.style.setProperty("--ee-search-empty-fit-pad-top", `${padTop * fitScale}px`);
			searchEmpty.style.setProperty("--ee-search-empty-fit-pad-bottom", `${padBottom * fitScale}px`);
			searchEmpty.classList.add("is-viewport-fitted");
		};

		window.addEventListener("resize", syncSearchEmptyViewport);
		window.addEventListener("load", syncSearchEmptyViewport);
		window.requestAnimationFrame(syncSearchEmptyViewport);

		searchEmpty.querySelector("img")?.addEventListener("load", syncSearchEmptyViewport);

		if (typeof searchEmptyFitMq.addEventListener === "function") {
			searchEmptyFitMq.addEventListener("change", syncSearchEmptyViewport);
		} else if (typeof searchEmptyFitMq.addListener === "function") {
			searchEmptyFitMq.addListener(syncSearchEmptyViewport);
		}

		if (document.fonts?.ready) {
			document.fonts.ready.then(syncSearchEmptyViewport);
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
		const pinMq = window.matchMedia("(min-width: 768px)");

		const syncExcelWayPin = () => {
			if (!excelWayPin) {
				return;
			}
			if (!pinMq.matches) {
				excelWayPin.style.height = "";
				excelWay.classList.remove("is-pinned");
				excelWay.classList.remove("is-viewport-fitted");
				return;
			}
			excelWayPin.style.height = "auto";
			excelWay.classList.remove("is-viewport-fitted");
			excelWay.style.removeProperty("height");
			excelWay.style.removeProperty("--ee-excel-way-viewport-height");
			excelWay.style.removeProperty("--ee-excel-way-fit-scale");
			excelWay.style.removeProperty("--ee-excel-way-fit-pad-top");
			excelWay.style.removeProperty("--ee-excel-way-fit-pad-bottom");
			const pad = excelWayPin.querySelector(".excel-way__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(excelWay.getBoundingClientRect().height);
			const stickyTop =
				parseFloat(getComputedStyle(excelWay).getPropertyValue("--ee-excel-way-sticky-top")) || 0;
			const availableH = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = Math.min(1, availableH / Math.max(sectionH, 1));
			if (fitScale < 1) {
				const styles = getComputedStyle(excelWay);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				excelWay.style.setProperty("--ee-excel-way-viewport-height", `${availableH}px`);
				excelWay.style.setProperty("--ee-excel-way-fit-scale", String(fitScale));
				excelWay.style.setProperty("--ee-excel-way-fit-pad-top", `${padTop * fitScale}px`);
				excelWay.style.setProperty("--ee-excel-way-fit-pad-bottom", `${padBottom * fitScale}px`);
				excelWay.classList.add("is-viewport-fitted");
			}
			const holdPx = Math.round(window.innerHeight * 1);
			excelWayPin.style.height = `${padH + (sectionH * fitScale) + holdPx}px`;
		};

		const syncExcelWayPinnedState = () => {
			if (!excelWayPin || !pinMq.matches) {
				excelWay.classList.remove("is-pinned");
				return;
			}
			const stickyTop =
				parseFloat(getComputedStyle(excelWay).getPropertyValue("--ee-excel-way-sticky-top")) || 0;
			const rect = excelWay.getBoundingClientRect();
			const pinRect = excelWayPin.getBoundingClientRect();
			const pinned =
				rect.top <= stickyTop + 1.5 &&
				pinRect.bottom > stickyTop + Math.min(rect.height, window.innerHeight - stickyTop) + 4;
			excelWay.classList.toggle("is-pinned", pinned);
		};

		const setTab = (id) => {
			tabs.forEach((tab) => {
				const on = tab.getAttribute("data-excel-way-tab") === id;
				tab.classList.toggle("excel-way-tab--active", on);
				tab.setAttribute("aria-selected", on ? "true" : "false");
			});

			panels.forEach((panel) => {
				const on = panel.getAttribute("data-excel-way-panel") === id;
				panel.classList.toggle("is-hidden", !on);
				panel.hidden = !on;
			});

			window.requestAnimationFrame(() => {
				syncExcelWayPin();
				syncExcelWayPinnedState();
			});
		};

		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				setTab(tab.getAttribute("data-excel-way-tab") || "how-it-works");
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
			lenis.on("scroll", syncExcelWayPinnedState);
		} else {
			window.addEventListener("scroll", syncExcelWayPinnedState, { passive: true });
		}
		window.addEventListener("resize", () => {
			syncExcelWayPin();
			syncExcelWayPinnedState();
		});
		if (typeof pinMq.addEventListener === "function") {
			pinMq.addEventListener("change", () => {
				syncExcelWayPin();
				syncExcelWayPinnedState();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
				syncExcelWayPin();
				syncExcelWayPinnedState();
			});
		}
		window.requestAnimationFrame(() => {
			syncExcelWayPin();
			syncExcelWayPinnedState();
		});
		window.addEventListener("load", () => {
			syncExcelWayPin();
			syncExcelWayPinnedState();
		});
		window.addEventListener("excel-ent:header-state-change", () => {
			syncExcelWayPin();
			syncExcelWayPinnedState();
		});
		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				syncExcelWayPin();
				syncExcelWayPinnedState();
			});
		}

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
		const pinMq = window.matchMedia("(min-width: 768px)");
		let index = window.innerWidth <= 1199 ? 0 : cards.length > 2 ? 2 : 0;

		const isBlogMobile = () => window.innerWidth <= 767;
		const isBlogSwipe = () => window.innerWidth <= 1199;

		const syncBlogPin = () => {
			if (!blogPin) {
				return;
			}
			if (!pinMq.matches) {
				blogPin.style.height = "";
				blogSection.classList.remove("is-pinned");
				return;
			}
			blogPin.style.height = "auto";
			const pad = blogPin.querySelector(".blog-section__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(blogSection.getBoundingClientRect().height);
			const holdPx = Math.round(window.innerHeight * 1);
			blogPin.style.height = `${padH + sectionH + holdPx}px`;
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
				const cardWidth = cards[0].getBoundingClientRect().width || 584;

				if (isBlogMobile() && viewport) {
					const viewportWidth = viewport.getBoundingClientRect().width;
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
				const cardWidth = cards[0].getBoundingClientRect().width || 584;
				if (isBlogMobile()) {
					const viewportWidth = viewport.getBoundingClientRect().width;
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
				syncBlogPin();
				syncBlogPinnedState();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
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
	}

	/* ---------- Venues accordion + sticky pin ---------- */
	const venuesSection = document.querySelector("[data-venues-section]");
	if (venuesSection) {
		const venuesPin = document.querySelector("[data-venues-pin]");
		const panels = Array.from(venuesSection.querySelectorAll("[data-venue-panel]"));
		const pinMq = window.matchMedia("(min-width: 768px)");

		const syncVenuesPin = () => {
			if (!venuesPin) {
				return;
			}
			if (!pinMq.matches) {
				venuesPin.style.height = "";
				venuesSection.classList.remove("is-pinned");
				venuesSection.classList.remove("is-viewport-fitted");
				venuesSection.style.removeProperty("height");
				venuesSection.style.removeProperty("--ee-venues-viewport-height");
				venuesSection.style.removeProperty("--ee-venues-fit-scale");
				venuesSection.style.removeProperty("--ee-venues-fit-pad-top");
				venuesSection.style.removeProperty("--ee-venues-fit-pad-bottom");
				return;
			}
			venuesPin.style.height = "auto";
			venuesSection.classList.remove("is-viewport-fitted");
			venuesSection.style.removeProperty("height");
			venuesSection.style.removeProperty("--ee-venues-viewport-height");
			venuesSection.style.removeProperty("--ee-venues-fit-scale");
			venuesSection.style.removeProperty("--ee-venues-fit-pad-top");
			venuesSection.style.removeProperty("--ee-venues-fit-pad-bottom");
			const pad = venuesPin.querySelector(".venues-section__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(venuesSection.getBoundingClientRect().height);
			const stickyTop =
				parseFloat(getComputedStyle(venuesSection).getPropertyValue("--ee-venues-sticky-top")) || 0;
			const availableH = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = Math.min(1, availableH / Math.max(sectionH, 1));
			if (fitScale < 1) {
				const styles = getComputedStyle(venuesSection);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				venuesSection.style.setProperty("--ee-venues-viewport-height", `${availableH}px`);
				venuesSection.style.setProperty("--ee-venues-fit-scale", String(fitScale));
				venuesSection.style.setProperty("--ee-venues-fit-pad-top", `${padTop * fitScale}px`);
				venuesSection.style.setProperty("--ee-venues-fit-pad-bottom", `${padBottom * fitScale}px`);
				venuesSection.classList.add("is-viewport-fitted");
			}
			const holdPx = Math.round(window.innerHeight * 1);
			venuesPin.style.height = `${padH + (sectionH * fitScale) + holdPx}px`;
		};

		const syncVenuesPinnedState = () => {
			if (!venuesPin || !pinMq.matches) {
				venuesSection.classList.remove("is-pinned");
				return;
			}
			const stickyTop =
				parseFloat(getComputedStyle(venuesSection).getPropertyValue("--ee-venues-sticky-top")) || 0;
			const rect = venuesSection.getBoundingClientRect();
			const pinRect = venuesPin.getBoundingClientRect();
			const pinned =
				rect.top <= stickyTop + 1.5 &&
				pinRect.bottom > stickyTop + Math.min(rect.height, window.innerHeight - stickyTop) + 4;
			venuesSection.classList.toggle("is-pinned", pinned);
		};

		const remountVenuesPin = () => {
			window.requestAnimationFrame(() => {
				syncVenuesPin();
				syncVenuesPinnedState();
			});
			window.setTimeout(() => {
				syncVenuesPin();
				syncVenuesPinnedState();
			}, 600);
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

			let didRefresh = false;
			const refreshAfterTransition = () => {
				if (didRefresh) {
					return;
				}
				didRefresh = true;
				syncVenuesPin();
				syncVenuesPinnedState();
			};

			const onTransitionEnd = (event) => {
				if (event.target !== panel) {
					return;
				}
				if (event.propertyName !== "height" && event.propertyName !== "flex-basis") {
					return;
				}
				panel.removeEventListener("transitionend", onTransitionEnd);
				refreshAfterTransition();
			};

			panel.addEventListener("transitionend", onTransitionEnd);
			remountVenuesPin();

			window.setTimeout(() => {
				panel.removeEventListener("transitionend", onTransitionEnd);
				refreshAfterTransition();
			}, 580);
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
			lenis.on("scroll", syncVenuesPinnedState);
		} else {
			window.addEventListener("scroll", syncVenuesPinnedState, { passive: true });
		}
		window.addEventListener("resize", () => {
			syncVenuesPin();
			syncVenuesPinnedState();
		});
		if (typeof pinMq.addEventListener === "function") {
			pinMq.addEventListener("change", () => {
				syncVenuesPin();
				syncVenuesPinnedState();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
				syncVenuesPin();
				syncVenuesPinnedState();
			});
		}
		window.requestAnimationFrame(() => {
			syncVenuesPin();
			syncVenuesPinnedState();
		});
		window.addEventListener("load", () => {
			syncVenuesPin();
			syncVenuesPinnedState();
		});
		window.addEventListener("excel-ent:header-state-change", () => {
			syncVenuesPin();
			syncVenuesPinnedState();
		});
		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				syncVenuesPin();
				syncVenuesPinnedState();
			});
		}
		window.setTimeout(() => {
			syncVenuesPin();
			syncVenuesPinnedState();
		}, 250);
	}

	/* ---------- About value sticky pin ---------- */
	const aboutValue = document.querySelector("[data-about-value]");
	if (aboutValue) {
		const aboutValuePin = document.querySelector("[data-about-value-pin]");
		const pinMq = window.matchMedia("(min-width: 768px)");
		const fitMq = window.matchMedia("(min-width: 1200px)");

		const syncAboutValuePin = () => {
			if (!aboutValuePin) {
				return;
			}
			if (!pinMq.matches) {
				aboutValuePin.style.height = "";
				aboutValue.classList.remove("is-pinned", "is-viewport-fitted");
				aboutValue.style.removeProperty("height");
				aboutValue.style.removeProperty("--ee-about-value-viewport-height");
				aboutValue.style.removeProperty("--ee-about-value-fit-scale");
				aboutValue.style.removeProperty("--ee-about-value-fit-pad-top");
				aboutValue.style.removeProperty("--ee-about-value-fit-pad-bottom");
				return;
			}
			aboutValuePin.style.height = "auto";
			aboutValue.classList.remove("is-viewport-fitted");
			aboutValue.style.removeProperty("height");
			aboutValue.style.removeProperty("--ee-about-value-viewport-height");
			aboutValue.style.removeProperty("--ee-about-value-fit-scale");
			aboutValue.style.removeProperty("--ee-about-value-fit-pad-top");
			aboutValue.style.removeProperty("--ee-about-value-fit-pad-bottom");
			const pad = aboutValuePin.querySelector(".about-value__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(aboutValue.getBoundingClientRect().height);
			const stickyTop =
				parseFloat(getComputedStyle(aboutValue).getPropertyValue("--ee-about-value-sticky-top")) || 0;
			const availableH = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = fitMq.matches ? Math.min(1, availableH / Math.max(sectionH, 1)) : 1;

			if (fitScale < 1) {
				const styles = getComputedStyle(aboutValue);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				aboutValue.style.setProperty("--ee-about-value-viewport-height", `${availableH}px`);
				aboutValue.style.setProperty("--ee-about-value-fit-scale", String(fitScale));
				aboutValue.style.setProperty("--ee-about-value-fit-pad-top", `${padTop * fitScale}px`);
				aboutValue.style.setProperty("--ee-about-value-fit-pad-bottom", `${padBottom * fitScale}px`);
				aboutValue.classList.add("is-viewport-fitted");
			}

			const holdPx = Math.round(window.innerHeight * 1);
			aboutValuePin.style.height = `${padH + (sectionH * fitScale) + holdPx}px`;
		};

		const syncAboutValuePinnedState = () => {
			if (!aboutValuePin || !pinMq.matches) {
				aboutValue.classList.remove("is-pinned");
				return;
			}
			const stickyTop =
				parseFloat(getComputedStyle(aboutValue).getPropertyValue("--ee-about-value-sticky-top")) || 0;
			const rect = aboutValue.getBoundingClientRect();
			const pinRect = aboutValuePin.getBoundingClientRect();
			const pinned =
				rect.top <= stickyTop + 1.5 &&
				pinRect.bottom > stickyTop + Math.min(rect.height, window.innerHeight - stickyTop) + 4;
			aboutValue.classList.toggle("is-pinned", pinned);
		};

		if (lenis) {
			lenis.on("scroll", syncAboutValuePinnedState);
		} else {
			window.addEventListener("scroll", syncAboutValuePinnedState, { passive: true });
		}
		window.addEventListener("resize", () => {
			syncAboutValuePin();
			syncAboutValuePinnedState();
		});
		if (typeof pinMq.addEventListener === "function") {
			pinMq.addEventListener("change", () => {
				syncAboutValuePin();
				syncAboutValuePinnedState();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
				syncAboutValuePin();
				syncAboutValuePinnedState();
			});
		}
		window.requestAnimationFrame(() => {
			syncAboutValuePin();
			syncAboutValuePinnedState();
		});
		window.addEventListener("load", () => {
			syncAboutValuePin();
			syncAboutValuePinnedState();
		});
		window.addEventListener("excel-ent:header-state-change", () => {
			syncAboutValuePin();
			syncAboutValuePinnedState();
		});
		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				syncAboutValuePin();
				syncAboutValuePinnedState();
			});
		}
		if (typeof fitMq.addEventListener === "function") {
			fitMq.addEventListener("change", () => {
				syncAboutValuePin();
				syncAboutValuePinnedState();
			});
		} else if (typeof fitMq.addListener === "function") {
			fitMq.addListener(() => {
				syncAboutValuePin();
				syncAboutValuePinnedState();
			});
		}
	}

	/* ---------- About why sticky pin ---------- */
	const aboutWhy = document.querySelector("[data-about-why]");
	if (aboutWhy) {
		const aboutWhyPin = document.querySelector("[data-about-why-pin]");
		const pinMq = window.matchMedia("(min-width: 768px)");
		const fitMq = window.matchMedia("(min-width: 1200px)");

		const syncAboutWhyPin = () => {
			if (!aboutWhyPin) {
				return;
			}
			if (!pinMq.matches) {
				aboutWhyPin.style.height = "";
				aboutWhy.classList.remove("is-pinned", "is-viewport-fitted");
				aboutWhy.style.removeProperty("height");
				aboutWhy.style.removeProperty("--ee-about-why-viewport-height");
				aboutWhy.style.removeProperty("--ee-about-why-fit-scale");
				aboutWhy.style.removeProperty("--ee-about-why-fit-pad-top");
				aboutWhy.style.removeProperty("--ee-about-why-fit-pad-bottom");
				return;
			}

			aboutWhyPin.style.height = "auto";
			aboutWhy.classList.remove("is-viewport-fitted");
			aboutWhy.style.removeProperty("height");
			aboutWhy.style.removeProperty("--ee-about-why-viewport-height");
			aboutWhy.style.removeProperty("--ee-about-why-fit-scale");
			aboutWhy.style.removeProperty("--ee-about-why-fit-pad-top");
			aboutWhy.style.removeProperty("--ee-about-why-fit-pad-bottom");
			const pad = aboutWhyPin.querySelector(".about-why__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(aboutWhy.getBoundingClientRect().height);
			const stickyTop =
				parseFloat(getComputedStyle(aboutWhy).getPropertyValue("--ee-about-why-sticky-top")) || 0;
			const availableH = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = fitMq.matches ? Math.min(1, availableH / Math.max(sectionH, 1)) : 1;

			if (fitScale < 1) {
				const styles = getComputedStyle(aboutWhy);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;

				aboutWhy.style.setProperty("--ee-about-why-viewport-height", `${availableH}px`);
				aboutWhy.style.setProperty("--ee-about-why-fit-scale", String(fitScale));
				aboutWhy.style.setProperty("--ee-about-why-fit-pad-top", `${padTop * fitScale}px`);
				aboutWhy.style.setProperty("--ee-about-why-fit-pad-bottom", `${padBottom * fitScale}px`);
				aboutWhy.classList.add("is-viewport-fitted");
			}

			const holdPx = Math.round(window.innerHeight * 1);

			aboutWhyPin.style.height = `${padH + sectionH * fitScale + holdPx}px`;
		};

		const syncAboutWhyPinnedState = () => {
			if (!aboutWhyPin || !pinMq.matches) {
				aboutWhy.classList.remove("is-pinned");
				return;
			}

			const stickyTop =
				parseFloat(getComputedStyle(aboutWhy).getPropertyValue("--ee-about-why-sticky-top")) || 0;
			const rect = aboutWhy.getBoundingClientRect();
			const pinRect = aboutWhyPin.getBoundingClientRect();
			const pinned =
				rect.top <= stickyTop + 1.5 &&
				pinRect.bottom > stickyTop + Math.min(rect.height, window.innerHeight - stickyTop) + 4;

			aboutWhy.classList.toggle("is-pinned", pinned);
		};

		if (lenis) {
			lenis.on("scroll", syncAboutWhyPinnedState);
		} else {
			window.addEventListener("scroll", syncAboutWhyPinnedState, { passive: true });
		}
		window.addEventListener("resize", () => {
			syncAboutWhyPin();
			syncAboutWhyPinnedState();
		});
		if (typeof pinMq.addEventListener === "function") {
			pinMq.addEventListener("change", () => {
				syncAboutWhyPin();
				syncAboutWhyPinnedState();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
				syncAboutWhyPin();
				syncAboutWhyPinnedState();
			});
		}
		if (typeof fitMq.addEventListener === "function") {
			fitMq.addEventListener("change", () => {
				syncAboutWhyPin();
				syncAboutWhyPinnedState();
			});
		} else if (typeof fitMq.addListener === "function") {
			fitMq.addListener(() => {
				syncAboutWhyPin();
				syncAboutWhyPinnedState();
			});
		}
		window.requestAnimationFrame(() => {
			syncAboutWhyPin();
			syncAboutWhyPinnedState();
		});
		window.addEventListener("load", () => {
			syncAboutWhyPin();
			syncAboutWhyPinnedState();
		});
		window.addEventListener("excel-ent:header-state-change", () => {
			syncAboutWhyPin();
			syncAboutWhyPinnedState();
		});
		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				syncAboutWhyPin();
				syncAboutWhyPinnedState();
			});
		}
	}

	/* ---------- About approach sticky pin ---------- */
	const aboutApproachSticky = document.querySelector("[data-about-approach]");
	if (aboutApproachSticky) {
		const aboutApproachPin = document.querySelector("[data-about-approach-pin]");
		const pinMq = window.matchMedia("(min-width: 768px)");
		const fitMq = window.matchMedia("(min-width: 1200px)");

		const syncAboutApproachPin = () => {
			if (!aboutApproachPin) {
				return;
			}
			if (!pinMq.matches) {
				aboutApproachPin.style.height = "";
				aboutApproachSticky.classList.remove("is-pinned", "is-viewport-fitted");
				aboutApproachSticky.style.removeProperty("height");
				aboutApproachSticky.style.removeProperty("--ee-about-approach-viewport-height");
				aboutApproachSticky.style.removeProperty("--ee-about-approach-fit-scale");
				aboutApproachSticky.style.removeProperty("--ee-about-approach-fit-pad-top");
				aboutApproachSticky.style.removeProperty("--ee-about-approach-fit-pad-bottom");
				return;
			}

			aboutApproachPin.style.height = "auto";
			aboutApproachSticky.classList.remove("is-viewport-fitted");
			aboutApproachSticky.style.removeProperty("height");
			aboutApproachSticky.style.removeProperty("--ee-about-approach-viewport-height");
			aboutApproachSticky.style.removeProperty("--ee-about-approach-fit-scale");
			aboutApproachSticky.style.removeProperty("--ee-about-approach-fit-pad-top");
			aboutApproachSticky.style.removeProperty("--ee-about-approach-fit-pad-bottom");

			const pad = aboutApproachPin.querySelector(".about-approach__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(aboutApproachSticky.getBoundingClientRect().height);
			const stickyTop =
				parseFloat(getComputedStyle(aboutApproachSticky).getPropertyValue("--ee-about-approach-sticky-top")) || 0;
			const availableH = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = fitMq.matches ? Math.min(1, availableH / Math.max(sectionH, 1)) : 1;

			if (fitScale < 1) {
				const styles = getComputedStyle(aboutApproachSticky);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;

				aboutApproachSticky.style.setProperty("--ee-about-approach-viewport-height", `${availableH}px`);
				aboutApproachSticky.style.setProperty("--ee-about-approach-fit-scale", String(fitScale));
				aboutApproachSticky.style.setProperty("--ee-about-approach-fit-pad-top", `${padTop * fitScale}px`);
				aboutApproachSticky.style.setProperty("--ee-about-approach-fit-pad-bottom", `${padBottom * fitScale}px`);
				aboutApproachSticky.classList.add("is-viewport-fitted");
			}

			const holdPx = Math.round(window.innerHeight * 1);
			aboutApproachPin.style.height = `${padH + sectionH * fitScale + holdPx}px`;
		};

		const syncAboutApproachPinnedState = () => {
			if (!aboutApproachPin || !pinMq.matches) {
				aboutApproachSticky.classList.remove("is-pinned");
				return;
			}

			const stickyTop =
				parseFloat(getComputedStyle(aboutApproachSticky).getPropertyValue("--ee-about-approach-sticky-top")) || 0;
			const rect = aboutApproachSticky.getBoundingClientRect();
			const pinRect = aboutApproachPin.getBoundingClientRect();
			const pinned =
				rect.top <= stickyTop + 1.5 &&
				pinRect.bottom > stickyTop + Math.min(rect.height, window.innerHeight - stickyTop) + 4;

			aboutApproachSticky.classList.toggle("is-pinned", pinned);
		};

		if (lenis) {
			lenis.on("scroll", syncAboutApproachPinnedState);
		} else {
			window.addEventListener("scroll", syncAboutApproachPinnedState, { passive: true });
		}
		window.addEventListener("resize", () => {
			syncAboutApproachPin();
			syncAboutApproachPinnedState();
		});
		if (typeof pinMq.addEventListener === "function") {
			pinMq.addEventListener("change", () => {
				syncAboutApproachPin();
				syncAboutApproachPinnedState();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
				syncAboutApproachPin();
				syncAboutApproachPinnedState();
			});
		}
		if (typeof fitMq.addEventListener === "function") {
			fitMq.addEventListener("change", () => {
				syncAboutApproachPin();
				syncAboutApproachPinnedState();
			});
		} else if (typeof fitMq.addListener === "function") {
			fitMq.addListener(() => {
				syncAboutApproachPin();
				syncAboutApproachPinnedState();
			});
		}
		window.requestAnimationFrame(() => {
			syncAboutApproachPin();
			syncAboutApproachPinnedState();
		});
		window.addEventListener("load", () => {
			syncAboutApproachPin();
			syncAboutApproachPinnedState();
		});
		window.addEventListener("excel-ent:header-state-change", () => {
			syncAboutApproachPin();
			syncAboutApproachPinnedState();
		});
		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				syncAboutApproachPin();
				syncAboutApproachPinnedState();
			});
		}
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
			const raw = params.get("categories") || params.get("category") || "";
			const rawTags = params.get("tags") || params.get("tag") || "";

			const requested = raw
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean);
			const requestedTags = rawTags
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean);

			if (!requested.length && !requestedTags.length) return;

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

			exploreSearch?.classList.remove("is-showing-all-cats");
			syncAllActive();
			closeExploreFilters(null, { commit: true });
		};

		applyExploreCategoriesFromUrl();

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

		const render = () => {
			const slide = slides[index];
			if (!slide) {
				return;
			}
			if (image) {
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
			if (!slides.length) {
				return;
			}
			index = (index - 1 + slides.length) % slides.length;
			render();
		});

		artistVenue.querySelector("[data-venue-next]")?.addEventListener("click", () => {
			if (!slides.length) {
				return;
			}
			index = (index + 1) % slides.length;
			render();
		});

		render();
	}

	/* ---------- Artist performance sticky pin ---------- */
	const artistPerformance = document.querySelector("[data-artist-performance]");
	if (artistPerformance) {
		const artistPerformancePin = document.querySelector("[data-artist-performance-pin]");
		const pinMq = window.matchMedia("(min-width: 1200px)");
		const fitMq = window.matchMedia("(min-width: 1200px)");

		const syncArtistPerformancePin = () => {
			if (!artistPerformancePin) {
				return;
			}

			if (!pinMq.matches) {
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
			const sectionHeight = Math.ceil(artistPerformance.getBoundingClientRect().height);
			const stickyTop =
				parseFloat(
					getComputedStyle(artistPerformance).getPropertyValue(
						"--ee-artist-performance-sticky-top"
					)
				) || 0;
			const availableHeight = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = fitMq.matches
				? Math.min(1, availableHeight / Math.max(sectionHeight, 1))
				: 1;

			if (fitScale < 1) {
				const styles = getComputedStyle(artistPerformance);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				const contentHeight = Math.max(sectionHeight - padTop - padBottom, 0);

				artistPerformance.style.setProperty(
					"--ee-artist-performance-viewport-height",
					`${availableHeight}px`
				);
				artistPerformance.style.setProperty(
					"--ee-artist-performance-fit-scale",
					String(fitScale)
				);
				artistPerformance.style.setProperty(
					"--ee-artist-performance-fit-pad-top",
					`${padTop * fitScale}px`
				);
				artistPerformance.style.setProperty(
					"--ee-artist-performance-fit-pad-bottom",
					`${padBottom * fitScale}px`
				);
				artistPerformance.style.setProperty(
					"--ee-artist-performance-content-height",
					`${contentHeight}px`
				);
				artistPerformance.classList.add("is-viewport-fitted");
			}

			const holdHeight = Math.round(window.innerHeight);
			artistPerformancePin.style.height = `${
				padHeight + sectionHeight * fitScale + holdHeight
			}px`;
		};

		const syncArtistPerformancePinnedState = () => {
			if (!artistPerformancePin || !pinMq.matches) {
				artistPerformance.classList.remove("is-pinned");
				return;
			}

			const stickyTop =
				parseFloat(
					getComputedStyle(artistPerformance).getPropertyValue(
						"--ee-artist-performance-sticky-top"
					)
				) || 0;
			const sectionRect = artistPerformance.getBoundingClientRect();
			const pinRect = artistPerformancePin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, window.innerHeight - stickyTop) + 4;
			artistPerformance.classList.toggle("is-pinned", pinned);
		};

		const refreshArtistPerformancePin = () => {
			window.requestAnimationFrame(() => {
				syncArtistPerformancePin();
				syncArtistPerformancePinnedState();
			});
		};

		if (lenis) {
			lenis.on("scroll", syncArtistPerformancePinnedState);
		} else {
			window.addEventListener("scroll", syncArtistPerformancePinnedState, { passive: true });
		}
		window.addEventListener("resize", refreshArtistPerformancePin, { passive: true });
		window.addEventListener("load", refreshArtistPerformancePin);
		window.addEventListener("excel-ent:header-state-change", refreshArtistPerformancePin);

		if (typeof fitMq.addEventListener === "function") {
			fitMq.addEventListener("change", refreshArtistPerformancePin);
		} else if (typeof fitMq.addListener === "function") {
			fitMq.addListener(refreshArtistPerformancePin);
		}

		window.requestAnimationFrame(refreshArtistPerformancePin);
		if (document.fonts?.ready) {
			document.fonts.ready.then(refreshArtistPerformancePin);
		}
	}

	const artistSetlist = document.querySelector("[data-artist-setlist]");
	if (artistSetlist) {
		const artistSetlistPin = document.querySelector("[data-artist-setlist-pin]");
		const pinMq = window.matchMedia("(min-width: 1200px)");
		const fitMq = window.matchMedia("(min-width: 1200px)");

		const syncArtistSetlistPin = () => {
			if (!artistSetlistPin) {
				return;
			}

			if (!pinMq.matches) {
				artistSetlistPin.style.height = "";
				artistSetlist.classList.remove("is-pinned", "is-viewport-fitted");
				artistSetlist.style.removeProperty("height");
				artistSetlist.style.removeProperty("--ee-artist-setlist-viewport-height");
				artistSetlist.style.removeProperty("--ee-artist-setlist-fit-scale");
				artistSetlist.style.removeProperty("--ee-artist-setlist-fit-pad-top");
				artistSetlist.style.removeProperty("--ee-artist-setlist-fit-pad-bottom");
				artistSetlist.style.removeProperty("--ee-artist-setlist-content-height");
				return;
			}

			artistSetlistPin.style.height = "auto";
			artistSetlist.classList.remove("is-viewport-fitted");
			artistSetlist.style.removeProperty("height");
			artistSetlist.style.removeProperty("--ee-artist-setlist-viewport-height");
			artistSetlist.style.removeProperty("--ee-artist-setlist-fit-scale");
			artistSetlist.style.removeProperty("--ee-artist-setlist-fit-pad-top");
			artistSetlist.style.removeProperty("--ee-artist-setlist-fit-pad-bottom");
			artistSetlist.style.removeProperty("--ee-artist-setlist-content-height");

			const pad = artistSetlistPin.querySelector(".artist-setlist__scroll-pad");
			const padHeight = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionHeight = Math.ceil(artistSetlist.getBoundingClientRect().height);
			const stickyTop =
				parseFloat(
					getComputedStyle(artistSetlist).getPropertyValue(
						"--ee-artist-setlist-sticky-top"
					)
				) || 0;
			const availableHeight = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = fitMq.matches
				? Math.min(1, availableHeight / Math.max(sectionHeight, 1))
				: 1;

			if (fitScale < 1) {
				const styles = getComputedStyle(artistSetlist);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				const contentHeight = Math.max(sectionHeight - padTop - padBottom, 0);

				artistSetlist.style.setProperty(
					"--ee-artist-setlist-viewport-height",
					`${availableHeight}px`
				);
				artistSetlist.style.setProperty(
					"--ee-artist-setlist-fit-scale",
					String(fitScale)
				);
				artistSetlist.style.setProperty(
					"--ee-artist-setlist-fit-pad-top",
					`${padTop * fitScale}px`
				);
				artistSetlist.style.setProperty(
					"--ee-artist-setlist-fit-pad-bottom",
					`${padBottom * fitScale}px`
				);
				artistSetlist.style.setProperty(
					"--ee-artist-setlist-content-height",
					`${contentHeight}px`
				);
				artistSetlist.classList.add("is-viewport-fitted");
			}

			const holdHeight = Math.round(window.innerHeight);
			artistSetlistPin.style.height = `${
				padHeight + sectionHeight * fitScale + holdHeight
			}px`;
		};

		const syncArtistSetlistPinnedState = () => {
			if (!artistSetlistPin || !pinMq.matches) {
				artistSetlist.classList.remove("is-pinned");
				return;
			}

			const stickyTop =
				parseFloat(
					getComputedStyle(artistSetlist).getPropertyValue(
						"--ee-artist-setlist-sticky-top"
					)
				) || 0;
			const sectionRect = artistSetlist.getBoundingClientRect();
			const pinRect = artistSetlistPin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, window.innerHeight - stickyTop) + 4;
			artistSetlist.classList.toggle("is-pinned", pinned);
		};

		const refreshArtistSetlistPin = () => {
			window.requestAnimationFrame(() => {
				syncArtistSetlistPin();
				syncArtistSetlistPinnedState();
			});
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
		window.addEventListener("resize", refreshArtistSetlistPin, { passive: true });
		window.addEventListener("load", refreshArtistSetlistPin);
		window.addEventListener("excel-ent:header-state-change", refreshArtistSetlistPin);

		if (typeof fitMq.addEventListener === "function") {
			fitMq.addEventListener("change", refreshArtistSetlistPin);
		} else if (typeof fitMq.addListener === "function") {
			fitMq.addListener(refreshArtistSetlistPin);
		}

		window.requestAnimationFrame(refreshArtistSetlistPin);
		if (document.fonts?.ready) {
			document.fonts.ready.then(refreshArtistSetlistPin);
		}
	}

	const artistMedia = document.querySelector("[data-artist-media]");
	if (artistMedia) {
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
		};

		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				setTab(tab.getAttribute("data-media-tab") || "photos");
			});
		});

		const updateMeta = (thumb) => {
			if (venue) {
				venue.textContent = thumb.getAttribute("data-venue") || "";
			}
			if (location) {
				location.textContent = thumb.getAttribute("data-location") || "";
			}
			if (duration) {
				duration.textContent = thumb.getAttribute("data-duration") || "";
			}
			if (guests) {
				guests.textContent = thumb.getAttribute("data-guests") || "";
			}
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
				thumbs.forEach((item) => item.classList.toggle("is-selected", item === thumb));
				centerMediaStage();
				swapMainImage(thumb.getAttribute("data-image") || "", thumb);
			});
		});
	}

	const artistSimilar = document.querySelector("[data-artist-similar]");
	if (artistSimilar) {
		const artistSimilarPin = document.querySelector("[data-artist-similar-pin]");
		const viewport = artistSimilar.querySelector(".artist-similar__viewport");
		const track = artistSimilar.querySelector("[data-similar-track]");
		const cards = Array.from(artistSimilar.querySelectorAll(".explore-artist-card"));
		const progress = artistSimilar.querySelector("[data-similar-progress]");
		const count = artistSimilar.querySelector("[data-similar-count]");
		let index = 0;

		const isSwipeCarousel = () => window.matchMedia("(max-width: 1199px)").matches;

		const syncArtistSimilarPin = () => {
			if (!artistSimilarPin) {
				return;
			}

			if (isSwipeCarousel()) {
				artistSimilarPin.style.height = "";
				artistSimilar.classList.remove("is-pinned");
				return;
			}

			const pad = artistSimilarPin.querySelector(".artist-similar__scroll-pad");
			const padHeight = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionHeight = Math.ceil(artistSimilar.getBoundingClientRect().height);
			artistSimilarPin.style.height = `${
				padHeight + sectionHeight + Math.round(window.innerHeight)
			}px`;
		};

		const syncArtistSimilarPinnedState = () => {
			if (!artistSimilarPin || isSwipeCarousel()) {
				artistSimilar.classList.remove("is-pinned");
				return;
			}

			const stickyTop =
				parseFloat(
					getComputedStyle(artistSimilar).getPropertyValue(
						"--ee-artist-similar-sticky-top"
					)
				) || 0;
			const sectionRect = artistSimilar.getBoundingClientRect();
			const pinRect = artistSimilarPin.getBoundingClientRect();
			const pinned =
				sectionRect.top <= stickyTop + 1.5 &&
				pinRect.bottom >
					stickyTop + Math.min(sectionRect.height, window.innerHeight - stickyTop) + 4;
			artistSimilar.classList.toggle("is-pinned", pinned);
		};

		const refreshArtistSimilarPin = () => {
			window.requestAnimationFrame(() => {
				syncArtistSimilarPin();
				syncArtistSimilarPinnedState();
			});
		};

		const update = () => {
			const max = Math.max(cards.length - 1, 0);
			index = Math.min(Math.max(index, 0), max);

			if (isSwipeCarousel()) {
				if (track) {
					track.style.transform = "";
				}
				if (viewport && cards[index]) {
					const left = cards[index].offsetLeft - (parseFloat(getComputedStyle(viewport).paddingLeft) || 0);
					if (Math.abs(viewport.scrollLeft - left) > 2) {
						viewport.scrollTo({ left, behavior: "smooth" });
					}
				}
			} else if (track && cards[0]) {
				const gap = parseFloat(getComputedStyle(track).gap) || 50;
				const cardWidth = cards[0].getBoundingClientRect().width || 560;
				track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
			}

			if (count) {
				count.textContent = `${cards.length ? index + 1 : 0}/${cards.length}`;
			}
			if (progress && cards.length) {
				const width = 100 / cards.length;
				progress.style.width = `${width}%`;
				progress.style.left = `${index * width}%`;
			}
		};

		const syncFromScroll = () => {
			if (!isSwipeCarousel() || !viewport || !cards.length) {
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
			window.requestAnimationFrame(syncFromScroll);
		}, { passive: true });

		if (lenis) {
			lenis.on("scroll", syncArtistSimilarPinnedState);
		} else {
			window.addEventListener("scroll", syncArtistSimilarPinnedState, { passive: true });
		}
		window.addEventListener("resize", () => {
			update();
			refreshArtistSimilarPin();
		}, { passive: true });
		window.addEventListener("load", refreshArtistSimilarPin);
		window.addEventListener("excel-ent:header-state-change", refreshArtistSimilarPin);
		window.requestAnimationFrame(refreshArtistSimilarPin);
		if (document.fonts?.ready) {
			document.fonts.ready.then(refreshArtistSimilarPin);
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
		const track = aboutApproach.querySelector("[data-about-approach-track]");
		const slides = Array.from(aboutApproach.querySelectorAll("[data-about-approach-slide]"));
		const dots = Array.from(aboutApproach.querySelectorAll("[data-about-approach-dot]"));
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

		dots.forEach((dot, i) => {
			dot.addEventListener("click", () => {
				goTo(i);
				start();
			});
		});

		goTo(0);
		start();
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
		const pinMq = window.matchMedia("(min-width: 768px)");
		const fitMq = window.matchMedia("(min-width: 1200px)");
		let page = 0;

		const syncAboutReviewsPin = () => {
			if (!aboutReviewsPin) {
				return;
			}
			if (!pinMq.matches) {
				aboutReviewsPin.style.height = "";
				aboutReviews.classList.remove("is-pinned", "is-viewport-fitted");
				aboutReviews.style.removeProperty("height");
				aboutReviews.style.removeProperty("--ee-about-reviews-viewport-height");
				aboutReviews.style.removeProperty("--ee-about-reviews-fit-scale");
				aboutReviews.style.removeProperty("--ee-about-reviews-fit-pad-top");
				aboutReviews.style.removeProperty("--ee-about-reviews-fit-pad-bottom");
				return;
			}

			aboutReviewsPin.style.height = "auto";
			aboutReviews.classList.remove("is-viewport-fitted");
			aboutReviews.style.removeProperty("height");
			aboutReviews.style.removeProperty("--ee-about-reviews-viewport-height");
			aboutReviews.style.removeProperty("--ee-about-reviews-fit-scale");
			aboutReviews.style.removeProperty("--ee-about-reviews-fit-pad-top");
			aboutReviews.style.removeProperty("--ee-about-reviews-fit-pad-bottom");
			const pad = aboutReviewsPin.querySelector(".about-reviews__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(aboutReviews.getBoundingClientRect().height);
			const stickyTop =
				parseFloat(getComputedStyle(aboutReviews).getPropertyValue("--ee-about-reviews-sticky-top")) || 0;
			const availableH = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = fitMq.matches ? Math.min(1, availableH / Math.max(sectionH, 1)) : 1;

			if (fitScale < 1) {
				const styles = getComputedStyle(aboutReviews);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;

				aboutReviews.style.setProperty("--ee-about-reviews-viewport-height", `${availableH}px`);
				aboutReviews.style.setProperty("--ee-about-reviews-fit-scale", String(fitScale));
				aboutReviews.style.setProperty("--ee-about-reviews-fit-pad-top", `${padTop * fitScale}px`);
				aboutReviews.style.setProperty("--ee-about-reviews-fit-pad-bottom", `${padBottom * fitScale}px`);
				aboutReviews.classList.add("is-viewport-fitted");
			}

			const holdPx = Math.round(window.innerHeight * 1);
			aboutReviewsPin.style.height = `${padH + sectionH * fitScale + holdPx}px`;
		};

		const syncAboutReviewsPinnedState = () => {
			if (!aboutReviewsPin || !pinMq.matches) {
				aboutReviews.classList.remove("is-pinned");
				return;
			}
			const stickyTop =
				parseFloat(getComputedStyle(aboutReviews).getPropertyValue("--ee-about-reviews-sticky-top")) || 0;
			const rect = aboutReviews.getBoundingClientRect();
			const pinRect = aboutReviewsPin.getBoundingClientRect();
			const pinned =
				rect.top <= stickyTop + 1.5 &&
				pinRect.bottom > stickyTop + Math.min(rect.height, window.innerHeight - stickyTop) + 4;
			aboutReviews.classList.toggle("is-pinned", pinned);
		};
		const getPerPage = () => 3;

		const getPageCount = () => Math.max(1, Math.ceil(cards.length / getPerPage()));

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

		const getTrackPad = () =>
			track ? parseFloat(window.getComputedStyle(track).paddingLeft) || 0 : 0;

		const goTo = (next, instant) => {
			if (!track || !cards.length) {
				return;
			}

			const pageCount = getPageCount();
			const target = ((next % pageCount) + pageCount) % pageCount;

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
			if (!scrollCarouselMq.matches || !viewport || !cards.length) {
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
			syncPager(Math.floor(closest / getPerPage()));
		};

		track?.addEventListener("mousedown", onPointerDown);
		track?.addEventListener("touchstart", onPointerDown, { passive: true });
		window.addEventListener("mousemove", onPointerMove, { passive: true });
		window.addEventListener("touchmove", onPointerMove, { passive: true });
		window.addEventListener("mouseup", onPointerUp);
		window.addEventListener("touchend", onPointerUp);
		viewport?.addEventListener("scroll", onScrollCarousel, { passive: true });

		const onResize = () => {
			if (scrollCarouselMq.matches) {
				if (track) {
					track.style.transform = "";
				}
				onScrollCarousel();
			} else {
				goTo(page);
			}
			syncAboutReviewsPin();
			syncAboutReviewsPinnedState();
		};
		scrollCarouselMq.addEventListener("change", onResize);
		window.addEventListener("resize", onResize, { passive: true });

		if (lenis) {
			lenis.on("scroll", syncAboutReviewsPinnedState);
		} else {
			window.addEventListener("scroll", syncAboutReviewsPinnedState, { passive: true });
		}
		if (typeof pinMq.addEventListener === "function") {
			pinMq.addEventListener("change", () => {
				syncAboutReviewsPin();
				syncAboutReviewsPinnedState();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
				syncAboutReviewsPin();
				syncAboutReviewsPinnedState();
			});
		}
		if (typeof fitMq.addEventListener === "function") {
			fitMq.addEventListener("change", () => {
				syncAboutReviewsPin();
				syncAboutReviewsPinnedState();
			});
		} else if (typeof fitMq.addListener === "function") {
			fitMq.addListener(() => {
				syncAboutReviewsPin();
				syncAboutReviewsPinnedState();
			});
		}

		goTo(0, true);
		window.requestAnimationFrame(() => {
			syncAboutReviewsPin();
			syncAboutReviewsPinnedState();
		});
		window.addEventListener("load", () => {
			syncAboutReviewsPin();
			syncAboutReviewsPinnedState();
		});
	}

	/* ---------- Package tabs ---------- */
	const packageTabs = document.querySelector("[data-package-tabs]");
	if (packageTabs) {
		const tabs = Array.from(packageTabs.querySelectorAll("[data-package-tab]"));
		const panels = Array.from(packageTabs.querySelectorAll("[data-package-panel]"));
		const packageCards = Array.from(packageTabs.querySelectorAll("[data-package-card]"));
		const packageScrollers = Array.from(packageTabs.querySelectorAll(".package-grid-wrap"));

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

		packageCards.forEach((card) => {
			card.addEventListener("click", () => selectPackageCard(card));
		});

		packageCards.forEach((card) => {
			if (card.classList.contains("package-card--featured")) {
				selectPackageCard(card);
			}
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
					if (scroller) {
						scroller.scrollTop = 0;
					}
					selectPackageCard(defaultCard);
					panel.querySelectorAll(".reveal, [data-reveal]").forEach((item) => {
						item.classList.add("is-visible");
					});
					window.requestAnimationFrame(() => syncPackageRail(scroller));
				}
			});
		};

		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				activate(tab.getAttribute("data-package-tab") || "wedding");
			});
		});

		packageTabs.querySelectorAll("[data-package-more]").forEach((btn) => {
			btn.addEventListener("click", () => {
				const id = btn.getAttribute("data-package-id");
				if (!id || typeof window.excelEntOpenPackageCompare !== "function") {
					return;
				}
				window.excelEntOpenPackageCompare(id);
			});
		});

		window.addEventListener("resize", () => {
			packageScrollers.forEach((scroller) => syncPackageRail(scroller));
		}, { passive: true });
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
		let lastFocus = null;
		let busy = false;
		const enquiryFitMq = window.matchMedia("(min-width: 1200px)");

		const clearEnquiryViewportFit = () => {
			dialog?.style.removeProperty("height");
			form?.style.removeProperty("height");
			form?.style.removeProperty("max-height");
			form?.style.removeProperty("overflow");
			form?.style.removeProperty("flex");
			form?.style.removeProperty("transform");
			form?.style.removeProperty("transform-origin");
		};

		const syncEnquiryViewport = () => {
			if (!dialog || !form || !enquiryFitMq.matches || enquiryModal.hidden) {
				clearEnquiryViewportFit();
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

		const isEnquiryMobile = () =>
			window.matchMedia && window.matchMedia("(max-width: 767px)").matches;

		const isValidEmail = (value) =>
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

		const syncEnquiryPlaceholders = () => {
			if (!notesInput) {
				return;
			}
			const key = isEnquiryMobile() ? "data-placeholder-mobile" : "data-placeholder-desktop";
			const next = notesInput.getAttribute(key);
			if (next) {
				notesInput.setAttribute("placeholder", next);
			}
		};

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
					: defaultSubmitLabel;
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
			window.requestAnimationFrame(syncEnquiryViewport);
			window.setTimeout(() => nameInput?.focus(), 40);
		};

		const close = () => {
			enquiryModal.hidden = true;
			document.body.classList.remove("package-enquiry-open");
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

		window.addEventListener("resize", syncEnquiryViewport, { passive: true });
		window.addEventListener("load", syncEnquiryViewport);
		if (typeof enquiryFitMq.addEventListener === "function") {
			enquiryFitMq.addEventListener("change", syncEnquiryViewport);
		} else if (typeof enquiryFitMq.addListener === "function") {
			enquiryFitMq.addListener(syncEnquiryViewport);
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
		const input = wrap.querySelector("[data-header-categories-input]");
		const meta = wrap.querySelector("[data-header-categories-meta]");
		const defaultMeta = meta?.getAttribute("data-default-meta") || "";
		const groupBtns = Array.from(wrap.querySelectorAll("[data-header-categories-group]"));
		const groupPanels = Array.from(wrap.querySelectorAll("[data-header-categories-panel-group]"));
		const tags = Array.from(wrap.querySelectorAll("[data-header-categories-tag]"));
		const confirmBtn = wrap.querySelector("[data-header-categories-confirm]");
		if (!trigger || !panel || !input) return;

		let selectedValues = (input.value || "")
			.split(",")
			.map((item) => item.trim())
			.filter(Boolean);
		let pendingValues = [...selectedValues];

		const setGroup = (groupId) => {
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
		};

		const syncTags = () => {
			tags.forEach((tag) => {
				const value = tag.getAttribute("data-value") || "";
				const on = pendingValues.includes(value);
				tag.classList.toggle("is-selected", on);
				tag.setAttribute("aria-selected", on ? "true" : "false");
			});
		};

		const syncTrigger = () => {
			const labels = selectedValues
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
			pendingValues = [...selectedValues];
			syncTags();
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
				const value = btn.getAttribute("data-value") || "";
				if (!value) return;
				if (pendingValues.includes(value)) {
					pendingValues = pendingValues.filter((item) => item !== value);
				} else {
					pendingValues.push(value);
				}
				syncTags();
			});
		});

		confirmBtn?.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			selectedValues = [...pendingValues];
			input.value = selectedValues.join(",");
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
		const occasionInput = root.querySelector("[data-msm-occasion-input]");
		const occasionChecks = Array.from(root.querySelectorAll("[data-msm-occasion-check]"));
		const locationInput = root.querySelector("[data-msm-location-input]");
		const dateInput = root.querySelector("[data-msm-date-input]");
		const budgetInput = root.querySelector("[data-msm-budget-input]");
		const catTabs = Array.from(root.querySelectorAll("[data-msm-cat-tab]"));
		const catPanels = Array.from(root.querySelectorAll("[data-msm-cat-panel]"));
		const triggerHintDefault = root.querySelector("[data-msm-trigger-hint-default]");
		const triggerHints = root.querySelector("[data-msm-trigger-hints]");
		const triggerFilterKeys = ["artist", "categories", "location", "date", "budget"];
		if (!openBtn || !panel) return;

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

		const getTriggerFilterStates = () => ({
			artist: Boolean((artistSearch?.value || "").trim()),
			categories: occasionChecks.some((btn) => btn.classList.contains("is-checked")),
			location: Boolean((locationInput?.value || "").trim()),
			date: Boolean(selectedISO),
			budget: Boolean(budgetInput?.value),
		});

		const syncTriggerHints = () => {
			const states = getTriggerFilterStates();
			const hasFilters = triggerFilterKeys.some((key) => states[key]);

			openBtn.classList.toggle("has-filters", hasFilters);
			if (triggerHintDefault) triggerHintDefault.hidden = hasFilters;
			if (triggerHints) triggerHints.hidden = !hasFilters;

			triggerFilterKeys.forEach((key) => {
				root.querySelector(`[data-msm-trigger-filter="${key}"]`)?.classList.toggle("is-active", states[key]);
			});

			root.querySelectorAll("[data-msm-trigger-sep]").forEach((sep) => {
				const after = sep.getAttribute("data-after") || "";
				const before = sep.getAttribute("data-before") || "";
				sep.classList.toggle("is-active", Boolean(states[after] || states[before]));
			});
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

		const syncOccasionInput = () => {
			const selected = occasionChecks.filter((btn) => btn.classList.contains("is-checked"));
			const values = selected.map((btn) => btn.getAttribute("data-value") || "").filter(Boolean);
			const labels = selected.map((btn) => btn.getAttribute("data-label") || "").filter(Boolean);
			if (occasionInput) occasionInput.value = values.join(",");
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
			document.body.appendChild(panel);
			panel.hidden = false;
			openBtn.setAttribute("aria-expanded", "true");
			document.body.classList.add("mobile-search-open");
			collapseCards();
			filterArtists();
		};

		const close = () => {
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
			open();
		});

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
			if (e.key !== "Escape" || panel.hidden) return;
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
				collapseCards();
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
			});
		});

		occasionChecks.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				const on = !btn.classList.contains("is-checked");
				btn.classList.toggle("is-checked", on);
				btn.setAttribute("aria-pressed", on ? "true" : "false");
				syncOccasionInput();
			});
		});

		root.querySelector("[data-msm-confirm='categories']")?.addEventListener("click", (e) => {
			e.preventDefault();
			syncOccasionInput();
			collapseCards();
		});

		root.querySelector("[data-msm-confirm='location']")?.addEventListener("click", (e) => {
			e.preventDefault();
			syncLocationSummary();
			collapseCards();
		});

		locationInput?.addEventListener("keydown", (e) => {
			if (e.key !== "Enter") return;
			e.preventDefault();
			syncLocationSummary();
			collapseCards();
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
			collapseCards();
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
			});
		});

		clearBtn?.addEventListener("click", (e) => {
			e.preventDefault();
			if (artistSearch) artistSearch.value = "";
			filterArtists();
			syncArtistSummary();

			occasionChecks.forEach((btn) => {
				btn.classList.remove("is-checked");
				btn.setAttribute("aria-pressed", "false");
			});
			syncOccasionInput();

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
		const pinMq = window.matchMedia("(min-width: 768px)");
		const fitMq = window.matchMedia("(min-width: 1200px)");
		let busy = false;
		let pending = null;
		let activeId = featured?.getAttribute("data-service-id") || "";

		const syncServicesPin = () => {
			if (!servicesPin) {
				return;
			}
			if (!pinMq.matches) {
				servicesPin.style.height = "";
				servicesSwap.classList.remove("is-pinned", "is-viewport-fitted");
				servicesSwap.style.removeProperty("height");
				servicesSwap.style.removeProperty("--ee-services-viewport-height");
				servicesSwap.style.removeProperty("--ee-services-fit-scale");
				servicesSwap.style.removeProperty("--ee-services-fit-pad-top");
				servicesSwap.style.removeProperty("--ee-services-fit-pad-bottom");
				return;
			}
			servicesPin.style.height = "auto";
			servicesSwap.classList.remove("is-viewport-fitted");
			servicesSwap.style.removeProperty("height");
			servicesSwap.style.removeProperty("--ee-services-viewport-height");
			servicesSwap.style.removeProperty("--ee-services-fit-scale");
			servicesSwap.style.removeProperty("--ee-services-fit-pad-top");
			servicesSwap.style.removeProperty("--ee-services-fit-pad-bottom");
			const pad = servicesPin.querySelector(".services-section__scroll-pad");
			const padH = pad ? Math.ceil(pad.getBoundingClientRect().height) : 0;
			const sectionH = Math.ceil(servicesSwap.getBoundingClientRect().height);
			const stickyTop =
				parseFloat(getComputedStyle(servicesSwap).getPropertyValue("--ee-services-sticky-top")) || 0;
			const availableH = Math.max(window.innerHeight - stickyTop, 0);
			const fitScale = fitMq.matches ? Math.min(1, availableH / Math.max(sectionH, 1)) : 1;
			if (fitScale < 1) {
				const styles = getComputedStyle(servicesSwap);
				const padTop = parseFloat(styles.paddingTop) || 0;
				const padBottom = parseFloat(styles.paddingBottom) || 0;
				servicesSwap.style.setProperty("--ee-services-viewport-height", `${availableH}px`);
				servicesSwap.style.setProperty("--ee-services-fit-scale", String(fitScale));
				servicesSwap.style.setProperty("--ee-services-fit-pad-top", `${padTop * fitScale}px`);
				servicesSwap.style.setProperty("--ee-services-fit-pad-bottom", `${padBottom * fitScale}px`);
				servicesSwap.classList.add("is-viewport-fitted");
			}
			const holdPx = Math.round(window.innerHeight * 1);
			servicesPin.style.height = `${padH + (sectionH * fitScale) + holdPx}px`;
		};

		const syncServicesPinnedState = () => {
			if (!servicesPin || !pinMq.matches) {
				servicesSwap.classList.remove("is-pinned");
				return;
			}
			const stickyTop =
				parseFloat(getComputedStyle(servicesSwap).getPropertyValue("--ee-services-sticky-top")) || 0;
			const rect = servicesSwap.getBoundingClientRect();
			const pinRect = servicesPin.getBoundingClientRect();
			const pinned =
				rect.top <= stickyTop + 1.5 &&
				pinRect.bottom > stickyTop + Math.min(rect.height, window.innerHeight - stickyTop) + 4;
			servicesSwap.classList.toggle("is-pinned", pinned);
		};

		const remountServicesPin = () => {
			window.requestAnimationFrame(() => {
				syncServicesPin();
				syncServicesPinnedState();
			});
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
			lenis.on("scroll", syncServicesPinnedState);
		} else {
			window.addEventListener("scroll", syncServicesPinnedState, { passive: true });
		}
		window.addEventListener("resize", () => {
			syncServicesPin();
			syncServicesPinnedState();
		});
		if (typeof pinMq.addEventListener === "function") {
			pinMq.addEventListener("change", () => {
				syncServicesPin();
				syncServicesPinnedState();
			});
		} else if (typeof pinMq.addListener === "function") {
			pinMq.addListener(() => {
				syncServicesPin();
				syncServicesPinnedState();
			});
		}
		if (typeof fitMq.addEventListener === "function") {
			fitMq.addEventListener("change", () => {
				syncServicesPin();
				syncServicesPinnedState();
			});
		} else if (typeof fitMq.addListener === "function") {
			fitMq.addListener(() => {
				syncServicesPin();
				syncServicesPinnedState();
			});
		}
		window.requestAnimationFrame(() => {
			syncServicesPin();
			syncServicesPinnedState();
		});
		window.addEventListener("load", () => {
			syncServicesPin();
			syncServicesPinnedState();
		});
		window.addEventListener("excel-ent:header-state-change", () => {
			syncServicesPin();
			syncServicesPinnedState();
		});
		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				syncServicesPin();
				syncServicesPinnedState();
			});
		}
		window.setTimeout(() => {
			syncServicesPin();
			syncServicesPinnedState();
		}, 250);
	}
})();

(() => {
	const chipsBar = document.querySelector("[data-search-chips-bar]");
	if (!chipsBar) {
		return;
	}

	const chipsWrap = chipsBar.querySelector(".search-page__chips");
	const filterKeys = new Set(["s", "occasion", "location", "event_date", "budget"]);

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
