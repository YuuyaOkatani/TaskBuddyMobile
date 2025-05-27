import react, { useEffect, useState } from "react";
import styles from "../css/styles";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import { db, firebaseAuth } from "../src/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  LoadBundleTask,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";
const Screen10 = ({ route }) => {
  const data = route.params;
  const user2 = data.user2;
  const user = data.user;
  const auth = firebaseAuth;
  const currentUser = auth.currentUser;
  const collectionRef = collection(db, "Contratos");
  const [valor, setValor] = useState("");
  const [desc, setDesc] = useState("");
  const [tempo, setTempo] = useState("");
  const [loading, IsLoading] = useState(false);
  const navigation = useNavigation();
  const contrato = async () => {
    IsLoading(true);

    if (valor >= 50 && desc.trim().length > 5 && tempo > 0) {
      const data = "contrato entre " + user.email + " e " + user2.email;
      await addDoc(collectionRef, {
        createAt: serverTimestamp(),
        Info: data,
        EmailDoContratado: user.email,
        EmailDeQuemVaiContratar: user2.email,
        userID1: user.id,
        userID2: user2.id,
        NomeDoContratado: user.name,
        NomeDeQuemVaiContratar: user2.name,
        DescricaoDoContratado: user.Desc,
        Pagamento: "R$ " + valor,
        Desc: desc,
        Diaria: tempo + " Dias",
        EstadoDoContrato: "Pedido de contrato pendente",
        state1: "waiting",
        state2: true,
      });
      alert("contrato feito com sucesso!");
    } else if (valor < 50) {
      alert("a oferta é muito pouca. (minimo: 50");
    } else if (valor != Number) {
      alert("Coloque apenas números...");
    } else if (desc.trim().length < 10) {
      alert("o contrato terá que ser mais especifico possivel");
    } else if (tempo == 0) {
      alert("Cadê os dias de trabalho???");
    } else if (tempo != number) {
      alert("Coloque apenas números...");
    } else {
      alert("não tem informações o suficiente...");
    }
    IsLoading(false);
  };
  const voltar = () => {
    IsLoading(true);
    navigation.navigate("pagPerfilUsuarioContrato", { user2, user });
    IsLoading(false);
  };
  if (loading == true) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.styleVisuContrato}>
          <TextInput
            value={valor}
            style={styles.inputStyle}
            placeholder="valor da oferta p/dia. Ex: 1500,00"
            onChangeText={(e) => setValor(e)}
          />
          <TextInput
            value={desc}
            style={styles.inputStyle2}
            placeholder="Digite a descrição do contrato, com clareza."
            multiline={true}
            onChangeText={(e) => setDesc(e)}
          />
          <TextInput
            value={tempo}
            style={styles.inputStyle}
            placeholder="dias de trabalho... Ex: 10 "
            onChangeText={(e) => setTempo(e)}
          />
          <TouchableOpacity style={styles.btnCriarContrato} onPress={contrato}>
            <Text>Contratar o {user.name} !</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bntvoltarPerfilContrato}
            onPress={voltar}
          >
            <Text>Voltar para o perfil do usuario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Screen10;
