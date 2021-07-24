import {CommandName} from "../command/CommandRepository";

const commandNameMap = new Map<string, string>();

export function CommandApi(commandName: CommandName) {
    return function (constructorFn: object) {
        const className = (constructorFn as any).name;
        if (commandNameMap.has(className)) {
            throw new Error('');
        }
        commandNameMap.set(className, commandName);
    }
}

export function initWithAssignCommandName(target: object): string {
    const className = target.constructor.name;
    if (!commandNameMap.has(className)) {
        throw new Error('');
    }
    return commandNameMap.get(className)!;
}
