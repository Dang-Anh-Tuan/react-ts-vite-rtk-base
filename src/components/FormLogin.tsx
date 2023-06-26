import { useAuth } from '@hooks/auth'
import { ChangeEvent, FC, useState } from 'react'

interface FormLoginProps {}

const FormLogin: FC<FormLoginProps> = ({}) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { login } = useAuth({
    formData: {
      username,
      password
    }
  })

  return (
    <div>
      <input
        type='text'
        placeholder='Enter user name'
        value={username}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />
      <br />
      <input
        type='text'
        placeholder='Enter user password'
        value={password}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <br />
      <button
        onClick={async () => {
          await login()
        }}
      >
        Login
      </button>
    </div>
  )
}

export default FormLogin
