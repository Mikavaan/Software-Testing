import chai from 'chai'

import isArguments from '../src/isArguments.js'
import isArrayLike from '../src/isArrayLike.js'
import isArrayLikeObject from '../src/isArrayLikeObject.js'
import isBoolean from '../src/isBoolean.js'
import isBuffer from '../src/isBuffer.js'
import isDate from '../src/isDate.js'
import isEmpty from '../src/isEmpty.js'
import isLength from '../src/isLength.js'
import isObject from '../src/isObject.js'
import isObjectLike from '../src/isObjectLike.js'
import isSymbol from '../src/isSymbol.js'
import isTypedArray from '../src/isTypedArray.js'
import keys from '../src/keys.js'
import map from '../src/map.js'
import slice from '../src/slice.js'
import toFinite from '../src/toFinite.js'
import toInteger from '../src/toInteger.js'
import toNumber from '../src/toNumber.js'
import toString from '../src/toString.js'
import upperFirst from '../src/upperFirst.js'
import words from '../src/words.js'

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

function auxForIsArguments(a, b) {
  return isArguments(arguments)
  }

  describe('isArguments', () => {
    it('test_isArguments_argobjes', function() {
      expect(auxForIsArguments(1, 2)).to.equal(true);
    })

    const testCases = [
    { name: 'test_isArguments_obj', args: [{}], expected: false},
    { name: 'test_isArguments_null', args: [null], expected: false},
    { name: 'test_isArguments_undef', args: [undefined], expected: false}
  ];
  runTestCases(isArguments, testCases);
})

describe('isArrayLike', () => {
  const testCases = [
    { name: 'test_isArrayLike_num', args: [3], expected: false},
    { name: 'test_isArrayLike_str', args: ["sana"], expected: true},
    { name: 'test_isArrayLike_bool', args: [true], expected: false},
    { name: 'test_isArrayLike_sym', args: [Symbol()], expected: false},
    { name: 'test_isArrayLike_obj', args: [{}], expected: false}, // Expected result differs form test plan. Typo in the plan.
    { name: 'test_isArrayLike_arr', args: [[1,2,3]], expected: true},
    { name: 'test_isArrayLike_fun', args: [function(){return 7}], expected: false},
    { name: 'test_isArrayLike_null', args: [null], expected: false},
    { name: 'test_isArrayLike_undef', args: [undefined], expected: false}
  ];
  runTestCases(isArrayLike, testCases);
})

describe('isArrayLikeObject', () => {
  const testCases = [
    { name: 'test_isArrayLikeObject_arr', args: [[1, 2, 3]], expected: true},
    { name: 'test_isArrayLikeObject_str', args: ["sana"], expected: false}
  ];
  runTestCases(isArrayLikeObject, testCases);  
}) 

describe('isBoolean', () => {
  const testCases = [
    { name: 'test_isBoolean_t', args: [true], expected: true},
    { name: 'test_isBoolean_f', args: [false], expected: true},
    { name: 'test_isBoolean_num', args: [7], expected: false}
  ];
  runTestCases(isBoolean, testCases);  
})

describe('isBuffer', () => {
  const testCases = [
    { name: 'test_isBuffer_buf', args: [new Buffer(2)], expected: true},
    { name: 'test_isBuffer_num', args: [3], expected: false},
    { name: 'test_isBuffer_str', args: ["sana"], expected: false},
    { name: 'test_isBuffer_bool', args: [true], expected: false},
    { name: 'test_isBuffer_sym', args: [Symbol()], expected: false},
    { name: 'test_isBuffer_obj', args: [{}], expected: false},
    { name: 'test_isBuffer_arr', args: [[1, 2, 3]], expected: false},
    { name: 'test_isBuffer_typearr', args: [new Int16Array], expected: false},
    { name: 'test_isBuffer_fun', args: [function() { return 7 }], expected: false},
    { name: 'test_isBuffer_null', args: [null], expected: false},
    { name: 'test_isBuffer_undef', args: [undefined], expected: false},
    { name: 'test_isBuffer_buf_modern', args: [Buffer.alloc(2)], expected: true}
  ];
  runTestCases(isBuffer, testCases);
})

