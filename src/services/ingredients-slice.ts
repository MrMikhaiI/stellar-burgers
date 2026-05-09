import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RootState } from './store';

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetchIngredients', async (_, { rejectWithValue }) => {
  try {
    return await getIngredientsApi();
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка загрузки ингредиентов');
  }
});

type IngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  }
});

export const { getIngredients, getIsLoading, getError } =
  ingredientsSlice.selectors;

const selectAllIngredients = (state: RootState) =>
  state.ingredients.ingredients;

export const getBuns = createSelector(selectAllIngredients, (items) =>
  items.filter((i) => i.type === 'bun')
);

export const getSauces = createSelector(selectAllIngredients, (items) =>
  items.filter((i) => i.type === 'sauce')
);

export const getMains = createSelector(selectAllIngredients, (items) =>
  items.filter((i) => i.type === 'main')
);

export default ingredientsSlice.reducer;
