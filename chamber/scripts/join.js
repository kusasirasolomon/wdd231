// scripts/join.js

document.addEventListener('DOMContentLoaded', () => {
  // Function to open a modal by id
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      // Focus close button for accessibility
      const closeBtn = modal.querySelector('.close');
      if (closeBtn) closeBtn.focus();
      // Trap focus inside modal (optional enhancement)
      trapFocus(modal);
    }
  };

  // Function to close a modal by id
  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      releaseFocusTrap();
    }
  };

  // Close modals when clicking outside modal-content or pressing Escape key
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
      releaseFocusTrap();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach((modal) => {
        if (modal.style.display === 'flex') {
          modal.style.display = 'none';
          releaseFocusTrap();
        }
      });
    }
  });

  // Add timestamp to hidden input
  const timestampInput = document.getElementById('timestamp');
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }
});

/* Accessibility: Trap focus inside modal while it's open */

let focusedElementBeforeModal = null;

function trapFocus(modal) {
  focusedElementBeforeModal = document.activeElement;
  const focusableElementsString = `
    a[href], area[href], input:not([disabled]), select:not([disabled]),
    textarea:not([disabled]), button:not([disabled]), iframe, object, embed,
    [tabindex="0"], [contenteditable]
  `;
  const focusableElements = modal.querySelectorAll(focusableElementsString);
  if (focusableElements.length === 0) return;

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  modal.addEventListener('keydown', trapHandler);

  function trapHandler(e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  }

  firstFocusable.focus();

  // Save handler so it can be removed later
  modal._trapHandler = trapHandler;
}

function releaseFocusTrap() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach((modal) => {
    if (modal._trapHandler) {
      modal.removeEventListener('keydown', modal._trapHandler);
      delete modal._trapHandler;
    }
  });
  if (focusedElementBeforeModal) {
    focusedElementBeforeModal.focus();
  }
}
