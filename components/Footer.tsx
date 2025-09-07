
import React from 'react';

const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <title>Twitter</title>
    <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6.02,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"></path>
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <title>Instagram</title>
    <path d="M12,2.163c3.204,0,3.584,0.012,4.85,0.07,3.252,0.148,4.771,1.691,4.919,4.919,0.058,1.265,0.07,1.646,0.07,4.85s-0.012,3.584-0.07,4.85c-0.148,3.227-1.669,4.771-4.919,4.919-1.266,0.058-1.646,0.07-4.85,0.07s-3.584-0.012-4.85-0.07c-3.252-0.148-4.771-1.691-4.919-4.919-0.058-1.265-0.07-1.646-0.07-4.85s0.012-3.584,0.07-4.85c0.148-3.227,1.669-4.771,4.919-4.919,1.266-0.058,1.646-0.07,4.85-0.07M12,0C8.74,0,8.333,0.014,7.053,0.072,2.695,0.272,0.273,2.69,0.073,7.052,0.014,8.333,0,8.74,0,12s0.014,3.667,0.072,4.947c0.2,4.358,2.618,6.78,6.98,6.98,1.281,0.058,1.687,0.072,4.947,0.072s3.667-0.014,4.947-0.072c4.358-0.2,6.78-2.618,6.98-6.98,0.058-1.281,0.072-1.687,0.072-4.947s-0.014-3.667-0.072-4.947c-0.2-4.358-2.618-6.78-6.98-6.98C15.667,0.014,15.26,0,12,0Z M12,5.838a6.162,6.162,0,1,0,6.162,6.162,6.162,6.162,0,0,0,-6.162-6.162M12,16a4,4,0,1,1,4-4,4,4,0,0,1,-4,4m6.406-11.845a1.44,1.44,0,1,0,1.44,1.44,1.44,1.44,0,0,0,-1.44-1.44Z"></path>
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <title>Facebook</title>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
    </svg>
);

const SocialIcon: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({ href, label, children }) => (
  <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-500 transition-colors duration-300">
    {children}
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <h3 className="text-lg font-bold text-gray-800">SR Store</h3>
            <p className="mt-2 text-gray-500">متجرك الأول للتسوق عبر الإنترنت في مصر.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">تواصل معنا</h3>
            <ul className="mt-2 space-y-1 text-gray-500">
              <li>البريد الإلكتروني: contact@sr-store.com</li>
              <li>الهاتف: +20 123 456 7890</li>
              <li>العنوان: القاهرة, مصر</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">تابعنا</h3>
            <div className="flex justify-center md:justify-start mt-4 space-s-6">
              <SocialIcon href="#" label="Twitter">
                <TwitterIcon className="w-6 h-6" />
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <InstagramIcon className="w-6 h-6" />
              </SocialIcon>
              <SocialIcon href="#" label="Facebook">
                <FacebookIcon className="w-6 h-6" />
              </SocialIcon>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} متجر SR. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
