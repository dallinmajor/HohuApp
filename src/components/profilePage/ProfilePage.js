import React, { useContext, useState } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import EditProfileModal from './EditProfileModal';
import { UserContext } from '../../GlobalState';

const ProfilePage = () => {
  const User = useContext(UserContext);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <View>
      <View>
        <Button title={'Edit Profile'} onPress={() => setShowEditModal(true)} />
      </View>
      <View>
        <Text>Bio</Text>
      </View>
      <EditProfileModal show={showEditModal} onClose={setShowEditModal} />
    </View>
  );
};

export default ProfilePage;
