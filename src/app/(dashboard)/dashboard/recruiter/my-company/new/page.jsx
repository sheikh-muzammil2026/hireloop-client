'use client'
import { createLogoUploadAction } from '@/lib/actions';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CompanyRegister = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    category: '',
    website: '',
    location: '',
    employees: '',
    description: '',
    logo: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false)

  // ইনপুট চেঞ্জ হ্যান্ডেল করার জন্য
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // লোগো আপলোড এবং প্রিভিউ দেখার জন্য
  const handleLogoChange = async(e) => {
    const file = e.target.files[0];
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      setIsUploading(true)
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,{
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      const url = data?.data?.url;

      if(url){
          setPreviewUrl(url)
          setCompanyData((prev) => ({
      ...prev,
      logo: url,
    }));

      }
    
      
    } catch (error) {
      toast.error(`Uploading failed: ${error.message}`)
      
    }finally{
      setIsUploading(false)
    }
      

    
  };


  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(isUploading){
      toast.info("Let logo finish uploading")
      return
    }
    
   try {
    
    const data = await createLogoUploadAction(companyData)
  
    if(data.acknowledged){
        toast.success('কোম্পানি রেজিস্ট্রেশন সফল হয়েছে!')
         setCompanyData({
                      name: '',
                      category: '',
                      website: '',
                      location: '',
                      employees: '',
                      description: '',
                      logo: null,
                    })
                    setPreviewUrl(null)
                    }
    
   } catch (error) {
    toast.error(error.message)
    
   }

   
   
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
          HireLoop <span className="text-blue-500">Recruiter</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          আপনার কোম্পানির তথ্য দিয়ে প্রোফাইল তৈরি করুন
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* মেইন কার্ডটি ডার্ক গ্রে (bg-neutral-900) এবং বর্ডার কিছুটা সফট করা হয়েছে */}
        <div className="bg-neutral-950 py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-neutral-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* লোগো আপলোড সেকশন - ডার্ক থিম স্টাইল */}
            <div className="flex flex-col items-center justify-center space-y-3 border-2 border-dashed border-neutral-700 rounded-lg p-6 bg-neutral-900/50">
              {isUploading && <p className="text-blue-400 text-sm animate-pulse">Logo uploading...</p>}
              
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Logo Preview"
                  className="h-20 w-20 object-contain rounded-md border border-neutral-700 bg-black p-1"
                />
              ) : (
                <div className="h-20 w-20 bg-neutral-800 rounded-md flex items-center justify-center text-neutral-500 text-xs text-center p-1 border border-neutral-700">
                  কোনো লোগো নেই
                </div>
              )}
              
              <label className="cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-2 px-4 border border-neutral-700 rounded-md shadow-sm text-sm font-medium transition-colors">
                <span>কোম্পানি লোগো আপলোড করুন</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="sr-only"
                  disabled={isUploading}
                />
              </label>
            </div>

            {/* গ্রিড লেআউট (দুই কলামের জন্য) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* কোম্পানি নাম */}
              <div>
                <label className="block text-sm font-medium text-gray-300">কোম্পানির নাম *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={companyData.name}
                  onChange={handleChange}
                  placeholder="যেমন: HireLoop Ltd."
                  className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                />
              </div>

              {/* ক্যাটাগরি */}
              <div>
                <label className="block text-sm font-medium text-gray-300">ক্যাটাগরি *</label>
                <select
                  name="category"
                  required
                  value={companyData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                >
                  <option value="" className="bg-neutral-900">সিলেক্ট করুন</option>
                  <option value="IT & Software" className="bg-neutral-900">IT & Software</option>
                  <option value="E-commerce" className="bg-neutral-900">E-commerce</option>
                  <option value="Finance" className="bg-neutral-900">Finance</option>
                  <option value="Healthcare" className="bg-neutral-900">Healthcare</option>
                  <option value="Education" className="bg-neutral-900">Education</option>
                </select>
              </div>

              {/* ওয়েবসাইট */}
              <div>
                <label className="block text-sm font-medium text-gray-300">ওয়েবসাইট *</label>
                <input
                  type="url"
                  name="website"
                  required
                  value={companyData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                />
              </div>

              {/* লোকেশন */}
              <div>
                <label className="block text-sm font-medium text-gray-300">লোকেশন *</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={companyData.location}
                  onChange={handleChange}
                  placeholder="যেমন: ঢাকা, বাংলাদেশ"
                  className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                />
              </div>
            </div>

            {/* কর্মচারী বা মেম্বার সংখ্যা */}
            <div>
              <label className="block text-sm font-medium text-gray-300">কর্মচারী সংখ্যা (Employees) *</label>
              <select
                name="employees"
                required
                value={companyData.employees}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              >
                <option value="" className="bg-neutral-900">সিলেক্ট করুন</option>
                <option value="1-10" className="bg-neutral-900">১ - ১০ জন</option>
                <option value="11-50" className="bg-neutral-900">১১ - ৫০ জন</option>
                <option value="51-200" className="bg-neutral-900">৫১ - ২০০ জন</option>
                <option value="201-500" className="bg-neutral-900">২০১ - ৫০০ জন</option>
                <option value="500+" className="bg-neutral-900">৫০০+ জন</option>
              </select>
            </div>

            {/* কোম্পানির বিবরণ */}
            <div>
              <label className="block text-sm font-medium text-gray-300">কোম্পানির বিবরণ (Description) *</label>
              <textarea
                name="description"
                rows="4"
                required
                value={companyData.description}
                onChange={handleChange}
                placeholder="আপনার কোম্পানি সম্পর্কে কিছু লিখুন..."
                className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm resize-none"
              ></textarea>
            </div>

            {/* সাবমিট বাটন */}
            <div>
              <button
                type="submit"
                disabled={isUploading}
                className="w-full cursor-pointer flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'লোগো আপলোড হচ্ছে...' : 'কোম্পানি রেজিস্টার করুন'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;