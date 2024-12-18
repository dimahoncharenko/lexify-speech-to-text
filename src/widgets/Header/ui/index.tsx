import { UserButton } from '@clerk/nextjs'

export const Header = () => {
  return (
    <header className='bg-gray-200'>
      <div className='container flex flex-row justify-between py-2'>
        <h2>Lexify</h2>
        <UserButton showName />
      </div>
    </header>
  )
}
