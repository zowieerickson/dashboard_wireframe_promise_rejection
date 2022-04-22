fetch("https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=RYD8BDXw36XxEEc0URIbaQgqlXvKGmM7gRqmB9fzG3E")
    .then(rsp => rsp.json())
    .then(data => {
        document.querySelector("#author").textContent = data.user.name
        document.body.style.backgroundImage = `url(${data.urls.full})`
    })
    .catch(err => {
        console.log(err)

        const defaultImg = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMjEyOTV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTA2NDE5Mjg&ixlib=rb-1.2.1&q=85';
        const defaultAuthor = 'Kalen Emsley';

        document.body.style.backgroundImage = `url(${defaultImg})`;
        document.querySelector("#author").textContent = defaultAuthor;
    })