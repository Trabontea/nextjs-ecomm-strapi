import { FaUserCircle } from 'react-icons/fa'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useUser } from '@auth0/nextjs-auth0'


export default function User() {
  const route = useRouter()
  const { user } = useUser()
  if (!user)
    return (
      <div onClick={() => route.push('/api/auth/login')}>
        <FaUserCircle />
        <h3>Profile</h3>
      </div>
    )
  return (
    <Profile onClick={() => route.push('/profile')}>
      <img src={user.picture} alt={user.name} />
      <h3>Profile</h3>
    </Profile>
  )
}

const Profile = styled.div`
  img {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }
`
