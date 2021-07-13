import {ModelManager} from "../model/ModelManager";
import {AbstractView} from "../infra/AbstractView";
import {LookUpElement} from "../util/LookupElement";

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
        this._loadDefaultImage();
    }
    
    private _loadDefaultImage(): void {
        const defaultImage = new Image();
        defaultImage.src = 'https://d3rr2gvhjw0wwy.cloudfront.net/uploads/activity_headers/134196/2000x2000-0-70-26479c61882c4ffeed3d976caf233de2.jpg';
        
        defaultImage.addEventListener('load', () => {
            const canvasBoundingRect = this._canvasEl.getBoundingClientRect();
            const ratioOfImg = defaultImage.height / defaultImage.width;
            const canvasWidth = canvasBoundingRect.width < defaultImage.width ? canvasBoundingRect.width : defaultImage.width;
            // this._ctx.drawImage(defaultImage, 0, 0, canvasWidth, canvasWidth * ratioOfImg);
            defaultImage.width = 50;
            defaultImage.height = 50;
            this._ctx.drawImage(defaultImage, 0, 0);
        })
    }
}
