import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { database, addDoc, collection } from "../config/firebaseconfig";
import { useNavigation } from "@react-navigation/native"; // Importe o hook

export default function NewTask() {
  const navigation = useNavigation(); // Instancie o hook
  const [newTask, setNewTask] = useState("");

  function addTask() {
    const taskdoRef = collection(database, "tasks");
    addDoc(taskdoRef, {
      description: newTask,
      status: true,
    });

    navigation.navigate("Task");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo}></View>
      <Text style={styles.tittle}>Adicionar Tarefas</Text>
      <View style={styles.caixa}>
        <TextInput
          style={styles.input}
          placeholder="Digite a tarefa"
          value={newTask}
          onChangeText={setNewTask}
        ></TextInput>
        <TouchableOpacity
          style={styles.btnadd}
          onPress={() => {
            addTask();
          }}
        >
          <Text style={styles.btntext}>Adicionar</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#fff",
    alignItems: "center",
  },
  caixa: {
    flexDirection: "row",
  },
  tittle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#121212",
    width: "70%",
    height: 40,
    margin: 5,
    padding: 10,
  },
  btnadd: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 10,
    margin: 5,
    width: "20%",
  },
  btntext: {
    color: "#fff",
  },
});
