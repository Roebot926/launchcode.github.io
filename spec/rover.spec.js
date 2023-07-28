const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');


describe("Rover class", function() {
// test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110)
  });
// test 8
  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MOVE', 12000), new Command('STATUS_CHECK')]
    let response = new Message("Test message with two commands", commands);
    let rover = new Rover(12000); 
    let output = rover.receiveMessage(response)   
    expect(output.message).toEqual(response.name)

  });
// test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('MOVE', 12000), new Command('STATUS_CHECK')];
    let response = new Message("Test message with two commands",commands);
    let rover = new Rover(12000)
    let output = rover.receiveMessage(response);
    expect(output.results.length).toEqual(2);

  });
//test 10
  it('responds correctly to status check command',function(){
    let commands = [new Command('STATUS_CHECK')];
    let response = new Message("Test message with two commands",commands);
    let rover = new Rover(12000);
    let output = rover.receiveMessage(response);
    expect(output.results[0].roverStatus.mode).toEqual('NORMAL')
    expect(output.results[0].roverStatus.generatorWatts).toEqual(110)
    expect(output.results[0].roverStatus.position).toEqual(12000)
  });
//test 11
  it('responds correctly to mode change command', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let response = new Message("Test message with two commands",commands);
    let rover = new Rover(12000);
    let output = rover.receiveMessage(response);
    expect(output.results[0].roverStatus.mode).toEqual('LOW_POWER');
    expect(output.results[0].completed).toEqual(true)

  });
//test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode.", function(){
    
    let rover = new Rover(12000);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 420)];
    let response = new Message("Test message with two commands",commands);
    let output = rover.receiveMessage(response);
    let rover2 = new Rover(1080);
    let commands2 = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 1724)];
    let response2 = new Message("ALERT",commands2);
    let output2 = rover2.receiveMessage(response2)
    
    expect(output.results[1].completed).toEqual(false);
    expect(output2.results[0].completed).toEqual(true);

 
  });

//test 13
it("responds with position for move command.", function(){
  let rover = new Rover(12000);
  let commands = [new Command('MOVE', 1420)];
  let response = new Message("Test message with two commands",commands);
  let output = rover.receiveMessage(response);
  let rover2 = new Rover(1080);
  let commands2 = [new Command('MOVE', 1724)];
  let response2 = new Message("ALERT",commands2);
  let output2 = rover2.receiveMessage(response2);
  expect(output.results[0].roverStatus.position).toEqual(1420);
  expect(output2.results[0].roverStatus.position).toEqual(1724);

});




});
