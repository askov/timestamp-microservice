# Timestamp Microservice
Project built for [https://www.freecodecamp.org/challenges/timestamp-microservice](https://www.freecodecamp.org/challenges/timestamp-microservice)

User story:
- I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).
- If it does, it returns both the Unix timestamp and the natural language form of that date.
- If it does not contain a date or Unix timestamp, it returns null for those properties.

# Usage
## Setup
- git clone https://github.com/askov/timestamp-microservice
- cd timestamp-microservice
- npm install
- npm start

With default settings you can reach app with http://localhost:3000
## Examples
- http://localhost:3000/February%2023,%201917
- http://localhost:3000/897744444
