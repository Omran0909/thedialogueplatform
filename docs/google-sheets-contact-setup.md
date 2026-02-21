# Google Sheets Contact Pipeline

Use this setup to:

- Save every contact submission into one Google Sheet.
- Receive a short notification email when a new submission arrives.
- Keep website visitors on your current contact page.

## 1) Create the spreadsheet

1. Create a Google Sheet in your Google Drive.
2. Name it (for example) `Dialogue Platform Contact Submissions`.
3. Open `Extensions` -> `Apps Script`.

## 2) Paste this Apps Script

Replace everything in `Code.gs` with:

```javascript
function getConfig_() {
  const props = PropertiesService.getScriptProperties();
  return {
    sheetName: props.getProperty("SHEET_NAME") || "Contact Submissions",
    notifyEmail: props.getProperty("NOTIFY_EMAIL") || "",
  };
}

function getOrCreateSheet_(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow([
      "submitted_at",
      "name",
      "email",
      "organization",
      "subject",
      "message",
      "locale",
      "page",
      "source",
    ]);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(body);

    const name = (data.name || "").toString().trim();
    const email = (data.email || "").toString().trim();
    const message = (data.message || "").toString().trim();

    if (!name || !email || !message) {
      return json_({ ok: false, message: "Missing required fields." });
    }

    const { sheetName, notifyEmail } = getConfig_();
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getOrCreateSheet_(spreadsheet, sheetName);

    const submittedAt = (data.submittedAt || new Date().toISOString()).toString();
    const organization = (data.organization || "").toString();
    const subject = (data.subject || "").toString();
    const locale = (data.locale || "").toString();
    const page = (data.page || "").toString();
    const source = (data.source || "website-contact-form").toString();

    sheet.appendRow([submittedAt, name, email, organization, subject, message, locale, page, source]);

    if (notifyEmail) {
      MailApp.sendEmail({
        to: notifyEmail,
        subject: "New website contact submission",
        body:
          "A new contact submission was received.\n\n" +
          "Name: " + name + "\n" +
          "Email: " + email + "\n" +
          "Subject: " + (subject || "No subject") + "\n" +
          "Time: " + submittedAt + "\n\n" +
          "Open your Google Sheet for full details.",
      });
    }

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, message: String(error) });
  }
}
```

## 3) Configure notification email

1. In Apps Script: `Project Settings` -> `Script properties`.
2. Add:
   - `SHEET_NAME` = `Contact Submissions` (or your preferred tab name)
   - `NOTIFY_EMAIL` = your email (the one that should receive notifications)

## 4) Deploy as web app

1. Click `Deploy` -> `New deployment`.
2. Type: `Web app`.
3. Execute as: `Me`.
4. Who has access: `Anyone`.
5. Deploy and copy the `Web app URL`.

## 5) Set Vercel environment variables

In Vercel Project -> Settings -> Environment Variables:

- `GOOGLE_SHEETS_WEBHOOK_URL` = your Apps Script web app URL
- `CONTACT_DELIVERY_MODE` = `sheet`

Optional:

- Use `sheet_and_email` if you also want existing email relay delivery in parallel.

## 6) Redeploy

After adding env vars, redeploy the site so the new variables are active.
