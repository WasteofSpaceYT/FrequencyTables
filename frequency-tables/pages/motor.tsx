import "next";
import { useState } from "react";
import {
  singlePhase,
  wireSizes,
  seventyfive,
  sixtydegree,
  breakerSizes,
  breakerTypes,
  threePhase,
} from "../components/motorTables";

const MotorControls = () => {
  const [flcOut, setFLC] = useState(0);
  const [minOut, setmin] = useState(0);
  const [maxOut, setFmax] = useState(0);
  const [ultOut, setult] = useState(0);
  const [ampOut, setamp] = useState(0);
  const [wireOut, setwire] = useState(0);
  const [breakerAmpOut, setbreakeramp] = useState(0);
  const [breakerOut, setbreaker] = useState(0);
  const [motorList, setMotorList] = useState([]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let Horsepower: singlePhase = e.target[0].value;
    let Phase = e.target[1].value;
    let FLA = e.target[2].value;
    let breakerType: breakerSizes = e.target[4].value;
    let temp = e.target[5].value;
    let sf = e.target[6].value;
    let FLC: number;
    let voltage = e.target[3].value;
    if ((Phase = "single")) {
        //@ts-ignore
      FLC = singlePhase[voltage][Horsepower];
    } else {
        //@ts-ignore
      FLC = threePhase[voltage][Horsepower];
    }
    setFLC(FLC);
    let minimum = getMin(FLC, sf, temp);
    let maximum = getMax(FLC, sf, temp);
    let ultimate = getUlt(FLA);
    let amperage = FLC * 1.25;
    setmin(minimum);
    setFmax(maximum);
    setult(ultimate);
    setamp(amperage);
    let wireSize = getWireSize(FLC);
    //@ts-ignore
    setwire(wireSize);
    //@ts-ignores
    let breakerAmp = FLC * breakerTypes[breakerType];
    setbreakeramp(breakerAmp);
    let breakerSize = getBreakerSize(breakerAmpOut);
    //@ts-ignore
    setbreaker(breakerSize);
    console.log(
      FLC,
      minimum,
      maximum,
      ultimate,
      amperage,
      wireSize,
      breakerAmp,
      breakerSize
    );
    let thisMotor = {
      Horsepower: Horsepower,
      Phase: Phase,
      FLA: FLA,
      FLC: FLC,
      min: minOut,
      max: maxOut,
      ult: ultOut,
      amp: ampOut,
      wire: wireOut,
      breakerAmp: breakerAmpOut,
      breaker: breakerOut,
    };
    console.log(thisMotor);
    let newArray: Motor[] = [];
    //@ts-ignore
    newArray.push(motorList);
    newArray.push(thisMotor);
    //@ts-ignore
    setMotorList(newArray);
    console.log(motorList);
  };
  function getMin(
    FLC: number,
    SF: number | undefined,
    temp: number | undefined
  ) {
    let min = FLC;
    //@ts-ignore
    if (SF >= 1.15) {
      min *= 1.25;
      //@ts-ignore
    } else if (temp <= 40) {
      min *= 1.25;
    } else {
      min *= 1.15;
    }
    return min;
  }
  function getMax(
    FLC: number,
    SF: number | undefined,
    temp: number | undefined
  ) {
    let max = FLC;
    //@ts-ignore
    if (SF >= 1.15) {
      max *= 1.4;
    }
    //@ts-ignore
    if (temp <= 40) {
      max *= 1.4;
    } else {
      max *= 1.3;
    }
    return max;
  }
  function getUlt(FLC: number) {
    let ult;
    if (FLC >= 9) {
      ult = FLC * 1.7;
    } else if (FLC > 9 && FLC <= 20) {
      ult = FLC * 1.56;
    } else {
      ult = FLC * 1.4;
    }
    return ult;
  }
  function getWireSize(FLC: number) {
    if (FLC >= 100) {
      for (let i = 0; i < wireSizes.length; i++) {
        //@ts-ignore
        if (FLC <= seventyfive[wireSizes[i]]) {
          return wireSizes[i];
        }
      }
    } else {
      for (let i = 0; i < wireSizes.length; i++) {
        //@ts-ignore
        if (FLC <= sixtydegree[wireSizes[i]]) {
          return wireSizes[i];
        }
      }
    }
  }
  function getBreakerSize(Amps: number) {
    for (let i = 0; i < breakerSizes.length; i++) {
      //@ts-ignore
      if (Amps <= breakerSizes[i]) {
        console.log(breakerSizes[i]);
        return breakerSizes[i];
      }
    }
  }
  console.log("hi");
  return (
    <>
      <form id="motorForm" onSubmit={handleSubmit} style={{ margin: "50px" }}>
        <label>Horsepower:</label>
        <br />
        <input required />
        <br />
        <label>Phase:</label>
        <br />
        <select name="phase" id="phase">
          <option value="single">1</option>
          <option value="three">3</option>
        </select>
        <br />
        <label>FLA:</label>
        <br />
        <input />
        <br />
        <label>Voltage:</label>
        <br />
        <select id="voltage" name="voltage">
          <option value="120">120V</option>
          <option value="200">200V</option>
          <option value="208">208V</option>
          <option value="240">240V</option>
        </select>
        <br />
        <label>Breaker Type:</label>
        <br />
        <select id="breakerType" name="breakerType">
          <option value="Inverse-time">Inverse Time</option>
          <option value="Nontime Delay">Nontime Delay</option>
          <option value="Time Delay">Time Delay</option>
          <option value="Instantanious">Instantanious trip</option>
        </select>
        <br />
        <label>Temperature:</label>
        <br />
        <input />
        <br />
        <label>Service Factor:</label>
        <br />
        <input />
        <br />
        <input type="submit" />
      </form>
      <div style={{ margin: "50px" }}>
        <p>FLC: {flcOut}</p>
        <br />
        <p>Min: {minOut}</p>
        <br />
        <p>Max: {maxOut}</p>
        <br />
        <p>Ult: {ultOut}</p>
        <br />
        <p>Amp: {ampOut}</p>
        <br />
        <p>Wire: {wireOut}</p>
        <br />
        <p>Breaker Amp: {breakerAmpOut}</p>
        <br />
        <p>Breaker: {breakerOut}</p>
        <br />
        <input
          type="button"
          value="Add New Motor"
          onClick={() => {
            //@ts-ignore
            let form: HTMLFormElement = document.getElementById("motorForm");
            form.reset();
            setFLC(0);
            setmin(0);
            setFmax(0);
            setult(0);
            setamp(0);
            setwire(0);
            setbreakeramp(0);
            setbreaker(0);
          }}
        />
      </div>
    </>
  );
};

export default MotorControls;
