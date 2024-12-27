const pre = document.querySelector('pre')

function step() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
  })
  requestAnimationFrame(step)
}
step()
setInterval(() => {
  pre.textContent = pre.textContent.split('\n').slice(-10000).join('\n')
}, 10000)
