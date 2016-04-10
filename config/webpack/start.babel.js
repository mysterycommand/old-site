import { merge } from 'lodash';

import base from './base.babel';

export default merge(base, {
    devServer: {
        contentBase: './source',
        stats: {
            colors: true,
        },
    },

    devtool: '#eval-source-map',
});
