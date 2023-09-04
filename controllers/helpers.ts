import {htmlMarkup} from "../models/elements";
import {waitForBackgroundImage, waitForElement} from "./obsevers";
import {Short, short} from "../Content";

export function $(id: string, selectAll: boolean = false) {
    return selectAll ? (document.querySelectorAll(id) as NodeListOf<Element>) : document.querySelector<Element>(id);
}

function setButtonAsSaved(short: Short, button: HTMLElement) {

    const saveIconPath = (button.querySelector("yt-touch-feedback-shape > svg > path") as SVGElement)

    button.setAttribute("saved-short", "true");
    button.style.backgroundColor = "black";
    saveIconPath.setAttribute('fill', 'white')
}


export function insertSaveButton(buttonContainer: Node, index: number) {

    // Add button
    (buttonContainer as HTMLElement).parentNode?.children[2].insertAdjacentHTML("beforeend", htmlMarkup);

    const saveBtn = document.querySelectorAll("#like-button > button")[index] as HTMLElement
    const playerContainer = document.querySelector(`[id='${index}']> #player-container`) as HTMLElement

    console.log(playerContainer)
    // Set Button State
    if (index === 0) {
        const id = window.location.href.split("/")[4]
        if (short.exists(id)) {
            setButtonAsSaved(short, saveBtn);
            short.read()
            console.log("It does exist!!")
        } else {
            const lengthArr = `This is it ${short.read().length}`;
            console.log(lengthArr)
            console.log(short.exists(id))
            short.read()
            console.log("It does not exist? ")
        }
    }

    if (index) {
        waitForBackgroundImage(playerContainer, (backgroundImage) => {
            const id = backgroundImage.split("/")[4];
            if (short.exists(id)) setButtonAsSaved(short, saveBtn);
        });
    }

}

export function handleButtonClick(button: HTMLElement, icon: SVGElement, isSaved: boolean) {

    const iconPath = icon.querySelector("path")
    // Style Button
    button.setAttribute("saved-short", `${!isSaved}`);
    button.style.backgroundColor = isSaved ? "rgba(0, 0, 0, 0.05)" : "black";
    iconPath?.setAttribute('fill', `${isSaved ? "black" : "white"}`);
}

export function handleSave([title, creator, subscribed, avatar]: string[], isSaved: boolean) {


    const id: string = window.location.href.split("/")[4];
    const date = new Date();
    isSaved ? short.remove(id) : short.add({title, creator, subscribed: subscribed === "Subscribed", id, date, avatar});

}

export function addClickEventToButtons() {
    waitForElement("#shorts-container").then((shortsContainer) => {


        (shortsContainer as HTMLElement).addEventListener("click", function (e: MouseEvent) {

            const saveShortButton = (e.target as HTMLElement).closest(".save-short") as HTMLElement;
            if (!saveShortButton) return

            const saveIcon = (saveShortButton.querySelector("yt-touch-feedback-shape > svg") as SVGElement)

            const isSaved = saveShortButton.getAttribute("saved-short") === "true";
            handleButtonClick(saveShortButton, saveIcon, isSaved)

            //TODO Fix This
            const shortDetailsHTML = (saveShortButton?.parentElement?.parentElement?.parentElement?.querySelector("#overlay") as HTMLElement)
            console.log((shortDetailsHTML.querySelector("img")?.src));
            const shortDetails = [...shortDetailsHTML.innerText.split("\n"), `${(shortDetailsHTML.querySelector("img")?.src)}`];


            console.log(shortDetails)
            handleSave(shortDetails, isSaved)

        })


    });
}