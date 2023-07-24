const Command = require('../command.js');

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });
  
  it('constructor sets command type', function(){
    let command = new Command('MODE_CHANGE');
    expect(command.commandType).toEqual('MODE_CHANGE');
  });

  it('constructor sets a value passed in as the 2nd argument', function(){
    let command = new Command('MOVE', 12000);
    expect(command.value).toEqual(12000);
  });

});