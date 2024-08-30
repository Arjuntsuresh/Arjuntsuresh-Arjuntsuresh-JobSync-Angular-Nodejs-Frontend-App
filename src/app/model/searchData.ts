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
export interface jobData{
    jobTitle:string;
    companyName:string;
    location:string;
    jobDescription:string;
    applicationDeadline:string;
}

export interface signupDetails{
    email:string;
    password:string;
    mobile:string;
    userName:string;
}

export interface loginDetails{
    email:string;
    password:string;
}