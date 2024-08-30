export interface jobSearch{
    jobTitle:string;
    location:string;
}

export interface applicationDetails{
    jobId:string;
    firstName:string;
    lastName:string;
    citizenship:string;
    dateOfBirth:string;
    address:string;
    zipCode:string;
    city:string;
    phoneNumber:string;
    email:string;
    coverLetter:string;
    resume:File;                        
}