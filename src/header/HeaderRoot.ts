import {AbstractView} from "../infra/AbstractView";

const HTML = `
<header class="editor-header">
  <h1 class="editor-header-text">Moai Image Editor</h1>
</header>
`;

export class HeaderRoot extends AbstractView {
    protected htmlText: string = HTML;
}
