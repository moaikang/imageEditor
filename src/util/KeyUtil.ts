import {getOS} from "./OSUtil";

export function isCmdOrCtrlKeyPressed(e: KeyboardEvent): boolean {
    const os = getOS();
    if (os === 'Windows' || os === 'Android') {
        return e.ctrlKey
    } else if (os === 'Mac OS' || os === 'iOS') {
        return e.metaKey;
    } else {
        throw new Error('Not supported Operating System')
    }
}
