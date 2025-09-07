import React from 'react';
import SectionTitle from '../components/SectionTitle';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <SectionTitle title="اتصل بنا" subtitle="نحن هنا للمساعدة. تواصل معنا في أي وقت." />
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="text-right">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">أرسل لنا رسالة</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">الرسالة</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                إرسال
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="text-right">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">معلومات الاتصال</h3>
          <div className="space-y-4 text-gray-600">
            <p><strong>الهاتف:</strong> 01227808830</p>
            <p><strong>البريد الإلكتروني:</strong> srabee46@gmail.com</p>
            <p><strong>العنوان:</strong> 123 شارع التسوق, القاهرة, مصر</p>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">تابعنا على</h3>
          <div className="flex justify-start space-s-4">
            {/* Social media icons can be placed here */}
            <a href="#" className="text-gray-500 hover:text-indigo-600">Facebook</a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;