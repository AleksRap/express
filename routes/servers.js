import { Router } from 'express';
import { getAll, create, remove } from '../controllers/servers.js';

const router = Router();

router.get('/api/server', getAll);
router.post('/api/server', create);
router.delete('/api/server/:idServer', remove);

export default router;
