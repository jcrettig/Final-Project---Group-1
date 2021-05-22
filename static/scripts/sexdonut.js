// API Set Up
var stroke = "http://127.0.0.1:5000/api/v1.0/stroke_2"

// Stroke Donut Chart
var donutLoadStroke = (donut => {
  d3.json(stroke).then(data => {

    // set stroke value (yes)
    var searchStroke = 1;

    // set sex value
    var searchSex = "Male";

    // find length of those that have had strokes
    var strokeLength = data.filter(count => count.stroke === searchStroke).length

    // filter through data to find those with strokes and there gender, find length
    var strokeYes = data.filter(yes => yes.stroke === searchStroke && yes.gender === searchSex).length;
    
    // calculate and set values for those with and without heart disease (w/ stroke)
    var genderData = [
      {x: "Male", value: strokeYes},
      {x: "Female", value: strokeLength - strokeYes}
    ];

    // create pie chart, set data
    chart = anychart.pie(genderData);

    /* set the inner radius(to turn the pie chart into a doughnut chart)*/
    chart.innerRadius("50%");

    // set the position of labels
    chart.labels().position("outside");

    // configure connectors
    chart.connectorStroke({color: "#595959", thickness: 2, dash:"2 2"});

    // set the container id
    chart.container("plotDonutStroke");

    // create and configure a label
    var label = anychart.standalones.label();
    label.text("Sex");
    label.width("100%");
    label.height("100%");
    label.fontColor("#60727b");
    label.hAlign("center");
    label.vAlign("middle");

    // set the label as the center content
    chart.center().content(label);

    // initiate drawing the chart
    chart.draw();
  })
})

// Load default donut chart 
donutLoadStroke()

// No stroke Donut Chart
var donutLoadNull = (donut => {
  d3.json(stroke).then(data => {

    // set stroke value (yes)
    var searchStroke = 0;

    // set sex value
    var searchSex = "Male";

    // find length of those that have not had strokes
    var strokeLength = data.filter(count => count.stroke === searchStroke).length

    // filter through data to find those without strokes and there gender, find length
    var strokeNo = data.filter(no => no.stroke === searchStroke && no.gender === searchSex).length;
    
    // calculate and set values for those with and without heart disease (w/ stroke)
    var genderData = [
      {x: "Male", value: strokeNo},
      {x: "Female", value: strokeLength - strokeNo}
    ];

    // create pie chart, set data
    chart = anychart.pie(genderData);

    /* set the inner radius(to turn the pie chart into a doughnut chart)*/
    chart.innerRadius("50%");

    // set the position of labels
    chart.labels().position("outside");

    // configure connectors
    chart.connectorStroke({color: "#595959", thickness: 2, dash:"2 2"});

    // set the container id
    chart.container("plotDonutNull");

    // create and configure a label
    var label = anychart.standalones.label();
    label.text("Sex");
    label.width("100%");
    label.height("100%");
    label.fontColor("#60727b");
    label.hAlign("center");
    label.vAlign("middle");

    // set the label as the center content
    chart.center().content(label);

    // initiate drawing the chart
    chart.draw();
  })
})

// Load default donut chart 
donutLoadNull()