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

const createStreet = (name) => {
  const street = document.createElement('p');
  street.className = styles.street;
  street.textContent =  name;
  return street;
}

const createFromTo = ({nameFrom, nameTo, type}) => {
  const fromTo = document.createElement('p');
  fromTo.className = styles.fromTo;

  if(type !== '9') {
    fromTo.innerHTML = '<strong>od</strong> <span class="from"></span> <strong>do</strong> <span class="to"></span>';
  } else {
    fromTo.innerHTML = '<span class="from"></span> <span class="to"></span>';
  }

  fromTo.querySelector('.from').textContent = nameFrom;
  fromTo.querySelector('.to').textContent = nameTo;

  return fromTo;
}

const createType = (lanetype) => {
  let type = null;
  if( lanetype !== '9') {
    type = document.createElement('p');
    type.className = styles.type;
    type.innerHTML = '<strong>Typ:</strong> <span></span>';
    type.querySelector('span').textContent = getType(lanetype);
  }
  return type;
}

const createSurface = (surfaceType) => {
  const surface = document.createElement('p');
  surface.className = styles.surface;
  surface.innerHTML = '<strong>Nawierzchnia:</strong> <span></span>';
  surface.querySelector('span').textContent = getSurface(surfaceType);
  return surface;
}

const createQuality = (qualityType) => {
  const quality = document.createElement('p');
  quality.className = styles.quality;
  quality.innerHTML = '<strong>Jakość:</strong> <span></span>';
  quality.querySelector('span').textContent = getQuality(qualityType);
  return quality;
}

const createPopup = (popupType, properties) => {
  let popup = document.createElement('div');
  let description;
  switch (popupType.toString()) {
    case 'station':
      description = document.createElement('p');
      description.className = styles.station;
      description.textContent = properties.name;
      popup.append(description);
      break;

    case 'alert':
      description = document.createElement('p');
      description.className = styles.alert;
      description.textContent = properties.description;
      popup.append(description);
      break;
  
    default:
      popup.className = "popupStreet";

      const street = createStreet(properties.street);
      const fromTo = createFromTo(properties);
      const type = createType(properties.type);
      const surface = createSurface(properties.surface);
      const quality = createQuality(properties.quality);
    
      popup.append(street);
      popup.append(fromTo);
      popup.append(type);
      popup.append(surface);
      popup.append(quality);
      break;
  }

  return popup;
}

export default createPopup;