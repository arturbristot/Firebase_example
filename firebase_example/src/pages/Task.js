import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importe o hook
import React, { useState, useEffect } from "react";
import { database, doc, deleteDoc } from "../config/firebaseconfig";
import { onSnapshot, collection, documentId } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import newtask from "./NewTask";

export default function Task() {
  const navigation = useNavigation(); // Instancie o hook

  const [task, setTask] = useState([]);

  useEffect(() => {
    const taskCollection = collection(database, "tasks");
    const listen = onSnapshot(taskCollection, (query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setTask(list);
    });
    return () => listen();
  }, []);

  function deleteTask(id) {
    const taskdoRef = doc(database, "tasks", id);
    deleteDoc(taskdoRef);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo}></View>
      <Text style={styles.textTask}> Tarefas </Text>
      <View style={styles.barra}></View>
      <FlatList
        data={task}
        renderItem={({ item }) => {
          return (
            <View style={styles.tasks}>
              <Text style={styles.textpd}>{item.description}</Text>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    deleteTask(item.id);
                  }}
                >
                  <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity style={styles.add} onPress={() => navigation.navigate("NewTask")}>
        <Text style={styles.addtext}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topo:{
    width: "100%",
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 15,
  },
  barra: {
    width: "100%",
    height: 2,
    backgroundColor: "#121212",
    opacity: 0.2,
    marginVertical: 13,
  },
  textTask: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  tasks: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  textpd: {
    fontSize: 18,
    marginLeft: 10,
  },
  add:{
    position: "absolute",
    backgroundColor: "#121212",
    right: 20,
    bottom: 20,
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addtext:{
    fontSize: 30,
    color: "#fff",
  }
});
