import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface IconProps {
  /** FontAwesome icon definition */
  icon: IconDefinition
  /** Size token class (xs, sm, md, lg, xl, 2xl, 3xl, 4xl) */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  /** Color semantic token */
  color?: 'primary' | 'secondary' | 'tertiary' | 'brand' | 'success' | 'warning' | 'error' | 'info' | 'muted' | 'inverse'
  /** Whether icon is interactive (hover effects) */
  interactive?: boolean
  /** Whether icon is disabled */
  disabled?: boolean
  /** Background style */
  background?: 'circle' | 'square' | 'primary' | 'success' | 'warning' | 'error'
  /** Margin spacing */
  marginRight?: '1' | '2' | '3'
  marginLeft?: '1' | '2' | '3'
  /** Additional CSS class names */
  className?: string
}

export function Icon({ 
  icon, 
  size = 'md',
  color = 'primary',
  interactive = false,
  disabled = false,
  background,
  marginRight,
  marginLeft,
  className = ''
}: IconProps) {
  const sizeClass = `icon-${size}`
  const colorClass = `icon-${color}`
  const interactiveClass = interactive ? 'icon-interactive' : ''
  const disabledClass = disabled ? 'icon-disabled' : ''
  const backgroundClass = background ? `icon-bg-${background}` : ''
  const marginRightClass = marginRight ? `icon-mr-${marginRight}` : ''
  const marginLeftClass = marginLeft ? `icon-ml-${marginLeft}` : ''
  
  const classes = [
    sizeClass,
    colorClass,
    interactiveClass,
    disabledClass,
    backgroundClass,
    marginRightClass,
    marginLeftClass,
    className
  ].filter(Boolean).join(' ')

  return (
    <FontAwesomeIcon 
      icon={icon}
      className={classes}
    />
  )
}

export default Icon