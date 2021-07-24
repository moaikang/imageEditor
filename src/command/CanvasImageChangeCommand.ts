import {AbstractCommand} from "./AbstractCommand";
import {CommandApi} from "../util/CommandApiDecorator";
import {IModel} from "../model/ModelManager";

@CommandApi('canvas-image-change')
export class CanvasImageChangeCommand extends AbstractCommand {
    private _beforeImage!: HTMLImageElement | null;
    private _afterImage!: HTMLImageElement;
    
    constructor(model: IModel) {
        super(model);
    }
    
    public do(image: HTMLImageElement): void {
        this._beforeImage = this.model.canvas.image;
        this._afterImage = image;
        this.model.canvas.setImage(image);
    }
    
    public redo(): void {
        this.model.canvas.setImage(this._afterImage);
    }
    
    public undo(): void {
        if (this._beforeImage) {
            this.model.canvas.setImage(this._beforeImage);
        } else {
            this.model.canvas.clearCanvas();
        }
    }
}
