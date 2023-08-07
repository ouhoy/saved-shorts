import {htmlMarkup, savedElement} from "./models/elements";
import {$, addUniqueObject, removeUniqueObject, checkForId} from "./controllers/helpers";


const savedShorts: ShortDetails[] = [];

chrome.storage.local.get(["savedShorts"]).then((result) => {

    console.log("SavedShorts[] Before: ", savedShorts)
    console.log("Local Storage: ", result.savedShorts)
    savedShorts.push(...result.savedShorts);
    console.log("SavedShorts[] After: ", savedShorts)

});

function waitForElement(selector: string) {

    return new Promise((resolve) => {

        if ($(selector)) return resolve($(selector));

        const observer = new MutationObserver((mutations) => {

            if ($(selector)) {
                resolve($(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

    });
}

function waitForBackgroundImage(element: HTMLElement, callback: (backgroundImage: string) => void) {
    const observer = new MutationObserver((mutationsList, observer) => {
        const backgroundImage = getComputedStyle(element).backgroundImage;
        if (backgroundImage && backgroundImage !== 'none') {
            observer.disconnect();
            callback(backgroundImage);
        }
    });
    observer.observe(element, {attributes: true, attributeFilter: ['style']});
}


// Observe URL Change
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        onShortChange();
    }
}).observe(document, {subtree: true, childList: true});

// Render Buttons on First Load
let initialLength: number;
waitForElement("#like-button").then(() => {

    const commentsButtons = ($("#comments-button", true) as NodeList)
    initialLength = commentsButtons.length;
    console.log(initialLength);
    commentsButtons.forEach(async (buttonContainer, index) => {
        (buttonContainer as HTMLElement).parentNode?.children[2].insertAdjacentHTML("beforeend", htmlMarkup);

        const saveShortButton = document.querySelectorAll("#like-button > button")[index] as HTMLElement

        if (index === 0) {
            const id = window.location.href.split("/")[4]
            if (checkForId(savedShorts, id)) {
                saveShortButton.setAttribute("saved-short", "true");
                if (saveShortButton.nextElementSibling !== null) {
                    saveShortButton.nextElementSibling.innerHTML = savedElement;
                }
                saveShortButton.style.backgroundColor = "black";
            }
        }
        if (index) {
            const myElement = document.querySelector(`[id='${index}']> #player-container`) as HTMLElement


            waitForBackgroundImage(myElement, (backgroundImage) => {
                const id = backgroundImage.split("/")[4];
                if (checkForId(savedShorts, id)) {
                    saveShortButton.setAttribute("saved-short", "true");
                    if (saveShortButton.nextElementSibling !== null) {
                        saveShortButton.nextElementSibling.innerHTML = savedElement;
                    }
                    saveShortButton.style.backgroundColor = "black";
                }

            });
        }
    });


});


// Add Click Event To Buttons
waitForElement("#shorts-container").then((shortsContainer) => {

    // @ts-ignore
    shortsContainer.addEventListener("click", function (e) {

        const saveShortButton = e.target.closest(".save-short") as HTMLElement;


        // TODO Make Its Own Function ^^

        if (saveShortButton) {
            //TODO Fix This
            const shortDetails = (saveShortButton?.parentElement?.parentElement?.parentElement?.querySelector("#overlay") as HTMLElement).innerText.split("\n")
            const title: string = shortDetails[0];
            const creator: string = shortDetails[1];
            const subscribed: boolean = shortDetails[2] === "Subscribed";
            const id: string = window.location.href.split("/")[4];
            const date = new Date();

            const isSaved = saveShortButton.getAttribute("saved-short") === "true";

            if (!isSaved) {
                console.log("Adding!")
                saveShortButton.setAttribute("saved-short", "true");
                (saveShortButton.nextElementSibling as HTMLElement).innerHTML = savedElement;
                saveShortButton.style.backgroundColor = "black";

                addUniqueObject(savedShorts, {title, creator, subscribed, id, date})

            }
            if (isSaved) {
                console.log("Removing!")
                saveShortButton.setAttribute("saved-short", "false");
                (saveShortButton.nextElementSibling as HTMLElement).innerHTML = savedElement.replace("Saved", "Save");
                saveShortButton.style.backgroundColor = "rgba(0, 0, 0, 0.05)";

                //TODO Remove the URL from the array object
                removeUniqueObject(savedShorts, id)
            }


            console.log(savedShorts)


        }


    })


});


function onShortChange() {


    // Watch Rendered Shorts Length
    const newLength = ($("#comments-button", true) as NodeList).length
    if (initialLength === newLength) return;


    // Render New Save Shorts Button Elements
    Array.from(document.querySelectorAll("#comments-button")).slice(initialLength, newLength)
        .forEach((buttonContainer, index) => {
            (buttonContainer as HTMLElement).parentNode?.children[2].insertAdjacentHTML("beforeend", htmlMarkup)

            const myElement = document.querySelector(`[id='${index}']> #player-container`) as HTMLElement
            waitForBackgroundImage(myElement, (backgroundImage) => {
                console.log('Background image is now ready:', backgroundImage);
                // Perform your action here with the backgroundImage
            });
        })

    initialLength = newLength;


}



