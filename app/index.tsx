import { styles } from "@/assets/css/styles";
import { StudentItem } from "@/components/student-item";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Feather } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const students = useQuery(api.students.get);
  const addStudent = useMutation(api.students.set);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const slideAnim = useRef(new Animated.Value(-100)).current;

  const toggleAddContact = () => {
    setIsAdding(!isAdding);
    Animated.spring(slideAnim, {
      toValue: isAdding ? -200 : 0,
      tension: 65,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handleSave = async () => {
    if (name && number) {
      await addStudent({ name, number });
      setName("");
      setNumber("");
      toggleAddContact();
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <TouchableOpacity style={styles.addButton} onPress={toggleAddContact}>
          <Feather name={isAdding ? "x" : "plus"} size={24} color="#7D7AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} bounces={false}>
        {/* <Animated.View
          style={[
            styles.addContactForm,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TextInput
            style={styles.addInput}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#8E8E93"
          />
          <TextInput
            style={styles.addInput}
            placeholder="Phone Number"
            value={number}
            onChangeText={setNumber}
            keyboardType="phone-pad"
            placeholderTextColor="#8E8E93"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={toggleAddContact}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.newSaveButton,
                { opacity: name && number ? 1 : 0.5 },
              ]}
              onPress={handleSave}
              disabled={!name || !number}
            >
              <Text style={styles.newSaveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Animated.View> */}

        <View style={styles.listContainer}>
          {students?.map((student: Doc<"students">, index: number) => (
            <StudentItem key={student._id} student={student} index={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
