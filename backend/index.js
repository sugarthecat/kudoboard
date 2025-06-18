const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.json({ message: 'Unimplimented (Root)' })
});


app.get('/search', (req, res) => {
    res.json({ message: `Unimplimented (Search)`,
        query: req.query,
     })
});


app.get('/boards', async (req, res) => {
    const boards = await prisma.board.findMany();
    res.json(boards);
});

app.get('/boards/:boardId', async (req, res) => {
    const board = await prisma.board.findFirst({
        where: { board_id: parseInt(req.params.boardId) }
    });
    board.cards = await prisma.card.findMany({
        where: { board_id: parseInt(req.params.boardId) }
    });
    res.json(board);
});

app.get('/cards/:cardId', async (req, res) => {
    const card = await prisma.card.findFirst({
        where: { card_id: parseInt(req.params.cardId) }
    });
    card.comments = await prisma.comment.findMany({
        where: { card_id: parseInt(req.params.cardId) }
    });
    res.json(card);
});
