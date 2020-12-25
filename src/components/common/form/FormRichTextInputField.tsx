import React, { FocusEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useField } from 'react-final-form'
import { DraftHandleValue, Editor, EditorState, RichUtils } from 'draft-js'
import { Form } from 'react-bootstrap'
import {
    BoldButton,
    HeadlineOneButton,
    HeadlineThreeButton,
    HeadlineTwoButton,
    ItalicButton,
    OrderedListButton,
    UnderlineButton,
    UnorderedListButton,
} from 'draft-js-buttons'
import { createUseStyles } from 'react-jss'
import { FieldValidator } from 'final-form'
import FieldWithError from './FieldWithError'
import { darkTheme } from '../../../theme/darkTheme'
import { htmlToEditorState } from './richTextInputUtils'

export type RichTextFieldValue = EditorState | string | undefined

export interface FormRichTextInputProps {
    readonly showErrorPlaceholder?: boolean
    readonly label?: string
    readonly hint?: string
    readonly errorHint?: string
    readonly autoFocus?: boolean
    readonly name: string
    readonly validate?: FieldValidator<RichTextFieldValue>
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
        background: darkTheme.backgroundRealWhite,
    },
    editorP: {
        marginBottom: '1rem',
    },
})

const isEditorState = (value: RichTextFieldValue): value is EditorState => !!value && typeof value !== 'string'

const FormRichTextInputField = ({
    name,
    validate,
    showErrorPlaceholder = true,
    errorHint,
    label,
    hint,
    autoFocus,
}: FormRichTextInputProps) => {
    const [wasBlurred, setWasBlurred] = useState(false)
    const classes = useStyles()
    const {
        input: { onBlur: inputOnBlur, onChange: inputOnChange, onFocus: inputOnFocus, value },
        meta,
    } = useField<RichTextFieldValue>(name, { validate })
    const autoFocusedRef = useRef(false)

    const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
        /**
         * Since we don't want to convert content to HTML every
         */
        setWasBlurred(true)
        inputOnBlur?.(e)
    }

    const handleOnFocus = () => {
        inputOnFocus()
    }

    const editorRef = useRef<any>(undefined)
    const focusEditor = (e?: any) => {
        editorRef.current?.focus()
        e?.stopPropagation()
        e?.preventDefault()
    }

    const setEditorState = useCallback(
        (newState: EditorState) => {
            inputOnChange({ target: { value: newState } })
        },
        [inputOnChange],
    )

    useEffect(() => {
        // Editor state creation does not work on server, so we store text in the field initially and then
        // convert it to editor state after first render on client. We don't show editor until state is
        // actually crated.
        if (!value) {
            setEditorState(EditorState.createEmpty())
        } else if (typeof value === 'string') {
            setEditorState(htmlToEditorState(value))
        }

        if (autoFocus && !autoFocusedRef.current) {
            // Autofocus just once
            autoFocusedRef.current = true

            // Delay focus a bit so that it works even in modal
            window.setTimeout(() => {
                focusEditor()
            }, 100)
        }
    }, [autoFocus, value, autoFocusedRef])

    const handleKeyCommand = (command: any, oldState: EditorState): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(oldState, command)
        if (newState) {
            setEditorState(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    const getEditorState = () => {
        if (isEditorState(value)) {
            return value
        }

        // Should never actually be called, because we should have state initialized, but just to be sure...
        return EditorState.createEmpty()
    }

    return (
        <FieldWithError
            meta={meta}
            showErrorPlaceholder={showErrorPlaceholder}
            hint={hint}
            errorHint={errorHint}
            hideError={!wasBlurred}
        >
            {() => (
                <>
                    {label && <Form.Label>{label}</Form.Label>}
                    <div>
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
                        <BoldButton theme={classes} getEditorState={getEditorState} setEditorState={setEditorState} />
                        <ItalicButton theme={classes} getEditorState={getEditorState} setEditorState={setEditorState} />
                        <UnderlineButton
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
                        {isEditorState(value) && (
                            <Editor
                                ref={editorRef}
                                tabIndex={0}
                                editorState={value}
                                onChange={setEditorState}
                                onBlur={handleOnBlur}
                                onFocus={handleOnFocus}
                                handleKeyCommand={handleKeyCommand}
                                blockStyleFn={block => {
                                    const type = block.getType()
                                    return type === 'unstyled' || type === 'paragraph' ? classes.editorP : ''
                                }}
                            />
                        )}
                    </div>
                </>
            )}
        </FieldWithError>
    )
}

export default FormRichTextInputField
