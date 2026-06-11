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

export const createLogoUploadAction = async(formData) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/companies`, {
        method: "POST",
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify(formData)
    })
    const data = await res.json();
    return data;
}

export const submitApplication = async(formData)=>{
   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/applications`, {
        method: "POST",
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify(formData)
    })
    const data = await res.json();
    return data;
}

export const getPlansByPlanId = async(planId)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/plans?${planId}`);
        const plans = await res.json()
        return plans;
    } catch (error) {
        console.log('fetching plans failed. try again', error.message);
    }

}

export const getAppliedJobsByEmail = async(userEmail) =>{
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/applications?userEmail=${userEmail}`)
                const appData = await res.json()
                return appData;
            } catch (error) {
                console.log(error, "Fetching app data failed.");
            }
}