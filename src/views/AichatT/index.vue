<template>
  <div class="chat-container">
    <header class="chat-header">
      <h1>通义千问对话框(流目前不可用 待修复)</h1>
      <div class="mode-selector">
        <button :class="{ active: isNormalMode }" @click="setMode(true)">
          正常输出
        </button>
        <button :class="{ active: !isNormalMode }" @click="setMode(false)">
          流输出
        </button>
      </div>
    </header>

    <div class="chat-box">
      <div class="messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="{
            'message user-message': message.role === 'user',
            'message ai-message': message.role === 'ai'
          }"
        >
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>
      <div class="input-area">
        <input
          v-model="userInput"
          placeholder="输入问题并按回车发送"
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">发送</button>
      </div>
    </div>

    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner" />
      <p>加载中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const userInput = ref("");
const messages = ref([]);
const isNormalMode = ref(true);
const loading = ref(false);

const setMode = normalMode => {
  isNormalMode.value = normalMode;
  if (normalMode) {
    messages.value = [];
  }
};

const sendMessage = async () => {
  if (userInput.value.trim() === "") return;

  // Add user message to chat
  messages.value.push({ role: "user", content: userInput.value });

  // Clear input field
  const question = userInput.value;
  userInput.value = "";

  try {
    if (isNormalMode.value) {
      loading.value = true;
      const response = await axios.post("/api/v1/tongyi/send", question, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      messages.value.push({ role: "ai", content: response.data });
      loading.value = false;
    } else {
      // Create a new instance of EventSource to handle Server-Sent Events
      const eventSource = new EventSource("/api/v1/tongyi/aiTalk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
      });

      eventSource.onmessage = event => {
        const content = event.data;
        if (content) {
          messages.value.push({ role: "ai", content });
        }
      };

      eventSource.onerror = error => {
        console.error("Error receiving messages:", error);
        loading.value = false;
      };

      loading.value = true;
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
</script>

<style scoped>
/* 样式定义 */
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chat-header h1 {
  font-size: 24px;
  color: #333;
}

.mode-selector {
  display: flex;
}

.mode-selector button {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px 16px;
  margin-left: 10px;
  cursor: pointer;
  transition:
    background 0.3s,
    color 0.3s;
}

.mode-selector button.active {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}

.chat-box {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  background: #fff;
  height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  line-height: 1.4;
}

.user-message {
  background: #e1f5fe;
  align-self: flex-end;
}

.ai-message {
  background: #f1f8e9;
  align-self: flex-start;
}

.input-area {
  display: flex;
  margin-top: 10px;
}

.input-area input {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
}

.input-area button {
  background: #007bff;
  border: none;
  color: #fff;
  border-radius: 5px;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

.input-area button:hover {
  background: #0056b3;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  z-index: 1000;
}

.loading-spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left: 8px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
