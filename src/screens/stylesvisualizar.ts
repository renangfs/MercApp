import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#265a47",
  },
  price: {
    fontSize: 16,
    color: "#265a47",
    marginTop: 4,
  },
  stock: {
    fontSize: 14,
    marginTop: 4,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d9d9d9",
    paddingHorizontal: 15,
  },
  centerArea: {
  justifyContent: "flex-end",
  alignItems: "center",
},
  searchInput: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 50,
    fontSize: 18,
    width: width - 70,
  },
  carrolupa: {
    width: 70,
    height: 70,
  },
  user: {
    width: 35,
    height: 35,
  },
  lupa: {
    width: 30,
    height: 30,
  },
});

export default styles;
