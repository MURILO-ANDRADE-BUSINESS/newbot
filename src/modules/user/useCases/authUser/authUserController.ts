import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthUserUseCase } from './authUserUseCase';

export class AuthUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const authenticateUserUseCase = container.resolve(AuthUserUseCase);
        const res = await authenticateUserUseCase.execute({
            email,
            password,
        });
        return response.json(res);
    }
}
