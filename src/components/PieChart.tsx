import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import data from "../utils/eve.json";

const PieChart = () => {
  const pbd = data.filter(
    (eachData) => eachData?.alert?.category === "Potentially Bad Traffic"
  );
  const ail = data.filter(
    (eachData) => eachData?.alert?.category === "Attempted Information Leak"
  );
  const ma = data.filter(
    (eachData) => eachData?.alert?.category === "Misc Attack"
  );
  const [options] = useState<ApexOptions>({
    chart: {
      width: 380,
      type: "pie",
    },
    labels: [
      "Potentially Bad Traffic",
      "Attempted Information Leak",
      "Misc Attack",
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          //   chart: {
          //     width: 200,
          //   },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [series] = useState([pbd.length, ail.length, ma.length]);

  return (
    <div className="w-12/12 md:w-6/12">
      <h1 className="text-2xl p-6 text-center">Category Comparisons</h1>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
