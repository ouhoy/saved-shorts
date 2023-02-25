function $(id, selectAll = false) {
    return selectAll ? document.querySelectorAll(id) : document.querySelector(id);
}

let myBtns = $("#like-button");
let currentShort = 0;
const htmlMarkup = ` <button style="
margin-top: 8px;
" class="yt-spec-button-shape-next save-short yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-l yt-spec-button-shape-next--icon-button " aria-pressed="false" aria-label="Dislike this video" style=""><div class="yt-spec-button-shape-next__icon" aria-hidden="true"><yt-icon style="width: 24px; height: 24px;"><svg viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.15895 20.0023C5.32221 20.0023 4.54031 19.586 4.07317 18.8918C3.30492 17.7502 3.31241 16.255 4.09205 15.1211L4.82045 14.0617L4.14538 12.4963C3.74297 11.5632 3.84031 10.4898 4.40399 9.64424L5.50013 8.00004L5.50013 6.00231C5.50013 4.89774 6.39557 4.00231 7.50014 4.00232L20.0001 4.00239C21.1047 4.0024 22.0001 4.89783 22.0001 6.0024L22.0001 19.1736C22.0001 20.0073 21.7396 20.8201 21.2551 21.4985L16.1368 28.6641C15.9224 28.9643 15.5279 29.0747 15.1888 28.9294C13.4238 28.1729 12.4653 26.2504 12.9234 24.3856L14.0001 20.0024L6.15895 20.0023ZM27 18.5001C28.1046 18.5001 29 17.6046 29 16.5001L29 6.00006C29 4.89549 28.1046 4.00006 27 4.00006L24 4.00006L24 18.5001L27 18.5001Z" class="style-scope yt-icon"></path></g></svg><!--css-build:shady--></yt-icon></div><yt-touch-feedback-shape style="border-radius: inherit;"><div class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response" aria-hidden="true"><div class="yt-spec-touch-feedback-shape__stroke" style=""></div><div class="yt-spec-touch-feedback-shape__fill" style=""></div></div></yt-touch-feedback-shape></button>

<div class="save-short yt-spec-button-shape-with-label__label"><span class="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap yt-core-attributed-string--text-alignment-center yt-core-attributed-string--word-wrapping" role="text">Save</span></div>
`;

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
    elm.insertAdjacentHTML("beforeend", htmlMarkup);
    elm.addEventListener("click", function () {
        console.log("from elm: ", window.location.href);
    });
});

function onUrlChange() {
    const shortsUrl = location.href.split("/")[3];
    if (shortsUrl == "shorts") {
        console.log("Current short", currentShort);

        console.log("Current short++", currentShort);
        if (currentShort == 0) {
            waitForElm("#like-button").then((elm) => {
                elm.insertAdjacentHTML("beforeend", htmlMarkup);
                elm.addEventListener("click", function () {
                    console.log("from elm: ", window.location.href);
                });
            });
            currentShort++;
        } else {
            let myEl = document.getElementById(`${currentShort}`);
            console.log(myEl);
            if (myEl) {
                console.log(myEl);
                const newEl = document.querySelectorAll("[is-active]")[1].querySelector("#right").querySelector("#actions")
                newEl.insertAdjacentHTML("beforeend", htmlMarkup);

                myEl
                    .querySelector("#like-button")
                    .insertAdjacentHTML("beforeend", htmlMarkup);
                myEl.addEventListener("click", function (e) {
                    if (e.target.closest(".save-short")) {
                        console.log("from elm: ", window.location.href);
                    }
                });
                newEl.addEventListener("click", function (e) {
                    if (e.target.closest(".save-short")) {
                        console.log("from elm: ", window.location.href);
                    }
                });
            }
            currentShort++;
        }
    } else {
        currentShort = 0;
    }
}
