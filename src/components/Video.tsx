import React from 'react';
import '../styles/VideoPlayer.css';

interface VideoState {
    playlist: Array<string>;
    clipIndex: number;
    awaitingClips: boolean;
    updateInterval: NodeJS.Timeout | undefined;
}

export default class Video extends React.Component<unknown, VideoState> {
    constructor(props: unknown) {
        super(props);

        this.state = {
            playlist: [],
            clipIndex: -1,
            awaitingClips: true,
            updateInterval: undefined,
        };

        this.playNextClip = this.playNextClip.bind(this);
    }

    updateTimeInSeconds = 60;

    componentDidMount(): void {
        this.updatePlaylist().then(() => {
            this.initUpdateInterval();
            this.unmuteVideo(
                document.querySelector('.js-video__clip') as HTMLVideoElement,
            );
        });
    }

    componentWillUnmount(): void {
        clearInterval(this.state.updateInterval as NodeJS.Timeout);
    }

    async fetchClips(): Promise<Array<string>> {
        let clips = [];

        try {
            const response = await fetch(
                process.env.REACT_APP_SERVER_URL || '',
            );
            clips = await response.json();
        } catch (e) {
            console.error(e);
        }

        return clips;
    }

    initUpdateInterval(): void {
        const updateInterval = setInterval(
            this.updatePlaylist.bind(this),
            this.updateTimeInSeconds * 1000,
        );

        this.setState({ updateInterval: updateInterval });
    }

    playNextClip(): void {
        if (this.state.clipIndex + 1 < this.state.playlist.length) {
            this.setState((prevState) => ({
                clipIndex: prevState.clipIndex + 1,
            }));
        } else {
            this.setState({ awaitingClips: true });
        }
    }

    async updatePlaylist(): Promise<void> {
        const clips = await this.fetchClips();

        this.addNewClips([...clips]);
    }

    addNewClips(latestClips: Array<string>): void {
        const newClips: Array<string> = [];

        for (let i = 0; i < latestClips.length; i++) {
            if (!this.state.playlist.includes(latestClips[i])) {
                newClips.push(latestClips[i]);
            }
        }

        this.setState((prevState) => ({
            playlist: prevState.playlist.concat(newClips),
        }));

        if (newClips.length > 0) {
            this.newClipsFound();
        }
    }

    newClipsFound(): void {
        if (this.state.awaitingClips) {
            this.setState({ awaitingClips: false });
            this.playNextClip();
        }
    }

    unmuteVideo(videoElement: HTMLVideoElement): void {
        videoElement.muted = false;
    }

    render(): JSX.Element {
        if (!this.state.playlist) {
            return <span>Loading...</span>;
        }

        return (
            <video
                className="js-video__clip"
                src={this.state.playlist[this.state.clipIndex]}
                autoPlay={true}
                controls
                muted
                onEnded={this.playNextClip}
                onError={this.playNextClip}
            />
        );
    }
}
