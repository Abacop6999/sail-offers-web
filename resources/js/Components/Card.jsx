export default function Card({ offer, onGenerateCode }) {

    const handleGenerateCodeClick = (e, offerId) => {
        e.preventDefault();
        onGenerateCode(offerId);
    };
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <img
                src={offer.image}
                alt={offer.name}
                className="w-full h-48 object-cover object-center"
            />
            <div className="px-6 py-4 flex-grow">
                <div className="font-bold text-xl mb-2">{offer.name}</div>
                <p className="text-gray-700 text-base">{offer.description}</p>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
                <button
                    onClick={(e) => handleGenerateCodeClick(e, offer.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Generar Código
                </button>
                <div className="text-gray-600">%{offer.discount}</div>
            </div>
        </div>
    );
};
