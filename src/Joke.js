import React, {useState} from "react";
import "./Joke.css";

const Joke = ({text, updateLocalStorageOnVote, id}) => {
  const [votes, setVotes] = useState(0);

    const currentVoteCount = (userVote) => {
      if(userVote === 'up'){
        return votes + 1;
      } else {
        return votes - 1;
      }
    }

    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={() => {
            setVotes(vote => vote + 1)
            updateLocalStorageOnVote(id, currentVoteCount('up'), text, id);
            }}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={() => {
            setVotes(vote => vote - 1)
            updateLocalStorageOnVote(id, currentVoteCount('down'));
          }}>
            <i className="fas fa-thumbs-down" />
          </button>

          {votes}
        </div>

        <div className="Joke-text">{text}</div>
      </div>
    );
  
}

export default Joke;
