// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  let gameId = null;
  let userId = null;
  let board = null;
  let game = null;
  
  // Initialize Firebase Auth
  firebase.auth().signInAnonymously().then((user) => {
    userId = user.user.uid;
    document.getElementById('userId').textContent = userId;
    document.getElementById('auth').classList.remove('hidden');
  });
  
  // Find or create a game
  function findGame() {
    const opponentId = document.getElementById('opponentId').value;
    if (!opponentId) return alert("Enter an opponent ID!");
  
    const gameRef = db.ref('games');
    gameRef.once('value', (snapshot) => {
      let found = false;
  
      snapshot.forEach((child) => {
        const game = child.val();
        if (game.players.includes(opponentId) && game.players.length === 1) {
          gameId = child.key;
          gameRef.child(gameId).child('players').push(userId);
          found = true;
        }
      });
  
      if (!found) {
        const newGame = gameRef.push({ players: [userId], moves: [], chat: [] });
        gameId = newGame.key;
      }
  
      startGame();
    });
  }
  
  // Start the game
  function startGame() {
    document.getElementById('auth').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
  
    board = Chessboard('board', {
      draggable: true,
      dropOffBoard: 'snapback',
      onDrop: onDrop
    });
  
    game = new Chess();
    const movesRef = db.ref(`games/${gameId}/moves`);
    movesRef.on('value', (snapshot) => {
      const moves = snapshot.val() || [];
      game.reset();
      moves.forEach((move) => game.move(move));
      board.position(game.fen());
    });
  
    const chatRef = db.ref(`games/${gameId}/chat`);
    chatRef.on('child_added', (snapshot) => {
      const chatBox = document.getElementById('chat');
      const msg = snapshot.val();
      chatBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.text}</p>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  }
  
  // Handle piece drop
  function onDrop(source, target) {
    const move = game.move({ from: source, to: target, promotion: 'q' });
    if (!move) return 'snapback';
  
    const movesRef = db.ref(`games/${gameId}/moves`);
    movesRef.once('value', (snapshot) => {
      const moves = snapshot.val() || [];
      moves.push(move.san);
      movesRef.set(moves);
    });
  }
  
  // Send chat message
  function sendMessage() {
    const message = document.getElementById('message').value;
    if (!message) return;
  
    const chatRef = db.ref(`games/${gameId}/chat`);
    chatRef.push({ user: userId, text: message });
    document.getElementById('message').value = '';
  }
  