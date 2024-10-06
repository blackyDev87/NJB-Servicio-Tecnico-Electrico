// Detectar el desplazamiento de la página
window.addEventListener("scroll", function () {
  var navbar = document.getElementById("navbar");
  var navlink = document.getElementById("nav-link");
  var carouselHeight = document.querySelector(".carousel").offsetHeight;

  // Cambiar el color del navbar al hacer scroll
  if (window.scrollY > carouselHeight * 0.3) {
    navbar.classList.add("scrolled");
    navlink.classList.add("deco");
  } else {
    navbar.classList.remove("scrolled");
    navlink.classList.remove("deco");
  }
});

// Colapsar el menú en móviles al seleccionar un enlace
const navLinks = document.querySelectorAll(".nav-link");
const navbarToggler = document.querySelector(".navbar-toggler");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarToggler.classList.contains("collapsed")) {
      return; // No hacer nada si el menú ya está colapsado
    }
    navbarToggler.click(); // Colapsar el menú
  });
});

// FORM

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nombre = document.getElementById("name");
  const asunto = document.getElementById("asunto");
  const telefono = document.getElementById("telefono");
  const email = document.getElementById("email");
  const consulta = document.getElementById("consulta");
  const parrafo = document.getElementById("warnings");
  const success = document.getElementById("success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let warnings = "";
    let entrar = false;
    parrafo.innerHTML = "";
    success.innerHTML = "";

    // Validaciones
    if (nombre.value.length < 10) {
      warnings += "El nombre no es válido.<br>";
      entrar = true;
    }
    if (asunto.value.length < 6) {
      warnings += "El asunto no es válido.<br>";
      entrar = true;
    }
    if (!/^\d{10}$/.test(telefono.value)) {
      warnings += "El teléfono no es válido.<br>";
      entrar = true;
    }
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value)) {
      warnings += "El email no es válido.<br>";
      entrar = true;
    }
    if (consulta.value.length < 20) {
      warnings += "La consulta es muy corta.<br>";
      entrar = true;
    }

    // Mostrar mensajes
    if (entrar) {
      parrafo.innerHTML = warnings;
      setTimeout(() => {
        parrafo.innerHTML = "";
      }, 5000);
    } else {
      // Enviar formulario con Fetch API
      const formData = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            success.innerHTML =
              "¡Muchas gracias por contactarnos, te responderemos a la brevedad!";
            form.reset(); // Limpiar el formulario después de enviarlo con éxito

            // Desaparecer los mensajes después de 5 segundos
            setTimeout(() => {
              success.innerHTML = "";
            }, 5000); // 5 segundos * 1000 milisegundos
          } else {
            throw new Error("Error al enviar el formulario");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          parrafo.innerHTML =
            "Hubo un error en el envío de tu consulta, por favor inténtalo más tarde.";
          // Desaparecer los mensajes después de 5 segundos
          setTimeout(() => {
            parrafo.innerHTML = "";
          }, 5000); // 5 segundos * 1000 milisegundos
        });
    }
  });

  window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName("form")) {
      form.reset();
    }
  };
});

// -----------------MAP---------------------------

function initMap() {
  // Ubicación inicial del mapa
  var location = { lat: -34.604029, lng: -58.453904 };

  // Estilo generado con el Google Maps Styling Wizard
  var mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.arterial",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ];

  // Creando el mapa y aplicando el estilo
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: location,
  });

  // Cargando el archivo KML de tu mapa de Google My Maps
  var kmlLayer = new google.maps.KmlLayer({
    url: "https://drive.google.com/uc?export=download&id=1Ap1oAk3z-uwhKNLuOrNFskOgmaXdyCrc",
    map: map,
  });
}
