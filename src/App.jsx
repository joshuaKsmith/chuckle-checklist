import { useEffect, useState } from "react"
import { getAllJokes, postNewJoke, tellOrUntellJoke } from "./services/jokeService"
import stevePic from "./assets/steve.png"

export const App = () => {
    const [userInput, setUserInput] = useState("")
    const [allJokes, setAllJokes] = useState([])
    const [untoldJokes, setUntoldJokes] = useState([])
    const [toldJokes, setToldJokes] = useState([])

    useEffect(() => {
        getAllJokes().then(jokesArray => {
            setAllJokes(jokesArray)
            console.log("jokes stored in state")
        })
    }, [])

    useEffect(() => {
        setUntoldJokes(allJokes.filter(
            (joke) => !joke.told
        ))
        setToldJokes(allJokes.filter(
            (joke) => joke.told
        ))
    }, [allJokes])

    const storeAllJokesInState = () => {
        getAllJokes().then(jokesArray => {
            setAllJokes(jokesArray)
            console.log("jokes refreshed")
        })
    }

    const toggleJokeStatus = (jokeToEdit) => {
        const editedJoke = {
            "id": jokeToEdit.id,
            "text": jokeToEdit.text,
            "told": !jokeToEdit.told
        }
        tellOrUntellJoke(editedJoke)
    }

    return (
        <div className="app-container">
            <div className="app-heading">
                <h1 className="app-heading-text">
                    Chuckle Checklist
                </h1>
                <div className="app-heading-circle">
                    <img className="app-logo" src={stevePic} alt="Good job Steve" />
                </div>
            </div>
            <h2>Add Joke</h2>
            <div className="joke-add-form">
                <input
                    id="joke"
                    className="joke-input"
                    type="text"
                    placeholder="New One Liner"
                    value={userInput}
                    onChange={(event) => {
                        // What's the value of event?
                        setUserInput(event.target.value)
                    }}
                />
                <button
                    className="joke-input-submit"
                    onClick={() => {
                        postNewJoke(userInput)
                        setUserInput("")
                        storeAllJokesInState()
                    }}
                >
                    Save Joke
                </button>
            </div>
            <div className="joke-lists-container">
                <div className="joke-list-container">
                    <h2>
                        Untold
                        <span className="untold-count">{untoldJokes.length}</span>
                    </h2>
                    {untoldJokes.map((joke) => {
                        return (
                            <li className="joke-list-item" key={joke.id}>
                                <p className="joke-list-item-text">
                                    {joke.text}
                                </p>
                                <div>
                                    <button
                                        className="joke-list-action-toggle"
                                        onClick={() => {
                                            toggleJokeStatus(joke)
                                            storeAllJokesInState()
                                        }}
                                    >
                                        Tell
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </div>
                <div className="joke-list-container">
                    <h2>
                        Told
                        <span className="told-count">{toldJokes.length}</span>
                    </h2>
                    {toldJokes.map((joke) => {
                        return (
                            <li className="joke-list-item" key={joke.id}>
                                <p className="joke-list-item-text">
                                    {joke.text}
                                </p>
                                <div>
                                    <button
                                        className="joke-list-action-toggle"
                                        onClick={() => {
                                            toggleJokeStatus(joke)
                                            storeAllJokesInState()
                                        }}
                                    >
                                        Untell
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
