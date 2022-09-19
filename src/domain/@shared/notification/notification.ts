export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification{
    private errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps){
        this.errors.push(error);
    }

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    getErrors(): NotificationErrorProps[] {
        return this.errors;
    }

    messages(context?: string): string{
        if( typeof(context) !== 'undefined'){
            return this.buildErrorMessage(this.errors.filter((error) => error.context === context))
        }
        return this.buildErrorMessage(this.errors)
    }

    private buildErrorMessage(errorList: NotificationErrorProps[]): string{
        let message = "";
        errorList.forEach( (error) => {
            message += `${error.context}: ${error.message},`
        });
        return message;
    }
}