import React, { useEffect, useState } from 'react';
import DoctorList from './DoctorList';
import FilterPanel from './FilterPanel';

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filters, setFilters] = useState({
    consultationType: '',  // can be 'In Clinic', 'Video Consult', 'Both', or '' (all)
    specialties: [],
    sortBy: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      // Enhanced doctor data with 25+ doctors and mixed consultation types
      const doctorData = [
        { id: 1, name: 'Dr. John Smith', consultationType: 'Video Consult', specialties: ['General Physician'], experience: 10, fee: 500, photo: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Dr. Jane Doe', consultationType: 'In Clinic', specialties: ['Dentist'], experience: 8, fee: 700, photo: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 3, name: 'Dr. Emily Johnson', consultationType: 'Video Consult', specialties: ['Dermatologist'], experience: 5, fee: 600, photo: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 4, name: 'Dr. Michael Brown', consultationType: 'In Clinic', specialties: ['Paediatrician'], experience: 12, fee: 800, photo: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 5, name: 'Dr. Sarah Wilson', consultationType: 'Both', specialties: ['Gynaecologist'], experience: 7, fee: 750, photo: 'https://randomuser.me/api/portraits/women/3.jpg' },
        { id: 6, name: 'Dr. David Lee', consultationType: 'In Clinic', specialties: ['Cardiologist'], experience: 15, fee: 900, photo: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 7, name: 'Dr. Anna Taylor', consultationType: 'Both', specialties: ['Endocrinologist'], experience: 6, fee: 650, photo: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { id: 8, name: 'Dr. Robert Wilson', consultationType: 'Video Consult', specialties: ['Psychiatrist'], experience: 9, fee: 700, photo: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { id: 9, name: 'Dr. Linda Martinez', consultationType: 'In Clinic', specialties: ['Orthopaedic'], experience: 11, fee: 850, photo: 'https://randomuser.me/api/portraits/women/5.jpg' },
        { id: 10, name: 'Dr. James Anderson', consultationType: 'Both', specialties: ['Gastroenterologist'], experience: 14, fee: 800, photo: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { id: 11, name: 'Dr. Patricia Thomas', consultationType: 'Video Consult', specialties: ['Physiotherapist'], experience: 4, fee: 500, photo: 'https://randomuser.me/api/portraits/women/6.jpg' },
        { id: 12, name: 'Dr. Charles Jackson', consultationType: 'In Clinic', specialties: ['Ophthalmologist'], experience: 10, fee: 750, photo: 'https://randomuser.me/api/portraits/men/6.jpg' },
        { id: 13, name: 'Dr. Jessica White', consultationType: 'Both', specialties: ['Neurologist'], experience: 8, fee: 900, photo: 'https://randomuser.me/api/portraits/women/7.jpg' },
        { id: 14, name: 'Dr. Daniel Harris', consultationType: 'Video Consult', specialties: ['Oncologist'], experience: 12, fee: 950, photo: 'https://randomuser.me/api/portraits/men/7.jpg' },
        { id: 15, name: 'Dr. Laura Clark', consultationType: 'In Clinic', specialties: ['Dermatologist'], experience: 9, fee: 700, photo: 'https://randomuser.me/api/portraits/women/8.jpg' },
        { id: 16, name: 'Dr. Matthew Lewis', consultationType: 'Both', specialties: ['ENT'], experience: 7, fee: 650, photo: 'https://randomuser.me/api/portraits/men/8.jpg' },
        { id: 17, name: 'Dr. Amanda Walker', consultationType: 'Video Consult', specialties: ['Diabetologist'], experience: 10, fee: 800, photo: 'https://randomuser.me/api/portraits/women/9.jpg' },
        { id: 18, name: 'Dr. Christopher Hall', consultationType: 'In Clinic', specialties: ['Urologist'], experience: 13, fee: 850, photo: 'https://randomuser.me/api/portraits/men/9.jpg' },
        { id: 19, name: 'Dr. Michelle Allen', consultationType: 'Both', specialties: ['Dietitian/Nutritionist'], experience: 5, fee: 600, photo: 'https://randomuser.me/api/portraits/women/10.jpg' },
        { id: 20, name: 'Dr. Kevin Young', consultationType: 'Video Consult', specialties: ['Psychologist'], experience: 6, fee: 550, photo: 'https://randomuser.me/api/portraits/men/10.jpg' },
        { id: 21, name: 'Dr. Stephanie King', consultationType: 'In Clinic', specialties: ['Sexologist'], experience: 8, fee: 700, photo: 'https://randomuser.me/api/portraits/women/11.jpg' },
        { id: 22, name: 'Dr. Joshua Wright', consultationType: 'Both', specialties: ['Nephrologist'], experience: 11, fee: 900, photo: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { id: 23, name: 'Dr. Rachel Scott', consultationType: 'Video Consult', specialties: ['Ayurveda'], experience: 9, fee: 650, photo: 'https://randomuser.me/api/portraits/women/12.jpg' },
        { id: 24, name: 'Dr. Andrew Green', consultationType: 'In Clinic', specialties: ['Homeopath'], experience: 7, fee: 500, photo: 'https://randomuser.me/api/portraits/men/12.jpg' },
        { id: 25, name: 'Dr. Nicole Adams', consultationType: 'Both', specialties: ['Pulmonologist'], experience: 10, fee: 800, photo: 'https://randomuser.me/api/portraits/women/13.jpg' },
        { id: 26, name: 'Dr. Timothy Baker', consultationType: 'Video Consult', specialties: ['General Physician'], experience: 4, fee: 450, photo: 'https://randomuser.me/api/portraits/men/13.jpg' },
        { id: 27, name: 'Dr. Samantha Carter', consultationType: 'In Clinic', specialties: ['Dentist'], experience: 6, fee: 600, photo: 'https://randomuser.me/api/portraits/women/14.jpg' },
        { id: 28, name: 'Dr. Benjamin Mitchell', consultationType: 'Both', specialties: ['Cardiologist'], experience: 14, fee: 950, photo: 'https://randomuser.me/api/portraits/men/14.jpg' }
      ];

      setDoctors(doctorData);
      setFilteredDoctors(doctorData);
    };

    fetchDoctors();
  }, []);

  return (
    <div className="app-container">
      <h1>Doctor Finder</h1>
      <div className="content">
        <FilterPanel 
          filters={filters}
          setFilters={setFilters}
          doctors={doctors}
          setFilteredDoctors={setFilteredDoctors}
        />
        <DoctorList doctors={filteredDoctors} />
      </div>
    </div>
  );
};

export default App;