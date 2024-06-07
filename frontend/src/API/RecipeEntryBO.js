import FoodEntry from './FoodEntry.js';

export default class RecipeEntry extends FoodEntry{

    constructor(arecipeid){
        super();
        this.recipeid = arecipeid
    }

    setrecipeid(arecipeid){
        this.recipeid = arecipeid
    }

    getrecipeid() {
        return this.recipeid
    }
}



