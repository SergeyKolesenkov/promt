let currentMode = 'graphics';

function switchMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.mode-panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById('tab-' + mode).classList.add('active');
    document.getElementById(mode + 'Panel').classList.add('active');
    updatePrompt();
}

function updatePrompt() {
    let finalPrompt = "";
    const rBox = document.getElementById('resultPrompt');
    if (!rBox) return;

    if (currentMode === 'graphics') {
        const subject = document.getElementById('gSubject').value.trim() || '[субъект]';
        const style = document.getElementById('gStyle').value.trim() || '[стиль]';
        const camera = document.getElementById('gCamera').value;
        const env = document.getElementById('gEnv').value.trim() || '[окружение]';
        
        let parts = [style, subject, camera, env];
        if (document.getElementById('qDetailed').checked) parts.push("highly detailed");
        if (document.getElementById('qFocus').checked) parts.push("sharp focus");
        if (document.getElementById('qResolution').checked) parts.push("8k resolution");
        if (document.getElementById('qPhoto').checked) parts.push("photorealistic");
        
        finalPrompt = "Нарисуй: " + parts.join(", ") + ".\n\n[Negative Prompt]: blurry, deformed, bad anatomy, text, watermark, missing fingers, extra limbs, out of focus.";
    }
    else if (currentMode === 'text') {
        const role = document.getElementById('tRole').value.trim() || '[роль]';
        const task = document.getElementById('tTask').value.trim() || '[задача]';
        const audience = document.getElementById('tAudience').value.trim() || '[аудитория]';
        const format = document.getElementById('tFormat').value.trim() || '[формат]';
        
        finalPrompt = role + ".\n\n🎯 Задача: " + task + ".\n👥 Аудитория: " + audience + ".\n📋 Формат: " + format + ".\n⛔ Ограничения: Без канцеляризмов и оправдательного тона. Объём до 200 слов.\n\n⛓️ ТРЕБОВАНИЕ (Chain of Thought): Пошагово распиши свои рассуждения перед окончательным ответом.";
    }
    else if (currentMode === 'audio') {
        const genre = document.getElementById('aGenre').value.trim() || '[жанр]';
        const mood = document.getElementById('aMood').value.trim() || '[настроение]';
        const vocals = document.getElementById('aVocals').value.trim() || '[вокал]';

        finalPrompt = "Audio Prompt для Suno/Udio: " + genre + ", " + mood + ", " + vocals + ", masterpiece, studio quality, wide stereo image, mixed and mastered.\n\n[Структурные мета-теги]:\n[Intro]\n[Verse 1]\n[Chorus: energetic]\n[Outro]";
    }
    else if (currentMode === 'video') {
        const action = document.getElementById('vAction').value.trim() || '[действие]';
        const camera = document.getElementById('vCamera').value.trim() || '[камера]';

        let vParts = [];
        if (document.getElementById('vWarm').checked) vParts.push("warm lighting");
        if (document.getElementById('vCinematic').checked) vParts.push("cinematic");
        if (document.getElementById('v4k').checked) vParts.push("4k");
        if (document.getElementById('v24fps').checked) vParts.push("24fps");
        if (document.getElementById('vPhoto').checked) vParts.push("photorealistic");

        let qualityStr = vParts.length > 0 ? ", " + vParts.join(", ") : "";
        finalPrompt = "Video Prompt для Runway/Kling: " + action + ", " + camera + qualityStr + ".\n\n[Правило]: Режим Image-to-Video. Сохранять строгую временную согласованность (temporal consistency) без плавления геометрии объектов.";
    }
    else if (currentMode === 'vibe') {
        const goal = document.getElementById('viGoal').value.trim() || '[цель приложения]';
        const stack = document.getElementById('viStack').value.trim() || '[стек]';
        const features = document.getElementById('viFeatures').value.trim() || '[функции]';

        finalPrompt = "Действуй как опытный Senior Frontend Developer. Напиши полностью рабочий код приложения в рамках концепции Вайб-кодинга.\n\nГлавная цель: " + goal + ".\nТехнологический стек: " + stack + ".\nКлючевой функционал, который необходимо реализовать: " + features + ".\n\nТребование: Верни результат строго в виде одного монолитного файла, где CSS стили находятся внутри тега <style>, а JS логика внутри <script>. Код должен быть чистым, расширяемым и снабжен комментариями на русском языке.";
    }

    rBox.innerText = finalPrompt;
}

function copyToClipboard() {
    const text = document.getElementById('resultPrompt').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Промт скопирован в буфер обмена!');
    }).catch(err => alert('Ошибка при копировании: ' + err));
}

// Инициализация при старте
window.onload = function() {
    updatePrompt();
};