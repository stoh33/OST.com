document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const resultsContainer = document.getElementById('lottoResults');

    /**
     * Generates a single set of 6 unique lotto numbers (1-45)
     */
    const generateLottoNumbers = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            numbers.add(num);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    };

    /**
     * Determines the CSS class for a ball based on its number range
     */
    const getBallClass = (num) => {
        if (num <= 10) return 'ball-yellow';
        if (num <= 20) return 'ball-blue';
        if (num <= 30) return 'ball-red';
        if (num <= 40) return 'ball-gray';
        return 'ball-green';
    };

    /**
     * Displays 5 sets of lotto numbers in the UI
     */
    const displayLottoSets = () => {
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Generate and display 5 sets
        for (let i = 0; i < 5; i++) {
            const lottoNumbers = generateLottoNumbers();
            const setDiv = document.createElement('div');
            setDiv.className = 'lotto-set';
            setDiv.style.animationDelay = `${i * 0.1}s`; // Staggered animation

            lottoNumbers.forEach(num => {
                const ball = document.createElement('div');
                ball.className = `number-ball ${getBallClass(num)}`;
                ball.textContent = num;
                setDiv.appendChild(ball);
            });

            resultsContainer.appendChild(setDiv);
        }
    };

    // Event Listener
    generateBtn.addEventListener('click', () => {
        // Add a small scale effect to the button on click
        generateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            generateBtn.style.transform = '';
            displayLottoSets();
        }, 100);
    });
});
