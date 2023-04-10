function getAllBooks() {
    $.ajax({
        // type: get, post, put or delete
        type: "GET",
        // url: link
        url: "http://localhost:8080/books",
        // processing when calling data successfully
        success: function (foreseen) {
            console.log(foreseen);
            // redraw the board
            let content = ""
            for (let i = 0; i < foreseen.length; i++) {
                content += `<tr>
                                <td>${foreseen[i].book_code}</td>
                                <td>${foreseen[i].name}</td>
                                <td>${foreseen[i].author}</td>
                                <td>${foreseen[i].price}</td>
                                <td>
                                    <button>
                                        <a style="text-decoration: none; color: black" href="view.html?id=${foreseen[i].id}">view</a>
                                    </button>
                                    <button>
                                        <a style="text-decoration: none; color: black" href="edit.html?id=${foreseen[i].id}">edit</a>
                                    </button>
                                    <button onclick="deleteById(${foreseen[i].id})">delete</button>
                                </td>
                            </tr>`
            }
            document.getElementById('content').innerHTML = content;
        }
    });
    event.preventDefault();
}
getAllBooks();

function addNewBook() {
    let book_code = $("#book_code").val();
    let name = $("#name").val();
    let author = $("#author").val();
    let price = $("#price").val();
    let newBook = {
        "book_code": book_code,
        "name": name,
        "author": author,
        "price": price,
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newBook),
        url: "http://localhost:8080/books/create",
        success: function (foreseen) {
            getAllBooks();
        }
    });
    event.preventDefault();
}

function deleteById(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/books/delete/" + id,
        success: function () {
            getAllBooks();
        }
    });
}

function updateById() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    let book_code = $("#book_code").val();
    let name = $("#name").val();
    let author = $("#author").val();
    let price = $("#price").val();
    let newBook = {
        "id": id,
        "book_code": book_code,
        "name": name,
        "author": author,
        "price": price,
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newBook),
        url: "http://localhost:8080/books/edit/" + id,
        success: function (foreseen) {
            getAllBooks();
        }
    });
    event.preventDefault();
}

function showDetailBookInformation() {

}


function searchBooks() {
    let name = $("#search").val();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/books/search",
        success: function () {}
    })
}