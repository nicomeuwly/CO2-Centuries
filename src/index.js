import * as d3 from 'd3'
import * as topojson from 'topojson-client'

const progressBar = document.querySelector('.progress-bar')
const yearCont = document.querySelector('.year')
const loadingContainer = document.querySelector('.loading-container')
const infos = document.querySelector('.infos')
const cover = document.querySelector('.cover')
const close = document.querySelector('.close')
const det = document.querySelector('.det')

let minYear = 1750
let maxYear = 2021

const width = window.innerWidth - 150
const height = window.innerHeight - 180

let coData = {}

const colors = {
  1: '#f8e08a',
  2: '#f5d872',
  3: '#e9ca5c',
  4: '#e4be34',
  5: '#e69635',
  6: '#ca7c1d',
  7: '#bc6d0c',
  8: '#a95353',
  9: '#884343',
  10: '#703838'
}

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


const displayCover = (inf) => {
  cover.dataset.cover = "true"
  det.innerHTML = inf
}

infos.addEventListener('click', function() {
  const inf = "<h2>Our project</h2><p>Notre projet est de créer une carte interactive du monde qui permettra aux utilisateurs de découvrir l'évolution des émissions de CO2 au fil du temps. La carte sera conçue de manière à ce qu'en scrollant à travers les années, les utilisateurs pourront voir comment les émissions ont changé dans différents pays et régions du monde.</p><p>Nous voulons également ajouter des notifications pour les années clés qui signalent des événements importants liés à la pollution et à l'écologie. Ces notifications seront accompagnées d'un marqueur sur la carte pour indiquer l'emplacement géographique de l'événement. Les utilisateurs pourront cliquer sur le marqueur pour avoir plus d'informations (lieu, date, explications).</p><p>À la fin de l'exploration, nous avons prévu d'ajouter un bouton qui permettra aux utilisateurs de visualiser les données d'émission en prenant en compte les émissions par habitant. Cela permettra de changer la perspective de visualisation et d'observer si les tendances varient en fonction de la population d'un pays. Nous souhaitons intégrer cette interaction de manière à susciter la réflexion chez l'utilisateur. Nous envisageons d'ajouter une phrase d'accroche telle que \"Et si on changeait de perspective ?\" ou \"Et si on arrêtait d'être hypocrites ?\". L'idée est d'encourager les utilisateurs à considérer les émissions de CO2 non seulement en termes absolus, mais aussi en fonction de la population. Cette nouvelle perspective pourrait conduire à une prise de conscience plus profonde de l'impact environnemental des modes de vie et de la consommation, ainsi que les inciter à des changements de comportement plus durables.</p><p>Le but du projet est d'aider les utilisateurs à mieux comprendre comment les émissions de CO2 ont évolué au fil du temps et dans différentes parties du monde. Cela peut aider à sensibiliser les gens à l'importance de la réduction des émissions et de la protection de l'environnement.</p>"

  displayCover(inf)
})
cover.addEventListener('click', function(e) {
  if (e.target.classList != 'cover') return
  cover.dataset.cover = "false"
})
close.addEventListener('click', function() {
  // alert('test')
  cover.dataset.cover = "false"
})

// ########################################### ____ MAP 
const svg = d3.select('.map-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const projection = d3
  .geoMercator()
  .scale(130)
  .translate([width / 2, height / 1.7])
const path = d3.geoPath(projection)

const g = svg.append('g')

d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(
  (data) => {
    const countries = topojson.feature(data, data.objects.countries)
    g.selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr(
        'class',
        (d) => 'country id-' + d.id
      )
      .attr('d', path)
  }
);

// ########################################### ____ GET COLOR FROM CO2 
const generateColor = (val) => {
  
  let color

  if (val < 0.25) {
    color = colors[1];
  } else if (val < 0.5) {
    color = colors [2]
  } else if (val < 0.75) {
    color = colors[3]
  } else if (val < 2) {
    color = colors[4]
  } else if (val < 60) {
    color = colors[5]
  } else if (val < 100) {
    color = colors[6]
  } else if (val < 250) {
    color = colors[7]
  } else if (val < 500) {
    color = colors[8]
  } else if (val < 1750) {
    color = colors[9]
  } else {
    color = colors[10]
  }

  return color
}
// ########################################### ____ CHANGE MAP COLOR
const changeColors = (year) => {
  
  for (const country in coData) {
    if (coData.hasOwnProperty(country)) {
      const dataForCountry = coData[country].data;
      const id = coData[country].id
      
      const dataForYear = dataForCountry.find(d => d.year === year);
      
      let value = dataForYear ? dataForYear.co2 : null;
      const count = document.querySelector('.id-' + id)

      let color
      if (value) {
        color = generateColor(value);      
      } else {
        color = '#F4F4F4'
      }
      if (count) {
        count.style.fill = color
      }
    }
  }
}
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

  changeColors(year)

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
xhr.open('GET', '../fichier_updated.json', true)
xhr.addEventListener('loadstart', function() {
  loadingContainer.style.display = 'flex'
});

xhr.addEventListener('load', function() {
  loadingContainer.style.display = 'none'
});

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText)
    main(data)
  }
}
xhr.send();

window.addEventListener('scroll', handleScroll)