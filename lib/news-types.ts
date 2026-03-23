export type NewsLocale = 'uz' | 'ru' | 'en'

export type NewsBlock =
  | {
      type: 'paragraph'
      text: string
    }
  | {
      type: 'heading'
      level: 2 | 3
      text: string
    }
  | {
      type: 'image'
      url: string
      alt?: string
      caption?: string
    }
  | {
      type: 'gallery'
      items: Array<{
        url: string
        alt?: string
      }>
    }
  | {
      type: 'youtube'
      url: string
      title?: string
    }
  | {
      type: 'link'
      url: string
      label: string
    }
  | {
      type: 'quote'
      text: string
      author?: string
    }
  | {
      type: 'file'
      url: string
      label: string
    }

export type NewsTranslationInput = {
  locale: NewsLocale
  title: string
  excerpt?: string | null
  contentJson: string
}

export type NewsMediaInput = {
  type: 'image' | 'video' | 'youtube' | 'file'
  url: string
  thumbnail?: string | null
  alt?: string | null
  caption?: string | null
  sortOrder?: number
}