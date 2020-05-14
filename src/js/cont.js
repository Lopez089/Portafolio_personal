// Datos del formulario
let name, compania, email, mensaje;
// base de datos
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCPDJSzOZ7dnSPSx1XrdCjRdL6U-1TUBPQ",
  authDomain: "portafoliojuan-50236.firebaseapp.com",
  databaseURL: "https://portafoliojuan-50236.firebaseio.com",
  projectId: "portafoliojuan-50236",
  storageBucket: "portafoliojuan-50236.appspot.com",
  messagingSenderId: "930014493449",
  appId: "1:930014493449:web:2626bc9728df46ce"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/// boton enviar
const enviar = e => {
  name = document.getElementById("nombre").value;
  compania = document.getElementById("compania").value;
  email = document.getElementById("email").value;
  mensaje = document.getElementById("mensaje").value;
  if (nombreValido()) {
    if (companiaValida()) {
      if (correoValido(email)) {
        if (mensajeValido()) {
          // base de datos
          let contactosRef = firebase.database().ref("contactosWeb");
          let nuevoComentarioRef = contactosRef.push();
          nuevoComentarioRef.set({
            nombre: name,
            compania: compania,
            email: email,
            mensaje: mensaje
          });
          document.getElementById("envio").innerHTML = "";
          document.getElementById("form").innerHTML =
            "Mensaje enviado correctamente. Contestare con la mayor brevedad. Gracias";
        }
      }
    }
  }
  nombreValido();
  companiaValida();
  correoValido(email);
  mensajeValido();
};

// comprobar que el nombre es correcto

const nombreValido = () => {
  if (name.length <= 2) {
    document.getElementById("name").innerHTML = "Escribe un nombre correcto";
    return false;
  } else {
    document.getElementById("name").innerHTML = "";
    return true;
  }
};
// comprobar que la compañia es correcta

const companiaValida = () => {
  if (compania.length <= 2) {
    document.getElementById("compani").innerHTML =
      "Escribe una compañia correcta";
    return false;
  } else {
    document.getElementById("compani").innerHTML = "";
    return true;
  }
};
// comprobar que el correo es correcto

const correoValido = valor => {
  let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (emailRegex.test(valor)) {
    document.getElementById("correo").innerHTML = "";
    return true;
  } else {
    document.getElementById("correo").innerHTML = "Escribe un email correcto";
    return false;
  }
};

// comprobar que el mensaje es correcto

const mensajeValido = () => {
  if (mensaje.length < 10) {
    document.getElementById("msg").innerHTML = "Escribe un mensaje correcto";
    return false;
  } else {
    document.getElementById("msg").innerHTML = "";
    return true;
  }
};
