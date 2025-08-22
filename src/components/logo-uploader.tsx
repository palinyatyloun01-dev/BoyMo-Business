
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Pizza, Sandwich, IceCream } from 'lucide-react';
import { useLogo } from '@/contexts/logo-context';
import { LOGO_OPTIONS } from '@/lib/constants';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const iconComponents: { [key: string]: React.ElementType } = {
  Pizza: Pizza,
  Sandwich: Sandwich,
  IceCream: IceCream,
};

export function LogoUploader() {
    const { logo, setLogo, logoType, setLogoType, customLogo, setCustomLogo } = useLogo();
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUri = e.target?.result as string;
                setCustomLogo(dataUri);
                setLogoType('custom');
                toast({ title: "ສຳເລັດ!", description: "ອັບໂຫຼດໂລໂກ້ໃໝ່ສຳເລັດແລ້ວ." });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIconSelect = (iconId: any) => {
        setLogo(iconId);
        setLogoType('icon');
    };

    return (
        <div className="space-y-4">
            <RadioGroup value={logoType} onValueChange={(value) => setLogoType(value as any)} className="space-y-2">
                <Label className="font-bold">ເລືອກປະເພດໂລໂກ້:</Label>
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="icon" id="type-icon" />
                    <Label htmlFor="type-icon">ເລືອກຈາກໄອຄອນ</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="type-custom" />
                    <Label htmlFor="type-custom">ອັບໂຫຼດຮູບພາບ</Label>
                </div>
            </RadioGroup>
            
            <Separator />

            {logoType === 'icon' && (
                <div className="space-y-2">
                    <Label className="font-bold">ເລືອກໄອຄອນ:</Label>
                    <RadioGroup value={logo} onValueChange={handleIconSelect} className="grid grid-cols-3 gap-4">
                        {LOGO_OPTIONS.map(option => {
                            const Icon = iconComponents[option.id];
                            return (
                                <Label key={option.id} htmlFor={`logo-option-${option.id}`} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer ${logo === option.id && logoType === 'icon' ? 'border-primary' : ''}`}>
                                    <RadioGroupItem value={option.id} id={`logo-option-${option.id}`} className="sr-only" />
                                    <Icon className="h-8 w-8" />
                                    <span>{option.name}</span>
                                </Label>
                            )
                        })}
                    </RadioGroup>
                </div>
            )}
            
            {logoType === 'custom' && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="mr-2 h-4 w-4" />
                            ເລືອກຮູບພາບ
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    {customLogo && (
                         <div className="relative w-full max-w-xs rounded-lg overflow-hidden border p-2">
                            <p className="text-sm text-muted-foreground mb-2">ຕົວຢ່າງໂລໂກ້:</p>
                            <img src={customLogo} alt="Logo preview" className="w-24 h-24 object-contain mx-auto" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
