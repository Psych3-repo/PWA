const staticcachename = 'static-cache-v1';
const dynamiccachename = 'dynamic-cache-v1';
const assets = [
    '/',
    '/index.html',
    '/scriptJs/dom-to-image.js',
    '/scriptJs/FileSaver.js',
    '/manifest.webmanifest',
    '/scriptJs/myApp.js',
    '/images/icon-192x192.png',
    '/images/icon-256x256.png',
    '/images/icon-384x384.png',
    '/images/icon-512x512.png',
    '/css/style.css',
    '/scriptJs/script.js'
]

self.addEventListener('install', installevt => {
    console.log("install event fired");
    installevt.waitUntil(
        caches.open(staticcachename).then(cache => {
            cache.addAll(assets);
        })
    )
});

self.addEventListener('activate', activateevt => {
    console.log("activate event fired");
    caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== staticcachename && key != dynamiccachename) {
                console.log(key);
                caches.delete(key);
            }
        })

    })
});

// const limitCacheSize = (name, size) => {
//     caches.open(name).then(cache => {
//         cache.keys().then(keys => {
//             if (keys.length > size) {
//                 cache.delete(keys[0]).then(limitCacheSize(name, size));
//             }
//         })
//     })
// }

self.addEventListener('fetch', fetchevt => {
    //console.log(fetchevt);
    fetchevt.respondWith(
        caches.match(fetchevt.request).then(cacheRes => {
            return cacheRes 
            // || fetch(fetchevt.request)
            //     .then(fetchRes => {
            //         caches.open(dynamiccachename).then(cache => {
            //             cache.put(fetchevt.request.url, fetchRes.clone())
            //             limitCacheSize(dynamiccachename, 15);
            //             return fetchRes;
            //         })
            //     })
        })
        // .catch(err => {
        //     if (fetchevt.request.url.indexOf('.html') > -1) {
        //         return caches.match('/pages/fallback.html');
        //     }
        // })
    )
    
})