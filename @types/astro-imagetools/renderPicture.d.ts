declare module 'astro-imagetools/api' {
  export function renderPicture(
    config: import('.').PictureConfigOptions,
  ): Promise<import('.').PictureHTMLData>
}
