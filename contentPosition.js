function getContentPosition() {
    const contentDiv = document.getElementById('contents');
    if (contentDiv) {
        const rect = contentDiv.getBoundingClientRect();
        return { top: rect.top, left: rect.left };
    }
    return { top: 0, left: 0 };
}
