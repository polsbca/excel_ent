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
				document.body.classList.contains("package-enquiry-open");
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
		navToggle.addEventListener("click", () => {
			const expanded = navToggle.getAttribute("aria-expanded") === "true";
			const next = !expanded;
			navToggle.setAttribute("aria-expanded", String(next));
			navigation.classList.toggle("is-open", next);
			siteHeader?.classList.toggle("is-nav-open", next);
			document.body.classList.toggle("nav-open", next);
		});

		document.addEventListener("keydown", (e) => {
			if (e.key !== "Escape" || !navigation.classList.contains("is-open")) return;
			navToggle.setAttribute("aria-expanded", "false");
			navigation.classList.remove("is-open");
			siteHeader?.classList.remove("is-nav-open");
			document.body.classList.remove("nav-open");
		});
	}

	/* ---------- Header on scroll ---------- */
	if (header) {
		const isHomeHeroHeader =
			document.body.classList.contains("home") ||
			document.body.classList.contains("front-page");

		/* Home header sits absolutely over the hero — keep it transparent; no scroll restyle. */
		if (!isHomeHeroHeader) {
			let scrolled = false;
			const onScroll = (scrollY) => {
				const y = typeof scrollY === "number" ? scrollY : window.scrollY;
				/* Hysteresis so Lenis doesn't thrash the class near the threshold */
				const next = scrolled ? y > 40 : y > 80;
				if (next === scrolled) {
					return;
				}
				scrolled = next;
				header.classList.toggle("is-scrolled", scrolled);
			};
			onScroll(window.scrollY);
			if (lenis) {
				lenis.on("scroll", ({ scroll }) => onScroll(scroll));
			} else {
				window.addEventListener("scroll", () => onScroll(window.scrollY), { passive: true });
			}
		}
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

				const duration = 1400;
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

		const stats = document.querySelector(".hero__stats");
		if (stats) {
			const statsObserver = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							runCounters();
							statsObserver.disconnect();
						}
					});
				},
				{ threshold: 0.35 }
			);
			statsObserver.observe(stats);
		}
	}

	/* ---------- Hero occasion carousel ---------- */
	const carousel = document.querySelector("[data-hero-carousel]");
	if (carousel) {
		const slidesNode = carousel.querySelector("[data-carousel-slides]");
		let slides = [];

		try {
			slides = JSON.parse(slidesNode?.textContent || "[]");
		} catch (err) {
			slides = [];
		}

		if (slides.length) {
			let index = 0;
			const image = carousel.querySelector("[data-carousel-image]");
			const label = carousel.querySelector("[data-carousel-label]");
			const fill = carousel.querySelector("[data-carousel-fill]");
			const prev = carousel.querySelector("[data-carousel-prev]");
			const next = carousel.querySelector("[data-carousel-next]");

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
				if (fill) {
					const segment = 100 / slides.length;
					fill.style.width = `${Math.max(segment, 28)}%`;
					fill.style.left = `${index * segment}%`;
				}
			};

			const go = (delta) => {
				index = (index + delta + slides.length) % slides.length;
				render();
			};

			prev?.addEventListener("click", () => go(-1));
			next?.addEventListener("click", () => go(1));
			render();
		}
	}

	/* ---------- Artists section carousel / filters ---------- */
	const artistsSection = document.querySelector("[data-artists-section]");
	if (artistsSection) {
		const progress = artistsSection.querySelector("[data-artists-progress]");
		const currentEl = artistsSection.querySelector("[data-artists-current]");
		const totalEl = artistsSection.querySelector("[data-artists-total]");
		const prevBtn = artistsSection.querySelector("[data-artists-prev]");
		const nextBtn = artistsSection.querySelector("[data-artists-next]");
		const modeBtns = artistsSection.querySelectorAll("[data-artists-mode]");

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

		const applyFilter = () => {
			const activeFilter = filtersByMode[activeMode] || "all";
			getCards().forEach((card) => {
				const category = card.getAttribute("data-category") || "";
				const show = activeFilter === "all" || category === activeFilter;
				card.classList.toggle("is-hidden", !show);
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
		};

		const setMode = (mode) => {
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
			applyFilter();
			update();
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
						applyFilter();
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

		/* Touch / pointer swipe — tablet + phone only (desktop uses arrows + wheel scroll) */
		const isArtistsSwipe = () => window.matchMedia("(max-width: 1199px)").matches;

		const bindArtistsSwipe = (panel) => {
			if (!panel || panel.dataset.eeSwipeBound === "1") {
				return;
			}
			panel.dataset.eeSwipeBound = "1";

			const panelMode = panel.getAttribute("data-mode-panel") || activeMode;
			const getPanelTrack = () => panel.querySelector("[data-artists-track]");
			const getPanelVisible = () =>
				Array.from(panel.querySelectorAll("[data-artists-card]")).filter(
					(card) => !card.classList.contains("is-hidden")
				);

			let pointerId = null;
			let startX = 0;
			let startY = 0;
			let deltaX = 0;
			let axis = null;
			let swiping = false;
			let baseOffset = 0;

			const getOffset = () => {
				const track = getPanelTrack();
				const visible = getPanelVisible();
				if (!track || !visible[0]) {
					return 0;
				}
				const gap = parseFloat(getComputedStyle(track).gap) || 50;
				const cardWidth = visible[0].getBoundingClientRect().width || 518;
				return index * (cardWidth + gap);
			};

			const onDown = (e) => {
				if (!isArtistsSwipe()) {
					return;
				}
				if (
					panel.hidden ||
					panel.classList.contains("is-hidden") ||
					panelMode !== activeMode
				) {
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
				baseOffset = getOffset();
			};

			const onMove = (e) => {
				if (!isArtistsSwipe() || pointerId !== e.pointerId) {
					return;
				}
				const dx = e.clientX - startX;
				const dy = e.clientY - startY;

				if (!axis) {
					if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
						return;
					}
					axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
					if (axis === "y") {
						pointerId = null;
						axis = null;
						return;
					}
					window.excelEntLenis?.stop();
					try {
						panel.setPointerCapture(e.pointerId);
					} catch (err) {
						/* ignore */
					}
				}

				if (axis !== "x") {
					return;
				}

				swiping = true;
				deltaX = dx;
				const track = getPanelTrack();
				if (track) {
					track.style.transition = "none";
					track.style.transform = `translateX(${-(baseOffset - deltaX)}px)`;
				}
				e.preventDefault();
			};

			const finishSwipe = () => {
				window.excelEntLenis?.start();

				const track = getPanelTrack();
				if (track) {
					track.style.transition = "";
				}

				if (swiping && Math.abs(deltaX) > 48) {
					go(deltaX < 0 ? 1 : -1);
				} else {
					update();
				}

				if (swiping) {
					const suppressClick = (ev) => {
						ev.preventDefault();
						ev.stopPropagation();
						panel.removeEventListener("click", suppressClick, true);
					};
					panel.addEventListener("click", suppressClick, true);
					window.setTimeout(() => {
						panel.removeEventListener("click", suppressClick, true);
					}, 400);
				}

				swiping = false;
				deltaX = 0;
				axis = null;
			};

			const onUp = (e) => {
				if (pointerId === null || pointerId !== e.pointerId) {
					return;
				}
				pointerId = null;
				finishSwipe();
			};

			panel.addEventListener("pointerdown", onDown);
			panel.addEventListener("pointermove", onMove, { passive: false });
			panel.addEventListener("pointerup", onUp);
			panel.addEventListener("pointercancel", onUp);
		};

		artistsSection.querySelectorAll("[data-artists-carousel]").forEach(bindArtistsSwipe);

		window.addEventListener("resize", () => update(), { passive: true });
		setMode(activeMode);
	}

	/* ---------- Excel Way tabs ---------- */
	const excelWay = document.querySelector("[data-excel-way]");
	if (excelWay) {
		const tabs = Array.from(excelWay.querySelectorAll("[data-excel-way-tab]"));
		const panels = Array.from(excelWay.querySelectorAll("[data-excel-way-panel]"));

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
		};

		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				setTab(tab.getAttribute("data-excel-way-tab") || "how-it-works");
			});
		});
	}

	/* ---------- Blog carousel ---------- */
	const blogSection = document.querySelector("[data-blog-section]");
	if (blogSection) {
		const viewport = blogSection.querySelector(".blog-section__viewport");
		const track = blogSection.querySelector("[data-blog-track]");
		const cards = Array.from(blogSection.querySelectorAll("[data-blog-card]"));
		const progress = blogSection.querySelector("[data-blog-progress]");
		const currentEl = blogSection.querySelector("[data-blog-current]");
		const totalEl = blogSection.querySelector("[data-blog-total]");
		const prevBtn = blogSection.querySelector("[data-blog-prev]");
		const nextBtn = blogSection.querySelector("[data-blog-next]");
		let index = cards.length > 2 ? 1 : 0;

		const isBlogMobile = () => window.innerWidth <= 767;
		const isBlogSwipe = () => window.innerWidth <= 1199;

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

		window.addEventListener("resize", update, { passive: true });
		update();
	}

	/* ---------- Venues accordion ---------- */
	const venuesSection = document.querySelector("[data-venues-section]");
	if (venuesSection) {
		const panels = Array.from(venuesSection.querySelectorAll("[data-venue-panel]"));

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
		};

		panels.forEach((panel) => {
			const trigger = panel.querySelector("[data-venue-trigger]");
			trigger?.addEventListener("click", () => {
				if (!panel.classList.contains("is-active")) {
					setActive(panel);
				}
			});
		});
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

		const syncChipBar = () => {
			const remaining = chipsWrap
				? chipsWrap.querySelectorAll("[data-explore-chip]").length
				: 0;
			chipsBar?.classList.toggle("is-empty", remaining === 0);
			if (countBadge) {
				countBadge.textContent = String(remaining);
			}
		};

		cats.forEach((btn) => {
			btn.addEventListener("click", () => {
				cats.forEach((item) => {
					const on = item === btn;
					item.classList.toggle("is-active", on);
					item.setAttribute("aria-selected", on ? "true" : "false");
				});
			});
		});

		chipsWrap?.addEventListener("click", (e) => {
			const chip = e.target.closest("[data-explore-chip]");
			if (!chip || !chipsWrap.contains(chip)) {
				return;
			}
			chip.remove();
			syncChipBar();
		});

		clearBtn?.addEventListener("click", () => {
			chipsWrap?.querySelectorAll("[data-explore-chip]").forEach((chip) => chip.remove());
			syncChipBar();
		});

		document.querySelectorAll("[data-explore-fav]").forEach((btn) => {
			btn.addEventListener("click", () => {
				const card = btn.closest(".explore-artist-card");
				const on = !(card?.classList.contains("is-favorited"));
				card?.classList.toggle("is-favorited", on);
				btn.setAttribute("aria-pressed", on ? "true" : "false");
			});
		});

		document.querySelectorAll("[data-explore-header-search]").forEach((btn) => {
			btn.addEventListener("click", (e) => {
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

	const artistSetlist = document.querySelector("[data-artist-setlist]");
	if (artistSetlist) {
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
	}

	const artistMedia = document.querySelector("[data-artist-media]");
	if (artistMedia) {
		const tabs = Array.from(artistMedia.querySelectorAll("[data-media-tab]"));
		const panels = Array.from(artistMedia.querySelectorAll("[data-media-panel]"));
		const thumbs = Array.from(artistMedia.querySelectorAll("[data-media-thumb]"));
		const main = artistMedia.querySelector("[data-media-main]");
		const venue = artistMedia.querySelector("[data-media-venue]");
		const location = artistMedia.querySelector("[data-media-location]");
		const duration = artistMedia.querySelector("[data-media-duration]");
		const guests = artistMedia.querySelector("[data-media-guests]");

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

		thumbs.forEach((thumb) => {
			thumb.addEventListener("click", () => {
				thumbs.forEach((item) => item.classList.toggle("is-selected", item === thumb));
				if (main) {
					main.src = thumb.getAttribute("data-image") || main.src;
				}
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
			});
		});
	}

	const artistSimilar = document.querySelector("[data-artist-similar]");
	if (artistSimilar) {
		const viewport = artistSimilar.querySelector(".artist-similar__viewport");
		const track = artistSimilar.querySelector("[data-similar-track]");
		const cards = Array.from(artistSimilar.querySelectorAll(".explore-artist-card"));
		const progress = artistSimilar.querySelector("[data-similar-progress]");
		const count = artistSimilar.querySelector("[data-similar-count]");
		let index = 0;

		const isSwipeCarousel = () => window.matchMedia("(max-width: 1199px)").matches;

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

		window.addEventListener("resize", update);
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

	/* ---------- About reviews carousel ---------- */
	const aboutReviews = document.querySelector("[data-about-reviews]");
	if (aboutReviews) {
		const track = aboutReviews.querySelector("[data-about-reviews-track]");
		const viewport = aboutReviews.querySelector(".about-reviews__viewport");
		const cards = Array.from(aboutReviews.querySelectorAll(".about-reviews__card"));
		const pages = Array.from(aboutReviews.querySelectorAll("[data-about-reviews-page]"));
		const scrollCarouselMq = window.matchMedia("(max-width: 1199px)");
		let page = 0;

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

		const goTo = (next) => {
			if (!track || !cards.length) {
				return;
			}

			const pageCount = getPageCount();
			const target = ((next % pageCount) + pageCount) % pageCount;

			if (scrollCarouselMq.matches && viewport) {
				const card = cards[target * getPerPage()];
				if (card) {
					const pad = track ? parseFloat(window.getComputedStyle(track).paddingLeft) || 0 : 0;
					viewport.scrollTo({
						left: Math.max(0, card.offsetLeft - pad),
						behavior: "smooth",
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
			const pad = track ? parseFloat(window.getComputedStyle(track).paddingLeft) || 0 : 0;
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
				track.style.transform = "";
				onScrollCarousel();
			} else {
				goTo(page);
			}
		};
		scrollCarouselMq.addEventListener("change", onResize);

		goTo(0);
	}

	/* ---------- Package tabs ---------- */
	const packageTabs = document.querySelector("[data-package-tabs]");
	if (packageTabs) {
		const tabs = Array.from(packageTabs.querySelectorAll("[data-package-tab]"));
		const panels = Array.from(packageTabs.querySelectorAll("[data-package-panel]"));

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
					panel.querySelectorAll(".reveal, [data-reveal]").forEach((item) => {
						item.classList.add("is-visible");
					});
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
				suffixEl.textContent = pkg.suffix ? ` ${pkg.suffix}` : "";
				suffixEl.hidden = !pkg.suffix;
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
			setPickerState(pickerA, !!optionA, true);
			setPickerState(pickerB, false, false);
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
			if (window.matchMedia && !window.matchMedia("(max-width: 767px)").matches) {
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
		const triggers = Array.from(document.querySelectorAll("[data-package-enquiry]"));
		let lastFocus = null;

		const open = (label, name) => {
			lastFocus = document.activeElement;
			if (selected) {
				selected.textContent = label || name || "";
			}
			if (packageInput) {
				packageInput.value = name || label || "";
			}
			enquiryModal.hidden = false;
			document.body.classList.add("package-enquiry-open");
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
			el.addEventListener("click", close);
		});

		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && !enquiryModal.hidden) {
				close();
			}
		});

		form?.addEventListener("submit", (e) => {
			e.preventDefault();
			const name = nameInput?.value?.trim();
			const email = enquiryModal.querySelector("[data-package-enquiry-email]")?.value?.trim();
			if (!name) {
				nameInput?.focus();
				return;
			}
			if (!email) {
				enquiryModal.querySelector("[data-package-enquiry-email]")?.focus();
				return;
			}
			form.reset();
			close();
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

			/* Mobile Figma: first accordion open by default */
			if (window.matchMedia("(max-width: 767px)").matches && sections[0]) {
				setOpen(sections[0], true);
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
			dd.dataset.contactDdReady = "1";

			const field = dd.closest(".contact-field--dd");
			const trigger = dd.querySelector("[data-contact-dd-trigger]");
			const panel = dd.querySelector("[data-contact-dd-panel]");
			const input = dd.querySelector("[data-contact-dd-input]");
			const labelEl = dd.querySelector("[data-contact-dd-label]");
			const customInput = dd.querySelector("[data-contact-dd-custom]");
			const placeholder = labelEl?.textContent || "";

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

		contactTabsRoot.querySelectorAll("[data-contact-dd]").forEach((dd) => initContactDd(dd));

		document.addEventListener("click", (e) => {
			if (!e.target.closest("[data-contact-dd]")) {
				closeAllDds();
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") closeAllDds();
		});

		/* File upload labels */
		contactTabsRoot.querySelectorAll("[data-contact-file]").forEach((wrap) => {
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
	};

	/* Header search — Budget dropdown (Figma 1084:5398) */
	document.querySelectorAll("[data-header-budget]").forEach((wrap) => {
		const trigger = wrap.querySelector("[data-header-budget-trigger]");
		const panel = wrap.querySelector("[data-header-budget-panel]");
		const input = wrap.querySelector("[data-header-budget-input]");
		const label = wrap.querySelector("[data-header-budget-label]");
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
				if (label) label.textContent = text;
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
		const label = wrap.querySelector("[data-header-date-label]");
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
		const formatLabel = (d) => {
			const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
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

		const close = () => {
			panel.hidden = true;
			wrap.classList.remove("is-open");
			trigger.setAttribute("aria-expanded", "false");
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
			if (label) label.textContent = formatLabel(d);
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

	/* Header search — Location dropdown (Figma 1084:5006) */
	document.querySelectorAll("[data-header-location]").forEach((wrap) => {
		const trigger = wrap.querySelector("[data-header-location-trigger]");
		const panel = wrap.querySelector("[data-header-location-panel]");
		const input = wrap.querySelector("[data-header-location-input]");
		const label = wrap.querySelector("[data-header-location-label]");
		const search = wrap.querySelector("[data-header-location-search]");
		const confirmBtn = wrap.querySelector("[data-header-location-confirm]");
		const options = Array.from(wrap.querySelectorAll("[data-header-location-option]"));
		if (!trigger || !panel || !input) return;

		let selectedValue = input.value || "";
		let pendingValue = selectedValue;
		let pendingLabel =
			options.find((opt) => opt.getAttribute("data-value") === pendingValue)?.getAttribute("data-label") || "";

		const syncSelection = () => {
			options.forEach((opt) => {
				const on = opt.getAttribute("data-value") === pendingValue;
				opt.classList.toggle("is-selected", on);
				opt.setAttribute("aria-selected", on ? "true" : "false");
			});
			if (confirmBtn) confirmBtn.disabled = !pendingValue;
		};

		const filterOptions = () => {
			const q = (search?.value || "").trim().toLowerCase();
			options.forEach((opt) => {
				const hay = opt.getAttribute("data-search") || "";
				const show = !q || hay.includes(q);
				const item = opt.closest(".header-location__item");
				if (item) item.hidden = !show;
				else opt.hidden = !show;
			});
		};

		const close = () => {
			panel.hidden = true;
			wrap.classList.remove("is-open");
			trigger.setAttribute("aria-expanded", "false");
		};

		const open = () => {
			closeHeaderPanels(wrap);
			pendingValue = selectedValue;
			pendingLabel =
				options.find((opt) => opt.getAttribute("data-value") === pendingValue)?.getAttribute("data-label") ||
				"";
			if (search) search.value = "";
			filterOptions();
			syncSelection();
			panel.hidden = false;
			wrap.classList.add("is-open");
			trigger.setAttribute("aria-expanded", "true");
			window.setTimeout(() => search?.focus(), 0);
		};

		trigger.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (panel.hidden) open();
			else close();
		});

		options.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				pendingValue = btn.getAttribute("data-value") || "";
				pendingLabel = btn.getAttribute("data-label") || pendingValue;
				syncSelection();
			});
		});

		search?.addEventListener("input", filterOptions);
		search?.addEventListener("click", (e) => e.stopPropagation());
		search?.addEventListener("keydown", (e) => e.stopPropagation());

		confirmBtn?.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (!pendingValue) return;
			selectedValue = pendingValue;
			input.value = selectedValue;
			if (label) label.textContent = pendingLabel || selectedValue;
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
		const label = wrap.querySelector("[data-header-categories-label]");
		const groupBtns = Array.from(wrap.querySelectorAll("[data-header-categories-group]"));
		const groupPanels = Array.from(wrap.querySelectorAll("[data-header-categories-panel-group]"));
		const tags = Array.from(wrap.querySelectorAll("[data-header-categories-tag]"));
		if (!trigger || !panel || !input) return;

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
				const text = btn.getAttribute("data-label") || value;
				input.value = value;
				if (label) label.textContent = text;
				tags.forEach((tag) => {
					const on = tag === btn;
					tag.classList.toggle("is-selected", on);
					tag.setAttribute("aria-selected", on ? "true" : "false");
				});
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

	/* Header search — Search Artist (Figma 1084:5103) */
	document.querySelectorAll("[data-header-artist]").forEach((wrap) => {
		const trigger = wrap.querySelector("[data-header-artist-trigger]");
		const panel = wrap.querySelector("[data-header-artist-panel]");
		const input = wrap.querySelector("[data-header-artist-input]");
		const label = wrap.querySelector("[data-header-artist-label]");
		const search = wrap.querySelector("[data-header-artist-search]");
		const empty = wrap.querySelector("[data-header-artist-empty]");
		const items = Array.from(wrap.querySelectorAll("[data-header-artist-item]"));
		const options = Array.from(wrap.querySelectorAll("[data-header-artist-option]"));
		if (!trigger || !panel || !input) return;

		const defaultLabel = "Search Artist";

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
		};

		const open = () => {
			closeHeaderPanels(wrap);
			if (search) search.value = input.value || "";
			filterResults();
			panel.hidden = false;
			wrap.classList.add("is-open");
			trigger.setAttribute("aria-expanded", "true");
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
			if (label) label.textContent = q || defaultLabel;
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
				if (label) label.textContent = value || defaultLabel;
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

	/* ---------- Mobile search overlay (Figma 1059:5334 / 1161:5532) ---------- */
	document.querySelectorAll("[data-mobile-search]").forEach((root) => {
		const openBtn = root.querySelector("[data-mobile-search-open]");
		const panel = root.querySelector("[data-mobile-search-panel]");
		const sheet = root.querySelector("[data-msm-sheet]");
		const homeView = root.querySelector('[data-msm-view="home"]');
		const detailView = root.querySelector('[data-msm-view="detail"]');
		const closeBtns = root.querySelectorAll("[data-mobile-search-close]");
		const clearBtn = root.querySelector("[data-mobile-search-clear]");
		const artistSearch = root.querySelector("[data-msm-artist-search]");
		const detailSearch = root.querySelector("[data-msm-detail-search]");
		const artistEmpty = root.querySelector("[data-msm-artist-empty]");
		const artistItems = Array.from(root.querySelectorAll("[data-msm-artist-item]"));
		const artistOptions = Array.from(root.querySelectorAll("[data-msm-artist-option]"));
		const tabs = Array.from(root.querySelectorAll("[data-msm-tab]"));
		const tabPanels = Array.from(root.querySelectorAll("[data-msm-tab-panel]"));
		const occasionInput = root.querySelector("[data-msm-occasion-input]");
		const occasionChecks = Array.from(root.querySelectorAll("[data-msm-occasion-check]"));
		const homeOccasionLabel = root.querySelector('[data-msm-home-label="occasion"]');
		const homeLocationLabel = root.querySelector('[data-msm-home-label="location"]');
		const homeDateLabel = root.querySelector('[data-msm-home-label="date"]');
		const homeBudgetLabel = root.querySelector('[data-msm-home-label="budget"]');
		if (!openBtn || !panel || !homeView || !detailView) return;

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

		const syncSearchInputs = (source) => {
			const value = source?.value || "";
			if (artistSearch && artistSearch !== source) artistSearch.value = value;
			if (detailSearch && detailSearch !== source) detailSearch.value = value;
			filterArtists();
		};

		const setTab = (key) => {
			tabs.forEach((tab) => {
				const on = tab.getAttribute("data-msm-tab") === key;
				tab.classList.toggle("is-active", on);
				tab.setAttribute("aria-selected", on ? "true" : "false");
			});
			tabPanels.forEach((tabPanel) => {
				const on = tabPanel.getAttribute("data-msm-tab-panel") === key;
				tabPanel.hidden = !on;
			});
		};

		const showHome = () => {
			homeView.hidden = false;
			detailView.hidden = true;
			sheet?.classList.remove("is-detail");
		};

		const showDetail = (key) => {
			homeView.hidden = true;
			detailView.hidden = false;
			sheet?.classList.add("is-detail");
			setTab(key || "occasion");
			if (detailSearch && artistSearch) detailSearch.value = artistSearch.value || "";
		};

		const syncOccasionLabel = () => {
			const selected = occasionChecks.filter((btn) => btn.classList.contains("is-checked"));
			const defaultLabel = occasionInput?.getAttribute("data-default-label") || "Occasion";
			if (!homeOccasionLabel) return;
			if (selected.length === 1) {
				homeOccasionLabel.textContent = selected[0].getAttribute("data-label") || defaultLabel;
			} else if (selected.length > 1) {
				homeOccasionLabel.textContent = `${selected.length} selected`;
			} else {
				homeOccasionLabel.textContent = defaultLabel;
			}
		};

		const syncOccasionInput = () => {
			const values = occasionChecks
				.filter((btn) => btn.classList.contains("is-checked"))
				.map((btn) => btn.getAttribute("data-value") || "")
				.filter(Boolean);
			if (occasionInput) occasionInput.value = values.join(",");
			syncOccasionLabel();
		};

		const open = () => {
			panel.hidden = false;
			openBtn.setAttribute("aria-expanded", "true");
			document.body.classList.add("mobile-search-open");
			showHome();
			filterArtists();
			window.setTimeout(() => {
				artistSearch?.focus();
				artistSearch?.select?.();
			}, 0);
		};

		const close = () => {
			panel.hidden = true;
			openBtn.setAttribute("aria-expanded", "false");
			document.body.classList.remove("mobile-search-open");
			showHome();
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
			if (!detailView.hidden) {
				showHome();
				return;
			}
			close();
		});

		artistSearch?.addEventListener("input", () => syncSearchInputs(artistSearch));
		detailSearch?.addEventListener("input", () => syncSearchInputs(detailSearch));

		artistOptions.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				const value = btn.getAttribute("data-value") || "";
				if (artistSearch) artistSearch.value = value;
				syncSearchInputs(artistSearch);
			});
		});

		root.querySelectorAll("[data-msm-open-detail]").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				showDetail(btn.getAttribute("data-msm-open-detail") || "occasion");
			});
		});

		tabs.forEach((tab) => {
			tab.addEventListener("click", (e) => {
				e.preventDefault();
				setTab(tab.getAttribute("data-msm-tab") || "occasion");
			});
		});

		root.querySelectorAll("[data-msm-acc]").forEach((section) => {
			const trigger = section.querySelector("[data-msm-acc-trigger]");
			const accPanel = section.querySelector("[data-msm-acc-panel]");
			trigger?.addEventListener("click", (e) => {
				e.preventDefault();
				const openNow = Boolean(accPanel?.hidden);
				root.querySelectorAll("[data-msm-acc]").forEach((other) => {
					const otherTrigger = other.querySelector("[data-msm-acc-trigger]");
					const otherPanel = other.querySelector("[data-msm-acc-panel]");
					const on = openNow && other === section;
					other.classList.toggle("is-open", on);
					otherTrigger?.setAttribute("aria-expanded", on ? "true" : "false");
					if (otherPanel) otherPanel.hidden = !on;
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

		root.querySelectorAll("[data-msm-tab-panel]").forEach((tabPanel) => {
			const input = tabPanel.querySelector("[data-msm-filter-input]");
			const key = input?.getAttribute("data-msm-key") || "";
			const defaultLabel = input?.getAttribute("data-default-label") || "";
			const labelEl =
				key === "location"
					? homeLocationLabel
					: key === "date"
						? homeDateLabel
						: key === "budget"
							? homeBudgetLabel
							: null;

			tabPanel.querySelectorAll("[data-msm-simple-option]").forEach((opt) => {
				opt.addEventListener("click", (e) => {
					e.preventDefault();
					const value = opt.getAttribute("data-value") || "";
					const text = opt.getAttribute("data-label") || value;
					if (input) input.value = value;
					if (labelEl) labelEl.textContent = text || defaultLabel;
					tabPanel.querySelectorAll("[data-msm-simple-option]").forEach((other) => {
						other.classList.toggle("is-selected", other === opt);
					});
				});
			});

			const dateInput = tabPanel.querySelector("[data-msm-date-input]");
			dateInput?.addEventListener("change", () => {
				const value = dateInput.value || "";
				if (input) input.value = value;
				if (!labelEl) return;
				if (!value) {
					labelEl.textContent = defaultLabel;
					return;
				}
				const parts = value.split("-");
				if (parts.length === 3) {
					const dt = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
					labelEl.textContent = dt.toLocaleDateString(undefined, {
						day: "numeric",
						month: "short",
						year: "numeric",
					});
				} else {
					labelEl.textContent = value;
				}
			});
		});

		clearBtn?.addEventListener("click", (e) => {
			e.preventDefault();
			if (artistSearch) artistSearch.value = "";
			if (detailSearch) detailSearch.value = "";
			filterArtists();

			occasionChecks.forEach((btn) => {
				btn.classList.remove("is-checked");
				btn.setAttribute("aria-pressed", "false");
			});
			syncOccasionInput();

			root.querySelectorAll("[data-msm-filter-input]").forEach((input) => {
				const key = input.getAttribute("data-msm-key") || "";
				const defaultLabel = input.getAttribute("data-default-label") || "";
				input.value = "";
				if (key === "location" && homeLocationLabel) homeLocationLabel.textContent = defaultLabel;
				if (key === "date" && homeDateLabel) homeDateLabel.textContent = defaultLabel;
				if (key === "budget" && homeBudgetLabel) homeBudgetLabel.textContent = defaultLabel;
			});

			root.querySelectorAll("[data-msm-simple-option]").forEach((opt) => {
				opt.classList.remove("is-selected");
			});

			const dateInput = root.querySelector("[data-msm-date-input]");
			if (dateInput) dateInput.value = "";
		});
	});

	/* ---------- Services swap (desktop hover / mobile tap) ---------- */
	const servicesSwap = document.querySelector("[data-services-swap]");
	if (servicesSwap) {
		const featured = servicesSwap.querySelector("[data-service-featured]");
		const cards = Array.from(servicesSwap.querySelectorAll("[data-service-card]"));
		const desktopMq = window.matchMedia("(min-width: 1200px)");
		const mobileMq = window.matchMedia("(max-width: 1199px)");
		const swapMsDesktop = reduced ? 0 : 680;
		const swapMsMobile = reduced ? 0 : 520;
		let busy = false;
		let pending = null;
		let lockedCard = null;

		const isDesktop = () => desktopMq.matches;
		const isMobile = () => mobileMq.matches;
		const swapMs = () => (isMobile() ? swapMsMobile : swapMsDesktop);

		const readData = (el) => ({
			id: el.getAttribute("data-service-id") || "",
			title: el.getAttribute("data-service-title") || "",
			price: el.getAttribute("data-service-price") || "",
			image: el.getAttribute("data-service-image") || "",
			link: el.getAttribute("data-service-link") || el.getAttribute("href") || "",
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
		};

		const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

		const makeFlyer = (img, rect, zIndex, duration) => {
			const flyer = document.createElement("div");
			flyer.className = "service-swap-flyer";
			flyer.setAttribute("aria-hidden", "true");
			flyer.style.cssText = [
				"position:fixed",
				`left:${rect.left}px`,
				`top:${rect.top}px`,
				`width:${rect.width}px`,
				`height:${rect.height}px`,
				`z-index:${zIndex}`,
				"margin:0",
				"padding:0",
				"overflow:hidden",
				"pointer-events:none",
				"will-change:left, top, width, height",
				`transition:left ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), top ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), width ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), height ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
			].join(";");

			const clone = img.cloneNode(true);
			clone.removeAttribute("data-service-image-el");
			clone.className = "service-swap-flyer__img";
			clone.style.cssText =
				"width:100%;height:100%;object-fit:cover;object-position:center;display:block;transform:none;";
			flyer.appendChild(clone);

			const shade = document.createElement("span");
			shade.className = "service-swap-flyer__shade";
			flyer.appendChild(shade);

			document.body.appendChild(flyer);
			return flyer;
		};

		const moveFlyer = (flyer, rect) => {
			flyer.style.left = `${rect.left}px`;
			flyer.style.top = `${rect.top}px`;
			flyer.style.width = `${rect.width}px`;
			flyer.style.height = `${rect.height}px`;
		};

		const swap = async (card) => {
			if (!featured || !card) {
				return;
			}

			const cardData = readData(card);
			const featData = readData(featured);
			if (cardData.id && featData.id && cardData.id === featData.id) {
				lockedCard = card;
				return;
			}

			const duration = swapMs();
			busy = true;
			pending = null;
			servicesSwap.classList.add("is-swapping");
			card.classList.add("is-swap-source");
			featured.classList.add("is-swap-target");

			const cardImg = card.querySelector("[data-service-image-el]");
			const featImg = featured.querySelector("[data-service-image-el]");

			if (!reduced && cardImg && featImg) {
				const cardRect = card.getBoundingClientRect();
				const featRect = featured.getBoundingClientRect();
				const cardFlyer = makeFlyer(cardImg, cardRect, 80, duration);
				const featFlyer = makeFlyer(featImg, featRect, 79, duration);

				card.classList.add("is-swap-ghost");
				featured.classList.add("is-swap-ghost");

				void cardFlyer.offsetWidth;
				moveFlyer(cardFlyer, featRect);
				moveFlyer(featFlyer, cardRect);

				await wait(duration);

				applyCard(card, featData);
				applyFeatured(cardData);

				cardFlyer.remove();
				featFlyer.remove();
				card.classList.remove("is-swap-ghost");
				featured.classList.remove("is-swap-ghost");
			} else {
				applyCard(card, featData);
				applyFeatured(cardData);
			}

			card.classList.add("is-swap-in");
			featured.classList.add("is-swap-in");

			await wait(reduced ? 0 : 280);

			card.classList.remove("is-swap-source", "is-swap-in");
			featured.classList.remove("is-swap-target", "is-swap-in");
			servicesSwap.classList.remove("is-swapping");

			/* Keep lock on the card still under the cursor so restoring
			   pointer-events does not immediately re-trigger mouseenter. */
			lockedCard = isDesktop() ? card : null;
			busy = false;

			if (pending && pending !== card && pending !== lockedCard) {
				const next = pending;
				pending = null;
				lockedCard = null;
				swap(next);
			} else {
				pending = null;
			}
		};

		const onEnter = (card) => {
			if (!isDesktop()) {
				return;
			}
			if (lockedCard === card) {
				return;
			}
			if (busy) {
				pending = card;
				return;
			}
			swap(card);
		};

		const onLeave = (card) => {
			if (lockedCard === card) {
				lockedCard = null;
			}
			if (pending === card) {
				pending = null;
			}
		};

		const onTap = (event, card) => {
			if (!isMobile()) {
				return;
			}
			event.preventDefault();
			if (busy) {
				pending = card;
				return;
			}
			swap(card);
		};

		cards.forEach((card) => {
			card.addEventListener("mouseenter", () => onEnter(card));
			card.addEventListener("mouseleave", () => onLeave(card));
			card.addEventListener("click", (event) => onTap(event, card));
		});
	}
})();
