import React from 'react'
import { useAuth } from '../../context/Auth'
import { Card, Typography } from '@mui/material'

const UserHome = () => {
    const [auth]= useAuth()
  return (
    <>
    <Typography variant='h4'>Welcome to the User Home</Typography>
<Card sx={{p:2 , mt:2}}>
    <Typography><strong>Name</strong>{auth?.user?.name}</Typography>
    <Typography><strong>Email</strong>{auth?.user?.email}</Typography>
    <Typography><strong>Role</strong>{auth?.user?.role}</Typography>
    </Card>        
    </>
  )
}

export default UserHome