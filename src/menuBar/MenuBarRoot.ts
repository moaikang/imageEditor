import {AbstractView} from "../infra/AbstractView";
import {UndoButton} from "./UndoButton";
import {RedoButton} from "./RedoButton";
import {ResetButton} from "./ResetButton";
import {CropButton} from "./CropButton";
import {FlipButton} from "./FlipButton";
import {RotateButton} from "./RotateButton";
import {DrawButton} from "./DrawButton";
import {ShapeButton} from "./ShapeButton";
import {TextButton} from "./TextButton";

const HTML = `
<section class="menu-bar-wrapper">
  <!-- UndoButton -->
  <!-- RedoButton -->
  <!-- ResetButton -->
  <!-- CropButton -->
  <!-- FlipButton -->
  <!-- RotateButton -->
  <!-- DrawButton -->
  <!-- ShapeButton -->
  <!-- TextButton -->
</section>
`;

export class MenuBarRoot extends AbstractView {
    protected htmlText: string = HTML;
    
    private _undoButton: UndoButton = new UndoButton();
    private _redoButton: RedoButton = new RedoButton();
    private _resetButton: ResetButton = new ResetButton();
    private _cropButton: CropButton = new CropButton();
    private _flipButton: FlipButton = new FlipButton();
    private _rotateButton: RotateButton = new RotateButton();
    private _drawButton: DrawButton = new DrawButton();
    private _shapeButton: ShapeButton = new ShapeButton();
    private _textButton: TextButton = new TextButton();
    
    protected onFirstRender() {
        super.onFirstRender();
        this._renderButtons();
    }
    
    private _renderButtons(): void {
        this._undoButton.render().attachToEl(this.element);
        this._redoButton.render().attachToEl(this.element);
        this._resetButton.render().attachToEl(this.element);
        this._cropButton.render().attachToEl(this.element);
        this._flipButton.render().attachToEl(this.element);
        this._rotateButton.render().attachToEl(this.element);
        this._drawButton.render().attachToEl(this.element);
        this._shapeButton.render().attachToEl(this.element);
        this._textButton.render().attachToEl(this.element);
    }
}
