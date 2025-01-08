function getContentPosition() {
    let contentPos;

    const contentDiv = document.getElementById('contents');
    if (contentDiv) {
        const rect = contentDiv.getBoundingClientRect();
        contentPos = { top: rect.top, left: rect.left };
    } else {
        contentPos = { top: 0, left: 0 };
    }

    console.log("Content position:", contentPos);

    return contentPos;
}
