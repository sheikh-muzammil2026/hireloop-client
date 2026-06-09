export const createJob = async(payload, tokenData) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs`, {
        method: "POST",
        headers: {
            'content-type' : 'application/json',
            authorization: `bearer ${tokenData?.token}`
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json();
    return data;
}

export const getJobs = async(userId, tokenData)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs/company/${userId}`, {
        headers: {
            authorization: `bearer ${tokenData?.token}`
        }
    });
    const jobs = await res.json();
    return jobs;

}

export const browseJobs = async(search,category,type)=>{
    const url = search && search.trim() !== '' || category && category !== 'All' || type && type !== 'All'
       ? `${process.env.NEXT_PUBLIC_SERVER_URL}/jobs?search=${search}&category=${category}&type=${type}`
       : `${process.env.NEXT_PUBLIC_SERVER_URL}/jobs`
    const res = await fetch(url);
    const data = await res.json()
    return data;
}


export const getJobsByJobId = async(jobId, tokenData)=>{
   
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs/${jobId}`, {
        headers: {
            authorization: `bearer ${tokenData?.token}`
        }
    });
    if (!res.ok) {
      throw new Error("Failed to fetch job data");
    }
    const data = await res.json()
    return data;
}

export const createLogoUploadAction = async(formDaata) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/companies`, {
        method: "POST",
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify(formDaata)
    })
    const data = await res.json();
    return data;
}