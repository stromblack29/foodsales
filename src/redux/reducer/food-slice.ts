import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AppState} from "@/redux/store"
export type Foods = {
  id: string,
  orderDate: string,
  region: string,
  city: string,
  category: string, 
  product: string, 
  quantity: number, 
  unitPrice: number 
}

interface foodstate {
  foods: Array<Foods>
}

const initialState: foodstate = {
  foods: [
  ],
}

export const foodSlice = createSlice({
  reducers: {
    addFood: (state, action: PayloadAction<Foods>) => {
      const { id } = action.payload;
      const index = state.foods.findIndex((food) => food.id == id);
      // console.log(index);
      if (index < 0) {
        state.foods.push(action.payload);
      }
    },
    removeFood: (state, action: PayloadAction<string>) => {
      const Id = action.payload;
      const newarr = state.foods.filter((f) => f.id !== Id);
      state.foods = newarr;
    },
    editFood: (state, action: PayloadAction<Foods>) => {
      // find index
      const { id } = action.payload;
      const index = state.foods.findIndex((food) => food.id == id);
      // making new array
      const newArray = [...state.foods];
      // console.log(index, id, action.payload);
      if (index > -1) {
        // console.log('found row');    
        newArray[index] = action.payload;
      }
      // reassingning todos to new array
      state.foods = newArray
    },
  },
  name: "food",
  initialState: initialState
})

// actions
export const {addFood, removeFood, editFood } = foodSlice.actions 

// selectors
export const getfoods = (state: AppState) => {
  return state.food.foods;
};

export default foodSlice.reducer