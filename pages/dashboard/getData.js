// import getRemarks from "../tools/remarks";
import getRemarks from "../tools/remarks";
// import { getGoogleSheetsClient } from "../api/googleSheetsClient";
import getGoogleSheetsClient from "../api/googleSheetsClient";

export async function getServerSideProps({ query = 11 }) {
  const googleSheetsClient = await getGoogleSheetsClient();

  //Query
  const { id } = query;
  const sheetName = "KEPLER";

  //Highest Possible Score
  const ROW = 9;
  const responseMax = await googleSheetsClient.spreadsheets.values.batchGet({
    spreadsheetId: process.env.SHEET_ID,
    ranges: [
      `${sheetName}!G${ROW}:P${ROW}`,
      `${sheetName}!T${ROW}:AC${ROW}`,
      `${sheetName}!AG${ROW}`,
    ],
  });

  //HPS Result
  const max_written_works = responseMax.data.valueRanges[0].values[0]
    .slice(0, 10)
    .map((val) => {
      if (val === null || val === undefined) {
        return " ";
      } else {
        return val;
      }
    });
  max_written_works.length = 10;
  for (let i = 0; i < max_written_works.length; i++) {
    if (max_written_works[i] === null || max_written_works[i] === undefined) {
      max_written_works[i] = "";
    }
  }
  const max_performance_tasks = responseMax.data.valueRanges[1].values;
  const max_quarterly_assessment = responseMax.data.valueRanges[2].values;

  //User
  const responseWPANU = await googleSheetsClient.spreadsheets.values.batchGet({
    spreadsheetId: process.env.SHEET_ID,
    ranges: [
      `${sheetName}!G${id}:P${id}`,
      `${sheetName}!T${id}:AC${id}`,
      `${sheetName}!AG${id}`,

      `${sheetName}!B${id}`,
      `${sheetName}!C${id}`,
    ],
  });

  // User Result
  const written_works = responseWPANU.data.valueRanges[0].values[0]
    .slice(0, 10)
    .map((val) => {
      if (!(val === null || val === undefined)) return val;
    });
  written_works.length = 10;
  for (let i = 0; i < written_works.length; i++) {
    if (!written_works[i]) written_works[i] = "";
  }

  const performance_tasks = responseWPANU.data.valueRanges[1].values.map(
    (row) => row.map((val) => val || "")
  );
  const quarterly_assessment = responseWPANU.data.valueRanges[2].values.map(
    (row) => row.map((val) => val || "")
  );
  const nameVal = responseWPANU.data.valueRanges[3].values.map((row) =>
    row.map((val) => val || "")
  );
  const userNameVal = responseWPANU.data.valueRanges[4].values.map((row) =>
    row.map((val) => val || "")
  );

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
    },
  };
}
