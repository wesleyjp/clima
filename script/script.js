/* 
    0 (não inicializado)
    1 (carregando)
    2 (carregado)
    3 (interativo)
    4 (completo)
*/
const apiKey = "5afbbc845b8905c01cf6672554439047";
const httpRequest = new XMLHttpRequest();
const conteudo = document.getElementById('container');

var cidade = document.getElementById('city');
var temperatura = document.getElementById('temp');
var sensacao = document.getElementById('feels');
var temp_min = document.getElementById('min');
var temp_max = document.getElementById('max');
var nuvens = document.getElementById('clouds');
var humidade = document.getElementById('humidity');
var pressao = document.getElementById('pressure');
var dVento = document.getElementById('windDirection');
var vVento = document.getElementById('windSpeed');
var icone = document.getElementById('icone');
var resposta;
var entrada_cidade;




function buscar() {
  icone.src="img/loading.gif";

  httpRequest.onreadystatechange = proc;
  entrada_cidade = document.getElementById('input_city').value;

  httpRequest.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${entrada_cidade},br&units=metric&lang=pt_br&appid=${apiKey}`, true);
  httpRequest.send();
}

function proc() {
	if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        //document.write(httpRequest.responseText);
        resposta = JSON.parse(httpRequest.responseText);
        showWeather();
      } else {
        document.write(`Erro: There was a problem with the request. <br> Ready: _ ${httpRequest.readyState} <br> Status: _ ${httpRequest.status} <br> Text: ${httpRequest.responseText}`);
      }
    }
  
}

function showWeather () {
	cidade.innerText += resposta.name;
	temperatura.innerText += resposta.main.temp;
	sensacao.innerText += resposta.main.feels_like;
	temp_min.innerText += resposta.main.temp_min;
	temp_max.innerText += resposta.main.temp_max;
	nuvens.innerText += resposta.clouds.all;
	humidade.innerText += resposta.main.humidity;
	pressao.innerText += resposta.main.pressure;
	dVento.innerText += resposta.wind.deg;
	vVento.innerText += resposta.wind.speed;


	icone.src = `https://openweathermap.org/img/wn/${resposta.weather[0].icon}@2x.png`;
  document.getElementById('icon_description').innerText = `${resposta.weather[0].description}`;
	//https://openweathermap.org/img/wn/10d@2x.png
}