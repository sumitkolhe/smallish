export interface Link {
  alias: string
  target: string
  shortUrl: string
  visitCount: number
  meta: {
    password: string | null
    validFrom: Date
    validTill: Date | null
    maxVisits: number | null
  }
  description: string
  analytics: []
  tags: []
  createdAt: Date
  updatedAt: Date
}
