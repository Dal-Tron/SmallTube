chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.action === "resize") {
            console.log("Received size:", request.size); // Check if this logs

            adjustSize(request.size);
        }
    }
);

function adjustSize(sizeValue) {
    const aspectRatio = 16 / 9;
    
    // Assuming the original thumbnail size is 320x180 (16:9 aspect ratio)
    // Slider at 100 should keep the original size, and at 0, let's say it's 50% of the original size
    var thumbnailWidth = 160 + ((sizeValue / 100) * 160);
    var thumbnailHeight = thumbnailWidth / aspectRatio;

    // Assuming the original text size is 14px
    // Slider at 100 should keep the original size, and at 0, it's 7px
    var textSize = 7 + ((sizeValue / 100) * 7);

    // Apply the new styles
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule(`ytd-thumbnail { width: ${thumbnailWidth}px !important; height: ${thumbnailHeight}px !important; }`);
    style.sheet.insertRule(`#primary { font-size: ${textSize}px !important; }`);
    
    // Adjust these selectors and styles based on actual YouTube elements
}
