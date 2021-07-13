import {Button} from "../component/Button";

export class TextButton extends Button {
    constructor() {
        super({
            width: 70,
            height: 30,
            text: 'Text'
        });
    }
}
