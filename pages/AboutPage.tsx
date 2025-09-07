
import React from 'react';
import SectionTitle from '../components/SectionTitle';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <SectionTitle title="من نحن" subtitle="قصتنا وقيمنا ورؤيتنا" />
      <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-8 text-right leading-relaxed">
        <section>
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">تاريخ المتجر ورؤيته</h3>
          <p>
            تأسس متجر SR في عام 2024 برؤية واضحة: أن نصبح الوجهة الأولى للتسوق الإلكتروني في مصر والشرق الأوسط. بدأنا بفريق صغير وشغف كبير بتقديم منتجات عالية الجودة وخدمة عملاء استثنائية. نهدف إلى توفير تجربة تسوق سهلة وممتعة وآمنة لكل عملائنا، مع تشكيلة واسعة من المنتجات التي تلبي جميع احتياجاتهم.
          </p>
        </section>
        
        <section>
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">قيمنا</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>الجودة:</strong> نلتزم بتقديم منتجات ذات جودة عالية من أفضل الماركات العالمية والمحلية.</li>
            <li><strong>خدمة العملاء:</strong> نضع عملاءنا في المقام الأول ونسعى دائمًا لتجاوز توقعاتهم.</li>
            <li><strong>الابتكار:</strong> نستخدم أحدث التقنيات لتحسين تجربة التسوق وجعلها أكثر سلاسة.</li>
            <li><strong>الشفافية:</strong> نؤمن بالوضوح والصدق في جميع تعاملاتنا مع العملاء والشركاء.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">فريق العمل</h3>
          <p>
            نحن فخورون بفريق عملنا المكون من أفراد موهوبين ومتحمسين. من خبراء المشتريات إلى فريق خدمة العملاء والمتخصصين في التقنية، يعمل الجميع بتفانٍ لضمان نجاح المتجر وتحقيق رضى عملائنا. نؤمن بأن فريقنا هو سر نجاحنا وأهم أصولنا.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <img src="https://picsum.photos/seed/team1/150/150" alt="فريق العمل 1" className="rounded-full shadow-lg"/>
            <img src="https://picsum.photos/seed/team2/150/150" alt="فريق العمل 2" className="rounded-full shadow-lg"/>
            <img src="https://picsum.photos/seed/team3/150/150" alt="فريق العمل 3" className="rounded-full shadow-lg"/>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
