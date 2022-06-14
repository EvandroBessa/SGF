/*=========================================================================================
    File Name: charts-apexcharts.js
    Description: Apex charts examples.
    ----------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
// custom colors declaration
var $primary = "#A5978B",
  $secondary = "#6B6F82",
  $success = "#1C9066",
  $info = "#1E0FF2",
  $warning = "#FF9149",
  $danger = "#FF4961",

  $luanda = "#EB4525",
  $malanje = "#F20FED",
  $bengo = "#3918DB",
  $cuanzaNorte = "#0FA4F2",
  $cuanzaSul = "#0EE87A",

  $bie = "#F2C230",
  $benguela = "#8C857B",
  $lundaNorte = "#F2B138",
  $lundaSul = "#D9AE79",
  $moxico = "#D911F5",
  $uige = "#1140F5",
  $cunene = "#A212FF",
  $cabinda = "#601CE8",
  $namibe = "#43598B",
  $huambo = "#FF4F64",
  $huila = "#11162A",
  $cuandoCubango = "#C84926",
  $zaire = "#FFBE70"

var $themeColor = [$primary, $success, $warning, $danger, $secondary],
    $sigarqThemeColor = [$luanda, $malanje, $bengo, $cuanzaNorte, $cuanzaSul, $bie, $benguela, $lundaNorte, $lundaSul, $moxico,
                          $uige, $cunene, $cabinda, $namibe, $huambo, $huila, $cuandoCubango, $zaire];


var $labels = [], $totalValidated = [], $totalDigitized = [], $totalDigitizedVerified = [], $monthlyLabels = [], $userMonthlyLabels = [],
              $userProvinceLabels = [];


function generateData(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    //var x =Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push([baseval, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
}


function generateDataHeat(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = 'w' + (i + 1).toString();
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series;
}


function renderPieChart(data = [], totalValidated = [], chartId, $graphTitle = ''){
  var pieSimpleChart = {
    chart: {
      height: 500,
      type: 'pie',
      events: {
        dataPointSelection: function(event, chartContext, config) {
          console.log('event', config);
        }
      }
    },
    colors: $sigarqThemeColor,
    labels: data,
    series: totalValidated,
    responsive: [{
      breakpoint: 1200,
      options: {
        chart: {
          width: 500
        },
        legend: {
          position: 'bottom'
        }
      }
    }, {
      breakpoint: 768,
      options: {
        chart: {
          width: 500
        },
        legend: {
          position: 'right'
        }
      }
    }, {
      breakpoint: 620,
      options: {
        chart: {
          width: 500
        },
        legend: {
          position: 'right'
        }
      }
    }, {
      breakpoint: 480,
      options: {
        chart: {
          width: 500
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    fill: {
      colors: $sigarqThemeColor
    },
    title: {
      text: $graphTitle,
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize:  '25px',
        fontWeight:  'bolder',
        fontFamily:  '"Quicksand", Georgia, "Times New Roman", Times, serif',
        color:  '#263238'
      },
  }
  }

  // Initializing Pie Simple Chart
  var pie_simple_chart = new ApexCharts(
    document.querySelector("#"+chartId),
    pieSimpleChart
  );

  return pie_simple_chart;
}


// Render graph by Province
$('#province-stats').on('click', function(element){

      $('#user-container').addClass('hidden');
      $('#box-row').addClass('hidden');
      $('#box-container').addClass('hidden');
      $('#userStatsContainer').addClass('hidden');
      $('#provinceStatsContainer').removeClass('hidden');
      $('#globalGraphContainer').addClass('hidden');
      $('#monthlyStatsContainer').addClass('hidden');
      $('#monthlyUserStatsContainer').addClass('hidden');
      $('#provinceUserStatsContainer').addClass('hidden');

      const adminDigit = element.currentTarget.getAttribute('admin-dig');


      adminDigit ? getTotalDigitizedByProvince() : getTotalValidatedByProvince();
      // Set Main Title
      // $('#statistics-title').text('Estatísticas - Províncias');
      // $('#statistics-title').text('Estatísticas - Caixas');
});

// Render graph by Users
$('#user-stats').on('click', function(element){
      $('#user-container').addClass('hidden');
      $('#box-row').addClass('hidden');
      $('#box-container').addClass('hidden');
      $('#provinceStatsContainer').addClass('hidden');
      $('#userStatsContainer').removeClass('hidden');
      $('#globalGraphContainer').addClass('hidden');
      $('#monthlyStatsContainer').addClass('hidden');
      $('#monthlyUserStatsContainer').addClass('hidden');
      $('#provinceUserStatsContainer').addClass('hidden');

      const date = $('#date_verified').val();
      const adminDigit = element.currentTarget.getAttribute('admin-dig');

      adminDigit ? renderChartByDateDigitized(date) : renderChartByDateVerified(date);
      // Set Main Title
      // $('#user-stats-title').text('Estatísticas - Províncias');
});

// Render global
$('#global-stats').on('click', function(element){
      $('#user-container').addClass('hidden');
      $('#box-row').addClass('hidden');
      $('#box-container').addClass('hidden');
      $('#provinceStatsContainer').addClass('hidden');
      $('#userStatsContainer').addClass('hidden');
      $('#globalGraphContainer').removeClass('hidden');
      $('#monthlyStatsContainer').addClass('hidden');
      $('#monthlyUserStatsContainer').addClass('hidden');
      $('#provinceUserStatsContainer').addClass('hidden');

      renderChartDigitizedAndVerified();
      // Set Main Title
      // $('#user-stats-title').text('Estatísticas - Províncias');
});

// Render monthly stats
$('#monthly-stats').on('click', function(element){
      $('#user-container').addClass('hidden');
      $('#box-row').addClass('hidden');
      $('#box-container').addClass('hidden');
      $('#provinceStatsContainer').addClass('hidden');
      $('#userStatsContainer').addClass('hidden');
      $('#globalGraphContainer').addClass('hidden');
      $('#monthlyStatsContainer').removeClass('hidden');
      $('#monthlyUserStatsContainer').addClass('hidden');
      $('.yearpicker-container').addClass('hide');
      $('#provinceUserStatsContainer').addClass('hidden');

      const year = $('#year_verified').val();

      renderChartVerifiedDigitizedMonthly(year);
});

$('#monthly-perUser-stats').on('click', function(element){
      $('#user-container').addClass('hidden');
      $('#box-row').addClass('hidden');
      $('#box-container').addClass('hidden');
      $('#provinceStatsContainer').addClass('hidden');
      $('#userStatsContainer').addClass('hidden');
      $('#globalGraphContainer').addClass('hidden');
      $('#monthlyStatsContainer').addClass('hidden');
      $('#monthlyUserStatsContainer').removeClass('hidden');
      $('#provinceUserStatsContainer').addClass('hidden');
      $('.yearpicker-container').addClass('hide');

      const adminDigit = element.currentTarget.getAttribute('admin-dig');
      const date = new Date();
      const year = date.getUTCFullYear();

      adminDigit ? $('#monthly-userStats-title').text('Estatísticas - Documentos Digitalizados Por Utilizador Por Mês') : null;
      //Clear previous option selected on change
      $('#user option:contains("Selecione")').prop('selected', true);
      $('#user_year_verified').val(year);
      // Remove chart
      $('#monthly-userStats-card > div#monthly-userStats-chart').remove();

      // Append chart div
      $('#monthly-userStats-card').append(`<div id='monthly-userStats-chart' style='margin-top:2rem;'></div>`);

});

$('#user_year_verified').on('change', function() {
  const username = $('#user option:selected').text();

  const year = $(this).val();

  renderChartVerifiedDigitizedMonthlyPerUser(year, username);
});

$('#user').on('change', function(element){
  const username = $('#user option:selected').text();

  const year = $('#user_year_verified').val();

  renderChartVerifiedDigitizedMonthlyPerUser(year, username);

});

$('#province-perUser-stats').on('click', function(element){
      $('#user-container').addClass('hidden');
      $('#box-row').addClass('hidden');
      $('#box-container').addClass('hidden');
      $('#provinceStatsContainer').addClass('hidden');
      $('#userStatsContainer').addClass('hidden');
      $('#globalGraphContainer').addClass('hidden');
      $('#monthlyStatsContainer').addClass('hidden');
      $('#monthlyUserStatsContainer').addClass('hidden');
      $('.yearpicker-container').addClass('hide');
      $('#provinceUserStatsContainer').removeClass('hidden');

      const adminDigit = element.currentTarget.getAttribute('admin-dig');
      const date = new Date();
      const year = date.getUTCFullYear();

      adminDigit ? $('#province-userStats-title').text('Estatísticas - Documentos Digitalizados Por Utilizador e Provincia') : null;

      //Clear previous option selected on change
      $('#user-province option:contains("Selecione")').prop('selected', true);
      $('#province_year_verified').val(year);
      // Remove chart
      $('#province-userStats-card > div#province-userStats-chart').remove();

      // Append chart div
      $('#province-userStats-card').append(`<div id='province-userStats-chart' style='margin-top:2rem;'></div>`);

});

$('#province_year_verified').on('change', function() {
  const username = $('#user-province option:selected').text();

  const year = $(this).val();

  renderChartProvinceVerifiedDigitizedPerUser(year, username);
});

$('#user-province').on('change', function(element){
  const username = $('#user-province option:selected').text();

  const year = $('#province_year_verified').val();

  renderChartProvinceVerifiedDigitizedPerUser(year, username);

});

// Filter graph by date verified
$('#date_verified').on('change', function(element){
  const date = $(this).val();
  const adminDigit = element.currentTarget.getAttribute('admin-dig');

  adminDigit ? renderChartByDateDigitized(date) : renderChartByDateVerified(date);
});

 // Filter graph by year verified

 $('#year_verified').on('change', function(element){
  const year = $(this).val();

  const adminDigit = element.currentTarget.getAttribute('admin-dig');

  adminDigit ? $('#monthly-stats-title').text('Estatísticas - Digitalizados Por Mês') : null;

  renderChartVerifiedDigitizedMonthly(year);
})

function getTotalValidatedByProvince(){
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
          //Empty labels
          $labels.length = 0;
          $totalValidated.length = 0;

          response.totalValidated.map(province => {
            if(!$labels.includes(province.Provincia))
              {
                  $labels.push(province.Provincia);
                  $totalValidated.push(province.TotalVerificado);
              }
          });

          // Remove chart
          $('#province-stats-card > div#pie-simple-chart').remove();
          // $('.resize-triggers').remove();

          // Append chart div
          $('#province-stats-card').append(`<div id='pie-simple-chart'></div>`);

          // Render chart
          renderPieChart($labels, $totalValidated, 'pie-simple-chart').render();


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
}

function getTotalDigitizedByProvince(){
  $.ajax({
    type: "GET",
    url: "/get-total-digitized",
    contentType: "application/json",
    data: JSON.stringify(),
    dataType: "json",
    async: true,
    cache: false,
    success: function(response) {
        console.log("Total digitized", response);
        if(response.totalDigitized != undefined){
          //Empty labels
          $labels.length = 0;
          $totalDigitized.length = 0;

          response.totalDigitized.map(province => {
            if(!$labels.includes(province.Provincia))
              {
                  $labels.push(province.Provincia);
                  $totalDigitized.push(province.TotalDigitalizado);
              }
          });

          // Remove chart
          $('#province-stats-card > div#pie-simple-chart').remove();

          // Append chart div
          $('#province-stats-card').append(`<div id='pie-simple-chart'></div>`);

          // Render chart
          renderPieChart($labels, $totalDigitized, 'pie-simple-chart').render();


        }

    },
    error: function (response) {
        console.log(response)
    }
  });
}

// Render chart with database values
function renderChartByDateVerified(date){
  if(date){
      $.ajax({
      type: "GET",
      url: "/get-validated-byDate/"+date,
      contentType: "application/json",
      data: JSON.stringify(),
      dataType: "json",
      async: true,
      cache: false,
      success: function(response) {
          if(response.totalValidated != undefined){

            //Empty labels
            $labels.length = 0;
            $totalValidated.length = 0;

            response.totalValidated.map(user => {

              if(!$labels.includes(user.NomeVerificador))
                {
                    $labels.push(user.NomeVerificador);
                    $totalValidated.push(user.TotalVerificado);
                }
            });

            // Remove chart
            $('#user-stats-card > div#user-stats-chart').remove();
            // $('.resize-triggers').remove();

            // Append chart div
            $('#user-stats-card').append(`<div id='user-stats-chart' style='margin-top:2rem;'></div>`);

            // Render chart
            renderPieChart($labels, $totalValidated, 'user-stats-chart', '').render();


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
  }
}

// Render chart with database values
function renderChartVerifiedDigitizedMonthly(year){
  if(year){
      $.ajax({
      type: "GET",
      url: "/get-monthly-statistics/"+year,
      contentType: "application/json",
      data: JSON.stringify(),
      dataType: "json",
      async: true,
      cache: false,
      success: function(response) {

          if(response.totalValidated != undefined){

            //Empty labels
            $monthlyLabels.length = 0;
            $totalValidated.length = 0;

            response.totalValidated.map(data => {

              if(!$monthlyLabels.includes(data.mes))
                {
                    $monthlyLabels.push(data.mes);
                    $totalValidated.push(data.total);
                }
            });

            // Remove chart
            $('#monthly-stats-card > div#monthly-stats-chart').remove();
            // $('.resize-triggers').remove();

            // Append chart div
            $('#monthly-stats-card').append(`<div id='monthly-stats-chart' style='margin-top:2rem;'></div>`);

            // Render chart
            renderPieChart($monthlyLabels, $totalValidated, 'monthly-stats-chart', '').render();


          } else {
            $monthlyLabels.length = 0;
            $totalValidated.length = 0;

            $monthlyLabels.push(response.error)
            // Render chart
            renderPieChart($monthlyLabels, $totalValidated, 'monthly-stats-chart', '').render();
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
  }
}

function renderChartVerifiedDigitizedMonthlyPerUser(year, username){

  if(year && username.indexOf('Selecione o Utilizador') === -1){
      $.ajax({
      type: "GET",
      url: "/get-monthly-stats-perUser/"+year+"/"+username,
      contentType: "application/json",
      data: JSON.stringify(),
      dataType: "json",
      async: true,
      cache: false,
      success: function(response) {

          if(response.totalValidated != undefined){

            //Empty labels
            $userMonthlyLabels.length = 0;
            $totalValidated.length = 0;

            response.totalValidated.map(data => {

              if(!$userMonthlyLabels.includes(data.mes))
                {
                    $userMonthlyLabels.push(data.mes);
                    $totalValidated.push(data.total);
                }
            });

            // Remove chart
            $('#monthly-userStats-card > div#monthly-userStats-chart').remove();

            // Append chart div
            $('#monthly-userStats-card').append(`<div id='monthly-userStats-chart' style='margin-top:2rem;'></div>`);

            // Render chart
            renderPieChart($userMonthlyLabels, $totalValidated, 'monthly-userStats-chart', '').render();


          } else {

            $userMonthlyLabels.length = 0;
            $totalValidated.length = 0;

            $userMonthlyLabels.push(response.error);

            // Remove chart
            $('#monthly-userStats-card > div#monthly-userStats-chart').remove();

            // Append chart div
            $('#monthly-userStats-card').append(`<div id='monthly-userStats-chart' style='margin-top:2rem;'></div>`);

            // Render chart
            renderPieChart($userMonthlyLabels, $totalValidated, 'monthly-userStats-chart', '').render();
          }

      },
      error: function (response) {
          console.log(response)
      }
    });
  }
}

function renderChartProvinceVerifiedDigitizedPerUser(year, username){

  if(year && username.indexOf('Selecione o Utilizador') === -1){
      $.ajax({
      type: "GET",
      url: "/get-province-stats-perUser/"+year+"/"+username,
      contentType: "application/json",
      data: JSON.stringify(),
      dataType: "json",
      async: true,
      cache: false,
      success: function(response) {

          if(response.totalValidated != undefined){

            //Empty labels
            $userProvinceLabels.length = 0;
            $totalValidated.length = 0;

            response.totalValidated.map(data => {

              if(!$userProvinceLabels.includes(data.provincia))
                {
                    $userProvinceLabels.push(data.provincia);
                    $totalValidated.push(data.total);
                }
            });

            // Remove chart
            $('#province-userStats-card > div#province-userStats-chart').remove();

            // Append chart div
            $('#province-userStats-card').append(`<div id='province-userStats-chart' style='margin-top:2rem;'></div>`);

            // Render chart
            renderPieChart($userProvinceLabels, $totalValidated, 'province-userStats-chart', '').render();


          } else {

            $userProvinceLabels.length = 0;
            $totalValidated.length = 0;

            $userProvinceLabels.push(response.error);

            // Remove chart
            $('#province-userStats-card > div#province-userStats-chart').remove();

            // Append chart div
            $('#province-userStats-card').append(`<div id='province-userStats-chart' style='margin-top:2rem;'></div>`);

            // Render chart
            renderPieChart($userProvinceLabels, $totalValidated, 'province-userStats-chart', '').render();
          }

      },
      error: function (response) {
          console.log(response)
      }
    });
  }
}

function renderChartByDateDigitized(date){
  if(date){
      $.ajax({
      type: "GET",
      url: "/get-digitized-byDate/"+date,
      contentType: "application/json",
      data: JSON.stringify(),
      dataType: "json",
      async: true,
      cache: false,
      success: function(response) {
        console.log(response.totalDigitized);
          if(response.totalDigitized != undefined){

            //Empty labels
            $labels.length = 0;
            $totalDigitized.length = 0;

            response.totalDigitized.map(user => {

              if(!$labels.includes(user.NomeDigitalizador))
                {
                    $labels.push(user.NomeDigitalizador);
                    $totalDigitized.push(user.TotalDigitalizado);
                }
            });

            // Remove chart
            $('#user-stats-card > div#user-stats-chart').remove();
            // $('.resize-triggers').remove();

            // Append chart div
            $('#user-stats-card').append(`<div id='user-stats-chart'></div>`);

            // Render chart
            renderPieChart($labels, $totalDigitized, 'user-stats-chart').render();


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
  }
}

function renderChartDigitizedAndVerified(){
      $.ajax({
      type: "GET",
      url: "/get-digitized-verified",
      contentType: "application/json",
      data: JSON.stringify(),
      dataType: "json",
      async: true,
      cache: false,
      success: function(response) {

        console.log("RESPONSE:", response);

          if(response.totalDigitizedVerified != undefined){

            //Empty labels
            $labels.length = 0;
            $totalDigitizedVerified.length = 0;

            response.totalDigitizedVerified.map(totalVerifiedDigitized => {

              if(!$labels.includes(totalVerifiedDigitized.Designacao))
                {
                    $labels.push(totalVerifiedDigitized.Designacao);
                    $totalDigitizedVerified.push(totalVerifiedDigitized.total);
                }
            });

            // Remove chart
            $('#global-stats-card > div#global-stats-chart').remove();
            // $('.resize-triggers').remove();

            // Append chart div
            $('#global-stats-card').append(`<div id='global-stats-chart'></div>`);

            // Render chart
            renderPieChart($labels, $totalDigitizedVerified, 'global-stats-chart').render();


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
}

// Set year calender position on focus
$('#year_verified').on('focus', () => {
  $('.yearpicker-container').removeClass('hide');
  $('.yearpicker-container').css('top', '17%').css('left', '12.5%')
});

$('#user_year_verified').on('focus', () => {
  $('.yearpicker-container').removeClass('hide');
  $('.yearpicker-container').css('top', '20%').css('left', '21%')
});

$('#province_year_verified').on('focus', () => {
  $('.yearpicker-container').removeClass('hide');
  $('.yearpicker-container').css('top', '20%').css('left', '21%')
});

// Set filter date input to current date
$(window).on('load', function(){
  const date = new Date();
  const dayLength = date.getUTCDate().toString().length;
  const monthLength = date.getUTCMonth().toString().length;
  const dayFormat = dayLength > 1 ? ("-" + date.getUTCDate()) : ("-0" + date.getUTCDate());
  const monthFormat = monthLength > 1 ? ('-' + (date.getUTCMonth() + 1)) : ('-0' + (date.getUTCMonth() + 1));
  const year = date.getUTCFullYear();

  const formatedDate = year + monthFormat + dayFormat;
  $('#date_verified').val(formatedDate);
  $('#date_verified').trigger('change');

  // Initialize Year picker
  $('.yearpicker').yearpicker();
  $('#year_verified').val(year);
  $('#year_verified').trigger('change');

  $('#user_year_verified').val(year);

});

