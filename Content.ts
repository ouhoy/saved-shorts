import {htmlMarkup} from "./models/elements";
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

function setButtonAsSaved(short: Short, button: HTMLElement) {

    const saveIconPath = (button.querySelector("yt-touch-feedback-shape > svg > path") as SVGElement)

    button.setAttribute("saved-short", "true");
    button.style.backgroundColor = "black";
    saveIconPath.setAttribute('fill', 'white')
}

function insertSaveButton(buttonContainer: Node, index: number) {

    // Add button
    (buttonContainer as HTMLElement).parentNode?.children[2].insertAdjacentHTML("beforeend", htmlMarkup);

    const saveBtn = document.querySelectorAll("#like-button > button")[index] as HTMLElement
    const playerContainer = document.querySelector(`[id='${index}']> #player-container`) as HTMLElement

    // Set Button State
    if (index === 0) {
        const id = window.location.href.split("/")[4]
        if (short.exists(id)) setButtonAsSaved(short, saveBtn);
    }

    if (index) {
        waitForBackgroundImage(playerContainer, (backgroundImage) => {
            const id = backgroundImage.split("/")[4];
            if (short.exists(id)) setButtonAsSaved(short, saveBtn);
        });
    }

}

function handleButtonClick(button: HTMLElement, icon: SVGElement, isSaved: boolean) {

    const iconPath = icon.querySelector("path")
    // Style Button
    button.setAttribute("saved-short", `${!isSaved}`);
    button.style.backgroundColor = isSaved ? "rgba(0, 0, 0, 0.05)" : "black";
    iconPath?.setAttribute('fill', `${isSaved ? "black" : "white"}`);
}

function handleSave([title, creator, subscribed]: string[], isSaved: boolean) {


    const id: string = window.location.href.split("/")[4];
    const date = new Date();
    isSaved ? short.remove(id) : short.add({title, creator, subscribed: subscribed === "Subscribed", id, date});

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

            insertSaveButton(buttonContainer, index);

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

        const saveIcon = (saveShortButton.querySelector("yt-touch-feedback-shape > svg") as SVGElement)

        const isSaved = saveShortButton.getAttribute("saved-short") === "true";
        handleButtonClick(saveShortButton, saveIcon, isSaved)

        //TODO Fix This
        const shortDetails = (saveShortButton?.parentElement?.parentElement?.parentElement?.querySelector("#overlay") as HTMLElement).innerText.split("\n");
        handleSave(shortDetails, isSaved)

    })


});

function onShortChange() {

    if (location.href.split("/")[3] !== "shorts") return;

    if (initialLength === 0) return onFirstLoad();

    // Watch Rendered Shorts Length
    const newLength = ($("#comments-button", true) as NodeList).length

    if (initialLength === newLength && initialLength !== 0) return;

    const commentsButtons = Array.from(document.querySelectorAll("#comments-button")).slice(initialLength, newLength)

    // Render New Save Shorts Button Elements
    commentsButtons.forEach((buttonContainer, index) => {
        insertSaveButton(buttonContainer, index);
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
