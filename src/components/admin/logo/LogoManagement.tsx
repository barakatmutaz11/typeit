import React, { useState } from 'react';
import { Upload, Trash2, Check } from 'lucide-react';
import { Button } from '../../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLogoStore } from '../../../store/logo.store';
import { toast } from 'react-hot-toast';

const DEFAULT_LOGOS = [
  { id: 'logo1', url: 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=100&h=100&fit=crop&auto=format' },
  { id: 'logo2', url: 'https://images.unsplash.com/photo-1614854262340-ab1ca7d079c7?w=100&h=100&fit=crop&auto=format' },
  { id: 'logo3', url: 'https://images.unsplash.com/photo-1614854262383-7e0b4491b463?w=100&h=100&fit=crop&auto=format' },
];

export function LogoManagement() {
  const { currentLogo, setLogo } = useLogoStore();
  const [selectedLogo, setSelectedLogo] = useState<string | null>(currentLogo);
  const [isUploading, setIsUploading] = useState(false);

  const handleLogoSelect = (logoUrl: string) => {
    setSelectedLogo(logoUrl);
  };

  const handleSave = () => {
    if (selectedLogo) {
      setLogo(selectedLogo);
      toast.success('Logo updated successfully');
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setIsUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const imageUrl = URL.createObjectURL(file);
      setSelectedLogo(imageUrl);
      toast.success('Logo uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload logo');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Logo Management
        </h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => setSelectedLogo(null)}
            disabled={!selectedLogo}
          >
            <Trash2 size={18} className="mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedLogo || selectedLogo === currentLogo}
          >
            <Check size={18} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Logo
          </label>
          <div className="flex items-center gap-4">
            {selectedLogo ? (
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={selectedLogo}
                alt="Selected logo"
                className="w-16 h-16 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Upload size={24} className="text-gray-400" />
              </div>
            )}
            <div>
              <input
                type="file"
                id="logo-upload"
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
              />
              <Button
                variant="ghost"
                onClick={() => document.getElementById('logo-upload')?.click()}
                isLoading={isUploading}
              >
                <Upload size={18} className="mr-2" />
                Upload New Logo
              </Button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Default Options
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {DEFAULT_LOGOS.map((logo) => (
                <motion.button
                  key={logo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLogoSelect(logo.url)}
                  className={`
                    relative aspect-square rounded-lg overflow-hidden
                    border-2 transition-all duration-200
                    ${selectedLogo === logo.url 
                      ? 'border-primary-500 shadow-lg' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                    }
                  `}
                >
                  <img
                    src={logo.url}
                    alt={`Logo option ${logo.id}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedLogo === logo.url && (
                    <div className="absolute inset-0 bg-primary-500/20 flex items-center justify-center">
                      <Check className="text-primary-500 w-8 h-8" />
                    </div>
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}