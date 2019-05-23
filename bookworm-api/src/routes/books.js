import express from 'express';

const router = express.Router();

router.get('/search', (req, res) => {
  res.json({
    books: [
      {
        goodreadsId: 1,
        title: 'Algorythms',
        authors: 'Luka Massaron',
        covers: [
          'https://cdn1.ozone.ru/multimedia/c1200/1023244230.jpg',
          'https://cdn1.ozone.ru/multimedia/c1200/1016307805.jpg',
        ],
        pages: 198,
      },
      {
        goodreadsId: 2,
        title: '1984',
        authors: 'Orwell',
        covers: [
          'https://cdn1.ozone.ru/multimedia/c500/1011499468.jpg',
          'https://cdn1.ozone.ru/multimedia/c1200/1012184747.jpg',
        ],
        pages: 246,
      },
    ],
  });
});

export default router;
