import Realm from "realm";

const appRealm = new Realm.App({ id: "tailor-rhmfx", timeout: 10000 });

export default appRealm

/*
const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regPassword= /^[a-zA-Z0-9]{6,}$/
 
if (reg.test(email) === false){
    Alert.alert(
      "Email",
      "Please insert a valid email",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
}  
else if(password === null || regPassword.test(password) === false){
  Alert.alert(
    "Password",
    "Please enter a password of minimum 6 charachters",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
}
else{
    await app.emailPasswordAuth.registerUser({ email, password });
    Alert.alert(
      "Confirm User",
      "An email has been sent to you in order to confirm your email",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }
  */