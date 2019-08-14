import React, { useState } from 'react';
import { View, Text, Modal, Button, TextInput } from 'react-native';

const EditProfileModal = ({ show, onClose }) => {
  const [name, setName] = useState('');

  const { modalContainer, closeModalStyle, modalX, modalBody } = styles;

  return (
    <Modal animationType="slide" visible={show} transparent={false}>
      <View style={modalContainer}>
        <View style={closeModalStyle}>
          <Text style={modalX} onPress={() => onClose(false)}>
            X
          </Text>
        </View>
        <View style={modalBody}>
          <Text>Name</Text>
          <TextInput value={name} onChangeText={text => setName(text)} />
          <Text>Name</Text>
          <TextInput value={name} onChangeText={text => setName(text)} />
          <Text>Name</Text>
          <TextInput value={name} onChangeText={text => setName(text)} />
          <Text>Name</Text>
          <TextInput value={name} onChangeText={text => setName(text)} />
          <Button title={'Submit'} />
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    paddingBottom: 60
  },
  modalBody: {
    padding: 40
  },
  closeModalStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 30
  },
  modalX: {
    padding: 10,
    paddingRight: 20,
    color: '#777',
    fontSize: 18
  }
};

export default EditProfileModal;
