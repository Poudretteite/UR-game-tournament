import { Filter } from "bad-words";

const filter = new Filter();
const shirtSizes = ["S", "M", "L", "XL"];
const nameRegex = /^(?=.{1,30}$)[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
const teamNameRegex = /^[\p{L}0-9\s]{2,50}$/u;

export function isAtLeast18(birthDateStr) {
  if (!birthDateStr) return false;
  const birthDate = new Date(birthDateStr);
  if (isNaN(birthDate.getTime())) return false;
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  return birthDate <= minDate;
}

export function validateForm(data) {
  if (!data || !data.team || !Array.isArray(data.members)) {
    return 'Niepoprawna struktura formularza.';
  }

  if (data.members.length < 5 || data.members.length > 6) {
    return 'Drużyna musi składać się z 5 lub 6 zawodników.';
  }

  // Kapitan
  if (!data.team.captainName?.trim() || data.team.captainName.trim().length < 2) {
    return 'Imię i nazwisko kapitana jest wymagane.';
  }

  if (!nameRegex.test(data.team.captainName.trim())) {
    return 'Imię lub nazwisko kapitana zawiera niedozwolone znaki.';
  }

  const tel = String(data.team.captainTel || '').replace(/\D/g, '');
  // Telefon
  if (!/^\d{9}$/.test(tel)) {
    return 'Numer telefonu musi mieć dokładnie 9 cyfr.';
  }

  // Email
  if (!/\S+@\S+\.\S+/.test(String(data.team.captainEmail || ''))) {
    return 'Niepoprawny adres email.';
  }

  // Nazwa drużyny
  if (!data.team.teamName?.trim() || data.team.teamName.trim().length < 2) {
    return 'Nazwa drużyny jest wymagana.';
  }

  if (filter.isProfane(data.team.teamName)) {
    return 'Nazwa drużyny zawiera niedozwolone słowa.';
  }

  if (!teamNameRegex.test(data.team.teamName.trim())) {
    return 'Nazwa drużyny zawiera niedozwolone znaki.';
  }

  // Zawodnicy
  for (let index = 0; index < data.members.length; index++) {
    const member = data.members[index] || {};
    const i = index + 1;

    if (index === 0) {
      const captainNameNorm = (data.team.captainName || '').trim().toLowerCase();
      const memberNameNorm = `${member.firstName || ''} ${member.lastName || ''}`.trim().toLowerCase();
      if (memberNameNorm !== captainNameNorm) {
        return 'Imię i nazwisko kapitana musi zgadzać się z danymi pierwszego zawodnika.';
      }
    }

    if (!member.firstName || member.firstName.trim().length < 2) {
      return `Imię zawodnika ${i} jest wymagane.`;
    }

    if (!nameRegex.test(member.firstName.trim())) {
      return `Imię zawodnika ${i} zawiera niedozwolone znaki.`;
    }

    if (!member.lastName || member.lastName.trim().length < 2) {
      return `Nazwisko zawodnika ${i} jest wymagane.`;
    }

    if (!nameRegex.test(member.lastName.trim())) {
      return `Nazwisko zawodnika ${i} zawiera niedozwolone znaki.`;
    }

    if (!/^https:\/\/steamcommunity\.com(\/(id|profiles)\/[A-Za-z0-9_-]+)?\/?$/.test(member.steam || '')) {
      return `Link Steam zawodnika ${i} jest niepoprawny.`;
    }

    if (!member.birthDate || !isAtLeast18(member.birthDate)) {
      return `Zawodnik ${i} musi mieć ukończone 18 lat.`;
    }

    if (!shirtSizes.includes(member.shirtSize)) {
      return `Niepoprawny rozmiar koszulki zawodnika ${i}.`;
    }
  }

  const steamIDs = data.members.map(member => (member.steam || '').trim());
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
