<img src="https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png" style="margin: 0;">

# Polygon FA
Polygon FA is a fictional Fund Accounting group within a large Fund Accounting department of an international administrator.
Fund Accounting is the process of calculating a NAV (Net Asset Value) per share for an Investment Fund and publishing that price in the financial markets.
The aim of this site is to streamline the processes around fund holidays which cause significant issues and take signicant unnecessary time in my experience.
This site will reduce the time spent validating holidays throughout the year from hours to minutes when holidays occur. 
Please see user stories below for specific issues.



### User Stories

### FA Team Leader
As a user I need to ensure fund holidays holidays are monitored weekly.
I need to ensure my team removes funds that are on holidays from any automated processed for example the publishing of daily NAVs on vendors like Bloomberg and Reuters amongst many more.
Publishing NAVs in error on a holiday will mean we have to contact each vendor and request them to remove the prices manually. This can take weeks in some cases with clients and investors getting ever more irate.
I need to ensure we publish on every day that we are supposed to. For example I have experienced a situation where staff had to recalled at 7 pm to work until the early hours to produce NAVs we had incorrectly flagged as holidays.
I would like to see holidays for the current month and next month so I can seek client clarification on any situation that requires it.
2 months are required as most funds are daily but some funds are weekly or monthly and can be due to be released on business day 10 or business day 16 for example.
The following month is required in the event that there are 2 holidays straddling the month eg the 31st of this month and the 1st of the following month. In those cases we will need to remove funds from automated processes for more than the usual 1 day.
I need to ensure that all funds that follow particular holidays are tracked, that any new fund launches are added and any liquidations removed.
Currently the information is accquired from Google in the outsourced location and the Home Location then verifies it to google country by country and fund by fund every holiday.

###  Head of FA
As a user I would like a quick and easy way to validate Japanes holidays as I have given assurances to a Japanese client that we will stop forgetting their holidays.
This also causes internal issues with different department like security pricing who lose significant time when things that should price automaticaaly don't and when things price that shouldn't have.
I would like to see my teams improve their processes around holidays, move away from manually searching to eradicate unnecessary, preventable issues and spend the saved time on more value added activities.

### Relationship Manager
Part of my job is to agree annual fund calendars for the upcoming year with clients. To achieve it I use a combination of Bloomberg, google and the relevant government websites to arrive at the official public holidays.
I have to disregard some days like religious holidays that show up in various countries so this can take significant time.
As a user I would like to get the National public holidays per country per year at the click of button.

## Testing
. Added and removed a colour to body background and console.log to ensure CSS and JS files linked correctly.
. Added variables to read the users current date and time. 3 Console.logs() processed. 
    console.log(userSystemDate); returned - Sat Aug 15 2020 17:21:04 GMT+0100 (Irish Standard Time) - as expected.
    console.log(userSystemYear); returned - 2020 as expected.
    console.log(userSystemMonth); returned 7 - as expected.
. Added variables to convert the users current date and time to format required for api calls. 2 Console.logs() processed.
    console.log(currentMonth); returned 8 - as expected.
    console.log(nextYear); returned - 2021 as expected.
. Added variables and an "if statement" to establish what next month is for the api call.
    Changed current month to userSystemMonth + 4.
    Console.log(nextMonth) returned 12 as expected.
    Changed current month to userSystemMonth + 5.
    Console.log(nextMonth) returned 1 as expected.
. Changed currentMonth back to userSystem Month + 1.
    console.log(currentMonth); returned 8 as expected
    console.log(nextMonth); returned 9 as expected.
    console.log(userSystemYear); returned 2020 as expected.
    console.log(nextYear); returned 2021 as expected.
. Selected various countries from form. Showing as expected.  
. Added getCountryHolidaysFunction. Checked that console.log(isoCode); returned the last 2 letters which it does.  
    However if the user makes multiple choices without refreshing the page the new selection just keeps getting added on.
    Previous selections need to be cleared first.
    Also the default option of "Choose Country" is returning "ry."
    Having completed more country selections the functiona ppears to be woring as expected. To be tested further when API calls are made.
. Added $.getJSON function to make API call. Didn't work.
    Jquery link in index file updated.
    Calls made for Anguilla, Antigua and Cyprus. Console successfully showing holidays from Calendarific. Previous selection is not showing.
    "RY", the last 2 letters in "Choose Country" is not showing.    
. Checked table headings are showing on the page after adding Bootstrap temple. Performing as expected. Formatting to be updated post logic.
. Added Loop to add all the current months holidays to the table. Ireland returning August 3rd as expected.
    3 holidays for Anguilla adding on to Ireland making 4 rows in table.
    Function to be amended to clear down the table before adding the new country.
. Added function to clear the table down before calling new country.
    Ireland showing August 3rd as expected.
    When Anguilla is now selected Ireland is cleared with only holidays for Anguila showing.
    Multiple countries selected with results as expected.
    The table appears blank when there are no holidays. User should be informed there are no holidays rather than blank.  
. Issue resolved. Where there is no holliday the user will now get a message advising no holidays for the country in question.
    Tested multiple countries.
. Added code to get the following months holidays if in the current year and the next year if the following month is January. 2 issues detected.
    . the following month sometimes comes back before the current month and therefore is appearing before the current month on the table.
    . The message added previously to advise of no holidays in the current month to be revised and shown only if no holidays in both months.   
    . Both issues added to wishlist.
. Added annual calendar page with button to run script.
    . Tested that the function - getAnnualCountryHolidays() gets the annual calendar for the current year and clears the old date from the table before running.
. Added the requirement that the user chooses the year the calendar is required for.
    Tested for a number of countries for different years ran and cleared the table down when running again.
    User should be notified of the requirement to choose both county and year before clicking the button.
. Added an if statement to annual calendar to inform the user that both country and year must be selected to get the calendar.
    Tested when both are not selected. - Message appeared as expected.
    Tested when only country is selected. - Message appeared as expected.   
    Tested when only year is selected. - Message appeared as expected.
    Issue detected. When one or other or both of year or country is missed the warning is given. The warning will appear again when corrected but the calendar will still run.
    Issue resolved. Else added to the if statement to do nothing if the statement is false. When both are selected afetr an initial error the message will not now appear twice.

## Deployment

To deploy this page to GitHub Pages from it's Github repository the following steps were taken: 

1. From the menu items near the top of the page, select **Settings**.
2. Scroll down to the **GitHub Pages** section.
3. Under **Source** click the drop-down menu labelled **None** and select **Branch: master**
4. On selecting  Branch: master click "Save". The page is automatically refreshed, the website is now deployed. 
5. Scroll back down to the **GitHub Pages** section to retrieve the link to the deployed website.
6. Your site is ready to be published at https://gerd113.github.io/MS2-Fund-Holiday/.

 




