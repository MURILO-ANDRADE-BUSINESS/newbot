import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindUserByPlatformUseCase } from './findUserByPlatformUseCase';

export class FindUserByPlatformController {
    async handle(request: Request, response: Response): Promise<Response> {
        const email = `${request.params.id}`;
        const platform = `${request.params.platform}`;
        const findUserByEmailUseCase = container.resolve(
            FindUserByPlatformUseCase,
        );
        const user = await findUserByEmailUseCase.execute({ email, platform });
        if (!user) {
            return response.status(400).send({ message: 'Usuário não existe' });
        }
        return response.json(user);
    }
}
