export class MessageCodes {
  private frontendSuccessMessages: { [index: string]: string } = {}
  private frontendErrorMessages: { [index: string]: string } = {}
  private backendErrorMessages: { [index: string]: string } = {}

  public getFrontendErrorMessage(code: string): string {
    return this.frontendErrorMessages[code];
  }

  getBackendErrorMessage(backendCode: string): string {
    return this.backendErrorMessages[backendCode];
  }

  getFrontendSuccessMessage(frontendCode: string): string {
    return this.frontendSuccessMessages[frontendCode]
  }
}
