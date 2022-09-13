import { PluginOrDisabledPlugin } from '@envelop/core';
import { useDepthLimit } from '@envelop/depth-limit';
import { useParserCache } from '@envelop/parser-cache';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const plugins: PluginOrDisabledPlugin = [
  useDepthLimit({
    maxDepth: 10,
  }),
  useParserCache({
    // options
  }),
];

export default plugins;
