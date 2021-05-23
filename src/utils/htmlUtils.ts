export function createMetaTag(attribute: string, content: string) {
    const metaTag = document.createElement('meta')
    metaTag.setAttribute('property', attribute)
    metaTag.setAttribute('content', content)
    return metaTag
}
