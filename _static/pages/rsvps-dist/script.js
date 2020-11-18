window.addEventListener("load",() => {
    $.getJSON("../../data/rsvpDist.json", renderChart);
});

function renderChart(mutualRsvps) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['RSVPs', 'Count']
    ].concat(Object.keys(mutualRsvps.dist).map(rsvpCount => {
      return [rsvpCount, mutualRsvps.dist[rsvpCount]]
    }).filter(x => x[0] != "0")));

    var options = {
      title: 'RSVP Distribution',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart'));

    chart.draw(data, options);
  }
}