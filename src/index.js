// import {select} from "d3-selection";
// import { xml } from 'd3-fetch';


const progressBar = document.querySelector('.progress-bar')
const yearCont = document.querySelector('.year')
const loadingContainer = document.querySelector('.loading-container')

const xhr = new XMLHttpRequest();
xhr.open('GET', '../owid-co2-data.json', true);
xhr.addEventListener('loadstart', function() {
  loadingContainer.style.display = 'flex'
});

xhr.addEventListener('load', function() {
  loadingContainer.style.display = 'none'
});

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const json = JSON.parse(xhr.responseText);
    console.log(json);
  }
};
xhr.send();





// fetch('../owid-co2-data.json')
//   .then(response => response.json())
//   .then(jsonData => {
//     let minDate = Infinity;
//     let maxDate = -Infinity;
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

const MIN = 1750
const MAX = 2021

const TOT = MAX - MIN


const handleScroll = () => {
  const height = document.body.scrollHeight
  const windowHeight = window.innerHeight
  const position = window.pageYOffset

  const trackLenght = height - windowHeight

  const percentage = Math.floor((position / trackLenght) * 100)
  progressBar.style.width = percentage + '%'

  let year = MIN + TOT * percentage / 100 ;
  yearCont.innerText = Math.floor(year);
}


window.addEventListener('scroll', handleScroll)






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





