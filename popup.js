document.addEventListener('DOMContentLoaded', function () {
    var toggleSmallTube = document.getElementById('toggle-smalltube');
    var thumbnailSlider = document.getElementById('thumbnail-slider');
    var titleSlider = document.getElementById('title-slider');

    toggleSmallTube.addEventListener('change', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "toggleSmallTube", status: toggleSmallTube.checked});
        });
    });

    thumbnailSlider.addEventListener('input', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "resizeThumbnail", size: thumbnailSlider.value});
        });
    });

    titleSlider.addEventListener('input', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log('resize title')
            chrome.tabs.sendMessage(tabs[0].id, {action: "resizeTitle", size: titleSlider.value});
        });
    });
});
