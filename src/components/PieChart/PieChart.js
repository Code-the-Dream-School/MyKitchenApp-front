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
  }, [token]);
  //bring only part of array
  const d = nutrients.slice(0, 9);
  //convert array of objects into array of arrays
  const dataTest = d.map(Object.values);
  //get only first 2 items of each array
  const pieData = dataTest.map(function (part) {
    return part.slice(0, 2);
  });
  //data for the pieChart
  let data = [["Task", "Hours per Day"], ...pieData];

  return (
    <>
      <div className="contentModal">
        <h3>Nutritional Information</h3>
        <Chart
          chartType="PieChart"
          data={data}
          width={"100%"}
          height={"400px"}
          style={{ borderRadius: "10px" }}
        />
      </div>
    </>
  );
};

export default ChartComponent;
