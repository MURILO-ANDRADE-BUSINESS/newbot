import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindClientByEmailUseCase } from './findClientByEmailUseCase';

export class FindUserByEmailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const email = `${request.params.id}`;
        const findClientByEmailUseCase = container.resolve(
            FindClientByEmailUseCase,
        );
        const user = await findClientByEmailUseCase.execute({ email });
        if (!user) {
            return response.status(400).send({ message: 'Usuário não existe' });
        }
        return response.json(user);
    }
}
