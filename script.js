// Initialize variables
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId = null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.max(1.5, Math.random() * 3);
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.6 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < 60; i++) {
    particles.push(new Particle());
}

// Animate particles with connections
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections first (behind particles)
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 180;

            if (distance < maxDistance) {
                const opacity = 0.4 * (1 - distance / maxDistance);
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }
    }

    // Draw particles
    particles.forEach(function(particle) {
        particle.update();
        particle.draw();
    });

    animationId = requestAnimationFrame(animateParticles);
}

// Start animation if reduced motion is not preferred
if (!prefersReducedMotion.matches) {
    animateParticles();
}

// Handle reduced motion changes
prefersReducedMotion.addEventListener('change', function(e) {
    if (e.matches) {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        animateParticles();
    }
});

// Navigation functions dihapus karena menggunakan link HTML standar
// Jika ada kebutuhan khusus, bisa ditambahkan kembali// Copy IP function
function copyIP(elementId, button) {
    const ip = document.getElementById(elementId).textContent;

    navigator.clipboard.writeText(ip).then(function() {
        button.classList.add('copied');
        button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

        setTimeout(function() {
            button.classList.remove('copied');
            button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        }, 2000);
    }).catch(function() {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = ip;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        button.classList.add('copied');
        button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

        setTimeout(function() {
            button.classList.remove('copied');
            button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        }, 2000);
    });
}