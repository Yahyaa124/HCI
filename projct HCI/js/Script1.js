document.addEventListener("DOMContentLoaded", function () {
    // عند تقديم نموذج تسجيل الدخول
    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();

        // الحصول على قيم المدخلات
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // تحقق من صحة اسم المستخدم وكلمة المرور
        if (username === "h" && password === "1122") {
            // عند نجاح تسجيل الدخول، الانتقال إلى الصفحة الرئيسية
            window.location.href = "HTMLPage7.html" ;  // قم بتغيير هذا إلى اسم الصفحة الرئيسية التي تريدها
        } else {
            // إذا كانت البيانات غير صحيحة، عرض رسالة خطأ
            document.getElementById("error-message").style.display = "block";
        }
    });
});
