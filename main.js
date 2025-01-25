// Генерация уникального ID для пользователя
function generateUserId() {
    return 'user-' + Math.random().toString(36).substr(2, 9);
}

// Проверка и сохранение ID пользователя
let userId = localStorage.getItem('userId');
if (!userId) {
    userId = generateUserId();
    localStorage.setItem('userId', userId);
}
document.getElementById('user-id').textContent = userId;

// Создание шахматной доски
function createChessBoard() {
    const board = document.getElementById('chess-board');
    board.innerHTML = ''; // Очистить доску, если уже есть
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

// Простая логика для чата
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
        messages.scrollTop = messages.scrollHeight; // Прокрутка вниз
    }
});

// Поиск друга (заглушка)
document.getElementById('connect-friend').addEventListener('click', () => {
    const friendId = document.getElementById('friend-id').value.trim();
    if (friendId) {
        alert(`Connecting to friend with ID: ${friendId}`);
    } else {
        alert('Please enter a friend ID!');
    }
});
