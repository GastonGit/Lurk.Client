const helper = require('../lib/helper');

class TwitchClient{
    constructor() {}

    connectToTwitch(){

    }

    async getAccessToken(){

        return "accesstoken";
    }

    async getBroadcasterID(id){
        helper.ensureArgument(id, 'string');

        return Promise.resolve('broadcasterid');
    }

    async getUser(name){
        helper.ensureArgument(name, 'string');


        return {"data":[]};
    }

    setMessageHandler(messageHandler){
        helper.ensureArgument(messageHandler, 'function');
    }

    joinChannels(channels){
        helper.ensureArgument(channels, 'string');
    }
}

module.exports = TwitchClient;