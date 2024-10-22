function loadPage() {
    fetch('https://script.google.com/macros/s/AKfycbw2Szz60LgzkQMKvd3A_mCXz38_TOEvunsXR83v-_ZGg3vzAIZfTfCY9GbsmUhy4nQd1A/exec')
        .then(response => response.json())
        .then(data => {
            const linkDiv = document.getElementById('link');
            const buttons = data.buttons;
            const settings = data.settings; // 获取设置
            
            // 更新 h1 和 h2 内容
            document.querySelector('.top-container h1').textContent = settings.h1;
            document.querySelector('.top-container h2').textContent = settings.h2;

            buttons.forEach(button => {
                const btn = document.createElement('button');
                btn.className = 'button' + (button.animate ? ' shake-button' : ''); // 添加动画类
                btn.innerHTML = `${button.icon} ${button.text} <div style="visibility: hidden;">A</div>`;
                
                btn.onclick = function() {
                    const browserInfo = getBrowserInfo(); // 获取浏览器信息
                    const params = new URLSearchParams({
                        buttonName: button.text,
                        browserInfo: JSON.stringify(browserInfo)
                    });

                    // 保存点击信息到 Google Sheets
                    fetch('https://script.google.com/macros/s/AKfycbw2Szz60LgzkQMKvd3A_mCXz38_TOEvunsXR83v-_ZGg3vzAIZfTfCY9GbsmUhy4nQd1A/exec?' + params)
                        .then(response => {
                            if (response.ok) {
                                console.log(`Button "${button.text}" clicked and information saved.`);
                            } else {
                                console.error('Error saving click information:', response.statusText);
                            }
                        })
                        .catch(error => console.error('Error:', error));

                    window.open(button.link, '_blank'); // 在新标签页打开链接
                };

                linkDiv.appendChild(btn);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// 获取浏览器和设备信息
function getBrowserInfo() {
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const connection = navigator.connection || {};
    const networkType = connection.effectiveType || 'unknown';
    const utcTime = new Date().toUTCString();
    
    return {
        screenWidth,
        screenHeight,
        windowWidth,
        windowHeight,
        userAgent,
        language,
        networkType,
        utcTime
    };
}

// 加载页面内容
window.onload = loadPage;

function submitRegistrationForm() {
    // 获取用户填写的表单信息
    const fullName = document.getElementById('fullName').value;
    const choice1 = document.getElementById('choice1').value;
    const number2 = document.getElementById('number2').value;
    const referral = document.getElementById('referral').value;

    // 拼接 WhatsApp 消息内容
    const message = `
    *TEBUS SPECIAL BONUS UNTUK SAYA*
    \n
    \n
    \nNama Penuh : ( ${encodeURIComponent(fullName)} ) 
    \nJenis Bank : ( ${encodeURIComponent(choice1)} ) 
    \nAkaun Nombor : ( ${encodeURIComponent(number2)} ) 
    \nReferral ID : ( ${encodeURIComponent(referral)} )
`;

    // WhatsApp 目标电话号码 (用国际号码格式, 不带 "+" 号)
    const whatsappNumber = '601156603479'; // 替换为您的电话号码

    // 创建 WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

    // 打开 WhatsApp 并预填信息
    window.open(whatsappURL, '_blank');
}


document.addEventListener('DOMContentLoaded', function() {
    try {
        var swiper = new Swiper(".swiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 2,
            coverflowEffect: {
                rotate: -40, // 图片旋转角度
                stretch: 20, // 控制图片之间的距离
                depth: 300, // 控制3D深度
                modifier: 1,// 修改效果强度
                slideShadows: false,// 使图片有阴影效果
            },
            loop: true,// 无限循环
            spaceBetween: 0,// 图片之间的间距
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
        console.log("Swiper initialized successfully!");
    } catch (error) {
        console.error("Swiper initialization error:", error);
    }
});



const marquee = document.getElementById('marquee');

// 拖动相关变量
let isDragging = false;
let startX;
let scrollLeft;

// 自动滚动的设置
let scrollInterval;

// 设置无操作计时器
let idleTimer;
const idleTime = 3000; // 3秒后恢复滚动

// 开始拖动
marquee.addEventListener('mousedown', (e) => {
    isDragging = true;
    marquee.classList.add('active');
    startX = e.pageX - marquee.offsetLeft; // 获取鼠标相对元素的位置
    scrollLeft = marquee.scrollLeft; // 获取当前滚动的位置

    // 停止自动滚动
    clearInterval(scrollInterval);
    clearTimeout(idleTimer); // 清除计时器
});

// 结束拖动
marquee.addEventListener('mouseleave', () => {
    isDragging = false;
    marquee.classList.remove('active');
    restartIdleTimer(); // 重启计时器
});

marquee.addEventListener('mouseup', () => {
    isDragging = false;
    marquee.classList.remove('active');
    restartIdleTimer(); // 重启计时器
});

// 拖动过程
marquee.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // 如果没有拖动，则返回
    e.preventDefault(); // 阻止默认行为
    const x = e.pageX - marquee.offsetLeft; // 获取当前鼠标位置
    const walk = (x - startX) * 2; // 计算拖动的距离
    marquee.scrollLeft = scrollLeft - walk; // 设置新的滚动位置
});

// 触摸设备的支持
marquee.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - marquee.offsetLeft; // 获取触摸点相对元素的位置
    scrollLeft = marquee.scrollLeft; // 获取当前滚动的位置

    // 停止自动滚动
    clearInterval(scrollInterval);
    clearTimeout(idleTimer); // 清除计时器
});

marquee.addEventListener('touchend', () => {
    isDragging = false;
    restartIdleTimer(); // 重启计时器
});

marquee.addEventListener('touchmove', (e) => {
    if (!isDragging) return; // 如果没有拖动，则返回
    e.preventDefault(); // 阻止默认行为
    const x = e.touches[0].pageX - marquee.offsetLeft; // 获取当前触摸位置
    const walk = (x - startX) * 2; // 计算拖动的距离
    marquee.scrollLeft = scrollLeft - walk; // 设置新的滚动位置
});

// 自动滚动的功能
let scrollAmount = 0;

function autoScroll() {
    if (!isDragging) {
        scrollAmount += 1; // 调整值以改变速度
        marquee.scrollLeft = scrollAmount;
        if (scrollAmount >= marquee.scrollWidth - marquee.clientWidth) {
            scrollAmount = 0; // 当到达结尾时，重置
        }
    }
}

// 启动自动滚动
scrollInterval = setInterval(autoScroll, 20); // 每20毫秒自动滚动一次

// 重启空闲计时器
function restartIdleTimer() {
    clearTimeout(idleTimer); // 清除现有计时器
    idleTimer = setTimeout(() => {
        startAutoScroll(); // 3秒后恢复滚动
    }, idleTime);
}

// 启动自动滚动
function startAutoScroll() {
    if (!scrollInterval) {
        scrollInterval = setInterval(autoScroll, 20);
    }
}

// 在页面加载时启动空闲计时器
restartIdleTimer();
