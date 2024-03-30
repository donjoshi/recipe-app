import React, { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";




export default function Home() {

    const {recipeList,loading}=useContext(GlobalContext);

    if (loading)
    {
        return <div className="text-2xl text-center mt-10">Loading...pls wait</div>
    }


    return <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {
            recipeList && recipeList.length>0?
            
            recipeList.map((item)=>(<RecipeItem item={item}/>))


            :
            <div>
                <p className="lg:text-4xl text-xl text-center text-black font-extrabold">nothing to show...pls search somethinng</p>
            </div>
        }
    </div>
}