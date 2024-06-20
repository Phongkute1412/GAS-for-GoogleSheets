function copyDataFromAnotherSheet() {
  var destinationSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("4"); // <- Rename to your destination sheet name
  var sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet"); // <- Rename to your source sheet name
  var condition = "Yes";
  var sourceData = sourceSheet.getDataRange().getValues();
  var destinationRange = destinationSheet.getRange("A2");

  for (var i = 0; i < sourceData.length; i++) {
    if (sourceData[i][2] == condition) { 
      destinationRange.offset(0, 0, 1, 2).setValues([sourceData[i].slice(0, 2)]);
      destinationRange = destinationRange.offset(1, 0);
    }
  }
}