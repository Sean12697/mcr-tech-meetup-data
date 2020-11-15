window.addEventListener("load",() => {
    $.getJSON("../../data/sankeyData.json", renderChart);
});

function renderChart(sankeyData) {
  google.charts.load('current', {'packages':['sankey']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'Weight');
        data.addRows(sankeyData);

        // Sets chart options.
        var options = {
          width: window.innerWidth,
          sankey: {
            link: { color: { stroke: 'black', strokeWidth: 1 } },
          }
        };

        // Instantiates and draws our chart, passing in some options.
        var chart = new google.visualization.Sankey(document.getElementById('chart'));
        chart.draw(data, options);
      }
}