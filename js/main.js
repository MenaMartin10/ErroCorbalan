// ---------------- SLIDESHOW HERO ----------------
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".slideshow-image");
  let currentIndex = 0;

  function showNextImage() {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
  }

  images[currentIndex].classList.add("active");
  setInterval(showNextImage, 3000);
});

// ---------------- FIREBASE INIT ----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCat6PZJTe3uV-8GS55Pk39zKKSVJrNvfU",
  authDomain: "errocorbalanweb.firebaseapp.com",
  projectId: "errocorbalanweb",
  storageBucket: "errocorbalanweb.firebasestorage.app",
  messagingSenderId: "892233391539",
  appId: "1:892233391539:web:00662b7584021a01353fc6",
  measurementId: "G-JLFFE9JBEF",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ---------------- CARGAR PROPIEDADES DESDE FIRESTORE ----------------
document.addEventListener("DOMContentLoaded", async function () {
  const section = document.getElementById("section2");
  section.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, "propiedades"));

    snapshot.forEach((doc) => {
      const property = doc.data();

      const propertyDiv = document.createElement("div");
      propertyDiv.className = "property";

      const carousel = document.createElement("div");
      carousel.className = "carousel";

      const imagesContainer = document.createElement("div");
      imagesContainer.className = "carousel-images";

      const images = [
        property.image,
        "./images/image1.jpg",
        "./images/image2.jpg",
      ];

      images.forEach((imgSrc, index) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = `Imagen de ${property.title}`;
        img.style.display = index === 0 ? "block" : "none";
        imagesContainer.appendChild(img);
      });

      const prevButton = document.createElement("button");
      prevButton.className = "carousel-control prev";
      prevButton.innerHTML = '<span class="material-icons">chevron_left</span>';

      const nextButton = document.createElement("button");
      nextButton.className = "carousel-control next";
      nextButton.innerHTML = '<span class="material-icons">chevron_right</span>';

      carousel.appendChild(imagesContainer);
      carousel.appendChild(prevButton);
      carousel.appendChild(nextButton);

      let titleText = property.title;
      let icon = "";

      if (property.sale) {
        titleText = `VENTA - ${titleText}`;
        icon = '<i class="fas fa-tags"></i>';
      }

      if (property.rent) {
        titleText = `ALQUILER - ${titleText}`;
        icon = '<i class="fas fa-key"></i>';
      }

      const title = document.createElement("h2");
      title.innerHTML = `${icon} ${titleText}`;

      const price = document.createElement("p");
      price.innerHTML = `<i class="fas fa-dollar-sign"></i> ${property.price}`;

      const location = document.createElement("p");
      location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${property.location}`;

      const bedrooms = document.createElement("p");
      bedrooms.innerHTML = `<i class="fas fa-bed"></i> ${property.bedrooms} Dormitorios`;

      const bathrooms = document.createElement("p");
      bathrooms.innerHTML = `<i class="fas fa-bath"></i> ${property.bathrooms} Baños`;

      const description = document.createElement("p");
      description.textContent =
        "Esta es una propiedad destacada ubicada en una zona privilegiada, ideal para su familia.";

      const button = document.createElement("button");
      button.textContent = "Contactar";

      propertyDiv.appendChild(carousel);
      propertyDiv.appendChild(title);
      propertyDiv.appendChild(price);
      propertyDiv.appendChild(location);
      propertyDiv.appendChild(bedrooms);
      propertyDiv.appendChild(bathrooms);
      propertyDiv.appendChild(description);
      propertyDiv.appendChild(button);

      section.appendChild(propertyDiv);

      // Carousel funcionalidad
      let currentIndex = 0;

      function updateCarousel() {
        imagesContainer.childNodes.forEach((img, index) => {
          img.style.display = index === currentIndex ? "block" : "none";
        });
      }

      prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
      });

      nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
      });
    });
  } catch (error) {
    console.error("❌ Error al obtener propiedades desde Firebase:", error);
  }
});

// ---------------- DOT NAVIGATION ----------------
document.querySelectorAll(".dot").forEach((dot) => {
  dot.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.addEventListener("scroll", function () {
  const sections = [
    document.querySelector("#section1"),
    document.querySelector("#section2"),
    document.querySelector("#section3"),
    document.querySelector("#section4"),
  ];
  const dots = document.querySelectorAll(".dot");

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      dots.forEach((dot) => dot.classList.remove("active"));
      dots[index].classList.add("active");
    }
  });
});

// ---------------- EFECTO EN LOGO AL SCROLLEAR ----------------
document.addEventListener("scroll", function () {
  const erroCorbalan = document.querySelector("#erroCorbalan");
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    erroCorbalan.classList.add("special");
  } else {
    erroCorbalan.classList.remove("special");
  }
});

// ---------------- FORMULARIO DE CONTACTO ----------------
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const nombre = document.querySelector("input[name='nombre']");
  const email = document.querySelector("input[name='email']");
  const mensaje = document.querySelector("textarea[name='mensaje']");
  const status = document.getElementById("formMensaje");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (!nombre.value || !email.value || !mensaje.value) {
        status.textContent = "Por favor completá todos los campos.";
        status.style.color = "red";
        return;
      }

      try {
        await addDoc(collection(db, "mensajes"), {
          nombre: nombre.value,
          email: email.value,
          mensaje: mensaje.value,
          fecha: new Date(),
        });

        status.textContent = "✅ Mensaje enviado con éxito.";
        status.style.color = "green";
        form.reset();
      } catch (error) {
        console.error("Error al enviar mensaje: ", error);
        status.textContent = "❌ Error al enviar. Intentá de nuevo.";
        status.style.color = "red";
      }
    });
  }
});

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginStatus = document.getElementById("loginStatus");
const formCarga = document.getElementById("formPropiedad")?.parentElement;
const userMenu = document.getElementById("userMenu");
const userEmail = document.getElementById("userEmail");
const userDropdown = document.getElementById("userDropdown");
const logoutLink = document.getElementById("logoutLink");
const loginSection = document.getElementById("loginSection");
const estaEnIndex = window.location.pathname.includes("index.html") || window.location.pathname === "/";

// Ocultar cosas al inicio
if (formCarga) formCarga.style.display = "none";
if (userMenu) userMenu.style.display = "none";
if (userDropdown) userDropdown.style.display = "none";
if (loginSection) loginSection.style.display = "none";

// Login
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
    loginStatus.textContent = "✅ Ingresaste correctamente";
    loginStatus.style.color = "green";
  } catch (error) {
    loginStatus.textContent = "❌ Usuario o clave incorrectos";
    loginStatus.style.color = "red";
  }
});

// Toggle menú
userEmail?.addEventListener("click", () => {
  userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
});

// Logout
logoutLink?.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth);
});

// Ver estado de sesión
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Solo en admin.html mostramos cosas de usuario
    if (!estaEnIndex && formCarga) formCarga.style.display = "block";
    if (!estaEnIndex && loginForm) loginForm.style.display = "none";
    if (!estaEnIndex && userMenu) userMenu.style.display = "inline-block";
    if (!estaEnIndex && userEmail) userEmail.textContent = `👤 ${user.email}`;
    if (!estaEnIndex && loginSection) loginSection.style.display = "none";

    if (!estaEnIndex) cargarPropiedadesAdmin?.(); // si existe esa función, la ejecuta
  } else {
    if (formCarga) formCarga.style.display = "none";
    if (!estaEnIndex && loginForm) loginForm.style.display = "block";
    if (userMenu) userMenu.style.display = "none";
    if (userDropdown) userDropdown.style.display = "none";
    if (!estaEnIndex && loginSection) loginSection.style.display = "block";
  }
});


// ---------------- FORMULARIO DE PROPIEDADES ----------------
document.addEventListener("DOMContentLoaded", function () {
  const formProp = document.getElementById("formPropiedad");
  if (!formProp) return;

  formProp.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,
      location: document.getElementById("location").value,
      bedrooms: parseInt(document.getElementById("bedrooms").value),
      bathrooms: parseInt(document.getElementById("bathrooms").value),
      image: document.getElementById("image").value,
      sale: document.getElementById("sale").checked,
      rent: document.getElementById("rent").checked,
      fecha: new Date(),
    };

    try {
      await addDoc(collection(db, "propiedades"), data);
      alert("✅ Propiedad cargada con éxito.");
      formProp.reset();
    } catch (error) {
      console.error("❌ Error al guardar propiedad:", error);
      alert("❌ No se pudo guardar.");
    }
  });
});

async function cargarPropiedadesAdmin() {
  const lista = document.getElementById("listaPropiedades");
  const seccion = document.getElementById("propiedadesAdmin");

  if (!lista || !seccion) return;

  lista.innerHTML = "";
  seccion.style.display = "block";

  try {
    const snapshot = await getDocs(collection(db, "propiedades"));
    snapshot.forEach((doc) => {
      const prop = doc.data();
      const id = doc.id;

      const div = document.createElement("div");
      div.className = "prop-item";
      div.innerHTML = `
        <strong>${prop.title}</strong> - ${prop.price} - ${prop.location}<br>
        <button onclick="editarPropiedad('${id}')">Editar</button>
        <button onclick="eliminarPropiedad('${id}')">Eliminar</button>
        <hr>
      `;
      lista.appendChild(div);
    });
  } catch (e) {
    console.error("❌ Error al cargar propiedades admin:", e);
  }
}

import { doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Eliminar propiedad
window.eliminarPropiedad = async function (id) {
  if (!confirm("¿Seguro que querés eliminar esta propiedad?")) return;
  try {
    await deleteDoc(doc(db, "propiedades", id));
    alert("✅ Propiedad eliminada.");
    cargarPropiedadesAdmin();
  } catch (e) {
    console.error("❌ Error al eliminar:", e);
  }
};

// Editar propiedad (completa el formulario)
window.editarPropiedad = async function (id) {
  try {
    const docSnap = await getDocs(collection(db, "propiedades"));
    let datos = null;

    docSnap.forEach((docu) => {
      if (docu.id === id) datos = docu.data();
    });

    if (!datos) return alert("❌ Propiedad no encontrada.");

    // Completa el formulario
    document.getElementById("title").value = datos.title || "";
    document.getElementById("price").value = datos.price || "";
    document.getElementById("location").value = datos.location || "";
    document.getElementById("bedrooms").value = datos.bedrooms || 0;
    document.getElementById("bathrooms").value = datos.bathrooms || 0;
    document.getElementById("image").value = datos.image || "";
    document.getElementById("sale").checked = datos.sale || false;
    document.getElementById("rent").checked = datos.rent || false;

    // Reemplazá la función submit por una de actualización
    const form = document.getElementById("formPropiedad");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const nuevosDatos = {
        title: form.title.value,
        price: form.price.value,
        location: form.location.value,
        bedrooms: parseInt(form.bedrooms.value),
        bathrooms: parseInt(form.bathrooms.value),
        image: form.image.value,
        sale: form.sale.checked,
        rent: form.rent.checked,
        fecha: new Date()
      };
      try {
        await updateDoc(doc(db, "propiedades", id), nuevosDatos);
        alert("✅ Propiedad actualizada.");
        form.reset();
        form.onsubmit = null;
        cargarPropiedadesAdmin();
      } catch (e) {
        console.error("❌ Error al actualizar:", e);
        alert("❌ No se pudo actualizar.");
      }
    };
  } catch (e) {
    console.error("❌ Error al editar:", e);
  }
};

const verPropiedadesBtn = document.getElementById("verPropiedadesBtn");
verPropiedadesBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  cargarPropiedadesAdmin();
});

// ---------------- BÚSQUEDA DE PROPIEDADES ----------------
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".search-form");
  const searchInput = searchForm.querySelector("input[type='text']");

  searchForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const searchValue = searchInput.value.trim().toLowerCase();
    if (!searchValue) return;

    const section = document.getElementById("section2");
    section.innerHTML = "";

    try {
      const snapshot = await getDocs(collection(db, "propiedades"));

      let results = 0;

      snapshot.forEach((doc) => {
        const property = doc.data();
        const title = property.title?.toLowerCase() || "";
        const location = property.location?.toLowerCase() || "";

        if (title.includes(searchValue) || location.includes(searchValue)) {
          results++;
          // Clonar la misma lógica de renderizado de propiedades
          const propertyDiv = document.createElement("div");
          propertyDiv.className = "property";

          const img = document.createElement("img");
          img.src = property.image;
          img.alt = property.title;

          const titleEl = document.createElement("h2");
          titleEl.textContent = property.title;

          const price = document.createElement("p");
          price.innerHTML = `<i class="fas fa-dollar-sign"></i> ${property.price}`;

          const locationEl = document.createElement("p");
          locationEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${property.location}`;

          const bedrooms = document.createElement("p");
          bedrooms.innerHTML = `<i class="fas fa-bed"></i> ${property.bedrooms} Dormitorios`;

          const bathrooms = document.createElement("p");
          bathrooms.innerHTML = `<i class="fas fa-bath"></i> ${property.bathrooms} Baños`;

          const button = document.createElement("button");
          button.textContent = "Contactar";

          propertyDiv.appendChild(img);
          propertyDiv.appendChild(titleEl);
          propertyDiv.appendChild(price);
          propertyDiv.appendChild(locationEl);
          propertyDiv.appendChild(bedrooms);
          propertyDiv.appendChild(bathrooms);
          propertyDiv.appendChild(button);

          section.appendChild(propertyDiv);
        }
      });

      if (results === 0) {
        section.innerHTML = "<p style='text-align:center;'>No se encontraron propiedades.</p>";
      }
    } catch (error) {
      console.error("❌ Error al buscar propiedades:", error);
    }
  });
});

document.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const logo = document.querySelector("header .logo img");
  const erroLogo = document.getElementById("erroCorbalan");
  const scrollY = window.scrollY;
  const isMobile = window.innerWidth <= 480;

  // Header padding
  header.style.padding = scrollY > 80 ? "5px 20px" : "15px 20px";

  // Mostrar u ocultar logo SOLO en mobile
  if (logo) {
    logo.style.display = isMobile && scrollY > 80 ? "none" : "block";
  }

  // Animación del logo grande (#erroCorbalan)
  if (erroLogo) {
    erroLogo.classList.toggle("special", scrollY > 50);
  }
});

document.addEventListener("scroll", function () {
  const erroLogo = document.getElementById("erroCorbalan");

  if (!erroLogo) return;

  if (window.scrollY > 50) {
    erroLogo.classList.add("shrink-logo");
  } else {
    erroLogo.classList.remove("shrink-logo");
  }
});