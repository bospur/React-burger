import React, { FC, useEffect, useMemo, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsList from "../Ingredients-list/Ingredients-list";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { useInView } from "react-intersection-observer";
import { Idata } from "../../utils/type";

declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}
interface IRootState {
  burgerIngredients: {
    ingredients: Array<Idata>;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
  };
}

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState("bun");
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (state: IRootState) => state.burgerIngredients
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients() as any);
  }, [dispatch]);

  const scrollIngredients = (e: string) => {
    
    const scrolledElement = document.getElementById(e);
    setCurrent(e);
    scrolledElement?.scrollIntoView({ behavior: "smooth" });
  };

  const [bun] = useInView({
    threshold: 1,
    onChange: (isView) => {
      if (isView) {
        setCurrent("bun");
      }
    },
  });

  const [sauce] = useInView({
    threshold: 1,
    onChange: (isView) => {
      if (isView) {
        setCurrent("sauce");
      }
    },
  });

  const [main] = useInView({
    threshold: 0.4,
    onChange: (isView) => {
      if (isView) {
        setCurrent("main");
      }
    },
  });

  return (
    <div className={ingredientsStyles.container + " pt-10"}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={ingredientsStyles.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={scrollIngredients}>
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={scrollIngredients}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={scrollIngredients}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${ingredientsStyles.row} custom-scroll`}>
        {ingredientsFailed && <h1>Ошибка связи</h1>}
        {ingredientsRequest && <h1>Load...</h1>}
        {ingredients.length !== 0 && (
          <>
            <div ref={bun}>
              <IngredientsList
                ingredients={ingredients.filter((item) => item.type === "bun")}
              />
            </div>
            <div ref={sauce}>
              <IngredientsList
                ingredients={ingredients.filter(
                  (item) => item.type === "sauce"
                )}
              />
            </div>
            <div ref={main}>
              <IngredientsList
                ingredients={ingredients.filter((item) => item.type === "main")}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BurgerIngredients;
