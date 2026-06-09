'use client';

import { createLogoUploadAction } from '@/lib/actions';
import { useState } from 'react';

export default function RegisterCompanyModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    website: '',
    location: '',
    employees: '',
    description: '',
    logo: null
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogo = async(e) =>{
    // image recieve
    const file = e.target.files[0];
      if(!file) return

  //  empty formData object creating
    const formData = new FormData();
    formData.append('image', file);

  // calling api to upload image
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, {
    method: "POST",
    body: formData
  })
  const data = await res.json()
  
  const url = data?.data.url;
  setForm((prev)=> ({...prev, logo: url}))
    
  }

  if (!isOpen) return null;

    console.log(form, "from company register modal")
  const handleSubmit = async() => {
     await createLogoUploadAction(form)
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL CARD */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0B0B0F]/95 shadow-2xl text-white">

        {/* HEADER */}
        <div className="p-5 sm:p-6 border-b border-white/10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Register New Company
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Enter your business details to start hiring on HireLoop.
          </p>
        </div>

        {/* FORM */}
        <div className="p-5 sm:p-6 space-y-6">

          {/* GRID SECTION 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-300">Company Name</label>
              <input
                className="mt-1 w-full h-11 rounded-xl bg-white/5 border border-white/10 px-3 text-sm focus:border-violet-500 focus:outline-none"
                placeholder="e.g. Acme Corp"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Industry</label>
              <input
                className="mt-1 w-full h-11 rounded-xl bg-white/5 border border-white/10 px-3 text-sm focus:border-violet-500 focus:outline-none"
                placeholder="Technology"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
              />
            </div>

          </div>

          {/* GRID SECTION 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-300">Website</label>
              <input
                className="mt-1 w-full h-11 rounded-xl bg-white/5 border border-white/10 px-3 text-sm focus:border-violet-500 focus:outline-none"
                placeholder="https://www.company.com"
                value={form.website}
                onChange={(e) => handleChange('website', e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Location</label>
              <input
                className="mt-1 w-full h-11 rounded-xl bg-white/5 border border-white/10 px-3 text-sm focus:border-violet-500 focus:outline-none"
                placeholder="City, Country"
                value={form.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>

          </div>

          {/* EMPLOYEE + LOGO SIDE BY SIDE (DESKTOP) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-300">Employee Range</label>
              <select
                className="mt-1 w-full h-11  rounded-xl bg-white/5 border border-white/10 px-3 text-sm text-gray-200  focus:border-violet-500 focus:outline-none"
                value={form.employees}
                onChange={(e) => handleChange('employees', e.target.value)}
              >
                <option value="" className="text-black">Select range</option>
                <option value="1-10" className="text-black">1-10 employees</option>
                <option value="11-50" className="text-black">11-50 employees</option>
                <option value="51-200" className="text-black">51-200 employees</option>
                <option value="201-500" className="text-black">201-500 employees</option>
                <option value="500+" className="text-black">500+ employees</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-300">Company Logo</label>

              <input
                type="file"
                accept="image/png, image/jpeg"
                // value={logoUrl}
                onChange={handleLogo}
                className="mt-2 w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20"
              />

              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>

          </div>

          {/* FULL WIDTH DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-300">Description</label>

            <textarea
              className="mt-1 w-full min-h-[110px] rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none"
              placeholder="Tell us about your company's mission and culture..."
              value={form.description}
              onChange={(e) =>
                handleChange('description', e.target.value)
              }
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 p-5 sm:p-6 border-t border-white/10">

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-sm"
          >
            Register Company
          </button>

        </div>

      </div>
    </div>
  );
}