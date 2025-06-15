import './style.css'

// 初始化长度
let length = 0

// 是否已经播放过好汉歌
let haohanPlayed = false

const phrases = [
    "神牛附体！",
    "今日宜进尺 📏",
    "你已惊动祖师爷！",
    "再点一下，牛界封神！",
    "香火旺盛，牛运长存 🕯️",
    "这不是你第一次这么长了吧？",
    "代码都被你吓出 bug 了",
    "NASA 正在定位你的位置",
    "你已经超越人类极限！",
    "兄弟，你还好吗？😳"
]

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
  <div class="card" style="margin-top: 8px;">
    <button id="call-api" type="button">访问李强接口</button>
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
    showDanmu(rect.left + rect.width / 2, rect.top)
    incense.style.left = `${rect.left + rect.width / 2 - 12}px`
    incense.style.top = `${rect.top - 10}px`

    document.body.appendChild(incense)

    incense.addEventListener('animationend', () => {
        incense.remove()
    })
})

const callApiBtn = document.getElementById('call-api') as HTMLButtonElement

callApiBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('http://8.130.108.60:30080/transactions/li-qiang')
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
        }
        const data = await response.text() // 或者 .json() 取决于返回格式
        alert(`接口响应内容：\n${data}`)
    } catch (error) {
        alert(`调用失败：${error}`)
    }
})

function showDanmu(baseX: number, baseY: number) {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)]
    const danmu = document.createElement('div')
    danmu.className = 'danmu'
    danmu.textContent = phrase

    const offsetX = Math.random() * 100 - 50
    const offsetY = Math.random() * 20
    danmu.style.left = `${baseX + offsetX}px`
    danmu.style.top = `${baseY - offsetY}px`

    document.body.appendChild(danmu)
    danmu.addEventListener('animationend', () => danmu.remove())
}

