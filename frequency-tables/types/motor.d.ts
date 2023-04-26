type breakerSizes =
  | "15"
  | "20"
  | "25"
  | "30"
  | "35"
  | "40"
  | "45"
  | "50"
  | "60"
  | "70"
  | "80"
  | "90"
  | "100"
  | "110"
  | "125"
  | "150"
  | "175"
  | "200"
  | "225"
  | "250"
  | "300"
  | "350"
  | "400"
  | "450"
  | "500"
  | "600"
  | "700"
  | "800"
  | "1000";
type singlePhase =
  | "1/6"
  | "1/4"
  | "1/3"
  | "1/2"
  | "3/4"
  | "1"
  | "1.5"
  | "2"
  | "3"
  | "5"
  | "7.5"
  | "10";
type voltage = "120" | "200" | "208" | "240";
type Motor = {
  Horsepower: singlePhase;
  Phase: any;
  FLA: any;
  FLC: number;
  min: number;
  max: number;
  ult: number;
  amp: number;
  wire: number;
  breakerAmp: number;
  breaker: number;
};
