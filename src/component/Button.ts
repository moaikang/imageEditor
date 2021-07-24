import {AbstractView} from "../infra/AbstractView";
import {px} from "../util/CSSUtil";

export interface IButtonProps {
    width: number;
    height: number;
    text: string;
}

const HTML = `
<button class="editor-btn"></button>
`;

export class Button extends AbstractView {
    protected htmlText: string = HTML;
    private _buttonProps: IButtonProps;
    
    constructor(props: IButtonProps) {
        super();
        this._buttonProps = props;
    }
    
    protected onFirstRender() {
        super.onFirstRender();
        this._setAttribute()
    }
    
    public disable(): void {
        this.element.classList.remove('editor-btn');
        this.element.classList.add('editor-btn-disable');
    }
    
    public enable(): void {
        this.element.classList.remove('editor-btn-disable');
        this.element.classList.add('editor-btn');
    }
    
    public isEnabled(): boolean {
        return this.element.classList.contains('editor-btn');
    }
    
    private _setAttribute(): void {
        this.element.style.width = px(this._buttonProps.width);
        this.element.style.height = px(this._buttonProps.height);
        this.element.textContent = this._buttonProps.text;
    }
}
