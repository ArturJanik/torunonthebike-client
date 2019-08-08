import styles from './RoutePopup.module.css';

const getType = (type) => {
  switch (String(type)) {
    case '0':
      return "Droga dla rowerów";
    case '1':
      return "Droga dla rowerów i pieszych";
    case '2':
      return "Kontrapas rowerowy";
    case '3':
      return "Pas rowerowy";
    case '4':
      return "Chodnik z dopuszczonym ruchem rowerów";
    case '5':
      return "Jezdnia z kontraruchem";
    case '9':
      return "Przejazd rowerowy";
    default:
      break;
  }
}

const getSurface = (surface) => {
  switch (String(surface)) {
    case '0':
      return "Asfalt";
    case '1':
      return "Kostka bauma (fazowana)";
    case '2':
      return "Płyta chodnikowa mała";
    case '3':
      return "Płyta chodnikowa duża";
    case '4':
      return "Utwardzona naturalna";
    case '5':
      return "Luźna (Szuter/Piach)";
    case '6':
      return "Inna";
    case '7':
      return "Kostka bauma (niefaz.)";
    default:
      break;
  }
}

const getQuality = (quality) => {
  switch (String(quality)) {
    case '0':
      return "Brak informacji";
    case '1':
      return "Nieprzejezdna";
    case '2':
      return "Popękana/zniszczona";
    case '3':
      return "Miejscowe uszkodzenia";
    case '4':
      return "Drobne ubytki";
    case '5':
      return "Idealna";
    default:
      break;
  }
}

const createStreet = (name) => `<p class="${styles.street}">${name}</p>`;

const createFromTo = ({nameFrom, nameTo, type}) => {
  let inner = `<strong>od</strong> <span class="from">${nameFrom}</span> <strong>do</strong> <span class="to">${nameTo}</span>`;
  if(type === '9') {
    inner = `<span class="from">${nameFrom}</span> <span class="to">${nameTo}</span>`;
  }
  return `<p class="${styles.fromTo}">${inner}</p>`;
}

const createType = (lanetype) => {
  if(lanetype === '9') return null;
  return `<p class="${styles.type}"><strong>Typ:</strong> <span>${getType(lanetype)}</span></p>`;
}

const createSurface = (surfaceType) => `<p class="${styles.surface}"><strong>Nawierzchnia:</strong> <span>${getSurface(surfaceType)}</span></p>`;

const createQuality = (qualityType) => `<p class="${styles.quality}"><strong>Jakość:</strong> <span>${getQuality(qualityType)}</span></p>`;

const createPopup = (popupType, properties) => {
  switch (popupType.toString()) {
    case 'station':
      return `<div><p class="${styles.station}">${properties.name}</p></div>`;

    case 'alert':
      return `<div><p class="${styles.alert}">${properties.description}</p></div>`;
  
    default:
      const {street, type, surface, quality} = properties;
      return `<div class="popupStreet">
        ${createStreet(street)}
        ${createFromTo(properties)}
        ${createType(type)}
        ${createSurface(surface)}
        ${createQuality(quality)}
      </div>`;
  }
}

export default createPopup;