const cargarPeliculas = async()=>{
    //se coencta a pa API para cargar las peliculas
    //se le paso  el idioma español como parametro en la URL de la API
  try {
    const respuesta =  await fetch('https://api.themoviedb.org/3/movie/popular?api_key=fcf243062599b41c3af1ed0d55e774e4&language=es-ES');
    console.log(respuesta);
    // convertir la respuesta a JSON para poder trabajarla.
    // COMPROBAR SI LA RESPUESTA ES CORRECTA
    if(respuesta.status === 200){
    
        const data = await respuesta.json();
        console.log(data);

        let peliculas = '';
        data.results.forEach(pelicula => {
         peliculas = peliculas + `<h1>${pelicula.title}</h1>`;
            
        });

        document.getElementById('contenedor').innerHTML = peliculas;
      
     

    }else if(respuesta.status === 401){
        console.log('llave errada!');


    }else if(respuesta.status === 404){
        console.log('La pelicula que buscas no existe');

    }else{
        console.log('Hubo un error y no sabemos que paso');
    }
  
  } catch (error) {
    console.log(error);    
  }
}


cargarPeliculas();