import chai from 'chai'

import add from '../src/add.js'
import at from '../src/at.js'
import camelCase from '../src/camelCase.js'
import capitalize from '../src/capitalize.js'
import castArray from '../src/castArray.js'
import ceil from '../src/ceil.js'
import chunk from '../src/chunk.js'
import clamp from '../src/clamp.js'
import compact from '../src/compact.js'
import countBy from '../src/countBy.js'
import defaultTo from '../src/defaultTo.js'
import defaultToAny from '../src/defaultToAny.js'
import difference from '../src/difference.js'
import divide from '../src/divide.js'
import drop from '../src/drop.js'
import endsWith from '../src/endsWith.js'
import eq from '../src/eq.js'

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

describe('add', () => {
  const testCases = [
    { name: 'test_add', args: [3, 4], expected: 7}
  ];
  runTestCases(add, testCases);
})

describe('at', () => {
  const testCases = [
    { name: 'test_at',
      args: [[10, 20, {'x': 5, 'y':[6, 7]}], ['2.y[1]', '5'], '1', '0'],
      expected: [7, undefined, 20, 10] }
  ];
  runTestCases(at, testCases);
})

describe('camelCase', () => {
  const testCases = [
    { name: 'test_camelCase_norm', args: ['abc DEF ghi'],
      expected: 'abcDefGhi' },
    { name:'test_camelCase_minus', args: ['abc-def-ghi'],
      expected: 'abcDefGhi' },
    { name:'test_camelCase_empty', args: [''], expected:'' }
  ];
  runTestCases(camelCase, testCases);
})

describe('capitalize', () => {
  const testCases = [
    { name: 'test_capitalize_norm', args: ['abc DEF'], expected: 'Abc def' },
    { name: 'test_capitalize_empty', args: [''], expected: '' },
  ];
  runTestCases(capitalize, testCases);
})

describe('castArray', () => {
  const testCases = [
    { name: 'test_castArray_num', args: [2], expected: [2] },
    { name: 'test_castArray_arr', args: [[2]], expected: [2] },
    { name: 'test_castArray_undef', args: [undefined], expected: [undefined] },
    { name: 'test_castArray_null', args: [null], expected: [null] },
    { name: 'test_castArray_no_par', args: [], expected: [] }
  ];
  runTestCases(castArray, testCases);
})

describe('ceil', () => {
  const testCases = [
    { name: 'test_ceil_3', args: [123.456, 3], expected: 123.456 },
    { name: 'test_ceil_2', args: [123.456, 2], expected: 123.46 },
    { name: 'test_ceil_1', args: [123.456, 1], expected: 123.5 },
    { name: 'test_ceil_0', args: [123.456, 0], expected: 124 },
    { name: 'test_ceil_n1', args: [123.456, -1], expected: 130 },
    { name: 'test_ceil_n2', args: [123.456, -2], expected: 200 },
    { name: 'test_ceil_n3', args: [123.456, -3], expected: 1000 },
      // Fix name in test plan

    { name: 'test_ceil_no_prec', args: [123.456], expected: 124 },
    { name: 'test_ceil_no_prec_n', args: [-123.456], expected: -123 }
  ];
  runTestCases(ceil, testCases);
})

describe('chunk', () => {
  const testCases = [
    { name: 'test_chunk_1', args: [[10, 20, 30], 1],
      expected: [[10], [20], [30]] },
    { name: 'test_chunk_2', args: [[10, 20, 30], 2],
      expected: [[10, 20], [30]] },
    { name: 'test_chunk_3', args: [[10, 20, 30], 3],
      expected: [[10, 20, 30]] },
    { name: 'test_chunk_high_size', args: [[10, 20, 30], 4],
      expected: [[10, 20, 30]] },
    { name: 'test_chunk_empty', args: [[], 1],
      expected: [] }
  ];
  runTestCases(chunk, testCases);
})

describe('clamp', () => {
  const testCases = [
    { name: 'test_clamp_bel', args: [7, 10, 25], expected: 10 },
      // Fix expected result in test plan: 7 -> 10

    { name: 'test_clamp_in', args: [13, 10, 25], expected: 13 },
    { name: 'test_clamp_abo', args: [28, 10, 25], expected: 25 },
    { name: 'test_clamp_same_lim_bel', args: [9, 10, 10], expected: 10 },
    { name: 'test_clamp_same_lim_abo', args: [11, 10, 10], expected: 10 },
    { name: 'test_clamp_same_same', args: [10, 10, 10], expected: 10 }
  ];
  runTestCases(clamp, testCases);
})

describe('compact', () => {
  const testCases = [
    { name: 'test_compact_all_fal',
      args: [[10, 20, false, null, 0, "", undefined, NaN, 30]],
      expected: [10, 20, 30] },
    { name: 'test_compact_all_no_fal',
      args: [[10, 20, 30]],
      expected: [10, 20, 30] },
    { name: 'test_compact_empty',
      args: [[]],
      expected: [] }
  ];
  runTestCases(compact, testCases);
})

