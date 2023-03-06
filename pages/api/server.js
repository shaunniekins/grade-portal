import { getGoogleSheetsClient } from "../api/googleSheetsClient";

export async function getServerSideProps({ query }) {
  const googleSheetsClient = await getGoogleSheetsClient();

  //Query
  const { id } = query;
  const sheetName = "SCIENCE Q1";

  //Highest Possible Score
  const row = 10;
  const responseMax = await googleSheetsClient.spreadsheets.values.batchGet({
    spreadsheetId: process.env.SHEET_ID,
    ranges: [
      `${sheetName}!H${row}:Q${row}`,
      `${sheetName}!U${row}:AD${row}`,
      `${sheetName}!AH${row}`,
    ],
  });

  //HPS Result
  const max_written_works = responseMax.data.valueRanges[0].values;
  const max_performance_tasks = responseMax.data.valueRanges[1].values;
  const max_quarterly_assessment = responseMax.data.valueRanges[2].values;

  //User
  const responseWPANU = await googleSheetsClient.spreadsheets.values.batchGet({
    spreadsheetId: process.env.SHEET_ID,
    ranges: [
      `${sheetName}!H${id}:Q${id}`,
      `${sheetName}!U${id}:AD${id}`,
      `${sheetName}!AH${id}`,
      `${sheetName}!D${id}`,
      `${sheetName}!B${id}`,
    ],
  });

  //User Result
  const written_works = responseWPANU.data.valueRanges[0].values;
  const performance_tasks = responseWPANU.data.valueRanges[1].values;
  const quarterly_assessment = responseWPANU.data.valueRanges[2].values;
  const nameVal = responseWPANU.data.valueRanges[3].values;
  const userNameVal = responseWPANU.data.valueRanges[4].values;

  //ATTENDANCE
  const minusId = id - 6;

  //MONTHS
  const months = [
    "SUMMARY",
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  //Result
  const attendanceData = [];

  for (const month of months) {
    const responseAttendance = await googleSheetsClient.spreadsheets.values.get(
      {
        spreadsheetId: process.env.SHEET_ID,
        range: `${month}!C${minusId}:F${minusId}`,
      }
    );
    attendanceData.push(responseAttendance.data.values);
  }

  return {
    props: {
      max_written_works,
      max_performance_tasks,
      max_quarterly_assessment,
      written_works,
      performance_tasks,
      quarterly_assessment,
      nameVal,
      userNameVal,
      months,
      attendanceData,
      minusId,
    },
  };
}

export default function server(props) {
  return <Post {...props} />;
}
