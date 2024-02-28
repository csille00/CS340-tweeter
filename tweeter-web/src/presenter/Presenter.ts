export interface View {
    displayErrorMessage: (message: string) => void;
}

export interface MessageView extends View {
    displayInfoMessage: (
        message: string,
        duration: number,
        bootstrapClasses?: string
    ) => void;
    clearLastInfoMessage: () => void;
}

export class Presenter<T extends View> {
    private readonly _view: View;

    public constructor(view: View) {
        this._view = view;
    }

    protected get view(): T {
        return this._view as T;
    }

    protected async doFailureReportingOperation(operation: () => Promise<void>, operationDescription: string){
        try {
            await operation()
        } catch (error) {
            this.view.displayErrorMessage(`Failed to ${operationDescription} because of exception: ${error}`)
        }
    }
}