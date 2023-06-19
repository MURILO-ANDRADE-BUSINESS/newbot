import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateClientUseCase } from './createClientUseCase';

export class CreateClientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, phone, document } = request.body;
        const createUserUseCase = container.resolve(CreateClientUseCase);
        const res = await createUserUseCase.execute({
            name,
            email,
            phone,
            document,
        });
        if (!res) {
            return response.status(500).send({ message: 'Usuário já existe' });
        }
        return response.json(res);
    }
}
