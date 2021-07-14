import {ModelManager} from "../model/ModelManager";
import {AbstractView} from "../infra/AbstractView";
import {LookUpElement} from "../util/LookupElement";
import autobind from "autobind-decorator";
import {px} from "../util/CSSUtil";
import {Palette} from "../util/Palette"

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
        this._bindEvents();
    }
    
    protected onAttachToEl() {
        super.onAttachToEl();
        this._initCanvas();
    }
    
    private _bindEvents(): void {
        this._model.canvas.on('canvas-image-change', this._onCanvasImageChange);
        this._model.canvas.on('canvas-size-change', this._onCanvasSizeChange);
    }
    
    private _initCanvas(): void {
        this._ctx = this._canvasEl.getContext('2d')!;
        
        const wrapperBoundingRect = this.element.getBoundingClientRect();
        this._model.canvas.setCanvasSize({
            width: wrapperBoundingRect.width,
            height: wrapperBoundingRect.height,
        });
        this._fillBackground();
    }
    
    @autobind
    private _onCanvasSizeChange(width: number, height: number): void {
        this._canvasEl.setAttribute('width', px(width));
        this._canvasEl.setAttribute('height', px(height));
    }
    
    @autobind
    private _onCanvasImageChange(image: HTMLImageElement, x: number, y: number, width: number, height: number): void {
        this._fillBackground();
        this._ctx.drawImage(image, 0, 0, image.width, image.height, x, y, width, height);
    }

    private _fillBackground(): void {
        this._ctx.fillStyle = Palette.MODAL_BACKGROUND_COLOR;
        this._ctx.fillRect(0, 0, this._model.canvas.canvasWidth, this._model.canvas.canvasHeight);
    }
}
