export class MessageCodes {
  private frontendSuccessMessages: { [index: string]: string } = {
    'ULO': 'Sikeres kijelentkezés',
    'UR': 'Sikeres regisztráció',
    'UTC': 'Felhasználó valid',
  }
  private frontendErrorMessages: { [index: string]: string } = {
    'BDL': 'Hiba adatlista lekérdezésnél',
    'BLG': 'Probléma könyvlista lekérése során',
    'BMD': 'Könyv metaadat lekérési hiba',
    'BPD': 'Könyv elsődleges adat lekérési hiba',
    'UL': 'Bejelentkezési hiba',
    'ULFV': 'Login form validációs hiba',
    'ULO': 'Kijelentkezési hiba',
    'UR': 'Regisztrációs hiba',
    'URFV': 'Regisztráció form validációs hiba',
    'UTC': 'Invalid felhasználó',
  }

  private backendErrorMessages: { [index: string]: string } = {
    'UER': 'Email megadása kotelező',
    'UEV': 'Valid e-mail címet adjon meg!',
    'ULEPN': 'Usernév vagy jelszó nem megfelelő',
    'UNR': 'Név megadása kötelező',
    'UPML': 'A jelszónak minimum 8 karakternek kell lennie',
    'UPNE': 'A két jelszó nem egyezik',
    'UPR': 'Jelszó megadása kötelező',
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
