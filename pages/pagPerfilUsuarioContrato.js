import react, { useEffect, useState} from "react";
import { View, Text, ScrollView, Image} from "react-native";
import { firebaseAuth } from "../src/firebase";
import { db } from "../src/firebase";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity} from "react-native";
import {collection, onSnapshot} from "firebase/firestore";
import styles from "../css/styles";
import firebase from "firebase/compat/app";
import Loading from "./Loading";

const  Screen6 = ({route}) => {
    const [loading, IsLoading] = useState(false)
    const info = route.params

    const user = info.user
    const user2 = info.user2
 
    const auth = firebase.auth()
 

    const navigation = useNavigation();

    const chatRoom = (user) => { 
        IsLoading(true)
        navigation.navigate('contratoChat', {user, user2})
        IsLoading(false)
    
    }
    const voltar = (user) => {
        IsLoading(true)
        
        navigation.navigate('pagContratacao', {user})
        IsLoading(false)
    }
    const contrato = () => {
        IsLoading(true)
        navigation.navigate('visualizarContrato', {user2, user})
        IsLoading(false)
    }
    if(loading == true){
        return <Loading/>
    }
    
  
    
    return(
        <View style={styles.containerOnePerfil}>
            <View style={styles.containerTwoPerfil}>
         
                <View style={styles.containerThreePerfil}>
                <Image source={{ uri: `data:image/jpeg;base64,${user.photo}` }}
                                    style={styles.imgPerfil}
                                    resizeMode="cover"
                                    alt="avatar"/>
                    <View style={{marginTop:20}}>
                    <ScrollView style={{height:160, width:'auto'}}>
                    <Text style={styles.textStylePerfil}>Nome: {user.name}</Text>
                    <Text style={styles.textStylePerfil}>Idade: {user.age}</Text>
                    <Text style={styles.textStylePerfil}>Email: {user.email}</Text>
                    <Text style={styles.textStylePerfil}>Especialização: {user.expec}</Text>
                    <Text style={styles.textStylePerfil} >Descrição: {user.Desc}</Text>
                    </ScrollView>
                    
                   
                    </View>
                    <TouchableOpacity style={styles.btnChatPerfil} onPress={() => chatRoom(user)}>
                        <View>
                            <Text>
                                Conversar
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bntvoltarPerfil} onPress={() => voltar(user2)}>
                        <View>
                            <Text>
                                Voltar para lista
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btncontratarPerfil} onPress={contrato}>
                        <View>
                            <Text>
                                Criar contrato com o usuario
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>


            </View>
        </View>

    )

}
export default Screen6;