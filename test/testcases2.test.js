import chai from 'chai'

import add from '../src/add.js'
import isArguments from '../src/isArguments.js'

const expect = chai.expect

// Tests a given function with given test cases.
//
// Parameters:
// f: function to be tested
// testCases: array consisting of the test cases
//
// Test case properties:
// name: test case name
// args: array consisting of parameters given to the function
// expected: expected return value
//
// The implementation of runTestCases is based on the example code in
//      https://mochajs.org/#dynamically-generating-tests
// mochajs.org has the following notice:
//      "mochajs.org is licensed under a Creative Commons Attribution 4.0 International License.
//      Copyright OpenJS Foundation and Mocha contributors. All rights reserved."
//
function runTestCases(f, testCases) {
  testCases.forEach(function(test) {
    it(test.name, function() {
      expect(f.apply(null, test.args)).to.deep.equal(test.expected);
    })
  });
}

//TODO: name: 'test_isArguments_argobjes'
describe('isArguments', () => {
  const testCases = [
    { name: 'test_isArguments_obj', args: [{}], expected: false}
  ];
  runTestCases(isArguments, testCases);  
})

