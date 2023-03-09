import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "@chakra-ui/react";

const LineGraph = ({ max_written_works, written_works }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isSmallerThanMd] = useMediaQuery("(max-width: 768px)");

  const containerHeight = isSmallerThanMd ? 200 : 500;
  const chartScale = isSmallerThanMd ? 10 : 15;
  const labelWidth = isSmallerThanMd ? undefined : 90;
  const labelHeight = isSmallerThanMd ? undefined : 50;
  const labelFontSize = isSmallerThanMd ? 10 : 18;

  useEffect(() => {
    const highest_possible_score = max_written_works.map((value) =>
      parseInt(value)
    );
    const student_score = written_works.map((value) => parseInt(value));

    const percentage = student_score
      .slice(0, 10)
      .map((score, i) =>
        isNaN(score) || !isFinite(score) || isNaN(highest_possible_score[i])
          ? 0
          : (score / highest_possible_score[i]) * 100
      );

    const chartData = highest_possible_score.slice(0, 10).map((hps, i) => ({
      name: `${i + 1}`,
      ss: percentage[i],
      amt: student_score[i],
    }));

    setData(chartData);
    setIsLoading(false);
  }, [max_written_works, written_works]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderLine = () => (
    <ResponsiveContainer width={"100%"} height={containerHeight}>
      <LineChart data={data} fontSize={chartScale}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          height={labelHeight}
          dataKey="name"
          padding={{ left: 30, right: 30 }}
          label={{
            value: "Grade",
            position: "insideBottom",
            fontSize: labelFontSize,
            fontStyle: "italic",
          }}
        />
        <YAxis
          width={labelWidth}
          label={{
            value: "Score Percentage",
            angle: -90,
            fontSize: labelFontSize,
            fontStyle: "italic",
            // fontWeight: "bold",
          }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="ss"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
  return renderLine();
};

export default LineGraph;
