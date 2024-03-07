import { Buyer } from '../models/buyer.model';

export class BuyerService {
    async createBuyer(name: string, companyName: string) {
        return await Buyer.create({ name, companyName });
    }

    async deleteBuyer(id: number) {
        return await Buyer.destroy({ where: { id } });
    }
}
