import {select} from "d3-selection";
import { xml } from 'd3-fetch';

xml("world.svg").then(function(svg) {
    // Sélectionner le contenu du fichier SVG
    const importedSVG = document.importNode(svg.documentElement, true);
    const svgContainer = select("#map");
    // Remplacer l'élément image par le fichier SVG chargé
    svgContainer.node().parentNode.replaceChild(importedSVG, svgContainer.node());
    // Appeler la fonction pour modifier les attributs de l'image
    // updateSvg();

    const us = select("#US");
    us.selectAll('path').attr("fill", "red");
  });



