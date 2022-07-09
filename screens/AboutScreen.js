import { useTheme } from "@react-navigation/native";
import { View, Text } from "react-native";

function AboutScreen() {
    const {colors} = useTheme()
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{color: colors.text}}>About Screen</Text>
        </View>
    );
}

export default AboutScreen;