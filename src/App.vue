<template>
  <div class="container">
    <header>
      <h1><i class="fas fa-laptop-code"></i> 技术栈概述生成器</h1>
      <p class="subtitle">点选您掌握的技术，自动分类生成专业的技术栈信息，一键导出为精美图片</p>
      <div class="tech-icons">
        <div class="tech-icon"><i class="fab fa-vuejs"></i></div>
        <div class="tech-icon"><i class="fab fa-react"></i></div>
        <div class="tech-icon"><i class="fab fa-js"></i></div>
        <div class="tech-icon"><i class="fab fa-node"></i></div>
        <div class="tech-icon"><i class="fas fa-database"></i></div>
        <div class="tech-icon"><i class="fab fa-git-alt"></i></div>
      </div>
    </header>
    
    <div class="main-content">
      <div class="tech-selector">
        <div class="section-title">
          <i class="fas fa-tools"></i>
          <span>选择您掌握的技术</span>
        </div>
        
        <!-- 前端技术 -->
        <div class="tech-category">
          <div class="category-title">
            <i class="fab fa-chrome"></i>
            <span>前端开发</span>
          </div>
          <div class="skills-container">
            <div v-for="skill in techCategories.frontend" 
                 class="skill-item" 
                 :class="{selected: isSelected('frontend', skill)}"
                 @click="toggleSkill('frontend', skill)"
                 >
                 <i :class="getIcon(skill)" class="icon-before" :style="{ color: getIconColor(skill) }"></i>
              {{ skill.name }}
            </div>
          </div>
        </div>
        
        <!-- 后端技术 -->
        <div class="tech-category">
          <div class="category-title">
            <i class="fas fa-server"></i>
            <span>后端开发</span>
          </div>
          <div class="skills-container">
            <div v-for="skill in techCategories.backend" 
                 class="skill-item" 
                 :class="{selected: isSelected('backend', skill)}"
                 @click="toggleSkill('backend', skill)"
                 >
                 <i :class="getIcon(skill)" class="icon-before" :style="{ color: getIconColor(skill) }"></i>
              {{ skill.name }}
            </div>
          </div>
        </div>
        
        <!-- 数据库 -->
        <div class="tech-category">
          <div class="category-title">
            <i class="fas fa-database"></i>
            <span>数据库</span>
          </div>
          <div class="skills-container">
            <div v-for="skill in techCategories.database" 
                 class="skill-item" 
                 :class="{selected: isSelected('database', skill)}"
                 @click="toggleSkill('database', skill)"
                 >
                 <i :class="getIcon(skill)" class="icon-before" :style="{ color: getIconColor(skill) }"></i>
              {{ skill.name }}
            </div>
          </div>
        </div>
        
        <!-- 开发工具 -->
        <div class="tech-category">
          <div class="category-title">
            <i class="fas fa-tools"></i>
            <span>开发工具</span>
          </div>
          <div class="skills-container">
            <div v-for="skill in techCategories.tools" 
                 class="skill-item" 
                 :class="{selected: isSelected('tools', skill)}"
                 @click="toggleSkill('tools', skill)"
                 >
                 <i :class="getIcon(skill)" class="icon-before" :style="{ color: getIconColor(skill) }"></i>
              {{ skill.name }}
            </div>
          </div>
        </div>
        
        <!-- 部署与运维 -->
        <div class="tech-category">
          <div class="category-title">
            <i class="fas fa-cloud"></i>
            <span>部署与运维</span>
          </div>
          <div class="skills-container">
            <div v-for="skill in techCategories.devops" 
                 class="skill-item" 
                 :class="{selected: isSelected('devops', skill)}"
                 @click="toggleSkill('devops', skill)"
                 >
                 <i :class="getIcon(skill)" class="icon-before" :style="{ color: getIconColor(skill) }"></i>
              {{ skill.name }}
            </div>
          </div>
        </div>
        
        <!-- 自定义技术 -->
        <div class="tech-category">
          <div class="category-title">
            <i class="fas fa-plus-circle"></i>
            <span>自定义技术</span>
          </div>
          <div class="skills-container">
            <div v-for="skill in customSkills" 
                 class="skill-item" 
                 :class="{selected: isSelected('custom', skill)}"
                 @click="toggleSkill('custom', skill)"
                 >
                 <i :class="getIcon(skill)" class="icon-before" :style="{ color: getIconColor(skill) }"></i>
              {{ skill.name }}
            </div>
            <div class="skill-item add-btn" @click="showCustomInput = true">
              <i class="fas fa-plus"></i> 添加技术
            </div>
          </div>
          <div class="custom-input" v-if="showCustomInput">
            <input type="text" v-model="newSkill" placeholder="输入技术名称" @keyup.enter="addCustomSkill">
            <button @click="addCustomSkill">添加</button>
          </div>
        </div>
      </div>
      
      <div class="preview-section">
        <div class="stack-preview" ref="previewCard">
          <div class="preview-header">
            <h2>{{ userName || "您的姓名" }}的技术栈</h2>
            <p>{{ jobTitle || "职位/角色" }}</p>
          </div>
          
          <div class="user-data">
            <div class="user-input">
              <input type="text" v-model="userName" placeholder="您的姓名">
              <input type="text" v-model="jobTitle" placeholder="职位/角色">
            </div>
            
            <div class="selected-skills">
              <!-- 技术栈分组展示 -->
              <template v-for="(skills, category) in selectedTech" :key="category">
                <div v-if="skills.length > 0" class="skills-group">
                  <div class="skills-group-title">
                    <i :class="categoryIcons[category]"></i>
                    {{ categoryTitles[category] }}
                  </div>
                  <div class="skill-tags">
                    <div v-for="skill in skills" :key="skill.name" class="skill-tag">
                      <i :class="getIcon(skill)"></i>
                      <span>{{ skill.name }}</span>
                    </div>
                  </div>
                </div>
              </template>
              
              <div v-if="totalSkills === 0" class="empty-state">
                <i class="fas fa-info-circle" style="font-size: 3rem; margin-bottom: 15px; color: #adb5bd;"></i>
                <p>请从左侧选择您掌握的技术</p>
                <p>选中的技术将会在这里展示</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="actions">
          <button class="btn btn-primary" @click="exportAsImage">
            <i class="fas fa-download"></i>
            导出为图片
          </button>
          <button class="btn btn-secondary" @click="resetAll">
            <i class="fas fa-redo"></i>
            重置选择
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import html2canvas from 'html2canvas';

    const techCategories = {
      frontend: [
        {name: "Vue.js", icon: "fab fa-vuejs", color: "#42b883"},
        {name: "React", icon: "fab fa-react", color: "#61dafb"},
        {name: "Angular", icon: "fab fa-angular", color: "#dd0031"},
        {name: "TypeScript", icon: "fas fa-code", color: "#3178c6"},
        {name: "JavaScript", icon: "fab fa-js", color: "#f7df1e"},
        {name: "HTML5", icon: "fab fa-html5", color: "#e34f26"},
        {name: "CSS3", icon: "fab fa-css3-alt", color: "#264de4"},
        {name: "Sass", icon: "fab fa-sass", color: "#cc6699"},
        {name: "Webpack", icon: "fas fa-box", color: "#8dd6f9"},
        {name: "Vite", icon: "fas fa-bolt", color: "#bd34fe"},
        {name: "Bootstrap", icon: "fab fa-bootstrap", color: "#7952b3"},
        {name: "Tailwind CSS", icon: "fas fa-wind", color: "#38b2ac"}
      ],
      backend: [
        {name: "Node.js", icon: "fab fa-node-js", color: "#68a063"},
        {name: "Express", icon: "fas fa-server", color: "#000000"},
        {name: "Spring Boot", icon: "fab fa-java", color: "#6db33f"},
        {name: "Django", icon: "fab fa-python", color: "#092e20"},
        {name: "Flask", icon: "fas fa-flask", color: "#000000"},
        {name: ".NET Core", icon: "fab fa-microsoft", color: "#512bd4"},
        {name: "Laravel", icon: "fab fa-laravel", color: "#ff2d20"},
        {name: "PHP", icon: "fab fa-php", color: "#777bb4"},
        {name: "Ruby on Rails", icon: "fas fa-gem", color: "#cc0000"},
        {name: "NestJS", icon: "fas fa-dove", color: "#e0234e"}
      ],
      database: [
        {name: "MySQL", icon: "fas fa-database", color: "#4479a1"},
        {name: "PostgreSQL", icon: "fas fa-database", color: "#336791"},
        {name: "MongoDB", icon: "fas fa-leaf", color: "#47a248"},
        {name: "Redis", icon: "fas fa-redo", color: "#d82c20"},
        {name: "SQLite", icon: "fas fa-database", color: "#003b57"},
        {name: "Firebase", icon: "fas fa-fire", color: "#ffca28"},
        {name: "Oracle", icon: "fas fa-database", color: "#f80000"},
        {name: "SQL Server", icon: "fas fa-server", color: "#e64513"}
      ],
      tools: [
        {name: "Git", icon: "fab fa-git-alt", color: "#f05033"},
        {name: "Docker", icon: "fab fa-docker", color: "#2496ed"},
        {name: "VS Code", icon: "fab fa-microsoft", color: "#0078d7"},
        {name: "IntelliJ", icon: "fas fa-code", color: "#000000"},
        {name: "GitHub", icon: "fab fa-github", color: "#181717"},
        {name: "JIRA", icon: "fab fa-jira", color: "#0052cc"},
        {name: "Postman", icon: "fas fa-fire", color: "#ff6c37"},
        {name: "Figma", icon: "fas fa-paint-brush", color: "#f24e1e"}
      ],
      devops: [
        {name: "AWS", icon: "fab fa-aws", color: "#232f3e"},
        {name: "Azure", icon: "fab fa-microsoft", color: "#0089d6"},
        {name: "Google Cloud", icon: "fab fa-google", color: "#4285f4"},
        {name: "Nginx", icon: "fas fa-sync", color: "#009639"},
        {name: "Kubernetes", icon: "fas fa-cubes", color: "#326ce5"},
        {name: "Jenkins", icon: "fab fa-jenkins", color: "#d24939"},
        {name: "Docker", icon: "fab fa-docker", color: "#2496ed"},
        {name: "Linux", icon: "fab fa-linux", color: "#fcc624"}
      ]
    };
    
    const categoryTitles = {
      frontend: '前端技术',
      backend: '后端技术',
      database: '数据库',
      tools: '开发工具',
      devops: '部署与运维',
      custom: '其他技术'
    }
    
    const categoryIcons = {
      frontend: 'fab fa-chrome',
      backend: 'fas fa-server',
      database: 'fas fa-database',
      tools: 'fas fa-tools',
      devops: 'fas fa-cloud',
      custom: 'fas fa-plus-circle'
    }

