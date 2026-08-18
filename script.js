// ============================================
// INTERATIVIDADE DO SITE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Animar botão
    const btn = document.querySelector('.btn');
    if (btn) {
        btn.addEventListener('click', function() {
            alert('Bem-vindo ao Portal de Segurança no Trabalho! 🛡️');
        });
    }

    // Adicionar efeito de scroll aos cards
    const cards = document.querySelectorAll('.topic-card, .tip-item, .dev-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Destaque do link ativo na navegação
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.backgroundColor = 'transparent';
            link.style.color = 'white';
            
            if (link.getAttribute('href').slice(1) === current) {
                link.style.backgroundColor = 'rgba(231, 76, 60, 0.8)';
            }
        });
    });

    console.log('✅ Site de Segurança no Trabalho carregado com sucesso!');
    console.log('👥 Desenvolvedores: Gabriel Lima, Dayllon Kauan, Adryan Kaue');
});

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

// Mostrar notificação
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Validar formulário (quando houver)
function validateForm(formData) {
    for (let key in formData) {
        if (formData[key].trim() === '') {
            return false;
        }
    }
    return true;
}

// Log de eventos
function logEvent(eventName, details = {}) {
    console.log(`[${new Date().toLocaleTimeString()}] ${eventName}`, details);
}