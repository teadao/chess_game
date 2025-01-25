// Создание уникального ID пользователя
function generateUserId() {
  return 'user-' + Math.random().toString(36).substring(2, 9);
}

// Получение или создание ID пользователя
let userId = localStorage.getItem('userId');
if (!userId) {
  userId = generateUserId();
  localStorage.setItem('userId', userId);
}
document.getElementById('user-id').textContent = userId;

// Рендер шахматной доски
function renderChessBoard() {
  const board = document.getElementById('chess-board');
  for (let i = 0; i < 64; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (Math.floor(i / 8) % 2 === 0) {
          cell.style.backgroundColor = i % 2 === 0 ? '#f0d9b5' : '#b58863';
      } else {
          cell.style.backgroundColor = i % 2 === 0 ? '#b58863' : '#f0d9b5';
      }
      board.appendChild(cell);
  }
}
renderChessBoard();

// Инициализация простого чата
const messages = document.getElementById('messages');
const chatInput = document.getElementById('chat-input');
const sendMessageButton = document.getElementById('send-message');

sendMessageButton.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
      const newMessage = document.createElement('div');
      newMessage.textContent = `${userId}: ${message}`;
      messages.appendChild(newMessage);
      chatInput.value = '';
      messages.scrollTop = messages.scrollHeight;
  }
});

// Поиск друга (пока просто выводит ID друга)
document.getElementById('start-game').addEventListener('click', () => {
  const friendId = document.getElementById('friend-id').value.trim();
  if (friendId) {
      alert(`Игра с другом с ID: ${friendId} начинается! (но логика пока не добавлена)`);
  } else {
      alert('Введите ID друга!');
  }
});
