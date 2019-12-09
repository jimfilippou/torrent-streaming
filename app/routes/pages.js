module.exports = function (modules) {

  modules.app.get('/', function (req, res) {
    res.render('pages/home');
  });

  modules.app.post('/download', function (req, res) {

    req.session.destination = req.body.destination;

    const magnet =  req.body.magnet;
    const destination = req.body.destination;

    const client = new modules.WebTorrent();

    client.add(magnet, { path: destination }, function (torrent) {

      torrent.on('metadata', function () {
        req.session.torrentLength = torrent.length;
      });

      torrent.on('download', function (bytes) {
        console.clear();
        console.log('just downloaded: ' + bytes);
        console.log('progress: ' + torrent.progress);
        // res.render('pages/home', {progress:torrent.progress})
      });

      torrent.on('done', function () {
        console.log('torrent download finished');
        res.end();
      });

    });

  });

  // modules.app.get('/video', function (req, res) {
  //
  //   const destination = req.session.destination | '/Users/jimfilippou/Desktop' + '/Sintel/Sintel.mp4';
  //   const fileSize = req.session.torrentLength;
  //
  //   const head = {
  //     'Content-Length': fileSize,
  //     'Content-Type': 'video/mp4',
  //   };
  //   // res.writeHead(200, head);
  //   modules.fs.createReadStream(destination).pipe(res);
  // });

};
