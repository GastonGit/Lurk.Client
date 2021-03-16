const chai = require('chai')
const spies = require('chai-spies');
chai.use(spies);
const assert = chai.assert;
const expect = chai.expect
const should = chai.should()

let MonitorTwitchChatClass = require('../lib/MonitorTwitchChat');
let MonitorTwitchChat;

describe('MonitorTwitchChat methods', function() {
    beforeEach(function (){
        MonitorTwitchChat = new MonitorTwitchChatClass();
    })
    describe('getStreamList', function() {
        it('should return an array', function() {
            assert.isArray(MonitorTwitchChat.getStreamList());
        });
        it('should be an empty on init', function() {
            expect(MonitorTwitchChat.getStreamList()).to.be.empty;
        });
    });
    describe('requestStreams', function() {
        it('should return an object', function() {
            expect(MonitorTwitchChat.requestStreams()).to.be.an('object');
        });
    });
    describe('updateStreamList', function() {
        it('should throw if used with undefined argument', function() {
            expect(MonitorTwitchChat.updateStreamList).to.throw();
        });
        it('should throw if used with an empty object argument', function() {
            expect(function(){MonitorTwitchChat.updateStreamList({})}).to.throw();
        });
        it('should throw if object argument does not contain a data key', function() {
            expect(function(){MonitorTwitchChat.updateStreamList({"test":[{}]})}).to.throw();
        });
        it('should not throw if used with an object argument that contains a data key', function() {
            expect(function(){MonitorTwitchChat.updateStreamList({"data":[{}]})}).to.not.throw();
        });
        it('should not throw if used with valid object argument', function() {
            expect(function(){MonitorTwitchChat.updateStreamList({
                "data": [
                    {
                        "user_name": "moonmoon",
                        "viewer_count": 69
                    }
                ]
            })}).to.not.throw();
        });
        it('should update streamList if used with valid object argument', function() {
            expect(MonitorTwitchChat.getStreamList()).to.be.empty;

            MonitorTwitchChat.updateStreamList({
                "data": [
                    {
                        "user_name": "moonmoon",
                        "viewer_count": 69
                    }
                ]
            })

            expect(MonitorTwitchChat.getStreamList()).to.deep.include(
                {
                "user_name": "moonmoon",
                "viewer_count": 69
                }
            )
        });

    });
});