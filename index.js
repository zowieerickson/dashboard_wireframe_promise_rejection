fetch("https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=RYD8BDXw36XxEEc0URIbaQgqlXvKGmM7gRqmB9fzG3E")
    .then(rsp => rsp.json())
    .then(data => {
        document.querySelector("#author").textContent = data.user.name
        document.body.style.backgroundImage = `url(${data.urls.full})`
    })