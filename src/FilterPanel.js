import React from 'react';

const FilterPanel = ({ filters, setFilters, doctors, setFilteredDoctors }) => {
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(term)
    );
    setFilteredDoctors(filtered);
  };

  const handleConsultationTypeChange = (type) => {
    setFilters({ ...filters, consultationType: type });
  };

  const handleSpecialtyChange = (specialty) => {
    const specialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    setFilters({ ...filters, specialties });
  };

  const handleSortChange = (sortBy) => {
    setFilters({ ...filters, sortBy });
  };

  const applyFilters = () => {
    let filteredDoctors = [...doctors];

    // Filter by consultation type
    if (filters.consultationType) {
      if (filters.consultationType === 'Both') {
        // Show all doctors who offer any consultation type
        filteredDoctors = filteredDoctors.filter(doctor => 
          ['In Clinic', 'Video Consult', 'Both'].includes(doctor.consultationType)
        );
      } else {
        // Show doctors who offer the selected type or both
        filteredDoctors = filteredDoctors.filter(doctor => 
          doctor.consultationType === filters.consultationType || 
          doctor.consultationType === 'Both'
        );
      }
    }

    // Filter by specialties
    if (filters.specialties.length > 0) {
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.specialties.some(specialty => filters.specialties.includes(specialty))
      );
    }

    // Sort the results
    if (filters.sortBy === 'fees') {
      filteredDoctors.sort((a, b) => a.fee - b.fee);
    } else if (filters.sortBy === 'experience') {
      filteredDoctors.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(filteredDoctors);
  };

  const clearFilters = () => {
    setFilters({
      consultationType: '',
      specialties: [],
      sortBy: ''
    });
    setFilteredDoctors(doctors);
  };

  const specialtiesList = [
    'General Physician', 'Dentist', 'Dermatologist', 'Paediatrician',
    'Gynaecologist', 'ENT', 'Diabetologist', 'Cardiologist',
    'Physiotherapist', 'Endocrinologist', 'Orthopaedic',
    'Ophthalmologist', 'Gastroenterologist', 'Pulmonologist',
    'Psychiatrist', 'Urologist', 'Dietitian/Nutritionist',
    'Psychologist', 'Sexologist', 'Nephrologist', 'Neurologist',
    'Oncologist', 'Ayurveda', 'Homeopath'
  ];

  return (
    <div className="filter-panel" style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      {/* Search Input */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search for a doctor..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        />
      </div>

      {/* Consultation Type Filter */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Consultation Type</h3>
        <div style={{ display: 'flex', gap: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="radio"
              name="consultationType"
              checked={filters.consultationType === 'In Clinic'}
              onChange={() => handleConsultationTypeChange('In Clinic')}
            />
            In Clinic
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="radio"
              name="consultationType"
              checked={filters.consultationType === 'Video Consult'}
              onChange={() => handleConsultationTypeChange('Video Consult')}
            />
            Online
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="radio"
              name="consultationType"
              checked={filters.consultationType === 'Both'}
              onChange={() => handleConsultationTypeChange('Both')}
            />
            Both
          </label>
        </div>
      </div>

      {/* Specialties Filter */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Specialties</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px'
        }}>
          {specialtiesList.map((specialty) => (
            <label key={specialty} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="checkbox"
                checked={filters.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
              />
              {specialty}
            </label>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Sort By</h3>
        <div style={{ display: 'flex', gap: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="radio"
              name="sortBy"
              checked={filters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
            />
            Fees (Low to High)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="radio"
              name="sortBy"
              checked={filters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
            />
            Experience (High to Low)
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={applyFilters}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          style={{
            padding: '10px 15px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;