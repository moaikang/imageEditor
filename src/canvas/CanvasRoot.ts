import {ModelManager} from "../model/ModelManager";
import {AbstractView} from "../infra/AbstractView";
import {LookUpElement} from "../util/LookupElement";
import autobind from "autobind-decorator";

const HTML = `
<section class="canvas-wrapper">
  <canvas id="canvas"></canvas>
</section>
`

export class CanvasRoot extends AbstractView {
    protected htmlText: string = HTML;
    
    private _model: ModelManager;
    
    @LookUpElement('#canvas')
    private _canvasEl!: HTMLCanvasElement;
    
    private _ctx!: CanvasRenderingContext2D;
    
    constructor(model: ModelManager) {
        super();
        this._model = model;
    }
    
    protected onFirstRender() {
        super.onFirstRender();
        this._ctx = this._canvasEl.getContext('2d')!;
        this._bindEvents();
    }
    
    private _bindEvents(): void {
        this._model.canvas.on('canvas-image-change', this._onCanvasImageChange);
    }
    
    @autobind
    private _onCanvasImageChange(image: HTMLImageElement): void {
        this._ctx.drawImage(image, 0, 0);
    }
}
