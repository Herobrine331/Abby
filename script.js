<script>
(function () {
    // --- CONFIGURATION ---
    const countDownDate = new Date("2025-08-11T07:00:00Z").getTime(); // Las Vegas Time (PDT, UTC-7)
    const daysContainer = document.getElementById('days-group');
    const hoursContainer = document.getElementById('hours-group');
    const minutesContainer = document.getElementById('minutes-group');
    const secondsContainer = document.getElementById('seconds-group');

    // --- FUNCTIONS ---

    /**
     * Creates the HTML structure for a flip card.
     */
    function createFlipCard(initialValue = '0') {
        const card = document.createElement('div');
        card.classList.add('flip-card');
        
        const top = document.createElement('div');
        top.className = 'top';
        top.dataset.value = initialValue;
        
        const bottom = document.createElement('div');
        bottom.className = 'bottom';
        bottom.dataset.value = initialValue;

        const topFlip = document.createElement('div');
        topFlip.className = 'top-flip';
        topFlip.dataset.value = initialValue;

        const bottomFlip = document.createElement('div');
        bottomFlip.className = 'bottom-flip';
        bottomFlip.dataset.value = initialValue;

        card.append(top, bottom, topFlip, bottomFlip);
        return card;
    }
    
    /**
     * Creates a group of flip cards for a time unit.
     */
    function createFlipGroup(container, numCards) {
        for (let i = 0; i < numCards; i++) {
            container.appendChild(createFlipCard('0'));
        }
    }

    /**
     * Updates a single flip card with a new value.
     */
    function updateFlipCard(card, newValue) {
        const topHalf = card.querySelector('.top');
        const bottomHalf = card.querySelector('.bottom');
        const topFlip = card.querySelector('.top-flip');
        const bottomFlip = card.querySelector('.bottom-flip');
        
        const currentValue = topHalf.dataset.value;
        if (currentValue === newValue) return;

        topFlip.dataset.value = currentValue;
        bottomFlip.dataset.value = newValue;

        card.classList.add('flipping');

        topFlip.addEventListener('animationend', () => {
            topHalf.dataset.value = newValue;
            bottomHalf.dataset.value = newValue;
            card.classList.remove('flipping');
            // Reset flips for next animation
            topFlip.dataset.value = newValue;
            bottomFlip.style.transition = 'none';
            bottomFlip.style.transform = 'rotateX(90deg)';
            bottomFlip.offsetHeight; // Trigger reflow
            bottomFlip.style.transition = '';

        }, { once: true });
    }

    /**
     * Updates a group of flip cards with a new time value.
     */
    function updateFlipGroup(container, newValue) {
        const cards = container.querySelectorAll('.flip-card');
        const valueStr = String(newValue).padStart(cards.length, '0');
        
        for (let i = 0; i < cards.length; i++) {
            updateFlipCard(cards[i], valueStr[i]);
        }
    }

    // --- INITIALIZATION ---
    createFlipGroup(daysContainer, 3);
    createFlipGroup(hoursContainer, 2);
    createFlipGroup(minutesContainer, 2);
    createFlipGroup(secondsContainer, 2);

    // --- MAIN LOOP ---
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = '<h2 class="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-lg">🎉 Happy 18th Birthday, Abby! 🎉</h2>';
            document.getElementById('headline').style.display = 'none';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateFlipGroup(daysContainer, days);
        updateFlipGroup(hoursContainer, hours);
        updateFlipGroup(minutesContainer, minutes);
        updateFlipGroup(secondsContainer, seconds);

    }, 1000);
})();
</script>