const selectedTech = reactive({ frontend: [], backend: [], database: [], tools: [], devops: [], custom: [] })
const showCustomInput = ref(false)
const newSkill = ref('')
const customSkills = ref([])
const userName = ref('')
const jobTitle = ref('')
const previewCard = ref(null)

const totalSkills = computed(() => Object.values(selectedTech).reduce((t, c) => t + c.length, 0))
const isSelected = (category, skill) => selectedTech[category].includes(skill)
const toggleSkill = (category, skill) => {
  const i = selectedTech[category].indexOf(skill)
  i === -1 ? selectedTech[category].push(skill) : selectedTech[category].splice(i, 1)
}
const getIcon = (skill) => skill.icon || 'fas fa-code'
const getIconColor = (skill) => skill.color || '#4361ee'
const addCustomSkill = () => {
  if (newSkill.value.trim() && !customSkills.value.some(s => s.name === newSkill.value)) {
    const obj = { name: newSkill.value, icon: 'fas fa-plus', color: '#9c27b0' }
    customSkills.value.push(obj)
    toggleSkill('custom', obj)
    newSkill.value = ''
  }
  showCustomInput.value = false
}
const resetAll = () => {
  Object.keys(selectedTech).forEach(cat => (selectedTech[cat] = []))
  customSkills.value = []
  userName.value = ''
  jobTitle.value = ''
}
const exportAsImage = async () => {
  if (totalSkills.value === 0) return alert('请先选择至少一项技术')
  if (!userName.value) userName.value = '技术专家'
  if (!jobTitle.value) jobTitle.value = '高级开发工程师'
  const cardElement = previewCard.value
  const userInputs = cardElement.querySelector('.user-input')
  const actions = document.querySelector('.actions')
  const originalUserInputs = userInputs.style.display
  const originalActions = actions.style.display
  userInputs.style.display = 'none'
  actions.style.display = 'none'
  const canvas = await html2canvas(cardElement, {
    scale: 2,
    backgroundColor: '#fff',
    logging: false,
    useCORS: true
  })
  userInputs.style.display = originalUserInputs
  actions.style.display = originalActions
  const image = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = image
  link.download = `${userName.value || '技术栈'}_技术栈概述.png`
  link.click()
}
</script>



<style scoped>
@import '../style.css';
</style>