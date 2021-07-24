import {IModel} from "../model/ModelManager";
import {Fn} from "../util/TypeUtil";
import {initWithAssignCommandName} from "../util/CommandApiDecorator";

let cnt = 0;

function getNextCommandId(): string {
    return `COMMAND_${cnt++}`;
}

export interface ICommand {
    id: string;
    name: string;
    do: Fn;
    undo: Fn;
    redo: Fn;
}

export abstract class AbstractCommand implements ICommand {
    protected model: IModel;
    
    private _id: string;
    private _name: string;
    
    protected constructor(model: IModel) {
        this.model = model;
        this._id = getNextCommandId();
        this._name = initWithAssignCommandName(this);
    }
    
    public abstract do(...args: any[]): void;
    public abstract undo(): void;
    public abstract redo(): void;
    
    get id(): string {
        return this._id;
    }
    
    get name(): string {
        return this._name;
    }
}
