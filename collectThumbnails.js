function collectThumbnails(thumbnailSources, contentPosition) {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `ytd-rich-grid-row { height: 10px !important; }`;
    document.head.appendChild(styleTag);

    const interval = setInterval(() => {
        updateThumbnailSources(thumbnailSources);

        if (thumbnailSources.size > 50) {
            clearInterval(interval);
            populateGrid(thumbnailSources, contentPosition);
        }
    }, 4000);
}

function updateThumbnailSources(thumbnailSources) {
    const videoElements = document.querySelectorAll('ytd-rich-grid-media');

    videoElements.forEach(video => {
        const thumbnailImg = video.querySelector('ytd-thumbnail img');
        const titleElement = video.querySelector('#video-title-link');
        const avatarImg = video.querySelector('#avatar-link img');
        const channelNameElement = video.querySelector('#metadata #text');

        if (thumbnailImg && titleElement && avatarImg && channelNameElement) {
            const channelName = channelNameElement.getAttribute('title') || channelNameElement.textContent.trim();

            const videoInfo = {
                thumbnailUrl: thumbnailImg.src,
                title: titleElement.getAttribute('title'),
                videoUrl: 'https://www.youtube.com' + titleElement.getAttribute('href'),
                avatarUrl: avatarImg.src,
                channelName: channelName
            };

            const videoInfoKey = videoInfo.videoUrl;
            if (!thumbnailSources.has(videoInfoKey)) {
                thumbnailSources.set(videoInfoKey, videoInfo);
            }
        }
    });
}