import "next"
import { useState } from "react"

const MotorControls = () => {
    const singlePhase = {
        "120": {
            "1/6": 4.4,
            "1/4": 5.8,
            "1/3": 7.2,
            "1/2": 9.8,
            "3/4": 13.8,
            "1": 16,
            "1.5": 20,
            "2": 24,
            "3": 34,
            "5": 56,
            "7.5": 80,
            "10": 100
        },
        "200": {
            "1/6": 2.5,
            "1/4": 3.3,
            "1/3": 4.1,
            "1/2": 5.6,
            "3/4": 7.9,
            "1": 9.2,
            "1.5": 11.5,
            "2": 13.8,
            "3": 19.6,
            "5": 32.2,
            "7.5": 46.0,
            "10": 57.5
        },
        "208": {
            "1/6": 2.4,
            "1/4": 3.2,
            "1/3": 4.0,
            "1/2": 5.4,
            "3/4": 7.6,
            "1": 8.8,
            "1.5": 11.0,
            "2": 13.2,
            "3": 18.7,
            "5": 30.8,
            "7.5": 44.0,
            "10": 55.0
        },
        "240": {
            "1/6": 2.2,
            "1/4": 2.9,
            "1/3": 3.6,
            "1/2": 4.9,
            "3/4": 6.9,
            "1": 8.0,
            "1.5": 10,
            "2": 12,
            "3": 17,
            "5": 28,
            "7.5": 40,
            "10": 50
        }
    }
    const [flcOut, setFLC] = useState(0)
    const [minOut, setmin] = useState(0)
    const [maxOut, setFmax] = useState(0)
    const [ultOut, setult] = useState(0)
    const [ampOut, setamp] = useState(0)
    const [wireOut, setwire] = useState(0)
    const [breakerAmpOut, setbreakeramp] = useState(0)
    const [breakerOut, setbreaker] = useState(0)
    const handleSubmit = (e: any) => {
        e.preventDefault()
        let Horsepower = e.target[0].value
        let Phase = e.target[1].value
        let FLA = e.target[2].value
        let voltage: "120" | "200" | "208" | "240" = e.target[3].value
        if(Phase = "single"){
            singlePhase[voltage]
        }
    }
    function getMin(FLC: number, SF: number, temp: number){
        let min;
        if(SF === undefined && temp === undefined){
            min = FLC * 1.15
            return min
        } else if(SF === undefined){
            if(SF >= 1.15){
                min = FLC * 1.25
                return min
            }
        } else if(temp === undefined){
            if(temp<= 40){
                min = FLC * 1.25
                return min
            }
        }
    }
    function getMax(FLC: number, SF: number, temp: number){
        let max;
        if(SF === undefined && temp === undefined){
            max = FLC * 1.3
            return max
        } else if(SF === undefined){
            if(SF >= 1.15){
                max = FLC * 1.4
                return max
            }
        } else if(temp === undefined){
            if(temp<= 40){
                max = FLC * 1.4
                return max
            }
        }
    }
    function getUlt(FLC: number){
        let ult;
        if(FLC >= 9){
            ult = FLC * 1.7
        } else if(FLC > 9 && FLC <= 20){
            ult = FLC * 1.56
        } else {
            ult = FLC * 1.4
        }
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
        <label>Horsepower</label>
        <input required />
        <br />
        <label>Phase</label>
        <select name="phase" id="phase">
            <option value="single">1</option>
            <option value="three">3</option>
        </select>
        <br />
        <label>FLA</label>
        <input />
        <label>Voltage</label>
        <select id="voltage" name="voltage">
            <option value="120">120V</option>
            <option value="200">200V</option>
            <option value="208">208V</option>
            <option value="240">240V</option>
        </select>
        <br />
        <input type="submit" />
        </form>
        </>
    )
}

export default MotorControls