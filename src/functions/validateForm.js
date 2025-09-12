import { Filter } from "bad-words";

const filter = new Filter();
const date2007 = "2007-08-06";
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

  if (filter.isProfane(data.team.captainName)) {
    return 'Imię lub nazwisko kapitana zawiera niedozwolone słowa.';
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
    const optional = i === 6;

    // Pomijamy opcjonalnego rezerwowego, jeśli pola są puste
    if (optional && !member.firstName && !member.lastName && !member.steam) {
      continue;
    }

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

    if (filter.isProfane(member.firstName)) {
      return `Imię zawodnika ${i} zawiera niedozwolone słowa.`;
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

    if (!/^https:\/\/steamcommunity\.com\/profiles\/\d{17}\/?$/.test(member.steam)) {
      return `Link Steam zawodnika ${i} jest niepoprawny.`;
    }

    if (!/^https:\/\/www\.faceit\.com\/[a-z]{2}\/players\/[A-Za-z0-9_.-]+\/?$/.test(member.faceit)) {
      return `Link Faceit zawodnika ${i} jest niepoprawny.`;
    }

    if (!member.birthDate || new Date(member.birthDate) > new Date(date2007) || isNaN(new Date(member.birthDate))) {
      return `Zawodnik ${i} musi być urodzony przed ${date2007}.`;
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

  const faceitIDs = data.members.map(member => member.faceit.trim());
  const uniqueFaceitIDs = new Set(steamIDs);

  if (uniqueFaceitIDs.size !== faceitIDs.length) {
    return 'Każdy link FACEIT musi być unikalny.';
  }  

  return null;
}
