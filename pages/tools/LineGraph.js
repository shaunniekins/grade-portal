import { position } from "@chakra-ui/react";
import { PureComponent } from "react";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const LineGraph = ({ max_written_works, written_works }) => {
  // const highest_possible_score = [10, 12, "", 20, 25, "", 20, "", 10, 9, 35];
  // const student_score = [8, 8, 20, 7, 29, 19, 16, 5];
  // const highest_possible_score = max_written_works.flat();

  const highest_possible_score = max_written_works.map((value) => {
    const intValue = parseInt(value);
    return isNaN(intValue) ? "" : intValue;
  });

  const student_score = written_works.map((value) => {
    const intValue = parseInt(value);
    return isNaN(intValue) ? "" : intValue;
  });

  const percentage = student_score.slice(0, 10).map((score, i) => {
    const value = (score / highest_possible_score[i]) * 100;
    return isNaN(value) || !isFinite(value) ? 0 : value;
  });

  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prevProgress) => prevProgress + 10);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const data = highest_possible_score.map((hps, i) => ({
    name: `${i + 1}`,
    // hps,
    ss: percentage[i],
    amt: student_score[i],
  }));

  const renderLine = () => (
    <ResponsiveContainer width={"100%"} height={500}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          height={50}
          dataKey="name"
          padding={{ left: 30, right: 30 }}
          label={{
            value: "Month",
            position: "insideBottom",
            fontSize: 18,
            fontWeight: "bold",
          }}
        />
        <YAxis
          width={90}
          label={{
            value: "Score Percentage",
            angle: -90,
            fontSize: 18,
            fontWeight: "bold",
          }}
        />
        <Tooltip />
        {/* <Legend /> */}
        {/* <Line
          type="monotone"
          dataKey="hps"
          stroke="#8884d8"
          animationBegin={progress}
          activeDot={{ r: 8 }}
        /> */}
        <Line
          type="monotone"
          dataKey="ss"
          stroke="#8884d8"
          // animationBegin={progress}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
  return renderLine();
};

export default LineGraph;
