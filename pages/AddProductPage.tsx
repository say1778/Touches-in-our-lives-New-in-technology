import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts, Product } from '../context/ProductContext';
import SectionTitle from '../components/SectionTitle';

const UploadCloudIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Upload file</title>
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
        <path d="M12 12v9"></path>
        <path d="m16 16-4-4-4 4"></path>
    </svg>
);

const XCircleIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <title>Remove image</title>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
);


const AddProductPage: React.FC = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: 'electronics' as 'electronics' | 'clothing' | 'cosmetics' | 'digital',
    brand: '',
    sku: '',
  });
  const [imageUrlsString, setImageUrlsString] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newUrls = imageFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(newUrls);

    // Cleanup function to revoke the object URLs
    return () => {
      newUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imageFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUrlsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setImageUrlsString(e.target.value);
  }
  
  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      setImageFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };
  
  const handleAreaClick = () => {
      fileInputRef.current?.click();
  };
  
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileChange(e.target.files);
      if(e.target) e.target.value = ''; // Allow selecting the same file again
  };

  const removeImage = (indexToRemove: number) => {
    setImageFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNumber = parseFloat(product.price);
    const hasUrlInput = imageUrlsString.trim().length > 0;
    const hasFileInput = imageFiles.length > 0;

    if (!product.name || isNaN(priceNumber) || priceNumber <= 0 || !product.description) {
      alert('يرجى ملء حقول الاسم والسعر والوصف بشكل صحيح.');
      return;
    }
    
    if (!hasUrlInput && !hasFileInput) {
      alert('يرجى إضافة صورة واحدة على الأقل، إما عن طريق الرفع أو بإدخال رابط.');
      return;
    }
    
    const manualUrls = imageUrlsString.split(',').map(url => url.trim()).filter(url => url);
    // In a real app, you would upload files and get URLs from a server.
    // For this mock-up, we'll use placeholder images for the uploaded files.
    const uploadedUrls = imageFiles.map((file, index) => `https://picsum.photos/seed/${encodeURIComponent(file.name)}.${index}/800/600`);
    
    const newProduct: Product = {
        name: product.name,
        price: priceNumber,
        description: product.description,
        category: product.category,
        imageUrls: [...uploadedUrls, ...manualUrls],
        brand: product.brand || undefined,
        sku: product.sku || undefined,
    };

    addProduct(newProduct);
    alert('تمت إضافة المنتج بنجاح!');
    navigate('/pricing');
  };

  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";
  const dropzoneBaseClasses = "flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer transition-colors duration-300";
  const dropzoneInactiveClasses = "border-gray-300 hover:border-indigo-400";
  const dropzoneActiveClasses = "border-indigo-500 bg-indigo-50";


  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <SectionTitle title="إضافة منتج جديد" subtitle="املأ النموذج لإضافة منتج جديد إلى متجرك" />
      <form onSubmit={handleSubmit} className="space-y-6 text-right">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">اسم المنتج</label>
          <input type="text" id="name" name="name" value={product.name} onChange={handleChange} className={inputClasses} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">السعر (ج.م)</label>
                <input type="number" id="price" name="price" value={product.price} onChange={handleChange} className={inputClasses} required min="0.01" step="0.01" />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">الفئة</label>
                <select id="category" name="category" value={product.category} onChange={handleChange} className={inputClasses} required>
                    <option value="electronics">إلكترونيات</option>
                    <option value="clothing">ملابس</option>
                    <option value="cosmetics">مستحضرات تجميل</option>
                    <option value="digital">منتجات رقمية</option>
                </select>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">العلامة التجارية (اختياري)</label>
                <input type="text" id="brand" name="brand" value={product.brand} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU (اختياري)</label>
                <input type="text" id="sku" name="sku" value={product.sku} onChange={handleChange} className={inputClasses} />
            </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">الوصف</label>
          <textarea id="description" name="description" value={product.description} onChange={handleChange} rows={4} className={inputClasses} required></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">صور المنتج</label>
          {previewUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group aspect-square">
                  <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-md shadow-sm" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -end-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                    aria-label="Remove image"
                  >
                    <XCircleIcon className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
          )}
           <div 
             className={`${dropzoneBaseClasses} ${isDragging ? dropzoneActiveClasses : dropzoneInactiveClasses} ${previewUrls.length > 0 ? 'mt-4' : 'mt-2'}`}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeave}
             onDrop={handleDrop}
             onClick={handleAreaClick}
           >
              <div className="space-y-1 text-center">
                  <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-600">
                      <span className="font-semibold text-indigo-600">اسحب وأفلت الصور هنا</span>، أو انقر للاختيار
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
              <input 
                  ref={fileInputRef}
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  className="sr-only" 
                  multiple
                  onChange={handleFileSelected}
                  accept="image/*"
              />
           </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-gray-500">أو</span>
          </div>
        </div>


        <div>
          <label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700">أدخل روابط الصور (مفصولة بفاصلة)</label>
          <input type="text" id="imageUrls" name="imageUrls" value={imageUrlsString} onChange={handleImageUrlsChange} className={inputClasses} placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
        </div>

        <div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            إضافة المنتج
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;