function onEdit() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1"); // <- Rename to your sheet name
  var condition = "Yes";
  var valuesConditionRange = sheet.getRange("A:A").getValues();
  var valuesTargetRange = sheet.getRange("C:C").getValues();
  
  for (var i = 0; i < valuesConditionRange.length; i++) {
    var cellValueConditionRange = valuesConditionRange[i][0];
    var cellValueTargetRange = valuesTargetRange[i][0];

    if (cellValueConditionRange == condition && cellValueTargetRange == "") {
      sheet.getRange(i + 1, 2).copyTo(sheet.getRange(i + 1, 3), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
    } else if (cellValueConditionRange !== condition && cellValueTargetRange !== "") { 
      sheet.getRange(i + 1, 3).clearContent();
    }
  }
}