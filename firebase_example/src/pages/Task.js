import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importe o hook
import React, { useState, useEffect } from "react";
import { database, doc, deleteDoc } from "../config/firebaseconfig";
import { onSnapshot, collection, documentId } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";

export default function task() {
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
      <Text style={styles.textTask}> Tarefas </Text>
      <FlatList
        data={task}
        renderItem={({ item }) => {
          return (
            <View style={styles.tasks}>
              <TouchableOpacity onPress={() => {deleteTask(item.id)}}>
                <text style={styles.textTask}> {item.title} </text>
              </TouchableOpacity>
              <Text>{item.description}</Text>
            </View>
          );
        }}
      />
1425
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    borderRadius: 50,
    bottom: 50,
  },
  txtbtnNewTask: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
