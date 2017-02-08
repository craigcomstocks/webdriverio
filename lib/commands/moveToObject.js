/**
 *
 * Move the mouse by an offset of the specificed element. If an element is provided but no
 * offset, the mouse will be moved to the center of the element. If the element is not
 * visible, it will be scrolled into view.
 *
 * @alias browser.moveToObject
 * @param {String} selector element to move to
 * @param {Number} xoffset  X offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
 * @param {Number} yoffset  Y offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
 * @uses protocol/element, protocol/elementIdLocation
 * @type action
 *
 */

import { RuntimeError } from '../utils/ErrorHandler'

let moveToObject = function (selector, xoffset, yoffset) {
    debugger
    /**
     * check for offset params
     */
    var hasOffsetParams = true
    if (typeof xoffset !== 'number' && typeof yoffset !== 'number') {
        hasOffsetParams = false
    }

    if (this.isMobile || !hasOffsetParams) {
        return this.element(selector).then((element) => {
            /**
             * check if element was found and throw error if not
             */
            if (!element.value) {
                throw new RuntimeError(7)
            }

            return this.elementIdSize(res.value.ELEMENT).then((size) =>
                this.elementIdLocation(res.value.ELEMENT).then((location) => {
                    return { element, size, location }
                })
            )
        }).then((res) => {
            let _xoffset = (res.size.value.width / 2)
            let _yoffset = (res.size.value.height / 2)
            let x = res.location.value.x
            let y = res.location.value.y

            if (hasOffsetParams) {
                _xoffset = xoffset
                _yoffset = yoffset
            }

            if (this.isMobile) {
                return this.touchMove(x + _xoffset, y + _yoffset)
            } else {
                return this.moveTo(res.element.value.ELEMENT, _xoffset, _yoffset)
            }
        })
    }

    return this.element(selector).then((res) => {
        /**
         * check if element was found and throw error if not
         */
        if (!res.value) {
            throw new RuntimeError(7)
        }

        return this.moveTo(res.value.ELEMENT, xoffset, yoffset)
    })
}

export default moveToObject
