function myFunction() {
  var widget = HtmlService.createHtmlOutputFromFile('ShowIn4');
  widget.setWidth(934);
  widget.setHeight(1440);
  SpreadsheetApp.getUi().showModalDialog(widget, 'Student information');
}

function getData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SearchStudent');
  var sheetdata = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Dataset');

  var lastrow = sheetdata.getLastRow();
  var lastcol = sheetdata.getLastColumn();
  var sttRange = sheetdata.getRange(1,1,lastrow);
  var dataRange = sttRange.getValues();

  var datakey = sheet.getRange("B15").getValue();
  var index = -1;

  for (var i = 2; i < lastrow; i++) {
    var iRowValue = dataRange[i][0];
     if (datakey == iRowValue) {
      index = i+1;
    }
  }

  var dataGet = sheetdata.getRange(index,2,1,lastcol-1).getValues()[0];
  
  return {
    name: dataGet[0],
    dob: dataGet[1],
    center: dataGet[2],
    grade: dataGet[3],
    parentName: dataGet[4],
    phone: dataGet[5],
    info: dataGet[6],
    image: dataGet[7],
  };
}

function updateData(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SearchStudent');
  var sheetdata = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Dataset');

  var lastrow = sheetdata.getLastRow();
  var sttRange = sheetdata.getRange(1,1,lastrow);
  var dataRange = sttRange.getValues();

  var datakey = sheet.getRange("B15").getValue();
  var index = -1;

  for (var i = 2; i < lastrow; i++) {
    var iRowValue = dataRange[i][0];
     if (datakey == iRowValue) {
      index = i+1;
    }
  }
  
  sheetdata.getRange(index,2).setValue(data.name);
  sheetdata.getRange(index,3).setValue(`'${data.dob}`);
  sheetdata.getRange(index,4).setValue(data.center);
  sheetdata.getRange(index,5).setValue(data.grade);
  sheetdata.getRange(index,6).setValue(data.parentName);
  sheetdata.getRange(index,7).setValue(`'${data.phone}`);
  sheetdata.getRange(index,8).setValue(data.info);
  sheetdata.getRange(index,9).setValue(data.image);
}

function clearData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SearchStudent');
  var dataToClear = sheet.getRange("D5:D7");
  dataToClear.clear({contentsOnly: true, skipFilteredRows: true});
};

function doGet() {
  return HtmlService.createHtmlOutputFromFile('ShowIn4');
}