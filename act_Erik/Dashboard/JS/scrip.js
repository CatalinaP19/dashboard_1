
// ========================================
// GESTIÓN DEL TEMA Y PERSONALIZACIÓN
// ========================================

/**
 * Cambia el tema entre claro y oscuro
 * Esta función demuestra cómo las variables CSS permiten cambios instantáneos
 */
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-bs-theme', newTheme);
  document.getElementById('themeSelector').value = newTheme;

  // Guardar preferencia
  localStorage.setItem('dashboard-theme', newTheme);

  console.log(`Tema cambiado a: ${newTheme}`);
}

/**
 * Cambia el color principal del dashboard
 * Demuestra la potencia de las variables CSS para personalización en tiempo real
 */
function changeThemeColor(color, rgb) {
  const root = document.documentElement;

  // Cambiar la variable CSS principal
  root.style.setProperty('--bs-primary', color);
  root.style.setProperty('--bs-primary-rgb', rgb);

  // Guardar preferencia
  localStorage.setItem('dashboard-primary-color', color);
  localStorage.setItem('dashboard-primary-rgb', rgb);

  // Feedback visual
  console.log(`Color principal cambiado a: ${color}`);

  // Mostrar notificación temporal
  showNotification('Color del tema actualizado correctamente', 'success');
}

/**
 * Toggle del sidebar en dispositivos móviles
 */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('show');
}

/**
 * Muestra notificaciones temporales
 */
function showNotification(message, type = 'info') {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 350px;';
  notification.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;

  document.body.appendChild(notification);

  // Auto-remover después de 3 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

// ========================================
// INICIALIZACIÓN Y EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  // Cargar tema guardado
  const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
  document.documentElement.setAttribute('data-bs-theme', savedTheme);
  document.getElementById('themeSelector').value = savedTheme;

  // Cargar color guardado
  const savedColor = localStorage.getItem('dashboard-primary-color');
  const savedRgb = localStorage.getItem('dashboard-primary-rgb');
  if (savedColor && savedRgb) {
    document.documentElement.style.setProperty('--bs-primary', savedColor);
    document.documentElement.style.setProperty('--bs-primary-rgb', savedRgb);
  }

  // Event listener para el selector de tema
  document.getElementById('themeSelector').addEventListener('change', function () {
    const selectedTheme = this.value;
    document.documentElement.setAttribute('data-bs-theme', selectedTheme);
    localStorage.setItem('dashboard-theme', selectedTheme);
    showNotification(`Tema cambiado a: ${selectedTheme}`, 'info');
  });

  // Cerrar sidebar en móvil al hacer clic fuera
  document.addEventListener('click', function (e) {
    const sidebar = document.getElementById('sidebar');
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isToggleButton = e.target.closest('[onclick="toggleSidebar()"]');

    if (!isClickInsideSidebar && !isToggleButton && window.innerWidth <= 991) {
      sidebar.classList.remove('show');
    }
  });

  // Navegación del sidebar
  document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Remover clase active de todos los links
      document.querySelectorAll('.sidebar-nav .nav-link').forEach(l => {
        l.classList.remove('active');
      });

      // Agregar clase active al link clickeado
      this.classList.add('active');

      // Cerrar sidebar en móvil
      if (window.innerWidth <= 991) {
        document.getElementById('sidebar').classList.remove('show');
      }

      // Simular navegación
      const section = this.textContent.trim();
      showNotification(`Navegando a: ${section}`, 'info');
    });
  });

  // Animación staggered para las cards
  document.querySelectorAll('[data-bs-target="#obraModal"]').forEach(button => {
    button.addEventListener('click', () => {
      const title = button.getAttribute('data-title') || 'Atardecer Azul';
      const desc = button.getAttribute('data-desc') || 'Sin descripción disponible.';
      const img = button.getAttribute('data-img') || 'https://via.placeholder.com/500x500?text=Sin+Imagen';
      const cat = button.getAttribute('data-cat') || 'Sin categoría';
      const date = button.getAttribute('data-date') || 'Sin fecha';
      const status = button.getAttribute('data-status') || 'Desconocido';

      
      document.getElementById('obraModalLabel').textContent = title;
      document.querySelector('#obraModal .modal-body img').src = img;
      document.querySelector('#obraModal .modal-body img').alt = title;
      document.querySelector('#obraModal .modal-body h4').textContent = title;
      document.querySelector('#obraModal .modal-body p').textContent = desc;
      document.querySelector('#obraModal .modal-body .list-group-item:nth-child(1)').innerHTML = `<strong>Categoría:</strong> ${cat}`;
      document.querySelector('#obraModal .modal-body .list-group-item:nth-child(2)').innerHTML = `<strong>Fecha:</strong> ${date}`;
      document.querySelector('#obraModal .modal-body .list-group-item:nth-child(3)').innerHTML = `<strong>Estado:</strong> <span class="badge ${status === 'Terminado' ? 'bg-success' : 'bg-warning'}">${status}</span>`;
    });
  });

    // Animación staggered para las cards
  document.querySelectorAll('[data-bs-target="#obraModal2"]').forEach(button => {
    button.addEventListener('click', () => {
      const title = button.getAttribute('data-title') || 'ola';
      const desc = button.getAttribute('data-desc') || 'Sin descripción disponible.';
      const img = button.getAttribute('data-img') || 'https://via.placeholder.com/500x500?text=Sin+Imagen';
      const cat = button.getAttribute('data-cat') || 'Sin categoría';
      const date = button.getAttribute('data-date') || 'Sin fecha';
      const status = button.getAttribute('data-status') || 'Desconocido';

      
      document.getElementById('obraModalLabel').textContent = title;
      document.querySelector('#obraModal .modal-body img').src = img;
      document.querySelector('#obraModal .modal-body img').alt = title;
      document.querySelector('#obraModal .modal-body h4').textContent = title;
      document.querySelector('#obraModal .modal-body p').textContent = desc;
      document.querySelector('#obraModal .modal-body .list-group-item:nth-child(1)').innerHTML = `<strong>Categoría:</strong> ${cat}`;
      document.querySelector('#obraModal .modal-body .list-group-item:nth-child(2)').innerHTML = `<strong>Fecha:</strong> ${date}`;
      document.querySelector('#obraModal .modal-body .list-group-item:nth-child(3)').innerHTML = `<strong>Estado:</strong> <span class="badge ${status === 'Terminado' ? 'bg-success' : 'bg-warning'}">${status}</span>`;
    });
  });

  // Crear gráfica con Chart.js
