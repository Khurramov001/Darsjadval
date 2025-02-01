const themes = [
  {
      primary: '#2c3e50',
      secondary: '#e74c3c',
      accent: '#3498db',
      background: '#1a1a1a',
      textColor: '#ecf0f1',
      animation: 'float 6s ease-in-out infinite'
  },
  {
      primary: '#34495e',
      secondary: '#9b59b6',
      accent: '#1abc9c',
      background: '#2c3e50',
      textColor: '#ecf0f1',
      animation: 'rotate 6s ease-in-out infinite'
  },
  {
      primary: '#8e44ad',
      secondary: '#f1c40f',
      accent: '#e67e22',
      background: '#2c3e50',
      textColor: '#ecf0f1',
      animation: 'scale 6s ease-in-out infinite'
  },
  {
      primary: '#16a085',
      secondary: '#d35400',
      accent: '#2980b9',
      background: '#1a1a1a',
      textColor: '#ecf0f1',
      animation: 'slide 6s ease-in-out infinite'
  },
  {
      primary: '#c0392b',
      secondary: '#f39c12',
      accent: '#27ae60',
      background: '#2c3e50',
      textColor: '#ecf0f1',
      animation: 'fade 6s ease-in-out infinite'
  }
];

const animations = [
  `@keyframes rotate {
      0%, 100% { transform: rotateY(0deg); }
      50% { transform: rotateY(180deg); }
  }`,
  `@keyframes scale {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
  }`,
  `@keyframes slide {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(20px); }
  }`,
  `@keyframes fade {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
  }`,
  `@keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
  }`
];

function applyRandomTheme() {
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

  document.documentElement.style.setProperty('--primary', randomTheme.primary);
  document.documentElement.style.setProperty('--secondary', randomTheme.secondary);
  document.documentElement.style.setProperty('--accent', randomTheme.accent);
  document.documentElement.style.setProperty('--background', randomTheme.background);
  document.documentElement.style.setProperty('--text-color', randomTheme.textColor);

  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = randomAnimation;
  document.head.appendChild(styleSheet);

  const scheduleGrid = document.querySelector('.schedule-grid');
  if (scheduleGrid) {
      scheduleGrid.style.animation = randomTheme.animation;
  }
}

// Random dizayn tugmasi uchun event listener
document.addEventListener('DOMContentLoaded', () => {
  const randomThemeBtn = document.getElementById('randomThemeBtn');
  if (randomThemeBtn) {
      randomThemeBtn.addEventListener('click', applyRandomTheme);
  }
});