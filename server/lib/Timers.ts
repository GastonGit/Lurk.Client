import config from './settings/config.json';

export default class Timers {
    private checkTimer: NodeJS.Timer | undefined;
    private reduceTimer: NodeJS.Timer | undefined;
    private updateTimer: NodeJS.Timer | undefined;

    private callMe;

    private constrainedIntervals: Array<NodeJS.Timer> = [];
    private constrainedEvents: Array<{ event: string; timer: number }> = [];

    private updateTimeInMinutes: number = config.updateTimeInMinutes * 60000;

    private spikeTime: number = config.spikeTime;
    private reduceTime: number = config.reduceTime;

    constructor(callMe: (event: string) => void) {
        this.callMe = callMe;
    }

    public startMainTimer(): void {
        this.startMonitorTimers();
        this.updateTimer = setInterval(async () => {
            this.endAllMonitorTimers();
            await this.callMe('main');
            this.startMonitorTimers();
        }, this.updateTimeInMinutes);
    }

    public createConstrainedInterval(event: string, timer: number): void {
        this.constrainedEvents.push({ event: event, timer: timer });
    }

    private startConstrainedIntervals(): void {
        for (let i = 0; i < this.constrainedEvents.length; i++) {
            this.constrainedIntervals.push(
                setInterval(() => {
                    this.callMe(this.constrainedEvents[i].event);
                }, this.constrainedEvents[i].timer),
            );
        }
    }

    private endConstrainedIntervals(): void {
        for (let i = 0; i < this.constrainedIntervals.length; i++) {
            clearInterval(this.constrainedIntervals[i]);
        }
        this.constrainedIntervals = [];
    }

    private startMonitorTimers(): void {
        this.checkTimer = setInterval(() => {
            this.callMe('hit');
        }, this.spikeTime);
        this.reduceTimer = setInterval(() => {
            this.callMe('reduce');
        }, this.reduceTime);
    }

    private endAllMonitorTimers(): void {
        clearInterval(<NodeJS.Timeout>this.checkTimer);
        clearInterval(<NodeJS.Timeout>this.reduceTimer);
    }
}
