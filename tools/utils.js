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
const PER_WRITTEN = 0.25;
export const calculateWeightedScoreWritten = (percentage) =>
  (percentage * PER_WRITTEN).toFixed(3);

const PER_PERFORMANCE = 0.45;
export const calculateWeightedScorePerformance = (percentage) =>
  (percentage * PER_PERFORMANCE).toFixed(3);

const PER_ASSESSMENT = 0.3;
export const calculateWeightedScoreAssessment = (percentage) =>
  (percentage * PER_ASSESSMENT).toFixed(3);
