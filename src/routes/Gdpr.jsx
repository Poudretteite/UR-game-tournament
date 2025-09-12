import * as React from 'react';
import assets from '../data/assets.json';

const Gdpr = () => {
 return (
        <main className='max-w-4xl mx-auto tracking-widest text-white'>
        <img src={assets.logo_text} alt="logo" className="-mt-28 -mb-28 h-[6rem] md:h-[13rem] mx-auto hidden md:block z-20 drop-shadow-[0_0_20px_#1952ff]" />
        <div className='flex flex-col py-10 md:pt-32 mb-10 space-y-6 p-6 h-a bg-black bg-opacity-30 rounded-2xl shadow-[inset_2px_2px_15px_#1952ff]'>
            <div className='text-4xl text-center font-extrabold italic'>
                <h1 className="py-10">KLAUZULA INFORMACYJNA DOTYCZĄCA OCHRONY DANYCH OSOBOWYCH</h1>
            </div>
            <p className=''>
                <p className='font-semibold'>Poniżej znajdziesz wszelkie niezbędne informacje dotyczące przetwarzania Twoich danych osobowych w związku z rejestracją na Turniej E-sportowy „{assets.name}” organizowany przez Uniwersytet Rzeszowski.</p>
                <br />
                <ol className='list-decimal px-10 space-y-5' >
                    <li className='font-semibold'>Administrator danych osobowych.
                    <p className='font-normal'>Administratorem Twoich danych osobowych jest Uniwersytet Rzeszowski, al. Rejtana 16 C, 35-959 Rzeszów, reprezentowany przez Rektora. Administrator Danych wyznaczył Inspektora Ochrony Danych w osobie Pana {assets.IOD_name}, z którym można kontaktować się poprzez adres email: {assets.IOD_email}, pisemnie na adres siedziby Administratora lub telefonicznie, tel.: {assets.IOD_phone}.</p>
                    </li>
                    <li className='font-semibold'>Cele przetwarzania oraz podstawa prawna przetwarzania danych osobowych.
                    <p className='font-normal'>Podstawą prawną przetwarzania Twoich danych osobowych jest Twoja zgoda na przetwarzanie danych osobowych, tj. art. 6 ust. 1 lit. a, oraz uzasadniony interes administratora: możliwość dochodzenia ewentualnych roszczeń i obrony przed roszczeniami, tj. art. 6 ust. 1 lit. f rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 roku w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych)), w celu prawidłowego przeprowadzenia rejestracji na Turniej E-sportowy „{assets.name}” organizowany przez Uniwersytet Rzeszowski oraz umożliwienia udziału w Turnieju oraz w celu dochodzenia ewentualnych roszczeń i obrony przed roszczeniami. Podanie danych osobowych jest dobrowolne, lecz konieczne do przeprowadzenia procedury rejestracji. W przypadku niepodania danych, nie będzie możliwe zrealizowanie ww. celu.</p>
                    </li>
                    <li className='font-semibold'>Okres przechowywania danych osobowych.
                    <p className='font-normal'>Dane zostaną usunięte niezwłocznie po zakończeniu wydarzenia, którego dotyczyła rejestracja.</p>
                    </li>
                    <li className='font-semibold'>Odbiorcy danych.
                    <p className='font-normal'>Twoje dane osobowe możemy przekazywać organom lub podmiotom publicznym  uprawnionym do uzyskania danych na podstawie obowiązujących przepisów prawa.</p>
                    </li>
                    <li className='font-semibold'>Prawa związane z przetwarzaniem danych osobowych i podejmowaniem zautomatyzowanych decyzji
                    <p className='font-normal'>Przysługują Ci następujące prawa związane z przetwarzaniem danych osobowych:</p>
                    <ul className='list-disc px-6 font-normal'>
                        <li>prawo do wycofania zgody na przetwarzanie danych osobowych w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem. Wycofanie zgody na przetwarzanie danych osobowych jest równoznaczne z wycofaniem się z procedury rejestracji,</li>
                        <li>prawo do dostępu do danych osobowych,</li>
                        <li>prawo do żądania sprostowania danych osobowych,</li>
                        <li>prawo do żądania usunięcia danych osobowych,</li>
                        <li>prawo do żądania ograniczenia przetwarzania danych osobowych,</li>
                        <li>prawo do wniesienia sprzeciwu wobec przetwarzania danych,</li>
                        <li>prawo do przenoszenia danych osobowych,</li>
                        <li>prawo do niepodlegania zautomatyzowanemu podejmowaniu decyzji, w tym profilowaniu,</li>
                        <li>prawo wniesienia skargi do organu nadzorczego zajmującego się ochroną danych osobowych, tj. Prezesa Urzędu Ochrony Danych Osobowych.</li>
                    </ul>
                    </li>
                </ol>
                <p className='pt-5'>Twoje dane nie będą przetwarzane w sposób zautomatyzowany. Twoje dane nie będą również wykorzystywane do profilowania.</p>

            </p>
        </div>
        </main>
    )
}

export default Gdpr