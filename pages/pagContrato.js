import react, { useState , useEffect} from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { db, firebaseAuth } from "../src/firebase";
import { useNavigation } from "@react-navigation/native";
import { collection , onSnapshot, limit, QuerySnapshot, updateDoc, doc } from "firebase/firestore";
import styles from "../css/styles";
import Loading from "./Loading";
const Screen7 = ({route}) => {
    const data = route.params
    const user = data.user
    const itemID = data.itemID
    const auth = firebaseAuth; 
    const navigation = useNavigation()
    const [items, setItems] = useState([])
    const [vat,setVat] = useState([])
    const [loading, IsLoading] = useState(false)
    const filtro = items.filter((e) => e.id == itemID ) 
    const state = items.filter((e) => e.NomeDoContratado == user.name)
    useEffect(() => {
        const collectionRef = collection(db, "Contratos"); 

        
        const unsbcribe = onSnapshot(collectionRef, limit(1000) , (QuerySnapshot => {
            let state = [];
            QuerySnapshot.forEach((doc) => {
                state.push({id: doc.id, ...doc.data()})
            })
            setItems(state)
        }))

    },[])

    const voltar = () => {
        IsLoading(true)
        navigation.navigate('listaContrato')
        IsLoading(false)

    }
 
    const update = async (info) => {
        const collectionRef = collection(db, 'Contratos')
        await updateDoc(doc(collectionRef, info),{
            state1:true,
            EstadoDoContrato:'Aceito!'


        })
    }
    const updateNega = async(info) => {
        const collectionRef = collection(db,'Contratos')
        await updateDoc(doc(collectionRef,info), {
            state1:false,
            EstadoDoContrato:'Recusado!'

        })
    }
   
   
        

  
    
    return(
        <View style={styles.containerOnePagContrato}>
            <View style={styles.containerTwoPagContrato}>
                <View style={{height:400, width:'auto'}}>
                    <FlatList data={filtro} keyExtractor={(item) => item.id} renderItem={({item}) =>(
                        <View style={styles.containerThree}>
                            <Text>ID do contrato: {item.id}</Text>
                            <Text>Nome de quem vai contratar: {item.NomeDeQuemVaiContratar}</Text>
                            <Text>Nome do contratado: {item.NomeDoContratado}</Text>
                            <Text>Descrição do contratado: {item.DescricaoDoContratado}</Text>
                            <Text>Descrição do contrato:{item.Desc}</Text>
                            <Text>Estado do contrato: {item.EstadoDoContrato}</Text>
                            <Text>Dias de trabalho: {item.Diaria}</Text>
                            <Text>Pagamento por dia:{item.Pagamento}</Text>
                            {user.id == item.userID1 && item.state1 == 'waiting'?
                            (
                            <View>
                            <TouchableOpacity style={styles.btnAceitar} onPress={() => update(item.id)}>
                            <Text>
                                Aceitar
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnNegar} onPress={() => updateNega(item.id)}>
                            <Text>
                                Negar
                            </Text>
                            </TouchableOpacity>
                            </View>
                         
                            ):('')}

                        </View>
                    )}/>

                </View>
                <TouchableOpacity style={styles.btnvoltarPagContrato} onPress={voltar}>
                    <Text>
                        Voltar ao menu
                    </Text>
                </TouchableOpacity>


            </View>
        </View>
    )

}
export default Screen7;

