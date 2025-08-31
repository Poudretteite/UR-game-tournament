import Filter from 'bad-words';
const filter = new Filter();

const date2007 = "2007-08-06";
const shirtSizes = ["S", "M", "L", "XL"];

export function validateForm(data) {
  // Kapitan
  if (!data.team.captainName?.trim() || data.team.captainName.trim().length < 2) {
    return 'Imię i nazwisko kapitana jest wymagane.';
  }
  if (filter.isProfane(data.team.captainName)) {
    return 'Imię kapitana zawiera niedozwolone słowa.';
  }

  // Telefon
  if (!/^\d{9}$/.test(data.team.captainPhone)) {
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

  // Zawodnicy
  for (let index = 0; index < data.members.length; index++) {
    const member = data.members[index];
    const i = index + 1;
    const optional = i === 6;

    // Pomijamy opcjonalnego rezerwowego, jeśli pola są puste
    if (optional && !member.firstName && !member.lastName && !member.steam) {
      continue;
    }

    if (!member.firstName || member.firstName.length < 2) {
      return `Imię zawodnika ${i} jest wymagane.`;
    }
    if (filter.isProfane(member.firstName)) {
      return `Imię zawodnika ${i} zawiera niedozwolone słowa.`;
    }

    if (!member.lastName || member.lastName.length < 2) {
      return `Nazwisko zawodnika ${i} jest wymagane.`;
    }
    if (filter.isProfane(member.lastName)) {
      return `Nazwisko zawodnika ${i} zawiera niedozwolone słowa.`;
    }

    if (!/^https:\/\/steamcommunity\.com\/profiles\/\d{17}\/?$/.test(member.steam)) {
      return `Link Steam zawodnika ${i} jest niepoprawny.`;
    }

    if (!member.birthDate || new Date(member.birthDate) > new Date(date2007)) {
      return `Zawodnik ${i} musi być urodzony przed ${date2007}.`;
    }

    if (!shirtSizes.includes(member.shirtSize)) {
      return `Niepoprawny rozmiar koszulki zawodnika ${i}.`;
    }
  }

  return null;
}
