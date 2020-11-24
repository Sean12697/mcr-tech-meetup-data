window.addEventListener("load",() => {
    $.getJSON("../../data/venueUsage.json", renderChart);
});

function renderChart(venueUsage) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(venueUsage);

    var options = {
      title: 'Venue Attendees / Month',
      // curveType: 'function'
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart'));

    chart.draw(data, options);
  }
}