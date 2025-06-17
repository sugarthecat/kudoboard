const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

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


app.get('/boards', (req, res) => {
    res.json({ message: 'Unimplimented (boards)' })
});

app.get('/boards/:boardId', (req, res) => {
    res.json({ message: `Unimplimented (board ${req.params.boardId})` })
});

app.get('/cards/:cardId', (req, res) => {
    res.json({ message: `Unimplimented (card ${req.params.cardId})` })
});
