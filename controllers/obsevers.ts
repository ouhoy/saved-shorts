// Observe URL Change
import {$} from "./helpers";

export function watchUrl(onShortChange: Function) {
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            onShortChange();
        }
    }).observe(document, {subtree: true, childList: true});

}

export function waitForElement(selector: string) {

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

export function waitForBackgroundImage(element: HTMLElement, callback: (backgroundImage: string) => void) {
    const observer = new MutationObserver((mutationsList, observer) => {
        const backgroundImage = getComputedStyle(element).backgroundImage;
        if (backgroundImage && backgroundImage !== 'none') {
            observer.disconnect();
            callback(backgroundImage);
        }
    });
    observer.observe(element, {attributes: true, attributeFilter: ['style']});
}

