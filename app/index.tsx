import { styles } from "@/assets/css/styles";
import { StudentItem } from "@/components/student-item";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const students = useQuery(api.students.get);
  const addStudent = useMutation(api.students.set);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSave = async () => {
    if (name && number) {
      await addStudent({ name, number });
      setName("");
      setNumber("");
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
      </View>

      <ScrollView style={styles.scrollContainer} bounces={false}>
        <View style={styles.listContainer}>
          {students?.map((student: Doc<"students">, index: number) => (
            <StudentItem key={student._id} student={student} index={index} />
          ))}
        </View>

        <View style={styles.addContactForm}>
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
          <TouchableOpacity
            style={[
              styles.newSaveButton,
              { opacity: name && number ? 1 : 0.5 },
            ]}
            onPress={handleSave}
            disabled={!name || !number}
          >
            <Text style={styles.newSaveButtonText}>Add Contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
