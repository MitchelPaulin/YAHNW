const secondsInDay = 86400;
const secondsInHour = 3600;
const secondsInMinute = 60;

export function getHumanReadableTimeElapsed(unixTimeStamp: number): string {

    let unixTimeNow = Math.floor(Date.now() / 1000);
    let secondsElapsedSincePost = unixTimeNow - unixTimeStamp;

    if (secondsElapsedSincePost >= secondsInDay) {
        let days = Math.floor(secondsElapsedSincePost / secondsInDay);
        return days > 1 ? `${days} days ago` : '1 day ago';
    }

    if (secondsElapsedSincePost >= secondsInHour) {
        let hours = Math.floor(secondsElapsedSincePost / secondsInHour);
        return hours > 1 ? `${hours} hours ago` : '1 hour ago';
    }

    let minutes = Math.floor(secondsElapsedSincePost / secondsInMinute);
    if (minutes > 0) {
        return minutes > 1 ? `${minutes} minutes ago` : '1 minute ago';
    }

    return 'Just Posted';
}