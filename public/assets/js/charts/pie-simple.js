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
    
    var $provinces = [], $totalValidated = [];

    // Chart Options
    var chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration:500,
    };


    

    // Analitics menu option event handler
    $('#province-stats').on('click', function(){ 
        $('#user-container').addClass('hidden');
        $('#box-row').addClass('hidden');
        $('#box-container').addClass('hidden');
        $('#userStatsContainer').addClass('hidden');
        $('#provinceStatsContainer').removeClass('hidden');

        $('#province-stats-card > canvas').remove();

        $('#province-stats-card').append(`<canvas id='simple-pie-chart' height='600'></canvas>`);
        var ctx = $("#simple-pie-chart");
        
        // $('.chartjs-size-monitor').remove();
        // $("#simple-pie-chart").attr('height','600');
        // $("#simple-pie-chart").css('height','600px');


        // renderPieChart([], [], 'pie-simple-chart').destroy();

        $.ajax({
            type: "GET",
            url: "/get-total-validated",
            contentType: "application/json",
            data: JSON.stringify(),
            dataType: "json",
            async: true,
            cache: false,
            success: function(response) {
                console.log("Total Validated", response);
                if(response.totalValidated != undefined){
                    
                response.totalValidated.map(province => {
                    if(!$provinces.includes(province.Provincia))
                    {
                        $provinces.push(province.Provincia);
                        $totalValidated.push(province.TotalVerificado);
                    }
                });

                console.log($provinces);

                // Chart Data
                var chartData = {
                    labels: $provinces,
                    datasets: [{
                        label: "My First dataset",
                        data: $totalValidated,
                        backgroundColor: ['#00A5A8', '#626E82', '#FF7D4D','#FF4558', '#28D094'],
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
                    
                
                }
        
        
                // $('.provinceBar').on('click', function(element){
        
                //     let provinciaId = element.currentTarget.getAttribute('data-id');
        
                //     // hideDetailsDiv();
        
                //     $('#user-container').addClass('hidden');
                //     $('#box-row').removeClass('hidden');
                //     $('#box-container').addClass('hidden');
        
                // });
        
            },
            error: function (response) {
                console.log(response)
            }
        });
        // Set Main Title
        // $('#statistics-title').text('Estatísticas - Províncias');
        // $('#statistics-title').text('Estatísticas - Caixas');
    });

    $('#user-stats').on('click', function(){ 
        $('#user-container').addClass('hidden');
        $('#box-row').addClass('hidden');
        $('#box-container').addClass('hidden');
        $('#provinceStatsContainer').addClass('hidden');
        $('#userStatsContainer').removeClass('hidden');

        // Set Main Title
        // $('#user-stats-title').text('Estatísticas - Províncias');
    });
});