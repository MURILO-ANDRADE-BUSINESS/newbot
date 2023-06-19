import axios from 'axios';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUseCase } from './resetPasswordUseCase';

export class ResetPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
        const user = await resetPasswordUseCase.execute({ email });
        if (!user) {
            return response
                .status(400)
                .send({ message: 'Usuário não encontrado.' });
        }
        const url = 'https://api.brevo.com/v3/smtp/email';
        const email1 = {
            sender: {
                email: 'contato@murilohenrique.com',
                name: 'Murilo Henrique',
            },
            subject: 'Seu novo acesso chegou!',
            templateId: 2,
            to: [
                {
                    email,
                },
            ],
            params: {
                TOKEN: user.id,
            },
        };
        const options = {
            headers: {
                'api-key':
                    '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',
            },
        };
        await axios.post(url, email1, options);
        return response
            .status(200)
            .send({ message: 'Email enviado com sucesso!!' });
    }
}
