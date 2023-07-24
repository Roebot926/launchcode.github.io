const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {
    
  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    expect( function() { new Message();}).toThrow(new Error('Name is required.'));
  });

  it('constructor sets name', function(){
    let message = new Message('Test message with two commands');
    expect(message.name).toEqual('Test message with two commands');
  })

  it('contains a commands array passed into the constructor as 2nd argument', function(){
    let commands = [new Command('MOVE', 12000), new Command('STATUS_CHECK')]
    let commandTypes = new Message("Test message with two commands",commands);
    expect(commandTypes.commands).toEqual(commands);
  })
  
});
