import {Button, IButtonProps} from "../component/Button";
import autobind from 'autobind-decorator';
import {AbstractView} from "../infra/AbstractView";
import {LookUpElement} from "../util/LookUpElement";
import {ModelManager} from "../model/ModelManager";
import {CommandRunner} from "../command/CommandRunner";

const buttonProps: IButtonProps = {
    width: 150,
    height: 30,
    text: 'Load',
};

const HTML = `
<div>
  <input type="file" class="blind image-input" accept="image/*">
  <!--button -->
</div>
`

export class LoadButton extends AbstractView {
    protected htmlText: string = HTML;
    private _button: Button;
    private _model: ModelManager;
    private _command: CommandRunner
    
    @LookUpElement('.image-input')
    private _inputEl!: HTMLInputElement;
    
    constructor(model: ModelManager, command: CommandRunner) {
        super();
        this._model = model;
        this._command = command;
        this._button = new Button(buttonProps);
    }
    
    protected onFirstRender(): void {
        super.onFirstRender();
        this._button.render().attachToEl(this.element);
        this._bindEvents();
    }
    
    private _bindEvents(): void {
        this.element.addEventListener('click', this._onClick);
        this._inputEl.addEventListener('change', this._onInputChange);
    }
    
    @autobind
    private _onClick(e: MouseEvent): void {
        this._inputEl.click();
    }
    
    @autobind
    private _onInputChange(e: Event): void {
        const target = e.target as HTMLInputElement;
        const imageFile: File = (target.files as FileList)[0];
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.addEventListener('loadend', this._onFileLoaded);
    }
    
    @autobind
    private _onFileLoaded(e: ProgressEvent<FileReader>): void {
        const fileReader = e.target as FileReader;
        let image = new Image();
        image.src = fileReader.result as string;
        image.addEventListener('load', this._onImageLoaded);
    }
    
    @autobind
    private _onImageLoaded(e: Event): void {
        this._command.run('canvas-image-change', e.target as HTMLImageElement);
    }
}
