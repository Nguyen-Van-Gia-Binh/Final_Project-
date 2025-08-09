
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu (Hamburger) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach((n) =>
            n.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            })
        );
    }

    // --- Theme Toggler (Light/Dark Mode) ---
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;

    if (themeToggle && body) {
        // Function to apply theme based on saved preference or system setting
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                body.classList.add("dark-theme");
                themeToggle.classList.remove("fa-moon");
                themeToggle.classList.add("fa-sun");
            } else {
                body.classList.remove("dark-theme");
                themeToggle.classList.remove("fa-sun");
                themeToggle.classList.add("fa-moon");
            }
        };

        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem('theme');
        // Check for system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Apply saved theme or system preference
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (prefersDark) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }

        themeToggle.addEventListener("click", () => {
            const isDarkMode = body.classList.toggle("dark-theme");
            const newTheme = isDarkMode ? 'dark' : 'light';
            applyTheme(newTheme);
            // Save the user's preference
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- Role Switcher ---
    const roleElement = document.querySelector(".role");
    const leftArrow = document.querySelector(".role-switcher .arrow-btn:first-child");
    const rightArrow = document.querySelector(".role-switcher .arrow-btn:last-child");

    if (roleElement && leftArrow && rightArrow) {
        const roles = ["Tech Enthusiast", "Web Developer", "UI/UX Designer", "Freelancer"];
        let currentRoleIndex = 0;

        const updateRole = () => {
            roleElement.style.opacity = 0;
            setTimeout(() => {
                roleElement.textContent = roles[currentRoleIndex];
                roleElement.style.opacity = 1;
            }, 200); // Match this with CSS transition duration
        };

        rightArrow.addEventListener("click", () => {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            updateRole();
        });

        leftArrow.addEventListener("click", () => {
            currentRoleIndex = (currentRoleIndex - 1 + roles.length) % roles.length;
            updateRole();
        });

        // Initialize with the first role
        updateRole();
    }
});
