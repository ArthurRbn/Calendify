import express from 'express';
import { registerVendor, loginVendor, validateVendorToken } from '../controllers/vendor.controller';
import { authenticate } from '../middlewares/authenticate.middleware';

const router = express.Router();

router.post('/register', registerVendor);
router.post('/login', loginVendor);
router.post('/validate-token', authenticate, validateVendorToken);

export default router;
