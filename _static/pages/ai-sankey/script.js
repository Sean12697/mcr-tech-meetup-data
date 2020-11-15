window.addEventListener("load",() => {
    $.getJSON("../../data/aiSankey.json", renderChart);
});

function renderChart(aiSankey) {
  google.charts.load('current', {'packages':['sankey']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'Weight');
        data.addRows(aiSankey);

        // Sets chart options.
        var options = {
          width: window.innerWidth
        };

        // Instantiates and draws our chart, passing in some options.
        var chart = new google.visualization.Sankey(document.getElementById('chart'));
        chart.draw(data, options);
      }
}