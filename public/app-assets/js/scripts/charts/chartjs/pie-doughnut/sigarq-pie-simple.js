/*=========================================================================================
    File Name: pie.js
    Description: Chartjs pie chart
    ----------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Pie chart
// ------------------------------
$(window).on("load", function(){

    //Get the context of the Chart canvas element we want to select
    var ctx = $("#simple-pie-chart");

    // Chart Options
    var chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration:500,
    };

    // Chart Data
    var chartData = {
        labels: ["Bengo", "Benguela", "Bié","Cabinda","Cuando-Cubango", "Cuanza Norte", "Cuanza Sul","Cunene", "Huambo","Huíla",
                    "Luanda", "Bié", "Malanje", "Luanda", "Lunda Norte", "Lunda Sul", "Malanje", "Moxico", "Namibe", "Uíge", "Zaire"],
        datasets: [{
            label: "My First dataset",
            data: [85, 65, 34, 45, 35, 34, 45, 35, 85, 65, 34, 45, 35, 34, 45, 35, 94, 123],
            backgroundColor: ['#00A5A8', '#626E82', '#FF7D4D','#FF4558', '#28D094', '#00A5A8', '#626E82', '#FF7D4D','#FF4558', '#28D094',
                                '#00A5A8', '#626E82', '#FF7D4D','#FF4558', '#28D094', '#00A5A8', '#626E82', '#FF7D4D','#FF4558'],
        }]
    };

    var config = {
        type: 'pie',

        // Chart Options
        options : chartOptions,

        data : chartData
    };

    // Create the chart
    var pieSimpleChart = new Chart(ctx, config);
});