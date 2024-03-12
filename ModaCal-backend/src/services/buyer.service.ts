import {Buyer} from '../models/buyer.model';
import {Appointment} from "../models/appointment.model";

export class BuyerService {
  async getBuyers(vendorId: number) {
    return await Buyer.findAll({
      where: {vendorId: vendorId},
      attributes: ['id', 'name', 'companyName'],
    });
  }

  async createBuyer(vendorId: number, name: string, companyName: string) {
    return await Buyer.create({name, companyName, vendorId});
  }

  async deleteBuyer(vendorId: number, id: number) {
    return await Buyer.destroy({where: {id, vendorId}});
  }
}
