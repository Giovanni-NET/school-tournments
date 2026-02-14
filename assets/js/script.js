function navigateTo(page, data) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    // Show selected page
    if (page === 'team') {
        document.getElementById('team-page').classList.add('active');
        document.getElementById('team-name').textContent = data;
    } else if (page === 'vb-team') {
        document.getElementById('vb-team-page').classList.add('active');
        document.getElementById('vb-team-name').textContent = data;
    } else if (page === 'player') {
        document.getElementById('player-page').classList.add('active');
        document.getElementById('player-name').textContent = data;
        // Set avatar initials
        const initials = data.split(' ').map(word => word[0]).join('');
        document.getElementById('player-avatar').textContent = initials;
    } else if (page === 'football-match') {
        document.getElementById('football-match-page').classList.add('active');
        // Update match details
        document.getElementById('fb-home-team').textContent = data.home;
        document.getElementById('fb-away-team').textContent = data.away;
        document.getElementById('fb-home-score').textContent = data.homeScore;
        document.getElementById('fb-away-score').textContent = data.awayScore;
    } else if (page === 'volleyball-match') {
        document.getElementById('volleyball-match-page').classList.add('active');
        // Update match details
        document.getElementById('vb-home-team').textContent = data.home;
        document.getElementById('vb-away-team').textContent = data.away;
        document.getElementById('vb-home-score').textContent = data.homeScore;
        document.getElementById('vb-away-score').textContent = data.awayScore;
        // Parse and display sets
        if (data.sets) {
            const setsContainer = document.getElementById('vb-sets-summary');
            const setScores = data.sets.match(/\d+-\d+/g);
            if (setScores) {
                let setsHTML = '';
                setScores.forEach((set, index) => {
                    const [home, away] = set.split('-').map(Number);
                    const winner = home > away ? data.home : data.away;
                    setsHTML += `
                        <div class="set-card">
                            <h3>Set ${index + 1}</h3>
                            <div class="set-score-display">${set}</div>
                            <div class="set-winner">${winner}</div>
                        </div>
                    `;
                });
                setsContainer.innerHTML = setsHTML;
            }
        }
    } else if (page === 'chess-match') {
        document.getElementById('chess-match-page').classList.add('active');
        // Update match details
        document.getElementById('chess-white-player').textContent = data.white;
        document.getElementById('chess-black-player').textContent = data.black;
        document.getElementById('chess-white-rating').textContent = 'Rating: ' + data.whiteRating;
        document.getElementById('chess-black-rating').textContent = 'Rating: ' + data.blackRating;
        document.getElementById('chess-result-text').textContent = data.result;

        // Update result status
        let resultStatus = '';
        if (data.result === '1-0') {
            resultStatus = 'White Wins';
        } else if (data.result === '0-1') {
            resultStatus = 'Black Wins';
        } else {
            resultStatus = 'Draw';
        }
        document.getElementById('chess-result-status').textContent = resultStatus;
    } else {
        document.getElementById(page).classList.add('active');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add click handlers to nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.dataset.page);
    });
});