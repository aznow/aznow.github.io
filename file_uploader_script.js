// Google apps script to allow anonymous users to upload to a google drive folder with basic email notification upon upload
// Updated: 5/6/18 
// Updated by: David Ayodele

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('form.html');
        
}

function uploadFiles(form) {
  try {
    
    var dropbox = "PAC"; // Input the name of the folder to be used for holding the uploaded files
    var folder, folders = DriveApp.getFoldersByName(dropbox);
    var filepath = "";
    var usrname = "";
    
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox); // Otherwise by default a 'dropbox' folder will be created
    }
    
    var blob = form.myFile;    
    var file = folder.createFile(blob);
    var out_str = 'File upload successfull!';
    var out_str2 = '  File path = ';   
    var out_str3 = '  Thank you, please close this tab and complete the survey (remember to copy the file path as confirmation)';
    
    file.setDescription("Uploaded by " + form.myName);
    filepath = file.getUrl();
    usrname = form.myName;
    return out_str.fontcolor("white") + out_str2.fontcolor("white") + file.getUrl().fontcolor("white") + '\n' + out_str3.fontcolor("white");
  }
    
  catch (error) {
    return error.toString();
  }  
    
  finally {MailApp.sendEmail ("nowpac.az@gmail.com, davidayodele@gmail.com, postdlpost@aol.com, campbelldorene@yahoo.com, soaznow@gmail.com, glrichardsonnow@gmail.com, centralphoenixnow@gmail.com, board@aznow.org",  // to field for the email. Can input multiple, ie: "1@email.com, 2@email.com",
                  "pac@aznow.org",       // from field
                  "PAC folder upload detected: " + usrname,      // email subject
                  "You have a new PAC file upload to review: " + filepath + "\n\nYou can look in the PAC folder here: https://drive.google.com/open?id=14-jAa2GKesr5_JvQtLfbD3YoFwCRQ5hR");  // email body
    }
}