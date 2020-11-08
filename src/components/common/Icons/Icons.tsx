import React from 'react'
import {
    faUser,
    faComment,
    faStar,
    faSearch,
    faLocationArrow,
    faChevronCircleLeft,
    faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IconProps {
    readonly className?: string
}

/* eslint-disable react/jsx-props-no-spreading */
export const IconRating = (props: IconProps) => <FontAwesomeIcon icon={faStar} {...props} />

export const IconStar = (props: IconProps) => <FontAwesomeIcon icon={faStar} {...props} />

export const IconComment = (props: IconProps) => <FontAwesomeIcon icon={faComment} {...props} />

export const IconUser = (props: IconProps) => <FontAwesomeIcon icon={faUser} {...props} />

export const IconSearch = (props: IconProps) => <FontAwesomeIcon icon={faSearch} {...props} />

export const IconLocation = (props: IconProps) => <FontAwesomeIcon icon={faLocationArrow} {...props} />

export const IconMoveLeft = (props: IconProps) => <FontAwesomeIcon icon={faChevronCircleLeft} {...props} />

export const IconMoveRight = (props: IconProps) => <FontAwesomeIcon icon={faChevronCircleRight} {...props} />
