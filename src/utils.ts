export const isExternalLink = (link: string) => {
  return /^https?:\/\//.test(link)
}
