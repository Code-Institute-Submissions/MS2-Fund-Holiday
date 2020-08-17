const baseURL = "https://calendarific.com/api/v2/holidays?";
const countryFormat = "&country=";
const yearFormat = "&year=";
const monthFormat = "&month=";
const type = "&type=national";

//https://www.javascriptobfuscator.com/Javascript-Obfuscator.aspx
//suggestion from anna_ci chat thread of Nov 5th 2019. different site used. Api Key
let _0x90dd = [
    "\x61\x70\x69\x5F\x6B\x65\x79\x3D\x66\x33\x37\x36\x65\x61\x61\x61\x35\x36\x62\x31\x34\x33\x32\x35\x34\x39\x32\x36\x65\x31\x61\x65\x61\x63\x66\x62\x64\x65\x63\x31\x65\x32\x34\x37\x30\x66\x35\x30",
];
const apk = _0x90dd;
//

// Code adapted from https://www.w3schools.com/js/js_date_methods.asp
let userSystemDate = new Date();
let userSystemYear = userSystemDate.getFullYear();
let userSystemMonth = userSystemDate.getMonth();
//

// required to convert system dates to dates for api calls. August returns 7 from the system, 8 is required to request August holidays from api.
let currentMonth = userSystemMonth + 1;
let nextYear = userSystemYear + 1;
let nextMonth;

// if current month is November the next month is December. If the current Month is December the next month is January.
if (currentMonth < 12) {
    nextMonth = currentMonth + 1;
} else {
    nextMonth = currentMonth - 11;
}

function getCountryHolidays() {
    // clear the table down for new country api call
    // adapted from: https://stackoverflow.com/questions/7271490/delete-all-rows-in-an-html-table#:~:text=getElementById(%22yourID%22).,id%20at%20table%20level%20i.e.&text=If%20you%20do%20not%20want,inside%2C%20this%20is%20working%20perfectly.
    let clearTable = document.getElementById("tdata");
    while (clearTable.rows.length > 0) {
        clearTable.deleteRow(0);
    }


    // get ISO code freom the User selection to input to api call
    let iscde = document.getElementById("countryForm").value;
    let isoCode = iscde.slice(-2);

    // https://www.youtube.com/watch?v=InoAIgBZIEA
    //https://www.youtube.com/watch?v=kJTAXn_xmjo
    $.getJSON(baseURL + apk + countryFormat + isoCode + yearFormat + userSystemYear + monthFormat + currentMonth + type, function (data) {
        //q is a counter variable. If there is a holiday it will increment by 1. If it's zero after the api call user will get a message that there are no holidays for the month in the table.
        let q = 0;
        console.log(data);
        // run through the reurned array and add each holiday to the table.
        for (let i in data.response.holidays) {
            console.log(data.response.holidays[i]);
            let name = data.response.holidays[i].country.name;
            let date = data.response.holidays[i].date.iso;
            let description = data.response.holidays[i].name;

            $("#tdata").append("<tr>" +
                "<td>" + name + "</td>" +
                "<td>" + date + "</td>" +
                "<td>" + description + "</td>"
                + "</tr>");
            if (document.getElementById("tdata") == " ") {

            } else {
                q = q + 1;
                console.log(q);
            }
        }
        console.log(q);
        if (q < 1) {
            $("#tdata").append("<tr>" +
                "<td>" + iscde + "</td>" +

                "<td>" + "No holidays for month " + currentMonth + "</td>"
                + "</tr>");
        }



    })

    // get next month if it's in the current year else January of the the following year

    if (currentMonth < 12) {
        q = 0;
        $.getJSON(baseURL + apk + countryFormat + isoCode + yearFormat + userSystemYear + monthFormat + nextMonth + type, function (data) {

            for (let i in data.response.holidays) {
                console.log(data.response.holidays[i]);
                let name = data.response.holidays[i].country.name;
                let date = data.response.holidays[i].date.iso;
                let description = data.response.holidays[i].name;

                $("#tdata").append("<tr>" +
                    "<td>" + name + "</td>" +
                    "<td>" + date + "</td>" +
                    "<td>" + description + "</td>"
                    + "</tr>");

                if (document.getElementById("tdata") == " ") {

                } else {
                    q = q + 1;
                    console.log(q);
                }
            }
            console.log(q);
            if (q < 1) {
                $("#tdata").append("<tr>" +
                    "<td>" + iscde + "</td>" +

                    "<td>" + "No holidays for month " + nextMonth + "</td>"
                    + "</tr>");
            }
        })



    } else {

        $.getJSON(baseURL + apk + countryFormat + isoCode + yearFormat + nextYear + monthFormat + nextMonth + type, function (data) {
            q = 0;
            for (let i in data.response.holidays) {
                console.log(data.response.holidays[i]);
                let name = data.response.holidays[i].country.name;
                let date = data.response.holidays[i].date.iso;
                let description = data.response.holidays[i].name;

                $("#tdata").append("<tr>" +
                    "<td>" + name + "</td>" +
                    "<td>" + date + "</td>" +
                    "<td>" + description + "</td>"
                    + "</tr>");

                if (document.getElementById("tdata") == " ") {

                } else {
                    q = q + 1;
                    console.log(q);

                }
            }
        })
        console.log(q);
        if (q < 1) {
            $("#tdata").append("<tr>" +
                "<td>" + iscde + "</td>" +

                "<td>" + "No holidays for month " + nextMonth + "</td>"
                + "</tr>");
        }



    }
    /*if (document.getElementsByTagName("td").length > 0) {
        console.log("boo")
    } else {
        console.log(document.getElementsByTagName("td").length);
    }*/


}


