import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Outfit_400Regular",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: "Outfit_400Regular",
  },
  saveButton: {
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontFamily: "Outfit_400Regular",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    paddingHorizontal: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: "Outfit_400Regular",
  },
  number: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Outfit_400Regular",
    marginTop: 4,
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontSize: 16,
    color: "#fff",
  },
});
