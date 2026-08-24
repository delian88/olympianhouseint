import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLandingPageConfig } from "../../context/LandingPageConfigContext";
import { landingPageDefaults } from "../../data/landingPageDefaults";
import { api } from "../../lib/api";
import { Plus, Trash2, Save, FileText } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { FileInput } from "../../components/ui/file-input";
import { Button } from "../../components/ui/button";

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
  return <Input {...props} className={`w-full rounded-2xl ${props.className || ""}`} />;
}

function TextArea(props) {
  return <Textarea {...props} className={`w-full rounded-2xl ${props.className || ""}`} />;
}

function ImageField({ label, value, onChange, hint }) {
  return (
    <Field label={label} hint={hint}>
      <FileInput label="Choose file" value={value} accept="image/*" onChange={onChange} previewAlt={label} />
    </Field>
  );
}

export default function NewsManager() {
  const { config, setConfig, loading } = useLandingPageConfig();
  const [draftCards, setDraftCards] = useState([]);
  const [draftImages, setDraftImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      const defaultCards = landingPageDefaults.homePage.news.cards;
      const loadedCards = config?.homePage?.news?.cards ?? defaultCards;
      const loadedImages = config?.homePage?.news?.images ?? [];
      
      setDraftCards(loadedCards);
      setDraftImages(loadedImages);
    }
  }, [config, loading]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const newConfig = {
        ...config,
        homePage: {
          ...config?.homePage,
          news: {
            ...(config?.homePage?.news || landingPageDefaults.homePage.news),
            cards: draftCards,
            images: draftImages,
          }
        }
      };
      
      setConfig(newConfig);
      
      // Wait for React state
      setTimeout(async () => {
        try {
          await api.updateLandingConfig(newConfig);
          toast.success("Articles saved successfully!");
        } catch (err) {
          console.error(err);
          toast.error("Failed to save articles to the database.");
        } finally {
          setIsSaving(false);
        }
      }, 0);
    } catch (e) {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Uploading image... 0%");
    try {
      const data = await api.uploadMedia(file, (progress) => {
        if (progress >= 100) {
          toast.loading("Processing image on server... Please wait.", { id: toastId });
        } else {
          toast.loading(`Uploading image... ${Math.round(progress)}%`, { id: toastId });
        }
      });
      callback(data.url);
      toast.success("Image uploaded", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Could not upload that image", { id: toastId });
    } finally {
      e.target.value = "";
    }
  };

  const updateSelectedArticle = (field, value) => {
    setDraftCards(current => {
      const updated = [...current];
      updated[selectedIndex] = { ...updated[selectedIndex], [field]: value };
      return updated;
    });
  };

  const addArticle = () => {
    const newArticle = {
      title: "New Article",
      slug: "new-article-" + Date.now(),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      categories: [],
      description: "",
      content: "Your article text goes here..."
    };
    setDraftCards(c => [...c, newArticle]);
    setSelectedIndex(draftCards.length); // point to the new article
  };

  const deleteArticle = (index) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setDraftCards(c => c.filter((_, i) => i !== index));
      setDraftImages(c => c.filter((_, i) => i !== index));
      if (selectedIndex === index) {
        setSelectedIndex(Math.max(0, index - 1));
      } else if (selectedIndex > index) {
        setSelectedIndex(selectedIndex - 1);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e97a2f] border-t-transparent"></div>
      </div>
    );
  }

  const selectedArticle = draftCards[selectedIndex];

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col md:flex-row overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-xl backdrop-blur">
      
      {/* Sidebar List */}
      <div className="w-full md:w-80 flex flex-col border-r border-border/60 bg-muted/20">
        <div className="p-4 border-b border-border/60 flex items-center justify-between bg-card">
          <h2 className="font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0f4c81]" />
            Articles ({draftCards.length})
          </h2>
          <button 
            onClick={addArticle}
            className="p-1.5 bg-[#e97a2f] text-white rounded-lg hover:bg-[#d76a21] transition"
            title="Add Article"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {draftCards.map((card, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-full flex flex-col text-left p-3 rounded-xl transition ${selectedIndex === index ? "bg-[#0f4c81] text-white shadow-md" : "hover:bg-muted text-foreground"}`}
            >
              <span className={`text-sm font-semibold truncate ${selectedIndex === index ? "text-white" : "text-[#0d1f2d]"}`}>
                {card.title || "Untitled Article"}
              </span>
              <span className={`text-xs mt-1 ${selectedIndex === index ? "text-white/80" : "text-muted-foreground"}`}>
                {card.date}
              </span>
            </button>
          ))}
          {draftCards.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No articles found. Create one!
            </div>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col bg-background overflow-hidden relative">
        {selectedArticle ? (
          <>
            <div className="p-4 sm:px-8 sm:py-5 border-b border-border/60 flex items-center justify-between bg-card z-10 sticky top-0">
              <h2 className="text-xl font-bold truncate pr-4 text-[#0d1f2d]">
                Edit Article
              </h2>
              <div className="flex items-center gap-3 shrink-0">
                <Button 
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteArticle(selectedIndex)}
                  className="rounded-xl px-4 font-semibold shadow-sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="rounded-xl px-6 font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#05c1ff] text-white hover:brightness-110 transition"
                >
                  {isSaving ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-8">
              <div className="max-w-3xl mx-auto space-y-8 pb-20">
                <div className="space-y-6">
                  <Field label="Title">
                    <TextInput 
                      value={selectedArticle.title || ""} 
                      onChange={(e) => updateSelectedArticle("title", e.target.value)} 
                      className="text-lg font-medium"
                    />
                  </Field>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Slug (URL Path)">
                      <TextInput 
                        value={selectedArticle.slug || ""} 
                        onChange={(e) => updateSelectedArticle("slug", e.target.value)} 
                      />
                    </Field>
                    <Field label="Publish Date">
                      <TextInput 
                        value={selectedArticle.date || ""} 
                        onChange={(e) => updateSelectedArticle("date", e.target.value)} 
                      />
                    </Field>
                  </div>
                  
                  <Field label="Categories (Comma Separated)">
                    <TextInput 
                      value={(selectedArticle.categories || []).join(", ")} 
                      onChange={(e) => updateSelectedArticle("categories", e.target.value.split(",").map(c => c.trim()))} 
                    />
                  </Field>

                  <Field label="Short Description (Snippet)">
                    <TextArea 
                      rows={3} 
                      value={selectedArticle.description || ""} 
                      onChange={(e) => updateSelectedArticle("description", e.target.value)} 
                    />
                  </Field>

                  <div className="border-t border-border/50 pt-6">
                    <Field label="Cover Image">
                      <div className="mt-2">
                        <ImageField 
                          label="" 
                          value={draftImages[selectedIndex] || ""} 
                          onChange={(e) => handleImageUpload(e, (value) => {
                            setDraftImages((current) => {
                              const updated = [...current];
                              updated[selectedIndex] = value;
                              return updated;
                            });
                          })} 
                        />
                      </div>
                    </Field>
                  </div>

                  <div className="border-t border-border/50 pt-6">
                    <Field label="Full Article Content">
                      <p className="text-xs text-muted-foreground mb-3">
                        Use double newlines for paragraphs. Start lines with <code># </code> for large headings.
                      </p>
                      <TextArea 
                        rows={20} 
                        value={selectedArticle.content || ""} 
                        onChange={(e) => updateSelectedArticle("content", e.target.value)} 
                        className="font-mono text-sm leading-relaxed"
                      />
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
            <FileText className="w-16 h-16 opacity-20 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Article Selected</h3>
            <p className="max-w-md">Select an article from the sidebar to edit it, or click the + button to create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
