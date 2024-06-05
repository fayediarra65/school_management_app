create table if not exists utilisateur(
    id int primary key,
    nom varchar(255),
    prenom varchar(255),
    profil varchar(255)

);
/**
  Professeur,Etudiant et Administrateur qui heritent de utilisateur
  */

  create table if not exists  professeur(
    id int primary key,
    id_utilisateur int,
    foreign key(id_utilisateur) references utilisateur(id)
  )