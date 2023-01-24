import Head from "next/head"
import { getFrequencyTable } from "./index"

const Deviation = () => {

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
        console.log(mean, median, mode, range, ans)
    }
    return (
        <>
        <Head>
        <title>Frequency Tables</title>
      </Head>
      <div style={{width: "100%", height: "100%", textAlign: 'center'}}>
      <h1>Deviation</h1>
      <form onSubmit={handleFormSubmit}>
      <textarea placeholder='enter your values one per line' style={{width: "25%"}} />
      <br />
      <br />
      <button style={{width: "25%"}} type="submit">Submit</button>
      </form>
      <pre style={{fontSize: "15px"}}></pre>
      </div>
        </>
    )
}

export default Deviation