const ctx = document.getElementById('artChart').getContext('2d');
const lineWithDots = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Ingresos por Día',
        data: [
          { x: 1, y: 3 },
          { x: 2, y: 7 },
          { x: 3, y: 4 },
          { x: 4, y: 8 },
          { x: 5, y: 5 }
        ],
        fill: false,
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 1)',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Día ${context.raw.x}: $${context.raw.y}K`;
            }
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          title: { display: true, text: 'Día' },
          ticks: { stepSize: 1 }
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Ingresos (en miles)' }
        }
      }
    }
  });

  // Estas funciones globales también van afuera
  function debugCSSVariables() {
    const computedStyles = getComputedStyle(document.documentElement);
    const variables = {};

    for (let i = 0; i < computedStyles.length; i++) {
      const property = computedStyles[i];
      if (property.startsWith('--bs') || property.startsWith('--dashboard')) {
        variables[property] = computedStyles.getPropertyValue(property);
      }
    }

    console.table(variables);
    return variables;
  }

  // ========================================
  // UTILIDADES DE DEBUGGING
  // ========================================

  // Función para mostrar todas las variables CSS activas
 function debugCSSVariables() {
    const computedStyles = getComputedStyle(document.documentElement);
    const variables = {};

    // Buscar todas las variables que empiecen con --bs o --dashboard
    for (let i = 0; i < computedStyles.length; i++) {
      const property = computedStyles[i];
      if (property.startsWith('--bs') || property.startsWith('--dashboard')) {
        variables[property] = computedStyles.getPropertyValue(property);
      }
    }

    console.table(variables);
    return variables;
  }

  // Hacer disponible globalmente para debugging
  window.debugCSSVariables = debugCSSVariables;
  window.changeThemeColor = changeThemeColor;
  window.toggleSidebar = toggleSidebar;
}); // Esta llave cierra el document.addEventListener




        document.addEventListener("DOMContentLoaded", function () {
            document.addEventListener('hide.bs.modal', function (event) {
                if (document.activeElement) {
                    document.activeElement.blur();
                }
            });
        });
        function openModal(obra) {
            const obraModal = new bootstrap.Modal(document.getElementById("obraModalGeneral"), {});
            const obraTitle = document.getElementById(`title-${obra}`).innerHTML;
            const obraImg = document.getElementById(`img-${obra}`).getAttribute('src');
            const obraType = document.getElementById(`type-${obra}`).innerHTML;
            const obraDate = document.getElementById(`date-${obra}`).innerHTML;
            const obraState = document.getElementById(`state-${obra}`).innerHTML;
            const obraDescription = document.getElementById(`title-${obra}`).getAttribute('description');

            document.getElementById('modal-obra-title').innerHTML = obraTitle;
            document.getElementById('modal-img').src = obraImg;
            document.getElementById('modal-type').innerHTML = obraType;
            document.getElementById('modal-date').innerHTML = obraDate;
            document.getElementById('modal-state').innerHTML = obraState;
            document.getElementById('modal-description').innerHTML = obraDescription;

            obraModal.show();
            
        }


        
