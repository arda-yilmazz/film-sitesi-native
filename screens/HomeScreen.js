import { useTheme } from "@react-navigation/native";
import { View, Text, Button } from "react-native";

function HomeScreen() {
    const { colors } = useTheme()
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.text }}>Home Screen</Text>
            <Button title="About" />
        </View>
    );
}

export default HomeScreen;