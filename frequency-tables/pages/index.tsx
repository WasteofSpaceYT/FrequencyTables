import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
const plotlyKey = "f7ds9igE5o9oA9J84yuH"
//@ts-ignore
import Plot from "react-plotlyjs"
let plotly = require('plotly')("WasteofSpaceYT", plotlyKey);



const Home: NextPage = () => {
  var data = [
    {
      x: ["giraffes", "orangutans", "monkeys"],
      y: [20, 14, 23],
      type: "bar"
    }
  ];
  var graphOptions = {filename: "basic-bar", fileopt: "overwrite"};
  plotly.plot(data, graphOptions, function (err: any, msg: any) {
    if(msg != null){
      console.log(msg.url)
      setChartUrl(msg.url)
    }
  });
  
  let [tableType, setTableType] = useState("frequency")
  let [tableVal, setTableVal] = useState("")
  let [chartUrl, setChartUrl] = useState("")
  let [useX, setUseX] = useState([])
  let [useY, setUseY] = useState([])

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
    setTableVal(JSON.stringify(table).split(",").join("\n").replace("{", "").replace("}", "").replaceAll("&comma;", ","))
    console.log(table)
    //@ts-ignore
    setUseX(Object.keys(table))
    setUseY(Object.values(table))
    let dataa = [
      {
        x:  Object.keys(table),
        y: Object.values(table),
        type: "bar"
      }
    ];
    var graphOptions = {filename: "basic-bar", fileopt: "overwrite"};
    plotly.plot(dataa, graphOptions, function (err: any, msg: any) {
      if(msg != null){
        console.log(msg.url)
        setChartUrl(msg.url)
      } else {
        setChartUrl("error")
      }
    });
  }

  const getFrequencyTable = (data: String[]) => {
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
      <p>{chartUrl}</p>
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
      <iframe width={"50%"} height={"500px"} frameBorder="0" scrolling="no" src={`https://chart-studio.plotly.com/~WasteofSpaceYT/27.embed`}></iframe>
      </div>
      <Plot 
      data={[
        {
          x: useX,
          y: useY,
          type: "bar"
        }
      ]}
      layout={{
        title: "Frequency Table",
        xaxis: {
          autorange: true,
          title: "Date",
          type: "date"
        },
        yaxis: {
          title: "Price",
          type: "linear"
        }
      }}/>
      </>
    )
}

export default Home