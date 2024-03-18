import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {deleteSlot, editSlot} from '../redux/dateSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const dateCardView = ({data}) => {
  const [newDate, setNewDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Track the index being edited
  const dispatch = useDispatch();

  const handleEdit = (index, newDate) => {
    setEditingIndex(index); // Set the index being edited
    dispatch(editSlot({index, newData: newDate.toString()})); // Convert Date object to string
  };

  const handleDelete = index => {
    dispatch(deleteSlot(index));
  };

  const RenderItem = ({index, item}) => {
    const itemDate = new Date(item);
    const day = itemDate.toLocaleDateString('en-US', {weekday: 'long'});
    const month = itemDate.toLocaleDateString('en-US', {month: 'long'});
    const date = itemDate.getDate();
    const year = itemDate.getFullYear();

    const hours = itemDate.getHours();
    const minutes = itemDate.getMinutes();
    const time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    const ampm = hours >= 12 ? 'PM' : 'AM';

    console.log(time, ampm);
    return (
      <View style={styles.viewContainer}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
          {day.toUpperCase()}
          {', '}
          {date} {month.toUpperCase()}
        </Text>
        <Text style={{color: 'white', fontWeight: '500'}}>
          {time} {ampm}
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Icon
            name="square-edit-outline"
            onPress={() => {
              handleEdit(index, newDate);
              setOpen(true);
            }}
            size={30}
            color={'black'}
            style={{fontWeight: 'bold'}}
          />
          <Icon
            name="delete"
            onPress={() => handleDelete(index)}
            size={30}
            color={'black'}
            style={{fontWeight: 'bold'}}
          />
        </View>

        <View style={{backgroundColor: 'yellow'}} />
      </View>
    );
  };
  return (
    <>
      <FlatList
        data={data}
        renderItem={({item, index}) => <RenderItem item={item} index={index} />}
      />
      <DatePicker
        modal
        open={open}
        date={newDate}
        minimumDate={new Date()}
        onConfirm={date => {
          setOpen(false);
          setNewDate(date);
          handleEdit(editingIndex, date); // Dispatch editSlot action with the selected date
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default dateCardView;

const styles = StyleSheet.create({
  container: {flex: 1, zIndex: -1},
  viewContainer: {
    flex: 1,
    // height: 40,
    backgroundColor: 'mediumslateblue',
    margin: 5,
    // alignItems: 'center',
    borderRadius: 10,
    padding: 12,
  },
});
