import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUpcomingEventsUseCase } from './getUpcomingEventsUseCase';

export class GetUpcomingEventsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const authenticateUserUseCase = container.resolve(
            GetUpcomingEventsUseCase,
        );
        const res = await authenticateUserUseCase.execute();
        return response.json(res);
    }
}
