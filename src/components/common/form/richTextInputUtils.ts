import htmlToDraft from 'html-to-draftjs'
import { ContentState, convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

export const htmlToEditorState = (html: string) => {
    const blocksFromHtml = htmlToDraft(html)
    const { contentBlocks, entityMap } = blocksFromHtml
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
    return EditorState.createWithContent(contentState)
}

export const editorStateToHtml = (editorState: EditorState) => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    return draftToHtml(rawContentState)
}
