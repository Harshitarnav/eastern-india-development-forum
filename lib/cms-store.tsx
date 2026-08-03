"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { site as defaultSiteData } from "@/content/site";

interface CMSContextType {
  siteData: typeof defaultSiteData;
  updateSiteData: (newData: Partial<typeof defaultSiteData>) => void;
  resetToDefault: () => void;
  isCMSActive: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "eidf_cms_data_v1";

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<typeof defaultSiteData>(defaultSiteData);
  const [isCMSActive, setIsCMSActive] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setSiteData(JSON.parse(saved));
        setIsCMSActive(true);
      }
    } catch (err) {
      console.error("Failed to load CMS data from local storage", err);
    }
  }, []);

  const updateSiteData = (newData: Partial<typeof defaultSiteData>) => {
    const updated = { ...siteData, ...newData };
    setSiteData(updated);
    setIsCMSActive(true);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to persist CMS data", err);
    }
  };

  const resetToDefault = () => {
    setSiteData(defaultSiteData);
    setIsCMSActive(false);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear CMS storage", err);
    }
  };

  return (
    <CMSContext.Provider value={{ siteData, updateSiteData, resetToDefault, isCMSActive }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};
