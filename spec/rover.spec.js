const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110)
  });

  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MOVE', 12000), new Command('STATUS_CHECK')]
    let response = new Message("Test message with two commands",commands);
    let rover = new Rover(12000);    
    expect(rover.receiveMessage(response).message).toEqual(response)
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('MOVE', 12000), new Command('STATUS_CHECK')];
    let response = new Message("Test message with two commands",commands);
    let rover = new Rover(12000).receiveMessage(response.commands);
    expect(commands.length).toEqual(rover.message.length);
  });

  it('responds correctly to status check command',function(){
    
  }); 

});


//let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
//let message = new Message("Test message with two commands", commands)
//let rover = new rover(12000);
//let response = rover.receiveMessage(message);
//console.log(response.message);< should print the name of the message, "Test message with two commands"