/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Card from '../Reusable/card'
const adminLandingPage = () => {
  return (
    <div className='fluid-container'>
    <div className='row g-0 p-5'>
        <div className='col-sm-4 p-3'>
          <Card color="card-color-tomato" type='IconsR' icon="faPlusSquare" title="Add Doctor" link="/add/doctor"/>
        </div>
        <div className='col-sm-4 p-3'>
          <Card color="card-color-darkgreen" type='IconsS' icon="faUserDoctor" title="View Doctors" link="/view/doctors"/>
        </div>
        <div className='col-sm-4 p-3'>
          <Card color="card-color-darkgreen" type='IconsS' icon="faUserDoctor" title="Hospiotal Details" link="/hospital/details"/>
        </div>
    </div>
  </div>
  )
}
export default adminLandingPage
