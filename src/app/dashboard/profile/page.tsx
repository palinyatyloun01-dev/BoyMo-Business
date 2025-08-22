
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { STORE_STATUSES } from '@/lib/constants';
import { User, Wand2, Upload } from 'lucide-react';
import { AvatarGenerator } from '@/components/avatar-generator';
import { useDictionary } from '@/contexts/dictionary-context';
import { BackgroundSelector } from '@/components/background-selector';
import { LogoUploader } from '@/components/logo-uploader';

export default function ProfilePage() {
    const [avatarSrc, setAvatarSrc] = React.useState('https://placehold.co/128x128.png');
    const [isGeneratorOpen, setIsGeneratorOpen] = React.useState(false);
    const { dictionary } = useDictionary();
    
    return (
        <>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">{dictionary.profile.manage}</h1>
                <Tabs defaultValue="profile">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="profile">{dictionary.profile.title}</TabsTrigger>
                        <TabsTrigger value="store">{dictionary.profile.storeSettings}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>{dictionary.profile.personalInfo}</CardTitle>
                                <CardDescription>{dictionary.profile.personalInfoDesc}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center gap-4">
                                    <Avatar className="h-32 w-32">
                                        <AvatarImage src={avatarSrc} alt="Profile" data-ai-hint="pizza chef" />
                                        <AvatarFallback><User className="h-16 w-16" /></AvatarFallback>
                                    </Avatar>
                                    <div className="flex gap-2">
                                        <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> {dictionary.profile.upload}</Button>
                                        <Button onClick={() => setIsGeneratorOpen(true)}><Wand2 className="mr-2 h-4 w-4" /> {dictionary.profile.generateWithAI}</Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nickname">{dictionary.profile.nickname}</Label>
                                    <Input id="nickname" defaultValue="ບອຍ" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>{dictionary.general.saveChanges}</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="store">
                        <Card>
                             <CardHeader>
                                <CardTitle>{dictionary.profile.storeStatus}</CardTitle>
                                <CardDescription>{dictionary.profile.storeStatusDesc}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <RadioGroup defaultValue="open" className="space-y-2">
                                    {STORE_STATUSES.map(status => (
                                        <div key={status.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={status.id} id={`status-${status.id}`} />
                                            <Label htmlFor={`status-${status.id}`}>{status.label}</Label>
                                        </div>
                                    ))}
                               </RadioGroup>
                            </CardContent>
                            <CardFooter>
                                <Button>{dictionary.general.saveStatus}</Button>
                            </CardFooter>
                        </Card>
                         <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>ປັບແຕ່ງພື້ນຫຼັງ</CardTitle>
                                <CardDescription>ເລືອກຮູບພື້ນຫຼັງສຳລັບແອັບຂອງທ່ານ</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BackgroundSelector />
                            </CardContent>
                        </Card>
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>ປັບແຕ່ງໂລໂກ້</CardTitle>
                                <CardDescription>ເລືອກໄອຄອນໃໝ່ ຫຼື ອັບໂຫຼດຮູບຂອງທ່ານເອງ</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <LogoUploader />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <AvatarGenerator 
                open={isGeneratorOpen}
                onOpenChange={setIsGeneratorOpen}
                onImageGenerated={(dataUri) => {
                    setAvatarSrc(dataUri);
                    setIsGeneratorOpen(false); // Close dialog on success
                }}
            />
        </>
    );
}
