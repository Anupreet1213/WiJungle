import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface SplineAreaChartProps {
  finalCountryArr: {
    country: string;
    count: number;
  }[];
}

const SplineAreaChart: React.FC<SplineAreaChartProps> = ({
  finalCountryArr,
}) => {
  //   const [barData, setBarData] = useState([]);
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      theme: "dark",
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: finalCountryArr?.map((eachData) => eachData?.country),
    },
  });
  const [series, setSeries] = useState([
    {
      name: "series1",
      data: finalCountryArr?.map((eachData) => eachData?.count),
    },
  ]);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        categories: finalCountryArr.map((eachData) => eachData.country),
      },
    }));

    setSeries([
      {
        name: "series1",
        data: finalCountryArr.map((eachData) => eachData.count),
      },
    ]);
  }, [finalCountryArr]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={500}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default SplineAreaChart;
