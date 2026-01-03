import React from 'react'
import { useAuth } from '../../context/Auth'
import { Card, Typography } from '@mui/material'

const AdminHome = () => {

    const [auth] = useAuth()
  return (
     <>
      <Typography variant="h4">Welcome to Admin Dashboard</Typography>

      <Card sx={{ p: 2, mt: 2 }}>
        <Typography><strong>Name:</strong> {auth?.user?.name}</Typography>
        <Typography><strong>Email:</strong> {auth?.user?.email}</Typography>
        <Typography><strong>Role:</strong> {auth?.user?.role}</Typography>
      </Card>
    </>
  )
}

export default AdminHome