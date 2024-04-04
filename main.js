chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleSmallTube") {
        if (request.status) {
            const contentPosition = getContentPosition();
            createOverlay();
            let thumbnailSources = new Map();
            collectThumbnails(thumbnailSources, contentPosition);
        } else {
            // Logic to disable SmallTube, if necessary
        }
    }
});
