

const btnmenu = document.querySelector('.btn-menu');
const menuitem = document.querySelector('.menu-item');
btnmenu.addEventListener('click', ()=>{
    menuitem.classList.toggle('show');

});


const botonSiguiente = document.getElementById('btnSiguiente3');
const botonAnterior = document.getElementById('btnAnterior3');
let pagina = 1;

botonSiguiente.addEventListener('click', ()=>{
    pagina += 1;
   cargarultimo();


});


botonAnterior.addEventListener('click', ()=>{
    if(pagina <= 143296){

        pagina -= 1;
        cargarultimo();
        
    }

    


});



const cargarultimo = async ()=>{
    try {

       const resultado = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=fcf243062599b41c3af1ed0d55e774e4&language=es-ES&page=${pagina}`);
       console.log(resultado);
       if(resultado.status === 200){
            const datos = await resultado.json();
            console.log(datos);
            let mostrar = '';
    
            datos.results.forEach(tv => {
                console.log(tv.name);
            
                mostrar += `
                <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${tv.poster_path}"/>

                    <h3 class="titulo">${tv.name}</h3>
                    <p>Estreno: ${tv.first_air_date}</p>
                    <p class="promedio">Puntuación: ${tv.vote_average}</p>
                    <p class="promedio">Votos: ${tv.vote_count}</p>

            </div>
                `;
                
              
            });

            document.getElementById('contenedor').innerHTML = mostrar;

       }else if(resultado.status === 401){
        console.log('Llave errada');

       }else if(resultado.status === 404 ){
        console.log('programa de tv no encontrado');

       }else{
        console.log('hubo un error y no sabemos que paso');
       }
        
    } catch (error) {
        console.log(error);
        
    }


}

cargarultimo();