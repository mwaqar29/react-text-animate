import { motion, useInView } from 'framer-motion'
import React, { CSSProperties, useMemo, useRef } from 'react'

interface TextEffectOneProps {
  wrapperElement?: keyof JSX.IntrinsicElements
  text: string | string[]
  className?: string
  style?: CSSProperties
  rotation?: number
  staggerDuration?: number
  fromTop?: boolean
  fromLast?: boolean
  initialDelay?: number
  animateOnce?: boolean
  elementVisibilityAmount?: number
  lineHeight?: number
}

export const TextEffectOne: React.FC<TextEffectOneProps> = ({
  wrapperElement: Wrapper = 'p',
  text,
  className,
  style,
  rotation = 0,
  staggerDuration = 0.1,
  fromTop = false,
  fromLast = false,
  initialDelay = 0,
  animateOnce = false,
  elementVisibilityAmount = 0.5,
  lineHeight,
}) => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, {
    amount: elementVisibilityAmount,
    once: animateOnce,
  })
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])
  const revealUp = {
    hidden: {
      transition: { type: 'spring', bounce: 0 },
      rotate: rotation,
      y: fromTop ? '-200%' : '200%',
    },
    visible: {
      transition: { type: 'spring', bounce: 0 },
      rotate: 0,
      y: 0,
    },
  }

  return (
    <Wrapper className={className} style={style}>
      <span className="__sr-only">{textArray.join(' ')}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          staggerChildren: isInView ? staggerDuration : 0,
          staggerDirection: fromLast ? -1 : 1,
          delayChildren: initialDelay,
        }}
      >
        {textArray.map((line, idx) => (
          <span
            key={line + idx}
            style={{
              display: 'block',
              overflow: 'hidden',
              lineHeight:
                lineHeight || (line === line.toUpperCase() ? '0.81' : '1.2'),
            }}
          >
            {line.split(' ').map((word, idx2) => (
              <span key={word + idx2} style={{ display: 'inline-block' }}>
                {word.split('').map((char: string, idx3: number) => (
                  <motion.span
                    key={char + idx3}
                    variants={revealUp}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </motion.span>
                ))}
                {idx2 < line.split(' ').length - 1 && (
                  <span style={{ display: 'inline-block' }}>&nbsp;</span>
                )}
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  )
}

// USAGE EXAMPLES
/*
  <TextEffectOne
    id="one"
    text={word}
    className="text-8xl tracking-wider font-medium"
    staggerDuration={0.12}
  />
  <TextEffectOne
    id="two"
    text={words}
    className="text-9xl tracking-wider font-medium"
    initialDelay={1.35}
    staggerDuration={0.04}
    rotation={67.5}
  />
  <TextEffectOne
    id="three"
    text={lines}
    className="text-9xl tracking-wider font-medium"
    staggerDuration={0.12}
    initialDelay={2.25}
  />
*/
