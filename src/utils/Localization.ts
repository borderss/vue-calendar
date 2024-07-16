import translations from '@/utils/translations'

export class Localization {
  static instance: Localization
  static getInstance(): Localization {
    if (!Localization.instance) {
      Localization.instance = new Localization()
    }
    return Localization.instance
  }

  private locale: string = 'en'

  private getTranslation(key: string): any {
    const localeTranslation = translations?.[this.locale as keyof typeof translations]
    return localeTranslation?.[key as keyof typeof localeTranslation] || `{{${key}}}`
  }

  setLocale(locale: string): void {
    Localization.instance.locale = locale
  }

  getLocale(): string {
    return Localization.instance.locale
  }

  t(key: string): string | any {
    return Localization.instance.getTranslation(key)
  }
}