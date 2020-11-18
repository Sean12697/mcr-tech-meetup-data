window.addEventListener("load",() => {
    $.getJSON("../../data/rsvpDist.json", renderChart);
});

function renderChart(rsvpDist) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['People', 'Attendance']
    ].concat(rsvpDist.rsvp_people.map(d => [d.people, d.rsvps])));

    var options = {
      title: 'People Attendance Distribution',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart'));

    chart.draw(data, options);
  }
}