
let homeScore = 0;
let guestScore = 0;

function addClass(elementId, className) { 
    document.getElementById(elementId).classList.add(className);
}
function removeClass(elementId, className) { 
    document.getElementById(elementId).classList.remove(className);
}

function getWinningTeam() { 
    if (homeScore > guestScore) {
        addClass('home', 'winner');
        removeClass('guest', 'winner');
    }
    else if (homeScore < guestScore) {
        addClass('guest', 'winner');
        removeClass('home', 'winner');
    }
    else {
        removeClass('home', 'winner');
        removeClass('guest', 'winner');
    }
}

function increaseHomeScore(buttonId) {
    // homeScore++;
    if (buttonId === 'home-1') {
        homeScore ++;
    }
    else if (buttonId === 'home-2') {
        homeScore += 2;
    }
    else if (buttonId === 'home-3') {
        homeScore += 3;
    }
    document.getElementById('home-score').textContent = homeScore;
    getWinningTeam();
}

function increaseGuestScore(buttonId) {
    // guestScore++;
    if (buttonId === 'guest-1') {
        guestScore ++;
    }
    else if (buttonId === 'guest-2') {
        guestScore += 2;
    }
    else if (buttonId === 'guest-3') {
        guestScore += 3;
    }
    document.getElementById('guest-score').textContent = guestScore;
    getWinningTeam();
}