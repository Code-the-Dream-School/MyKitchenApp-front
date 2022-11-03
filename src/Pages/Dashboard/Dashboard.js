import React, { useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const fetchRecipes = async () => {
    const recipes = await axios.get("http://localhost:3002/api/v1/recipes");

    console.log(recipes);
    return recipes;
  };

  React.useEffect(() => {
    fetchRecipes()
      .then((response) => {
        console.log(response.data.results);
        setData(response.data.results);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <h1>User Dashboard</h1>
      <h1>Popular recipes</h1>

      <div>
        {data || data.length ? (
          <div className="trending">
            {data.map((data) => {
              return (
                <ReusableCard
                  key={data.id}
                  title={data.title}
                  data={data}
                  image={data.image}
                  subheader={data.readyInMinutes}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Dashboard;
