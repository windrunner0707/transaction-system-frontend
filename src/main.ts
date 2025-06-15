import './style.css'

// 初始化长度
let length = 0

// 是否已经播放过好汉歌
let haohanPlayed = false

// 页面结构
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div style="text-align: center; position: relative;">
    <img src="/qiangshen.jpg" alt="强神" style="width: 300px; border-radius: 12px;" />
    <div class="card" style="margin-top: 16px;">
      <button id="counter" type="button">牛子 +1 cm</button>
    </div>
    <p id="length-value">当前牛子长度：0 cm</p>
    <audio id="haohan-audio" src="/haohan.mp3"></audio>
  </div>
`

const counterBtn = document.getElementById('counter') as HTMLButtonElement
const lengthText = document.getElementById('length-value')!
const haohanAudio = document.getElementById('haohan-audio') as HTMLAudioElement

counterBtn.addEventListener('click', () => {
    length++
    lengthText.textContent = `当前牛子长度：${length} cm`

    // 🎉 彩蛋一：每增长 10cm 提示
    if (length % 10 === 0) {
        alert("你已经超越人类极限！")
    }

    // 🎉 彩蛋二：到达 52cm 播放《好汉歌》
    if (length === 18 && !haohanPlayed) {
        haohanAudio.play().catch(err => {
            console.error("播放失败：", err)
            alert("自动播放失败，请手动点击页面以启用音频")
        })
        haohanPlayed = true
    }

    // ✨ 按钮动画
    counterBtn.classList.add('animate-bounce')
    counterBtn.addEventListener('animationend', () => {
        counterBtn.classList.remove('animate-bounce')
    }, { once: true })

    // 🔥 香火动画
    const incense = document.createElement('div')
    incense.className = 'incense'
    incense.textContent = '💦'  // 可自定义其他符号

    const rect = counterBtn.getBoundingClientRect()
    incense.style.left = `${rect.left + rect.width / 2 - 12}px`
    incense.style.top = `${rect.top - 10}px`

    document.body.appendChild(incense)

    incense.addEventListener('animationend', () => {
        incense.remove()
    })
})
