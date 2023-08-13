const saveButtonIcon = `<svg width="17" height="19" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.75 0.374908H13.25C14.4905 0.374908 15.5 1.38441 15.5 2.62491V16.8749C15.4999 17.0153 15.4605 17.1528 15.3861 17.2719C15.3117 17.391 15.2054 17.4868 15.0792 17.5484C14.9532 17.6104 14.8123 17.6356 14.6726 17.6211C14.5329 17.6067 14.4001 17.5531 14.2895 17.4667L8 12.5752L1.7105 17.4667C1.59969 17.5529 1.46691 17.6062 1.32727 17.6207C1.18763 17.6352 1.04674 17.6101 0.920615 17.5485C0.794491 17.4868 0.688204 17.391 0.613846 17.2719C0.539487 17.1529 0.500043 17.0153 0.5 16.8749V2.62491C0.5 1.38441 1.5095 0.374908 2.75 0.374908Z" fill="black"/>
</svg>
`

export const htmlMarkups = ` <button style="
margin-top: 8px;
" class="yt-spec-button-shape-next save-short yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-l yt-spec-button-shape-next--icon-button " saved-short="false"  aria-pressed="false" aria-label="Dislike this video" style=""><div class="yt-spec-button-shape-next__icon" aria-hidden="true"><yt-icon style="width: 24px; height: 24px;">${saveButtonIcon}<svg viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.15895 20.0023C5.32221 20.0023 4.54031 19.586 4.07317 18.8918C3.30492 17.7502 3.31241 16.255 4.09205 15.1211L4.82045 14.0617L4.14538 12.4963C3.74297 11.5632 3.84031 10.4898 4.40399 9.64424L5.50013 8.00004L5.50013 6.00231C5.50013 4.89774 6.39557 4.00231 7.50014 4.00232L20.0001 4.00239C21.1047 4.0024 22.0001 4.89783 22.0001 6.0024L22.0001 19.1736C22.0001 20.0073 21.7396 20.8201 21.2551 21.4985L16.1368 28.6641C15.9224 28.9643 15.5279 29.0747 15.1888 28.9294C13.4238 28.1729 12.4653 26.2504 12.9234 24.3856L14.0001 20.0024L6.15895 20.0023ZM27 18.5001C28.1046 18.5001 29 17.6046 29 16.5001L29 6.00006C29 4.89549 28.1046 4.00006 27 4.00006L24 4.00006L24 18.5001L27 18.5001Z" class="style-scope yt-icon"></path></g></svg><!--css-build:shady--></yt-icon></div><yt-touch-feedback-shape style="border-radius: inherit;"><div class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response" aria-hidden="true"><div class="yt-spec-touch-feedback-shape__stroke" style=""></div><div class="yt-spec-touch-feedback-shape__fill" style=""></div></div></yt-touch-feedback-shape></button>

<div class="save-short yt-spec-button-shape-with-label__label"><span class="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap yt-core-attributed-string--text-alignment-center yt-core-attributed-string--word-wrapping" role="text">Save</span></div>
`;


export const htmlMarkup = `
<button style="margin-top: 8px;" class="yt-spec-button-shape-next save-short yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-l yt-spec-button-shape-next--icon-button " saved-short="false" aria-pressed="false" aria-label="Save this video">

<yt-touch-feedback-shape style="border-radius: inherit;display: flex;justify-content: center;align-items: center;">
 ${saveButtonIcon}
 
</yt-touch-feedback-shape></button>
<div class="save-short yt-spec-button-shape-with-label__label"><span class="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap yt-core-attributed-string--text-alignment-center yt-core-attributed-string--word-wrapping" role="text">Save</span></div>

`