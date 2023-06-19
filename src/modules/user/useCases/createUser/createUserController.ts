import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './createUserUseCase';

export class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            email,
            password,
            role,
            active,
            virtual,
            fut,
            jogadorCaro,
            manualPrime,
            dueDate,
            mjcDate,
        } = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        const res = await createUserUseCase.execute({
            name,
            email,
            password,
            role,
            active,
            virtual,
            fut,
            jogadorCaro,
            manualPrime,
            dueDate,
            mjcDate,
        });
        if (!res) {
            return response.status(500).send({ message: 'Usuário já existe' });
        }
        return response.json(res);
    }
}
