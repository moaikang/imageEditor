import {ICommand} from "./AbstractCommand";

export class CommandHistory {
    private _undoStack: ICommand[] = [];
    private _redoStack: ICommand[] = [];
    
    public pushUndoStack(command: ICommand): void {
        this._undoStack.push(command);
    }
    
    public popUndoStack(): ICommand | null {
        return this._pop(this._undoStack);
    }
    
    public pushRedoStack(command: ICommand): void {
        this._redoStack.push(command);
    }
    
    public popRedoStack(): ICommand | null {
       return this._pop(this._redoStack);
    }
    
    private _pop(stack: ICommand[]): ICommand | null {
        if (stack.length === 0) {
            return null;
        } else {
            return stack.pop()!;
        }
    }
}