function getAnnualCountryHolidays() {
    // clear the table down for new country api call
    // adapted from: https://stackoverflow.com/questions/7271490/delete-all-rows-in-an-html-table#:~:text=getElementById(%22yourID%22).,id%20at%20table%20level%20i.e.&text=If%20you%20do%20not%20want,inside%2C%20this%20is%20working%20perfectly.
    let clearTable = document.getElementById("annualTData");
    while (clearTable.rows.length > 0) {
        clearTable.deleteRow(0);
    }
    let iscde = " ";
    let isoCode = " ";


    // get ISO code freom the User selection to input to api call
    iscde = document.getElementById("annualCountryForm").value;
    isoCode = iscde.slice(-2);

    let year = document.getElementById("years").value;

    if (iscde === "Choose Country" || year === "Choose Year") {
        return window.alert("Please choose both country and year.")
    } else {

    }


    // https://www.youtube.com/watch?v=InoAIgBZIEA
    //https://www.youtube.com/watch?v=kJTAXn_xmjo
    $.getJSON(baseURL + apk + countryFormat + isoCode + yearFormat + year + type, function (data) {
        console.log(data);
        // run through the reurned array and add each holiday to the table.
        for (let i in data.response.holidays) {
            console.log(data.response.holidays[i]);
            let name = data.response.holidays[i].country.name;
            let date = data.response.holidays[i].date.iso;
            let description = data.response.holidays[i].name;

            $("#annualTData").append("<tr>" +
                "<td>" + name + "</td>" +
                "<td>" + date + "</td>" +
                "<td>" + description + "</td>"
                + "</tr>");
        }
    });
}

