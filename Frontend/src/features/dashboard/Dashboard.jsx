import React from 'react'
import { useSelector } from 'react-redux'
import TrainerDashboard from './TrainerDashboard'
import StudentDashboard from './StudentDashboard'

const Dashboar = () => {
    const {user}=useSelector((state)=>state.auth)
    if(user.role==="Trainer"){
        return <TrainerDashboard/>
    }
    if(user.role==="Student"){
        return <StudentDashboard/>
    }
  return null
}

export default Dashboar