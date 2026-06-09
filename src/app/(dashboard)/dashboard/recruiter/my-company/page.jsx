import MyCompanies from '@/components/dashboard/recruiter/my-companies/MyCompnies';
import React from 'react';

const MyCompanyPage = () => {
    return (
       <MyCompanies/>
    );
};

export default MyCompanyPage;


/**
 * step-1 form er data 2vabe neya. 2nd holo, logoUpload stystem. file= new FormData -> FormData.append('image, file)
 * step-2 api key nibo imagebb theke. sathe upload url
 * step-3 api ene url e set korbo doc onusare. and post method diye fetch korbo. body te dibo creted FormData.
 * step-4 upload success hoye gele data.data.url ke setLogoUrl(url) bosiye dibo.
 * step-5 logo url ke ebar onno sokol data er sathe send kore register kore nibo.
 * */ 