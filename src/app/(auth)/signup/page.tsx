import { login, signup } from '@/server-actions/auth'

export default function SignupPage() {
  return (
    <form className='flex flex-col gap-4'>
      <label htmlFor='email'>Email:</label>
      <input id='email' name='email' type='email' required />
      <label htmlFor='password'>Password:</label>
      <input id='password' name='password' type='password' required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}
