// Configuration and Global Variables for Camera Confidence Coaching

// Default videos for main page
const defaultVideos = {
  video0: {
    id: "1122355487",
    padding: "80.28%",
  },
  video1: {
    id: "1056853912",
    padding: "63.28%",
  },
  video2: {
    id: "1052267805",
    padding: "56.25%",
  },
  video3: {
    id: "847106055",
    padding: "100%",
  },
};

// Global videos object that can be extended per page
let videos = { ...defaultVideos };

// Global array to store all clickable images for navigation
let allImages = [];
let currentImageIndex = 0;

// Function to add more videos (call this in individual pages)
function addVideos(newVideos) {
  videos = { ...videos, ...newVideos };
}

// Function to set videos for a specific page (replaces all videos)
function setVideos(pageVideos) {
  videos = pageVideos;
}
