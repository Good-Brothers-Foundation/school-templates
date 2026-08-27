"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface TemplateConfig {
  title: string;
  mobile: string;
  email: string;
  address: string;
}

interface SiteConfigContextType {
  config: TemplateConfig;
  updateConfig: (newConfig: Partial<TemplateConfig>) => void;
}

const defaultConfigs: Record<string, TemplateConfig> = {
  "template-1": {
    title: "KINGDOM",
    mobile: "+91 99999 99999",
    email: "contact.businesskiduniya@gmail.com",
    address: "2nd floor 86/3, Sant Nagar Marg, Parvatiya Anchal, Maurya Enclave, Baba Colony, Burari, Delhi, India 110084",
  },
  "template-2": {
    title: "Template 2 School",
    mobile: "+91 99999 99999",
    email: "contact@template2.com",
    address: "Template 2 School Address",
  }
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: ReactNode; templateId: string }> = ({
  children,
  templateId,
}) => {
  const [config, setConfig] = useState<TemplateConfig>(() => {
    return defaultConfigs[templateId] || defaultConfigs["template-1"];
  });

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    const saved = localStorage.getItem(`site_config_${templateId}`);
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }
  }, [templateId]);

  // Update document title when config.title changes
  useEffect(() => {
    if (config.title) {
      document.title = `${config.title} - Kindergarten & School`;
    }
  }, [config.title]);

  const updateConfig = useCallback((newConfig: Partial<TemplateConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem(`site_config_${templateId}`, JSON.stringify(updated));
      return updated;
    });
  }, [templateId]);

  // Expose the global renameSiteTitle function on the window object
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.renameSiteTitle = (
        target: string,
        mobile: string,
        email: string,
        address: string,
        title?: string
      ) => {
        if (target === templateId) {
          updateConfig({
            mobile,
            email,
            address,
            ...(title ? { title } : {}),
          });
          console.log(`Successfully updated config for ${target}:`, { mobile, email, address, title });
        } else {
          // If targeting a different template, update its values directly in localStorage
          const savedTarget = localStorage.getItem(`site_config_${target}`);
          let prevTarget = defaultConfigs[target] || { title: "", mobile: "", email: "", address: "" };
          if (savedTarget) {
            try {
              prevTarget = JSON.parse(savedTarget);
            } catch (e) {}
          }
          const updatedTarget = {
            ...prevTarget,
            mobile,
            email,
            address,
            ...(title ? { title } : { title: title || prevTarget.title || target.toUpperCase() }),
          };
          localStorage.setItem(`site_config_${target}`, JSON.stringify(updatedTarget));
          console.log(`Saved updated config for inactive template ${target} to localStorage.`);
        }
      };
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).renameSiteTitle;
      }
    };
  }, [templateId]);

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = (): SiteConfigContextType => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
};

export const SiteConfigUpdater: React.FC<{ config: TemplateConfig }> = ({ config }) => {
  const { config: currentConfig, updateConfig } = useSiteConfig();

  useEffect(() => {
    if (
      currentConfig.title !== config.title ||
      currentConfig.mobile !== config.mobile ||
      currentConfig.email !== config.email ||
      currentConfig.address !== config.address
    ) {
      updateConfig(config);
    }
  }, [
    config.title,
    config.mobile,
    config.email,
    config.address,
    currentConfig.title,
    currentConfig.mobile,
    currentConfig.email,
    currentConfig.address,
    updateConfig,
  ]);

  return null;
};
