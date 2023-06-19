import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './updateUserUseCase';

export class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            id,
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
        const upateUserUseCase = container.resolve(UpdateUserUseCase);
        const res = await upateUserUseCase.execute({
            id,
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
            return response.status(500).send({ message: 'Usuário não existe' });
        }
        return response.json(res);
    }
}
