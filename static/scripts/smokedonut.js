// API Set Up
// const stroke = "http://127.0.0.1:5000/api/v1.0/stroke_1"
const stroke = "/api/v1.0/stroke_1"

// Stroke Donut Chart
var donutLoadStroke = (donut => {
  d3.json(stroke).then(data => {

    // set stroke value (yes)
    var searchStroke = 1;

    // set smokeing value
    var searchSmoke = "smokes";
    var searchFormerlySmoke = "formerly smoked";

    // find length of those that have had strokes
    var strokeLength = data.filter(count => count.stroke === searchStroke).length

    // filter through data to find those with strokes and withsmoke/formerly/never, find length
    var strokeYesSmoke = data.filter(yes => yes.stroke === searchStroke && yes.smoking_status === searchSmoke).length;
    var strokeYesFormerlySmoke = data.filter(yes => yes.stroke === searchStroke && yes.smoking_status === searchFormerlySmoke).length;

    // calculate and set values for those who smoke (w/ stroke)
    var smokingData = [
      {x: "Smokes", value: strokeYesSmoke},
      {x: "Formerly Smokes", value: strokeYesFormerlySmoke},
      {x: "Never Smokes", value: strokeLength - strokeYesSmoke - strokeYesFormerlySmoke}
    ];

    // create pie chart, set data
    chart = anychart.pie(smokingData);

    /* set the inner radius(to turn the pie chart into a doughnut chart)*/
    chart.innerRadius("50%");

    // set the position of labels
    chart.labels().position("outside");

    // configure connectors
    chart.connectorStroke({color: "#595959", thickness: 2, dash:"2 2"});

    // set the container id
    chart.container("plotDonut");

    // create and configure a label
    var label = anychart.standalones.label();
    label.text("Smoking Status");
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

// Stroke Donut Chart
var donutLoadNull = (donut => {
  d3.json(stroke).then(data => {

    // set stroke value (no)
    var searchStroke = 0;

    // set smokeing value
    var searchSmoke = "smokes";
    var searchFormerlySmoke = "formerly smoked";

    // find length of those that have had strokes
    var strokeLength = data.filter(count => count.stroke === searchStroke).length

    // filter through data to find those with strokes and withsmoke/formerly/never, find length
    var strokeNoSmoke = data.filter(no => no.stroke === searchStroke && no.smoking_status === searchSmoke).length;
    var strokeNoFormerlySmoke = data.filter(no => no.stroke === searchStroke && no.smoking_status === searchFormerlySmoke).length;

    // calculate and set values for those who smoke (w/ stroke)
    var smokingData = [
      {x: "Smokes", value: strokeNoSmoke},
      {x: "Formerly Smokes", value: strokeNoFormerlySmoke},
      {x: "Never Smokes", value: strokeLength - strokeNoSmoke - strokeNoFormerlySmoke}
    ];

    // create pie chart, set data
    chart = anychart.pie(smokingData);

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
    label.text("Smoking Status");
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