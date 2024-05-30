import { Button, StyleSheet, Text, View } from "react-native"; 
import { useNavigation } from '@react-navigation/native'; // Importe o hook



export default function App() {
    const navigation = useNavigation(); // Instancie o hook

    return (
    <View>
        <Text>Open up App.js to start working on your app!</Text>
        <Button title="Go to Details" onPress={() => navigation.navigate('Details')}/>
    </View>
  );
}
