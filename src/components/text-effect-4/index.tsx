// My Typewriter Effect

import { motion, useInView } from 'framer-motion'
import GraphemeSplitter from 'grapheme-splitter'
import React, { CSSProperties, useMemo, useRef } from 'react'

interface CursorConfig {
  width: string
  height: string
  marginLeft: string
  marginRight: string
  backgroundColor: string
}

interface TextEffectFourProps {
  wrapperElement?: keyof JSX.IntrinsicElements
  text: string
  className?: string
  style?: CSSProperties
  fromCenter?: boolean
  cursorConfig?: CursorConfig
  cursorBlinkRate?: number
  staggerDuration?: number
  initialDelay?: number
  animateOnce?: boolean
  elementVisibilityAmount?: number
}

const splitter = new GraphemeSplitter()

export const TextEffectFour: React.FC<TextEffectFourProps> = ({
  wrapperElement: Wrapper = 'p',
  text,
  className,
  style,
  fromCenter = false,
  cursorConfig,
  cursorBlinkRate = 0.35,
  staggerDuration = 0.125,
  initialDelay = 0,
  animateOnce = false,
  elementVisibilityAmount = 0.5,
}) => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, {
    amount: elementVisibilityAmount,
    once: animateOnce,
  })
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])
  const revealSuddenly = {
    hidden: {
      display: 'none',
      transition: {
        duration: 0,
      },
      opacity: 0,
    },
    visible: {
      display: 'inline-block',
      transition: {
        duration: 0,
      },
      opacity: 1,
    },
  }

  const renderCursor = () => {
    return (
      <motion.span
        animate={{
          opacity: [0, 0, 0, 1, 1, 1],
        }}
        transition={{
          duration: cursorBlinkRate,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
        style={{
          display: 'inline-block',
          width: '1px',
          height: '14px',
          marginLeft: '2px',
          marginRight: '0',
          backgroundColor: 'white',
          ...cursorConfig,
        }}
      ></motion.span>
    )
  }

  return (
    <Wrapper
      className={className}
      style={{
        ...style,
        ...(fromCenter
          ? {
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }
          : {}),
      }}
    >
      <span className="__sr-only">{textArray.join(' ')}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          staggerChildren: isInView ? staggerDuration : 0,
          delayChildren: initialDelay,
        }}
      >
        {textArray.map((line: string, idx: number) => (
          <span key={line + idx}>
            {line.split(' ').map((word: string, idx2: number) => (
              <span key={word + idx2}>
                {splitter
                  .splitGraphemes(word)
                  .map((char: string, idx3: number) => (
                    <motion.span key={char + idx3} variants={revealSuddenly}>
                      {char}
                    </motion.span>
                  ))}
                {idx2 < line.split(' ').length - 1 && (
                  <motion.span variants={revealSuddenly}>&nbsp;</motion.span>
                )}
              </span>
            ))}
            {renderCursor()}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  )
}
