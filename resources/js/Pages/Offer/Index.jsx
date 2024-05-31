import Card from '@/Components/Card';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

import { useEffect, useState } from 'react';

export default function Index({ auth, offers }) {

    const { flash } = usePage().props;

    const [successMessage, setSuccessMessage] = useState(flash?.success || "");
    const [generatedCode, setGeneratedCode] = useState(flash?.generatedCode || "");

    const handleGenerateCode = (offerId) => {
        router.post(`/offers/${offerId}/generate-code`, {}, {
            onSuccess: (page) => {
                const flash = page.props.flash || {};
                setSuccessMessage(flash.success || "");
                setGeneratedCode(flash.generatedCode || "");
            }
        });
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(generatedCode)
            .then(() => {
                setSuccessMessage('¡Código copiado al portapapeles!');
            })
            .catch((error) => {
                console.error('Error al copiar el código:', error);
            });
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-500 dark:text-gray-200 leading-tight">
                    Ofertas exclusivas para usuarios en la plataforma
                </h2>
            }
        >
            <Head title="Offers" />
            {successMessage && (
                <div className="dark:bg-green-500 text-center text-white p-2 mb-6 rounded">
                    {successMessage}
                    <br />
                    <strong>{generatedCode}</strong>
                    <br />
                    <PrimaryButton
                        className='dark:bg-white'
                        onClick={handleCopyCode}
                    >
                        Copiar Código
                    </PrimaryButton>
                </div>
            )}
            <div className="bg-white dark:bg-gray-800 min-h-screen overflow-hidden shadow-sm sm:rounded-lg">
                <div className="bg-gray-100 dark:bg-gray-800 h-full">
                    <div className="p-6 text-gray-900 dark:text-gray-100 h-full">

                        <div className="overflow-auto h-full">
                            <div className="py-12 container mx-auto">
                                <div className="text-xs text-gray-700 uppercase grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {offers.data.map((offer) => (
                                        <Card
                                            key={offer.id}
                                            offer={offer}
                                            onGenerateCode={handleGenerateCode}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Pagination links={offers.meta.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
