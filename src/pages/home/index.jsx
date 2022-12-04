import React, { useEffect, useState } from "react";
import HabitsService from "../../services/HabitsService"

import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import LifeStatus from "../../components/common/LifeStatus";
import StatusBar from "../../components/home/StatusBar";
import CreateHabit from "../../components/home/createHabit";
import EditHabit from "../../components/home/EditHabit";
import ChangeNavigationService from "../../services/ChangeNavigationService";


export default function Home( {route} ) {
    const navigation = useNavigation();
    const [mindHabit, setMindHabit] = useState();
    const [moneyHabit, setMoneyHabit] = useState();
    const [bodyHabit, setBodyHabit] = useState();
    const [funHabit, setfunHabit] = useState();

    const [robotDaysLife, setRobotDaysLife] = useState();
    const today = new Date();

    function handleNavExplanation() {
        navigation.navigate("AppExplanation");
    }

    const excludeArea = route.params?.excludeArea;

    useEffect(() => {

        HabitsService.findByArea("Mente").then((mind) => {
            setMindHabit(mind[0])
        });
        HabitsService.findByArea("Financeiro").then((money) => {
            setMindHabit(money[0])
        });
        HabitsService.findByArea("Corpo").then((body) => {
            setMindHabit(body[0])
        });
        HabitsService.findByArea("Humor").then((fun) => {
            setMindHabit(fun[0])
        });

        if (excludeArea) {
            if (excludeArea == "Mente") {
                setMindHabit(null);
            }
            if (excludeArea == "Financeiro") {
                setMindHabit(null);
            }
            if (excludeArea == "Corpo") {
                setMindHabit(null);
            }
            if (excludeArea == "Humor") {
                setMindHabit(null);
            }
        }
        ChangeNavigationService.checkShowHome(1)
        .then((showHome) => {
          const formDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
          const checkDays =
            new Date(formDate) - new Date(showHome.appStartData) + 1;
    
              setRobotDaysLife(checkDays.toString().padStart(2, "0"));
        })
          .catch((err) => console.log(err));
      }, [route.params]);


    return (

        <View style={styles.container}>
            <ScrollView>
                <View style={{alignItems: "center"}}>
                    <Text style={styles.dailyChecks}> ❤️ {robotDaysLife} {robotDaysLife === "01" ? "dia" : "dias"}- ✔️ 80 checks</Text>
                        <LifeStatus />
                        <StatusBar />

                        {mindHabit ? (
                            <EditHabit habit={mindHabit} checkColor="#90B7F3" />
                        ) : (
                            <CreateHabit habitArea="Mente" borderColor="#90B7F3" />
                        )}


                        {moneyHabit ? (
                            <EditHabit habit={moneyHabit} checkColor="#85BB65" />
                        ) : (
                            <CreateHabit habitArea="Financeiro" borderColor="#85BB65" />
                        )}

                        {bodyHabit ? (
                            <EditHabit habit={bodyHabit} checkColor="#FF0044" />
                        ) : (
                            <CreateHabit habitArea="Corpo" borderColor="#FF0044" />
                        )}

                        {funHabit ? (
                            <EditHabit habit={funHabit} checkColor="#FE7F23" />
                        ) : (
                            <CreateHabit habitArea="Humor" borderColor="#FE7F23" />
                        )}

                </View>
                <Text style={styles.explanationText}
                    onPress={() => {
                        handleNavExplanation();
                    }}
                >
                    Ver explicação novamente
                </Text>
            </ScrollView>
        </View>

    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(21, 21, 21, 0.98)",
    },

    dailyChecks: {
        color:"white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        marginTop: 40,
    },

    explanationText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 15,
        paddingBottom: 25,
    },
});