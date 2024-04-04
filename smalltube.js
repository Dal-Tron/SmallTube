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
    const contentPosition = getContentPosition();
    createOverlay();
    let thumbnailSources = new Map();
    collectThumbnails(thumbnailSources, contentPosition);
}

function getContentPosition() {
    const contentDiv = document.getElementById('contents');
    if (contentDiv) {
        const rect = contentDiv.getBoundingClientRect();
        return { top: rect.top, left: rect.left };
    }
    return { top: 0, left: 0 };
}

function collectThumbnails(thumbnailSources, contentPosition) {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `ytd-rich-grid-row { height: 10px !important; }`;
    document.head.appendChild(styleTag);

    const interval = setInterval(() => {
        updateThumbnailSources(thumbnailSources);

        if (thumbnailSources.size > 50) {
            clearInterval(interval);
            console.log("Thumbnail collection complete.");
            console.log(Array.from(thumbnailSources.values()));
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




function populateGrid(thumbnailSources, contentPosition) {
    const overlay = document.getElementById('smallTubeOverlay');
    if (overlay) {
        overlay.innerHTML = ''; // Clear the loading text

        const grid = document.createElement('div');
        grid.style.position = 'absolute';
        grid.style.top = `${contentPosition.top}px`;
        grid.style.left = `${contentPosition.left}px`;
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(6, 200px)';
        grid.style.gridGap = '10px';
        overlay.appendChild(grid);

        thumbnailSources.forEach(videoInfo => {
            const link = document.createElement('a');
            link.href = videoInfo.videoUrl;
            link.style.textDecoration = 'none'; // Optional: remove text decoration
            link.style.color = 'inherit'; // Optional: inherit text color

            const itemContainer = document.createElement('div');
            itemContainer.style.display = 'flex';
            itemContainer.style.flexDirection = 'column';
            itemContainer.style.alignItems = 'center';
            itemContainer.style.justifyContent = 'flex-start';

            const thumbnailContainer = document.createElement('div');
            thumbnailContainer.style.width = '200px';
            thumbnailContainer.style.height = '112.5px'; // 16:9 aspect ratio
            thumbnailContainer.style.position = 'relative';
            thumbnailContainer.style.overflow = 'hidden';

            const img = document.createElement('img');
            img.src = videoInfo.thumbnailUrl;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';

            const avatarContainer = document.createElement('div');
            avatarContainer.style.display = 'flex';
            avatarContainer.style.alignItems = 'center';
            avatarContainer.style.marginTop = '5px';

            const avatarImg = document.createElement('img');
            avatarImg.src = videoInfo.avatarUrl;
            avatarImg.style.width = '30px';
            avatarImg.style.height = '30px';
            avatarImg.style.borderRadius = '50%';
            avatarImg.style.marginRight = '5px';

            const channelName = document.createElement('span');
            channelName.textContent = videoInfo.channelName;
            channelName.style.fontSize = '12px';

            thumbnailContainer.appendChild(img);
            avatarContainer.appendChild(avatarImg);
            avatarContainer.appendChild(channelName);

            itemContainer.appendChild(thumbnailContainer);
            itemContainer.appendChild(avatarContainer);

            link.appendChild(itemContainer);
            grid.appendChild(link);
        });
    }
}




function createOverlay() {
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

        if (!document.getElementById('smallTubeOverlay')) {
            document.body.appendChild(overlay);
            console.log('Overlay created');
        } else {
            console.log('Overlay already exists');
        }
    }