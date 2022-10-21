export interface DetailPostulant {
  _id: string;
  title: string;
  descriptionPost: string;
  funtionsPost: string;
  priority: number;
  location: string;
  modality: string;
  idCategory: string;
  idPosition: string;
  idCompany: string;
  idsSkillsPostJob: string[];
  salaryRange: string;
  timeEstimated: string;
  state: boolean;
  createdDate: number;
  updateDate: number;
  stateSalary: boolean;
  stateExperience: boolean;
  porcentageSkills: number;
  skillsMatch: any[];
  dataPostAndPostulant: DataPostAndPostulant;
}

export interface DataPostAndPostulant {
  _id: string;
  idPostJob: string;
  idPostulant: string;
  documentType: string;
  documentNumber: string;
  amountEstimated: string;
  typeAmount: string;
  skillsIds: any[];
  typeBio: string;
  linkBio: string;
  createdDate: number;
  updateDate: number;
  userDataPostulant: UserDataPostulant;
}

export interface UserDataPostulant {
  email: string,
  facebook: string,
  facebookURL: string,
  lastName: string,
  linkedin: string,
  linkedinURL: string,
  name: string,
  phone: string,
  rol: string,
  ruc: string,
  web: string,
  webURL: string,
  youtube: string,
  youtubeURL: string,
}

export interface Category {
  _id: string;
  nameCategory: string;
  descriptionCategory: string;
  createdDate: number;
}
