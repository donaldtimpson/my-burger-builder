import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

export interface ILogoProps {
  className?: string | null;
}

function Logo({ className }: ILogoProps) {
  const compClass = [classes.Logo, className].join(' ')
  return <div className={compClass}>
    <img src={burgerLogo} alt="My Burger"/>
  </div>
}

export default Logo