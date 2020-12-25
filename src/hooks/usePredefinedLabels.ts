import { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Label, LoadLabelsQuery, LoadLabelsQueryVariables } from '../graphql/__generated__/typescript-operations'

const loadLabelsGql = require('./graphql/loadLabels.graphql')

export interface LabelData {
    readonly id: string
    readonly name: string
    readonly description?: string
}

const mapper = ({ id, name, description }: Pick<Label, 'id' | 'name' | 'description'>): LabelData => ({
    id,
    name: name ?? '',
    description: description ?? undefined,
})

const sortLabels = (labels: LabelData[]) => labels.sort((a, b) => a.name.localeCompare(b.name))

/**
 * Load labels from GraphQL if necessary (not yer preloaded), also builds list of label names to
 * check for duplicated when creating new labels.
 *
 * @param existingRequiredLabels Preloaded required labels (if available)
 * @param existingOptionalLabels Preloaded optional labels (if available)
 */
export const useLoadLabels = (existingRequiredLabels?: LabelData[], existingOptionalLabels?: LabelData[]) => {
    const [requiredLabels, setRequiredLabels] = useState<LabelData[]>(sortLabels([...(existingRequiredLabels || [])]))
    const [optionalLabels, setOptionalLabels] = useState<LabelData[]>(sortLabels([...(existingOptionalLabels || [])]))
    const existingLabelNames = useMemo(() => {
        const res: string[] = []

        requiredLabels.forEach(label => res.push(label.name))
        optionalLabels.forEach(label => res.push(label.name))

        return res
    }, [requiredLabels, optionalLabels])

    useQuery<LoadLabelsQuery, LoadLabelsQueryVariables>(loadLabelsGql, {
        onCompleted: data => {
            setRequiredLabels(sortLabels(data.authorizedRequiredLabels.map(mapper)))
            setOptionalLabels(sortLabels(data.authorizedOptionalLabels.map(mapper)))
        },
        skip: requiredLabels.length > 0 && optionalLabels.length > 0,
    })

    return { requiredLabels, optionalLabels, existingLabelNames }
}
