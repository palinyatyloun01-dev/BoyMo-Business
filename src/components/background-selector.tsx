
"use client";

import * as React from 'react';
import Webcam from "react-webcam";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Upload, Camera, Image as ImageIcon, Trash2, Video, VideoOff } from 'lucide-react';
import { useBackground } from '@/contexts/background-context';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

export function BackgroundSelector() {
    const { background, setBackground } = useBackground();
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isCameraOpen, setIsCameraOpen] = React.useState(false);
    const webcamRef = React.useRef<Webcam>(null);
    const { toast } = useToast();
    const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBackground(e.target?.result as string);
                toast({ title: "ສຳເລັດ!", description: "ປ່ຽນຮູບພື້ນຫຼັງສຳເລັດແລ້ວ." });
            };
            reader.readAsDataURL(file);
        }
    };

    const captureCameraImage = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setBackground(imageSrc);
            setIsCameraOpen(false);
            toast({ title: "ສຳເລັດ!", description: "ບັນທຶກຮູບຈາກກ້ອງສຳເລັດແລ້ວ." });
        } else {
             toast({ variant: 'destructive', title: "ເກີດຂໍ້ຜິດພາດ", description: "ບໍ່ສາມາດຖ່າຍຮູບໄດ້." });
        }
    }, [webcamRef, setBackground, toast]);
    
    React.useEffect(() => {
        if (isCameraOpen) {
            const getCameraPermission = async () => {
              try {
                const stream = await navigator.mediaDevices.getUserMedia({video: true});
                setHasCameraPermission(true);
                // The stream is managed by the react-webcam component
              } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                  variant: 'destructive',
                  title: 'ບໍ່ສາມາດເຂົ້າເຖິງກ້ອງ',
                  description: 'ກະລຸນາອະນຸຍາດໃຫ້ໃຊ້ກ້ອງໃນການຕັ້ງຄ່າຂອງບຣາວເຊີ.',
                });
              }
            };
            getCameraPermission();
        }
    }, [isCameraOpen, toast]);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    ເລືອກຈາກຄັງຮູບ
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
                <Button variant="outline" onClick={() => setIsCameraOpen(true)}>
                    <Camera className="mr-2 h-4 w-4" />
                    ໃຊ້ກ້ອງຖ່າຍຮູບ
                </Button>
            </div>
            {background && (
                 <div className="relative w-full max-w-sm rounded-lg overflow-hidden border p-2">
                    <p className="text-sm text-muted-foreground mb-2">ຮູບຕົວຢ່າງ:</p>
                    <img src={background} alt="Background preview" className="w-full h-auto rounded-md" />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-3 right-3 h-8 w-8"
                        onClick={() => setBackground(null)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )}
            
            <Dialog open={isCameraOpen} onOpenChange={setIsCameraOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>ຖ່າຍຮູບພື້ນຫຼັງ</DialogTitle>
                        <DialogDescription>ຈັດວາງກ້ອງໃຫ້ເຫັນພາບທີ່ທ່ານຕ້ອງການ.</DialogDescription>
                    </DialogHeader>
                    <div className="relative flex flex-col items-center justify-center gap-4 py-4">
                        <div className="w-full aspect-video rounded-md overflow-hidden bg-muted flex items-center justify-center">
                            {hasCameraPermission === null ? (
                                <p className="text-muted-foreground">ກຳລັງຂໍອະນຸຍາດໃຊ້ກ້ອງ...</p>
                            ) : hasCameraPermission === true ? (
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-center text-destructive">
                                    <VideoOff className="h-12 w-12 mx-auto" />
                                    <p className="mt-2">ບໍ່ສາມາດເຂົ້າເຖິງກ້ອງໄດ້.</p>
                                </div>
                            )}
                        </div>
                         {hasCameraPermission === false && (
                            <Alert variant="destructive">
                                <AlertTitle>ຕ້ອງອະນຸຍາດໃຫ້ໃຊ້ກ້ອງ</AlertTitle>
                                <AlertDescription>
                                    ກະລຸນາກວດສອບການຕັ້ງຄ່າບຣາວເຊີຂອງທ່ານ ແລະ ອະນຸຍາດໃຫ້ເວັບໄຊທ໌ນີ້ໃຊ້ກ້ອງຖ່າຍຮູບ.
                                </AlertDescription>
                            </Alert>
                         )}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setIsCameraOpen(false)}>
                            ຍົກເລີກ
                        </Button>
                        <Button onClick={captureCameraImage} disabled={!hasCameraPermission}>
                            <Camera className="mr-2 h-4 w-4" />
                            ຖ່າຍ​ຮູບ
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
