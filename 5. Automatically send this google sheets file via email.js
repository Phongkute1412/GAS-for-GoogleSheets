function setting() {
  var myData = PropertiesService.getUserProperties();
  var status = myData.getProperty('status');
  
  status = 1;
  
  myData.setProperty('status', status);
  myData.setProperty('email', The_email_address_to_which_you_want_to_send_this_worksheet); // <- Remember to put it in parentheses, ex: "abc@gmail.com"
  
  ScriptApp.newTrigger('sendEmail')
   .timeBased()
   .atHour(23) // <- Time you want to send
   .everyDays(2) // <- How often
   .create();
}

function sendEmail() {
  var sheet = SpreadsheetApp.getActive();
  var fileName = sheet.getName();
  
  var url = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" + sheet.getId() + "&exportFormat=xlsx";
  var params = {
    method      : "get",
    headers     : {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
    muteHttpExceptions: true
  };
  var blob = UrlFetchApp.fetch(url, params).getBlob();
  
  blob.setName(sheet.getName() + '_' + Utilities.formatDate(new Date(), SpreadsheetApp.getActive().getSpreadsheetTimeZone(), "dd-MM-yyyy HH:mm") + ".xlsx"); // <- You can change format of date to dd/MM/yyyy
    
  var myData = PropertiesService.getUserProperties();
  var email = myData.getProperty('email');
  var subject = "Send file " + fileName + " automatically";
  var message = "This is a message";
  MailApp.sendEmail(email, subject, message, {attachments: [blob]});
}

function clearSetting() {
  var myData = PropertiesService.getUserProperties();
  var status = myData.getProperty('status');
  
  status = 0;
  
  myData.setProperty('status', status);
  
  deleteTrigger();
}

function deleteTrigger() {
  // Loop over all triggers.
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}