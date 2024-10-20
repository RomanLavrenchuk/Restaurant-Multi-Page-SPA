import { useEffect, useState } from 'react';
import {
    useParams,
    useHistory,
} from 'react-router-dom/cjs/react-router-dom.min';
import { getMealById } from '../api';
import { Preloader } from '../components/Preloader';

function Recipe() {
    const [recipe, setRecipe] = useState({});
    const { id } = useParams();
    const { goBack } = useHistory();

    useEffect(() => {
        getMealById(id).then((data) => setRecipe(data.meals[0]));
    }, [id]);

    return (
        <>
            {!recipe.idMeal ? (
                <Preloader />
            ) : (
                <div className='recipe'>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <h1>{recipe.strMeal}</h1>
                    <h6>Category: {recipe.strCategory}</h6>
                    {recipe.strArea ? <h6>Area: {recipe.strArea}</h6> : null}
                    <p>{recipe.strInstructions}</p>
                    {recipe.strYoutube ? (
                        <div className='row'>
                            <h5>Video Recipe</h5>
                            <iframe
                                title={id}
                                src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(
                                    -11
                                )}`}
                                allowfullscreen
                            />
                        </div>
                    ) : null}
                </div>
            )}
            <button className='btn' onClick={goBack}>
                Go Back
            </button>
        </>
    );
}

export { Recipe };
