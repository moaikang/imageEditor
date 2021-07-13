type WatchListener = (...args: any) => any;

interface IWatch {
    on(eventName: string, listener: WatchListener): void;
    removeListener(eventName: string, listener: WatchListener): void;
    emit(eventName: string, ...args: any[]): void;
}

export class Watcher implements IWatch {
    private _watcher: Map<string, WatchListener[]> = new Map<string, WatchListener[]>();
    
    public on(eventName: string, listener: any): void {
        const listeners = this._watcher.get(eventName);
        if (listeners) {
            this._watcher.set(eventName, [...listeners, listener]);
        } else {
            this._watcher.set(eventName, [listener]);
        }
    }
    
    public removeListener(eventName: string, listener: WatchListener): void {
        let listeners = this._watcher.get(eventName);
        if (listeners) {
            const targetIndex = listeners.indexOf(listener);
            this._watcher.set(eventName, listeners.splice(targetIndex, 1))
        }
    }
    
    public emit(eventName: string, ...args: any[]): void {
        const listeners = this._watcher.get(eventName);
        listeners && listeners.forEach(listener => listener(...args));
    }
}
