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

// ########################################### ____ GET CO2 FROM YEAR
const getCO2 = (data, year) => {
    const dataForYear = data.find((d) => d.year === year);
    return dataForYear ? dataForYear.co2 : null;
}

const getCO2Pop = (data, year) => {
  const dataForYear = data.find((d) => d.year === year);
  return dataForYear ? dataForYear.co2 / dataForYear.population * 1000000 : null;
}

// ########################################### ____ GET COLOR FROM CO2 
const generateColor = (val) => {
    let color
  
    if (val < 20) {
      color = colors[1];
    } else if (val < 50) {
      color = colors [2]
    } else if (val < 100) {
      color = colors[3]
    } else if (val < 200) {
      color = colors[4]
    } else if (val < 500) {
      color = colors[5]
    } else if (val < 1000) {
      color = colors[6]
    } else if (val < 2000) {
      color = colors[7]
    } else if (val < 5000) {
      color = colors[8]
    } else if (val < 10000) {
      color = colors[9]
    } else {
      color = colors[10]
    }
  
    return color
}

const generateColorPop = (val) => {
  let color

  if (val < 0.02) {
    color = colors[1];
  } else if (val < 0.05) {
    color = colors [2]
  } else if (val < 0.1) {
    color = colors[3]
  } else if (val < 0.2) {
    color = colors[4]
  } else if (val < 0.5) {
    color = colors[5]
  } else if (val < 1) {
    color = colors[6]
  } else if (val < 2) {
    color = colors[7]
  } else if (val < 5) {
    color = colors[8]
  } else if (val < 10) {
    color = colors[9]
  } else {
    color = colors[10]
  }

  return color
}
// ########################################### ____ CHANGE MAP COLOR
const changeColors = (year, coData) => {
  
  for (const country in coData) {
    if (coData.hasOwnProperty(country)) {
      const dataForCountry = coData[country].data;
      const id = coData[country].id
      
      // const dataForYear = dataForCountry.find(d => d.year === year);
      
      let value = getCO2(dataForCountry, year)
      const count = document.querySelector('.id-' + id)

      let color
      if (value) {
        color = generateColor(value);      
      } else {
        color = '#F4F4F4'
      }
      if (count) {
        count.style.fill = color
        // console.log(value)
      }
    }
  }
}

const changeColorsPop = (year, coData) => {
  for (const country in coData) {
    if (coData.hasOwnProperty(country)) {
      const dataForCountry = coData[country].data
      const id = coData[country].id
      
      let value = getCO2Pop(dataForCountry, year)
      const count = document.querySelector('.id-' + id)

      let color
      if (value) {
        color = generateColorPop(value);    
      } else {
        color = '#F4F4F4'
      }
      if (count) {
        count.style.fill = color
        // console.log(value)  
      }
    }
  }
}

export { getCO2, getCO2Pop, changeColors, changeColorsPop }