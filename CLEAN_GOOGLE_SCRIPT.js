function doPost(e) {
  try {
    const SPREADSHEET_ID = '1BWLDKC-ucZkdnivD0L7Yu_2sKz-Maj4ndL0G8ObOdJ8';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    const formData = JSON.parse(e.postData.contents);
    
    const timestamp = new Date().toLocaleString();
    
    const rowData = [
      timestamp,
      formData.name || '',
      formData.team || '',
      formData.email || '',
      formData.phone || '',
      formData.expenseDate || '',
      formData.amount ? '$' + formData.amount : '',
      formData.category || '',
      formData.description || '',
      formData.businessName || '',
      formData.additionalInfo || '',
      'Pending Review'
    ];
    
    sheet.appendRow(rowData);
    
    const emailSubject = 'New Expense Request: $' + formData.amount + ' - ' + formData.name;
    const emailBody = 'New expense request submitted:\n\nName: ' + formData.name + '\nTeam: ' + formData.team + '\nEmail: ' + formData.email + '\nPhone: ' + formData.phone + '\nDate: ' + formData.expenseDate + '\nAmount: $' + formData.amount + '\nCategory: ' + formData.category + '\nBusiness: ' + formData.businessName + '\n\nDescription:\n' + formData.description + '\n\nAdditional Info:\n' + formData.additionalInfo + '\n\nView in spreadsheet: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID;
    
    GmailApp.sendEmail(
      'bharatwarriors2024@gmail.com',
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