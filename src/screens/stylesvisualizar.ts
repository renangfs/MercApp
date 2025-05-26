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
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  price: {
    fontSize: 14,
    color: "#27ae60",
    marginTop: 4,
  },
  stock: {
    fontSize: 12,
    marginTop: 4,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d9d9d9",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  centerArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 45,
    fontSize: 18, // Aumenta o tamanho da letra
    width: width - 70, // Ocupa a tela inteira, exceto 60px (lupa) + 10px (padding)
  },
  carrolupa: {
    width: 60,
    height: 60,
  },
});

export default styles;