//watchlist
function watchlistFunction() {
    let clearTable = document.getElementById("tdata");
    while (clearTable.rows.length > 0) {
        clearTable.deleteRow(0);
    }

    let watchlist = [];
    let watchlistArray = [];

    // https://stackoverflow.com/questions/3243476/how-to-get-multiple-select-box-values-using-jquery
    watchlist = $('#watchlistForm').val();

    //extract the Iso codes from the users selections
    for (let m = 0; m < watchlist.length; m++) {
        watchlistArray[m] = watchlist[m].slice(-2);
    }

    for (let z = 0; z < watchlistArray.length; z++) {
        $.getJSON(baseURL + apk + countryFormat + watchlistArray[z] + yearFormat + userSystemYear + monthFormat + currentMonth + type, function (data) {
            console.log(data);
//q is a counter variable. If there is a holiday it will increment by 1. If it's zero after the api call user will get a message that there are no holidays for the month in the table.
        let q = 0;

            for (let i in data.response.holidays) {
                console.log(data.response.holidays[i]);
                let name = data.response.holidays[i].country.name;
                let date = data.response.holidays[i].date.iso;
                let description = data.response.holidays[i].name;
switch (name){
    case "Ireland":
        noOfFunds = irishFunds.length;
        break;
    case "Japan":
        noOfFunds = japanFunds.length;
        break;
    case "United States":
        noOfFunds = usFunds.length;
        break;    
    case "United Kingdom":
        noOfFunds = ukFunds.length;
        break;    
    default:
        noOfFunds = 0;
}




                $("#tdata").append("<tr>" +
                    "<td>" + name + "</td>" +
                    "<td>" + date + "</td>" +
                    "<td>" + description + "</td>"+
"<td>" + noOfFunds + "</td>"
                    + "</tr>");
                if (document.getElementById("tdata") == " ") {

                } else {
                    q = q + 1;
                }
            }
            if (q < 1) {
                $("#tdata").append("<tr>" +
                    "<td>" + watchlist[z] + "</td>" +

                    "<td>" + "No holidays for " + thisMonthsName() + "</td>"
                    + "</tr>");
            }
        })

        if (currentMonth < 12) {
            $.getJSON(baseURL + apk + countryFormat + watchlistArray[z] + yearFormat + userSystemYear + monthFormat + nextMonth + type, function (data) {
                 q = 0;
                for (let i in data.response.holidays) {
                    console.log(data.response.holidays[i]);
                    let name = data.response.holidays[i].country.name;
                    let date = data.response.holidays[i].date.iso;
                    let description = data.response.holidays[i].name;

                    switch (name){
    case "Ireland":
        noOfFunds = irishFunds.length;
        break;
    case "Japan":
        noOfFunds = japanFunds.length;
        break;
    case "United States":
        noOfFunds = usFunds.length;
        break;    
    case "United Kingdom":
        noOfFunds = ukFunds.length;
        break;    
    default:
        noOfFunds = 0;
}






                    $("#tdata").append("<tr>" +
                        "<td>" + name + "</td>" +
                        "<td>" + date + "</td>" +
                        "<td>" + description + "</td>"+
                        "<td>" + noOfFunds + "</td>"
                        + "</tr>");
                    if (document.getElementById("tdata") == " ") {

                    } else {
                        q = q + 1;
                        
                    }
                }
                if (q < 1) {
                    $("#tdata").append("<tr>" +
                        "<td>" + watchlist[z] + "</td>" +

                        "<td>" + "No holidays for " + nextMonthName() + "</td>"
                        + "</tr>");
                }


            })
        } else {
            $.getJSON(baseURL + apk + countryFormat + watchlistArray[z] + yearFormat + nextYear + monthFormat + nextMonth + type, function (data) {
                 q = 0;
                for (let i in data.response.holidays) {
                    console.log(data.response.holidays[i]);
                    let name = data.response.holidays[i].country.name;
                    let date = data.response.holidays[i].date.iso;
                    let description = data.response.holidays[i].name;
                    
                    switch (name){
    case "Ireland":
        noOfFunds = irishFunds.length;
        break;
    case "Japan":
        noOfFunds = japanFunds.length;
        break;
    case "United States":
        noOfFunds = usFunds.length;
        break;    
    case "United Kingdom":
        noOfFunds = ukFunds.length;
        break;    
    default:
        noOfFunds = 0;
}


                    $("#tdata").append("<tr>" +
                        "<td>" + name + "</td>" +
                        "<td>" + date + "</td>" +
                        "<td>" + description + "</td>"+
"<td>" + noOfFunds + "</td>"
                        + "</tr>");

                    if (document.getElementById("tdata") == " ") {

                    } else {
                        q = q + 1;
                        ;

                    }



                }
                if (q < 1) {
                    $("#tdata").append("<tr>" +
                        "<td>" + watchlist[z] + "</td>" +

                        "<td>" + "No holidays for " + + nextMonthName() + "</td>"
                        + "</tr>");

                }
                })

        }
    }
}

// code adapted from W3 schools. https://www.w3schools.com/jsref/jsref_getmonth.asp
function thisMonthsName(mnth) {
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  mnth = userSystemMonth
  var n = month[mnth];
  return n;
}

// code adapted from W3 schools. https://www.w3schools.com/jsref/jsref_getmonth.asp
function nextMonthName(nxtMnth) {
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

if (userSystemMonth < 11) {
  nxtMnth = userSystemMonth + 1;
} else {
    nxtMnth = userSystemMonth - 11;
}
  var n = month[nxtMnth];
  
  return n;
  
}

let irishFunds = ["Eur Equity", "ABC Bio Technology", "ABC Blue Chip", "ABC Small Cap"];

let usFunds = ["US Equity", "DEF Bio Technology", "Argideen Blue Chip", "XYZ Small Cap", "US Large Cap"];

let ukFunds = ["UK Equity", "UK Bio Technology", "UK Blue Chip"];

let japanFunds= ["Japan Equity", "Japan Bio Technology", "ABC Blue Chip", "ABC Small Cap", "LU Eur Equity", " LU ABC Bio Technology", "LU ABC Blue Chip", "LU ABC Small Cap"];

