import * as d3 from 'd3'
import * as topojson from 'topojson-client'

const progressBar = document.querySelector('.progress-bar')
const yearCont = document.querySelector('.year')
const loadingContainer = document.querySelector('.loading-container')
const legBar = document.querySelector('.leg-bar-bar')

let minYear = 1750
let maxYear = 2021

let minCo2 = 0
let maxCo2 = 0

let coData = {}

const generateColor = (per) => {
  const backgroundImage = window.getComputedStyle(legBar).getPropertyValue('background-image')

  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 100
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, 0, 100)
  const colors = backgroundImage.match(/rgba?\([^)]*\)/g)
  for (let i = 0; i < colors.length; i++) {
    const position = i / (colors.length - 1)
    gradient.addColorStop(position, colors[i])
  }

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1, 100)

  const color = ctx.getImageData(0, per, 1, 1).data

  return '#' + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1)
}

const width = window.innerWidth - 150
const height = window.innerHeight - 180

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

const getMinMax = (data) => {
  let minYear = Infinity
  let maxYear = -Infinity

  let minCo2 = Infinity
  let maxCo2 = -Infinity

  for (const countryName in data) {
    const countryData = data[countryName]
    for (const dataPoint of countryData.data) {
      const year = dataPoint.year
      const co2 = dataPoint.co2
      if (year < minYear) {
        minYear = year
      } if (year > maxYear) {
        maxYear = year
      }

      if (co2 < minCo2) {
        minCo2 = co2
      } if (co2 > maxCo2) (
        maxCo2 = co2
      )
    }
}

  window.scrollTo(0, 0);
  yearCont.innerText = minYear
  return {
    'minYear': minYear,
    'maxYear': maxYear,
    'minCo2': minCo2,
    'maxCo2': maxCo2
  }
}

const changeColors = (year) => {
  
  for (const country in coData) {
    if (coData.hasOwnProperty(country)) {
      const dataForCountry = coData[country].data;
      const id = coData[country].id
      
      // Recherche de la donnée correspondant à l'année spécifiée
      const dataForYear = dataForCountry.find(d => d.year === year);
      
      // Ajout de la co2 à l'objet "co2s"
      let value = dataForYear ? dataForYear.co2 : null;
      // console.log(id)
      // if (country == 'China') {
      if (value) {
        let per = value * 100 / maxCo2
        if (per < 15) {
          per += 10
        } else if (per < 24){
          per += 7
        } else if (per < 50) {
          per += 5
        } else if (per < 75) {
          per += 2
        } else if (per >= 100) {
          per = 99
        }
        if (country == 'China') {
          console.log(per)
        }
        let color = generateColor(per);
        // console.log(country + ' ' + value * 100 / maxCo2)
        const count = document.querySelector('.id-' + id)
        if (count) {
          count.style.fill = color
        }
       
      }
      // }
      
    }
  }
  // console.log(co2s)
  // return co2s;
}

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

const main = (data) => {
  coData = data;

  const minAndMax = getMinMax(data)
  console.log(minAndMax)
  minYear = minAndMax.minYear
  maxYear = minAndMax.maxYear

  minCo2 = minAndMax.minCo2
  maxCo2 = minAndMax.maxCo2
}



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