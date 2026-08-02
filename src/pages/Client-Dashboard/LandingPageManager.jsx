import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useLandingPageConfig } from "../../context/LandingPageConfigContext";
import { ArrowRightIcon, RotateCcwIcon, SparklesIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { FileInput } from "../../components/ui/file-input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { motion } from "framer-motion";
import { AnimatedText } from "../../components/ui/AnimatedText";
import { useNotifications } from "../../context/NotificationContext";
import { landingPageDefaults } from "../../data/landingPageDefaults";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function SectionCard({ id, title, description, children, onSave, saveLabel = "Save changes" }) {
  return (
    <motion.div variants={itemVariants}>
      <Card
        id={id}
        className="scroll-mt-24 w-full overflow-hidden border-border/80 bg-card/95 text-card-foreground shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <div className="h-1 bg-[linear-gradient(90deg,#0f4c81,#118ab2,#f4b942)]" />
        <CardHeader className="border-b border-border/60 px-3 py-4 sm:px-6 sm:py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-[11px] sm:tracking-[0.24em]">
            Section editor
          </p>
          <CardTitle className="mt-2 text-xl leading-tight text-foreground sm:text-2xl">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="mt-2 max-w-3xl text-sm leading-6">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="px-3 py-4 sm:px-6 sm:py-6">
          {children}
          {onSave && (
            <div className="mt-6 flex flex-col gap-3 border-t border-border/40 pt-5 sm:flex-row sm:justify-end">
              <Button
                onClick={onSave}
                className="w-full rounded-xl px-6 font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#05c1ff] text-white transition hover:brightness-110 sm:w-auto"
              >
                {saveLabel}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <Label className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </Label>
      {children}
      {hint && <span className="mt-2 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function TextInput(props) {
  return (
    <Input
      {...props}
      className={`w-full rounded-2xl ${props.className || ""}`}
    />
  );
}

function TextArea(props) {
  return (
    <Textarea
      {...props}
      className={`w-full rounded-2xl ${props.className || ""}`}
    />
  );
}

function ImageField({ label, value, onChange, hint }) {
  return (
    <Field label={label} hint={hint}>
      <FileInput label="Choose file" value={value} accept="image/*" onChange={onChange} previewAlt={label} />
    </Field>
  );
}

export default function LandingPageManager() {
  const { config, setConfig, resetConfig, loading } = useLandingPageConfig();
  const { addNotification } = useNotifications();
  const [draftConfig, setDraftConfig] = React.useState(config);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [pendingSave, setPendingSave] = React.useState(null);
  const [pendingSaveLabel, setPendingSaveLabel] = React.useState("");
  const [resetConfirmOpen, setResetConfirmOpen] = React.useState(false);
  const location = useLocation();
  const hasInitializedDraft = React.useRef(false);

  useEffect(() => {
    if (loading || hasInitializedDraft.current) {
      return;
    }

    setDraftConfig(config);
    hasInitializedDraft.current = true;
  }, [config, loading]);

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      window.requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.hash]);

  const updateTheme = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      theme: {
        ...current.theme,
        [key]: value,
      },
    }));
  };

  const updateHero = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      hero: {
        ...current.hero,
        [key]: value,
      },
    }));
  };

  const updateHomePage = (section, key, value) => {
    setDraftConfig((current) => ({
      ...current,
      homePage: {
        ...current.homePage,
        [section]: {
          ...current.homePage?.[section],
          [key]: value,
        },
      },
    }));
  };

  const updateHomePageArrayItem = (section, arrayKey, index, key, value) => {
    setDraftConfig((current) => {
      const items = [...(current.homePage?.[section]?.[arrayKey] ?? [])];
      items[index] = { ...items[index], [key]: value };
      return {
        ...current,
        homePage: {
          ...current.homePage,
          [section]: {
            ...current.homePage?.[section],
            [arrayKey]: items,
          },
        },
      };
    });
  };

  const updateSupportersCategory = (index, key, value) => {
    setDraftConfig((current) => {
      const categories = [...(current.homePage?.supporters?.categories ?? landingPageDefaults.homePage.supporters.categories)];
      categories[index] = { ...categories[index], [key]: value };

      return {
        ...current,
        homePage: {
          ...current.homePage,
          supporters: {
            ...current.homePage?.supporters,
            categories,
          },
        },
      };
    });
  };

  const updateSupportersLogo = (categoryIndex, logoIndex, value) => {
    setDraftConfig((current) => {
      const categories = [...(current.homePage?.supporters?.categories ?? landingPageDefaults.homePage.supporters.categories)];
      const items = [...(categories[categoryIndex]?.items ?? [])];
      items[logoIndex] = { ...items[logoIndex], name: value };
      categories[categoryIndex] = { ...categories[categoryIndex], items };

      return {
        ...current,
        homePage: {
          ...current.homePage,
          supporters: {
            ...current.homePage?.supporters,
            categories,
          },
        },
      };
    });
  };

  const addSupportersCategory = () => {
    setDraftConfig((current) => {
      const categories = [...(current.homePage?.supporters?.categories ?? landingPageDefaults.homePage.supporters.categories)];
      categories.push({ title: "New group", items: [{ name: "Partner name" }] });

      return {
        ...current,
        homePage: {
          ...current.homePage,
          supporters: {
            ...current.homePage?.supporters,
            categories,
          },
        },
      };
    });
  };

  const addSupportersLogo = (categoryIndex) => {
    setDraftConfig((current) => {
      const categories = [...(current.homePage?.supporters?.categories ?? landingPageDefaults.homePage.supporters.categories)];
      const items = [...(categories[categoryIndex]?.items ?? [])];
      items.push({ name: "Partner name" });
      categories[categoryIndex] = { ...categories[categoryIndex], items };

      return {
        ...current,
        homePage: {
          ...current.homePage,
          supporters: {
            ...current.homePage?.supporters,
            categories,
          },
        },
      };
    });
  };

  const removeSupportersCategory = (categoryIndex) => {
    setDraftConfig((current) => {
      const categories = [...(current.homePage?.supporters?.categories ?? landingPageDefaults.homePage.supporters.categories)];
      categories.splice(categoryIndex, 1);

      return {
        ...current,
        homePage: {
          ...current.homePage,
          supporters: {
            ...current.homePage?.supporters,
            categories,
          },
        },
      };
    });
  };

  const removeSupportersLogo = (categoryIndex, logoIndex) => {
    setDraftConfig((current) => {
      const categories = [...(current.homePage?.supporters?.categories ?? landingPageDefaults.homePage.supporters.categories)];
      const items = [...(categories[categoryIndex]?.items ?? [])];
      items.splice(logoIndex, 1);
      categories[categoryIndex] = { ...categories[categoryIndex], items };

      return {
        ...current,
        homePage: {
          ...current.homePage,
          supporters: {
            ...current.homePage?.supporters,
            categories,
          },
        },
      };
    });
  };

  const updateHeroSlide = (index, key, value) => {
    setDraftConfig((current) => {
      const slides = [...(current.hero.slides ?? [])];
      slides[index] = { ...slides[index], [key]: value };
      return {
        ...current,
        hero: {
          ...current.hero,
          slides,
        },
      };
    });
  };

  const updateAbout = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      about: {
        ...current.about,
        [key]: value,
      },
    }));
  };

  const updateAboutOverlay = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      about: {
        ...current.about,
        overlay: {
          ...current.about.overlay,
          [key]: value,
        },
      },
    }));
  };

  const updateWhyChoose = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      whyChoose: {
        ...current.whyChoose,
        [key]: value,
      },
    }));
  };

  const updateWhyChooseCard = (index, key, value) => {
    setDraftConfig((current) => {
      const cards = [...current.whyChoose.cards];
      cards[index] = { ...cards[index], [key]: value };
      return {
        ...current,
        whyChoose: {
          ...current.whyChoose,
          cards,
        },
      };
    });
  };

  const updateFooter = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      footer: {
        ...current.footer,
        [key]: value,
      },
    }));
  };

  const updateFooterSocialLink = (index, key, value) => {
    setDraftConfig((current) => {
      const socialLinks = [...(current.footer?.socialLinks || [])];
      socialLinks[index] = { ...socialLinks[index], [key]: value };
      return {
        ...current,
        footer: {
          ...current.footer,
          socialLinks,
        },
      };
    });
  };

  const updateServices = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      services: {
        ...current.services,
        [key]: value,
      },
    }));
  };

  const updateServiceCard = (index, key, value) => {
    setDraftConfig((current) => {
      const cards = [...current.services.cards];
      cards[index] = { ...cards[index], [key]: value };
      return {
        ...current,
        services: {
          ...current.services,
          cards,
        },
      };
    });
  };

  const updateGallery = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      gallery: {
        ...current.gallery,
        [key]: value,
      },
    }));
  };

  const updateGalleryItem = (index, key, value) => {
    setDraftConfig((current) => {
      const items = [...current.gallery.items];
      items[index] = { ...items[index], [key]: value };
      return {
        ...current,
        gallery: {
          ...current.gallery,
          items,
        },
      };
    });
  };

  const updateGalleryStories = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      galleryStories: {
        ...current.galleryStories,
        [key]: value,
      },
    }));
  };

  const updateGalleryLead = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      galleryStories: {
        ...current.galleryStories,
        lead: {
          ...current.galleryStories.lead,
          [key]: value,
        },
      },
    }));
  };

  const updateGallerySupportIntro = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      galleryStories: {
        ...current.galleryStories,
        supportIntro: {
          ...current.galleryStories.supportIntro,
          [key]: value,
        },
      },
    }));
  };

  const updateGallerySupportCard = (index, key, value) => {
    setDraftConfig((current) => {
      const supportCards = [...current.galleryStories.supportCards];
      supportCards[index] = { ...supportCards[index], [key]: value };
      return {
        ...current,
        galleryStories: {
          ...current.galleryStories,
          supportCards,
        },
      };
    });
  };

  const updateGalleryStrip = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      galleryStories: {
        ...current.galleryStories,
        [key]: value,
      },
    }));
  };

  const updateGalleryStripItem = (index, key, value) => {
    setDraftConfig((current) => {
      const stripItems = [...current.galleryStories.stripItems];
      stripItems[index] = { ...stripItems[index], [key]: value };
      return {
        ...current,
        galleryStories: {
          ...current.galleryStories,
          stripItems,
        },
      };
    });
  };

  const updateVideo = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      video: {
        ...current.video,
        [key]: value,
      },
    }));
  };

  const updateVideoLead = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      video: {
        ...current.video,
        lead: {
          ...current.video.lead,
          [key]: value,
        },
      },
    }));
  };

  const updateVideoClip = (index, key, value) => {
    setDraftConfig((current) => {
      const clips = [...current.video.clips];
      clips[index] = { ...clips[index], [key]: value };
      return {
        ...current,
        video: {
          ...current.video,
          clips,
        },
      };
    });
  };

  const updateProfile = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      profile: {
        ...current.profile,
        [key]: value,
      },
    }));
  };

  const updateCompanyProfile = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      companyProfile: {
        ...current.companyProfile,
        [key]: value,
      },
    }));
  };

  const updateCompanyProfileSection = (section, key, value) => {
    setDraftConfig((current) => ({
      ...current,
      companyProfile: {
        ...current.companyProfile,
        [section]: {
          ...current.companyProfile?.[section],
          [key]: value,
        },
      },
    }));
  };

  const updateAboutPage = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      aboutPage: {
        ...current.aboutPage,
        [key]: value,
      },
    }));
  };

  const updateAboutPageSection = (section, key, value) => {
    setDraftConfig((current) => ({
      ...current,
      aboutPage: {
        ...current.aboutPage,
        [section]: {
          ...current.aboutPage?.[section],
          [key]: value,
        },
      },
    }));
  };

  const updateServicesPage = (section, key, value) => {
    setDraftConfig((current) => ({
      ...current,
      servicesPage: {
        ...current.servicesPage,
        [section]: {
          ...current.servicesPage?.[section],
          [key]: value,
        },
      },
    }));
  };

  const updateServicesPageRoot = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      servicesPage: {
        ...current.servicesPage,
        [key]: value,
      },
    }));
  };

  const updatePortfolioPage = (section, key, value) => {
    setDraftConfig((current) => ({
      ...current,
      portfolioPage: {
        ...current.portfolioPage,
        [section]: {
          ...current.portfolioPage?.[section],
          [key]: value,
        },
      },
    }));
  };

  const updateLeadershipPage = (section, key, value) => {
    setDraftConfig((current) => ({
      ...current,
      leadershipPage: {
        ...current.leadershipPage,
        [section]: {
          ...current.leadershipPage?.[section],
          [key]: value,
        },
      },
    }));
  };

  const updateBackgroundPage = (section, key, value) => {
    setDraftConfig((current) => ({
      ...current,
      backgroundPage: {
        ...current.backgroundPage,
        [section]: {
          ...current.backgroundPage?.[section],
          [key]: value,
        },
      },
    }));
  };

  const updateImpactPage = (section, key, value) => {
    setDraftConfig((current) => ({
      ...current,
      impactPage: {
        ...current.impactPage,
        [section]: {
          ...current.impactPage?.[section],
          [key]: value,
        },
      },
    }));
  };

  const updateWhoWeServePage = (section, key, value) => {
    setDraftConfig((current) => ({
      ...current,
      whoWeServePage: {
        ...current.whoWeServePage,
        [section]: {
          ...current.whoWeServePage?.[section],
          [key]: value,
        },
      },
    }));
  };

  const updateApproachPage = (section, key, value) => {
    setDraftConfig((current) => ({
      ...current,
      approachPage: {
        ...current.approachPage,
        [section]: {
          ...current.approachPage?.[section],
          [key]: value,
        },
      },
    }));
  };

  const updateApproachPageRoot = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      approachPage: {
        ...current.approachPage,
        [key]: value,
      },
    }));
  };

  const updateApproachPageStep = (index, key, value) => {
    setDraftConfig((current) => {
      const steps = [...(current.approachPage?.steps ?? [])];
      steps[index] = { ...steps[index], [key]: value };
      return {
        ...current,
        approachPage: {
          ...current.approachPage,
          steps,
        },
      };
    });
  };

  const updateApproachPageDeliverableItem = (index, value) => {
    setDraftConfig((current) => {
      const items = [...(current.approachPage?.deliverables?.items ?? [])];
      items[index] = value;
      return {
        ...current,
        approachPage: {
          ...current.approachPage,
          deliverables: {
            ...current.approachPage?.deliverables,
            items,
          },
        },
      };
    });
  };


  const updateProfileValue = (index, key, value) => {
    setDraftConfig((current) => {
      const values = [...(current.profile?.values ?? [])];
      values[index] = { ...values[index], [key]: value };
      return {
        ...current,
        profile: {
          ...current.profile,
          values,
        },
      };
    });
  };

  const updateValueProposition = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      valueProposition: {
        ...current.valueProposition,
        [key]: value,
      },
    }));
  };

  const updateValuePropositionTier = (index, key, value) => {
    setDraftConfig((current) => {
      const tiers = [...(current.valueProposition?.tiers ?? [])];
      tiers[index] = { ...tiers[index], [key]: value };
      return {
        ...current,
        valueProposition: {
          ...current.valueProposition,
          tiers,
        },
      };
    });
  };

  const updateValuePropositionTierFeature = (tierIndex, featureIndex, value) => {
    setDraftConfig((current) => {
      const tiers = [...(current.valueProposition?.tiers ?? [])];
      const features = [...(tiers[tierIndex]?.features ?? [])];
      features[featureIndex] = value;
      tiers[tierIndex] = { ...tiers[tierIndex], features };
      return {
        ...current,
        valueProposition: {
          ...current.valueProposition,
          tiers,
        },
      };
    });
  };

  const updateVoices = (key, value) => {
    setDraftConfig((current) => ({
      ...current,
      voices: {
        ...current.voices,
        [key]: value,
      },
    }));
  };

  const updateVoiceReview = (index, key, value) => {
    setDraftConfig((current) => {
      const reviews = [...current.voices.reviews];
      reviews[index] = { ...reviews[index], [key]: value };
      return {
        ...current,
        voices: {
          ...current.voices,
          reviews,
        },
      };
    });
  };

  const handleImageUpload = async (event, apply) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await readFileAsDataUrl(file);
      apply(String(dataUrl));
      toast.success("Image updated");
    } catch {
      toast.error("Could not read that image");
    } finally {
      event.target.value = "";
    }
  };

  const requestSave = (saveAction, label) => {
    setPendingSave(() => saveAction);
    setPendingSaveLabel(label);
    setConfirmOpen(true);
  };

  const confirmSave = async () => {
    if (!pendingSave) return;

    const saveAction = pendingSave;
    setConfirmOpen(false);
    setPendingSave(null);
    setPendingSaveLabel("");
    await saveAction();
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto w-full max-w-7xl overflow-x-hidden px-3 pt-2 pb-4 sm:px-6 sm:pt-4 sm:pb-6 lg:px-8 lg:pt-6 lg:pb-8"
    >
      <motion.div variants={itemVariants} className="mb-6 overflow-hidden rounded-[28px] border border-border/80 bg-card/95 p-4 text-card-foreground shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primaryColor">
              OHI Site Manager
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <AnimatedText text="Control the public OHI site from one focused editor" />
            </h1>
            <p className="mt-4 max-w-3xl text__para text-muted-foreground">
              Edit the public site pages and shared sections from one place. Changes save in this browser and show on the public site.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-[0_16px_40px_rgba(15,76,129,0.24)] transition hover:translate-y-[-1px] hover:brightness-110 sm:w-auto"
                onClick={() => setResetConfirmOpen(true)}
              >
                <RotateCcwIcon className="h-4 w-4" />
                Reset defaults
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full px-5 py-3 text-sm font-semibold sm:w-auto">
                <Link to="/dashboard/overview">
                  Back to overview
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full px-5 py-3 text-sm font-semibold sm:w-auto">
                <Link to="#value-proposition">
                  Jump to value proposition
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full px-5 py-3 text-sm font-semibold sm:w-auto">
                <Link to="#footer-settings">
                  Jump to footer settings
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full px-5 py-3 text-sm font-semibold sm:w-auto">
                <Link to="#theme-settings">
                  Jump to theme settings
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full px-5 py-3 text-sm font-semibold sm:w-auto">
                <Link to="#approach-page">
                  Jump to approach page
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full px-5 py-3 text-sm font-semibold sm:w-auto">
                <Link to="#background-page">
                  Jump to background page
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl bg-muted/40 p-4 dark:bg-muted/70">
              <div className="flex items-center gap-2">
                <SparklesIcon className="h-4 w-4 text-[#0f4c81]" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Live preview
                </p>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Changes update immediately in the browser.
              </p>
            </div>
            <div className="rounded-2xl bg-muted/40 p-4 dark:bg-muted/70">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Focus
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Cleaner hierarchy, less repetition, clearer editing flow.
              </p>
            </div>
            <div className="rounded-2xl bg-muted/40 p-4 dark:bg-muted/70">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Scope
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Site pages, shared sections, theme settings, and content blocks.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <SectionCard
        id="what-can-be-edited"
        title="What can be edited now"
        description="The site pages and shared sections currently connected to the admin draftConfig."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            "Home hero copy, CTAs, stats, and images",
            "Home conviction strip, track record stats, and client testimonials",
            "Home closing CTA and \"This is OHI\" video section stats",
            "Home storyteller cards — name, role, and photo",
            "Home news cards — title, date, categories, description",
            "About page copy, image, and overlay card",
            "Why OHI cards, links, and icons",
            "Who We Serve cards and copy",
            "Why Institutions Choose OHI — 4 differentiator cards",
            "Documentary page sections and featured story blocks",
            "Approach page — hero, steps, working style, deliverables",
            "Services page copy, formats, and showcase",
            "Portfolio page highlights and project cards",
            "Leadership page hero, bio, and highlights",
            "Background page hero and CTA fields",
            "Video / reel content and clips",
            "Mission, vision, and values",
            "Selected Voices reviews and quotes",
            "Footer social links",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground"
            >
              {item}
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="space-y-6 min-w-0">
        <SectionCard id="home-hero" title="Hero" description="Edit the homepage hero content. The hero displays a single slide over a video background — only Slide 1 is shown publicly." onSave={() => requestSave(async () => { setConfig((current) => ({ ...current, hero: draftConfig.hero })); toast.success("Hero saved!"); }, "Hero")} saveLabel="Update Hero">
          <div className="grid gap-4 lg:grid-cols-2">
            {(draftConfig.hero.slides ?? []).slice(0, 1).map((slide, index) => (
              <div key={index} className="rounded-2xl border border-border bg-muted/40 p-3 sm:p-4">
                <Field label="Kicker"><TextInput value={slide.kicker} onChange={(e) => updateHeroSlide(index, "kicker", e.target.value)} /></Field>
                <Field label="Title"><TextInput value={slide.title} onChange={(e) => updateHeroSlide(index, "title", e.target.value)} /></Field>
                <Field label="Subtitle"><TextInput value={slide.subtitle} onChange={(e) => updateHeroSlide(index, "subtitle", e.target.value)} /></Field>
                <Field label="Description"><TextArea rows={4} value={slide.description} onChange={(e) => updateHeroSlide(index, "description", e.target.value)} /></Field>
              </div>
            ))}
            <div className="rounded-2xl border border-border bg-muted/40 p-3 sm:p-4">
              <Field label="Background video URL" hint="Paste a direct MP4 URL (e.g. from Cloudinary). Leave blank to use the default OHI-video.mp4.">
                <TextInput
                  value={draftConfig.hero.videoUrl ?? ""}
                  placeholder="https://res.cloudinary.com/your-cloud/video/upload/..."
                  onChange={(e) => updateHero("videoUrl", e.target.value)}
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard id="home-conviction-strip" title="Conviction strip" description="Edit the bold statement banner shown right below the hero." onSave={() => requestSave(async () => { setConfig((current) => ({ ...current, homePage: draftConfig.homePage })); toast.success("Conviction strip saved!"); }, "Conviction strip")} saveLabel="Update Section">
          <div className="space-y-4">
            <Field label="Statement"><TextArea rows={3} value={draftConfig.homePage?.convictionStrip?.text || ""} onChange={(e) => updateHomePage("convictionStrip", "text", e.target.value)} /></Field>
          </div>
        </SectionCard>

        <SectionCard id="home-about" title="Olympian House International" description="Edit the homepage introduction block." onSave={() => requestSave(async () => { setConfig((current) => ({ ...current, homePage: draftConfig.homePage })); toast.success("About section saved!"); }, "Olympian House International")} saveLabel="Update Section">
          <div className="space-y-4">
            <Field label="Title"><TextInput value={draftConfig.homePage?.about?.title || ""} onChange={(e) => updateHomePage("about", "title", e.target.value)} /></Field>
            <Field label="Description"><TextArea rows={4} value={draftConfig.homePage?.about?.description || ""} onChange={(e) => updateHomePage("about", "description", e.target.value)} /></Field>
            <Field label="Founder quote"><TextArea rows={3} value={draftConfig.homePage?.about?.founderQuote || ""} onChange={(e) => updateHomePage("about", "founderQuote", e.target.value)} /></Field>
            <Field label="Founder byline"><TextInput value={draftConfig.homePage?.about?.founderByline || ""} onChange={(e) => updateHomePage("about", "founderByline", e.target.value)} /></Field>
            <Field label="Button label"><TextInput value={draftConfig.homePage?.about?.ctaLabel || ""} onChange={(e) => updateHomePage("about", "ctaLabel", e.target.value)} /></Field>
            <Field label="Button link"><TextInput value={draftConfig.homePage?.about?.ctaHref || ""} onChange={(e) => updateHomePage("about", "ctaHref", e.target.value)} /></Field>
            <ImageField
              label="Section image"
              value={draftConfig.homePage?.about?.image || ""}
              onChange={(e) =>
                handleImageUpload(e, (value) => updateHomePage("about", "image", value))
              }
            />
          </div>
        </SectionCard>

        <SectionCard id="home-difference" title="The OHI difference" description="Edit the homepage difference block." onSave={() => requestSave(async () => { setConfig((current) => ({ ...current, homePage: draftConfig.homePage })); toast.success("Difference section saved!"); }, "The OHI difference")} saveLabel="Update Section">
          <div className="space-y-4">
            <Field label="Title"><TextInput value={draftConfig.homePage?.difference?.title || ""} onChange={(e) => updateHomePage("difference", "title", e.target.value)} /></Field>
            <Field label="Description"><TextInput value={draftConfig.homePage?.difference?.description || ""} onChange={(e) => updateHomePage("difference", "description", e.target.value)} /></Field>
            <ImageField label="Section image" value={draftConfig.homePage?.difference?.image || ""} onChange={(e) => handleImageUpload(e, (value) => updateHomePage("difference", "image", value))} />
            <div className="grid gap-4 lg:grid-cols-2">
              {(draftConfig.homePage?.difference?.cards || []).map((card, index) => (
                <div key={index} className="rounded-2xl border border-border bg-muted/40 p-4">
                  <Field label={`Card ${index + 1} title`}><TextInput value={card.title || ""} onChange={(e) => updateHomePageArrayItem("difference", "cards", index, "title", e.target.value)} /></Field>
                  <Field label={`Card ${index + 1} description`}><TextArea rows={4} value={card.description || ""} onChange={(e) => updateHomePageArrayItem("difference", "cards", index, "description", e.target.value)} /></Field>
                  <ImageField label={`Card ${index + 1} image`} value={card.image || ""} onChange={(e) => handleImageUpload(e, (value) => updateHomePageArrayItem("difference", "cards", index, "image", value))} />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard id="home-track-record" title="Track record" description="Edit the proof/stats block and trusted-by line." onSave={() => requestSave(async () => { setConfig((current) => ({ ...current, homePage: draftConfig.homePage })); toast.success("Track record saved!"); }, "Track record")} saveLabel="Update Section">
          <div className="space-y-4">
            <Field label="Eyebrow"><TextInput value={draftConfig.homePage?.trackRecord?.eyebrow || ""} onChange={(e) => updateHomePage("trackRecord", "eyebrow", e.target.value)} /></Field>
            <Field label="Title"><TextInput value={draftConfig.homePage?.trackRecord?.title || ""} onChange={(e) => updateHomePage("trackRecord", "title", e.target.value)} /></Field>
            <div className="grid gap-4 lg:grid-cols-2">
              {(draftConfig.homePage?.trackRecord?.stats || []).map((stat, index) => (
                <div key={index} className="rounded-2xl border border-border bg-muted/40 p-4">
                  <Field label={`Stat ${index + 1} value`}><TextInput value={stat.value || ""} onChange={(e) => updateHomePageArrayItem("trackRecord", "stats", index, "value", e.target.value)} /></Field>
                  <Field label={`Stat ${index + 1} label`}><TextInput value={stat.label || ""} onChange={(e) => updateHomePageArrayItem("trackRecord", "stats", index, "label", e.target.value)} /></Field>
                </div>
              ))}
            </div>
            <Field label="Trusted-by line"><TextArea rows={3} value={draftConfig.homePage?.trackRecord?.trustedByText || ""} onChange={(e) => updateHomePage("trackRecord", "trustedByText", e.target.value)} /></Field>
          </div>
        </SectionCard>

        <SectionCard id="home-testimonials" title="Client Voices" description="Edit the partner testimonial cards." onSave={() => requestSave(async () => { setConfig((current) => ({ ...current, homePage: draftConfig.homePage })); toast.success("Client Voices saved!"); }, "Client Voices")} saveLabel="Update Section">
          <div className="space-y-4">
            <Field label="Eyebrow"><TextInput value={draftConfig.homePage?.testimonials?.eyebrow || ""} onChange={(e) => updateHomePage("testimonials", "eyebrow", e.target.value)} /></Field>
            <Field label="Title"><TextInput value={draftConfig.homePage?.testimonials?.title || ""} onChange={(e) => updateHomePage("testimonials", "title", e.target.value)} /></Field>
            <div className="grid gap-4 lg:grid-cols-3">
              {(draftConfig.homePage?.testimonials?.items || []).map((item, index) => (
                <div key={index} className="space-y-3 rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Testimonial {index + 1}</p>
                  <Field label="Quote"><TextArea rows={4} value={item.quote || ""} onChange={(e) => updateHomePageArrayItem("testimonials", "items", index, "quote", e.target.value)} /></Field>
                  <Field label="Name"><TextInput value={item.name || ""} onChange={(e) => updateHomePageArrayItem("testimonials", "items", index, "name", e.target.value)} /></Field>
                  <Field label="Organisation"><TextInput value={item.org || ""} onChange={(e) => updateHomePageArrayItem("testimonials", "items", index, "org", e.target.value)} /></Field>
                  <ImageField label="Photo" value={item.image || ""} onChange={(e) => handleImageUpload(e, (value) => updateHomePageArrayItem("testimonials", "items", index, "image", value))} />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard id="home-leadership" title="Leadership and storytellers" description="Edit the leadership feature block." onSave={() => requestSave(async () => { setConfig((current) => ({ ...current, homePage: draftConfig.homePage })); toast.success("Leadership section saved!"); }, "Leadership and storytellers")} saveLabel="Update Section">
          <div className="space-y-4">
            <Field label="Eyebrow"><TextInput value={draftConfig.homePage?.leadership?.eyebrow || ""} onChange={(e) => updateHomePage("leadership", "eyebrow", e.target.value)} /></Field>
            <Field label="Title"><TextInput value={draftConfig.homePage?.leadership?.title || ""} onChange={(e) => updateHomePage("leadership", "title", e.target.value)} /></Field>
            <Field label="Description"><TextArea rows={4} value={draftConfig.homePage?.leadership?.description || ""} onChange={(e) => updateHomePage("leadership", "description", e.target.value)} /></Field>
            <Field label="Button label"><TextInput value={draftConfig.homePage?.leadership?.ctaLabel || ""} onChange={(e) => updateHomePage("leadership", "ctaLabel", e.target.value)} /></Field>
            <Field label="Button link"><TextInput value={draftConfig.homePage?.leadership?.ctaHref || ""} onChange={(e) => updateHomePage("leadership", "ctaHref", e.target.value)} /></Field>
            <ImageField
              label="Section image"
              value={draftConfig.homePage?.leadership?.image || ""}
              onChange={(e) =>
                handleImageUpload(e, (value) => updateHomePage("leadership", "image", value))
              }
            />
          </div>
        </SectionCard>

        <SectionCard id="home-programmes" title="Featured Programmes" description="Edit the featured programme cards." onSave={() => requestSave(async () => { setConfig((current) => ({ ...current, homePage: draftConfig.homePage })); toast.success("Programmes saved!"); }, "Featured Programmes")} saveLabel="Update Section">
          <div className="space-y-4">
            <Field label="Title"><TextInput value={draftConfig.homePage?.programmes?.title || ""} onChange={(e) => updateHomePage("programmes", "title", e.target.value)} /></Field>
            {(draftConfig.homePage?.programmes?.items || []).map((item, index) => (
              <div key={index} className="rounded-2xl border border-border bg-muted/40 p-4">
                <Field label={`Programme ${index + 1} title`}><TextInput value={item.title || ""} onChange={(e) => updateHomePageArrayItem("programmes", "items", index, "title", e.target.value)} /></Field>
                <Field label={`Programme ${index + 1} description`}><TextArea rows={4} value={item.description || ""} onChange={(e) => updateHomePageArrayItem("programmes", "items", index, "description", e.target.value)} /></Field>
                <ImageField
                  label={`Programme ${index + 1} image`}
                  value={item.image || ""}
                  onChange={(e) =>
                    handleImageUpload(e, (value) =>
                      updateHomePageArrayItem("programmes", "items", index, "image", value)
                    )
                  }
                />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="home-storytellers" title="OHI Storytellers" description="Edit the public storyteller block text." onSave={() => requestSave(async () => { setConfig((current) => ({ ...current, homePage: draftConfig.homePage })); toast.success("Storytellers saved!"); }, "OHI Storytellers")} saveLabel="Update Section">
          <div className="space-y-4">
            <Field label="Title"><TextInput value={draftConfig.homePage?.storytellers?.title || ""} onChange={(e) => updateHomePage("storytellers", "title", e.target.value)} /></Field>
            <Field label="Description"><TextArea rows={4} value={draftConfig.homePage?.storytellers?.description || ""} onChange={(e) => updateHomePage("storytellers", "description", e.target.value)} /></Field>
            <Field label="Button label"><TextInput value={draftConfig.homePage?.storytellers?.ctaLabel || ""} onChange={(e) => updateHomePage("storytellers", "ctaLabel", e.target.value)} /></Field>
            <Field label="Button link"><TextInput value={draftConfig.homePage?.storytellers?.ctaHref || ""} onChange={(e) => updateHomePage("storytellers", "ctaHref", e.target.value)} /></Field>
            <ImageField
              label="Section image"
              value={draftConfig.homePage?.storytellers?.image || ""}
              onChange={(e) =>
                handleImageUpload(e, (value) => updateHomePage("storytellers", "image", value))
              }
            />
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">Storyteller cards</p>
              <div className="grid gap-4 lg:grid-cols-2">
                {(draftConfig.homePage?.storytellers?.items || []).map((item, index) => (
                  <div key={index} className="space-y-3 rounded-2xl border border-border bg-muted/40 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Storyteller {index + 1}</p>
                    <Field label="Colored header">
                      <TextInput
                        value={item.header ?? item.name ?? ""}
                        onChange={(e) => updateHomePageArrayItem("storytellers", "items", index, "header", e.target.value)}
                      />
                    </Field>
                    <Field label="Content">
                      <TextArea
                        rows={4}
                        value={item.content ?? item.role ?? ""}
                        onChange={(e) => updateHomePageArrayItem("storytellers", "items", index, "content", e.target.value)}
                      />
                    </Field>
                    <ImageField label="Photo" value={item.image || ""} onChange={(e) => handleImageUpload(e, (value) => updateHomePageArrayItem("storytellers", "items", index, "image", value))} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>


        <SectionCard id="home-supporters" title="OurPartners / Supporters" description="Edit the support strip on the homepage." onSave={() => requestSave(async () => { setConfig((current) => ({ ...current, homePage: draftConfig.homePage })); toast.success("Supporters saved!"); }, "OurPartners / Supporters")} saveLabel="Update Section">
          <div className="space-y-4">
            <Field label="Title"><TextInput value={draftConfig.homePage?.supporters?.title || ""} onChange={(e) => updateHomePage("supporters", "title", e.target.value)} /></Field>
            <Field label="Description"><TextArea rows={4} value={draftConfig.homePage?.supporters?.description || ""} onChange={(e) => updateHomePage("supporters", "description", e.target.value)} /></Field>
            <Field label="Button label"><TextInput value={draftConfig.homePage?.supporters?.ctaLabel || ""} onChange={(e) => updateHomePage("supporters", "ctaLabel", e.target.value)} /></Field>
            <Field label="Button link"><TextInput value={draftConfig.homePage?.supporters?.ctaHref || ""} onChange={(e) => updateHomePage("supporters", "ctaHref", e.target.value)} /></Field>

            <div className="space-y-4 rounded-2xl border border-border/70 bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">Logo groups</p>
                <Button type="button" variant="outline" className="rounded-xl" onClick={addSupportersCategory}>
                  Add group
                </Button>
              </div>

              <div className="space-y-4">
                {(draftConfig.homePage?.supporters?.categories || landingPageDefaults.homePage.supporters.categories).map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-3 rounded-2xl border border-border bg-background/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <Field label={`Group ${categoryIndex + 1} title`} className="flex-1">
                        <TextInput
                          value={category.title || ""}
                          onChange={(e) => updateSupportersCategory(categoryIndex, "title", e.target.value)}
                        />
                      </Field>
                      <Button type="button" variant="outline" className="rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => removeSupportersCategory(categoryIndex)}>
                        Delete group
                      </Button>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-foreground">Partner names</p>
                      <Button type="button" variant="outline" className="rounded-xl" onClick={() => addSupportersLogo(categoryIndex)}>
                        Add partner
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {(category.items || []).map((item, logoIndex) => (
                        <div key={`${categoryIndex}-${logoIndex}`} className="flex items-start gap-3">
                          <Field className="flex-1" label={`Partner ${logoIndex + 1}`}>
                            <TextInput
                              value={item.name || ""}
                              onChange={(e) => updateSupportersLogo(categoryIndex, logoIndex, e.target.value)}
                            />
                          </Field>
                          <Button type="button" variant="outline" className="mt-7 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => removeSupportersLogo(categoryIndex, logoIndex)}>
                            Delete
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard id="home-final-cta" title="Closing call-to-action" description="Edit the 'Let's tell the story' banner near the bottom of the homepage." onSave={() => requestSave(async () => { setConfig((current) => ({ ...current, homePage: draftConfig.homePage })); toast.success("Closing CTA saved!"); }, "Closing call-to-action")} saveLabel="Update Section">
          <div className="space-y-4">
            <Field label="Title"><TextInput value={draftConfig.homePage?.finalCta?.title || ""} onChange={(e) => updateHomePage("finalCta", "title", e.target.value)} /></Field>
            <Field label="Description"><TextArea rows={3} value={draftConfig.homePage?.finalCta?.description || ""} onChange={(e) => updateHomePage("finalCta", "description", e.target.value)} /></Field>
            <Field label="Button label"><TextInput value={draftConfig.homePage?.finalCta?.ctaLabel || ""} onChange={(e) => updateHomePage("finalCta", "ctaLabel", e.target.value)} /></Field>
            <Field label="Button link"><TextInput value={draftConfig.homePage?.finalCta?.ctaHref || ""} onChange={(e) => updateHomePage("finalCta", "ctaHref", e.target.value)} /></Field>
          </div>
        </SectionCard>

        <SectionCard id="home-video-section" title="This is OHI" description="Edit the video preview block and its stats strip near the end of the homepage." onSave={() => requestSave(async () => { setConfig((current) => ({ ...current, homePage: draftConfig.homePage })); toast.success("This is OHI section saved!"); }, "This is OHI")} saveLabel="Update Section">
          <div className="space-y-4">
            <Field label="Title"><TextInput value={draftConfig.homePage?.videoSection?.title || ""} onChange={(e) => updateHomePage("videoSection", "title", e.target.value)} /></Field>
            <Field label="Description"><TextArea rows={3} value={draftConfig.homePage?.videoSection?.description || ""} onChange={(e) => updateHomePage("videoSection", "description", e.target.value)} /></Field>
            <div className="grid gap-4 lg:grid-cols-2">
              {(draftConfig.homePage?.videoSection?.stats || []).map((stat, index) => (
                <div key={index} className="rounded-2xl border border-border bg-muted/40 p-4">
                  <Field label={`Stat ${index + 1} value`}><TextInput value={stat.value || ""} onChange={(e) => updateHomePageArrayItem("videoSection", "stats", index, "value", e.target.value)} /></Field>
                  <Field label={`Stat ${index + 1} label`}><TextInput value={stat.label || ""} onChange={(e) => updateHomePageArrayItem("videoSection", "stats", index, "label", e.target.value)} /></Field>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="hero-content"
          title="Home Hero"
          description="Edit the hero copy and content. The public hero shows Slide 1 only over a video background — there is no rotation."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, hero: draftConfig.hero }));
            toast.success("Home hero saved!");
            addNotification("Home hero content has been updated.", "success", "Home Hero Saved");
          }, "Home Hero")}
          saveLabel="Update Home Hero"
        >
          <div className="grid gap-4 xl:grid-cols-2">
            {(draftConfig.hero.slides ?? []).slice(0, 1).map((slide, index) => (
              <div key={index} className="rounded-2xl border border-border bg-muted/40 p-4">
                <div className="grid gap-4">
                  <Field label="Kicker">
                    <TextInput
                      value={slide.kicker}
                      onChange={(e) => updateHeroSlide(index, "kicker", e.target.value)}
                    />
                  </Field>
                  <Field label="Title">
                    <TextInput
                      value={slide.title}
                      onChange={(e) => updateHeroSlide(index, "title", e.target.value)}
                    />
                  </Field>
                  <Field label="Subtitle">
                    <TextInput
                      value={slide.subtitle}
                      onChange={(e) => updateHeroSlide(index, "subtitle", e.target.value)}
                    />
                  </Field>
                  <Field label="Description">
                    <TextArea
                      rows={4}
                      value={slide.description}
                      onChange={(e) => updateHeroSlide(index, "description", e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-border bg-muted/40 p-4 xl:col-span-2">
              <Field label="Background video URL" hint="Paste a direct MP4 URL (e.g. from Cloudinary). Leave blank to use the default OHI-video.mp4.">
                <TextInput
                  value={draftConfig.hero.videoUrl ?? ""}
                  placeholder="https://res.cloudinary.com/your-cloud/video/upload/..."
                  onChange={(e) => updateHero("videoUrl", e.target.value)}
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="about-page"
          title="About Page"
          description="Edit the public About page content."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, aboutPage: draftConfig.aboutPage }));
            toast.success("About page saved!");
            addNotification("About page content has been updated.", "success", "About Page Saved");
          }, "About Page")}
          saveLabel="Update About Page"
        >
          <div className="space-y-8">
            <div className="grid gap-4 xl:grid-cols-2">
              <Field label="Hero title">
                <TextInput
                  value={draftConfig.aboutPage?.hero?.title || ""}
                  onChange={(e) => updateAboutPageSection("hero", "title", e.target.value)}
                />
              </Field>
              <Field label="Hero description">
                <TextArea
                  rows={4}
                  value={draftConfig.aboutPage?.hero?.description || ""}
                  onChange={(e) => updateAboutPageSection("hero", "description", e.target.value)}
                />
              </Field>
              <Field label="Hero eyebrow">
                <TextInput
                  value={draftConfig.aboutPage?.hero?.badgeEyebrow || ""}
                  onChange={(e) => updateAboutPageSection("hero", "badgeEyebrow", e.target.value)}
                />
              </Field>
              <Field label="Hero badge description">
                <TextArea
                  rows={3}
                  value={draftConfig.aboutPage?.hero?.badgeDescription || ""}
                  onChange={(e) => updateAboutPageSection("hero", "badgeDescription", e.target.value)}
                />
              </Field>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Intro block</h3>
                <Field label="Section title">
                  <TextInput value={draftConfig.aboutPage?.intro?.title || ""} onChange={(e) => updateAboutPageSection("intro", "title", e.target.value)} />
                </Field>
                <Field label="Section description">
                  <TextArea rows={4} value={draftConfig.aboutPage?.intro?.description || ""} onChange={(e) => updateAboutPageSection("intro", "description", e.target.value)} />
                </Field>
                <Field label="About label">
                  <TextInput value={draftConfig.aboutPage?.intro?.aboutLabel || ""} onChange={(e) => updateAboutPageSection("intro", "aboutLabel", e.target.value)} />
                </Field>
                <Field label="About text">
                  <TextArea rows={4} value={draftConfig.aboutPage?.intro?.aboutText || ""} onChange={(e) => updateAboutPageSection("intro", "aboutText", e.target.value)} />
                </Field>
                <Field label="Editorial label">
                  <TextInput value={draftConfig.aboutPage?.intro?.editorialLabel || ""} onChange={(e) => updateAboutPageSection("intro", "editorialLabel", e.target.value)} />
                </Field>
                <Field label="Editorial text">
                  <TextArea rows={3} value={draftConfig.aboutPage?.intro?.editorialText || ""} onChange={(e) => updateAboutPageSection("intro", "editorialText", e.target.value)} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Primary CTA label">
                    <TextInput value={draftConfig.aboutPage?.intro?.ctaLabel || ""} onChange={(e) => updateAboutPageSection("intro", "ctaLabel", e.target.value)} />
                  </Field>
                  <Field label="Primary CTA link">
                    <TextInput value={draftConfig.aboutPage?.intro?.ctaHref || ""} onChange={(e) => updateAboutPageSection("intro", "ctaHref", e.target.value)} />
                  </Field>
                  <Field label="Secondary CTA label">
                    <TextInput value={draftConfig.aboutPage?.intro?.ctaSecondaryLabel || ""} onChange={(e) => updateAboutPageSection("intro", "ctaSecondaryLabel", e.target.value)} />
                  </Field>
                  <Field label="Secondary CTA link">
                    <TextInput value={draftConfig.aboutPage?.intro?.ctaSecondaryHref || ""} onChange={(e) => updateAboutPageSection("intro", "ctaSecondaryHref", e.target.value)} />
                  </Field>
                </div>
                <ImageField
                  label="Intro image"
                  value={draftConfig.aboutPage?.intro?.image || ""}
                  onChange={(e) =>
                    handleImageUpload(e, (value) => updateAboutPageSection("intro", "image", value))
                  }
                />
                <ImageField
                  label="Intro detail image"
                  value={draftConfig.aboutPage?.intro?.detailImage || ""}
                  onChange={(e) =>
                    handleImageUpload(e, (value) => updateAboutPageSection("intro", "detailImage", value))
                  }
                />
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Difference block</h3>
                <Field label="Difference title">
                  <TextInput value={draftConfig.aboutPage?.difference?.title || ""} onChange={(e) => updateAboutPageSection("difference", "title", e.target.value)} />
                </Field>
                <Field label="Difference description">
                  <TextArea rows={4} value={draftConfig.aboutPage?.difference?.description || ""} onChange={(e) => updateAboutPageSection("difference", "description", e.target.value)} />
                </Field>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">Principles</p>
                  {(draftConfig.aboutPage?.difference?.principles ?? []).map((principle, index) => (
                    <div key={index} className="space-y-2 rounded-2xl border border-border bg-background p-3">
                      <Field label={`Principle ${index + 1} title`}>
                        <TextInput
                          value={principle.title || ""}
                          onChange={(e) => {
                            const next = [...(draftConfig.aboutPage?.difference?.principles ?? [])];
                            next[index] = { ...next[index], title: e.target.value };
                            updateAboutPageSection("difference", "principles", next);
                          }}
                        />
                      </Field>
                      <Field label={`Principle ${index + 1} description`}>
                        <TextArea
                          rows={3}
                          value={principle.description || ""}
                          onChange={(e) => {
                            const next = [...(draftConfig.aboutPage?.difference?.principles ?? [])];
                            next[index] = { ...next[index], description: e.target.value };
                            updateAboutPageSection("difference", "principles", next);
                          }}
                        />
                      </Field>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Snapshot / stats block</h3>
                <Field label="Label">
                  <TextInput value={draftConfig.aboutPage?.snapshot?.label || ""} onChange={(e) => updateAboutPageSection("snapshot", "label", e.target.value)} />
                </Field>
                <Field label="Title">
                  <TextInput value={draftConfig.aboutPage?.snapshot?.title || ""} onChange={(e) => updateAboutPageSection("snapshot", "title", e.target.value)} />
                </Field>
                <Field label="Description">
                  <TextArea rows={3} value={draftConfig.aboutPage?.snapshot?.description || ""} onChange={(e) => updateAboutPageSection("snapshot", "description", e.target.value)} />
                </Field>
                <Field label="Mission title">
                  <TextInput value={draftConfig.aboutPage?.snapshot?.missionTitle || ""} onChange={(e) => updateAboutPageSection("snapshot", "missionTitle", e.target.value)} />
                </Field>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">Stats</p>
                  {(draftConfig.aboutPage?.snapshot?.stats ?? []).map((stat, index) => (
                    <div key={index} className="grid gap-3 sm:grid-cols-2 rounded-2xl border border-border bg-background p-3">
                      <Field label={`Stat ${index + 1} value`}>
                        <TextInput
                          value={stat.value || ""}
                          onChange={(e) => {
                            const next = [...(draftConfig.aboutPage?.snapshot?.stats ?? [])];
                            next[index] = { ...next[index], value: e.target.value };
                            updateAboutPageSection("snapshot", "stats", next);
                          }}
                        />
                      </Field>
                      <Field label={`Stat ${index + 1} label`}>
                        <TextInput
                          value={stat.label || ""}
                          onChange={(e) => {
                            const next = [...(draftConfig.aboutPage?.snapshot?.stats ?? [])];
                            next[index] = { ...next[index], label: e.target.value };
                            updateAboutPageSection("snapshot", "stats", next);
                          }}
                        />
                      </Field>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Close / CTA block</h3>
                <Field label="Title">
                  <TextInput value={draftConfig.aboutPage?.close?.title || ""} onChange={(e) => updateAboutPageSection("close", "title", e.target.value)} />
                </Field>
                <Field label="Description">
                  <TextArea rows={3} value={draftConfig.aboutPage?.close?.description || ""} onChange={(e) => updateAboutPageSection("close", "description", e.target.value)} />
                </Field>
                <Field label="Body">
                  <TextArea rows={4} value={draftConfig.aboutPage?.close?.body || ""} onChange={(e) => updateAboutPageSection("close", "body", e.target.value)} />
                </Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="CTA label">
                    <TextInput value={draftConfig.aboutPage?.close?.ctaLabel || ""} onChange={(e) => updateAboutPageSection("close", "ctaLabel", e.target.value)} />
                  </Field>
                  <Field label="CTA link">
                    <TextInput value={draftConfig.aboutPage?.close?.ctaHref || ""} onChange={(e) => updateAboutPageSection("close", "ctaHref", e.target.value)} />
                  </Field>
                </div>
                <ImageField
                  label="Close image"
                  value={draftConfig.aboutPage?.close?.image || ""}
                  onChange={(e) =>
                    handleImageUpload(e, (value) => updateAboutPageSection("close", "image", value))
                  }
                />
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="why-ohi"
          title="Why OHI Section"
          description="Adjust the feature cards below About."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, whyChoose: draftConfig.whyChoose }));
            toast.success("Why OHI Section saved!");
            addNotification("Why OHI feature cards have been updated.", "success", "Why OHI Section Saved");
          }, "Why OHI Section")}
          saveLabel="Update Why OHI Section"
        >
          <div className="space-y-5">
            <Field label="Section title">
              <TextInput
                value={draftConfig.whyChoose.title}
                onChange={(e) => updateWhyChoose("title", e.target.value)}
              />
            </Field>
            <Field label="Section description">
              <TextArea
                rows={4}
                value={draftConfig.whyChoose.description}
                onChange={(e) => updateWhyChoose("description", e.target.value)}
              />
            </Field>
            <div className="grid gap-4 lg:grid-cols-3">
              {draftConfig.whyChoose.cards.map((card, index) => (
                <div key={card.title} className="rounded-2xl border border-border bg-muted/40 p-4">
                  <Field label={`Card ${index + 1} title`}>
                    <TextInput
                      value={card.title}
                      onChange={(e) =>
                        updateWhyChooseCard(index, "title", e.target.value)
                      }
                    />
                  </Field>
                  <Field label={`Card ${index + 1} description`}>
                    <TextArea
                      rows={5}
                      value={card.description}
                      onChange={(e) =>
                        updateWhyChooseCard(index, "description", e.target.value)
                      }
                    />
                  </Field>
                  <Field label={`Card ${index + 1} link`}>
                    <TextInput
                      value={card.href}
                      onChange={(e) =>
                        updateWhyChooseCard(index, "href", e.target.value)
                      }
                    />
                  </Field>
                  <div className="rounded-2xl border border-dashed border-border bg-background p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Card {index + 1} media icon
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primaryColor/10 text-primaryColor">
                        {card.icon ? (
                          <card.icon className="h-6 w-6" aria-hidden="true" />
                        ) : null}
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">
                        This icon is permanent and follows the code defaults.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="who-we-serve"
          title="Who We Serve"
          description="Edit the audience and services block shown on the public Who We Serve page."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, services: draftConfig.services }));
            toast.success("Who We Serve saved!");
          }, "Who We Serve")}
          saveLabel="Update Who We Serve"
        >
          <div className="space-y-5">
            <Field label="Section title">
              <TextInput
                value={draftConfig.services.title}
                onChange={(e) => updateServices("title", e.target.value)}
              />
            </Field>
            <Field label="Section description">
              <TextArea
                rows={4}
                value={draftConfig.services.description}
                onChange={(e) => updateServices("description", e.target.value)}
              />
            </Field>
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {draftConfig.services.cards.map((card, index) => (
                <div
                  key={card.name}
                  className="rounded-2xl border border-border bg-muted/40 p-4"
                >
                  <Field label={`Card ${index + 1} title`}>
                    <TextInput
                      value={card.name}
                      onChange={(e) =>
                        updateServiceCard(index, "name", e.target.value)
                      }
                    />
                  </Field>
                  <Field label={`Card ${index + 1} description`}>
                    <TextArea
                      rows={4}
                      value={card.desc}
                      onChange={(e) =>
                        updateServiceCard(index, "desc", e.target.value)
                      }
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Bg color">
                      <Input
                        type="text"
                        value={card.bgColor}
                        onChange={(e) =>
                          updateServiceCard(index, "bgColor", e.target.value)
                        }
                        className="h-12 w-full rounded-xl bg-background px-4"
                      />
                    </Field>
                    <Field label="Text color">
                      <Input
                        type="text"
                        value={card.textColor}
                        onChange={(e) =>
                          updateServiceCard(index, "textColor", e.target.value)
                        }
                        className="h-12 w-full rounded-xl bg-background px-4"
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="value-proposition"
          title="Why Institutions Choose OHI"
          description="Edit the four differentiator cards shown in the Value Proposition section."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, valueProposition: draftConfig.valueProposition }));
            toast.success("Value Proposition saved!");
            addNotification("Why institutions choose OHI section has been updated.", "success", "Value Proposition Saved");
          }, "Why Institutions Choose OHI")}
          saveLabel="Update Value Proposition"
        >
          <div className="space-y-5">
            <Field label="Section title">
              <TextInput
                value={draftConfig.valueProposition?.title || ""}
                onChange={(e) => updateValueProposition("title", e.target.value)}
              />
            </Field>
            <Field label="Section description">
              <TextArea
                rows={3}
                value={draftConfig.valueProposition?.description || ""}
                onChange={(e) => updateValueProposition("description", e.target.value)}
              />
            </Field>
            <div className="grid gap-4 lg:grid-cols-2">
              {(draftConfig.valueProposition?.tiers ?? []).map((tier, index) => (
                <div key={tier.id || index} className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-muted-foreground">{tier.number}</span>
                    <h3 className="text-base font-bold text-foreground">{tier.name}</h3>
                    {tier.featured && (
                      <span className="ml-auto rounded-full bg-black px-2 py-0.5 text-[10px] font-semibold text-white">Featured</span>
                    )}
                  </div>
                  <Field label="Card title">
                    <TextInput
                      value={tier.name || ""}
                      onChange={(e) => updateValuePropositionTier(index, "name", e.target.value)}
                    />
                  </Field>
                  <Field label="Card description">
                    <TextArea
                      rows={4}
                      value={tier.description || ""}
                      onChange={(e) => updateValuePropositionTier(index, "description", e.target.value)}
                    />
                  </Field>
                  <Field label="Link href">
                    <TextInput
                      value={tier.href || ""}
                      onChange={(e) => updateValuePropositionTier(index, "href", e.target.value)}
                    />
                  </Field>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Bullet points</p>
                    {(tier.features ?? []).map((feature, fi) => (
                      <TextInput
                        key={fi}
                        value={feature}
                        onChange={(e) => updateValuePropositionTierFeature(index, fi, e.target.value)}
                        placeholder={`Bullet ${fi + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="gallery"
          title="Documentaries / Portfolio"
          description="Control the main visual grid for the documentaries and portfolio-style sections."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, gallery: draftConfig.gallery }));
            toast.success("Gallery saved!");
            addNotification("Gallery grid and items have been updated.", "success", "Gallery Saved");
          }, "Documentaries / Portfolio")}
          saveLabel="Update Gallery"
        >
          <div className="space-y-5">
            <Field label="Gallery title">
              <TextInput
                value={draftConfig.gallery.title}
                onChange={(e) => updateGallery("title", e.target.value)}
              />
            </Field>
            <Field label="Gallery description">
              <TextArea
                rows={4}
                value={draftConfig.gallery.description}
                onChange={(e) => updateGallery("description", e.target.value)}
              />
            </Field>
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
              {draftConfig.gallery.items.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-muted/40 p-4"
                >
                  <Field label={`Item ${index + 1} title`}>
                    <TextInput
                      value={item.title}
                      onChange={(e) =>
                        updateGalleryItem(index, "title", e.target.value)
                      }
                    />
                  </Field>
                  <Field label={`Item ${index + 1} category`}>
                    <TextInput
                      value={item.category}
                      onChange={(e) =>
                        updateGalleryItem(index, "category", e.target.value)
                      }
                    />
                  </Field>
                  <Field label="Span">
                    <TextInput
                      value={item.span || ""}
                      onChange={(e) =>
                        updateGalleryItem(index, "span", e.target.value)
                      }
                    />
                  </Field>
                  <ImageField
                    label={`Item ${index + 1} image`}
                    value={item.image}
                    onChange={(e) =>
                      handleImageUpload(e, (value) =>
                        updateGalleryItem(index, "image", value)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="gallery-stories"
          title="Documentaries Story Strip"
          description="Edit the story-led documentary strip and feature cards."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, galleryStories: draftConfig.galleryStories }));
            toast.success("Gallery Stories saved!");
          }, "Documentaries Story Strip")}
          saveLabel="Update Gallery Stories"
        >
          <div className="space-y-5">
            <Field label="Section title">
              <TextInput
                value={draftConfig.galleryStories.title}
                onChange={(e) => updateGalleryStories("title", e.target.value)}
              />
            </Field>
            <Field label="Section description">
              <TextArea
                rows={4}
                value={draftConfig.galleryStories.description}
                onChange={(e) =>
                  updateGalleryStories("description", e.target.value)
                }
              />
            </Field>
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Lead story</h3>
                <Field label="Lead title">
                  <TextInput
                    value={draftConfig.galleryStories.lead.title}
                    onChange={(e) => updateGalleryLead("title", e.target.value)}
                  />
                </Field>
                <Field label="Lead category">
                  <TextInput
                    value={draftConfig.galleryStories.lead.category}
                    onChange={(e) =>
                      updateGalleryLead("category", e.target.value)
                    }
                  />
                </Field>
                <Field label="Lead description">
                  <TextArea
                    rows={4}
                    value={draftConfig.galleryStories.lead.description}
                    onChange={(e) =>
                      updateGalleryLead("description", e.target.value)
                    }
                  />
                </Field>
                <ImageField
                  label="Lead image"
                  value={draftConfig.galleryStories.lead.image}
                  onChange={(e) =>
                    handleImageUpload(e, (value) =>
                      updateGalleryLead("image", value)
                    )
                  }
                />
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">
                  Support intro
                </h3>
                <Field label="Eyebrow">
                  <TextInput
                    value={draftConfig.galleryStories.supportIntro.eyebrow}
                    onChange={(e) =>
                      updateGallerySupportIntro("eyebrow", e.target.value)
                    }
                  />
                </Field>
                <Field label="Title">
                  <TextInput
                    value={draftConfig.galleryStories.supportIntro.title}
                    onChange={(e) =>
                      updateGallerySupportIntro("title", e.target.value)
                    }
                  />
                </Field>
                <Field label="Description">
                  <TextArea
                    rows={5}
                    value={draftConfig.galleryStories.supportIntro.description}
                    onChange={(e) =>
                      updateGallerySupportIntro("description", e.target.value)
                    }
                  />
                </Field>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {draftConfig.galleryStories.supportCards.map((card, index) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-border bg-muted/40 p-4"
                >
                  <Field label={`Support card ${index + 1} title`}>
                    <TextInput
                      value={card.title}
                      onChange={(e) =>
                        updateGallerySupportCard(index, "title", e.target.value)
                      }
                    />
                  </Field>
                  <Field label={`Support card ${index + 1} description`}>
                    <TextArea
                      rows={4}
                      value={card.description}
                      onChange={(e) =>
                        updateGallerySupportCard(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </Field>
                  <Field label="Accent">
                    <TextInput
                      value={card.accent}
                      onChange={(e) =>
                        updateGallerySupportCard(index, "accent", e.target.value)
                      }
                    />
                  </Field>
                  <ImageField
                    label={`Support card ${index + 1} image`}
                    value={card.image}
                    onChange={(e) =>
                      handleImageUpload(e, (value) =>
                        updateGallerySupportCard(index, "image", value)
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Strip</h3>
                <Field label="Strip title">
                  <TextInput
                    value={draftConfig.galleryStories.stripTitle}
                    onChange={(e) =>
                      updateGalleryStrip("stripTitle", e.target.value)
                    }
                  />
                </Field>
                <Field label="Strip badge">
                  <TextInput
                    value={draftConfig.galleryStories.stripBadge}
                    onChange={(e) =>
                      updateGalleryStrip("stripBadge", e.target.value)
                    }
                  />
                </Field>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {draftConfig.galleryStories.stripItems.map((item, index) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border bg-muted/40 p-4"
                  >
                    <Field label={`Strip item ${index + 1} label`}>
                      <TextInput
                        value={item.label}
                        onChange={(e) =>
                          updateGalleryStripItem(index, "label", e.target.value)
                        }
                      />
                    </Field>
                    <Field label={`Strip item ${index + 1} description`}>
                      <TextArea
                        rows={3}
                        value={item.description}
                        onChange={(e) =>
                          updateGalleryStripItem(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </Field>
                    <ImageField
                      label={`Strip item ${index + 1} image`}
                      value={item.image}
                      onChange={(e) =>
                        handleImageUpload(e, (value) =>
                          updateGalleryStripItem(index, "image", value)
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="video-section"
          title="Video / Reel"
          description="Edit the public video and reel content area for clips and promo materials."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, video: draftConfig.video }));
            toast.success("Video Section saved!");
            addNotification("Video section and clips have been updated.", "success", "Video Section Saved");
          }, "Video / Reel")}
          saveLabel="Update Video Section"
        >
          <div className="space-y-5">
            <Field label="Section title">
              <TextInput
                value={draftConfig.video.title}
                onChange={(e) => updateVideo("title", e.target.value)}
              />
            </Field>
            <Field label="Section description">
              <TextArea
                rows={4}
                value={draftConfig.video.description}
                onChange={(e) => updateVideo("description", e.target.value)}
              />
            </Field>
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Lead video</h3>
                <Field label="Lead title">
                  <TextInput
                    value={draftConfig.video.lead.title}
                    onChange={(e) => updateVideoLead("title", e.target.value)}
                  />
                </Field>
                <Field label="Lead category">
                  <TextInput
                    value={draftConfig.video.lead.category}
                    onChange={(e) => updateVideoLead("category", e.target.value)}
                  />
                </Field>
                <Field label="Lead description">
                  <TextArea
                    rows={4}
                    value={draftConfig.video.lead.description}
                    onChange={(e) =>
                      updateVideoLead("description", e.target.value)
                    }
                  />
                </Field>
                <Field label="Lead embed URL">
                  <TextInput
                    value={draftConfig.video.lead.embedUrl || ""}
                    onChange={(e) =>
                      updateVideoLead("embedUrl", e.target.value)
                    }
                    placeholder="https://player.cloudinary.com/embed/?cloud_name=..."
                  />
                </Field>
                <ImageField
                  label="Lead poster"
                  value={draftConfig.video.lead.poster}
                  onChange={(e) =>
                    handleImageUpload(e, (value) =>
                      updateVideoLead("poster", value)
                    )
                  }
                />
              </div>
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Icon</h3>
                <ImageField
                  label="Video icon"
                  value={draftConfig.video.icon}
                  onChange={(e) =>
                    handleImageUpload(e, (value) => updateVideo("icon", value))
                  }
                />
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {draftConfig.video.clips.map((clip, index) => (
                <div
                  key={clip.title}
                  className="rounded-2xl border border-border bg-muted/40 p-4"
                >
                  <Field label={`Clip ${index + 1} title`}>
                    <TextInput
                      value={clip.title}
                      onChange={(e) =>
                        updateVideoClip(index, "title", e.target.value)
                      }
                    />
                  </Field>
                  <Field label={`Clip ${index + 1} category`}>
                    <TextInput
                      value={clip.category}
                      onChange={(e) =>
                        updateVideoClip(index, "category", e.target.value)
                      }
                    />
                  </Field>
                  <Field label={`Clip ${index + 1} description`}>
                    <TextArea
                      rows={4}
                      value={clip.description}
                      onChange={(e) =>
                        updateVideoClip(index, "description", e.target.value)
                      }
                    />
                  </Field>
                  <ImageField
                    label={`Clip ${index + 1} poster`}
                    value={clip.poster}
                    onChange={(e) =>
                      handleImageUpload(e, (value) =>
                        updateVideoClip(index, "poster", value)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="mission-vision-values"
          title="Mission, Vision & Values"
          description="Edit the profile block that supports the About page and company story."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, profile: draftConfig.profile }));
            toast.success("Mission, Vision & Values saved!");
            addNotification("Mission, vision, and values have been updated.", "success", "Mission & Values Saved");
          }, "Mission, Vision & Values")}
          saveLabel="Update Mission, Vision & Values"
        >
          <div className="space-y-5">
            <Field label="Section title">
              <TextInput
                value={draftConfig.profile.title}
                onChange={(e) => updateProfile("title", e.target.value)}
              />
            </Field>
            <Field label="Section description">
              <TextArea
                rows={4}
                value={draftConfig.profile.description}
                onChange={(e) => updateProfile("description", e.target.value)}
              />
            </Field>
            <div className="grid gap-4 xl:grid-cols-3">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Story</h3>
                <Field label="Story title">
                  <TextInput
                    value={draftConfig.profile.storyTitle}
                    onChange={(e) => updateProfile("storyTitle", e.target.value)}
                  />
                </Field>
                <Field label="Story description">
                  <TextArea
                    rows={5}
                    value={draftConfig.profile.storyDescription}
                    onChange={(e) =>
                      updateProfile("storyDescription", e.target.value)
                    }
                  />
                </Field>
              </div>
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Mission</h3>
                <Field label="Mission title">
                  <TextInput
                    value={draftConfig.profile.missionTitle}
                    onChange={(e) =>
                      updateProfile("missionTitle", e.target.value)
                    }
                  />
                </Field>
                <Field label="Mission description">
                  <TextArea
                    rows={5}
                    value={draftConfig.profile.missionDescription}
                    onChange={(e) =>
                      updateProfile("missionDescription", e.target.value)
                    }
                  />
                </Field>
              </div>
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Vision</h3>
                <Field label="Vision title">
                  <TextInput
                    value={draftConfig.profile.visionTitle}
                    onChange={(e) =>
                      updateProfile("visionTitle", e.target.value)
                    }
                  />
                </Field>
                <Field label="Vision description">
                  <TextArea
                    rows={5}
                    value={draftConfig.profile.visionDescription}
                    onChange={(e) =>
                      updateProfile("visionDescription", e.target.value)
                    }
                  />
                </Field>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {(draftConfig.profile?.values ?? []).map((value, index) => (
                <div key={index} className="space-y-3 rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Value {index + 1}</p>
                  <Field label="Title">
                    <TextInput
                      value={typeof value === "object" ? (value.title ?? "") : value}
                      onChange={(e) => updateProfileValue(index, "title", e.target.value)}
                    />
                  </Field>
                  <Field label="Description">
                    <TextArea
                      rows={3}
                      value={typeof value === "object" ? (value.description ?? "") : ""}
                      onChange={(e) => updateProfileValue(index, "description", e.target.value)}
                    />
                  </Field>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="selected-voices"
          title="Partners / Reviews"
          description="Edit the testimonial-style quotes and partner reviews."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, voices: draftConfig.voices }));
            toast.success("Selected Voices saved!");
            addNotification("Testimonial quotes and reviews have been updated.", "success", "Selected Voices Saved");
          }, "Partners / Reviews")}
          saveLabel="Update Selected Voices"
        >
          <div className="space-y-5">
            <Field label="Section title">
              <TextInput
                value={draftConfig.voices.title}
                onChange={(e) => updateVoices("title", e.target.value)}
              />
            </Field>
            <Field label="Section description">
              <TextArea
                rows={4}
                value={draftConfig.voices.description}
                onChange={(e) => updateVoices("description", e.target.value)}
              />
            </Field>
            <div className="grid gap-4 lg:grid-cols-2">
              {draftConfig.voices.reviews.map((review, index) => (
                <div
                  key={review.username}
                  className="rounded-2xl border border-border bg-muted/40 p-4"
                >
                  <Field label={`Review ${index + 1} name`}>
                    <TextInput
                      value={review.name}
                      onChange={(e) =>
                        updateVoiceReview(index, "name", e.target.value)
                      }
                    />
                  </Field>
                  <Field label={`Review ${index + 1} username`}>
                    <TextInput
                      value={review.username}
                      onChange={(e) =>
                        updateVoiceReview(index, "username", e.target.value)
                      }
                    />
                  </Field>
                  <Field label={`Review ${index + 1} body`}>
                    <TextArea
                      rows={4}
                      value={review.body}
                      onChange={(e) =>
                        updateVoiceReview(index, "body", e.target.value)
                      }
                    />
                  </Field>
                  <ImageField
                    label={`Review ${index + 1} image`}
                    value={review.img}
                    onChange={(e) =>
                      handleImageUpload(e, (value) =>
                        updateVoiceReview(index, "img", value)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="services-page"
          title="Services Page"
          description="Edit the public Services page content."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, servicesPage: draftConfig.servicesPage }));
            toast.success("Services page saved!");
          }, "Services Page")}
          saveLabel="Update Services Page"
        >
          <div className="space-y-6">
            <Field label="Hero title">
              <TextInput value={draftConfig.servicesPage?.hero?.title || ""} onChange={(e) => updateServicesPage("hero", "title", e.target.value)} />
            </Field>
            <Field label="Hero description">
              <TextArea rows={4} value={draftConfig.servicesPage?.hero?.description || ""} onChange={(e) => updateServicesPage("hero", "description", e.target.value)} />
            </Field>
            <ImageField
              label="Hero image"
              value={draftConfig.servicesPage?.hero?.image || ""}
              onChange={(e) =>
                handleImageUpload(e, (value) => updateServicesPage("hero", "image", value))
              }
            />
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Intro</h3>
                <Field label="Section title">
                  <TextInput value={draftConfig.servicesPage?.servicesIntro?.title || ""} onChange={(e) => updateServicesPage("servicesIntro", "title", e.target.value)} />
                </Field>
                <Field label="Section description">
                  <TextArea rows={4} value={draftConfig.servicesPage?.servicesIntro?.description || ""} onChange={(e) => updateServicesPage("servicesIntro", "description", e.target.value)} />
                </Field>
                <ImageField
                  label="Intro image"
                  value={draftConfig.servicesPage?.introImage || ""}
                  onChange={(e) =>
                    handleImageUpload(e, (value) => updateServicesPageRoot("introImage", value))
                  }
                />
              </div>
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Travel block</h3>
                <Field label="Travel title">
                  <TextInput value={draftConfig.servicesPage?.travel?.title || ""} onChange={(e) => updateServicesPage("travel", "title", e.target.value)} />
                </Field>
                <Field label="Travel description">
                  <TextArea rows={4} value={draftConfig.servicesPage?.travel?.description || ""} onChange={(e) => updateServicesPage("travel", "description", e.target.value)} />
                </Field>
              </div>
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              {(draftConfig.servicesPage?.showcase || []).map((item, index) => (
                <div key={index} className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                  <h3 className="text-lg font-bold text-foreground">Showcase {index + 1}</h3>
                  <Field label={`Showcase ${index + 1} title`}>
                    <TextInput
                      value={item.title || ""}
                      onChange={(e) => {
                        const next = [...(draftConfig.servicesPage?.showcase || [])];
                        next[index] = { ...next[index], title: e.target.value };
                        setDraftConfig((current) => ({
                          ...current,
                          servicesPage: {
                            ...current.servicesPage,
                            showcase: next,
                          },
                        }));
                      }}
                    />
                  </Field>
                  <Field label={`Showcase ${index + 1} description`}>
                    <TextArea
                      rows={4}
                      value={item.description || ""}
                      onChange={(e) => {
                        const next = [...(draftConfig.servicesPage?.showcase || [])];
                        next[index] = { ...next[index], description: e.target.value };
                        setDraftConfig((current) => ({
                          ...current,
                          servicesPage: {
                            ...current.servicesPage,
                            showcase: next,
                          },
                        }));
                      }}
                    />
                  </Field>
                  <ImageField
                    label={`Showcase ${index + 1} image`}
                    value={item.image || ""}
                    onChange={(e) =>
                      handleImageUpload(e, (value) => {
                        const next = [...(draftConfig.servicesPage?.showcase || [])];
                        next[index] = { ...next[index], image: value };
                        setDraftConfig((current) => ({
                          ...current,
                          servicesPage: {
                            ...current.servicesPage,
                            showcase: next,
                          },
                        }));
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="portfolio-page"
          title="Portfolio Page"
          description="Edit the public Portfolio page content."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, portfolioPage: draftConfig.portfolioPage }));
            toast.success("Portfolio page saved!");
          }, "Portfolio Page")}
          saveLabel="Update Portfolio Page"
        >
          <div className="space-y-6">
            <Field label="Hero title">
              <TextInput value={draftConfig.portfolioPage?.hero?.title || ""} onChange={(e) => updatePortfolioPage("hero", "title", e.target.value)} />
            </Field>
            <Field label="Hero description">
              <TextArea rows={4} value={draftConfig.portfolioPage?.hero?.description || ""} onChange={(e) => updatePortfolioPage("hero", "description", e.target.value)} />
            </Field>
            <ImageField
              label="Hero image"
              value={draftConfig.portfolioPage?.hero?.image || ""}
              onChange={(e) =>
                handleImageUpload(e, (value) => updatePortfolioPage("hero", "image", value))
              }
            />
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Header</h3>
                <Field label="Header title">
                  <TextInput value={draftConfig.portfolioPage?.header?.title || ""} onChange={(e) => updatePortfolioPage("header", "title", e.target.value)} />
                </Field>
                <Field label="Header description">
                  <TextArea rows={4} value={draftConfig.portfolioPage?.header?.description || ""} onChange={(e) => updatePortfolioPage("header", "description", e.target.value)} />
                </Field>
              </div>
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Method</h3>
                <Field label="Method title">
                  <TextInput value={draftConfig.portfolioPage?.method?.title || ""} onChange={(e) => updatePortfolioPage("method", "title", e.target.value)} />
                </Field>
                <Field label="Method description">
                  <TextArea rows={4} value={draftConfig.portfolioPage?.method?.description || ""} onChange={(e) => updatePortfolioPage("method", "description", e.target.value)} />
                </Field>
              </div>
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              {(draftConfig.portfolioPage?.projects || []).map((project, index) => (
                <div key={index} className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                  <h3 className="text-lg font-bold text-foreground">Project {index + 1}</h3>
                  <Field label={`Project ${index + 1} title`}>
                    <TextInput
                      value={project.title || ""}
                      onChange={(e) => {
                        const next = [...(draftConfig.portfolioPage?.projects || [])];
                        next[index] = { ...next[index], title: e.target.value };
                        setDraftConfig((current) => ({
                          ...current,
                          portfolioPage: {
                            ...current.portfolioPage,
                            projects: next,
                          },
                        }));
                      }}
                    />
                  </Field>
                  <Field label={`Project ${index + 1} category`}>
                    <TextInput
                      value={project.category || ""}
                      onChange={(e) => {
                        const next = [...(draftConfig.portfolioPage?.projects || [])];
                        next[index] = { ...next[index], category: e.target.value };
                        setDraftConfig((current) => ({
                          ...current,
                          portfolioPage: {
                            ...current.portfolioPage,
                            projects: next,
                          },
                        }));
                      }}
                    />
                  </Field>
                  <Field label={`Project ${index + 1} description`}>
                    <TextArea
                      rows={4}
                      value={project.description || ""}
                      onChange={(e) => {
                        const next = [...(draftConfig.portfolioPage?.projects || [])];
                        next[index] = { ...next[index], description: e.target.value };
                        setDraftConfig((current) => ({
                          ...current,
                          portfolioPage: {
                            ...current.portfolioPage,
                            projects: next,
                          },
                        }));
                      }}
                    />
                  </Field>
                  <ImageField
                    label={`Project ${index + 1} image`}
                    value={project.image || ""}
                    onChange={(e) =>
                      handleImageUpload(e, (value) => {
                        const next = [...(draftConfig.portfolioPage?.projects || [])];
                        next[index] = { ...next[index], image: value };
                        setDraftConfig((current) => ({
                          ...current,
                          portfolioPage: {
                            ...current.portfolioPage,
                            projects: next,
                          },
                        }));
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="leadership-page"
          title="Leadership Page"
          description="Edit the public Leadership page content."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, leadershipPage: draftConfig.leadershipPage }));
            toast.success("Leadership page saved!");
          }, "Leadership Page")}
          saveLabel="Update Leadership Page"
        >
          <div className="space-y-6">
            <Field label="Hero title">
              <TextInput value={draftConfig.leadershipPage?.hero?.title || ""} onChange={(e) => updateLeadershipPage("hero", "title", e.target.value)} />
            </Field>
            <Field label="Hero description">
              <TextArea rows={4} value={draftConfig.leadershipPage?.hero?.description || ""} onChange={(e) => updateLeadershipPage("hero", "description", e.target.value)} />
            </Field>
            <ImageField
              label="Hero image"
              value={draftConfig.leadershipPage?.hero?.image || ""}
              onChange={(e) =>
                handleImageUpload(e, (value) => updateLeadershipPage("hero", "image", value))
              }
            />
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Leader</h3>
                <Field label="Leader name">
                  <TextInput value={draftConfig.leadershipPage?.leader?.name || ""} onChange={(e) => updateLeadershipPage("leader", "name", e.target.value)} />
                </Field>
                <Field label="Leader role">
                  <TextInput value={draftConfig.leadershipPage?.leader?.role || ""} onChange={(e) => updateLeadershipPage("leader", "role", e.target.value)} />
                </Field>
                <Field label="Leader description">
                  <TextArea rows={5} value={draftConfig.leadershipPage?.leader?.description || ""} onChange={(e) => updateLeadershipPage("leader", "description", e.target.value)} />
                </Field>
                <ImageField
                  label="Leader portrait"
                  value={draftConfig.leadershipPage?.leader?.heroImage || ""}
                  onChange={(e) =>
                    handleImageUpload(e, (value) =>
                      updateLeadershipPage("leader", "heroImage", value)
                    )
                  }
                />
              </div>
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Highlights</h3>
                {(draftConfig.leadershipPage?.highlights || []).map((item, index) => (
                  <div key={index} className="space-y-3 rounded-2xl border border-border bg-background p-4">
                    <Field label={`Highlight ${index + 1} title`}>
                      <TextInput
                        value={item.title || ""}
                        onChange={(e) => {
                          const next = [...(draftConfig.leadershipPage?.highlights || [])];
                          next[index] = { ...next[index], title: e.target.value };
                          setDraftConfig((current) => ({
                            ...current,
                            leadershipPage: {
                              ...current.leadershipPage,
                              highlights: next,
                            },
                          }));
                        }}
                      />
                    </Field>
                    <Field label={`Highlight ${index + 1} description`}>
                      <TextArea rows={3} value={item.description || ""} onChange={(e) => {
                        const next = [...(draftConfig.leadershipPage?.highlights || [])];
                        next[index] = { ...next[index], description: e.target.value };
                        setDraftConfig((current) => ({
                          ...current,
                          leadershipPage: {
                            ...current.leadershipPage,
                            highlights: next,
                          },
                        }));
                      }} />
                    </Field>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="background-page"
          title="Background Page"
          description="Edit the public Background page hero, badges, and CTAs."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, backgroundPage: draftConfig.backgroundPage }));
            toast.success("Background page saved!");
          }, "Background Page")}
          saveLabel="Update Background Page"
        >
          <div className="space-y-6">
            <div className="grid gap-4 xl:grid-cols-2">
              <Field label="Hero title">
                <TextInput value={draftConfig.backgroundPage?.hero?.title || ""} onChange={(e) => updateBackgroundPage("hero", "title", e.target.value)} />
              </Field>
              <Field label="Hero description">
                <TextArea rows={4} value={draftConfig.backgroundPage?.hero?.description || ""} onChange={(e) => updateBackgroundPage("hero", "description", e.target.value)} />
              </Field>
              <Field label="Badge eyebrow">
                <TextInput value={draftConfig.backgroundPage?.hero?.badgeEyebrow || ""} onChange={(e) => updateBackgroundPage("hero", "badgeEyebrow", e.target.value)} />
              </Field>
              <Field label="Badge description">
                <TextArea rows={3} value={draftConfig.backgroundPage?.hero?.badgeDescription || ""} onChange={(e) => updateBackgroundPage("hero", "badgeDescription", e.target.value)} />
              </Field>
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-base font-bold text-foreground">Primary CTA</h3>
                <Field label="Button label">
                  <TextInput value={draftConfig.backgroundPage?.hero?.primaryCtaLabel || ""} onChange={(e) => updateBackgroundPage("hero", "primaryCtaLabel", e.target.value)} />
                </Field>
                <Field label="Button link">
                  <TextInput value={draftConfig.backgroundPage?.hero?.primaryCtaHref || ""} onChange={(e) => updateBackgroundPage("hero", "primaryCtaHref", e.target.value)} />
                </Field>
              </div>
              <div className="space-y-3 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-base font-bold text-foreground">Secondary CTA</h3>
                <Field label="Button label">
                  <TextInput value={draftConfig.backgroundPage?.hero?.secondaryCtaLabel || ""} onChange={(e) => updateBackgroundPage("hero", "secondaryCtaLabel", e.target.value)} />
                </Field>
                <Field label="Button link">
                  <TextInput value={draftConfig.backgroundPage?.hero?.secondaryCtaHref || ""} onChange={(e) => updateBackgroundPage("hero", "secondaryCtaHref", e.target.value)} />
                </Field>
              </div>
            </div>
            <ImageField
              label="Hero image"
              value={draftConfig.backgroundPage?.hero?.image || ""}
              onChange={(e) =>
                handleImageUpload(e, (value) => updateBackgroundPage("hero", "image", value))
              }
            />
          </div>
        </SectionCard>

        <SectionCard
          id="impact-page"
          title="Impact Page"
          description="Edit the public Impact page content."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, impactPage: draftConfig.impactPage }));
            toast.success("Impact page saved!");
          }, "Impact Page")}
          saveLabel="Update Impact Page"
        >
          <div className="space-y-6">
            <Field label="Hero title">
              <TextInput value={draftConfig.impactPage?.hero?.title || ""} onChange={(e) => updateImpactPage("hero", "title", e.target.value)} />
            </Field>
            <Field label="Hero description">
              <TextArea rows={4} value={draftConfig.impactPage?.hero?.description || ""} onChange={(e) => updateImpactPage("hero", "description", e.target.value)} />
            </Field>
            <ImageField
              label="Hero image"
              value={draftConfig.impactPage?.hero?.image || ""}
              onChange={(e) =>
                handleImageUpload(e, (value) => updateImpactPage("hero", "image", value))
              }
            />
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Proof block</h3>
                <Field label="Block title">
                  <TextInput value={draftConfig.impactPage?.proof?.title || ""} onChange={(e) => updateImpactPage("proof", "title", e.target.value)} />
                </Field>
                <Field label="Block description">
                  <TextArea rows={4} value={draftConfig.impactPage?.proof?.description || ""} onChange={(e) => updateImpactPage("proof", "description", e.target.value)} />
                </Field>
                <Field label="Visual label">
                  <TextInput value={draftConfig.impactPage?.proof?.visualTitle || ""} onChange={(e) => updateImpactPage("proof", "visualTitle", e.target.value)} />
                </Field>
                <Field label="Visual heading">
                  <TextInput value={draftConfig.impactPage?.proof?.visualHeading || ""} onChange={(e) => updateImpactPage("proof", "visualHeading", e.target.value)} />
                </Field>
                <Field label="Visual description">
                  <TextArea rows={4} value={draftConfig.impactPage?.proof?.visualDescription || ""} onChange={(e) => updateImpactPage("proof", "visualDescription", e.target.value)} />
                </Field>
                <ImageField
                  label="Proof image"
                  value={draftConfig.impactPage?.proof?.image || ""}
                  onChange={(e) =>
                    handleImageUpload(e, (value) => updateImpactPage("proof", "image", value))
                  }
                />
              </div>
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Benefits block</h3>
                <Field label="Block title">
                  <TextInput value={draftConfig.impactPage?.benefits?.title || ""} onChange={(e) => updateImpactPage("benefits", "title", e.target.value)} />
                </Field>
                <Field label="Block description">
                  <TextArea rows={4} value={draftConfig.impactPage?.benefits?.description || ""} onChange={(e) => updateImpactPage("benefits", "description", e.target.value)} />
                </Field>
                <Field label="Payoff title">
                  <TextInput value={draftConfig.impactPage?.benefits?.payoffTitle || ""} onChange={(e) => updateImpactPage("benefits", "payoffTitle", e.target.value)} />
                </Field>
                <Field label="Payoff description">
                  <TextArea rows={4} value={draftConfig.impactPage?.benefits?.payoffDescription || ""} onChange={(e) => updateImpactPage("benefits", "payoffDescription", e.target.value)} />
                </Field>
                <Field label="Support title">
                  <TextInput value={draftConfig.impactPage?.benefits?.supportTitle || ""} onChange={(e) => updateImpactPage("benefits", "supportTitle", e.target.value)} />
                </Field>
                <Field label="Support description">
                  <TextArea rows={4} value={draftConfig.impactPage?.benefits?.supportDescription || ""} onChange={(e) => updateImpactPage("benefits", "supportDescription", e.target.value)} />
                </Field>
                {(draftConfig.impactPage?.benefits?.points || []).map((point, index) => (
                  <Field key={index} label={`Point ${index + 1}`}>
                    <TextArea
                      rows={2}
                      value={point}
                      onChange={(e) => {
                        const next = [...(draftConfig.impactPage?.benefits?.points || [])];
                        next[index] = e.target.value;
                        updateImpactPage("benefits", "points", next);
                      }}
                    />
                  </Field>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="who-we-serve-page"
          title="Who We Serve Page"
          description="Edit the public Who We Serve page content."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, whoWeServePage: draftConfig.whoWeServePage }));
            toast.success("Who We Serve page saved!");
          }, "Who We Serve Page")}
          saveLabel="Update Who We Serve Page"
        >
          <div className="space-y-6">
            <Field label="Hero title">
              <TextInput value={draftConfig.whoWeServePage?.hero?.title || ""} onChange={(e) => updateWhoWeServePage("hero", "title", e.target.value)} />
            </Field>
            <Field label="Hero description">
              <TextArea rows={4} value={draftConfig.whoWeServePage?.hero?.description || ""} onChange={(e) => updateWhoWeServePage("hero", "description", e.target.value)} />
            </Field>
            <ImageField
              label="Hero image"
              value={draftConfig.whoWeServePage?.hero?.image || ""}
              onChange={(e) =>
                handleImageUpload(e, (value) => updateWhoWeServePage("hero", "image", value))
              }
            />
          </div>
        </SectionCard>

        <SectionCard
          id="company-profile"
          title="Documentary / Company Profile"
          description="Edit the main documentary page content shown under Start with the section that matches your goal."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, companyProfile: draftConfig.companyProfile }));
            toast.success("Documentary content saved!");
            addNotification("Company profile content has been updated.", "success", "Documentary Saved");
          }, "Documentary / Company Profile")}
          saveLabel="Update Documentary"
        >
          <div className="space-y-8">
            <div className="grid gap-4 xl:grid-cols-2">
              <Field label="Hero title">
                <TextInput
                  value={draftConfig.companyProfile?.hero?.title || ""}
                  onChange={(e) => updateCompanyProfileSection("hero", "title", e.target.value)}
                />
              </Field>
              <ImageField
                label="Hero image"
                value={draftConfig.companyProfile?.hero?.image || ""}
                onChange={(e) =>
                  handleImageUpload(e, (value) =>
                    updateCompanyProfileSection("hero", "image", value)
                  )
                }
              />
              <Field label="Hero eyebrow">
                <TextInput
                  value={draftConfig.companyProfile?.hero?.badgeEyebrow || ""}
                  onChange={(e) => updateCompanyProfileSection("hero", "badgeEyebrow", e.target.value)}
                />
              </Field>
              <Field label="Hero badge description">
                <TextArea
                  rows={3}
                  value={draftConfig.companyProfile?.hero?.badgeDescription || ""}
                  onChange={(e) => updateCompanyProfileSection("hero", "badgeDescription", e.target.value)}
                />
              </Field>
              <Field label="Hero description">
                <TextArea
                  rows={4}
                  value={draftConfig.companyProfile?.hero?.description || ""}
                  onChange={(e) => updateCompanyProfileSection("hero", "description", e.target.value)}
                />
              </Field>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Difference block</h3>
                <Field label="Section title">
                  <TextInput
                    value={draftConfig.companyProfile?.difference?.title || ""}
                    onChange={(e) => updateCompanyProfileSection("difference", "title", e.target.value)}
                  />
                </Field>
                <Field label="Section description">
                  <TextArea
                    rows={4}
                    value={draftConfig.companyProfile?.difference?.description || ""}
                    onChange={(e) => updateCompanyProfileSection("difference", "description", e.target.value)}
                  />
                </Field>
                {(draftConfig.companyProfile?.difference?.points || []).map((point, index) => (
                  <Field key={index} label={`Point ${index + 1}`}>
                    <TextArea
                      rows={2}
                      value={point}
                      onChange={(e) => {
                        const next = [...(draftConfig.companyProfile?.difference?.points || [])];
                        next[index] = e.target.value;
                        updateCompanyProfileSection("difference", "points", next);
                      }}
                    />
                  </Field>
                ))}
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Overview block</h3>
                <Field label="Overview title">
                  <TextInput
                    value={draftConfig.companyProfile?.overview?.title || ""}
                    onChange={(e) => updateCompanyProfileSection("overview", "title", e.target.value)}
                  />
                </Field>
                <Field label="Overview description">
                  <TextArea
                    rows={4}
                    value={draftConfig.companyProfile?.overview?.description || ""}
                    onChange={(e) => updateCompanyProfileSection("overview", "description", e.target.value)}
                  />
                </Field>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Footprint block</h3>
                <Field label="Block title">
                  <TextInput
                    value={draftConfig.companyProfile?.footprint?.title || ""}
                    onChange={(e) => updateCompanyProfileSection("footprint", "title", e.target.value)}
                  />
                </Field>
                <Field label="Block description">
                  <TextArea
                    rows={4}
                    value={draftConfig.companyProfile?.footprint?.description || ""}
                    onChange={(e) => updateCompanyProfileSection("footprint", "description", e.target.value)}
                  />
                </Field>
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Featured story block</h3>
                <Field label="Block title">
                  <TextInput
                    value={draftConfig.companyProfile?.portfolio?.title || ""}
                    onChange={(e) => updateCompanyProfileSection("portfolio", "title", e.target.value)}
                  />
                </Field>
                <Field label="Block description">
                  <TextArea
                    rows={4}
                    value={draftConfig.companyProfile?.portfolio?.description || ""}
                    onChange={(e) => updateCompanyProfileSection("portfolio", "description", e.target.value)}
                  />
                </Field>
                {(draftConfig.companyProfile?.portfolio?.projects || []).map((project, index) => (
                  <div key={index} className="space-y-3 rounded-2xl border border-border bg-background p-4">
                    <Field label={`Project ${index + 1} title`}>
                      <TextInput
                        value={project.title || ""}
                        onChange={(e) => {
                          const next = [...(draftConfig.companyProfile?.portfolio?.projects || [])];
                          next[index] = { ...next[index], title: e.target.value };
                          updateCompanyProfileSection("portfolio", "projects", next);
                        }}
                      />
                    </Field>
                    <Field label={`Project ${index + 1} category`}>
                      <TextInput
                        value={project.category || ""}
                        onChange={(e) => {
                          const next = [...(draftConfig.companyProfile?.portfolio?.projects || [])];
                          next[index] = { ...next[index], category: e.target.value };
                          updateCompanyProfileSection("portfolio", "projects", next);
                        }}
                      />
                    </Field>
                    <Field label={`Project ${index + 1} description`}>
                      <TextArea
                        rows={4}
                        value={project.description || ""}
                        onChange={(e) => {
                          const next = [...(draftConfig.companyProfile?.portfolio?.projects || [])];
                          next[index] = { ...next[index], description: e.target.value };
                          updateCompanyProfileSection("portfolio", "projects", next);
                        }}
                      />
                    </Field>
                    <ImageField
                      label={`Project ${index + 1} image`}
                      value={project.image || ""}
                      onChange={(e) =>
                        handleImageUpload(e, (value) => {
                          const next = [...(draftConfig.companyProfile?.portfolio?.projects || [])];
                          next[index] = { ...next[index], image: value };
                          updateCompanyProfileSection("portfolio", "projects", next);
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="approach-page"
          title="Approach Page"
          description="Edit the public Approach page — hero, how-we-work text, 4-step process cards, working style, and deliverables."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, approachPage: draftConfig.approachPage }));
            toast.success("Approach page saved!");
          }, "Approach Page")}
          saveLabel="Update Approach Page"
        >
          <div className="space-y-6">
            <div className="grid gap-4 xl:grid-cols-2">
              <Field label="Hero title">
                <TextInput value={draftConfig.approachPage?.hero?.title || ""} onChange={(e) => updateApproachPage("hero", "title", e.target.value)} />
              </Field>
              <Field label="Hero description">
                <TextArea rows={4} value={draftConfig.approachPage?.hero?.description || ""} onChange={(e) => updateApproachPage("hero", "description", e.target.value)} />
              </Field>
              <Field label="Badge eyebrow">
                <TextInput value={draftConfig.approachPage?.hero?.badgeEyebrow || ""} onChange={(e) => updateApproachPage("hero", "badgeEyebrow", e.target.value)} />
              </Field>
              <Field label="Badge description">
                <TextArea rows={3} value={draftConfig.approachPage?.hero?.badgeDescription || ""} onChange={(e) => updateApproachPage("hero", "badgeDescription", e.target.value)} />
              </Field>
              <Field label="Primary CTA label">
                <TextInput value={draftConfig.approachPage?.hero?.primaryCtaLabel || ""} onChange={(e) => updateApproachPage("hero", "primaryCtaLabel", e.target.value)} />
              </Field>
              <Field label="Primary CTA link">
                <TextInput value={draftConfig.approachPage?.hero?.primaryCtaHref || ""} onChange={(e) => updateApproachPage("hero", "primaryCtaHref", e.target.value)} />
              </Field>
              <Field label="Secondary CTA label">
                <TextInput value={draftConfig.approachPage?.hero?.secondaryCtaLabel || ""} onChange={(e) => updateApproachPage("hero", "secondaryCtaLabel", e.target.value)} />
              </Field>
              <Field label="Secondary CTA link">
                <TextInput value={draftConfig.approachPage?.hero?.secondaryCtaHref || ""} onChange={(e) => updateApproachPage("hero", "secondaryCtaHref", e.target.value)} />
              </Field>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">How OHI works</h3>
                <Field label="Section title">
                  <TextInput value={draftConfig.approachPage?.howWeWork?.title || ""} onChange={(e) => updateApproachPage("howWeWork", "title", e.target.value)} />
                </Field>
                <Field label="Section description">
                  <TextArea rows={3} value={draftConfig.approachPage?.howWeWork?.description || ""} onChange={(e) => updateApproachPage("howWeWork", "description", e.target.value)} />
                </Field>
                <Field label="Body paragraph 1">
                  <TextArea rows={4} value={draftConfig.approachPage?.howWeWork?.body1 || ""} onChange={(e) => updateApproachPage("howWeWork", "body1", e.target.value)} />
                </Field>
                <Field label="Body paragraph 2">
                  <TextArea rows={4} value={draftConfig.approachPage?.howWeWork?.body2 || ""} onChange={(e) => updateApproachPage("howWeWork", "body2", e.target.value)} />
                </Field>
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
                <h3 className="text-lg font-bold text-foreground">Working style</h3>
                <Field label="Label">
                  <TextInput value={draftConfig.approachPage?.workingStyle?.label || ""} onChange={(e) => updateApproachPage("workingStyle", "label", e.target.value)} />
                </Field>
                <Field label="Title">
                  <TextInput value={draftConfig.approachPage?.workingStyle?.title || ""} onChange={(e) => updateApproachPage("workingStyle", "title", e.target.value)} />
                </Field>
                <Field label="Description">
                  <TextArea rows={4} value={draftConfig.approachPage?.workingStyle?.description || ""} onChange={(e) => updateApproachPage("workingStyle", "description", e.target.value)} />
                </Field>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">4-Step process cards</p>
              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                {(draftConfig.approachPage?.steps ?? []).map((step, index) => (
                  <div key={index} className="space-y-3 rounded-2xl border border-border bg-muted/40 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Step 0{index + 1}</p>
                    <Field label="Title">
                      <TextInput value={step.title || ""} onChange={(e) => updateApproachPageStep(index, "title", e.target.value)} />
                    </Field>
                    <Field label="Description">
                      <TextArea rows={3} value={step.description || ""} onChange={(e) => updateApproachPageStep(index, "description", e.target.value)} />
                    </Field>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-muted/40 p-4">
              <h3 className="text-lg font-bold text-foreground">Deliverables</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Section label">
                  <TextInput value={draftConfig.approachPage?.deliverables?.label || ""} onChange={(e) => updateApproachPage("deliverables", "label", e.target.value)} />
                </Field>
                <Field label="CTA label">
                  <TextInput value={draftConfig.approachPage?.deliverables?.ctaLabel || ""} onChange={(e) => updateApproachPage("deliverables", "ctaLabel", e.target.value)} />
                </Field>
                <Field label="CTA link">
                  <TextInput value={draftConfig.approachPage?.deliverables?.ctaHref || ""} onChange={(e) => updateApproachPage("deliverables", "ctaHref", e.target.value)} />
                </Field>
              </div>
              <div className="space-y-2 mt-2">
                <p className="text-sm font-semibold text-foreground">Deliverable items</p>
                {(draftConfig.approachPage?.deliverables?.items ?? []).map((item, index) => (
                  <TextInput
                    key={index}
                    value={item || ""}
                    onChange={(e) => updateApproachPageDeliverableItem(index, e.target.value)}
                    placeholder={`Deliverable ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="footer-settings"
          title="Footer Settings"
          description="Control the footer copy and social links on the public site."
          onSave={() => requestSave(async () => {
            setConfig((current) => ({ ...current, footer: draftConfig.footer }));
            toast.success("Footer Settings saved!");
            addNotification("Footer text and contact details have been updated.", "success", "Footer Settings Saved");
          }, "Footer Settings")}
          saveLabel="Update Footer Settings"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Field
              label="Footer text"
              hint='Use "{year}" where the current year should appear.'
            >
              <TextArea
                rows={5}
                value={draftConfig.footer.description}
                onChange={(e) => updateFooter("description", e.target.value)}
              />
            </Field>
          </div>
          <div className="mt-6 space-y-4 rounded-2xl border border-border bg-muted/40 p-4">
            <h3 className="text-lg font-bold text-foreground">Social links</h3>
            <p className="text-sm text-muted-foreground">
              These links drive the social icons shown in the header and footer.
            </p>
            {(draftConfig.footer?.socialLinks || []).map((link, index) => (
              <div key={`${link.label || "social"}-${index}`} className="grid gap-4 md:grid-cols-2">
                <Field label={`Link ${index + 1} label`}>
                  <TextInput
                    value={link.label || ""}
                    onChange={(e) => updateFooterSocialLink(index, "label", e.target.value)}
                    placeholder="X"
                  />
                </Field>
                <Field label={`Link ${index + 1} URL`}>
                  <TextInput
                    value={link.path || ""}
                    onChange={(e) => updateFooterSocialLink(index, "path", e.target.value)}
                    placeholder="https://x.com/IntHouse40288"
                  />
                </Field>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm update</AlertDialogTitle>
            <AlertDialogDescription>
              Save the changes for <strong>{pendingSaveLabel || "this section"}</strong>?
              The public site will use the updated content immediately after saving.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setPendingSave(null);
                setPendingSaveLabel("");
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmSave}>
              Confirm update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={resetConfirmOpen} onOpenChange={setResetConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset to defaults?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently overwrite all your current content with the original default values. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await resetConfig();
                setDraftConfig(landingPageDefaults);
                toast.success("Site content reset to defaults");
              }}
            >
              Yes, reset everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}


