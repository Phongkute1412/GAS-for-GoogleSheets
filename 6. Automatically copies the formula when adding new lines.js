function onEdit() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('6');
  var lastRow = sheet.getLastRow(); 
  var t1 = sheet.getRange(1, 20);
  var t2 = sheet.getRange(1, 21);

  t1.setValue(lastRow);

  if (t1.getValue() === t2.getValue()) {
    t1.copyTo(t2);
  } else {
    sheet.getRange("B4").setFormula("=IF(A4<>\"\";MID(A4;4;2);B3)");
    var fillDownRangeB = sheet.getRange(4, 2, lastRow - 3, 1);
    sheet.getRange(4, 2).copyTo(fillDownRangeB);

    sheet.getRange("J4").setFormula("=IF(C4+D4+E4=0;\"\";IF(C4+D4+E4>0;\"+\";\"-\"))");
    sheet.getRange("G4").setFormula("=IF(AND($C4=\"\";$D4=\"\";$E4=\"\");\"\";IF($A5<>\"\";SUM(C$3:C4);))");
    sheet.getRange("H4").setFormula("=IF(AND($C4=\"\";$D4=\"\";$E4=\"\");\"\";IF($A5<>\"\";SUM(D$3:D4);))");
    sheet.getRange("I4").setFormula("=IF(AND($C4=\"\";$D4=\"\";$E4=\"\");\"\";IF($A5<>\"\";SUM(E$3:E4);))");
    var fillDownRange = sheet.getRange(4, 7, lastRow - 3, 4);
    sheet.getRange(4, 7, 1, 4).copyTo(fillDownRange);

    sheet.getRange('4:4').copyTo(sheet.getRange(4, 1, lastRow - 3, 10), SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
    t1.copyTo(t2);
  }
}