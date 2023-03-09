export function getRemarks(transmutedGrade) {
  let remarks;
  if (transmutedGrade >= 90 && transmutedGrade <= 100) remarks = "Outstanding";
  else if (transmutedGrade >= 85 && transmutedGrade <= 89)
    remarks = "Very Satisfactory";
  else if (transmutedGrade >= 80 && transmutedGrade <= 84)
    remarks = "Satisfactory";
  else if (transmutedGrade >= 75 && transmutedGrade <= 79)
    remarks = "Fairly Satisfactory";
  else remarks = "Did Not Meet Expectations";

  return remarks;
}
