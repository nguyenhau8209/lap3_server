var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      let time = new Date().getTime();
      let fileName = files.filetoupload.originalFilename.toString();

      names = fileName.split('.');
      newFileName = names[0] + time + "." + names[1];
      console.log(newFileName);
      var newpath = 'C:/Users/congh/AppData/Local' + newFileName;
      console.log(oldpath);
      console.log(newpath + "new path");
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);