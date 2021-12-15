import { default as mergeWith } from 'lodash.mergewith'
import { AnimatePresence, HTMLMotionProps, motion, Variants as _Variants } from 'framer-motion'
import * as React from 'react'
import { TransitionEasings, Variants, withDelay, WithTransitionConfig } from './transition-utils'

export interface CollapseOptions {
  /**
   * If `true`, the opacity of the content will be animated
   * @default true
   */
  animateOpacity?: boolean
  /**
   * The height you want the content in its collapsed state.
   * @default 0
   */
  startingHeight?: number | string
  /**
   * The height you want the content in its expanded state.
   * @default "auto"
   */
  endingHeight?: number | string
}

const defaultTransitions = {
  exit: {
    height: { duration: 1.2, ease: TransitionEasings.easeOut },
    opacity: { duration: 1.3, ease: TransitionEasings.easeOut },
    scale: { duration: 1.2, ease: TransitionEasings.easeOut }
  },
  enter: {
    height: { duration: 1.3, ease: TransitionEasings.easeOut },
    opacity: { duration: 1.4, ease: TransitionEasings.easeOut },
    scale: { duration: 1.3, ease: TransitionEasings.easeOut }
  }
}

const variants: Variants<CollapseOptions> = {
  exit: ({ startingHeight, transition, transitionEnd, delay }) => ({
    ...{ scale: 0 },
    overflow: 'hidden',
    height: startingHeight,
    transitionEnd: transitionEnd?.exit,
    transition: transition?.exit ?? withDelay.exit(defaultTransitions.exit, delay)
  }),
  enter: ({ endingHeight, transition, transitionEnd, delay }) => ({
    ...{ scale: 1 },
    height: endingHeight,
    transitionEnd: transitionEnd?.enter,
    transition: transition?.enter ?? withDelay.enter(defaultTransitions.enter, delay)
  })
}

export type ICollapse = CollapseProps

export interface CollapseProps
  extends WithTransitionConfig<HTMLMotionProps<'div'>>,
    CollapseOptions {}

const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
  const {
    in: isOpen,
    unmountOnExit,
    animateOpacity = true,
    startingHeight = 0,
    endingHeight = 'auto',
    style,
    className,
    transition,
    transitionEnd,
    ...rest
  } = props

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true)
    })
    return () => clearTimeout(timeout)
  }, [])

  const hasStartingHeight = parseFloat(startingHeight.toString()) > 0

  const custom = {
    startingHeight,
    endingHeight,
    animateOpacity,
    transition: !mounted ? { enter: { duration: 0 } } : transition,
    transitionEnd: mergeWith(transitionEnd, {
      enter: { overflow: 'initial' },
      exit: unmountOnExit
        ? undefined
        : {
            display: hasStartingHeight ? 'block' : 'none'
          }
    })
  }

  const show = unmountOnExit ? isOpen : true
  const animate = isOpen || unmountOnExit ? 'enter' : 'exit'

  return (
    <AnimatePresence initial={false} custom={custom}>
      {show && (
        <motion.div
          ref={ref}
          {...rest}
          style={{
            overflow: 'hidden',
            display: 'block',
            ...style
          }}
          custom={custom}
          variants={variants as _Variants}
          initial={unmountOnExit ? 'exit' : false}
          animate={animate}
          exit="exit"
        />
      )}
    </AnimatePresence>
  )
})

Collapse.displayName = 'Collapse'

export default Collapse
