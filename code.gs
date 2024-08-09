function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
      .setTitle('KipApp Harian')
      .addMetaTag('viewport','width=device-width , initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .setFaviconUrl('https://i.imgur.com/zenfLfJ.png'); 
        
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function uploadFileToDrive(name, mimeType, bytes, folderName) {
  var parentFolderId = '1z9-vw4Yza6yTwTZg2Xeien9VGUo2Gm-w'; // Ganti dengan ID folder Google Drive induk
  var parentFolder = DriveApp.getFolderById(parentFolderId);
  
  // Cek apakah folder dengan nama tersebut sudah ada
  var folder;
  var folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    // Jika folder belum ada, buat folder baru
    folder = parentFolder.createFolder(folderName);
  }
  
  // Buat file di dalam folder yang sudah dibuat atau ditemukan
  var file = folder.createFile(
    Utilities.newBlob(Utilities.base64Decode(bytes), mimeType, name)
  );

  // Mengembalikan URL file yang baru diunggah
  return file.getUrl();
}

function submitData(formData) {
  const sheet = SpreadsheetApp.openById('11z56Hgd7TmCcLzODVzUsbJTp4cjTeDQgfGMAVHvjgu0').getSheetByName('Data');
  
  formData.fileData.forEach(file => {
    const folderName = formData.bulan; // Gunakan nama input sebagai nama folder
    const url = uploadFileToDrive(file.name, 'application/pdf',file.data, folderName);
    sheet.appendRow([formData.proyek, formData.bulan, formData.awal, formData.akhir,formData.kegiatan ,file.name, url]);
  });
}

// Tambahkan dropdown Proyek
function getProyek(){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Proyek")
  let data = sheet.getRange('A2:A').getValues().filter(d => d[0] !== "");

  let newArr = data.map(d => d[0]);
  return(newArr);
}

let proyek = getProyek().map(d=> "<option>"+ d + "</option>").join();

// Tambahkan dropdown Bulan
function getBulan(){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Bulan")
  let data = sheet.getRange('A2:A').getValues().filter(d => d[0] !== "");

  let newArr = data.map(d => d[0]);
  return(newArr);
}

let bulan = getBulan().map(d=> "<option>"+ d + "</option>").join();
