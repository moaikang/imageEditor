import {CanvasModel} from "./Canvas";

export class ModelManager {
    private _canvas: CanvasModel;
    
    constructor() {
        this._canvas = new CanvasModel();
    }
    
    get canvas(): CanvasModel {
        return this._canvas;
    }
}
