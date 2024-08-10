<template>
  <div class="container">
    <h1>AI 接口页面</h1>

    <!-- 文本纠错 -->
    <div class="section">
      <h2>文本纠错</h2>
      <input
        v-model="textToCorrect"
        type="text"
        placeholder="输入文本进行纠错"
      />
      <button @click="correctText">纠错</button>
      <div v-if="correctionResult" class="result">
        <h3>纠错结果：</h3>
        <p>{{ correctionResult }}</p>
      </div>
    </div>

    <!-- 文本识别 -->
    <div class="section">
      <h2>文本识别</h2>
      <input type="file" @change="onFileChange" />
      <button @click="recognizeText">识别文本</button>
      <div v-if="recognitionResult" class="result">
        <h3>识别结果：</h3>
        <p>{{ recognitionResult }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const textToCorrect = ref("");
const correctionResult = ref("");
const recognitionResult = ref("");
const file = ref(null);

const correctText = async () => {
  try {
    const response = await axios.get("/api/v1/ai/nlp", {
      params: { text: textToCorrect.value }
    });
    correctionResult.value = response.data.msg;
  } catch (error) {
    console.error("Error correcting text:", error);
  }
};

const onFileChange = event => {
  file.value = event.target.files[0];
};

const recognizeText = async () => {
  if (!file.value) {
    alert("请先选择一个文件");
    return;
  }
  const formData = new FormData();
  formData.append("file", file.value);

  try {
    const response = await axios.post("/api/v1/ai/word", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    recognitionResult.value = response.data.msg;
  } catch (error) {
    console.error("Error recognizing text:", error);
  }
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.section {
  margin-bottom: 40px;
}

input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.result {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}
</style>
