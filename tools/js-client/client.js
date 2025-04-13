var udp = require('dgram');
var keyPressListener = require('keypress');

// creating a client socket
var client = udp.createSocket('udp4');

//buffer msg
var data = Buffer.from('data1');

var textBuffer = ''

let controller = function (ch, key) {
  if (!key || ch === undefined) {
    return;
  }
  switch (key.name) {
    case 'backspace':
      pop_from_buffer();
      break;
    case 'space':
      add_to_buffer(' ');
      break;
    case 'return':
      console.log('newline');
      break;
    default:
      add_to_buffer(ch);
      break;
  }
  process.stdout.write('\r' + textBuffer + ' ');
  send_buffer(textBuffer)
}

let send_buffer = function () {
  client.send(textBuffer, 4000, 'localhost', function (error) {
  });
}

let add_to_buffer = function (char) {
  textBuffer += char;
}

let pop_from_buffer = function () {
  textBuffer = textBuffer.slice(0, -1);
}

keyPressListener(process.stdin);

process.stdin.on('keypress', function (ch, key) {
  if (key && key.name === 'tab') {
    process.exit();
  }
  controller(ch, key);
  
});

process.stdin.setRawMode(true);
process.stdin.resume();

