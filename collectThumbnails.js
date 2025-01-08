function collectThumbnails(thumbnailSources, contentPosition) {
    console.log("Collecting thumbnails...");

    const target = document.querySelector('#contents');
    if (!target) {
        console.log("Target '#contents' not found.");
        return;
    } else {
        console.log("Target '#contents' found.");
    }

    // Force the page to start at the top
    console.log("Scrolling to the top...");
    window.scrollTo(0, 0);

    // Set up MutationObserver to update thumbnails as they load
    const observer = new MutationObserver(() => {
        console.log("MutationObserver triggered");
        updateThumbnailSources(thumbnailSources);
    });

    observer.observe(target, {
        childList: true,
        subtree: true,
    });

    // Scrolling logic
    let scrollCount = 0;
    const maxScrolls = 3; // Number of scrolls
    const waitTime = 3000; // Wait time between scrolls (3 seconds)

    function scrollPage() {
        if (scrollCount >= maxScrolls) {
            console.log(`Finished scrolling ${maxScrolls} times.`);
            observer.disconnect(); // Stop observing after scrolling is complete
            console.log("Final thumbnail count:", thumbnailSources.size);
            populateGrid(thumbnailSources, contentPosition);
            return;
        }

        console.log(`Scrolling... (${scrollCount + 1}/${maxScrolls})`);
        window.scrollBy(0, 1000); // Scroll down the page

        setTimeout(() => {
            console.log("Waiting for thumbnails to load...");
            updateThumbnailSources(thumbnailSources);
            console.log("Current thumbnail count:", thumbnailSources.size);

            scrollCount++;
            scrollPage(); // Recursive call to scroll again
        }, waitTime); // Increased wait time
    }

    scrollPage(); // Start the scrolling process
}

function updateThumbnailSources(thumbnailSources) {
    console.log("Updating thumbnail sources...");

    const videoElements = document.querySelectorAll('ytd-rich-grid-media');
    console.log("Found video elements:", videoElements.length);

    videoElements.forEach(video => {
        const thumbnailImg = video.querySelector('ytd-thumbnail img');
        const titleElement = video.querySelector('#video-title-link');
        const avatarImg = video.querySelector('.yt-spec-avatar-shape--avatar-size-medium img'); // Refined selector
        const channelNameElement = video.querySelector('#metadata #text');

        if (thumbnailImg && thumbnailImg.src && titleElement && channelNameElement) {
            const channelName = channelNameElement.getAttribute('title') || channelNameElement.textContent.trim();

            const videoInfo = {
                thumbnailUrl: thumbnailImg.src,
                title: titleElement.getAttribute('title') || 'Unknown Title',
                videoUrl: 'https://www.youtube.com' + titleElement.getAttribute('href'),
                avatarUrl: avatarImg ? avatarImg.src : 'default-avatar.png',
                channelName: channelName || 'Unknown Channel',
            };

            const videoInfoKey = videoInfo.videoUrl;
            if (!thumbnailSources.has(videoInfoKey)) {
                thumbnailSources.set(videoInfoKey, videoInfo);
                console.log("Added video:", videoInfo);
            }
        } else {
            console.log("Skipped video due to missing data:", {
                thumbnailImg,
                titleElement,
                channelNameElement,
                avatarImg,
            });
        }
    });
}
