import {CommandRunner} from "../command/CommandRunner";
import {isCmdOrCtrlKeyPressed} from "../util/KeyUtil";
import autobind from "autobind-decorator";
import {KeyCode} from "../util/keyCode";

export class UndoRedoKeyInitializer {
    private _command: CommandRunner;
    
    constructor(command: CommandRunner) {
        this._command = command;
        this._bindKeyboardEvent();
    }
    
    private _bindKeyboardEvent(): void {
        document.addEventListener('keydown', this._onKeyDown);
    }
    
    @autobind
    private _onKeyDown(event: KeyboardEvent): void {
        if (this._isRedoInput(event)) {
            this._command.redo();
        } else if (this._isUndoInput(event)) {
            this._command.undo();
        }
    }
    
    private _isUndoInput(e: KeyboardEvent): boolean {
        return isCmdOrCtrlKeyPressed(e) && e.key === KeyCode.Z
    }
    
    private _isRedoInput(e: KeyboardEvent): boolean {
        return isCmdOrCtrlKeyPressed(e) && e.key == KeyCode.Z && e.shiftKey
    }
}
