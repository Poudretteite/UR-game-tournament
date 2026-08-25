import React from 'react';

const sponsorsData = {
  organizers: [
    {
      name: 'Samorząd Studentów UR',
      img: '/img/logos/ssur.png',
      alt: 'Samorząd Studentów UR',
    },
  ],
  partners: [
    
  ],
};

const Sponsors = () => {
  return (
    <div className="bg-transparent sponsors flex flex-col items-center pt-10 pb-10 w-full px-2 text-white tracking-widest">
      <h4 className="my-8 text-4xl font-semibold italic">Organizatorzy</h4>
      <div className="flex flex-wrap gap-14 items-center justify-center ">
        {sponsorsData.organizers.map(({ name, img, alt }) => (
          <div key={name}>
            <img style={{ maxHeight: '100px', maxWidth: '200px' }} src={img} alt={alt} />
          </div>
        ))}
      </div>
      {/*organizacyjny*/}
      <div className="flex flex-row items-center justify-center text-center p-5 m-5">
        <div className="flex flex-col items-center justify-center">
         <h4 className="my-8 text-4xl font-semibold italic m-5">Współorganizator</h4>
          <div key="PCI">
            <img style={{ maxHeight: '130px', maxWidth: '200px' }} src="/img/logos/pci-logo.png" alt="PCI" />
          </div>
        </div>
        {/*tytularny*/}
        {/* <div>
         <h4 className="my-8 text-4xl font-semibold italic m-5">Partner tytularny</h4> 
        </div> */}
        {/*strategiczny*/}
        {/* <div>
         <h4 className="my-8 text-4xl font-semibold italic m-5">Partner strategiczny</h4> 
        </div> */}
        {/*rzeczowy*/}
        {/* <div>
         <h4 className="my-8 text-4xl font-semibold italic m-5">Partner rzeczowy</h4> 
        </div> */}
        {/*technologiczny*/}
        {/* <div>
         <h4 className="my-8 text-4xl font-semibold italic m-5">Partner technologiczny</h4> 
        </div> */}
      </div>
      <h4 className="my-8 text-4xl font-semibold italic">Partnerzy</h4>
      <div className="flex flex-wrap gap-14 items-center justify-center ">
        {sponsorsData.partners.map(({ name, img, alt }) => (
          <div key={name}>
            <img style={{ maxHeight: '130px', maxWidth: '200px' }} src={img} alt={alt} />
          </div>
        ))}

      </div>
      {/* <h4 className="my-10 text-4xl font-bold italic">Patroni</h4>
      <div className="flex flex-wrap gap-14 items-center justify-center ">
        {sponsorsData.patrons.map(({ name, img, alt }) => (
          <div key={name}>
            <img style={{ maxHeight: '70px', maxWidth: '200px' }} src={img} alt={alt} />
          </div>
        ))}
      </div> */}
      {/* <h4 className="my-10 text-4xl font-bold italic">Patronat medialny</h4>
      <div className="flex flex-wrap gap-14 items-center justify-center ">
        {sponsorsData.media_patron.map(({ name, img, alt }) => (
          <div key={name}>
            <img style={{ maxHeight: '70px', maxWidth: '200px' }} src={img} alt={alt} />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Sponsors;