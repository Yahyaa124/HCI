document.addEventListener("DOMContentLoaded", function () {
    const goalForm = document.getElementById("goal-form");
    const historyList = document.getElementById("history-list");
    const goalChart = document.getElementById("goalChart");

    // بيانات الأهداف
    const goalData = {
        exercise: [],
        water: [],
        sleep: [],
        eatHealthy: []
    };

    // المتغير الخاص بتخزين الرسم البياني
    let chartInstance = null;

    // عند إرسال النموذج
    goalForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // الحصول على القيم المدخلة
        const goal = document.getElementById("goal").value;
        const progress = parseInt(document.getElementById("goal-progress").value);

        // التحقق من صحة المدخلات
        if (isNaN(progress) || progress < 0 || progress > 100) {
            alert("يرجى إدخال قيمة صحيحة بين 0 و 100");
            return;
        }

        // إضافة الهدف إلى التاريخ
        const date = new Date().toLocaleDateString();
        goalData[goal].push({ date, progress });

        // عرض الأهداف المسجلة في التاريخ
        updateHistory(goal);

        // تحديث المخطط البياني
        updateChart();
    });

    // تحديث تاريخ الأهداف
    function updateHistory(goal) {
        historyList.innerHTML = '';  // إعادة تعيين التاريخ المعروض

        goalData[goal].forEach(item => {
            const entry = document.createElement('div');
            entry.textContent = `${item.date} - ${goal}: ${item.progress}%`;
            historyList.appendChild(entry);
        });
    }

    // إعداد البيانات للمخطط البياني
    function updateChart() {
        const ctx = goalChart.getContext('2d');
        const chartData = {
            labels: [], // تواريخ الأهداف
            datasets: [] // بيانات الأهداف
        };

        // تعبئة بيانات المخطط من الأهداف
        Object.keys(goalData).forEach(goal => {
            goalData[goal].forEach(item => {
                if (!chartData.labels.includes(item.date)) {
                    chartData.labels.push(item.date);
                }
            });
        });

        // لكل هدف، إضافة بياناته إلى المخطط
        Object.keys(goalData).forEach(goal => {
            const dataForGoal = goalData[goal].map(item => item.progress);
            chartData.datasets.push({
                label: goal,
                data: dataForGoal,
                fill: false,
                borderColor: getRandomColor(),
                tension: 0.1
            });
        });

        // تحديث المخطط البياني (إعادة رسمه)
        if (chartInstance) {
            chartInstance.destroy(); // تدمير المخطط الحالي قبل إعادة رسمه
        }

        // رسم المخطط الجديد
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: { autoSkip: true, maxTicksLimit: 5 },
                        title: {
                            display: true,
                            text: 'التاريخ'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'النسبة المئوية'
                        }
                    }
                }
            }
        });
    }

    // وظيفة لتوليد لون عشوائي للمخطط
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
