import {Watcher} from "../util/Watcher";

type CanvasModelEvent = 'canvas-image-change';

export class CanvasModel {
    private _watcher: Watcher = new Watcher();
    private _image: HTMLImageElement | null = null;
    
    public setImage(image: HTMLImageElement): void {
        this._image = image;
        this._watcher.emit('canvas-image-change', this._image);
    }
    
    public on(eventName: CanvasModelEvent, listener: any): void {
        this._watcher.on(eventName, listener);
    }
    
    get image(): HTMLImageElement | null {
        return this._image;
    }
}