describe('isDate', () => {
  const testCases = [
    { name: 'test_isDate_date', args: [new Date], expected: true},
    { name: 'test_isDate_num', args: [7], expected: false},
  ];
  runTestCases(isDate, testCases);  
})

describe('isEmpty', () => {
  const testCases = [
    { name: 'test_isEmpty_null', args: [null], expected: true},
    { name: 'test_isEmpty_arr', args: [[1, 2, 3]], expected: false},
    { name: 'test_isEmpty_emp_arr', args: [[]], expected: true},
    { name: 'test_isEmpty_str', args: ["a"], expected: false},
    { name: 'test_isEmpty_emp_str', args: [""], expected: true},
    { name: 'test_isEmpty_obj', args: [{'a':1}], expected: false},
    { name: 'test_isEmpty_emp_obj', args: [{}], expected: true},
    { name: 'test_isEmpty_typearr', args: [new Int16Array([1])], expected: false},
    { name: 'test_isEmpty_emp_typearr', args: [new Int16Array], expected: true},
    { name: 'test_isEmpty_map', args: [new Map([["k1", "v1"]])], expected: false},
    { name: 'test_isEmpty_emp_map', args: [new Map()], expected: true},
    { name: 'test_isEmpty_set', args: [new Set(["eka"])], expected: false},
    { name: 'test_isEmpty_emp_set', args: [new Set()], expected: true},
    { name: 'test_isEmpty_buf', args: [new Buffer(2)], expected: false},
    { name: 'test_isEmpty_emp_buf', args: [new Buffer(0)], expected: true},
    { name: 'test_isEmpty_num', args: [3], expected: true},
    { name: 'test_isEmpty_bool', args: [true], expected: true},
    { name: 'test_isEmpty_sym', args: [Symbol()], expected: true},
    { name: 'test_isEmpty_undef', args: [undefined], expected: true}
  ];
  runTestCases(isEmpty, testCases);  
})

describe('isLength', () => {
  const testCases = [
    { name: 'test_isLength_max', args: [Number.MAX_SAFE_INTEGER], expected: true},
    { name: 'test_isLength_max_plus', args: [Number.MAX_SAFE_INTEGER + 1], expected: false},
    { name: 'test_isLength_min', args: [0], expected: true},
    { name: 'test_isLength_min_minus', args: [-1], expected: false},
    { name: 'test_isLength_des', args: [3.333], expected: false}
  ];
  runTestCases(isLength, testCases);  
})

describe('isObject', () => {
  const testCases = [
    { name: 'test_isObject_num', args: [3], expected: false},
    { name: 'test_isObject_str', args: ["sana"], expected: false},
    { name: 'test_isObject_bool', args: [true], expected: false},
    { name: 'test_isObject_sym', args: [Symbol()], expected: false},
    { name: 'test_isObject_obj', args: [{}], expected: true},
    { name: 'test_isObject_arr', args: [[1, 2, 3]], expected: true},
    { name: 'test_isObject_typearr', args: [new Int16Array], expected: true},
    { name: 'test_isObject_fun', args: [function() { return 7 }], expected: true},
    { name: 'test_isObject_null', args: [null], expected: false},
    { name: 'test_isObject_undef', args: [undefined], expected: false}
  ];
  runTestCases(isObject, testCases);  
})

describe('isObjectLike', () => {
  const testCases = [
    { name: 'test_isObjectLike_num', args: [3], expected: false},
    { name: 'test_isObjectLike_str', args: ["sana"], expected: false},
    { name: 'test_isObjectLike_bool', args: [true], expected: false},
    { name: 'test_isObjectLike_sym', args: [Symbol()], expected: false},
    { name: 'test_isObjectLike_arr', args: [[1, 2, 3]], expected: true},
    { name: 'test_isObjectLike_fun', args: [function() { return 7 }], expected: false},
    { name: 'test_isObjectLike_null', args: [null], expected: false},
    { name: 'test_isObjectLike_undef', args: [undefined], expected: false}
  ];
  runTestCases(isObjectLike, testCases);  
})

