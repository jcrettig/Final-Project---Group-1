// API Set Up
// const stroke = "http://127.0.0.1:5000/api/v1.0/stroke_2"
const stroke = "/api/v1.0/stroke_2"

// Stroke Donut Chart
var donutLoadStroke = (donut => {
  d3.json(stroke).then(data => {

    // set stroke value (yes)
    var searchStroke = 1;

    // set heart disease value
    var searchHeart = 1;

    // find length of those that have had strokes
    var strokeLength = data.filter(count => count.stroke === searchStroke).length

    // filter through data to find those with strokes and with heart disease, find length
    var strokeYes = data.filter(yes => yes.stroke === searchStroke && yes.heart_disease === searchHeart).length;

    // calculate and set values for those with and without heart disease (w/ stroke)
    var heartData = [
      {x: "Yes", value: strokeYes},
      {x: "No", value: strokeLength - strokeYes}
    ];

    // create pichart, set data
    chart = anychart.pie(heartData);

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
    label.text("Heart Disease");
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

// Load Stroke Donut Chart
donutLoadStroke()

// No Stroke Donut Chart
var donutLoadNull = (donut => {
  d3.json(stroke).then(data => {

    // set stroke value (no)
    var searchStroke = 0;

    // set heart disease value
    var searchHeart = 1;

    // find length of those that have not had strokes
    var strokeLength = data.filter(count => count.stroke === searchStroke).length

    // filter through data to find those without strokes and with heart disease, find length
    var strokeNo = data.filter(no => no.stroke === searchStroke && no.heart_disease === searchHeart).length;

    // calculate and set values for those with and without heart disease (w/o stroke)
    var heartData = [
      {x: "Yes", value: strokeNo},
      {x: "No", value: strokeLength - strokeNo}
    ];

    // create pie chart, set data
    chart = anychart.pie(heartData);

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
    label.text("Heart Disease");
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

// Load No Stroke Donut Chart 
donutLoadNull()