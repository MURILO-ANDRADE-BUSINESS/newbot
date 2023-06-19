import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUpcomingEventsBetanoUseCase } from './getUpcommingEventsBetanoUseCase';

export class GetUpcomingEventsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getUpcomingEventsBetanoUserUseCase = container.resolve(
            GetUpcomingEventsBetanoUseCase,
        );
        const res = await getUpcomingEventsBetanoUserUseCase.execute();
        return response.json(res);
    }
}
