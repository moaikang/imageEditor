import {CommandHistory} from "./CommandHistory";
import {IModel} from "../model/ModelManager";
import {CommandName, commandRepository} from "./CommandRepository";
import {ICommand} from "./AbstractCommand";

export class CommandRunner {
    private readonly _model: IModel
    private _history: CommandHistory
    
    constructor(model: IModel, history: CommandHistory) {
        this._model = model;
        this._history = history;
    }
    
    public run(commandName: CommandName, ...args: any[]) {
        const commandConstructor = commandRepository[commandName];
        const command = new commandConstructor(this._model) as ICommand;
        command.do(...args);
        this._history.pushUndoStack(command);
    }
    
    public undo(): void {
        const lastCommand = this._history.popUndoStack();
        if (lastCommand) {
            lastCommand.undo();
            this._history.pushRedoStack(lastCommand);
        }
    }
    
    public redo(): void {
        const lastCommand = this._history.popRedoStack();
        if (lastCommand) {
            lastCommand.redo();
            this._history.pushUndoStack(lastCommand);
        }
    }
}
