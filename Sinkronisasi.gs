function sinkron() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // get sheet objects for Sheet1 and Sheet2
  const sh2 = ss.getSheetByName('Data'); // use your sheet name for sheet2
  const sh3 = ss.getSheetByName('Format');
  // copy the data to Sheet2 starting from row 11 after the last column with content
  sh3.getRange(2,1,1,7).copyTo(sh2.getRange(2,1,1000,7), SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false );
}
