import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const GlobalContext = createContext(null);




export default function GlobalState({children})
{


    const [searchParam, setSearchParam] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [recipeList, setRecipeList] = React.useState([ ]);
    const [recipeDetailsData, setRecipeDetailsData] = React.useState(null);
    const [favouritesList, setFavouritesList] = React.useState([ ]);

    const navigate=useNavigate();

    async function handleSubmit(event)
    {

        event.preventDefault( );

        try{
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
            const data = await res.json();
            
            if (data?.data?.recipes)
            {
                setRecipeList(data?.data?.recipes);
                setLoading(false);
                setSearchParam('');
                navigate('/');
            }

        }
        catch(err)
        {
            console.log(err);
            setLoading(false);
            setSearchParam('');
        }
    }

    // function handleAddToFavourites(getCurrentItem){
    //     console.log(getCurrentItem);
    //     let cpyFavoritesList = [...favouritesList];
    //     const index = cpyFavoritesList.findIndex(item=> item.id === getCurrentItem.id)
    
    //     if(index === -1) {
    //       cpyFavoritesList.push(getCurrentItem)
    //     } else {
    //       cpyFavoritesList.splice(index)
    //     }
    
    //     setFavouritesList(cpyFavoritesList)
    //   }
    function handleAddToFavourites(getCurrentItem){
        console.log(getCurrentItem);
        let cpyFavouritesList = [...favouritesList];
        const index = cpyFavouritesList.findIndex(item=> item.id === getCurrentItem.id)
    
        if(index === -1) {
          cpyFavouritesList.push(getCurrentItem)
        } else {
          cpyFavouritesList.splice(index,1)
        }
    
        setFavouritesList(cpyFavouritesList)
      }
    

    console.log(favouritesList,'favouritesList');


    return (
    <GlobalContext.Provider value={{searchParam,loading,recipeList,setSearchParam,handleSubmit,recipeDetailsData, setRecipeDetailsData,handleAddToFavourites,favouritesList}}>
        
        {children}
    
    </GlobalContext.Provider>);
}