import './style.css'

let counter = 0

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div style="text-align: center;">
    <img src="/qiangshen.jpg" alt="强神" style="width: 300px; border-radius: 12px;" />
    <div class="card" style="margin-top: 16px;">
      <button id="counter" type="button">功德 +1</button>
    </div>
    <p id="gongde-value">当前功德值：0</p>
  </div>
`

const counterBtn = document.getElementById('counter') as HTMLButtonElement
const gongdeText = document.getElementById('gongde-value')!

counterBtn.addEventListener('click', () => {
    counter++
    gongdeText.textContent = `当前功德值：${counter}`
})
