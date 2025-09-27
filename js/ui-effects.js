// UI Effects and Interactions for Camera Confidence Coaching

// Function to create scroll notification if it doesn't exist
function createScrollNotification() {
  // Check if scroll notification already exists
  if (document.getElementById("scrollNotification")) {
    return;
  }

  // Create the scroll notification element
  const scrollNotification = document.createElement("div");
  scrollNotification.id = "scrollNotification";
  scrollNotification.className = "scroll-notification";
  scrollNotification.onclick = scrollToContent;

  // Simple universal text for all pages
  const notificationText = "Scroll to learn more";

  scrollNotification.innerHTML = `
    ${notificationText}
    <span class="scroll-arrow">⬇</span>
  `;

  // Add to page
  document.body.appendChild(scrollNotification);
}

// Universal scroll to content function
function scrollToContent() {
  // Try to find the first meaningful content section
  const targetSelectors = [
    ".story-section",
    ".section",
    ".service-card",
    ".testimonials-grid",
    ".benefits-grid",
    "main section:first-of-type",
    ".container section:first-of-type",
    ".qualification-section",
    ".about-section",
  ];

  let target = null;

  for (const selector of targetSelectors) {
    target = document.querySelector(selector);
    if (target) break;
  }

  // Fallback: scroll down by viewport height minus nav
  if (!target) {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: "smooth",
    });
  } else {
    // Get the target position and adjust for fixed navigation
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset;
    const navHeight = 80; // Account for fixed navigation
    const offset = 20; // Add some breathing room

    window.scrollTo({
      top: targetPosition - navHeight - offset,
      behavior: "smooth",
    });
  }
}

// Universal scroll notification hide/show functionality
function initializeScrollNotification() {
  let scrollTimeout;

  window.addEventListener("scroll", function () {
    const notification = document.getElementById("scrollNotification");
    if (!notification) return;

    const scrollY = window.scrollY;

    // Hide notification after user scrolls 100px
    if (scrollY > 100) {
      notification.classList.add("hidden");
    }

    // Clear any existing timeout
    clearTimeout(scrollTimeout);

    // Set timeout to show notification again if user stops scrolling at top
    scrollTimeout = setTimeout(() => {
      if (scrollY <= 100) {
        notification.classList.remove("hidden");
      }
    }, 2000);
  });

  // Auto-hide notification after 8 seconds
  setTimeout(() => {
    const notification = document.getElementById("scrollNotification");
    if (notification && window.scrollY <= 100) {
      notification.style.animation = "fadeInDown 0.6s ease-out reverse";
      setTimeout(() => {
        notification.classList.add("hidden");
      }, 600);
    }
  }, 8000);
}

// Enhanced function to make images clickable with navigation support
function makeImagesClickable() {
  // Clear the array first
  allImages = [];

  // Get all images that should be clickable
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    // Skip small images, logos, and thumbnails
    const isClickableImage =
      img.closest(".story-section") ||
      img.closest(".section") ||
      img.closest(".hero-content");

    // Don't make video thumbnails clickable
    const isVideoThumbnail = img.closest(".video-thumbnail");

    // Don't make logo clickable
    const isLogo =
      img.closest(".logo-initials") ||
      img.classList.contains("logo") ||
      img.closest(".nav-logo");

    if (isClickableImage && !isVideoThumbnail && !isLogo) {
      // Add to our navigation array
      allImages.push({
        element: img,
        src: img.src,
        alt: img.alt,
      });

      // Add clickable class for styling
      img.classList.add("clickable-image");

      // Add click handler with navigation support
      img.addEventListener("click", function (e) {
        // Prevent any potential bubbling
        e.stopPropagation();

        // Find the index of this image in our array
        const imageIndex = allImages.findIndex((item) => item.element === this);

        // Quick scale down animation before opening lightbox
        this.style.transform = "scale(0.95)";

        setTimeout(() => {
          this.style.transform = "";
          openImageLightbox(this.src, this.alt, imageIndex);
        }, 100);
      });

      // Enhanced hover effects
      img.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.02)";
      });

      img.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
      });
    }
  });
}
