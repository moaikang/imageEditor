import {CanvasImageChangeCommand} from "./CanvasImageChangeCommand";

export type CommandName = 'canvas-image-change';

export const commandRepository = {
    'canvas-image-change': CanvasImageChangeCommand,
};
