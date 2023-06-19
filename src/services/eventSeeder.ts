/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { getUpcomingEvents } from './betsService';

export async function eventSeeder() {
    try {
        console.log(`estamos esxecutando aqui!`);
        await getUpcomingEvents();
    } catch (err) {
        console.log(err);
    }
}
