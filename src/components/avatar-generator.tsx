"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateProfileImage } from '@/ai/flows/generate-profile-image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2 } from 'lucide-react';

const formSchema = z.object({
  description: z.string().min(10, { message: "ກະລຸນາປ້ອນລາຍລະອຽດຢ່າງໜ້ອຍ 10 ຕົວອັກສອນ." }),
});

type AvatarGeneratorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImageGenerated: (imageDataUri: string) => void;
};

export function AvatarGenerator({ open, onOpenChange, onImageGenerated }: AvatarGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "A beautiful woman, bob haircut, cute, wearing a sexy chef outfit, holding a pizza, digital art style",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    try {
      const result = await generateProfileImage({ description: values.description });
      if (result.imageDataUri) {
        onImageGenerated(result.imageDataUri);
        toast({
          title: "ສຳເລັດ!",
          description: "ສ້າງຮູບໂປຣໄຟລ໌ໃໝ່ສຳເລັດແລ້ວ.",
        });
        onOpenChange(false);
      } else {
        throw new Error("No image data returned");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'ເກີດຂໍ້ຜິດພາດ',
        description: 'ບໍ່ສາມາດສ້າງຮູບໄດ້. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>ສ້າງຮູບໂປຣໄຟລ໌ດ້ວຍ AI</DialogTitle>
              <DialogDescription>
                ອະທິບາຍຮູບໂປຣໄຟລ໌ທີ່ທ່ານຕ້ອງການ. ຍິ່ງລະອຽດຫຼາຍ, ຍິ່ງໄດ້ຜົນດີ.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ລາຍລະອຽດ</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ຕົວຢ່າງ: ຜູ້ຍິງງາມ, ຜົມບັອບ, ໜ້າຮັກ, ນຸ່ງຊຸດເຊັບຊີ່, ຈັບພິຊຊ່າ..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isGenerating}>
                ຍົກເລີກ
              </Button>
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ກຳລັງສ້າງ...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    ສ້າງຮູບ
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
