//Construimos la clase y sus objetos
class TipoDeObjeto {
	constructor (hogar, bazar, deco){
		this.hogar = hogar;
		this.bazar = bazar;
		this.deco = deco;
	}
}

const hogarObjeto = new TipoDeObjeto (
	{nombre: "Aromatizador de ambientes $" , precio: 600},
	{nombre: "Fragancia hogar $" , precio: 1200},
	{nombre: "Fragancia de Autos $" , precio: 300},
	{nombre: "Escencia para hornillo $" , precio: 2000})

const bazarObjeto = new TipoDeObjeto (
	{nombre: "Mate $" , precio: 2000},
	{nombre: "Mate y accesorios $" , precio: 5000},
	{nombre: "Equipo de mate $" , precio: 1500},
	{nombre: "Kit mate con bolso $" , precio: 7000})

const decoObjeto = new TipoDeObjeto (
	{nombre: "Hornillo buho $" , precio: 15000},
	{nombre: "Estatua pequeña buda $" , precio: 10000},
	{nombre: "Lampara de sal $" , precio: 8000},
	{nombre: "Cascada de humo ceramica $" , precio: 9000})

//Colocamos los datos de los objetos dentro de arrays para facilitar su manipulación en el DOM. De esta
//manera combinamos la facilidad que tienen los objetos para acciones tales como cambiar el precio mediante método
//mientras a su vez mantenemos las funciones del DOM simples, sin tener que manipular propiedades de objeto en ellas
function arrayzador (array, objeto){
	array.push(objeto.hogar.nombre + objeto.hogar.precio)
	array.push(objeto.bazar.nombre + objeto.bazar.precio)
	array.push(objeto.deco.nombre + objeto.deco.precio)
}
const hogar = [] ; arrayzador(hogar, hogarObjeto)
const bazar = [] ; arrayzador(bazar, bazarObjeto)
const deco = [] ; arrayzador(deco, decoObjeto)

let carrito =[]
let precioFinal = 0

//Agregamos las listas de precios al DOM
const divListaPrecios = document.createElement("div")
divListaPrecios.setAttribute("style", "display:flex;justify-content:space-evenly")
document.body.append(divListaPrecios)
function creadorDeCuadros (eleccion){
	let eleccionCuadro = document.createElement("ul")
	eleccionCuadro.setAttribute("style", "border: black 1px solid;padding:20px; list-style:none;")
	for (const item of eleccion){
		eleccionCuadro.innerHTML += `<li style="padding:10px;"><button id="${item}"> ${item}</button></li>`
	}
	divListaPrecios.appendChild(eleccionCuadro)}
creadorDeCuadros(hogar) ; creadorDeCuadros(bazar) ; creadorDeCuadros(deco)

//Agregamos al DOM los div de los elementos inferiores
const divResultados = document.createElement("div")
divResultados.setAttribute("style", "display:flex;justify-content:space-evenly;")
document.body.append(divResultados)

const divCarrito = document.createElement("div")
divCarrito.setAttribute("style", "border: black 1px solid;width:25%;border-radius:20px;"+
"display:flex;justify-content:center;align-items:center")
divResultados.appendChild(divCarrito)

const divBotones = document.createElement("div")
divBotones.setAttribute("style", "border: black 1px solid;padding:20px;width:25%;" +
"border-radius:20px;height:75px;display:flex;flex-direction:column;justify-content:space-between")
divResultados.appendChild(divBotones)

const divPrecioFinal = document.createElement("div")
divPrecioFinal.setAttribute("style", "border: black 1px solid;width:25%;border-radius:20px;"+
"height:100px;display:flex;justify-content:center;align-items:center")
divResultados.appendChild(divPrecioFinal)

//Agregamos un evento a los botones para que reaccionen al click
let listaCarrito = document.createElement("ul")
listaCarrito.setAttribute("style", "list-style:none;")
divCarrito.appendChild(listaCarrito)
function botonera (eleccion) {
	for (const item of eleccion){
		let eventos = document.getElementById(item)
		eventos.addEventListener("click", function(){
			listaCarrito.innerHTML += `<li> ${item}</li>`
			carrito.push(item)
			precioFinal = precioFinal + Number(item.match(/(\d+)/g))
		})
	}
}
botonera(hogar) ; botonera(bazar) ; botonera(deco)

//Agregamos un botón para ordenar de menor a mayor
const sorteador = document.createElement("button")
sorteador.innerHTML = "Presione para ordenar por precio de menor a mayor"
divBotones.appendChild(sorteador)
sorteador.addEventListener("click", function(){
	carrito.sort((a, b) => (Number(a.match(/(\d+)/g)) - Number((b.match(/(\d+)/g)))))
	listaCarrito.remove();
	listaCarrito.innerHTML = carrito.join("</br>")
	divCarrito.appendChild(listaCarrito)
})

//Agregamos un botón para mostrar el precio final
const textoPrecioFinal = document.createElement("h2")
textoPrecioFinal.innerHTML = `El precio final es $${precioFinal}`
divPrecioFinal.appendChild(textoPrecioFinal)
const sumadorPrecioFinal = document.createElement("button")
sumadorPrecioFinal.innerHTML = "Presione para conocer el precio final"
divBotones.appendChild(sumadorPrecioFinal)
sumadorPrecioFinal.addEventListener("click", function(){
	textoPrecioFinal.remove()
	textoPrecioFinal.innerHTML = `El precio final es $${precioFinal}`
	divPrecioFinal.appendChild(textoPrecioFinal)
 })