import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { To } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md'

type CommonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  style?: CSSProperties
  className?: string
}

type LinkButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, 'to' | 'children' | 'style' | 'className'> & {
    to: To
  }

type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'style' | 'className'> & {
    to?: never
  }

export type ButtonProps = LinkButtonProps | NativeButtonProps

function isLinkButtonProps(props: ButtonProps): props is LinkButtonProps {
  return (props as LinkButtonProps).to !== undefined
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', style, className, children } = props

  const padding = size === 'sm' ? '6px 10px' : '8px 12px'

  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding,
    borderRadius: 10,
    border: '1px solid #111',
    fontWeight: 700,
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
  }

  const variantStyle: CSSProperties =
    variant === 'secondary'
      ? { background: '#fff', color: '#111' }
      : { background: '#111', color: '#fff' }

  const combinedStyle: CSSProperties = { ...base, ...variantStyle, ...style }

  if (isLinkButtonProps(props)) {
    const { to, ...rest } = props
    return (
      <Link to={to} {...rest} className={className} style={combinedStyle}>
        {children}
      </Link>
    )
  }

  const { type, ...rest } = props
  return (
    <button type={type ?? 'button'} {...rest} className={className} style={combinedStyle}>
      {children}
    </button>
  )
}

