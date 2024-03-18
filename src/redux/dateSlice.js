// dateSlice.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'matches',
  initialState: {
    bookedSlots: [],
  },
  reducers: {
    bookSlot: (state, action) => {
      state.bookedSlots.push(action.payload);
      AsyncStorage.setItem('db', JSON.stringify(state.bookedSlots)).catch(
        error => console.error('Error saving booked slots:', error),
      );
    },
    editSlot: (state, action) => {
      const {index, newData} = action.payload;
      console.log('----state.bookedSlots-------', state.bookedSlots);
      const updatedBookedSlots = state.bookedSlots; // Create a copy of bookedSlots array
      console.log('----updatedBookedSlots-------', updatedBookedSlots);
      updatedBookedSlots[index] = newData; // Update the specific slot
      state.bookedSlots = updatedBookedSlots; // Update the state with the new array
      AsyncStorage.setItem('db', JSON.stringify(updatedBookedSlots)).catch(
        error => console.error('Error saving booked slots:', error),
      );
    },
    deleteSlot: (state, action) => {
      const index = action.payload;
      state.bookedSlots.splice(index, 1);
      AsyncStorage.setItem('db', JSON.stringify(state.bookedSlots)).catch(
        error => console.error('Error saving booked slots:', error),
      );
    },
    setBookedSlots: (state, action) => {
      state.bookedSlots = action.payload; // Set booked slots data
    },
  },
});

export const {bookSlot, editSlot, deleteSlot, setBookedSlots} =
  dateSlice.actions;
export default dateSlice.reducer;

export const fetchBookedSlots = () => async dispatch => {
  try {
    const data = await AsyncStorage.getItem('db');
    dispatch(setBookedSlots(JSON.parse(data || '[]'))); // Update booked slots data
  } catch (error) {
    console.log(error);
  }
};
