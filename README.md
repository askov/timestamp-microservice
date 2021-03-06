# Timestamp Microservice
Project built for [https://www.freecodecamp.org/challenges/timestamp-microservice](https://www.freecodecamp.org/challenges/timestamp-microservice)

User story:

- The API endpoint is `GET [project_url]/api/timestamp/:date_string?`.
- A date string is valid if can be successfully parsed by `new Date(date_string)`. Note that the unix timestamp needs to be an integer (not a string) specifying milliseconds. In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
- If the date string is empty it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
- If the date string is valid the api returns a JSON having the structure <br>`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }` e.g.<br>`{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.
- If the date string is invalid the api returns a JSON having the structure `{"error" : "Invalid Date" }`.




# Usage
## Setup
- `git clone https://github.com/askov/timestamp-microservice`
- `cd timestamp-microservice`
- `npm i`
- `npm dev`

With default settings you can reach app at http://localhost:3000

## Tests
- `npm test`

## Env
In order to have working hrefs, set HOST in .env

