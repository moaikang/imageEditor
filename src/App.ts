import {ModelManager} from "./model/ModelManager";
import {ViewManager} from "./ViewManager";

export class App {
    private _root: HTMLElement;
    private _model!: ModelManager;
    private _view!: ViewManager;
    
    constructor(root: HTMLElement) {
        this._root = root;
        this._init();
    }
    
    private async _init(): Promise<void> {
        this._model = new ModelManager();
        this._view = new ViewManager(this._model);
        
        this._view.render().attach();
    }
}
