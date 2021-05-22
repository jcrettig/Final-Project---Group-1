// API Set Up
const stroke = "http://127.0.0.1:5000/api/v1.0/stroke_1"

// Stroke Donut Chart
var donutLoadStroke = (donut => {
  d3.json(stroke).then(data => {

    // set stroke value (yes)
    var searchStroke = 1;

    // set employment value
    var searchPrivate = "Private";
    var searchSelfEmployed = "Self-employed";

    // find length of those that have had strokes
    var strokeLength = data.filter(count => count.stroke === searchStroke).length

    // filter through data to find those with strokes and their employment, find length
    var strokeYesPrivate = data.filter(yes => yes.stroke === searchStroke && yes.work_type === searchPrivate).length;
    var strokeYesSelfEmployed = data.filter(yes => yes.stroke === searchStroke && yes.work_type === searchSelfEmployed).length;

    // calculate and set values for type of employment (w/ stroke)
    var employmentData = [
      {x: "Private Employer", value: strokeYesPrivate},
      {x: "Self Employed", value: strokeYesSelfEmployed},
      {x: "Government Job", value: strokeLength - strokeYesPrivate - strokeYesSelfEmployed}
    ];

    // create pie chart, set data
    chart = anychart.pie(employmentData);

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
    label.text("Employment");
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

    // set employment value
    var searchPrivate = "Private";
    var searchSelfEmployed = "Self-employed";

    // find length of those that have had strokes
    var strokeLength = data.filter(count => count.stroke === searchStroke).length

    // filter through data to find those without strokes and their employment, find length
    var strokeYesPrivate = data.filter(no => no.stroke === searchStroke && no.work_type === searchPrivate).length;
    var strokeYesSelfEmployed = data.filter(no => no.stroke === searchStroke && no.work_type === searchSelfEmployed).length;

    // calculate and set values for type of employment (w/o stroke)
    var employmentData = [
      {x: "Private Employer", value: strokeYesPrivate},
      {x: "Self Employed", value: strokeYesSelfEmployed},
      {x: "Government Job", value: strokeLength - strokeYesPrivate - strokeYesSelfEmployed}
    ];

    // create pie chart, set data
    chart = anychart.pie(employmentData);

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
    label.text("Employment");
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