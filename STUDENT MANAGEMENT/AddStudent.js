function openForm() {
  const html = HtmlService.createHtmlOutputFromFile('Form')
    .setWidth(467)
    .setHeight(720);
  SpreadsheetApp.getUi().showModalDialog(html, 'New student information');
}

function saveData(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Dataset');
  const stt = "=ROW()-2"
  sheet.appendRow([stt, data.name, `'${data.dob}`, data.center, data.grade, data.parentName, `'${data.phone}`, data.info, data.image]);
}