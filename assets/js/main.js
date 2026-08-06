(() => {
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const desktop = window.matchMedia("(min-width: 901px)").matches;

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
			".header-search__field",
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

	if (navToggle && navigation) {
		navToggle.addEventListener("click", () => {
			const expanded = navToggle.getAttribute("aria-expanded") === "true";
			navToggle.setAttribute("aria-expanded", String(!expanded));
			navigation.classList.toggle("is-open", !expanded);
		});
	}

	/* ---------- Header on scroll ---------- */
	if (header) {
		const onScroll = () => {
			header.classList.toggle("is-scrolled", window.scrollY > 60);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
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
		const track = blogSection.querySelector("[data-blog-track]");
		const cards = Array.from(blogSection.querySelectorAll("[data-blog-card]"));
		const progress = blogSection.querySelector("[data-blog-progress]");
		const currentEl = blogSection.querySelector("[data-blog-current]");
		const totalEl = blogSection.querySelector("[data-blog-total]");
		const prevBtn = blogSection.querySelector("[data-blog-prev]");
		const nextBtn = blogSection.querySelector("[data-blog-next]");
		let index = cards.length > 2 ? 1 : 0;

		const update = () => {
			const total = cards.length;
			const max = Math.max(total - 1, 0);
			index = Math.min(Math.max(index, 0), max);

			if (track && cards[0]) {
				const gap = parseFloat(getComputedStyle(track).gap) || 40;
				const cardWidth = cards[0].getBoundingClientRect().width || 584;
				const visibleCount = window.innerWidth < 1200 ? 1 : 3;
				const start = Math.max(
					0,
					Math.min(index - Math.floor(visibleCount / 2), cards.length - visibleCount)
				);
				track.style.transform = `translateX(-${Math.max(start, 0) * (cardWidth + gap)}px)`;
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
		};

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
		const track = artistSimilar.querySelector("[data-similar-track]");
		const cards = Array.from(artistSimilar.querySelectorAll(".explore-artist-card"));
		const progress = artistSimilar.querySelector("[data-similar-progress]");
		const count = artistSimilar.querySelector("[data-similar-count]");
		let index = 0;

		const update = () => {
			const max = Math.max(cards.length - 1, 0);
			index = Math.min(Math.max(index, 0), max);
			if (track && cards[0]) {
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
		const cards = Array.from(aboutReviews.querySelectorAll(".about-reviews__card"));
		const pages = Array.from(aboutReviews.querySelectorAll("[data-about-reviews-page]"));
		const perPage = window.matchMedia("(max-width: 1199px)").matches ? 1 : 3;
		const pageCount = Math.max(1, Math.ceil(cards.length / perPage));
		let page = 0;

		const goTo = (next) => {
			if (!track || !cards.length) {
				return;
			}
			page = ((next % pageCount) + pageCount) % pageCount;
			track.style.transform = `translateX(-${page * 100}%)`;
			pages.forEach((btn, i) => {
				const on = i === page;
				btn.classList.toggle("is-active", on);
				btn.setAttribute("aria-selected", on ? "true" : "false");
				btn.hidden = i >= pageCount;
			});
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
			dragging = true;
			startX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
			currentX = startX;
		};

		const onPointerMove = (e) => {
			if (!dragging) {
				return;
			}
			currentX = e.clientX || (e.touches && e.touches[0]?.clientX) || currentX;
		};

		const onPointerUp = () => {
			if (!dragging) {
				return;
			}
			dragging = false;
			const delta = currentX - startX;
			if (Math.abs(delta) > 40) {
				goTo(page + (delta < 0 ? 1 : -1));
			}
		};

		track?.addEventListener("mousedown", onPointerDown);
		track?.addEventListener("touchstart", onPointerDown, { passive: true });
		window.addEventListener("mousemove", onPointerMove, { passive: true });
		window.addEventListener("touchmove", onPointerMove, { passive: true });
		window.addEventListener("mouseup", onPointerUp);
		window.addEventListener("touchend", onPointerUp);

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
})();
