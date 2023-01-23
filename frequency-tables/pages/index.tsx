import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  let [tableType, setTableType] = useState("frequency")
  return (
      <>
      <Head>
        <title>Frequency Tables</title>
      </Head>
      <div style={{width: "100%", height: "100%", textAlign: 'center'}}>
      <h1>Frequency Tables</h1>
      <p>{tableType}</p>
      <textarea placeholder='enter your values one per line' style={{width: "25%"}} />
      <br />
      <input type="radio" name="tableType" value="frequency" defaultChecked onClick={() => setTableType("frequency")} /> Frequency Table
      <input type="radio" name="tableType" value="histogram" onClick={() => setTableType("histogram")} /> Histogram table
      {tableType == "histogram" ? <input type="number" name="interval" placeholder="interval" style={{marginLeft: "5px"}} /> : ""}
      <br />
      <button style={{width: "25%"}}>Submit</button>
      </div>
      </>
    )
}

export default Home