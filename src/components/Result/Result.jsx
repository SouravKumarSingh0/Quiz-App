import React, { useState, useEffect } from "react";
import "./Result.scss";

const Result = ({ totalQuestions, result, onTryAgain }) => {
    const [name, setName] = useState("");
    const [highScores, setHighScores] = useState([]);
    const [showScores, setShowScores] = useState(false);

    useEffect(() => {
        setHighScores(JSON.parse(localStorage.getItem("highScores")) || []);
    }, []);

    const handleSave = () => {
        const score = {
            name,
            score: result.score
        };

        const handleTryAgain = () => {
            setShowScores(false);
            setHighScores([]);
            onTryAgain();
         }

        const newHighScores = [...highScores, score].sort(
            (a, b) => b.score - a.score);
        setHighScores(newHighScores);
        setShowScores(true);
        localStorage.setItem('highScores', JSON.stringify(newHighScores));
    };

    return (
        <div className="result">
          <h3>Result</h3>
          <p>Total Questions: <span>{totalQuestions}</span></p>
          <p>Total Score: <span>{result.score}</span></p>
          <p>Correct Answer: <span>{result.correctAnswer}</span></p>
          <p>Wrong Answer: <span>{result.wrongAnswer}</span></p>
            <button onClick={onTryAgain}>Try Again</button>
            
           {!showScores ? <>
                <h3>
                Enter your Name <br /> to save your Score!
                </h3>
                <input placeholder="Enter your Name" type="text"
                    value={name} onChange={(event) => setName(event.target.value)} />
                
                <button onClick= {handleSave}>Save</button>
            </> : <>
                    <table>
                        <thead>
                            <tr>
                                <th>Ranking</th>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                            </thead>
                        <tbody>
                            {highScores.map((highScore, i) => {
                                return (
                                    <tr key={`${highScore.score}${highScore.name}${i}`}>
                                        <td>{i +1 }</td>
                                        <td>{highScore.name }</td>
                                        <td>{ highScore.score}</td>
                                </tr> 
                                )
                            })
                            }
                                 
                            </tbody>  
                </table>
            </> 
            }
        </div>
    );
}

export default Result;