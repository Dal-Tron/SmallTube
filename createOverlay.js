function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'smallTubeOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100vh'; 
    overlay.style.backgroundColor = '#212121';
    overlay.style.zIndex = '1000';
    overlay.style.overflowY = 'auto';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center'; 
    overlay.style.alignItems = 'center'; 

    const loadingText = document.createElement('div');
    loadingText.textContent = 'Loading...';
    loadingText.style.fontSize = '2rem';
    loadingText.style.color = 'white';

    overlay.appendChild(loadingText);

    if (!document.getElementById('smallTubeOverlay')) {
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden'; // Disable scrolling on the body
        console.log('Overlay created');
    } else {
        console.log('Overlay already exists');
    }
}