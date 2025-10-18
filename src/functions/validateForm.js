import { Filter } from "bad-words";

const filter = new Filter();
const date2010 = "2010-01-01";
const shirtSizes = ["S", "M", "L", "XL"];
const nameRegex = /^(?=.{1,30}$)[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
const teamNameRegex = /^[\p{L}0-9]{2,50}$/u;

export function validateForm(data) {

  // Kapitan
  if (!data.team.captainName?.trim() || data.team.captainName.trim().length < 2) {
    return 'Imię i nazwisko kapitana jest wymagane.';
  }

  if(!nameRegex.test(data.team.captainName)){
    return 'Imię lub nazwisko kapitana zawiera niedozwolone znaki.';
  }

  const tel = data.team.captainTel.replace(/\D/g, '');
  // Telefon
  if (!/^\d{9}$/.test(tel)) {
    return 'Numer telefonu musi mieć dokładnie 9 cyfr.';
  }

  // Email
  if (!/\S+@\S+\.\S+/.test(data.team.captainEmail)) {
    return 'Niepoprawny adres email.';
  }

  // Nazwa drużyny
  if (!data.team.teamName?.trim() || data.team.teamName.trim().length < 2) {
    return 'Nazwa drużyny jest wymagana.';
  }

  if (filter.isProfane(data.team.teamName)) {
    return 'Nazwa drużyny zawiera niedozwolone słowa.';
  }

  if(!teamNameRegex.test(data.team.teamName)){
    return 'Nazwa drużyny zawiera niedozwolone znaki.';
  }

  // Zawodnicy
  for (let index = 0; index < data.members.length; index++) {
    const member = data.members[index];
    const i = index + 1;

    if (index == 0) {
      if (member.firstName.toLowerCase() + " " + member.lastName.toLowerCase() !== data.team.captainName.toLowerCase()) {
        return 'Imię i nazwisko kapitana musi zgadzać się z danymi pierwszego zawodnika.';
      }
    }

    if (!member.firstName || member.firstName.length < 2) {
      return `Imię zawodnika ${i} jest wymagane.`;
    }

    if(!nameRegex.test(member.firstName)){
      return `Imię zawodnika ${i} zawiera niedozwolone znaki.`;
    }

    if (!member.lastName || member.lastName.length < 2) {
      return `Nazwisko zawodnika ${i} jest wymagane.`;
    }

    if(!nameRegex.test(member.lastName)){
      return `Nazwisko zawodnika ${i} zawiera niedozwolone znaki.`;
    }

    if (filter.isProfane(member.lastName)) {
      return `Nazwisko zawodnika ${i} zawiera niedozwolone słowa.`;
    }

    if (!/^https:\/\/steamcommunity\.com(\/(id|profiles)\/[A-Za-z0-9_-]+)?\/?$/.test(member.steam)) {
      return `Link Steam zawodnika ${i} jest niepoprawny.`;
    }

    if (!member.birthDate || new Date(member.birthDate) > new Date(date2010) || isNaN(new Date(member.birthDate))) {
      return `Zawodnik ${i} musi być urodzony przed ${date2010}.`;
    }

    if (!shirtSizes.includes(member.shirtSize)) {
      return `Niepoprawny rozmiar koszulki zawodnika ${i}.`;
    }
  }

  const steamIDs = data.members.map(member => member.steam.trim());
  const uniqueSteamIDs = new Set(steamIDs);

  if (uniqueSteamIDs.size !== steamIDs.length) {
    return 'Każdy link Steam musi być unikalny.';
  }

  if (!data.agreements?.rulesAccepted) {
    return "Musisz zaakceptować regulamin turnieju.";
  }
  
  if (!data.agreements?.gdprAccepted) {
    return "Musisz zaakceptować klauzulę informacyjną dotyczącą ochrony danych osobowych.";
  }

  return null;
}
