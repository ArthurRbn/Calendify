import { VendorService } from './vendor.service';

jest.mock('../models/vendor.model', () => ({
    Vendor: {
        create: jest.fn().mockResolvedValue({ id: 1, username: 'testVendor', password: 'password' }),
    },
}));

describe('VendorService', () => {
    let service: VendorService;

    beforeAll(() => {
        service = new VendorService();
    });

    it('should create a new vendor and return it', async () => {
        const vendor = await service.createVendor('testVendor', 'password');
        console.log(vendor);
        expect(vendor).toEqual({ id: 1, username: 'testVendor', password: 'password' });
    });
});
