document.addEventListener("DOMContentLoaded", function () {
    const activityForm = document.getElementById("activity-form");
    const historyList = document.getElementById("history-list");
    const activityChart = document.getElementById("activityChart");

    // تخزين الأنشطة
    const activityData = {
        exercise: [],
        yoga: [],
        meditation: [],
        reading: [],
        hiking: []
    };

    let chartInstance = null;

    // التعامل مع تقديم النموذج
    activityForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // الحصول على القيم المدخلة
        const activity = document.getElementById("activity").value;
        const duration = parseInt(document.getElementById("duration").value);

        // التحقق من صحة المدخلات
        if (isNaN(duration) || duration <= 0) {
            alert("يرجى إدخال مدة النشاط بشكل صحيح");
            return;
        }

        // إضافة النشاط إلى بيانات الأنشطة
        const date = new Date().toLocaleDateString();
        activityData[activity].push({ date, duration });

        // عرض الأنشطة في التاريخ
        updateHistory(activity);

        // تحديث المخطط البياني
        updateChart();
    });

    // تحديث تاريخ الأنشطة
    function updateHistory(activity) {
        historyList.innerHTML = '';  // إعادة تعيين التاريخ المعروض

        activityData[activity].forEach(item => {
            const entry = document.createElement('div');
            entry.textContent = `${item.date} - ${activity}: ${item.duration} دقائق`;
            historyList.appendChild(entry);
        });
    }

    // تحديث المخطط البياني
    function updateChart() {
        const ctx = activityChart.getContext('2d');
        const chartData = {
            labels: [],
            datasets: []
        };

        // تعبئة بيانات المخطط من الأنشطة
        Object.keys(activityData).forEach(activity => {
            activityData[activity].forEach(item => {
                if (!chartData.labels.includes(item.date)) {
                    chartData.labels.push(item.date);
                }
            });
        });

        Object.keys(activityData).forEach(activity => {
            const dataForActivity = activityData[activity].map(item => item.duration);
            chartData.datasets.push({
                label: activity,
                data: dataForActivity,
                backgroundColor: getRandomColor(),
                borderColor: getRandomColor(),
                borderWidth: 1
            });
        });

        // تحديث أو إنشاء المخطط البياني
        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: 'bar',
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
                        title: {
                            display: true,
                            text: 'مدة النشاط (دقائق)'
                        }
                    }
                }
            }
        });
    }

    // توليد لون عشوائي للمخطط
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
