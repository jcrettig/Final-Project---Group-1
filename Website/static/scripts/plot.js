// Variable set up
// Scatter plot 
const stroke = "http://127.0.0.1:5000/api/v1.0/stroke_1"

var buttonPlot = d3.select("#submitBtn")  

// Change Title Case
function toTitleCase(str) {
  str = str.replace("_", " ")
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Render original charts

// Default Scatter
var scatterLoad = (defaultScatter => { 
	d3.json(stroke).then(data => {
    var xAxis = data.age
    var yAxis = data.avg_glucose_level

    var title = data.id

    var xTitle = `Age`
    var yTitle =  `Average Glucose Level`
    var chartTitle = `Scatter Comparison: ${xTitle} vs. ${yTitle}`
  
    var trace1 = {
      mode: "markers", 
      type: "scatter",
      x: xAxis,
      y: yAxis,
      text: title
    }
  
    var chartdata = [trace1]
  
    var layout = {
      title: {
        text: chartTitle
      },
      xaxis: { title: xTitle },
      yaxis: { title: yTitle }
    }

    Plotly.newPlot("plot", chartdata, layout)
  })
});

// Load original scatter plot
scatterLoad()

// Build Scatter Plot
function buildPlot() {
  d3.json(stroke).then(function(data) {

  var inputValue_x = d3.select("#x-selector-dropdown")
  var inputValue_y = d3.select("#y-selector-dropdown")

  var searchValue_x = inputValue_x.property("value")
  var searchValue_y = inputValue_y.property("value")
  

  var title = data.id

  var xTitle = toTitleCase(searchValue_x)
  var yTitle = toTitleCase(searchValue_y)
  var chartTitle = `Scatter Comparison: ${xTitle} vs. ${yTitle}`

    var trace1 = {
      mode: "markers", 
      type: "scatter",
      x: data[searchValue_x],
      y: data[searchValue_y],
      text: title
    }
  
    var chartdata = [trace1]
  
    var layout = {
      title: {
        text: chartTitle
      },
      xaxis: { title: xTitle },
      yaxis: { title: yTitle }
    }
    Plotly.newPlot("plot", chartdata, layout)
  })
}

// create event listener
buttonPlot.on("click", buildPlot)  

