import {stringToHTMLElement} from "../util/DomUtil";
import {initWithLookupElement} from "../util/LookUpElement";

interface ViewLifeCycle {
    render(): this;
    attachToEl(parentEl: HTMLElement, nextSibling?: HTMLElement): this;
    detach(): this;
}

interface ViewHelper {
    show(): void;
    hide(): void;
    toggle(): void;
}

export interface IAbstractView extends ViewLifeCycle, ViewHelper {
    isFirstRendered(): boolean;
}

export abstract class AbstractView implements IAbstractView {
    public element!: HTMLElement;
    protected abstract htmlText: string;
    private _parentEl: HTMLElement | null = null;
    
    constructor() {
    }
    
    public render(): this {
        if (!this.isFirstRendered()) {
            this._lookUpProperty();
            this.onFirstRender();
        }
        this.onRender();
        
        return this;
    }
    
    public attachToEl(parentEl: HTMLElement, nextSiblingEl?: HTMLElement): this {
        if (!this.isFirstRendered()) {
            throw new Error('You should render() before using attachToEl().');
        }
        
        if (nextSiblingEl) {
            if (nextSiblingEl.parentNode !== parentEl) {
                throw new Error('You should use nextSiblingEl that is child of parentEl.')
            }
            parentEl.insertBefore(this.element, nextSiblingEl);
        } else {
            parentEl.insertBefore(this.element, null);
        }
        
        this._parentEl = parentEl;
        this.onAttachToEl();
        
        return this;
    }
    
    public detach(): this {
        this._parentEl!.removeChild(this.element);
        this._parentEl = null;
        this.onDetach();
        
        return this;
    }
    
    public isFirstRendered(): boolean {
        return !!this.element;
    }
    
    public isAttached(): boolean {
        return !!this._parentEl;
    }
    
    public show(): void {
        this.element.style.display = 'block';
    }
    
    public hide(): void {
        this.element.style.display = 'hide';
    }
    
    public toggle(): void {
        const display =  this.element.style.display;
        this.element.style.display = display === 'block' ? 'hide' : 'block';
    }
    
    protected onFirstRender(): void {
    }
    
    protected onRender(): void {
    }
    
    protected onAttachToEl(): void {
    }
    
    protected onDetach(): void {
    }
    
    private _lookUpProperty(): void {
        this.element = stringToHTMLElement(this.htmlText);
        initWithLookupElement(this, this.element);
    }
}
