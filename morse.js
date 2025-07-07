const DOT_THRESHOLD = 200;  // ms
const INACTIVITY_TIMEOUT = 3000;  // ms

const morseDict = {
  '.-':'A','-...':'B','-.-.':'C','-..':'D','.':'E','..-.':'F',
  '--.':'G','....':'H','..':'I','.---':'J','-.-':'K','.-..':'L',
  '--':'M','-.':'N','---':'O','.--.':'P','--.-':'Q','.-.':'R',
  '...':'S','-':'T','..-':'U','...-':'V','.--':'W','-..-':'X',
  '-.--':'Y','--..':'Z','-----':'0','.----':'1','..---':'2',
  '...--':'3','....-':'4','.....':'5','-....':'6','--...':'7',
  '---..':'8','----.':'9'
};

let pressStart = null;
let symbols = [];
let word = [];
let lastInputTime = Date.now();

const morseDiv = document.getElementById('morse');
const outputDiv = document.getElementById('output');

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && pressStart === null) {
    pressStart = Date.now();
  }
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'Space' && pressStart !== null) {
    const duration = Date.now() - pressStart;
    if (duration < DOT_THRESHOLD) {
      // Ignore accidental tap
    } else if (duration < 500) {
      symbols.push('.');
      morseDiv.textContent += '.';
    } else {
      symbols.push('-');
      morseDiv.textContent += '-';
    }
    pressStart = null;
    lastInputTime = Date.now();
  }
});

setInterval(() => {
  const now = Date.now();
  if (symbols.length > 0 && now - lastInputTime > 1000) {
    const morseChar = symbols.join('');
    const letter = morseDict[morseChar] || '?';
    word.push(letter);
    outputDiv.textContent = word.join('');
    morseDiv.textContent += ' ';
    symbols = [];
    lastInputTime = now;
  }

  if (word.length > 0 && now - lastInputTime > INACTIVITY_TIMEOUT) {
    outputDiv.textContent += ' ';
    word = [];
    morseDiv.textContent = '';
  }
}, 200);
