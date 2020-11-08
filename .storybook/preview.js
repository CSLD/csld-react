import { addDecorator, addParameters } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { withI18next } from './Decorators'

addDecorator(withKnobs)
addDecorator(withI18next())

addParameters({
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
})
