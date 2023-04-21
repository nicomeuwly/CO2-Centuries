import * as d3 from 'd3'
import { projection, map} from './map'

const cover = document.querySelector('.cover')
const close = document.querySelector('.close')
const det = document.querySelector('.det')

let events

// Events data load
d3.json('./data/events.json').then(
    (data) => {
      events = data
    }
)
  
// Pointer path
const positionPict = "M50,12.55c-15.42,0-27.91,12.5-27.91,27.91c0,19.15,19.35,40.44,26.41,46.44c0.87,0.74,2.14,0.74,3.01,0  c7.06-6,26.41-27.29,26.41-46.44C77.91,25.04,65.42,12.55,50,12.55z M50,58.1c-9.27,0-16.78-7.51-16.78-16.78  c0-9.27,7.51-16.78,16.78-16.78s16.78,7.51,16.78,16.78C66.78,50.59,59.27,58.1,50,58.1z"

// Display event details
const displayCover = (inf) => {
    cover.dataset.cover = "true"
    det.scrollTop = 0;
    det.innerHTML = inf
}

// Close from clicking on the cover
cover.addEventListener('click', function(e) {
    if (e.target.classList != 'cover') return
    cover.dataset.cover = "false"
})

// Close from clicking on button
close.addEventListener('click', function() {
    cover.dataset.cover = "false"
})

const placePointer = (event) => {
    // Return if pointer already placed
    if (document.querySelector('#p-' + event.id)) return

    // Change color of old events
    d3.select('.current').attr("class", 'old')
    const coordinates = [event.long, event.lat]
    
    // Add the pointer
    map.append('svg')
        .attr('width', 30)
        .attr('height', 30)
        // Coordinates (corrected -15) because of the 30X30 box
        .attr("x", projection(coordinates)[0]-15) 
        .attr("y", projection(coordinates)[1]-25)
        .attr("id", "p-" + event.id)
        .attr("class", "current")
        // Click on the pointer dunction
        .on("click", function () {
          displayCover(event.text)
        })
        .append('path')
        .attr('d', positionPict)
        .attr("transform", "scale(0.3)")
  
    const messageCont = document.querySelector('.message-cont')
    
    // Insert new alert of the event
    const message = `<div id=ms-${event.id} class="message" data-active="true">
      <h2>${event.title}</h2>
      <p>${event.date}</p>
    </div>`
  
    messageCont.insertAdjacentHTML('afterbegin', message)
    
    // Click event (more details)
    document.querySelector(`#ms-${event.id}`).addEventListener('click', function() {
      displayCover(event.text)
    })
    
    // Alert desapear after 5 sec
    setTimeout(() => {
      document.querySelector(`#ms-${event.id}`).dataset.active = "false"
    }, 5000);
    
  
}

export { displayCover, placePointer, events }