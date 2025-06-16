async function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (text === '') return;

  const chatBox = document.getElementById('chatBox');

  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.textContent = text;
  chatBox.appendChild(userMessage);

  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  const botMessage = document.createElement('div');
  botMessage.className = 'message bot';
  botMessage.textContent = 'Typing...';
  chatBox.appendChild(botMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    botMessage.textContent = data.reply;
  } catch (err) {
    botMessage.textContent = 'Error fetching response.';
  }

  AOS.refresh();
}