|Build|
|----|
| [![Node.js CI](https://github.com/GastonGit/Hot-Twitch-Clips/actions/workflows/node.js.yml/badge.svg)](https://github.com/GastonGit/Hot-Twitch-Clips/actions/workflows/node.js.yml) |
# Hot Clips
Automatically clips exciting and funny moments from Twitch in real-time and then showcases them on a website.

![GIF Preview](client/public/HotClips.gif)

# Features
- Clip live Twitch streamers who are undergoing a spike in emote usage
- Options for deciding both emotes to watch and sensitivity
- Cycle the latest clipped clips on a minimalistic website

# Basic description of the software
1. Start monitoring the chat rooms of the top streamers of Twitch based on view count
2. Watch for a high usage of certain emotes within a short period of time
3. During such an event, create a clip
4. Add the clip url to an array.
5. Cycle the clips from the array on a website.

# FAQ
### Why do I have to manually unmute?
Because Chrome does not allow websites to autoplay unmuted videos, for more details see https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
### Why does X streamer never show up?
The streamer might have clip creation restricted to subscribers
### Why are all clips 30 seconds long? Why are some clips badly timed, ending abruptly or missing context?
The official API for Twitch clips is currently very limited

# Development
## [Milestones](https://github.com/GastonGit/Hot-Twitch-Clips/milestones)
## APIs
- [Twitch](https://dev.twitch.tv/docs/api/reference)
- [TMI.JS](https://github.com/tmijs/docs/tree/gh-pages/_posts/v1.4.2)
## How to set up
- [Setup client](client/README.md)
- [Setup server](server/README.md)