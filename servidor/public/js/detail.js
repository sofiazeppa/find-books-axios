// get params
const urlParams = new URLSearchParams(window.location.search);
const isbn = urlParams.get('isbn');
console.log(isbn)

// append the data
axios
    .get('http://localhost:3000/api/books/'+isbn)
    .then(function(response) {
        const data = response.data
        $('p').remove()
        
        const content = `<img src='${data.cover}'></img>
                        <h3>${data.title}</h3>
                        <p>${data.subtitle}</p>
                        <p>${data.description}</p>
                        <p>${data.authors}</p>`
        $('.book-container').append(content)

    })

// go to homepage
$('#gohome').on('click', function() {
    window.location.href = 'http://localhost:3000/books'
})