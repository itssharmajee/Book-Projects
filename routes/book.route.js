import express from 'express'
import { addNewBook, deleteBook, getAllBooks, getBook, updateBook } from '../controllers/book.controller.js';

const router = express.Router({ mergeParams: true });

router.route('/book').get(getAllBooks)
                    .post(addNewBook)

router.route('/book/:id').get(getBook)
                        .patch(updateBook)
                        .delete(deleteBook)

export default router;