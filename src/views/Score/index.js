function Score(props) {
    const { score, restart } = props
    //Destructure

    return <div>
        <h2>Score {score}%</h2>

        <button onClick={restart}>Restart</button>
    </div>
}

export default Score

/*
Child se parent ki state change karna!
STEPS:

1. Create a function in Parent component (App.js) that will update the state
2. Pass that function into the Child component (Score.js) via props
3. Call that function from Child component (Score.js) on any event you want
*/