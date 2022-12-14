import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, handleNavHome, handleSetShowHome } from "react-native";
import DefaultButton from "../../components/common/DefaultButton";
import ExplanationCard from "../../components/explanation/ExplanationCard";
import { useNavigation } from "@react-navigation/native";
import ChangeNavigationService from "../../services/ChangeNavigationService";


export default function AppExplanation() {

    const navigation = useNavigation();
    const [showHome, setShowHome] = useState("false");
    const startDate = new Date();
    const month = `${startDate.getMonth() + 1}`.padStart(2, "0")
    const day = `${startDate.getDate()}`.padStart(2, "0")
    const appStartData = `${startDate.getFullYear()}-${month}-${day}`

        function handleNavHome() {
            navigation.navigate("Home")
        }

    function handleSetShowHome() {
        if (showHome != "true") {
            ChangeNavigationService.setShowHome({ showHome: "true", appStartData})
                .then(() => console.log(`Sucesso! ${showHome} ${appStartData}`))
                .catch((err) => console.log(err));
            setShowHome("true");

            handleNavHome();
        }
    }


    return (

        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: "center"}}>
                    <Text style={styles.title}>
                        Antes, deixa {"\n"} eu te explicar...
                    </Text>
                    <ExplanationCard />
                    <Text style={styles.descriptionCta}>
                        Pronto(a) para subir de nível na vida?
                    </Text>
                    <Text style={styles.description}>
                        Na próxima tela você irá poder escolher {"\n"} seus 4 hábitos de forma
                        individual.
                    </Text>
                    <DefaultButton
                        buttonText={"Continuar"}
                        handlePress={handleSetShowHome}
                        width={250}
                        height={50}
                    />
                </View>
            </ScrollView>
        </View>


    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(21, 21, 21, .98)",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginVertical: 40,
    },

    descriptionCta: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
        margintop:20,
        marginBottom:10,
    },

    description: {
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 30,
    },

});