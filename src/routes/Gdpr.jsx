import * as React from 'react';
import assets from '../data/assets.json';

const Gdpr = () => {
 return (
        <main className='bg-gray-800 max-w-4xl m-auto block px-6 py-10 lg:py-10 lg:px-10 text-white leading-7'>
            <div className='text-4xl text-center font-extrabold italic'>
                <h1 className="py-10">KLAUZULA INFORMACYJNA DOTYCZĄCA OCHRONY DANYCH OSOBOWYCH</h1>
            </div>
            <p className=''>
                <p className='font-semibold'>Poniżej znajdziesz wszelkie niezbędne informacje dotyczące przetwarzania Twoich danych osobowych w związku z rejestracją na Turniej E-sportowy „{assets.name}” organizowany przez Uniwersytet Rzeszowski.</p>
                <ol className='font-bold py-2' >
                    <li >Administrator danych osobowych</li>
                </ol>
                <p>Administratorem Twoich danych osobowych jest Uniwersytet Rzeszowski, al. Rejtana 16 C, 35-959 Rzeszów, reprezentowany przez Rektora. Administrator Danych wyznaczył Inspektora Ochrony Danych w osobie Pana {assets.name}, z którym można kontaktować się poprzez adres email: {assets.IOD_email}, pisemnie na adres siedziby Administratora lub telefonicznie, tel.: {assets.IOD_phone}.</p>
                <ol start="2" className='font-bold py-2'>
                    <li>Cele przetwarzania oraz podstawa prawna przetwarzania danych osobowych</li>
                </ol>
                <p>Podstawą prawną przetwarzania Twoich danych osobowych jest Twoja zgoda na przetwarzanie danych osobowych, tj. art. 6 ust. 1 lit. a, oraz uzasadniony interes administratora: możliwość dochodzenia ewentualnych roszczeń i obrony przed roszczeniami, tj. art. 6 ust. 1 lit. f rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 roku w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych)), w celu prawidłowego przeprowadzenia rejestracji na Turniej E-sportowy „{assets.name}” organizowany przez Uniwersytet Rzeszowski oraz umożliwienia udziału w Turnieju oraz w celu dochodzenia ewentualnych roszczeń i obrony przed roszczeniami. Podanie danych osobowych jest dobrowolne, lecz konieczne do przeprowadzenia procedury rejestracji. W przypadku niepodania danych, nie będzie możliwe zrealizowanie ww. celu.</p>
                <ol start="3" className='font-bold py-2'>
                    <li>Okres przechowywania danych osobowych</li>
                </ol>
                <p>Dane zostaną usunięte niezwłocznie po zakończeniu wydarzenia, którego dotyczyła rejestracja.</p>
                {/* <ol start="4">
                    <li>Odbiorcy danych</li>
                </ol>
                <p>Informujemy, że Twoje dane osobowe będą przetwarzane i przechowywane tymczasowo poza Europejskim Obszarem Gospodarczym poprzez usługę Netlify Forms zgodnie z rozporządzeniem o ochronie danych osobowych (RODO/GDPR) oraz California Consumer Privacy Act (CCPA): https://www.netlify.com/gdpr-ccpa/. Usługa jest dostarczaną przez firmę Netlify z siedzibą pod adresem: Inc. 44 Montgomery Street, Suite 300, San Francisco, California 94104, USA.</p> */}

                {/* <p>Twoje dane osobowe możemy przekazywać organom lub podmiotom publicznym uprawnionym do uzyskania danych na podstawie obowiązujących przepisów prawa.</p> */}

                <ol start="4" className='pt-4 text-xl font-semibold'>
                    <li>Prawa związane z przetwarzaniem danych osobowych i podejmowaniem zautomatyzowanych decyzji</li>
                </ol>
                <p className='pt-4 font-semibold'>Przysługują Ci następujące prawa związane z przetwarzaniem danych osobowych:</p>
                <ul className='list-disc px-6'>
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
                <p className='pt-5'>Twoje dane nie będą przetwarzane w sposób zautomatyzowany. Twoje dane nie będą również wykorzystywane do profilowania.</p>

            </p>
        </main>
    )
}

export default Gdpr