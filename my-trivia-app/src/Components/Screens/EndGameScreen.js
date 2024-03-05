import { useState, useContext, useEffect } from "react";
import { TriviaContext } from "../../TriviaContexts";
import AnswerBtn from "../Btns/AnswerBtn";

//end game screen where the user can reset game, new player and see the leaderboard
function EndGameScreen() {
    const triviaContext = useContext(TriviaContext);
    const [leaderboard, setLeaderboard] = useState(null);

    useEffect(() => {
        LoadLeaderboard();
    }, []);

    //load leaderboar don end screen load also update and save.
    async function LoadLeaderboard() {
        //console.log(localStorage.getItem("leaderboard"))
        if (localStorage.getItem("leaderboard") != null) {
            let newleaderboard = await JSON.parse(
                localStorage.getItem("leaderboard")
            );
            console.log(leaderboard);
            newleaderboard.push({
                player: triviaContext.playerName,
                score: triviaContext.score,
            });
            //push new player and sort array, then pop the last place.
            newleaderboard.sort((a, b) => b.score - a.score);

            if (newleaderboard.length > 3) {
                newleaderboard.pop();
                console.log(newleaderboard.length);
            }

            setLeaderboard(newleaderboard);
            localStorage.setItem("leaderboard", JSON.stringify(newleaderboard));
        } else {
            //if leaderboard doesnt exist, create a new one and set player as highscore.
            let newLeaderboard = [
                {
                    player: triviaContext.playerName,
                    score: triviaContext.score,
                },
                {
                    player: "",
                    score: 0,
                },
                {
                    player: "",
                    score: 0,
                },
            ];
            localStorage.setItem("leaderboard", JSON.stringify(newLeaderboard));
            setLeaderboard(newLeaderboard);
        }
    }

    return (
        <div className="flex flex-col">
            <div className="text-6xl text-center">
                <div className="text-4xl">{triviaContext.playerName}</div>
                <div className="text-2xl">Score: {triviaContext.score}</div>
            </div>
            <div className="w-full mt-3">
                <AnswerBtn
                    answer={"Play Again!"}
                    action={triviaContext.PlayAgain}
                    color={"green"}
                />
            </div>
            {/*Leaderboard needs a component */}
            {leaderboard != null ? (
                <div className="flex flex-col mt-3">
                    <div className="text-yellow-500 text-5xl justify-center items-center flex flex-col">
                        <div>1st</div>
                        <div className="text-2xl">
                            {leaderboard[0].player} {leaderboard[0].score}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="text-zinc-500 text-5xl justify-center items-center flex flex-col">
                            <div>2nd</div>
                            <div className="text-2xl">
                                {leaderboard[1].player} {leaderboard[1].score}
                            </div>
                        </div>
                        <div className="text-amber-600 text-5xl justify-center items-center flex flex-col">
                            <div>3rd</div>
                            <div className="text-2xl">
                                {leaderboard[2].player} {leaderboard[2].score}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default EndGameScreen;
