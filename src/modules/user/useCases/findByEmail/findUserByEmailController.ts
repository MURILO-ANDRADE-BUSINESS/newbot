import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindUserByEmailUseCase } from './findUserByEmailUseCase';

export class FindUserByEmailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const email = `${request.params.id}`;
        const findUserByEmailUseCase = container.resolve(
            FindUserByEmailUseCase,
        );
        const user = await findUserByEmailUseCase.execute({ email });
        if (!user) {
            return response.status(400).send({ message: 'Usuário não existe' });
        }
        return response.json(user);
    }
}
