// تخزين المزاج اليومي في مصفوفة
let moodHistory = [];

// الحصول على العناصر من DOM
const moodForm = document.getElementById('mood-form');
const moodSelect = document.getElementById('mood');
const historyList = document.getElementById('history-list');
const moodChartCanvas = document.getElementById('moodChart');
const messageElement = document.getElementById('message');

// متغير لتخزين الكائن الرسم البياني
let moodChart = null;

// التعامل مع الحدث عند تقديم النموذج
moodForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const selectedMood = moodSelect.value;
    const currentDate = new Date().toLocaleDateString();

    // إضافة المزاج إلى التاريخ
    moodHistory.push({ date: currentDate, mood: selectedMood });
    displayMoodHistory();
    updateChart();
    showMotivationalMessage();
});

// عرض تاريخ المزاج
function displayMoodHistory() {
    historyList.innerHTML = '';
    moodHistory.forEach(entry => {
        const div = document.createElement('div');
        div.textContent = `في ${entry.date}: مزاجك كان ${entry.mood}`;
        historyList.appendChild(div);
    });
}

// تحديث الرسم البياني
function updateChart() {
    // حساب عدد كل نوع مزاج
    const moodCounts = {
        happy: 0,
        neutral: 0,
        sad: 0,
        anxious: 0
    };

    moodHistory.forEach(entry => {
        moodCounts[entry.mood]++;
    });

    // بيانات الرسم البياني
    const chartData = {
        labels: ['سعيد', 'محايد', 'حزين', 'قلق'],
        datasets: [{
            label: 'توزيع المزاج',
            data: [moodCounts.happy, moodCounts.neutral, moodCounts.sad, moodCounts.anxious],
            backgroundColor: ['#4CAF50', '#FFC107', '#FF5722', '#2196F3'],
            borderColor: ['#388E3C', '#FF9800', '#F44336', '#1976D2'],
            borderWidth: 1
        }]
    };

    // إذا كان الرسم البياني موجودًا بالفعل، قم بتدميره قبل إعادة تهيئته
    if (moodChart) {
        moodChart.destroy();
    }

    // إنشاء الرسم البياني الجديد
    moodChart = new Chart(moodChartCanvas, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// عرض رسالة تحفيزية بناءً على المزاج
function showMotivationalMessage() {
    const randomMessages = [
        "اليوم هو فرصة جديدة لتحقيق الأفضل!",
        "لا تستسلم، كل يوم هو بداية جديدة.",
        "عندما تبتسم، يتحسن يومك!",
        "كل خطوة صغيرة نحو النجاح تعد إنجازًا."
    ];

    const randomIndex = Math.floor(Math.random() * randomMessages.length);
    messageElement.textContent = randomMessages[randomIndex];
}

// إظهار تاريخ المزاج عند تحميل الصفحة
displayMoodHistory();
updateChart();
showMotivationalMessage();


