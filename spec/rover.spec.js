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
  //   let commands = [new Command('MOVE', 12000), new Command('STATUS_CHECK')];
  //   let response = new Message("Test message with two commands",commands);
  //   let rover = new Rover(12000)
  //   let output = rover.receiveMessage(response);
  //   expect(output.results.length).toEqual(2);
  });
//test 10
  it('responds correctly to status check command',function(){
    let commands = [new Command('STATUS_CHECK')];
    let response = new Message("Test message with two commands",commands);
    let rover = new Rover(12000);
    let output = rover.receiveMessage(response);
    expect(output.results[1].statusRover.mode).toEqual('NORMAL')
    expect(output.results[1].statusRover.generatorWatts).toEqual(110)
    expect(output.results[1].statusRover.position).toEqual(12000)
  });
//test 11
  it('responds correctly to mode change command', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let response = new Message("Test message with two commands",commands);
    let rover = new Rover(12000);
    let output = rover.receiveMessage(response);
    console.log(output)
  });



});
