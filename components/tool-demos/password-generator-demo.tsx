'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Check, ShieldCheck, Settings2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function PasswordGeneratorDemo() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    generatePassword();
  }, []); // Generate on mount

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') {
        // Fallback if nothing selected
        chars = lowercase;
        setIncludeLowercase(true);
    }

    let result = '';
    const array = new Uint32Array(length[0]);
    crypto.getRandomValues(array);
    for (let i = 0; i < length[0]; i++) {
      result += chars.charAt(array[i] % chars.length);
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <section className="py-12 bg-background border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Controls Section */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-2">
               <Settings2 className="w-5 h-5 text-primary" />
               <h3 className="text-xl font-semibold">Configuration</h3>
            </div>
            
            <Card className="p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">Password Length</Label>
                  <Badge variant="secondary" className="text-base px-3">{length[0]}</Badge>
                </div>
                <Slider
                  value={length}
                  onValueChange={(val) => { setLength(val); generatePassword(); }}
                  min={8}
                  max={64}
                  step={1}
                  className="cursor-pointer py-4"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium mb-4 block">Character Types</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Label htmlFor="uppercase" className="cursor-pointer flex-1">Uppercase (A-Z)</Label>
                    <Switch id="uppercase" checked={includeUppercase} onCheckedChange={(c) => { setIncludeUppercase(c); setTimeout(generatePassword, 0); }} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Label htmlFor="lowercase" className="cursor-pointer flex-1">Lowercase (a-z)</Label>
                    <Switch id="lowercase" checked={includeLowercase} onCheckedChange={(c) => { setIncludeLowercase(c); setTimeout(generatePassword, 0); }} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Label htmlFor="numbers" className="cursor-pointer flex-1">Numbers (0-9)</Label>
                    <Switch id="numbers" checked={includeNumbers} onCheckedChange={(c) => { setIncludeNumbers(c); setTimeout(generatePassword, 0); }} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Label htmlFor="symbols" className="cursor-pointer flex-1">Symbols (!@#$)</Label>
                    <Switch id="symbols" checked={includeSymbols} onCheckedChange={(c) => { setIncludeSymbols(c); setTimeout(generatePassword, 0); }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Result Section */}
          <div className="space-y-6 order-1 lg:order-2">
             <div className="flex items-center gap-2 mb-2">
               <ShieldCheck className="w-5 h-5 text-primary" />
               <h3 className="text-xl font-semibold">Generated Password</h3>
            </div>
            
            <Card className="p-8 flex flex-col justify-center min-h-[300px] bg-gradient-to-br from-background to-muted/50 border-2 border-primary/20 relative overflow-hidden group">
               {/* Decorative background element */}
               <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

               <div className="space-y-8 relative z-10">
                 <div className="text-center space-y-2">
                   <div className="text-4xl sm:text-5xl font-mono font-bold tracking-wider break-all text-primary leading-tight min-h-[3.5rem] flex items-center justify-center">
                     {password}
                   </div>
                   <p className="text-muted-foreground text-sm">
                     {length[0]} characters • {includeSymbols ? 'High' : 'Medium'} Complexity
                   </p>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Button onClick={generatePassword} size="lg" className="gap-2 shadow-md hover:shadow-lg transition-all">
                      <RefreshCw className="w-4 h-4" /> Generate New
                    </Button>
                    <Button onClick={copyToClipboard} variant="outline" size="lg" className="gap-2 border-primary/20 hover:bg-primary/5">
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied!" : "Copy Password"}
                    </Button>
                 </div>
               </div>
            </Card>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-3 text-sm text-blue-700 dark:text-blue-300">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <p>Your password is generated locally in your browser using strong cryptographic randomness. It is never sent to any server.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
