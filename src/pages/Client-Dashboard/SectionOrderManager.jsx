import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../../components/ui/button";
import { GripVertical, Trash2, Plus } from "lucide-react";

export const SECTION_TEMPLATES = [
  { id: 'hero', label: 'Hero Banner' },
  { id: 'conviction-strip', label: 'Conviction Strip' },
  { id: 'about', label: 'About Section' },
  { id: 'what-we-do', label: 'What We Do / Value Proposition' },
  { id: 'track-record', label: 'Track Record' },
  { id: 'support-ohi', label: 'Support OHI' },
  { id: 'final-cta', label: 'Final CTA / Turn Programme into Proof' },
  { id: 'programmes', label: 'Programmes' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'brand-logos', label: 'Brand Logos' },
  { id: 'africa-story-banner', label: 'Africa Story Banner' },
  { id: 'story-banner', label: 'Story Banner' },
  { id: 'client-voices', label: 'Client Voices' },
  { id: 'news-blog', label: 'News / Blog' },
  { id: 'ohi-video', label: 'OHI Video' }
];

function SortableItem({ id, sectionId, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const templateId = sectionId.split(':')[0];
  const template = SECTION_TEMPLATES.find((t) => t.id === templateId);
  const label = template ? template.label : sectionId;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm mb-3"
    >
      <div {...attributes} {...listeners} className="cursor-grab hover:text-primaryColor p-1 text-muted-foreground">
        <GripVertical size={20} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground font-mono">{sectionId}</p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onDelete(id)}
        className="text-destructive hover:bg-destructive/10"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}

export default function SectionOrderManager({ sectionOrder, onChange }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id);
      const newIndex = sectionOrder.indexOf(over.id);
      const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);
      onChange(newOrder);
    }
  };

  const handleDelete = (id) => {
    onChange(sectionOrder.filter((s) => s !== id));
  };

  const handleAdd = (templateId) => {
    const timestamp = Date.now();
    const newId = `${templateId}:${timestamp}`;
    onChange([...sectionOrder, newId]);
  };

  return (
    <div className="space-y-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sectionOrder}
          strategy={verticalListSortingStrategy}
        >
          <div className="bg-muted/30 p-4 rounded-2xl border border-border/70 max-h-[400px] overflow-y-auto">
            {sectionOrder.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No sections added.</p>
            ) : (
              sectionOrder.map((sectionId) => (
                <SortableItem key={sectionId} id={sectionId} sectionId={sectionId} onDelete={handleDelete} />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Add new section</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SECTION_TEMPLATES.map((template) => (
            <Button
              key={template.id}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAdd(template.id)}
              className="justify-start rounded-xl text-xs"
            >
              <Plus size={14} className="mr-2" />
              {template.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
