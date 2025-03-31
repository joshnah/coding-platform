export const MOCK_CODING_QUESTION = {
  id: 'two_sum',
  title: 'Two Sum',
  description: `Given a list of integers and a target number, return the **indices** of the two numbers that add up to the target.

You may assume that each input would have **exactly one solution**, and you **may not use the same element twice**.

**Example:**
Input:
  numbers = [2, 7, 11, 15]
  target = 9

Output:
  [0, 1]  (because numbers[0] + numbers[1] = 2 + 7 = 9)
`,
  functionName: 'twoSum',
  functionSignature: {
    arguments: [
      { name: 'numbers', type: 'int[]' },
      { name: 'target', type: 'int' },
    ],
    returnType: 'int[]',
  },
  testCases: [
    {
      input: `2,7,11,15
9`,
      expectedOutput: `0,1`,
    },
    {
      input: `3,2,4
6`,
      expectedOutput: `1,2`,
    },
    {
      input: `2,3,5,7
9`,
      expectedOutput: `0,3`,
    },
    {
      input: `10,20,30,40,80
70`,
      expectedOutput: `2,3`,
    },
  ],
};
