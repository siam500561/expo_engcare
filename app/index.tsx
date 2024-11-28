import { styles } from "@/assets/css/styles";
import { StudentItem } from "@/components/student-item";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const STORAGE_KEY = "@contacts_data";

const defaultStudents = [
  { name: "❤️Sohana❤️", number: "+880 1326-503908" },
  { name: "Siam", number: "+880 1784-500561" },
  { name: "Mariam", number: "+880 1973-527437" },
  { name: "Nafi", number: "+880 1736-297983" },
  { name: "Sneha", number: "+880 1904-956638" },
  { name: "Adrita", number: "+880 1734-586797" },
  { name: "Shima", number: "+880 1405-032890" },
  { name: "Bristy", number: "+880 1935-010650" },
  { name: "Safid", number: "+880 1755-314877" },
  { name: "Pranto", number: "+880 1990-577854" },
  { name: "Jamil", number: "+880 1709-430398" },
  { name: "Ibrahim", number: "+880 1909-170677" },
  { name: "Bithy", number: "+880 1735-096051" },
].map((student) => ({
  ...student,
  _id: `default_${student.name}`,
  _creationTime: Date.now(),
})) as Doc<"students">[];

export default function Index() {
  const convexStudents = useQuery(api.students.get);
  const addStudent = useMutation(api.students.set);
  const [localStudents, setLocalStudents] = useState<Doc<"students">[]>([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [hasLoadedLocal, setHasLoadedLocal] = useState(false);

  const saveLocalData = async (data: Doc<"students">[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving local data:", error);
    }
  };

  const loadLocalData = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.length > 0) {
          setLocalStudents(parsedData);
        } else {
          setLocalStudents(defaultStudents);
        }
      } else {
        setLocalStudents(defaultStudents);
      }
    } catch (error) {
      console.error("Error loading local data:", error);
      setLocalStudents(defaultStudents);
    } finally {
      setHasLoadedLocal(true);
    }
  };

  // Load local data on mount
  useEffect(() => {
    loadLocalData();
  }, []);

  // Sync with Convex when online and data changes
  useEffect(() => {
    if (convexStudents && convexStudents.length > 0) {
      saveLocalData(convexStudents);
      setLocalStudents(convexStudents);
    }
  }, [convexStudents]);

  const handleSave = async () => {
    if (name && number) {
      const isOnline = await NetInfo.fetch().then((state) => state.isConnected);

      if (isOnline) {
        // Save to Convex if online
        await addStudent({ name, number });
      } else {
        // Save locally if offline
        const newContact = {
          _id: `local_${Date.now()}`,
          _creationTime: Date.now(),
          name,
          number,
        } as Doc<"students">;

        const updatedContacts = [...localStudents, newContact];
        setLocalStudents(updatedContacts);
        saveLocalData(updatedContacts);
      }

      setName("");
      setNumber("");
      Keyboard.dismiss();
    }
  };

  // Don't render anything until we've at least tried to load local data
  if (!hasLoadedLocal) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
      </View>

      <ScrollView style={styles.scrollContainer} bounces={false}>
        <View style={styles.listContainer}>
          {localStudents.map((student, index) => (
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
