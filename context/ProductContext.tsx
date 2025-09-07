import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
}

export interface Product {
  name: string;
  price: number;
  discountPrice?: number;
  imageUrls: string[];
  category: 'electronics' | 'clothing' | 'cosmetics' | 'digital';
  description: string;
  reviews?: Review[];
  brand?: string;
  sku?: string;
}

const initialProducts: Product[] = [
  // Electronics
  { name: 'هاتف ذكي حديث', price: 12500, discountPrice: 11800, imageUrls: ['https://picsum.photos/seed/phone1/800/600', 'https://picsum.photos/seed/phone2/800/600', 'https://picsum.photos/seed/phone3/800/600'], category: 'electronics', description: 'أحدث هاتف ذكي في السوق مع كاميرا مذهلة وشاشة OLED فائقة الوضوح. أداء لا مثيل له وبطارية تدوم طويلاً.', reviews: [
    { reviewerName: 'أحمد', rating: 5, comment: 'الهاتف رائع جداً والكاميرا احترافية!' },
    { reviewerName: 'سارة', rating: 4, comment: 'البطارية ممتازة ولكن حجمه كبير قليلاً.' },
  ], brand: 'TechNova', sku: 'TN-S24-ULTRA'},
  { name: 'لابتوب ألعاب', price: 35000, discountPrice: 32500, imageUrls: ['https://picsum.photos/seed/laptop1/800/600', 'https://picsum.photos/seed/laptop2/800/600'], category: 'electronics', description: 'لابتوب مخصص للألعاب بمعالج قوي وبطاقة رسومات متطورة لتجربة لعب سلسة وغامرة. شاشة 144Hz وتبريد فعال.', brand: 'GameForce', sku: 'GF-X9-PRO'},
  { name: 'سماعات لاسلكية', price: 2200, imageUrls: ['https://picsum.photos/seed/headphones1/800/600', 'https://picsum.photos/seed/headphones2/800/600'], category: 'electronics', description: 'استمتع بصوت نقي وعميق مع هذه السماعات اللاسلكية. تصميم مريح، خاصية إلغاء الضوضاء، وعمر بطارية طويل.', reviews: [
    { reviewerName: 'محمد', rating: 5, comment: 'عزل الصوت ممتاز وجودة الصوت لا تصدق.' }
  ], brand: 'AudioBeat', sku: 'AB-NC500'},
  { name: 'ساعة ذكية', price: 4800, discountPrice: 4500, imageUrls: ['https://picsum.photos/seed/watch1/800/600', 'https://picsum.photos/seed/watch2/800/600', 'https://picsum.photos/seed/watch3/800/600'], category: 'electronics', description: 'ساعة ذكية أنيقة لتتبع لياقتك البدنية، استقبال الإشعارات، وإدارة يومك بكفاءة. مقاومة للماء ومتوافقة مع جميع الأجهزة.', sku: 'SW-PRO-G3'},
  { name: 'شاشة تلفاز ذكية 4K', price: 18000, imageUrls: ['https://picsum.photos/seed/tv1/800/600', 'https://picsum.photos/seed/tv2/800/600'], category: 'electronics', description: 'شاشة تلفاز ذكية بحجم 55 بوصة ودقة 4K UHD، توفر ألوانًا غنية وتفاصيل مذهلة. تدعم تطبيقات البث المباشر ومساعد جوجل الصوتي.' },
  { name: 'كاميرا احترافية', price: 28000, imageUrls: ['https://picsum.photos/seed/camera1/800/600', 'https://picsum.photos/seed/camera2/800/600'], category: 'electronics', description: 'كاميرا DSLR احترافية بدقة 24 ميجابكسل لتصوير صور وفيديوهات عالية الجودة. مثالية للمصورين المحترفين والهواة.' },
  { name: 'جهاز لوحي (تابلت)', price: 8500, imageUrls: ['https://picsum.photos/seed/tablet/800/600'], category: 'electronics', description: 'جهاز لوحي متعدد الاستخدامات بشاشة لمس عالية الدقة، مثالي للعمل والدراسة والترفيه. خفيف الوزن وسهل الحمل.' },
  { name: 'لوحة مفاتيح لاسلكية', price: 1300, imageUrls: ['https://picsum.photos/seed/keyboard/800/600'], category: 'electronics', description: 'لوحة مفاتيح لاسلكية بتصميم أنيق ومفاتيح مريحة. متوافقة مع أجهزة الكمبيوتر والأجهزة اللوحية والهواتف الذكية.' },
  { name: 'شاحن متنقل (باور بانك)', price: 950, imageUrls: ['https://picsum.photos/seed/powerbank/800/600'], category: 'electronics', description: 'شاحن متنقل بسعة كبيرة لشحن أجهزتك أثناء التنقل. صغير الحجم ويدعم الشحن السريع.' },
  { name: 'طابعة ليزر', price: 6200, imageUrls: ['https://picsum.photos/seed/printer/800/600'], category: 'electronics', description: 'طابعة ليزر أحادية اللون عالية السرعة، مثالية للمكاتب الصغيرة والاستخدام المنزلي. طباعة واضحة وتكلفة منخفضة لكل صفحة.' },
  { name: 'جهاز عرض بروجيكتور', price: 9800, imageUrls: ['https://picsum.photos/seed/projector/800/600'], category: 'electronics', description: 'جهاز عرض بروجيكتور بدقة Full HD لتجربة سينمائية في منزلك. سطوع عالي وألوان واقعية، مناسب للأفلام والألعاب.' },
  { name: 'موزع انترنت (راوتر)', price: 1500, imageUrls: ['https://picsum.photos/seed/router/800/600'], category: 'electronics', description: 'راوتر واي فاي فائق السرعة بتقنية Wi-Fi 6 لتغطية منزلية كاملة واتصال مستقر لجميع أجهزتك.' },

  // Clothing
  { name: 'قميص قطني', price: 750, imageUrls: ['https://picsum.photos/seed/shirt1/800/600', 'https://picsum.photos/seed/shirt2/800/600'], category: 'clothing', description: 'قميص كلاسيكي مصنوع من القطن المصري الفاخر. مريح وأنيق ومناسب لجميع المناسبات.', brand: 'Nile Threads', sku: 'NT-CS-001'},
  { name: 'بنطلون جينز', price: 1200, imageUrls: ['https://picsum.photos/seed/jeans/800/600'], category: 'clothing', description: 'بنطلون جينز بقصة عصرية وخامة متينة. يوفر الراحة والأناقة لإطلالة يومية مميزة.', brand: 'Urban Denim', sku: 'UD-SLIM-42'},
  { name: 'فستان صيفي', price: 1800, discountPrice: 1599, imageUrls: ['https://picsum.photos/seed/dress1/800/600', 'https://picsum.photos/seed/dress2/800/600', 'https://picsum.photos/seed/dress3/800/600'], category: 'clothing', description: 'فستان صيفي خفيف بتصميم جذاب وألوان زاهية. مثالي للنزهات والمناسبات النهارية.', brand: 'Summer Breeze', sku: 'SB-FL-D22'},
  { name: 'حذاء رياضي', price: 2500, discountPrice: 2250, imageUrls: ['https://picsum.photos/seed/shoes1/800/600', 'https://picsum.photos/seed/shoes2/800/600'], category: 'clothing', description: 'حذاء رياضي بتقنية متطورة لتوفير الدعم والراحة أثناء ممارسة الرياضة أو المشي.' },
  { name: 'جاكيت شتوي', price: 2100, imageUrls: ['https://picsum.photos/seed/jacket/800/600'], category: 'clothing', description: 'جاكيت شتوي دافئ وأنيق، مبطن بالفرو لحمايتك من البرد القارس. تصميم عصري يناسب جميع الإطلالات.' },
  { name: 'نظارة شمسية', price: 900, imageUrls: ['https://picsum.photos/seed/sunglasses/800/600'], category: 'clothing', description: 'نظارة شمسية عصرية تحمي عينيك من أشعة الشمس فوق البنفسجية. تصميم أنيق يناسب الرجال والنساء.' },
  { name: 'محفظة جلدية', price: 600, imageUrls: ['https://picsum.photos/seed/wallet/800/600'], category: 'clothing', description: 'محفظة رجالية من الجلد الطبيعي بتصميم كلاسيكي. تحتوي على جيوب متعددة للبطاقات والنقود.' },
  { name: 'وشاح حريري', price: 450, imageUrls: ['https://picsum.photos/seed/scarf/800/600'], category: 'clothing', description: 'وشاح نسائي من الحرير الناعم بألوان زاهية. يضيف لمسة من الأناقة لأي إطلالة.' },
  { name: 'حزام جلدي', price: 500, imageUrls: ['https://picsum.photos/seed/belt/800/600'], category: 'clothing', description: 'حزام كلاسيكي مصنوع من الجلد الطبيعي عالي الجودة. إبزيم معدني أنيق يضيف لمسة من الرقي لإطلالتك.' },
  { name: 'قبعة بيسبول', price: 350, imageUrls: ['https://picsum.photos/seed/cap/800/600'], category: 'clothing', description: 'قبعة بيسبول عصرية مصنوعة من القطن لحمايتك من الشمس. تصميم بسيط وشعار مطرز يكمل أي إطلالة كاجوال.' },
  
  // Cosmetics
  { name: 'عطر فاخر', price: 3200, discountPrice: 2850, imageUrls: ['https://picsum.photos/seed/perfume1/800/600', 'https://picsum.photos/seed/perfume2/800/600'], category: 'cosmetics', description: 'عطر فريد يجمع بين نفحات الأزهار والأخشاب. رائحة تدوم طويلاً وتناسب الجنسين.', brand: 'Aroma Royale', sku: 'AR-EDP-100'},
  { name: 'كريم مرطب للبشرة', price: 650, imageUrls: ['https://picsum.photos/seed/cream1/800/600', 'https://picsum.photos/seed/cream2/800/600'], category: 'cosmetics', description: 'كريم مرطب غني بالفيتامينات يغذي البشرة بعمق ويحافظ على نضارتها. مناسب لجميع أنواع البشرة.', brand: 'Glow Up', sku: 'GU-HYDRA-50'},
  { name: 'أحمر شفاه', price: 400, imageUrls: ['https://picsum.photos/seed/lipstick/800/600'], category: 'cosmetics', description: 'أحمر شفاه بلون غني وثابت. يمنح شفتيك مظهراً جذاباً وترطيباً مثالياً.' },
  { name: 'كريم أساس', price: 550, discountPrice: 499, imageUrls: ['https://picsum.photos/seed/foundation/800/600'], category: 'cosmetics', description: 'كريم أساس يمنحك تغطية مثالية ومظهراً طبيعياً. يخفي العيوب ويوحد لون البشرة، ويدوم طويلاً.' },
  { name: 'ماسكارا لتكثيف الرموش', price: 480, imageUrls: ['https://picsum.photos/seed/mascara/800/600'], category: 'cosmetics', description: 'ماسكارا بتركيبة فريدة لتكثيف وتطويل الرموش. تمنحك نظرة جذابة وعيون واسعة بدون تكتل.' },

  // Digital Products
  { name: 'كتاب الطبخ الإلكتروني', price: 150, imageUrls: ['https://picsum.photos/seed/ebook/800/600'], category: 'digital', description: 'كتاب إلكتروني يحتوي على أكثر من 100 وصفة سهلة ولذيذة. حمله الآن وابدأ الطهي كالمحترفين.', sku: 'DIGI-EB-COOK-01' },
  { name: 'برنامج تصميم جرافيك', price: 2500, discountPrice: 1999, imageUrls: ['https://picsum.photos/seed/software/800/600'], category: 'digital', description: 'برنامج قوي وسهل الاستخدام لتصميم الجرافيك وتحرير الصور. رخصة مدى الحياة مع تحديثات مجانية.', sku: 'DIGI-SW-GRAPH-PRO' },
  { name: 'دورة تسويق رقمي', price: 4500, imageUrls: ['https://picsum.photos/seed/course/800/600'], category: 'digital', description: 'دورة تدريبية شاملة عبر الإنترنت لتعلم أساسيات واستراتيجيات التسويق الرقمي. شهادة معتمدة عند الانتهاء.', sku: 'DIGI-CR-MKT-101' },
  { name: 'قالب موقع ووردبريس', price: 800, imageUrls: ['https://picsum.photos/seed/template/800/600'], category: 'digital', description: 'قالب ووردبريس احترافي ومتجاوب لموقعك. سهل التخصيص ويدعم اللغة العربية بشكل كامل.', sku: 'DIGI-WP-THEME-BIZ' },
];

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  addReview: (productName: string, review: Review) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const localData = localStorage.getItem('products');
      // If there is local data, use it. Otherwise, use the initial hardcoded list.
      if (localData) {
        return JSON.parse(localData);
      } else {
        localStorage.setItem('products', JSON.stringify(initialProducts));
        return initialProducts;
      }
    } catch (error)
 {
      console.error("Could not parse products data from localStorage", error);
      return initialProducts;
    }
  });

  useEffect(() => {
    // This effect will run whenever `products` state changes.
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(prevProducts => [...prevProducts, product]);
  };

  const addReview = (productName: string, review: Review) => {
    setProducts(prevProducts =>
      prevProducts.map(p => {
        if (p.name === productName) {
          const updatedReviews = p.reviews ? [...p.reviews, review] : [review];
          return { ...p, reviews: updatedReviews };
        }
        return p;
      })
    );
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, addReview }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
