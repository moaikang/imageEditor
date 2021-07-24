import {ModelManager} from "../../model/ModelManager";
import {CommandRunner} from "../../command/CommandRunner";
import {CommandHistory} from "../../command/CommandHistory";
import {ICommand} from "../../command/AbstractCommand";

class TestCommand implements ICommand {
    private _trace: string [] = [];
    
    constructor(model: ModelManager) {
    }
    
    do(): void {
        this._trace.push('do');
    }
    
    redo(): void {
        this.do();
    }
    
    undo(): void {
        if (this._trace.length === 0) {
            return;
        }
        this._trace.pop();
    }
    
    get trace(): string[] {
        return this._trace;
    }
    
    get id(): string {
        return '';
    }
    
    get name(): string {
        return '';
    }
}

describe('Command Runner', () => {
    let model: ModelManager;
    let commandHistory: CommandHistory;
    let commandRunner: CommandRunner;
    let testCommand: TestCommand;
    let mockedFn: any;
    
    beforeEach(() => {
        model = new ModelManager();
        commandHistory = new CommandHistory();
        commandRunner = new CommandRunner(model, commandHistory);
        testCommand = new TestCommand(model);
        
        function mockRun(this: any, commandName: string, ...args: any[]) {
            const command = testCommand as ICommand;
            command.do(...args);
            this._history.pushUndoStack(command);
        }
        
        mockedFn = CommandRunner.prototype.run = jest.fn().mockImplementation(mockRun.bind(commandRunner))
    })
    
    it('아무것도 안한 상태에서 undo를 실행하면 아무일도 일어나지 않는다.', () => {
        // given
        // when
        commandRunner.undo();
        // then
        expect(testCommand.trace.length).toBe(0);
    });
    
    it('커맨드를 실행한 상태에서 undo를 실행하면 커맨드를 실행하기 전 상태로 돌아간다.', () => {
        // given
        commandRunner.run('test' as any);
        
        // when
        commandRunner.undo();
        
        // then
        expect(testCommand.trace.length).toBe(0);
    });
    
    it('커맨드를 실행한 상태에서 undo, redo를 차례로 실행하면 커맨드를 실행한 상태로 유지된다.', () => {
        // given (beforeEach)
        commandRunner.run('test' as any);
        
        // when
        commandRunner.undo();
        commandRunner.redo();
        
        // then
        expect(testCommand.trace.length).toBe(1);
    });
})
