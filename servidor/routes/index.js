var express = require('express');
var router = express.Router();
const axios = require('axios');
const path = require('path');

// arr of isbn codes
let books = []

// renders home
router.get('/books', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'))
})

// renders new
router.get('/books/new', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..', 'public', 'html', 'new.html'))
})

// renders detail
router.get('/books/detail', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..', 'public', 'html', 'detail.html'))
})


// returns arr books
router.get('/api/books', function(req, res, next) {
	res.json(books)
})

// saves isbn code and title in arr books
router.post('/api/books', function(req, res, next) {
	const isbn = req.body
	let isbnKey = Object.keys(isbn)
	isbnKey = isbnKey[0]

	axios
		.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbnKey)
		.then(function (result) {

			const book = {
				title: result.data.items[0].volumeInfo.title,
				isbn: isbnKey
			}

			books.push(book)
			res.json(books)
		})
})

// gets the book info
router.get('/api/books/:isbn', function(req, res, next) {
	const isbn = req.params.isbn

	axios
		.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn)
		.then(function (result) {
			// get data with result.data
			console.log(result.data)
			const data = result.data
			
			const title = data.items[0].volumeInfo.title
			const subtitle = data.items[0].volumeInfo.subtitle
			const desc = data.items[0].volumeInfo.description
			const authors = data.items[0].volumeInfo.authors
			const cover = data.items[0].volumeInfo.imageLinks.smallThumbnail
			
			// create object
			const book = {
				title: title,
				subtitle: subtitle,
				description: desc,
				authors: authors,
				cover: cover
			}
			// send data
			res.json(book)
		})
})

// 9780307743671

module.exports = router;
