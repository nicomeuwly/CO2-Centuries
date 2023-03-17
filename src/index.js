// import {select} from "d3-selection";
// import { xml } from 'd3-fetch';


const progressBar = document.querySelector('.progress-bar')
const yearCont = document.querySelector('.year')
const loadingContainer = document.querySelector('.loading-container')

let min = 1750
let max = 2021


const getMinMaxYear = (data) => {
  let minYear = Infinity;
  let maxYear = -Infinity;

  for (const countryName in data) {
    const countryData = data[countryName];
    for (const dataPoint of countryData.data) {
      const year = dataPoint.year;
      if (year < minYear) {
        minYear = year;
      }
      if (year > maxYear) {
        maxYear = year;
      }
    }
  }
  window.scrollTo(0, 0);
  yearCont.innerText = minYear
  return {
    'min': minYear,
    'max': maxYear
  }
}


const handleScroll = () => {
  const tot = max - min
  const height = document.body.scrollHeight
  const windowHeight = window.innerHeight
  const position = window.pageYOffset

  const trackLenght = height - windowHeight

  const percentage = Math.floor((position / trackLenght) * 100)
  progressBar.style.width = percentage + '%'

  let year = min + tot * percentage / 100 ;
  yearCont.innerText = Math.floor(year);
}

const main = (data) => {
  
  const minAndMax = getMinMaxYear(data)
  min = minAndMax.min
  max = minAndMax.max

}



const xhr = new XMLHttpRequest();
xhr.open('GET', '../owid-co2-data.json', true)
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


// fetch('../owid-co2-data.json')
//   .then(response => response.json())
//   .then(jsonData => {
//     
//     for (const countryName in jsonData) {
//       const countryData = jsonData[countryName];
//       for (const dataPoint of countryData.data) {
//         const year = dataPoint.year;
//         if (year < minDate) {
//           minDate = year;
//         }
//         if (year > maxDate) {
//           maxDate = year;
//         }
//       }
//     }
// });

// // Variables pour stocker les dates les plus petites et les plus grandes
// 

// // Parcourir tous les pays et toutes les années pour trouver les dates les plus petites et les plus grandes















// xml("world.svg").then(function(svg) {
//     // Sélectionner le contenu du fichier SVG
//     const importedSVG = document.importNode(svg.documentElement, true);
//     const svgContainer = select("#map");
//     // Remplacer l'élément image par le fichier SVG chargé
//     svgContainer.node().parentNode.replaceChild(importedSVG, svgContainer.node());
//     // Appeler la fonction pour modifier les attributs de l'image
//     // updateSvg();

//     const us = select("#USA");
//     us.attr("fill", "red")
//   });





