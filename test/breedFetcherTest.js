
×
Congrats on completing activity 'Cats as a Service'!
Testing Cats as a Service
Assignment
45 - 70 minutes
 Status
Incomplete
It's been a while since we've written tests using Mocha & Chai. Let's write some test code for our json_the_cat solution so that we can continue practicing this newly learned skill and continue building a habit for testing as well.

Refactoring
Before we can test our code, we should ideally have a function that we can call. Time to do some code refactoring.



Don't worry, we'll do it together.

First, let's think about what we'd like as an end result. What should our function look like?

Perhaps something like this?

const breedDescription = fetchBreedDescription('Siberian');
But wait ...

Question
There's something off (wrong) about this particular approach. What is it?

Your Answer
...
Correct Answer
The description is fetched via an API request, which is network I/O. We use request which uses good Node practice by fetching our results asynchronously. Therefore, our fetch function also needs to be asynchronous. It should therefore accept a callback. We talked about how asynchronous functions can't simply return data in the previous cat exercise.

Toggle Answer
It should instead be:

fetchBreedDescription('Siberian', (error, description) => {

});
The first (error) parameter will allow the caller to check and handle error situations easily.

Instruction
Create a file in our json_the_cat directory called index.js

This file will be the one that users can run and provide the breed name to. It will then require the breedFetcher file and call its exported function.

Illustration: flowchart of new structure

Instruction
Refactor the code in breedFetcher.js by moving the main request logic into a function named fetchBreedDescription.

const fetchBreedDescription = function(breedName, callback) {

};
This function should call the callback with either an error if there's a error or null if there isn't, for the first argument. The table below shows in more detail what to pass into callback for each of the two scenarios.

outcome	error value	description value
success	null	(the description from body)
failure	(the error we get from request)	null
Instruction
Export the function using module.

As we have before, use the following code to export the function:

module.exports = { fetchBreedDescription };
Instruction
Move our the process.argv related code into index.js.

Our index.js file should require breedFetcher and call it, like this:

// index.js
const { fetchBreedDescription } = require('./breedFetcher');

const breedName = process.argv[2];

fetchBreedDescription(breedName, (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  }
});
Warning
By the end of the refactoring, there should be no remaining calls using console.log in our fetchBreedDescription function. All of the user-facing (terminal output) logic should be in the index.js file, and our fetchBreedDescription should simply be returning the description (or an error) via the provided callback.

Instruction
Run the index.js file from command line and ensure that our app continues to work for the user, as it did in the previous exercise;

Refactoring complete!

It's worth calling out something interesting that's happening here. In writing unit tests for our code, we are being forced to think about and improve its modularity and interface.

Note
Writing unit tests will almost always tend to improve the quality of the code being tested.

This is yet another reason to write tests for our code!

Good Time To Lint
Having modified our code fairly heavily, now is a good time to run ESLint to make sure that we've written it well.

Instruction
Lint both files, fixing any warnings and errors.

eslint index.js breedFetcher.js
M&C Setup
Now that our main fetch function is separated out into its own module and function, we can write a unit test for it. We will not be testing index.js, only the function exported by breedFetcher.js.

Instruction
Install Mocha and Chai

npm install mocha chai --save-dev
Instruction
Create a test directory, and the breedFetcherTest.js file within it.

mkdir test
touch test/breedFetcherTest.js
Instruction
Run mocha to make sure it's working, though it will find "0 examples".

npx mocha
You may notice that this command is not how we've run Mocha before.

Note
npx is a fancier, more modern way of running installed packages like mocha, compared to what we've done before.

You don't have to worry too much about how it works at this very moment, but in case you're curious, here's a quick read about npx.

Writing Test Code
Instruction
In our breedFetcherTest file, let's add in a basic test:

// breedFetcherTest.js

const { fetchBreedDescription } = require('../breedFetcher');
const { assert } = require('chai');

describe('fetchBreedDescription', () => {
  it('returns a string description for a valid breed, via callback', (done) => {
    fetchBreedDescription('Siberian', (err, desc) => {
      // we expect no error for this scenario
      assert.equal(err, null);

      const expectedDesc = "The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors.";

      // compare returned description
      assert.equal(expectedDesc, desc.trim());

      done();
    });
  });
});