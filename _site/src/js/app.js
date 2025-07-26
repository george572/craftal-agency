// Wait for DOM to be loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector(".dropdown");
    const menuItem = document.querySelector('.menuItem');
    const arrow = document.querySelector('.arrow');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuContent = document.querySelector('.mobile-menu-content');
    const closeIcon = document.querySelector('.close-icon');
    const responsiveMenuItem = document.querySelector('.responsive-menu-item');
    const responsiveDropdown = document.querySelector('.responsive-dropdown');
    const decoration = document.querySelector('.decoration');
    const arrowResponsive = document.querySelector('.arrow-responsive');
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
    }

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
    }

    // Add event listeners for desktop dropdown
    if (menuItem && dropdown) {
        menuItem.addEventListener('mouseenter', showDropdown);
        menuItem.addEventListener('mouseleave', hideDropdown);
        
        // Clear hide timeout when entering dropdown area
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
        });
        dropdown.addEventListener('mouseleave', hideDropdown);
    }

    // Mobile menu functionality
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (!mobileMenu || !mobileMenuContent) return;
            mobileMenu.classList.toggle('w-full');
            mobileMenuContent.classList.toggle('w-[326px]');
            mobileMenuContent.classList.toggle('px-4');
            mobileMenuContent.classList.toggle('py-6');
        });
    }

    const closeMobileMenu = () => {
        if (!mobileMenu || !mobileMenuContent) return;
        mobileMenu.classList.add('w-0');
        mobileMenu.classList.remove('w-full');
        mobileMenuContent.classList.remove('w-[326px]');
        mobileMenuContent.classList.add('w-0');
        mobileMenuContent.classList.toggle('px-4');
        mobileMenuContent.classList.toggle('py-6');
    };

    if (closeIcon) {
        closeIcon.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target !== mobileMenuContent && !mobileMenuContent.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    if (responsiveMenuItem && responsiveDropdown && decoration && arrowResponsive) {
        responsiveMenuItem.addEventListener('click', () => {
            responsiveDropdown.classList.toggle('px-2');
            responsiveDropdown.classList.toggle('py-3');
            responsiveDropdown.classList.toggle('mt-2');
            responsiveDropdown.classList.toggle('h-[120px]');
            decoration.classList.toggle('hidden');
            arrowResponsive.classList.toggle("rotate-180");
        });
    }
});