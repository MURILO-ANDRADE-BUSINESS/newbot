import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { container } from 'tsyringe';

import { FindSalesByUserUseCase } from './findSalesByUserUseCase';

export class FindSalesByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        // eslint-disable-next-line radix
        const period = parseInt(`${request.params.id}`);
        const findSalesByUserUseCase = container.resolve(
            FindSalesByUserUseCase,
        );
        const token = request.headers.auth as string;
        if (!token) {
            console.log(request.headers);
            return response
                .status(401)
                .send({ auth: false, message: 'No token provided.' });
        }
        const decoded = jwt.decode(token);
        const { id } = decoded;
        const user = await findSalesByUserUseCase.execute({ id, period });
        if (!user) {
            return response.status(400).send({ message: 'Usuário não existe' });
        }
        return response.json(user);
    }
}
