"use client"

import React, { ReactNode, useState } from 'react';

interface FormInputProps {
    label: string;
    type?: string;
    name?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SettingsCardProps {
    title: string;
    children: ReactNode;
}
  
function SettingsCard({ title, children }: SettingsCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        {children}
        </div>
    );
}

function FormInput({ label, type = 'text', placeholder, value, onChange }: FormInputProps) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <input
          type={type}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
}


function Settings() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>

      <SettingsCard title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            value={personalInfo.firstName}
            onChange={handlePersonalInfoChange}
          />
          <FormInput
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            value={personalInfo.lastName}
            onChange={handlePersonalInfoChange}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={personalInfo.email}
            onChange={handlePersonalInfoChange}
          />
          <FormInput
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={personalInfo.phone}
            onChange={handlePersonalInfoChange}
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Address">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FormInput
              label="Street Address"
              name="street"
              placeholder="Enter your street address"
              value={personalInfo.street}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <FormInput
            label="City"
            name="city"
            placeholder="Enter your city"
            value={personalInfo.city}
            onChange={handlePersonalInfoChange}
          />
          <FormInput
            label="State/Province"
            name="state"
            placeholder="Enter your state"
            value={personalInfo.state}
            onChange={handlePersonalInfoChange}
          />
          <FormInput
            label="ZIP/Postal Code"
            name="zipCode"
            placeholder="Enter your ZIP code"
            value={personalInfo.zipCode}
            onChange={handlePersonalInfoChange}
          />
          <FormInput
            label="Country"
            name="country"
            placeholder="Enter your country"
            value={personalInfo.country}
            onChange={handlePersonalInfoChange}
          />
        </div>
      </SettingsCard>
    </div>
  );
}

export default Settings;