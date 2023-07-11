const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonTierra = document.getElementById('boton-tierra')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonReiniciar = document.getElementById('boton-reiniciar')


//VARIABLES MASCOTA JUGADOR.
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
//let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const inputHipodoge = document.getElementById('hipodoge')
const inputCapipepo = document.getElementById('capipepo')
const inputRatigueya = document.getElementById('ratigueya')
const spanMascotaJugador = document.getElementById('mascota-jugador')

// VARIABLES MASCOTA ENEMIGA
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

//VARIBLES COMBATE
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

//VARIABLES CREAR MENSAJES
const sectionMensajes = document.getElementById('Resultado')
const ataquesDelJugador = document.getElementById('ataques-del-Jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-Enemigo')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')

//VARIABLES RESULTADO
/*let sectionMensajes = document.getElementById('Resultado')
let botonFuego = document.getElementById('boton-fuego')
let botonAgua = document.getElementById('boton-agua')
let botonTierra = document.getElementById('boton-tierra')
let sectionReiniciar = document.getElementById('reiniciar')*/

let Mokepones = [] 
let ataqueJugador
let ataqueEnemigo
let opcionesDeMokepones
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon{
    constructor(Nombre, Foto, Vidas){
        this.Nombre = Nombre
        this.Foto = Foto
        this.Vidas = Vidas
        this.Ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './Assets/Hipo.jpg', 5)
let capipepo = new Mokepon('Capipepo', './Assets/Cali.jpg', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/Rati.jpg', 5)

hipodoge.Ataques.push(
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},    
)

capipepo.Ataques.push(
    {nombre: '🌱', id:'boton-tierra'}, 
    {nombre: '🌱', id:'boton-tierra'}, 
    {nombre: '🌱', id:'boton-tierra'}, 
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},   
)

ratigueya.Ataques.push(
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'}, 
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🌱', id:'boton-tierra'},  
)

Mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {  
    sectionReiniciar.style.display = 'none'   
    sectionSeleccionarAtaque.style.display = 'none'


    Mokepones.forEach((Mokepon) =>{
        
        opcionesDeMokepones = `
        <input type="radio" name="mascota" id=${Mokepon.Nombre}/>
        <label class="tarjeta-de-mokepon" for=${Mokepon.Nombre}>
            <p>${Mokepon.Nombre}</p>
            <img src=${Mokepon.Foto} alt=${Mokepon.Nombre}>
        </label> 
        `
        contenedorTarjetas.innerHTML += opcionesDeMokepones    
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)    
    botonFuego.addEventListener('click', ataqueFuego)    
    botonAgua.addEventListener('click', ataqueAgua)    
    botonTierra.addEventListener('click', ataqueTierra)    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'
    
    
    sectionSeleccionarAtaque.style.display = 'flex'
    
    
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge'
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya'
    } else {
        alert('Selecciona una mascota')
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1,3)

    if (mascotaAleatoria == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (mascotaAleatoria == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
}

function combate() {
    
    
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste 🏆")
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste 💀')
    }
}

function crearMensaje(Resultado) {
    
    
    let notificacion = document.createElement('p')
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = Resultado
    nuevoAtaqueDelJugador.innerHTML= ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    //let parrafo = document.createElement('p')
    //parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ', las mascota del enemigo atacó con ' + ataqueEnemigo + '- ' + resultado

    //sectionMensajes.appendChild(notificacion)
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
} 

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal
    
    //let parrafo = document.createElement('p')
    //parrafo.innerHTML = resultadoFinal
    //sectionMensajes.appendChild(parrafo)

    
    botonFuego.disabled = true
    
    botonAgua.disabled = true
    
    botonTierra.disabled = true

    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)
