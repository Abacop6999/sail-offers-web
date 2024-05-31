import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';

import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Index({ auth, promocode, queryParams = null }) {
    queryParams = queryParams || {}

    const { flash } = usePage().props;

    const [successMessage, setSuccessMessage] = useState(flash?.success || "");

    const searchFieldChanged = (code, value) => {
        if (value) {
            queryParams[code] = value
        } else {
            delete queryParams[code]
        }
        router.get(route('promocode.index'), queryParams)
    }

    const onKeyPress = (code, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(code, e.target.value)
    }

    const handleRedeem = (promoCodeId) => {
        router.post(`/my-promo-codes/${promoCodeId}/redeem`, {}, {
            onSuccess: () => {
                const redeemedPromoCode = promocode.data.find(
                    (code) => code.id === promoCodeId
                );
                redeemedPromoCode.status = 'canjeado';

                setSuccessMessage(
                    `Código canjeado con éxito. El código es: ${redeemedPromoCode.code}`
                );
            },
            onError: (error) => {
                console.error(error);
            }
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
                    Mis códigos promocionales
                </h2>
            }
        >
            <Head title="My promo codes" />
            {successMessage && (
                <div className="bg-green-500 p-4 mb-6 text-center text-white rounded">
                    {successMessage}
                </div>
            )}
            <div className="bg-white dark:bg-gray-800 min-h-screen overflow-hidden shadow-sm sm:rounded-lg">
                <div className="overflow-auto p-6">
                    <div className="py-12 container mx-auto">
                        <div className="overflow-auto">
                            {promocode.data.length === 0 ? (
                                <div className="text-gray-200">
                                    No hay codigos promocionales disponibles.
                                </div>
                            ) : (
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading name="id">
                                                ID
                                            </TableHeading>
                                            <TableHeading name="offer">
                                                Oferta
                                            </TableHeading>
                                            <th className="px-3 py-3">
                                                Código
                                            </th>
                                            <TableHeading name="status">
                                                Estado
                                            </TableHeading>
                                            <TableHeading name="created_at">
                                                Fecha de Creación
                                            </TableHeading>
                                            <th className="px-3 py-3 text-right">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading name="id">

                                            </TableHeading>
                                            <TableHeading name="offer">

                                            </TableHeading>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.code}
                                                    placeholder="Código promocional"
                                                    onBlur={(e) => searchFieldChanged("code", e.target.value)}
                                                    onKeyPress={(e) => onKeyPress("code", e)}
                                                />
                                            </th>
                                            <TableHeading name="status">
                                                <SelectInput className="w-full" defaultValue={queryParams.status} onChange={(e) => searchFieldChanged("status", e.target.value)} >
                                                    <option value="">Select Status</option>
                                                    <option value="canjeado">Canjeado</option>
                                                    <option value="no_canjeado">No canjeado</option>
                                                </SelectInput>
                                            </TableHeading>
                                            <TableHeading name="created_at">

                                            </TableHeading>
                                            <th className="px-3 py-3 text-right">

                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {promocode.data.map((promoCode) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={promoCode.id}
                                            >
                                                <td className="px-3 py-3">
                                                    {promoCode.id}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {promoCode.offer_name}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {promoCode.code}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <span
                                                        className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[
                                                            promoCode.status
                                                        ]
                                                            }`}
                                                    >
                                                        {
                                                            PROJECT_STATUS_TEXT_MAP[
                                                            promoCode.status
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    {promoCode.created_at}
                                                </td>
                                                <td className="px-3 py-3 text-right">
                                                    {promoCode.status ===
                                                        "no_canjeado" ? (
                                                        <button
                                                            className="dark:bg-amber-500 dark:text-white dark:hover:bg-green-500 py-2 px-4 rounded"
                                                            onClick={() => {
                                                                handleRedeem(
                                                                    promoCode.id
                                                                );
                                                                setSuccessMessage(
                                                                    `Código canjeado con éxito. El código es: ${promoCode.code}`
                                                                );
                                                            }}
                                                        >
                                                            Canjear
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-500">
                                                            Canjeado
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            <Pagination links={promocode.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
