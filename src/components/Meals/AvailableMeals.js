import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      const resp = await fetch("https://food-order-1d9be-default-rtdb.europe-west1.firebasedatabase.app/meals.json");
      let respData = await resp.json();

      console.log(respData);

      if (!resp.ok) {
        throw new Error("something is wrong");
      }

      const loadedMeals = [];
      for (const key in respData) {
        loadedMeals.push({
          id: key,
          name: respData[key].name,
          description: respData[key].description,
          price: respData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((e) => {
      setIsLoading(false);
      setHttpError(e.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section style={{ color: "white", textAlign: "center" }}>
        <p>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section style={{ color: "red", textAlign: "center" }}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
