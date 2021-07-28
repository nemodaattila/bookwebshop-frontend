export class MessageCodes {
  private frontendSuccessMessages: { [index: string]: string } = {
    'UTC': 'Felhasználó valid',
    'UR': 'Sikeres regisztráció',
    'ULO': 'Sikeres kijelentkezés'
  }
  private frontendErrorMessages: { [index: string]: string } = {
    'ULFV': 'Login form validációs hiba',
    'BDL': 'Hiba adatlista lekérdezésnél',
    'URFV': 'Regisztráció form validációs hiba',
    'UTC': 'Invalid felhasználó',
    'UR': 'Regisztrációs hiba',
    'UL': 'Bejelentkezési hiba',
    'ULO': 'Kijelentkezési hiba'

  }
  private backendErrorMessages: { [index: string]: string } = {
    'UNR': 'Név megadása kötelező',
    'UPR': 'Jelszó megadása kötelező',
    'UPML': 'A jelszónak minimum 8 karakternek kell lennie',
    'UER': 'Email megadása kotelező',
    'UEV': 'Valid e-mail címet adjon meg!',
    'UPNE': 'A két jelszó nem egyezik'
  }

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
