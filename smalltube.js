// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleSmallTube") {
        if (request.status) {
            enableSmallTube();
        } else {
            // Logic to disable SmallTube, if necessary
        }
    }
    // Other actions commented out
});

function enableSmallTube() {
    createOverlay();
    let thumbnailSources = new Set();
    collectThumbnails(thumbnailSources);
}

function collectThumbnails(thumbnailSources) {
    // Reduce the height of grid rows to load more thumbnails
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `ytd-rich-grid-row { height: 10px !important; }`;
    document.head.appendChild(styleTag);

    const interval = setInterval(() => {
        const thumbnails = document.querySelectorAll('ytd-thumbnail img');

        let newThumbnailsFound = false;
        thumbnails.forEach(img => {
            if (img.src && !thumbnailSources.has(img.src)) {
                thumbnailSources.add(img.src);
                newThumbnailsFound = true;
            }
        });

        console.log(`Collected ${thumbnailSources.size} thumbnails so far.`);

        if (thumbnailSources.size > 50 || !newThumbnailsFound) {
            clearInterval(interval);
            console.log("Thumbnail collection complete.");
            console.log(Array.from(thumbnailSources));
            // You can call populateGrid here or any other function that needs these thumbnails
        }
    }, 4000);
}

function createOverlay() {
    const primaryDiv = document.getElementById('primary');
    if (primaryDiv) {
        const overlay = document.createElement('div');
        overlay.id = 'smallTubeOverlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        overlay.style.zIndex = '1000';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.fontSize = '2rem';
        overlay.innerText = 'Loading...';

        document.body.appendChild(overlay); // Append to body for full coverage
    }
}

function populateGrid(thumbnailSources) {
    const overlay = document.getElementById('smallTubeOverlay');
    if (overlay) {
        overlay.innerHTML = '';
        // Grid population logic...
    }
}

// Rest of the script...
