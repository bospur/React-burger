import React, { FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from "../../services/actions/burger-constructor";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorListStyle from "./constructor-list-item.module.css";
import { useDrag, useDrop } from "react-dnd";
import { Idata } from "../../utils/type";
declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}
interface IRootState {
  burgerConstructor: {
    ingredients: Array<Idata>;
  };
}
interface IConstructorListItem {
  item: Idata;
  index: number;
}

const ConstructorListItem: FC<IConstructorListItem> = ({ item, index }) => {
  const { ingredients } = useSelector(
    (state: IRootState) => state.burgerConstructor
  );
  const dispatch = useDispatch();
  const handleConstructorElement = (id?: number) => {
    dispatch({
      type: DELETE_INGREDIENT,
      id: id,
    });
  };
  const ref = useRef<HTMLLIElement>(null);
  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    const dragIngredient = ingredients[dragIndex];
    const newIngredients = [...ingredients];

    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragIngredient);

    dispatch({
      type: SORT_INGREDIENTS,
      ingredients: newIngredients,
    });
  };
  const [{ isHover }, drop] = useDrop({
    accept: "sortedIngredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    hover: (item: any, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      if (!hoverBoundingRect || !clientOffset) return;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const hoverClientY = clientOffset?.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "sortedIngredients",
    item: { item, index },
  });

  const opacity = isHover ? 0 : 1;
  drag(drop(ref));

  return (
    <li className={constructorListStyle.item} ref={ref} style={{ opacity }}>
      <div className={constructorListStyle.icon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => {
          handleConstructorElement(item.constructorId);
        }}
      />
    </li>
  );
};

export default ConstructorListItem;
