import React, { FC } from 'react';
import { } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsListStyle from './Ingredients-list.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import { IdataArray } from '../../utils/type';
import { Link, useLocation } from 'react-router-dom';
interface ITypesName {
    [index: string]: string;
}

const IngredientsList: FC<IdataArray> = ({ ingredients }) => {
    const location = useLocation();
    const TYPES_NAME: ITypesName = {
        bun: 'Булки',
        main: 'Начинка',
        sauce: 'Соусы'
    }

    return (
        <section className="mt-10" id={ingredients[0].type}>
                    <h2 className="text text_type_main-medium mb-6">{TYPES_NAME[ingredients[0].type]}</h2>
                    <ul className={`${ingredientsListStyle.cardList} pr-4 pl-4`}>
                    {ingredients.map((ingredient) => (
                        <Link 
                            key={ingredient._id}
                            to={{
                            pathname: `/ingredients/${ingredient._id}`,
                            state: { background: location }
                          }}
                          >
                            <IngredientCard info={ingredient}  />
                        </Link>
                    ))}
                    </ul>
        </section>
    );
}

export default IngredientsList;
