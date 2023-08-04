const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html']


const self = this;

// Installation SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened cache')

            return cache.addAll(urlsToCache)
        })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))

    )
});

//if the cacheWhitelist does not include the cacheName then we want to delete the specific
//cacheName, but if it includes the thing that we have in here 
//the whitelist then we wanna keep it. 

//so in our case whenever we update something, we change something. 
//its going to keep only the version 1 which is only what we need. 

//so right there its going to delete all the previous versions and its always 
//going to keep the whitelisted version right there, 
//as you can see if it doesnt include the specific cache name
//otherwise this is going to happen for all other cache names, 
//its going to delete them. 

