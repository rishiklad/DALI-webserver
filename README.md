# DALI-webserver

## Project Overview
This is a backend webserver for a social media platform. It was created with the intention for data visualization, so many of the GET endpoints are oriented towards returning data calculated or aggregated over the entire dataset. It's worth noting that POST endpoints exist but can only be utilized with software like Postman; there is not currently an input form allowing users to add new members to the DALI dataset. Further note that the anonymous dataset was used and imported into seeds.js.

## Features
Note that all words in {brackets} are intended to be provided by the user as part of the GET request URL. Also know that {key} refers to something like a DALI member's "sleepPerNight" or "gender", while {arg} refers to that key's particular value, like "5" or "Male". 

**GET Routes**
1. Returns all existing DALI members 
2. Returns all members that have a {key} value greater than the {min}
3. Returns all members that have a {key} value greater than or equal to the {min}
4. Returns all members that have a {key} value less than the {max}
5. Returns all members that have a {key} value less than or equal to the {max}
6. Returns all members that have a {key} string value equal to the string {arg} 
7. Returns all members that have a {key} numerical value equal to the numerical {arg}
8. Returns all members that have a {key} value between the {min} and {max}
9. Returns the average value for the given {key}
10. Returns the total sum for the given {key} across all DALI members 
11. Returns the number of occurences for the given {key} and numerical {arg} pair across all DALI members  
12. Returns the number of occurences for the given {key} and string {arg} pair across all DALI members
13. Returns the most frequent value (mode) for the given {key}   

**POST Routes**
1. Directly input incoming request's body into the dataset
2. Directly add the {key}:{arg} pair to every DALI member 

## Warning
The {key} is case-sensitive! Make sure you enter "sleepPerNight", instead of "sleeppernight." Otherwise you will receive invalid data. 

## How To Run On Your Machine
1. First clone the project into a directory of your choice
2. Run `npm install` to ensure you have the proper dependencies. 
3. Then run `nodemon app.js` to get the server running at port 3000. 
4. Enter request URLs that align with GET/POST endpoints and enjoy! 

## How to POST Data
Use Postman: change the request type to POST and enter in the right request URL. Then, under the Body section, click on x-www-form-urlencoded and enter in various key:value pairs that align with your intent. Then click send -- you will receive a confirmation message in the request. 

