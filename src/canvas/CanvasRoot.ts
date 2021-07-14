import {ModelManager} from "../model/ModelManager";
import {AbstractView} from "../infra/AbstractView";
import {LookUpElement} from "../util/LookupElement";
import autobind from "autobind-decorator";
import {px} from "../util/CSSUtil";
import {Palette} from "../util/Palette";

const HTML = `
<section class="canvas-wrapper">
  <canvas id="canvas"></canvas>
</section>
`

const CANVAS_WIDTH = 1050;
const CANVAS_HEIGHT = 370;

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
        this._initCanvas();
        this._bindEvents();
    }
    
    private _initCanvas(): void {
        this._ctx = this._canvasEl.getContext('2d')!;
        this._canvasEl.setAttribute('width', px(CANVAS_WIDTH));
        this._canvasEl.setAttribute('height',  px(CANVAS_HEIGHT));
        this._fillCanvasBlack();
    }
    
    private _bindEvents(): void {
        this._model.canvas.on('canvas-image-change', this._onCanvasImageChange);
    }
    
    @autobind
    private _onCanvasImageChange(image: HTMLImageElement): void {
        const {width, height} = this._getImgRenderingSize(image);
        this._fillCanvasBlack();
        this._ctx.drawImage(image, 0, 0, image.width, image.height, (CANVAS_WIDTH - width) / 2,(CANVAS_HEIGHT - height) / 2, width, height);
    }
    
    private _getImgRenderingSize(image: HTMLImageElement): {width: number, height: number} {
        const {width, height} = image;
        const diagonal = Math.ceil(Math.sqrt(width * width + height * height));
        let renderingWidth = width;
        let renderingHeight = height;
    
        if (diagonal > CANVAS_HEIGHT) {
            const ratio = CANVAS_HEIGHT / diagonal;
            renderingWidth = width * ratio;
            renderingHeight = height * ratio;
        }
        
        return {width: renderingWidth, height: renderingHeight};
    }
    
    private _fillCanvasBlack(): void {
        this._ctx.fillStyle = Palette.BLACK;
        this._ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
