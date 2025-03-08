
export interface Member {
  name: string;
  role: string;
  age?: number;
  class?: string;
  image: string;
}

export interface Sponsor {
  name: string;
  image: string;
  field?: string;
  role?: string;
  description?: string;
}

export interface Announcement {
  title: string;
  dateDebut: string;
  dateFin: string;
  description: string;
  image: string;
}

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  className: string;
  institution: string;
  eventTitle?: string;
}
