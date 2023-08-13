import {htmlMarkup, inActiveSaveButtonSpan, activeSaveButtonSpan} from "./models/elements";
import {$} from "./controllers/helpers";
import {watchUrl, waitForElement, waitForBackgroundImage} from "./controllers/obsevers";


class Short {
    private shorts: ShortDetails[] = [];

    constructor() {
        this.fillShortsArray();
    }

    add(short: ShortDetails) {
        if (this.exists(short.id)) return
        this.shorts.push(short)
        this.refresh()
    };

    read(id: ShortDetails["id"]): ShortDetails | boolean {

        // If !id return this.shorts object as ShortDetails[]
        const index = this.shorts.findIndex((obj: ShortDetails) => obj.id === id);
        return this.exists(id) ? this.shorts[index] : false

    }

    remove(id: ShortDetails["id"]) {
        const index = this.shorts.findIndex((obj: ShortDetails) => obj.id === id);
        if (index !== -1) {
            this.shorts.splice(index, 1);
            this.refresh()

        }
    }

    exists(id: ShortDetails["id"]): boolean | number {
        const index = this.shorts.findIndex((obj: ShortDetails) => obj.id === id);
        return index !== -1;
    }

    private refresh() {
        chrome.storage.local.set({savedShorts: this.shorts}).then(() => {
            console.table(this.shorts)
        });
    }

    private fillShortsArray() {
        chrome.storage.local.get(["savedShorts"]).then((result) => {
            this.shorts.push(...result.savedShorts);
        });
    }
}

const short = new Short();

function setButtonAsSaved(short: Short, button: HTMLElement, span: HTMLElement) {

    const saveIconPath = (button.querySelector("yt-touch-feedback-shape > svg > path") as SVGElement)

    button.setAttribute("saved-short", "true");
    span.innerHTML = inActiveSaveButtonSpan;
    button.style.backgroundColor = "black";
    saveIconPath.setAttribute('fill', 'white')
}

function insertSaveButton(buttonContainer: Node, saveBtn: HTMLElement, index: number) {

    // Add button
    (buttonContainer as HTMLElement).parentNode?.children[2].insertAdjacentHTML("beforeend", htmlMarkup);

    const saveShortButtonTitle = (saveBtn.nextElementSibling as HTMLElement)
    const playerContainer = document.querySelector(`[id='${index}']> #player-container`) as HTMLElement


    // Set Button State
    if (index === 0) {
        const id = window.location.href.split("/")[4]
        if (short.exists(id)) setButtonAsSaved(short, saveBtn, saveShortButtonTitle);
    }

    if (index) {
        waitForBackgroundImage(playerContainer, (backgroundImage) => {
            const id = backgroundImage.split("/")[4];
            if (short.exists(id)) setButtonAsSaved(short, saveBtn, saveShortButtonTitle);
        });
    }

}

// Render Buttons on First Load
let initialLength = 0;

function onFirstLoad() {
    waitForElement("#like-button").then(() => {

        const commentsButtons = ($("#comments-button", true) as NodeList)
        initialLength = commentsButtons.length;

        commentsButtons.forEach(async (buttonContainer, index) => {


            let saveShortButton = document.querySelectorAll("#like-button > button")[index] as HTMLElement

            if (saveShortButton) return;

            // Add button
            (buttonContainer as HTMLElement).parentNode?.children[2].insertAdjacentHTML("beforeend", htmlMarkup);

            saveShortButton = document.querySelectorAll("#like-button > button")[index] as HTMLElement

            const saveShortButtonTitle = (saveShortButton.nextElementSibling as HTMLElement)
            const playerContainer = document.querySelector(`[id='${index}']> #player-container`) as HTMLElement


            // Set Button State
            if (index === 0) {
                const id = window.location.href.split("/")[4]
                if (short.exists(id)) setButtonAsSaved(short, saveShortButton, saveShortButtonTitle);
            }

            if (index) {
                waitForBackgroundImage(playerContainer, (backgroundImage) => {
                    const id = backgroundImage.split("/")[4];
                    if (short.exists(id)) setButtonAsSaved(short, saveShortButton, saveShortButtonTitle);
                });
            }


        });


    });
}

onFirstLoad()


// Add Click Event To Buttons
waitForElement("#shorts-container").then((shortsContainer) => {

    // @ts-ignore
    shortsContainer.addEventListener("click", function (e) {

        const saveShortButton = e.target.closest(".save-short") as HTMLElement;
        if (!saveShortButton) return


        const saveIconPath = (saveShortButton.querySelector("yt-touch-feedback-shape > svg > path") as SVGElement)
        const saveShortButtonTitle = (saveShortButton.nextElementSibling as HTMLElement)

        // TODO Make Its Own Function ^^


        //TODO Fix This
        const shortDetails = (saveShortButton?.parentElement?.parentElement?.parentElement?.querySelector("#overlay") as HTMLElement).innerText.split("\n")
        const title: string = shortDetails[0];
        const creator: string = shortDetails[1];
        const subscribed: boolean = shortDetails[2] === "Subscribed";
        const id: string = window.location.href.split("/")[4];
        const date = new Date();

        const isSaved = saveShortButton.getAttribute("saved-short") === "true";

        // Style Button
        saveShortButton.setAttribute("saved-short", `${!isSaved}`);
        saveShortButton.style.backgroundColor = isSaved ? "rgba(0, 0, 0, 0.05)" : "black";
        saveShortButtonTitle.innerHTML = isSaved ? activeSaveButtonSpan : inActiveSaveButtonSpan;
        saveIconPath.setAttribute('fill', `${isSaved ? "black" : "white"}`);

        isSaved ? short.remove(id) : short.add({title, creator, subscribed, id, date});


    })


});


function onShortChange() {

    if (location.href.split("/")[3] !== "shorts") return;

    if (initialLength === 0) {
        onFirstLoad();
        return;
    }

    // Watch Rendered Shorts Length
    const newLength = ($("#comments-button", true) as NodeList).length
    console.log(initialLength, "Before")
    if (initialLength === newLength && initialLength !== 0) return;

    console.log(initialLength, "After")

    // Render New Save Shorts Button Elements
    Array.from(document.querySelectorAll("#comments-button")).slice(initialLength, newLength)
        .forEach((buttonContainer, index) => {


            // insertSaveButton(buttonContainer, saveShortButton, index);
            // Add Button
            (buttonContainer as HTMLElement).parentNode?.children[2].insertAdjacentHTML("beforeend", htmlMarkup)

            const saveShortButton = document.querySelectorAll("#like-button > button")[index] as HTMLElement
            const saveShortButtonTitle = (saveShortButton.nextElementSibling as HTMLElement)
            const playerContainer = document.querySelector(`[id='${index}']> #player-container`) as HTMLElement

            waitForBackgroundImage(playerContainer, (backgroundImage) => {
                const id = backgroundImage.split("/")[4];
                if (short.exists(id)) setButtonAsSaved(short, saveShortButton, saveShortButtonTitle);
            });
        })

    initialLength = newLength;


}

watchUrl(() => {

    if (location.href.split("/")[3] !== "shorts") {

        console.log(location.href)
        initialLength = 0;

    } else {
        console.log("Good Good hh!");
    }
})

watchUrl(onShortChange)
