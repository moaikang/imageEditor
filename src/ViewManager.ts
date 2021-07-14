import {ModelManager} from "./model/ModelManager";
import {CanvasRoot} from "./canvas/CanvasRoot";
import {HeaderRoot} from "./header/HeaderRoot";
import {PersisterRoot} from "./persister/PersisterRoot";
import {MenuBarRoot} from "./menuBar/MenuBarRoot";

export class ViewManager {
    private _model: ModelManager;
    
    private _editorWrapperEl: HTMLElement;
    private _header: HeaderRoot;
    private _persister: PersisterRoot;
    private _canvas: CanvasRoot;
    private _menuBar: MenuBarRoot;
    
    constructor(model: ModelManager) {
        this._model = model;
        this._editorWrapperEl = this._buildEditorWrapperEl();
        
        this._header = new HeaderRoot();
        this._persister = new PersisterRoot(this._model);
        this._canvas = new CanvasRoot(this._model);
        this._menuBar = new MenuBarRoot();
    }
    
    public attach(): this {
        this._header.attachToEl(this._editorWrapperEl);
        this._persister.attachToEl(this._editorWrapperEl);
        this._canvas.attachToEl(this._editorWrapperEl);
        this._menuBar.attachToEl(this._editorWrapperEl);
        return this;
    }
    
    public render(): this {
        this._header.render();
        this._persister.render();
        this._canvas.render();
        this._menuBar.render();
        return this;
    }
    
    private _buildEditorWrapperEl(): HTMLElement {
        const editorWrapperEl = document.createElement('div');
        editorWrapperEl.setAttribute('id', 'editor-wrapper');
        document.querySelector('#root')!.appendChild(editorWrapperEl);
        return editorWrapperEl;
    }
}
