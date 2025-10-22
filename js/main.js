// main.js - Funcionalidad básica para Synesiss.com
document.addEventListener('DOMContentLoaded', function() {
    // Selección de elementos
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Función para alternar el menú
    function toggleMenu() {
        navMenu.classList.toggle('show');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.toggle('fa-times');
        icon.classList.toggle('fa-bars');
    }

    // Evento para el botón del menú
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que el evento se propague
            toggleMenu();
        });
    }

    // Cerrar menú al hacer clic en un enlace (para móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && navMenu.classList.contains('show')) {
            if (!navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });

    // Resto de tu código JavaScript...
    
});


document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Cerrar menú al hacer clic en un enlace (en móviles)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
                mobileMenuButton.querySelector('i').classList.add('fa-bars');
                mobileMenuButton.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // Efecto smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .value-card, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Configuración inicial para animaciones
    document.querySelectorAll('.service-card, .value-card, .team-member').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar la página

    // Validación básica del formulario de contacto
    document.getElementById('emailForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('http://localhost:3000/api/send-email', {
    // const response = await fetch('http://synesiss.info:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {

      alert('Correo enviado correctamente');
      window.location.href = 'index.html';

    } else {
      alert('Error al enviar el correo');
      window.location.href = 'index.html';

    }
  });
});