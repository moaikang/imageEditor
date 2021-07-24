import {Watcher} from "../util/Watcher";

export type CanvasModelEvent = 'canvas-image-change' | 'canvas-size-change';

export type CanvasSize = {
    width: number;
    height: number;
};

export class CanvasModel {
    private _watcher: Watcher = new Watcher();
    
    private _canvasWidth: number = 0;
    private _canvasHeight: number = 0;
    private _image: HTMLImageElement | null = null;
    private _x: number | null = null;
    private _y: number | null = null;
    private _width: number | null = null;
    private _height: number | null = null;
    
    public setCanvasSize(canvasSize: CanvasSize): void {
        this._canvasWidth = canvasSize.width;
        this._canvasHeight = canvasSize.height;
        
        this._watcher.emit('canvas-size-change', this._canvasWidth, this._canvasHeight);
    }
    
    public setImage(image: HTMLImageElement): void {
        const {width, height} = this._calculateImgRenderingSize(image);
        
        this._image = image;
        this._x = (this._canvasWidth - width) / 2;
        this._y = (this._canvasHeight - height) / 2;
        this._width = width;
        this._height = height;
        
        this._watcher.emit('canvas-image-change', this._image, this._x, this._y, this._width, this._height);
    }
    
    public clearCanvas(): void {
        this._image = null;
        this._x = null;
        this._y = null;
        this._width = null;
        this._height = null;
    
        this._watcher.emit('canvas-image-change', this._image, this._x, this._y, this._width, this._height);
    }
    
    public on(eventName: CanvasModelEvent, listener: any): void {
        this._watcher.on(eventName, listener);
    }
    
    get image(): HTMLImageElement | null {
        return this._image;
    }
    
    get x(): number | null {
        return this._x;
    }
    
    get y(): number | null {
        return this._y;
    }
    
    get width(): number | null {
        return this._width;
    }
    
    get height(): number | null {
        return this._height;
    }
    
    get canvasWidth(): number {
        return this._canvasWidth;
    }
    
    get canvasHeight(): number {
        return this._canvasHeight;
    }
    
    private _calculateImgRenderingSize(image: HTMLImageElement): { width: number, height: number } {
        const {width, height} = image;
        const diagonal = Math.ceil(Math.sqrt(width * width + height * height));
        let renderingWidth = width;
        let renderingHeight = height;

        if (diagonal > this._canvasHeight) {
            const ratio = this._canvasHeight / diagonal;
            renderingWidth = width * ratio;
            renderingHeight = height * ratio;
        }

        return {width: renderingWidth, height: renderingHeight};
    }
}
