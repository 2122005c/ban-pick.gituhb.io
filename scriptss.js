let teamATime = 180; // 3 minutes in seconds
let teamBTime = 180; // 3 minutes in seconds
let teamATimer;
let teamBTimer;
let teamABanCount = 0;
let teamBBanCount = 0;
let teamAPickCount = 0;
let teamBPickCount = 0;
const maxBanCount = 2;
const maxPickCount = 4;

function startTimer(team) {
    if (team === 'team-a') {
        teamATimer = setInterval(() => {
            if (teamATime > 0) {
                teamATime--;
                document.getElementById('team-a-timer').textContent = formatTime(teamATime);
            } else {
                clearInterval(teamATimer);
                alert('Team A has run out of time!');
                logHistory('team-a', 'lost turn');
                startTimer('team-b');
            }
        }, 1000);
    } else if (team === 'team-b') {
        teamBTimer = setInterval(() => {
            if (teamBTime > 0) {
                teamBTime--;
                document.getElementById('team-b-timer').textContent = formatTime(teamBTime);
            } else {
                clearInterval(teamBTimer);
                alert('Team B has run out of time!');
                logHistory('team-b', 'lost turn');
                startTimer('team-a');
            }
        }, 1000);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function banCharacter(team) {
    if (team === 'team-a' && teamABanCount < maxBanCount) {
        clearInterval(teamATimer);
        const banInput = document.getElementById('team-a-ban-input');
        const banList = document.getElementById('team-a-ban-list');
        const character = banInput.value.trim();
        
        if (character && !isAlreadyBanned(character, 'team-a')) {
            const listItem = document.createElement('li');
            listItem.textContent = character;
            banList.appendChild(listItem);
            banInput.value = '';
            teamABanCount++;
            logHistory('team-a', `banned ${character}`);
        }
        
        teamATime = 180; // Reset time for next turn
        document.getElementById('team-a-timer').textContent = formatTime(teamATime);
        
        if (teamABanCount < maxBanCount) {
            startTimer('team-b');
        }
    } else if (team === 'team-b' && teamBBanCount < maxBanCount) {
        clearInterval(teamBTimer);
        const banInput = document.getElementById('team-b-ban-input');
        const banList = document.getElementById('team-b-ban-list');
        const character = banInput.value.trim();
        
        if (character && !isAlreadyBanned(character, 'team-b')) {
            const listItem = document.createElement('li');
            listItem.textContent = character;
            banList.appendChild(listItem);
            banInput.value = '';
            teamBBanCount++;
            logHistory('team-b', `banned ${character}`);
        }
        
        teamBTime = 180; // Reset time for next turn
        document.getElementById('team-b-timer').textContent = formatTime(teamBTime);
        
        if (teamBBanCount < maxBanCount) {
            startTimer('team-a');
        }
    }
}

function pickCharacter(team) {
    if (team === 'team-a' && teamAPickCount < maxPickCount) {
        clearInterval(teamATimer);
        const pickInput = document.getElementById('team-a-pick-input');
        const pickList = document.getElementById('team-a-pick-list');
        const character = pickInput.value.trim();
        
        if (character && !isAlreadyPicked(character, 'team-a')) {
            const listItem = document.createElement('li');
            listItem.textContent = character;
            pickList.appendChild(listItem);
            pickInput.value = '';
            teamAPickCount++;
            logHistory('team-a', `picked ${character}`);
        }
        
        teamATime = 180; // Reset time for next turn
        document.getElementById('team-a-timer').textContent = formatTime(teamATime);
        
        if (teamAPickCount < maxPickCount) {
            startTimer('team-b');
        }
    } else if (team === 'team-b' && teamBPickCount < maxPickCount) {
        clearInterval(teamBTimer);
        const pickInput = document.getElementById('team-b-pick-input');
        const pickList = document.getElementById('team-b-pick-list');
        const character = pickInput.value.trim();
        
        if (character && !isAlreadyPicked(character, 'team-b')) {
            const listItem = document.createElement('li');
            listItem.textContent = character;
            pickList.appendChild(listItem);
            pickInput.value = '';
            teamBPickCount++;
            logHistory('team-b', `picked ${character}`);
        }
        
        teamBTime = 180; // Reset time for next turn
        document.getElementById('team-b-timer').textContent = formatTime(teamBTime);
        
        if (teamBPickCount < maxPickCount) {
            startTimer('team-a');
        }
    }
}

function logHistory(team, action) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${team.toUpperCase()}: ${action}`;
    historyList.appendChild(listItem);
}

function isAlreadyBanned(character, team) {
    const banList = team === 'team-a' ? document.getElementById('team-a-ban-list') : document.getElementById('team-b-ban-list');
    const bannedCharacters = banList.getElementsByTagName('li');
    
    for (let i = 0; i < bannedCharacters.length; i++) {
        if (bannedCharacters[i].textContent.toLowerCase() === character.toLowerCase()) {
            alert(`${character} is already banned for ${team.toUpperCase()}`);
            return true;
        }
    }
    return false;
}

function isAlreadyPicked(character, team) {
    const pickList = team === 'team-a' ? document.getElementById('team-a-pick-list') : document.getElementById('team-b-pick-list');
    const pickedCharacters = pickList.getElementsByTagName('li');
    
    for (let i = 0; i < pickedCharacters.length; i++) {
        if (pickedCharacters[i].textContent.toLowerCase() === character.toLowerCase()) {
            alert(`${character} is already picked for ${team.toUpperCase()}`);
            return true;
        }
    }
    return false;
}

startTimer('team-a'); // Start the timer for Team A initially
