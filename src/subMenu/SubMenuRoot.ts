import {AbstractView} from "../infra/AbstractView";

const HTML = `
<section class="submenu-wrapper"></section>
`;

export class SubMenuRoot extends AbstractView {
    protected htmlText: string = HTML;
}
