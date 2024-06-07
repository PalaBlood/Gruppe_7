import FoodEntry from "./FoodEntry";

export default class RecipeEntry extends FoodEntry{

    constructor(arecipeid){
        this.recipeid = arecipeid
    }

    setrecipeid(arecipeid){
        this.recipeid = arecipeid
    }
}




entry = RecipeEntry()


entry.setrecipeid(2

)

print(entry)