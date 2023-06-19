/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { inject, injectable } from 'tsyringe';

// import { AppError } from '../../../../erros/AppError';
import { IUpcommingEventsBetanoRepository } from '../../repositories/types/IBetsRepository';
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';

@injectable()
class GetUpcomingEventsBetanoUseCase {
    constructor(
        @inject('BetanoEvents')
        private upcomingEventsBetanoRepository: IUpcommingEventsBetanoRepository,
    ) {}
    async execute(): Promise<boolean> {
        try {
            const url =
                'https://br.betano.com/api/sport/futebol/jogos-de-hoje/?req=la,s,tn,stnf,c,mb';
            const resultados = await axios.get(url);
            const array = resultados.data.data.blocks[0].events;
            let flag = true;
            const date = new Date();
            const day = date.getDate();
            const plusDate = new Date().setDate(day + 1);
            const aux = new Date(plusDate);
            const plusDay = aux.getDate();
            let count = 0;
            while (flag === true) {
                try {
                    const { length } = array;
                    const games = await axios.get(
                        `https://br.betano.com/api/sport/futebol/jogos-de-hoje/?latestId=${
                            array[length - 1].id
                        }&req=la,s,tn,stnf,c,mb`,
                    );

                    if (
                        games.data.data.blocks[0] &&
                        games.data.data.blocks[0].events[0]
                    ) {
                        const gameDate = new Date(
                            games.data.data.blocks[0].events[0].startTime,
                        );
                        const gameDay = gameDate.getDate();
                        if (gameDay === day || gameDay === plusDay) {
                            for (
                                let j = 0;
                                j < games.data.data.blocks[0].events.length;
                                j++
                            ) {
                                array.push(games.data.data.blocks[0].events[j]);
                            }
                        } else if (count > 10) {
                            flag = false;
                        } else {
                            for (
                                let j = 0;
                                j < games.data.data.blocks[0].events.length;
                                j++
                            ) {
                                array.push(games.data.data.blocks[0].events[j]);
                            }
                            count += 1;
                        }
                    } else {
                        flag = false;
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            for (let i = 0; i < array.length; i++) {
                try {
                    const element = array[i];
                    const sportRadarGame = await axios.get(
                        `https://stats.fn.sportradar.com/betano/br/America:Montevideo/gismo/match_get/${element.betRadarId}`,
                    );
                    const currentGame = sportRadarGame.data.doc[0].data.teams;
                    const gameUrl = element.url.replace(
                        '/odds',
                        'https://br.betano.com/live',
                    );
                    const game = {
                        id: element.id,
                        name: element.name,
                        home:
                            currentGame && currentGame.home
                                ? currentGame.home
                                : null,
                        away:
                            currentGame && currentGame.away
                                ? currentGame.away
                                : null,
                        time: element.startTime,
                        url: gameUrl,
                    };
                    await this.upcomingEventsBetanoRepository.create(game);
                } catch (e) {
                    console.log(e);
                    console.log(`erro na aquisicao de links da sportRadar`);
                }
            }
            console.log('jogos atualizados 🚀');
            return true;
        } catch (e) {
            console.log(`erro na aquisicao de links da betano`);
            console.log(e);
            return false;
        }
    }
}

export { GetUpcomingEventsBetanoUseCase };
