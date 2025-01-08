function populateGrid(thumbnailSources, contentPosition) {
    console.log("Populating grid with thumbnails:", thumbnailSources.size);

    const overlay = document.getElementById('smallTubeOverlay');
    if (overlay) {
        overlay.innerHTML = ''; 

        const grid = document.createElement('div');
        grid.style.position = 'absolute';
        grid.style.top = `${contentPosition.top}px`;
        grid.style.left = `${contentPosition.left}px`;
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(6, 200px)'; // 6 thumbnails per row
        grid.style.gap = '10px';
        overlay.appendChild(grid);

        thumbnailSources.forEach(videoInfo => {
            const link = document.createElement('a');
            link.href = videoInfo.videoUrl;
            link.target = '_blank'; 
            link.style.textDecoration = 'none';
            link.style.color = 'inherit';

            const itemContainer = document.createElement('div');
            itemContainer.style.display = 'flex';
            itemContainer.style.flexDirection = 'column';
            itemContainer.style.alignItems = 'center';
            itemContainer.style.justifyContent = 'flex-start';

            const thumbnailContainer = document.createElement('div');
            thumbnailContainer.style.width = '200px';
            thumbnailContainer.style.height = '112.5px'; // Maintain 16:9 aspect ratio
            thumbnailContainer.style.position = 'relative';
            thumbnailContainer.style.overflow = 'hidden';
            thumbnailContainer.style.backgroundColor = 'gray'; // Placeholder background

            const img = document.createElement('img');
            img.src = videoInfo.thumbnailUrl;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';

            const titleText = document.createElement('div');
            titleText.style.position = 'absolute';
            titleText.style.top = '0';
            titleText.style.left = '0';
            titleText.style.width = '100%';
            titleText.style.height = '100%';
            titleText.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            titleText.style.display = 'none';

            const textContent = document.createElement('div');
            textContent.textContent = videoInfo.title;
            textContent.style.color = 'white';
            textContent.style.fontWeight = 'bold';
            textContent.style.padding = '5px';
            textContent.style.fontSize = '14px'; 
            textContent.style.textAlign = 'center'; 
            textContent.style.display = 'flex'; 
            textContent.style.flexDirection = 'column';
            textContent.style.justifyContent = 'center'; 
            textContent.style.alignItems = 'center'; 
            textContent.style.width = '100%'; 
            textContent.style.height = '100%'; 

            titleText.appendChild(textContent);

            thumbnailContainer.addEventListener('mouseenter', () => {
                titleText.style.display = 'block';
            });
            thumbnailContainer.addEventListener('mouseleave', () => {
                titleText.style.display = 'none';
            });

            const avatarContainer = document.createElement('div');
            avatarContainer.style.display = 'flex';
            avatarContainer.style.alignItems = 'center';
            avatarContainer.style.marginTop = '5px';

            const avatarImg = document.createElement('img');
            avatarImg.src = videoInfo.avatarUrl;
            avatarImg.style.width = '30px';
            avatarImg.style.height = '30px';
            avatarImg.style.borderRadius = '50%';
            avatarImg.style.marginRight = '10px';

            const channelName = document.createElement('span');
            channelName.textContent = videoInfo.channelName;
            channelName.style.fontSize = '12px';
            channelName.style.color = '#ffffff';

            thumbnailContainer.appendChild(img);
            thumbnailContainer.appendChild(titleText);
            avatarContainer.appendChild(avatarImg);
            avatarContainer.appendChild(channelName);
            itemContainer.appendChild(thumbnailContainer);
            itemContainer.appendChild(avatarContainer);

            link.appendChild(itemContainer);
            grid.appendChild(link);
        });
    }
}
