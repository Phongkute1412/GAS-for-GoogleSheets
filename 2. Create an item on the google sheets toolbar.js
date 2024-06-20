function onOpen() {
  let menu = SpreadsheetApp.getUi().createMenu("GAS-for-GoogleSheets");
  menu.addItem("Function-name", "Function-you-want-to-call");
  menu.addToUi();
}