<template>
  <div class="about-container">
    <Navbar />
    <div class="about-content">
      <div class="about-card">
        <h1>关于 CodeVerse</h1>
        <div class="content">
          <!-- 这里的内容可以后续编辑 -->
          <p>CodeVerse 是一个面向开发者的代码共享与学习平台。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<style scoped>
.about-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: white;
  color: #333;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.about-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.about-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.about-card h1 {
  margin-bottom: 30px;
  font-size: 32px;
  color: #333;
}

.content {
  text-align: left;
  line-height: 1.6;
}

.content p {
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
}

@media screen and (max-width: 768px) {
  .about-card {
    padding: 20px;
  }
  
  .about-card h1 {
    font-size: 24px;
  }
}
</style> 