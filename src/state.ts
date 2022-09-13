import { getNavigationList } from '@/libs/microcms'

/**
 * Global state
 */

const [_navigationList] = await Promise.all([getNavigationList()]).then(
  (res) => res,
)

export const navigationList = _navigationList.contents
