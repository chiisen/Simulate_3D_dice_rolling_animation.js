// 當 DOM 內容載入完成後執行
document.addEventListener("DOMContentLoaded", function () {
    const rollButton = document.getElementById("rollButton"); // 取得擲骰按鈕
    const dice = document.getElementById("dice"); // 取得骰子元素

    // 只初始化骰子在原位，不做動畫
    dice.style.transition = "none";
    dice.style.transform = "rotateX(0deg) rotateY(0deg) translate3d(0px,0px,0px)";

    // 點擊擲骰按鈕時的事件處理
    rollButton.addEventListener("click", function () {
        rollButton.classList.add("rolling"); // 標記按鈕為 rolling 狀態，避免重複點擊

        const result = Math.floor(Math.random() * 6) + 1; // 產生一個 1 到 6 之間的隨機整數，代表骰子最終擲出的點數。

        // 產生隨機的旋轉角度和位移量，用於骰子擲出時的動畫效果。
        // randomX 和 randomY 控制骰子的旋轉角度，範圍在 360 到 1080 度之間。
        // randomTX, randomTY, randomTZ 控制骰子的位移量，使其在空間中隨機移動。
        // randomTY 特別設定為負值，模擬向上拋出的效果。
        const randomX = Math.floor(Math.random() * 720) + 360;
        const randomY = Math.floor(Math.random() * 720) + 360;
        const randomTX = (Math.random() - 0.5) * 200;
        const randomTY = -Math.random() * 150 - 50;
        const randomTZ = (Math.random() - 0.5) * 200;

        // 設定骰子的動畫旋轉與位移
        dice.style.transition = "transform 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
        dice.style.transform = `translate3d(${randomTX}px, ${randomTY}px, ${randomTZ}px) rotateX(${randomX}deg) rotateY(${randomY}deg)`;

        // 1.5 秒後，將骰子轉到對應點數的角度並回到原位
        setTimeout(() => {
            let finalX = 0, finalY = 0;

            // 根據點數設定骰子的最終角度
            switch (result) {
                case 1: finalX = 0; finalY = 0; break;
                case 2: finalX = 0; finalY = 180; break;
                case 3: finalX = 0; finalY = -90; break;
                case 4: finalX = 0; finalY = 90; break;
                case 5: finalX = 90; finalY = 0; break;
                case 6: finalX = -90; finalY = 0; break;
            }

            // 以較短動畫轉到最終角度並回到中心
            dice.style.transition = "transform 0.5s cubic-bezier(0.33,1,0.68,1)";
            dice.style.transform = `translate3d(0px, 0px, 0px) rotateX(${finalX}deg) rotateY(${finalY}deg)`;

            // 顯示結果提示（toast）
            const toast = document.createElement("div");
            toast.classList.add("toast");
            toast.textContent = `你擲出了 【${result}】點!`;
            document.body.appendChild(toast);

            // 0.7 秒後解除 rolling 狀態
            setTimeout(() => {
                rollButton.classList.remove("rolling");
            }, 700);

            // 3 秒後移除提示
            setTimeout(() => {
                toast.remove();
            }, 3000);

        }, 1500);
    });

    // 支援空白鍵觸發擲骰，且避免重複觸發
    document.addEventListener("keydown", function (event) {
        if (event.key === " " && !rollButton.classList.contains("rolling")) {
            event.preventDefault();
            rollButton.click();
        }
    });
});