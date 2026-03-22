"use client";

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import Cropper from "react-easy-crop";
import React, {useCallback, useState} from "react";
import {Button} from "@/components/ui/button";
import getCroppedImg from "@/utils/cropImage";


type ImageCropModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    image: string;
    onCropComplete: (croppedBlob: Blob) => void;

}

export default function ImageCropModal({
                                           open,
                                           setOpen,
                                           image,
                                           onCropComplete,
                                       }: ImageCropModalProps) {
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const handleCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleDone = async () => {
        const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
        onCropComplete(croppedBlob);
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent>
                    <DialogHeader className="hidden">
                        <DialogTitle className="hidden"></DialogTitle>
                        <DialogDescription className="hidden">hello</DialogDescription>
                    </DialogHeader>
                    <div className={"relative w-full h-104"}>
                        <Cropper
                            onCropComplete={handleCropComplete}
                            aspect={1}
                            image={image}
                            zoom={zoom}
                            onZoomChange={setZoom}
                            crop={crop}
                            onCropChange={setCrop}
                            showGrid={true}
                            cropShape={"round"}
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleDone}>Crop</Button>
                    </div>
                </DialogContent>

            </Dialog>
        </>
    )
}
