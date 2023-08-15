const body = document.body


chrome.storage.local.get(["savedShorts"]).then((result) => {
    result.savedShorts.forEach((short: ShortDetails) => {
        const shortHTML = `<iframe width="370" height="658" src="https://www.youtube.com/embed/${short.id}" title="${short.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

        body.insertAdjacentHTML("beforeend", shortHTML)
    })
});