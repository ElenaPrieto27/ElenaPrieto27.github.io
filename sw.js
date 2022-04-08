//Archivo sw.js
//Agregar la referencia al archivo js/sw-acceces.js

importScripts('js/sw-acces.js');

//Archivo sw.js
//1. Determinar el contenido de los caches de la PWA
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    //'images/avs/img1.jpg',
    'js/app.js'
];
const APP_SHELL_INMUTABLE = [   
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'js/libs/jquery.js',
    'http://www.croop.cl/UI/twitter/images/carl.jpg',
    'http://www.croop.cl/UI/twitter/images/russel.jpg',
    'http://www.croop.cl/UI/twitter/images/doug.jpg'
];

//Archivo sw.js
//2. Hacer la instalación del sw, cargando los caches.

self.addEventListener('install', event => {
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
         cache.addAll(APP_SHELL);
     });
     const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => {
         cache.addAll(APP_SHELL_INMUTABLE);
     });
     event.waitUntil(Promise.all([cacheStatic,cacheInmutable]));
 });

 //Archivo sw.js
//3. Hacer la activación del sw, eliminando las versiones antiguas de cache.

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

//Archivo sw.js
//3. Hacer la estrategia de cache, este ejemplo un marco referencial, cada equipo determinará 
//la estrategia adecuada para su sitio web, esto conforme a las estrategias trabajadas en clase.

self.addEventListener('fetch', event => {
    const respuesta = caches.match(event.request).then( res => {
        if(res){return res;}
        else{
            return fetch(event.request).then(newRes => {
                //Agregar en el directorio /js un archivo llamdado sw-acces.js
                //y programar la funcion actualizaCacheDinamico, para tener mas limpio el proyecto.
                return actualizaCacheDinamico(DYNAMIC_CACHE, event.request, newRes);
            });
        }
    });

    event.respondWith(respuesta);
});