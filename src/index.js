import * as d3 from 'd3'
import { displayCover, placePointer, events } from './events'
import { setMap } from './map'
import {  changeColors, changeColorsPop } from './co2'

const progressBar = document.querySelector('.progress-bar')
const yearCont = document.querySelector('.year')
const loadingContainer = document.querySelector('.loading-container')
const infos = document.querySelector('.infos')
const start = document.querySelector('.start')
const end = document.querySelector('.end')
const restart = document.querySelector('.restart')
const ready = document.querySelector('.ready')
const range = document.querySelector('.range')

let minYear = 1750
let maxYear = 2021

let coData = {}

const path = window.location.pathname;




// ########################################### ____ INFOS 
const infosPict = d3.select('.infos')
  .append('svg')
  .attr('width', 30)
  .attr('height', 30)

d3.xml('./ressources/infos.svg').then(
  (data) => {
    infosPict.node().appendChild(data.documentElement)
  }
)

infos.addEventListener('click', function() {
  const inf = "<h2>Our project</h2><p>Our goal is to raise awareness among visitors about the issue of CO2 emissions and to show them that sometimes, by changing their perspective, the data can tell a different story. By providing an interactive map that allows users to explore the evolution of CO2 emissions over time and in different parts of the world, we aim to help people better understand the impact of human activity on the environment. Additionally, we want to encourage users to think critically about the data they are presented with and to consider alternative viewpoints, such as looking at emissions per capita rather than just absolute emissions. By challenging people's assumptions and encouraging them to think more deeply about the issues at hand, we hope to inspire positive change and promote a more sustainable future for all.</p><p>The data we use comes from <a class='small' href='https://github.com/owid/co2-data'>GitHub</a>. It is available in CSV and XLSX formats in the form of one line per location and year. Additionally, they are available in structured JSON format by country with an array of yearly data. Each data object for a country contains several attributes describing various measures of CO2 emissions, population, and land use. Attributes include the year, population, cumulative CO2 emissions for various sources such as coal, gas, and oil, as well as emissions due to land use. The data types are mainly decimal numbers for emissions and population measures, and string types for country names and two-letter ISO codes. The data covers a period from 1750 to 2021 for some countries.</p>"

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
  if (start.dataset.started = "false") {
    start.dataset.started = "true"
  }
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
  range.value = year

  changeColors(year, coData)

  if (events[year]) {
    const event = events[year]
    placePointer(event)
  } 

  // ########################################### ____ REMOVE OLD EVENTS
  const entries = Object.entries(events).filter(([key, value]) => key > (year + 1));

  entries.forEach(entry => {
    console.log(entry[1].id)
    const pointerToRemove = document.getElementById("p-" + entry[1].id);
    const messageToRemove = document.getElementById("ms-" + entry[1].id);
    
    if (pointerToRemove) {
      pointerToRemove.remove();
    }

    if (messageToRemove) {
      messageToRemove.remove();
    }
  });

  // ########################################### ____ END OF SCROLL
  if (year == maxYear) {
    setTimeout(() => {
      end.dataset.notended = "false"
    }, 1000)
  } else {
    end.dataset.notended = "true"
  }
}

// ########################################### ____ INITIALIZE VARS
const main = (data) => {
  coData = data;

  const minAndMax = getMinMax(data)
  minYear = minAndMax.minYear
  maxYear = minAndMax.maxYear

  range.min = minYear
  range.max = maxYear

  if (path == '/new-view.html') {
    yearCont.innerText = maxYear
  }
}

// ########################################### ____ DATA LOADING & LOADER MANAG.
const xhr = new XMLHttpRequest();
xhr.open('GET', './data/countries_data.json', true)

xhr.addEventListener('loadstart', function() {
  loadingContainer.style.display = 'flex'
});

xhr.addEventListener('load', function() {
  setMap(coData, path)
  setTimeout(() => {
    loadingContainer.style.display = 'none'
    if(path == "/new-view.html") {
      changeColorsPop(maxYear, coData);
    }
  }, 3000);
});

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText)
    main(data)
  }
}
xhr.send();


if (path == '/') {
  window.addEventListener('scroll', handleScroll)

  // ########################################### ____ RANGE INPUT
  range.addEventListener('input', function() { 
    const rangeYear = range.value
    const yearPercentage = (rangeYear - minYear) / (maxYear - minYear)
    const totalHeight =  document.body.offsetHeight
    window.scrollTo(0, totalHeight * yearPercentage - window.innerHeight)
  })


  // ########################################### ____ FINAL SECTION BUTTONS
  ready.addEventListener('click', function() {
    window.location.href = 'new-view.html'
  })
} 

restart.addEventListener('click', function() {
  window.location.href = '/'
})