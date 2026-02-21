document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const resultsContainer = document.getElementById('lottoResults');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.icon');

    // --- Theme Logic ---
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    // --- Lotto Logic ---
    const generateLottoNumbers = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            numbers.add(num);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    };

    const getBallClass = (num) => {
        if (num <= 10) return 'ball-yellow';
        if (num <= 20) return 'ball-blue';
        if (num <= 30) return 'ball-red';
        if (num <= 40) return 'ball-gray';
        return 'ball-green';
    };

    const displayLottoSets = () => {
        resultsContainer.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const lottoNumbers = generateLottoNumbers();
            const setDiv = document.createElement('div');
            setDiv.className = 'lotto-set';
            setDiv.style.animationDelay = `${i * 0.1}s`;

            lottoNumbers.forEach(num => {
                const ball = document.createElement('div');
                ball.className = `number-ball ${getBallClass(num)}`;
                ball.textContent = num;
                setDiv.appendChild(ball);
            });

            resultsContainer.appendChild(setDiv);
        }
    };

    generateBtn.addEventListener('click', () => {
        generateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            generateBtn.style.transform = '';
            displayLottoSets();
        }, 100);
    });
});
