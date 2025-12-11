import React, { useState, useEffect } from "react";
import {
  Upload,
  Save,
  Image as ImageIcon,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  FileText,
  Sparkles,
  Eye,
  X,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function WebSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImages, setPreviewImages] = useState({
    header_logo: null,
    footer_logo: null,
    logo: null,
    fav_icon: null,
  });

  const [formData, setFormData] = useState({
    header_logo: null,
    footer_logo: null,
    logo: null,
    fav_icon: null,
    description: "",
    phone_number: "",
    email: "",
    address: "",
    copyright_content: "",
    facebook: "",
    twitter: "",
    instagram: "",
    sitename: "",
    opt_email: "",
    opt_mobile: "",
    telegram: "",
  });

  // Fetch existing settings
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("novaya_auth"));
      
      const response = await axios.get(`${BASE_URL}/admin/get_settings`, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });

      if (response.data.success) {
        const settings = response.data.data;
        setFormData({
          description: settings.description || "",
          phone_number: settings.phone_number || "",
          email: settings.email || "",
          address: settings.address || "",
          copyright_content: settings.copyright_content || "",
          facebook: settings.facebook || "",
          twitter: settings.twitter || "",
          instagram: settings.instagram || "",
          sitename: settings.sitename || "",
          opt_email: settings.opt_email || "",
          opt_mobile: settings.opt_mobile || "",
          telegram: settings.telegram || "",
        });

        // Set preview images if they exist
        if (settings.header_logo) {
          setPreviewImages((prev) => ({
            ...prev,
            header_logo: `${BASE_URL}/uploads/${settings.header_logo}`,
          }));
        }
        if (settings.footer_logo) {
          setPreviewImages((prev) => ({
            ...prev,
            footer_logo: `${BASE_URL}/uploads/${settings.footer_logo}`,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error(error.response?.data?.message || "Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => ({
          ...prev,
          [fieldName]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: null,
    }));
    setPreviewImages((prev) => ({
      ...prev,
      [fieldName]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const userData = JSON.parse(localStorage.getItem("novaya_auth"));
      const formDataToSend = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        `${BASE_URL}/admin/edit_settings`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Settings updated successfully!", {
          position: "top-center",
        });
        fetchSettings(); // Refresh settings
      } else {
        toast.error(response.data.message || "Failed to update settings", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again.",
        {
          position: "top-center",
        }
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="main main_page p-4 duration-900">
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.6); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .input-focus {
          transition: all 0.3s ease;
        }
        .input-focus:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
        }
      `}</style>

      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Web Settings" />
      </div>

      <form onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Header Logo */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-slideIn"
            style={{ animationDelay: "0s" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Header Logo</h3>
            </div>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-all group">
              {previewImages.header_logo ? (
                <div className="relative">
                  <img
                    src={previewImages.header_logo}
                    alt="Header Logo"
                    className="max-h-32 mx-auto rounded-lg shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage("header_logo")}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all hover:scale-110"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
                  <p className="text-sm text-gray-500 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG or JPEG (max. 5MB)
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "header_logo")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Footer Logo */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-slideIn"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-bold text-gray-900">Footer Logo</h3>
            </div>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-teal-400 transition-all group">
              {previewImages.footer_logo ? (
                <div className="relative">
                  <img
                    src={previewImages.footer_logo}
                    alt="Footer Logo"
                    className="max-h-32 mx-auto rounded-lg shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage("footer_logo")}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all hover:scale-110"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2 group-hover:text-teal-500 transition-colors" />
                  <p className="text-sm text-gray-500 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG or JPEG (max. 5MB)
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "footer_logo")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 animate-slideIn"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">
              Basic Information
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Site Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                name="sitename"
                value={formData.sitename}
                onChange={handleInputChange}
                placeholder="Enter site name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter site description"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 animate-slideIn"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Phone className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">
              Contact Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="+61 2 8000 4567"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="hello@novayahealth.co"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
              />
            </div>

            {/* Optional Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Optional Email
              </label>
              <input
                type="email"
                name="opt_email"
                value={formData.opt_email}
                onChange={handleInputChange}
                placeholder="support@novayahealth.co"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
              />
            </div>

            {/* Optional Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Optional Mobile
              </label>
              <input
                type="text"
                name="opt_mobile"
                value={formData.opt_mobile}
                onChange={handleInputChange}
                placeholder="+61 2 8000 4568"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="126 Main Street, New York, USA"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 animate-slideIn"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
            <h3 className="text-lg font-bold text-gray-900">
              Social Media Links
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facebook */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Facebook className="w-4 h-4 inline mr-2 text-blue-600" />
                Facebook
              </label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                placeholder="https://facebook.com/novayahealth"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
              />
            </div>

            {/* Twitter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Twitter className="w-4 h-4 inline mr-2 text-sky-500" />
                Twitter
              </label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                placeholder="https://twitter.com/novayahealth"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Instagram className="w-4 h-4 inline mr-2 text-pink-600" />
                Instagram
              </label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/novayahealth"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
              />
            </div>

            {/* Telegram */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telegram
              </label>
              <input
                type="url"
                name="telegram"
                value={formData.telegram}
                onChange={handleInputChange}
                placeholder="https://t.me/novayahealth"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
              />
            </div>
          </div>
        </div>

        {/* Copyright Content */}
        <div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 animate-slideIn"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">
              Copyright Content
            </h3>
          </div>

          <div>
            <input
              type="text"
              name="copyright_content"
              value={formData.copyright_content}
              onChange={handleInputChange}
              placeholder="Copyright © 2025. All rights reserved. Novaya Health"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 animate-slideIn" style={{ animationDelay: "0.6s" }}>
          <button
            type="submit"
            disabled={isSaving}
            className="group relative flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white cursor-pointer rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSaving ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Settings
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </form>
    </div>
  );
}