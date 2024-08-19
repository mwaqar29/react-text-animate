import { motion, useAnimation, useInView } from 'framer-motion'
import React, { CSSProperties, useEffect, useRef } from 'react'

/*
  Inspired by the mastermind behind the original animation! -> Manu Arora, Aceternity UI
  Reference: ui.aceternity.com/components/text-generate-effect
*/

interface TextEffectTwoProps {
  wrapperElement?: keyof JSX.IntrinsicElements
  text: string
  className?: string
  style?: CSSProperties
  filter?: boolean
  animationDuration?: number
  staggerDuration?: number
  initialDelay?: number
  animateOnce?: boolean
  elementVisibilityAmount?: number
}

export const TextEffectTwo: React.FC<TextEffectTwoProps> = ({
  wrapperElement: Wrapper = 'p',
  text,
  className,
  style,
  filter = true,
  animationDuration = 0.5,
  staggerDuration = 0.2,
  initialDelay = 0,
  animateOnce = false,
  elementVisibilityAmount = 0.5,
}) => {
  const ref = useRef<HTMLElement>(null)
  const controls = useAnimation()
  const isInView = useInView(ref, {
    amount: elementVisibilityAmount,
    once: animateOnce,
  })
  const wordsArray = text.split(' ')

  useEffect(() => {
    if (isInView) {
      controls.start((i) => ({
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
        transition: {
          duration: animationDuration,
          delay: initialDelay + i * staggerDuration,
        },
      }))
    } else if (!animateOnce) {
      controls.start({
        opacity: 0,
        filter: filter ? 'blur(10px)' : 'none',
        transition: { duration: 0 },
      })
    }
  }, [
    controls,
    isInView,
    animationDuration,
    filter,
    initialDelay,
    staggerDuration,
    animateOnce,
  ])

  const renderWords = () => {
    return (
      <motion.span ref={ref}>
        <span className="__sr-only">{text}</span>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            custom={idx}
            initial={{
              opacity: 0,
              filter: filter ? 'blur(10px)' : 'none',
            }}
            animate={controls}
          >
            {word}{' '}
          </motion.span>
        ))}
      </motion.span>
    )
  }

  return (
    <Wrapper className={className} style={style}>
      {renderWords()}
    </Wrapper>
  )
}
