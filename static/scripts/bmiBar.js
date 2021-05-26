// API Set Up
var stroke = "/api/v1.0/bmi"

// Stroke Bar Chart
var barLoad = (bar => {
    d3.json(stroke).then(data => {

        // set x axis
        var xAxis = data.bmi

        // set up y axis for those with stroke history
        var yAxisStroke = data.stroke

        // set up y axis for those without stroke history
        var yAxisNull = data.nstroke

        // set data for those with stroke history
        var dataStroke = [
            {
                x: xAxis,
                y: yAxisStroke,
                type: 'bar'
            }
        ];
        
        // set layout (use for both charts)
        var layout = {
            xaxis: {
                title: "BMI Ranges"
            },
            yaxis: {
                title: "Count of Individuals"
            }
        }
        
        // build stroke chart
        Plotly.newPlot('plotBarStroke', dataStroke, layout);

        // set data for those without stroke history
        var dataNull = [
            {
                x: xAxis,
                y: yAxisNull,
                type: 'bar'
            }
        ];
        
        // build null chart
        Plotly.newPlot('plotBarNull', dataNull, layout);

    })
})

// call barLoad function to display charts
barLoad()