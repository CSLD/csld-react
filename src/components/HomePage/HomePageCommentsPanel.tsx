import React from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import { BaseCommentData, BaseCommentPanel } from './BaseCommentPanel'
import { darkTheme } from '../../theme/darkTheme'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'
import { toChunks } from '../../utils/chunkUtils'

interface Props {
    readonly comments: (BaseCommentData | undefined)[]
    readonly expanded: boolean
    readonly onToggleExpanded: () => void
}

export const HPC_COLUMNS = 3
export const HPC_ROWS_NORMAL = 2
export const HPC_ROWS_EXPANDED = 5

const useStyles = createUseStyles({
    outerWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pading: '20px 0',
    },
    commentsTitle: {
        fontWeight: 700,
        color: darkTheme.textOnLightDark,
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        margin: '20px 0 30px',
    },
    commentsMoreLess: {
        background: darkTheme.backgroundAlmostNearWhite2,
        color: darkTheme.textOnLight,
        fontSize: '0.7rem',
        borderRadius: 4,
        outline: 0,
        border: 0,
        textAlign: 'center',
        width: 380,
        padding: 5,
        marginTop: -5,

        '&:hover': {
            background: darkTheme.backgroundAlmostNearWhite,
        },
    },
    commentsWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        transition: 'height 0.3s ease-in',
        overflow: 'hidden',
    },
    commentsColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
})

export const HomePageCommentsPanel = ({ comments, expanded, onToggleExpanded }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')

    const numInColumn = expanded ? HPC_ROWS_EXPANDED : HPC_ROWS_NORMAL
    const commentsInColumns = toChunks(comments, numInColumn)

    return (
        <WidthFixer className={classes.outerWrapper}>
            <div className={classes.commentsTitle}>{t('HomePage.recentComments')}</div>
            <div className={classes.commentsWrapper} style={{ height: 190 * numInColumn }}>
                {commentsInColumns.map((column, n) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div className={classes.commentsColumn} key={`col_${n}`}>
                        {column.map((comment, i) => (
                            <BaseCommentPanel key={comment ? comment.id : `c_${n}_${i}`} comment={comment} />
                        ))}
                    </div>
                ))}
            </div>
            <button type="button" className={classes.commentsMoreLess} onClick={onToggleExpanded}>
                {t(expanded ? 'HomePage.commentsShrink' : 'HomePage.commentsExpand')}
            </button>
        </WidthFixer>
    )
}
