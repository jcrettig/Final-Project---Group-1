// Variable set up
// donut
const stroke = "http://127.0.0.1:5000/api/v1.0/stroke_1"

// var buttonDonut = d3.select("#submitBtnDonut") 
// var plotDonut = d3.select("#plotDonut")

// Change Title Case
function toTitleCase(str) {
  str = str.replace("_", " ")
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Render original charts

// Default Donut Chart
var donutLoad = (defaultDonut => {
  d3.json(stroke).then(data => {

    // set default movie title
    var searchStroke = 'gender';

    // filter through data to find title
    var genderCount = data.filter(sex => sex.gender === searchStroke)
    
    // grab USA and world gross for title, adjust totals
    var genderMale = genderCount[0]['Male']
    var genderFemale = genderCount[0]['Female']
    // var movieWorldAdjust = movieWorld - movieUSA

    var genderData = [
      {x: "Male", value: genderMale},
      {x: "Female", value: genderFemale}
    ]
    // create pie chart, set data
    chart = anychart.pie(genderData);

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
donutLoad()