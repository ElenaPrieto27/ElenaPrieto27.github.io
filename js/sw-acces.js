//Actualizar el Cache Dinamico
function actualizaCacheDinamico(dynamicCache, request, response){
    if(response.ok){
        //la respuesta tiene data y se debe almacaenar en cache
        caches.open(dynamicCache).then(cache => {
            cache.put(request,response.clone() );
            
        });

        return dynamicCache;
    }else{//si no viene nda en la respuesta
        return response;
    }
}