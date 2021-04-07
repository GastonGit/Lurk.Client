const helper = require('./helper');

let ClipList = require("./ClipList");
let MonitorTwitchChat = require('./MonitorTwitchChat');
let TwitchClient = require('./TwitchClient');
let Clipper = require('./Clipper');

class HotClipsController{

    clipList;
    monitorTwitchChat;
    timer;
    clipper;
    spikeValue = 50;

    constructor() {
        this.monitorTwitchChat = new MonitorTwitchChat(
            new TwitchClient(),
            {
            requestCount: undefined,
            validMessages: undefined
        });
        this.clipList = new ClipList();
        this.clipper = new Clipper();
    }

    async setupConnection(){
        await this.monitorTwitchChat.updateStreamList();
        await this.monitorTwitchChat.connectToTwitch();
        await this.monitorTwitchChat.joinChannels();
    }

    start(){
        this.startTimer(function (){this.checkForSpikes(this.spikeValue);}, 800);
    }

    startTimer(func, time){
        this.timer = setInterval((func).bind(this),time);
    }

    endTimer(){
        clearInterval(this.timer);
    }

    checkForSpikes(spike){
        helper.ensureArgument(spike, 'number');

        const list = [...this.getStreamList()];

        for (let i = 0; i < list.length; i++){
            if (list[i].hits >= spike){
                this.clipIt(list[i].user_name).catch((error) => {
                    console.error('Error: ' + error);
                });
            }
        }
    }

    async clipIt(streamer){
        helper.ensureArgument(streamer, 'string');

        this.resetHits(streamer);
        const clip = await this.createClip(streamer);
        this.addClip(clip);
    }

    getStreamList(){
        return this.monitorTwitchChat.getStreamList();
    }

    addClip(clip){
        helper.ensureArgument(clip, 'string');

        this.clipList.addClip(clip);
    }

    async createClip(streamer){
        helper.ensureArgument(streamer, 'string');

        return this.clipper.createClip(streamer);
    }

    resetHits(streamer){
        helper.ensureArgument(streamer, 'string');

        this.monitorTwitchChat.resetStreamer(streamer);
    }

    getList(){
        return this.clipList.getList();
    }
}

module.exports = HotClipsController;