const botonSiguiente = document.getElementById('btnSiguiente');
const botonAnterior = document.getElementById('btnAnterior');
let pagina = 1;

botonSiguiente.addEventListener('click', ()=>{
    pagina += 1;
    cargarPeliculas();


});


botonAnterior.addEventListener('click', ()=>{
    if(pagina <= 36402){

        pagina -= 1;
        cargarPeliculas();
        
    }

    


});



const cargarPeliculas = async()=>{
    //se coencta a pa API para cargar las peliculas
    //se le paso  el idioma español como parametro en la URL de la API
  try {
    const respuesta =  await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=fcf243062599b41c3af1ed0d55e774e4&language=es-ES&page=${pagina}`);
    console.log(respuesta);
    // convertir la respuesta a JSON para poder trabajarla.
    // COMPROBAR SI LA RESPUESTA ES CORRECTA
    if(respuesta.status === 200){
    
        const data = await respuesta.json();
        console.log(data);

        let peliculas = '';
        data.results.forEach(pelicula => {
         peliculas += `
         <div class="pelicula">
         <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
         <h3 class="titulo">${pelicula.title}</h3>
         <p>Estreno: ${pelicula.release_date}</p>
         <p class="promedio">Puntuación: ${pelicula.vote_average}</p>
         </div>`;
            
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