//Polygon Funds
function polygonFunction() {

    let clearTable = document.getElementById("tdata");
    while (clearTable.rows.length > 0) {
        clearTable.deleteRow(0);
    }

    let polygonFunds = ["IE", "GB", "US", "JP"];
    let polygonFundsCountries = ["Ireland", "United Kingdom", "United States", "Japan"];

    for (let z = 0; z < polygonFunds.length; z++) {

        $.getJSON(baseURL + apk + countryFormat + polygonFunds[z] + yearFormat + userSystemYear + monthFormat + currentMonth + type, function (data) {
            console.log(data);
            //q is a counter variable. If there is a holiday it will increment by 1. If it's zero after the api call user will get a message that there are no holidays for the month in the table.
            let q = 0;

            for (let i in data.response.holidays) {
                console.log(data.response.holidays[i]);
                let name = data.response.holidays[i].country.name;
                let date = data.response.holidays[i].date.iso;
                let description = data.response.holidays[i].name;

switch (name){
    case "Ireland":
        noOfFunds = irishFunds.length;
        break;
    case "Japan":
        noOfFunds = japanFunds.length;
        break;
    case "United States":
        noOfFunds = usFunds.length;
        break;    
    case "United Kingdom":
        noOfFunds = ukFunds.length;
        break;    
    default:
        noOfFunds = 0;
}



                $("#tdata").append("<tr>" +
                    "<td>" + name + "</td>" +
                    "<td>" + date + "</td>" +
                    "<td>" + description + "</td>" +
                    "<td>" + noOfFunds + "</td>" 
                    + "</tr>");
                if (document.getElementById("tdata") == " ") {

                } else {
                    q = q + 1;
                }
            }
            if (q < 1) {
                $("#tdata").append("<tr>" +
                    "<td>" + polygonFundsCountries[z] + "</td>" +
                    "<td>" + " - " + "</td>" +
                    "<td>" + "No holidays for " + thisMonthsName() + "</td>"
                    + "</tr>");
            }
        })

        if (currentMonth < 12) {
            $.getJSON(baseURL + apk + countryFormat + polygonFunds[z] + yearFormat + userSystemYear + monthFormat + nextMonth + type, function (data) {
                q = 0;
                for (let i in data.response.holidays) {
                    console.log(data.response.holidays[i]);
                    let name = data.response.holidays[i].country.name;
                    let date = data.response.holidays[i].date.iso;
                    let description = data.response.holidays[i].name;

switch (name){
    case "Ireland":
        noOfFunds = irishFunds.length;
        break;
    case "Japan":
        noOfFunds = japanFunds.length;
        break;
    case "United States":
        noOfFunds = usFunds.length;
        break;    
    case "United Kingdom":
        noOfFunds = ukFunds.length;
        break;    
    default:
        noOfFunds = 0;
}

                    $("#tdata").append("<tr>" +
                        "<td>" + name + "</td>" +
                        "<td>" + date + "</td>" +
                        "<td>" + description + "</td>"+
"<td>" + noOfFunds + "</td>" 
                        + "</tr>");
                    if (document.getElementById("tdata") == " ") {

                    } else {
                        q = q + 1;

                    }
                }
                if (q < 1) {
                    $("#tdata").append("<tr>" +
                        "<td>" + polygonFundsCountries[z] + "</td>" +
                        "<td>" + " - " + "</td>" +
                        "<td>" + "No holidays for " + nextMonthName() + "</td>"
                        + "</tr>");
                }


            })
        } else {
            $.getJSON(baseURL + apk + countryFormat + polygonFunds[z] + yearFormat + nextYear + monthFormat + nextMonth + type, function (data) {
                q = 0;
                for (let i in data.response.holidays) {
                    console.log(data.response.holidays[i]);
                    let name = data.response.holidays[i].country.name;
                    let date = data.response.holidays[i].date.iso;
                    let description = data.response.holidays[i].name;
                    
if(name==="Ireland"){
 noOfFunds = irishFunds.length;
} else if (name === "Japan"){
    noOfFunds = japanFunds.length;
} else if (name === "United States"){
    noOfFunds = usFunds.length;
} else if (name === "United Kingdom"){
    noOfFunds = ukFunds.length;
} else {
    noOfFunds = 0;
}


                    $("#tdata").append("<tr>" +
                        "<td>" + name + "</td>" +
                        "<td>" + date + "</td>" +
                        "<td>" + description + "</td>" +
                        "<td>" + noOfFunds + "</td>" 
                        + "</tr>");

                    if (document.getElementById("tdata") == " ") {

                    } else {
                        q = q + 1;
                        ;

                    }



                }
                if (q < 1) {
                    $("#tdata").append("<tr>" +
                        "<td>" + polygonFundsCountries[z] + "</td>" +
                        "<td>" + " - " + "</td>" +
                        "<td>" + "No holidays for " + + nextMonthName() + "</td>"
                        + "</tr>");

                }

                
    })


            


        }}}