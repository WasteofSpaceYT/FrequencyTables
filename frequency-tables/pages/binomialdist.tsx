import "next"
import { useState } from "react"

const BinomialDist = () => {
    let [mean, setMean] = useState(0.0)
    let [standardDeviation, setStandardDeviation] = useState(0.0)
    const handleSubmit = (e: any) => {
        e.preventDefault()
        let trials = e.target[0].value
        let prob = e.target[1].value
        let mean = trials * prob
        let standardDeviation = Math.sqrt(trials * prob * (1 - prob))
        setMean(mean)
        setStandardDeviation(standardDeviation)
    }
    const handleSubmittwo = (e: any) => {
        e.preventDefault()
        let successful = e.target[0].value
        let trials = e.target[1].value
        let prob = e.target[2].value
        let operator = e.target[3].value
        console.log(operator)
        console.log(successful, trials, prob)
        console.log(findnCr(successful, trials))
        console.log(Math.pow(prob, successful))
        let ans = findnCr(successful, trials) * Math.pow(prob, successful) * Math.pow(1 - prob, trials - successful)
        console.log(ans)
    }
    function findnCr(n: number, r: number) {
        return factorial(n) / (factorial(r) * factorial(n - r))
    }
    function factorial(n: number) {
        let ans = n;
        for(let i = n-1; i > 0; i--) {
            ans *= i
        }
        return ans;
    }
return(
    <>
    <h1>Binomial Distribution</h1>
    <form onSubmit={handleSubmit}>
        <label>Trials</label>
        <input type="number" />
        <label>Probability</label>
        <input type="text" />
        <input type="submit" />
    </form>
    <p>Mean: {mean}</p>
    <p>Standard Deviation: {standardDeviation}</p>
    <br />
    <br />
    <br />
    <h1>Probablility out of whole</h1>
    <form onSubmit={handleSubmittwo}>
        <label>Trials</label>
        <input type="number" />
        <label>Successful</label>
        <input type="number" />
        <label>Probability</label>
        <input type="text" />
        <label htmlFor="operator">Operator</label>
        <select name="operator" id="operator">
            <option value="less">Less than</option>
            <option value="lessEqual">Less than or equal to</option>
            <option value="greater">Greater than</option>
            <option value="greaterEqual">Greater than or equal to</option>
            <option value="equal">Equal to</option>
        </select>
    <input type="submit" />
    </form>
    </>
)
}

export default BinomialDist