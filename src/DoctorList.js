import React from 'react';

const DoctorList = ({ doctors }) => {
  if (!doctors || doctors.length === 0) {
    return <div>No doctors found.</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {doctors.map((doctor) => (
        <div key={doctor.id} data-testid="doctor-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', width: '200px' }}>
          <img src={doctor.photo} alt={doctor.name} style={{ width: '100%', borderRadius: '8px' }} />
          <h2 data-testid="doctor-name">{doctor.name}</h2>
          <p data-testid="doctor-specialty">
            {doctor.specialties && Array.isArray(doctor.specialties) && doctor.specialties.length > 0 
              ? doctor.specialties.join(', ') 
              : 'No specialties listed'}
          </p>
          <p data-testid="doctor-experience">{doctor.experience} years of experience</p>
          <p data-testid="doctor-fee">Fee: ₹{doctor.fee}</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;