// Variable set up
// donut
const stroke = "http://127.0.0.1:5000/api/v1.0/stroke_1"

// Render original charts

// Default Donut Chart
var donutLoad = (defaultDonut => {
  d3.json(stroke).then(data => {

    // filter through data to find title
    var smokes = data.smoking_status.filter(smoking => smoking === "smokes").length

    var formerly_smokes = data.smoking_status.filter(smoking => smoking === "formerly smoked").length
    
    var never_smokes = data.smoking_status.filter(smoking => smoking === "never smoked").length

    var smokingData = [
      {x: "Smokes", value: smokes},
      {x: "Formerly Smokes", value: formerly_smokes},
      {x: "Never Smokes", value: never_smokes}
    ]
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
donutLoad()