describe('isSymbol', () => {
  const testCases = [
    { name: 'test_isSymbol_num', args: [3], expected: false},
    { name: 'test_isSymbol_str', args: ["sana"], expected: false},
    { name: 'test_isSymbol_bool', args: [true], expected: false},
    { name: 'test_isSymbol_sym', args: [Symbol()], expected: true},
    { name: 'test_isSymbol_arr', args: [[1, 2, 3]], expected: false},
    { name: 'test_isSymbol_fun', args: [function() { return 7 }], expected: false},
    { name: 'test_isSymbol_null', args: [null], expected: false},
    { name: 'test_isSymbol_undef', args: [undefined], expected: false}
  ];
  runTestCases(isSymbol, testCases);  
})

describe('isTypedArray', () => {
  const testCases = [
    { name: 'test_isTypedArray_Int8Array', args: [new Int8Array], expected: true},
    { name: 'test_isTypedArray_Int16Array', args: [new Int16Array], expected: true},
    { name: 'test_isTypedArray_Int32Array', args: [new Int32Array], expected: true},
    { name: 'test_isTypedArray_Uint16Array', args: [new Uint16Array], expected: true},
    { name: 'test_isTypedArray_Uint8ClampedArray', args: [new Uint8ClampedArray], expected: true},
    { name: 'test_isTypedArray_Float32Array', args: [new Float32Array], expected: true},
    { name: 'test_isTypedArray_Float64Array', args: [new Float64Array], expected: true},
    { name: 'test_isTypedArray_arr', args: [[1, 2, 3]], expected: false},
    { name: 'test_isTypedArray_null', args: [null], expected: false},
    { name: 'test_isTypedArray_undef', args: [undefined], expected: false}
  ];
  runTestCases(isTypedArray, testCases);  
})

describe('keys', () => {
  const testCases = [
    { name: 'test_keys_obj', args: [{'aa':1, 'bb':2}], expected: ['aa', 'bb']},
    { name: 'test_keys_str', args: ["abc"], expected: ['0', '1' ,'2']},
    { name: 'test_keys_null', args: [null], expected: []},
    { name: 'test_keys_undef', args: [undefined], expected: []}
  ];
  runTestCases(keys, testCases);  
})

describe('map', () => {
  const testCases = [
    { name: 'test_map_norm', args: [[4, 8], function(n) {return n * n}], expected: [16, 64]},
    { name: 'test_map_empty', args: [[], function(n) {return n * n}], expected: []},
    { name: 'test_map_2par_fun', args: [[1, 2], function(n, m) {return n + m}], expected: [1, 3]},
  ];
  runTestCases(map, testCases);  
})

describe('slice', () => {
  const testCases = [
    { name: 'test_slice_norm', args: [[1, 2, 3, 4, 5, 6], 2, 4], expected: [3, 4]},
    { name: 'test_slice_undef_start', args: [[1, 2, 3, 4, 5, 6], undefined, 4], expected: [1, 2, 3, 4]},
    { name: 'test_slice_undef_end', args: [[1, 2, 3, 4, 5, 6], 2], expected: [3, 4, 5, 6]},
    { name: 'test_slice_neg_start', args: [[1, 2, 3, 4, 5, 6], -5, 4], expected: [2, 3, 4]},
    { name: 'test_slice_neg_end', args: [[1, 2, 3, 4, 5, 6], 2, -2], expected: [3, 4]},
    { name: 'test_slice_small_end', args: [[1, 2, 3, 4, 5, 6], 5, 4], expected: []},
    { name: 'test_slice_neg_end_start_empty', args: [[1, 2, 3, 4, 5, 6], -5, 4], expected: [2, 3, 4]}, // Better name for this would be test_slice_neg_end_start
    { name: 'test_slice_neg_end_start', args: [[1, 2, 3, 4, 5, 6], -2, -3], expected: []}, // Better name for this would be test_slice_neg_end_start_empty
    { name: 'test_slice_eq_end_start', args: [[1, 2, 3, 4, 5, 6], 2, 2], expected: []},
    { name: 'test_slice_empty', args: [[], 2, 2], expected: []}
  ];
  runTestCases(slice, testCases);  
})

