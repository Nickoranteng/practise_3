/* Calendar Javascript control function */








// Endpoint for data
var apiKey = "wJwp9NFb-QWNy3d1f9_w";


var start_date_stress = '2007-01-01'
//var gold_url = `https://www.quandl.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_stress}&order=asc`


var app_gold = "/gold_returns"
var app_ticker = "/ticker_returns"
// Initialise the web page with county1 and county 2 default comparisons
function Initialize_stress() {
  var value = 1000;
  var ticker = "AAPL"
  var inv_startdate = `2018-10-19`
  var inv_enddate = `2020-02-05`
  gold_stress(ticker, inv_startdate, inv_enddate, value)
  Invest(ticker, inv_startdate, inv_enddate, value)
  falling_stress(ticker, inv_startdate, inv_enddate, value)
  rising_stress(ticker, inv_startdate, inv_enddate, value)
  gain_stress(ticker, inv_startdate, inv_enddate, value)
  //console.log(`Initialise is running`)
};
Initialize_stress();

function gold_stress(ticker, inv_startdate, inv_enddate, value) {
  var ticker_url = `https://www.quandl.com/api/v3/datasets/EOD/${ticker}/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_stress}&order=asc`
  var gold_url = `https://www.quandl.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_stress}&order=asc`

  d3.json(gold_url).then(function (data_gold) {
    d3.json(ticker_url).then(function (data_ticker) {
      //console.log(data_ticker)


      /*======PERIODS OF  STOCK MARKET DECLINES======
        analysis: stress test during periods of US stock market declines
        code: st1
        Activity 	                            Start Date	  End Date
        Global Fiancial Crisis (Fcrisis)	    09-Oct-07	    09-Mar-09
        US Downgrade (Downgrade)	            30-Mar-11	    03-Oct-11
        Global Slow down fears (Slowdown)	     22-May-15	    25-Aug-15
        Oil, US recession fears (recession)	   04-Nov-15	    11-Feb-16
        Covid-19 concerns	  (covid)            19-Feb-20	    23-Mar-20
      */

      /*===============================
             GOLD 
       ===============================*/
      //==============  Global Fiancial Crisis (Fcrisis)	    09-Oct-07	    09-Mar-09
      var open_Fcrisis = '2007-10-09'
      var close_Fcrisis = '2009-03-09'

      var open_gold_Fcrisis = data_gold.dataset_data.data.filter(d => d[0] == open_Fcrisis)
      var close_gold_Fcrisis = data_gold.dataset_data.data.filter(d => d[0] == close_Fcrisis)
      var gold_Fcrisis_change = (close_gold_Fcrisis[0][1] - open_gold_Fcrisis[0][1]) / open_gold_Fcrisis[0][1] * 100
      //============== US Downgrade (Downgrade)	            30-Mar-11	    03-Oct-11
      var open_Downgrade = '2011-03-30'
      var close_Downgrade = '2011-10-03'

      var open_gold_Downgrade = data_gold.dataset_data.data.filter(d => d[0] == open_Downgrade)
      var close_gold_Downgrade = data_gold.dataset_data.data.filter(d => d[0] == close_Downgrade)
      var gold_Downgrade_change = (close_gold_Downgrade[0][1] - open_gold_Downgrade[0][1]) / open_gold_Downgrade[0][1] * 100


      //============== Global Slow down fears (Slowdown)	     22-May-15	    25-Aug-15
      var open_Slowdown = '2015-05-22'
      var close_Slowdown = '2015-08-19'

      var open_gold_Slowdown = data_gold.dataset_data.data.filter(d => d[0] == open_Slowdown)
      var close_gold_Slowdown = data_gold.dataset_data.data.filter(d => d[0] == close_Slowdown)
      // console.log(open_gold_Slowdown)
      // console.log(close_gold_Slowdown)
      var gold_Slowdown_change = (close_gold_Slowdown[0][1] - open_gold_Slowdown[0][1]) / open_gold_Slowdown[0][1] * 100
      //============== Oil, US recession fears (recession)	   04-Nov-15	    11-Feb-16
      var open_recession = '2015-11-04'
      var close_recession = '2016-02-16'

      var open_gold_recession = data_gold.dataset_data.data.filter(d => d[0] == open_recession)
      var close_gold_recession = data_gold.dataset_data.data.filter(d => d[0] == close_recession)
      var gold_recession_change = (close_gold_recession[0][1] - open_gold_recession[0][1]) / open_gold_recession[0][1] * 100
      //============== Covid-19 concerns	  (covid)            19-Feb-20	    23-Mar-20
      var open_covid = '2020-02-19'
      var close_covid = '2020-03-23'

      var open_gold_covid = data_gold.dataset_data.data.filter(d => d[0] == open_covid)
      var close_gold_covid = data_gold.dataset_data.data.filter(d => d[0] == close_covid)
      var gold_covid_change = (close_gold_covid[0][1] - open_gold_covid[0][1]) / open_gold_covid[0][1] * 100

      //============== USer's Period

      var open_inv = inv_startdate
      var close_inv = inv_enddate



      var open_gold_inv = data_gold.dataset_data.data.filter(d => d[0] == open_inv)
      var close_gold_inv = data_gold.dataset_data.data.filter(d => d[0] == close_inv)
      //console.log(close_gold_inv)
      // console.log(open_gold_inv)
      var gold_inv_change = (close_gold_inv[0][1] - open_gold_Fcrisis[0][1]) / open_gold_inv[0][1] * 100
      //console.log(gold_inv_change)
      /*===============================
               USER's Ticker
          ===============================*/
      //==============  Global Fiancial Crisis (Fcrisis)      09-Oct-07     09-Mar-09


      var open_ticker_Fcrisis = data_ticker.dataset_data.data.filter(d => d[0] == open_Fcrisis)
      var close_ticker_Fcrisis = data_ticker.dataset_data.data.filter(d => d[0] == close_Fcrisis)

      try { var ticker_Fcrisis_change = (close_ticker_Fcrisis[0][1] - open_ticker_Fcrisis[0][1]) / open_ticker_Fcrisis[0][1] * 100 }
      catch (error) { var ticker_Fcrisis_change = 0 }

      //============== US Downgrade (Downgrade)             30-Mar-11     03-Oct-11


      var open_ticker_Downgrade = data_ticker.dataset_data.data.filter(d => d[0] == open_Downgrade)
      var close_ticker_Downgrade = data_ticker.dataset_data.data.filter(d => d[0] == close_Downgrade)

      try { var ticker_Downgrade_change = (close_ticker_Downgrade[0][1] - open_ticker_Downgrade[0][1]) / open_ticker_Downgrade[0][1] * 100 }
      catch (error) { var ticker_Downgrade_change = 0 }

      //============== Global Slow down fears (Slowdown)       22-May-15      25-Aug-15


      var open_ticker_Slowdown = data_ticker.dataset_data.data.filter(d => d[0] == open_Slowdown)
      var close_ticker_Slowdown = data_ticker.dataset_data.data.filter(d => d[0] == close_Slowdown)

      try { var ticker_Slowdown_change = (close_ticker_Slowdown[0][1] - open_ticker_Slowdown[0][1]) / open_ticker_Slowdown[0][1] * 100 }
      catch (error) { var ticker_Slowdown_change = 0 }
      //============== Oil, US recession fears (recession)     04-Nov-15      11-Feb-16


      var open_ticker_recession = data_ticker.dataset_data.data.filter(d => d[0] == open_recession)
      var close_ticker_recession = data_ticker.dataset_data.data.filter(d => d[0] == close_recession)

      try { var ticker_recession_change = (close_ticker_recession[0][1] - open_ticker_recession[0][1]) / open_ticker_recession[0][1] * 100 }
      catch (error) { var ticker_recession_change = 0 }
      //============== Covid-19 concerns    (covid)            19-Feb-20      23-Mar-20

      var open_ticker_covid = data_ticker.dataset_data.data.filter(d => d[0] == open_covid)
      var close_ticker_covid = data_ticker.dataset_data.data.filter(d => d[0] == close_covid)

      try { var ticker_covid_change = (close_ticker_covid[0][1] - open_ticker_covid[0][1]) / open_ticker_covid[0][1] * 100 }
      catch (error) { var ticker_covid_change = 0 }
      //============== USer's Period


      var open_ticker_inv = data_ticker.dataset_data.data.filter(d => d[0] == open_inv)
      var close_ticker_inv = data_ticker.dataset_data.data.filter(d => d[0] == close_inv)
      // console.log(open_ticker_inv)
      // console.log(open_inv)

      try { var ticker_inv_change = (close_ticker_inv[0][1] - open_ticker_inv[0][1]) / open_ticker_inv[0][1] * 100 }
      catch (error) { var ticker_inv_change = 0 }

      // console.log(close_ticker_inv)
      // console.log(close_inv)
      // console.log(ticker_url)
      //console.log(ticker_covid_change)


      //============== Bar plot of US Stock market decline========
      var trace1 = {
        x: [
          `Global Fiancial Crisis <br> From 09-Oct-07 <br> to 09-Mar-09`,
          `US Downgrade <br> From 30-Mar-11 <br> to 03-Oct-11`,
          `Global Slow down fears <br> From 22-May-15 <br> to 25-Aug-15`,
          `Oil, US recession fears <br> From 04-Nov-15 <br> to 11-Feb-16`,
          `Covid-19 concerns <br> From 19-Feb-20 <br> to 23-Mar-20`,
          `Your Investment Period <br> From ${open_inv} <br> to ${close_inv}`
        ],
        y: [gold_Fcrisis_change,
          gold_Downgrade_change,
          gold_Slowdown_change,
          gold_recession_change,
          gold_covid_change,
          gold_inv_change
        ],
        name: 'Gold',
        type: 'bar',

      };

      var trace2 = {
        x: [
          `Global Fiancial Crisis <br> From 09-Oct-07 <br> to 09-Mar-09`,
          `US Downgrade <br> From 30-Mar-11 <br> to 03-Oct-11`,
          `Global Slow down fears <br> From 22-May-15 <br> to 25-Aug-15`,
          `Oil, US recession fears <br> From 04-Nov-15 <br> to 11-Feb-16`,
          `Covid-19 concerns <br> From 19-Feb-20 <br> to 23-Mar-20`,
          `Your Investment Period <br> From ${open_inv} <br> to ${close_inv}`
        ],
        y: [ticker_Fcrisis_change,
          ticker_Downgrade_change,
          ticker_Slowdown_change,
          ticker_recession_change,
          ticker_covid_change,
          ticker_inv_change
        ],

        name: `${ticker}`,
        type: 'bar',

      };




      var data = [trace1, trace2];

      // var layout = {
      //   barmode: 'group',
      //   yaxis: {
      //     title: {
      //       text: 'Returns (%)',
      //       font: {
      //         family: 'Courier New, monospace',
      //         size: 10,
      //         color: '#7f7f7f',
      //         tickformat: '%'
      //       },

      //     },
      //   },
      //   tickfont:{'family': "Courier New, monospace",
      //   'size': 5, 
      //   'color': '#7f7f7f'}
      // };
      var layout = {

        xaxis: {
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        yaxis: {
          title: 'Returns (%)',
          titlefont: {
            size: 10,
            color: '#7f7f7f'
          },
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        legend: {
          "orientation": "h",
          x: 0.3,
          y: 1.1,
          bgcolor: 'rgba(255, 255, 255, 0)',
          bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.4,
        bargroupgap: 0
      };


      Plotly.newPlot('decline_plot', data, layout);

      

    }); //close d3 STOCK CHOICE
  });   //close d3 GOLD
};


//==============================================================================================
         //OTHER PERIODS STARTS
//===============================================================================================
function gains_stress(ticker, inv_startdate, inv_enddate, value) {
  var ticker_url = `https://www.quandl.com/api/v3/datasets/EOD/${ticker}/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_stress}&order=asc`
  var gold_url = `https://www.quandl.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_stress}&order=asc`

  d3.json(gold_url).then(function (data_gold) {
    d3.json(ticker_url).then(function (data_ticker) {
      //console.log(data_ticker)


      /*======PERIODS OF  STOCK MARKET DECLINES======
        analysis: stress test during periods of US stock market declines
        code: st1
        Activity 	                            Start Date	  End Date
        Global Fiancial Crisis (Fcrisis)	    09-Oct-07	    09-Mar-09
        US Downgrade (Downgrade)	            30-Mar-11	    03-Oct-11
        Global Slow down fears (Slowdown)	     22-May-15	    25-Aug-15
        Oil, US recession fears (recession)	   04-Nov-15	    11-Feb-16
        Covid-19 concerns	  (covid)            19-Feb-20	    23-Mar-20
      */

      /*===============================
             GOLD 
       ===============================*/
      //==============  Global Fiancial Crisis (Fcrisis)	    09-Oct-07	    09-Mar-09
      var open_Fcrisis = '2007-10-09'
      var close_Fcrisis = '2009-03-09'

      var open_gold_Fcrisis = data_gold.dataset_data.data.filter(d => d[0] == open_Fcrisis)
      var close_gold_Fcrisis = data_gold.dataset_data.data.filter(d => d[0] == close_Fcrisis)
      var gold_Fcrisis_change = (close_gold_Fcrisis[0][1] - open_gold_Fcrisis[0][1]) / open_gold_Fcrisis[0][1] * 100
      //============== US Downgrade (Downgrade)	            30-Mar-11	    03-Oct-11
      var open_Downgrade = '2011-03-30'
      var close_Downgrade = '2011-10-03'

      var open_gold_Downgrade = data_gold.dataset_data.data.filter(d => d[0] == open_Downgrade)
      var close_gold_Downgrade = data_gold.dataset_data.data.filter(d => d[0] == close_Downgrade)
      var gold_Downgrade_change = (close_gold_Downgrade[0][1] - open_gold_Downgrade[0][1]) / open_gold_Downgrade[0][1] * 100


      //============== Global Slow down fears (Slowdown)	     22-May-15	    25-Aug-15
      var open_Slowdown = '2015-05-22'
      var close_Slowdown = '2015-08-19'

      var open_gold_Slowdown = data_gold.dataset_data.data.filter(d => d[0] == open_Slowdown)
      var close_gold_Slowdown = data_gold.dataset_data.data.filter(d => d[0] == close_Slowdown)
      // console.log(open_gold_Slowdown)
      // console.log(close_gold_Slowdown)
      var gold_Slowdown_change = (close_gold_Slowdown[0][1] - open_gold_Slowdown[0][1]) / open_gold_Slowdown[0][1] * 100
      //============== Oil, US recession fears (recession)	   04-Nov-15	    11-Feb-16
      var open_recession = '2015-11-04'
      var close_recession = '2016-02-16'

      var open_gold_recession = data_gold.dataset_data.data.filter(d => d[0] == open_recession)
      var close_gold_recession = data_gold.dataset_data.data.filter(d => d[0] == close_recession)
      var gold_recession_change = (close_gold_recession[0][1] - open_gold_recession[0][1]) / open_gold_recession[0][1] * 100
      //============== Covid-19 concerns	  (covid)            19-Feb-20	    23-Mar-20
      var open_covid = '2020-02-19'
      var close_covid = '2020-03-23'

      var open_gold_covid = data_gold.dataset_data.data.filter(d => d[0] == open_covid)
      var close_gold_covid = data_gold.dataset_data.data.filter(d => d[0] == close_covid)
      var gold_covid_change = (close_gold_covid[0][1] - open_gold_covid[0][1]) / open_gold_covid[0][1] * 100

      //============== USer's Period

      var open_inv = inv_startdate
      var close_inv = inv_enddate



      var open_gold_inv = data_gold.dataset_data.data.filter(d => d[0] == open_inv)
      var close_gold_inv = data_gold.dataset_data.data.filter(d => d[0] == close_inv)
      //console.log(close_gold_inv)
      // console.log(open_gold_inv)
      var gold_inv_change = (close_gold_inv[0][1] - open_gold_Fcrisis[0][1]) / open_gold_inv[0][1] * 100
      //console.log(gold_inv_change)
      /*===============================
               USER's Ticker
          ===============================*/
      //==============  Global Fiancial Crisis (Fcrisis)      09-Oct-07     09-Mar-09


      var open_ticker_Fcrisis = data_ticker.dataset_data.data.filter(d => d[0] == open_Fcrisis)
      var close_ticker_Fcrisis = data_ticker.dataset_data.data.filter(d => d[0] == close_Fcrisis)

      try { var ticker_Fcrisis_change = (close_ticker_Fcrisis[0][1] - open_ticker_Fcrisis[0][1]) / open_ticker_Fcrisis[0][1] * 100 }
      catch (error) { var ticker_Fcrisis_change = 0 }

      //============== US Downgrade (Downgrade)             30-Mar-11     03-Oct-11


      var open_ticker_Downgrade = data_ticker.dataset_data.data.filter(d => d[0] == open_Downgrade)
      var close_ticker_Downgrade = data_ticker.dataset_data.data.filter(d => d[0] == close_Downgrade)

      try { var ticker_Downgrade_change = (close_ticker_Downgrade[0][1] - open_ticker_Downgrade[0][1]) / open_ticker_Downgrade[0][1] * 100 }
      catch (error) { var ticker_Downgrade_change = 0 }

      //============== Global Slow down fears (Slowdown)       22-May-15      25-Aug-15


      var open_ticker_Slowdown = data_ticker.dataset_data.data.filter(d => d[0] == open_Slowdown)
      var close_ticker_Slowdown = data_ticker.dataset_data.data.filter(d => d[0] == close_Slowdown)

      try { var ticker_Slowdown_change = (close_ticker_Slowdown[0][1] - open_ticker_Slowdown[0][1]) / open_ticker_Slowdown[0][1] * 100 }
      catch (error) { var ticker_Slowdown_change = 0 }
      //============== Oil, US recession fears (recession)     04-Nov-15      11-Feb-16


      var open_ticker_recession = data_ticker.dataset_data.data.filter(d => d[0] == open_recession)
      var close_ticker_recession = data_ticker.dataset_data.data.filter(d => d[0] == close_recession)

      try { var ticker_recession_change = (close_ticker_recession[0][1] - open_ticker_recession[0][1]) / open_ticker_recession[0][1] * 100 }
      catch (error) { var ticker_recession_change = 0 }
      //============== Covid-19 concerns    (covid)            19-Feb-20      23-Mar-20

      var open_ticker_covid = data_ticker.dataset_data.data.filter(d => d[0] == open_covid)
      var close_ticker_covid = data_ticker.dataset_data.data.filter(d => d[0] == close_covid)

      try { var ticker_covid_change = (close_ticker_covid[0][1] - open_ticker_covid[0][1]) / open_ticker_covid[0][1] * 100 }
      catch (error) { var ticker_covid_change = 0 }
      //============== USer's Period


      var open_ticker_inv = data_ticker.dataset_data.data.filter(d => d[0] == open_inv)
      var close_ticker_inv = data_ticker.dataset_data.data.filter(d => d[0] == close_inv)
      // console.log(open_ticker_inv)
      // console.log(open_inv)

      try { var ticker_inv_change = (close_ticker_inv[0][1] - open_ticker_inv[0][1]) / open_ticker_inv[0][1] * 100 }
      catch (error) { var ticker_inv_change = 0 }

      // console.log(close_ticker_inv)
      // console.log(close_inv)
      // console.log(ticker_url)
      //console.log(ticker_covid_change)


      //============== Bar plot of US Stock market decline========
      var trace1 = {
        x: [
          `Global Fiancial Crisis <br> From 09-Oct-07 <br> to 09-Mar-09`,
          `US Downgrade <br> From 30-Mar-11 <br> to 03-Oct-11`,
          `Global Slow down fears <br> From 22-May-15 <br> to 25-Aug-15`,
          `Oil, US recession fears <br> From 04-Nov-15 <br> to 11-Feb-16`,
          `Covid-19 concerns <br> From 19-Feb-20 <br> to 23-Mar-20`,
          `Your Investment Period <br> From ${open_inv} <br> to ${close_inv}`
        ],
        y: [gold_Fcrisis_change,
          gold_Downgrade_change,
          gold_Slowdown_change,
          gold_recession_change,
          gold_covid_change,
          gold_inv_change
        ],
        name: 'Gold',
        type: 'bar',

      };

      var trace2 = {
        x: [
          `Global Fiancial Crisis <br> From 09-Oct-07 <br> to 09-Mar-09`,
          `US Downgrade <br> From 30-Mar-11 <br> to 03-Oct-11`,
          `Global Slow down fears <br> From 22-May-15 <br> to 25-Aug-15`,
          `Oil, US recession fears <br> From 04-Nov-15 <br> to 11-Feb-16`,
          `Covid-19 concerns <br> From 19-Feb-20 <br> to 23-Mar-20`,
          `Your Investment Period <br> From ${open_inv} <br> to ${close_inv}`
        ],
        y: [ticker_Fcrisis_change,
          ticker_Downgrade_change,
          ticker_Slowdown_change,
          ticker_recession_change,
          ticker_covid_change,
          ticker_inv_change
        ],

        name: `${ticker}`,
        type: 'bar',

      };




      var data = [trace1, trace2];

      // var layout = {
      //   barmode: 'group',
      //   yaxis: {
      //     title: {
      //       text: 'Returns (%)',
      //       font: {
      //         family: 'Courier New, monospace',
      //         size: 10,
      //         color: '#7f7f7f',
      //         tickformat: '%'
      //       },

      //     },
      //   },
      //   tickfont:{'family': "Courier New, monospace",
      //   'size': 5, 
      //   'color': '#7f7f7f'}
      // };
      var layout = {

        xaxis: {
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        yaxis: {
          title: 'Returns (%)',
          titlefont: {
            size: 10,
            color: '#7f7f7f'
          },
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        legend: {
          "orientation": "h",
          x: 0.3,
          y: 1.1,
          bgcolor: 'rgba(255, 255, 255, 0)',
          bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.4,
        bargroupgap: 0
      };


      

      Plotly.newPlot('gains_plot', data, layout);

      

     

    }); //close d3 STOCK CHOICE
  });   //close d3 GOLD
};

//==============================================================================================
         //OTHER PERIODS ENDS
//===============================================================================================




//==============================================================================================
         //RISING INTEREST RATES ends
//===============================================================================================
function rising_stress(ticker, inv_startdate, inv_enddate, value) {
  var ticker_url_rising = `https://www.quandl.com/api/v3/datasets/EOD/${ticker}/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_stress}&order=asc`
  var gold_url_rising = `https://www.quandl.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_stress}&order=asc`

  d3.json(gold_url_rising).then(function (data_gold) {
    d3.json(ticker_url_rising).then(function (data_ticker) {
      //console.log(data_ticker)

      

      /*===============================
             GOLD 
       ===============================*/
      //==============  Global Fiancial Crisis (Rising)      09-Oct-07     09-Mar-09
      var open_Rising = '2015-11-05'
      var close_Rising = '2020-01-22'

      var open_gold_Rising = data_gold.dataset_data.data.filter(d => d[0] == open_Rising)
      var close_gold_Rising = data_gold.dataset_data.data.filter(d => d[0] == close_Rising)
      //console.log(open_gold_Rising)
      //console.log(close_gold_Rising)
      var gold_Rising_change = (close_gold_Rising[0][1] - open_gold_Rising[0][1]) / open_gold_Rising[0][1] * 100
      //============== US Downgrade (Downgrade)             30-Mar-11     03-Oct-11
      var open_Downgrade = '2008-01-15'
      var close_Downgrade = '2015-11-02'

      var open_gold_Downgrade = data_gold.dataset_data.data.filter(d => d[0] == open_Downgrade)
      var close_gold_Downgrade = data_gold.dataset_data.data.filter(d => d[0] == close_Downgrade)
      var gold_Downgrade_change = (close_gold_Downgrade[0][1] - open_gold_Downgrade[0][1]) / open_gold_Downgrade[0][1] * 100

      console.log(open_gold_Downgrade)
      console.log(close_gold_Downgrade)
      //============== USer's Period

      var open_inv = inv_startdate
      var close_inv = inv_enddate

      var open_gold_inv = data_gold.dataset_data.data.filter(d => d[0] == open_inv)
      var close_gold_inv = data_gold.dataset_data.data.filter(d => d[0] == close_inv)
      //console.log(close_gold_inv)
      // console.log(open_gold_inv)
      var gold_inv_change = (close_gold_inv[0][1] - open_gold_Rising[0][1]) / open_gold_inv[0][1] * 100
      //console.log(gold_inv_change)
      /*===============================
               USER's Ticker
          ===============================*/
      //==============  Global Fiancial Crisis (Rising)      09-Oct-07     09-Mar-09

      var open_ticker_Rising = data_ticker.dataset_data.data.filter(d => d[0] == open_Rising)
      var close_ticker_Rising = data_ticker.dataset_data.data.filter(d => d[0] == close_Rising)

      try { var ticker_Rising_change = (close_ticker_Rising[0][1] - open_ticker_Rising[0][1]) / open_ticker_Rising[0][1] * 100 }
      catch (error) { var ticker_Rising_change = 0 }

      //============== US Downgrade (Downgrade)             30-Mar-11     03-Oct-11

      var open_ticker_Downgrade = data_ticker.dataset_data.data.filter(d => d[0] == open_Downgrade)
      var close_ticker_Downgrade = data_ticker.dataset_data.data.filter(d => d[0] == close_Downgrade)

      try { var ticker_Downgrade_change = (close_ticker_Downgrade[0][1] - open_ticker_Downgrade[0][1]) / open_ticker_Downgrade[0][1] * 100 }
      catch (error) { var ticker_Downgrade_change = 0 }

      //============== Global Slow down fears (Slowdown)       22-May-15      25-Aug-15

      
      //============== USer's Period

      var open_ticker_inv = data_ticker.dataset_data.data.filter(d => d[0] == open_inv)
      var close_ticker_inv = data_ticker.dataset_data.data.filter(d => d[0] == close_inv)
      // console.log(open_ticker_inv)
      // console.log(open_inv)

      try { var ticker_inv_change = (close_ticker_inv[0][1] - open_ticker_inv[0][1]) / open_ticker_inv[0][1] * 100 }
      catch (error) { var ticker_inv_change = 0 }

      // console.log(close_ticker_inv)
      // console.log(close_inv)
      // console.log(ticker_url)
      //console.log(ticker_covid_change)

      //============== Bar plot of US Stock market decline========
      var trace1 = {
        x: [
          `Rising Interest Rate <br> From 2015-11-01 <br> to 2020-01-19`,
          `Rising Interest Rate <br> From 2008-01-12 <br> to 2015-11-02`,
          `Your Investment Period <br> From ${open_inv} <br> to ${close_inv}`
        ],
        y: [gold_Rising_change,
          gold_Downgrade_change,
          gold_inv_change
        ],
        name: 'Gold',
        type: 'bar',

      };

      var trace2 = {
        x: [
          `Rising Interest Rate <br> From 2015-11-01 <br> to 2020-01-19`,
          `Rising Interest Rate <br> From 2008-01-12 <br> to 2015-11-02`,
          `Your Investment Period <br> From ${open_inv} <br> to ${close_inv}`
        ],
        y: [ticker_Rising_change,
          ticker_Downgrade_change,
          ticker_inv_change
        ],

        name: `${ticker}`,
        type: 'bar',

      };


      var data = [trace1, trace2];

      // var layout = {
      //   barmode: 'group',
      //   yaxis: {
      //     title: {
      //       text: 'Returns (%)',
      //       font: {
      //         family: 'Courier New, monospace',
      //         size: 10,
      //         color: '#7f7f7f',
      //         tickformat: '%'
      //       },

      //     },
      //   },
      //   tickfont:{'family': "Courier New, monospace",
      //   'size': 5, 
      //   'color': '#7f7f7f'}
      // };
      var layout = {

        xaxis: {
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        yaxis: {
          title: 'Returns (%)',
          titlefont: {
            size: 10,
            color: '#7f7f7f'
          },
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        legend: {
          "orientation": "h",
          x: 0.3,
          y: 1.1,
          bgcolor: 'rgba(255, 255, 255, 0)',
          bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.4,
        bargroupgap: 0
      };

      

     

      Plotly.newPlot('Interest_rise_plot', data, layout);

      

    }); //close d3 STOCK CHOICE
  });   //close d3 GOLD
};


//==============================================================================================
         //RISING INTEREST RATES ends
//===============================================================================================




//==============================================================================================
         //FALLING INTEREST RATES ends
//===============================================================================================
function falling_stress(ticker, inv_startdate, inv_enddate, value) {
  var ticker_url_falling = `https://www.quandl.com/api/v3/datasets/EOD/${ticker}/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_stress}&order=asc`
  var gold_url_falling = `https://www.quandl.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_stress}&order=asc`

  d3.json(gold_url_falling).then(function (data_gold) {
    d3.json(ticker_url_falling).then(function (data_ticker) {
      //console.log(data_ticker)

      

      /*===============================
             GOLD 
       ===============================*/
      //==============  Global Fiancial Crisis (Falling)      09-Oct-07     09-Mar-09
      var open_Falling = '2007-06-01'
      var close_Falling = '2008-03-03'

      var open_gold_Falling = data_gold.dataset_data.data.filter(d => d[0] == open_Falling)
      var close_gold_Falling = data_gold.dataset_data.data.filter(d => d[0] == close_Falling)
      //console.log(open_gold_Falling)
      //console.log(close_gold_Falling)
      var gold_Falling_change = (close_gold_Falling[0][1] - open_gold_Falling[0][1]) / open_gold_Falling[0][1] * 100
      //============== US Downgrade (Downgrade)             30-Mar-11     03-Oct-11
      var open_Downgrade = '2019-01-03'
      var close_Downgrade = '2020-04-15'

      var open_gold_Downgrade = data_gold.dataset_data.data.filter(d => d[0] == open_Downgrade)
      var close_gold_Downgrade = data_gold.dataset_data.data.filter(d => d[0] == close_Downgrade)
      var gold_Downgrade_change = (close_gold_Downgrade[0][1] - open_gold_Downgrade[0][1]) / open_gold_Downgrade[0][1] * 100

     // console.log(open_gold_Downgrade)
      //console.log(close_gold_Downgrade)
      //============== USer's Period

      var open_inv = inv_startdate
      var close_inv = inv_enddate

      var open_gold_inv = data_gold.dataset_data.data.filter(d => d[0] == open_inv)
      var close_gold_inv = data_gold.dataset_data.data.filter(d => d[0] == close_inv)
      //console.log(close_gold_inv)
      // console.log(open_gold_inv)
      var gold_inv_change = (close_gold_inv[0][1] - open_gold_Falling[0][1]) / open_gold_inv[0][1] * 100
      //console.log(gold_inv_change)
      /*===============================
               USER's Ticker
          ===============================*/
      //==============  Global Fiancial Crisis (Falling)      09-Oct-07     09-Mar-09

      var open_ticker_Falling = data_ticker.dataset_data.data.filter(d => d[0] == open_Falling)
      var close_ticker_Falling = data_ticker.dataset_data.data.filter(d => d[0] == close_Falling)

      try { var ticker_Falling_change = (close_ticker_Falling[0][1] - open_ticker_Falling[0][1]) / open_ticker_Falling[0][1] * 100 }
      catch (error) { var ticker_Falling_change = 0 }

      //============== US Downgrade (Downgrade)             30-Mar-11     03-Oct-11

      var open_ticker_Downgrade = data_ticker.dataset_data.data.filter(d => d[0] == open_Downgrade)
      var close_ticker_Downgrade = data_ticker.dataset_data.data.filter(d => d[0] == close_Downgrade)

      try { var ticker_Downgrade_change = (close_ticker_Downgrade[0][1] - open_ticker_Downgrade[0][1]) / open_ticker_Downgrade[0][1] * 100 }
      catch (error) { var ticker_Downgrade_change = 0 }

      //============== Global Slow down fears (Slowdown)       22-May-15      25-Aug-15

      
      //============== USer's Period

      var open_ticker_inv = data_ticker.dataset_data.data.filter(d => d[0] == open_inv)
      var close_ticker_inv = data_ticker.dataset_data.data.filter(d => d[0] == close_inv)
      // console.log(open_ticker_inv)
      // console.log(open_inv)

      try { var ticker_inv_change = (close_ticker_inv[0][1] - open_ticker_inv[0][1]) / open_ticker_inv[0][1] * 100 }
      catch (error) { var ticker_inv_change = 0 }

      // console.log(close_ticker_inv)
      // console.log(close_inv)
      // console.log(ticker_url)
      //console.log(ticker_covid_change)

      //============== Bar plot of US Stock market decline========
      var trace1 = {
        x: [
          `Falling Interest Rates <br> From 2007-06-01 <br> to 2008-03-03`,
          `Falling Interest Rates <br> From 2019-01-03 <br> to 2020-04-10`,
          `Your Investment Period <br> From ${open_inv} <br> to ${close_inv}`
        ],
        y: [gold_Falling_change,
          gold_Downgrade_change,
          gold_inv_change
        ],
        name: 'Gold',
        type: 'bar',

      };

      var trace2 = {
        x: [
          `Falling Interest Rates <br> From 2007-06-01 <br> to 2008-03-03`,
          `Falling Interest Rates <br> From 2019-01-03 <br> to 2020-04-10`,
          `Your Investment Period <br> From ${open_inv} <br> to ${close_inv}`
        ],
        y: [ticker_Falling_change,
          ticker_Downgrade_change,
          ticker_inv_change
        ],

        name: `${ticker}`,
        type: 'bar',

      };


      var data = [trace1, trace2];

      // var layout = {
      //   barmode: 'group',
      //   yaxis: {
      //     title: {
      //       text: 'Returns (%)',
      //       font: {
      //         family: 'Courier New, monospace',
      //         size: 10,
      //         color: '#7f7f7f',
      //         tickformat: '%'
      //       },

      //     },
      //   },
      //   tickfont:{'family': "Courier New, monospace",
      //   'size': 5, 
      //   'color': '#7f7f7f'}
      // };
      var layout = {

        xaxis: {
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        yaxis: {
          title: 'Returns (%)',
          titlefont: {
            size: 10,
            color: '#7f7f7f'
          },
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        legend: {
          "orientation": "h",
          x: 0.3,
          y: 1.1,
          bgcolor: 'rgba(255, 255, 255, 0)',
          bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.4,
        bargroupgap: 0
      };

      

     

      Plotly.newPlot('interest_falling_plot', data, layout);

      

    }); //close d3 STOCK CHOICE
  });   //close d3 GOLD
};






//==============================================================================================
         //GAINS STARTS
//===============================================================================================
function gain_stress(ticker, inv_startdate, inv_enddate, value) {
  var ticker_url_gain = `https://www.quandl.com/api/v3/datasets/EOD/${ticker}/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_stress}&order=asc`
  var gold_url_gain = `https://www.quandl.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date_stress}&order=asc`

  d3.json(gold_url_gain).then(function (data_gold) {
    d3.json(ticker_url_gain).then(function (data_ticker) {
      //console.log(data_ticker)

      

      /*===============================
             GOLD 
       ===============================*/
      //==============  Global Fiancial Crisis (Gain)      09-Oct-07     09-Mar-09
      var open_Gain = '2009-03-09'
      var close_Gain = '2018-09-20'

      var open_gold_Gain = data_gold.dataset_data.data.filter(d => d[0] == open_Gain)
      var close_gold_Gain = data_gold.dataset_data.data.filter(d => d[0] == close_Gain)
      //console.log(open_gold_Gain)
      //console.log(close_gold_Gain)
      var gold_Gain_change = (close_gold_Gain[0][1] - open_gold_Gain[0][1]) / open_gold_Gain[0][1] * 100
      //============== US Downgrade (Downgrade)             30-Mar-11     03-Oct-11
     
    
      //============== USer's Period

      var open_inv = inv_startdate
      var close_inv = inv_enddate

      var open_gold_inv = data_gold.dataset_data.data.filter(d => d[0] == open_inv)
      var close_gold_inv = data_gold.dataset_data.data.filter(d => d[0] == close_inv)
      //console.log(close_gold_inv)
      // console.log(open_gold_inv)
      var gold_inv_change = (close_gold_inv[0][1] - open_gold_Gain[0][1]) / open_gold_inv[0][1] * 100
      //console.log(gold_inv_change)
      /*===============================
               USER's Ticker
          ===============================*/
      //==============  Global Fiancial Crisis (Gain)      09-Oct-07     09-Mar-09

      var open_ticker_Gain = data_ticker.dataset_data.data.filter(d => d[0] == open_Gain)
      var close_ticker_Gain = data_ticker.dataset_data.data.filter(d => d[0] == close_Gain)

      try { var ticker_Gain_change = (close_ticker_Gain[0][1] - open_ticker_Gain[0][1]) / open_ticker_Gain[0][1] * 100 }
      catch (error) { var ticker_Gain_change = 0 }

      //============== US Downgrade (Downgrade)             30-Mar-11     03-Oct-11

    

      //============== Global Slow down fears (Slowdown)       22-May-15      25-Aug-15

      
      //============== USer's Period

      var open_ticker_inv = data_ticker.dataset_data.data.filter(d => d[0] == open_inv)
      var close_ticker_inv = data_ticker.dataset_data.data.filter(d => d[0] == close_inv)
      // console.log(open_ticker_inv)
      // console.log(open_inv)

      try { var ticker_inv_change = (close_ticker_inv[0][1] - open_ticker_inv[0][1]) / open_ticker_inv[0][1] * 100 }
      catch (error) { var ticker_inv_change = 0 }

      // console.log(close_ticker_inv)
      // console.log(close_inv)
      // console.log(ticker_url)
      //console.log(ticker_covid_change)

      //============== Bar plot of US Stock market decline========
      var trace1 = {
        x: [
          `Bullish Market  <br> From 2009-03-09 <br> to 2018-09-20`,
          
          `Your Investment Period <br> From ${open_inv} <br> to ${close_inv}`
        ],
        y: [gold_Gain_change,
         
          gold_inv_change
        ],
        name: 'Gold',
        type: 'bar',

      };

      var trace2 = {
        x: [
          `Bullish Market  <br> From 2009-03-09 <br> to 2018-09-20`,
          
          `Your Investment Period <br> From ${open_inv} <br> to ${close_inv}`
        ],
        y: [ticker_Gain_change,
          
          ticker_inv_change
        ],

        name: `${ticker}`,
        type: 'bar',

      };

      var data = [trace1, trace2];

      // var layout = {
      //   barmode: 'group',
      //   yaxis: {
      //     title: {
      //       text: 'Returns (%)',
      //       font: {
      //         family: 'Courier New, monospace',
      //         size: 10,
      //         color: '#7f7f7f',
      //         tickformat: '%'
      //       },

      //     },
      //   },
      //   tickfont:{'family': "Courier New, monospace",
      //   'size': 5, 
      //   'color': '#7f7f7f'}
      // };
      var layout = {

        xaxis: {
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        yaxis: {
          title: 'Returns (%)',
          titlefont: {
            size: 10,
            color: '#7f7f7f'
          },
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        legend: {
          "orientation": "h",
          x: 0.3,
          y: 1.1,
          bgcolor: 'rgba(255, 255, 255, 0)',
          bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.4,
        bargroupgap: 0
      };

      

     

      Plotly.newPlot('gains_plot', data, layout);

      

    }); //close d3 STOCK CHOICE
  });   //close d3 GOLD
};





//==============================================================================================
         //GAINS ENDS
//===============================================================================================






/* STRESS TEST ENDS*/


function Invest(ticker, inv_startdate, inv_enddate, value) {
  var ticker_url = `https://www.quandl.com/api/v3/datasets/EOD/${ticker}/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${inv_startdate}&end_date=${inv_enddate}&order=asc`
  var gold_url = `https://www.quandl.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${inv_startdate}&end_date=${inv_enddate}&order=asc`
  d3.json(gold_url).then(function (data_gold) {
    d3.json(ticker_url).then(function (data_ticker) {
     // console.log(gold_url)
   

     var dates = data_gold.dataset_data.data.map(d => d[0]);
     var closingPrices_gold = data_gold.dataset_data.data.map(d => d[1]);

     var dates_ticker = data_ticker.dataset_data.data.map(d => d[0]);
     var closingPrices_ticker = data_ticker.dataset_data.data.map(d => d[1]);

         //=====Investment values=====
     var gold_qty = value / closingPrices_gold[0]
     var ticker_qty = value / closingPrices_ticker[0]


     var gold_inv = closingPrices_gold.map(d => d * gold_qty)
     var ticker_inv = closingPrices_ticker.map(d => d * ticker_qty)



//console.log(document.getElementById("fa-usd"))

// Initial Investment
// console.log(`Investment update is running`)
document.getElementById("invest-amount").textContent = `$${Math.round((ticker_inv[0]), 2)}`
document.getElementById('investment').textContent = `Investment Date: ${inv_startdate}`



//=====Max Investment values=====
const maxValueOfY = Math.max.apply(Math, data_ticker.dataset_data.data.map(function(o) { return o[1]; }))
var ticker_max = data_ticker.dataset_data.data.filter(d => d[1] == maxValueOfY)
document.getElementById("max-return").textContent = `$${Math.round((ticker_max[0][1]*ticker_qty - ticker_inv[0]), 2)}`
document.getElementById('max-return_date').textContent = `Divestment Date: ${ticker_max[0][0]}`


// console.log(ticker_max)
// console.log(Math.round((ticker_max[0][1]), 2))

//=====Min Investment values=====
const minValueOfY = Math.min.apply(Math, data_ticker.dataset_data.data.map(function(o) { return o[1]; }))
var ticker_max = data_ticker.dataset_data.data.filter(d => d[1] == minValueOfY)
document.getElementById("min-return").textContent = `$${Math.round((ticker_max[0][1]*ticker_qty - ticker_inv[0]), 2)}`
document.getElementById('min-return_date').textContent = `Divestment Date: ${ticker_max[0][0]}`

//=====Min Investment values=====
const Actual_inv = data_ticker.dataset_data.data.filter(d => d[0] == inv_enddate ) 
document.getElementById("act-return").textContent = `$${Math.round((Actual_inv[0][1]*ticker_qty - ticker_inv[0]), 2)}`
document.getElementById('act-return_date').textContent = `Divestment Date: ${inv_enddate}`
// console.log(ticker_max[0][1])
// console.log(document.getElementById("max-return"))
// console.log(document.getElementById("max-return_date").textContent)
//var open_gold_recession = data_gold.dataset_data.data.filter(d => d[0] == open_recession)
//var close_gold_recession = data_gold.dataset_data.data.filter(d => d[0] == close_recession)
    });
  });
};



/*=================================================================
          ON CHANGE PROCESSING
===================================================================*/
function processSubmit_stress() {
  // console.log('test');

  //var ticker = document.getElementsByClassName('token-input-token')[0].innerText.split(",")replace('×', '').replace('\n', '').trim();
   var ticker = document.getElementsByClassName('token-input-token')[0].innerText.split(",")[0].trim()
  var daterange = document.getElementsByClassName('drp-selected')[0].innerText.split(" - ")
  var start_split_date = daterange[0].split("/")
  var startdate = `${start_split_date[2]}-${start_split_date[0]}-${start_split_date[1]}`

  var end_split_date = daterange[1].split("/")
  var enddate = `${end_split_date[2]}-${end_split_date[0]}-${end_split_date[1]}`

  var amount = document.getElementById('val-number').value
  console.log(amount)

  gold_stress(ticker, String(startdate), String(enddate), amount)
  // console.log(`ProcessSubmit is running`)
  Invest(ticker, String(startdate), String(enddate), amount)
  falling_stress(ticker, String(startdate), String(enddate), amount)
  rising_stress(ticker, String(startdate), String(enddate), amount)
  gain_stress(ticker, String(startdate), String(enddate), amount)


}

document.getElementById('submit').addEventListener('click', processSubmit_stress);

/* ACTIVATE CHARTS ON TABS */
// force a click
comparison_tab = document.getElementById('comparison-tab2');
evObj = document.createEvent('Events');
evObj.initEvent('click', true, false);
comparison_tab.dispatchEvent(evObj);

/*=================================================================
           ON CHANGE PROCESSING ---- ENDS
 ===================================================================*/






