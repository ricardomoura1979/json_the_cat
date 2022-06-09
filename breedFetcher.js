// https://api.thecatapi.com/v1/breeds

const fetchBreedDescription = function(breedName, callback) {



// Write the logic in breedFetcher.js to fetch the Siberian data from the API endpoint using request.
const request = require("request");

//require the REQUEST library
request('https://api.thecatapi.com/v1/breeds/search?q=' + breedName, function (error, response, body) { 
  if (error) {
    console.log("Error Message");
  }

 //In order to scan this data like a JavaScript object, we need to convert the string version of it into an object first. As discussed in the JSON Reading earlier, this is called deserialization and we can do this by "parsing" the string. 
  const data = JSON.parse(body);
  let breed = data[0];
  if (breed) {
    console.log(breed)
    
  }else {
    console.log("Breed not found!")
  }
    
 });

};

module.exports = { fetchBreedDescription };