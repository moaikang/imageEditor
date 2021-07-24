import {CanvasModel} from "./Canvas";

export interface IModel {
    canvas: CanvasModel;
}

export class ModelManager implements IModel{
    private _canvas: CanvasModel;
    
    constructor() {
        this._canvas = new CanvasModel();
    }
    
    get canvas(): CanvasModel {
        return this._canvas;
    }
}
