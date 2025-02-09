// Endpoint for data
var apiKey = "wJwp9NFb-QWNy3d1f9_w";
// var ticker = "AAPL"
// var value = 1000;
var start_date_app = '2005-01-01'
var gold_url_app = `https://www.quandl.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_app}&order=asc`

var ferd_url = `https://www.quandl.com/api/v3/datasets/FED/RIFSPFF_N_D.json?api_key=KqktrbxvFdVxc81KAHb6&order=asc`
var BTC_url = `https://www.quandl.com/data.json?api_key=wJwp9NFb-QWNy3d1f9_w/CUR/CAD&order=asc`
var app_gold = "/gold_returns"
var app_ticker = "/ticker_returns"
// Initialise the web page with county1 and county 2 default comparisons
function Initialize_price() {
  var value = 1000;
  var ticker = "AAPL"
  var inv_startdate = `2019-10-19`
  var  inv_enddate = `2020-02-05`
  prices33(ticker)
  //gold(ticker, inv_startdate, inv_enddate, value)
  decline(ticker, inv_startdate, inv_enddate, value)
  //volatility(ticker)
  //console.log(`Initialise is running`)
};
Initialize_price();


function prices33(ticker){
  //console.log(`app_prices start_date:${start_date}`)
  var ticker_url_app = `https://www.quandl.com/api/v3/datasets/EOD/${ticker}/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_app}&order=asc`
  //console.log(`app_prices start_date:${gold_url_app}`)
  d3.json(gold_url_app).then(function (data_gold) {

    /*===============================
           GOLD 
     ===============================*/

    // Grab values from the data json object to build the plots
    var name = `London Bullion Market Association <hl> Closing Gold Price `;
    var stock = 'Closing Gold Price';
    var startDate = data_gold.dataset_data.start_date;
    var endDate = data_gold.dataset_data.end_date;
    var dates = data_gold.dataset_data.data.map(d => d[0]);
    var closingPrices_gold = data_gold.dataset_data.data.map(d => d[1]);

    /*===============================
          STOCK CHOICE
    ===============================*/

    d3.json(ticker_url_app).then(function (data_ticker) {

      var dates_ticker = data_ticker.dataset_data.data.map(d => d[0]);
      var closingPrices_ticker = data_ticker.dataset_data.data.map(d => d[1]);

      /*========Share price plot id=share_price =======STARTS*/
      var selectorOptions = {
        buttons: [{
          step: 'month',
          stepmode: 'backward',
          count: 1,
          label: '1m'
        }, {
          step: 'month',
          stepmode: 'backward',
          count: 6,
          label: '6m'
        }, {
          step: 'year',
          stepmode: 'todate',
          count: 1,
          label: 'YTD'
        }, {
          step: 'year',
          stepmode: 'backward',
          count: 1,
          label: '1y'
        }, {
          step: 'year',
          stepmode: 'backward',
          count: 5,
          label: '5y'
        }, {
          step: 'all',
        }],
        y: 1.1,
      };

      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: `Gold`,
        x: dates,
        y: closingPrices_gold,
        line: {
          color: "#17BECF"
        }

      };

      var trace2 = {
        type: "scatter",
        mode: "lines",
        name: `${ticker}`,
        yaxis: 'y2',
        x: dates_ticker,
        y: closingPrices_ticker,
        line: {
          color: "black"
        }
      };

      var data = [trace1, trace2];

      var duallayout = {
      
        xaxis: {
          rangeselector: selectorOptions,
          rangeslider: {},
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        yaxis: {
          title: {text: 'Gold Price/Ounce',
          font: {
            size: 10,
            color: '#7f7f7f'}},
          ixedrange: true,
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        yaxis2: {
          title: {text: `${ticker} Share Price`,
          font: {
            size: 10,
            color: '#7f7f7f'}},
          overlaying: 'y',
          side: 'right',
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        showlegend: true,
	      legend: {"orientation": "h",
        x: 0.15,
        xanchor: 'bottom',
        y: 1.1,}
        

      };

      Plotly.newPlot("prices_plot", data, duallayout);
    });
  });

};

//==========TRACK YOUR INVESTMENT========================
function decline(ticker, inv_startdate, inv_enddate, value){
 // console.log(`app_decline start_date:${inv_startdate}`)
  var ticker_url = `https://www.quandl.com/api/v3/datasets/EOD/${ticker}/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${inv_startdate}&end_date=${inv_enddate}&order=asc`
  var gold_url = `https://www.quandl.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${inv_startdate}&end_date=${inv_enddate}&order=asc`
  d3.json(gold_url).then(function (data_gold) {
    d3.json(ticker_url).then(function (data_ticker) {
     
      var dates = data_gold.dataset_data.data.map(d => d[0]);
      var closingPrices_gold = data_gold.dataset_data.data.map(d => d[1]);

      var dates_ticker = data_ticker.dataset_data.data.map(d => d[0]);
      var closingPrices_ticker = data_ticker.dataset_data.data.map(d => d[1]);

          //=====Investment values=====
      var gold_qty = value / closingPrices_gold[0]
      var ticker_qty = value / closingPrices_ticker[0]


      var gold_inv = closingPrices_gold.map(d => d * gold_qty)
      var ticker_inv = closingPrices_ticker.map(d => d * ticker_qty)

       /*========Share price plot id=share_price =======STARTS*/
       var selectorOptions = {
        buttons: [{
          step: 'month',
          stepmode: 'backward',
          count: 1,
          label: '1m'
        }, {
          step: 'month',
          stepmode: 'backward',
          count: 6,
          label: '6m'
        }, {
          step: 'year',
          stepmode: 'todate',
          count: 1,
          label: 'YTD'
        }, {
          step: 'year',
          stepmode: 'backward',
          count: 1,
          label: '1y'
        }, {
          step: 'year',
          stepmode: 'backward',
          count: 5,
          label: '5y'
        }, {
          step: 'all',
        }],
        y: 1.1,
       };

      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: `Gold`,
        x: dates,
        y: gold_inv,
        line: {
          color: "#17BECF"
        }

      };

      var trace2 = {
        type: "scatter",
        mode: "lines",
        name: `${ticker}`,
        
        x: dates_ticker,
        y: ticker_inv,
        line: {
          color: "black"
        }
      };

      var data = [trace1, trace2];

      var layout = {
      
        xaxis: {
          rangeselector: selectorOptions,
          rangeslider: {},
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        yaxis: {
          title: {text: 'Gold Investment',
          font: {
            size: 10,
            color: '#7f7f7f'}},
          ixedrange: true,
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        yaxis2: {
          title: {text: `${ticker} Investment`,
          font: {
            size: 10,
            color: '#7f7f7f'}},
          
          
        },
        showlegend: true,
	      legend: {"orientation": "h",
        x: 0.15,
       
        y: 1.1,}
        

      };

      Plotly.newPlot("investment_plot", data, layout);
    });
  });
}












/*=================================================================
          ON CHANGE PROCESSING
===================================================================*/
function processSubmit_app() {
  // console.log('test');

 // var ticker = document.getElementsByClassName('token-input-token')[0].innerText.replace('×', '').replace('\n', '').trim();
  var ticker = document.getElementsByClassName('token-input-token')[0].innerText.split(",")[0].trim()
  var daterange = document.getElementsByClassName('drp-selected')[0].innerText.split(" - ")
  var start_split_date = daterange[0].split("/")
  var startdate = `${start_split_date[2]}-${start_split_date[0]}-${start_split_date[1]}`

  var end_split_date = daterange[1].split("/")
  var enddate = `${end_split_date[2]}-${end_split_date[0]}-${end_split_date[1]}`

  var amount = document.getElementById('val-number').value
 //console.log(String(startdate))

  
  prices33(ticker)
  decline(ticker, String(startdate), String(enddate), amount)


  // console.log(`ProcessSubmit is running`)




}

document.getElementById('submit').addEventListener('click', processSubmit_app);

/* ACTIVATE CHARTS ON TABS */
// force a click
comparison_tab = document.getElementById('comparison-tab');
evObj = document.createEvent('Events');
evObj.initEvent('click', true, false);
comparison_tab.dispatchEvent(evObj);

/*=================================================================
           ON CHANGE PROCESSING ---- ENDS
 ===================================================================*/


/* STRESS TEST*/









