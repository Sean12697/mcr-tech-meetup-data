window.addEventListener("load",() => {
    $.getJSON("../../data/mutualRsvps.json", renderChart);
});

function renderChart(mutualRsvps) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Cross-over', 'Instances']
    ].concat(Object.keys(mutualRsvps).map(rsvpCount => {
      return [rsvpCount, mutualRsvps[rsvpCount]]
    }).filter(x => x[0] != "0")));

    var options = {
      title: 'Cross-over Instances',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart'));

    chart.draw(data, options);
  }
}