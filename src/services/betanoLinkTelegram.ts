import { botConfig } from './botConfig';

export async function betanoLinkOnTelegram(bot: any) {
    const message = `
Ganhe até 500 reais em bônus no primeiro depósito para cadastro novos através desse link 👇🏻

[Clica aqui para fazer seu cadastro](https://gml-grp.com/C.ashx?btag=a_14207b_2032c_&affid=4438&siteid=14207&adid=2032&c=) 
`;
    console.log('enviei');
    await bot.sendPhoto(
        botConfig.chat,
        'https://videos.robogol.com.br/betano+card.png',
        { caption: message, parse_mode: 'MarkdownV2' },
    );
    await bot.sendPhoto(
        botConfig.charPrime,
        'https://videos.robogol.com.br/betano+card.png',
        { caption: message, parse_mode: 'MarkdownV2' },
    );
}
