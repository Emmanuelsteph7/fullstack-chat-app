/**
 *
 * The aim of this function is to mimic slow connetions to show the fallback;
 *
 * Eg. wait for 2s
 * const ScheduleInner = lazy(() => wait().then(() => import('./ScheduleInner')));
 */
export const wait = (time = 1000) => new Promise((resolve) => setTimeout(resolve, time));
