import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    marginHorizontal: 3,
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  initialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  initials: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Outfit_400Regular",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    color: "#000",
    fontFamily: "Outfit_400Regular",
    marginBottom: 1,
    letterSpacing: -0.2,
  },
  number: {
    fontSize: 13,
    color: "#8E8E93",
    fontFamily: "Outfit_400Regular",
    letterSpacing: -0.1,
  },
  callButton: {
    padding: 8,
    marginLeft: 8,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Outfit_400Regular",
    letterSpacing: -0.5,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(125,122,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  addContactForm: {
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  addInput: {
    height: 44,
    backgroundColor: "#F2F2F7",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 15,
    fontFamily: "Outfit_400Regular",
    color: "#000",
  },
  newSaveButton: {
    flex: 1,
    backgroundColor: "#7D7AFF",
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  newSaveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Outfit_400Regular",
    fontWeight: "500",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContentContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
  },
  cancelButtonText: {
    color: "#8E8E93",
    fontSize: 16,
    fontFamily: "Outfit_400Regular",
    fontWeight: "500",
  },
  mainContainer: {
    flex: 1,
    position: "relative",
  },
});
