export function getAverageColor(imageElement: HTMLImageElement, ratio: number) {
    const canvas = document.createElement("canvas");

    let height = (canvas.height = imageElement.naturalHeight);
    let width = (canvas.width = imageElement.naturalWidth);

    const context = canvas.getContext("2d");
    context?.drawImage(imageElement, 0, 0);

    let data;
    let length = 0;
    let i = -4,
        count = 0;

    try {
        data = context?.getImageData(0, 0, width, height);
        length = data?.data.length as number;
    } catch (err) {
        console.error(err);
        return {
            R: 0,
            G: 0,
            B: 0,
        };
    }
    let R, G, B;
    R = G = B = 0;

    while ((i += ratio * 4) < length) {
        ++count;
        if (data) {
            R += data.data[i];
            G += data.data[i + 1];
            B += data.data[i + 2];
        }

    }

    R = ~~(R / count);
    G = ~~(G / count);
    B = ~~(B / count);

    return {
        R,
        G,
        B,
    };
}
