document.addEventListener("DOMContentLoaded", function () {

    const messages = [
        "Ты красивая. Очень.",
        "И даже в те дни, когда сама этого не чувствуешь.",
        "Я люблю тебя разной: весёлой, задумчивой, уставшей, тихой — и даже когда ты злишься.",
        "Мне нравится быть рядом с тобой — не только тогда, когда ты улыбаешься.",
        "Тебе не нужно быть в хорошем настроении, чтобы оставаться собой."
    ];

    const stars = document.querySelectorAll(".star");
    const interactiveStars = document.getElementById("interactiveStars");
    const messageContainer = document.getElementById("messageContainer");
    const messageText = document.getElementById("messageText");
    const messageNumber = document.getElementById("messageNumber");
    const transitionLight = document.getElementById("transitionLight");
    const flowerScene = document.getElementById("flowerScene");
    const bouquet = document.getElementById("bouquet");
    const flowerNote = document.getElementById("flowerNote");
    const flowerAfter = document.getElementById("flowerAfter");
    const catScene = document.getElementById("catScene");
    const catStatus = document.getElementById("catStatus");
    const catActions = document.getElementById("catActions");
    const catFinal = document.getElementById("catFinal");

    let currentMessage = 0;
    const catDone = new Set();
    let busy = false;

    stars.forEach(function (star) {
        star.addEventListener("click", function () {
            if (busy) return;
            if (currentMessage >= messages.length) return;

            busy = true;
            star.classList.add("clicked");

            messageText.textContent = messages[currentMessage];
            messageNumber.textContent = String(currentMessage + 1).padStart(2, "0");
            messageContainer.classList.add("show");

            currentMessage++;

            if (currentMessage < messages.length) {
                setTimeout(function () {
                    busy = false;
                }, 650);
                return;
            }

            setTimeout(function () {
                interactiveStars.style.opacity = "0";
                interactiveStars.style.pointerEvents = "none";
                messageContainer.classList.remove("show");
                transitionLight.classList.add("show");

                setTimeout(function () {
                    flowerScene.classList.add("show");
                }, 450);

                setTimeout(function () {
                    transitionLight.classList.remove("show");
                    busy = false;
                }, 1400);
            }, 1900);
        });
    });

    bouquet.addEventListener("click", function () {
        if (bouquet.classList.contains("opened")) return;

        bouquet.classList.add("opened");
        flowerNote.classList.add("hide");

        setTimeout(function () {
            flowerAfter.classList.add("show");
        }, 900);
    });

    flowerAfter.addEventListener("click", function () {
        if (busy) return;

        busy = true;
        flowerScene.classList.remove("show");
        transitionLight.classList.add("show");

        setTimeout(function () {
            catScene.classList.add("show");
            transitionLight.classList.remove("show");
            busy = false;
        }, 850);
    });

    catActions.querySelectorAll(".cat-action").forEach(function (button) {
        button.addEventListener("click", function () {
            const action = button.dataset.action;
            if (catDone.has(action)) return;

            catDone.add(action);
            button.classList.add("done");

            catScene.classList.remove("petting", "fed", "hugged");
            void catScene.offsetWidth;

            if (action === "pet") {
                catScene.classList.add("petting");
                catStatus.textContent = "Мур-мур. Похоже, ему понравилось.";
            }

            if (action === "fish") {
                catScene.classList.add("fed");
                catStatus.textContent = "Рыбка исчезла подозрительно быстро.";
            }

            if (action === "hug") {
                catScene.classList.add("hugged");
                catStatus.textContent = "Вот. Теперь он доволен.";
            }

            if (catDone.size === 3) {
                setTimeout(function () {
                    catScene.classList.add("all-done");
                    catFinal.classList.add("show");
                    catStatus.textContent = "";
                }, 900);
            }
        });
    });
});
