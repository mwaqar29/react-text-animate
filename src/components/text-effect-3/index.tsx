import { motion } from 'framer-motion'
import React, { CSSProperties } from 'react'
import './index.css'

/*
  Inspired by the mastermind behind the original animation! -> @tomisloading
  Reference: hover.dev/components/links#reveal-links
*/

interface TextEffectThreeProps {
  text: string
  className?: string
  style?: CSSProperties
  lineHeight?: number
  fromTop?: boolean
  fromLast?: boolean
  staggerDuration?: number
  animationDuration?: number
}

export const TextEffectThree: React.FC<TextEffectThreeProps> = ({
  text,
  className,
  style,
  lineHeight,
  fromTop = false,
  fromLast = false,
  staggerDuration = 0.02,
  animationDuration = 0.2,
}) => {
  return (
    <>
      <span className="__sr-only">{text}</span>
      <motion.div
        initial="initial"
        whileHover="hovered"
        className={'text-container ' + className}
        style={{
          ...style,
          ...{
            width: 'fit-content',
            lineHeight:
              lineHeight || (text === text.toUpperCase() ? 0.81 : 1.2),
          },
        }}
      >
        <div>
          {text.split('').map((char, idx) => (
            <motion.span
              key={idx}
              variants={{
                initial: {
                  y: fromTop ? '-100%' : 0,
                },
                hovered: {
                  y: fromTop ? 0 : '-100%',
                },
              }}
              transition={{
                duration: animationDuration,
                ease: 'easeInOut',
                delay: staggerDuration * (fromLast ? text.length - idx : idx),
              }}
              style={{
                display: 'inline-block',
              }}
            >
              {char == ' ' ? (
                <span style={{ display: 'inline-block' }}>&nbsp;</span>
              ) : (
                char
              )}
            </motion.span>
          ))}
        </div>
        <div className="text-hidden">
          {text.split('').map((char, idx) => (
            <motion.span
              key={idx}
              variants={{
                initial: {
                  y: fromTop ? 0 : '100%',
                },
                hovered: {
                  y: fromTop ? '100%' : 0,
                },
              }}
              transition={{
                duration: animationDuration,
                ease: 'easeInOut',
                delay: staggerDuration * (fromLast ? text.length - idx : idx),
              }}
              style={{
                display: 'inline-block',
              }}
            >
              {char == ' ' ? (
                <span style={{ display: 'inline-block' }}>&nbsp;</span>
              ) : (
                char
              )}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </>
  )
}
