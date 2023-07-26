class Rover {
   constructor(position, mode ='NORMAL', generatorWatts = 110){
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
    }

    receiveMessage(message){
      let response = {
         message: message.name,
         results: [],
      };

      for(let i=0; i<message.commands.length; i++){
         response.results.push(message.commands[i])

         if (message.commands[i].commandType === 'STATUS_CHECK'){
            response.results.push({completed: true, statusRover: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
         }else if (message.commands[i].commandType === 'MODE_CHANGE'){
            response.results.push({completed: true})

         }

      }

      return response
    }
}

module.exports = Rover;


//{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 87382098}} Values for mode, generatorWatts, position 