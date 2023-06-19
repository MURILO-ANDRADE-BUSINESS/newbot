import axios from 'axios';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUseCase } from './resetPasswordUseCase';

export class SendEmailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
        const user = await resetPasswordUseCase.execute({ email });
        return response
            .status(200)
            .send({ message: 'Email enviado com sucesso!!' });
    }
}
