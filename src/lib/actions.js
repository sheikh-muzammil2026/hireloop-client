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
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs/${userId}`, {
        headers: {
            authorization: `bearer ${tokenData?.token}`
        }
    });
    const jobs = await res.json();
    return jobs;

}

export const browseJobs = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs`);
    const data = await res.json()
    return data;
}