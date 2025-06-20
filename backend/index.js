const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

app.use(cors())
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.json({ message: 'Unimplimented (Root)' })
});


app.get('/search', (req, res) => {
    res.json({
        message: `Unimplimented (Search)`,
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
        where: { board_id: parseInt(req.params.boardId) },
        orderBy: [
            {upvotes: 'desc'},
        ]
    });
    res.json(board);
});

app.get('/cards/:cardId', async (req, res) => {
    const card = await prisma.card.findFirst({
        where: { card_id: { "equals": parseInt(req.params.cardId) } }
    });
    card.comments = await prisma.comment.findMany({
        where: { card_id: { "equals": parseInt(req.params.cardId) } }
    });
    res.json(card);
});

app.put('/cards/:cardId/upvote', async (req, res) => {
    const card = await prisma.card.findFirst({
        where: { card_id: parseInt(req.params.cardId) }
    });
    const newCard = await prisma.card.update(
        {
            where: { card_id: card.card_id },
            data: { upvotes: card.upvotes + 1 }
        },
    )
    res.json(newCard);
});

app.post('/cards/:cardId', async (req, res) => {
    if (!req.body.content) {
        return res.status(400).json({ "error": 'content is required.' })
    }
    if (!req.body.card_id) {
        return res.status(400).json({ "error": 'Card ID required' })
    }
    const { content, author, card_id } = req.body
    const newComment = await prisma.comment.create({
        data: {
            content,
            author,
            card_id
        }
    })
    res.json(newComment)
});

app.delete('/comments/:commentId', async (req, res) => {
    const comment_id = req.params.commentId
    const newComment = await prisma.comment.delete({
        where: {
            comment_id: parseInt(comment_id)
        }
    })
    res.json(newComment)
});
app.delete('/cards/:cardId', async (req, res) => {
    const card_id = req.params.cardId
    const deletedCard = await prisma.card.delete({
        where: {
            card_id: parseInt(card_id)
        }
    })
    res.json(deletedCard)
});


app.post('/boards', async (req, res) => {
    if (!req.body.name || !req.body.type || !req.body.img_source) {
        return res.status(400).json({ "error": 'Name, image, and type are required.' })
    }
    const { name, author, type, img_source } = req.body
    const newBoard = await prisma.board.create({
        data: {
            name,
            author,
            type,
            img_source
        }
    })
    res.json(newBoard)
});

app.put('/cards/:cardId/pinned', async (req, res) => {
    const card = await prisma.card.findFirst({
        where: { card_id: parseInt(req.params.cardId) }
    });
    const newCard = await prisma.card.update(
        {
            where: { card_id: card.card_id },
            data: { isPinned: !card.isPinned}
        },
    )
    res.json(newCard);
});


app.delete('/boards/:boardId', async (req, res) => {
    const board_id = req.params.boardId
    const deletedBoard = await prisma.board.delete({
        where: {
            board_id: parseInt(board_id)
        }
    })
    res.json(deletedBoard)
});
