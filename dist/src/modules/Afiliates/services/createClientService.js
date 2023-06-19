"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientService = void 0;
class CreateClientService {
    constructor(ClientRepository) {
        this.ClientRepository = ClientRepository;
    }
    execute({ name, email, phone, document, zipcode, address, district, state, city, }) {
        const exists = this.ClientRepository.findByEmail({ email });
        if (exists) {
            throw new Error('Usuário já cadastrado');
        }
        this.ClientRepository.create({
            name,
            email,
            phone,
            document,
            zipcode,
            address,
            district,
            state,
            city,
        });
    }
}
exports.CreateClientService = CreateClientService;
