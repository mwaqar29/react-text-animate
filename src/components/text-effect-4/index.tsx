import { motion, useInView } from 'framer-motion'
import GraphemeSplitter from 'grapheme-splitter'
import React, { CSSProperties, useRef } from 'react'

interface CursorConfig {
  type?: 'hidden' | 'vertical' | 'horizontal'
  blinkRate?: number
  width?: string
  color?: string
  marginLeft?: string
}

interface TextEffectFourProps {
  wrapperElement?: keyof JSX.IntrinsicElements
  text: string
  className?: string
  style?: CSSProperties
  fromCenter?: boolean
  cursorConfig?: CursorConfig
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
  const wordsArray = text.split(' ')
  const revealSuddenly = {
    hidden: {
      display: 'none',
      opacity: 0,
      transition: {
        duration: 0,
      },
    },
    visible: {
      display: 'inline-block',
      opacity: 1,
      transition: {
        duration: 0,
      },
    },
  }

  const renderCursor = () => {
    const config = {
      type: cursorConfig?.type ?? 'vertical',
      blinkRate: cursorConfig?.blinkRate ?? 0.35,
      width: cursorConfig?.width ?? '1px',
      color: cursorConfig?.color ?? 'currentColor',
      marginLeft: cursorConfig?.marginLeft ?? '0px',
    }

    return (
      <motion.span
        animate={{
          opacity: [0, 0, 0, 1, 1, 1],
        }}
        transition={{
          duration: config.blinkRate,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
        style={{
          display: config?.type === 'hidden' ? 'none' : 'inline',
          color: config?.color,
          borderLeftWidth:
            config?.type === 'horizontal' ? '0px' : config?.width,
          borderLeftStyle: 'solid',
          borderLeftColor: config?.color,
          marginLeft: config?.marginLeft,
        }}
      >
        {config?.type === 'horizontal' && '_'}
      </motion.span>
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
      <span className="__sr-only">{text}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          staggerChildren: isInView ? staggerDuration : 0,
          delayChildren: initialDelay,
        }}
      >
        {wordsArray.map((word: string, idx: number) => (
          <span key={word + idx}>
            {splitter.splitGraphemes(word).map((char: string, idx2: number) => (
              <motion.span key={char + idx2} variants={revealSuddenly}>
                {char}
              </motion.span>
            ))}
            {idx < wordsArray.length - 1 && (
              <motion.span variants={revealSuddenly}>&nbsp;</motion.span>
            )}
          </span>
        ))}
        {renderCursor()}
      </motion.span>
    </Wrapper>
  )
}
