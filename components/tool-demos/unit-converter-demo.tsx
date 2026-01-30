'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRightLeft, Copy, Check, Calculator, Ruler, Scale, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CONVERSION_RATES: Record<string, number> = {
  // Length (base: meter)
  'm': 1,
  'km': 1000,
  'cm': 0.01,
  'mm': 0.001,
  'mi': 1609.34,
  'yd': 0.9144,
  'ft': 0.3048,
  'in': 0.0254,
  
  // Weight (base: kg)
  'kg': 1,
  'g': 0.001,
  'mg': 0.000001,
  'lb': 0.453592,
  'oz': 0.0283495,
  't': 1000,
};

const CATEGORIES = {
  length: {
    name: 'Length',
    icon: Ruler,
    units: [
      { id: 'm', label: 'Meters (m)' },
      { id: 'km', label: 'Kilometers (km)' },
      { id: 'cm', label: 'Centimeters (cm)' },
      { id: 'mm', label: 'Millimeters (mm)' },
      { id: 'mi', label: 'Miles (mi)' },
      { id: 'yd', label: 'Yards (yd)' },
      { id: 'ft', label: 'Feet (ft)' },
      { id: 'in', label: 'Inches (in)' },
    ]
  },
  weight: {
    name: 'Weight',
    icon: Scale,
    units: [
      { id: 'kg', label: 'Kilograms (kg)' },
      { id: 'g', label: 'Grams (g)' },
      { id: 'mg', label: 'Milligrams (mg)' },
      { id: 'lb', label: 'Pounds (lb)' },
      { id: 'oz', label: 'Ounces (oz)' },
      { id: 't', label: 'Metric Tons (t)' },
    ]
  },
  temperature: {
    name: 'Temperature',
    icon: Thermometer,
    units: [
      { id: 'c', label: 'Celsius (°C)' },
      { id: 'f', label: 'Fahrenheit (°F)' },
      { id: 'k', label: 'Kelvin (K)' },
    ]
  }
};

export function UnitConverterDemo() {
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState<keyof typeof CATEGORIES>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [fromValue, setFromValue] = useState<string>('1');
  const [toValue, setToValue] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    convert(fromValue, fromUnit, toUnit, category);
  }, [fromUnit, toUnit, category]);

  const convert = (val: string, from: string, to: string, cat: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) {
      setToValue('');
      return;
    }

    let result = 0;

    if (cat === 'temperature') {
      // Temperature conversion logic
      let celsius = num;
      // Convert to Celsius first
      if (from === 'f') celsius = (num - 32) * 5/9;
      if (from === 'k') celsius = num - 273.15;
      
      // Convert from Celsius to target
      if (to === 'c') result = celsius;
      if (to === 'f') result = (celsius * 9/5) + 32;
      if (to === 'k') result = celsius + 273.15;
    } else {
      // Linear conversion logic
      const baseValue = num * CONVERSION_RATES[from];
      result = baseValue / CONVERSION_RATES[to];
    }

    // Format result to avoid long decimals
    setToValue(Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/\.?0+$/, ''));
  };

  const handleCategoryChange = (val: string) => {
    const newCat = val as keyof typeof CATEGORIES;
    setCategory(newCat);
    // Reset units to first two of new category
    const units = CATEGORIES[newCat].units;
    setFromUnit(units[0].id);
    setToUnit(units[1]?.id || units[0].id);
    convert(fromValue, units[0].id, units[1]?.id || units[0].id, newCat);
  };

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
    convert(e.target.value, fromUnit, toUnit, category);
  };

  const copyResult = () => {
    if (!toValue) return;
    navigator.clipboard.writeText(toValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Unit Converter</h2>
          <p className="text-muted-foreground">Convert between common units of measurement</p>
        </div>

        <Card className="p-8 shadow-lg border-2 border-primary/5">
          <Tabs value={category} onValueChange={handleCategoryChange} className="w-full mb-12">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="length" className="text-base"><Ruler className="w-4 h-4 mr-2"/> Length</TabsTrigger>
              <TabsTrigger value="weight" className="text-base"><Scale className="w-4 h-4 mr-2"/> Weight</TabsTrigger>
              <TabsTrigger value="temperature" className="text-base"><Thermometer className="w-4 h-4 mr-2"/> Temperature</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-8 items-start">
            {/* From Section */}
            <div className="space-y-4 p-6 bg-muted/30 rounded-xl border border-border/50">
              <Label className="text-base font-medium text-muted-foreground">From</Label>
              <div className="space-y-4">
                <Input
                  type="number"
                  value={fromValue}
                  onChange={handleFromValueChange}
                  placeholder="0"
                  className="text-3xl h-16 font-mono tracking-tight bg-background shadow-sm"
                />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES[category].units.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>{unit.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center md:pt-16 text-muted-foreground">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
            </div>

            {/* To Section */}
            <div className="space-y-4 p-6 bg-primary/5 rounded-xl border border-primary/10">
              <Label className="text-base font-medium text-primary">To</Label>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    value={toValue}
                    readOnly
                    className="text-3xl h-16 font-mono tracking-tight bg-background shadow-sm pr-12 text-primary font-semibold"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-3 text-muted-foreground hover:text-primary"
                    onClick={copyResult}
                    disabled={!toValue}
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                </div>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES[category].units.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>{unit.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
