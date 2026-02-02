document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault()
  
  const roll = document.getElementById('roll').value.trim()
  
  if (!roll) {
    alert('Please enter your roll number')
    return
  }

  localStorage.setItem('tce_user_roll', roll)
  localStorage.setItem('tce_logged_in', '1')

  const btn = document.querySelector('.submit-btn')
  btn.textContent = 'Signing in...'
  btn.disabled = true

  setTimeout(() => {
    location.replace('home.html')
  }, 800)
})