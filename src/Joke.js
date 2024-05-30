import React, {useState} from "react";
import "./Joke.css";

// class Joke extends Component {
//   render() {
//     const { id, vote, votes, text } = this.props;

//     return (
//       <div className="Joke">
//         <div className="Joke-votearea">
//           <button onClick={evt => vote(id, +1)}>
//             <i className="fas fa-thumbs-up" />
//           </button>

//           <button onClick={evt => vote(id, -1)}>
//             <i className="fas fa-thumbs-down" />
//           </button>

//           {votes}
//         </div>

//         <div className="Joke-text">{text}</div>
//       </div>
//     );
//   }
// }

const Joke = ({id, votes, text}) => {
  const [vote, setVote] = useState(0);

    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={() => vote(id, +1)}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={() => vote(id, -1)}>
            <i className="fas fa-thumbs-down" />
          </button>

          {votes}
        </div>

        <div className="Joke-text">{text}</div>
      </div>
    );
  
}

export default Joke;
