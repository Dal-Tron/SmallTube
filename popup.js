document.addEventListener('DOMContentLoaded', function () {
    var toggleSmallTube = document.getElementById('toggle-smalltube');
    var thumbnailSlider = document.getElementById('thumbnail-slider');
    var titleSlider = document.getElementById('title-slider');

    if (toggleSmallTube) {
        toggleSmallTube.addEventListener('change', function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "toggleSmallTube", status: toggleSmallTube.checked });
            });
        });
    } else {
        console.error("Element 'toggle-smalltube' not found.");
    }

    if (thumbnailSlider) {
        thumbnailSlider.addEventListener('input', function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "resizeThumbnail", size: thumbnailSlider.value });
            });
        });
    } else {
        console.error("Element 'thumbnail-slider' not found.");
    }

    if (titleSlider) {
        titleSlider.addEventListener('input', function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "resizeTitle", size: titleSlider.value });
            });
        });
    } else {
        console.error("Element 'title-slider' not found.");
    }
});
