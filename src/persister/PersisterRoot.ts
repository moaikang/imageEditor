import {AbstractView} from "../infra/AbstractView";
import {LoadButton} from "./LoadButton";
import {DownloadButton} from "./DownloadButton";
import {LookUpElement} from "../util/LookupElement";
import {ModelManager} from "../model/ModelManager";
import {CommandRunner} from "../command/CommandRunner";

const HTML = `
<section class="persist-area">
  <div class="buttons">
    <!-- LoadButton -->
    <!-- DownloadButton -->
  </div>
</section>
`

export class PersisterRoot extends AbstractView {
    protected htmlText: string = HTML;
    
    private _model: ModelManager;
    private _command: CommandRunner;
    
    @LookUpElement('.buttons')
    private _buttonsEl!: HTMLDivElement;
    
    private _loadButton!: LoadButton;
    private _downloadButton!: DownloadButton;
    
    constructor(model: ModelManager, command: CommandRunner) {
        super();
        this._model = model;
        this._command = command;
    }
    
    protected onFirstRender(): void {
        super.onFirstRender();
        this._loadButton = new LoadButton(this._model, this._command);
        this._downloadButton = new DownloadButton();
        this._renderButtons();
    }
    
    private _renderButtons(): void {
        this._loadButton.render().attachToEl(this._buttonsEl);
        this._downloadButton.render().attachToEl(this._buttonsEl);
    }
}
