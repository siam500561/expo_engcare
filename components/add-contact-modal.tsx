import { styles } from "@/assets/css/styles";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

const AddContactModal = ({
  isVisible,
  onClose,
  onSave,
}: {
  isVisible: boolean;
  onClose: () => void;
  onSave: (contact: any) => void;
}) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [classId, setClassId] = useState("");

  const handleSave = () => {
    onSave({ name, number, class: parseInt(classId) });
    setName("");
    setNumber("");
    setClassId("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Contact</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Number"
            value={number}
            onChangeText={setNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Class"
            value={classId}
            onChangeText={setClassId}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            style={[styles.saveButton, { opacity: name && number ? 1 : 0.5 }]}
            onPress={handleSave}
            disabled={!name || !number}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#1e1e1e" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default AddContactModal;
