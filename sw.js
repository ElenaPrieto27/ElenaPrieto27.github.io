const STATIC_CACHE = 'static_1';
const CACHE_DYNAMIC = 'cache_dinamico_v1';
const CAHCE_INMUTABLE = 'cache_inmutable_v1';

const app_shell = ['/index.html','/css/style.css','/images/favicon.icon','/js/app.js','/images/avs/img1.jpg','/js/libs/jquery.js'];

const app_inmutable = ['https://fonts.googleapis.com/css?family=Quicksand:300,400','https://fonts.googleapis.com/css?family=Lato:400,300','https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css','https://code.jquery.com/jquery-3.6.0.min.js'];


//Install
self.addEventListener('install', event => {
    const cacheApp = caches.open(STATIC_CACHE).then(cache => {
        cache.addAll(app_shell);
    });

    const cacheInmutables = cahces.open(CAHCE_INMUTABLE).then( cache => {
        cache.addAll(app_inmutable);
    });

    event.waitUnitil(Promise.all([cacheApp,cacheInmutables]));

});

//Activate
self.addEventListener('activate', event => {
    const respuesta = caches.keys().then(keys =>{
        keys.forEach(key => {
            if(key !== STATIC_CACHE && key.includes('static')){
                return caches.delete(key);
            }
        });
    });
    event.waitUntil(respuesta);
    
});

//Fetch
self.addEventListener('fetch', event => {
    const respuesta = caches.match(event.request).then( res => {
        if(res){return res;}
        else{
            return fetch(e.request).then(newRes => {
                //Agregar en el directorio /js un archivo llamdado sw-acces.js
                //y programar la funcion actualizaCacheDinamico, para tener mas limpio el proyecto.
                return actualizaCacheDinamico(CACHE_DYNAMIC, event.request, newRes);
            });
        }
    });
});

importScripts('js/sw-acces.js')



