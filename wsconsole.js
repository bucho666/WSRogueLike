// console screen class
function ConsoleScreen(height, id) {
  var screen = document.createElement('div');
  this._id = id;
  screen.id = this._id;
  document.body.appendChild(screen);
  for (var i = 0; i < height; i++) {
    var line = document.createElement('div');
    line.innerHTML = '<br>';
    screen.appendChild(line);
  }
  this.backBuffer = screen.cloneNode(true);

  this.write = function(line, message) {
    lines = this.backBuffer.getElementsByTagName('div');
    lines[line].innerHTML = message;
  };

  this.flip = function() {
    var front = document.getElementById(this._id);
    document.body.replaceChild(this.backBuffer, front);
    this.backBuffer = this.backBuffer.cloneNode(true);
  };

  this.receve = function(data) {
    var commands, i, length;
    commands = data.split('\x00');
    length = commands.length;
    for (i=0;i < length; i++) {
      this._accept(commands[i]);
    }
  }
}

function MapScreen(height, id) {
  var that = new ConsoleScreen(height, id);

  that._accept = function(command) {
    if (command === 'flip') {
      this.flip();
    } else {
      this._update_line(command);
    }
  }

  that._update_line = function(command) {
    var match, line, message;
    match = command.match(/^(\d+):(.*)/);
    line = match[1];
    message = match[2];
    this.write(line, message);
  }

  return that;
}

function MessageScreen(height, id) {
  var that = new ConsoleScreen(height, id);

  that.add = function(message) {
    this.backBuffer.removeChild(this.backBuffer.firstChild);
    var line = document.createElement('div');
    line.innerHTML = message;
    this.backBuffer.appendChild(line);
  }

  return that;
}
