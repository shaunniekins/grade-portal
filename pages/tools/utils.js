//Helper Functions

//Sum of array elements
export const sumArray = (arr) => {
  if (!Array.isArray(arr)) {
    return 0;
  }
  return arr.reduce((a, b) => {
    if (isNaN(parseInt(b))) {
      return a;
    } else {
      return a + parseInt(b);
    }
  }, 0);
};

//Get percentage of student score with the number of score
export const calculatePercentage = (score, maxScore) =>
  ((score / maxScore) * 100).toFixed(3);

//Get weighted score of the percentage
const WEIGHTVAL = 0.4;
export const calculateWeightedScore = (percentage) =>
  (percentage * WEIGHTVAL).toFixed(3);

//Grade Computation
