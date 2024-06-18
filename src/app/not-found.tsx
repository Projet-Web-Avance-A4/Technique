import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16">
      <h1 className="text-6xl font-bold text-black mb-4">404</h1>
      <h2 className="text-2xl text-gray-800 mb-8">Page Non Trouvée</h2>
      <p className="text-lg text-gray-600 mb-4">La page que vous cherchez n&apos;a pas été trouvée.</p>
      <Link className="bg-gradient-to-r from-green-300 to-red text-white px-6 py-2 rounded-md hover:from-green-400 hover:to-red" href="/" passHref>
        Retour à la page d&apos;accueil
      </Link>
    </div>
  );
}
