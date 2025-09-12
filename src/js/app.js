// Wait for DOM to be loaded before accessing elements
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const menuItem = document.querySelector(".menuItem");
  const arrow = document.querySelector(".arrow");
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuContent = document.querySelector(".mobile-menu-content");
  const closeIcon = document.querySelector(".close-icon");
  const responsiveMenuItem = document.querySelector(".responsive-menu-item");
  const responsiveDropdown = document.querySelector(".responsive-dropdown");
  const decoration = document.querySelector(".decoration");
  const arrowResponsive = document.querySelector(".arrow-responsive");
  const arrowSvg = document.querySelector(".arrow-svg");
  let showTimeout;
  let hideTimeout;

  const showDropdown = () => {
    if (!dropdown || !arrow) return;
    clearTimeout(hideTimeout);
    showTimeout = setTimeout(() => {
      dropdown.classList.remove("hidden");
      dropdown.classList.add("flex");
      // Trigger reflow to ensure transition works
      dropdown.offsetHeight;
      dropdown.classList.add("opacity-100");
      dropdown.classList.remove("opacity-0");
      arrow.classList.add("rotate-180");
    }, 150);
  };

  const hideDropdown = () => {
    if (!dropdown || !arrow) return;
    clearTimeout(showTimeout);
    hideTimeout = setTimeout(() => {
      dropdown.classList.add("opacity-0");
      dropdown.classList.remove("opacity-100");
      // Wait for transition to complete before hiding
      setTimeout(() => {
        dropdown.classList.remove("flex");
        dropdown.classList.add("hidden");
        arrow.classList.remove("rotate-180");
      }, 200);
    }, 300);
  };

  // Add event listeners for desktop dropdown
  if (menuItem && dropdown) {
    menuItem.addEventListener("mouseenter", showDropdown);
    menuItem.addEventListener("mouseleave", hideDropdown);

    // Clear hide timeout when entering dropdown area
    dropdown.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);
    });
    dropdown.addEventListener("mouseleave", hideDropdown);
  }

  // Mobile menu functionality
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      if (!mobileMenu || !mobileMenuContent) return;
      mobileMenu.classList.toggle("w-full");
      mobileMenuContent.classList.toggle("w-[326px]");
      mobileMenuContent.classList.toggle("px-4");
      mobileMenuContent.classList.toggle("py-6");
    });
  }

  const closeMobileMenu = () => {
    if (!mobileMenu || !mobileMenuContent) return;
    mobileMenu.classList.add("w-0");
    mobileMenu.classList.remove("w-full");
    mobileMenuContent.classList.remove("w-[326px]");
    mobileMenuContent.classList.add("w-0");
    mobileMenuContent.classList.toggle("px-4");
    mobileMenuContent.classList.toggle("py-6");
  };

  if (closeIcon) {
    closeIcon.addEventListener("click", closeMobileMenu);
  }

  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (
        e.target !== mobileMenuContent &&
        !mobileMenuContent.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });
  }

  if (
    responsiveMenuItem &&
    responsiveDropdown &&
    decoration &&
    arrowResponsive
  ) {
    responsiveMenuItem.addEventListener("click", () => {
      responsiveDropdown.classList.toggle("px-2");
      responsiveDropdown.classList.toggle("py-3");
      responsiveDropdown.classList.toggle("mt-2");
      responsiveDropdown.classList.toggle("h-[120px]");
      decoration.classList.toggle("hidden");
      arrowResponsive.classList.toggle("rotate-180");
    });
  }
});

// gsap anims

document.addEventListener('DOMContentLoaded', function() {
    // Wait for fonts to load before initializing animation
    document.fonts.ready.then(() => {
        initializeWordsRotator();
    });
});

