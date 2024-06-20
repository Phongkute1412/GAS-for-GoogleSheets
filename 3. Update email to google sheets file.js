function updateEmailToGoogleSheetsFile() {
  var labelName = 'ToBeProcsessedByGAS';
  var threads = GmailApp.search('label:' + labelName, 0, 50);

  threads.sort(function(a, b) {
    return a.getLastMessageDate() - b.getLastMessageDate();
  });

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("3"); // <- Rename to your sheet name
  var rowData = [];

  var lastRow = sheet.getLastRow();

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var date = new Date(message.getDate());
      var formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), "dd/MM/yyyy");
      message.getThread().removeLabel(GmailApp.getUserLabelByName(labelName));
      rowData.push([message.getSubject(), message.getPlainBody(), formattedDate]);
    }
  }

  sheet.getRange(lastRow + 1, 1, rowData.length, rowData[0].length).setValues(rowData);
}
