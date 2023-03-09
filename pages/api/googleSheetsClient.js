import { google } from "googleapis";
import keys from "../../secrets.json";

export async function getGoogleSheetsClient() {
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );
  const sheets = google.sheets({ version: "v4", auth: client });
  return sheets;
}

export default getGoogleSheetsClient;
