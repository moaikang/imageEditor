export function stringToHTMLElement(str: string): HTMLElement {
    const wrapperEl: HTMLDivElement = document.createElement('div');
    wrapperEl.innerHTML = str;
    
    if (wrapperEl.childElementCount !== 1) {
        throw new Error('String Format Error. String MUST have one node.');
    }
    
    return wrapperEl.firstElementChild as HTMLElement;
}
