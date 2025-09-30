import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, Plus, Trash2, GripVertical, Save, Send, FileText
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'radio' | 'checkbox' | 'date' | 'scale';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
}

interface FormBuilderProps {
  conversationId: string;
  patientId: string;
  onClose: () => void;
  onSent: () => void;
}

export default function FormBuilder({ conversationId, patientId, onClose, onSent }: FormBuilderProps) {
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  // Predefined templates
  const templates = {
    symptom_assessment: {
      name: "Symptom Assessment",
      description: "Track patient symptoms and severity",
      fields: [
        { id: '1', type: 'select' as const, label: 'Primary Symptom', required: true, options: ['Seizure', 'Tremor', 'Headache', 'Dizziness', 'Fatigue', 'Other'] },
        { id: '2', type: 'scale' as const, label: 'Severity (1-10)', required: true, min: 1, max: 10 },
        { id: '3', type: 'date' as const, label: 'When did symptoms start?', required: true },
        { id: '4', type: 'textarea' as const, label: 'Additional Details', required: false, placeholder: 'Describe symptoms in detail...' },
      ]
    },
    medication_review: {
      name: "Medication Review",
      description: "Review medication adherence and side effects",
      fields: [
        { id: '1', type: 'radio' as const, label: 'Are you taking your medications as prescribed?', required: true, options: ['Yes, all doses', 'Missed 1-2 doses', 'Missed 3+ doses', 'Not taking'] },
        { id: '2', type: 'checkbox' as const, label: 'Any side effects?', required: true, options: ['Nausea', 'Dizziness', 'Fatigue', 'Mood changes', 'Sleep issues', 'None'] },
        { id: '3', type: 'scale' as const, label: 'Effectiveness (1-10)', required: true, min: 1, max: 10 },
        { id: '4', type: 'textarea' as const, label: 'Questions or concerns', required: false },
      ]
    },
    seizure_log: {
      name: "Seizure Log",
      description: "Detailed seizure event tracking",
      fields: [
        { id: '1', type: 'date' as const, label: 'Date of seizure', required: true },
        { id: '2', type: 'select' as const, label: 'Seizure type', required: true, options: ['Tonic-clonic', 'Focal', 'Absence', 'Myoclonic', 'Unknown'] },
        { id: '3', type: 'number' as const, label: 'Duration (seconds)', required: true },
        { id: '4', type: 'checkbox' as const, label: 'Warning signs', required: false, options: ['Aura', 'Mood change', 'Headache', 'None'] },
        { id: '5', type: 'textarea' as const, label: 'Additional notes', required: false },
      ]
    },
    pre_visit: {
      name: "Pre-Visit Questionnaire",
      description: "Preparation for upcoming appointment",
      fields: [
        { id: '1', type: 'textarea' as const, label: 'What would you like to discuss?', required: true },
        { id: '2', type: 'checkbox' as const, label: 'Topics to cover', required: true, options: ['Medications', 'Symptoms', 'Test results', 'Side effects', 'Treatment plan', 'Other'] },
        { id: '3', type: 'radio' as const, label: 'Overall status', required: true, options: ['Much better', 'Somewhat better', 'About the same', 'Somewhat worse', 'Much worse'] },
        { id: '4', type: 'textarea' as const, label: 'Questions for doctor', required: false },
      ]
    }
  };

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: '',
      required: false,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const loadTemplate = (templateKey: string) => {
    const template = templates[templateKey as keyof typeof templates];
    if (template) {
      setFormName(template.name);
      setFormDescription(template.description);
      setFields(template.fields);
      setSelectedTemplate(templateKey);
    }
  };

  const handleSend = () => {
    if (!formName || fields.length === 0) {
      return;
    }
    onSent();
  };

  return (
    <Card className="medical-card h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <CardTitle>Create Custom Form</CardTitle>
            <CardDescription>Build a form to send to your patient</CardDescription>
          </div>
        </div>
      </CardHeader>

      <Tabs defaultValue="templates" className="flex-1 flex flex-col">
        <TabsList className="mx-6 mt-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Form</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(templates).map(([key, template]) => (
              <Card
                key={key}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => loadTemplate(key)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{template.name}</h3>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <Badge variant="outline">{template.fields.length} questions</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedTemplate && (
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Preview: {formName}</h3>
              <Card className="p-4">
                <div className="space-y-4">
                  {fields.map((field, idx) => (
                    <div key={field.id} className="space-y-2">
                      <Label>
                        {idx + 1}. {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      {field.type === 'textarea' && (
                        <Textarea placeholder={field.placeholder} disabled />
                      )}
                      {field.type === 'text' && (
                        <Input placeholder={field.placeholder} disabled />
                      )}
                      {field.type === 'select' && (
                        <Select disabled>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option..." />
                          </SelectTrigger>
                        </Select>
                      )}
                      {field.type === 'scale' && (
                        <div className="flex items-center gap-2">
                          <Input type="number" min={field.min} max={field.max} placeholder={`${field.min}-${field.max}`} disabled className="w-24" />
                          <span className="text-sm text-muted-foreground">out of {field.max}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              <div className="flex gap-2 mt-4">
                <Button className="flex-1" onClick={handleSend}>
                  <Send className="h-4 w-4 mr-2" />
                  Send to Patient
                </Button>
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save as Template
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="custom" className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Form Details */}
            <div className="space-y-4">
              <div>
                <Label>Form Name</Label>
                <Input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g., Weekly Check-in"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Brief description of the form purpose"
                />
              </div>
            </div>

            {/* Add Field Buttons */}
            <div>
              <Label className="mb-2 block">Add Fields</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button variant="outline" size="sm" onClick={() => addField('text')}>
                  + Text
                </Button>
                <Button variant="outline" size="sm" onClick={() => addField('textarea')}>
                  + Long Text
                </Button>
                <Button variant="outline" size="sm" onClick={() => addField('number')}>
                  + Number
                </Button>
                <Button variant="outline" size="sm" onClick={() => addField('select')}>
                  + Dropdown
                </Button>
                <Button variant="outline" size="sm" onClick={() => addField('radio')}>
                  + Multiple Choice
                </Button>
                <Button variant="outline" size="sm" onClick={() => addField('checkbox')}>
                  + Checkboxes
                </Button>
                <Button variant="outline" size="sm" onClick={() => addField('date')}>
                  + Date
                </Button>
                <Button variant="outline" size="sm" onClick={() => addField('scale')}>
                  + Scale
                </Button>
              </div>
            </div>

            {/* Field List */}
            {fields.length > 0 && (
              <div className="space-y-3">
                <Label>Form Fields</Label>
                {fields.map((field, idx) => (
                  <Card key={field.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <GripVertical className="h-5 w-5 text-muted-foreground mt-2 cursor-move" />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="flex-1">
                            <Input
                              placeholder="Question/Label"
                              value={field.label}
                              onChange={(e) => updateField(field.id, { label: e.target.value })}
                            />
                          </div>
                          <Badge variant="outline">{field.type}</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeField(field.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                          <Input
                            placeholder="Options (comma-separated)"
                            value={field.options?.join(', ') || ''}
                            onChange={(e) => updateField(field.id, { options: e.target.value.split(',').map(s => s.trim()) })}
                          />
                        )}

                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => updateField(field.id, { required: e.target.checked })}
                            />
                            Required
                          </label>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Actions */}
            {fields.length > 0 && (
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleSend}>
                  <Send className="h-4 w-4 mr-2" />
                  Send to Patient
                </Button>
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save as Template
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
