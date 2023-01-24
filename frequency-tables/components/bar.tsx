//@ts-ignore
import Plot from "react-plotly.js"

//@ts-ignore
const Bar = ({useX, useY}) => {
    return (
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
          title: "Variable",
        },
        yaxis: {
          title: "Value",
          type: "linear"
        }
      }}/>
      )}
export default Bar