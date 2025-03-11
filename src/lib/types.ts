// lib/types.ts

/**
 * Représente un membre du club IT
 */
export interface Member {
  /** Nom complet du membre */
  name: string;
  
  /** Rôle au sein du club */
  role: string;
  
  /** Âge optionnel */
  age?: number;
  
  /** Classe optionnelle */
  class?: string;
  
  /** URL de l'image de profil */
  image: `${"http" | "https"}://${string}.${string}`;
}

/**
 * Représente un partenaire/sponsor
 */
export interface Sponsor {
  /** Nom de l'entreprise/partenaire */
  name: string;
  
  /** URL du logo */
  image: string;
  
  /** Domaine d'activité */
  field?: string;
  
  /** Type de partenariat */
  role?: string;
  
  /** Description détaillée */
  description?: string;
}

/**
 * Annonce/événement du club
 */
export interface Announcement {
  /** Titre de l'annonce */
  title: string;
  
  /** Date de début au format ISO */
  dateDebut: string;
  
  /** Date de fin au format ISO */
  dateFin: string;
  
  /** Description détaillée */
  description: string;
  
  /** URL de l'image illustrative */
  image: string;
}

/**
 * Données de formulaire génériques
 */
export interface FormData {
  /** Nom complet */
  fullName: string;
  
  /** Email valide */
  email: string;
  
  /** Numéro de téléphone */
  phone: string;
  
  /** Classe de l'étudiant */
  className: string;
  
  /** Établissement d'origine */
  institution: string;
  
  /** Titre de l'événement (optionnel) */
  eventTitle?: string;
}