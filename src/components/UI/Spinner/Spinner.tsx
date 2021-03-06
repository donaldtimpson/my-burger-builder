import classes from './Spinner.module.css'

export interface ISpinnerProps {
  className?: string | null;
}

const Spinner = ({ className }: ISpinnerProps) => {
  const compClass = [classes.Spinner, className].join(' ')
  return <div className={compClass}>Loading...</div>
}

export default Spinner