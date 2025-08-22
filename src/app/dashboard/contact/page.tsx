
"use client";

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Info, Phone, Mail } from 'lucide-react';

const mockFeedback: any[] = [];

const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Star
                key={i}
                className={`h-5 w-5 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
        );
    }
    return stars;
};

const getEmojiForRating = (rating: number) => {
    if (rating >= 4) return "😄";
    if (rating >= 3) return "😊";
    return "😟";
};

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">ຕິດຕໍ່ & Feedback</h1>
            
            <Card>
                 <CardHeader>
                    <CardTitle>Feedback ຈາກລູກຄ້າ</CardTitle>
                    <CardDescription>ກວດສອບຄວາມຄິດເຫັນຈາກລູກຄ້າ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {mockFeedback.length === 0 ? (
                        <div className="text-center text-muted-foreground p-8">
                            ຍັງບໍ່ມີ Feedback ເທື່ອ
                        </div>
                    ) : mockFeedback.map((fb) => (
                        <div key={fb.id} className="p-4 border rounded-lg bg-secondary/50">
                            <div className="flex items-start justify-between">
                                <span className="font-semibold">{fb.name}</span>
                                <div className="flex items-center gap-2">
                                    <div className="flex">{renderStars(fb.rating)}</div>
                                    <span className="text-2xl">{getEmojiForRating(fb.rating)}</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{fb.comment}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Info className="h-5 w-5" />ຂໍ້ມູນຜູ້ພັດທະນາແອັບ</CardTitle>
                    <CardDescription>ຂໍ້ມູນຕິດຕໍ່ສຳລັບການຊ່ວຍເຫຼືອ ຫຼື ລາຍງານບັນຫາ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <p>ຊື່: ທ້າວ ສົມຫວັງ ປິງສະນີໃຈ (ຊື່ຫຼິ້ນ ບອຍ)</p>
                    <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>ເບີໂທ/WhatsApp: 02054539859</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span>Gmail: somvang.pingsanijai14@gmail.com</span>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
