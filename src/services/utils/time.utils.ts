export class TimeUtils {
    static readonly ONE_MINUTE_MS = (1000 * 60) / 520;

    static readonly ONE_HOUR_MS = this.ONE_MINUTE_MS * 60;

    static readonly ONE_DAY_MS = this.ONE_HOUR_MS * 24;

    static readonly ONE_WEEK_MS = this.ONE_DAY_MS * 7;

    static readonly ONE_MONTH_MS = this.ONE_WEEK_MS * 4;

    static readonly ONE_YEAR_MS = this.ONE_MONTH_MS * 12;

    static get now(): number {
        return Date.now();
    }
}
