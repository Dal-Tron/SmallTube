document.addEventListener('DOMContentLoaded', function () {
    var slider = document.getElementById('size-slider');
    slider.addEventListener('input', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            // Ensure we're sending to the correct tab
            chrome.tabs.sendMessage(tabs[0].id, {action: "resize", size: slider.value});
        });
    });
});