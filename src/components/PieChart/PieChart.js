import React from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PieChart.css";

const ChartComponent = () => {
  const [nutrients, setNutrients] = useState([]);
  let params = useParams();
  const url = `/api/v1/recipes/${params.id}`;
  const token = localStorage.getItem("myKitchenAppToken");

  const fetchRecipe = async () => {
    const recipe = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });
    return recipe;
  };

  useEffect(() => {
    fetchRecipe()
      .then((response) => {
        setNutrients(response.data.nutrition.nutrients);
      })
      .catch((error) => console.log(error));
  }, []);
  //bring only part of array
  const d = nutrients.slice(0, 9);
  //convert array of objects into array of arrays
  const dataTest = d.map(Object.values);
  //get only first 2 items of each array
  var pieData = dataTest.map(function (town) {
    return town.slice(0, 2);
  });

  const data = [
    ["Nutrient name", "%"],
    pieData[0],
    pieData[1],
    pieData[3],
    pieData[5],
    pieData[6],
    pieData[7],
    pieData[8],
  ];
  const options = {
    is3D: true,
  };
  return (
    <>
      <div className="contentModal">
        <h3>Nutritional Information</h3>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </>
  );
};

export default ChartComponent;
