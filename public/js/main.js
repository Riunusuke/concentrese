$(document).ready(function () {    
    var height = $(window).height();
    $('#contenedor').height(height);
    $("h1").click(function () {
        $(location).attr('href','/');
    })
});


//Número corresponde a una carta (imagen)
var diccionario = ["img/arandanos.png",
    "img/cereza.png",
    "img/limon.png",
    "img/pera.png",
    "img/pina.png",
    "img/sandia.png",
    "img/berenjena.png",
    "img/uvas.png"]
/*Matriz con el estado de cada casilla en la partida
0 => Escondida
1 => En juego
2 => Fijada (Ya se encontraron las parejas) 
*/
var juego = []
var parejas = []
var  num = 0
switch(cartas){
    case 8:
        juego = [[0, 0, 0, 0],
                [0, 0, 0, 0]];
        parejas = [[0, 0, 0, 0],
                [0, 0, 0, 0]]
        num = 2
        break;
    case 12:
        juego = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
        parejas = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]]
                num = 3
        break;
    case 16:
        juego = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
        parejas = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]]
                
        num = 4
        break;
}


var numeros = [1, 2, 3, 4, 5, 6, 7, 8]

ordenarParejas();
function ordenarParejas() {
    k = 0
    while (k < 2500) {
        numero = numeros[Math.floor(Math.random() * numeros.length)]
        posicion1 = [Math.floor(Math.random() * num), Math.floor(Math.random() * 4)]
        posicion2 = [Math.floor(Math.random() * num), Math.floor(Math.random() * 4)]
        console.log(numero, posicion1, posicion2, numeros, parejas)
        if (parejas[posicion1[0]][posicion1[1]] == 0) {
            console.log(1)
            if (parejas[posicion2[0]][posicion2[1]] == 0) {
                console.log(2)
                if (posicion1[0] != posicion2[0] && posicion1[1] != posicion2[1]) {
                    console.log(3)
                    parejas[posicion1[0]][posicion1[1]] = numero
                    parejas[posicion2[0]][posicion2[1]] = numero
                    numeros.splice(numeros.indexOf(numero), 1)
                }
            }

        }
        ceros = 0
        for (var i = 0; i < num; i++) {
            for (var j = 0; j < 4; j++) {
                if (parejas[i][j] == 0) {
                    ceros++
                }
            }
        }
        console.log('ceros', ceros)
        if (ceros == 0) {
            break
        }
        k++
    }
    if (k >= 2500) {
        location.reload();
    }
}



function getPosicion(obj) {
    posicion = $(obj).attr("id").split("_")  //Obtenemos la posición de la casilla 
    console.log("Posicion obtenida: ", posicion[0], posicion[1])
    return posicion
}

function cambiarImage(posicion) {
    imagen = diccionario[parejas[posicion[0]][posicion[1]] - 1]
    $("#" + posicion[0] + "_" + posicion[1]).attr("src", imagen)
    console.log("Imagen cambiada en ", posicion[0] + "_" + posicion[1], "por", imagen)
}

function cambiarBorder(posicion) {
    estilo = 'border: 5px solid rgb(198, 36, 249);'
    $("#" + posicion[0] + "_" + posicion[1]).attr("style", estilo)
    console.log("Borde cambiada en ", posicion[0] + "_" + posicion[1], "por", imagen)
}

function cambiarDefecto(posicion) {
    imagen = "img/defecto.png"
    $("#" + posicion[0] + "_" + posicion[1]).attr("src", imagen)
    console.log("Imagen cambiada en ", posicion[0] + "_" + posicion[1], "por", imagen)
}

function comprobarImages() {
    cantidad = 0
    for (var i = 0; i < num; i++) {
        for (var j = 0; j < 4; j++) {
            if (juego[i][j] == 2) {
                cambiarImage([i, j])
                cambiarBorder([i, j])
                cantidad++
                if(cantidad == cartas){
                    swal("Felicidades!", "Has terminado", {   
                        buttons: { 
                            catch: {
                                text: "Volver a jugar",
                                value: "catch",
                              },                           
                            Regresar: true,
                          },                     
                      })
                      .then((value) => {
                        switch (value) { 
                          case "catch":
                            location.reload();
                            break;                   
                          default:
                            $(location).attr('href','/');
                        }
                      }, "success");
                      
                }
            } else {
                cambiarDefecto([i, j])
            }
        }
    }
}

var posAnt = [,]
var turno = 0

$(document).ready(function () {
    $("img").click(function () {
        console.log("Turno", turno)
        posicionAct = getPosicion(this)
        console.log("Estado de juego de la casilla:", juego[posicion[0]][posicion[1]])
        if (juego[posicion[0]][posicion[1]] == 0) { //Si la casilla no ha sido jugada se juega  
            cambiarImage(posicionAct)
            juego[posicion[0]][posicion[1]] = 1 //Casilla en juego
            if (turno == 1) { //Si ya se habia pasado un turno se comprueba                                       
                if (juego[posAnt[0]][posAnt[1]] == 1) {
                    if (parejas[posicion[0]][posicion[1]] == parejas[posAnt[0]][posAnt[1]]) {
                        juego[posAnt[0]][posAnt[1]] = 2
                        juego[posicion[0]][posicion[1]] = 2
                        console.log("Fijadas")
                    } else {
                        juego[posAnt[0]][posAnt[1]] = 0
                        juego[posicion[0]][posicion[1]] = 0
                        console.log("Giradas")
                    }
                    turno = 0
                    setTimeout(() => {
                        comprobarImages()
                    }, 250)

                }
            } else {
                turno = 1
                posAnt = posicion
            }
        }
    });
});