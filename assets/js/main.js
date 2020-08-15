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
//

function getCountryHolidays() {
    // get ISO code freom the User selection to input to api call
  let iscde = document.getElementById("countryForm").value;
let isoCode = iscde.slice(-2);
 //

 // https://www.youtube.com/watch?v=InoAIgBZIEA
 $.getJSON(baseURL + apk + countryFormat + isoCode + yearFormat + userSystemYear  + monthFormat + currentMonth + type, function(data) {
    console.log(data);
})
}
