
import React from 'react';
import SectionTitle from '../components/SectionTitle';

const ServiceCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

const ShippingIcon: React.FC = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <title>Fast Shipping</title>
    <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4h-8v-4l-4-4Z"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/>
  </svg>
);
const ReturnIcon: React.FC = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <title>Easy Returns</title>
    <path d="M15 2.5a.5.5 0 0 0-1 0V3h-2v-.5a.5.5 0 0 0-1 0V3H9v-.5a.5.5 0 0 0-1 0V3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2v-.5Z"/><path d="M16 16.22A4.93 4.93 0 0 0 12 15a4.93 4.93 0 0 0-4 1.22"/><path d="m14 12-2-2-2 2"/><path d="M12 12v3"/>
  </svg>
);
const SupportIcon: React.FC = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <title>24/7 Support</title>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v4"/><path d="M8 23h8"/>
  </svg>
);


const ServicesPage: React.FC = () => {
  return (
    <div>
      <SectionTitle title="خدماتنا" subtitle="نلتزم بتقديم أفضل تجربة تسوق لعملائنا." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <ServiceCard 
          title="الشحن السريع والآمن" 
          description="نوفر خدمة شحن سريعة وموثوقة لجميع أنحاء الجمهورية. تصلك طلباتك بأمان وفي أسرع وقت ممكن." 
          icon={<ShippingIcon />}
        />
        <ServiceCard 
          title="سياسة استرجاع مرنة" 
          description="إذا لم تكن راضيًا عن المنتج، يمكنك إرجاعه أو استبداله بسهولة خلال 14 يومًا من تاريخ الاستلام." 
          icon={<ReturnIcon />}
        />
        <ServiceCard 
          title="دعم فني على مدار الساعة" 
          description="فريق الدعم الفني لدينا جاهز لمساعدتك والإجابة على استفساراتك على مدار الساعة طوال أيام الأسبوع." 
          icon={<SupportIcon />}
        />
      </div>
    </div>
  );
};

export default ServicesPage;