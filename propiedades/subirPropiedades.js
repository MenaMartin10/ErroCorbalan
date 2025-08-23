// subirPropiedades.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ⚠️ TU CONFIGURACIÓN (copiada de la imagen que mandaste)
const firebaseConfig = {
  apiKey: "AIzaSyBA9Ed3lInMu_bhQfVRY6FJjlwhGfZr-OY",
  authDomain: "erro-corbalan.firebaseapp.com",
  projectId: "erro-corbalan",
  storageBucket: "erro-corbalan.appspot.com",
  messagingSenderId: "566684219091",
  appId: "1:566684219091:web:d5d88e75a8ce753a0f3e4e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// PROPIEDADES A CARGAR
const propiedades = [
  {
    title: "Casa en San Isidro",
    image: "./images/image2.jpg",
    sale: true,
    rent: false,
    price: "USD 120,000",
    location: "San Isidro, Buenos Aires",
    bedrooms: 3,
    bathrooms: 2
  },
  {
    title: "Departamento en Palermo",
    image: "./images/image3.jpg",
    sale: false,
    rent: true,
    price: "USD 700",
    location: "Palermo, Capital Federal",
    bedrooms: 2,
    bathrooms: 1
  },
  {
    title: "Chalet en Mar del Plata",
    image: "./images/image4.jpg",
    sale: true,
    rent: false,
    price: "USD 150,000",
    location: "Mar del Plata, Buenos Aires",
    bedrooms: 4,
    bathrooms: 3
  },
  {
    title: "Casa en Villa Urquiza",
    image: "./images/image2.jpg",
    sale: true,
    rent: false,
    price: "USD 200,000",
    location: "Villa Urquiza, Buenos Aires",
    bedrooms: 5,
    bathrooms: 4
  },
  {
    title: "Departamento en Recoleta",
    image: "./images/image1.jpg",
    sale: false,
    rent: true,
    price: "USD 500",
    location: "Recoleta, Capital Federal",
    bedrooms: 2,
    bathrooms: 2
  },
  {
    title: "Piso en Belgrano",
    image: "./images/image4.jpg",
    sale: true,
    rent: false,
    price: "USD 450,000",
    location: "Belgrano, Capital Federal",
    bedrooms: 3,
    bathrooms: 3
  }
];

async function subirPropiedades() {
  const ref = collection(db, "propiedades");

  for (const propiedad of propiedades) {
    await addDoc(ref, propiedad);
    console.log("✅ Subida:", propiedad.title);
  }

  alert("Propiedades subidas a Firebase con éxito.");
}

subirPropiedades();
