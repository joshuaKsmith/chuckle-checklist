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

export const tellOrUntellJoke = (editedJoke) => {
    fetch(`http://localhost:8088/jokes/${editedJoke.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedJoke)
    })
}

export const deleteJoke = (jokeID) => {
    fetch(`http://localhost:8088/jokes/${jokeID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json" 
        }
    })
}