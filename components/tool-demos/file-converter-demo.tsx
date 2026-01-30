'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, FileType, Image as ImageIcon, FileText } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export function FileConverterDemo() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('image');
  
  // Image State
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState('png');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Text State
  const [textInput, setTextInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [textMode, setTextMode] = useState('json-csv');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageConvert = () => {
    if (!selectedImage || !imagePreview || !canvasRef.current) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      const mimeType = `image/${targetFormat}`;
      const dataUrl = canvas.toDataURL(mimeType);
      
      const link = document.createElement('a');
      link.download = `converted-image.${targetFormat}`;
      link.href = dataUrl;
      link.click();
    };
    img.src = imagePreview;
  };

  const handleTextConvert = () => {
    try {
      if (textMode === 'json-csv') {
        const json = JSON.parse(textInput);
        if (Array.isArray(json)) {
          const keys = Object.keys(json[0]);
          const csv = [
            keys.join(','),
            ...json.map(row => keys.map(k => JSON.stringify(row[k])).join(','))
          ].join('\n');
          setTextOutput(csv);
        } else {
          setTextOutput('Error: JSON must be an array of objects for CSV conversion');
        }
      } else if (textMode === 'csv-json') {
        const lines = textInput.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const json = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, i) => {
            obj[header] = values[i]?.replace(/^"|"$/g, '');
            return obj;
          }, {} as any);
        });
        setTextOutput(JSON.stringify(json, null, 2));
      }
    } catch (e) {
      setTextOutput('Error: Invalid input format');
    }
  };

  if (!mounted) return null;

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger value="image" className="text-base"><ImageIcon className="w-4 h-4 mr-2" /> Image Converter</TabsTrigger>
            <TabsTrigger value="text" className="text-base"><FileText className="w-4 h-4 mr-2" /> Data Converter</TabsTrigger>
          </TabsList>

          <TabsContent value="image">
            <Card className="p-8 space-y-8 shadow-lg">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Image Format Conversion</h3>
                <p className="text-muted-foreground">Convert images between PNG, JPEG, and WEBP formats locally</p>
              </div>

              <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-xl p-12 bg-muted/10 hover:bg-muted/20 transition-colors">
                {imagePreview ? (
                  <div className="space-y-6 text-center w-full max-w-md">
                    <div className="relative group">
                      <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-md border" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button variant="secondary" onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                        }}>Change Image</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="bg-primary/10 p-4 rounded-full inline-block">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Upload an Image</h3>
                      <p className="text-muted-foreground text-sm mt-1">Supports JPG, PNG, WEBP</p>
                    </div>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="max-w-xs mx-auto file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-primary/90 cursor-pointer" 
                    />
                  </div>
                )}
              </div>

              {selectedImage && (
                <div className="flex flex-col sm:flex-row items-end gap-4 justify-center bg-muted/30 p-8 rounded-xl border border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-2 w-full sm:w-auto">
                    <Label>Convert To</Label>
                    <Select value={targetFormat} onValueChange={setTargetFormat}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="jpeg">JPEG</SelectItem>
                        <SelectItem value="webp">WEBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleImageConvert} size="lg" className="w-full sm:w-auto shadow-md">
                    <Download className="w-4 h-4 mr-2" /> Convert & Download
                  </Button>
                </div>
              )}
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </Card>
          </TabsContent>

          <TabsContent value="text">
            <Card className="p-8 space-y-8 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-xl font-semibold">Data Format Conversion</h3>
                  <p className="text-muted-foreground text-sm">Convert structured data between JSON and CSV</p>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="whitespace-nowrap">Mode:</Label>
                  <Select value={textMode} onValueChange={setTextMode}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json-csv">JSON to CSV</SelectItem>
                      <SelectItem value="csv-json">CSV to JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Input Data
                  </Label>
                  <Textarea 
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={textMode === 'json-csv' ? '[{"name": "John", "age": 30}]' : 'name,age\nJohn,30'}
                    className="h-80 font-mono text-sm resize-none p-4"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileType className="w-4 h-4" /> Output Result
                  </Label>
                  <Textarea 
                    value={textOutput}
                    readOnly
                    className="h-80 font-mono text-sm bg-muted/30 resize-none p-4"
                  />
                </div>
              </div>

              <Button onClick={handleTextConvert} size="lg" className="w-full shadow-md">
                Convert Data
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
