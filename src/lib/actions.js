// form theke data niye post method diye server e post korbo

// database e joma hobe . seta ene manage jobs e dekhabo.

export const createJob = async(payload) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs`, {
        method: "POST",
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json();
    return data;
}

export const getJobs = async(userId)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs/${userId}`);
    const jobs = await res.json();
    return jobs;

}