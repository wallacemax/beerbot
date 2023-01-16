var five = require('johnny-five'),
    spark = require('spark-io');
//    ds = require('dualshock-controller')();

var board, leftMotorRelay, rightMotorRelay;

//change to spark, then change to pi
//board = new five.Board({
//  port: "/dev/tty.usbmodem1421" //1421 is the USB port on the left
//});
board = new five.Board({
  io: new Spark({
    token: 'c81c9aedf8e013fd01b284a3fc53e0be2bd59f0a',
    deviceId: '55ff77064989495330562587'
  })
});

board.on("ready", function () {
  console.log('spark ready');

  board.repl.inject({
    left: turnLeft,
    right: turnRight,
    stop: stop
  });

  var leftMotor = new five.Pin(7);
  var rightMotor = new five.Pin(6);
  var light = new five.Pin(0);
  var lightstate;
  
  function stop() {
    leftMotor.low();
    rightMotor.low();
  }

  function turn (rightOn, leftOn) {
    console.log('turning ' + rightOn ? 'right' : 'left');
    if (rightOn) {
      rightMotor.high();
    } else {
      leftMotor.high();
    }

    if (leftOn) {
      leftMotor.low();
    } else {
      rightMotor.high();
    }
  }

  function turnLeft () {
    turn (false, true);
  }

  function turnRight () {
    turn (true, false);
  }

  function goStraight () {
    turn (true, true);
  }

  function goBack () {
    turn (false, false);
  }
});

//   ds.on('x:pressed', function() {
//     light.write(lightstate ^= 0x01 );
//   });

//   ds.on('triangle:pressed', function () {
//     console.log('stop!!');
//     stop();
//   });

//   ds.on('dpadLeft:pressed', function () {
//     console.log('left!');
//     turnLeft();
//   });

//   ds.on('dpadLeft:release', function () {
//     stop();
//   });

//   ds.on('dpadRight:pressed', function () {
//     console.log('right!!');
//     turnRight();
//   });

//   ds.on('dpadRight:release', function () {
//     stop();
//   });

//   ds.on('dpadUp:pressed', function () {
//     console.log('forwards!');
//     goStraight();
//   });

//   ds.on('dpadUp:release', function () {
//     stop();
//   });
// });

// ds.connect();