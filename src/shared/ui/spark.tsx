import { cn } from '../lib/utils'

export const Spark = ({ size = 100, color = 'white', className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 100 100'
      className={cn('absolute translate-x-1/2 translate-y-[141%]', className)}
    >
      <g className='translate-x-[42.5px] translate-y-[42.5px]'>
        <g className='animate-large duration-[2.5s] repeat-infinite'>
          <path
            className='-translate-x-[42.5px] -translate-y-[42.5px]'
            id='large'
            d='M41.25,40 L42.5,10 L43.75,40 L45,41.25 L75,42.5 L45,43.75 L43.75,45 L42.5,75 L41.25,45 L40,43.75 L10,42.5 L40,41.25z'
            fill={color}
          />
        </g>
        <g
          className='animate-large-2 duration-[2.5s] repeat-infinite'
          transform='rotate(45)'
        >
          <use xlinkHref='#large' />
        </g>
        <g className='animate-small duration-[2.5s] repeat-infinite'>
          <path
            className='-translate-x-[42.5px] -translate-y-[42.5px]'
            d='M41.25,40 L42.5,25 L43.75,40 L45,41.25 L60,42.5 L45,43.75 L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z'
            fill={color}
          />
        </g>
      </g>
    </svg>
  )
}
