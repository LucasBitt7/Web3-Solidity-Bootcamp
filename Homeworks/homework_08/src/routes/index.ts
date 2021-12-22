import { Router } from 'express';
import { addData, get } from './storageController';

const router = Router();
router.get('/', addData);
router.get('/:cid', get);

const baseRouter = Router();
baseRouter.use('/ipfs', router);
export default baseRouter;