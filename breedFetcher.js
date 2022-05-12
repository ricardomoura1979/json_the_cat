// https://api.thecatapi.com/v1/breeds
const breedName = process.argv.slice(2);
const request = require("request");

request('https://api.thecatapi.com/v1/breeds/search?q=' + breedName, function (error, response, body) {
  if (error) {
    console.log("Error Message");
  }
  const data = JSON.parse(body);
  let breed = data[0];
  if (breed) {
    console.log(breed)
    
  }else {
    console.log("Breed not found!")
  }
    
});

