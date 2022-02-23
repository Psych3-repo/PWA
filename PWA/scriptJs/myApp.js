if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
    console.log("service worker registered successfully");
}