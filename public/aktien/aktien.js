let apiKey = "1NPVUKQDTUSJKDS0";

//Create chartjs chart for later use
var ctx = document.getElementById('stockChart').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
      labels: [], //pass labels
      datasets: [{
          label: "",
          borderColor: 'rgb(255, 99, 132)',
          data: []  //pass data
      }]
  },

  // Configuration options go here
  options: {
      responsive: true,
      aspectRatio: 1.5
  }

});

//set logic for company selector
var rad = document.getElementsByName('companyRadio');
var prev = null;
for (var i = 0; i < rad.length; i++) {

  //Add an event listener to every radio option
  rad[i].addEventListener('change', function(change) {

    //If radio selection changes, plot newly selected companies share history
    let company = change.target.attributes.value.nodeValue;
    plotShareHistory(company);

  });

  //Plot initially selected companies share history
  if (rad[i].checked) plotShareHistory(rad[i].attributes.value.nodeValue);

}


function plotShareHistory(company) {

  //Fetch company information from 'alphavantage' API
  var requestOptions = {
  method: 'GET',
  redirect: 'follow'
  };

  fetch("https://www.alphavantage.co/query?apikey=" + apiKey + "&function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=" + company, requestOptions)
    .then(response => response.json())
    .then(result => {

      plotData(company, result);

    })
    .catch(error => {

      console.log(error);
      alert("Die maximale Anzahl an alphavantage API calls wurde überschritten (5 pro Minute, 500 pro Monat). Bitte versuchen sie es später erneut.");

    });

}


function plotData(company, data) {

  let timeSeries = data["Weekly Adjusted Time Series"];

  //Get data-labels for whole history
  let labels = Object.keys(timeSeries).reverse();

  //Get dataset for current day
  let timeSeriesArray = Object.values(timeSeries);
  var data = [];  //close values as data
  for (var i = timeSeriesArray.length - 1; i >= timeSeriesArray.length - labels.length; i--) {  //Only view data of current day
    let str = timeSeriesArray[i]["5. adjusted close"]
    let flt = parseFloat(str);
    data.push(flt);
  }

  //Update chartjs chart
  chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });

  chart.data.labels = labels;
    chart.data.datasets.forEach((dataset) => {
        dataset.label = company;
        dataset.data = data;
    });
    chart.update();

}
