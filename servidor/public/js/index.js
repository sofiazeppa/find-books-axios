// go to /books/new
$('#new').on('click', function() {
    window.location.href = 'http://localhost:3000/books/new'
})

// send data (isbn)
$('#button-isbn').on('click', function() {
    let isbn = $('#input-isbn').val()
    axios
        .post('http://localhost:3000/api/books', isbn)
        .then( function() {
            window.location.href = 'http://localhost:3000/books'
        })
})

// append data
axios
    .get('http://localhost:3000/api/books')
    .then(function(response) {
        let data = response.data
        for (let i = 0 ; i < data.length ; i++) {
            // obtenemos las keys del objeto
            const book = `<li><span>${data[i].title}</span> / <span class='isbnCode'>${data[i].isbn}</span> <button class='book-detail'>+</button></li>`
            $(".main-container").append(book)   
        }
    })

// go to detail
$(document).on('click', '.book-detail', function() {
    const isbn = $(this).siblings('.isbnCode').text()
    window.location.href = 'http://localhost:3000/books/detail?isbn='+isbn
})

