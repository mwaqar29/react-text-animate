import { motion, useInView } from 'framer-motion'
import React, {
  CSSProperties,
  useMemo,
  useRef,
  useEffect,
  useState,
} from 'react'

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
  wordByWord?: boolean
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
  wordByWord = false,
}) => {
  const ref = useRef<HTMLElement>(null)
  const [innerTextArray, setInnerTextArray] = useState<string[]>([])

  useEffect(() => {
    setInnerTextArray(() => {
      const spanArray = [...ref.current!.children] as HTMLSpanElement[]

      // Replaced the `&nbsp;` character (Unicode character `\u00A0`) with actual space(' ')
      return spanArray.map((elem) => elem.innerText?.replace(/\u00A0/g, ' '))
    })
  }, [])

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

  const renderByWord = (line: string) => {
    return line.split(' ').map((word, idx2) => (
      <>
        <motion.span
          key={word + idx2}
          variants={revealUp}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
        {idx2 < line.split(' ').length - 1 && (
          <span style={{ display: 'inline-block' }}>&nbsp;</span>
        )}
      </>
    ))
  }

  const renderByChar = (line: string) => {
    return line.split(' ').map((word, idx2) => (
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
    ))
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
                lineHeight ||
                (innerTextArray[idx] === line.toUpperCase() ? '0.81' : '1.2'),
            }}
          >
            {wordByWord ? renderByWord(line) : renderByChar(line)}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  )
}
