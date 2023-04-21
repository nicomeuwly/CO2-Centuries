import * as d3 from 'd3'
import * as topojson from 'topojson-client'

import { getCO2, getCO2Pop } from './co2'

const yearCont = document.querySelector('.year')

// Window width and height without padding and header + footer
const width = window.innerWidth - 150
const height = window.innerHeight - 180

// Vars for export
let projection
let map

const setMap = (coData, filePath) => {
    // Set the svg element
    const svg = d3.select('.map-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'map')

    map = svg

    const projectionMap = d3
        .geoMercator()
        .scale(130)
        .translate([width / 2, height / 1.7])

       
    const path = d3.geoPath(projectionMap)

    projection = projectionMap

    const g = svg.append('g')

    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(
        (data) => {
            const countries = topojson.feature(data, data.objects.countries)
            g.selectAll("path")
            .data(countries.features)
            .enter()
            .append("path")
            .attr("class", (d) => "country id-" + d.id)
            .attr("d", path)
            .on("mouseover", function (event, d) {
                let [x, y] = d3.pointer(event);
                const countryName = d.properties.name;
                let valueCO2 = "No data"
                const dataForCountry = Object.values(coData).find(
                (dat) => dat.id === d.id
                ).data;
                if(filePath == "/"){
                    valueCO2 = getCO2(dataForCountry, parseInt(yearCont.innerText));
                } else {
                    valueCO2 = getCO2Pop(dataForCountry, parseInt(yearCont.innerText)
                    );
                }
                if (!valueCO2) {
                valueCO2 = "No data";
                } else {
                    valueCO2 = +valueCO2.toFixed(3)
                    if(valueCO2>1){
                        filePath == "/"
                          ? (valueCO2 += " Millions tons of CO2")
                          : (valueCO2 += " Tons of CO2 per capita");
                    } else {
                        filePath == "/"
                          ? (valueCO2 += " Million tons of CO2")
                          : (valueCO2 += " Ton of CO2 per capita");
                    }
                }
                
                if(y > 550){
                    y = 550;
                }
                svg.append("rect")
                .attr("x", x)
                .attr("y", y)
                .attr("width", 250)
                .attr("height", 50)
                .attr("id", "box")
                .style("fill", "var(--blue)")

                svg.append("text")
                .attr("x", x + 10)
                .attr("y", y + 20)
                .text(countryName)
                .style("text-anchor", "left")
                .style("font-weight", "bold");

                svg
                  .append("text")
                  .attr("x", x + 10)
                  .attr("y", y + 40)
                  .text(valueCO2)
                  .style("text-anchor", "left");
            })
            .on("mouseout", function () {
                // Supprimer l'onglet
                svg.selectAll("rect").remove();
                svg.selectAll("text").remove();
            });
        }
    );
}

export { setMap, projection, map }