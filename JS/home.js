document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.sidebar-nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.scroll-animate').forEach(element => {
        observer.observe(element);
    });

    document.getElementById('sidebar-toggle').addEventListener('click', function() {
        document.querySelector('.sidebar-nav').classList.toggle('sidebar-hidden');
    });

    function adjustZIndexOnModalShow() {
        document.querySelector('.sidebar-toggle').style.pointerEvents = 'none';
    }

    function resetZIndexOnModalHide() {
        document.querySelector('.sidebar-toggle').style.pointerEvents = 'auto';
    }

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('show.bs.modal', adjustZIndexOnModalShow);
        modal.addEventListener('hidden.bs.modal', resetZIndexOnModalHide);
    });

    function updateSingaporeTime() {
        const now = new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" });
        document.getElementById("current-time").textContent = now;
    }
    setInterval(updateSingaporeTime, 1000);

    document.getElementById("current-year").textContent = new Date().getFullYear();
});
