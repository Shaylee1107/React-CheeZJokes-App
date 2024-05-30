import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

const JokeList = ({numJokesToGet = 5}) => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateNewJokes = () => {
    setJokes([]);
    setIsLoading(true);
  }

  useEffect(() => {
    const getJokes = async() => {
      try {
        let seenJokes = new Set();
        while (jokes.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { ...joke } = res.data;
  
          if (!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id);
            jokes.push({ ...joke });
          } else {
            console.log("duplicate found!");
          }
        }

        setIsLoading(false);

      } catch (err) {
        console.error(err);
      }
    }

    getJokes();
  }, [generateNewJokes])

  const showLoadingSpinner = () => {
    if(isLoading === true){
      return (
        <div className="loading">
         <i className="fas fa-4x fa-spinner fa-spin" />
       </div>
      )
    }
  }

    return (
      <div className="JokeList">
        <button
          className="JokeList-getmore"
          onClick={() => generateNewJokes()}
        >
          Get New Jokes
        </button>
        <div>
          {showLoadingSpinner()}
        </div>

        {jokes.map(j => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
          />
        ))}
      </div>
    )
}

export default JokeList;