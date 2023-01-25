import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
const plotlyKey = "f7ds9igE5o9oA9J84yuH"
import dynamic from "next/dynamic";
//@ts-ignore
const Plot = dynamic(() => import("../components/bar").then(module => module.default), { ssr: false });

export const getFrequencyTable = (data: String[]) => {
  let table = {}
  let allValuesAreNumbers = true
  data.forEach((value) => {
    if(isNaN(Number(value))) {
      allValuesAreNumbers = false
    }
    //@ts-ignore
    if(table[value]) {
      //@ts-ignore
      table[value]++
    } else {
      //@ts-ignore
      table[value] = 1
    }
  })
  if(allValuesAreNumbers) {
    let sortedTable = {}
    let sortedKeys = Object.keys(table).sort((a, b) => Number(a) - Number(b))
    sortedKeys.forEach((key) => {
      //@ts-ignore
      sortedTable[key] = table[key]
    })
    return sortedTable
  } else {
  return table
  }
}

const Home: NextPage = () => {
  let [tableType, setTableType] = useState("frequency")
  let [tableVal, setTableVal] = useState("")
  let [chartUrl, setChartUrl] = useState("")
  let [useX, setUseX] = useState([])
  let [useY, setUseY] = useState([])
  let [relFreq, setRelFreq] = useState("")

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    let data = e.target[0].value.split("\n")
    let tableType;
    let interval;
    let table = {};
    if(e.target[1].checked) {
      tableType = "frequency"
    } else {
      tableType = "histogram"
    }
    if(tableType == "histogram") {
      interval = e.target[3].value
      table = getHistogramData(data, interval)
    } else {
      table = getFrequencyTable(data);
    }
    let leTable = JSON.stringify(table).split(",").join("\n").replaceAll("&comma;", ",")
    setTableVal(leTable.replace("{", "").replace("}", ""))
    let xvals = Object.keys(table)
    for(let i in xvals) {
      xvals[i] = xvals[i].replaceAll("&comma;", ",")
    }
    let temprelfreq = {}
    for(let i in table) {
    let vals = Object.values(table)
    //@ts-ignore
    temprelfreq[i] = String((vals[i -1] / vals.reduce((a, b) => a + b, 0)) * 100) + "%"
    }
    setRelFreq(JSON.stringify(temprelfreq).split(",").join("\n").replaceAll("&comma;", ",").replace("{", "").replace("}", ""))
    //@ts-ignore
    setUseX(xvals)
    setUseY(Object.values(table))
  }

  const getHistogramData = (data: String[], interval: String) => {
    let table = {}
    let allValuesAreNumbers = true
    let finalTable = {}
    data.forEach((value) => {
      if(isNaN(Number(value))) {
        allValuesAreNumbers = false
      }
    })
    if(isNaN(Number(interval))) {
      return "Interval must be a number"
    }
    if(!allValuesAreNumbers) {
      return "All values must be numbers"
    } else {
      let numdata = data.map((value) => Number(value))
      numdata.sort((a, b) => a - b)
      let min = Math.min(...numdata)
      let max = Math.max(...numdata)
      let range = max - min
      let numberOfIntervals = Math.ceil(range / Number(interval))
      let intervalStart = min
      let intervalEnd = min + Number(interval)
      for(let i = 0; i < numberOfIntervals; i++) {
        //@ts-ignore
        table[i] = {
          intervalStart,
          intervalEnd,
          frequency: 0
        }
        intervalStart = intervalEnd
        intervalEnd = intervalEnd + Number(interval)
      }
      data.forEach((value) => {
        for(let i = 0; i < numberOfIntervals; i++) {
          //@ts-ignore
          if(value >= table[i].intervalStart && value < table[i].intervalEnd) {
            //@ts-ignore
            table[i].frequency++
          }
        }
      })
      for(const i in table){
        //@ts-ignore
        finalTable[`[${table[i].intervalStart}&comma; ${table[i].intervalEnd}[`] = table[i].frequency
      }
      return finalTable
    }
  }

  return (
      <>
      <Head>
        <title>Frequency Tables</title>
      </Head>
      <div style={{width: "100%", height: "100%", textAlign: 'center'}}>
      <h1>Frequency Tables</h1>
      <p>Put one value per line</p>
      <form onSubmit={handleFormSubmit}>
      <textarea placeholder='enter your values one per line' style={{width: "25%"}} />
      <br />
      <input type="radio" name="tableType" value="frequency" defaultChecked onClick={() => setTableType("frequency")} /> Frequency Table
      <input type="radio" name="tableType" value="histogram" onClick={() => setTableType("histogram")} /> Histogram table
      {tableType == "histogram" ? <input type="number" name="interval" placeholder="interval" style={{marginLeft: "5px"}} /> : ""}
      <br />
      <button style={{width: "25%"}} type="submit">Submit</button>
      </form>
      <pre style={{fontSize: "15px"}}>{tableVal}</pre>
      <pre style={{fontSize: "15px"}}>{relFreq}</pre>
      <Plot useX={useX} useY={useY} />
      </div>
      </>
    )
}

export default Home