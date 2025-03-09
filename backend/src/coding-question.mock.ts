export const MOCK_CODING_QUESTION = {
  id: 'filter_and_format_data',
  title: 'Filter and Format Data',
  description: `
Given a list of numbers, a list of names, a minimum value, a prefix string, and a flag indicating whether to capitalize the names,
return a list of formatted strings for all numbers greater than or equal to the minimum value. Each string should be of the form:
"<prefix>_<name>_<number>". If \`capitalizeNames\` is true, the names must be converted to uppercase.

**Example:**
Input:
  numbers = [10, 25, 30]
  names = ["alice", "bob", "carol"]
  minValue = 20
  prefix = "ID"
  capitalizeNames = true

Output:
  ["ID_BOB_25", "ID_CAROL_30"]
`,
  functionName: 'filterAndFormatData',
  functionSignature: {
    arguments: [
      { name: 'numbers', type: 'int[]' },
      { name: 'names', type: 'string[]' },
      { name: 'minValue', type: 'int' },
      { name: 'prefix', type: 'string' },
      { name: 'capitalizeNames', type: 'boolean' },
    ],
    returnType: 'string[]',
  },
  testCases: [
    {
      input: `10,25,30
alice,bob,carol
20
ID
true`,
      expectedOutput: `ID_BOB_25,ID_CAROL_30`,
    },
    {
      input: `5,8,15
x,y,z
10
user
false`,
      expectedOutput: `user_z_15`,
    },
    {
      input: `100,200,300
john,jane,doe
150
emp
true`,
      expectedOutput: `EMP_JANE_200,EMP_DOE_300`,
    },
  ],
};