describe('toFinite', () => {
  const testCases = [
    { name: 'test_toFinite_norm', args: [6.66], expected: 6.66},
    { name: 'test_toFinite_max_plus', args: [Number.MAX_VALUE+1], expected: Number.MAX_VALUE},
    { name: 'test_toFinite_min_minus', args: [-Number.MAX_VALUE-1], expected: -Number.MAX_VALUE}
  ];
  runTestCases(toFinite, testCases);  
})

describe('toInteger', () => {
  const testCases = [
    { name: 'test_toInteger_int', args: [3], expected: 3},
    { name: 'test_toInteger_des', args: [6.66], expected: 6},
    { name: 'test_toInteger_ndes', args: [-6.66], expected: -6},
    { name: 'test_toInteger_hard', args: [2 - Number.EPSILON], expected: 1},
  ];
  runTestCases(toInteger, testCases);  
})

describe('toNumber', () => {
  const testCases = [
    { name: 'test_toNumber_num', args: [3], expected: 3},
    { name: 'test_toNumber_str', args: ["sana"], expected: NaN},
    { name: 'test_toNumber_bool', args: [true], expected: NaN},
    { name: 'test_toNumber_sym', args: [Symbol()], expected: NaN},
    { name: 'test_toNumber_obj', args: [{}], expected: NaN},
    { name: 'test_toNumber_arr', args: [[1, 2, 3]], expected: NaN},
    { name: 'test_toNumber_typearr', args: [new Int16Array([1, 2, 3])], expected: NaN},
    { name: 'test_toNumber_fun', args: [function() { return 7 }], expected: NaN},
    { name: 'test_toNumber_null', args: [null], expected: NaN},
    { name: 'test_toNumber_undef', args: [undefined], expected: NaN},
    { name: 'test_toNumber_oct', args: ["0o11"], expected: 9},
    { name: 'test_toNumber_hex', args: ["0xfF"], expected: 255},
    { name: 'test_toNumber_bin', args: ["0b10101"], expected: 21},
    { name: 'test_toNumber_no_oct', args: ["0o1 1"], expected: NaN},
    { name: 'test_toNumber_no_hex', args: ["0xf-F"], expected: NaN},
    { name: 'test_toNumber_no_bin', args: ["0b10102"], expected: NaN},
  ];
  runTestCases(toNumber, testCases);  
})

describe('toString', () => {
  const testCases = [
    { name: 'test_toString_num', args: [3], expected: "3"},
    { name: 'test_toString_str', args: ["sana"], expected: "sana"},
    { name: 'test_toString_bool', args: [false], expected: "false"},
    { name: 'test_toString_sym', args: [Symbol()], expected: "Symbol()"},
    { name: 'test_toString_obj', args: [{}], expected: "{}"},
    { name: 'test_toString_arr', args: [[1, 2, 3]], expected: "1,2,3"},
    { name: 'test_toString_typearr', args: [new Int16Array([1, 2])], expected: "1,2"},
    { name: 'test_toString_fun', args: [function() { return 7 }], expected: "function () {\n      return 7;\n    }"},
    { name: 'test_toString_null', args: [null], expected: ""},
    { name: 'test_toString_undef', args: [undefined], expected: "undefined"}
  ];
  runTestCases(toString, testCases);  
})

describe('upperFirst', () => {
  const testCases = [
    { name: 'test_upperFirst_norm', args: ["sana"], expected: "Sana"}
  ];
  runTestCases(upperFirst, testCases);  
})

describe('words', () => {
  const testCases = [
    { name: 'test_words_norm_no_pat', args: [" yksi kaksi kolme "], expected: ["yksi", "kaksi", "kolme"]},
    { name: 'test_words_norm_pat_match', args: ["AA BBB CCC DDDD", /[ABD]+/g], expected: ["AA", "BBB", "DDDD"]}
  ];
  runTestCases(words, testCases);  
})
