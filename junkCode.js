// const newEl = document.querySelector("[is-active]").querySelector("#actions")
// newEl.insertAdjacentHTML("beforeend", htmlMarkup);

// newEl.addEventListener("click", function (e) {
//     if (e.target.closest(".save-short")) {
//         console.log("from elm: ", window.location.href);
//     }
// });

function $(id, selectAll = false) {
    return selectAll ? document.querySelectorAll(id) : document.querySelector(id);
}


const saveButton = document.createElement("button")
saveButton.style.marginTop = "8px";

saveButton.classList = "yt-spec-button-shape-next save-short yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-l yt-spec-button-shape-next--icon-button"

saveButton.insertAdjacentHTML("beforeend", `<div class="yt-spec-button-shape-next__icon" aria-hidden="true"><yt-icon style="width: 24px; height: 24px;"><!--css-build:shady--><!--css-build:shady--></yt-icon></div><yt-touch-feedback-shape style="border-radius: inherit;"><div class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response" aria-hidden="true"><div class="yt-spec-touch-feedback-shape__stroke" style=""></div><div class="yt-spec-touch-feedback-shape__fill" style=""></div></div></yt-touch-feedback-shape>`)

function waitForElm(selector) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
}

let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        onUrlChange();
    }
}).observe(document, {subtree: true, childList: true});

waitForElm("#like-button").then((elm) => {
    if (!elm.contains(saveButton)) {
        elm.append(saveButton)
        elm.addEventListener("click", function () {
            console.log("from elm: ", window.location.href);
        })
    }
});

function onUrlChange() {

    const shortsUrl = location.href.split("/")[3];

    if (shortsUrl === "shorts") {


        let myEl = document.querySelectorAll("[is-active]")[0]
        if (!myEl) return;


        if (!myEl.contains(saveButton)) {
            console.log("Button added!")
            myEl
                .querySelector("#like-button")
                .append(saveButton)

            myEl.addEventListener("click", function (e) {
                if (e.target.closest(".save-short")) {
                    console.log("from elm: ", window.location.href);
                }
            });
        } else {
            console.log(`contains`)
        }


    }
}
