// Main Initialization and Coordination for Camera Confidence Coaching

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Reset menu state first
  resetMenuState();

  // Initialize navigation functionality
  initializeNavigation();

  // Create universal scroll notification
  createScrollNotification();

  // Initialize scroll functionality
  initializeScrollNotification();

  // Load video thumbnails
  loadVideoThumbnails();

  // Small delay to ensure all images are loaded before making them clickable
  setTimeout(() => {
    makeImagesClickable();
  }, 500);

  // Set correct aspect ratio for the main video
  setTimeout(() => {
    setVideoAspectRatio("video0", ".personal-video-container");
  }, 1000);

  // Run discount gate on hourly/booking pages
  if (
    window.location.pathname.includes("/hourly") ||
    document.title.toLowerCase().includes("hourly") ||
    document.querySelector(".hourly-session, .book-session") ||
    window.location.pathname.includes("/book")
  ) {
    initDiscountGate();
  }
});
