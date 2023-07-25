class Rover {
   constructor(position, mode ='NORMAL', generatorWatts = 110){
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
    }

    receiveMessage(message){
      let response = {
         message: message,
      };
      return response
    }
}

module.exports = Rover;