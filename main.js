// Firebase settings
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_DATABASE_URL",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Generate User ID
function generateUserId() {
  return 'user-' + Math.random().toString(36).substr(2, 9);
}

// Check for User ID in localStorage
let userId = localStorage.getItem('userId');
if (!userId) {
  userId = generateUserId();
  localStorage.setItem('userId', userId);
}
document.getElementById('user-id').textContent = userId;

// Create chess board
function createChessBoard() {
  const board = document.getElementById('chess-board');
  board.innerHTML = ''; // Clear board if it already exists
  const rows = 8;
  const cols = 8;

  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          board.appendChild(cell);
      }
  }
}
createChessBoard();

// Simple chat logic
const chatInput = document.getElementById('chat-input');
const sendMessageButton = document.getElementById('send-message');
const messages = document.getElementById('messages');

sendMessageButton.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
      const newMessage = document.createElement('div');
      newMessage.textContent = `${userId}: ${message}`;
      messages.appendChild(newMessage);
      chatInput.value = '';
      messages.scrollTop = messages.scrollHeight; // Scroll down
  }
});

// Friend search (mockup)
document.getElementById('connect-friend').addEventListener('click', () => {
  const friendId = document.getElementById('friend-id').value.trim();
  if (friendId) {
      alert(`Connecting to friend with ID: ${friendId}`);
  } else {
      alert('Please enter a friend ID!');
  }
});
