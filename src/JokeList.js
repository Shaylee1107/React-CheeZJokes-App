import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

const JokeList = ({numJokesToGet = 5}) => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [voteLeaderboard, setVoteLeaderboard] = useState([]);

  const generateNewJokes = () => {
    setJokes([]);
    setIsLoading(true);
    localStorage.clear();
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

  const updateLocalStorageOnVote = (id, votes, jokeNum) => {
    const jokeData = localStorage.getItem(`${jokeNum}`);
    if(jokeData){
      localStorage.setItem(`${jokeNum}`, JSON.stringify({id: id, votes: votes}));
    } else {
      const jokeObj = {id: id, votes: votes}
      localStorage.setItem(`${jokeNum}`, JSON.stringify(jokeObj));
    }
  }

  const updateVotingLeaderboard = (id, votes, jokeNum) => {
    updateLocalStorageOnVote(id, votes, jokeNum);
    const filteredStorage = [];
    let values = Object.values(localStorage);
    for(let v of values){
      if(v !== 'INFO'){
        filteredStorage.push(JSON.parse(v));
      }
    }
    const sortedStorage = filteredStorage.sort((a, b) => b.votes - a.votes);
    console.log(sortedStorage, 'sortedStorage')

    console.log(jokes, "jokes")

    // jokes.filter((j) => {
    //   if(s.id === j.id){
    //     return [jokes[i], ...jokes]
    //   }
    // })

    // const orderJokes = sortedStorage.forEach((s) => {
    //     for(let i = 0; i < jokes.length; i++){
    //       if(s.id === jokes[i].id){
    //         setJokes(jokes.filter((j) => j !== jokes[i]));
    //         console.log(jokes, 'THIS JOKES')
            
    //         return [jokes[i], ...jokes]
    //       }
    //     }
    //   })
    //   setJokes(orderJokes);
    //   console.log(orderJokes, 'orderJokes')
    };
 
    // return orderJokes; 

  let jokeNum = 0; 

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

        {jokes.map((j) => {
          return (
              <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            updateVotingLeaderboard={updateVotingLeaderboard}
            jokeNum = {++jokeNum}
          />
          )
        })}
        
      </div>
    )
}

export default JokeList;