import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
res.send("hello world");
})
router.post('/upload', async (req, res) => {
    res.json()
})
export default router;