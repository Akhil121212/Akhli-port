// ─── Particles ───────────────────────────────────────────────────────────────
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r  = Math.random() * 1.5 + 0.5;
        this.a  = Math.random() * 0.4 + 0.1;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,165,233,${this.a})`;
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d  = Math.sqrt(dx*dx + dy*dy);
            if (d < 130) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(14,165,233,${0.12 * (1 - d/130)})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
}
animate();

// ─── Typing Animation ─────────────────────────────────────────────────────────
const nameText  = 'Akhilesh Kumar C';
const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'ML Enthusiast'];
let nameEl  = document.getElementById('typed-name');
let roleEl  = document.getElementById('typed-role');
let ni = 0, ri = 0, charI = 0, deleting = false, roleIdx = 0;

function typeName() {
    if (ni < nameText.length) {
        nameEl.textContent += nameText[ni++];
        setTimeout(typeName, 60);
    } else {
        setTimeout(typeRole, 400);
    }
}

function typeRole() {
    const role = roles[roleIdx];
    if (!deleting) {
        if (charI < role.length) {
            roleEl.textContent += role[charI++];
            setTimeout(typeRole, 80);
        } else {
            deleting = true;
            setTimeout(typeRole, 1800);
        }
    } else {
        if (charI > 0) {
            roleEl.textContent = role.slice(0, --charI);
            setTimeout(typeRole, 45);
        } else {
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            setTimeout(typeRole, 400);
        }
    }
}

window.addEventListener('load', () => setTimeout(typeName, 300));

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});
document.querySelectorAll('#mobile-menu a').forEach(l => {
    l.addEventListener('click', () => document.getElementById('mobile-menu').classList.add('hidden'));
});

// ─── Navbar Scroll ────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const nb = document.getElementById('navbar');
    if (window.scrollY > 10) nb.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    else nb.style.boxShadow = 'none';
});

// ─── Fade-in Sections ─────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);

            // Animate progress bars
            e.target.querySelectorAll('.progress-bar').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-section').forEach(s => {
    observer.observe(s);
    const bars = s.querySelectorAll('.progress-bar');
    if (bars.length > 0) {
        bars.forEach(b => b.style.width = '0%');
    }
});

// ─── Contact Form ─────────────────────────────────────────────────────────────
window.handleContact = function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#10b981,#06b6d4)';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Send Message';
        btn.style.background = '';
        e.target.reset();
    }, 3000);
}
