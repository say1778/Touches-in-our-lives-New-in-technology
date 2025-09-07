import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';

interface PaymentMethodProps {
    title: string;
    description: string;
    icon: string;
    isSelected: boolean;
    onSelect: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ title, description, icon, isSelected, onSelect }) => {
    const baseClasses = 'flex items-start text-right w-full space-s-4 p-6 rounded-lg shadow-sm border transition-all duration-200 focus:outline-none';
    const selectedClasses = 'border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50/50';
    const unselectedClasses = 'border-gray-200 hover:border-indigo-400 hover:shadow-md';

    return (
        <button 
            onClick={onSelect}
            className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
            aria-pressed={isSelected}
        >
            <div className="text-3xl">{icon}</div>
            <div className="text-right">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <p className="mt-1 text-gray-600">{description}</p>
            </div>
        </button>
    );
};

const SecurityIcon: React.FC = () => (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Secure Payment</title>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const PaymentsPage: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const handleProceed = () => {
        if (selectedMethod) {
            const methodName = selectedMethod === 'credit' ? 'البطاقات الائتمانية' : 'الدفع عند الاستلام';
            alert(`لقد اخترت الدفع عبر: ${methodName}. سيتم الآن توجيهك لإكمال العملية.`);
        }
    };

    return (
        <div>
            <SectionTitle title="طرق الدفع" subtitle="اختر طريقة الدفع المناسبة لك لإتمام عملية الشراء." />
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PaymentMethod 
                        title="البطاقات الائتمانية"
                        description="نقبل جميع أنواع البطاقات الائتمانية والخصم المباشر (فيزا، ماستركارد). عملية الدفع آمنة ومشفرة بالكامل."
                        icon="💳"
                        isSelected={selectedMethod === 'credit'}
                        onSelect={() => setSelectedMethod('credit')}
                    />
                    <PaymentMethod 
                        title="الدفع عند الاستلام"
                        description="يمكنك الدفع نقدًا لمندوب الشحن عند استلام طلبك. هذه الخدمة متاحة في جميع أنحاء الجمهورية."
                        icon="💵"
                        isSelected={selectedMethod === 'cod'}
                        onSelect={() => setSelectedMethod('cod')}
                    />
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleProceed}
                        disabled={!selectedMethod}
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                        aria-label="متابعة الدفع"
                    >
                        متابعة الدفع
                    </button>
                </div>

                <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded-lg text-right mt-12">
                     <div className="flex items-center justify-end">
                        <h3 className="text-2xl font-bold text-green-800 me-3">أمان مدفوعاتك هو أولويتنا</h3>
                        <div className="text-green-600"><SecurityIcon /></div>
                    </div>
                    <p className="mt-2 text-green-700">
                        نحن نستخدم أحدث تقنيات التشفير (SSL) لحماية بياناتك الشخصية والمالية. جميع معاملاتك عبر الإنترنت آمنة ومحمية بنسبة 100%. تسوق بثقة واطمئنان.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentsPage;