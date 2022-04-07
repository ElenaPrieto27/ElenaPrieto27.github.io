/*
const CACHE_NAME = 'cache_1';
const CACHE_DYNAMIC = 'cache_dinamico_v1';
const CAHCE_INMUTABLE = 'cache_inmutable_v1';

const app_shell = ['/index.html','/css/style.css','/images/favicon.icon','/js/app.js','/images/avs/img1.jpg','/js/libs/jquery.js'];

const app_inmutable = ['https://fonts.googleapis.com/css?family=Quicksand:300,400','https://fonts.googleapis.com/css?family=Lato:400,300','https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css','https://code.jquery.com/jquery-3.6.0.min.js'];

self.addEventListener('install', event => {
    const cacheApp = caches.open(CACHE_NAME).then(cache => {
        cache.addAll(app_shell);
    });

    const cacheInmutables = cahces.open(CAHCE_INMUTABLE).then( cache => {
        cache.addAll(app_inmutable);
    });

    event.waitUnitil(Promise.all([cacheApp,cacheInmutables]));

});

self.addEventListener('activate', event => {
    
})
*/


var url = window.location.href; //obtenemos todo el url
var pwaLocation = 'https://elenaprieto27.github.io/sw.js'; //path donde se encuentra el sw en GitHub

if(navigator.serviceWorker){
    if(url.includes('localhost')){
        pwaLocation = '/sw.js';
    }
navigator.serviceWorker.register(pwaLocation);
}
