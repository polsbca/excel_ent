(() => {
	const navToggle = document.querySelector(".nav-toggle");
	const navigation = document.querySelector(".main-navigation");

	if (navToggle && navigation) {
		navToggle.addEventListener("click", () => {
			const expanded = navToggle.getAttribute("aria-expanded") === "true";
			navToggle.setAttribute("aria-expanded", String(!expanded));
			navigation.classList.toggle("is-open", !expanded);
		});
	}

	const revealItems = document.querySelectorAll("[data-reveal]");

	if (!revealItems.length) {
		return;
	}

	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		revealItems.forEach((item) => item.classList.add("is-visible"));
		return;
	}

	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}
				entry.target.classList.add("is-visible");
				obs.unobserve(entry.target);
			});
		},
		{
			threshold: 0.16,
			rootMargin: "0px 0px -8% 0px",
		}
	);

	revealItems.forEach((item, index) => {
		item.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
		observer.observe(item);
	});
})();
