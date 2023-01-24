import Head from "next/head"
import { useState } from "react"
import { getFrequencyTable } from "./index"

const Deviation = () => {

    let [mean, setMean] = useState(0)
    let [median, setMedian] = useState(0)
    let [mode, setMode] = useState(0)
    let [range, setRange] = useState(0)
    let [deviation, setDeviation] = useState(0)

    const handleFormSubmit = (e: any) => {
        e.preventDefault()
        let data: String[] = e.target[0].value.split("\n")
        let total = 0
        let mean = 0
        for(let i in data) {
            total += Number(data[i])
        }
        mean = total / data.length
        data.sort()
        let range = Number(data[data.length - 1]) - Number(data[0])
        let median = 0
        if(data.length % 2 == 0) {
            median = (Number(data[data.length / 2]) + Number(data[(data.length / 2) - 1])) / 2
        }
        else {
            median = Number(data[Math.floor(data.length / 2)])
        }
        let table = getFrequencyTable(data)
        let mode = 0
        let modeval = 0
        console.log(table)
        for(let i in table){
            //@ts-ignore
            if(Number(table[i]) > modeval) {
                //@ts-ignore
                modeval = table[i]
                mode = Number(i)
            }
        }
        let ans = 0
        for(let i in data) {
            ans += Math.pow(Number(i) - mean, 2)
        }
        ans = ans / data.length-1
        setMean(mean)
        setMedian(median)
        setMode(mode)
        setRange(range)
        setDeviation(ans)
    }
    return (
        <>
        <Head>
        <title>Frequency Tables</title>
      </Head>
      <div style={{width: "100%", height: "100%", textAlign: 'center'}}>
      <h1>Deviation</h1>
      <p>Put one value per line</p>
      <form onSubmit={handleFormSubmit}>
      <textarea placeholder='enter your values one per line' style={{width: "25%"}} />
      <br />
      <br />
      <button style={{width: "25%"}} type="submit">Submit</button>
      </form>
      <div style={{fontSize: "15px"}}>
        <p>mean: {mean}</p>
        <p>median: {median}</p>
        <p>mode: {mode}</p>
        <p>range: {range}</p>
        <p>deviation: {deviation}</p>
      </div>
      </div>
        </>
    )
}

export default Deviation