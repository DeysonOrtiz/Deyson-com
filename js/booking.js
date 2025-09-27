// Booking and CTA Functions for Camera Confidence Coaching

// Simple URL Query Param Gate for Single Discount Code
function initDiscountGate() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const discount = urlParams.get("50off-july");

  // Check if the discount parameter exists (regardless of value)
  if (discount !== null) {
    showDiscountOffer();
  }
}

function showDiscountOffer() {
  // Find the regular booking button or CTA section
  const regularButton = document.querySelector(
    ".cta-button, .book-session-btn, .service-card .cta-button",
  );
  const ctaSection = document.querySelector(
    ".final-cta, .cta-section, .service-card",
  );

  if (!regularButton && !ctaSection) {
    console.warn(
      "No booking button or CTA section found to replace with discount offer",
    );
    return;
  }

  // Create discount banner
  const discountBanner = document.createElement("div");
  discountBanner.className = "discount-banner";
  discountBanner.style.cursor = "pointer";
  discountBanner.setAttribute(
    "data-cal-link",
    "deyson/camera-confidence-coaching-50-off",
  );
  discountBanner.setAttribute(
    "data-cal-namespace",
    "camera-confidence-coaching-50-off",
  );
  discountBanner.setAttribute("data-cal-config", '{"layout":"month_view"}');
  discountBanner.innerHTML = `
    <div class="discount-content">
      <div class="discount-badge">50% OFF</div>
      <h3 class="discount-title">Special 50% Off Limited Time Offer!</h3>
      <div class="price-comparison">
        <span class="original-price">$500</span>
        <span class="discounted-price">$250</span>
      </div>
      <button class="discount-cta-button">
        Book Discounted Session - 50% Off
      </button>
      <p class="urgency-text">Limited time offer - Book now to secure your discount!</p>
    </div>
  `;

  // Insert the discount banner
  if (regularButton) {
    // Replace or insert before the regular button
    regularButton.parentNode.insertBefore(discountBanner, regularButton);
    regularButton.style.display = "none"; // Hide regular button
  } else if (ctaSection) {
    // Insert at the beginning of the CTA section
    ctaSection.insertBefore(discountBanner, ctaSection.firstChild);
  }

  // Add the Cal.com script and initialization
  addCalScript();

  // Add smooth reveal animation
  setTimeout(() => {
    discountBanner.classList.add("revealed");
  }, 100);
}

// Function to add Cal.com script for discount booking
function addCalScript() {
  // Check if Cal script is already loaded
  if (window.Cal) {
    // Initialize the discount booking calendar
    window.Cal("init", "camera-confidence-coaching-50-off", {
      origin: "https://app.cal.com",
    });
    window.Cal.ns["camera-confidence-coaching-50-off"]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
    return;
  }

  // Add Cal.com script
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = `
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if(typeof namespace === "string"){
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    Cal("init", "camera-confidence-coaching-50-off", {origin:"https://app.cal.com"});
    Cal.ns["camera-confidence-coaching-50-off"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
  `;

  document.head.appendChild(script);
}
