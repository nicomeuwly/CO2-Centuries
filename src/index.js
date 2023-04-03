import * as d3 from 'd3'
import { displayCover, placePointer, events } from './events'
import { setMap } from './map'
import {  changeColors } from './co2'

const progressBar = document.querySelector('.progress-bar')
const yearCont = document.querySelector('.year')
const loadingContainer = document.querySelector('.loading-container')
const infos = document.querySelector('.infos')

let minYear = 1750
let maxYear = 2021

let coData = {}



// ########################################### ____ INFOS 
const infosPict = d3.select('.infos')
  .append('svg')
  .attr('width', 30)
  .attr('height', 30)

d3.xml('../ressources/infos.svg').then(
  (data) => {
    infosPict.node().appendChild(data.documentElement)
  }
)

infos.addEventListener('click', function() {
  const inf = "<h2>Our project</h2><p>Notre projet est de créer une carte interactive du monde qui permettra aux utilisateurs de découvrir l'évolution des émissions de CO2 au fil du temps. La carte sera conçue de manière à ce qu'en scrollant à travers les années, les utilisateurs pourront voir comment les émissions ont changé dans différents pays et régions du monde.</p><p>Nous voulons également ajouter des notifications pour les années clés qui signalent des événements importants liés à la pollution et à l'écologie. Ces notifications seront accompagnées d'un marqueur sur la carte pour indiquer l'emplacement géographique de l'événement. Les utilisateurs pourront cliquer sur le marqueur pour avoir plus d'informations (lieu, date, explications).</p><p>À la fin de l'exploration, nous avons prévu d'ajouter un bouton qui permettra aux utilisateurs de visualiser les données d'émission en prenant en compte les émissions par habitant. Cela permettra de changer la perspective de visualisation et d'observer si les tendances varient en fonction de la population d'un pays. Nous souhaitons intégrer cette interaction de manière à susciter la réflexion chez l'utilisateur. Nous envisageons d'ajouter une phrase d'accroche telle que \"Et si on changeait de perspective ?\" ou \"Et si on arrêtait d'être hypocrites ?\". L'idée est d'encourager les utilisateurs à considérer les émissions de CO2 non seulement en termes absolus, mais aussi en fonction de la population. Cette nouvelle perspective pourrait conduire à une prise de conscience plus profonde de l'impact environnemental des modes de vie et de la consommation, ainsi que les inciter à des changements de comportement plus durables.</p><p>Le but du projet est d'aider les utilisateurs à mieux comprendre comment les émissions de CO2 ont évolué au fil du temps et dans différentes parties du monde. Cela peut aider à sensibiliser les gens à l'importance de la réduction des émissions et de la protection de l'environnement.</p>"

  displayCover(inf)
})


// ########################################### ____ MIN AND MAX DATE FOR SCROLL
const getMinMax = (data) => {
  let minYear = Infinity
  let maxYear = -Infinity

  for (const countryName in data) {
    const countryData = data[countryName]
    for (const dataPoint of countryData.data) {
      const year = dataPoint.year
      if (year < minYear) {
        minYear = year
      } if (year > maxYear) {
        maxYear = year
      }
    }
}

  window.scrollTo(0, 0);
  yearCont.innerText = minYear
  return {
    'minYear': minYear,
    'maxYear': maxYear
  }
}
// ########################################### ____ SCROLL MAMAGEMENT
const handleScroll = () => {
  const tot = maxYear - minYear
  const height = document.body.scrollHeight
  const windowHeight = window.innerHeight
  const position = window.pageYOffset

  const trackLenght = height - windowHeight

  const percentage = (position / trackLenght) * 100
  progressBar.style.width = percentage + '%'

  let year = minYear + tot * percentage / 100 
  year = Math.floor(year)
  yearCont.innerText = year

  changeColors(year, coData)
  if (events[year]) {
    const event = events[year]
    placePointer(event)
    // placePointer([event.long, event.lat], event.text)
  } 
}

// ########################################### ____ INITIALIZE VARS
const main = (data) => {
  coData = data;

  const minAndMax = getMinMax(data)
  minYear = minAndMax.minYear
  maxYear = minAndMax.maxYear
}

// ########################################### ____ DATA LOADING & LOADER MANAG.
const xhr = new XMLHttpRequest();
xhr.open('GET', '../data/countries_data.json', true)
xhr.addEventListener('loadstart', function() {
  loadingContainer.style.display = 'flex'
});


xhr.addEventListener('load', function() {
  setMap(coData)
  setTimeout(() => {
    loadingContainer.style.display = 'none'
  }, 3000);
});

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText)
    main(data)
  }
}
xhr.send();

window.addEventListener('scroll', handleScroll)