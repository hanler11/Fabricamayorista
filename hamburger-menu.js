// ========== HAMBURGER MENU FUNCTIONALITY ==========
function initHamburgerMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const headerNav = document.querySelector('.header-nav');
  const navOverlay = document.getElementById('nav-overlay');

  if (!navToggle || !headerNav || !navOverlay) return;

  // Toggle menu
  function toggleMenu() {
    const isOpen = headerNav.classList.contains('active');
    
    headerNav.classList.toggle('active', !isOpen);
    navOverlay.classList.toggle('active', !isOpen);
    
    // Update ARIA attributes
    navToggle.setAttribute('aria-expanded', !isOpen);
    navOverlay.setAttribute('aria-hidden', isOpen);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  }

  // Close menu
  function closeMenu() {
    headerNav.classList.remove('active');
    navOverlay.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event listeners
  navToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);
  
  // Close menu when clicking nav links
  headerNav.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      closeMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && headerNav.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close menu on window resize if open
  window.addEventListener('resize', () => {
    if (window.innerWidth > 968 && headerNav.classList.contains('active')) {
      closeMenu();
    }
  });
}

// Initialize hamburger menu when DOM is ready
document.addEventListener('DOMContentLoaded', initHamburgerMenu);