import React, { FC } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorList from "../constructor-list/constructor-list";
import constructorStyles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_ORDER_MODAL } from "../../services/actions/order-details";
import { getOrderNumber } from "../../services/actions/order-details";
import { useDrop } from "react-dnd";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR,
} from "../../services/actions/burger-constructor";
import { useAuth } from "../../hooks/useAuth/useAuth";
import { useHistory } from "react-router-dom";
import { Idata } from "../../utils/type";

declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

interface IRootState {
  burgerConstructor: {
    ingredients: Array<Idata>;
    bun: Idata;
  };
}
interface IFetchData {
  ingredients: Array<string>;
}

const BurgerConstructor: FC = () => {
  const { isAuth } = useAuth();
  const history = useHistory();
  const { ingredients, bun } = useSelector(
    (state: IRootState) => state.burgerConstructor
  );
  const price = ingredients.reduce(
    (sum: number, item: Idata) => (sum += item.price),
    0
  );
  const dispatch = useDispatch();
  const data = {
    ingredients: [bun._id, ...ingredients.map((item: Idata) => item._id)],
  };
  const [, drop] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: (item: Idata) => {
      if (item.type == "bun") {
        dispatch({
          type: ADD_BUN,
          bun: item,
        });
      } else {
        dispatch({
          type: ADD_INGREDIENT,
          ingredient: { ...item, constructorId: Date.now() },
        });
      }
    },
  });

  const handleClickOrderButton = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isAuth) {
      dispatch({
        type: OPEN_ORDER_MODAL,
      });
      dispatch(getOrderNumber(data) as any);
      dispatch({
        type: CLEAR_CONSTRUCTOR,
      });
    } else {
      history.replace({ pathname: "/login" });
    }
  };

  return (
    <section className="pt-25 pb-25" ref={drop}>
      <div className={constructorStyles.constructorRow}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        )}
        {(bun && <ConstructorList ingredients={ingredients} />) || (
          <p className="text text_type_main-large">Добавте булку</p>
        )}
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        )}
      </div>
      {bun && (
        <div className={`${constructorStyles.row} mt-10 pr-4 pl-4`}>
          <p
            className={`${constructorStyles.price} text text_type_digits-medium mr-2`}
          >
            {price + bun.price * 2}
            <div className="mr-10">
              <CurrencyIcon type="primary" />
            </div>
          </p>
          <Button type="primary" size="medium" onClick={handleClickOrderButton}>
            Оформить заказ
          </Button>
        </div>
      )}
    </section>
  );
};

export default BurgerConstructor;
