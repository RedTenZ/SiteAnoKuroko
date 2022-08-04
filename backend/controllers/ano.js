const Message = require('../models/Message');
/*var request = require('request');

var headers = {
    'Access-Token': 'o.8HIk67f5QdGbn0Umhbt70FQDNsmvQNPz',
    'Content-Type': 'application/json'
};

var dataString = '{"body":"Un nouveau message anonyme est disponible","title":"Message Anonyme","type":"note"}';

var options = {
    url: 'https://api.pushbullet.com/v2/pushes',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}



*/



exports.sendMessage = (req, res, next) => {
  //request(options, callback);
  const messageObject = JSON.parse(req.body.message);
  delete messageObject;
  if(req.file != undefined){
  var message = new Message({
    ...messageObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
}else{
  var message = new Message({
    ...messageObject,
      imageUrl: `nothing`
  });
}
  message.save()
    .then(() => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  )
    .catch(error => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {
  console.log(req)
  Message.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllMessage = (req, res, next) => {
  Message.find().then(
    (messages) => {
      res.status(200).json(messages);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
