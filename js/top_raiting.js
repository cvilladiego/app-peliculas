
const btnmenu = document.querySelector('.btn-menu');
const menuitem = document.querySelector('.menu-item');
btnmenu.addEventListener('click', ()=>{
    menuitem.classList.toggle('show');

});


const botonSiguiente = document.getElementById('btnSiguiente2');
const botonAnterior = document.getElementById('btnAnterior2');
let pagina = 1;

botonSiguiente.addEventListener('click', ()=>{
    pagina += 1;
    recomendaciones();


});


botonAnterior.addEventListener('click', ()=>{
    if(pagina <= 36402){

        pagina -= 1;
        recomendaciones();
        
    }

    


});




const  recomendaciones = async()=>{
    try {

       const respuesta = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=fcf243062599b41c3af1ed0d55e774e4&language=es-ES&page=${pagina}`);
       console.log(respuesta);

       if(respuesta.status === 200){
        
       const datos = await respuesta.json();
       console.log(datos);
       let top = '';
       datos.results.forEach(pelicula => {
            console.log(pelicula);
            top += `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"/>

                    <h3 class="titulo">${pelicula.title}</h3>
                    <p>Estreno: ${pelicula.release_date}</p>
                    <p class="promedio">Puntuación: ${pelicula.vote_average}</p>
                    <p class="promedio">Votos: ${pelicula.vote_count}</p>

            </div>
            
            `;
        
       });

       document.getElementById('contenedor').innerHTML = top;

       }else if(respuesta.status === 401){
        console.log('Llave errada');

       }else if(respuesta.status === 404){
        console.log('pelicula no encontrada');

       }else{
        console.log('hubo un error y no sabemos que paso');
       }

        
    } catch (error) {
        console.log(error);
        
    }


}


recomendaciones();