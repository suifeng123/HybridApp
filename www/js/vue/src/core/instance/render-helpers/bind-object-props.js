/* @flow */

import config from 'core/config'
import { isObject, warn, toObject } from 'core/util/index'

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
export function bindObjectProps (
  data: any,
  tag: string,
  value: any,
  asProp?: boolean
): VNodeData {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      )
    } else {
      if (Array.isArray(value)) {
        value = toObject(value)
      }
      let hash
      for (const key in value) {
        if (key === 'class' || key === 'style') {
          hash = data
        } else {
          const type = data.attrs && data.attrs.type
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {})
        }
        if (!(key in hash)) {
          hash[key] = value[key]
        }
      }
    }
  }
  return data
}
