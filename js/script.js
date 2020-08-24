//Api e Fetch


var btn = document.querySelector('#searchBtn')
var latitude = -47.1705, longitude = -11.5727, vetor, horarios = [], horariosConv;
var container = document.querySelector('.container')
var historico = document.querySelector('#lastSearch')
var inicio = document.querySelector('#telaInicial')

var resultadoAtual = document.querySelector('#pesquisaDone')

var tabela = document.querySelector('#pesquisas')

var colors = document.querySelectorAll('.colors')


function addtoTable() {
    if(localStorage.getItem('data') != null){
        horarios = JSON.parse(localStorage.getItem('data'));

        for(i = 0; i < horarios.length; i++){
            //Criar o histórico

                let div = document.createElement("div")

                div.setAttribute("id", "resultado")

                //Definir a latitude e longitude

                let texto = document.createElement('div')
                texto.setAttribute('class', 'textoLatLong')

                //Latitude
                let lat = document.createElement('p')

                lat.setAttribute('id', 'latId')
                //Longitude
                let long = document.createElement('p')
                long.setAttribute('id', 'longId')


                //Criando as horas

                let containerResult = document.createElement('div')
                containerResult.setAttribute('id', 'containerResult')

                    //Adicionando sunrise e sunset

                        //sunrise
                        let sunriseDiv = document.createElement('div')
                        sunriseDiv.setAttribute('id', 'sunRise')
                        sunriseDiv.setAttribute('class', 'lastResult')

                        //sunset
                        let sunsetDiv = document.createElement('div')
                        sunsetDiv.setAttribute('id', 'sunSet')
                        sunsetDiv.setAttribute('class', 'lastResult')

                        //Colocando os ícones
                        
                        let img1 = document.createElement('img')
                        let img2 = document.createElement('img')

                        img1.src = 'resources/icon/sunrise.png'
                        img2.src = 'resources/icon/sunset.png'

                        //Definindo as horas

                            //sunrise
                            let hour1 = document.createElement('p')

                            hour1.innerHTML = horarios[i][0] 

                            //sunset

                            let hour2 = document.createElement('p')

                            hour2.innerHTML = horarios[i][1]

                lat.innerHTML = horarios[i][2].toFixed(3)
                long.innerHTML = horarios[i][3].toFixed(3)

                //Organizar os elementos

                texto.appendChild(lat)
                texto.appendChild(long)
                div.appendChild(texto)

                sunriseDiv.appendChild(img1)
                sunriseDiv.appendChild(hour1)

                sunsetDiv.append(img2)
                sunsetDiv.append(hour2)

                containerResult.appendChild(sunriseDiv)
                containerResult.appendChild(sunsetDiv)

                div.appendChild(containerResult)
                tabela.appendChild(div)

                


            
        }
    }
}

addtoTable()



//Botões

btn.addEventListener('click', ()=> {
    
    fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`)
    .then((Response =>{
        return Response.json()
    }))
    .then((data =>{

        function addZero(n) {
            n = n.toString()
            
            if(n.length == 1){
                n = `0${n}`
                return n;
            }
            else{
                return n
            }
        }

        function addtolocalStorage(x) {
            if(horarios.length < 3){
                horarios.push(x)

                localStorage.setItem('data', JSON.stringify(horarios))
                
                let horariosConv = JSON.parse(localStorage.getItem('data'))
            }
            else{
                alert("Limpe o histórico para continuar adicionando")
            }
            inicio.style.display = "flex"
                container.style.display = "none"
                resultadoAtual.style.display = "flex"
                historico.style.display = "none"
            
        }

        let sunriselocalTime = new Date(data.results.sunrise);
        let sunsetlocalTime = new Date(data.results.sunset)



        let horasSunrise = addZero(sunriselocalTime.getHours())
        let minutosSunrise = addZero(sunriselocalTime.getMinutes())
        let segundosSunrise = addZero(sunriselocalTime.getSeconds())

        var sunriseFinal = `${horasSunrise}:${minutosSunrise}:${segundosSunrise}`

        let horasSunset = addZero(sunsetlocalTime.getHours())
        let minutosSunset = addZero(sunsetlocalTime.getMinutes())
        let segundosSunset = addZero(sunsetlocalTime.getSeconds())

        var sunsetFinal = `${horasSunset}:${minutosSunset}:${segundosSunset}`

        vetor = [sunriseFinal, sunsetFinal, latitude, longitude]

        addtolocalStorage(vetor)
        

        document.querySelector("#sunriseTime").innerHTML = sunriseFinal

        document.querySelector("#sunsetTime").innerHTML = sunsetFinal

        addtoTable()

        
    }),() =>{
        alert("Ocorreu um erro. Tente novamente.")
    })
    .then(() =>{
        resultadoAtual.style.display = "flex"

        
    })

})

historico.addEventListener('click', () =>{
    container.style.display = "none"
    historico.style.display = "none"
    inicio.style.display = "flex"
    tabela.style.display = "flex"
    document.querySelector('#clearBtn').style.display = "inline"

    colors[0].style.backgroundColor = "#423b88"
    colors[1].style.backgroundColor = "#353074"
    colors[2].style.backgroundColor = "#2b275f"
    colors[3].style.backgroundColor = "#150F35"
})

inicio.addEventListener('click', ()=>{
    location.reload()
    
    colors[0].style.backgroundColor = "#EEB934"
    colors[1].style.backgroundColor = "#E7A235"
    colors[2].style.backgroundColor = "#DD7632"
    colors[3].style.backgroundColor = "#5B52AA"
})

document.querySelector('#clearBtn').addEventListener('click', ()=>{
    localStorage.clear()
    horarios = [];
})




//Histórico de buscas








//Mapa

const marker = document.querySelector('#marker')

mapboxgl.accessToken = 'pk.eyJ1IjoiZG96bG8iLCJhIjoiY2tlNG90eHRxMDNjaDJ3b2F3enJlcGVscyJ9.r6-T2QkWbQxG6YAnGU51Mw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dozlo/cke54wpa204ih19qedz60iqwa',
  center: [-47.1705,-11.5727 ],
  zoom: 3
});

map.on('move', function() {

    //Coordenadas

    longitude = Number(map.getCenter().lng)
    latitude = Number(map.getCenter().lat)



    /*console.log(JSON.stringify(e.point) + ' ' + JSON.stringify(e.lngLat.wrap()))
    console.log(map.getCenter())*/

})




