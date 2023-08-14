import {waitForElement} from "../controllers/obsevers";
import {$,insertSaveButton} from "../controllers/helpers";


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
