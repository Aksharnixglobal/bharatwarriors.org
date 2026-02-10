# Google Sheets Integration Setup for Expense Tracking

## Step 1: Create Google Apps Script

1. **Open your Google Spreadsheet**: 
   https://docs.google.com/spreadsheets/d/1BWLDKC-ucZkdnivD0L7Yu_2sKz-Maj4ndL0G8ObOdJ8/edit

2. **Set up the spreadsheet headers** (if not already done):
   In Row 1 of your spreadsheet, add these column headers:
   ```
   A1: Timestamp
   B1: Name  
   C1: Team
   D1: Email
   E1: Phone
   F1: Expense Date
   G1: Amount
   H1: Category
   I1: Description
   J1: Business Name
   K1: Additional Info
   L1: Status
   ```

3. **Open Google Apps Script**:
   - Go to `Extensions` → `Apps Script`
   - Delete any existing code in the editor

4. **Paste this Google Apps Script code**:

```javascript
function doPost(e) {
  try {
    // Get the spreadsheet (replace with your actual spreadsheet ID)
    const SPREADSHEET_ID = '1BWLDKC-ucZkdnivD0L7Yu_2sKz-Maj4ndL0G8ObOdJ8';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Parse the form data
    const formData = JSON.parse(e.postData.contents);
    
    // Current timestamp
    const timestamp = new Date().toLocaleString();
    
    // Prepare row data matching your spreadsheet columns
    const rowData = [
      timestamp,                    // A: Timestamp
      formData.name || '',         // B: Name
      formData.team || '',         // C: Team
      formData.email || '',        // D: Email
      formData.phone || '',        // E: Phone
      formData.expenseDate || '',  // F: Expense Date
      formData.amount ? '$' + formData.amount : '', // G: Amount
      formData.category || '',     // H: Category
      formData.description || '',  // I: Description
      formData.businessName || '', // J: Business Name
      formData.additionalInfo || '', // K: Additional Info
      'Pending Review'             // L: Status
    ];
    
    // Add the row to the spreadsheet
    sheet.appendRow(rowData);
    
    // Send email notification (optional)
    const emailSubject = `New Expense Request: $${formData.amount} - ${formData.name}`;
    const emailBody = `
New expense request submitted:

Name: ${formData.name}
Team: ${formData.team}
Email: ${formData.email}
Phone: ${formData.phone}
Date: ${formData.expenseDate}
Amount: $${formData.amount}
Category: ${formData.category}
Business: ${formData.businessName}

Description:
${formData.description}

Additional Info:
${formData.additionalInfo}

View in spreadsheet: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}
`;
    
    // Send notification email (replace with your email)
    GmailApp.sendEmail(
      'your-email@gmail.com', // Replace with your actual email
      emailSubject,
      emailBody
    );
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Expense recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error recording expense: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function testFunction() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        team: 'DFCL BW',
        email: 'test@example.com',
        phone: '123-456-7890',
        expenseDate: '2026-02-10',
        amount: '50.00',
        category: 'Equipment',
        description: 'Test expense',
        businessName: 'Test Business',
        additionalInfo: 'Test info'
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}
```

5. **Deploy the Script**:
   - Click the **Deploy** button (top right)
   - Choose **New deployment**
   - For "Type": Select **Web app**
   - For "Description": Enter "Expense Tracker API"
   - For "Execute as": Select **Me**
   - For "Who has access": Select **Anyone**
   - Click **Deploy**
   - **Copy the Web app URL** - you'll need this!

6. **Update email notification**:
   - In the script, find this line: `'your-email@gmail.com'`
   - Replace with your actual email address where you want notifications

## Step 2: Update Your Website

The web app URL from step 5 will look like:
`https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`

**Important**: Save this URL - you'll need to provide it to update your website form!

## Step 3: Test the Integration

1. Submit a test expense through your website
2. Check your Google Spreadsheet - a new row should appear
3. Check your email for the notification

## Troubleshooting

- **Permission errors**: Make sure the Apps Script has permission to access your spreadsheet and send emails
- **Data not appearing**: Check the Apps Script execution log for errors
- **Email not sending**: Verify your Gmail account has permission to send emails via Apps Script

## Features Included

✅ **Automatic data entry** to Google Sheets
✅ **Email notifications** for each new expense
✅ **Timestamp tracking** 
✅ **Status tracking** (defaults to "Pending Review")
✅ **Error handling** and logging
✅ **Formatted currency** display

Your expenses will now be automatically tracked in Google Sheets with timestamps and email notifications!