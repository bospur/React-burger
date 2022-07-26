import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";
import cl from "./ingredient-modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientModal: FC = () => {
  const history = useHistory();

  const goBack = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    history.goBack();
  };
  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    history.goBack();
  };

  const hendleCloseModal = (e: { preventDefault: () => void; key: string; }) => {
    e.preventDefault();

    if (e.key === "Escape") {
        history.goBack();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", hendleCloseModal);

    return () => {
      document.removeEventListener("keydown", hendleCloseModal);
    };
  },[]);

  return (
    <div className={cl.overlay} onClick={goBack}>
      <div className={cl.modal} onClick={(e) => e.stopPropagation()}>
        <button className={cl.close} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        <IngredientDetails />
      </div>
    </div>
  );
};

export default IngredientModal;
