chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "toggleSmallTube") {
        if (request.status) {
            console.log("Enabling SmallTube...");
            const contentPosition = getContentPosition();
            createOverlay();
            let thumbnailSources = new Map();
            collectThumbnails(thumbnailSources, contentPosition);
        } else {
            console.log("Disabling SmallTube...");
            const overlay = document.getElementById('smallTubeOverlay');
            if (overlay) {
                overlay.remove();
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        }
    }
});