describe('countBy', () => {
  const testCases = [
    { name: 'test_countBy_all_obj',
      args: [
        [ { 'nimi': 'a', 'x': 10 },
          { 'nimi': 'b', 'x': 20 },
          { 'nimi': 'c', 'x': 30 },
          { 'nimi': 'd', 'x': 20 } ],
        value => value.x
      ],
      expected: { '10': 1, '20': 2, '30': 1 } },

    { name: 'test_countBy_no_obj',
      args: [
        [ { 'nimi': 'a', 'x': 10 },
          { 'nimi': 'b', 'x': 20 },
          { 'nimi': 'c', 'x': 30 },
          { 'nimi': 'd', 'x': 20 } ],
        value => value.y
      ],
      expected: { } }
  ];
  runTestCases(countBy, testCases);
})

describe('defaultTo', () => {
  const testCases = [
    { name: 'test_defaultTo_val', args: [2, 3], expected: 2 },
    { name: 'test_defaultTo_nan', args: [NaN, 3], expected: 3 },
    { name: 'test_defaultTo_null', args: [null, 3], expected: 3 },
    { name: 'test_defaultTo_undef', args: [undefined, 3], expected: 3 }
  ];
  runTestCases(defaultTo, testCases);
})

describe('defaultToAny', () => {
  const testCases = [
    { name: 'test_defaultToAny_val',
      args: [2, 3, 4],
      expected: 2 },
    { name: 'test_defaultToAny_val_end',
      args: [null, NaN, null, undefined, 10, 20],
      expected: 10 },
    { name: 'test_defaultToAny_val_no_def',
      args: [2],
      expected: 2 }
  ];
  runTestCases(defaultToAny, testCases);
})

describe('difference', () => {
  const testCases = [
    { name: 'test_difference_1',
      args: [[10, 20, 30, 40, 50], [20, 50, 60], [10]],
      expected: [30, 40] },
    { name: 'test_difference_2',
      args: [[10, 20, 30, 40, 50, 20, 20], [20, 50, 60], [10]],
      expected: [30, 40] },
    { name: 'test_difference_no_val',
      args: [[10, 20]],
      expected: [10, 20] }
  ];
  runTestCases(difference, testCases);
})

describe('divide', () => {
  const testCases = [
    { name: 'test_divide_norm', args: [12, 3], expected: 4 },
    { name: 'test_divide_zero', args: [1, 0], expected: Infinity },
    { name: 'test_divide_00', args: [0, 0], expected: NaN }
  ];
  runTestCases(divide, testCases);
})

describe('drop', () => {
  const testCases = [
    { name: 'test_drop_1', args: [[10, 20, 30], 1], expected: [20, 30] },
    { name: 'test_drop_1_no_n', args: [[10, 20, 30]], expected: [20, 30] },
    { name: 'test_drop_2', args: [[10, 20, 30], 2], expected: [30] },
    { name: 'test_drop_3', args: [[10, 20, 30], 3], expected: [] },
    { name: 'test_drop_n_big', args: [[10, 20, 30], 4], expected: [] },
    { name: 'test_drop_0', args: [[10, 20, 30], 0], expected: [10, 20, 30] },
    { name: 'test_drop_neg', args: [[10, 20, 30], -1], expected: [10, 20, 30] },
    { name: 'test_drop_empty', args: [[], 1], expected: [] }
  ];
  runTestCases(drop, testCases);
})

describe('endsWith', () => {
  const testCases = [
    { name: 'test_endsWith_norm_t', args: ['abcdefg', 'de', 5], expected: true },
    { name: 'test_endsWith_norm_f', args: ['abcdefg', 'de', 6], expected: false },
    { name: 'test_endsWith_no_pos', args: ['abcdefg', 'fg'], expected: true },
    { name: 'test_endsWith_pos_high', args: ['abc', 'bc', 4], expected: true },
    { name: 'test_endsWith_pos_neg', args: ['abc', 'bc', -1], expected: false },
    { name: 'test_endsWith_empty', args: ['', 'bc'], expected: false },
    { name: 'test_endsWith_empty_empty', args: ['', ''], expected: true },
    { name: 'test_endsWith_norm_empty', args: ['abc', ''], expected: true }
  ];
  runTestCases(endsWith, testCases);
})

describe('eq', () => {
  const testCasesAlmostAll = [
    { name:'test_eq_1', args:[2, '2'], expected: false },
    { name:'test_eq_2a', args:[NaN, NaN], expected: true },
    { name:'test_eq_2b', args:[+0, -0], expected: true },
    { name:'test_eq_2c', args:[-0, +0], expected: true },
    { name:'test_eq_2d', args:[2, 2], expected: true },
    { name:'test_eq_2e', args:[2, 3], expected: false },
    { name:'test_eq_3_undef', args:[undefined, undefined], expected: true },
    { name:'test_eq_3_null', args:[null, null], expected: true }
  ];
  runTestCases(eq, testCasesAlmostAll)
  it('test_eq_3_str_t', function() {
    const a = 'x'
    const b = 'x'
    expect(eq(a, b)).to.equal(true);
  })
  it('test_eq_3_obj_t', function() {
    const a = { 'x': 0 }
    expect(eq(a, a)).to.equal(true);
  })
  it('test_eq_3_obj_f', function() {
    const a = { 'x': 0 }
    const b = { 'x': 0 }
    expect(eq(a, b)).to.equal(false);
  })
})
