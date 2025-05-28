import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { db, firebaseAuth } from "../src/firebase";
import { getStorage } from "@firebase/storage";
import {
  getDocs,
  updateDoc,
  collection,
  onSnapshot,
  doc,
  query,
  limit,
} from "firebase/firestore";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../css/styles";
import firebase from "firebase/compat/app";
import Loading from "./Loading";

const Screen4 = () => {
  const navigation = useNavigation();
  const auth = firebase.auth();

  const storage = getStorage();
  const usersCollectionRef = collection(db, "users");
  const [photo, setPhoto] = useState(require("../img/default.jpg"));
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [expec, setExpec] = useState("");
  const [desc, setDesc] = useState("");
  const [data1, setData1] = useState("");
  const [morre, setMorre] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, IsLoading] = useState(false);

  const listaContrato = () => {
    IsLoading(true);
    navigation.navigate("listaContrato");
    IsLoading(false);
  };
  const config = () => {
    IsLoading(true);
    navigation.navigate("pagConfig");
    IsLoading(false);
  };
  useEffect(() => {
    const collectionRef = collection(db, "Contratos");

    const unsbcribe = onSnapshot(
      collectionRef,
      limit(1000),
      (QuerySnapshot) => {
        let state = [];
        QuerySnapshot.forEach((doc) => {
          state.push({ id: doc.id, ...doc.data() });
        });
        setItems(state);
      }
    );
  }, []);

  useEffect(() => {
    if (firebase.auth().currentUser) {
      const scrib = onSnapshot(usersCollectionRef, (QuerySnapshot) => {
        let newArray = [];
        QuerySnapshot.forEach((doc) => {
          newArray.push({ id: doc.id, ...doc.data() });
        });
        function escolha(users, emailAlvo) {
          for (let i = 0; i < users.length; i++) {
            if (users[i].email === emailAlvo) {
              return i;
            }
          }
        }
        const s = escolha(newArray, auth.currentUser.email);
        const p = newArray[s].name;
        const o = newArray[s].age;
        const r = newArray[s].Desc;
        const r2 = newArray[s].expec;
        const a = newArray[s].photo;

        setMorre([p, o, r, r2, a]);
        setName(p);
        setAge(o);
        setDesc(r);
        setExpec(r2);
        setPhoto(a);
      });
    } else {
    }
  }, []);

  function updates() {
    IsLoading(true);
    getDocs(query(usersCollectionRef)).then((docsnap) => {
      let users = [];
      docsnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });

      function escolha(users, emailAlvo) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].email === emailAlvo) {
            return i;
          }
        }
      }
      const newArray = users;
      const posicaoEmail = escolha(users, firebase.auth().currentUser.email);

      const dados = users[posicaoEmail].id;
      updateDoc(doc(db, "users", dados), {
        photo: photo,
        name: name,
        age: age,
        expec: expec,
        Desc: desc,
      })
        .then(() => {
          alert("data submitted");
        })
        .catch((error) => {});
    });
    IsLoading(false);
  }
  const returnData = () => {
    IsLoading(true);
    getDocs(query(usersCollectionRef)).then((docsnap) => {
      let users = [];
      docsnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      function escolha(users, emailAlvo) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].email === emailAlvo) {
            return i;
          }
        }
      }

      const posicaoEmail = escolha(users, auth.currentUser.email);

      const user = users[posicaoEmail];

      setData1(user);
      navigation.navigate("pagContratacao", { user });
    });
    IsLoading(false);
  };
  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].base64);
    } else if (photo.length > 2) {
      setPhoto(require("../img/default.jpg"));
    }
  };

  if (loading == true) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={{ padding: 20, top: 1 }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={handleImagePicker}>
            {photo ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${photo}` }}
                style={styles.teste2}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("../img/default.jpg")}
                style={styles.teste2}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.view}>
          <View style={styles.view2}>
            <TextInput
              style={styles.textstyle}
              value={name}
              onChangeText={(e) => setName(e)}
              placeholder="Nome completo"
            />
          </View>
          <View style={styles.view2}>
            <TextInput
              style={styles.textstyle}
              value={age}
              onChangeText={(e) => setAge(e)}
              placeholder="Idade"
            />
          </View>
          <View style={styles.view2}>
            <TextInput
              style={styles.textstyle}
              value={expec}
              onChangeText={(e) => setExpec(e)}
              placeholder="Formação"
            />
          </View>
          <View style={styles.view5}>
            <TextInput
              style={styles.textstyle}
              value={desc}
              onChangeText={(e) => setDesc(e)}
              placeholder="O que você faz...?"
              multiline={true}
            />
          </View>

          <TouchableOpacity onPress={updates}>
            <View style={styles.view3}>
              <Image
                source={require("../img/saveicon2.png")}
                style={styles.img3}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={listaContrato}
            style={styles.btnProcurarContrato}
          >
            <Text>Procurar Contratos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonProcurar}>
            <Text
              style={styles.buttonTextProcurar}
              onPress={() => returnData(data1)}
            >
              Procurar trabalhadores
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={config} style={styles.img4}>
        <Image source={require("../img/gears.png")} style={styles.img2} />
      </TouchableOpacity>
    </View>
  );
};
export default Screen4;
