<template>
  <div class="container">
    <!-- V1 版本验证码 -->
    <div class="section">
      <h1>生成验证码 V1</h1>
      <div class="buttons">
        <button @click="fetchV1HutoolImage">获取 V1 Hutool 验证码</button>
        <button @click="fetchV1KaptchaImage">获取 V1 Kaptcha 验证码</button>
      </div>
      <div v-if="imageSrcV1Hutool" class="image-container">
        <h2>Hutool 验证码</h2>
        <img :src="imageSrcV1Hutool" alt="验证码图片 V1 Hutool" />
      </div>
      <div v-if="imageSrcV1Kaptcha" class="image-container">
        <h2>Kaptcha 验证码</h2>
        <img :src="imageSrcV1Kaptcha" alt="验证码图片 V1 Kaptcha" />
      </div>
    </div>

    <!-- V2 版本验证码 -->
    <div class="section">
      <h1>生成验证码 V2</h1>
      <button @click="fetchV2Image">获取 V2 验证码</button>
      <div v-if="imageSrcV2" class="image-container">
        <h2>V2 验证码</h2>
        <img :src="imageSrcV2" alt="验证码图片 V2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const imageSrcV1Hutool = ref("");
const imageSrcV1Kaptcha = ref("");
const imageSrcV2 = ref("");

const fetchV1HutoolImage = async () => {
  try {
    const response = await axios.get("/api/v1/captcha/hutool", {
      responseType: "blob"
    });
    const url = URL.createObjectURL(response.data);
    imageSrcV1Hutool.value = url;
  } catch (error) {
    console.error("Error fetching V1 Hutool image:", error);
  }
};

const fetchV1KaptchaImage = async () => {
  try {
    const response = await axios.get("/api/v1/captcha/kaptcha", {
      responseType: "blob"
    });
    const url = URL.createObjectURL(response.data);
    imageSrcV1Kaptcha.value = url;
  } catch (error) {
    console.error("Error fetching V1 Kaptcha image:", error);
  }
};

const fetchV2Image = async () => {
  try {
    const response = await axios.get("/api/v2/captcha/captchaImage");
    const base64Image = response.data.img;
    imageSrcV2.value = `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error("Error fetching V2 image:", error);
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.image-container {
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