function initializeWordsRotator() {
    const words = gsap.utils.toArray(".words-rotator .word");
    const prefixWords = document.querySelector(".prefix-words");
    const suffixWords = document.querySelector(".suffix-words");
    const container = document.querySelector(".words-rotator").parentElement;
    
    if (!words.length || !prefixWords || !suffixWords || !container) {
        console.log('GSAP animation elements not found - skipping animation');
        return;
    }
    
    // Add retry logic in case fonts still aren't loaded
    const prefixWidth = prefixWords.clientWidth;
    const suffixWidth = suffixWords.clientWidth;
    
    if (prefixWidth === 0 || suffixWidth === 0) {
        console.log('Fonts not fully loaded, retrying in 100ms...');
        setTimeout(initializeWordsRotator, 100);
        return;
    }
    
    const widths = words.map((w) => w.clientWidth);
    const pause = 2;
    const duration = 0.35;
    let largest = Math.max(...widths);
    let currentIndex = 0;
    
    const spacing = 8; // spacing between words
    const containerWidth = container.clientWidth;
    
    const tl = gsap.timeline({
        defaults: {
            ease: "power1.inOut",
            duration: duration
        },
        repeat: -1
    });
    
    // Function to calculate centered positions
    function calculateCenteredPositions(rotatingWordWidth) {
        const totalWidth = prefixWidth + spacing + rotatingWordWidth + spacing + suffixWidth;
        const startX = (containerWidth - totalWidth) / 2;
        
        return {
            prefixX: startX,
            rotatorX: startX + prefixWidth + spacing,
            suffixX: startX + prefixWidth + spacing + rotatingWordWidth + spacing
        };
    }
    
    // Set initial positions
    gsap.set(words, {
        opacity: (i) => (i ? 0 : 1)
    });
    
    const initialPositions = calculateCenteredPositions(widths[currentIndex]);
    
    gsap.set(prefixWords, { 
        x: initialPositions.prefixX 
    });
    
    gsap.set(".words-rotator", {
        left: initialPositions.rotatorX,
        width: largest,
        height: "1.2em",
        autoAlpha: 1
    });
    
    gsap.set(suffixWords, { 
        x: initialPositions.suffixX 
    });
    
    // Create the animation timeline
    words.forEach((word, i) => {
        const next = words[i + 1];
        if (next) {
            const nextPositions = calculateCenteredPositions(widths[i + 1]);
            
            tl.to(word, {
                opacity: 0
            }, "+=" + pause)
            .to(next, {
                opacity: 1
            }, "<")
            .to(prefixWords, {
                x: nextPositions.prefixX,
                duration: duration - 0.1
            }, "<")
            .to(".words-rotator", {
                left: nextPositions.rotatorX,
                duration: duration - 0.1
            }, "<")
            .to(suffixWords, {
                x: nextPositions.suffixX,
                duration: duration - 0.1
            }, "<");
        } else {
            // Final word - loop back to first
            const firstPositions = calculateCenteredPositions(widths[0]);
            
            tl.to(word, {
                opacity: 0
            }, i ? "+=" + pause : 0)
            .to(words[0], {
                opacity: 1
            }, "<")
            .to(prefixWords, {
                x: firstPositions.prefixX,
                duration: duration - 0.1
            }, "<+=0.1")
            .to(".words-rotator", {
                left: firstPositions.rotatorX,
                duration: duration - 0.1
            }, "<")
            .to(suffixWords, {
                x: firstPositions.suffixX,
                duration: duration - 0.1
            }, "<");
        }
    });
}

// Arrow SVG infinite rotation animation
document.addEventListener('DOMContentLoaded', function() {
    const arrowSvg = document.querySelector(".arrow-svg");
    
    if (arrowSvg) {
        gsap.to(arrowSvg, {
            rotation: "15",
            duration: 1.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });
    }
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    if (contactForm) {
        // Store the submit handler function for reuse
        const handleFormSubmit = async function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Hide any existing messages
            if (successMessage) successMessage.classList.add('hidden');
            if (errorMessage) errorMessage.classList.add('hidden');
            
            // Show loading state on button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                // Get form data
                const formData = new FormData(contactForm);
                
                // Submit to Web3Forms
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    // Trigger hidden submit button for Google Ads tracking
                    const hiddenSubmit = document.getElementById('hidden-submit');
                    if (hiddenSubmit) {
                        // Temporarily remove event listener to allow default form submission
                        contactForm.removeEventListener('submit', handleFormSubmit);
                        hiddenSubmit.click();
                        // Re-add the event listener for future submissions
                        setTimeout(() => {
                            contactForm.addEventListener('submit', handleFormSubmit);
                        }, 100);
                    }
                    
                    // Success - hide form and show success message
                    if (contactForm) {
                        contactForm.style.display = 'none';
                    }
                    
                    if (successMessage) {
                        successMessage.classList.remove('hidden');
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    throw new Error('Form submission failed');
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show error message but keep form visible
                if (errorMessage) {
                    errorMessage.classList.remove('hidden');
                    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Hide error message after 5 seconds
                setTimeout(() => {
                    if (errorMessage) errorMessage.classList.add('hidden');
                }, 5000);
                
            } finally {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        };
        
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});
