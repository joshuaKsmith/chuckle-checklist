export const postNewJoke = (theJoke) => {
    fetch("http://localhost:8088/jokes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "text": theJoke,
            "told": false
        })
    })
}

export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then(res => res.json())
}