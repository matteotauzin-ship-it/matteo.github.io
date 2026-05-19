// ========================================
// GESTION DES RÉALISATIONS (PORTFOLIO BTS SIO)
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.realisation-card');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');

    // 1. FILTRAGE DES PROJETS
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mise à jour de l'état actif des boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // 2. GESTION DE LA MODALE (DÉTAILS TECHNIQUES)
    const viewButtons = document.querySelectorAll('.btn-view');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Ici, vous pouvez dynamiser le contenu de la modale en fonction du projet
            // Pour l'instant, nous ouvrons la structure existante dans votre HTML
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Empêche le scroll en arrière-plan
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Fermer la modale en cliquant à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 3. ANIMATION AU SURVOL (Optionnel si pas déjà en CSS)
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});