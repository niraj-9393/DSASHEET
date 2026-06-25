import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";

export const addToSheet = async (req, res) => {
  try {
    const { name, link, difficulty, remark } = req.body;

    if (!name || !link || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //google sheet integration start
    const spreadsheetId =
      "1jUVPrDFOAKZwXEf7AdX81-ejsTsrab6n1n7-jwlXrkw";

    const auth = new GoogleAuth({
      keyFile: "./service-account.json",
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const values = [
      [name, link, difficulty, remark || ""],
    ];

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "leetcode-tracker!A:D", 
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    console.log(
      `${result.data.updates?.updatedCells || 0} cells appended.`
    );
    // integration ended

    return res.status(200).json({
      success: true,
      message: "Data added to Google Sheet successfully",
    });
  } catch (error) {
    console.error("Google Sheets Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};