import React, { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Modal } from 'react-bootstrap'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { Editor, EditorState, ContentState, RichUtils, DraftHandleValue, convertToRaw } from 'draft-js'
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
} from 'draft-js-buttons'
import { createUseStyles } from 'react-jss'
import { darkTheme } from '../../theme/darkTheme'

interface Props {
    readonly show: boolean
    readonly oldText: string
    readonly onHide: () => void
    readonly onSubmit: (newText: string) => Promise<void>
}

const useStyles = createUseStyles({
    button: {
        backgroundColor: 'transparent',
        color: darkTheme.textOnLightLighter,
        borderRadius: 3,
        fontSize: '1rem',
        zoom: 0.7,
        height: 40,
        width: 40,
        border: `1px solid ${darkTheme.textOnLightLighter}`,
    },
    active: {
        backgroundColor: darkTheme.backgroundAlmostNearWhite,
    },
    buttonWrapper: {
        display: 'inline-block',
        marginRight: 2,
    },
    editorWrapper: {
        marginTop: 8,
        padding: 4,
        border: `1px solid ${darkTheme.text}`,
        fontSize: '0.75rem',
        minHeight: 200,
        maxHeight: 400,
        overflowY: 'scroll',
        background: darkTheme.backgroundWhite,
    },
    editorP: {
        marginBottom: '1rem',
    },
})

const EditCommentModal = ({ show, oldText, onHide, onSubmit }: Props) => {
    const { t } = useTranslation('common')
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [editorState, setEditorState] = useState(() => {
        const blocksFromHtml = htmlToDraft(oldText)
        const { contentBlocks, entityMap } = blocksFromHtml
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
        return EditorState.createWithContent(contentState)
    })
    const editorRef = useRef<any>(undefined)
    const focusEditor = (e?: any) => {
        editorRef.current?.focus()
        e?.stopPropagation()
        e?.preventDefault()
    }
    useLayoutEffect(focusEditor, [])

    const handleSave = () => {
        setLoading(true)
        const rawContentState = convertToRaw(editorState.getCurrentContent())
        const markup = draftToHtml(rawContentState)
        onSubmit(markup).finally(() => {
            setLoading(false)
        })
    }

    const handleKeyCommand = (command: any, oldState: EditorState): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(oldState, command)
        if (newState) {
            setEditorState(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    const getEditorState = () => editorState

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{t('EditCommentModal.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <BoldButton theme={classes} getEditorState={getEditorState} setEditorState={setEditorState} />
                    <ItalicButton theme={classes} getEditorState={getEditorState} setEditorState={setEditorState} />
                    <UnderlineButton theme={classes} getEditorState={getEditorState} setEditorState={setEditorState} />
                    <HeadlineOneButton
                        theme={classes}
                        getEditorState={getEditorState}
                        setEditorState={setEditorState}
                    />
                    <HeadlineTwoButton
                        theme={classes}
                        getEditorState={getEditorState}
                        setEditorState={setEditorState}
                    />
                    <HeadlineThreeButton
                        theme={classes}
                        getEditorState={getEditorState}
                        setEditorState={setEditorState}
                    />
                    <UnorderedListButton
                        theme={classes}
                        getEditorState={getEditorState}
                        setEditorState={setEditorState}
                    />
                    <OrderedListButton
                        theme={classes}
                        getEditorState={getEditorState}
                        setEditorState={setEditorState}
                    />
                </div>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div className={classes.editorWrapper} onClick={focusEditor}>
                    <Editor
                        ref={editorRef}
                        tabIndex={0}
                        editorState={editorState}
                        onChange={setEditorState}
                        handleKeyCommand={handleKeyCommand}
                        blockStyleFn={block => {
                            const type = block.getType()
                            return type === 'unstyled' || type === 'paragraph' ? classes.editorP : ''
                        }}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={onHide} disabled={loading}>
                    {t('EditCommentModal.cancel')}
                </Button>
                <Button variant="dark" onClick={handleSave} disabled={loading}>
                    {t('EditCommentModal.save')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditCommentModal
