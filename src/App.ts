import {ModelManager} from "./model/ModelManager";
import {ViewManager} from "./ViewManager";
import {CommandRunner} from "./command/CommandRunner";
import {CommandHistory} from "./command/CommandHistory";
import {UndoRedoKeyInitializer} from "./infra/UndoRedoKeyInitializer";

export class App {
    private _root: HTMLElement;
    private _model!: ModelManager;
    private _view!: ViewManager;
    private _commandHistory!: CommandHistory;
    private _command!: CommandRunner;
    
    constructor(root: HTMLElement) {
        this._root = root;
        this._init();
    }
    
    private async _init(): Promise<void> {
        this._model = new ModelManager();
        this._commandHistory = new CommandHistory();
        this._command = new CommandRunner(this._model, this._commandHistory);
        this._view = new ViewManager(this._model, this._command);
        this._view.render().attach();
        new UndoRedoKeyInitializer(this._command);
    }
}
