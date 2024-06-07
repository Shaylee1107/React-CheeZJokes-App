import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

const JokeList = ({numJokesToGet = 5}) => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [changeJokeOrder, setChangeJokeOrder] = useState(false);
  const [sortedStorage, setSortedStorage] = useState([]);

  const generateNewJokes = useCallback(() => {
    setJokes([]);
    setSortedStorage([]);
    setIsLoading(true);
    localStorage.clear();
    setChangeJokeOrder(false);
  }, []);

  const displayJokesOnUI = () => {
      return (
          jokes.map((j) => {
            const data = {id: j.id, votes: 0, text: j.joke, key: j.id};
            localStorage.setItem(`${j.id}`, JSON.stringify(data));
          return (
              <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            updateLocalStorageOnVote={updateLocalStorageOnVote}
          />
          )})
        )
  }

  const displayNewOrderdJokesOnUI = () => {
    return (
      sortedStorage.map((j) => {
      return (
          <Joke
        text={j.text}
        key={j.id}
        id={j.id}
        updateLocalStorageOnVote={updateLocalStorageOnVote}
      />
      )})
    )
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
  }, [generateNewJokes, jokes, numJokesToGet])

  const updateSortedStorage = () => {
    const storage = Object.values(localStorage);
    const filterdStorage = storage.filter(j => j !== "INFO");
    const loopedStorage = filterdStorage.map((j) => {
        return JSON.parse(j);
    })
    const mySortedStorage = loopedStorage.sort((a, b) => b.votes - a.votes);
    setSortedStorage(mySortedStorage);
    setChangeJokeOrder(true);
  }

  const updateLocalStorageOnVote = useCallback((id, votes, text, key) => {
    const data = {id: id, votes: votes, text: text, key: key};
    localStorage.setItem(`${id}`, JSON.stringify(data));
    setSortedStorage([]);
    updateSortedStorage();
}, []);

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
          onClick={generateNewJokes}
        >
          Get New Jokes
        </button>
        <div>
          {showLoadingSpinner()}
        </div>

        {changeJokeOrder === false ? displayJokesOnUI() : displayNewOrderdJokesOnUI()}
        
      </div>
    )
}

export default JokeList;