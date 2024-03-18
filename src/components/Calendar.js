import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {bookSlot, fetchBookedSlots} from '../redux/dateSlice';
import DateCardView from './DateCardView';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const bookedSlots = useSelector(state => state.matches.bookedSlots);

  const dispatch = useDispatch();

  const storeData = date => {
    let dateString = date.toString(); // Convert date to ISO string
    // Check if the date already exists in the bookedSlots array
    if (!bookedSlots.includes(dateString)) {
      dispatch(bookSlot(dateString));
    } else {
      Alert.alert('Date already booked');
    }
  };

  // Dispatch fetchBookedSlots action when component mounts
  useEffect(() => {
    dispatch(fetchBookedSlots());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          textAlign: 'center',
          color: 'black',
        }}>
        MATCH SCHEDULE
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Text style={{color: 'white'}}>Book Schedule</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date} // Set the date prop to the current date state
        minimumDate={new Date()}
        onConfirm={date => {
          setOpen(false);
          setDate(date); // Update the date state
          storeData(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <DateCardView data={bookedSlots} />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: 20,
    zIndex: -1,
  },
  button: {
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    bottom: 50,
    width: '80%',
    backgroundColor: 'royalblue',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 50,
    elevation: 10,
    borderRadius: 10,
  },
});
