import React from 'react';

const sponsorsData = {
  organizers: [
    {
      name: 'Samorząd Studentów UR',
      img: '/img/organizator/ssur.png',
      alt: 'Samorząd Studentów UR',
    },
  ],
  partners: [
    {
      name: 'Actina',
      img: '/img/partner/actina.png',
      alt: 'Actina',
    },
  ],
  patrons: [
    {
      name: 'Jerzy Borcz',
      img: '/img/patron/jerzy_borcz.png',
      alt: 'Jerzy Borcz',
    },
  ],
  media_patron: [
    {
      name: 'Radio Rzeszów',
      img: '/img/media_patron/logo_radio_rzeszow.png',
      alt: 'Radio Rzeszów',
    },
  ],
};

const Sponsors = () => {
  return (
    <div className="bg-transparent sponsors flex flex-col items-center pt-10 pb-10 w-full px-2">
      <h4 className="my-10 text-4xl font-bold italic">Organizatorzy</h4>
      <div className="flex flex-wrap gap-14 items-center justify-center ">
        {sponsorsData.organizers.map(({ name, img, alt }) => (
          <div key={name}>
            <img style={{ maxHeight: '60px', maxWidth: '200px' }} src={img} alt={alt} />
          </div>
        ))}
      </div>
      <h4 className="my-10 text-4xl font-bold italic">Partnerzy</h4>
      <div className="flex flex-wrap gap-14 items-center justify-center ">
        {sponsorsData.partners.map(({ name, img, alt }) => (
          <div key={name}>
            <img style={{ maxHeight: '70px', maxWidth: '200px' }} src={img} alt={alt} />
          </div>
        ))}
      </div>
      <h4 className="my-10 text-4xl font-bold italic">Patroni</h4>
      <div className="flex flex-wrap gap-14 items-center justify-center ">
        {sponsorsData.patrons.map(({ name, img, alt }) => (
          <div key={name}>
            <img style={{ maxHeight: '70px', maxWidth: '200px' }} src={img} alt={alt} />
          </div>
        ))}
      </div>
      <h4 className="my-10 text-4xl font-bold italic">Patronat medialny</h4>
      <div className="flex flex-wrap gap-14 items-center justify-center ">
        {sponsorsData.media_patron.map(({ name, img, alt }) => (
          <div key={name}>
            <img style={{ maxHeight: '70px', maxWidth: '200px' }} src={img} alt={alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;